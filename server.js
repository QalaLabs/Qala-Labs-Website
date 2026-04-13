import express from 'express';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static assets (JS, CSS, images) — index:false so SSR catch-all handles HTML requests
app.use(express.static(path.join(__dirname, 'dist'), { index: false }));

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
    const mod = await import(ssrPath);
    ssrRender = mod.render;
    console.log('[SSR] Renderer loaded');
  } catch (err) {
    console.error('[SSR] Failed to load renderer:', err.message);
  }
  return ssrRender;
}

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

// Create SMTP transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'hello@qalalabs.com',
    pass: process.env.SMTP_PASS || 'Qala_labs124'
  }
});

// Endpoint to receive lead submissions
app.post('/api/lead', async (req, res) => {
  const { email, tool_used, data } = req.body;
  
  if (!email || !tool_used) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data: template } = await supabase
      .from('email_templates')
      .select('subject, body')
      .eq('tool_used', tool_used)
      .single();

    const defaultTemplate = {
      subject: "We've received your request | Qala Labs",
      body: "Hi {{name}},\n\nThanks for reaching out to Qala Labs. We'll be in touch within 24 hours."
    };

    const activeTemplate = template || defaultTemplate;

    const personalizedBody = activeTemplate.body.replace(/{{(.*?)}}/g, (match, key) => {
      const k = key.trim();
      return (data && data[k]) || (req.body[k]) || match;
    });

    await transporter.sendMail({
      from: `"Qala Labs" <${process.env.SMTP_USER || 'hello@qalalabs.com'}>`,
      to: email,
      subject: activeTemplate.subject,
      text: personalizedBody
    });

    await transporter.sendMail({
      from: `"Qala Labs Lead Engine" <${process.env.SMTP_USER || 'hello@qalalabs.com'}>`,
      to: 'hello@qalalabs.com, qalakaar.qalalabs@gmail.com',
      subject: `[NEW LEAD] ${tool_used} - ${email}`,
      text: `New lead captured.\n\nEmail: ${email}\nTool: ${tool_used}\n\nData:\n${JSON.stringify(data, null, 2)}`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Backend Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

// SSR catch-all — serves all non-API, non-admin GET requests with server-rendered HTML
app.get('*', async (req, res) => {
  if (req.path.startsWith('/api')) return;

  if (!template) {
    return res.status(503).send('App not built yet. Run: npm run build');
  }

  // Serve admin routes as plain SPA shell — no SSR, tell crawlers not to index them
  if (req.path.startsWith('/admin') || req.path.startsWith('/login') || req.path.startsWith('/dashboard') || req.path.startsWith('/onboarding')) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    return res.status(200).set('Content-Type', 'text/html').send(template);
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