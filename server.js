import express from 'express';
import compression from 'compression';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(compression());
app.use(express.json());

// Serve static assets with aggressive caching for hashed assets
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false,
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.includes(`${path.sep}assets${path.sep}`) || filePath.includes('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    }
  }
}));

// Read the HTML template once at startup
const templatePath = path.join(__dirname, 'dist', 'index.html');
let template = '';
try {
  template = fs.readFileSync(templatePath, 'utf-8');
} catch {
  console.warn('[SSR] dist/index.html not found — run npm run build first');
}

// Lazily load the SSR renderer (only present after `npm run build`)
let ssrRender = null;
async function getSSRRenderer() {
  if (ssrRender) return ssrRender;
  const ssrPath = path.join(__dirname, 'dist', 'server', 'entry-server.js');
  if (!fs.existsSync(ssrPath)) return null;
  try {
    const mod = await import(pathToFileURL(ssrPath).href);
    ssrRender = mod.render;
    console.log('[SSR] Renderer loaded');
  } catch (err) {
    console.error('[SSR] Failed to load renderer:', err.message);
  }
  return ssrRender;
}

// Initialize Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://kyllkrozprazwdrzwugq.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bGxrcm96cHJhendkcnp3dWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNzUzODgsImV4cCI6MjA4Nzg1MTM4OH0._PXlfkxKQmT_gV23PahRaJzjaaX7Z30nucy0ix-SQvI";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SITE_URL = process.env.SITE_URL || 'https://qalalabs.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

function isSocialCrawler(ua = '') {
  return /linkedinbot|whatsapp|facebookexternalhit|twitterbot|slackbot|telegrambot|discordbot|applebot|bingbot|googlebot/i.test(ua);
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildOgTags({ title, description, image, url, type = 'website' }) {
  const safeTitle = escapeHtml(title);
  const safeDesc  = escapeHtml(description);
  const imgUrl    = image?.startsWith('http') ? image : image ? `${SITE_URL}${image}` : DEFAULT_OG_IMAGE;
  return `
    <title>${safeTitle} | Qala Labs</title>
    <meta name="description" content="${safeDesc}" />
    <meta property="og:title" content="${safeTitle} | Qala Labs" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:image" content="${imgUrl}" />
    <meta property="og:image:secure_url" content="${imgUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="Qala Labs" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle} | Qala Labs" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${imgUrl}" />`.trim();
}

async function fetchOgData(pathname) {
  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const { data } = await supabase
      .from('blog_posts')
      .select('title, excerpt, image_url')
      .eq('slug', blogMatch[1])
      .single();
    if (data) return { title: data.title, description: data.excerpt, image: data.image_url, type: 'article' };
  }

  const caseMatch = pathname.match(/^\/case-studies\/([^/]+)$/);
  if (caseMatch) {
    const { data } = await supabase
      .from('case_studies')
      .select('title, excerpt, image_url')
      .eq('slug', caseMatch[1])
      .single();
    if (data) return { title: data.title, description: data.excerpt, image: data.image_url, type: 'article' };
  }

  const portfolioMatch = pathname.match(/^\/portfolio\/([^/]+)$/);
  if (portfolioMatch) {
    const { data } = await supabase
      .from('portfolio_projects')
      .select('title, description, image_url')
      .or(`slug.eq.${portfolioMatch[1]},id.eq.${portfolioMatch[1]}`)
      .single();
    if (data) return { title: data.title, description: data.description, image: data.image_url, type: 'article' };
  }

  return null;
}

// Create SMTP transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

