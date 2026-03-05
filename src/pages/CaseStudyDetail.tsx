"use client";

import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import InstagramEmbed from '@/components/social/InstagramEmbed';
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
  Quote,
  IndianRupee,
  MousePointer2
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
      loading="lazy"
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
        content: `In the heart of the Himalayas, a cultural revolution was brewing, but it lacked the digital infrastructure to reach the global stage. Mystic Studio 8 wasn't just a music label; it was a vision to preserve the soul of Kashmiri music while packaging it for a modern, global audience. When we took on this project, the challenge was clear: how do you take a region with deep-rooted traditions and no established digital music ecosystem and turn it into a high-growth scale engine?`
      },
      {
        id: "challenge",
        title: "The Challenge: Breaking the Digital Silence",
        content: `The primary hurdle was the total lack of historical data. We were starting from zero: no previous audience, no pixel data, and no established fanbase. Furthermore, the cultural nuances of the region required a delicate balance. If the content felt too "corporate," it would lose its soul; if it felt too "traditional," it wouldn't scale on platforms like TikTok and YouTube. We needed a strategy that was culturally authentic yet technically aggressive.`
      },
      {
        id: "strategy",
        title: "The Strategy: The Staggered Release Framework",
        content: `We deployed a 3-month "Scale Engine" rollout strategy. Instead of a single big launch, we opted for a staggered release cycle: one original track per month to build cumulative momentum. This allowed us to use the data from the first release to optimize the targeting and creative hooks for the second and third.`
      },
      {
        id: "execution",
        title: "Technical Execution: Data-Driven Soul",
        content: `Behind the beautiful visuals was a rigorous technical framework. We implemented server-side tracking to ensure we captured every interaction, even in low-bandwidth environments. We used proprietary attribution models to see how our YouTube ads were driving Spotify streams, allowing us to optimize our spend in real-time.`
      },
      {
        id: "results",
        title: "The Impact: Legacy Over Virality",
        content: `The results exceeded all benchmarks. In just 90 days, Mystic Studio 8 became the most talked-about music label in the region. We didn't just hit 3.4M views; we built a community of 25.7K subscribers who are actively waiting for the next drop. The sentiment analysis showed a 91% positive rating, proving that our "data-meets-soul" approach was the right path.`
      }
    ],
    learnings: [
      { myth: "Drop all songs together for virality", reality: "Staggered storytelling builds depth, audience trust, and momentum." },
      { myth: "Digital is enough", reality: "Real-world emotion boosts digital traction: every offline event sparked online spikes." },
      { myth: "Views are the goal", reality: "Retention, comments, and community UGC are stronger brand signals." }
    ],
    finalResult: "In just 3 months, Mystic Studio 8 transformed from an unknown regional label into a cultural movement. By launching three original Kashmiri songs, one each month, we didn't just create content; we built emotional capital, digital momentum, and community loyalty."
  },
  'meta-lead-generation-trotr': {
    title: "Importance of storytelling and founder led marketing in social media marketing",
    category: "Meta Lead Generation",
    instagramReels: [
      "https://www.instagram.com/reel/DIlN_orTgbo/",
      "https://www.instagram.com/reel/DJWaMMcTBTa/"
    ],
    metrics: [
      { label: "Revenue", value: "₹14L", icon: <IndianRupee className="w-5 h-5" /> },
      { label: "Cost per Lead", value: "₹6700", icon: <MousePointer2 className="w-5 h-5" /> },
      { label: "ROAS", value: "28x", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Avg. Order Value", value: "1.9L", icon: <Target className="w-5 h-5" /> }
    ],
    blocks: [
      {
        id: "overview",
        title: "Case Study Overview",
        content: `When Trotr launched its travel campaign for a group trip to Turkey, the ad strategy looked great on paper: low cost per click, high interest, and a beautiful destination. But despite the numbers, the campaign failed to convert a single lead.`
      },
      {
        id: "research",
        title: "Month 1: We Failed.",
        content: `We ran Click-to-WhatsApp ads for Trotr’s Turkey trip. We saw cheap clicks, an exciting destination, and high interest. But we saw zero conversions.`
      },
      {
        id: "strategy",
        title: "Month 2: Same Budget. New Destination. New Strategy.",
        content: `We pivoted the entire approach for the Spain trip:
        
        • Founder-Led Content: We launched a ZNMD-style video featuring the founder.
        • Frictionless Funnel: We moved away from Click-to-WhatsApp and built a dedicated website lead form funnel.
        • Manual Targeting: We ignored Meta's Advantage+ and went all-in on manual, intent-based targeting.`
      },
      {
        id: "results",
        title: "Result of The Case Study",
        content: `This campaign didn’t just outperform expectations; it redefined how high-ticket travel should be marketed. By anchoring our strategy in emotion, backing it with a frictionless funnel, and using humanized storytelling, we turned a failing campaign into a revenue-generating engine.`
      }
    ],
    learnings: [
      { myth: "Click-to-WhatsApp always converts", reality: "People don’t want to text brands: they want clarity. CTWA gave us traffic; website gave us money." },
      { myth: "Use Advantage+ and let Meta auto-scale", reality: "Manual, intent-based targeting crushed automation. We knew our audience better than Meta did." },
      { myth: "High CTR = success", reality: "CTR is not revenue. It's the funnel that converts. Good targeting, right format, and low-friction form equals gold." }
    ],
    finalResult: "By anchoring our strategy in emotion, backing it with a frictionless funnel, and using humanized storytelling, we turned a failing campaign into a revenue-generating engine with a 28x ROAS."
  },
  'amazon-ads': {
    title: "Amazon Ads: Performance Scaling for Apparel Brand",
    category: "Ecommerce/Performance Marketing",
    heroImage: "/src/assets/amazon-ads-hero.png",
    proofImages: [
      "/src/assets/amazon-ads-1.jpeg",
      "/src/assets/amazon-ads-2.jpeg"
    ],
    metrics: [
      { label: "Max ROAS", value: "11.2x", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Monthly Sales", value: "₹2.7L+", icon: <IndianRupee className="w-5 h-5" /> },
      { label: "Account ROAS", value: "6.5x+", icon: <Target className="w-5 h-5" /> },
      { label: "CPC", value: "Reduced", icon: <MousePointer2 className="w-5 h-5" /> }
    ],
    projectInfo: {
      category: "E-Commerce Scaling",
      location: "India",
      software: "Amazon Ad Platform",
      dated: "March and April",
      client: "playR"
    },
    blocks: [
      {
        id: "overview",
        title: "Sponsored Products & Sponsored Display",
        content: `This project focused on scaling Amazon Ads profitably for an apparel brand operating in a highly competitive marketplace environment. The objective was to drive sustained sales growth while maintaining healthy ROAS, using a structured performance marketing approach across Sponsored Products and Sponsored Display campaigns.

        We managed and optimized multiple campaigns across categories such as team merchandise, topwear, jerseys, and new product launches, ensuring budget efficiency, keyword relevance, and continuous performance improvement.`
      },
      {
        id: "challenges",
        title: "The Challenges We Faced",
        content: `• High competition in apparel keywords
        • Low CTR on new product launches
        • Scaling spend without hurting ROAS
        • Managing multiple campaigns across different product categories
        • Improving conversion efficiency while controlling CPC`
      },
      {
        id: "strategy",
        title: "Data-First Amazon Ads Strategy",
        content: `We implemented a data-first Amazon Ads strategy focused on profitability and scale:

        • Campaign Segmentation: Structured campaigns by product category, intent level, and performance maturity.
        • Search Term Mining & Optimization: Continuous extraction of converting search terms and elimination of non-performing keywords.
        • Bid & Placement Optimization: Strategic use of Top-of-Search bid adjustments only on high-converting campaigns.
        • Performance Scaling: Budgets were increased selectively on campaigns delivering consistent ROAS.
        • Inventory and Demand Control: Low-performing new launches were paused or rebuilt to prevent wasted spend.`
      },
      {
        id: "results",
        title: "This led to us achieving",
        content: `• Achieved ROAS up to 11.2 on top-performing campaigns
        • Generated ₹2.7L+ in sales within a single month
        • Maintained overall account ROAS above 6.5
        • Reduced CPC through relevance and bid control
        • Identified clear winners and stopped budget leakage on underperforming campaigns`
      }
    ],
    learnings: [
      { myth: "Scale spend to scale sales", reality: "Scaling without bid control kills ROAS. We scaled selectively based on conversion maturity." },
      { myth: "Broad keywords drive volume", reality: "Broad keywords drive waste. Exact match and phrase mining were our primary growth levers." },
      { myth: "Amazon Ads are 'set and forget'", reality: "Daily bid adjustments and search term mining are required to maintain a 6.5x+ ROAS." }
    ],
    finalResult: "We achieved a 6.57x overall account ROAS, generating over ₹2.78L in monthly sales for the apparel brand through aggressive search term mining and strategic bid adjustments."
  }
};

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const data = caseStudiesData[slug || 'music-marketing'] || caseStudiesData['music-marketing'];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO title={data.title} description={data.finalResult?.substring(0, 160)} />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
          </Link>

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
            
            {data.heroVideo && <YouTubeEmbed videoId={data.heroVideo} title={data.title} />}
            
            {data.heroImage && (
              <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-12 border border-slate-100">
                <img src={data.heroImage} alt={data.title} className="w-full h-auto" loading="lazy" />
              </div>
            )}

            {data.instagramReels && (
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {data.instagramReels.map((url: string, i: number) => (
                  <InstagramEmbed key={i} url={url} />
                ))}
              </div>
            )}

            {data.proofImages && (
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {data.proofImages.map((src: string, i: number) => (
                  <div key={i} className="rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white p-2">
                    <img src={src} alt={`Proof ${i + 1}`} className="w-full h-auto rounded-[1.5rem]" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {data.metrics.map((metric: any, i: number) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all">
                <div className="text-blue-600 mb-3 flex justify-center">{metric.icon}</div>
                <p className="text-3xl font-black mb-1 text-slate-900">{metric.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{metric.label}</p>
              </div>
            ))}
          </div>

          {data.projectInfo && (
            <div className="mb-20 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-2xl font-black mb-8 text-slate-900">Project Info</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Category:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.category}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Location:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.location}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Software:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.software}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Dated:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.dated}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Client:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.client}</p>
                </div>
              </div>
            </div>
          )}

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

          <div className="relative py-20 mb-24 text-center">
            <Quote className="w-20 h-20 text-blue-600/10 absolute top-0 left-1/2 -translate-x-1/2" />
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 italic relative z-10 max-w-3xl mx-auto leading-tight">
              {data.category === 'Ecommerce/Performance Marketing' 
                ? '"We didn’t just want to scale spend; we wanted to scale profitability. Every bid adjustment was a step towards a 6.5x+ account ROAS."'
                : data.category === 'Music Marketing' 
                ? '"We didn\'t just want to release songs; we wanted to build a movement. Every frame, every beat, and every ad rupee was designed to evoke a sense of belonging."'
                : '"We weren’t just selling a vacation. We were selling trust: and our funnel wasn’t built to support it. In Month 2, we rebuilt everything."'}
            </h3>
          </div>

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

export default CaseStudyDetail;