"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, BarChart3, ArrowRight } from 'lucide-react';

const pillars = [
  {
    title: "High-Velocity Creative",
    desc: "We don't just 'make ads'. We engineer 100+ weekly variants to find the winning hooks that stop the scroll.",
    icon: <Zap className="w-8 h-8" />,
    color: "bg-blue-600",
    metrics: ["100+ Variants/Week", "35% Lower CPA"]
  },
  {
    title: "Proprietary Data Stack",
    desc: "Server-side tracking and custom attribution models that give you a single source of truth for every rupee spent.",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "bg-indigo-600",
    metrics: ["100% Attribution Accuracy", "LTV:CAC Clarity"]
  },
  {
    title: "AI-Powered Ops",
    desc: "Automated bidding, lifecycle flows, and inventory triggers that turn your store into an autonomous scale engine.",
    icon: <Layers className="w-8 h-8" />,
    color: "bg-slate-900",
    metrics: ["24/7 Monitoring", "42% Higher Retention"]
  }
];

const SuccessFramework = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">The Methodology</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Our 8-Figure <span className="text-blue-600">Scale Engine.</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-md group hover:border-blue-200 transition-all duration-500"
            >
              <div className={`${pillar.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                {pillar.icon}
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">{pillar.title}</h4>
              <p className="text-slate-500 leading-relaxed mb-8">{pillar.desc}</p>
              
              <div className="space-y-3 pt-6 border-t border-slate-50">
                {pillar.metrics.map((metric, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm font-black text-slate-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    {metric}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 bg-slate-900 rounded-[3rem] text-white shadow-2xl">
          <div className="mb-8 md:mb-0 md:mr-12">
            <h5 className="text-2xl font-bold mb-2">Integrated approach, exponential results.</h5>
            <p className="text-slate-400">Our framework ensures no leakages in your growth funnel from first-click to repeat purchase.</p>
          </div>
          <button className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-black flex items-center gap-2 transition-all">
            See the results <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessFramework;