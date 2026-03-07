"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ResearchInsights = () => {
  return (
    <section className="py-32 bg-white border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-10">
            Research & Insights
          </h2>
          <p className="text-2xl md:text-4xl font-bold text-slate-900 leading-relaxed tracking-tight">
            We believe in doing the right research and finding the perfect insight for your brand to work on: from customer micro-segments to creative triggers and measurement design. This approach aligns with current academic thinking on AI-powered marketing and the role of deliberate AI integration across marketing functions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchInsights;