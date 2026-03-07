"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Globe, 
  Workflow, 
  ShoppingBag, 
  Code2, 
  Cpu,
  Search,
  Layers,
  Zap,
  Bot,
  Target
} from 'lucide-react';

const categories = [
  {
    name: "Advertising & Marketplace",
    items: [
      { name: "Meta", icon: <Zap className="w-5 h-5" /> },
      { name: "Google Ads", icon: <Target className="w-5 h-5" /> },
      { name: "Amazon Vendor Central", icon: <ShoppingBag className="w-5 h-5" /> },
      { name: "Amazon Seller Central", icon: <ShoppingBag className="w-5 h-5" /> },
      { name: "Myntra", icon: <ShoppingBag className="w-5 h-5" /> },
      { name: "Flipkart Seller", icon: <ShoppingBag className="w-5 h-5" /> },
      { name: "Zepto", icon: <Zap className="w-5 h-5" /> },
      { name: "Blinkit", icon: <Zap className="w-5 h-5" /> },
      { name: "Quora", icon: <Search className="w-5 h-5" /> }
    ]
  },
  {
    name: "Analytics & SEO",
    items: [
      { name: "Google Analytics", icon: <BarChart3 className="w-5 h-5" /> },
      { name: "Google Tag Manager", icon: <Layers className="w-5 h-5" /> },
      { name: "Google Business", icon: <Globe className="w-5 h-5" /> },
      { name: "Google Search Console", icon: <Search className="w-5 h-5" /> }
    ]
  },
  {
    name: "Automation & AI",
    items: [
      { name: "n8n", icon: <Workflow className="w-5 h-5" /> },
      { name: "Make.com", icon: <Workflow className="w-5 h-5" /> },
      { name: "ElevenLabs", icon: <Bot className="w-5 h-5" /> }
    ]
  },
  {
    name: "Commerce & CMS",
    items: [
      { name: "Shopify", icon: <ShoppingBag className="w-5 h-5" /> },
      { name: "WordPress", icon: <Code2 className="w-5 h-5" /> }
    ]
  },
  {
    name: "Engineering Stack",
    items: [
      { name: "Python", icon: <Cpu className="w-5 h-5" /> },
      { name: "Node.js", icon: <Code2 className="w-5 h-5" /> },
      { name: "Next.js", icon: <Layers className="w-5 h-5" /> },
      { name: "HTML", icon: <Code2 className="w-5 h-5" /> }
    ]
  }
];

const PlatformStack = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Technical Ecosystem</h2>
          <h3 className="text-4xl font-black text-slate-900">Platforms We Dominate.</h3>
        </div>

        <div className="grid gap-12">
          {categories.map((category, i) => (
            <div key={i}>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-4">
                {category.name}
                <div className="h-px bg-slate-100 flex-1" />
              </h4>
              <div className="flex flex-wrap gap-3">
                {category.items.map((platform, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ y: -5, borderColor: '#2563eb' }}
                    className="flex items-center gap-3 px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl transition-all group"
                  >
                    <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                      {platform.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                      {platform.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStack;