"use client";

import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  Zap, 
  CheckCircle2,
  BarChart3,
  Users,
  Play,
  ArrowRight,
  XCircle,
  Quote
} from 'lucide-react';
import { motion } from "framer-motion";

const YouTubeEmbed = ({ videoId, title }: { videoId: string, title?: string }) => (
  <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl mb-8 border border-slate-100 bg-slate-900">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title || "YouTube video player"}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

const caseStudiesData: Record<string, any> = {
  'music-marketing': {
    title: "Turning Regional Roots into a Global Soundtrack: Building a Kashmiri Music Movement.",
    category: "Music Marketing",
    heroVideo: "UOu0IIMDC3g",
    metrics: [
      { label: "Views", value: "3.4M+", icon: <Play className="w-5 h-5" /> },
      { label: "Subscribers", value: "25.7K", icon: <Users className="w-5 h-5" /> },
      { label: "Retention", value: "61%", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Sentiment", value: "91%", icon: <Target className="w-5 h-5" /> }
    ],
    blocks: [
      {
        id: "overview",
        title: "The Vision: Preserving Soul in a Digital Age",
        content: `In the heart of the Himalayas, a cultural revolution was brewing, but it lacked the digital infrastructure to reach the global stage. Mystic Studio 8 wasn't just a music label; it was a vision to preserve the soul of Kashmiri music while packaging it for a modern, global audience. When we took on this project, the challenge was clear: how do you take a region with deep-rooted traditions and no established digital music ecosystem and turn it into a high-growth scale engine?

        The Kashmiri music scene had historically been fragmented, relying on local distribution and word-of-mouth. There was a massive "blue ocean" opportunity to build the first digital-first label that could leverage modern performance marketing and high-velocity creative production to dominate the regional niche and spill over into the global diaspora. We knew that to succeed, we couldn't just release songs; we had to build a movement that resonated with the identity of the people.`
      },
      {
        id: "challenge",
        title: "The Challenge: Breaking the Digital Silence",
        content: `The primary hurdle was the total lack of historical data. We were starting from zero—no previous audience, no pixel data, and no established fanbase. Furthermore, the cultural nuances of the region required a delicate balance. If the content felt too "corporate," it would lose its soul; if it felt too "traditional," it wouldn't scale on platforms like TikTok and YouTube. We needed a strategy that was culturally authentic yet technically aggressive.

        Key challenges included:
        • Zero Digital Footprint: Building a brand identity and social presence from scratch in a high-competition attention economy.
        • Infrastructure Gaps: Establishing reliable distribution channels across Spotify, Apple Music, and YouTube for a region with inconsistent internet connectivity.
        • Content Velocity: Producing high-fidelity music videos that met international standards on a regional budget.
        • Audience Trust: Convincing a traditional audience that a digital-first label could represent their culture accurately.`
      },
      {
        id: "strategy",
        title: "The Strategy: The Staggered Release Framework",
        content: `We deployed a 3-month "Scale Engine" rollout strategy. Instead of a single big launch, we opted for a staggered release cycle—one original track per month—to build cumulative momentum. This allowed us to use the data from the first release to optimize the targeting and creative hooks for the second and third.

        Phase 1: The Cultural Hook. We identified a traditional melody and reimagined it with modern production values. We launched a high-velocity creative testing campaign on Meta and YouTube, testing 15 different "scroll-stopping" hooks in the first 48 hours.
        
        Phase 2: Community-First Growth. For the second release, we shifted focus to community engagement. We launched a series of "Behind the Scenes" (BTS) content pieces that highlighted the artists' journeys. This humanized the label and built a loyal core audience.
        
        Phase 3: Global Diaspora Reach. The final phase targeted the global Kashmiri diaspora, using nostalgia as a primary emotional lever. We used advanced interest-based targeting to reach Kashmiris living in the UK, US, and Middle East.`
      },
      {
        id: "execution",
        title: "Technical Execution: Data-Driven Soul",
        content: `Behind the beautiful visuals was a rigorous technical framework. We implemented server-side tracking to ensure we captured every interaction, even in low-bandwidth environments. We used proprietary attribution models to see how our YouTube ads were driving Spotify streams, allowing us to optimize our spend in real-time.

        Our creative production team produced over 100 ad variants for each track, leveraging creator-led content and UGC-style snippets to drive down CPAs. By the third month, our cost-per-subscriber had dropped by 45%, and our organic reach was compounding at a rate of 20% week-over-week. We also utilized AI-driven sentiment analysis to monitor comment sections and adjust our community management strategy daily.`
      },
      {
        id: "results",
        title: "The Impact: Legacy Over Virality",
        content: `The results exceeded all benchmarks. In just 90 days, Mystic Studio 8 became the most talked-about music label in the region. We didn't just hit 3.4M views; we built a community of 25.7K subscribers who are actively waiting for the next drop. The sentiment analysis showed a 91% positive rating, proving that our "data-meets-soul" approach was the right path.

        Beyond the numbers, the label secured earned media coverage in Rising Kashmir, CultureWire, and The Sufi Journal—with zero rupees spent on traditional PR. This case study proves that when regional storytelling meets strategic rollout, the result isn't just virality—it's legacy. Mystic Studio 8 is no longer just a music label. It's a symbol of modern Kashmiri sound.`
      }
    ],
    learnings: [
      { myth: "Drop all songs together for virality", reality: "Staggered storytelling builds depth, audience trust, and momentum." },
      { myth: "Digital is enough", reality: "Real-world emotion boosts digital traction — every offline event sparked online spikes." },
      { myth: "Views are the goal", reality: "Retention, comments, and community UGC are stronger brand signals." }
    ],
    finalResult: "In just 3 months, Mystic Studio 8 transformed from an unknown regional label into a cultural movement. By launching three original Kashmiri songs — one each month — we didn't just create content, we built emotional capital, digital momentum, and community loyalty. The campaign generated over 3.4 million YouTube views and brought in 25.7K organic subscribers, with an average viewer retention of 61%."
  }
};

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const data = caseStudiesData[slug || 'music-marketing'] || caseStudiesData['music-marketing'];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO title={data.title} description={data.finalResult.substring(0, 160)} />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          {/* Back Button */}
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
          </Link>

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              {data.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 leading-tight">
              {data.title}
            </h1>
            
            <YouTubeEmbed videoId={data.heroVideo} title={data.title} />
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {data.metrics.map((metric: any, i: number) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all">
                <div className="text-blue-600 mb-3 flex justify-center">{metric.icon}</div>
                <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Content Blocks */}
          <div className="space-y-12 mb-24">
            {data.blocks.map((block: any, i: number) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-12 bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all group"
              >
                <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 group-hover:text-blue-600 transition-colors">
                  {block.title}
                </h2>
                <div className="text-lg text-slate-600 leading-relaxed space-y-6 whitespace-pre-line">
                  {block.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pull Quote */}
          <div className="relative py-20 mb-24 text-center">
            <Quote className="w-20 h-20 text-blue-600/10 absolute top-0 left-1/2 -translate-x-1/2" />
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 italic relative z-10 max-w-3xl mx-auto leading-tight">
              "We didn't just want to release songs; we wanted to build a movement. Every frame, every beat, and every ad rupee was designed to evoke a sense of belonging."
            </h3>
          </div>

          {/* Learnings Section */}
          <section className="py-16 bg-slate-50 rounded-[3rem] px-8 md:px-16 mb-24 border border-slate-100">
            <h2 className="text-3xl font-black mb-12 text-center text-slate-900">What We Learned</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.learnings.map((item: any, i: number) => (
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

          {/* Bottom CTA */}
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
              {/* Decorative elements */}
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

export default CaseStudyDetail;