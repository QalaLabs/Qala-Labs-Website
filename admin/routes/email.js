const express = require('express');
const router = express.Router();

// These will be initialised once imapflow + nodemailer are installed.
// For now the routes return 501 so the frontend can handle "not configured" gracefully.

const getSmtpConfig = async (supabase) => {
  const { data } = await supabase
    .from('integration_configs')
    .select('config, is_active')
    .eq('integration_type', 'smtp')
    .single();
  return data?.is_active ? data.config : null;
};

const getImapConfig = async (supabase) => {
  const { data } = await supabase
    .from('integration_configs')
    .select('config, is_active')
    .eq('integration_type', 'hostinger_imap')
    .single();
  return data?.is_active ? data.config : null;
};

// POST /api/email/send
router.post('/send', async (req, res, next) => {
  try {
    const nodemailer = require('nodemailer');
    const cfg = await getSmtpConfig(req.app.locals.supabase);
    if (!cfg) return res.status(503).json({ error: 'SMTP not configured' });

    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port ?? 465,
      secure: cfg.secure ?? true,
      auth: { user: cfg.user, pass: cfg.pass },
    });

    const { to, subject, html, from_name, reply_to } = req.body;
    await transporter.sendMail({
      from: `"${from_name ?? 'Qala Labs'}" <${cfg.user}>`,
      to,
      subject,
      html,
      ...(reply_to ? { replyTo: reply_to } : {}),
    });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// GET /api/email/inbox
router.get('/inbox', async (req, res, next) => {
  try {
    const { ImapFlow } = require('imapflow');
    const cfg = await getImapConfig(req.app.locals.supabase);
    if (!cfg) return res.status(503).json({ error: 'IMAP not configured' });

    const client = new ImapFlow({
      host: cfg.host,
      port: cfg.port ?? 993,
      secure: true,
      auth: { user: cfg.user, pass: cfg.pass },
      logger: false,
    });

    await client.connect();
    const mailbox = await client.mailboxOpen('INBOX');
    const page = parseInt(req.query.page ?? '1', 10);
    const perPage = 25;

    const messages = [];
    for await (const msg of client.fetch(
      { seq: `${Math.max(1, mailbox.exists - page * perPage + 1)}:${mailbox.exists - (page - 1) * perPage}` },
      { envelope: true, flags: true }
    )) {
      messages.push({
        uid: msg.seq,
        subject: msg.envelope.subject,
        from: msg.envelope.from?.[0],
        date: msg.envelope.date,
        seen: msg.flags.has('\\Seen'),
      });
    }

    await client.logout();
    res.json({ messages: messages.reverse(), total: mailbox.exists });
  } catch (err) {
    next(err);
  }
});

// GET /api/email/message/:uid
router.get('/message/:uid', async (req, res, next) => {
  try {
    const { ImapFlow } = require('imapflow');
    const { simpleParser } = require('mailparser');
    const cfg = await getImapConfig(req.app.locals.supabase);
    if (!cfg) return res.status(503).json({ error: 'IMAP not configured' });

    const client = new ImapFlow({
      host: cfg.host, port: cfg.port ?? 993,
      secure: true, auth: { user: cfg.user, pass: cfg.pass }, logger: false,
    });

    await client.connect();
    await client.mailboxOpen('INBOX');

    let parsed;
    for await (const msg of client.fetch({ seq: req.params.uid }, { source: true })) {
      parsed = await simpleParser(msg.source);
    }

    await client.logout();
    if (!parsed) return res.status(404).json({ error: 'Message not found' });

    res.json({
      subject: parsed.subject,
      from: parsed.from?.text,
      to: parsed.to?.text,
      date: parsed.date,
      html: parsed.html || parsed.textAsHtml,
      text: parsed.text,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
