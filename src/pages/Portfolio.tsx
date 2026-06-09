import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import { motion } from 'framer-motion';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Creative Portfolio | UGC, Influencer & Ecommerce Marketing Work | Qala Labs"
        description="Browse Qala Labs' portfolio — Amazon Ads, playR influencer campaigns, UGC content, AI ad creatives, merchandise design, and real estate platforms for DTC brands."
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
              Proof of Concept
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight"
            >
              The <span className="text-blue-600">Creative</span> Edge.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 leading-relaxed"
            >
              From the #WhistlePodu army for playR to high-ticket real estate lead generation, we deploy creative that doesn't just look good—it converts.
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