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
  ArrowRight,
  IndianRupee,
  MousePointer2,
  Quote,
  CheckCircle2,
  XCircle,
  Play,
  Users,
  Heart,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from "framer-motion";

const portfolioData: Record<string, any> = {
  'amazon-ads': {
    title: "Amazon Ads: Performance Scaling for Apparel Brand",
    category: "Ecommerce",
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
      category: "Ecommerce",
      location: "India",
      software: "Amazon Ad Platform",
      dated: "March and April",
      client: "playR",
      platform: "Amazon Vendor Central/Advertisement"
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
    prev: "user-generated-content-chennai-superkings",
    next: "try-on-campaign"
  },
  'try-on-campaign': {
    title: "The Try on campaign: Style Meets Real Life",
    category: "Social Media - User Generated Content",
    heroImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1200",
    instagramReels: [
      "https://www.instagram.com/reel/DKAFjyep3bK/",
      "https://www.instagram.com/reel/DHiyDrzS0nu/",
      "https://www.instagram.com/reel/DGKmlErvU_N/",
      "https://www.instagram.com/reel/DGibQIWtzIN/"
    ],
    metrics: [
      { label: "Total Views", value: "1.2M+", icon: <Play className="w-5 h-5" /> },
      { label: "Saves", value: "15K+", icon: <Bookmark className="w-5 h-5" /> },
      { label: "Engagement", value: "8.4%", icon: <Heart className="w-5 h-5" /> },
      { label: "Conv. Lift", value: "22%", icon: <TrendingUp className="w-5 h-5" /> }
    ],
    projectInfo: {
      category: "Social Media - User Generated Content",
      location: "India",
      software: "Adobe Premiere Pro, After Effects",
      dated: "May 2025",
      client: "playR",
      platform: "Instagram"
    },
    blocks: [
      {
        id: "overview",
        title: "Style Meets Real Life",
        content: `Let’s be honest — the first thing people wonder when they land on a product page isn’t fabric quality or moisture-wicking. It’s:
        👉 “How will this look on me?”
        👉 “Can I wear this to college… and then out for coffee?”
        👉 “Will this fit my body type or just the model’s?”
        
        We got the hint. So we threw the catalog out and handed the gear to creators of all shapes, vibes, and routines. In metro rides, dance rehearsals, chill walks, college corridors — we let them wear it their way.`
      },
      {
        id: "strategy",
        title: "Relatability Over Perfection",
        content: `Each Reel became a visual answer to the unspoken question: “Could I pull this off?” Spoiler: Yes. And the views, saves, and comments proved that relatability converts better than a size chart ever could.
        
        By leveraging real people in real environments, we bypassed the "ad blindness" that often plagues high-production studio content. The campaign focused on the lifestyle integration of the apparel, making it a part of the creator's daily routine rather than a static product feature.`
      }
    ],
    prev: "amazon-ads",
    next: "user-generated-content-chennai-superkings"
  },
  'user-generated-content-chennai-superkings': {
    title: "It's All Real - #WhistlePodu Army",
    category: "User Generated Content",
    heroImage: "/src/assets/csk-ugc-hero.png",
    instagramReels: [
      "https://www.instagram.com/reel/DJwG9tOIBFY/",
      "https://www.instagram.com/reel/DIYq7R_sOk1/",
      "https://www.instagram.com/reel/DIdRQJus9BL/",
      "https://www.instagram.com/reel/DH_UXdJI9gm/"
    ],
    metrics: [
      { label: "Viral Reach", value: "5M+", icon: <Share2 className="w-5 h-5" /> },
      { label: "Engagement", value: "12%", icon: <Heart className="w-5 h-5" /> },
      { label: "Conv. Lift", value: "35%", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Fan Reels", value: "500+", icon: <Play className="w-5 h-5" /> }
    ],
    projectInfo: {
      category: "User Generated Content",
      location: "India",
      dated: "May 2025",
      client: "playR",
      platform: "Instagram"
    },
    blocks: [
      {
        id: "overview",
        title: "Behind the CSK jersey drop that turned Instagram into a stadium",
        content: `For this campaign, we didn’t hire actors. We didn’t write scripts. We simply handed the official CSK jersey to Chennai Super Kings’ most passionate fans—and hit “record.”
        
        From fan unboxings to mirror try-ons, Dhoni signature reveals to poll-driven showdowns, this series exploded across Reels. Each creator brought their own version of what it means to bleed yellow.`
      },
      {
        id: "results",
        title: "Real Fans. Real Reels. Real Roar",
        content: `The result? Pure emotion, viral momentum, and an lift in site conversions for playR. No filters. Just fandom.
        
        By tapping into the raw energy of the #WhistlePodu army, we created a self-sustaining content engine. The authenticity of the fan-led content resonated far more deeply than any studio-produced ad could, driving both brand affinity and direct sales.`
      }
    ],
    prev: "try-on-campaign",
    next: "amazon-ads"
  }
};

const PortfolioDetail = () => {
  const { slug } = useParams();
  const data = portfolioData[slug || 'amazon-ads'] || portfolioData['amazon-ads'];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <SEO title={data.title} />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
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
            
            {data.heroImage && (
              <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-12 border border-slate-100">
                <img src={data.heroImage} alt={data.title} className="w-full h-auto" />
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
                    <img src={src} alt={`Proof ${i + 1}`} className="w-full h-auto rounded-[1.5rem]" />
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
              <h3 className="text-2xl font-black mb-8 text-slate-900">Project Info -</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Category:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.category}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Location:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.location}</p>
                </div>
                {data.projectInfo.software && (
                  <div>
                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Software:</p>
                    <p className="font-bold text-slate-700">{data.projectInfo.software}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Dated:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.dated}</p>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Client:</p>
                  <p className="font-bold text-slate-700">{data.projectInfo.client}</p>
                </div>
                {data.projectInfo.platform && (
                  <div>
                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Platform:</p>
                    <p className="font-bold text-slate-700">{data.projectInfo.platform}</p>
                  </div>
                )}
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

          {/* Project Navigation */}
          <div className="flex justify-between items-center py-12 border-t border-slate-100 mb-12">
            <Link 
              to={`/portfolio/${data.prev}`}
              className="flex items-center gap-4 group text-slate-400 hover:text-blue-600 transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-600 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </div>
              <span className="font-bold uppercase tracking-widest text-xs">Prev Project</span>
            </Link>
            <Link 
              to={`/portfolio/${data.next}`}
              className="flex items-center gap-4 group text-slate-400 hover:text-blue-600 transition-colors text-right"
            >
              <span className="font-bold uppercase tracking-widest text-xs">Next Project</span>
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-600 transition-colors">
                <ChevronRight className="w-6 h-6" />
              </div>
            </Link>
          </div>

          <section className="py-20">
            <div className="relative p-12 md:p-20 bg-slate-900 rounded-[3.5rem] overflow-hidden text-center shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight text-white">
                  talktous@lightcyan-porpoise-736517.hostingersite.com
                </h2>
                <Link to="/contact">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-7 rounded-2xl text-lg font-black group">
                    Book Your Free Audit <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
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

export default PortfolioDetail;