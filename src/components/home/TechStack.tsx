"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Layers } from 'lucide-react';

const techItems = [
  { name: 'n8n.io', category: 'Automation', icon: Cpu },
  { name: 'Python', category: 'Data Science', icon: Code2 },
  { name: 'WooCommerce', category: 'E-commerce', icon: Globe },
  { name: 'Make.com', category: 'Integrations', icon: Layers },
];

const TechStack = () => {
  return (
    <section id="tech-stack" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-zinc-50 mb-6 tracking-tight"
          >
            Our Tech Stack
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            We use the most powerful tools in the industry to build your revenue engine.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl flex flex-col items-center text-center group hover:border-indigo-500/30 transition-all"
            >
              <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-50">{item.name}</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{item.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;