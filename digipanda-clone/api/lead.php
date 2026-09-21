<?php
/**
 * Lead capture endpoint for Hostinger shared hosting (plain PHP, no framework).
 * Accepts the digiPanda-clone contact form's {name, companyName, phone, email,
 * description} payload, inserts it into the MySQL `leads` table via a prepared
 * statement, and returns real JSON + HTTP status codes so the frontend can
 * tell success from failure.
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'error' => 'Method not allowed']);
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '', true);

if (!is_array($payload)) {
    respond(400, ['success' => false, 'error' => 'Invalid JSON body']);
}

// Honeypot bot protection — silently accept so bots don't learn the field was checked.
if (!empty($payload['b_url'])) {
    respond(200, ['success' => true]);
}

// --- Validate & sanitize input (never trust the POST body directly) ---

function sanitize_text(string $value, int $maxLength): string
{
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', '', $value) ?? '';
    return mb_substr(trim($value), 0, $maxLength);
}

$name = sanitize_text((string)($payload['name'] ?? ''), 255);
if ($name === '') {
    respond(400, ['success' => false, 'error' => 'Name is required']);
}

$companyName = sanitize_text((string)($payload['companyName'] ?? ''), 255);
if ($companyName === '') {
    respond(400, ['success' => false, 'error' => 'Company name is required']);
}

$phone = sanitize_text((string)($payload['phone'] ?? ''), 32);
if ($phone === '' || !preg_match('/^[0-9+\-\s()]{5,32}$/', $phone)) {
    respond(400, ['success' => false, 'error' => 'A valid phone number is required']);
}

$email = filter_var(trim((string)($payload['email'] ?? '')), FILTER_VALIDATE_EMAIL);
if ($email === false) {
    respond(400, ['success' => false, 'error' => 'A valid email is required']);
}

$description = sanitize_text((string)($payload['description'] ?? ''), 5000);
if ($description === '') {
    respond(400, ['success' => false, 'error' => 'Description is required']);
}

$source = sanitize_text((string)($payload['source'] ?? 'contact_section'), 64);
if ($source === '' || !preg_match('/^[a-zA-Z0-9_\-]{1,64}$/', $source)) {
    $source = 'contact_section';
}

// --- Insert via PDO prepared statement (no string-concatenated SQL) ---

try {
    $db = get_db();
    $stmt = $db->prepare(
        'INSERT INTO leads (name, company_name, phone, email, description, source)
         VALUES (:name, :company_name, :phone, :email, :description, :source)'
    );
    $stmt->execute([
        ':name' => $name,
        ':company_name' => $companyName,
        ':phone' => $phone,
        ':email' => $email,
        ':description' => $description,
        ':source' => $source,
    ]);
} catch (\Throwable $e) {
    error_log('[lead.php] Lead insert failed: ' . $e->getMessage());
    respond(500, ['success' => false, 'error' => 'Unable to save your inquiry right now']);
}

respond(200, ['success' => true]);
