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
  ShoppingBag,
  ArrowLeft,
  Search,
  Zap,
  XCircle,
  Eye,
  Layout,
  Users,
  ShieldCheck,
  MousePointer2,
  Palette,
  FileText
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import NewLogo from '@/assets/gaffar-new-logo.webp';
import OldLogo from '@/assets/gaffar-old-logo.jpg';

const GaffarCaseStudy = () => {
  const metrics = [
    { label: "Project Duration", value: "4 Weeks", icon: <Zap className="w-6 h-6" /> },
    { label: "Deliverables", value: "Full Kit", icon: <FileText className="w-6 h-6" /> },
    { label: "Brand Strategy", value: "Marketplace", icon: <Target className="w-6 h-6" /> },
    { label: "Visual Identity", value: "Responsive", icon: <Palette className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO 
        title="Gaffar India Rebranding Case Study | Qala Labs" 
        description="From Market Stall to Marketplace: How we rebranded Gaffar India for scale and digital trust."
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Case Study: Brand Identity & Strategy
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              From Market Stall to <span className="text-blue-600">Marketplace.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Rebranding Gaffar India for scale: Modernizing a local market legacy into a trustworthy digital powerhouse.
            </p>
          </motion.div>

          {/* Hero Image / Logo Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 bg-slate-50 flex items-center justify-center p-12">
                <img src={OldLogo} alt="Previous Logo" className="max-h-full w-auto object-contain grayscale opacity-50" />
                <div className="absolute top-6 left-6">
                  <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-slate-200 text-slate-400">Previous Identity</Badge>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-blue-100 bg-blue-50/30 flex items-center justify-center p-12">
                <img src={NewLogo} alt="New Logo" className="max-h-full w-auto object-contain" />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-blue-600 text-white">New Identity</Badge>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Metrics */}
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

          {/* Problem & Opportunity */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-8">The Challenge</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Gaffar India was an online storefront with deep local roots in Delhi's famous Gaffar Market. The team wanted to evolve from a single-store feel into a scalable marketplace, while preserving the market’s gritty, local identity.
                </p>
                <div className="space-y-4">
                  {[
                    "Need a modern digital identity that reads trustworthy at scale",
                    "Must appeal to both metro buyers and traditional sellers",
                    "Logo must be instantly legible at favicon/app icon size",
                    "Fast go-to-market for assets and UI components"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                      <span className="font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-xl font-bold mb-6 text-blue-400">Research Insights</h3>
                <p className="text-slate-400 mb-8">We ran a competitor & UX audit against national and hyperlocal players like IndiaMART, Meesho, and Blinkit.</p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    <div>
                      <p className="font-bold">Trust Signals</p>
                      <p className="text-sm text-slate-400">Buyers need immediate cues: verified sellers, COD, and GST visibility.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    <div>
                      <p className="font-bold">Seller Onboarding</p>
                      <p className="text-sm text-slate-400">Low-effort onboarding + transparent fee models are critical for acquisition.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Strategy & Solution */}
          <section className="space-y-32 mb-24">
            <div className="text-center">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">The Strategy</h2>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900">Engineered for Trust.</h3>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Trust-First Visuals",
                  desc: "Primary blue (#0B66FF) for credibility, paired with clean typography and clear verification badges.",
                  icon: <ShieldCheck className="w-8 h-8" />
                },
                {
                  title: "Local Proof",
                  desc: "Market-story elements and vendor micro-stories to maintain the Gaffar Market soul.",
                  icon: <Users className="w-8 h-8" />
                },
                {
                  title: "Responsive Identity",
                  desc: "A logo set that scales from full wordmarks to a simplified micro-mark for app icons.",
                  icon: <Layout className="w-8 h-8" />
                }
              ].map((pillar, i) => (
                <div key={i} className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg">
                    {pillar.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">{pillar.title}</h4>
                  <p className="text-slate-500 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Design Solution Detail */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h4 className="text-3xl font-black text-slate-900 mb-6">The "Cart-G" Mark</h4>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  The primary mark is a stylized blue “G” that reads as a shopping cart — chosen for immediate e-commerce recognition and a modern, tech-forward feel.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Primary Blue</p>
                    <p className="font-bold text-slate-900">#0B66FF</p>
                  </div>
                  <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2">Saffron Accent</p>
                    <p className="font-bold text-slate-900">#FF7A18</p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-white p-12 flex items-center justify-center">
                <img src={NewLogo} alt="Gaffar India Logo Detail" className="w-full h-auto max-w-xs" />
              </div>
            </div>
          </section>

          {/* Strengths & Weaknesses */}
          <section className="mb-24 p-12 md:p-20 bg-slate-50 rounded-[4rem] border border-slate-100">
            <h3 className="text-3xl font-black text-slate-900 mb-12 text-center">Strategic Audit of Logo B</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-green-600 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Strengths
                </h4>
                <ul className="space-y-4">
                  {[
                    "Immediate e-commerce signal (cart + “G”)",
                    "Trusty blue works for B2B + B2C",
                    "Scales perfectly to app icon/favicon",
                    "Fits cleanly within modern UI headers"
                  ].map((item, i) => (
                    <li key={i} className="text-slate-600 font-medium flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-green-500 mt-2.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-amber-600 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Risk Mitigation
                </h4>
                <ul className="space-y-4">
                  {[
                    "Blue-alone can feel corporate; used saffron for warmth",
                    "Provided responsive SVG exports to prevent pixelation",
                    "Simplified inner detail for small sizes (≤16px)"
                  ].map((item, i) => (
                    <li key={i} className="text-slate-600 font-medium flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-amber-500 mt-2.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Testimonial */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900 p-12 md:p-20 rounded-[4rem] shadow-2xl text-center relative overflow-hidden"
            >
              <div className="relative z-10">
                <p className="text-2xl md:text-4xl font-black text-white mb-10 leading-tight italic">
                  “Qala Labs helped us turn a local market legacy into a modern marketplace identity. Their strategy balanced our Gaffar Market roots with digital usability — our sellers felt seen, buyers trusted the site more, and the brand is finally ready to scale.”
                </p>
                <div className="flex flex-col items-center">
                  <p className="font-bold text-blue-400 text-xl">Sejal Jain</p>
                  <p className="text-slate-400">Founder — Gaffar India</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -ml-32 -mb-32" />
            </motion.div>
          </section>

          {/* Final Result Block */}
          <section className="mb-24">
            <Card className="border-none shadow-2xl bg-white rounded-[4rem] overflow-hidden border border-slate-100">
              <CardContent className="p-12 md:p-20">
                <h2 className="text-3xl md:text-5xl font-black mb-10">The Deliverables</h2>
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                    <p>
                      We handed over a complete marketplace playbook, ensuring Gaffar India has everything needed to scale across web, app, and social.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Master Brand Manual (PDF)",
                        "Full SVG/PNG Logo Pack",
                        "Figma-ready UI Kit",
                        "Social Media Templates",
                        "Seller Onboarding Deck",
                        "App Icon & Favicon Sets"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-900">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-10 bg-blue-600 rounded-[3rem] shadow-xl text-white">
                    <h4 className="text-2xl font-black mb-4">Next Steps</h4>
                    <p className="text-blue-100 font-bold mb-6">Recommended KPIs for the rollout phase:</p>
                    <ul className="space-y-3 text-sm">
                      <li>• Seller onboarding conversion rate</li>
                      <li>• First-time buyer checkout conversion</li>
                      <li>• Repeat purchase rate (30/60/90 days)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="relative p-12 md:p-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[5rem] overflow-hidden text-center shadow-2xl shadow-blue-500/20">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight text-white">
                  Ready to modernize <br /> your <i>legacy?</i>
                </h2>
                <Button className="bg-white text-blue-600 hover:bg-slate-100 px-12 py-10 rounded-3xl text-2xl font-black group transition-all shadow-xl">
                  Book Your Brand Audit <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -ml-48 -mb-48" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GaffarCaseStudy;