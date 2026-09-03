
const express = require('express');
const route = express.Router();

// ── Auth middleware ──────────────────────────────────────────────────────────
const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) return next();
  res.redirect('/auth-login');
};

// ── Lead scoring (mirrors React utils/admin.ts) ──────────────────────────────
const calculateLeadScore = (lead) => {
  let score = 0;
  const data = lead.data || {};
  const rev = data.revenue || data.budget || '';
  if (rev.includes('50L+') || rev.includes('25L+')) score += 50;
  if (rev.includes('15L-50L') || rev.includes('5-25L')) score += 30;
  if (data.service === 'eCommerce Growth' || data.service === 'Performance Marketing') score += 20;
  if (lead.tool_used === 'agency_network_join' || lead.tool_used === 'creator_onboarding_v2') score += 10;
  return score;
};

const getLeadInterest = (lead) => {
  if (lead.data?.service) return lead.data.service;
  if (lead.tool_used === 'agency_network_join') return 'Agency Network';
  if (lead.tool_used === 'creator_onboarding_v2') return 'Creator Collective';
  if (lead.tool_used === 'scale_potential_quiz') return 'Scale Quiz';
  return 'General Inquiry';
};

// ── Auth routes ───────────────────────────────────────────────────────────────
route.get('/auth-login', (req, res) => {
  if (req.session?.user) return res.redirect('/');
  res.render('auth-login', { title: 'Login – Qala Labs Admin', layout: 'partials/base', error: null });
});

route.post('/auth-login', async (req, res) => {
  const { email, password } = req.body;
  const supabase = req.app.locals.supabase;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return res.render('auth-login', { title: 'Login – Qala Labs Admin', layout: 'partials/base', error: 'Invalid email or password.' });
  }
  req.session.user = { id: data.user.id, email: data.user.email };
  res.redirect('/');
});

route.get('/auth-logout', (req, res) => {
  req.session.destroy(() => res.redirect('/auth-login'));
});

// ── Dashboard (index) ─────────────────────────────────────────────────────────
route.get(['/', '/index'], requireAuth, async (req, res) => {
  const supabase = req.app.locals.supabase;
  const [leadsRes, studiesRes, portfolioRes, blogsRes] = await Promise.all([
    supabase.from('leads').select('*').order('created_at', { ascending: false }),
    supabase.from('case_studies').select('id', { count: 'exact', head: true }),
    supabase.from('portfolio_projects').select('id', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
  ]);

  const leads = leadsRes.data || [];
  const highLeads = leads.filter(l => calculateLeadScore(l) >= 50).length;
  const medLeads  = leads.filter(l => { const s = calculateLeadScore(l); return s >= 30 && s < 50; }).length;

  // Leads over last 7 days for sparkline
  const now = Date.now();
  const dayMs = 86400000;
  const leadsLast7 = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(now - (6 - i) * dayMs);
    const label = day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const count = leads.filter(l => {
      const d = new Date(l.created_at);
      return d.toDateString() === day.toDateString();
    }).length;
    return { label, count };
  });

  res.render('index', {
    title: 'Dashboard – Qala Labs Admin',
    user: req.session.user,
    stats: {
      totalLeads: leads.length,
      highLeads,
      medLeads,
      caseStudies: studiesRes.count || 0,
      portfolio: portfolioRes.count || 0,
      blogs: blogsRes.count || 0,
    },
    recentLeads: leads.slice(0, 5),
    leadsLast7: JSON.stringify(leadsLast7),
    calculateLeadScore,
    getLeadInterest,
  });
});

// ── Leads CRM ─────────────────────────────────────────────────────────────────
route.get('/leads', requireAuth, async (req, res) => {
  const supabase = req.app.locals.supabase;
  const { search = '', service = 'all', score = 'all' } = req.query;

  let leads = [];
  const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
  leads = data || [];

  // Filter
  const filtered = leads.filter(lead => {
    const interest = getLeadInterest(lead);
    const s = calculateLeadScore(lead);
    const matchesSearch = !search ||
      (lead.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (lead.data?.name || '').toLowerCase().includes(search.toLowerCase());
    const matchesService = service === 'all' || interest === service;
    const matchesScore = score === 'all' ||
      (score === 'high' && s >= 50) ||
      (score === 'medium' && s >= 30 && s < 50) ||
      (score === 'low' && s < 30);
    return matchesSearch && matchesService && matchesScore;
  });

  const services = [
    'Performance Marketing', 'Creative Production', 'Web Development',
    'Conversion Optimization', 'Analytics & Data', 'eCommerce Growth',
    'Agency Network', 'Creator Collective'
  ];

  res.render('leads', {
    title: 'CRM Leads – Qala Labs Admin',
    user: req.session.user,
    leads: filtered,
    totalLeads: leads.length,
    search, service, score,
    services,
    calculateLeadScore,
    getLeadInterest,
  });
});

// ── CSV Export ───────────────────────────────────────────────────────────────
route.get('/leads/export', requireAuth, async (req, res) => {
  const supabase = req.app.locals.supabase;
  const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
  const leads = data || [];

  const headers = ['Date', 'Name', 'Email', 'Interest', 'Score', 'Status', 'Revenue/Budget', 'Source'];
  const rows = leads.map(lead => {
    const d = lead.data || {};
    const score = calculateLeadScore(lead);
    const interest = getLeadInterest(lead);
    return [
      new Date(lead.created_at).toISOString().split('T')[0],
      (d.name || 'Anonymous').replace(/,/g, ' '),
      lead.email,
      interest,
      score,
      d.status || 'new',
      (d.revenue || d.budget || 'N/A').replace(/,/g, ' '),
      d.source_url || 'Direct'
    ].join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');
  const date = new Date().toISOString().split('T')[0];
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="qala_leads_${date}.csv"`);
  res.send(csv);
});

// ── Lead detail (JSON API for modal) ─────────────────────────────────────────
route.get('/api/leads/:id', requireAuth, async (req, res) => {
  const supabase = req.app.locals.supabase;
  const { data, error } = await supabase.from('leads').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: 'Not found' });
  res.json(data);
});

route.patch('/api/leads/:id', requireAuth, async (req, res) => {
  const supabase = req.app.locals.supabase;
  const { data, error } = await supabase.from('leads').update({ data: req.body }).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ── Keep original template routes (for UI reference) ─────────────────────────
route.get('/calendar', requireAuth, (req, res) => res.render('calendar', { title: 'Calendar', user: req.session.user }));
route.get('/tables-basic', requireAuth, (req, res) => res.render('tables-basic', { title: 'Tables', user: req.session.user }));
route.get('/tables-datatables', requireAuth, (req, res) => res.render('tables-datatables', { title: 'Data Tables', user: req.session.user }));

route.get('/error-404', (req, res) => res.render('error-404', { title: 'Error 404', layout: 'partials/base' }));
route.get('/error-500', (req, res) => res.render('error-500', { title: 'Error 500', layout: 'partials/base' }));
route.get('/offline-page', (req, res) => res.render('offline-page', { title: 'Offline', layout: 'partials/base' }));

module.exports = route;
