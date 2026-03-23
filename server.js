const express = require('express');
const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const app = express();
app.use(express.json());

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Create SMTP transporter using Hostinger credentials (SSL on Port 465)
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'hello@qalalabs.com',
    pass: 'Qala_labs124'
  }
});

// Endpoint to receive lead submissions and send personalized email
app.post('/api/lead', async (req, res) => {
  const { email, tool_used, data } = req.body;
  
  if (!email || !tool_used) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Fetch email template based on tool_used
    const { data: template, error: templateError } = await supabase
      .from('email_templates')
      .select('subject, body')
      .eq('tool_used', tool_used)
      .single();

    // Fallback template if one isn't found in DB
    const defaultTemplate = {
      subject: "We've received your request | Qala Labs",
      body: "Hi {{name}},\n\nThanks for reaching out to Qala Labs. Our team has received your submission via {{tool_used}} and we are reviewing it now.\n\nWe'll be in touch within 24 hours.\n\nBest,\nQala Labs Team"
    };

    const activeTemplate = template || defaultTemplate;

    // 2. Personalize template with lead data
    const personalizedBody = activeTemplate.body.replace(/{{(.*?)}}/g, (match, key) => {
      const k = key.trim();
      return (data && data[k]) || (req.body[k]) || match;
    });

    // 3. Send confirmation email to the lead
    await transporter.sendMail({
      from: '"Qala Labs" <hello@qalalabs.com>',
      to: email,
      subject: activeTemplate.subject,
      text: personalizedBody
    });

    // 4. Send notification to admin team (including qalakaar address)
    await transporter.sendMail({
      from: '"Qala Labs Lead Engine" <hello@qalalabs.com>',
      to: 'hello@qalalabs.com, qalakaar.qalalabs@gmail.com',
      subject: `[NEW LEAD] ${tool_used} - ${email}`,
      text: `A new lead has been captured.\n\nLead Email: ${email}\nTool Used: ${tool_used}\n\nFull Data Payload:\n${JSON.stringify(data, null, 2)}`
    });

    console.log('Emails sent successfully for lead:', email);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Process error:', error);
    res.status(500).json({ error: 'Failed to process lead or send email' });
  }
});

// Endpoint to test SMTP connection
app.post('/api/test-smtp', async (req, res) => {
  const { to } = req.body;
  if (!to) return res.status(400).json({ error: 'Recipient email required' });

  try {
    await transporter.sendMail({
      from: '"Qala Labs Test" <hello@qalalabs.com>',
      to: to,
      subject: "SMTP Connection Verified",
      text: "Your Hostinger SMTP configuration is working perfectly. The Qala Labs scale engine is ready to communicate."
    });
    res.status(200).json({ success: true, message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('SMTP Test Error:', error);
    res.status(500).json({ error: 'SMTP Test Failed: ' + error.message });
  }
});

// Admin: Fetch all templates
app.get('/api/templates', async (req, res) => {
  const { data, error } = await supabase.from('email_templates').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Admin: Update or Create template
app.post('/api/templates', async (req, res) => {
  const { tool_used, subject, body } = req.body;
  const { data, error } = await supabase
    .from('email_templates')
    .upsert({ tool_used, subject, body, updated_at: new Date().toISOString() }, { onConflict: 'tool_used' });
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));