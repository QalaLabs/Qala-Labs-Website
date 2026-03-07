"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Target, Zap, Users, Rocket } from 'lucide-react';

const principles = [
  {
    title: "Rigor over hype",
    desc: "Every test is measurable. We don't guess; we engineer experiments with clear hypotheses.",
    icon: <Target className="w-6 h-6" />,
    snippet: "Case: Reduced CPL by 42% through rigorous hook testing."
  },
  {
    title: "Radical transparency",
    desc: "Clear KPIs, clear attribution. You see exactly what we see in real-time dashboards.",
    icon: <Eye className="w-6 h-6" />,
    snippet: "Tool: Custom Looker Studio dashboards for 100% visibility."
  },
  {
    title: "Ownership",
    desc: "We act like we own your P&L. Your growth is our only success metric.",
    icon: <ShieldCheck className="w-6 h-6" />,
    snippet: "Philosophy: We only win when your contribution margin grows."
  },
  {
    title: "Velocity Wins",
    desc: "The brand that tests the most winning hooks wins the market. We move faster than your competition.",
    icon: <Zap className="w-6 h-6" />,
    snippet: "Stat: 100+ ad variants produced and tested weekly."
  },
  {
    title: "Customer Centric",
    desc: "We dive deep into micro-segments to find the emotional triggers that drive action.",
    icon: <Users className="w-6 h-6" />,
    snippet: "Method: Deep-dive persona research before every campaign."
  },
  {
    title: "Scale First",
    desc: "We build infrastructure that doesn't break when you hit 8-figures.",
    icon: <Rocket className="w-6 h-6" />,
    snippet: "Tech: Headless Shopify builds for <1s load times."
  }
];

const AboutPrinciples = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Our Culture</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900">The Qala Principles</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-slate-900 hover:text-white transition-all duration-500 relative overflow-hidden"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                {p.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4">{p.title}</h4>
              <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed mb-8">
                {p.desc}
              </p>
              
              <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Insight</p>
                  <p className="text-sm italic">{p.snippet}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPrinciples;