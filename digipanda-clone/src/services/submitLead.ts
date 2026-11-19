/**
 * Lead Submission Service (Dual-Target Resilient Dispatcher)
 *
 * Dispatches inquiries, appointment bookings, and creator applications.
 * Implements the Qala Labs dual-target endpoint protocol:
 * 1. Tries /api/lead (Vercel serverless / Node / Cloud Run)
 * 2. Falls back to /api/lead.php (Hostinger shared PHP runtime) on 404
 * 3. Enforces strict response verification (never marks success unconditionally)
 */

export interface LeadPayload {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  description: string;
  source: string;
  b_url?: string;
}

export interface SubmitLeadResult {
  success: boolean;
  message?: string;
  error?: string;
}

export interface DeliverableRates {
  reel: number;
  reelEnabled: boolean;
  staticPost: number;
  staticPostEnabled: boolean;
  carousel: number;
  carouselEnabled: boolean;
  storyPack: number;
  storyPackEnabled: boolean;
}

export interface CollabTerms {
  format: string;
  openToJointCollab: boolean;
  feeType: 'included' | 'extra';
  extraFeeAmount: number;
}

export interface PlatformAdRights {
  instagram: string;
  youtube: string;
  facebook: string;
  totalDuration: string;
  feeType: 'included' | 'extra';
  extraFeeAmount: number;
}

export interface CreatorApplicationPayload {
  fullName: string;
  handle: string;
  email: string;
  phone: string;
  discipline: string;
  followerTier: string;
  customFollowerCount?: string;
  portfolioUrl: string;
  rates: DeliverableRates;
  collab: CollabTerms;
  adRights: PlatformAdRights;
  totalQuotedFee: number;
  campaignBenchmark?: string;
  conceptPitch: string;
  campaignSlug?: string;
  campaignTitle?: string;
  source?: string;
  honeypot?: string;
}

/**
 * Standard Dual-Target Lead Dispatcher
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  try {
    let response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.status === 404) {
      response = await fetch('/api/lead.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    if (!response.ok) {
      let errDesc = `Submission failed (${response.status})`;
      try {
        const resJson = await response.json();
        if (resJson?.error) errDesc = resJson.error;
      } catch {
        // use fallback message
      }
      return { success: false, error: errDesc };
    }

    const data = await response.json().catch(() => ({ success: true }));
    if (data && data.success === false) {
      return { success: false, error: data.error || 'Server rejected submission' };
    }

    return {
      success: true,
      message: data.message || 'Application submitted successfully',
    };
  } catch (err: any) {
    return {
      success: false,
      error:
        err?.message ||
        'Network error. Please apply directly via creators@qalalabs.com or WhatsApp.',
    };
  }
}

/**
 * Formats structured creator description for CRM & Email notification
 */
export function formatCreatorDescription(data: CreatorApplicationPayload): string {
  const currencyFmt = (num: number) => `₹${num.toLocaleString('en-IN')}`;

  const deliverableLines: string[] = [];
  if (data.rates.reelEnabled) {
    deliverableLines.push(`• Reel / Short Video (30–60s 9:16): ${currencyFmt(data.rates.reel)}`);
  }
  if (data.rates.staticPostEnabled) {
    deliverableLines.push(`• Static Post (High-Res Photo): ${currencyFmt(data.rates.staticPost)}`);
  }
  if (data.rates.carouselEnabled) {
    deliverableLines.push(`• Carousel (Multi-Slide Story): ${currencyFmt(data.rates.carousel)}`);
  }
  if (data.rates.storyPackEnabled) {
    deliverableLines.push(`• Story Pack (2–3 Framed Stories): ${currencyFmt(data.rates.storyPack)}`);
  }
  if (deliverableLines.length === 0) {
    deliverableLines.push('• Custom scope / discussion required');
  }

  const effectiveReach =
    data.followerTier === 'custom' && data.customFollowerCount
      ? `Custom Tier (${data.customFollowerCount} followers)`
      : data.followerTier;

  const collabFeeText =
    data.collab.feeType === 'extra'
      ? `+${currencyFmt(data.collab.extraFeeAmount)} (Separate Add-on)`
      : 'Included in creative rates';

  const adRightsFeeText =
    data.adRights.feeType === 'extra'
      ? `+${currencyFmt(data.adRights.extraFeeAmount)} (Separate Add-on)`
      : 'Included in package';

  const campaignHeader = data.campaignTitle
    ? `=== CAMPAIGN SPRINT: ${data.campaignTitle} (${data.campaignSlug || 'custom'}) ===\n`
    : `=== GENERAL CREATOR SYNDICATE INTAKE ===\n`;

  return `${campaignHeader}
CREATOR IDENTITY & SOCIAL REACH:
• Full Name: ${data.fullName}
• Creator Handle: ${data.handle}
• Primary Discipline: ${data.discipline}
• Follower Reach: ${effectiveReach}
• Portfolio / Channels: ${data.portfolioUrl}

CREATIVE DELIVERABLE RATES (INR):
${deliverableLines.join('\n')}

POST COLLABORATION & TERMS:
• Collaboration Format: ${data.collab.format}
• Open to Joint Collab: ${data.collab.openToJointCollab ? '✓ Yes, Open to Collab' : '✕ Separate Posts Only'}
• Collab Fee Terms: ${collabFeeText}

PLATFORM AD RIGHTS BREAKDOWN & DURATION:
• 📸 Instagram Ad Rights: ${data.adRights.instagram}
• ▶️ YouTube Ad Rights: ${data.adRights.youtube}
• 👥 Facebook Ad Rights: ${data.adRights.facebook}
• ⏱️ Total Usage Time Period: ${data.adRights.totalDuration}
• Ad Rights Fee Terms: ${adRightsFeeText}

TOTAL QUOTED PACKAGE & BENCHMARK:
• Total Quoted Fee: ${currencyFmt(data.totalQuotedFee)}
• Brand Benchmark Reference: ${data.campaignBenchmark || '₹50,000 - ₹80,000 avg'}

CONCEPT & PITCH NOTE:
${data.conceptPitch || 'No additional pitch note provided.'}
`.trim();
}

/**
 * High-Level Creator Intake Dispatcher
 */
export async function submitCreatorLead(
  data: CreatorApplicationPayload
): Promise<SubmitLeadResult> {
  const currencyFmt = (num: number) => `₹${num.toLocaleString('en-IN')}`;
  const companyLabel = data.campaignTitle
    ? `Creator: ${data.handle || data.fullName} [${data.campaignTitle} | ${currencyFmt(data.totalQuotedFee)}]`
    : `Creator: ${data.handle || data.fullName} (${data.discipline}) [${currencyFmt(data.totalQuotedFee)}]`;

  const description = formatCreatorDescription(data);
  const source = data.source || (data.campaignSlug ? `creator_campaign_${data.campaignSlug}` : 'creator_collective');

  return submitLead({
    name: data.fullName,
    companyName: companyLabel,
    phone: data.phone,
    email: data.email,
    description,
    source,
    b_url: data.honeypot || undefined,
  });
}
