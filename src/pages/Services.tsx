"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import ServicesGrid from '@/components/services/ServicesGrid';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <SEO 
        title="Precision Growth Infrastructure" 
        description="We build end-to-end revenue engines that combine high-velocity creative testing with server-side tracking." 
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
              Our Capabilities
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-extrabold text-zinc-50 mb-10 tracking-tighter leading-[1.05]"
            >
              Precision <span className="text-indigo-500">Growth</span> <br /> Infrastructure.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-400 leading-relaxed max-w-2xl"
            >
              We don't just "run ads." We build end-to-end revenue engines that combine high-velocity creative testing with server-side tracking and aggressive media buying.
            </motion.p>
          </div>

          <ServicesGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;