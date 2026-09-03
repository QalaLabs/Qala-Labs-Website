const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config({ path: path.join(__dirname, 'config.env') });

// Supabase clients — anon for user-context ops, service role for admin ops
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY
);

app.locals.supabase = supabase;
app.locals.supabaseAdmin = supabaseAdmin;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:8080',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── JWT auth middleware ───────────────────────────────────────────────────────
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: 'Invalid or expired token' });

  req.user = user;
  next();
};

// Admin-only middleware (checks role in profiles table)
const requireAdmin = async (req, res, next) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', req.user.id)
    .single();

  if (profile?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

app.locals.verifyToken = verifyToken;
app.locals.requireAdmin = requireAdmin;

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/users', verifyToken, requireAdmin, require('./routes/users'));
app.use('/api/email', verifyToken, require('./routes/email'));
app.use('/api/whatsapp', require('./routes/whatsapp'));
app.use('/api/chatbot', verifyToken, require('./routes/chatbot'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message || 'Internal server error' });
});

const http = require('http').createServer(app);
http.listen(process.env.PORT ?? 5000, () => {
  console.log(`Qala Labs API running on http://localhost:${process.env.PORT ?? 5000}`);
});
