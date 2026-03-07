"use client";

import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Zap, 
  BarChart3, 
  Target, 
  ArrowRight,
  Globe2,
  Search,
  Database,
  Rocket
} from 'lucide-react';
import { motion } from "framer-motion";

const serviceData: Record<string, any> = {
  'performance': {
    title: "Performance Marketing",
    description: "We dominate paid social and search by combining aggressive bidding strategies with proprietary attribution models.",
    icon: <BarChart3 className="w-12 h-12" />,
    metric: "ROAS 28x",
    features: [
      "Meta & TikTok Ad Management",
      "Google Search & Shopping (PMax)",
      "Proprietary Attribution Modeling",
      "Daily Budget Optimization",
      "Competitor Intelligence"
    ],
    process: [
      { title: "Audit", desc: "Deep dive into historical data and tracking." },
      { title: "Setup", desc: "Infrastructure build and pixel hardening." },
      { title: "Scale", desc: "Aggressive testing and budget expansion." }
    ]
  },
  'creative': {
    title: "Creative Production",
    description: "High-velocity creative testing is the heartbeat of modern scale. We produce 100+ high-converting ad variants weekly.",
    icon: <Zap className="w-12 h-12" />,
    metric: "35% Lower CPA",
    features: [
      "Creator-Led Content (UGC)",
      "Direct Response Video Editing",
      "Static Ad Design",
      "Hook & CTA Testing",
      "Creative Strategy Workshops"
    ],
    process: [
      { title: "Ideation", desc: "Data-driven hook and angle research." },
      { title: "Production", desc: "Rapid filming and editing cycles." },
      { title: "Analysis", desc: "Performance feedback loop for next batch." }
    ]
  },
  'web-dev': {
    title: "Web Development",
    description: "We build headless commerce experiences that load in under 1 second for unmatched performance.",
    icon: <Globe2 className="w-12 h-12" />,
    metric: "<1s Load Time",
    features: [
      "Headless Shopify (Hydrogen/Oxygen)",
      "Custom React Frontends",
      "Speed & Core Web Vitals Optimization",
      "Third-party App Consolidation",
      "Mobile-First UX Design"
    ],
    process: [
      { title: "Design", desc: "Conversion-focused UI/UX prototyping." },
      { title: "Build", desc: "Clean, performant React development." },
      { title: "Launch", desc: "Rigorous testing and seamless migration." }
    ]
  },
  'cro': {
    title: "Conversion Optimization",
    description: "Stop leaking revenue at the finish line. We eliminate friction in your customer journey from landing page to checkout.",
    icon: <Search className="w-12 h-12" />,
    metric: "+42% CVR Lift",
    features: [
      "Heatmap & Session Analysis",
      "Rigorous A/B Testing",
      "Checkout Flow Optimization",
      "Landing Page Design",
      "User Psychology Audits"
    ],
    process: [
      { title: "Analyze", desc: "Identify drop-off points in the funnel." },
      { title: "Hypothesize", desc: "Create data-backed test variations." },
      { title: "Test", desc: "Run experiments to find winning changes." }
    ]
  },
  'data': {
    title: "Analytics & Data",
    description: "Data is only useful if it's actionable. We build custom dashboards and server-side tracking solutions.",
    icon: <Database className="w-12 h-12" />,
    metric: "100% Accuracy",
    features: [
      "Server-Side GTM Setup",
      "Custom Looker Studio Dashboards",
      "LTV & Cohort Analysis",
      "Attribution Modeling",
      "Data Warehouse Integration"
    ],
    process: [
      { title: "Audit", desc: "Verify current tracking integrity." },
      { title: "Implement", desc: "Deploy server-side infrastructure." },
      { title: "Visualize", desc: "Build real-time performance views." }
    ]
  },
  'strategy': {
    title: "eCommerce Growth",
    description: "A holistic approach to scaling your brand to 8-figures and beyond. We act as your fractional growth team.",
    icon: <Rocket className="w-12 h-12" />,
    metric: "310% YoY Growth",
    features: [
      "Omnichannel Growth Strategy",
      "Inventory & Cashflow Planning",
      "Product Roadmap Alignment",
      "Retention & LTV Strategy",
      "Market Expansion Planning"
    ],
    process: [
      { title: "Discovery", desc: "Deep dive into unit economics." },
      { title: "Roadmap", desc: "Build a 12-month scale plan." },
      { title: "Execute", desc: "Weekly sprints to hit growth targets." }
    ]
  }
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const data = serviceData[slug || 'performance'] || serviceData['performance'];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30">
      <SEO title={data.title} description={data.description} />
      <Navbar />
      
      <div className="pt-48 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/services" className="inline-flex items-center gap-2 text-zinc-500 hover:text-indigo-400 font-bold mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="bg-indigo-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px] border-none">Service Detail</Badge>
              <h1 className="text-5xl md:text-8xl font-extrabold text-zinc-50 mb-8 leading-[1.05] tracking-tighter">
                {data.title}
              </h1>
              <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-xl">
                {data.description}
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/contact">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-8 rounded-2xl text-lg font-black shadow-2xl shadow-indigo-500/20">
                    Book Free Audit <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <div className="px-10 py-5 bg-zinc-900 border border-zinc-800 text-white rounded-2xl flex items-center gap-4">
                  <Target className="w-7 h-7 text-indigo-500" />
                  <div>
                    <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">Benchmark</p>
                    <p className="text-2xl font-black tracking-tight">{data.metric}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-square bg-zinc-900/40 backdrop-blur-xl rounded-[4rem] border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
                <div className="text-indigo-500 scale-[3.5] group-hover:scale-[4] transition-transform duration-700">
                  {data.icon}
                </div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-600/5 rounded-full blur-[120px]" />
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-32">
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-5xl font-black text-zinc-50 mb-10 tracking-tight">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {data.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-start gap-5 p-8 bg-zinc-900/40 backdrop-blur-xl rounded-[2.5rem] border border-zinc-800 hover:border-indigo-500/30 transition-all">
                    <CheckCircle2 className="w-6 h-6 text-indigo-500 shrink-0" />
                    <span className="font-bold text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900 text-white p-12 rounded-[3.5rem] border border-zinc-800 shadow-2xl relative overflow-hidden">
              <h3 className="text-2xl font-black mb-10 tracking-tight">Our Process</h3>
              <div className="space-y-10 relative z-10">
                {data.process.map((step: any, i: number) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 bg-indigo-600 rounded-2xl flex items-center justify-center text-[10px] font-black shadow-lg">
                      {i + 1}
                    </div>
                    <h4 className="font-black text-lg mb-2 text-zinc-100">{step.title}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetail;