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
  Bot,
  Clapperboard,
  Repeat,
  CalendarClock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const HiAstroPortfolio = () => {
  const metrics = [
    { label: "Videos Produced", value: "48", icon: <Clapperboard className="w-6 h-6" /> },
    { label: "Format", value: "9:16 Vertical", icon: <Bot className="w-6 h-6" /> },
    { label: "Cadence", value: "2/Working Day", icon: <Repeat className="w-6 h-6" /> },
    { label: "Timeline", value: "~24 Working Days", icon: <CalendarClock className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-100">
      <SEO
        title="Hi Astro: AI Character Video Production | Qala Labs"
        description="How Qala Labs produced 48 short-form AI character videos for Hi Astro — a single consistent AI persona across every video, delivered at a 2-videos-per-day production cadence."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: 'Hi Astro AI Character Videos', url: '/portfolio/hi-astro-ai-character-videos' }
        ]}
      />
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-purple-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              AI Content Production
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Hi Astro: One Character, <span className="text-purple-600">48 Videos</span>.
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl">
              A single, consistent AI-generated persona — same look, voice, and character across every video — carrying Hi Astro's short-form content at a production pace no live-action shoot could match.
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
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-purple-100 transition-all group"
              >
                <div className="text-purple-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-2xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <section className="grid lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Production Pipeline</h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-6">
                  <p>
                    Hi Astro supplied the copy, hook, and CTA for every video; we owned everything downstream — AI character generation with a locked look, voice, and persona, full editing, sound design, and burned-in captions, exported ready to publish in 9:16 for Reels, Shorts, and Stories.
                  </p>
                  <p>
                    Production ran at a fixed cadence of two finished videos per working day, with two rounds of revision built into every video and same-day feedback turnaround from Hi Astro keeping the pipeline moving — all 48 videos delivered in roughly 24 working days from kickoff.
                  </p>
                </div>
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-2xl font-black mb-8 text-purple-400">Production Scope</h3>
                <ul className="space-y-4">
                  {[
                    "Single, consistent AI-generated character across all 48 videos",
                    "End-to-end AI generation, editing, sound design, and captioning",
                    "9:16 vertical format, optimised for Reels, Shorts, and Stories",
                    "Two revision rounds included per video",
                    "Delivery organised by batch via shared cloud drive"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0" />
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
                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">AI Content Production</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1">Format</p>
                    <p className="font-bold text-slate-700">60s (±10s), 9:16 Vertical</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1">Dated</p>
                    <p className="font-bold text-slate-700">September 2026</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">Hi Astro</p>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-purple-600 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Need AI content at scale?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-white text-purple-600 hover:bg-slate-100 rounded-xl font-black border-none">
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

export default HiAstroPortfolio;
