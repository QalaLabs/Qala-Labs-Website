import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Check, ArrowRight, Minus } from 'lucide-react';
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
      description: "For 8-figure brands that need high creative volume, multi-channel coverage, and a team that moves as fast as they do.",
      features: [
        "Everything in Growth Engine",
        "10+ High-Velocity UGC Ads/Month",
        "Landing Page Optimization (CRO)",
        "Retention & Email Marketing",
        "Dedicated Growth Engineer"
      ],
      cta: "Scale to 8 Figures",
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
      <SEO
        title="Performance Marketing Agency Pricing India | Qala Labs"
        description="Transparent, performance-based pricing for DTC brands in India. From ₹1.5L/month growth packages to full-scale market domination. No hidden fees."
      />
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
                  asChild
                  className={`w-full py-8 rounded-2xl text-lg font-bold ${
                    tier.highlight
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                  }`}
                >
                  <a href="/contact">
                    {tier.cta} <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="mt-24 overflow-x-auto">
            <h2 className="text-2xl font-black text-slate-900 text-center mb-10">What's included at each tier</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 pr-6 font-bold text-slate-500 w-1/3">Feature</th>
                  <th className="text-center py-4 px-4 font-black text-slate-900">Growth Engine</th>
                  <th className="text-center py-4 px-4 font-black text-blue-600">Market Dominator</th>
                  <th className="text-center py-4 px-4 font-black text-slate-900">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Meta & Google Ads Management", true, true, true],
                  ["Weekly Creative Strategy", true, true, true],
                  ["Server-Side Tracking", true, true, true],
                  ["Custom ROI Dashboard", true, true, true],
                  ["Bi-weekly Strategy Sprints", true, true, true],
                  ["10+ UGC Ads/Month", false, true, true],
                  ["Landing Page CRO", false, true, true],
                  ["Retention & Email Marketing", false, true, true],
                  ["Dedicated Growth Engineer", false, true, true],
                  ["Headless Commerce Development", false, false, true],
                  ["Proprietary Attribution Modelling", false, false, true],
                  ["Inventory & Supply Chain Strategy", false, false, true],
                  ["24/7 Priority Support", false, false, true],
                ].map(([feature, growth, dominator, enterprise], i) => (
                  <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-slate-50/50" : ""}`}>
                    <td className="py-4 pr-6 font-medium text-slate-700">{feature as string}</td>
                    {[growth, dominator, enterprise].map((included, j) => (
                      <td key={j} className="text-center py-4 px-4">
                        {included
                          ? <Check className={`w-5 h-5 mx-auto ${j === 1 ? "text-blue-600" : "text-slate-400"}`} />
                          : <Minus className="w-4 h-4 mx-auto text-slate-200" />
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-500 mb-6">Not sure which tier fits? We'll tell you in 15 minutes.</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors"
            >
              Book a free growth audit <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;