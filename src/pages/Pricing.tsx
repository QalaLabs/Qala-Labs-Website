import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
              Investment in <span className="text-blue-600">Scale</span>.
            </h1>
            <p className="text-xl text-slate-600">
              No hidden fees. No fluff. Just performance-based pricing designed to align our success with your revenue growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-10 rounded-[3rem] border ${
                  tier.highlight 
                    ? "bg-slate-900 text-white border-blue-600 shadow-2xl shadow-blue-200" 
                    : "bg-white text-slate-900 border-slate-200"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-black">{tier.price}</span>
                  <span className={tier.highlight ? "text-slate-400" : "text-slate-500"}>{tier.period}</span>
                </div>
                <p className={`mb-8 leading-relaxed ${tier.highlight ? "text-slate-400" : "text-slate-600"}`}>
                  {tier.description}
                </p>
                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${tier.highlight ? "text-blue-400" : "text-blue-600"}`} />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full py-8 rounded-2xl text-lg font-bold ${
                    tier.highlight 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                  }`}
                >
                  {tier.cta} <ArrowRight className="ml-2 w-5 h-5" />
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