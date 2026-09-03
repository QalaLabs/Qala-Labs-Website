const express = require('express');
const router = express.Router();

// POST /api/users/create — create a new Supabase user with a role
router.post('/create', async (req, res, next) => {
  try {
    const { email, password, role, first_name, last_name, department, job_title, phone } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'email, password, and role are required' });
    }

    const supabaseAdmin = req.app.locals.supabaseAdmin;

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (authError) return res.status(400).json({ error: authError.message });

    // Upsert profile with role
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: authData.user.id,
        role,
        first_name: first_name ?? null,
        last_name: last_name ?? null,
        department: department ?? null,
        job_title: job_title ?? null,
        phone: phone ?? null,
      });
    if (profileError) return res.status(500).json({ error: profileError.message });

    res.json({ user: authData.user });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/users/:id/role — update a user's role
router.patch('/:id/role', async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['admin', 'employee', 'client'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const { error } = await req.app.locals.supabaseAdmin
      .from('profiles')
      .update({ role })
      .eq('id', req.params.id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/:id — deactivate a user
router.delete('/:id', async (req, res, next) => {
  try {
    const { error } = await req.app.locals.supabaseAdmin
      .from('profiles')
      .update({ is_active: false })
      .eq('id', req.params.id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// GET /api/users — list all users with profiles
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await req.app.locals.supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json({ users: data });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
