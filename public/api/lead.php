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

// Honeypot bot protection
if (!empty($payload['b_url']) || !empty($payload['data']['b_url'])) {
    respond(200, ['success' => true]);
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
$spaceEmail = getenv('GOOGLE_CHAT_EMAIL') ?: ($smtpConfig['google_chat_email'] ?? '');
if (!empty($spaceEmail) && !in_array($spaceEmail, $recipients, true)) {
    $recipients[] = trim($spaceEmail);
}
$teamEmails = getenv('TEAM_NOTIFICATION_EMAILS') ?: ($smtpConfig['team_notification_emails'] ?? '');
if (!empty($teamEmails)) {
    foreach (explode(',', $teamEmails) as $em) {
        $em = trim($em);
        if ($em !== '' && !in_array($em, $recipients, true)) {
            $recipients[] = $em;
        }
    }
}

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
}

// --- Google Chat Webhook Alert ---
$gChatWebhookUrl = getenv('GOOGLE_CHAT_WEBHOOK_URL') ?: ($smtpConfig['google_chat_webhook_url'] ?? '');
if (!empty($gChatWebhookUrl)) {
    try {
        $phoneRaw = (string)($payload['data']['phone'] ?? $payload['data']['whatsapp'] ?? $payload['phone'] ?? '');
        $cleanPhone = preg_replace('/[^0-9]/', '', $phoneRaw);
        $nameRaw = (string)($payload['data']['name'] ?? $payload['data']['firstName'] ?? $payload['name'] ?? '');
        $webRaw = (string)($payload['data']['website'] ?? $payload['data']['url'] ?? $payload['data']['brandUrl'] ?? '');
        $adSpendRaw = (string)($payload['data']['adSpend'] ?? $payload['data']['monthlySpend'] ?? '');

        $widgets = [
            [
                'decoratedText' => [
                    'topLabel' => 'Source / Flow',
                    'text' => '<b>' . htmlspecialchars($toolUsed) . '</b>',
                    'startIcon' => ['knownIcon' => 'STAR']
                ]
            ],
            [
                'decoratedText' => [
                    'topLabel' => 'Email Address',
                    'text' => '<a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a>',
                    'startIcon' => ['knownIcon' => 'EMAIL']
                ]
            ]
        ];

        if ($nameRaw !== '') {
            $widgets[] = [
                'decoratedText' => [
                    'topLabel' => 'Name',
                    'text' => '<b>' . htmlspecialchars($nameRaw) . '</b>',
                    'startIcon' => ['knownIcon' => 'PERSON']
                ]
            ];
        }

        if ($phoneRaw !== '') {
            $widgets[] = [
                'decoratedText' => [
                    'topLabel' => 'Phone / WhatsApp',
                    'text' => '<b>' . htmlspecialchars($phoneRaw) . '</b>',
                    'startIcon' => ['knownIcon' => 'PHONE']
                ]
            ];
        }

        if ($webRaw !== '') {
            $widgets[] = [
                'decoratedText' => [
                    'topLabel' => 'Website',
                    'text' => '<a href="' . htmlspecialchars($webRaw) . '">' . htmlspecialchars($webRaw) . '</a>',
                    'startIcon' => ['knownIcon' => 'BOOKMARK']
                ]
            ];
        }

        if ($adSpendRaw !== '') {
            $widgets[] = [
                'decoratedText' => [
                    'topLabel' => 'Ad Spend',
                    'text' => '<b>' . htmlspecialchars($adSpendRaw) . '</b>',
                    'startIcon' => ['knownIcon' => 'DOLLAR']
                ]
            ];
        }

        $buttons = [];
        if ($cleanPhone !== '') {
            $buttons[] = [
                'text' => '💬 WhatsApp Chat',
                'onClick' => [
                    'openLink' => ['url' => 'https://wa.me/' . $cleanPhone]
                ]
            ];
        }
        $buttons[] = [
            'text' => '✉️ Reply via Email',
            'onClick' => [
                'openLink' => ['url' => 'mailto:' . $email . '?subject=' . rawurlencode('Growth Inquiry with Qala Labs')]
            ]
        ];

        $sections = [
            [
                'header' => 'Lead Details',
                'collapsible' => false,
                'widgets' => $widgets
            ]
        ];
        if (!empty($buttons)) {
            $sections[] = [
                'widgets' => [
                    ['buttonList' => ['buttons' => $buttons]]
                ]
            ];
        }

        $gChatPayload = [
            'text' => "🔥 *[NEW LEAD] {$toolUsed}*\n*Email:* {$email}" . ($phoneRaw ? "\n*Phone:* {$phoneRaw}" : ''),
            'cardsV2' => [
                [
                    'cardId' => 'lead-' . time(),
                    'card' => [
                        'header' => [
                            'title' => '🔥 New Inbound Lead',
                            'subtitle' => "Source: {$toolUsed}",
                            'imageUrl' => 'https://qalalabs.com/favicon.ico',
                            'imageType' => 'CIRCLE'
                        ],
                        'sections' => $sections
                    ]
                ]
            ]
        ];

        $ch = curl_init($gChatWebhookUrl);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($gChatPayload));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json; charset=UTF-8']);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        curl_exec($ch);
        curl_close($ch);
    } catch (\Throwable $chatErr) {
        error_log('[lead.php] Google Chat alert failed: ' . $chatErr->getMessage());
    }
}

respond(200, ['success' => true]);
