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
    <section className="relative pt-48 pb-32 overflow-hidden bg-zinc-950">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <nav className="flex items-center justify-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-10">
              <a href="/" className="hover:text-indigo-400 transition-colors">Home</a>
              <span className="text-zinc-800">/</span>
              <span className="text-zinc-100">About</span>
            </nav>
            
            <Badge className="bg-indigo-600/10 text-indigo-400 border-indigo-500/20 mb-8 px-6 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Systems That Scale
            </Badge>
            
            <h1 className="text-5xl md:text-8xl font-extrabold text-zinc-50 leading-[1.05] mb-10 tracking-tighter">
              We build predictable <br /> 
              <span className="text-indigo-500">revenue engines</span> <br /> 
              for ecommerce.
            </h1>
            
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              Performance marketing, AI automation, conversion-first sites and creator programs all engineered to grow revenue, not vanity metrics.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button 
                onClick={onBookClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white h-20 px-10 rounded-2xl text-lg font-black shadow-2xl shadow-indigo-500/20 group"
              >
                Book 15-min growth audit <Calendar className="ml-2 w-6 h-6 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                onClick={onCasePackClick}
                className="h-20 px-10 rounded-2xl text-lg font-bold border-zinc-800 text-zinc-300 hover:bg-zinc-900 group"
              >
                Request case pack <FileText className="ml-2 w-6 h-6 group-hover:translate-y-[-2px] transition-transform" />
              </Button>
            </div>

            <div className="pt-12 border-t border-zinc-900 flex justify-center">
              <div className="flex items-start gap-6 max-w-md text-left">
                <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-500/20">
                  <span className="text-indigo-500 font-black text-2xl">“</span>
                </div>
                <p className="text-lg italic text-zinc-400 leading-relaxed">
                  “Qala Labs helped us scale to a six-figure monthly run-rate fast, strategic, and data-driven.” 
                  <span className="block mt-3 font-bold text-zinc-100 not-italic text-sm uppercase tracking-widest">CEO, Gaffar India</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;