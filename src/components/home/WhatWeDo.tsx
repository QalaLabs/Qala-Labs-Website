"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Zap, Rocket, Globe2, Users } from 'lucide-react';

interface Service {
  title: string;
  desc: string;
}

interface WhatWeDoProps {
  title?: string;
  services?: Service[];
}

const defaultServices = [
  {
    title: "Performance Marketing",
    desc: "Full-funnel paid media (Meta, TikTok, Google) with creative and data playbooks to lower CAC and grow ROAS.",
    icon: <BarChart3 className="w-6 h-6" />
  },
  {
    title: "AI Automation",
    desc: "Customer journeys, server-side tracking, and AI triggers that turn one-time buyers into repeat customers.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Ecommerce Growth",
    desc: "Funnel engineering, retention stacks, subscription and pricing experiments to lift AOV and LTV.",
    icon: <Rocket className="w-6 h-6" />
  },
  {
    title: "Web Development",
    desc: "Fast, analytics-ready storefronts and headless builds that convert and scale.",
    icon: <Globe2 className="w-6 h-6" />
  },
  {
    title: "Creator & Influencer Programs",
    desc: "Concept, production, and distribution of UGC and creator funnels that reduce CPM and build organic demand.",
    icon: <Users className="w-6 h-6" />
  }
];

const icons = [<BarChart3 />, <Zap />, <Rocket />, <Globe2 />, <Users />];

const WhatWeDo = ({ title = "What we do", services = [] }: WhatWeDoProps) => {
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 md:mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
            What we do
          </h2>
          <h3 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">{title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {displayServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-10 bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl dark:hover:shadow-blue-900/10 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 md:mb-8 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-colors">
                {icons[i % icons.length]}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">{service.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;