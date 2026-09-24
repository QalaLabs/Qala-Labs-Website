<?php
// Copy this file to lead-mail.config.php (gitignored) and fill in real values.
// On Hostinger, place lead-mail.config.php OUTSIDE public_html — e.g. in the
// account home directory one level above public_html — and adjust the
// require_once path in public/api/lead.php accordingly. Never commit real
// credentials.

return [
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 465,
    'smtp_secure' => 'ssl', // 'ssl' for port 465, 'tls' for port 587
    'smtp_user' => 'hello@qalalabs.com',
    'smtp_pass' => 'REPLACE_ME',
];
