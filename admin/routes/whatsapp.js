const express = require('express');
const router = express.Router();

const getWhatsAppConfig = async (supabase) => {
  const { data } = await supabase
    .from('integration_configs')
    .select('config, is_active')
    .eq('integration_type', 'whatsapp')
    .single();
  return data?.is_active ? data.config : null;
};

// POST /api/whatsapp/send (protected by caller — verifyToken applied in app.js only for non-webhook routes)
router.post('/send', async (req, res, next) => {
  try {
    const cfg = await getWhatsAppConfig(req.app.locals.supabase);
    if (!cfg) return res.status(503).json({ error: 'WhatsApp not configured' });

    const { to, message } = req.body;
    // Twilio WhatsApp
    if (cfg.provider === 'twilio') {
      const twilio = require('twilio')(cfg.account_sid, cfg.auth_token);
      const result = await twilio.messages.create({
        body: message,
        from: `whatsapp:${cfg.from_number}`,
        to: `whatsapp:${to}`,
      });
      return res.json({ sid: result.sid });
    }

    res.status(400).json({ error: 'Unsupported WhatsApp provider' });
  } catch (err) {
    next(err);
  }
});

// POST /api/whatsapp/webhook — inbound messages from Twilio
router.post('/webhook', express.urlencoded({ extended: false }), async (req, res, next) => {
  try {
    const { From, Body } = req.body;
    const supabase = req.app.locals.supabase;

    // Store inbound message in chat_messages (conversation lookup TBD)
    await supabase.from('chat_messages').insert({
      sender_id: null,
      content: `[WhatsApp from ${From}]: ${Body}`,
      message_type: 'text',
    });

    res.type('text/xml').send('<Response></Response>');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
