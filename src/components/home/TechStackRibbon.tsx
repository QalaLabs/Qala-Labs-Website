"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Target, BarChart3, Layers, Globe, Search, Workflow, 
  Bot, ShoppingBag, Code2, Cpu 
} from 'lucide-react';

const techStack = [
  { name: "Meta", icon: <Zap className="w-5 h-5" /> },
  { name: "Google Ads", icon: <Target className="w-5 h-5" /> },
  { name: "Google Analytics", icon: <BarChart3 className="w-5 h-5" /> },
  { name: "Google Tag Manager", icon: <Layers className="w-5 h-5" /> },
  { name: "Google Business", icon: <Globe className="w-5 h-5" /> },
  { name: "Google Search Console", icon: <Search className="w-5 h-5" /> },
  { name: "n8n", icon: <Workflow className="w-5 h-5" /> },
  { name: "Make.com", icon: <Workflow className="w-5 h-5" /> },
  { name: "ElevenLabs", icon: <Bot className="w-5 h-5" /> },
  { name: "Shopify", icon: <ShoppingBag className="w-5 h-5" /> },
  { name: "WordPress", icon: <Code2 className="w-5 h-5" /> },
  { name: "Python", icon: <Cpu className="w-5 h-5" /> },
  { name: "HTML", icon: <Code2 className="w-5 h-5" /> },
  { name: "Node.js", icon: <Code2 className="w-5 h-5" /> },
  { name: "Next.js", icon: <Layers className="w-5 h-5" /> },
  { name: "Quora", icon: <Search className="w-5 h-5" /> },
  { name: "Amazon Vendor Central", icon: <ShoppingBag className="w-5 h-5" /> },
  { name: "Amazon Seller Central", icon: <ShoppingBag className="w-5 h-5" /> },
  { name: "Myntra", icon: <ShoppingBag className="w-5 h-5" /> },
  { name: "Flipkart Seller", icon: <ShoppingBag className="w-5 h-5" /> },
  { name: "Zepto", icon: <Zap className="w-5 h-5" /> },
  { name: "Blinkit", icon: <Zap className="w-5 h-5" /> }
];

const TechStackRibbon = () => {
  // Double the list — animation moves exactly one copy (-50%), then resets seamlessly
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <section className="py-12 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          Powered by the world's leading platforms
        </p>
      </div>

      <div className="relative flex">
        {/* The moving track */}
        <motion.div
          className="flex whitespace-nowrap gap-12 items-center py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity
          }}
        >
          {duplicatedStack.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-blue-600 transition-colors"
            >
              <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                {item.icon}
              </div>
              <span className="text-sm font-bold text-slate-700 select-none">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for smooth fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default TechStackRibbon;