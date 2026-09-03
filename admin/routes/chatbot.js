const express = require('express');
const router = express.Router();

// POST /api/chatbot/message — proxy to Claude API with streaming
router.post('/message', async (req, res, next) => {
  try {
    const { data: cfgRow } = await req.app.locals.supabase
      .from('integration_configs')
      .select('config, is_active')
      .eq('integration_type', 'claude_api')
      .single();

    const apiKey = cfgRow?.config?.api_key ?? process.env.CLAUDE_API_KEY;
    if (!apiKey) return res.status(503).json({ error: 'Claude API not configured' });

    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic({ apiKey });

    const { message, conversation_history = [], system_prompt } = req.body;

    const systemPrompt = system_prompt
      ?? cfgRow?.config?.system_prompt
      ?? 'You are a helpful assistant for Qala Labs, a digital marketing and AI automation agency.';

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        ...conversation_history,
        { role: 'user', content: message },
      ],
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