// Build rich Google Chat Cards v2 payload
function buildGoogleChatPayload({ email, tool_used, data, ip, timestamp }) {
  const name = data?.name || data?.firstName || '';
  const phone = data?.phone || data?.whatsapp || data?.phoneNumber || '';
  const cleanPhone = phone ? String(phone).replace(/[^0-9]/g, '') : '';
  const website = data?.website || data?.url || data?.brandUrl || '';
  const adSpend = data?.adSpend || data?.monthlySpend || data?.spend || '';
  const notes = data?.notes || data?.message || data?.auditType || data?.goals || '';

  const widgets = [
    {
      decoratedText: {
        topLabel: 'Source / Flow',
        text: `<b>${escapeHtml(tool_used || 'website_lead')}</b>`,
        startIcon: { knownIcon: 'STAR' }
      }
    },
    {
      decoratedText: {
        topLabel: 'Email Address',
        text: `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`,
        startIcon: { knownIcon: 'EMAIL' }
      }
    }
  ];

  if (name) {
    widgets.push({
      decoratedText: {
        topLabel: 'Name / Contact Person',
        text: `<b>${escapeHtml(name)}</b>`,
        startIcon: { knownIcon: 'PERSON' }
      }
    });
  }

  if (phone) {
    widgets.push({
      decoratedText: {
        topLabel: 'Phone / WhatsApp',
        text: `<b>${escapeHtml(phone)}</b>`,
        startIcon: { knownIcon: 'PHONE' }
      }
    });
  }

  if (website) {
    widgets.push({
      decoratedText: {
        topLabel: 'Website / Brand URL',
        text: `<a href="${escapeHtml(website.startsWith('http') ? website : `https://${website}`)}">${escapeHtml(website)}</a>`,
        startIcon: { knownIcon: 'BOOKMARK' }
      }
    });
  }

  if (adSpend) {
    widgets.push({
      decoratedText: {
        topLabel: 'Monthly Ad Spend / Budget',
        text: `<b>${escapeHtml(adSpend)}</b>`,
        startIcon: { knownIcon: 'DOLLAR' }
      }
    });
  }

  if (notes) {
    widgets.push({
      decoratedText: {
        topLabel: 'Objective / Details',
        text: escapeHtml(typeof notes === 'object' ? JSON.stringify(notes) : String(notes)),
        wrapText: true
      }
    });
  }

  // Quick Action Buttons
  const buttons = [];
  if (cleanPhone) {
    buttons.push({
      text: '💬 WhatsApp Chat',
      onClick: {
        openLink: {
          url: `https://wa.me/${cleanPhone}`
        }
      }
    });
  }
  buttons.push({
    text: '✉️ Reply via Email',
    onClick: {
      openLink: {
        url: `mailto:${email}?subject=${encodeURIComponent(`Regarding your growth inquiry | Qala Labs`)}`
      }
    }
  });
  if (website) {
    buttons.push({
      text: '🌐 Visit Website',
      onClick: {
        openLink: {
          url: website.startsWith('http') ? website : `https://${website}`
        }
      }
    });
  }

  const sections = [
    {
      header: 'Lead Details',
      collapsible: false,
      widgets
    }
  ];

  if (buttons.length > 0) {
    sections.push({
      widgets: [
        {
          buttonList: {
            buttons
          }
        }
      ]
    });
  }

  const fallbackText = `🔥 *[NEW LEAD] ${tool_used}*\n*Email:* ${email}${phone ? `\n*Phone:* ${phone}` : ''}${website ? `\n*Website:* ${website}` : ''}${adSpend ? `\n*Spend:* ${adSpend}` : ''}`;

  return {
    text: fallbackText,
    cardsV2: [
      {
        cardId: `lead-${Date.now()}`,
        card: {
          header: {
            title: '🔥 New Inbound Lead',
            subtitle: `Source: ${tool_used} | ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })} IST`,
            imageUrl: 'https://qalalabs.com/favicon.ico',
            imageType: 'CIRCLE'
          },
          sections
        }
      }
    ]
  };
}

// Dispatches lead alert to Google Chat webhook
async function sendGoogleChatAlert(leadInfo) {
  const webhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL || process.env.GOOGLE_CHAT_SPACE_WEBHOOK;
  if (!webhookUrl) return;

  try {
    const payload = buildGoogleChatPayload(leadInfo);
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const errBody = await response.text();
      console.warn('[Google Chat Webhook HTTP Status]:', response.status, errBody);
    }
  } catch (chatErr) {
    console.warn('[Google Chat Webhook Dispatch Error]:', chatErr.message);
  }
}

