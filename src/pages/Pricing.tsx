"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import SEO from '@/components/layout/SEO';

const Pricing = () => {
  const tiers = [
    {
      name: "Growth Engine",
      price: "₹1.5L",
      period: "/month",
      description: "Perfect for brands doing ₹10L to ₹50L monthly revenue looking to scale profitably.",
      features: [
        "Full Meta & Google Ads Management",
        "Weekly Creative Strategy",
        "Server-Side Tracking Setup",
        "Custom ROI Dashboard",
        "Bi-weekly Strategy Sprints"
      ],
      cta: "Start Scaling",
      highlight: false
    },
    {
      name: "Market Dominator",
      price: "₹3.5L",
      period: "/month",
      description: "For 8-figure brands requiring aggressive creative volume and multi-channel dominance.",
      features: [
        "Everything in Growth Engine",
        "10+ High-Velocity UGC Ads/Month",
        "Landing Page Optimization (CRO)",
        "Retention & Email Marketing",
        "Dedicated Growth Engineer"
      ],
      cta: "Dominate Your Niche",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Bespoke solutions for global labels and high-volume eCommerce aggregators.",
      features: [
        "Full-Stack Growth Team",
        "Headless Commerce Development",
        "Proprietary Attribution Modeling",
        "Inventory & Supply Chain Strategy",
        "24/7 Priority Support"
      ],
      cta: "Get Custom Proposal",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <SEO title="Investment in Scale" description="No hidden fees. No fluff. Just performance-based pricing designed to align our success with your revenue growth." />
      <Navbar />
      
      <main className="pt-48 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8 uppercase tracking-widest mx-auto"
            >
              Pricing
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-extrabold text-zinc-50 mb-10 tracking-tighter leading-[1.05]">
              Investment in <span className="text-indigo-500">Scale</span>.
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              No hidden fees. No fluff. Just performance-based pricing designed to align our success with your revenue growth.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-12 rounded-[3.5rem] border transition-all duration-500 flex flex-col ${
                  tier.highlight 
                    ? "bg-zinc-900 text-white border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 z-10" 
                    : "bg-zinc-900/40 text-zinc-50 border-zinc-800/50 hover:border-zinc-700"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-6xl font-black tracking-tighter">{tier.price}</span>
                  <span className={tier.highlight ? "text-zinc-400" : "text-zinc-500"}>{tier.period}</span>
                </div>
                <p className={`mb-10 leading-relaxed text-lg ${tier.highlight ? "text-zinc-300" : "text-zinc-400"}`}>
                  {tier.description}
                </p>
                <ul className="space-y-5 mb-12 flex-1">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${tier.highlight ? "bg-indigo-500/20 text-indigo-400" : "bg-zinc-800 text-zinc-500"}`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full py-10 rounded-2xl text-xl font-black transition-all group ${
                    tier.highlight 
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xl shadow-indigo-500/20" 
                      : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
                  }`}
                >
                  {tier.cta} <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;