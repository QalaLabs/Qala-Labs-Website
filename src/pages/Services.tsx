"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SEO from '@/components/layout/SEO';
import ServicesGrid from '@/components/services/ServicesGrid';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Our Scale Engines" description="Proprietary frameworks designed to dominate markets and maximize revenue growth." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            Our <span className="text-blue-600">Scale Engines</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We don't just run ads. We build the technical and creative infrastructure required for 8-figure growth.
          </p>
        </motion.div>

        <ServicesGrid />

        {/* Bottom CTA */}
        <div className="mt-32 p-12 bg-slate-900 rounded-[3rem] text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to build your scale engine?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Join the 1% of brands that dominate their niche with data-driven performance.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-8 rounded-2xl text-xl font-black shadow-2xl shadow-blue-500/20">
              Book Your Free Audit <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -ml-32 -mb-32" />
        </div>
      </div>
    </div>
  );
};

export default Services;