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
  Megaphone,
  Layers,
  CalendarDays,
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const BilluCampaignPortfolio = () => {
  const metrics = [
    { label: "Posts / Month", value: "15", icon: <CalendarDays className="w-6 h-6" /> },
    { label: "Formats", value: "Reel + Static + Carousel", icon: <Layers className="w-6 h-6" /> },
    { label: "Channel", value: "Instagram-First", icon: <Megaphone className="w-6 h-6" /> },
    { label: "Content Style", value: "Creator-Led UGC", icon: <Sparkles className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-pink-100">
      <SEO
        title="Billu Campaign: Salon-at-Home UGC & Social Content | Qala Labs"
        description="How Qala Labs runs Billu's always-on creator and social content engine — a monthly content calendar of Instagram reels, statics, and carousels built around relatable, native storytelling."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: 'Billu Creator Campaign', url: '/portfolio/billu-salon-social-content' }
        ]}
      />
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-pink-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-pink-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Influencer Marketing & Social Content
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Billu: Salon-at-Home, <span className="text-pink-600">Made Relatable</span>.
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl">
              For Billu's at-home salon service, we run a standing creator and social content engine — reels, statics, and carousels that sell "me time" and convenience without ever feeling like an ad.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-pink-100 transition-all group"
              >
                <div className="text-pink-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <section className="grid lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Content Engine</h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-6">
                  <p>
                    Every month runs against a planned content calendar — 15 posts mixing reels, static ads, and carousels, each briefed with a hook, reference format, and audio direction before it goes into production. Content leans on everyday tension points — "no time for a salon visit," the mental load of being everyone's default caretaker — resolved by Billu's 30-minute at-home booking.
                  </p>
                  <p>
                    Seasonal moments (Raksha Bandhan, festival weekends) get dedicated creative, and creators are used for native, UGC-style delivery rather than polished brand-voice ads — the same approach that's worked in our other creator-led campaigns.
                  </p>
                </div>
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-2xl font-black mb-8 text-pink-400">Production Scope</h3>
                <ul className="space-y-4">
                  {[
                    "Monthly content calendar — 15 posts across reels, statics, and carousels",
                    "Hook, reference, and audio brief written for every post before production",
                    "Seasonal and festival-tied creative moments (e.g. Raksha Bandhan)",
                    "Creator-led UGC delivery for native, non-ad-feeling content",
                    "Full production via Billu Creator Campaign content pipeline"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-pink-400 shrink-0" />
                      <span className="font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-50 p-8">
                <h3 className="text-xl font-black mb-6 text-slate-900">Project Info</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-pink-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">Influencer Marketing / Social Content</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-pink-600 uppercase tracking-widest mb-1">Platform</p>
                    <p className="font-bold text-slate-700">Instagram (Reels, Static, Carousel)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-pink-600 uppercase tracking-widest mb-1">Cadence</p>
                    <p className="font-bold text-slate-700">Ongoing, Monthly Content Calendar</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-pink-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">Billu (Salon-at-Home)</p>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-pink-600 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Need a creator content engine?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-white text-pink-600 hover:bg-slate-100 rounded-xl font-black border-none">
                    Book Free Audit <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BilluCampaignPortfolio;
