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
  ShoppingBag,
  Layers,
  Trophy,
  Image as ImageIcon,
  CreditCard
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';

// Import actual assets
import TeamLogos from '@/assets/ipl/team-logos.png';
import WelcomeCards from '@/assets/ipl/welcome-cards.png';
import GTBox from '@/assets/ipl/gt-box.png';
import SRHID from '@/assets/ipl/srh-id.png';
import CSKBox from '@/assets/ipl/csk-box.png';
import GTID from '@/assets/ipl/gt-id.png';
import CSKID from '@/assets/ipl/csk-id.png';
import CSKRRBoxes from '@/assets/ipl/csk-rr-boxes.png';
import PBKSMIBoxes from '@/assets/ipl/pbks-mi-boxes.png';

const IPLMerchPortfolio = () => {
  const metrics = [
    { label: "Franchises", value: "8", icon: <Trophy className="w-6 h-6" /> },
    { label: "Asset Types", value: "12+", icon: <Layers className="w-6 h-6" /> },
    { label: "Production", value: "Fast-Turn", icon: <CheckCircle2 className="w-6 h-6" /> },
    { label: "Category", value: "Merchandise", icon: <ShoppingBag className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO 
        title="playR: IPL 2024-25 Merchandise Partner | Qala Labs" 
        description="Full merchandising ecosystem for the IPL season — from packaging and hangtags to membership cards and matchday banners."
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl mb-12 bg-gradient-to-b from-[#05284a] to-[#06305a] p-12 md:p-20 text-white">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="w-48 h-48 bg-white rounded-3xl p-8 flex items-center justify-center shrink-0 shadow-2xl">
                  <img 
                    src="/clients/playr-gold.webp" 
                    alt="playR Logo" 
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="text-center md:text-left">
                  <Badge className="bg-blue-500 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
                    Official Merchandise Partner
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                    playR — IPL 2024–2025 <br /> Merchandise System.
                  </h1>
                  <p className="text-xl text-blue-100/80 max-w-2xl leading-relaxed">
                    Brand systems, packaging dielines, ID & membership cards, posters and player-facing social assets — designed for retail, stadium activations and digital campaigns.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

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

          {/* Team Partnership Visual */}
          <section className="mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50"
            >
              <img src={TeamLogos} alt="IPL Team Partnership Lockups" className="w-full h-auto" />
            </motion.div>
          </section>

          {/* Project Brief */}
          <section className="mb-24">
            <div className="p-10 md:p-16 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Project Brief</h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
                QalaLabs partnered with playR to produce a full merchandising ecosystem for the IPL season — from packaging and hangtags to membership cards and matchday banners. The focus was fast-turn production, consistent brand application across eight franchises, and creating assets that work for e-commerce, in-venue retail and social campaigns.
              </p>
            </div>
          </section>

          {/* Collateral & Cards */}
          <section className="mb-24">
            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
              <ImageIcon className="text-blue-600" /> Welcome Cards & Collateral
            </h3>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-xl border border-slate-100"
            >
              <img src={WelcomeCards} alt="Franchise Welcome & Thank You Cards" className="w-full h-auto" />
            </motion.div>
          </section>

          {/* Packaging & Dielines */}
          <section className="mb-24">
            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
              <Layers className="text-blue-600" /> Packaging & Dielines
            </h3>
            <div className="grid gap-8">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 bg-slate-50"
                >
                  <img src={GTBox} alt="Gujarat Titans Box Dieline" className="w-full h-auto" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 bg-slate-50"
                >
                  <img src={CSKBox} alt="Chennai Super Kings Box Dieline" className="w-full h-auto" />
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[3rem] overflow-hidden shadow-lg border border-slate-100 bg-slate-50"
              >
                <img src={CSKRRBoxes} alt="CSK and RR Box Dielines" className="w-full h-auto" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[3rem] overflow-hidden shadow-lg border border-slate-100 bg-slate-50"
              >
                <img src={PBKSMIBoxes} alt="PBKS and MI Box Dielines" className="w-full h-auto" />
              </motion.div>
            </div>
          </section>

          {/* ID Cards */}
          <section className="mb-24">
            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
              <CreditCard className="text-blue-600" /> Membership & ID Cards
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { img: SRHID, title: "SRH ID Card" },
                { img: GTID, title: "GT ID Card" },
                { img: CSKID, title: "CSK ID Card" }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white p-4"
                >
                  <img src={card.img} alt={card.title} className="w-full h-auto rounded-xl" />
                  <p className="text-center mt-4 text-xs font-black uppercase tracking-widest text-slate-400">{card.title}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="relative p-12 md:p-24 bg-gradient-to-br from-[#ffb400] to-[#ff6a00] rounded-[5rem] overflow-hidden text-center shadow-2xl shadow-orange-500/20">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-900">
                  Want a season-ready <br /> merch system?
                </h2>
                <p className="text-xl text-slate-800 mb-12 font-bold opacity-80">
                  We deliver print-ready dielines, social templates and stadium assets — fast.
                </p>
                <Link to="/contact">
                  <Button className="bg-slate-900 text-white hover:bg-slate-800 px-12 py-10 rounded-3xl text-2xl font-black group transition-all shadow-xl">
                    Let's build it <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-[120px] -ml-48 -mb-48" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IPLMerchPortfolio;