"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SEO from '@/components/layout/SEO';
import ROICalculator from '@/components/tools/ROICalculator';
import ProfitabilityEstimator from '@/components/tools/ProfitabilityEstimator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Calculator, Target } from 'lucide-react';

const Tools = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Growth Tools" description="Free calculators and estimators to help you plan your 8-figure scale." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">Growth Tools</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Data-driven calculators built on the same frameworks we use to scale our 8-figure partners.
          </p>
        </motion.div>

        <Tabs defaultValue="roi" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm h-auto">
              <TabsTrigger value="roi" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2">
                <Target className="w-4 h-4" /> ROI Calculator
              </TabsTrigger>
              <TabsTrigger value="profit" className="rounded-xl px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2">
                <Calculator className="w-4 h-4" /> Profitability Estimator
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="roi">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ROICalculator />
            </motion.div>
          </TabsContent>

          <TabsContent value="profit">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProfitabilityEstimator />
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="mt-20 text-center p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Need a custom growth model?</h3>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            Our team can build a bespoke 12-month revenue forecast for your brand based on your specific unit economics and market data.
          </p>
          <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors">
            Request Custom Model
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tools;