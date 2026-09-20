import React from 'react';
import { Search, Zap, Rocket, ShieldCheck, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    stage: "01",
    range: "Week 0",
    title: "Audit & Hypothesis",
    desc: "Complete forensic audit of your ad accounts, pixel data, server CAPI telemetry, landing pages, and SKU unit margins.",
    example: "Identified 30% conversion leakage caused by client-side ad blockers and browser privacy restrictions.",
    icon: Search,
    color: "text-[#3FE0E0]",
    badge: "Discovery Sprint"
  },
  {
    stage: "02",
    range: "Weeks 1–4",
    title: "Rapid Hook Experiments",
    desc: "Deploy 50+ video hook angles, angle multipliers, and high-ticket landing variations to isolate scalable winning creatives.",
    example: "Tested 12 hook variations for high-ticket travel; found 2 that yielded 28x ROAS and ₹14L revenue.",
    icon: Zap,
    color: "text-[#F59E0B]",
    badge: "Validation Sprint"
  },
  {
    stage: "03",
    range: "Weeks 4–12",
    title: "Automation & Scale",
    desc: "Connect autonomous AI agent swarms, automated bid rules, server-side attribution, and aggressive budget scaling.",
    example: "Deployed server-side GTM with real-time Looker Studio sync, scaling spend without CPA degradation.",
    icon: Rocket,
    color: "text-[#34D399]",
    badge: "Scale Velocity"
  },
  {
    stage: "04",
    range: "Ongoing",
    title: "Retention & LTV Ops",
    desc: "Systematically protect contribution margins with automated lifecycle workflows, VIP buyer retention, and creator seeding.",
    example: "Increased repeat customer revenue by 24% via automated high-intent WhatsApp and email sequences.",
    icon: ShieldCheck,
    color: "text-[#A78BFA]",
    badge: "Margin Compounding"
  }
];

export const AboutProcess: React.FC = () => {
  return (
    <div className="py-12 border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          <span>EXECUTION CADENCE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          The 4-Stage Scale Roadmap
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          From diagnosing broken tracking to installing compounding acquisition loops that run predictably.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#3FE0E0]/50 transition-all duration-300 hover:bg-white/[0.04] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono font-bold text-white/40 group-hover:text-[#3FE0E0] transition-colors">
                    STAGE // {s.stage}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#3FE0E0]">
                    {s.range}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className={`w-6 h-6 ${s.color}`} />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#3FE0E0] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#34D399]" />
                  <span>Verified Result:</span>
                </div>
                <div className="text-xs text-white/80 font-mono italic">
                  "{s.example}"
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
