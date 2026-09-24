"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import StatusChip from '@/components/ui/status-chip';
import TiltCard from '@/components/ui/tilt-card';
import CreativeDataDualCore from '@/components/three/CreativeDataDualCore';
import { Sparkles, Binary, CheckCircle2 } from 'lucide-react';

interface WhyDifferentProps {
  title?: string;
  description?: string;
}

const keyPillars = [
  {
    icon: Sparkles,
    label: "Creative Craft",
    sub: "High-empathy hooks, psychological triggers, and cinematic visual language.",
  },
  {
    icon: Binary,
    label: "Data Discipline",
    sub: "Server-side CAPI telemetry, SKU unit-economics, and margin attribution.",
  },
];

const WhyDifferent = ({ 
  title = "Why we're different", 
  description = "We're revenue engineers, not growth hackers. We pair rigorous creative craft with algorithmic data discipline so every experiment has a clear hypothesis, an attribution plan, and measurable bottom-line revenue impact."
}: WhyDifferentProps) => {
  return (
    <Section className="bg-slate-50 dark:bg-[#06070D] overflow-hidden py-16 md:py-24 border-y border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Thesis & Value Prop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6"
        >
          <StatusChip label="Hypothesis × Execution Engine" className="mb-4" />
          <h2 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.25em] mb-4">
            {title}
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
            {description}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {keyPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <TiltCard key={pillar.label} maxTilt={8} maxGlare={0.15} scale={1.02} className="rounded-2xl h-full">
                  <div className="h-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] backdrop-blur-md shadow-sm hover:border-blue-500/30 transition-all">
                    <div style={{ transform: 'translateZ(15px)' }}>
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                        {pillar.label}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {pillar.sub}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: 3D Interactive Creative × Data Dual Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6"
        >
          <TiltCard maxTilt={5} maxGlare={0.15} scale={1.01} className="rounded-3xl">
            <div className="rounded-3xl border border-white/10 bg-[#06070D] p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div style={{ transform: 'translateZ(15px)' }} className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Dual-State Convergence // WebGL
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  drag to inspect
                </span>
              </div>

              <div style={{ transform: 'translateZ(20px)' }}>
                <CreativeDataDualCore />
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </Section>
  );
};

export default WhyDifferent;