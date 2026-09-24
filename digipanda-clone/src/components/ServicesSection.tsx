import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Sparkles,
  Layers,
  Cpu,
  TrendingUp,
  Globe,
  Share2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Activity,
  Maximize2,
  Layers as StackIcon,
  Play,
  Database,
  Check,
} from 'lucide-react';

interface Capability {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  badge1: string;
  badge2: string;
  category: string;
  caseStudySlug?: string;
  portfolioSlug?: string;
  icon: React.ReactNode;
  iconBg: string;
  accentColor: string;
}

const aiCapabilities: Capability[] = [
  {
    id: 'ai-creative',
    title: 'AI Ad Creative Engine',
    subtitle: 'Autonomous multi-format generative pipeline',
    desc: '80% lower production cost, 50+ weekly on-brand creatives for global conservation campaigns.',
    badge1: '80% Production Cost Saved',
    badge2: '50+ Variations/Wk',
    category: 'Generative AI',
    portfolioSlug: 'wwf-ai-creative-studio',
    icon: <Sparkles className="w-5 h-5 text-[#3FE0E0]" />,
    iconBg: 'rgba(63, 224, 224, 0.15)',
    accentColor: '#3FE0E0',
  },
  {
    id: 'b2b-audience',
    title: 'B2B Audience Engineering',
    subtitle: 'Algorithmic targeting & decision-maker validation',
    desc: '45 enterprise leads & 71% untapped market discovery for fitness nutrition distribution.',
    badge1: '94% Facility Match',
    badge2: '45 Qualified Leads',
    category: 'Meta Lead Gen',
    caseStudySlug: 'nutrivend-uk',
    icon: <Cpu className="w-5 h-5 text-[#4F46E5]" />,
    iconBg: 'rgba(79, 70, 229, 0.15)',
    accentColor: '#818cf8',
  },
  {
    id: 'high-ticket',
    title: 'High-Ticket Acquisition',
    subtitle: 'High-trust founder storytelling & conversion funnel',
    desc: '28x ROAS founder-led travel lead generation, shrinking the decision cycle to 72 hours.',
    badge1: '28x ROAS',
    badge2: '₹14L Revenue',
    category: 'Founder Storytelling',
    caseStudySlug: 'trotr-spain-pivot',
    icon: <TrendingUp className="w-5 h-5 text-[#34D399]" />,
    iconBg: 'rgba(52, 211, 153, 0.15)',
    accentColor: '#34D399',
  },
  {
    id: 'luxury-horology',
    title: 'Luxury Horology Pipeline',
    subtitle: 'High-net-worth collector acquisition & vault provenance',
    desc: '₹4.2Cr+ high-net-worth collector pipeline built for authenticated rare Swiss timepieces.',
    badge1: 'Net Worth >₹50L',
    badge2: '₹4.2Cr Pipeline',
    category: 'Luxury E-commerce',
    caseStudySlug: 'chrono-seconds',
    icon: <Share2 className="w-5 h-5 text-[#f59e0b]" />,
    iconBg: 'rgba(245, 158, 11, 0.15)',
    accentColor: '#f59e0b',
  },
  {
    id: 'marketplace',
    title: 'Marketplace Architecture',
    subtitle: 'Multi-vendor schema & real-time inventory synchronization',
    desc: 'Wholesale & retail digitization with 1,000+ live SKUs shipped in a 28-day sprint.',
    badge1: '1,000+ SKUs',
    badge2: 'Live Sync',
    category: 'Brand Identity & Web',
    caseStudySlug: 'gaffar-india',
    icon: <Layers className="w-5 h-5 text-[#a78bfa]" />,
    iconBg: 'rgba(167, 139, 250, 0.15)',
    accentColor: '#c084fc',
  },
  {
    id: 'merchandise',
    title: 'Merchandise Ecosystem',
    subtitle: 'League-wide fan funnels & tech-pack manufacturing',
    desc: '8 IPL franchise collections & ₹2.5Cr+ volume across 85,000+ official merchandise units.',
    badge1: '8 IPL Franchises',
    badge2: 'Production Grade',
    category: 'E-commerce & Retail',
    portfolioSlug: 'playr-real-fans-content',
    icon: <Globe className="w-5 h-5 text-[#3FE0E0]" />,
    iconBg: 'rgba(63, 224, 224, 0.15)',
    accentColor: '#3FE0E0',
  },
];

const qalaPillars = [
  {
    step: '01',
    title: 'Discovery & Validation',
    desc: 'We eliminate guesswork. Through rigorous A/B audience engineering and data validation, we pinpoint highest-intent market segments before scaling spend.',
    pills: [
      'B2B Audience Testing',
      'Market Validation',
      'Unit Economics',
      'Founder Narrative',
      'Brand Audit',
      'Intent Analysis',
    ],
  },
  {
    step: '02',
    title: 'Craft & Identity',
    desc: 'Design that captivates and converts. From heritage brand modernization to league-wide apparel lines and high-conversion UI/UX systems.',
    pills: [
      'Brand Identity',
      'Apparel Design',
      'Packaging Systems',
      'Marketplace UI/UX',
      'Asset Design Kits',
    ],
  },
  {
    step: '03',
    title: 'Engineering',
    desc: 'Resilient, scalable software architectures built for high-throughput ecommerce, proptech portals, and autonomous business workflows.',
    pills: [
      'Next.js & React',
      'Multi-Vendor Marketplaces',
      'Custom CRM Portals',
      'Supabase & APIs',
      'Performance Tuning',
    ],
  },
  {
    step: '04',
    title: 'Performance & Scale',
    desc: 'Data-led performance marketing that prioritizes profit over vanity metrics. From 28x ROAS travel funnels to Amazon Ads scaling.',
    pills: [
      'Meta High-Ticket Ads',
      'Amazon Ads (11x ROAS)',
      'Luxury Buyer Funnels',
      'Community Loyalty',
      'Email Automations',
    ],
  },
];

export const ServicesSection: React.FC = () => {
  const [activeCapId, setActiveCapId] = useState<string>('ai-creative');

  const activeCap =
    aiCapabilities.find((c) => c.id === activeCapId) || aiCapabilities[0];

  return (
    <section id="services" className="relative py-24 md:py-32 bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/bgrk1.webp')] bg-cover bg-center opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
            Full-Stack Growth & Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight mb-4">
            The Power We Deliver
          </h2>
          <p className="text-white/70 text-base md:text-lg">
            From creative storytelling to high-performance engineering — one dedicated growth partner uniting art and technology to scale category leaders.
          </p>
        </div>

        {/* Feature Banner: Interactive Deliverable Preview Canvas */}
        <div className="rounded-[32px] border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-black/60 p-5 sm:p-8 lg:p-10 mb-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          
          {/* Header of Feature Canvas */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#3FE0E0] uppercase tracking-wider mb-2">
                <Zap className="w-4 h-4 text-[#3FE0E0]" />
                PROPRIETARY ENGINES & DELIVERABLE MATRIX
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
                Interactive Deliverable Canvas
              </h3>
              <p className="text-white/65 text-xs sm:text-sm mt-1 max-w-2xl">
                Explore real, production-ready deliverables engineered for category leaders. Select any capability to inspect its visual architecture and verified telemetry.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3FE0E0]/30 bg-[#3FE0E0]/10 text-[#3FE0E0] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-ping" />
                Live Architecture Preview
              </span>
            </div>
          </div>

          {/* Interactive Layout: Left Tabs/Cards + Right Live Preview Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Col: Capability Cards / Tab Selector */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1 flex items-center justify-between">
                <span>Select Architecture</span>
                <span className="text-[11px] text-[#3FE0E0]">6 Production Systems</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {aiCapabilities.map((cap) => {
                  const isActive = cap.id === activeCapId;
                  return (
                    <button
                      key={cap.id}
                      type="button"
                      onClick={() => setActiveCapId(cap.id)}
                      onMouseEnter={() => setActiveCapId(cap.id)}
                      className={`text-left rounded-2xl p-3.5 transition-all duration-300 border flex items-center justify-between gap-3.5 group relative overflow-hidden ${
                        isActive
                          ? 'border-[#3FE0E0] bg-white/[0.08] shadow-[0_0_30px_-5px_rgba(63,224,224,0.3)] ring-1 ring-[#3FE0E0]/40'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3FE0E0] to-[#4F46E5]" />
                      )}

                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: cap.iconBg }}
                        >
                          {cap.icon}
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`font-semibold text-sm truncate transition-colors ${
                              isActive ? 'text-[#3FE0E0]' : 'text-white group-hover:text-white'
                            }`}
                          >
                            {cap.title}
                          </div>
                          <div className="text-white/50 text-[11px] truncate">
                            {cap.desc}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center">
                        {isActive ? (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3FE0E0]/20 text-[#3FE0E0] text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3FE0E0] animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-white/30 group-hover:text-white/70 transition-colors">
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Context */}
              <div className="mt-3 p-3.5 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#3FE0E0]" />
                  <span>Attribution & code verified in production</span>
                </div>
                <Link
                  to={activeCap.portfolioSlug ? `/portfolio/${activeCap.portfolioSlug}` : `/case-studies/${activeCap.caseStudySlug}`}
                  className="text-[#3FE0E0] hover:underline font-semibold flex items-center gap-1 shrink-0"
                >
                  {activeCap.portfolioSlug ? 'Portfolio Project' : 'Case Study'} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Right Col: Dedicated Deliverable Preview Canvas */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/15 bg-[#070913]/90 backdrop-blur-xl p-5 sm:p-7 flex flex-col justify-between h-full min-h-[480px] relative overflow-hidden shadow-2xl">
                
                {/* Canvas Grid Background Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#3FE0E0]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Canvas Frame Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    </div>
                    <span className="text-white/40 text-xs font-mono pl-2 border-l border-white/10">
                      DELIVERABLE_CANVAS :: {activeCap.id.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border border-white/10 bg-white/5 text-white/70">
                      {activeCap.category}
                    </span>
                    <span className="hidden sm:inline-flex px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border border-[#3FE0E0]/30 bg-[#3FE0E0]/15 text-[#3FE0E0]">
                      PROD VERIFIED
                    </span>
                  </div>
                </div>

                {/* Canvas Interactive Center Artifact */}
                <div className="relative z-10 my-auto py-4">
                  {/* Capability 1: AI Ad Creative Engine */}
                  {activeCap.id === 'ai-creative' && (
                    <div className="flex flex-col items-center">
                      <div className="relative w-full max-w-md h-56 sm:h-64 flex items-center justify-center">
                        {/* 16:9 Landscape Card (Back) */}
                        <div className="absolute top-2 w-[85%] aspect-[16/9] rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-3 shadow-lg transform -rotate-6 scale-90 opacity-70">
                          <div className="flex items-center justify-between text-[10px] text-white/60 mb-2">
                            <span className="font-mono">16:9 Landscape Banner</span>
                            <span className="text-[#3FE0E0]">YouTube / OTT</span>
                          </div>
                          <div className="h-14 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center">
                            <span className="text-white/40 text-xs font-mono">WWF Habitat Cinema 4K</span>
                          </div>
                        </div>

                        {/* 1:1 Square Card (Middle) */}
                        <div className="absolute w-[68%] aspect-square rounded-2xl border border-white/20 bg-gradient-to-br from-[#101426] to-[#0A0D18] p-3.5 shadow-xl transform rotate-3 scale-95 opacity-90">
                          <div className="flex items-center justify-between text-[10px] text-white/70 mb-2">
                            <span className="font-mono">1:1 Feed Canvas</span>
                            <span className="text-[#3FE0E0] font-bold">Meta / LinkedIn</span>
                          </div>
                          <div className="h-20 rounded-xl bg-gradient-to-tr from-emerald-950/60 to-black/80 border border-emerald-500/20 p-2 flex flex-col justify-between">
                            <span className="text-[10px] text-emerald-400 font-medium">Auto-Generated Visual Variant #34</span>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                              <div className="w-4/5 bg-[#3FE0E0] h-full rounded-full" />
                            </div>
                          </div>
                        </div>

                        {/* 9:16 Vertical Reel Card (Front) */}
                        <div className="relative w-[48%] sm:w-[44%] aspect-[9/16] rounded-2xl border-2 border-[#3FE0E0] bg-gradient-to-b from-[#090D1A] via-[#0E1528] to-[#050811] p-3.5 shadow-[0_0_35px_rgba(63,224,224,0.35)] transform z-20">
                          <div className="flex items-center justify-between text-[9px] font-mono text-[#3FE0E0] mb-2 font-bold">
                            <span>9:16 REELS/TIKTOK</span>
                            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-ping" />
                          </div>
                          <div className="h-24 rounded-lg bg-gradient-to-b from-[#3FE0E0]/20 to-transparent border border-[#3FE0E0]/30 p-2 flex flex-col justify-between mb-2">
                            <div className="text-[10px] font-bold text-white leading-tight">
                              Protect Corbett Corridor
                            </div>
                            <div className="flex items-center gap-1">
                              <Play className="w-3 h-3 text-[#3FE0E0] fill-[#3FE0E0]" />
                              <div className="flex items-center gap-0.5 h-3">
                                {[40, 90, 60, 100, 75, 45, 80].map((h, i) => (
                                  <span
                                    key={i}
                                    className="w-0.5 bg-[#3FE0E0] rounded-full"
                                    style={{ height: `${h}%` }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-[9px] text-white/70 line-clamp-2">
                            50+ weekly AI-rendered variants deployed to Meta CAPI.
                          </div>
                        </div>
                      </div>

                      {/* Deliverable Metrics Badges */}
                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className="px-3 py-1 rounded-full border border-[#3FE0E0]/40 bg-[#3FE0E0]/15 text-[#3FE0E0] text-xs font-bold shadow-sm">
                          ✓ {activeCap.badge1}
                        </span>
                        <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold">
                          ⚡ {activeCap.badge2}
                        </span>
                        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs font-mono">
                          Render: 1.2s • 4K Raster
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Capability 2: B2B Audience Engineering */}
                  {activeCap.id === 'b2b-audience' && (
                    <div className="w-full max-w-lg mx-auto">
                      <div className="rounded-2xl border border-white/15 bg-black/60 p-4 sm:p-5 backdrop-blur-md">
                        <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3 pb-2 border-b border-white/10">
                          <span>TARGETING_SCHEMA_MATRIX</span>
                          <span className="text-[#818cf8]">Nutrivend UK Pipeline</span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-white/70">Facility Classification</span>
                            <span className="font-semibold text-white">Commercial Gyms & Leisure Trusts</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-white/70">Decision-Maker Matrix</span>
                            <span className="font-semibold text-[#3FE0E0]">MDs, Ops Directors, Procurement</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-white/70">Data Match & Verification</span>
                            <span className="font-mono text-emerald-400 font-bold">94% Facility Match Rate</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-white/70">7-Day Acquired Volume</span>
                            <span className="font-mono text-[#818cf8] font-bold">45 Enterprise Leads</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                          <span>Untapped Market Share: <strong className="text-white">71%</strong></span>
                          <span>Cost Per Lead: <strong className="text-emerald-400">-62% Benchmark</strong></span>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className="px-3 py-1 rounded-full border border-[#4F46E5]/40 bg-[#4F46E5]/20 text-[#818cf8] text-xs font-bold">
                          ✓ {activeCap.badge1}
                        </span>
                        <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold">
                          ⚡ {activeCap.badge2}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Capability 3: High-Ticket Acquisition */}
                  {activeCap.id === 'high-ticket' && (
                    <div className="w-full max-w-lg mx-auto">
                      <div className="rounded-2xl border border-white/15 bg-black/60 p-4 sm:p-5 backdrop-blur-md">
                        <div className="text-xs font-mono text-white/50 mb-3 pb-2 border-b border-white/10 flex items-center justify-between">
                          <span>FUNNEL_CONVERSION_LADDER</span>
                          <span className="text-[#34D399]">Founder-Led Narrative</span>
                        </div>

                        {/* Conversion Ladder Stages */}
                        <div className="relative pl-6 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#3FE0E0] via-[#4F46E5] to-[#34D399]">
                          <div className="relative flex items-center justify-between">
                            <span className="absolute -left-6 w-4 h-4 rounded-full border-2 border-[#3FE0E0] bg-[#070913] flex items-center justify-center text-[9px] text-[#3FE0E0] font-bold">1</span>
                            <div>
                              <div className="text-xs font-bold text-white">Hook: Founder Odyssey</div>
                              <div className="text-[11px] text-white/50">Unfiltered Spain travel narrative</div>
                            </div>
                            <span className="text-[11px] font-mono text-[#3FE0E0] font-semibold">4.8% CTR</span>
                          </div>

                          <div className="relative flex items-center justify-between">
                            <span className="absolute -left-6 w-4 h-4 rounded-full border-2 border-[#4F46E5] bg-[#070913] flex items-center justify-center text-[9px] text-[#818cf8] font-bold">2</span>
                            <div>
                              <div className="text-xs font-bold text-white">Trust VSL: Experience Proof</div>
                              <div className="text-[11px] text-white/50">Zero-discount value proposition</div>
                            </div>
                            <span className="text-[11px] font-mono text-[#818cf8] font-semibold">68% Watch</span>
                          </div>

                          <div className="relative flex items-center justify-between">
                            <span className="absolute -left-6 w-4 h-4 rounded-full border-2 border-emerald-400 bg-[#070913] flex items-center justify-center text-[9px] text-emerald-400 font-bold">3</span>
                            <div>
                              <div className="text-xs font-bold text-white">Qualified App Intake</div>
                              <div className="text-[11px] text-white/50">High-ticket vetting questionnaire</div>
                            </div>
                            <span className="text-[11px] font-mono text-emerald-400 font-semibold">42% Submissions</span>
                          </div>

                          <div className="relative flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                            <span className="absolute -left-6 w-4 h-4 rounded-full bg-[#34D399] flex items-center justify-center text-[9px] text-black font-bold">✓</span>
                            <div>
                              <div className="text-xs font-bold text-emerald-300">Closed Bookings (72h Cycle)</div>
                              <div className="text-[11px] text-white/70">₹14L revenue generated</div>
                            </div>
                            <span className="text-sm font-mono text-[#34D399] font-extrabold">28x ROAS</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className="px-3 py-1 rounded-full border border-[#34D399]/40 bg-[#34D399]/15 text-[#34D399] text-xs font-bold">
                          ✓ {activeCap.badge1}
                        </span>
                        <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold">
                          ⚡ {activeCap.badge2}
                        </span>
                        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs font-mono">
                          Cycle: Reduced from 21d to 72h
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Capability 4: Luxury Horology Pipeline */}
                  {activeCap.id === 'luxury-horology' && (
                    <div className="w-full max-w-lg mx-auto">
                      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#131108] to-[#0A0905] p-5 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
                        <div className="flex items-center justify-between text-xs font-mono text-amber-400/80 mb-3 pb-2 border-b border-amber-500/20">
                          <span className="flex items-center gap-1.5 font-bold tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                            CHRONO SECONDS :: HNWI GATE
                          </span>
                          <span className="text-[10px] text-white/50">VAULT PASSPORT #CS-9042</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
                            <div className="text-[10px] text-amber-200/60 uppercase font-mono">Verified Buyer Threshold</div>
                            <div className="text-base font-bold text-white mt-0.5">Net Worth &gt;₹50L</div>
                            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Escrow Audited
                            </div>
                          </div>

                          <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
                            <div className="text-[10px] text-amber-200/60 uppercase font-mono">Qualified Collector Pipeline</div>
                            <div className="text-base font-bold text-amber-400 mt-0.5">₹4.2Cr Pipeline</div>
                            <div className="text-[10px] text-white/60 mt-1">Avg Order: ₹8.4 Lakhs</div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl border border-white/10 bg-black/40 text-xs flex items-center justify-between">
                          <span className="text-white/70">Authenticated Provenance</span>
                          <span className="font-mono text-white/90">Rolex Daytona & Patek 5711</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className="px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/15 text-amber-400 text-xs font-bold">
                          ✓ {activeCap.badge1}
                        </span>
                        <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold">
                          ⚡ {activeCap.badge2}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Capability 5: Marketplace Architecture */}
                  {activeCap.id === 'marketplace' && (
                    <div className="w-full max-w-lg mx-auto">
                      <div className="rounded-2xl border border-white/15 bg-black/60 p-4 sm:p-5 backdrop-blur-md">
                        <div className="text-xs font-mono text-white/50 mb-3 pb-2 border-b border-white/10 flex items-center justify-between">
                          <span>SKU_SCHEMA_NODE_GRAPH</span>
                          <span className="text-[#a78bfa]">Gaffar Multi-Vendor Engine</span>
                        </div>

                        {/* Node Graph Mockup */}
                        <div className="relative py-2 flex flex-col items-center gap-3">
                          <div className="px-4 py-2 rounded-xl border border-[#a78bfa] bg-[#a78bfa]/20 text-[#c084fc] font-bold text-xs shadow-md">
                            Central Catalog Engine (1,000+ SKUs)
                          </div>

                          <div className="w-full grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 rounded-lg border border-white/10 bg-white/5">
                              <div className="text-[10px] text-white/50 font-mono">Node A</div>
                              <div className="text-xs font-bold text-white">120+ Vendors</div>
                              <div className="text-[9px] text-emerald-400">Live Portals</div>
                            </div>

                            <div className="p-2 rounded-lg border border-[#3FE0E0]/30 bg-[#3FE0E0]/10">
                              <div className="text-[10px] text-[#3FE0E0] font-mono">Sync Relay</div>
                              <div className="text-xs font-bold text-white">18ms Latency</div>
                              <div className="text-[9px] text-[#3FE0E0]">Live Sync</div>
                            </div>

                            <div className="p-2 rounded-lg border border-white/10 bg-white/5">
                              <div className="text-[10px] text-white/50 font-mono">Node C</div>
                              <div className="text-xs font-bold text-white">Split Checkout</div>
                              <div className="text-[9px] text-emerald-400">Unified Cart</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                          <span>Delivery Timeline: <strong className="text-white">28-Day Turnaround</strong></span>
                          <span>Asset Packages: <strong className="text-[#a78bfa]">6 Delivered</strong></span>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className="px-3 py-1 rounded-full border border-purple-500/40 bg-purple-500/20 text-purple-300 text-xs font-bold">
                          ✓ {activeCap.badge1}
                        </span>
                        <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold">
                          ⚡ {activeCap.badge2}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Capability 6: Merchandise Ecosystem */}
                  {activeCap.id === 'merchandise' && (
                    <div className="w-full max-w-lg mx-auto">
                      <div className="rounded-2xl border border-white/15 bg-black/60 p-4 sm:p-5 backdrop-blur-md">
                        <div className="text-xs font-mono text-white/50 mb-3 pb-2 border-b border-white/10 flex items-center justify-between">
                          <span>APPAREL_3D_WIREFRAME_SPEC</span>
                          <span className="text-[#3FE0E0]">playR Official Partner</span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          {/* Stylized Jersey Wireframe SVG */}
                          <div className="w-28 h-32 shrink-0 border border-white/15 rounded-xl bg-white/[0.03] p-2 flex items-center justify-center">
                            <svg
                              viewBox="0 0 100 120"
                              className="w-full h-full text-[#3FE0E0] stroke-current fill-none"
                              strokeWidth="1.5"
                            >
                              {/* Jersey Wireframe Outline */}
                              <path d="M 35 15 L 65 15 L 60 25 L 40 25 Z" strokeDasharray="2,2" />
                              <path d="M 35 15 L 10 32 L 22 48 L 32 40 L 32 105 L 68 105 L 68 40 L 78 48 L 90 32 L 65 15" />
                              <line x1="32" y1="40" x2="68" y2="40" strokeDasharray="2,2" opacity="0.5" />
                              <line x1="50" y1="25" x2="50" y2="105" strokeDasharray="3,3" opacity="0.4" />
                              <circle cx="50" cy="55" r="8" opacity="0.6" />
                            </svg>
                          </div>

                          <div className="space-y-2 flex-1 text-xs">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                              <span className="text-white/60">Franchise Network</span>
                              <span className="font-bold text-white">8 IPL Franchises</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                              <span className="text-white/60">Official Dispatched Volume</span>
                              <span className="font-bold text-[#3FE0E0]">85,000+ Units</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                              <span className="text-white/60">Season Merchandise Gross</span>
                              <span className="font-mono text-emerald-400 font-bold">₹2.5Cr+ Volume</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className="px-3 py-1 rounded-full border border-[#3FE0E0]/40 bg-[#3FE0E0]/15 text-[#3FE0E0] text-xs font-bold">
                          ✓ {activeCap.badge1}
                        </span>
                        <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold">
                          ⚡ {activeCap.badge2}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Canvas Footer Bar */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-[#3FE0E0]" />
                    <span>Delivered & scaled for category leaders</span>
                  </div>

                  <Link
                    to={activeCap.portfolioSlug ? `/portfolio/${activeCap.portfolioSlug}` : `/case-studies/${activeCap.caseStudySlug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#3FE0E0] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:scale-105"
                  >
                    <span>{activeCap.portfolioSlug ? 'View Portfolio Work' : 'View In-Depth Proof'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 4 Process Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {qalaPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="w-full p-6 md:p-8 rounded-[32px] text-white border border-white/10 hover:border-[#3FE0E0] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_0_35px_-10px_rgba(63,224,224,0.25)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-white/40 font-bold">{pillar.step}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#3FE0E0] to-transparent" />
                </div>

                <h3 className="text-2xl md:text-3xl font-normal text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-6">
                  {pillar.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {pillar.pills.map((pill, pIdx) => (
                    <span
                      key={pIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-white/[0.03] text-white/80 hover:border-[#3FE0E0] hover:text-[#3FE0E0] transition-colors cursor-pointer"
                    >
                      {pill}
                      <img src="/assets/process-arrow.svg" alt="" className="w-2.5 h-2.5 -rotate-90 opacity-60" />
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <a
                  href="#contact-form"
                  className="w-full inline-block py-2.5 px-5 bg-white hover:bg-[#3FE0E0] text-black hover:text-black rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
                >
                  Start Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
