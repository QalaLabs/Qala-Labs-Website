"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import StatusChip from '@/components/ui/status-chip';

interface WhyDifferentProps {
  title?: string;
  description?: string;
}

const WhyDifferent = ({ 
  title = "Why we're different", 
  description = "We're revenue engineers, not growth hackers. We pair rigorous research with hands-on execution so every experiment has a clear hypothesis, an attribution plan, and measurable revenue impact."
}: WhyDifferentProps) => {
  return (
    <Section className="bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl"
      >
        <StatusChip label="3 experiments running" className="mb-4" />
        <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-6">
          {title}
        </h2>
        <p className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
          {description}
        </p>
      </motion.div>
    </Section>
  );
};

export default WhyDifferent;