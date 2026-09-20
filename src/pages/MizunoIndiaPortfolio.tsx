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
  Camera,
  Megaphone,
  Calendar,
  Users
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const MizunoIndiaPortfolio = () => {
  const metrics = [
    { label: "Shoot Days", value: "2-Day", icon: <Camera className="w-6 h-6" /> },
    { label: "Content Themes", value: "5", icon: <Megaphone className="w-6 h-6" /> },
    { label: "Campaign Runway", value: "10-Week", icon: <Calendar className="w-6 h-6" /> },
    { label: "Launch Tie-In", value: "World Badminton Champs", icon: <Users className="w-6 h-6" /> }
  ];

  const themes = [
    { title: "Made in Silence", desc: "Pre-dawn indoor court footwork drills — the Japanese discipline arc, player-led." },
    { title: "Delhi Before the Arena", desc: "Golden-hour city-to-court cinematic sequences shot at The Park Hotel, CP." },
    { title: "The 1%", desc: "Macro product and technique breakdowns — tech-meets-technique positioning." },
    { title: "The Coach Knows", desc: "Direct-to-camera coach testimonials built on specificity, not generic endorsement." },
    { title: "First Blood", desc: "High-energy launch-week content timed to the World Badminton Championship, Delhi." }
  ];

  const rawFootage = [
    {
      id: "1VgImUdczLBoM70UHmaRgqfVRQDCE5r3-",
      day: "Day 1 — The Park Hotel",
      label: "Golden-Hour Lifestyle (GoPro)",
      caption: "City-to-court coverage from the lifestyle shoot block."
    },
    {
      id: "1-g3uASuE0FEMjueEgBad5t5bbCSqxRMw",
      day: "Day 1 — The Park Hotel",
      label: "On-Location B-Roll (GoPro)",
      caption: "Wide-angle location b-roll captured alongside the primary rig."
    },
    {
      id: "1jD_wvA_qVHczqhXAOcDLd5cyZhlzZ8U_",
      day: "Day 2 — Indoor Court",
      label: "Footwork Drill (Cine Camera)",
      caption: "Pre-dawn footwork drills from the 6 AM indoor court call."
    },
    {
      id: "17Z4YMaODa1RC4cp-I9eHmi66WhuDJihy",
      day: "Day 2 — Indoor Court",
      label: "Coach Testimonial Setup (Cine Camera)",
      caption: "Direct-to-camera coach segment, cinema-grade kit."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO
        title="Mizuno India: Pre-Launch Shoot & Influencer Campaign | Qala Labs"
        description="How Qala Labs planned and produced Mizuno India's pre-launch photo/video shoot and influencer collaboration campaign, timed to the World Badminton Championship in Delhi."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: 'Mizuno India Launch Campaign', url: '/portfolio/mizuno-india-launch-campaign' }
        ]}
      />
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Production & Influencer Marketing
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Mizuno India: <span className="text-blue-600">Launch-Ready</span> in Two Days.
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl">
              For Mizuno's India launch, timed to the World Badminton Championship in Delhi, we planned and ran a full two-day production — lifestyle and technical footage, coach testimonials, and a 10-week influencer runway built around Japanese precision and elite performance.
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
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all group"
              >
                <div className="text-blue-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-2xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <section className="mb-24 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Five Content Themes</h2>
              <p className="text-slate-500">Every shoot block and influencer brief mapped to one of five themes built around Mizuno's Japanese-precision positioning.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Raw Shoot Footage */}
          <section className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-4">From the Shoot</h2>
              <p className="text-slate-500">Behind-the-scenes footage straight off the cards — GoPro coverage from the lifestyle block and cinema-camera clips from the indoor court day.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {rawFootage.map((clip, i) => (
                <motion.div
                  key={clip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50"
                >
                  <div className="relative aspect-video bg-black">
                    <iframe
                      src={`https://drive.google.com/file/d/${clip.id}/preview`}
                      title={clip.label}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{clip.day}</p>
                    <p className="font-black text-slate-900 mb-1">{clip.label}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{clip.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="grid lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Production</h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-6">
                  <p>
                    Day one ran at The Park Hotel in Central Delhi — golden-hour lifestyle and city-to-court sequences with two badminton players. Day two moved to an indoor court from a 6 AM crew call — footwork drills, coach testimonials, and macro technique shots, wrapped by noon.
                  </p>
                  <p>
                    The influencer plan builds on the same five themes across a 10-week pre-launch runway: player-led training content early, city-pride cinematic content mid-cycle, and coach-authority testimonials closest to launch week — culminating in launch-week hype tied to the World Badminton Championship.
                  </p>
                </div>
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-2xl font-black mb-8 text-blue-400">Production Scope</h3>
                <ul className="space-y-4">
                  {[
                    "Two-day shoot across a luxury hotel location and a dedicated indoor court",
                    "Full crew: videographer, content executive, assistant, players, and coach",
                    "Cinema-grade kit — gimbal, anamorphic lens, LED lighting rig, drone coverage",
                    "10-week influencer collaboration plan across five distinct content themes",
                    "Content briefed for Instagram Reels, YouTube Shorts, and Stories"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
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
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">Production & Shoots / Influencer Marketing</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Location</p>
                    <p className="font-bold text-slate-700">New Delhi, India</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Tie-In Event</p>
                    <p className="font-bold text-slate-700">World Badminton Championship, Delhi</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Dated</p>
                    <p className="font-bold text-slate-700">August 2026</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">Mizuno India</p>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Need a launch-ready shoot?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-white text-blue-600 hover:bg-slate-100 rounded-xl font-black border-none">
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

export default MizunoIndiaPortfolio;
