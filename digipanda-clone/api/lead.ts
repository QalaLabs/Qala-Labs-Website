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

// In-memory sliding window cache to deduplicate concurrent submissions (e.g. double clicks / network retries)
const recentSubmissions = new Map<string, number>();
const DEDUP_WINDOW_MS = 10_000; // 10 seconds TTL

function checkAndRecordSubmission(key: string): boolean {
  const now = Date.now();
  // Evict expired entries
  for (const [k, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > DEDUP_WINDOW_MS) {
      recentSubmissions.delete(k);
    }
  }
  if (recentSubmissions.has(key)) {
    return true; // Is duplicate
  }
  recentSubmissions.set(key, now);
  return false;
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

  // Idempotency / Deduplication against concurrent race conditions
  const dedupKey = `${email}:${phone}:${companyName}`;
  const isDuplicate = checkAndRecordSubmission(dedupKey);

  if (isDuplicate) {
    console.log('[Lead Deduplicated - Concurrent Submission Handled Idempotently]:', dedupKey);
    res.status(200).json({ success: true, message: 'Lead captured successfully' });
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

  // Optional Transactional Autoresponder via Resend API if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const isCareer = source === 'careers_form' || source.includes('career');
      const userSubject = isCareer
        ? 'Application Received: Qala Labs Growth & Engineering'
        : 'Thank You for Contacting Qala Labs | Discovery Confirmed';

      const userText = isCareer
        ? `Hi ${name},\n\nThank you for applying to Qala Labs. Our team reviews every application with care. If your background aligns with our sprint openings, we will contact you within 3-5 days.\n\nBest regards,\nThe Qala Labs Talent Team\nhttps://qalalabs.com`
        : `Hi ${name},\n\nThank you for reaching out to Qala Labs regarding ${companyName}.\n\nOur growth strategy and performance team has begun reviewing your details. A specialist will follow up within 24 hours.\n\nIf you'd like to talk immediately:\n- WhatsApp: https://wa.me/916006760151\n- Book 30-min Google Meet: https://calendar.app.google/EvA2Kw9rgA4xq8798\n\nBest regards,\nAashirwad Bhansali & The Qala Labs Team\nhttps://qalalabs.com`;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Qala Labs <hello@qalalabs.com>',
          to: [email],
          subject: userSubject,
          text: userText,
        }),
      });
    } catch (emailErr) {
      console.error('[Resend Autoresponder Failed]:', emailErr);
    }
  }

  res.status(200).json({ success: true, message: 'Lead captured successfully' });
}
