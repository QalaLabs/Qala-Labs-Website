"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Zap,
  Globe,
  Image as ImageIcon,
  Sparkles,
  Heart,
  MousePointer2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const WWFIndiaPortfolio = () => {
  const metrics = [
    { label: "Production Time", value: "-80%", icon: <Zap className="w-6 h-6" /> },
    { label: "Engagement Lift", value: "42%", icon: <Heart className="w-6 h-6" /> },
    { label: "CTR", value: "3.8%", icon: <MousePointer2 className="w-6 h-6" /> },
    { label: "Category", value: "AI Creative", icon: <Sparkles className="w-6 h-6" /> }
  ];

  const creatives = [
    {
      url: "/clients/wwf.png",
      title: "The Guardian",
      desc: "Hyper-realistic AI generation focusing on majestic wildlife protection."
    },
    {
      url: "/clients/wwf.png",
      title: "Ecosystem Harmony",
      desc: "Visualizing the delicate balance of India's natural habitats."
    },
    {
      url: "/clients/wwf.png",
      title: "Future Conservation",
      desc: "Conceptual art driving awareness for long-term environmental goals."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-green-100">
      <SEO
        title="AI Ad Creatives for NGO — WWF India Awareness Campaign | Qala Labs"
        description="How Qala Labs used AI image generation to produce high-impact, low-cost awareness campaign creatives for WWF India — scaling visual output without scaling the budget."
        image="https://qalalabs.com/clients/wwf.png"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: 'WWF India AI Ad Creatives', url: '/portfolio/ai-ad-creatives-wwfindia' }
        ]}
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-green-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-green-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              AI Generation & Creative Strategy
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              WWF India: Scaling <span className="text-green-600">Impact</span> with AI.
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl">
              We replaced traditional high-cost photoshoots with high-velocity AI creative testing. The result? Hyper-realistic imagery that stopped the scroll and drove record engagement for conservation awareness.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {metrics.map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-green-100 transition-all group"
              >
                <div className="text-green-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Creative Showcase */}
          <section className="mb-24 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-black text-slate-900 mb-4">The AI Creatives</h2>
              <p className="text-slate-500">A selection of high-performing assets generated using custom-trained models for WWF India's brand voice.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {creatives.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 mb-6">
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="grid lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Strategy</h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-6">
                  <p>
                    Traditional conservation photography is expensive, time-consuming, and often limited by what can be captured in the wild. For WWF India, we needed to move faster and test more "hooks" to find what truly resonates with modern donors.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { title: "Prompt Engineering", desc: "Developed custom prompt libraries to ensure biological accuracy while maintaining emotional impact." },
                      { title: "Rapid Iteration", desc: "Generated 50+ variants per week to identify winning visual metaphors for climate change." },
                      { title: "Brand Alignment", desc: "Integrated WWF's iconic logo and typography into AI-generated environments seamlessly." },
                      { title: "Cost Efficiency", desc: "Reduced creative production costs by 80% compared to traditional stock or custom shoots." }
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-green-50 rounded-2xl border border-green-100">
                        <h4 className="font-bold text-green-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-green-700">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-2xl font-black mb-8 text-green-400">Key Achievements</h3>
                <ul className="space-y-4">
                  {[
                    "Generated 100+ high-impact assets in under 14 days",
                    "Achieved a 42% lift in social engagement vs. stock imagery",
                    "Maintained 100% brand consistency across all AI outputs",
                    "Identified 3 'winning hooks' that lowered CPA for donation campaigns",
                    "Established a scalable creative engine for future rapid-response needs"
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
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">AI Creative / Social Impact</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Location</p>
                    <p className="font-bold text-slate-700">India</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Software</p>
                    <p className="font-bold text-slate-700">Midjourney, Stable Diffusion, Photoshop AI</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Dated</p>
                    <p className="font-bold text-slate-700">January 2025</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">WWF India</p>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-green-600 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Need an AI creative engine?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-white text-green-600 hover:bg-slate-100 rounded-xl font-black border-none">
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

export default WWFIndiaPortfolio;