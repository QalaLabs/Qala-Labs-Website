<?php
/**
 * Fallback DB credentials, used only when the SetEnv values in .htaccess
 * aren't picked up (some Hostinger PHP-FPM configurations strip SetEnv).
 *
 * Copy this file to one of the locations db.php checks — recommended:
 * one level above public_html, so it is never served by the web server —
 * fill in the real values, and never commit the copy (it's gitignored).
 */

return [
    'db_host' => 'localhost',
    'db_name' => 'your_database_name',
    'db_user' => 'your_database_user',
    'db_pass' => 'your_database_password',
];
