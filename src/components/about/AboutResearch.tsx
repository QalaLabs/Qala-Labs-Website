"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';

const AboutResearch = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 md:p-20 bg-slate-900 rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
              Research & Insights
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              We believe in doing the right research and finding the perfect insight for your brand to work on. Our approach aligns with current academic thinking on AI-powered marketing.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="https://www.sciencedirect.com/science/article/pii/S0268401224000318" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors"
              >
                Reference: ScienceDirect <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href="/blog" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all"
              >
                Read our approach
              </a>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -ml-32 -mb-32" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutResearch;