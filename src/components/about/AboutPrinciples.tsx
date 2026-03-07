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
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">Our Culture</h2>
          <h3 className="text-4xl md:text-7xl font-extrabold text-zinc-50 tracking-tight">The Qala Principles</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12 }}
              className="group p-12 bg-zinc-900/40 backdrop-blur-xl rounded-[4rem] border border-zinc-800 hover:border-indigo-500/30 hover:bg-zinc-900 transition-all duration-500 relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center text-indigo-500 mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-lg border border-zinc-800">
                {p.icon}
              </div>
              <h4 className="text-2xl font-black text-zinc-50 mb-6 tracking-tight">{p.title}</h4>
              <p className="text-zinc-400 group-hover:text-zinc-300 leading-relaxed mb-10">
                {p.desc}
              </p>
              
              <div className="opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                <div className="p-6 bg-zinc-950 rounded-[2rem] border border-zinc-800 group-hover:border-indigo-500/20">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Insight</p>
                  <p className="text-sm italic text-zinc-400 leading-relaxed">"{p.snippet}"</p>
                </div>
              </div>
              
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPrinciples;