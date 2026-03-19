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

    const { email, tool_used, data } = await req.json()

    console.log(`[lead-engine] Processing lead from ${email} via ${tool_used}`)

    // 1. Insert into database
    const { data: lead, error: dbError } = await supabaseClient
      .from('leads')
      .insert({
        email,
        tool_used,
        data: {
          ...data,
          processed_at: new Date().toISOString(),
          ip_address: req.headers.get('x-real-ip') || 'unknown'
        }
      })
      .select()
      .single()

    if (dbError) throw dbError

    // 2. Trigger external webhook (n8n / HubSpot) if configured
    const webhookUrl = Deno.env.get('N8N_WEBHOOK_URL')
    if (webhookUrl) {
      console.log(`[lead-engine] Forwarding to external webhook`)
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lead, source: 'qala-labs-engine' })
        })
      } catch (err) {
        console.error(`[lead-engine] Webhook failed:`, err)
      }
    }

    return new Response(JSON.stringify({ success: true, lead_id: lead.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    console.error(`[lead-engine] Error:`, error.message || error)
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})