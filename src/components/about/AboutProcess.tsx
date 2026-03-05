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
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">How We Work</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900">The Scale Roadmap</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-slate-200 z-0" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-xl border border-slate-100 mx-auto md:mx-0">
                {step.icon}
              </div>
              <div className="text-center md:text-left">
                <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">{step.range}</p>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{step.desc}</p>
                <div className="p-4 bg-white rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Example</p>
                  <p className="text-xs italic text-slate-600">"{step.example}"</p>
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