<?php
/**
 * Lead capture endpoint for Hostinger shared hosting (plain PHP, no framework).
 * Accepts the Qala Labs contact form's {name, companyName, phone, email,
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

// --- Send Autoresponder & Admin Notification (fail-safe non-blocking) ---
try {
    $adminTo = 'hello@qalalabs.com';
    $adminSubject = "New Lead Capture: {$name} ({$companyName})";
    $adminHeaders = "From: Qala Labs System <no-reply@qalalabs.com>\r\n" .
                    "Reply-To: {$email}\r\n" .
                    "Content-Type: text/plain; charset=UTF-8\r\n";
    $adminBody = "New inquiry submitted on Qala Labs:\n\n" .
                 "Name: {$name}\n" .
                 "Company: {$companyName}\n" .
                 "Phone: {$phone}\n" .
                 "Email: {$email}\n" .
                 "Source: {$source}\n\n" .
                 "Message / Details:\n{$description}\n\n" .
                 "Submitted At: " . date('Y-m-d H:i:s T') . "\n";
    @mail($adminTo, $adminSubject, $adminBody, $adminHeaders);

    // Dynamic autoresponder to applicant / potential client
    $isCareer = ($source === 'careers_form' || str_contains($source, 'career'));
    $userSubject = $isCareer
        ? "Application Received: Qala Labs Growth & Engineering"
        : "Thank You for Contacting Qala Labs | Discovery Confirmed";

    $userHeaders = "From: Qala Labs Team <hello@qalalabs.com>\r\n" .
                   "Reply-To: hello@qalalabs.com\r\n" .
                   "Content-Type: text/plain; charset=UTF-8\r\n";

    if ($isCareer) {
        $userBody = "Hi {$name},\n\n" .
                    "Thank you for your interest in joining Qala Labs.\n\n" .
                    "We have received your application. Our core team reviews every submission with care. If your background and drive align with our current sprint openings, we will reach out within 3-5 business days to schedule an introductory conversation.\n\n" .
                    "In the meantime, feel free to explore our case studies and open-source growth frameworks at https://qalalabs.com/case-studies\n\n" .
                    "Best regards,\n" .
                    "The Qala Labs Engineering & Talent Team\n" .
                    "https://qalalabs.com\n";
    } else {
        $userBody = "Hi {$name},\n\n" .
                    "Thank you for contacting Qala Labs. We have received your inquiry regarding {$companyName}.\n\n" .
                    "Our growth strategy and performance team is reviewing your requirements. A specialist will get back to you within 24 hours.\n\n" .
                    "If you would like to connect right away:\n" .
                    "- Direct WhatsApp: https://wa.me/916006760151\n" .
                    "- Schedule a 30-minute Google Meet: https://calendar.app.google/EvA2Kw9rgA4xq8798\n\n" .
                    "Best regards,\n" .
                    "Aashirwad Bhansali & The Qala Labs Team\n" .
                    "Growth & Performance Strategy, Qala Labs\n" .
                    "https://qalalabs.com\n";
    }

    @mail($email, $userSubject, $userBody, $userHeaders);
} catch (\Throwable $mailErr) {
    error_log('[lead.php] Autoresponder dispatch notice: ' . $mailErr->getMessage());
}

respond(200, ['success' => true]);
