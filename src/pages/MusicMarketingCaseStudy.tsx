"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  PlayCircle, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  Music,
  BarChart3,
  Sparkles,
  Search,
  Calendar
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const MusicMarketingCaseStudy = () => {
  const results = [
    {
      title: "Streaming Revenue",
      value: "+240%",
      desc: "Increased across all platforms",
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Follower Growth",
      value: "+186%",
      desc: "Average across all artists",
      icon: <Users className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Playlist Features",
      value: "+125%",
      desc: "Increased placements on editorial playlists",
      icon: <PlayCircle className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Engagement Rate",
      value: "+210%",
      desc: "Higher interaction across platforms",
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />
    }
  ];

  const steps = [
    {
      title: "Strategy Development",
      desc: "We created a comprehensive digital strategy focused on platform-specific optimization for Spotify, Apple Music, and YouTube Music.",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: "Visual Identity",
      desc: "Developed a cohesive visual language that reflected the label's innovative spirit and the artists' unique identities.",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      title: "Content Calendar",
      desc: "Implemented a strategic content calendar that maximized engagement across all platforms.",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: "Algorithm Optimization",
      desc: "Leveraged data insights to optimize for streaming algorithms and discoverability features.",
      icon: <Search className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Rhythm Records Case Study | Music Marketing" 
        description="How we transformed an independent record label's digital presence and increased their streaming revenue by 240%."
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Case Study: Music Marketing
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8 tracking-tight">
              Scaling Independent <br /> <span className="text-blue-600">Audio Success.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              How we transformed Rhythm Records' digital presence and increased their streaming revenue by 240% through data-driven performance.
            </p>
          </motion.div>
        </div>
        {/* Decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-200/20 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Challenge Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black">
                  RR
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900">Rhythm Records</h2>
                  <p className="text-slate-500 font-medium">Independent Record Label</p>
                </div>
              </div>
              
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Rhythm Records was struggling to establish a digital presence in a competitive market dominated by major labels. Their artists weren't reaching their full potential online, and the label's marketing efforts were inconsistent across platforms.
              </p>

              <div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-8">The Challenge</h3>
                <ul className="space-y-4">
                  {[
                    "Low social media engagement despite having talented artists",
                    "Inconsistent brand messaging across platforms",
                    "Limited understanding of streaming platform algorithms",
                    "Difficulty converting followers into paying subscribers",
                    "Lack of cohesive visual identity"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100"
            >
              <img 
                src="https://images.unsplash.com/photo-1511379938547-c1f6945de182?auto=format&fit=crop&q=80&w=1000" 
                alt="Music Marketing Dashboard" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Our Methodology</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900">The Solution</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:border-blue-600 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="font-black">{i + 1}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Impact</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900">Proven Results</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-900 p-10 rounded-[3rem] text-center relative overflow-hidden group shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400">
                      {result.icon}
                    </div>
                  </div>
                  <p className="text-5xl font-black text-white mb-2 tracking-tighter">{result.value}</p>
                  <p className="text-lg font-bold text-blue-400 mb-4">{result.title}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">{result.desc}</p>
                </div>
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/20 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-blue-600 rounded-[4rem] p-12 md:p-24 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-500/20"
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white">
                Ready to Transform Your Music Marketing?
              </h2>
              <p className="text-xl text-blue-100 mb-12 leading-relaxed">
                Let's discuss how our strategies can help your music reach new audiences and drive growth.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-8 rounded-2xl text-xl font-black shadow-xl">
                  Schedule Consultation <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-10 py-8 rounded-2xl text-xl font-black">
                  View More Work
                </Button>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -ml-48 -mb-48" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MusicMarketingCaseStudy;