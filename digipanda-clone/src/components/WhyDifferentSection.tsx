import React from 'react';
import { Sparkles, Binary } from 'lucide-react';
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

export const WhyDifferentSection: React.FC = () => {
  return (
    <section className="relative bg-[#06070D] overflow-hidden py-20 md:py-28 border-y border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#4F46E5]/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
      </div>
    </section>
  );
};

export default WhyDifferentSection;
