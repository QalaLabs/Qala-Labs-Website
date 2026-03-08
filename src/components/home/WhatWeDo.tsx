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
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
            What we do
          </h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">{title}</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white rounded-[2rem] border border-slate-100 hover:shadow-2xl transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {icons[i % icons.length]}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;