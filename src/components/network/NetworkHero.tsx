"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

const NetworkHero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-blue-600/10 text-blue-700 border-none mb-6 px-4 py-1 rounded-full font-bold">
              The Qala Network
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.95] mb-8 tracking-tighter">
              Let's build <br /> 
              <span className="text-blue-600">together.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              We're building a collective of the world's best freelancers, consultants, and niche experts. When we land a massive project, we tap into our network to deliver elite results.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 rounded-l-[5rem] hidden lg:block" />
    </section>
  );
};

export default NetworkHero;