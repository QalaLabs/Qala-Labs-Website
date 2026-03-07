"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

const AboutFounder = () => {
  return (
    <section className="py-32 bg-zinc-900/30 border-y border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-zinc-800 border border-zinc-700 shadow-2xl">
              {/* Placeholder for Aashirwad's portrait */}
              <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                  alt="Aashirwad, Founder of Qala Labs" 
                  className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 p-8 bg-indigo-600 rounded-3xl shadow-2xl">
              <p className="text-white font-black text-2xl tracking-tight">Aashirwad</p>
              <p className="text-indigo-100 text-sm font-bold">Founder & Lead Engineer</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-zinc-50 tracking-tight">
              Bridging Growth <br /> & <span className="text-indigo-500">Execution.</span>
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Led by Aashirwad, Qala Labs bridges the gap between aggressive e-commerce growth and flawless technical execution. We don't just consult; we build the infrastructure that makes scale inevitable.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;