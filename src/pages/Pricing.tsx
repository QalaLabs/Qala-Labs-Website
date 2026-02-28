"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SEO from '@/components/layout/SEO';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Shield, Rocket } from 'lucide-react';

const Pricing = () => {
  const tiers = [
    {
      name: "Growth",
      price: "$5k",
      description: "For brands doing $50k-$150k/mo looking to break through the ceiling.",
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      features: [
        "Meta & TikTok Ad Management",
        "Weekly Creative Strategy",
        "Basic Attribution Setup",
        "Klaviyo Core Flows",
        "Bi-weekly Strategy Calls"
      ]
    },
    {
      name: "Scale",
      price: "$12k",
      description: "Our flagship engine for brands doing $200k+/mo ready for 8-figures.",
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      popular: true,
      features: [
        "Full Omnichannel Management",
        "Daily Creative Production",
        "Proprietary Attribution Engine",
        "Headless Speed Optimization",
        "Retention & LTV Suite",
        "Dedicated Slack Channel"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Global transformation for market leaders and legacy retailers.",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      features: [
        "Global Market Expansion",
        "Custom ERP & Tech Integration",
        "Full Digital Transformation",
        "In-house Team Training",
        "24/7 Priority Support",
        "Performance-only Incentives"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO title="Pricing & Performance Models" description="Transparent pricing models designed to align our success with your revenue growth." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-slate-900 mb-6">Aligned for Growth</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We don't just charge retainers. We win when you win. Our models are built on performance and scale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <Card key={i} className={`relative border-2 transition-all duration-300 ${tier.popular ? 'border-blue-600 shadow-2xl scale-105 z-10' : 'border-slate-100 shadow-xl hover:border-blue-200'}`}>
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">{tier.icon}</div>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-black">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-slate-500 text-lg">/mo</span>}
                </div>
                <p className="text-slate-500 text-sm mt-4">{tier.description}</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="w-5 h-5 text-blue-600 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full py-6 rounded-xl font-bold text-lg ${tier.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 p-10 bg-slate-900 rounded-3xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Looking for a Performance-Only Deal?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            For established brands doing $500k+/mo, we offer pure performance-based models where we only get paid on the incremental revenue we generate.
          </p>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-6 rounded-xl font-bold">
            Apply for Performance Partnership
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;