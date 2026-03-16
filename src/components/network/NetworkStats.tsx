"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Zap, Star } from 'lucide-react';

const stats = [
  { label: "Active Partners", value: "150+", icon: <Users className="w-5 h-5" /> },
  { label: "Countries", value: "12", icon: <Globe className="w-5 h-5" /> },
  { label: "Avg. Project Size", value: "$100", icon: <Star className="w-5 h-5" /> },
  { label: "Growth Velocity", value: "3.5x", icon: <Zap className="w-5 h-5" /> }
];

const NetworkStats = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <p className="text-4xl font-black text-slate-900 mb-1 tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NetworkStats;