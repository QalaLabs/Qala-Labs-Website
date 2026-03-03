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
  XCircle
} from 'lucide-react';
import { motion } from "framer-motion";

const YouTubeEmbed = ({ videoId, title }: { videoId: string, title?: string }) => (
  <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 border border-white/10">
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
    sections: [
      {
        title: "Market Before Music",
        content: `Before production began, we conducted extensive research to align with cultural, emotional, and digital patterns. The Kashmiri music scene was fragmented, with high-quality production often lacking a strategic distribution engine. We identified three emotional zones with the highest resonance: love/soul, nostalgia, and spiritual fusion. 
        
        We mapped trends in song retention, YouTube thumbnails, and Sufi-inspired storytelling. From this research, we designed a three-track rollout: 'Doud Dilas' (a Sufi love song), 'Wesiye' (a nostalgia-laced ballad), and 'Panin Gunah' (a lover's misery). Artists were hand-picked based on musical fit and emotional pull, with casting itself becoming part of the pre-launch buzz.`,
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
        layout: "right"
      },
      {
        title: "Launching with Soul",
        content: `We opted for a full-scale production shot in Kashmir's natural landscapes to ground the project in authenticity. The launch wasn't just a digital upload; it was a coordinated event. We created trailers, lyric stories, and behind-the-scenes interviews to build anticipation. 
        
        Five pre-launch offline listening events were hosted in cafes, colleges, and artist circles across Srinagar. Teasers and BTS reels were dropped 72 hours before the official launch, creating a digital 'queue' of fans. We went live on YouTube with a community-first watch party, where the artists interacted directly with the first thousand viewers in real-time.`,
        image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800",
        layout: "left"
      },
      {
        title: "Nostalgia & Community",
        content: `With the foundation laid, we shifted focus to emotional recall and cultural pride. We produced content with vintage lensing and a lo-fi poetry visual language to evoke a sense of 'Kashmiriness' that resonated with the global diaspora. 
        
        We activated four offline screenings and launched fan cover competitions to encourage user-generated content. A lyric breakdown series on Instagram helped fans connect with the deep Sufi poetry. We ran polls to let fans pick teaser cover art, making them stakeholders in the label's success. This re-engaged existing viewers through end-screen series linking Song 1 to Song 2.`,
        image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800",
        layout: "right"
      },
      {
        title: "Youth x Fusion",
        content: `To close strong, we positioned the final track for younger audiences and Reel virality. Fusion visuals were shot with contrast lighting and hypermodern styling, blending traditional instruments with contemporary aesthetics. 
        
        We focused heavily on Shorts, Reels, and TikTok-style remixes to drive discovery. Partnering with 10 prominent Instagram creators for pre-launch dance and duet content ensured the track hit the ground running. We hosted a final community open mic night and wrapped the entire campaign with a YouTube compilation celebrating the 90-day journey.`,
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
        layout: "left"
      }
    ],
    learnings: [
      { myth: "Drop all songs together for virality", reality: "Staggered storytelling builds depth, audience trust, and momentum." },
      { myth: "Digital is enough", reality: "Real-world emotion boosts digital traction — every offline event sparked online spikes." },
      { myth: "Views are the goal", reality: "Retention, comments, and community UGC are stronger brand signals." }
    ],
    secondaryVideos: ["m1K5-eBFt74", "UOu0IIMDC3g"],
    finalResult: "In just 3 months, Mystic Studio 8 transformed from an unknown regional label into a cultural movement. By launching three original Kashmiri songs — one each month — we didn't just create content, we built emotional capital, digital momentum, and community loyalty. The campaign generated over 3.4 million YouTube views and brought in 25.7K organic subscribers, with an average viewer retention of 61%. Across the campaign, we produced 14 Instagram Reels, 6 YouTube Shorts, 3 cinematic trailers, and 3 behind-the-scenes videos. Over 30 UGC creators organically participated using Mystic's tracks, further amplifying reach. We hosted 12 offline events across Srinagar, bringing together more than 1,100 people in community screenings, listening circles, and college showcases. Audience sentiment was overwhelmingly positive, with over 4,300 comments logged and 91% of responses classified as emotionally resonant or highly favorable. The campaign secured earned media coverage in Rising Kashmir, CultureWire, and The Sufi Journal — with zero rupees spent on paid ads. This case study proves that when regional storytelling meets strategic rollout, the result isn't just virality — it's legacy. Mystic Studio 8 is no longer just a music label. It's a symbol of modern Kashmiri sound."
  }
};

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const data = caseStudiesData[slug || 'music-marketing'] || caseStudiesData['music-marketing'];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <SEO title={data.title} description={data.finalResult.substring(0, 160)} />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <p className="text-blue-500 font-black uppercase tracking-[0.3em] text-sm mb-6">Data Management</p>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-12 leading-tight max-w-4xl mx-auto">
              {data.title}
            </h1>
            
            <YouTubeEmbed videoId={data.heroVideo} title={data.title} />
          </motion.div>

          {/* Overview Section */}
          <section className="py-20 border-t border-white/5">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-black mb-8">Case Study Overview</h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                Mystic Studio 8 set out to launch Kashmir's first digital-first, culturally rooted music label — but with no previous audience, no fanbase, and no playbook. We took charge of everything: market research, song strategy, artist casting, music video production, offline activations, and full-scale digital rollout. Over 3 months, we launched 3 original songs — one per month — each crafted and positioned to create an emotional, community-first music movement. The result: 3.4M+ views, 25.7K subscribers, and a brand people felt deeply connected to.
              </p>
            </div>
          </section>

          {/* What Really Happened Section */}
          <section className="py-24 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500/20 via-transparent to-transparent hidden lg:block" />
            
            <div className="text-center mb-24">
              <h2 className="text-5xl font-black mb-4">What really happened</h2>
            </div>

            <div className="space-y-32">
              {data.sections.map((section: any, i: number) => (
                <div key={i} className={`flex flex-col lg:flex-row items-center gap-16 ${section.layout === 'left' ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1 space-y-6">
                    <h3 className="text-3xl font-black text-white">{section.title}</h3>
                    <div className="text-lg text-slate-400 leading-relaxed space-y-4">
                      {section.content.split('\n\n').map((para: string, pi: number) => (
                        <p key={pi}>{para}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden border-8 border-white/5 shadow-2xl">
                      <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What We Learned Section */}
          <section className="py-24 bg-white/5 rounded-[4rem] px-8 md:px-16 my-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black mb-12">What We Learned</h2>
                <div className="space-y-8">
                  {data.learnings.map((item: any, i: number) => (
                    <div key={i} className="space-y-3">
                      <div className="flex items-center gap-3 text-red-500">
                        <XCircle className="w-5 h-5" />
                        <span className="font-bold uppercase tracking-widest text-sm">Myth {i + 1}: "{item.myth}"</span>
                      </div>
                      <div className="flex items-start gap-3 text-green-500 pl-8">
                        <CheckCircle2 className="w-5 h-5 mt-1 shrink-0" />
                        <p className="text-lg font-medium text-slate-300">
                          <span className="text-green-500 font-bold">Reality:</span> {item.reality}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden border-8 border-white/5 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800" alt="Learning" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 text-center group hover:bg-blue-600/10 transition-colors">
                <div className="text-blue-500 mb-4 flex justify-center">
                  <Play className="w-12 h-12" />
                </div>
                <p className="text-5xl font-black mb-2">3M+</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest">Views</p>
              </div>
              <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 text-center group hover:bg-blue-600/10 transition-colors">
                <div className="text-blue-500 mb-4 flex justify-center">
                  <Users className="w-12 h-12" />
                </div>
                <p className="text-5xl font-black mb-2">26K</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest">Subscribed</p>
              </div>
              <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 text-center group hover:bg-blue-600/10 transition-colors">
                <div className="text-blue-500 mb-4 flex justify-center">
                  <TrendingUp className="w-12 h-12" />
                </div>
                <p className="text-5xl font-black mb-2">61%</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest">Retention</p>
              </div>
            </div>
          </section>

          {/* Secondary Videos */}
          <section className="py-24">
            <div className="grid md:grid-cols-2 gap-8">
              {data.secondaryVideos.map((id: string, i: number) => (
                <YouTubeEmbed key={i} videoId={id} />
              ))}
            </div>
          </section>

          {/* Final Result Section */}
          <section className="py-24 border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-black mb-12">Result of The Case Study</h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                {data.finalResult}
              </p>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-32">
            <div className="relative p-16 md:p-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] overflow-hidden text-center">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-12 leading-tight">
                  Let's discuss make <br /> something <span className="italic">cool</span> together
                </h2>
                <Link to="/contact">
                  <Button className="bg-white text-blue-600 hover:bg-slate-100 px-12 py-8 rounded-2xl text-xl font-black group">
                    Apply For Meeting <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rotate-45" />
              <div className="absolute bottom-10 right-10 w-6 h-6 bg-white/20 rotate-12" />
              <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/40 rounded-full" />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;