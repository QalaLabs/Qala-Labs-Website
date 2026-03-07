"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SEO from '@/components/layout/SEO';
import ROICalculator from '@/components/tools/ROICalculator';
import ProfitabilityEstimator from '@/components/tools/ProfitabilityEstimator';
import LTVCalculator from '@/components/tools/LTVCalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Calculator, Target, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Tools = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <SEO title="Growth Tools" description="Free calculators and estimators to help you plan your 8-figure scale." />
      <Navbar />
      
      <div className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8 uppercase tracking-widest mx-auto"
          >
            Growth Tools
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-extrabold text-zinc-50 mb-10 tracking-tighter leading-[1.05]">
            Growth <span className="text-indigo-500">Tools.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Data-driven calculators built on the same frameworks we use to scale our 8-figure partners.
          </p>
        </motion.div>

        <Tabs defaultValue="roi" className="w-full">
          <div className="flex justify-center mb-20">
            <TabsList className="bg-zinc-900/50 p-1.5 rounded-[2rem] border border-zinc-800/50 shadow-2xl h-auto flex flex-wrap justify-center backdrop-blur-xl">
              <TabsTrigger value="roi" className="rounded-2xl px-10 py-4 data-[state=active]:bg-indigo-600 data-[state=active]:text-white flex items-center gap-3 transition-all font-bold text-zinc-400">
                <Target className="w-5 h-5" /> ROI Calculator
              </TabsTrigger>
              <TabsTrigger value="profit" className="rounded-2xl px-10 py-4 data-[state=active]:bg-indigo-600 data-[state=active]:text-white flex items-center gap-3 transition-all font-bold text-zinc-400">
                <Calculator className="w-5 h-5" /> Profitability Estimator
              </TabsTrigger>
              <TabsTrigger value="ltv" className="rounded-2xl px-10 py-4 data-[state=active]:bg-indigo-600 data-[state=active]:text-white flex items-center gap-3 transition-all font-bold text-zinc-400">
                <TrendingUp className="w-5 h-5" /> LTV:CAC Unit Economics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="roi">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <ROICalculator />
            </motion.div>
          </TabsContent>

          <TabsContent value="profit">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <ProfitabilityEstimator />
            </motion.div>
          </TabsContent>

          <TabsContent value="ltv">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <LTVCalculator />
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center p-16 md:p-24 bg-zinc-900/40 backdrop-blur-xl rounded-[4rem] border border-zinc-800/50 shadow-2xl"
        >
          <h3 className="text-3xl md:text-5xl font-extrabold text-zinc-50 mb-8 tracking-tight">Need a custom growth model?</h3>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Our team can build a bespoke 12-month revenue forecast for your brand based on your specific unit economics and market data.
          </p>
          <Button 
            className="bg-zinc-50 text-zinc-950 hover:bg-indigo-600 hover:text-white px-12 py-8 rounded-2xl text-xl font-black transition-all group"
            asChild
          >
            <a href="/contact">
              Request Custom Model <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Tools;