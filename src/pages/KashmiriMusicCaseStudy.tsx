"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Target, 
  CheckCircle2, 
  XCircle,
  Quote,
  ArrowRight,
  PlayCircle,
  Heart
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const YouTubeEmbed = ({ videoId, title }: { videoId: string, title?: string }) => (
  <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl mb-8 border border-slate-100 bg-slate-900">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title || "YouTube video player"}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
);

const KashmiriMusicCaseStudy = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO title="Kashmiri Music Movement Case Study" description="Building a global soundtrack from regional roots. 3.4M+ views in 90 days." />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Music Marketing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 leading-tight tracking-tight">
              Turning Regional Roots into a Global Soundtrack: Building a Kashmiri Music Movement.
            </h1>
            
            {/* Main Video Embed */}
            <YouTubeEmbed videoId="UOu0IIMDC3g" title="Main Case Study Video" />
          </motion.div>

          {/* Metric Chips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {[
              { label: 'Views', value: '3.4M+', icon: <PlayCircle className="w-4 h-4" /> },
              { label: 'Subscribers', value: '25.7K', icon: <Users className="w-4 h-4" /> },
              { label: 'Growth', value: '61%', icon: <TrendingUp className="w-4 h-4" /> },
              { label: 'Positive Sentiment', value: '91%', icon: <Heart className="w-4 h-4" /> },
            ].map((metric, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all">
                <p className="text-2xl font-black text-slate-900 mb-1">{metric.value}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                  {metric.icon} {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Narrative Sections */}
          <div className="space-y-20 mb-24">
            <section>
              <h2 className="text-2xl font-black mb-4 text-slate-900">The Vision: Preserving Soul in a Digital Age</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                In the heart of the Himalayas, a cultural revolution was brewing, but it lacked the digital infrastructure to reach the global stage. Wasta Studio wasn't just a music label; it was a mission to preserve the soul of Kashmiri music while packaging it for a modern, global audience. When we took on this project, the challenge was clear: how do you take a region with deep-seated traditions and no established digital music ecosystem and turn it into a high-growth scale engine?
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-slate-900">The Challenge: Breaking the Digital Silence</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                The primary hurdle was the total lack of historical data. We were starting from zero: no previous audience, no past data, and no established format. Furthermore, the cultural nuances of the region required a delicate balance. If the content felt too "corporate," it would lose its soul; if it felt too "traditional," it wouldn't scale on platforms like TikTok and YouTube. We needed a strategy that was culturally authentic yet technically aggressive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-slate-900">The Strategy: The Staggered Release Framework</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We deployed a 3-month 'Scale Engine' rollout strategy. Instead of a single big launch, we opted for a staggered release cycle—one original track per month to build cumulative momentum. This allowed us to use the data from the first release to optimize the targeting and creative hooks for the second and third.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-slate-900">Technical Execution: Data-Driven Soul</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Behind the beautiful visuals was a rigorous technical framework. We implemented server-side tracking to ensure we captured every interaction, even in low-bandwidth environments. We used proprietary attribution models to see how our YouTube ads were driving Spotify streams, allowing us to optimize our spend in real-time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4 text-slate-900">The Impact: Legacy Over Virality</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                The results exceeded all benchmarks. In just 90 days, Wasta Studio II became the most talked about music label in the region. We didn't just hit 3.4M views; we built a community of 25.7K subscribers who are actively waiting for the next drop. The sentiment analysis showed a 91% positive rating, proving that our "data-meets-soul" approach was the right path.
              </p>
            </section>
          </div>

          {/* Pull Quote */}
          <div className="relative py-24 mb-24 text-center border-y border-slate-100">
            <Quote className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-slate-50 opacity-50 -z-10" />
            <p className="text-3xl md:text-5xl font-black text-slate-900 italic leading-tight max-w-3xl mx-auto">
              “We didn't just want to release songs; we wanted to build a movement. Every frame, every beat, and every ad rupee was designed to evoke a sense of belonging.”
            </p>
          </div>

          {/* What We Learned Section */}
          <section className="py-20 bg-slate-50 rounded-[3rem] px-8 md:px-16 mb-24 border border-slate-100">
            <h2 className="text-3xl font-black mb-12 text-center text-slate-900">What We Learned</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  myth: "Drop all songs together for visibility.", 
                  reality: "Staggered releases builds depth, audience, and momentum."
                },
                { 
                  myth: "Digital is enough.", 
                  reality: "Pure digital lacks soul. Multi-platform synergy worked best."
                },
                { 
                  myth: "Views are the goal.", 
                  reality: "Retention, community, and sentiment are the real brand signals."
                }
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Myth</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">"{item.myth}"</p>
                  <div className="flex items-center gap-2 text-green-600 pt-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Reality</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.reality}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Creative Showcase for additional videos */}
          <section className="mb-24">
            <h2 className="text-2xl font-black mb-8 text-slate-900">Creative Production Breadth</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <YouTubeEmbed videoId="1OSNtuisQPk" title="Creative Variant 1" />
              <YouTubeEmbed videoId="m1K5-eBFt74" title="Creative Variant 2" />
            </div>
          </section>

          {/* Closing CTA */}
          <section className="py-20">
            <div className="relative p-12 md:p-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3.5rem] overflow-hidden text-center shadow-2xl shadow-blue-500/20">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight text-white">
                  Ready to build your <br /> own scale engine?
                </h2>
                <Link to="/contact">
                  <Button className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-7 rounded-2xl text-lg font-black group">
                    Book Your Free Audit <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KashmiriMusicCaseStudy;