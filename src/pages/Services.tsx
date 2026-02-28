"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { CheckCircle2, Zap, BarChart3, Globe2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      title: "E-com Creator Scale Engine",
      description: "We turn creator-led brands into 8-figure powerhouses using aggressive paid social and proprietary attribution.",
      icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
      features: ["Meta & TikTok Ads", "Creative Strategy", "LTV Optimization", "Retention Systems"]
    },
    {
      title: "Digital Transformation Suite",
      description: "Modernize your tech stack for the digital-first economy. We build headless commerce and automated CRM flows.",
      icon: <Zap className="w-10 h-10 text-blue-600" />,
      features: ["Headless Shopify", "Klaviyo Automation", "Custom ERP Sync", "Data Warehousing"]
    },
    {
      title: "Global Scale Engine",
      description: "Ready for the world stage? We handle cross-border expansion, localization, and international SEO.",
      icon: <Globe2 className="w-10 h-10 text-blue-600" />,
      features: ["Multi-market SEO", "Localization Ops", "Global Logistics Tech", "Cross-border Ads"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-slate-900 mb-6">Our Scale Engines</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Proprietary frameworks designed to dominate markets and maximize revenue growth.
          </p>
        </div>

        <div className="grid gap-12">
          {services.map((service, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-12 items-center p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="md:w-1/3">
                {service.icon}
                <h2 className="text-3xl font-bold mt-4 mb-4">{service.title}</h2>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <Button className="bg-blue-600">Learn More</Button>
              </div>
              <div className="md:w-2/3 grid grid-cols-2 gap-4">
                {service.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-slate-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;