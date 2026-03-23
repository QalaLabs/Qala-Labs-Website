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
  secure: true, // Use SSL
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
    // Insert lead into database
    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert({
        email: email,
        tool_used: tool_used,
        data: data || {},
        timestamp: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Database error' });
    }

    // Fetch email template based on tool_used
    const { data: template, error: templateError } = await supabase
      .from('email_templates')
      .select('subject, body')
      .eq('tool_used', tool_used)
      .single();

    if (templateError || !template) {
      console.error('Template not found for tool:', tool_used);
      return res.status(400).json({ error: 'Email template not found' });
    }

    // Personalize template with lead data
    const personalizedBody = template.body.replace(/{{(.*?)}}/g, (match, key) => {
      const k = key.trim();
      return (lead.data && lead.data[k]) || lead[k] || match;
    });

    // 1. Send confirmation email to the lead
    await transporter.sendMail({
      from: '"Qala Labs" <hello@qalalabs.com>',
      to: email,
      subject: template.subject,
      text: personalizedBody
    });

    // 2. Send BCC notification to admin with full data
    await transporter.sendMail({
      from: '"Qala Labs Lead Engine" <hello@qalalabs.com>',
      to: 'hello@qalalabs.com',
      subject: `[NEW LEAD] ${tool_used} - ${email}`,
      text: `A new lead has been captured.\n\nLead Email: ${email}\nTool Used: ${tool_used}\n\nFull Data Payload:\n${JSON.stringify(data, null, 2)}`
    });

    console.log('Emails sent successfully for lead:', email);
    res.status(200).json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error('Process error:', error);
    res.status(500).json({ error: 'Failed to process lead or send email' });
  }
});

// Test endpoint to send a test email
app.post('/api/test-email', async (req, res) => {
  const { to, subject, body } = req.body;
  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await transporter.sendMail({
      from: '"Qala Labs" <hello@qalalabs.com>',
      to: to,
      subject: subject,
      text: body
    });
    res.status(200).json({ success: true, message: 'Test email sent' });
  } catch (error) {
    console.error('Test email failed:', error);
    res.status(500).json({ error: 'Failed to send test email: ' + error.message });
  }
});

// Add route for fetching email templates (for admin UI)
app.get('/api/email-templates', async (req, res) => {
  const { data, error } = await supabase
    .from('email_templates')
    .select('tool_used, subject, body');
  if (error) {
    console.error('Error fetching templates:', error);
    return res.status(500).json({ error: 'Failed to fetch templates' });
  }
  res.json(data);
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));