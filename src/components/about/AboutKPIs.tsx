"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, Target, MousePointer2, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
      {count.toLocaleString(undefined, { maximumFractionDigits: 1 })}
      {suffix || value.replace(/[0-9.₹]/g, '')}
    </span>
  );
};

const KPICard = ({ title, value, label, icon, detail, onClick }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
    aria-label={`${title} - ${value} ${label}`}
  >
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <Info className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
    </div>
    <p className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
      <Counter value={value} />
    </p>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <div className="absolute bottom-0 left-0 h-1 bg-blue-600 w-0 group-hover:w-full transition-all duration-500" />
  </motion.div>
);

const AboutKPIs = () => {
  const [selectedMetric, setSelectedMetric] = useState<any>(null);

  const row1 = [
    { title: "TroTr", value: "₹14L", label: "Revenue", icon: <IndianRupee />, detail: "Attributed revenue generated within the first 90 days of the founder-led storytelling campaign." },
    { title: "TroTr", value: "₹6700", label: "Cost per lead", icon: <MousePointer2 />, detail: "High-intent leads captured via a frictionless website funnel, replacing failing WhatsApp ads." },
    { title: "TroTr", value: "28x", label: "ROAS", icon: <TrendingUp />, detail: "Return on Ad Spend achieved by pivoting to manual, intent-based targeting over automation." },
    { title: "TroTr", value: "₹1.9L", label: "Avg. order value", icon: <Target />, detail: "Premium travel packages sold through high-trust, founder-led video content." }
  ];

  const row2 = [
    { title: "playR", value: "11.2x", label: "Max ROAS", icon: <TrendingUp />, detail: "Peak performance achieved on high-velocity apparel campaigns through search term mining." },
    { title: "playR", value: "₹2.7L+", label: "Monthly sales", icon: <IndianRupee />, detail: "Consistent monthly revenue generated on Amazon through strategic bid adjustments." },
    { title: "playR", value: "6.5x+", label: "Account ROAS", icon: <Target />, detail: "Overall account health maintained across multiple product categories and new launches." },
    { title: "playR", value: "Reduced", label: "Acquisition", icon: <MousePointer2 />, detail: "Significant reduction in CPC through relevance optimization and negative keyword management.", isText: true }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Performance Benchmarks</h2>
          <h3 className="text-4xl font-black text-slate-900">Real Data. Real Brands.</h3>
        </div>

        <div className="space-y-8">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">TroTr — Lead Generation</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {row1.map((m, i) => (
                <KPICard key={i} {...m} onClick={() => setSelectedMetric(m)} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">playR — Amazon Growth (avg monthly ≈ ₹3L)</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {row2.map((m, i) => (
                <KPICard key={i} {...m} onClick={() => setSelectedMetric(m)} />
              ))}
            </div>
          </div>
        </div>

        <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
          <DialogContent className="rounded-[2.5rem] p-10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-slate-900 mb-4">
                {selectedMetric?.title} — {selectedMetric?.label}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                <p className="text-5xl font-black text-blue-600 mb-2">{selectedMetric?.value}</p>
                <p className="text-slate-600 leading-relaxed">{selectedMetric?.detail}</p>
              </div>
              <div className="flex justify-end">
                <a href="/case-studies" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
                  See full case study <TrendingUp className="w-4 h-4" />
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AboutKPIs;