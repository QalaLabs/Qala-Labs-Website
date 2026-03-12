"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap, Share2, Heart, Users, Play, BarChart3, ShoppingBag } from 'lucide-react';

const QuickMetrics = () => {
  const results = [
    {
      brand: "Amazon Ads: Apparel Scale",
      stats: [
        { label: "Top ROAS", value: "11.2x", icon: <Zap className="w-4 h-4 text-blue-400" /> },
        { label: "Monthly Sales", value: "₹2.7L+", icon: <TrendingUp className="w-4 h-4 text-blue-400" /> },
        { label: "Account ROAS", value: "6.5+", icon: <BarChart3 className="w-4 h-4 text-blue-400" /> },
        { label: "Category", value: "Apparel", icon: <ShoppingBag className="w-4 h-4 text-blue-400" /> }
      ],
      color: "from-blue-600/20 to-indigo-600/20"
    },
    {
      brand: "CSK: Real Fans, Real Roar",
      stats: [
        { label: "Viral Reach", value: "5M+", icon: <Share2 className="w-4 h-4 text-yellow-400" /> },
        { label: "Engagement", value: "12%", icon: <Heart className="w-4 h-4 text-yellow-400" /> },
        { label: "Conv. Lift", value: "35%", icon: <TrendingUp className="w-4 h-4 text-yellow-400" /> },
        { label: "Fan Reels", value: "500+", icon: <Play className="w-4 h-4 text-yellow-400" /> }
      ],
      color: "from-yellow-600/20 to-orange-600/20"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
            Recent Results
          </h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Proven Performance.</h3>
        </div>
        
        <div className="grid gap-8">
          {results.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[3rem] overflow-hidden relative group">
                {/* Decorative background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <CardContent className="p-10 md:p-16 relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <h3 className="text-2xl font-black tracking-tight">{item.brand}</h3>
                    <div className="px-4 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest">
                      Verified Result
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {item.stats.map((stat, j) => (
                      <div key={j} className="space-y-3">
                        <div className="flex items-center gap-2">
                          {stat.icon}
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                        </div>
                        <p className="text-4xl md:text-5xl font-black tracking-tighter group-hover:scale-105 transition-transform duration-500 origin-left">
                          {stat.value}
                        </p>
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