"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ROICalculator from '@/components/tools/ROICalculator';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, BarChart3, Globe2, Zap } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-8 animate-bounce">
            <Zap className="w-4 h-4" />
            New: E-com Creator Scale Engine 2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
            We Scale Brands to <span className="text-blue-600">8-Figures</span> <br className="hidden md:block" /> with Performance Data.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Qala Labs is a revenue-growth agency that combines digital transformation with aggressive performance marketing to dominate global markets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-7 rounded-2xl shadow-xl shadow-blue-200">
              Start Your Scale Engine <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-7 rounded-2xl border-2">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Tool Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Calculate Your Growth Potential</h2>
            <p className="text-slate-600">Use our proprietary ROI engine to see what's possible with Qala Labs.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-800 rounded-3xl border border-slate-700 hover:border-blue-500 transition-all group">
              <BarChart3 className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">E-com Creator Scale Engine</h3>
              <p className="text-slate-400 mb-6">Aggressive scaling for creator-led brands using proprietary attribution models.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Paid Social Dominance</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-500" /> LTV Optimization</li>
              </ul>
            </div>
            
            <div className="p-8 bg-slate-800 rounded-3xl border border-slate-700 hover:border-blue-500 transition-all group">
              <Zap className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Digital Transformation Suite</h3>
              <p className="text-slate-400 mb-6">Modernizing legacy infrastructure for the digital-first economy.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Headless Commerce</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-500" /> CRM Automation</li>
              </ul>
            </div>

            <div className="p-8 bg-slate-800 rounded-3xl border border-slate-700 hover:border-blue-500 transition-all group">
              <Globe2 className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Global Scale Engine</h3>
              <p className="text-slate-400 mb-6">Cross-border expansion strategies for brands ready for the world stage.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Multi-market SEO</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Localization Ops</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2024 Qala Labs. All rights reserved. Built for performance.</p>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;