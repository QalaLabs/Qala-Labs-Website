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
    user: process.env.SMTP_USER || 'hello@qalalabs.com',
    pass: process.env.SMTP_PASS || 'Qala_labs124'
  }
});

// Lead processing handler supporting /api/lead and /api/lead.php
async function handleLeadSubmission(req, res) {
  const email = req.body.email?.trim();
  const tool_used = req.body.tool_used || req.body.source || 'website_lead';
  const data = req.body.data || req.body;

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
          ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
          timestamp: new Date().toISOString()
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

    const personalizedBody = activeTemplate.body.replace(/{{(.*?)}}/g, (match, key) => {
      const k = key.trim();
      return (data && data[k]) || (req.body[k]) || match;
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

    // Send notification to team
    try {
      await transporter.sendMail({
        from: `"Qala Labs Lead Engine" <${process.env.SMTP_USER || 'hello@qalalabs.com'}>`,
        to: 'hello@qalalabs.com, qalakaar.qalalabs@gmail.com',
        subject: `[NEW LEAD] ${tool_used} - ${email}`,
        text: `New lead captured.\n\nEmail: ${email}\nTool: ${tool_used}\n\nData:\n${JSON.stringify(data, null, 2)}`
      });
    } catch (teamMailErr) {
      console.warn('[SMTP Team Notification Warning]:', teamMailErr.message);
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