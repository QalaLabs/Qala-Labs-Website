"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';

const AboutResearch = () => {
  return (
    <section className="py-32 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-16 md:p-24 bg-zinc-900/50 backdrop-blur-xl rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl border border-zinc-800"
        >
          <div className="relative z-10">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-500/20">
              <BookOpen className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-10 leading-tight tracking-tight">
              Research & Insights
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 mb-16 leading-relaxed max-w-3xl mx-auto">
              We believe in doing the right research and finding the perfect insight for your brand to work on. Our approach aligns with current academic thinking on AI-powered marketing.
            </p>
            
            <div className="flex flex-wrap justify-center gap-10">
              <a 
                href="https://www.sciencedirect.com/science/article/pii/S0268401224000318" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors text-lg"
              >
                Reference: ScienceDirect <ExternalLink className="w-5 h-5" />
              </a>
              <a 
                href="/blog" 
                className="bg-zinc-50 text-zinc-950 hover:bg-indigo-600 hover:text-white px-10 py-5 rounded-2xl font-black transition-all text-lg shadow-xl"
              >
                Read our approach
              </a>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -ml-48 -mb-48" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutResearch;