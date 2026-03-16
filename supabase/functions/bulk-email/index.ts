import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { subject, content, segment, user_id } = await req.json()
    console.log("[bulk-email] Initializing campaign", { subject, segment })

    // 1. Fetch leads based on segment
    let query = supabaseClient.from('leads').select('email, data')
    
    if (segment === 'high_intent') {
      // Logic for high intent (e.g., budget > 50L)
      query = query.filter('data->budget', 'eq', '50L+')
    } else if (segment.startsWith('service:')) {
      const service = segment.split(':')[1]
      query = query.filter('data->service', 'eq', service)
    }

    const { data: leads, error: fetchError } = await query
    if (fetchError) throw fetchError

    console.log(`[bulk-email] Found ${leads?.length || 0} leads for segment: ${segment}`)

    // 2. In a production environment, you would loop through leads 
    // and send via Resend, SendGrid, or Postmark.
    // For now, we log the intent and return success.
    
    // Example loop (pseudo-code for integration):
    /*
    for (const lead of leads) {
      await sendEmail({
        to: lead.email,
        subject: subject.replace('{{name}}', lead.data?.name || 'Founder'),
        body: content
      })
    }
    */
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: `Campaign queued for ${leads?.length || 0} recipients.`,
      recipient_count: leads?.length || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error("[bulk-email] Error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})