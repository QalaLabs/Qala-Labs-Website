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
  ChefHat,
  Clapperboard,
  Users,
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const ShaktiBhogPortfolio = () => {
  const metrics = [
    { label: "Content Format", value: "Recipe Reels", icon: <ChefHat className="w-6 h-6" /> },
    { label: "Style", value: "Creator-Led UGC", icon: <Clapperboard className="w-6 h-6" /> },
    { label: "Channel", value: "Instagram-First", icon: <Sparkles className="w-6 h-6" /> },
    { label: "Delivery", value: "Talent + Home Shoot", icon: <Users className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-100">
      <SEO
        title="Shakti Bhog: Recipe-Led UGC Content | Qala Labs"
        description="How Qala Labs produced creator-led recipe UGC for Shakti Bhog — everyday-kitchen storytelling built around the brand's maida, shot and edited for native Instagram consumption."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: 'Shakti Bhog', url: '/portfolio/shakti-bhog-ugc-content' }
        ]}
      />
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-amber-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Content Creation & UGC
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Shakti Bhog: <span className="text-amber-600">Sunday Kitchen</span>, Made Shareable.
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl">
              For Shakti Bhog's maida, we produced creator-led recipe content — everyday home-kitchen storytelling that turns a weekend snack into a native, watchable Instagram moment instead of a product ad.
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
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-amber-100 transition-all group"
              >
                <div className="text-amber-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <section className="grid lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Brief</h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-6">
                  <p>
                    Shakti Bhog needed its maida to show up as part of a real Sunday ritual, not a pack shot on a kitchen counter. The brief was a recipe-anchored reel — Aaloo Patties made with Shakti Bhog maida — hooked around a relatable question: "aapke ghar mai Sunday ko khaas moment kya hota hai?" (what makes Sunday special at your home?).
                  </p>
                  <p>
                    We paired that home-kitchen recipe segment with a creator-led narrative open — a talent-fronted walk-and-talk sequence that sets up the story before it cuts into the cooking process — so the ad opens like a personal video, not a commercial.
                  </p>
                </div>
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-2xl font-black mb-8 text-amber-400">Production Scope</h3>
                <ul className="space-y-4">
                  {[
                    "Creator-fronted narrative hook to open the video before the product reveal",
                    "Recipe-led home-kitchen shoot: Aaloo Patties using Shakti Bhog maida",
                    "Hindi-first, relatable copy hook built around a shared Sunday-family moment",
                    "Native, UGC-style edit built for Instagram Reels consumption",
                    "Full production and final-cut delivery via Qala Labs' content pipeline"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
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
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">Content Creation / UGC</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Platform</p>
                    <p className="font-bold text-slate-700">Instagram (Reel)</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Format</p>
                    <p className="font-bold text-slate-700">Creator Hook + Recipe Demo</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">Shakti Bhog (Maida)</p>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-amber-600 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Need recipe-led UGC for your brand?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-white text-amber-600 hover:bg-slate-100 rounded-xl font-black border-none">
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

export default ShaktiBhogPortfolio;
