// Add required modules at the top of the file (after other requires)
  const nodemailer = require('nodemailer');

  // Create SMTP transporter using Hostinger credentials
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

    if (error) {
      console.error('Database error:', error);
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
      const key = key.trim();
      return lead.data.hasOwnProperty(key) ? selectedValue : '';
    });

    // Send email via SMTP    try {
      await transporter.sendMail({
        from: '"Qala Labs" <hello@qalalabs.com>',
        to: email,
        subject: template.subject,
        text: personalizedBody,
        // For richer HTML emails, you could use `html` instead of `text`
      });

      console.log('Email sent successfully to', email);
      res.status(200).json({ success: true, leadId: lead.id });
    } catch (sendError) {
      console.error('Email send error:', sendError);
      res.status(500).json({ error: 'Failed to send email' });
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
      res.status(500).json({ error: 'Failed to send test email' });
    }
  });

  // Add route for fetching email templates (for admin UI)
  app.get('/api/email-templates', async (req, res) => {
    const { data, error } = await supabase
      .from('email_templates')
      .select('tool_used, subject, body')
    if (error) {
      console.error('Error fetching templates:', error);
      return res.status(500).json({ error: 'Failed to fetch templates' });
    }
    res.json(data);
  });