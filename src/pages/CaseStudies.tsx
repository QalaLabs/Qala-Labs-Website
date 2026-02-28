"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import SEO from '@/components/layout/SEO';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp, DollarSign, Users, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

const CaseStudies = () => {
  const navigate = useNavigate();
  const cases = [
    {
      title: "Scaling a Skincare Brand to $10M ARR",
      slug: "skincare-scale-10m",
      category: "E-com Scale",
      metrics: { roas: "4.2x", growth: "310%", revenue: "$10M+" },
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
      tags: ["Meta Ads", "TikTok", "LTV Optimization"],
      description: "How we leveraged creator-led content and proprietary attribution to dominate the skincare niche."
    },
    {
      title: "Digital Transformation for Legacy Retailer",
      slug: "legacy-retail-transformation",
      category: "Transformation",
      metrics: { roas: "3.8x", growth: "120%", revenue: "$25M+" },
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
      tags: ["Headless Shopify", "ERP Sync", "Klaviyo"],
      description: "Modernizing a 20-year-old retail brand for the digital-first economy with headless commerce."
    },
    {
      title: "Global Expansion for Fashion Creator",
      slug: "fashion-global-expansion",
      category: "Global Scale",
      metrics: { roas: "5.1x", growth: "450%", revenue: "$5M+" },
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
      tags: ["International SEO", "Localization", "Cross-border Ads"],
      description: "Taking a UK-based fashion brand to the US and UAE markets with localized scale engines."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Proven Results" description="Real data from real brands. See how we use our scale engines to dominate markets." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">Proven Results</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We don't just promise growth. We deliver it. Explore our 8-figure success stories.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="overflow-hidden border-none shadow-2xl hover:translate-y-[-12px] transition-all duration-500 group bg-white rounded-[2rem]">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={c.image} 
                    alt={c.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-blue-600 text-white border-none px-4 py-1 rounded-full font-bold">
                      {c.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl font-bold leading-tight group-hover:text-blue-600 transition-colors">
                    {c.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 mb-8 line-clamp-2">{c.description}</p>
                  
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="text-center p-3 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-[10px] uppercase font-black text-blue-400 tracking-widest mb-1">ROAS</p>
                      <p className="text-lg font-black text-blue-700">{c.metrics.roas}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-[10px] uppercase font-black text-blue-400 tracking-widest mb-1">Growth</p>
                      <p className="text-lg font-black text-blue-700">{c.metrics.growth}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-[10px] uppercase font-black text-blue-400 tracking-widest mb-1">Revenue</p>
                      <p className="text-lg font-black text-blue-700">{c.metrics.revenue}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {c.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{tag}</span>
                    ))}
                  </div>

                  <button 
                    onClick={() => navigate(`/case-studies/${c.slug}`)}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
                  >
                    View Full Case Study <ArrowRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;