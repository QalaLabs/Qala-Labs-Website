import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Brain,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  IndianRupee,
  Calendar,
  MessageCircle,
  ExternalLink,
  Loader2,
  Cpu,
  Target,
  BarChart3,
  Flame,
} from 'lucide-react';

interface AiGrowthDiagnosticProps {
  className?: string;
  source?: string;
}

const GOOGLE_CALENDAR_DIRECT_URL = 'https://calendar.app.google/EvA2Kw9rgA4xq8798';
const WHATSAPP_URL =
  "https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I%20just%20completed%20the%20AI%20Growth%20Diagnostic%20and%20want%20to%20discuss%20deploying%20agents.";

export const AiGrowthDiagnostic: React.FC<AiGrowthDiagnosticProps> = ({
  className = '',
  source = 'ai_growth_diagnostic',
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Scale & Growth Economics
  const [sector, setSector] = useState<'d2c' | 'b2b_saas' | 'agency' | 'omnichannel'>('d2c');
  const [monthlyRevenue, setMonthlyRevenue] = useState(5000000); // ₹50L default
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(1200000); // ₹12L default
  const [currentRoas, setCurrentRoas] = useState(2.8);

  // Step 2: Operational Friction & Latency
  const [manualHoursWeekly, setManualHoursWeekly] = useState(20);
  const [weeklyHooks, setWeeklyHooks] = useState(8);
  const [inquiryLatency, setInquiryLatency] = useState<'fast' | 'moderate' | 'slow'>('moderate');
  const [reconciliationStatus, setReconciliationStatus] = useState<'manual' | 'semi' | 'unknown'>('manual');

  // Step 3 & 4: Lead Details & Submission
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Algorithmic Calculations
  const calculatedCacVelocity = Math.min(
    95,
    Math.round((currentRoas / 4) * 50 + (weeklyHooks >= 20 ? 30 : weeklyHooks * 1.5) + (inquiryLatency === 'fast' ? 15 : 5))
  );

  const calculatedBackOfficeDrag = Math.min(
    92,
    Math.round(
      (manualHoursWeekly / 40) * 45 +
        (reconciliationStatus === 'manual' ? 35 : reconciliationStatus === 'semi' ? 18 : 30) +
        (inquiryLatency === 'slow' ? 15 : 5)
    )
  );

  const calculatedAutomationPotential = Math.max(
    65,
    Math.min(94, Math.round(calculatedBackOfficeDrag * 0.8 + 25))
  );

  // Estimated annual EBITDA recovery (wasted ad spend leakage + ops headcount hours reclaimed)
  const estimatedAdLeakageRecovery = Math.round(monthlyAdSpend * 0.18 * 12);
  const estimatedOpsReclaimedValue = Math.round(manualHoursWeekly * 1200 * 52);
  const totalAnnualValueUnlocked = estimatedAdLeakageRecovery + estimatedOpsReclaimedValue;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const diagnosticPayload = {
      name,
      companyName,
      phone,
      email,
      description: `[AI GROWTH & OPS DIAGNOSTIC REPORT]
Sector: ${sector.toUpperCase()}
Monthly GMV: ₹${(monthlyRevenue / 100000).toFixed(1)} Lakhs
Monthly Ad Spend: ₹${(monthlyAdSpend / 100000).toFixed(1)} Lakhs
Current Blended ROAS: ${currentRoas}x
Weekly Manual Ops Hours: ${manualHoursWeekly} hrs/wk
Creative Hook Cadence: ${weeklyHooks} hooks/wk
Response Latency: ${inquiryLatency}
Reconciliation: ${reconciliationStatus}

CALCULATED DIAGNOSTIC METRICS:
- CAC Velocity Score: ${calculatedCacVelocity}/100
- Back-Office Drag Index: ${calculatedBackOfficeDrag}%
- Agentic Automation Potential: ${calculatedAutomationPotential}%
- Projected Annual Capital Recovery: ₹${(totalAnnualValueUnlocked / 100000).toFixed(2)} Lakhs`,
      source,
      b_url: honeypot || undefined,
    };

    try {
      // Dual-target endpoint support: attempt /api/lead first, then fallback to /api/lead.php if 404
      let response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diagnosticPayload),
      });

      if (response.status === 404) {
        response = await fetch('/api/lead.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(diagnosticPayload),
        });
      }

      if (!response.ok) {
        let errDesc = `Audit generation failed with status (${response.status})`;
        try {
          const resJson = await response.json();
          if (resJson?.error) errDesc = resJson.error;
        } catch {
          // ignore parse error
        }
        throw new Error(errDesc);
      }

      // Strictly gate success only on response.ok (Rule 1)
      setSubmitted(true);
      setStep(4);
    } catch (err: any) {
      console.error('Diagnostic submission error:', err);
      setErrorMessage(
        err?.message || 'Network offline. You can also reach our team directly at hello@qalalabs.com or via WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="ai-growth-diagnostic"
      className={`rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Ambient decorative glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#3FE0E0]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#4F46E5]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Eyebrow & Progress */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <div className="eyebrow mb-2">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            FLAGSHIP GAAS LEAD MAGNET • INTERACTIVE DIAGNOSTIC
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>AI Growth &amp; Ops Diagnostic Engine</span>
            <Sparkles className="w-5 h-5 text-[#3FE0E0]" />
          </h3>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Calculate your CAC velocity, back-office drag, and autonomous swarm capital recovery in under 90 seconds.
          </p>
        </div>

        {/* Step Indicator Tabs */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {[
            { num: 1, label: 'Scale' },
            { num: 2, label: 'Ops Drag' },
            { num: 3, label: 'Audit Score' },
            { num: 4, label: 'Roadmap' },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                step === s.num
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-black font-bold border-transparent shadow-[0_0_12px_rgba(63,224,224,0.4)]'
                  : step > s.num
                  ? 'bg-white/10 text-[#34D399] border-white/20'
                  : 'bg-white/5 text-white/40 border-white/10'
              }`}
            >
              <span>{s.num}.</span>
              <span className="hidden md:inline">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: Scale & Growth Economics */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <label className="block text-xs font-mono text-white/80 uppercase tracking-wider mb-2.5">
              1. Business Sector &amp; Revenue Architecture
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'd2c', label: 'D2C Brand', desc: 'Shopify / Quick-Commerce' },
                { id: 'b2b_saas', label: 'B2B SaaS', desc: 'High ACV / Sales Led' },
                { id: 'agency', label: 'Agency / Studio', desc: 'Retainer / Production' },
                { id: 'omnichannel', label: 'Omnichannel', desc: 'Retail + Marketplace' },
              ].map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setSector(sec.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    sector === sec.id
                      ? 'bg-white/15 border-[#3FE0E0] shadow-[0_0_15px_rgba(63,224,224,0.25)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="font-bold text-white text-xs">{sec.label}</div>
                  <div className="text-[10px] text-white/50 mt-1">{sec.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Monthly Revenue */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white/70 font-mono">Monthly GMV / Revenue</span>
                <span className="text-sm font-bold text-[#3FE0E0] font-mono">
                  ₹{(monthlyRevenue / 100000).toFixed(0)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="25000000"
                step="500000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full accent-[#3FE0E0] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                <span>₹5L</span>
                <span>₹1.5 Cr</span>
                <span>₹2.5 Cr+</span>
              </div>
            </div>

            {/* Monthly Ad Spend */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white/70 font-mono">Monthly Paid Ad Spend</span>
                <span className="text-sm font-bold text-[#4F46E5] font-mono">
                  ₹{(monthlyAdSpend / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={monthlyAdSpend}
                onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
                className="w-full accent-[#4F46E5] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                <span>₹1L</span>
                <span>₹50L</span>
                <span>₹1 Cr+</span>
              </div>
            </div>

            {/* Current Blended ROAS */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white/70 font-mono">Current Blended ROAS</span>
                <span className="text-sm font-bold text-[#34D399] font-mono">{currentRoas.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="7.0"
                step="0.1"
                value={currentRoas}
                onChange={(e) => setCurrentRoas(Number(e.target.value))}
                className="w-full accent-[#34D399] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                <span>1.0x</span>
                <span>3.5x</span>
                <span>7.0x+</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-black font-bold text-xs flex items-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <span>Next: Assess Back-Office &amp; Creative Friction</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Operational Friction & Latency */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weekly Manual Hours */}
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white/80 font-mono">Weekly Manual Reporting &amp; Ops Hours</span>
                <span className="text-sm font-bold text-amber-400 font-mono">{manualHoursWeekly} hrs/wk</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={manualHoursWeekly}
                onChange={(e) => setManualHoursWeekly(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <p className="text-[11px] text-white/50 mt-2">
                Time team spends manually exporting CSVs, matching marketplace invoices, or compiling ad spend reports.
              </p>
            </div>

            {/* Weekly Creative Hook Output */}
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white/80 font-mono">New Ad Creative / Hook Velocity</span>
                <span className="text-sm font-bold text-[#3FE0E0] font-mono">{weeklyHooks} variations/wk</span>
              </div>
              <input
                type="range"
                min="2"
                max="40"
                step="2"
                value={weeklyHooks}
                onChange={(e) => setWeeklyHooks(Number(e.target.value))}
                className="w-full accent-[#3FE0E0] cursor-pointer"
              />
              <p className="text-[11px] text-white/50 mt-2">
                High-growth brands deploy 20–30 weekly variants to outpace creative fatigue on Meta and TikTok.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inquiry Response Latency */}
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <label className="block text-xs font-mono text-white/80 uppercase tracking-wider mb-2.5">
                Lead / High-Intent Inquiry Response Latency
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'fast', label: '< 2 Mins', desc: 'Automated Agent' },
                  { id: 'moderate', label: '15 - 60 Mins', desc: 'Manual Reps' },
                  { id: 'slow', label: '> 4 Hours', desc: 'High Drop-Off' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setInquiryLatency(item.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      inquiryLatency === item.id
                        ? 'bg-[#3FE0E0]/20 border-[#3FE0E0] text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] opacity-60 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reconciliation Process */}
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <label className="block text-xs font-mono text-white/80 uppercase tracking-wider mb-2.5">
                Marketplace &amp; Payment Reconciliation
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'manual', label: 'Manual Sheets', desc: 'High Errors' },
                  { id: 'semi', label: 'Basic Tool', desc: 'Disjointed' },
                  { id: 'unknown', label: 'Undetected', desc: 'Silent Leakage' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setReconciliationStatus(item.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      reconciliationStatus === item.id
                        ? 'bg-[#4F46E5]/30 border-[#4F46E5] text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] opacity-60 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 font-medium text-xs hover:bg-white/10 transition-colors cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-black font-bold text-xs flex items-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <span>Calculate AI Growth Diagnostic Score</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Algorithmic Scorecard & Unlock Form */}
      {step === 3 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Scorecard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/10 text-center relative overflow-hidden">
              <div className="text-[11px] font-mono text-white/60 uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#3FE0E0]" />
                <span>CAC Velocity Score</span>
              </div>
              <div className="text-3xl font-extrabold text-[#3FE0E0] font-mono my-2">
                {calculatedCacVelocity} <span className="text-sm font-normal text-white/40">/ 100</span>
              </div>
              <div className="text-[11px] text-white/60">
                {calculatedCacVelocity > 70 ? 'High Acquisition Velocity' : 'Constrained by Creative Fatigue'}
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/10 text-center relative overflow-hidden">
              <div className="text-[11px] font-mono text-white/60 uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Back-Office Drag</span>
              </div>
              <div className="text-3xl font-extrabold text-amber-400 font-mono my-2">
                {calculatedBackOfficeDrag}%
              </div>
              <div className="text-[11px] text-white/60">
                {calculatedBackOfficeDrag > 50 ? 'Significant Payroll & Ops Waste' : 'Moderate Operational Efficiency'}
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/10 text-center relative overflow-hidden">
              <div className="text-[11px] font-mono text-white/60 uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span>Automation Potential</span>
              </div>
              <div className="text-3xl font-extrabold text-[#818CF8] font-mono my-2">
                {calculatedAutomationPotential}%
              </div>
              <div className="text-[11px] text-white/60">Workflows Replaceable by Swarms</div>
            </div>

            {/* Metric 4 */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#10B981]/20 to-[#3FE0E0]/10 border border-[#10B981]/40 text-center relative overflow-hidden shadow-lg">
              <div className="text-[11px] font-mono text-[#34D399] uppercase tracking-wider mb-1 flex items-center justify-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Est. Capital Recovery</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono my-2">
                ₹{(totalAnnualValueUnlocked / 100000).toFixed(1)}L <span className="text-xs font-normal text-white/70">/ yr</span>
              </div>
              <div className="text-[11px] text-[#34D399] font-medium">Annual EBITDA Leakage Reclaimable</div>
            </div>
          </div>

          {/* Lead Capture Gated Form */}
          <div className="rounded-2xl border border-white/15 bg-[#090A15]/90 p-6 sm:p-8">
            <div className="text-center max-w-xl mx-auto mb-6">
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                Unlock Your 12-Point GAAS Deployment Roadmap
              </h4>
              <p className="text-xs sm:text-sm text-white/70">
                We'll email you the custom architecture blueprint showing exactly which LangGraph agent swarms and 3D landing experiences will recover this capital.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a href="mailto:hello@qalalabs.com" className="underline font-semibold hover:text-white">
                    Email hello@qalalabs.com
                  </a>
                  <span>&bull;</span>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold text-[#34D399]">
                    WhatsApp Direct
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
              {/* Honeypot field for bot deterrence */}
              <input
                type="text"
                name="b_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#3FE0E0] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                    Company / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Nutrivend UK"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#3FE0E0] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@nutrivend.co.uk"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#3FE0E0] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 20 7946 0912"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#3FE0E0] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-white/60 hover:text-white underline cursor-pointer"
                >
                  &larr; Adjust Diagnostic Metrics
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(63,224,224,0.35)] hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Synthesizing Strategy Blueprint...</span>
                    </>
                  ) : (
                    <>
                      <span>Receive 12-Point Blueprint &amp; Audit</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STEP 4: Execution Blueprint Preview & 1-Click Action */}
      {step === 4 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="p-6 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/40 text-center">
            <div className="w-12 h-12 rounded-full bg-[#10B981]/20 text-[#34D399] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-1">
              Diagnostic &amp; Architecture Roadmap Dispatched!
            </h4>
            <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto">
              We've logged your diagnostic and dispatched the full breakdown to <strong className="text-white">{email}</strong>.
            </p>
          </div>

          {/* 3 Core Immediate Interventions */}
          <div>
            <h5 className="text-xs font-mono text-white/60 uppercase tracking-widest mb-4">
              RECOMMENDED SWARM DEPLOYMENT SPECIFICATIONS
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#3FE0E0] mb-2">
                  <Target className="w-4 h-4" />
                  <span>1. CreativeEngine Swarm</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Automate the generation of 20+ weekly modular hooks to break through the {weeklyHooks}/wk ceiling and elevate blended ROAS above 3.8x.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4F46E5] mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>2. MarksOps Invoicing Agent</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Eliminate {manualHoursWeekly} weekly hours of manual reporting and CSV imports by piping Amazon VC, Meta, and SaaS invoices directly into staged drafts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#34D399] mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>3. ReconSwarm Audit</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Audit payment gateways and marketplace settlement reports to recover the estimated ₹{(totalAnnualValueUnlocked / 100000).toFixed(1)}L in silent margin leakage.
                </p>
              </div>
            </div>
          </div>

          {/* 1-Click Meeting & WhatsApp Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-white/10">
            <a
              href={GOOGLE_CALENDAR_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-black" />
              <span>Schedule 30-Min Diagnostic Review</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#34D399]" />
              <span>Discuss on WhatsApp Direct</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
