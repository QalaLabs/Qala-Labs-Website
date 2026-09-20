"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import AIAgentFinder from '@/components/tools/AIAgentFinder';
import { motion } from 'framer-motion';

const AIAgentFinderPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Which AI Agent Does Your Business Need? Free Tool"
        description="Tell us what's eating your team's time — leads, support, reporting, ops — and get matched to the exact AI agent that fixes it. Free 2-minute diagnosis."
      />
      <Navbar />

      <main className="pt-40 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
              Not sure which <br /> <span className="text-blue-600">AI agent you need?</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Tell us what's slowing your team down. We'll tell you exactly which AI agent fixes it, no generic sales pitch.
            </p>
          </motion.div>
        </div>

        <AIAgentFinder />
      </main>

      <Footer />
    </div>
  );
};

export default AIAgentFinderPage;
