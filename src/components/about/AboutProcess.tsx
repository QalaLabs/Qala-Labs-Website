"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Rocket, ShieldCheck } from 'lucide-react';

const steps = [
  {
    title: "Audit & Hypothesis",
    range: "Week 0",
    desc: "Deep stack audit: measurement, creative, funnels, and ops.",
    example: "Identified 30% data loss in browser-based tracking.",
    icon: <Search className="w-6 h-6" />
  },
  {
    title: "Rapid Experiments",
    range: "Weeks 1–4",
    desc: "Creative, funnel, and pricing tests to find scalable winners.",
    example: "Tested 12 hooks; found 2 that lowered CPA by 35%.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Automation & Scale",
    range: "Weeks 4–12",
    desc: "Build AI flows, server events, and scale predictable winners.",
    example: "Deployed server-side GTM and automated bid rules.",
    icon: <Rocket className="w-6 h-6" />
  },
  {
    title: "Retention & Ops",
    range: "Ongoing",
    desc: "Lock in LTV gains through lifecycle and creator programs.",
    example: "Increased repeat purchase rate by 22% via AI flows.",
    icon: <ShieldCheck className="w-6 h-6" />
  }
];

const AboutProcess = () => {
  return (
    <section className="py-24 bg-zinc-900/30 border-y border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">How We Work</h2>
          <h3 className="text-4xl md:text-7xl font-extrabold text-zinc-50 tracking-tight">The Scale Roadmap</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          <div className="hidden lg:block absolute top-14 left-10 right-10 h-px bg-zinc-800 z-0" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative z-10"
            >
              <div className="w-20 h-20 bg-zinc-950 rounded-[2rem] border border-zinc-800 flex items-center justify-center text-indigo-500 mb-10 shadow-2xl mx-auto md:mx-0 group hover:border-indigo-500/50 transition-all duration-500">
                <div className="group-hover:scale-110 transition-transform duration-500">{step.icon}</div>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3">{step.range}</p>
                <h4 className="text-2xl font-black text-zinc-50 mb-6 tracking-tight">{step.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">{step.desc}</p>
                <div className="p-6 bg-zinc-900 rounded-[2rem] border border-zinc-800/50 shadow-inner">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Example</p>
                  <p className="text-xs italic text-zinc-400 leading-relaxed">"{step.example}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutProcess;