"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Rocket, ShieldCheck } from 'lucide-react';

interface Step {
  title: string;
  desc: string;
}

interface HowWeWorkProps {
  title?: string;
  steps?: Step[];
}

const defaultSteps = [
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

const icons = [<Search />, <Zap />, <Rocket />, <ShieldCheck />];

const HowWeWork = ({ title = "How we work", steps = [] }: HowWeWorkProps) => {
  const displaySteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">How We Work</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white">{title}</h3>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {displaySteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl w-fit text-blue-600 dark:text-blue-400">
                {icons[i % icons.length]}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              {i < 3 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-slate-100 dark:bg-slate-800 -ml-4 z-0" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;