"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import ServiceFinder from '@/components/tools/ServiceFinder';
import { motion } from 'framer-motion';

const ServiceFinderPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Which Growth Service Do You Need? Free Diagnosis | Qala Labs"
        description="Tell us what's slowing your growth down and get matched to the exact Qala Labs service that fixes it — traffic, conversion, automation, creative, or strategy."
      />
      <Navbar />

      <main className="pt-40 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
              Not sure what <br /> <span className="text-blue-600">you actually need?</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Tell us what's broken. We'll tell you exactly which service fixes it — no generic sales pitch.
            </p>
          </motion.div>
        </div>

        <ServiceFinder />
      </main>

      <Footer />
    </div>
  );
};

export default ServiceFinderPage;
