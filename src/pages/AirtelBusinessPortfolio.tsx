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
  Camera,
  Building2,
  Layers
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const AirtelBusinessPortfolio = () => {
  const metrics = [
    { label: "Segment", value: "Enterprise B2B", icon: <Building2 className="w-6 h-6" /> },
    { label: "Coverage", value: "On-Site Event", icon: <Camera className="w-6 h-6" /> },
    { label: "Products Covered", value: "3", icon: <Layers className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100">
      <SEO
        title="Airtel Business: Enterprise Exhibition Photography | Qala Labs"
        description="How Qala Labs shot on-site exhibition and booth photography for Airtel Business, covering their SD-Branch, Secure Workforce, and Telco-Grade Cloud enterprise product launches."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: 'Airtel Business Exhibition', url: '/portfolio/airtel-business-exhibition' }
        ]}
      />
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-red-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Production & Shoots
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Airtel Business: <span className="text-red-600">On the Ground</span> at Launch.
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl">
              On-site exhibition photography for Airtel Business's enterprise product line — booth displays, signage, and launch coverage for SD-Branch, Secure Workforce, and their telco-grade cloud platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-24">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-red-100 transition-all group"
              >
                <div className="text-red-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <section className="grid lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Coverage</h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-6">
                  <p>
                    Airtel Business used a live exhibition to showcase three enterprise products — SD-Branch for unifying fragmented branch networks, Secure Workforce for anytime-anywhere device and data security, and a telco-grade cloud platform built for India. We covered the activation on-site: booth builds, signage, product displays, and the broader event environment.
                  </p>
                  <p>
                    The brief was straightforward — deliver clean, usable brand and event photography enterprise marketing teams can drop straight into decks, case studies, and internal recaps without a separate editing pass.
                  </p>
                </div>
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-2xl font-black mb-8 text-red-400">Production Scope</h3>
                <ul className="space-y-4">
                  {[
                    "On-site exhibition and booth photography",
                    "Coverage across three enterprise product launches",
                    "Signage, display, and environment documentation",
                    "Deck- and case-study-ready image delivery"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-red-400 shrink-0" />
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
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">Production & Shoots</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Segment</p>
                    <p className="font-bold text-slate-700">Enterprise / B2B Telecom</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">Airtel Business</p>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-red-600 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Need event coverage that ships fast?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-white text-red-600 hover:bg-slate-100 rounded-xl font-black border-none">
                    Book Free Audit <ArrowRight className="ml-2 w-4 h-4" />
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

export default AirtelBusinessPortfolio;