// Lead processing handler supporting /api/lead and /api/lead.php
async function handleLeadSubmission(req, res) {
  // Honeypot check - reject bot spam silently
  if (req.body.b_url && String(req.body.b_url).trim() !== '') {
    return res.status(200).json({ success: true, message: 'Lead captured' });
  }

  const email = req.body.email?.trim();
  const tool_used = req.body.tool_used || req.body.source || 'website_lead';
  const data = req.body.data || req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const timestamp = new Date().toISOString();

  if (!email) {
    return res.status(400).json({ error: 'Missing email address' });
  }

  try {
    // Optionally persist directly to Supabase leads table
    try {
      await supabase.from('leads').insert({
        email,
        tool_used,
        data: {
          ...data,
          ip,
          timestamp
        }
      });
    } catch (dbErr) {
      console.warn('[DB Lead Insert Warning]:', dbErr.message);
    }

    const { data: template } = await supabase
      .from('email_templates')
      .select('subject, body')
      .eq('tool_used', tool_used)
      .single();

    const defaultTemplate = {
      subject: "We've received your request | Qala Labs",
      body: "Hi {{name}},\n\nThanks for reaching out to Qala Labs. We'll be in touch within 24 hours to schedule your growth audit."
    };

    const activeTemplate = template || defaultTemplate;

    const displayName = (data && data.name) || req.body.name || (data && data.firstName) || "there";
    let personalizedBody = activeTemplate.body.replace(/{{name}}/g, displayName);
    personalizedBody = personalizedBody.replace(/{{(.*?)}}/g, (match, key) => {
      const k = key.trim();
      return (data && data[k]) !== undefined ? data[k] : (req.body[k] !== undefined ? req.body[k] : '');
    });

    // Send confirmation to client
    try {
      await transporter.sendMail({
        from: `"Qala Labs" <${process.env.SMTP_USER || 'hello@qalalabs.com'}>`,
        to: email,
        subject: activeTemplate.subject,
        text: personalizedBody
      });
    } catch (mailErr) {
      console.warn('[SMTP User Mail Warning]:', mailErr.message);
    }

    // Send notification to team (including Google Chat space email if configured)
    const teamRecipients = ['hello@qalalabs.com', 'qalakaar.qalalabs@gmail.com'];
    if (process.env.GOOGLE_CHAT_EMAIL) {
      const gEmail = process.env.GOOGLE_CHAT_EMAIL.trim();
      if (gEmail && !teamRecipients.includes(gEmail)) {
        teamRecipients.push(gEmail);
      }
    }
    if (process.env.TEAM_NOTIFICATION_EMAILS) {
      process.env.TEAM_NOTIFICATION_EMAILS.split(',').forEach(em => {
        const trimmed = em.trim();
        if (trimmed && !teamRecipients.includes(trimmed)) {
          teamRecipients.push(trimmed);
        }
      });
    }

    try {
      const phoneVal = data?.phone || data?.whatsapp || '';
      const cleanPhoneVal = phoneVal ? String(phoneVal).replace(/[^0-9]/g, '') : '';
      const webVal = data?.website || data?.url || '';

      await transporter.sendMail({
        from: `"Qala Labs Lead Engine" <${process.env.SMTP_USER || 'hello@qalalabs.com'}>`,
        to: teamRecipients.join(', '),
        subject: `[NEW LEAD] ${tool_used} - ${email}`,
        text: `New lead captured.\n\nEmail: ${email}\nTool: ${tool_used}\nPhone: ${phoneVal || 'N/A'}\nWebsite: ${webVal || 'N/A'}\n\nData:\n${JSON.stringify(data, null, 2)}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0F17; color: #FFFFFF; border-radius: 12px; padding: 24px; border: 1px solid #1F2937;">
            <div style="border-bottom: 1px solid #374151; padding-bottom: 16px; margin-bottom: 20px;">
              <span style="background: #2563EB; color: #fff; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase;">New Inbound Lead</span>
              <h2 style="margin: 12px 0 4px 0; color: #F9FAFB; font-size: 20px;">${escapeHtml(tool_used)}</h2>
              <p style="margin: 0; color: #9CA3AF; font-size: 13px;">Captured on ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; color: #9CA3AF; font-size: 14px; width: 140px;">Email:</td>
                <td style="padding: 8px 0; color: #FFFFFF; font-size: 14px; font-weight: 600;"><a href="mailto:${escapeHtml(email)}" style="color: #60A5FA; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              ${data?.name ? `<tr><td style="padding: 8px 0; color: #9CA3AF; font-size: 14px;">Name:</td><td style="padding: 8px 0; color: #FFFFFF; font-size: 14px; font-weight: 600;">${escapeHtml(data.name)}</td></tr>` : ''}
              ${phoneVal ? `<tr><td style="padding: 8px 0; color: #9CA3AF; font-size: 14px;">Phone / WhatsApp:</td><td style="padding: 8px 0; color: #FFFFFF; font-size: 14px; font-weight: 600;">${escapeHtml(phoneVal)}</td></tr>` : ''}
              ${webVal ? `<tr><td style="padding: 8px 0; color: #9CA3AF; font-size: 14px;">Website:</td><td style="padding: 8px 0; color: #FFFFFF; font-size: 14px;"><a href="${escapeHtml(webVal.startsWith('http') ? webVal : 'https://' + webVal)}" style="color: #60A5FA; text-decoration: none;">${escapeHtml(webVal)}</a></td></tr>` : ''}
              ${data?.adSpend ? `<tr><td style="padding: 8px 0; color: #9CA3AF; font-size: 14px;">Monthly Spend:</td><td style="padding: 8px 0; color: #34D399; font-size: 14px; font-weight: 600;">${escapeHtml(data.adSpend)}</td></tr>` : ''}
            </table>

            <div style="background: #111827; padding: 16px; border-radius: 8px; border: 1px solid #1F2937; margin-bottom: 24px;">
              <div style="color: #9CA3AF; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Raw Lead Data</div>
              <pre style="margin: 0; font-size: 12px; color: #E5E7EB; white-space: pre-wrap; word-break: break-all;">${escapeHtml(JSON.stringify(data, null, 2))}</pre>
            </div>

            <div style="display: flex; gap: 12px;">
              ${cleanPhoneVal ? `<a href="https://wa.me/${cleanPhoneVal}" style="display: inline-block; background: #25D366; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 600; padding: 10px 18px; border-radius: 6px; margin-right: 10px;">Chat on WhatsApp</a>` : ''}
              <a href="mailto:${escapeHtml(email)}?subject=Re:%20Your%20growth%20inquiry%20with%20Qala%20Labs" style="display: inline-block; background: #2563EB; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 600; padding: 10px 18px; border-radius: 6px;">Reply to Lead</a>
            </div>
          </div>
        `
      });
    } catch (teamMailErr) {
      console.warn('[SMTP Team Notification Warning]:', teamMailErr.message);
    }

    // Instant Google Chat Webhook Alert (Card v2 + text fallback)
    await sendGoogleChatAlert({
      email,
      tool_used,
      data,
      ip,
      timestamp
    });

    // Optional legacy webhook alert (Slack / Discord / generic) if configured
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL || process.env.TEAM_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `🔥 **[NEW LEAD] ${tool_used}**\n**Email:** ${email}\n**Details:**\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``,
            text: `[NEW LEAD] ${tool_used}: ${email}`
          })
        });
      } catch (whErr) {
        console.warn('[Webhook Notification Warning]:', whErr.message);
      }
    }

    res.status(200).json({ success: true, message: 'Lead captured successfully' });
  } catch (error) {
    console.error('Backend Lead Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

// Endpoints to receive lead submissions (supporting standard and PHP legacy paths)
app.post('/api/lead', handleLeadSubmission);
app.post('/api/lead.php', handleLeadSubmission);

// Diagnostic test endpoint for Google Chat webhook integration
app.post('/api/test-google-chat', async (req, res) => {
  const gChatWebhookUrl = req.body.webhookUrl || process.env.GOOGLE_CHAT_WEBHOOK_URL || process.env.GOOGLE_CHAT_SPACE_WEBHOOK;
  if (!gChatWebhookUrl) {
    return res.status(400).json({
      success: false,
      error: 'GOOGLE_CHAT_WEBHOOK_URL is not configured in .env or passed in request body { webhookUrl: "..." }'
    });
  }

  const sampleLead = {
    email: req.body.email || 'growth.prospect@brand.com',
    tool_used: req.body.tool_used || 'interactive_roas_scrubber',
    data: {
      name: req.body.name || 'Sample Founder',
      phone: req.body.phone || '+91 9876543210',
      website: req.body.website || 'https://qalalabs.com',
      adSpend: req.body.adSpend || '₹5,00,000 - ₹10,00,000 / mo',
      notes: 'Testing Google Chat webhook Card v2 alert from Qala Labs Lead Engine'
    },
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    timestamp: new Date().toISOString()
  };

  try {
    const payload = buildGoogleChatPayload(sampleLead);
    const gResponse = await fetch(gChatWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(payload)
    });

    const responseBody = await gResponse.text();
    if (!gResponse.ok) {
      return res.status(gResponse.status).json({
        success: false,
        status: gResponse.status,
        error: responseBody
      });
    }

    let parsedResponse = {};
    try {
      parsedResponse = JSON.parse(responseBody);
    } catch {
      parsedResponse = { raw: responseBody };
    }

    return res.status(200).json({
      success: true,
      message: 'Google Chat alert card dispatched successfully!',
      webhookUrlMasked: gChatWebhookUrl.replace(/key=([^&]{4})[^&]+/, 'key=$1***'),
      response: parsedResponse
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/test-smtp', async (req, res) => {
  const { to } = req.body;
  try {
    await transporter.sendMail({
      from: `"Qala Labs Test" <${process.env.SMTP_USER || 'hello@qalalabs.com'}>`,
      to: to || 'hello@qalalabs.com',
      subject: "SMTP Connection Verified",
      text: "Hostinger SMTP is working."
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for live functioning iframe preview of GaffarIndia
app.get('/api/proxy-gaffar', async (req, res) => {
  try {
    const targetUrl = req.query.url ? String(req.query.url) : 'https://gaffarindia.com/';
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    });

    let html = await response.text();
    html = html.replace(/<head[^>]*>/i, '$&<base href="https://gaffarindia.com/">');
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('[Proxy Error]:', err.message);
    res.status(502).send('Error loading preview');
  }
});

// SSR catch-all — serves all non-API, non-admin GET requests with server-rendered HTML
app.get('{*path}', async (req, res) => {
  if (req.path.startsWith('/api')) return;

  if (!template) {
    return res.status(503).send('App not built yet. Run: npm run build');
  }

  // Serve admin routes as plain SPA shell — no SSR, tell crawlers not to index them
  if (req.path.startsWith('/admin') || req.path.startsWith('/login') || req.path.startsWith('/dashboard') || req.path.startsWith('/onboarding')) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    return res.status(200).set('Content-Type', 'text/html').send(template);
  }

  // For social crawlers, bypass React SSR and inject OG tags directly from Supabase
  if (isSocialCrawler(req.headers['user-agent'])) {
    try {
      const ogData = await fetchOgData(req.path);
      if (ogData) {
        const tags = buildOgTags({ ...ogData, url: `${SITE_URL}${req.path}` });
        const page = template
          .replace('<!--app-head-->', tags)
          .replace('<!--app-html-->', '');
        return res.status(200).set('Content-Type', 'text/html').send(page);
      }
    } catch (err) {
      console.error('[OG] Failed to fetch OG data:', err.message);
    }
  }

  const render = await getSSRRenderer();
  if (!render) {
    // SSR bundle not built — fall back to SPA shell
    return res.status(200).set('Content-Type', 'text/html').send(template);
  }

  try {
    const { html, helmet } = await render(req.originalUrl);

    const helmetTitle    = helmet?.title?.toString()  ?? '';
    const helmetMeta     = helmet?.meta?.toString()   ?? '';
    const helmetLink     = helmet?.link?.toString()   ?? '';
    const helmetScript   = helmet?.script?.toString() ?? '';
    const headInjection  = [helmetMeta, helmetLink, helmetScript].filter(Boolean).join('\n');

    let page = template;

    // Replace fallback <title> with the per-page title from Helmet
    if (helmetTitle) {
      page = page.replace(/<title>[^<]*<\/title>/, helmetTitle);
    }

    // Inject Helmet meta/link/script tags (canonical, OG, description, JSON-LD)
    page = page.replace('<!--app-head-->', headInjection);

    // Inject the server-rendered component HTML into the root div
    page = page.replace('<!--app-html-->', html);

    return res.status(200).set('Content-Type', 'text/html').send(page);
  } catch (err) {
    console.error('[SSR] Render error for', req.originalUrl, err);
    // Graceful fallback — client will render everything
    const fallback = template
      .replace('<!--app-head-->', '')
      .replace('<!--app-html-->', '');
    return res.status(200).set('Content-Type', 'text/html').send(fallback);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));