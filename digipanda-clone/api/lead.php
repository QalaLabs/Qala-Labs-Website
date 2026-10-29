<?php
/**
 * Lead & Application Capture Endpoint for Hostinger shared hosting (plain PHP, no framework).
 * Accepts payloads from:
 * 1. Appointment / Consultation Bookings
 * 2. General Inquiries & Leads (ContactSection, StickyCTA, ToolsPage)
 * 3. Careers & Talent Applications
 * 4. Creator Collective Applications
 * 5. Agency Collective Partnerships
 * 
 * Inserts into MySQL `leads` & `email_notifications` tables, dispatches tailored
 * multipart HTML+Text emails, and notifies administration.
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/email-helper.php';

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

// --- Detect Intent Category ---
$category = detect_notification_category($source, $description, $companyName);

// --- Insert into MySQL via PDO prepared statement ---

$leadId = null;
$db = null;

try {
    $db = get_db();
    
    // Ensure email_status column exists in leads
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
    $leadId = (int)$db->lastInsertId();
} catch (\Throwable $e) {
    error_log('[lead.php] Lead insert failed: ' . $e->getMessage());
    respond(500, ['success' => false, 'error' => 'Unable to save your inquiry right now']);
}

// --- Generate Tailored Autoresponder Content ---
$userSubject = get_email_subject($category, $name, $companyName);
$userText = get_email_text($category, $name, $companyName, $description);
$userHtml = get_email_html($category, $name, $companyName, $description);

// --- Queue in email_notifications Table (if available) ---
$notificationId = null;
if ($db && $leadId) {
    try {
        $qStmt = $db->prepare(
            'INSERT INTO email_notifications (lead_id, recipient_name, recipient_email, category, subject, body_text, body_html, status)
             VALUES (:lead_id, :name, :email, :category, :subject, :body_text, :body_html, :status)'
        );
        $qStmt->execute([
            ':lead_id' => $leadId,
            ':name' => $name,
            ':email' => $email,
            ':category' => $category,
            ':subject' => $userSubject,
            ':body_text' => $userText,
            ':body_html' => $userHtml,
            ':status' => 'pending',
        ]);
        $notificationId = (int)$db->lastInsertId();
    } catch (\Throwable $qErr) {
        // Table might not exist yet before migration is imported; log and proceed
        error_log('[lead.php] email_notifications queue notice: ' . $qErr->getMessage());
    }
}

// --- Send User Autoresponder & Admin Alert (Fail-Safe Non-Blocking) ---
try {
    // 1. Send Tailored Multipart HTML+Text Autoresponder to User
    $userDispatched = send_qala_email($email, $name, $userSubject, $userText, $userHtml);

    if ($db && $notificationId && $userDispatched) {
        try {
            $uStmt = $db->prepare("UPDATE email_notifications SET status = 'sent', sent_at = CURRENT_TIMESTAMP WHERE id = :id");
            $uStmt->execute([':id' => $notificationId]);
        } catch (\Throwable $uErr) {
            // non-fatal
        }
    }

    // 2. Send Admin Notification Alert
    $adminTo = 'hello@qalalabs.com';
    $catUpper = strtoupper($category);
    $adminSubject = "[{$catUpper}] New Submission: {$name} ({$companyName})";
    $adminHeaders = "From: Qala Labs System <no-reply@qalalabs.com>\r\n" .
                    "Reply-To: {$email}\r\n" .
                    "Content-Type: text/plain; charset=UTF-8\r\n";
    $adminBody = "A new submission has been logged on Qala Labs:\n\n" .
                 "Category: {$catUpper}\n" .
                 "Name: {$name}\n" .
                 "Company / Organization: {$companyName}\n" .
                 "Phone: {$phone}\n" .
                 "Email: {$email}\n" .
                 "Source Route: {$source}\n\n" .
                 "Message / Details:\n{$description}\n\n" .
                 "Submitted At: " . date('Y-m-d H:i:s T') . "\n";
    @mail($adminTo, $adminSubject, $adminBody, $adminHeaders);

} catch (\Throwable $mailErr) {
    error_log('[lead.php] Autoresponder dispatch notice: ' . $mailErr->getMessage());
}

respond(200, [
    'success' => true,
    'message' => 'Lead captured successfully',
]);
