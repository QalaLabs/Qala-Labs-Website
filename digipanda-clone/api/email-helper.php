<?php
/**
 * Qala Labs Automated Email & Notification Engine
 * 
 * Handles multi-category autoresponders and admin alerts with:
 * 1. Category Detection: appointment, lead, career, creator, agency
 * 2. High-Conversion Branded HTML + Plain-Text multipart MIME templates
 * 3. Fail-safe delivery via PHP mail()
 */

declare(strict_types=1);

/**
 * Detect the intent category of a form submission
 */
function detect_notification_category(string $source, string $desc = '', string $company = ''): string
{
    $s = strtolower(trim($source));
    $d = strtolower(trim($desc));
    $c = strtolower(trim($company));

    // Career / Job Application
    if (
        str_contains($s, 'career') ||
        str_contains($s, 'job') ||
        str_contains($c, 'applicant:') ||
        str_contains($d, 'role applied:') ||
        str_contains($d, 'portfolio/links:')
    ) {
        return 'career';
    }

    // Creator Collective Application
    if (
        str_contains($s, 'creator') ||
        str_contains($s, 'syndicate') ||
        str_contains($d, 'creator track') ||
        str_contains($d, 'primary handle')
    ) {
        return 'creator';
    }

    // Agency Collective Partnership
    if (
        str_contains($s, 'agency') ||
        str_contains($s, 'partner') ||
        str_contains($d, 'agency size') ||
        str_contains($d, 'white-label') ||
        str_contains($d, 'preferred model')
    ) {
        return 'agency';
    }

    // Appointment / Growth Call Booking
    if (
        str_contains($s, 'appointment') ||
        str_contains($s, 'booking') ||
        str_contains($s, 'calendar') ||
        str_contains($s, 'growth_call') ||
        str_contains($s, 'call') ||
        str_contains($d, 'schedule a call') ||
        str_contains($d, 'book appointment') ||
        str_contains($d, 'preferred slot')
    ) {
        return 'appointment';
    }

    // Default: General Lead / Project Discovery
    return 'lead';
}

/**
 * Generate customized email subject line
 */
function get_email_subject(string $category, string $name, string $company = ''): string
{
    $cleanName = trim($name);
    $cleanCompany = trim($company);

    switch ($category) {
        case 'appointment':
            return "Confirmed: 30-Minute Growth Strategy Session | Qala Labs × {$cleanName}";

        case 'career':
            return "Application Received: Qala Labs Engineering & Growth Swarm ({$cleanName})";

        case 'creator':
            return "Creator Collective Application Confirmed | Qala Labs Syndicate";

        case 'agency':
            return "Agency Partnership Request Confirmed | Qala Labs Studio Network";

        case 'lead':
        default:
            $target = ($cleanCompany !== '' && !str_starts_with($cleanCompany, 'Applicant:'))
                ? $cleanCompany
                : $cleanName;
            return "Thank You for Contacting Qala Labs | Discovery Confirmed ({$target})";
    }
}

/**
 * Generate customized plain-text email body
 */
