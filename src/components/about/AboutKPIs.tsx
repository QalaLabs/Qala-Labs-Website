"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, Zap, Users } from 'lucide-react';

const Counter = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  
  useEffect(() => {
    let start = 0;
    const end = numericValue;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <span>
      {value.includes('₹') && '₹'}
      {count.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      {suffix || value.replace(/[0-9.₹]/g, '')}
    </span>
  );
};

const KPICard = ({ value, label, icon }: any) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="bg-zinc-900/40 backdrop-blur-xl p-10 rounded-[3rem] border border-zinc-800 shadow-2xl hover:border-indigo-500/30 transition-all group relative overflow-hidden"
  >
    <div className="flex justify-between items-start mb-8">
      <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-zinc-800">
        {icon}
      </div>
    </div>
    <p className="text-5xl font-black text-zinc-50 mb-3 tracking-tighter">
      <Counter value={value} />
    </p>
    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">{label}</p>
    <div className="absolute bottom-0 left-0 h-1 bg-indigo-600 w-0 group-hover:w-full transition-all duration-700" />
    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

const AboutKPIs = () => {
  const metrics = [
    { value: "₹3Cr+", label: "Revenue Generated", icon: <IndianRupee className="w-6 h-6" /> },
    { value: "5X", label: "Average ROAS", icon: <TrendingUp className="w-6 h-6" /> },
    { value: "20+", label: "Automations Built", icon: <Zap className="w-6 h-6" /> },
    { value: "10+", label: "Years Combined Experience", icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">Performance Benchmarks</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-zinc-50 tracking-tight">Engineered for Scale.</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <KPICard key={i} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutKPIs;