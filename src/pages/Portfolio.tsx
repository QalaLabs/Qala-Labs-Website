"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import { motion } from "framer-motion";
import { Briefcase, Sparkles, Rocket, TrendingUp } from 'lucide-react';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Our Portfolio" description="Explore the high-performance projects and digital transformations we've delivered for our partners." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
            <Briefcase className="w-4 h-4" /> Our Work
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter">
            The <span className="text-blue-600">Showcase.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A collection of digital experiences, growth engines, and creative campaigns built to dominate markets.
          </p>
        </motion.div>

        <PortfolioGrid />

        {/* Work Process Section */}
        <section className="mt-32 py-24 bg-white rounded-[4rem] border border-slate-100 shadow-sm px-8 md:px-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-6">How We Build</h2>
            <p className="text-lg text-slate-500">Every project follows our proprietary 8-figure framework to ensure maximum impact and scale.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Creative Strategy</h3>
              <p className="text-slate-500 leading-relaxed">We don't just make things look good. We design for conversion, using data to drive every creative decision.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Technical Excellence</h3>
              <p className="text-slate-500 leading-relaxed">From headless commerce to server-side tracking, we build the infrastructure required for global scale.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Performance Growth</h3>
              <p className="text-slate-500 leading-relaxed">Our work doesn't end at launch. We continuously optimize and scale to ensure your brand stays ahead.</p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-32 p-16 bg-slate-900 rounded-[4rem] text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to be our next success story?</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Let's build your scale engine and dominate your niche together.
            </p>
            <a href="/contact" className="inline-flex items-center justify-center px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xl font-black shadow-2xl shadow-blue-500/20 transition-all hover:scale-105">
              Start Your Project
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

export default Portfolio;