"use client";

import React from 'react';
import { motion } from 'framer-motion';

const WhyDifferent = () => {
  return (
    <section className="py-24 bg-white overflow-hidden border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8">
            Why we're different
          </h2>
          <p className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            We’re revenue engineers, not growth hackers. We pair rigorous research with hands-on execution so every experiment has a clear hypothesis, an attribution plan, and measurable revenue impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyDifferent;