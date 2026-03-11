"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  Instagram,
  MousePointer2,
  XCircle,
  Zap,
  MessageSquare,
  ShieldCheck,
  IndianRupee,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import InstagramEmbed from '@/components/social/InstagramEmbed';

const TrotrCaseStudy = () => {
  const metrics = [
    { label: "CPA Reduction", value: "42%", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "Lead Quality", value: "High", icon: <CheckCircle2 className="w-6 h-6" /> },
    { label: "Trust Factor", value: "10x", icon: <ShieldCheck className="w-6 h-6" /> },
    { label: "ROAS Impact", value: "Positive", icon: <IndianRupee className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO 
        title="Trotr Meta Lead Generation Case Study | Founder-Led Marketing" 
        description="How we pivoted Trotr's travel campaign from zero conversions to a revenue-generating engine using founder-led storytelling."
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Case Study: Meta Lead Generation
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              Importance of <span className="text-blue-600">Storytelling</span> in Scale.
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              How founder-led marketing and a refined funnel turned a failing travel campaign into a high-ticket conversion machine.
            </p>
          </motion.div>

          {/* Social Proof Reels */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <InstagramEmbed url="https://www.instagram.com/reel/DIbaDW8zdzB/" />
            <InstagramEmbed url="https://www.instagram.com/reel/DIlN_orTgbo/" />
          </div>

          {/* Overview */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-8">Case Study Overview</h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    When Trotr launched its travel campaign for a group trip to Turkey, the ad strategy looked great on paper: low cost per click, high interest, and a beautiful destination. But despite the numbers, the campaign failed to convert a single lead.
                  </p>
                  <p>
                    That failure revealed a deeper insight: we weren’t just selling a vacation. We were selling <strong>trust</strong> — and our funnel wasn’t built to support it.
                  </p>
                  <p>
                    In Month 2, we rebuilt everything. With the same budget, we pivoted to a Spain trip and launched a bold new strategy: founder-led storytelling, emotion-driven ads, and a high-clarity landing page.
                  </p>
                </div>
              </div>
              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-xl font-bold mb-6 text-blue-400">The Pivot Impact</h3>
                <ul className="space-y-6">
                  <li className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span className="font-medium">Shifted from CTWA to Website Leads</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span className="font-medium">Founder-Led Narrative (ZNMD Style)</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span className="font-medium">Manual Intent-Based Targeting</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {metrics.map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all group"
              >
                <div className="text-blue-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">{metric.icon}</div>
                <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Narrative Blocks */}
          <section className="space-y-32 mb-24">
            <div className="text-center">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">The Framework</h2>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900">Month 1 vs Month 2.</h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6 font-black italic">01</div>
                <h4 className="text-3xl font-black text-slate-900 mb-6">Month 1: We Failed.</h4>
                <p className="text-slate-600 leading-relaxed mb-8">
                  We ran Click-to-WhatsApp ads for Trotr’s Turkey trip. Cheap clicks, exciting destination, high interest — but zero conversions. We realized we were selling trust, and a text-based funnel couldn't carry that weight.
                </p>
                <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                  <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-2">The Leak</p>
                  <p className="text-sm text-red-800">People don't want to text brands for high-ticket travel; they want authority and clarity.</p>
                </div>
              </div>
              <div className="order-1 lg:order-2 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <img src="https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2023/01/case_study_img_4-10.png" className="w-full h-auto" alt="Initial Failure Analysis" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <img src="https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2023/01/case_study_img_5-10.png" className="w-full h-auto" alt="Strategy Pivot" />
              </div>
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 font-black italic">02</div>
                <h4 className="text-3xl font-black text-slate-900 mb-6">The Spain Strategy Pivot</h4>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Same budget, new destination, and a complete technical overhaul. We moved away from CTWA to a high-converting website lead form.
                </p>
                <ul className="space-y-3">
                  {["Founder-led, ZNMD-style emotional video", "Minimal friction website funnel", "Manual targeting (Anti-Advantage+)", "Reels-only placement focus"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Learnings Section */}
          <section className="mb-24 p-12 md:p-20 bg-slate-50 rounded-[4rem] border border-slate-100">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-10">What We Learned</h3>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] tracking-widest"><XCircle className="w-4 h-4" /> Myth 1</div>
                    <p className="font-bold text-slate-900">“Click-to-WhatsApp always converts”</p>
                    <p className="text-sm text-slate-500 italic flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Reality: People don’t want to text brands — they want clarity. Website gave us revenue.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] tracking-widest"><XCircle className="w-4 h-4" /> Myth 2</div>
                    <p className="font-bold text-slate-900">“Use Advantage+ for auto-scaling”</p>
                    <p className="text-sm text-slate-500 italic flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Reality: Manual, intent-based targeting crushed automation for high-ticket trust.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] tracking-widest"><XCircle className="w-4 h-4" /> Myth 3</div>
                    <p className="font-bold text-slate-900">“High CTR = Success”</p>
                    <p className="text-sm text-slate-500 italic flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Reality: CTR ≠ revenue. It's the funnel + quality of form that converts belief into booking.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-xl border-8 border-white bg-white">
                <img src="https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2024/11/about-img2.jpg" className="w-full h-auto" alt="Learning Experience" />
              </div>
            </div>
          </section>

          {/* Proof Grid */}
          <section className="mb-24">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Campaign Proof</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2025/07/1.webp",
                "https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2025/07/2.webp",
                "https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2025/07/4.webp",
                "https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2025/07/3.webp"
              ].map((src, i) => (
                <div key={i} className="aspect-square rounded-[2rem] overflow-hidden shadow-lg border border-slate-100">
                  <img src={src} className="w-full h-full object-cover" alt={`Proof ${i+1}`} />
                </div>
              ))}
            </div>
          </section>

          {/* Final Result Block */}
          <section className="mb-24">
            <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[4rem] overflow-hidden">
              <CardContent className="p-12 md:p-20">
                <h2 className="text-3xl md:text-5xl font-black mb-10">Case Study Outcome</h2>
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                    <p>
                      This campaign didn’t just outperform expectations, it redefined how high-ticket travel should be marketed in the digital age. 
                    </p>
                    <p>
                      By anchoring our strategy in <strong>emotion</strong>, backing it with a <strong>frictionless funnel</strong>, and using <strong>humanized storytelling</strong>, we turned a failing campaign into a revenue-generating engine.
                    </p>
                  </div>
                  <div className="p-10 bg-blue-600 rounded-[3rem] shadow-xl">
                    <h4 className="text-2xl font-black mb-4 italic">"We design campaigns to convert belief into booking."</h4>
                    <p className="text-blue-100 font-bold opacity-80">At Qala Labs, we don’t run ads to chase impressions; we chase contribution margin.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="relative p-12 md:p-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[5rem] overflow-hidden text-center shadow-2xl shadow-blue-500/20">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight text-white">
                  Ready to turn clicks <br /> into <i>bookings?</i>
                </h2>
                <Button className="bg-white text-blue-600 hover:bg-slate-100 px-12 py-10 rounded-3xl text-2xl font-black group transition-all shadow-xl">
                  Book Your Scale Audit <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -ml-48 -mb-48" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrotrCaseStudy;