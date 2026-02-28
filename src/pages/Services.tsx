"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SEO from '@/components/layout/SEO';
import { CheckCircle2, Zap, BarChart3, Globe2, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      title: "E-com Creator Scale Engine",
      description: "We turn creator-led brands into 8-figure powerhouses using aggressive paid social and proprietary attribution.",
      icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
      features: ["Meta & TikTok Ads", "Creative Strategy", "LTV Optimization", "Retention Systems"],
      color: "bg-blue-50"
    },
    {
      title: "Digital Transformation Suite",
      description: "Modernize your tech stack for the digital-first economy. We build headless commerce and automated CRM flows.",
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      features: ["Headless Shopify", "Klaviyo Automation", "Custom ERP Sync", "Data Warehousing"],
      color: "bg-slate-50"
    },
    {
      title: "Global Scale Engine",
      description: "Ready for the world stage? We handle cross-border expansion, localization, and international SEO.",
      icon: <Globe2 className="w-12 h-12 text-blue-600" />,
      features: ["Multi-market SEO", "Localization Ops", "Global Logistics Tech", "Cross-border Ads"],
      color: "bg-blue-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO title="Our Scale Engines" description="Proprietary frameworks designed to dominate markets and maximize revenue growth." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">Our Scale Engines</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We don't just run ads. We build the infrastructure for 8-figure growth.
          </p>
        </motion.div>

        <div className="grid gap-16">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row gap-12 items-center p-10 rounded-[2.5rem] ${service.color} border border-slate-100 shadow-sm`}
            >
              <div className="md:w-1/2">
                <div className="mb-6">{service.icon}</div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">{service.title}</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">{service.description}</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl font-bold">
                  Explore Engine <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3 p-5 bg-white rounded-2xl shadow-sm border border-slate-50">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-800">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 p-12 bg-slate-900 rounded-[3rem] text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Ready to build your scale engine?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Join the 1% of brands that dominate their niche with data-driven performance.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-8 rounded-2xl text-xl font-black shadow-2xl shadow-blue-500/20">
              Book Your Free Audit
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -ml-32 -mb-32" />
        </div>
      </div>
    </div>
  );
};

export default Services;