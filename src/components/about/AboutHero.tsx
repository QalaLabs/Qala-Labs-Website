"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AboutHeroProps {
  onBookClick: () => void;
  onCasePackClick: () => void;
}

const AboutHero = ({ onBookClick, onCasePackClick }: AboutHeroProps) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
              <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
              <span>/</span>
              <span className="text-slate-900">About</span>
            </nav>
            
            <Badge className="bg-blue-600/10 text-blue-700 border-none mb-6 px-4 py-1 rounded-full font-bold">
              We build predictable revenue engines for ecommerce.
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              We build predictable <br /> 
              <span className="text-blue-600">revenue engines</span> <br /> 
              for ecommerce.
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Performance marketing, AI automation, conversion-first sites and creator programs all engineered to grow revenue, not vanity metrics.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Button 
                onClick={onBookClick}
                className="bg-blue-600 hover:bg-blue-700 text-white h-16 px-8 rounded-2xl text-lg font-black shadow-xl shadow-blue-500/20 group"
              >
                Book 15-min growth audit <Calendar className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                onClick={onCasePackClick}
                className="h-16 px-8 rounded-2xl text-lg font-bold border-2 border-slate-200 hover:bg-slate-50 group"
              >
                Request case pack <FileText className="ml-2 w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
              </Button>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <div className="flex items-start gap-4 max-w-md">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-blue-600 font-black text-xs">“</span>
                </div>
                <p className="text-sm italic text-slate-500 leading-relaxed">
                  “Qala Labs helped us scale to a six-figure monthly run-rate fast, strategic, and data-driven.” 
                  <span className="block mt-2 font-bold text-slate-900 not-italic">CEO, Gaffar India</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-slate-50 rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100 relative">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200" 
                alt="Qala Labs Strategy Session" 
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
              
              <div className="absolute bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 animate-bounce-slow">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Avg. ROAS</p>
                <p className="text-3xl font-black text-slate-900">28.4x</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;