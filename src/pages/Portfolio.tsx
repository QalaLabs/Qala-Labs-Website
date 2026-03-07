"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import { motion } from 'framer-motion';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <SEO 
        title="The Creative Edge" 
        description="From the #WhistlePodu army for CSK to high-ticket real estate lead generation, we deploy creative that converts." 
      />
      <Navbar />
      
      <main className="pt-48 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8 uppercase tracking-widest"
            >
              Proof of Concept
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-extrabold text-zinc-50 mb-10 tracking-tighter leading-[1.05]"
            >
              The <span className="text-indigo-500">Creative</span> <br /> Edge.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 leading-relaxed max-w-2xl"
            >
              From the #WhistlePodu army for CSK to high-ticket real estate lead generation, we deploy creative that doesn't just look good—it converts.
            </motion.p>
          </div>

          <PortfolioGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;