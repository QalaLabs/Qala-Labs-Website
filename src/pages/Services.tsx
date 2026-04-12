import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import ServicesGrid from '@/components/services/ServicesGrid';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Performance Marketing & AI Automation Services | Qala Labs"
        description="Meta Ads, Google Shopping, Amazon Ads, AI automation, creative production & server-side tracking — full-stack growth services for DTC brands in India."
      />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-sm font-bold mb-6"
            >
              Our Capabilities
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight"
            >
              Precision <span className="text-blue-600">Growth</span> Infrastructure.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 leading-relaxed"
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