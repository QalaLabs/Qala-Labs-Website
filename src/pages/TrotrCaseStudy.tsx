"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  IndianRupee,
  ShieldCheck,
  Zap,
  BarChart3,
  XCircle,
  Briefcase
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import InstagramEmbed from '@/components/social/InstagramEmbed';
import TrotrFeaturedImage from '@/assets/trotr-featured.jpeg?w=1400&format=webp&quality=82';

const TrotrCaseStudy = () => {
  const metrics = [
    { label: "Total Revenue", value: "₹14 Lakhs", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "CPA", value: "₹6,700", icon: <Target className="w-6 h-6" /> },
    { label: "ROAS", value: "28x", icon: <Zap className="w-6 h-6" /> },
    { label: "Avg. Order Value", value: "₹1,90,000", icon: <IndianRupee className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO
        title="Trotr Meta Lead Generation Case Study: 28x ROAS Travel Funnel"
        description="See how Qala Labs rebuilt Trotr's Meta lead generation funnel with founder-led storytelling, generating ₹14L revenue and 28x ROAS for a high-ticket Spain travel campaign."
        image={TrotrFeaturedImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Trotr Meta Lead Generation Case Study: 28x ROAS Travel Funnel",
          description: "How Qala Labs generated ₹14L revenue and 28x ROAS for Trotr through Meta Ads, founder-led storytelling, and a high-ticket travel lead funnel.",
          image: TrotrFeaturedImage,
          author: { "@type": "Organization", name: "Qala Labs" },
          publisher: { "@type": "Organization", name: "Qala Labs" },
          mainEntityOfPage: "https://qalalabs.com/case-studies/Trotr-Meta-Lead-Generation",
          keywords: "Meta lead generation case study, travel marketing case study, high-ticket funnel, 28x ROAS, Qala Labs"
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Case Studies', url: '/case-studies' },
          { name: '28x ROAS — Trotr Meta Lead Generation', url: '/case-studies/Trotr-Meta-Lead-Generation' }
        ]}
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

          <div className="mb-16 overflow-hidden rounded-[3rem] shadow-2xl border border-slate-100">
            <img
              src={TrotrFeaturedImage}
              alt="Trotr Meta lead generation case study featured image showing travelers in Spain"
              className="w-full h-auto object-cover"
            />
          </div>

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
                <img src="https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2023/01/case_study_img_4-10.png" className="w-full h-auto" alt="Trotr Meta Ads month one failure analysis for high-ticket travel lead generation" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <img src="https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2023/01/case_study_img_5-10.png" className="w-full h-auto" alt="Trotr Spain campaign strategy pivot for Meta lead generation" />
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
                <img src="https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2024/11/about-img2.jpg" className="w-full h-auto" alt="Trotr case study learning from founder-led travel storytelling funnel" />
              </div>
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

          <section className="mb-24 grid lg:grid-cols-2 gap-8">
            <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Meta Lead Generation FAQ</h2>
              <div className="space-y-6">
                {[
                  ["Can Meta Ads work for high-ticket travel leads?", "Yes, when the creative builds trust and the landing page qualifies intent before the sales call."],
                  ["Why did Trotr move away from Click-to-WhatsApp?", "The offer needed authority and clarity. A website lead funnel gave prospects more confidence than a chat-first flow."],
                  ["What made the Spain campaign convert?", "Founder-led video, emotion-driven storytelling, manual intent targeting, and a low-friction lead form worked together."]
                ].map(([question, answer]) => (
                  <div key={question}>
                    <h3 className="font-black text-slate-900">{question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Share This Case Study</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Use this page as the canonical source when sharing Trotr's Meta lead generation results on LinkedIn, sales decks, partner emails, and founder communities.
              </p>
              <div className="space-y-3 text-sm font-bold text-slate-700">
                <Link to="/services/performance" className="block text-blue-600 hover:underline">Explore our Meta Ads and performance marketing service</Link>
                <Link to="/case-studies/Meta-Lead-Generation-Ad-UK-Market" className="block text-blue-600 hover:underline">Read another B2B Meta lead generation case study</Link>
                <Link to="/contact" className="block text-blue-600 hover:underline">Book a Meta lead generation audit</Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="relative p-12 md:p-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[5rem] overflow-hidden text-center shadow-2xl shadow-blue-500/20">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight text-white">
                  Ready to turn clicks <br /> into <i>bookings?</i>
                </h2>
                <Link to="/contact">
                  <Button className="bg-white text-blue-600 hover:bg-slate-100 px-12 py-10 rounded-3xl text-2xl font-black group transition-all shadow-xl">
                    Book Your Scale Audit <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <div className="mt-8">
                  <Link to="/services/performance" className="text-blue-200 hover:text-white font-bold underline underline-offset-4 transition-colors">
                    See how our Meta Ads service works →
                  </Link>
                </div>
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
