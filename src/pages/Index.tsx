"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SEO from '@/components/layout/SEO';
import Hero from '@/components/layout/Hero';
import ROICalculator from '@/components/tools/ROICalculator';
import { Search, Zap, Rocket, ShieldCheck } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const clientLogos = [
    "/clients/logo1.webp", "/clients/logo2.webp", "/clients/logo3.png",
    "/clients/logo4.png", "/clients/logo5.png", "/clients/logo6.png",
    "/clients/logo7.png", "/clients/logo8.png", "/clients/logo9.png",
    "/clients/logo10.png", "/clients/logo11.png", "/clients/logo12.png",
  ];

  const steps = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Data Audit",
      description: "We deep-dive into your attribution, unit economics, and creative performance to find the leaks."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Infrastructure Build",
      description: "We deploy our proprietary tracking and headless tech to ensure every Rupee is accounted for."
    },
    {
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      title: "Aggressive Scale",
      description: "We launch high-velocity creative testing and omnichannel scaling to dominate your niche."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "LTV Moat",
      description: "We build retention systems and community engines to protect your growth and maximize profit."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO />
      <Navbar />
      
      <Hero />

      <section className="py-16 border-y border-slate-200 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-12">Trusted by high-growth brands</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {clientLogos.map((logo, index) => (
              <img 
                key={index} 
                src={logo} 
                alt={`Client ${index + 1}`} 
                className="h-12 w-auto object-contain max-w-[140px]"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">The Scale Engine Framework</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our 4-step methodology for taking brands from ₹10L to ₹1Cr+ per month.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                <div className="absolute top-8 right-8 text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors">
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Calculate Your Growth Potential</h2>
            <p className="text-slate-600">Use our proprietary ROI engine to see what's possible with Qala Labs.</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      <footer className="py-20 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm mb-4">© 2024 Qala Labs. All rights reserved. Built for performance.</p>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;