function get_email_text(string $category, string $name, string $company, string $desc): string
{
    $calUrl = 'https://calendar.app.google/EvA2Kw9rgA4xq8798';
    $waUrl = 'https://wa.me/916006760151';
    $casesUrl = 'https://qalalabs.com/case-studies';

    switch ($category) {
        case 'appointment':
            return <<<TEXT
Hi {$name},

Your request for a 30-minute 1-on-1 Growth Diagnostic with Qala Labs is confirmed.

Our senior growth engineering team will meet with you to review your acquisition economics, ROAS leaks, and autonomous operational infrastructure.

1. DIRECT CALENDAR & MEET SYNC:
If you haven't selected your exact slot yet, claim your calendar invite directly:
{$calUrl}

2. NEED IMMEDIATE COORDINATION?
Message our partner team directly on WhatsApp:
{$waUrl}

3. CASE STUDIES & BENCHMARKS:
Review our verified balance sheets and empirical results:
{$casesUrl}

Best regards,
Aashirwad Bhansali & The Qala Labs Growth Team
Qala Labs • Creative × Data × Impact
https://qalalabs.com
TEXT;

        case 'career':
            return <<<TEXT
Hi {$name},

Thank you for applying to join the Qala Labs engineering and growth collective.

We have received your background and project submissions:
{$desc}

WHAT HAPPENS NEXT:
1. Technical Review: Our core builders review every portfolio and github submission with care.
2. Timeline: If your drive and expertise align with our sprint openings, a team lead will reach out within 3 to 5 business days for a direct technical conversation.
3. Our Work: In the meantime, explore our open growth architectures at {$casesUrl}

Best regards,
The Qala Labs Talent & Engineering Team
https://qalalabs.com
TEXT;

        case 'creator':
            return <<<TEXT
Hi {$name},

Welcome to the Qala Labs Creator Collective intake!

We have logged your application to join our autonomous creative syndicate. Whether your focus is Short-Form UGC, 3D CGI Motion, AI Prompt Cinema, or Creative Dev, we match creators with ambitious high-growth brands.

NEXT STEPS:
1. Creative Review: Our Creative Director reviews your portfolio links within 48 hours.
2. Sprint Allocation: Approved creators receive direct briefings for paid client sprint engagements.
3. WhatsApp Fast Track: Connect directly with our Creator Syndicate coordinator:
{$waUrl}

Best regards,
Qala Labs Creator Syndicate
https://qalalabs.com/creator-collective
TEXT;

        case 'agency':
            return <<<TEXT
Hi {$name},

Thank you for your interest in partnering with Qala Labs through our Agency Collective.

We have received your agency partnership inquiry regarding {$company}:
{$desc}

PARTNERSHIP ROADMAP:
1. Model Alignment: We evaluate white-label AI engineering, revenue share, or joint co-pitch opportunities.
2. Direct Partner Briefing: Our agency partnership director will reach out within 24 hours.
3. Schedule an Introductory Conversation:
{$calUrl}

Best regards,
Aashirwad Bhansali & The Qala Labs Studio Team
https://qalalabs.com/agency-collective
TEXT;

        case 'lead':
        default:
            $companyStr = ($company !== '' && !str_starts_with($company, 'Applicant:')) ? " regarding {$company}" : "";
            return <<<TEXT
Hi {$name},

Thank you for contacting Qala Labs{$companyStr}.

Our growth strategy and autonomous systems team has received your inquiry:
"{$desc}"

WHAT HAPPENS NEXT:
1. Diagnostic Audit: A growth strategist is reviewing your requirements and modeling initial opportunity benchmarks.
2. SLA: A specialist will follow up with an actionable response within 24 hours.
3. Skip the Wait: If you would like to speak immediately:
   - Schedule a 30-min Google Meet: {$calUrl}
   - WhatsApp Direct: {$waUrl}

Explore our verified client outcomes:
{$casesUrl}

Best regards,
Aashirwad Bhansali & The Qala Labs Team
Growth & Performance Engineering
https://qalalabs.com
TEXT;
    }
}

/**
 * Generate modern, responsive, high-converting HTML email body
 */
