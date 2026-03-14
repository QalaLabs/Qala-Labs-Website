"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap, Share2, Heart, Users, Play, BarChart3, ShoppingBag } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  iconType: 'zap' | 'trending' | 'chart' | 'bag' | 'share' | 'heart' | 'users' | 'play';
}

interface MetricItem {
  brand: string;
  stats: Stat[];
  color: string;
}

interface QuickMetricsProps {
  title?: string;
  subtitle?: string;
  results?: MetricItem[];
}

const iconMap: Record<string, any> = {
  zap: <Zap className="w-4 h-4 text-blue-400" />,
  trending: <TrendingUp className="w-4 h-4 text-blue-400" />,
  chart: <BarChart3 className="w-4 h-4 text-blue-400" />,
  bag: <ShoppingBag className="w-4 h-4 text-blue-400" />,
  share: <Share2 className="w-4 h-4 text-yellow-400" />,
  heart: <Heart className="w-4 h-4 text-yellow-400" />,
  users: <Users className="w-4 h-4 text-yellow-400" />,
  play: <Play className="w-4 h-4 text-yellow-400" />
};

const defaultResults: MetricItem[] = [
  {
    brand: "Amazon Ads: Apparel Scale",
    stats: [
      { label: "Top ROAS", value: "11.2x", iconType: 'zap' },
      { label: "Monthly Sales", value: "₹2.7L+", iconType: 'trending' },
      { label: "Account ROAS", value: "6.5+", iconType: 'chart' },
      { label: "Category", value: "Apparel", iconType: 'bag' }
    ],
    color: "from-blue-600/20 to-indigo-600/20"
  },
  {
    brand: "CSK: Real Fans, Real Roar",
    stats: [
      { label: "Viral Reach", value: "5M+", iconType: 'share' },
      { label: "Engagement", value: "12%", iconType: 'heart' },
      { label: "Conv. Lift", value: "35%", iconType: 'trending' },
      { label: "Fan Reels", value: "500+", iconType: 'play' }
    ],
    color: "from-yellow-600/20 to-orange-600/20"
  }
];

const QuickMetrics = ({ 
  title = "Recent Results", 
  subtitle = "Proven Performance.",
  results = defaultResults 
}: QuickMetricsProps) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
            {title}
          </h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">{subtitle}</h3>
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
                          {iconMap[stat.iconType] || <Zap className="w-4 h-4" />}
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