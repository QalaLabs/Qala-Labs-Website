<?php
/**
 * PDO connection helper for Hostinger MySQL shared hosting.
 * Credentials are never hardcoded. Preferred source is the environment
 * (SetEnv in api/.htaccess, copied from api/.htaccess.example). If a
 * Hostinger PHP-FPM setup strips SetEnv, this falls back to a config file
 * kept outside the web root (copied from api/db-credentials.example.php).
 */

declare(strict_types=1);

function get_db(): PDO
{
    $configCandidates = [
        __DIR__ . '/../../db-credentials.php',   // recommended: one level above public_html on Hostinger
        __DIR__ . '/db-credentials.php',          // repo-local convenience (gitignored)
    ];

    $config = null;
    foreach ($configCandidates as $path) {
        if (is_file($path)) {
            $config = require $path;
            break;
        }
    }

    $host = getenv('DB_HOST') ?: ($config['db_host'] ?? 'localhost');
    $name = getenv('DB_NAME') ?: ($config['db_name'] ?? '');
    $user = getenv('DB_USER') ?: ($config['db_user'] ?? '');
    $pass = getenv('DB_PASS') ?: ($config['db_pass'] ?? '');

    if ($name === '' || $user === '') {
        error_log('[db.php] Missing DB credentials — set env vars via .htaccess or add db-credentials.php');
        throw new RuntimeException('Database is not configured on the server');
    }

    $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";

    return new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}
