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
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
    </div>
    <p className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
      <Counter value={value} />
    </p>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <div className="absolute bottom-0 left-0 h-1 bg-blue-600 w-0 group-hover:w-full transition-all duration-500" />
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
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Performance Benchmarks</h2>
          <h3 className="text-4xl font-black text-slate-900">Engineered for Scale.</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <KPICard key={i} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutKPIs;