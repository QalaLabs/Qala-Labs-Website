"use client";

import * as React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <SEO title="Privacy Policy" />
      <Navbar />
      <div className="pt-48 pb-32 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-50 mb-12 tracking-tighter">Privacy <span className="text-indigo-500">Policy.</span></h1>
          <div className="prose prose-invert prose-lg max-w-none prose-p:text-zinc-400 prose-headings:text-zinc-50 prose-headings:font-black prose-headings:tracking-tight">
            <p className="text-xl text-indigo-400 mb-16 font-bold">Last updated: March 20, 2026</p>
            
            <section className="mb-20">
              <h2 className="text-3xl mb-6">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you request an audit, sign up for our newsletter, or contact us for support. This may include your name, email address, website URL, and business revenue data. This data is essential for our systems to generate accurate growth projections and performance models.</p>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl mb-6">2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our scale engines. Specifically, your data helps us calibrate our n8n automation workflows, refine our Meta/Google bidding algorithms, and communicate personalized performance audits. We do not sell your brand's intelligence to third parties.</p>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl mb-6">3. Data Security</h2>
              <p>We implement enterprise-grade security measures to protect your brand's data. This includes encrypted storage of API keys, secure server-side tracking environments, and restricted access to your historical performance data within our internal strategy teams.</p>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;