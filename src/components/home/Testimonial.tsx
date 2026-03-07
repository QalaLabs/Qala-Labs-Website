"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonial = () => {
  return (
    <section className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-12 md:p-24 rounded-[4rem] shadow-2xl border border-slate-100 text-center relative overflow-hidden"
        >
          <Quote className="w-32 h-32 text-blue-600/5 absolute top-10 left-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <p className="text-3xl md:text-5xl font-black text-slate-900 mb-16 leading-tight tracking-tight">
              “Qala Labs helped us scale to a six-figure monthly run-rate: fast, strategic, and data-driven.”
            </p>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full mb-6 overflow-hidden border-4 border-slate-50 shadow-lg">
                <img src="https://i.pravatar.cc/100?img=12" alt="CEO" />
              </div>
              <p className="font-black text-slate-900 text-lg">CEO, Gaffar India</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">DTC Home & Tech</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;