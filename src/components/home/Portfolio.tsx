"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

const caseStudies = [
  { id: 1, client: 'E-com Apparel', metric: '300% ROAS', description: 'Scaled ad spend while maintaining profitability through targeted performance marketing.', category: 'Marketing' },
  { id: 2, client: 'Retail Tech', metric: 'Automated 40hrs/wk', description: 'Built custom n8n workflows for seamless inventory and catalog data syncing.', category: 'Automation' },
  { id: 3, client: 'D2C Brand', metric: '+45% Conversion', description: 'Overhauled UI/UX and optimized data hygiene for a frictionless checkout experience.', category: 'E-commerce' }
];

const Portfolio = () => {
  return (
    <section className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-zinc-50 mb-6 tracking-tight"
          >
            Proven Results.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Real data from real brands. We don't just promise growth; we engineer it.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-10 bg-zinc-900/40 border border-zinc-800/50 rounded-[3rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500"
            >
              <div className="absolute top-8 right-8">
                <Badge className="bg-indigo-600/10 text-indigo-400 border-indigo-500/20 px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
                  {study.category}
                </Badge>
              </div>

              <div className="mb-12">
                <p className="text-5xl md:text-6xl font-black text-zinc-50 mb-4 tracking-tighter group-hover:text-indigo-500 transition-colors duration-500">
                  {study.metric}
                </p>
                <h3 className="text-xl font-bold text-zinc-300">{study.client}</h3>
              </div>

              <p className="text-zinc-500 leading-relaxed">
                {study.description}
              </p>

              {/* Decorative Gradient */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/10 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;