"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ServiceCard from './ServiceCard';
import {
  BarChart3,
  Zap,
  Globe2,
  Search,
  Database,
  Rocket,
  Filter,
  Bot,
  Users,
  Sparkles,
  Brain,
  Facebook,
  TrendingUp,
  Ghost,
  Cpu,
  ShoppingCart,
  Camera,
  Megaphone
} from 'lucide-react';

const services = [
  {
    title: "Enterprise AI Automation",
    category: "Tech",
    description: "We design and deploy custom AI agents, Claude-powered workflows, and end-to-end automation for B2B, SaaS, and enterprise teams. From CRM integration and lead qualification to internal ops — we eliminate the manual layer and scale your team's output without headcount.",
    metric: "80% Efficiency Lift",
    icon: <Bot className="w-7 h-7" />,
    href: "/services/ai-automation"
  },
  {
    title: "AI Search Visibility",
    category: "Growth",
    description: "Traditional SEO is no longer enough. We bundle technical SEO, Google AI Overviews (AEO), and LLM citation strategy for ChatGPT, Gemini, and Perplexity (GEO) into one unified service — so your brand is the answer wherever your customers search.",
    metric: "3× Organic Visibility",
    icon: <Search className="w-7 h-7" />,
    href: "/services/seo-aeo-geo"
  },
  {
    title: "Performance Marketing",
    category: "Growth",
    description: "We dominate paid social and search by combining aggressive bidding strategies with proprietary attribution models. Our team manages millions in monthly spend across Meta, TikTok, and Google, ensuring every rupee is optimized for maximum return.",
    metric: "ROAS 28x",
    icon: <BarChart3 className="w-7 h-7" />,
    href: "/services/performance"
  },
  {
    title: "Social Media Management",
    category: "Creative",
    description: "We manage your brand's social presence across all platforms. From content strategy and community management to viral trend hijacking, we ensure your brand stays relevant and engaged with your core audience.",
    metric: "12% Avg. Engagement",
    icon: <Users className="w-7 h-7" />,
    href: "/services/social-media"
  },
  {
    title: "AI Creative Production",
    category: "Creative",
    description: "We combine AI video (Sora/Veo 3), AI-scripted UGC, and ElevenLabs voiceovers with human creative direction to produce 100+ high-converting ad variants weekly. AI-assisted production cuts turnaround time while tripling engagement versus static creative.",
    metric: "3× Ad Engagement",
    icon: <Zap className="w-7 h-7" />,
    href: "/services/creative"
  },
  {
    title: "Web Development",
    category: "Tech",
    description: "We build headless commerce experiences that load in under 1 second. By decoupling the frontend from Shopify, we provide total design freedom and unmatched performance built for conversion and speed.",
    metric: "<1s Load Time",
    icon: <Globe2 className="w-7 h-7" />,
    href: "/services/web-dev"
  },
  {
    title: "CRO + Retention Engineering",
    category: "Growth",
    description: "We fix the funnel you're paying to fill. From heatmap audits and A/B testing to AI-trigger email flows, post-purchase sequences, and LTV maximisation — we turn one-time buyers into repeat revenue without increasing your ad spend.",
    metric: "+42% CVR Lift",
    icon: <Search className="w-7 h-7" />,
    href: "/services/cro"
  },
  {
    title: "Analytics & Data",
    category: "Tech",
    description: "Data is only useful if it's actionable. We build custom dashboards and server-side tracking solutions that provide a single source of truth for your brand's LTV, CAC, and contribution margin.",
    metric: "100% Accuracy",
    icon: <Database className="w-7 h-7" />,
    href: "/services/data"
  },
  {
    title: "eCommerce Growth",
    category: "Strategy",
    description: "A holistic approach to scaling your brand to 8-figures and beyond. We act as your fractional growth team, aligning your product roadmap, inventory planning, and marketing strategy for market dominance.",
    metric: "310% YoY Growth",
    icon: <Rocket className="w-7 h-7" />,
    href: "/services/strategy"
  },
  {
    title: "SEO",
    category: "Growth",
    description: "Technical SEO, on-page optimization, and content architecture that gets you ranking — and staying ranked — on Google. The foundation every AI Overview and LLM citation is still built on.",
    metric: "Technical + On-Page + Content",
    icon: <Search className="w-7 h-7" />,
    href: "/services/seo"
  },
  {
    title: "AEO",
    category: "Growth",
    description: "Google's AI Overviews now answer the query before a click happens. We structure your content, schema, and entity signals so your brand is the answer Google surfaces — not just a ranked result.",
    metric: "AI Overview Optimization",
    icon: <Sparkles className="w-7 h-7" />,
    href: "/services/aeo"
  },
  {
    title: "GEO",
    category: "Growth",
    description: "ChatGPT, Perplexity, and Gemini are a real discovery channel now. We earn your brand actual citations inside AI-generated answers through entity building and LLM-readable content.",
    metric: "LLM Citation Strategy",
    icon: <Brain className="w-7 h-7" />,
    href: "/services/geo"
  },
  {
    title: "Meta Ads",
    category: "Growth",
    description: "Facebook and Instagram account architecture, creative testing cadence, and server-side tracking built to survive iOS privacy changes — run by a dedicated Meta specialist team.",
    metric: "Dedicated Meta Specialist Team",
    icon: <Facebook className="w-7 h-7" />,
    href: "/services/meta-ads"
  },
  {
    title: "Google Ads",
    category: "Growth",
    description: "Search, Shopping, Performance Max, and YouTube — run by a team that lives in the auction insights report and builds structures that scale spend without letting CPCs run away.",
    metric: "Search + Shopping + PMax + YouTube",
    icon: <TrendingUp className="w-7 h-7" />,
    href: "/services/google-ads"
  },
  {
    title: "Snapchat Ads",
    category: "Growth",
    description: "An underused channel for reaching a younger, high-intent audience at typically lower CPMs than Meta or Google — Snap Ads, Collection Ads, and AR Lens campaigns.",
    metric: "Lower-Competition Channel",
    icon: <Ghost className="w-7 h-7" />,
    href: "/services/snapchat-ads"
  },
  {
    title: "OpenAI / ChatGPT Ads",
    category: "Growth",
    description: "As ad placements arrive inside ChatGPT and other AI assistants, we're building playbooks now so our clients are ready to advertise directly inside AI conversations early.",
    metric: "Early-Access Emerging Channel",
    icon: <Cpu className="w-7 h-7" />,
    href: "/services/openai-ads"
  },
  {
    title: "Ecommerce & Marketplace Ads",
    category: "Growth",
    description: "Amazon and Flipkart advertising run with the same rigor as our Meta and Google accounts — Sponsored Products, Sponsored Display, and search-term mining that turns marketplace traffic into sales.",
    metric: "11.2x ROAS (Amazon)",
    icon: <ShoppingCart className="w-7 h-7" />,
    href: "/services/ecommerce-ads"
  },
  {
    title: "Production & Shoots",
    category: "Creative",
    description: "On-location and studio photo/video production for brands that need real-world footage — full-day shoots, creative direction, and post-production, like our work with Airtel Business and Mizuno India.",
    metric: "On-Location + Studio Production",
    icon: <Camera className="w-7 h-7" />,
    href: "/services/production-shoots"
  },
  {
    title: "Influencer Marketing",
    category: "Creative",
    description: "Creator partnerships that feel native, not sponsored — from micro-influencer seeding to founder-led storytelling campaigns like our Billu Campaign, sourced, briefed, and tracked end-to-end.",
    metric: "5M+ Organic Reach (playR)",
    icon: <Megaphone className="w-7 h-7" />,
    href: "/services/influencer-marketing"
  }
];

const categories = ["All", "Growth", "Creative", "Tech", "Strategy"];

const ServicesGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = activeCategory === "All" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
              activeCategory === cat 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
            }`}
          >
            {cat === "All" && <Filter className="w-4 h-4" />}
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServicesGrid;