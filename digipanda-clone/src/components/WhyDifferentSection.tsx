import React, { useState } from 'react';
import {
  Sparkles,
  Binary,
  Target,
  Zap,
  Database,
  Cpu,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { CreativeDataDualCore } from './3d/CreativeDataDualCore';

const keyPillars = [
  {
    icon: Sparkles,
    label: "Creative Craft",
    sub: "High-empathy hooks, psychological triggers, and cinematic visual language.",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
  },
  {
    icon: Binary,
    label: "Data Discipline",
    sub: "Server-side CAPI telemetry, SKU unit-economics, and margin attribution.",
    iconColor: "text-[#3FE0E0]",
    iconBg: "bg-[#3FE0E0]/10",
  },
];

interface ComparisonItem {
  id: string;
  dimension: string;
  icon: React.ComponentType<{ className?: string }>;
  standard: {
    title: string;
    sub: string;
    badge: string;
  };
  qala: {
    title: string;
    sub: string;
    badge: string;
  };
}

const comparisonDimensions: ComparisonItem[] = [
  {
    id: 'metrics',
    dimension: 'Core Metric Focus',
    icon: Target,
    standard: {
      title: 'Vanity impressions & clicks',
      sub: 'Top-of-funnel traffic volume disconnected from cash flow, contribution margins, and actual EBITDA.',
      badge: 'Legacy Paradigm',
    },
    qala: {
      title: 'Verified ROAS & bottom-line GMV',
      sub: 'Deterministic revenue attribution tied directly to ERP/Stripe settlement data and Net Margin per SKU.',
      badge: 'Revenue Grade',
    },
  },
  {
    id: 'speed',
    dimension: 'Speed & Iteration',
    icon: Zap,
    standard: {
      title: '3-4 week manual cycles',
      sub: 'Multi-layer approval friction, sluggish script turnarounds, and ad fatigue draining account performance.',
      badge: 'High Friction',
    },
    qala: {
      title: '48-hour autonomous creative loops',
      sub: 'Algorithmic multivariate angle testing, rapid script generation, and instant winning asset scale.',
      badge: 'Hyper Velocity',
    },
  },
  {
    id: 'attribution',
    dimension: 'Data & Attribution',
    icon: Database,
    standard: {
      title: 'Blended pixel guesswork',
      sub: 'Lossy client cookies, iOS 14.5+ signal blackouts, and double-counted self-reporting ad manager metrics.',
      badge: 'Signal Loss',
    },
    qala: {
      title: 'Server-side CAPI telemetry & margin attribution',
      sub: 'First-party Meta CAPI & Google Offline Conversions telemetry engine achieving 99.8% match confidence.',
      badge: 'Deterministic',
    },
  },
  {
    id: 'technology',
    dimension: 'Technology Backbone',
    icon: Cpu,
    standard: {
      title: 'Spreadsheets & generic templates',
      sub: 'Fragmented CSV exports, generic Canva decks, and brittle third-party plugins with no systemic memory.',
      badge: 'Fragile Stack',
    },
    qala: {
      title: 'Custom AI pipelines & scalable React/Supabase architectures',
      sub: 'Autonomous agent swarms, vector knowledge bases, and real-time headless high-converting web applications.',
      badge: 'Enterprise Architecture',
    },
  },
];

export const WhyDifferentSection: React.FC = () => {
  const [splitPos, setSplitPos] = useState<number>(50);

  return (
    <section className="relative bg-transparent overflow-hidden py-20 md:py-28 border-y border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#4F46E5]/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Top Row: Thesis & 3D Dual Core */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Thesis & Value Prop */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#34D399]/10 border border-[#34D399]/30 text-[#34D399] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              <span>HYPOTHESIS &times; EXECUTION ENGINE</span>
            </div>

            <h2 className="text-xs md:text-sm font-mono font-bold text-[#4F46E5] uppercase tracking-[0.25em] mb-4">
              WHY WE'RE DIFFERENT
            </h2>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              We're revenue engineers, not growth hackers. We pair rigorous research with hands-on execution so every experiment has a clear hypothesis, an attribution plan, and measurable revenue impact.
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {keyPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.label}
                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-lg hover:border-[#3FE0E0]/40 transition-all group"
                  >
                    <div className={`w-9 h-9 rounded-xl ${pillar.iconBg} ${pillar.iconColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-1.5">
                      {pillar.label}
                    </h4>
                    <p className="text-xs text-white/65 leading-relaxed">
                      {pillar.sub}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3D Interactive Creative × Data Dual Core */}
          <div className="lg:col-span-6">
            <div className="rounded-[32px] border border-white/10 bg-[#0a0b14] p-6 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="absolute top-0 right-0 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#3FE0E0]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-white/70 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                  Dual-State Convergence // WebGL
                </span>
                <span className="text-[11px] font-mono text-white/40">
                  drag to inspect
                </span>
              </div>

              <div>
                <CreativeDataDualCore />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Module: Interactive Before/After Split Comparison Slider */}
        <div className="mt-16 md:mt-24 pt-12 border-t border-white/10">
          
          {/* Header & Controller */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F46E5]/15 border border-[#4F46E5]/40 text-[#3FE0E0] text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#3FE0E0]" />
              <span>OPERATIONAL ARCHITECTURE // BENCHMARK</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              Standard Agency{' '}
              <span className="text-white/40 font-serif italic font-normal">vs.</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399]">
                Qala Revenue Engineering
              </span>
            </h3>

            <p className="text-sm text-white/70 mb-8 leading-relaxed">
              Drag the interactive comparison slider or switch presets below to inspect how legacy agency paradigms compare against Qala's deterministic revenue engine.
            </p>

            {/* Tactile Controls & Preset Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
              <button
                type="button"
                onClick={() => setSplitPos(15)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  splitPos < 35
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                Standard Agency View
              </button>
              <button
                type="button"
                onClick={() => setSplitPos(50)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  splitPos >= 35 && splitPos <= 65
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                50/50 Split View
              </button>
              <button
                type="button"
                onClick={() => setSplitPos(85)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  splitPos > 65
                    ? 'bg-[#3FE0E0]/20 text-[#3FE0E0] border border-[#3FE0E0]/50 shadow-[0_0_15px_rgba(63,224,224,0.25)]'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                Qala Revenue Engine View
              </button>
            </div>

            {/* Tactile Slider Track */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0d0e1b] border border-white/10 max-w-xl mx-auto shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className={`transition-colors ${splitPos < 50 ? 'text-rose-400 font-bold' : 'text-white/50'}`}>
                  Standard Agency (Legacy)
                </span>
                <span className="text-[11px] text-white/40 font-mono">
                  {splitPos === 50
                    ? 'Balanced Split (50/50)'
                    : splitPos > 50
                    ? `${splitPos}% Qala Bias`
                    : `${100 - splitPos}% Legacy Bias`}
                </span>
                <span className={`transition-colors ${splitPos >= 50 ? 'text-[#3FE0E0] font-bold' : 'text-white/50'}`}>
                  Qala Engine (Autonomous)
                </span>
              </div>

              <div className="relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={splitPos}
                  onChange={(e) => setSplitPos(Number(e.target.value))}
                  aria-label="Comparison slider position"
                  className="w-full h-2.5 bg-gradient-to-r from-rose-500/50 via-purple-500/50 to-[#3FE0E0] rounded-lg appearance-none cursor-ew-resize accent-[#3FE0E0] transition-all focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between mt-2.5 text-[11px] text-white/50">
                <span className="flex items-center gap-1">
                  <XCircle className="w-3 h-3 text-rose-400" />
                  Manual Friction
                </span>
                <span className="flex items-center gap-1 text-[#34D399]">
                  <TrendingUp className="w-3 h-3 text-[#34D399]" />
                  Verified ROAS Velocity
                </span>
              </div>
            </div>
          </div>

          {/* Comparison Cards Grid (4 Core Dimensions) */}
          <div className="space-y-4 max-w-5xl mx-auto">
            {comparisonDimensions.map((item) => {
              const DimIcon = item.icon;
              const isQalaDominant = splitPos >= 50;
              const isStandardFocused = splitPos < 40;
              const isQalaFocused = splitPos > 60;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-4 sm:p-6 backdrop-blur-md transition-all hover:border-white/20"
                >
                  {/* Dimension Header */}
                  <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#3FE0E0]">
                        <DimIcon className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
                        {item.dimension}
                      </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">
                        Operational Delta
                      </span>
                    </div>
                  </div>

                  {/* Split Comparison Row */}
                  <div className="grid grid-cols-1 md:grid-cols-11 gap-3 sm:gap-4 items-center">
                    
                    {/* Left: Standard Agency */}
                    <div
                      className={`md:col-span-5 p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                        isStandardFocused
                          ? 'bg-rose-500/10 border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
                          : isQalaFocused
                          ? 'bg-white/[0.02] border-white/5 opacity-40 grayscale-[40%]'
                          : 'bg-white/[0.02] border-white/10 opacity-75'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400/90 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          Standard Agency
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">
                          {item.standard.badge}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white/90 mb-1.5 line-clamp-2">
                        {item.standard.title}
                      </h4>

                      <p className="text-xs text-white/60 leading-relaxed">
                        {item.standard.sub}
                      </p>
                    </div>

                    {/* Middle: Tactical VS Divider */}
                    <div className="md:col-span-1 flex justify-center py-1 md:py-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500/20 to-[#3FE0E0]/20 border border-white/20 flex items-center justify-center shadow-lg">
                        <span className="text-[10px] font-black font-mono text-white/80 tracking-widest">
                          VS
                        </span>
                      </div>
                    </div>

                    {/* Right: Qala Revenue Engineering */}
                    <div
                      className={`md:col-span-5 p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                        isQalaFocused
                          ? 'bg-gradient-to-br from-[#4F46E5]/20 via-[#3FE0E0]/15 to-[#34D399]/10 border-[#3FE0E0]/60 shadow-[0_0_30px_rgba(63,224,224,0.25)] scale-[1.01]'
                          : isStandardFocused
                          ? 'bg-white/[0.02] border-white/5 opacity-40'
                          : isQalaDominant
                          ? 'bg-gradient-to-br from-[#4F46E5]/10 via-[#3FE0E0]/10 to-transparent border-[#3FE0E0]/40 shadow-[0_0_15px_rgba(63,224,224,0.1)]'
                          : 'bg-white/[0.02] border-white/10 opacity-80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#3FE0E0] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                          Qala Revenue Engine
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/30 text-[#3FE0E0] font-medium">
                          {item.qala.badge}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 flex items-center gap-1.5">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#3FE0E0]">
                          {item.qala.title}
                        </span>
                      </h4>

                      <p className="text-xs text-white/75 leading-relaxed">
                        {item.qala.sub}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyDifferentSection;

