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
  Users
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