function get_email_html(string $category, string $name, string $company, string $desc): string
{
    $calUrl = 'https://calendar.app.google/EvA2Kw9rgA4xq8798';
    $waUrl = 'https://wa.me/916006760151';
    $casesUrl = 'https://qalalabs.com/case-studies';

    $badge = 'DISCOVERY CONFIRMED';
    $heading = 'Inquiry Received';
    $intro = "Thank you for reaching out to Qala Labs. Our team is actively reviewing your submission.";
    $ctaText = 'Schedule 30-Min Growth Call';
    $ctaUrl = $calUrl;

    switch ($category) {
        case 'appointment':
            $badge = 'APPOINTMENT SCHEDULED';
            $heading = 'Growth Diagnostic Session Confirmed';
            $intro = "Your 1-on-1 consultation with our growth engineering specialists has been recorded. We look forward to diagnosing your acquisition channels and scaling economics.";
            $ctaText = 'Open Google Calendar Schedule';
            $ctaUrl = $calUrl;
            break;

        case 'career':
            $badge = 'APPLICATION RECEIVED';
            $heading = 'Welcome to the Qala Labs Talent Swarm';
            $intro = "Thank you for your interest in joining Qala Labs. We review every portfolio and codebase submission with rigorous attention to engineering craft and growth instinct.";
            $ctaText = 'Explore Our Engineering Playbooks';
            $ctaUrl = $casesUrl;
            break;

        case 'creator':
            $badge = 'CREATOR SYNDICATE INTAKE';
            $heading = 'Creator Collective Application Confirmed';
            $intro = "Your application to join the Qala Labs Creator Syndicate is officially in review. We partner with elite UGC creators, 3D CGI artists, and AI cinema storytellers to deploy high-converting creative engines.";
            $ctaText = 'Connect on Creator WhatsApp';
            $ctaUrl = $waUrl;
            break;

        case 'agency':
            $badge = 'AGENCY PARTNER NETWORK';
            $heading = 'Agency Collective Partnership Received';
            $intro = "Thank you for reaching out regarding an agency partnership with {$company}. We collaborate with partner agencies through white-label AI development, high-ticket performance marketing, and co-pitch sprints.";
            $ctaText = 'Book Agency Partner Briefing';
            $ctaUrl = $calUrl;
            break;

        case 'lead':
        default:
            $badge = 'GROWTH INQUIRY LOGGED';
            $heading = 'Your Growth Diagnostic Is Underway';
            $intro = "Thank you for contacting Qala Labs. We have received your inquiry and our team is synthesizing preliminary performance and attribution benchmarks for your brand.";
            $ctaText = 'Book Priority Strategy Call';
            $ctaUrl = $calUrl;
            break;
    }

    $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $safeCompany = htmlspecialchars($company, ENT_QUOTES, 'UTF-8');
    $safeDesc = nl2br(htmlspecialchars($desc, ENT_QUOTES, 'UTF-8'));

    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{$heading}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #06070D; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #06070D; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #0D0F1A; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);">
          
          <!-- Header Bar with Neon Gradient Accent -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #4F46E5, #3FE0E0, #34D399);"></td>
          </tr>

          <!-- Brand Logo Header -->
          <tr>
            <td style="padding: 32px 36px 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #FFFFFF;">
                      QALA <span style="color: #3FE0E0;">LABS</span>
                    </span>
                    <span style="display: block; font-size: 11px; color: rgba(255, 255, 255, 0.45); font-family: monospace; letter-spacing: 1px; text-transform: uppercase; margin-top: 4px;">
                      Creative &times; Data &times; Impact
                    </span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 4px 10px; border-radius: 12px; background: rgba(63, 224, 224, 0.12); border: 1px solid rgba(63, 224, 224, 0.3); font-size: 10px; font-family: monospace; color: #3FE0E0; font-weight: 700; letter-spacing: 0.5px;">
                      {$badge}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Headline -->
          <tr>
            <td style="padding: 32px 36px 16px;">
              <h1 style="margin: 0 0 12px; font-size: 24px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">
                {$heading}
              </h1>
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: rgba(255, 255, 255, 0.75);">
                Hi <strong style="color: #FFFFFF;">{$safeName}</strong>,
              </p>
              <p style="margin: 12px 0 0; font-size: 15px; line-height: 1.6; color: rgba(255, 255, 255, 0.75);">
                {$intro}
              </p>
            </td>
          </tr>

          <!-- Summary Box -->
          <tr>
            <td style="padding: 16px 36px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-family: monospace; color: #3FE0E0; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                      Submission Telemetry
                    </div>
                    <div style="font-size: 13px; line-height: 1.5; color: rgba(255, 255, 255, 0.85); margin-bottom: 6px;">
                      <strong style="color: #FFFFFF;">Reference Name:</strong> {$safeName}
                    </div>
                    <div style="font-size: 13px; line-height: 1.5; color: rgba(255, 255, 255, 0.85); margin-bottom: 6px;">
                      <strong style="color: #FFFFFF;">Organization:</strong> {$safeCompany}
                    </div>
                    <div style="font-size: 13px; line-height: 1.5; color: rgba(255, 255, 255, 0.85);">
                      <strong style="color: #FFFFFF;">Details Logged:</strong>
                      <div style="margin-top: 4px; padding: 8px 12px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; font-family: monospace; font-size: 12px; color: rgba(255, 255, 255, 0.7);">
                        {$safeDesc}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary CTA Button -->
          <tr>
            <td style="padding: 24px 36px 32px; text-align: center;">
              <table border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td align="center" style="border-radius: 14px; background: linear-gradient(135deg, #4F46E5, #3FE0E0);">
                    <a href="{$ctaUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: 700; color: #06070D; text-decoration: none; border-radius: 14px; letter-spacing: 0.3px;">
                      {$ctaText} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <div style="margin-top: 16px;">
                <a href="{$waUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 12px; color: #34D399; text-decoration: underline;">
                  Direct WhatsApp Coordination Available (&lt; 2hr response)
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; background-color: rgba(0, 0, 0, 0.4); border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center;">
              <p style="margin: 0 0 8px; font-size: 12px; color: rgba(255, 255, 255, 0.5);">
                &copy; 2026 Qala Labs. Autonomous Systems &bull; Growth Engineering &bull; Global Operations.
              </p>
              <p style="margin: 0; font-size: 11px; color: rgba(255, 255, 255, 0.35);">
                Offices: Delhi NCR &bull; London &bull; Dubai &bull; Amsterdam &bull; <a href="https://qalalabs.com" style="color: #3FE0E0; text-decoration: none;">qalalabs.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}

/**
 * Dispatch an email with multipart/alternative headers (HTML + Plain-Text)
 */
function send_qala_email(string $toEmail, string $toName, string $subject, string $bodyText, string $bodyHtml): bool
{
    $boundary = "==Multipart_Boundary_x" . md5((string)time()) . "x";

    $headers = "From: Qala Labs Team <hello@qalalabs.com>\r\n" .
               "Reply-To: hello@qalalabs.com\r\n" .
               "MIME-Version: 1.0\r\n" .
               "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n" .
               "X-Mailer: QalaLabs-Notification-Engine/2.0\r\n";

    $message = "--{$boundary}\r\n" .
               "Content-Type: text/plain; charset=\"UTF-8\"\r\n" .
               "Content-Transfer-Encoding: 7bit\r\n\r\n" .
               $bodyText . "\r\n\r\n" .
               "--{$boundary}\r\n" .
               "Content-Type: text/html; charset=\"UTF-8\"\r\n" .
               "Content-Transfer-Encoding: 7bit\r\n\r\n" .
               $bodyHtml . "\r\n\r\n" .
               "--{$boundary}--";

    $target = "{$toName} <{$toEmail}>";
    return @mail($target, $subject, $message, $headers);
}
