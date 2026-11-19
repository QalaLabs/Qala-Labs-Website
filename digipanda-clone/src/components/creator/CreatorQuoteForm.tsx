import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Video,
  Image as ImageIcon,
  Layers,
  Film,
  Instagram,
  Youtube,
  Facebook,
  Clock,
  DollarSign,
  TrendingUp,
  MessageCircle,
  Info,
} from 'lucide-react';
import {
  submitCreatorLead,
  DeliverableRates,
  CollabTerms,
  PlatformAdRights,
  CreatorApplicationPayload,
} from '../../services/submitLead';
import { CreatorCampaign } from '../../data/creatorCampaigns';

interface CreatorQuoteFormProps {
  campaign?: CreatorCampaign;
  sourceContext?: string;
  defaultDiscipline?: string;
}

const DEFAULT_RATES: DeliverableRates = {
  reel: 25000,
  reelEnabled: true,
  staticPost: 15000,
  staticPostEnabled: false,
  carousel: 20000,
  carouselEnabled: true,
  storyPack: 8000,
  storyPackEnabled: true,
};

const DURATION_PRESETS = ['1 month', '2 months', '3 months', '6 months'];
const TIME_PERIOD_PRESETS = ['30 days', '60 days', '90 days', '180 days'];

export const CreatorQuoteForm: React.FC<CreatorQuoteFormProps> = ({
  campaign,
  sourceContext = 'creator_collective',
  defaultDiscipline = 'Short-Form Video & UGC',
}) => {
  // 1. Creator Identity & Social Reach
  const [fullName, setFullName] = useState('');
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [discipline, setDiscipline] = useState(defaultDiscipline);
  const [followerTier, setFollowerTier] = useState('Micro · 10K - 100K');
  const [customFollowerCount, setCustomFollowerCount] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  // 2. Creative Deliverable Rates (INR ₹)
  const [rates, setRates] = useState<DeliverableRates>(() => {
    if (campaign?.recommendedDeliverables) {
      return {
        reel: 25000,
        reelEnabled: campaign.recommendedDeliverables.reel,
        staticPost: 15000,
        staticPostEnabled: campaign.recommendedDeliverables.staticPost,
        carousel: 20000,
        carouselEnabled: campaign.recommendedDeliverables.carousel,
        storyPack: 8000,
        storyPackEnabled: campaign.recommendedDeliverables.storyPack,
      };
    }
    return DEFAULT_RATES;
  });

  // 3. Post Collaboration & Terms
  const [collabFormat, setCollabFormat] = useState(
    'Instagram Joint Collab Post (Co-author on profile feed)'
  );
  const [openToJointCollab, setOpenToJointCollab] = useState(true);
  const [collabFeeType, setCollabFeeType] = useState<'included' | 'extra'>('included');
  const [extraCollabFee, setExtraCollabFee] = useState(5000);

  // 4. Platform Ad Rights Breakdown & Usage Duration
  const [instagramDuration, setInstagramDuration] = useState('2 months');
  const [youtubeDuration, setYoutubeDuration] = useState('2 months');
  const [facebookDuration, setFacebookDuration] = useState('1 month');
  const [totalTimePeriod, setTotalTimePeriod] = useState('60 days');
  const [adRightsFeeType, setAdRightsFeeType] = useState<'included' | 'extra'>('included');
  const [extraAdRightsFee, setExtraAdRightsFee] = useState(10000);

  // 5. Concept & Pitch Note
  const [conceptPitch, setConceptPitch] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // UI / Submission state
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Live Package Calculator: Deliverable Rates + Collab Fee + Ad Rights Fee
  const totalDeliverablesRate = useMemo(() => {
    let sum = 0;
    if (rates.reelEnabled) sum += Number(rates.reel) || 0;
    if (rates.staticPostEnabled) sum += Number(rates.staticPost) || 0;
    if (rates.carouselEnabled) sum += Number(rates.carousel) || 0;
    if (rates.storyPackEnabled) sum += Number(rates.storyPack) || 0;
    return sum;
  }, [rates]);

  const effectiveCollabFee = useMemo(() => {
    return collabFeeType === 'extra' ? Number(extraCollabFee) || 0 : 0;
  }, [collabFeeType, extraCollabFee]);

  const effectiveAdRightsFee = useMemo(() => {
    return adRightsFeeType === 'extra' ? Number(extraAdRightsFee) || 0 : 0;
  }, [adRightsFeeType, extraAdRightsFee]);

  const totalQuotedFee = useMemo(() => {
    return totalDeliverablesRate + effectiveCollabFee + effectiveAdRightsFee;
  }, [totalDeliverablesRate, effectiveCollabFee, effectiveAdRightsFee]);

  const benchmarkDisplay = campaign
    ? campaign.brandBenchmarkPayout
    : '₹50,000 - ₹80,000';

  // Benchmark comparison status
  const benchmarkAnalysis = useMemo(() => {
    const minBenchmark = campaign?.benchmarkAmountRange?.[0] ?? 50000;
    const maxBenchmark = campaign?.benchmarkAmountRange?.[1] ?? 80000;

    if (totalQuotedFee === 0) {
      return { status: 'neutral', label: 'Select deliverables to generate your live quote' };
    }
    if (totalQuotedFee < minBenchmark) {
      return {
        status: 'value',
        label: `Competitive Value Rate (₹${(minBenchmark - totalQuotedFee).toLocaleString('en-IN')} below top brand benchmark)`,
      };
    }
    if (totalQuotedFee <= maxBenchmark) {
      return {
        status: 'optimal',
        label: 'Directly Aligned with Brand Payout Benchmark (High Probability Match)',
      };
    }
    return {
      status: 'premium',
      label: `Premium Creative Quote (Reflects high craft or multi-platform whitelist scope)`,
    };
  }, [totalQuotedFee, campaign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const payload: CreatorApplicationPayload = {
      fullName,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      email,
      phone,
      discipline,
      followerTier,
      customFollowerCount: followerTier === 'custom' ? customFollowerCount : undefined,
      portfolioUrl,
      rates,
      collab: {
        format: collabFormat,
        openToJointCollab,
        feeType: collabFeeType,
        extraFeeAmount: extraCollabFee,
      },
      adRights: {
        instagram: instagramDuration,
        youtube: youtubeDuration,
        facebook: facebookDuration,
        totalDuration: totalTimePeriod,
        feeType: adRightsFeeType,
        extraFeeAmount: extraAdRightsFee,
      },
      totalQuotedFee,
      campaignBenchmark: benchmarkDisplay,
      conceptPitch,
      campaignSlug: campaign?.slug,
      campaignTitle: campaign?.title,
      source: sourceContext,
      honeypot: honeypot || undefined,
    };

    try {
      const result = await submitCreatorLead(payload);

      // Strictly gate success only on result.success === true
      if (!result.success) {
        throw new Error(result.error || 'Submission could not be completed.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Creator application error:', err);
      setErrorMessage(
        err?.message ||
          'Submission failed. Please apply directly via email to creators@qalalabs.com or WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {submitted ? (
        <div className="p-8 sm:p-12 rounded-[32px] bg-white border border-emerald-500/30 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/25">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
            APPLICATION & QUOTE TRANSMITTED
          </span>

          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Your Creator Quote is Queued
          </h3>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-6">
            Thank you, <strong className="text-slate-900">{fullName}</strong> ({handle.startsWith('@') ? handle : `@${handle}`}).
            Your customized package of <strong className="text-emerald-700">₹{totalQuotedFee.toLocaleString('en-IN')}</strong> and
            platform terms have synced directly into our Creator Roster CRM.
          </p>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-lg mx-auto mb-8 text-xs font-mono space-y-1.5 text-slate-700">
            <div className="flex justify-between border-b border-slate-200 pb-1.5 mb-1.5 font-bold text-slate-900">
              <span>SUMMARY OF SUBMITTED QUOTE</span>
              <span>EST. REVIEW: 48H</span>
            </div>
            <div>• Quoted Deliverables Total: ₹{totalDeliverablesRate.toLocaleString('en-IN')}</div>
            <div>• Collaboration Terms: {collabFormat} ({collabFeeType === 'extra' ? `+₹${extraCollabFee.toLocaleString('en-IN')}` : 'Included'})</div>
            <div>• Ad Rights Period: {totalTimePeriod} ({adRightsFeeType === 'extra' ? `+₹${extraAdRightsFee.toLocaleString('en-IN')}` : 'Included'})</div>
            <div className="pt-1.5 border-t border-slate-200 font-bold text-slate-900 flex justify-between">
              <span>TOTAL QUOTED FEE:</span>
              <span className="text-[#4F46E5] text-sm">₹{totalQuotedFee.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I%20just%20submitted%20my%20creator%20quote%20for%20the%20Creator%20Collective."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Fast-Track Onboarding via WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFullName('');
                setEmail('');
                setPhone('');
              }}
              className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all"
            >
              Submit Another Quote / Update
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-[32px] bg-white/95 border border-slate-200 backdrop-blur-xl shadow-xl space-y-10"
        >
          {/* Honeypot field for bot suppression */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="b_url"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* Fallback Error Banner */}
          {errorMessage && (
            <div
              role="alert"
              className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="mailto:creators@qalalabs.com"
                  className="font-bold text-[#4F46E5] hover:underline uppercase tracking-wider text-xs"
                >
                  Email Direct &rarr;
                </a>
                <a
                  href="https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I'm%20applying%20to%20the%20Creator%20Collective."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:underline uppercase tracking-wider text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* SECTION 1: Creator Identity & Social Reach */}
          {/* ---------------------------------------------------- */}
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-xs font-bold font-mono">
                    1
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Creator Identity & Social Reach
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1 ml-8">
                  Your official contact and channel authority credentials
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                PROFILE SYNC
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="creator-fullName" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="creator-fullName"
                  name="fullName"
                  aria-label="Full Name"
                  type="text"
                  required
                  placeholder="e.g. Liam Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="creator-handle" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                  Creator Handle <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="creator-handle"
                    name="handle"
                    aria-label="Creator Handle"
                    type="text"
                    required
                    placeholder="@yourhandle"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="creator-email" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="creator-email"
                  name="email"
                  aria-label="Email Address"
                  type="email"
                  required
                  placeholder="liam@creator.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="creator-phone" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                  Phone Number (WhatsApp with Country Code) <span className="text-red-500">*</span>
                </label>
                <input
                  id="creator-phone"
                  name="phone"
                  aria-label="WhatsApp Phone Number"
                  type="tel"
                  required
                  placeholder="+91 98765 43210 or +1 415-555-0199"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="creator-discipline" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                  Primary Discipline <span className="text-red-500">*</span>
                </label>
                <select
                  id="creator-discipline"
                  aria-label="Primary Discipline"
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all shadow-sm cursor-pointer"
                >
                  <option value="Short-Form Video & UGC">Short-Form Video & UGC</option>
                  <option value="3D Motion & CGI">3D Motion & CGI</option>
                  <option value="AI Filmmaking">AI Filmmaking</option>
                  <option value="Lifestyle & D2C">Lifestyle & D2C</option>
                </select>
              </div>

              <div>
                <label htmlFor="creator-tier" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                  Follower Tier <span className="text-red-500">*</span>
                </label>
                <select
                  id="creator-tier"
                  aria-label="Follower Tier"
                  value={followerTier}
                  onChange={(e) => setFollowerTier(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all shadow-sm cursor-pointer"
                >
                  <option value="Nano · 1K - 10K">Nano · 1K - 10K</option>
                  <option value="Micro · 10K - 100K">Micro · 10K - 100K</option>
                  <option value="Mid-Tier • 100K - 500K">Mid-Tier • 100K - 500K</option>
                  <option value="Macro · 500K - 1M">Macro · 500K - 1M</option>
                  <option value="Mega · 1M+">Mega · 1M+</option>
                  <option value="custom">Custom number...</option>
                </select>
              </div>
            </div>

            {followerTier === 'custom' && (
              <div>
                <label htmlFor="creator-customFollowers" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                  Exact Follower / Subscriber Count <span className="text-red-500">*</span>
                </label>
                <input
                  id="creator-customFollowers"
                  aria-label="Exact Follower Count"
                  type="text"
                  required={followerTier === 'custom'}
                  placeholder="e.g. 240,000 Instagram + 80,000 YouTube"
                  value={customFollowerCount}
                  onChange={(e) => setCustomFollowerCount(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all shadow-sm"
                />
              </div>
            )}

            <div>
              <label htmlFor="creator-portfolio" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                Portfolio / Channel URL (Instagram / YouTube / Portfolio Link) <span className="text-red-500">*</span>
              </label>
              <input
                id="creator-portfolio"
                name="portfolioUrl"
                aria-label="Portfolio or Channel URL"
                type="url"
                required
                placeholder="https://instagram.com/yourhandle or https://youtube.com/@channel"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 2: Creative Deliverable Rates (INR ₹) */}
          {/* ---------------------------------------------------- */}
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold font-mono">
                    2
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Creative Deliverable Rates (INR ₹)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1 ml-8">
                  Individual pricing per deliverable format. Select items you want to include in this quote.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                RATE CARD BENCHMARK
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Reel / Short Video */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  rates.reelEnabled
                    ? 'bg-indigo-50/50 border-[#4F46E5]/40 shadow-sm'
                    : 'bg-slate-50/60 border-slate-200 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rates.reelEnabled}
                      onChange={(e) =>
                        setRates((prev) => ({ ...prev, reelEnabled: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                    />
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <Film className="w-4 h-4 text-[#4F46E5]" />
                      <span>Reel / Short Video (₹)</span>
                    </div>
                  </label>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                    BENCHMARK: ₹25,000
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3 ml-6.5">
                  30–60s 9:16 vertical video with kinetic hook, voiceover/SFX, and brand integration.
                </p>
                <div className="ml-6.5">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                      ₹
                    </span>
                    <input
                      type="number"
                      aria-label="Reel Short Video Rate INR"
                      disabled={!rates.reelEnabled}
                      min={0}
                      step={1000}
                      value={rates.reel}
                      onChange={(e) =>
                        setRates((prev) => ({ ...prev, reel: Number(e.target.value) || 0 }))
                      }
                      className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#4F46E5] disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Static Post */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  rates.staticPostEnabled
                    ? 'bg-indigo-50/50 border-[#4F46E5]/40 shadow-sm'
                    : 'bg-slate-50/60 border-slate-200 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rates.staticPostEnabled}
                      onChange={(e) =>
                        setRates((prev) => ({ ...prev, staticPostEnabled: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                    />
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <ImageIcon className="w-4 h-4 text-[#0284C7]" />
                      <span>Static Post (₹)</span>
                    </div>
                  </label>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                    BENCHMARK: ₹15,000
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3 ml-6.5">
                  High-res photo post with curated aesthetic composition and dedicated caption copy.
                </p>
                <div className="ml-6.5">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                      ₹
                    </span>
                    <input
                      type="number"
                      aria-label="Static Post Rate INR"
                      disabled={!rates.staticPostEnabled}
                      min={0}
                      step={1000}
                      value={rates.staticPost}
                      onChange={(e) =>
                        setRates((prev) => ({ ...prev, staticPost: Number(e.target.value) || 0 }))
                      }
                      className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#4F46E5] disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Carousel */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  rates.carouselEnabled
                    ? 'bg-indigo-50/50 border-[#4F46E5]/40 shadow-sm'
                    : 'bg-slate-50/60 border-slate-200 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rates.carouselEnabled}
                      onChange={(e) =>
                        setRates((prev) => ({ ...prev, carouselEnabled: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                    />
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <Layers className="w-4 h-4 text-[#A78BFA]" />
                      <span>Carousel (₹)</span>
                    </div>
                  </label>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                    BENCHMARK: ₹20,000
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3 ml-6.5">
                  Multi-slide storytelling post (5–10 slides) combining visuals, insights, and swipe hooks.
                </p>
                <div className="ml-6.5">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                      ₹
                    </span>
                    <input
                      type="number"
                      aria-label="Carousel Rate INR"
                      disabled={!rates.carouselEnabled}
                      min={0}
                      step={1000}
                      value={rates.carousel}
                      onChange={(e) =>
                        setRates((prev) => ({ ...prev, carousel: Number(e.target.value) || 0 }))
                      }
                      className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#4F46E5] disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Story Pack */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  rates.storyPackEnabled
                    ? 'bg-indigo-50/50 border-[#4F46E5]/40 shadow-sm'
                    : 'bg-slate-50/60 border-slate-200 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rates.storyPackEnabled}
                      onChange={(e) =>
                        setRates((prev) => ({ ...prev, storyPackEnabled: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                    />
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                      <Video className="w-4 h-4 text-[#10B981]" />
                      <span>Story Pack (₹)</span>
                    </div>
                  </label>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                    BENCHMARK: ₹8,000
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-3 ml-6.5">
                  2–3 framed stories with link stickers, interactive polls, and brand tagging.
                </p>
                <div className="ml-6.5">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                      ₹
                    </span>
                    <input
                      type="number"
                      aria-label="Story Pack Rate INR"
                      disabled={!rates.storyPackEnabled}
                      min={0}
                      step={1000}
                      value={rates.storyPack}
                      onChange={(e) =>
                        setRates((prev) => ({ ...prev, storyPack: Number(e.target.value) || 0 }))
                      }
                      className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#4F46E5] disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 3: Post Collaboration & Terms */}
          {/* ---------------------------------------------------- */}
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-bold font-mono">
                    3
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Post Collaboration & Terms
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1 ml-8">
                  Distribution protocol and feed co-authorship preferences
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                FEED GOVERNANCE
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="creator-collabFormat" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                  Collaboration Format <span className="text-red-500">*</span>
                </label>
                <select
                  id="creator-collabFormat"
                  aria-label="Collaboration Format"
                  value={collabFormat}
                  onChange={(e) => setCollabFormat(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all shadow-sm cursor-pointer"
                >
                  <option value="Instagram Joint Collab Post (Co-author on profile feed)">
                    Instagram Joint Collab Post (Co-author on profile feed)
                  </option>
                  <option value="Tagged Brand Sponsorship (@mention in caption & tag)">
                    Tagged Brand Sponsorship (@mention in caption & tag)
                  </option>
                  <option value="Dedicated Video + Joint Collab Tag">
                    Dedicated Video + Joint Collab Tag
                  </option>
                  <option value="UGC / Whitelisting Only (No post on creator's feed)">
                    UGC / Whitelisting Only (No post on creator's feed)
                  </option>
                </select>
              </div>

              {/* Joint Collab Toggle Switch */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-slate-900">Open to Joint Collab?</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Allow the brand to co-author on your profile feed to amplify shared engagement
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setOpenToJointCollab(true)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      openToJointCollab
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ✓ Yes, Open to Collab
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenToJointCollab(false)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      !openToJointCollab
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ✕ Separate Posts Only
                  </button>
                </div>
              </div>

              {/* Collab Fee Terms Radio */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  Collab Fee Terms
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      collabFeeType === 'included'
                        ? 'bg-white border-[#4F46E5] ring-2 ring-[#4F46E5]/10 shadow-sm'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="collabFee"
                      checked={collabFeeType === 'included'}
                      onChange={() => setCollabFeeType('included')}
                      className="text-[#4F46E5] focus:ring-[#4F46E5]"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Included in creative rates</div>
                      <div className="text-[11px] text-slate-500">No additional co-authorship fee</div>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      collabFeeType === 'extra'
                        ? 'bg-white border-[#4F46E5] ring-2 ring-[#4F46E5]/10 shadow-sm'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="collabFee"
                      checked={collabFeeType === 'extra'}
                      onChange={() => setCollabFeeType('extra')}
                      className="text-[#4F46E5] focus:ring-[#4F46E5]"
                    />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-900">Extra Collab Fee (+₹...)</div>
                      <div className="text-[11px] text-slate-500">Separate feed partnership fee</div>
                    </div>
                  </label>
                </div>

                {collabFeeType === 'extra' && (
                  <div className="pt-2">
                    <label htmlFor="creator-extraCollab" className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                      Specify Extra Collab Fee (INR ₹)
                    </label>
                    <div className="relative max-w-xs">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                        +₹
                      </span>
                      <input
                        id="creator-extraCollab"
                        type="number"
                        min={0}
                        step={1000}
                        value={extraCollabFee}
                        onChange={(e) => setExtraCollabFee(Number(e.target.value) || 0)}
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 4: Platform Ad Rights Breakdown & Usage Duration */}
          {/* ---------------------------------------------------- */}
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#A78BFA] text-white flex items-center justify-center text-xs font-bold font-mono">
                    4
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Platform Ad Rights Breakdown & Usage Duration
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1 ml-8">
                  Whitelisting and paid digital rights duration across Meta & YouTube ad channels
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                WHITELISTS & RIGHTS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Instagram Ad Rights */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>📸 Instagram Ad Rights</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {DURATION_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setInstagramDuration(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        instagramDuration === p
                          ? 'bg-[#4F46E5] text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  aria-label="Instagram Ad Rights Custom"
                  value={instagramDuration}
                  onChange={(e) => setInstagramDuration(e.target.value)}
                  placeholder="Custom e.g. 60 days"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              {/* YouTube Ad Rights */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Youtube className="w-4 h-4 text-red-600" />
                  <span>▶️ YouTube Ad Rights</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {DURATION_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setYoutubeDuration(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        youtubeDuration === p
                          ? 'bg-[#4F46E5] text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  aria-label="YouTube Ad Rights Custom"
                  value={youtubeDuration}
                  onChange={(e) => setYoutubeDuration(e.target.value)}
                  placeholder="Custom e.g. 60 days"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              {/* Facebook Ad Rights */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span>👥 Facebook Ad Rights</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {DURATION_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFacebookDuration(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        facebookDuration === p
                          ? 'bg-[#4F46E5] text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  aria-label="Facebook Ad Rights Custom"
                  value={facebookDuration}
                  onChange={(e) => setFacebookDuration(e.target.value)}
                  placeholder="Custom e.g. 30 days"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>
            </div>

            {/* Total Usage Time Period & Ad Rights Fee Terms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Clock className="w-4 h-4 text-[#4F46E5]" />
                  <span>⏱️ Total Usage Time Period</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TIME_PERIOD_PRESETS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTotalTimePeriod(t)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        totalTimePeriod === t
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  aria-label="Total Usage Time Period Custom"
                  value={totalTimePeriod}
                  onChange={(e) => setTotalTimePeriod(e.target.value)}
                  placeholder="e.g. Standard 60 days"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              {/* Ad Rights Fee Terms */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  Ad Rights Fee Terms
                </div>
                <div className="space-y-2">
                  <label
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                      adRightsFeeType === 'included'
                        ? 'bg-white border-[#4F46E5] ring-2 ring-[#4F46E5]/10 shadow-sm'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="adRightsFee"
                      checked={adRightsFeeType === 'included'}
                      onChange={() => setAdRightsFeeType('included')}
                      className="text-[#4F46E5] focus:ring-[#4F46E5]"
                    />
                    <div className="text-xs font-bold text-slate-900">Included in package</div>
                  </label>

                  <label
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                      adRightsFeeType === 'extra'
                        ? 'bg-white border-[#4F46E5] ring-2 ring-[#4F46E5]/10 shadow-sm'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="adRightsFee"
                      checked={adRightsFeeType === 'extra'}
                      onChange={() => setAdRightsFeeType('extra')}
                      className="text-[#4F46E5] focus:ring-[#4F46E5]"
                    />
                    <div className="text-xs font-bold text-slate-900">Extra Ad Rights Fee (+₹...)</div>
                  </label>
                </div>

                {adRightsFeeType === 'extra' && (
                  <div className="pt-1.5">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                        +₹
                      </span>
                      <input
                        type="number"
                        aria-label="Extra Ad Rights Fee INR"
                        min={0}
                        step={1000}
                        value={extraAdRightsFee}
                        onChange={(e) => setExtraAdRightsFee(Number(e.target.value) || 0)}
                        className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 5: Total Quoted Package & Campaign Benchmark */}
          {/* ---------------------------------------------------- */}
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                    5
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Total Quoted Package & Campaign Benchmark
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1 ml-8">
                  Live reactive calculator and campaign budget match analysis
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 font-bold uppercase tracking-widest hidden sm:inline-block">
                LIVE SUM
              </span>
            </div>

            {/* Live Package Calculator Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#4F46E5]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#3FE0E0] uppercase px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                      LIVE PACKAGE CALCULATOR
                    </span>
                    <span className="text-xs text-white/50 font-mono">
                      Deliverables + Collab + Ad Rights
                    </span>
                  </div>

                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-2">
                    <span>₹{totalQuotedFee.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-mono font-normal text-white/60 uppercase">
                      INR Total Quoted Fee
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-xs">
                    <div>
                      <div className="text-[10px] font-mono text-white/50 uppercase">Deliverables</div>
                      <div className="font-bold text-white">₹{totalDeliverablesRate.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/50 uppercase">Collab Fee</div>
                      <div className="font-bold text-white">
                        {collabFeeType === 'extra' ? `+₹${extraCollabFee.toLocaleString('en-IN')}` : '₹0 (Included)'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/50 uppercase">Ad Rights Fee</div>
                      <div className="font-bold text-white">
                        {adRightsFeeType === 'extra' ? `+₹${extraAdRightsFee.toLocaleString('en-IN')}` : '₹0 (Included)'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-white/70 uppercase">Brand Benchmark</span>
                    <span className="font-bold text-[#3FE0E0]">{benchmarkDisplay}</span>
                  </div>

                  <div className="text-xs text-white/80 leading-relaxed">
                    {benchmarkAnalysis.label}
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        benchmarkAnalysis.status === 'optimal'
                          ? 'bg-emerald-400 w-3/4'
                          : benchmarkAnalysis.status === 'value'
                          ? 'bg-[#3FE0E0] w-1/2'
                          : 'bg-amber-400 w-full'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Concept & Pitch Note */}
            <div>
              <label htmlFor="creator-pitch" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                Concept & Pitch Note (Angles, Turnaround Timeline & Past Viral Proofs) <span className="text-red-500">*</span>
              </label>
              <textarea
                id="creator-pitch"
                name="conceptPitch"
                aria-label="Concept & Pitch Note"
                rows={4}
                required
                placeholder="Outline your creative hook concept, delivery timeline (e.g. 5 days from product delivery), past viral benchmarks, and equipment or stylistic edge..."
                value={conceptPitch}
                onChange={(e) => setConceptPitch(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 transition-all shadow-sm resize-none"
              />
            </div>
          </div>

          {/* Submission Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Encrypted intake syncs with Qala Management CRM. Verified response within 48-72 hours.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || totalQuotedFee === 0}
              className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#4F46E5] to-[#0284C7] text-white hover:brightness-110 disabled:opacity-50 transition-all shadow-xl hover:scale-[1.02] shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting Quote...</span>
                </>
              ) : (
                <>
                  <span>
                    Submit Quote (₹{totalQuotedFee.toLocaleString('en-IN')})
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
