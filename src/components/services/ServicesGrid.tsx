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
  Megaphone,
  Briefcase,
  ShieldCheck,
  Compass,
  Map,
  ClipboardCheck,
  Palette,
  MousePointerClick,
  Layout,
  Smartphone,
  FileCode2,
  Layers,
  Link2,
  Wand2,
  Mail,
  MailPlus
} from 'lucide-react';

// Buckets mirror a classic growth-agency journey: Discovery → Design → Development → Marketing
const services = [
  // ── Discovery ──────────────────────────────────────────────
  {
    title: "eCommerce Growth Strategy",
    category: "Discovery",
    description: "A holistic approach to scaling your brand to 8-figures and beyond. We act as your fractional growth team, aligning your product roadmap, inventory planning, and marketing strategy for market dominance.",
    metric: "310% YoY Growth",
    icon: <Rocket className="w-7 h-7" />,
    href: "/services/strategy"
  },
  {
    title: "Analytics & Data",
    category: "Discovery",
    description: "Data is only useful if it's actionable. We build custom dashboards and server-side tracking solutions that provide a single source of truth for your brand's LTV, CAC, and contribution margin.",
    metric: "100% Accuracy",
    icon: <Database className="w-7 h-7" />,
    href: "/services/data"
  },
  {
    title: "IT Consulting",
    category: "Discovery",
    description: "A senior technical review of your stack — hosting, integrations, security posture, and tooling — before we (or anyone else) touch a single line of code. We tell you what's actually broken versus what's just old.",
    metric: "Full Stack Audit",
    icon: <Briefcase className="w-7 h-7" />,
    href: "/services/it-consulting"
  },
  {
    title: "Brand Audit",
    category: "Discovery",
    description: "A structured teardown of your visual identity, messaging, and market position against your real competitive set — surfacing exactly where the brand is inconsistent, dated, or invisible.",
    metric: "6-Point Brand Teardown",
    icon: <ShieldCheck className="w-7 h-7" />,
    href: "/services/brand-audit"
  },
  {
    title: "Digital Presence Review",
    category: "Discovery",
    description: "A full sweep of every place your brand shows up online — website, socials, marketplaces, search, and AI answer engines — mapped against competitors to show exactly where you're losing visibility.",
    metric: "Cross-Channel Visibility Map",
    icon: <Compass className="w-7 h-7" />,
    href: "/services/digital-presence-review"
  },
  {
    title: "Strategy & Planning",
    category: "Discovery",
    description: "The roadmap before the build — goals, budget allocation, channel mix, and a 90-day execution plan that every subsequent engagement (design, dev, or marketing) is scoped against.",
    metric: "90-Day Execution Roadmap",
    icon: <Map className="w-7 h-7" />,
    href: "/services/strategy-planning"
  },
  {
    title: "Technical Assessment",
    category: "Discovery",
    description: "A deep technical audit of your site or app — performance, security, scalability, and code quality — with a prioritized fix list ranked by business impact, not just severity score.",
    metric: "Prioritized Fix List",
    icon: <ClipboardCheck className="w-7 h-7" />,
    href: "/services/technical-assessment"
  },

  // ── Design ─────────────────────────────────────────────────
  {
    title: "Branding",
    category: "Design",
    description: "Logo, visual identity system, and brand guidelines built to hold up across packaging, ads, and product — not just a logo file with no rules attached.",
    metric: "Full Identity System",
    icon: <Palette className="w-7 h-7" />,
    href: "/services/branding"
  },
  {
    title: "UI/UX Design",
    category: "Design",
    description: "Wireframes, prototypes, and interface design grounded in user research and conversion psychology — every screen justified by how it moves someone toward the action you want.",
    metric: "Research-Led Prototyping",
    icon: <MousePointerClick className="w-7 h-7" />,
    href: "/services/ui-ux-design"
  },
  {
    title: "Web Design",
    category: "Design",
    description: "High-conversion website design — information architecture, visual system, and responsive layouts — handed off dev-ready so build doesn't stall waiting on design decisions.",
    metric: "Dev-Ready Handoff",
    icon: <Layout className="w-7 h-7" />,
    href: "/services/web-design"
  },
  {
    title: "Mobile App Design",
    category: "Design",
    description: "iOS and Android interface design built around platform-native patterns — onboarding, navigation, and micro-interactions designed for retention, not just aesthetics.",
    metric: "iOS + Android Native Patterns",
    icon: <Smartphone className="w-7 h-7" />,
    href: "/services/mobile-app-design"
  },
  {
    title: "Landing Page Design",
    category: "Design",
    description: "Single-purpose, conversion-first landing pages built for a specific campaign or offer — structured around one CTA, tested against the traffic source it's built for.",
    metric: "Single-CTA Conversion Focus",
    icon: <Wand2 className="w-7 h-7" />,
    href: "/services/landing-page-design"
  },
  {
    title: "Production & Shoots",
    category: "Design",
    description: "On-location and studio photo/video production for brands that need real-world footage — full-day shoots, creative direction, and post-production, like our work with Airtel Business and Mizuno India.",
    metric: "On-Location + Studio Production",
    icon: <Camera className="w-7 h-7" />,
    href: "/services/production-shoots"
  },

  // ── Development ────────────────────────────────────────────
  {
    title: "Web Development",
    category: "Development",
    description: "We build headless commerce experiences that load in under 1 second. By decoupling the frontend from Shopify, we provide total design freedom and unmatched performance built for conversion and speed.",
    metric: "<1s Load Time",
    icon: <Globe2 className="w-7 h-7" />,
    href: "/services/web-dev"
  },
  {
    title: "Mobile App Development",
    category: "Development",
    description: "Native and cross-platform app builds — React Native or Swift/Kotlin depending on the requirement — shipped through App Store and Play Store review, not just handed off as source code.",
    metric: "Native + Cross-Platform",
    icon: <Smartphone className="w-7 h-7" />,
    href: "/services/mobile-app-development"
  },
  {
    title: "Software Development",
    category: "Development",
    description: "Custom internal tools and SaaS builds — from admin dashboards to full multi-tenant platforms — architected for the specific workflow you actually run, not a generic template.",
    metric: "Custom Internal Tooling",
    icon: <FileCode2 className="w-7 h-7" />,
    href: "/services/software-development"
  },
  {
    title: "CMS Development",
    category: "Development",
    description: "Headless and traditional CMS builds — Shopify, WordPress, Sanity, or a custom admin — so your team can ship content and product changes without filing a dev ticket for every edit.",
    metric: "Self-Serve Content Ops",
    icon: <Layers className="w-7 h-7" />,
    href: "/services/cms-development"
  },
  {
    title: "Blockchain Development",
    category: "Development",
    description: "Smart contract and dApp development for brands building loyalty, provenance, or token-gated experiences on-chain — engineered with the same security discipline as a payments system.",
    metric: "Audited Smart Contracts",
    icon: <Link2 className="w-7 h-7" />,
    href: "/services/blockchain-development"
  },
  {
    title: "Blockchain Integration",
    category: "Development",
    description: "Wiring existing wallets, payment rails, or NFT/loyalty systems into your current stack — checkout, CRM, and backend — without a ground-up rebuild.",
    metric: "Zero-Rebuild Wallet Integration",
    icon: <Link2 className="w-7 h-7" />,
    href: "/services/blockchain-integration"
  },
  {
    title: "Enterprise AI Automation",
    category: "Development",
    description: "We design and deploy custom AI agents, Claude-powered workflows, and end-to-end automation for B2B, SaaS, and enterprise teams. From CRM integration and lead qualification to internal ops — we eliminate the manual layer and scale your team's output without headcount.",
    metric: "80% Efficiency Lift",
    icon: <Bot className="w-7 h-7" />,
    href: "/services/ai-automation"
  },

  // ── Marketing ──────────────────────────────────────────────
  {
    title: "AI Search Visibility",
    category: "Marketing",
    description: "Traditional SEO is no longer enough. We bundle technical SEO, Google AI Overviews (AEO), and LLM citation strategy for ChatGPT, Gemini, and Perplexity (GEO) into one unified service — so your brand is the answer wherever your customers search.",
    metric: "3× Organic Visibility",
    icon: <Search className="w-7 h-7" />,
    href: "/services/seo-aeo-geo"
  },
  {
    title: "Performance Marketing",
    category: "Marketing",
    description: "We dominate paid social and search by combining aggressive bidding strategies with proprietary attribution models. Our team manages millions in monthly spend across Meta, TikTok, and Google, ensuring every rupee is optimized for maximum return.",
    metric: "ROAS 28x",
    icon: <BarChart3 className="w-7 h-7" />,
    href: "/services/performance"
  },
  {
    title: "Social Media Management",
    category: "Marketing",
    description: "We manage your brand's social presence across all platforms. From content strategy and community management to viral trend hijacking, we ensure your brand stays relevant and engaged with your core audience.",
    metric: "12% Avg. Engagement",
    icon: <Users className="w-7 h-7" />,
    href: "/services/social-media"
  },
  {
    title: "AI Creative Production",
    category: "Marketing",
    description: "We combine AI video (Sora/Veo 3), AI-scripted UGC, and ElevenLabs voiceovers with human creative direction to produce 100+ high-converting ad variants weekly. AI-assisted production cuts turnaround time while tripling engagement versus static creative.",
    metric: "3× Ad Engagement",
    icon: <Zap className="w-7 h-7" />,
    href: "/services/creative"
  },
  {
    title: "CRO + Retention Engineering",
    category: "Marketing",
    description: "We fix the funnel you're paying to fill. From heatmap audits and A/B testing to AI-trigger email flows, post-purchase sequences, and LTV maximisation — we turn one-time buyers into repeat revenue without increasing your ad spend.",
    metric: "+42% CVR Lift",
    icon: <Search className="w-7 h-7" />,
    href: "/services/cro"
  },
  {
    title: "SEO",
    category: "Marketing",
    description: "Technical SEO, on-page optimization, and content architecture that gets you ranking — and staying ranked — on Google. The foundation every AI Overview and LLM citation is still built on.",
    metric: "Technical + On-Page + Content",
    icon: <Search className="w-7 h-7" />,
    href: "/services/seo"
  },
  {
    title: "AEO",
    category: "Marketing",
    description: "Google's AI Overviews now answer the query before a click happens. We structure your content, schema, and entity signals so your brand is the answer Google surfaces — not just a ranked result.",
    metric: "AI Overview Optimization",
    icon: <Sparkles className="w-7 h-7" />,
    href: "/services/aeo"
  },
  {
    title: "GEO",
    category: "Marketing",
    description: "ChatGPT, Perplexity, and Gemini are a real discovery channel now. We earn your brand actual citations inside AI-generated answers through entity building and LLM-readable content.",
    metric: "LLM Citation Strategy",
    icon: <Brain className="w-7 h-7" />,
    href: "/services/geo"
  },
  {
    title: "Meta Ads",
    category: "Marketing",
    description: "Facebook and Instagram account architecture, creative testing cadence, and server-side tracking built to survive iOS privacy changes — run by a dedicated Meta specialist team.",
    metric: "Dedicated Meta Specialist Team",
    icon: <Facebook className="w-7 h-7" />,
    href: "/services/meta-ads"
  },
  {
    title: "Google Ads",
    category: "Marketing",
    description: "Search, Shopping, Performance Max, and YouTube — run by a team that lives in the auction insights report and builds structures that scale spend without letting CPCs run away.",
    metric: "Search + Shopping + PMax + YouTube",
    icon: <TrendingUp className="w-7 h-7" />,
    href: "/services/google-ads"
  },
  {
    title: "Snapchat Ads",
    category: "Marketing",
    description: "An underused channel for reaching a younger, high-intent audience at typically lower CPMs than Meta or Google — Snap Ads, Collection Ads, and AR Lens campaigns.",
    metric: "Lower-Competition Channel",
    icon: <Ghost className="w-7 h-7" />,
    href: "/services/snapchat-ads"
  },
  {
    title: "OpenAI / ChatGPT Ads",
    category: "Marketing",
    description: "As ad placements arrive inside ChatGPT and other AI assistants, we're building playbooks now so our clients are ready to advertise directly inside AI conversations early.",
    metric: "Early-Access Emerging Channel",
    icon: <Cpu className="w-7 h-7" />,
    href: "/services/openai-ads"
  },
  {
    title: "Ecommerce & Marketplace Ads",
    category: "Marketing",
    description: "Amazon and Flipkart advertising run with the same rigor as our Meta and Google accounts — Sponsored Products, Sponsored Display, and search-term mining that turns marketplace traffic into sales.",
    metric: "11.2x ROAS (Amazon)",
    icon: <ShoppingCart className="w-7 h-7" />,
    href: "/services/ecommerce-ads"
  },
  {
    title: "Influencer Marketing",
    category: "Marketing",
    description: "Creator partnerships that feel native, not sponsored — from micro-influencer seeding to founder-led storytelling campaigns like our Billu Campaign, sourced, briefed, and tracked end-to-end.",
    metric: "5M+ Organic Reach (playR)",
    icon: <Megaphone className="w-7 h-7" />,
    href: "/services/influencer-marketing"
  },
  {
    title: "MEME Marketing",
    category: "Marketing",
    description: "Culturally fluent, trend-jacked meme content built for organic reach — the kind of native, unmistakably-not-an-ad post that gets shared instead of scrolled past.",
    metric: "Native Trend-Jacked Content",
    icon: <Sparkles className="w-7 h-7" />,
    href: "/services/meme-marketing"
  },
  {
    title: "Email Marketing",
    category: "Marketing",
    description: "Campaign and newsletter strategy that turns your list into a revenue channel — segmentation, copy, and design built to earn the open, not just land in the inbox.",
    metric: "List-to-Revenue Strategy",
    icon: <Mail className="w-7 h-7" />,
    href: "/services/email-marketing"
  },
  {
    title: "Email Automation",
    category: "Marketing",
    description: "Welcome series, abandoned cart, post-purchase, and win-back flows built once and running forever — the highest-ROI channel in ecommerce, set up properly instead of left on a default template.",
    metric: "Always-On Revenue Flows",
    icon: <MailPlus className="w-7 h-7" />,
    href: "/services/email-automation"
  }
];

const categories = ["All", "Discovery", "Design", "Development", "Marketing"];

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
