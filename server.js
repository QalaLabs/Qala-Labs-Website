const express = require('express');
const path = require('path');
const fs = require('fs');
const supabase = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint for cloud load balancers and platform monitors
app.get(['/health', '/api/health'], (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: supabase ? 'connected' : 'unconfigured'
  });
});

// In-memory sliding window cache to deduplicate concurrent submissions
const recentSubmissions = new Map();
const DEDUP_WINDOW_MS = 10_000;

function checkAndRecordSubmission(key) {
  const now = Date.now();
  for (const [k, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > DEDUP_WINDOW_MS) {
      recentSubmissions.delete(k);
    }
  }
  if (recentSubmissions.has(key)) {
    return true;
  }
  recentSubmissions.set(key, now);
  return false;
}

// Lead API endpoint (/api/lead)
app.post('/api/lead', async (req, res) => {
  try {
    const { name, email, phone, companyName, description, budget, timeline, source, b_url } = req.body || {};

    // Honeypot check
    if (b_url) {
      return res.status(200).json({ success: true, message: 'Lead captured successfully' });
    }

    if (!email || !name) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }

    const dedupKey = `${email.toLowerCase()}_${(name || '').toLowerCase()}`;
    if (checkAndRecordSubmission(dedupKey)) {
      return res.status(200).json({ success: true, message: 'Lead already received' });
    }

    const leadData = {
      name: String(name).trim(),
      companyName: companyName ? String(companyName).trim() : null,
      phone: phone ? String(phone).trim() : null,
      email: String(email).trim().toLowerCase(),
      description: description ? String(description).trim() : null,
      budget: budget || null,
      timeline: timeline || null,
      source: source || 'website',
      createdAt: new Date().toISOString()
    };

    console.log('[Lead Captured]', leadData);

    if (supabase) {
      try {
        await supabase.from('leads').insert([leadData]);
      } catch (dbErr) {
        console.error('[DB Insert Warning]', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Lead captured successfully',
      data: leadData
    });
  } catch (error) {
    console.error('[Lead Error]', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Check if frontend build exists in digipanda-clone/dist
const distPath = path.join(__dirname, 'digipanda-clone', 'dist');
if (fs.existsSync(distPath)) {
  console.log(`Serving static frontend from ${distPath}`);
  app.use(express.static(distPath));

  // Express 5 compatible SPA fallback
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    if (req.path.startsWith('/api') || req.path === '/health') return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      message: 'Qala Labs Website API',
      status: 'online',
      version: '1.0.0',
      routes: ['/health', '/api/health', '/api/lead']
    });
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
