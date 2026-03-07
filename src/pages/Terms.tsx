"use client";

import * as React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <SEO title="Terms of Service" />
      <Navbar />
      <div className="pt-48 pb-32 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-50 mb-12 tracking-tighter">Terms of <span className="text-indigo-500">Service.</span></h1>
          <div className="prose prose-invert prose-lg max-w-none prose-p:text-zinc-400 prose-headings:text-zinc-50 prose-headings:font-black prose-headings:tracking-tight">
            <p className="text-xl text-indigo-400 mb-16 font-bold">Last updated: March 20, 2026</p>
            
            <section className="mb-20">
              <h2 className="text-3xl mb-6">1. Acceptance of Terms</h2>
              <p>By accessing or using the Qala Labs platform, calculators, or growth services, you agree to be bound by these Terms of Service. Our services are designed for businesses seeking aggressive ecommerce scale and require full compliance with ad platform policies (Meta, Google, etc.).</p>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl mb-6">2. Use License</h2>
              <p>Permission is granted to use our public growth tools and calculators for internal business planning. You may not reverse-engineer our proprietary ROI models or automation frameworks for resale or competing agency operations.</p>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl mb-6">3. Performance Disclaimer</h2>
              <p>While our scale engines are built on proven 8-figure frameworks, ecommerce growth involves market variables beyond our control. Audit projections are estimates based on historical benchmarks and do not constitute a legal guarantee of specific revenue outcomes.</p>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;