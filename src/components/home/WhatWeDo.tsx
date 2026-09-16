"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Bot, LineChart, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import GrowthAttributionMesh from '@/components/three/GrowthAttributionMesh';

interface Module {
  eyebrow: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  checklist: string[];
  tag: string;
}

const modules: Module[] = [
  {
    eyebrow: "MODULE / GTM.1",
    title: "Performance Media",
    desc: "Meta and Google account architecture built for signal quality, paired with disciplined creative testing and server-side tracking that survives platform noise.",
    icon: BarChart3,
    checklist: [
      "Meta & Google account architecture",
      "Structured creative testing cadence",
      "Server-side tracking & attribution"
    ],
    tag: "Install: Week 1"
  },
  {
    eyebrow: "MODULE / GTM.2",
    title: "AI Automation Layer",
    desc: "Lifecycle flows and WhatsApp automation run on AI-generated creative briefs, with a human review gate before anything ships to your audience.",
    icon: Bot,
    checklist: [
      "Lifecycle & WhatsApp automation",
      "AI-generated creative briefs",
      "Human-in-the-loop review"
    ],
    tag: "Install: Weeks 2-4"
  },
  {
    eyebrow: "MODULE / GTM.3",
    title: "Revenue Instrumentation",
    desc: "CAC:LTV tracked by SKU, reviewed weekly against unit economics, and surfaced on a founder dashboard so decisions are made on margin, not vanity metrics.",
    icon: LineChart,
    checklist: [
      "CAC:LTV by SKU",
      "Weekly unit-economics review",
      "Founder dashboard"
    ],
    tag: "Install: Weeks 4-8"
  }
];

const WhatWeDo = ({ title = "What we do" }: { title?: string }) => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
              Creative × Data × Impact
            </h2>
            <h3 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white">{title}</h3>
          </div>
          <p className="max-w-md text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Three engineered revenue pillars that work in synchronization to generate scalable, predictable contribution margin.
          </p>
        </div>

        {/* 3D Interactive Attribution & Growth Network Mesh */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <GrowthAttributionMesh />
        </motion.div>

        {/* 3 Core Delivery Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 350, damping: 20 }}
                className="flex flex-col p-8 md:p-10 bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-colors group"
              >
                <span className="font-mono text-[11px] tracking-widest text-blue-600 dark:text-blue-400 mb-6">
                  {mod.eyebrow}
                </span>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3">{mod.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-6">{mod.desc}</p>
                <ul className="space-y-2 mb-8">
                  {mod.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex w-fit items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold font-mono">
                  {mod.tag}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
