"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Wrench, Gauge, Handshake } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Stage {
  title: string;
  duration: string;
  desc: string;
  icon: LucideIcon;
}

const stages: Stage[] = [
  {
    title: "Audit & Diagnose",
    duration: "Week 1",
    desc: "Deep-dive audit of ad accounts, tracking, and unit economics to find the highest-leverage fixes.",
    icon: Search
  },
  {
    title: "Architect the System",
    duration: "Weeks 2-4",
    desc: "Build the performance media architecture, automation flows, and instrumentation your brand needs.",
    icon: Wrench
  },
  {
    title: "Run & Tune",
    duration: "Weeks 5-8",
    desc: "Run creative tests, tune bidding and flows, and lock in the winners against weekly unit-economics reviews.",
    icon: Gauge
  },
  {
    title: "Handoff",
    duration: "Week 9",
    desc: "Transfer a documented, working system with dashboards and playbooks your team can operate directly.",
    icon: Handshake
  }
];

const HowWeWork = ({ title = "How we work" }: { title?: string }) => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Deployment Timeline</h2>
          <h3 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white">{title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-2xl text-blue-600 dark:text-blue-400 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-4xl font-black text-slate-100 dark:text-slate-800">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="inline-flex w-fit items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono mb-4">
                  {stage.duration}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{stage.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{stage.desc}</p>
                {i < stages.length - 1 && (
                  <div className="hidden lg:block absolute top-9 left-full w-full h-[2px] bg-slate-100 dark:bg-slate-800 -ml-3 z-0" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
