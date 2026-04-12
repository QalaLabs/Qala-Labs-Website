"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  IndianRupee,
  Zap,
  BarChart3,
  XCircle,
  Quote,
  ShieldCheck,
  MousePointer2,
  CreditCard,
  ArrowLeft,
  BookOpen,
  ListChecks
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import BNPLFeatured from '@/assets/bnpl-featured.png';
import BNPLContent from '@/assets/bnpl-content.png';

const BNPLStrategy = () => {
  const benefits = [
    { title: "Reduces RTO", desc: "Creates a verified digital commitment, lowering casual refusals and reverse logistics costs.", icon: <ShieldCheck className="w-6 h-6" /> },
    { title: "Eliminates Cash Pain", desc: "Electronic settlement means no doorstep cash handling risks or reconciliation delays.", icon: <IndianRupee className="w-6 h-6" /> },
    { title: "Cuts Fraud", desc: "Soft KYC and underwriting at checkout weaken fraud vectors that rely on doorstep cash.", icon: <Zap className="w-6 h-6" /> },
    { title: "Lifts AOV", desc: "Instalments make premium products affordable monthly choices, increasing basket size.", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  // SEO Structured Data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Why BNPL should be every D2C founder's core payment strategy in India",
    "description": "Analysis of how Buy Now Pay Later transforms conversion, AOV, and operational health for Indian D2C brands by reducing RTO and eliminating COD friction.",
    "image": [BNPLFeatured],
    "datePublished": "2026-02-16T08:00:00+08:00",
    "dateModified": "2026-03-13T09:00:00+08:00",
    "author": {
      "@type": "Person",
      "name": "Aashirwad Bhansali",
      "url": "https://qalalabs.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Qala Labs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://qalalabs.com/favicon.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO
        title="Why BNPL Should Be Every D2C Brand's Core Payment Strategy in India | Qala Labs"
        description="BNPL cuts RTO, lifts AOV, and eliminates COD friction for D2C brands in India. A data-backed playbook for implementing Buy Now Pay Later to scale conversions and reduce reverse logistics."
        image={BNPLFeatured}
        article={true}
        jsonLd={articleJsonLd}
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Insights
          </Link>

          <article>
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
                Payment Strategy • 8-Figure Framework
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                Why BNPL should be every D2C founder's <span className="text-blue-600">core payment strategy</span> in India.
              </h1>
              
              <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-100">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-black">AB</div>
                <div>
                  <p className="font-bold text-slate-900">Aashirwad Bhansali</p>
                  <p className="text-xs text-slate-500">Growth & Performance Strategy • Feb 16, 2026</p>
                </div>
              </div>

              <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-slate-100">
                <img 
                  src={BNPLFeatured} 
                  alt="BNPL Strategy for Indian D2C Brands - Featured Image" 
                  className="w-full h-auto" 
                />
              </div>

              <p className="text-xl text-slate-600 leading-relaxed mb-12">
                Buy Now Pay Later or BNPL is not a fad. In India, it is fast becoming the payment method that changes conversion, AOV, and operational health for D2C brands. If your checkout still treats BNPL as optional and not cart recovery, you are leaving growth and margin on the table.
              </p>
            </motion.header>

            {/* Key Takeaways for SEO Dwell Time */}
            <section className="mb-16 p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                <ListChecks className="w-4 h-4" /> Key Takeaways
              </h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {[
                  "BNPL reduces RTO by creating digital commitment",
                  "Removing BNPL can drop prepaid orders by up to 45%",
                  "It acts as a purchase psychology tool for high AOV",
                  "Essential for scaling premium consumables in India"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* The Stark Test Case */}
            <section className="mb-24">
              <h2 className="text-3xl font-black text-slate-900 mb-8">A real test that changed everything for us</h2>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden"
              >
                <Quote className="absolute top-10 right-10 w-24 h-24 text-white/5" />
                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                  We removed BNPL for a new D2C client selling premium consumables. The goal was to simplify reconciliation and reduce credit risk. Traffic and ad spend remained stable. The result was stark.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-4xl font-black text-red-400 mb-2">-45%</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Prepaid Orders</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-4xl font-black text-blue-400 mb-2">Rise</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cart Abandonment</p>
                  </div>
                </div>
                <p className="mt-8 text-slate-400 italic">
                  "The loss was not because customers disappeared. They simply refused to pay the full amount at checkout."
                </p>
              </motion.div>
            </section>

            <div className="rounded-[3rem] overflow-hidden shadow-xl mb-24 border border-slate-100">
              <img 
                src={BNPLContent} 
                alt="Data visualization showing BNPL impact on D2C conversion rates" 
                className="w-full h-auto" 
              />
            </div>

            {/* Benefits Grid */}
            <section className="mb-24">
              <h2 className="text-3xl font-black text-slate-900 mb-12">How BNPL solves COD problems in practice</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((b, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {b.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{b.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Playbook */}
            <section className="mb-24 p-10 md:p-16 bg-blue-50 rounded-[4rem] border border-blue-100">
              <h2 className="text-3xl font-black text-slate-900 mb-10">The Migration Playbook for D2C Founders</h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: "High AOV First", desc: "Enable for electronics, premium skincare, and furniture categories immediately where price sensitivity is highest." },
                  { step: "02", title: "Prominent Placement", desc: "Use a short value line like 'Pay in 3 interest-free instalments' on product pages and near the 'Add to Cart' button." },
                  { step: "03", title: "Partial Tokens", desc: "Require 10-20% upfront for new customers in high RTO pincodes to verify intent while offering BNPL for the balance." },
                  { step: "04", title: "Partner Selection", desc: "Prefer NBFC or bank-backed players with fast settlement speeds and robust reconciliation support." },
                  { step: "05", title: "A/B Testing", desc: "Track prepaid conversions, AOV, RTO, and ROAS-adjusted CAC for 4 weeks to measure true contribution margin." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-2xl font-black text-blue-600 opacity-30">{item.step}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-24 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-black uppercase tracking-widest mb-8">
                <CheckCircle2 className="w-4 h-4" /> Strategy Summary
              </div>
              <p className="text-3xl font-black text-slate-900 leading-tight mb-12">
                BNPL converts a trust-led but cash-heavy checkout into a scalable revenue channel that reduces RTO, raises AOV, and stabilises cash flow.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["#BNPL", "#D2C", "#Ecommerce", "#India", "#Conversion", "#RTO", "#AOV"].map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-500 border-none px-4 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
          </article>

          {/* CTA */}
          <section className="py-20">
            <div className="relative p-12 md:p-20 bg-blue-600 rounded-[4rem] overflow-hidden text-center shadow-2xl shadow-blue-500/20">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight text-white">
                  Ready to optimize your <br /> checkout for scale?
                </h2>
                <Link to="/contact">
                  <Button className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-8 rounded-2xl text-xl font-black group">
                    Book Your Free Audit <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BNPLStrategy;