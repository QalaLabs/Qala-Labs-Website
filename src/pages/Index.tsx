"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SEO from '@/components/layout/SEO';
import ROICalculator from '@/components/tools/ROICalculator';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, BarChart3, Globe2, Zap, Star, Search, Rocket, ShieldCheck } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { motion } from "framer-motion";

const Index = () => {
  const clientLogos = [
    "/clients/logo1.webp",
    "/clients/logo2.webp",
    "/clients/logo3.png",
    "/clients/logo4.png",
    "/clients/logo5.png",
    "/clients/logo6.png",
    "/clients/logo7.png",
    "/clients/logo8.png",
    "/clients/logo9.png",
    "/clients/logo10.png",
    "/clients/logo11.png",
    "/clients/logo12.png",
  ];

  const testimonials = [
    {
      quote: "Qala Labs didn't just run ads; they rebuilt our entire data infrastructure. We went from ₹15L to ₹1Cr/mo in 6 months.",
      author: "Sarah Chen",
      role: "Founder, GlowSkin",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
    },
    {
      quote: "The most technical marketing team we've ever worked with. Their headless commerce transition paid for itself in 30 days.",
      author: "Marcus Thorne",
      role: "CEO, Urban Threads",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
    }
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
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-8"
          >
            <Zap className="w-4 h-4" />
            New: E-com Creator Scale Engine 2.0
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]"
          >
            We Scale Brands to <span className="text-blue-600">8-Figures</span> <br className="hidden md:block" /> with Performance Data.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto mb-10"
          >
            Qala Labs is a revenue-growth agency that combines digital transformation with aggressive performance marketing to dominate global markets.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-7 rounded-2xl shadow-xl shadow-blue-200">
              Start Your Scale Engine <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-7 rounded-2xl border-2">
              View Case Studies
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
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

      {/* Methodology Section */}
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

      {/* Interactive Tool Section */}
      <section className="py-20 bg-slate-50">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Built for Performance</h2>
            <p className="text-slate-600">Don't take our word for it. Here's what our partners say.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-10 bg-slate-50 rounded-3xl border border-slate-100 relative">
                <Star className="w-8 h-8 text-blue-600 mb-6 fill-blue-600" />
                <p className="text-xl text-slate-700 italic mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-slate-900">{t.author}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <h3 className="text-2xl font-black text-slate-900 mb-6">QALA LABS</h3>
              <p className="text-slate-500 max-w-sm">
                The performance marketing agency for brands that demand 8-figure growth and digital excellence.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="/services" className="hover:text-blue-600">Services</a></li>
                <li><a href="/case-studies" className="hover:text-blue-600">Case Studies</a></li>
                <li><a href="/blog" className="hover:text-blue-600">Blog</a></li>
                <li><a href="/pricing" className="hover:text-blue-600">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Contact</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li>hello@qalalabs.com</li>
                <li>London, UK</li>
                <li>Dubai, UAE</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-sm mb-4">© 2024 Qala Labs. All rights reserved. Built for performance.</p>
            <MadeWithDyad />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;