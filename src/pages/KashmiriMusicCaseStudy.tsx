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
  Zap,
  XCircle,
  Eye,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import KashmirFeaturedImage from '@/assets/kashmir-street-musician.jpg?w=1400&format=webp&quality=82';

const YouTubeEmbed = ({ videoId, title }: { videoId: string, title?: string }) => (
  <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 border border-slate-100 bg-slate-900">
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
    { label: "YouTube Views", value: "3.4M+", icon: <PlayCircle className="w-6 h-6" /> },
    { label: "New Subscribers", value: "25.7K", icon: <Users className="w-6 h-6" /> },
    { label: "Avg. Retention", value: "61%", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "Paid Ad Spend", value: "₹0", icon: <Globe className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO
        title="Kashmiri Music Organic Growth Case Study: 3.4M Views"
        description="How Qala Labs launched Mystic Studio 8 as a digital-first Kashmiri music label, earning 3.4M+ YouTube views, 25.7K subscribers, and zero paid ad spend."
        image={KashmirFeaturedImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Kashmiri Music Organic Growth Case Study: 3.4M Views",
          description: "How Qala Labs helped Mystic Studio 8 build a Kashmiri music movement through creator-led storytelling, YouTube launch strategy, and zero paid media.",
          image: KashmirFeaturedImage,
          author: { "@type": "Organization", name: "Qala Labs" },
          publisher: { "@type": "Organization", name: "Qala Labs" },
          mainEntityOfPage: "https://qalalabs.com/case-studies/kashmiri-movement",
          keywords: "Kashmiri music marketing case study, organic YouTube growth, music label launch, creator-led content, Qala Labs"
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Case Studies', url: '/case-studies' },
          { name: '3.4M Views — Kashmiri Music Organic Growth', url: '/case-studies/kashmiri-movement' }
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
              Case Study: Cultural Movement
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              The <span className="text-blue-600">Kashmiri Sound</span> Movement.
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Importance of storytelling and influencer marketing in social media: How Mystic Studio 8 built a regional powerhouse from scratch in 90 days.
            </p>
          </motion.div>

          <div className="mb-16 overflow-hidden rounded-[3rem] shadow-2xl border border-slate-100">
            <img
              src={KashmirFeaturedImage}
              alt="Kashmiri music organic growth case study featured image of a street musician playing a traditional instrument"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Primary Video Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <YouTubeEmbed videoId="UOu0IIMDC3g" title="Doud Dilas | Ishfaq kawa | Sakshi holkar | Sufi AF" />
          </motion.div>

          {/* Quick Metrics */}
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

          {/* Overview */}
          <section className="mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-8">Case Study Overview</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Mystic Studio 8 set out to launch Kashmir’s first digital-first, culturally rooted music label — but with no previous audience, no fanbase, and no playbook. 
                  <br /><br />
                  We took charge of everything: market research, song strategy, artist casting, music video production, offline activations, and full-scale digital rollout. Over 3 months, we launched 3 original songs — one per month — each crafted and positioned to create an emotional, community-first music movement.
                </p>
              </div>
              <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                <h3 className="text-xl font-bold mb-6 text-blue-400">The Result Breakdown</h3>
                <ul className="space-y-6">
                  <li className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span className="font-medium">3.4M+ Combined YouTube Views</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span className="font-medium">25.7K Organic Subscribers</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <span className="font-medium">61% Average Audience Retention</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What Really Happened Narrative */}
          <section className="space-y-32 mb-24">
            <div className="text-center">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Deep Dive</h2>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900">What really happened.</h3>
            </div>

            {/* Block 1 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 font-black italic">01</div>
                <h4 className="text-3xl font-black text-slate-900 mb-6">Market Before Music</h4>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Before production began, we conducted research to align with cultural, emotional, and digital patterns. Artists were hand-picked based on musical fit and emotional pull — with casting itself becoming part of the pre-launch buzz.
                </p>
                <ul className="space-y-3">
                  {["Sentiment analysis of Indian indie trends", "Identified resonance in Sufi fusion", "Conducted micro-surveys with youth & diaspora", "Mapped YouTube thumbnail & retention patterns"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <img src="https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2025/07/Create-an-image-defining-market-research.webp" className="w-full h-auto" alt="Kashmiri music case study market research for organic YouTube growth" loading="lazy" />
              </div>
            </div>

            {/* Block 2 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <img loading="lazy" src="https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2025/07/Create-in-image-of-song-launch-in-srinagar.webp" className="w-full h-auto" alt="Mystic Studio 8 Kashmiri song launch in Srinagar for creator-led music marketing" />
              </div>
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 font-black italic">02</div>
                <h4 className="text-3xl font-black text-slate-900 mb-6">Launching with Soul</h4>
                <p className="text-slate-600 leading-relaxed mb-8">
                  The launch of “Doud Dilas” (Sufi love) set the standard. We didn't just drop a link; we built an ecosystem around the release.
                </p>
                <ul className="space-y-3">
                  {["Cinematic production in natural landscapes", "Trailer, lyric stories, and BTS series", "5 pre-launch offline listening events", "Community-first watch party on YouTube"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Block 3 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 font-black italic">03</div>
                <h4 className="text-3xl font-black text-slate-900 mb-6">Nostalgia & Community</h4>
                <p className="text-slate-600 leading-relaxed mb-8">
                  For Song 2: “Wesiye,” we shifted focus to emotional recall and cultural pride. This ballad used vintage lensing and a lo-fi poetry visual language.
                </p>
                <ul className="space-y-3">
                  {["4 offline screenings + cover competitions", "Instagram lyric breakdown series", "Interactive fan polls for cover art", "Re-engaged Song 1 viewers through end screens"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <img loading="lazy" src="https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2025/07/Create-an-image-of-kashmiri-community.webp" className="w-full h-auto" alt="Kashmiri community engagement for Mystic Studio 8 music movement case study" />
              </div>
            </div>

            {/* Block 4 */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <img loading="lazy" src="https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2025/07/Firefly_Case-study-banner-for-a-Kashmiri-Musical-Movement-135464-1.webp" className="w-full h-auto" alt="Youth fusion strategy for Kashmiri music organic growth case study" />
              </div>
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 font-black italic">04</div>
                <h4 className="text-3xl font-black text-slate-900 mb-6">Youth x Fusion</h4>
                <p className="text-slate-600 leading-relaxed mb-8">
                  To close strong with “Panin Gunah,” we targeted younger audiences and Reels virality using hypermodern styling and contrast lighting.
                </p>
                <ul className="space-y-3">
                  {["10 creator partnerships for dance & duets", "TikTok-style remix distribution", "Final offline community open mic night", "Full journey YouTube compilation wrap-up"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Section */}
          <section className="mb-24 p-12 md:p-20 bg-slate-50 rounded-[4rem] border border-slate-100">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-10">What We Learned</h3>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] tracking-widest"><XCircle className="w-4 h-4" /> Myth 1</div>
                    <p className="font-bold text-slate-900">“Drop all songs together for virality”</p>
                    <p className="text-sm text-slate-500 italic flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Reality: Staggered storytelling builds depth, trust, and momentum.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] tracking-widest"><XCircle className="w-4 h-4" /> Myth 2</div>
                    <p className="font-bold text-slate-900">“Digital is enough”</p>
                    <p className="text-sm text-slate-500 italic flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Reality: Real-world emotion boosts digital traction — offline events spark online spikes.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-[10px] tracking-widest"><XCircle className="w-4 h-4" /> Myth 3</div>
                    <p className="font-bold text-slate-900">“Views are the goal”</p>
                    <p className="text-sm text-slate-500 italic flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> Reality: Retention, comments, and community UGC are stronger brand signals.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-xl">
                <img loading="lazy" src="https://lightcyan-porpoise-736517.hostingersite.com/wp-content/uploads/2025/07/create-a-1_1-image-for-learning.webp" className="w-full h-auto" alt="Organic music marketing lessons from the Kashmiri Sound movement case study" />
              </div>
            </div>
          </section>

          {/* The Catalog */}
          <section className="mb-24">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">The Viral Catalog</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <YouTubeEmbed videoId="1OSNtuisQPk" title="Wadakh Wariyah | Kashmiri Rock" />
              <YouTubeEmbed videoId="m1K5-eBFt74" title="Panin Gunnah | Cultural Soul" />
            </div>
          </section>

          {/* Final Result Block */}
          <section className="mb-24">
            <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[4rem] overflow-hidden">
              <CardContent className="p-12 md:p-20">
                <h2 className="text-3xl md:text-5xl font-black mb-10">Result of The Case Study</h2>
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                    <p>
                      In just 3 months, Mystic Studio 8 transformed from an unknown regional label into a cultural movement. By launching three original Kashmiri songs — one each month — we didn’t just create content, we built emotional capital, digital momentum, and community loyalty.
                    </p>
                    <p>
                      The campaign generated over 3.4 million YouTube views and brought in 25.7K organic subscribers, with zero rupees spent on paid ads. Audience sentiment was 91% positive, securing earned media in Rising Kashmir and The Sufi Journal.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                      <p className="text-4xl font-black text-blue-400 mb-2">1,100+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Offline Attendees</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                      <p className="text-4xl font-black text-blue-400 mb-2">4,300+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Comments</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                      <p className="text-4xl font-black text-blue-400 mb-2">30+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">UGC Creators</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                      <p className="text-4xl font-black text-blue-400 mb-2">140</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Global Countries</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-24 grid lg:grid-cols-2 gap-8">
            <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Organic Music Growth FAQ</h2>
              <div className="space-y-6">
                {[
                  ["How did the Kashmiri music campaign grow without ads?", "We sequenced releases, offline events, creator content, YouTube optimization, and community participation into one movement."],
                  ["Why did the songs launch one month apart?", "A staggered launch created anticipation, retention, and repeat audience behavior across three original releases."],
                  ["What made Mystic Studio 8 discoverable?", "Cultural positioning, thumbnail testing, creator collaborations, and audience retention loops helped YouTube recommend the catalog."]
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
                This page is the canonical source for Mystic Studio 8's organic growth story and can be used in artist outreach, label partnerships, media pitches, and LinkedIn posts.
              </p>
              <div className="space-y-3 text-sm font-bold text-slate-700">
                <Link to="/services" className="block text-blue-600 hover:underline">Explore Qala Labs growth services</Link>
                <Link to="/case-studies/Trotr-Meta-Lead-Generation" className="block text-blue-600 hover:underline">Read a paid media storytelling case study</Link>
                <Link to="/contact" className="block text-blue-600 hover:underline">Plan an organic launch campaign</Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="relative p-12 md:p-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[5rem] overflow-hidden text-center shadow-2xl shadow-blue-500/20">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight text-white">
                  Let’s make something <br /> <i>cool</i> together.
                </h2>
                <Link to="/contact">
                  <Button className="bg-white text-blue-600 hover:bg-slate-100 px-12 py-10 rounded-3xl text-2xl font-black group transition-all shadow-xl">
                    Book Your Scale Audit <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <div className="mt-8">
                  <Link to="/services" className="text-blue-200 hover:text-white font-bold underline underline-offset-4 transition-colors">
                    Explore our performance marketing services →
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

export default KashmiriMusicCaseStudy;
