"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import CaseStudyGrid from '@/components/case-studies/CaseStudyGrid';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <SEO 
        title="Proven Results" 
        description="Real data from real brands. See how we use our scale engines to dominate markets." 
      />
      <Navbar />
      
      <div className="pt-48 pb-32 px-6 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8 uppercase tracking-widest mx-auto"
          >
            Case Studies
          </motion.div>
          <h1 className="text-5xl md:text-9xl font-extrabold text-zinc-50 mb-10 tracking-tighter leading-[0.95]">
            Proven <span className="text-indigo-500">Results.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            We don't just promise growth. We deliver it. Explore our 8-figure success stories and the data behind them.
          </p>
        </motion.div>

        <CaseStudyGrid />

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-48 p-16 md:p-24 bg-zinc-900/50 backdrop-blur-xl rounded-[4rem] border border-zinc-800/50 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-zinc-50 mb-8 tracking-tight">Ready for these results?</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the 1% of brands that dominate their niche with data-driven performance.
            </p>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-8 rounded-2xl text-xl font-black shadow-2xl shadow-indigo-500/20 transition-all hover:scale-105 group"
              asChild
            >
              <a href="/contact">
                Book Your Free Audit <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -ml-48 -mb-48" />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudies;