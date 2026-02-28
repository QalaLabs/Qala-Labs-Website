"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp, DollarSign, Users } from 'lucide-react';

const CaseStudies = () => {
  const cases = [
    {
      title: "Scaling a Skincare Brand to $10M ARR",
      category: "E-com Scale",
      metrics: { roas: "4.2x", growth: "310%", revenue: "$10M+" },
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
      tags: ["Meta Ads", "TikTok", "LTV Optimization"]
    },
    {
      title: "Digital Transformation for Legacy Retailer",
      category: "Transformation",
      metrics: { roas: "3.8x", growth: "120%", revenue: "$25M+" },
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
      tags: ["Headless Shopify", "ERP Sync", "Klaviyo"]
    },
    {
      title: "Global Expansion for Fashion Creator",
      category: "Global Scale",
      metrics: { roas: "5.1x", growth: "450%", revenue: "$5M+" },
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
      tags: ["International SEO", "Localization", "Cross-border Ads"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-slate-900 mb-6">Proven Results</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real data from real brands. See how we use our scale engines to dominate markets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <Card key={i} className="overflow-hidden border-none shadow-xl hover:translate-y-[-8px] transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white border-none">{c.category}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors">
                  {c.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="text-center p-2 bg-slate-100 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-slate-500">ROAS</p>
                    <p className="text-sm font-black text-blue-600">{c.metrics.roas}</p>
                  </div>
                  <div className="text-center p-2 bg-slate-100 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Growth</p>
                    <p className="text-sm font-black text-blue-600">{c.metrics.growth}</p>
                  </div>
                  <div className="text-center p-2 bg-slate-100 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Revenue</p>
                    <p className="text-sm font-black text-blue-600">{c.metrics.revenue}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;