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
  Layout,
  Image as ImageIcon,
  CreditCard,
  Tag,
  Share2,
  Monitor
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

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
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] -ml-32 -mb-32" />
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

          {/* Project Brief */}
          <section className="mb-24">
            <div className="p-10 md:p-16 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Project Brief</h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
                QalaLabs partnered with playR to produce a full merchandising ecosystem for the IPL season — from packaging and hangtags to membership cards and matchday banners. The focus was fast-turn production, consistent brand application across eight franchises, and creating assets that work for e-commerce, in-venue retail and social campaigns.
              </p>
            </div>
          </section>

          {/* Promotional Posters */}
          <section className="mb-24">
            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
              <ImageIcon className="text-blue-600" /> Promotional Posters
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Promotional Posters", desc: "Series of posters for franchise launches & match promos", img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800" },
                { title: "Brand Themes", desc: "Three visual themes: heritage, neon, celebratory", img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800" },
                { title: "Social-ready Posters", desc: "Optimised versions for Instagram, stories and feed ads", img: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?auto=format&fit=crop&q=80&w=800" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-slate-100">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Packaging & Dielines */}
          <section className="mb-24">
            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
              <Layers className="text-blue-600" /> Packaging & Dielines
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Retail Box — Yellow", desc: "Retail-ready dieline with print specs", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800" },
                { title: "Retail Box — Gradient", desc: "Variant for special edition drops", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800" },
                { title: "Team Box — Red", desc: "Team-specific packaging with crest lockups", img: "https://images.unsplash.com/photo-1512418490979-92798ced1381?auto=format&fit=crop&q=80&w=800" }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="aspect-square rounded-[2.5rem] overflow-hidden mb-6 bg-slate-50 border border-slate-100 p-12 flex items-center justify-center group hover:bg-white hover:shadow-2xl transition-all">
                    <img src={item.img} alt={item.title} className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ID Cards & Hangtags */}
          <section className="grid md:grid-cols-2 gap-8 mb-24">
            <Card className="border-none shadow-sm bg-slate-50 rounded-[3rem] p-10">
              <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <CreditCard className="text-blue-600" /> Membership & ID Cards
              </h4>
              <div className="aspect-video bg-white rounded-2xl shadow-inner border border-slate-100 flex items-center justify-center p-8 mb-6">
                <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-300 font-mono text-xs">
                  CR80 Standard Dimensions
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium">Standard CR80 dimensions with bleed & cut guides for high-volume printing.</p>
            </Card>

            <Card className="border-none shadow-sm bg-slate-50 rounded-[3rem] p-10">
              <h4 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <Tag className="text-blue-600" /> Hangtags & Labels
              </h4>
              <div className="aspect-video bg-white rounded-2xl shadow-inner border border-slate-100 flex items-center justify-center p-8 mb-6">
                <div className="w-32 h-48 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-300 font-mono text-xs rotate-12">
                  Hangtag Spec
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium">Double-sided hangtags for retail racks with integrated QR code tracking.</p>
            </Card>
          </section>

          {/* Social Banners */}
          <section className="mb-24">
            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
              <Share2 className="text-blue-600" /> Player Creatives & Social Banners
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group relative rounded-[2.5rem] overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200" alt="Social 1" className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-xl font-bold text-white mb-1">Player Promo — Team A</h4>
                  <p className="text-blue-400 text-xs font-black uppercase tracking-widest">Hero banners for matchday</p>
                </div>
              </div>
              <div className="group relative rounded-[2.5rem] overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=1200" alt="Social 2" className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-xl font-bold text-white mb-1">Group Shots</h4>
                  <p className="text-blue-400 text-xs font-black uppercase tracking-widest">Team line-ups for scheduling</p>
                </div>
              </div>
            </div>
          </section>

          {/* Matchday Tiles */}
          <section className="mb-24">
            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
              <Monitor className="text-blue-600" /> Matchday Tiles & Collateral
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Matchday Tile", desc: "Optimised for in-venue screens", img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800" },
                { title: "Instagram Carousel", desc: "3-frame narrative templates", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800" },
                { title: "Player Cards", desc: "Collectible player cards for drops", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800" }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100">
                  <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-white shadow-sm">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{item.desc}</p>
                </div>
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