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
  Trophy,
  TrendingUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import InstagramEmbed from '@/components/social/InstagramEmbed';

const CSKInfluencerPortfolio = () => {
  const reels = [
    "https://www.instagram.com/reel/DJwG9tOIBFY/",
    "https://www.instagram.com/reel/DIYq7R_sOk1/",
    "https://www.instagram.com/reel/DIdRQJus9BL/",
    "https://www.instagram.com/reel/DHfiGEXp5se/",
    "https://www.instagram.com/reel/DHsf-47SCIC/",
    "https://www.instagram.com/reel/DJRZ4zpqEjJ/"
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-yellow-100">
      <SEO 
        title="CSK Influencer Campaign: Real Fans, Real Roar | Qala Labs" 
        description="How we turned the CSK jersey drop into a viral Instagram movement using real fan passion."
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-yellow-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <Badge className="bg-yellow-500 text-slate-900 mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Behind the CSK jersey drop
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Real Fans. Real Reels. <span className="text-yellow-500 text-stroke-black">Real Roar.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              We didn’t hire actors. We didn’t write scripts. We simply handed the official CSK jersey to Chennai Super Kings’ most passionate fans—and hit “record.”
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {reels.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <InstagramEmbed url={url} />
              </motion.div>
            ))}
          </div>

          <section className="grid lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg max-w-none text-slate-600">
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Fandom Engine</h2>
                <p>
                  From fan unboxings to mirror try-ons, Dhoni signature reveals to poll-driven showdowns, this series exploded across Reels. Each creator brought their own version of what it means to bleed yellow.
                </p>
                
                <div className="p-10 bg-yellow-50 rounded-[3rem] border border-yellow-100 my-12">
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Trophy className="text-yellow-600" /> The Result
                  </h3>
                  <p className="text-xl font-bold text-slate-800 leading-relaxed">
                    Pure emotion, viral momentum, and a significant lift in site conversions for playR. No filters. Just fandom.
                  </p>
                </div>

                <p>
                  By leveraging the raw energy of the #WhistlePodu army, we created a content loop that felt authentic because it was. The campaign proved that when you align a brand with genuine cultural passion, the community does the heavy lifting for you.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-50 p-8">
                <h3 className="text-xl font-black mb-6 text-slate-900">Project Info</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-700">User Generated Content</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-1">Location</p>
                    <p className="font-bold text-slate-700">India</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-1">Dated</p>
                    <p className="font-bold text-slate-700">April 2025</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-bold text-slate-700">playR</p>
                  </div>
                </div>
              </Card>

              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white text-center">
                <h4 className="text-xl font-black mb-4">Want to go viral?</h4>
                <Link to="/contact">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-xl font-black border-none">
                    Start Your Campaign
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

export default CSKInfluencerPortfolio;