"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  IndianRupee,
  Zap,
  BarChart3,
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const AmazonAdsPortfolio = () => {
  const metrics = [
    { label: "Top Campaign ROAS", value: "11.2x", icon: <Zap className="w-6 h-6" /> },
    { label: "Monthly Sales", value: "₹2.7L+", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "Account ROAS", value: "6.5+", icon: <BarChart3 className="w-6 h-6" /> },
    { label: "Category", value: "Apparel", icon: <ShoppingBag className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO 
        title="Amazon Ads: Performance Scaling for Apparel Brand | Qala Labs" 
        description="How we scaled Amazon Ads profitably for an apparel brand, achieving 11.2x ROAS."
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Sponsored Products & Sponsored Display
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Amazon Ads: Performance Scaling for Apparel Brand
            </h1>
            
            <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-slate-100 bg-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200" 
                alt="Amazon Ads Performance" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {metrics.map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all group"
              >
                <div className="text-blue-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <section className="grid lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Challenge</h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-6">
                  <p>
                    This project focused on scaling Amazon Ads profitably for an apparel brand operating in a highly competitive marketplace environment. The objective was to drive sustained sales growth while maintaining healthy ROAS.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "High competition in apparel keywords",
                      "Low CTR on new product launches",
                      "Scaling spend without hurting ROAS",
                      "Managing multiple campaigns across different product categories",
                      "Improving conversion efficiency while controlling CPC"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Strategy</h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-6">
                  <p>We implemented a data-first Amazon Ads strategy focused on profitability and scale:</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { title: "Campaign Segmentation", desc: "Structured campaigns by product category, intent level, and performance maturity." },
                      { title: "Search Term Mining", desc: "Continuous extraction of converting search terms and elimination of non-performing keywords." },
                      { title: "Bid & Placement", desc: "Strategic use of Top-of-Search bid adjustments only on high-converting campaigns." },
                      { title: "Performance Scaling", desc: "Budgets were increased selectively on campaigns delivering consistent ROAS." }
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                        <h4 className="font-bold text-blue-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-blue-700">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-2xl font-black mb-8 text-blue-400">Key Achievements</h3>
                <ul className="space-y-4">
                  {[
                    "Achieved ROAS up to 11.2 on top-performing campaigns",
                    "Generated ₹2.7L+ in sales within a single month",
                    "Maintained overall account ROAS above 6.5",
                    "Reduced CPC through relevance and bid control",
                    "Identified clear winners and stopped budget leakage"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <span className="font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-50 p-8">
                <h3 className="text-xl font-black mb-6 text-slate-900">Project Info</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">Artwork / Performance Marketing</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Location</p>
                    <p className="font-bold text-slate-700">United Kingdom</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Software</p>
                    <p className="font-bold text-slate-700">Adobe Illustrator, Amazon Ads Console</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Dated</p>
                    <p className="font-bold text-slate-700">14-Aug-2022</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">Andreo Bowla</p>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Ready to scale on Amazon?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-white text-blue-600 hover:bg-slate-100 rounded-xl font-black">
                    Book Free Audit
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AmazonAdsPortfolio;