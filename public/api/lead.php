<?php
/**
 * Lead notification endpoint for Hostinger shared hosting (plain PHP, no framework).
 * Accepts the same {email, tool_used, data} payload the React lead forms already
 * POST to /api/lead, sends a notification email, and returns real JSON + HTTP
 * status codes so the frontend can tell success from failure.
 *
 * The client-side Supabase insert (the actual lead record) happens separately
 * in the frontend and is untouched by this file — this is only the email leg.
 */

declare(strict_types=1);

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

// --- Validate & sanitize input (never trust the POST body directly) ---

$email = filter_var(trim((string)($payload['email'] ?? '')), FILTER_VALIDATE_EMAIL);
if ($email === false) {
    respond(400, ['success' => false, 'error' => 'A valid email is required']);
}

$toolUsedRaw = trim((string)($payload['tool_used'] ?? ''));
if ($toolUsedRaw === '' || !preg_match('/^[a-zA-Z0-9_\-]{1,64}$/', $toolUsedRaw)) {
    respond(400, ['success' => false, 'error' => 'A valid tool_used identifier is required']);
}
$toolUsed = $toolUsedRaw;

/**
 * The `data` field is an arbitrary object of form fields. Flatten it into
 * plain-text "Key: Value" lines, stripping control characters and capping
 * length/depth so nothing oversized or header-injection-shaped ends up in
 * the email body.
 */
function sanitize_scalar($value): string
{
    $str = is_scalar($value) ? (string)$value : json_encode($value);
    $str = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/', '', $str ?? '');
    return mb_substr(trim((string)$str), 0, 2000);
}

function flatten_data($data, string $prefix = ''): array
{
    $lines = [];
    if (!is_array($data)) {
        return [$prefix ?: 'value' => sanitize_scalar($data)];
    }
    $count = 0;
    foreach ($data as $key => $value) {
        if (++$count > 50) {
            break; // cap number of fields
        }
        $safeKey = preg_replace('/[^a-zA-Z0-9_\-.]/', '_', (string)$key);
        $label = $prefix !== '' ? "{$prefix}.{$safeKey}" : $safeKey;
        if (is_array($value)) {
            $lines += flatten_data($value, $label);
        } else {
            $lines[$label] = sanitize_scalar($value);
        }
    }
    return $lines;
}

$dataLines = flatten_data($payload['data'] ?? []);

// --- Load SMTP credentials (never hardcoded here) ---

$configCandidates = [
    __DIR__ . '/../../../lead-mail.config.php',   // recommended: one level above public_html on Hostinger
    __DIR__ . '/../../config/lead-mail.config.php', // repo-root config/ (local/dev convenience)
];

$smtpConfig = null;
foreach ($configCandidates as $path) {
    if (is_file($path)) {
        $smtpConfig = require $path;
        break;
    }
}

$smtpHost = getenv('SMTP_HOST') ?: ($smtpConfig['smtp_host'] ?? 'smtp.hostinger.com');
$smtpPort = (int)(getenv('SMTP_PORT') ?: ($smtpConfig['smtp_port'] ?? 465));
$smtpSecure = getenv('SMTP_SECURE') ?: ($smtpConfig['smtp_secure'] ?? 'ssl');
$smtpUser = getenv('SMTP_USER') ?: ($smtpConfig['smtp_user'] ?? '');
$smtpPass = getenv('SMTP_PASS') ?: ($smtpConfig['smtp_pass'] ?? '');

if ($smtpUser === '' || $smtpPass === '') {
    error_log('[lead.php] Missing SMTP credentials — set env vars or config/lead-mail.config.php');
    respond(500, ['success' => false, 'error' => 'Email is not configured on the server']);
}

require_once __DIR__ . '/lib/PHPMailer/Exception.php';
require_once __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/lib/PHPMailer/SMTP.php';

$recipients = ['hello@qalalabs.com', 'qalakaar.qalalabs@gmail.com'];

$bodyLines = ["New lead captured.", "", "Email: {$email}", "Tool: {$toolUsed}", "", "Data:"];
foreach ($dataLines as $key => $value) {
    $bodyLines[] = "  {$key}: {$value}";
}
$textBody = implode("\n", $bodyLines);

try {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = $smtpSecure === 'tls'
        ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS
        : PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $smtpPort;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($smtpUser, 'Qala Labs Lead Engine');
    foreach ($recipients as $to) {
        $mail->addAddress($to);
    }
    $mail->addReplyTo($email);

    $mail->Subject = "[NEW LEAD] {$toolUsed} - {$email}";
    $mail->isHTML(false);
    $mail->Body = $textBody;

    $mail->send();
} catch (\Throwable $e) {
    error_log('[lead.php] Mail send failed: ' . $e->getMessage());
    respond(502, ['success' => false, 'error' => 'Failed to send notification email']);
}

respond(200, ['success' => true]);
