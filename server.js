import express from 'express';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

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

// Endpoint to receive lead submissions
app.post('/api/lead', async (req, res) => {
  const { email, tool_used, data } = req.body;
  
  if (!email || !tool_used) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data: template } = await supabase
      .from('email_templates')
      .select('subject, body')
      .eq('tool_used', tool_used)
      .single();

    const defaultTemplate = {
      subject: "We've received your request | Qala Labs",
      body: "Hi {{name}},\n\nThanks for reaching out to Qala Labs. We'll be in touch within 24 hours."
    };

    const activeTemplate = template || defaultTemplate;

    const personalizedBody = activeTemplate.body.replace(/{{(.*?)}}/g, (match, key) => {
      const k = key.trim();
      return (data && data[k]) || (req.body[k]) || match;
    });

    await transporter.sendMail({
      from: `"Qala Labs" <${process.env.SMTP_USER || 'hello@qalalabs.com'}>`,
      to: email,
      subject: activeTemplate.subject,
      text: personalizedBody
    });

    await transporter.sendMail({
      from: `"Qala Labs Lead Engine" <${process.env.SMTP_USER || 'hello@qalalabs.com'}>`,
      to: 'hello@qalalabs.com, qalakaar.qalalabs@gmail.com',
      subject: `[NEW LEAD] ${tool_used} - ${email}`,
      text: `New lead captured.\n\nEmail: ${email}\nTool: ${tool_used}\n\nData:\n${JSON.stringify(data, null, 2)}`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Backend Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

// Catch-all to serve React App
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));