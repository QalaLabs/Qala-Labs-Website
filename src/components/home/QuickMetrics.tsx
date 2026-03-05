"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

const QuickMetrics = () => {
  const metrics = [
    {
      brand: "playR: CSK UGC Campaign",
      stats: [
        { label: "Viral Reach", value: "5M+" },
        { label: "Engagement", value: "12%" },
        { label: "Conv. Lift", value: "35%" },
        { label: "Fan Reels", value: "500+" }
      ]
    },
    {
      brand: "playR: Amazon Seller",
      stats: [
        { label: "Max ROAS", value: "11.2×" },
        { label: "Monthly sales", value: "₹2.7L+" },
        { label: "Account ROAS", value: "6.5×+" },
        { label: "Reduced CPC", value: "Lower acquisition cost" }
      ]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-8">
          {metrics.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-xl bg-slate-900 text-white rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-10 md:p-16">
                  <h3 className="text-xl font-bold mb-12 text-blue-400">{item.brand}</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {item.stats.map((stat, j) => (
                      <div key={j} className="space-y-2">
                        <p className="text-4xl md:text-5xl font-black tracking-tighter">{stat.value}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                      </div>
                    ))}
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