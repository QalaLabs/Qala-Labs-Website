"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

const QuickMetrics = () => {
  const metrics = [
    {
      brand: "GlowSkin",
      stats: [
        { value: "₹12Cr", label: "90-Day Revenue" },
        { value: "28x", label: "Peak ROAS" },
        { value: "42%", label: "CVR Lift" },
        { value: "35%", label: "Lower CPA" }
      ]
    },
    {
      brand: "Gaffar India",
      stats: [
        { value: "8.4x", label: "Avg. ROAS" },
        { value: "310%", label: "YoY Growth" },
        { value: "20+", label: "Automations" },
        { value: "₹3Cr+", label: "New Revenue" }
      ]
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-10">
          {metrics.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-2xl bg-slate-950 text-white rounded-[4rem] overflow-hidden">
                <CardContent className="p-12 md:p-20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
                    <div className="shrink-0">
                      <h3 className="text-3xl font-black text-blue-400 mb-2">{item.brand}</h3>
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Scale Intelligence</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 flex-1">
                      {item.stats.map((stat: any, j: number) => (
                        <div key={j} className="space-y-3">
                          <p className="text-5xl md:text-6xl font-black tracking-tighter text-white">{stat.value}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-none">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickMetrics;