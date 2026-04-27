"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonial = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 text-center relative overflow-hidden"
        >
          <Quote className="w-20 h-20 text-blue-600/5 absolute top-10 left-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <p className="text-2xl md:text-4xl font-black text-slate-900 mb-10 leading-tight">
              "Qala Labs helped us scale to a six-figure monthly run-rate: fast, strategic, and data-driven."
            </p>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-200 rounded-full mb-4 overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=12" alt="CEO" loading="lazy" />
              </div>
              <p className="font-bold text-slate-900">CEO, Gaffar India</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;