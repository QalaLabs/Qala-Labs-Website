"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Rocket, ShieldCheck } from 'lucide-react';

const HowWeWork = () => {
  const steps = [
    {
      title: "Audit & Hypothesis (Week 0)",
      desc: "Deep stack audit: measurement, creative, funnels, and ops.",
      icon: <Search className="w-6 h-6" />
    },
    {
      title: "Rapid Experiments (Weeks 1–4)",
      desc: "Creative, funnel, and pricing tests to find scalable winners.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Automation & Scale (Weeks 4–12)",
      desc: "Build AI flows, server events, and scale predictable winners.",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      title: "Retention & Ops (Ongoing)",
      desc: "Lock in LTV gains through lifecycle and creator programs.",
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight">How we work</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <div className="hidden lg:block absolute top-14 left-10 right-10 h-[2px] bg-slate-100 z-0" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10"
            >
              <div className="mb-10 w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-xl border border-white">
                {step.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;