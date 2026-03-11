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
  CheckCircle2, 
  ArrowRight,
  Music,
  Globe,
  Share2,
  Heart,
  BarChart3,
  Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const YouTubeEmbed = ({ videoId, title }: { videoId: string, title?: string }) => (
  <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl mb-8 border border-slate-100 bg-slate-900">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title || "YouTube video player"}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
);

const KashmiriMusicCaseStudy = () => {
  const metrics = [
    { label: "Total Streams", value: "45M+", icon: <PlayCircle className="w-6 h-6" /> },
    { label: "New Followers", value: "1.2M", icon: <Users className="w-6 h-6" /> },
    { label: "Viral Creations", value: "850k", icon: <Share2 className="w-6 h-6" /> },
    { label: "Global Reach", value: "140 Countries", icon: <Globe className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO 
        title="The Kashmiri Music Movement | Qala Labs Case Study" 
        description="How we scaled a cultural music movement to 45M+ streams using high-velocity creative and algorithmic optimization."
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Case Study: Cultural Movement
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-12 leading-tight tracking-tight">
              Scaling the <br /> <span className="text-blue-600">Kashmiri Sound.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              How we took a hyper-local music scene and turned it into a global streaming phenomenon through proprietary distribution and creator frameworks.
            </p>
          </motion.div>

          {/* Main Featured Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <YouTubeEmbed videoId="UOu0IIMDC3g" title="Doud Dilas | Ishfaq kawa | Sakshi holkar | Sufi AF" />
          </motion.div>

          {/* Metrics Grid */}
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

          {/* Secondary Videos Section */}
          <section className="mb-24">
            <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">The Cultural Catalog</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <YouTubeEmbed videoId="1OSNtuisQPk" title="Wadakh Wariyah | Kashmiri Rock" />
                <p className="text-sm font-bold text-slate-900 mt-2">Wadakh Wariyah — Breaking boundaries in Kashmiri Rock.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <YouTubeEmbed videoId="m1K5-eBFt74" title="Panin Gunnah | Cultural Soul" />
                <p className="text-sm font-bold text-slate-900 mt-2">Panin Gunnah — Fusion of traditional soul and modern production.</p>
              </motion.div>
            </div>
          </section>

          {/* Content Sections */}
          <div className="space-y-16 mb-24">
            <section className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <Zap className="text-blue-600 w-8 h-8" /> The Challenge
                </h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-4">
                  <p>Kashmiri artists were producing world-class music but lacked the technical infrastructure to bypass traditional gatekeepers and reach a global audience.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Limited access to Spotify editorial teams
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Inefficient use of TikTok/Instagram viral hooks
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Fragmented brand identities across multiple artists
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-slate-900 rounded-[3rem] p-8 aspect-square flex items-center justify-center relative overflow-hidden text-center">
                <Music className="w-32 h-32 text-blue-600 absolute opacity-20" />
                <div className="relative z-10">
                  <p className="text-blue-400 font-black text-6xl mb-2">0</p>
                  <p className="text-white font-bold uppercase tracking-widest text-xs">Initial Viral Infrastructure</p>
                </div>
              </div>
            </section>

            <section className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100">
              <h2 className="text-3xl font-black mb-10 text-center">The Qala Strategy</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4 text-center md:text-left">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto md:mx-0">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xl">Data-Led Drops</h4>
                  <p className="text-slate-500 text-sm">We used Spotify for Artists data to identify geographic clusters and timed releases for maximum algorithmic momentum.</p>
                </div>
                <div className="space-y-4 text-center md:text-left">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto md:mx-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xl">Creator Seeding</h4>
                  <p className="text-slate-500 text-sm">Partnered with 200+ micro-creators to build "audio-identity" on TikTok, leading to 850k+ user-generated videos.</p>
                </div>
                <div className="space-y-4 text-center md:text-left">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto md:mx-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xl">Viral Loop Tuning</h4>
                  <p className="text-slate-500 text-sm">Engineered high-retention 15-second hooks specifically designed for social sharing and repeat listening.</p>
                </div>
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <section className="py-20">
            <div className="relative p-12 md:p-20 bg-gradient-to-br from-slate-900 to-blue-900 rounded-[4rem] overflow-hidden text-center shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight text-white">
                  Ready to spark your <br /> own movement?
                </h2>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-8 rounded-2xl text-xl font-black group transition-all">
                  Book Your Scale Audit <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -ml-48 -mb-48" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KashmiriMusicCaseStudy;