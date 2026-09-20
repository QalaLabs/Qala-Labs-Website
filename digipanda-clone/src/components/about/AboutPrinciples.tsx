import React from 'react';
import { Target, Eye, ShieldCheck, Zap, Users, Rocket } from 'lucide-react';

const principles = [
  {
    title: "Rigor Over Hype",
    desc: "Every test is measurable. We don't guess; we engineer experiments with clear hypotheses and control groups.",
    icon: Target,
    insight: "Reduced CPL by 42% through systematic first-3-second hook testing.",
    tag: "Attribution",
    color: "text-[#3FE0E0]",
    border: "group-hover:border-[#3FE0E0]/50",
  },
  {
    title: "Radical Transparency",
    desc: "Clear KPIs, clean attribution. You see exactly what we see in real-time server telemetry dashboards.",
    icon: Eye,
    insight: "Custom CAPI & Looker Studio models for 100% spend visibility.",
    tag: "Telemetry",
    color: "text-[#38bdf8]",
    border: "group-hover:border-[#38bdf8]/50",
  },
  {
    title: "Extreme Ownership",
    desc: "We operate like we own your P&L. We only celebrate when your bottom-line contribution margin compounds.",
    icon: ShieldCheck,
    insight: "Fee structures tied directly to net incremental margin growth.",
    tag: "Alignment",
    color: "text-[#34D399]",
    border: "group-hover:border-[#34D399]/50",
  },
  {
    title: "Velocity Wins",
    desc: "The brand that tests the most winning hooks wins the market. We move faster than legacy agency cycles.",
    icon: Zap,
    insight: "50+ ad variants produced and systematically rotated weekly.",
    tag: "Velocity",
    color: "text-[#F59E0B]",
    border: "group-hover:border-[#F59E0B]/50",
  },
  {
    title: "Deep Customer Empathy",
    desc: "We dissect micro-segments to find the genuine emotional and psychological triggers that drive conversion.",
    icon: Users,
    insight: "Deep-dive avatar & review sentiment mining before running any creative.",
    tag: "Research",
    color: "text-[#A78BFA]",
    border: "group-hover:border-[#A78BFA]/50",
  },
  {
    title: "Scale-First Architecture",
    desc: "We build systems that don't implode when you hit ₹1Cr/mo+ and 8-figure monthly revenue milestones.",
    icon: Rocket,
    insight: "Headless e-commerce & server-side events built for sub-second speed.",
    tag: "Infrastructure",
    color: "text-[#EC4899]",
    border: "group-hover:border-[#EC4899]/50",
  }
];

export const AboutPrinciples: React.FC = () => {
  return (
    <div className="py-12 border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#34D399]/10 border border-[#34D399]/30 text-[#34D399] text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span>OUR OPERATING CODE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          The Qala Principles
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          The non-negotiables that guide how we test, how we build, and how we treat your capital.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {principles.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className={`p-7 rounded-3xl bg-white/[0.02] border border-white/10 ${p.border} transition-all duration-300 hover:bg-white/[0.04] flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${p.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                    {p.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#3FE0E0] transition-colors">
                  {p.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-[10px] font-mono text-[#3FE0E0] uppercase tracking-wider mb-1">
                  Observed Outcome:
                </div>
                <div className="text-xs text-white/80 font-medium italic">
                  "{p.insight}"
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
