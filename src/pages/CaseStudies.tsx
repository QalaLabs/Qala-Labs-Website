"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import { motion } from "framer-motion";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Proven Results" description="Real data from real brands. See how we use our scale engines to dominate markets." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter">
            Proven <span className="text-blue-600">Results.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We don't just promise growth. We deliver it. Explore our 8-figure success stories and the data behind them.
          </p>
        </motion.div>

        <PortfolioGrid />

        {/* Bottom CTA */}
        <div className="mt-32 p-16 bg-slate-900 rounded-[4rem] text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready for these results?</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Join the 1% of brands that dominate their niche with data-driven performance.
            </p>
            <a href="/contact" className="inline-flex items-center justify-center px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xl font-black shadow-2xl shadow-blue-500/20 transition-all hover:scale-105">
              Book Your Free Audit
            </a>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -ml-48 -mb-48" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudies;