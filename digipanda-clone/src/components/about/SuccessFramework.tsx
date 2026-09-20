import React from 'react';
import { Zap, BarChart3, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

const pillars = [
  {
    title: "High-Velocity Creative Engine",
    desc: "We don't just 'make ads'. We engineer 50+ weekly creative variants across visual hooks, angle multipliers, and audio hooks to systematically beat ad fatigue.",
    icon: Zap,
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    metrics: ["50+ Variants Tested Weekly", "35% Lower Blended CPA", "Zero Creative Fatigue"]
  },
  {
    title: "Proprietary Data & Attribution Stack",
    desc: "Server-side CAPI telemetry, first-party cookie infrastructure, and contribution margin dashboards that give you one unshakeable source of truth for every rupee invested.",
    icon: BarChart3,
    color: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-[#3FE0E0]",
    metrics: ["100% Server Telemetry Accuracy", "Real-Time SKU Margin Models", "Zero Attribution Guesswork"]
  },
  {
    title: "Autonomous AI & Operations Swarms",
    desc: "Deploy automated bid adjustments, intelligent inbound lead qualification agents, and automated inventory sync flows that scale output without headcount bloat.",
    icon: Layers,
    color: "from-purple-500/20 to-indigo-500/10",
    iconColor: "text-purple-400",
    metrics: ["24/7 Autonomous Bidding", "Sub-10s Inbound Response", "42% Higher Customer Retention"]
  }
];

export const SuccessFramework: React.FC = () => {
  return (
    <div className="py-12 border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
          <span>PROVEN ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          The 8-Figure Scale Engine
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
          Three interlocking systems that prevent growth plateaus and protect contribution margin at high scale.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${pillar.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-8">
                  {pillar.desc}
                </p>
              </div>

              <div className="space-y-2.5 pt-6 border-t border-white/10">
                {pillar.metrics.map((m) => (
                  <div key={m} className="flex items-center gap-2 text-xs font-mono text-white/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] flex-shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Integrated Banner */}
      <div className="mt-12 p-8 md:p-10 rounded-3xl bg-gradient-to-r from-[#0E1022] to-[#121630] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
            Integrated architecture. Zero funnel leakage.
          </h4>
          <p className="text-xs md:text-sm text-white/70 max-w-xl">
            Our framework plugs the gaps between initial ad impressions, landing page experience, server attribution, and lifetime value repeat purchases.
          </p>
        </div>

        <a
          href="#contact-form"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#3FE0E0] text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 flex-shrink-0"
        >
          <span>Audit Your Growth Engine</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
