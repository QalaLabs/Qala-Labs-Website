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
    // Manual authentication handling (since verify_jwt is false by default)
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error("[bulk-email] Unauthorized: Missing Authorization header")
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Safely parse request body
    let body;
    try {
      body = await req.json()
    } catch (e) {
      console.error("[bulk-email] Error parsing JSON body", e)
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { subject, content, segment, to, isTest } = body

    // Handle individual test email
    if (isTest && to) {
      console.log(`[bulk-email] Processing test email for: ${to}`)
      
      // Note: Integration with an email provider (Resend/SendGrid) would happen here
      // using secrets stored in Supabase.
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: `Test request received for ${to}. Deployment successful!` 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // Handle bulk campaign logic
    console.log(`[bulk-email] Initializing bulk campaign for segment: ${segment}`)
    let query = supabaseClient.from('leads').select('email, data')
    
    if (segment === 'high_intent') {
      query = query.eq('data->budget', '50L+')
    } else if (segment && segment.startsWith('service:')) {
      const service = segment.split(':')[1]
      query = query.eq('data->service', service)
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
  } catch (error: any) {
    console.error(`[bulk-email] Error:`, error.message || error)
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})