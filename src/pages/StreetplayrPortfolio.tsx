"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Palette,
  ShoppingBag,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import RevenueEngine3D from '@/components/3d/RevenueEngine3D';
import heroShot from '@/assets/streetplayr/hero.jpg?w=1400&format=webp&quality=82';
import mobileShot from '@/assets/streetplayr/mobile.jpg?w=1200&format=webp&quality=82';
import productShot from '@/assets/streetplayr/product1.jpg?w=1200&format=webp&quality=82';

const scope = [
  { title: "Mark & Wordmark", icon: <Sparkles className="w-5 h-5" />, desc: "A handwritten \"playR\" signature mark paired with a blocky \"StreetplayR\" wordmark — athlete-signature energy against brutalist type." },
  { title: "Color System", icon: <Palette className="w-5 h-5" />, desc: "Deep violet over near-black, lit with grain and radial glow — nocturnal and premium, distinct from the primary-color noise of category-standard streetwear DTC." },
  { title: "Drop Mechanics", icon: <ShoppingBag className="w-5 h-5" />, desc: "\"DROP 001\" numbering, named collections (\"WARRIOR STREET DROP\", \"CARPENTER CLASSICS\"), and stock states built to give every release a collectible identity." },
  { title: "Performance Storefront", icon: <Smartphone className="w-5 h-5" />, desc: "Server-rendered commerce with optimized image delivery, tuned to keep drop-day traffic fast on mobile networks across India." },
];

const StreetplayrPortfolio = () => {
  return (
    <div className="min-h-screen bg-[#06070D] text-white selection:bg-indigo-500/30">
      <SEO
        title="StreetplayR — Brand, UX & Storefront Case Study | Qala Labs"
        description="How Qala Labs designed and built the playR Street drop-culture storefront: brand identity, UX, and a Next.js commerce build for StreetplayR."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: 'StreetplayR', url: '/portfolio/streetplayr' }
        ]}
      />
      <Navbar />

      <div className="pt-32 pb-24 relative overflow-hidden">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full bg-indigo-600/25 blur-[140px]" />
        <div className="pointer-events-none absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="max-w-6xl mx-auto px-4 relative">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-300 font-bold mb-12 transition-colors group text-sm">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px] border-0">
              Brand &middot; UX &middot; Storefront
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.95] tracking-tight">
              Street<span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">playR</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed">
              A drop-culture D2C storefront we designed and built end-to-end for playR Street — from brand system to Next.js commerce build, lookbook, and checkout.
            </p>
            <a href="https://streetplayr.com" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white rounded-full font-black px-8 py-6 text-base shadow-[0_8px_30px_rgba(79,70,229,0.35)]">
                View Website <ArrowUpRight className="w-5 h-5 ml-1" />
              </Button>
            </a>
          </motion.div>

          {/* Hero 3D + snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-5 gap-4 mb-6"
          >
            <div className="md:col-span-3 rounded-[2rem] overflow-hidden border border-indigo-500/20 shadow-2xl">
              <img src={heroShot} alt="StreetplayR homepage hero, Drop 001" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="md:col-span-2 rounded-[2rem] overflow-hidden border border-cyan-400/20 bg-gradient-to-b from-indigo-950/40 to-[#06070D] shadow-2xl">
              <RevenueEngine3D height="100%" className="min-h-[280px] w-full border-0" />
            </div>
          </motion.div>

          <div className="flex items-center justify-between mb-24 text-xs">
            <span className="font-mono text-slate-500 tracking-widest uppercase">Fig. 01 — Live storefront snapshot &middot; brand engine visual</span>
            <span className="font-mono text-slate-500">streetplayr.com</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {[
              { label: "Category", value: "Apparel" },
              { label: "Scope", value: "Brand + UX + Build" },
              { label: "Stack", value: "Next.js Commerce" },
              { label: "Market", value: "India" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 bg-white/[0.03] rounded-2xl border border-white/10 text-center hover:border-indigo-400/30 transition-colors"
              >
                <p className="text-lg font-black mb-1 text-white">{s.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Overview */}
          <section className="mb-24 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-black mb-2">A storefront built for drop culture</h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                playR Street came to Qala Labs needing a storefront that felt like a genuine drop event, not a template theme. We designed the full identity system — the signature "playR" script mark, a violet-noir visual language, and drop-numbered collection storytelling — then built it out as a fast, mobile-first commerce site.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                The result is a tight, legible catalog — waffle-textured tees, graphic prints, carpenter-fit fleece, and tanks — presented through editorial, on-location photography rather than flat product shots, positioning the label in India's premium streetwear-DTC bracket.
              </p>
            </div>
            <div className="rounded-[2rem] overflow-hidden border border-white/10">
              <img src={productShot} alt="StreetplayR product detail" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </section>

          {/* What we built */}
          <section className="mb-24">
            <h2 className="text-3xl font-black mb-10">Identity, storefront &amp; drop mechanics</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {scope.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-400/30 transition-colors"
                >
                  <div className="text-cyan-300 mb-3">{item.icon}</div>
                  <h3 className="font-black text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Mobile snapshot */}
          <section className="mb-24">
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img src={mobileShot} alt="StreetplayR editorial lookbook shot" loading="lazy" className="w-full h-auto object-cover" />
            </div>
            <p className="text-xs font-mono text-slate-500 mt-4 tracking-widest uppercase">Fig. 02 — Editorial lookbook photography, on-location styling</p>
          </section>

          {/* CTA */}
          <section className="p-12 rounded-[2.5rem] bg-gradient-to-br from-indigo-950/60 to-[#06070D] border border-indigo-500/20 text-center">
            <h3 className="text-3xl font-black mb-4">See the finished storefront live</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">Explore the full playR Street catalog, drop pages, and checkout experience we built.</p>
            <a href="https://streetplayr.com" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white rounded-full font-black px-8 py-6 text-base shadow-[0_8px_30px_rgba(79,70,229,0.35)]">
                View Website <ArrowUpRight className="w-5 h-5 ml-1" />
              </Button>
            </a>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StreetplayrPortfolio;
