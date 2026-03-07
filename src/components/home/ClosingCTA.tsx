"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from 'lucide-react';

const ClosingCTA = () => {
  return (
    <section className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-indigo-600 rounded-[4rem] p-16 md:p-32 text-white text-center relative overflow-hidden shadow-2xl shadow-indigo-500/20"
        >
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-extrabold mb-10 leading-tight tracking-tight">
              Ready to scale without burning cash?
            </h2>
            <p className="text-xl md:text-2xl text-indigo-100 mb-16 leading-relaxed max-w-2xl mx-auto">
              Book a 15-minute growth audit: we’ll send a custom 90-day opportunity plan with prioritized experiments.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button className="bg-white text-indigo-600 hover:bg-zinc-100 px-12 py-8 rounded-2xl text-xl font-black shadow-2xl transition-all hover:scale-105 group">
                Book Growth Audit <ArrowRight className="ml-2 w-7 h-7 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-12 py-8 rounded-2xl text-xl font-black transition-all hover:scale-105 group">
                Request Case Pack <FileText className="ml-2 w-7 h-7 group-hover:translate-y-[-2px] transition-transform" />
              </Button>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -ml-64 -mb-64" />
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingCTA;