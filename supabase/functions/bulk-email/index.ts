import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.json()
    const { subject, content, segment, to, isTest } = body

    // Handle individual test email
    if (isTest && to) {
      console.log(`[email-engine] Processing test email for: ${to}`)
      
      // Note: To actually send emails from an Edge Function, you should use a service like Resend or SendGrid.
      // For now, we log the attempt. Once you add your API keys to Supabase Secrets, we can integrate the provider.
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: `Test request received for ${to}. Deployment successful!` 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // Handle bulk campaign logic
    let query = supabaseClient.from('leads').select('email, data')
    
    if (segment === 'high_intent') {
      query = query.filter('data->budget', 'eq', '50L+')
    } else if (segment && segment.startsWith('service:')) {
      const service = segment.split(':')[1]
      query = query.filter('data->service', 'eq', service)
    }

    const { data: leads, error: fetchError } = await query
    if (fetchError) throw fetchError

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Campaign initialized for ${leads?.length || 0} recipients.`,
      recipient_count: leads?.length || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error(`[email-engine] Error:`, error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})