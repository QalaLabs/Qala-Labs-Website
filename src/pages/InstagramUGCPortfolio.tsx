"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Users, 
  Heart, 
  MessageSquare, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Play,
  Bookmark,
  TrendingUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import InstagramEmbed from '@/components/social/InstagramEmbed';

const InstagramUGCPortfolio = () => {
  const reels = [
    "https://www.instagram.com/reel/DGKmlErvU_N/",
    "https://www.instagram.com/reel/DGibQIWtzIN/",
    "https://www.instagram.com/reel/DKAFjyep3bK/",
    "https://www.instagram.com/reel/DHiyDrzS0nu/"
  ];

  const metrics = [
    { label: "Total Views", value: "100K+", icon: <Play className="w-5 h-5" /> },
    { label: "Saves", value: "5K+", icon: <Bookmark className="w-5 h-5" /> },
    { label: "Engagement", value: "8.4%", icon: <Heart className="w-5 h-5" /> },
    { label: "Conv. Lift", value: "12%", icon: <TrendingUp className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO 
        title="Instagram UGC: Style Meets Real Life | Qala Labs" 
        description="How we used creator-led content to drive relatability and conversions for playR."
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
            className="mb-16 text-center"
          >
            <Badge className="bg-pink-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              The Try on campaign
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Style Meets <span className="text-pink-600">Real Life.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Relatability converts better than a size chart ever could. We threw the catalog out and handed the gear to creators of all shapes and vibes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {reels.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <InstagramEmbed url={url} />
              </motion.div>
            ))}
          </div>

          {/* Results Section */}
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
                <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <section className="grid lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg max-w-none text-slate-600">
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Insight</h2>
                <p>
                  Let’s be honest — the first thing people wonder when they land on a product page isn’t fabric quality or moisture-wicking. It’s:
                </p>
                <div className="grid gap-4 my-8">
                  {[
                    "“How will this look on me?”",
                    "“Can I wear this to college… and then out for coffee?”",
                    "“Will this fit my body type or just the model’s?”"
                  ].map((q, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900">
                      <Sparkles className="w-5 h-5 text-pink-500" /> {q}
                    </div>
                  ))}
                </div>
                <p>
                  We got the hint. So we threw the catalog out and handed the gear to creators of all shapes, vibes, and routines. In metro rides, dance rehearsals, chill walks, college corridors — we let them wear it their way.
                </p>
                <p>
                  Each Reel became a visual answer to the unspoken question: “Could I pull this off?” Spoiler: Yes. And the views, saves, and comments proved that relatability converts better than a size chart ever could.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-50 p-8">
                <h3 className="text-xl font-black mb-6 text-slate-900">Project Info</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-pink-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">Content Creation / UGC</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-pink-600 uppercase tracking-widest mb-1">Location</p>
                    <p className="font-bold text-slate-700">India</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-pink-600 uppercase tracking-widest mb-1">Software</p>
                    <p className="font-bold text-slate-700">Adobe Premiere Pro, After Effects</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-pink-600 uppercase tracking-widest mb-1">Dated</p>
                    <p className="font-bold text-slate-700">May 2025</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-pink-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">playR</p>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Need a creative engine?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-black border-none">
                    Get Creative Proposal
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

export default InstagramUGCPortfolio;