const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle API routes (placeholders for n8n/HubSpot)
app.post('/api/leads', (req, res) => {
  // Forward to n8n webhook: [[ENV:N8N_WEBHOOK_URL]]
  res.status(200).json({ success: true });
});

// All other routes serve the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});