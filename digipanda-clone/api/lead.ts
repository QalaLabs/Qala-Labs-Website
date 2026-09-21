import type { IncomingMessage, ServerResponse } from 'http';

export interface VercelRequest extends IncomingMessage {
  query: { [key: string]: string | string[] };
  cookies: { [key: string]: string };
  body: any;
  method?: string;
  headers: IncomingMessage['headers'];
}

export interface VercelResponse extends ServerResponse {
  send: (body: any) => VercelResponse;
  json: (jsonBody: any) => VercelResponse;
  status: (statusCode: number) => VercelResponse;
  redirect: (statusOrUrl: string | number, url?: string) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  // Parse body if received as raw string or stream
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ success: false, error: 'Invalid JSON body' });
      return;
    }
  }

  if (!body || typeof body !== 'object') {
    res.status(400).json({ success: false, error: 'Request body must be an object' });
    return;
  }

  // Honeypot bot protection: silently acknowledge bots
  if (body.b_url) {
    res.status(200).json({ success: true, message: 'Lead captured successfully' });
    return;
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 255) : '';
  const companyName = typeof body.companyName === 'string' ? body.companyName.trim().slice(0, 255) : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 32) : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const description = typeof body.description === 'string' ? body.description.trim().slice(0, 5000) : '';
  const source =
    typeof body.source === 'string' && /^[a-zA-Z0-9_\-]{1,64}$/.test(body.source)
      ? body.source
      : 'contact_section';

  // Field validation
  if (!name) {
    res.status(400).json({ success: false, error: 'Name is required' });
    return;
  }
  if (!companyName) {
    res.status(400).json({ success: false, error: 'Company name is required' });
    return;
  }
  if (!phone || !/^[0-9+\-\s()]{5,32}$/.test(phone)) {
    res.status(400).json({ success: false, error: 'A valid phone number is required' });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({ success: false, error: 'A valid email is required' });
    return;
  }
  if (!description) {
    res.status(400).json({ success: false, error: 'Description is required' });
    return;
  }

  const lead = {
    name,
    companyName,
    phone,
    email,
    description,
    source,
    createdAt: new Date().toISOString(),
  };

  console.log('[Lead Captured]', JSON.stringify(lead, null, 2));

  // Forward to configured Webhook (Slack / Discord / Zapier / Make / CRM) if available
  const webhookUrl =
    process.env.LEAD_WEBHOOK_URL ||
    process.env.SLACK_WEBHOOK_URL ||
    process.env.DISCORD_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚀 *New Lead on Qala Labs:*\n*Name:* ${name}\n*Company:* ${companyName}\n*Phone:* ${phone}\n*Email:* ${email}\n*Source:* ${source}\n*Message:* ${description}`,
          lead,
        }),
      });
    } catch (webhookErr) {
      console.error('[Lead Webhook Dispatch Failed]:', webhookErr);
      // Non-blocking so response to client still succeeds
    }
  }

  res.status(200).json({ success: true, message: 'Lead captured successfully' });
}
