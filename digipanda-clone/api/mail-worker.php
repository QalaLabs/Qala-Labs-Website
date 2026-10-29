<?php
/**
 * Qala Labs Background Email Task & Queue Worker
 * 
 * Processes pending or failed email notifications from MySQL `email_notifications` table.
 * Can be executed via:
 * 1. CLI: php api/mail-worker.php
 * 2. Web Cron / Webhook: GET /api/mail-worker.php?key=YOUR_CRON_SECRET
 * 3. Forked/Background execution from lead.php
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/email-helper.php';

// Optional Web Authorization Key check (if invoked via HTTP)
if (php_sapi_name() !== 'cli') {
    header('Content-Type: application/json; charset=utf-8');
    
    $cronSecret = getenv('CRON_SECRET') ?: '';
    if ($cronSecret !== '') {
        $providedKey = (string)($_GET['key'] ?? $_SERVER['HTTP_X_CRON_KEY'] ?? '');
        if (!hash_equals($cronSecret, $providedKey)) {
            http_response_code(403);
            echo json_encode(['success' => false, 'error' => 'Unauthorized cron execution']);
            exit;
        }
    }
}

try {
    $db = get_db();

    // Ensure email_notifications table exists
    $db->exec("
        CREATE TABLE IF NOT EXISTS email_notifications (
          id int(10) unsigned NOT NULL AUTO_INCREMENT,
          lead_id int(10) unsigned DEFAULT NULL,
          recipient_name varchar(255) NOT NULL,
          recipient_email varchar(255) NOT NULL,
          category enum('lead', 'appointment', 'career', 'creator', 'agency') NOT NULL DEFAULT 'lead',
          subject varchar(255) NOT NULL,
          body_text text NOT NULL,
          body_html longtext DEFAULT NULL,
          status enum('pending', 'sent', 'failed') NOT NULL DEFAULT 'pending',
          attempts int(11) NOT NULL DEFAULT 0,
          error_message text DEFAULT NULL,
          sent_at timestamp NULL DEFAULT NULL,
          created_at timestamp NOT NULL DEFAULT current_timestamp(),
          PRIMARY KEY (id),
          KEY idx_en_status (status),
          KEY idx_en_category (category),
          KEY idx_en_created_at (created_at DESC)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Fetch batch of up to 25 pending or retryable failed emails
    $stmt = $db->prepare("
        SELECT id, lead_id, recipient_name, recipient_email, category, subject, body_text, body_html, attempts
        FROM email_notifications
        WHERE (status = 'pending' OR (status = 'failed' AND attempts < 3))
        ORDER BY id ASC
        LIMIT 25
    ");
    $stmt->execute();
    $jobs = $stmt->fetchAll();

    $processed = 0;
    $sent = 0;
    $failed = 0;

    foreach ($jobs as $job) {
        $processed++;
        $id = (int)$job['id'];
        $name = (string)$job['recipient_name'];
        $email = (string)$job['recipient_email'];
        $subject = (string)$job['subject'];
        $bodyText = (string)$job['body_text'];
        $bodyHtml = (string)($job['body_html'] ?? $bodyText);
        $attempts = (int)$job['attempts'] + 1;

        $dispatched = send_qala_email($email, $name, $subject, $bodyText, $bodyHtml);

        if ($dispatched) {
            $sent++;
            $update = $db->prepare("
                UPDATE email_notifications
                SET status = 'sent', sent_at = CURRENT_TIMESTAMP, attempts = :attempts, error_message = NULL
                WHERE id = :id
            ");
            $update->execute([':attempts' => $attempts, ':id' => $id]);

            // Update parent lead record if associated
            if (!empty($job['lead_id'])) {
                $leadUpdate = $db->prepare("
                    UPDATE leads
                    SET email_status = 'sent', email_sent_at = CURRENT_TIMESTAMP
                    WHERE id = :lead_id
                ");
                $leadUpdate->execute([':lead_id' => $job['lead_id']]);
            }
        } else {
            $failed++;
            $update = $db->prepare("
                UPDATE email_notifications
                SET status = 'failed', attempts = :attempts, error_message = 'PHP mail() dispatch returned false'
                WHERE id = :id
            ");
            $update->execute([':attempts' => $attempts, ':id' => $id]);
        }
    }

    $response = [
        'success' => true,
        'message' => "Worker executed successfully",
        'processed' => $processed,
        'sent' => $sent,
        'failed' => $failed,
        'timestamp' => gmdate('Y-m-d\TH:i:s\Z'),
    ];

    if (php_sapi_name() === 'cli') {
        echo "[Qala Labs Email Task] " . json_encode($response) . PHP_EOL;
    } else {
        echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    }

} catch (\Throwable $err) {
    $errorMsg = $err->getMessage();
    error_log("[mail-worker.php] Worker failure: " . $errorMsg);
    
    if (php_sapi_name() === 'cli') {
        fwrite(STDERR, "[Qala Labs Email Task Error] " . $errorMsg . PHP_EOL);
        exit(1);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $errorMsg]);
        exit(1);
    }
}
