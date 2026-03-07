"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Database, Bot, ArrowRight } from 'lucide-react';

const services = [
  { 
    id: 1, 
    title: 'Performance Marketing', 
    icon: TrendingUp, 
    description: 'Data-driven media buying and targeted ad strategies designed to aggressively scale e-commerce ROAS.', 
    tags: ['PPC', 'Meta Ads', 'Google Ads'] 
  },
  { 
    id: 2, 
    title: 'E-commerce Catalog & Data Ops', 
    icon: Database, 
    description: 'Deep data hygiene, duplicate product identification, and automated CSV processing for massive WooCommerce storefronts.', 
    tags: ['WooCommerce', 'Data Hygiene', 'Automation'] 
  },
  { 
    id: 3, 
    title: 'AI & Workflow Automation', 
    icon: Bot, 
    description: 'Eliminate manual bottlenecks. We build custom integrations, migrate Make.com setups to n8n, and deploy Python scripts for seamless operations.', 
    tags: ['n8n', 'Python', 'Make.com'] 
  }
];

const ServicesGrid = () => {
  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Subtle Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 to-zinc-950 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-zinc-50 mb-6 tracking-tight"
          >
            The Power We Deliver
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-400 max-w-2xl"
          >
            We bridge the gap between aggressive growth and flawless technical execution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group p-10 bg-zinc-900/40 backdrop-blur-lg border border-zinc-800 rounded-[2.5rem] hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-indigo-500 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <service.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-zinc-50 mb-4 group-hover:text-indigo-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {service.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800">
                    {tag}
                  </span>
                ))}
              </div>

              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;