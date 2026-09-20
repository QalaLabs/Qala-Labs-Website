import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle2,
  Zap,
  BarChart3,
  Target,
  ArrowRight,
  Globe2,
  Search,
  Database,
  Rocket,
  Bot,
  Workflow,
  Cpu,
  Users,
  Sparkles,
  Brain,
  Facebook,
  TrendingUp,
  Ghost,
  ShoppingCart,
  Camera,
  Megaphone,
  FileText,
  CreditCard,
  Truck,
  Calculator,
  Package,
  MessageSquare,
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
import { motion } from "framer-motion";
import { generateJsonLd } from '@/lib/seo';

const serviceData: Record<string, any> = {
  'seo-aeo-geo': {
    title: "AI Search Visibility",
    description: "Google AI Overviews reduced click-through rates for top-ranking content by 58%. Traditional SEO alone is no longer enough. We bundle technical SEO, Google AI Overviews optimization (AEO), and LLM citation strategy for ChatGPT, Gemini, and Perplexity (GEO) into one unified AI Search Visibility service — so your brand is the trusted answer wherever your customers search.",
    icon: <Search className="w-12 h-12" />,
    metric: "3× Organic Visibility",
    features: [
      "Technical SEO Audits & Remediation",
      "Google AI Overviews Optimization (AEO)",
      "LLM Citation Strategy — ChatGPT, Gemini, Perplexity (GEO)",
      "Entity & Knowledge Graph Building",
      "Structured Data & Schema Markup",
      "Content Architecture for AI Discoverability",
      "Brand Voice Alignment Across AI Channels",
      "Ongoing AI SERP Monitoring & Reporting"
    ],
    process: [
      { title: "Audit", desc: "Deep crawl of technical health, entity coverage, AI Overview presence, and LLM citation gaps." },
      { title: "Optimize", desc: "Schema markup, entity alignment, and content restructuring for both traditional and AI search." },
      { title: "Dominate", desc: "Continuous monitoring across Google, ChatGPT, Perplexity, and Gemini — with monthly visibility reports." }
    ]
  },
  'social-media': {
    title: "Social Media Management",
    description: "We manage your brand's social presence across all platforms. From content strategy and community management to viral trend hijacking, we ensure your brand stays relevant and engaged with your core audience.",
    icon: <Users className="w-12 h-12" />,
    metric: "12% Avg. Engagement",
    features: [
      "Content Strategy & Planning",
      "Community Management",
      "Trend Hijacking & Viral Tactics",
      "Platform-Specific Optimization",
      "Influencer Coordination",
      "Monthly Performance Audits"
    ],
    process: [
      { title: "Strategy", desc: "Defining your brand voice and content pillars." },
      { title: "Creation", desc: "Producing high-impact posts, reels, and stories." },
      { title: "Engagement", desc: "Active community management and growth tactics." }
    ]
  },
  'ai-automation': {
    title: "Enterprise AI Automation",
    description: "B2B and SaaS teams using AI marketing see 4.2× average ROI — and that's before you touch ops. We design and deploy custom Claude-powered agents, multi-step n8n and Make workflows, and CRM integrations that eliminate your manual layer entirely. From lead qualification and onboarding sequences to internal reporting and support — we automate the work so your team can focus on what actually scales.",
    icon: <Bot className="w-12 h-12" />,
    metric: "80% Efficiency Lift",
    features: [
      "Custom Claude & LLM Agent Development",
      "CRM Integration & AI-Driven Lead Scoring",
      "Automated Lead Qualification & Nurture",
      "Internal Workflow Automation (n8n / Make)",
      "AI-Powered Customer Support Agents",
      "B2B Onboarding & Ops Automation",
      "SaaS Pipeline & Reporting Automation",
      "Ongoing Agent Monitoring & Optimisation"
    ],
    process: [
      { title: "Audit", desc: "Map your manual bottlenecks, data flows, and CRM architecture to find the highest-ROI automation targets." },
      { title: "Build", desc: "Develop custom agents and workflow logic using Claude, OpenAI, n8n, and Make — tailored to your stack." },
      { title: "Deploy", desc: "Seamless integration and handoff with ongoing monitoring, retraining, and performance reporting." }
    ]
  },
  'performance': {
    title: "Performance Marketing",
    description: "We dominate paid social and search by combining aggressive bidding strategies with proprietary attribution models.",
    icon: <BarChart3 className="w-12 h-12" />,
    metric: "ROAS 28x",
    features: [
      "Meta & TikTok Ad Management",
      "Google Search & Shopping (PMax)",
      "Proprietary Attribution Modeling",
      "Daily Budget Optimization",
      "Competitor Intelligence"
    ],
    process: [
      { title: "Audit", desc: "Deep dive into historical data and tracking." },
      { title: "Setup", desc: "Infrastructure build and pixel hardening." },
      { title: "Scale", desc: "Aggressive testing and budget expansion." }
    ]
  },
  'creative': {
    title: "AI Creative Production",
    description: "AI video is the single biggest unlock in performance creative right now. We run a full AI production pipeline — script (Claude/ChatGPT) → visuals (Sora/Veo 3) → voiceover (ElevenLabs) → editing — combined with human creative direction and UGC creator programs. The result: 100+ high-converting ad variants weekly at a fraction of traditional production cost, with AI-assisted video averaging 3× ad engagement versus static.",
    icon: <Zap className="w-12 h-12" />,
    metric: "3× Ad Engagement",
    features: [
      "AI Video Production (Sora / Veo 3)",
      "AI-Scripted UGC & Creator Programs",
      "ElevenLabs Voiceover Integration",
      "Direct Response Video Editing",
      "Static Ad Design & Motion Graphics",
      "Hook & CTA Variant Testing",
      "Creative Strategy & Angle Research",
      "Weekly Performance Feedback Loop"
    ],
    process: [
      { title: "Ideation", desc: "Data-driven hook and angle research using AI trend analysis and competitor creative audits." },
      { title: "Production", desc: "Full AI pipeline — script, AI video generation, voiceover, and human editing for polish and brand fit." },
      { title: "Analysis", desc: "Performance data feeds directly into the next batch — iterating toward lower CPA every week." }
    ]
  },
  'web-dev': {
    title: "Web Development",
    description: "We build headless commerce experiences that load in under 1 second for unmatched performance.",
    icon: <Globe2 className="w-12 h-12" />,
    metric: "<1s Load Time",
    features: [
      "Headless Shopify (Hydrogen/Oxygen)",
      "Custom React Frontends",
      "Speed & Core Web Vitals Optimization",
      "Third-party App Consolidation",
      "Mobile-First UX Design"
    ],
    process: [
      { title: "Design", desc: "Conversion-focused UI/UX prototyping." },
      { title: "Build", desc: "Clean, performant React development." },
      { title: "Launch", desc: "Rigorous testing and seamless migration." }
    ]
  },
  'cro': {
    title: "CRO + Retention Engineering",
    description: "If you're spending ₹10L+ on ads, the funnel you're paying to fill is where you're losing. We run full-funnel CRO — heatmap audits, A/B testing, and checkout flow optimisation — then extend into retention engineering: AI-trigger email and SMS flows, post-purchase sequences, win-back campaigns, and LTV maximisation. We turn one-time buyers into repeat revenue without increasing your media spend.",
    icon: <Search className="w-12 h-12" />,
    metric: "+42% CVR Lift",
    features: [
      "Heatmap & Session Recording Analysis",
      "Rigorous A/B & Multivariate Testing",
      "Checkout Flow Optimisation",
      "Landing Page Design & Copywriting",
      "User Psychology & Friction Audits",
      "AI-Trigger Email & SMS Flows",
      "Post-Purchase & Win-Back Sequences",
      "LTV & Cohort-Based Retention Strategy"
    ],
    process: [
      { title: "Audit", desc: "Full funnel analysis — heatmaps, session recordings, and drop-off identification from ad click to purchase." },
      { title: "Optimise", desc: "A/B test landing pages, checkout steps, and post-purchase flows with statistical rigour." },
      { title: "Retain", desc: "Deploy AI-trigger retention sequences that maximise repeat purchase rate and customer LTV." }
    ]
  },
  'data': {
    title: "Analytics & Data",
    description: "Data is only useful if it's actionable. We build custom dashboards and server-side tracking solutions.",
    icon: <Database className="w-12 h-12" />,
    metric: "100% Accuracy",
    features: [
      "Server-Side GTM Setup",
      "Custom Looker Studio Dashboards",
      "LTV & Cohort Analysis",
      "Attribution Modeling",
      "Data Warehouse Integration"
    ],
    process: [
      { title: "Audit", desc: "Verify current tracking integrity." },
      { title: "Implement", desc: "Deploy server-side infrastructure." },
      { title: "Visualize", desc: "Build real-time performance views." }
    ]
  },
  'strategy': {
    title: "eCommerce Growth",
    description: "A holistic approach to scaling your brand to 8-figures and beyond. We act as your fractional growth team.",
    icon: <Rocket className="w-12 h-12" />,
    metric: "310% YoY Growth",
    features: [
      "Omnichannel Growth Strategy",
      "Inventory & Cashflow Planning",
      "Product Roadmap Alignment",
      "Retention & LTV Strategy",
      "Market Expansion Planning"
    ],
    process: [
      { title: "Discovery", desc: "Deep dive into unit economics." },
      { title: "Roadmap", desc: "Build a 12-month scale plan." },
      { title: "Execute", desc: "Weekly sprints to hit growth targets." }
    ]
  },
  'seo': {
    title: "SEO",
    description: "Technical SEO, on-page optimization, and content architecture that gets you ranking — and staying ranked — on Google. It's the foundation every AI Overview, ChatGPT citation, and Perplexity answer is still built on, which is why we run it alongside our AEO and GEO practices rather than as a standalone checklist item.",
    icon: <Search className="w-12 h-12" />,
    metric: "Technical + On-Page + Content",
    features: [
      "Technical SEO Audits & Core Web Vitals Fixes",
      "On-Page Optimization & Internal Linking",
      "Keyword Research & Content Gap Analysis",
      "Site Architecture & Crawlability",
      "Backlink Strategy & Authority Building",
      "Local & International SEO"
    ],
    process: [
      { title: "Audit", desc: "Full technical crawl, Core Web Vitals check, and content gap analysis against competitors." },
      { title: "Optimize", desc: "Fix crawlability and indexation issues, restructure on-page elements, build out topical authority." },
      { title: "Rank", desc: "Ongoing content production, internal linking, and authority building with monthly ranking reports." }
    ]
  },
  'aeo': {
    title: "AEO",
    description: "Google's AI Overviews now answer the query before a user ever clicks a blue link — and they reduced click-through rates for top-ranking content by 58%. Answer Engine Optimization structures your content, schema, and entity signals so your brand is the answer Google surfaces, not just a ranked result underneath it.",
    icon: <Sparkles className="w-12 h-12" />,
    metric: "AI Overview Optimization",
    features: [
      "AI Overview Content Structuring",
      "Schema Markup & Structured Data",
      "Entity & Knowledge Graph Building",
      "Featured Snippet & FAQ Optimization",
      "Question-Led Content Architecture",
      "AI Overview Presence Monitoring"
    ],
    process: [
      { title: "Map", desc: "Identify which of your target queries already trigger AI Overviews and who currently gets cited." },
      { title: "Structure", desc: "Rebuild content and schema so it's directly answer-extractable by Google's AI systems." },
      { title: "Monitor", desc: "Track AI Overview presence and citation share over time, iterating on what earns placement." }
    ]
  },
  'geo': {
    title: "GEO",
    description: "ChatGPT, Perplexity, and Gemini are becoming a real discovery channel, with over a billion ChatGPT users alone. Generative Engine Optimization earns your brand actual citations inside AI-generated answers — through entity building, LLM-readable content structure, and a citation-worthy source profile.",
    icon: <Brain className="w-12 h-12" />,
    metric: "LLM Citation Strategy",
    features: [
      "LLM Citation Strategy — ChatGPT, Gemini, Perplexity",
      "Entity & Brand Knowledge Graph Building",
      "Content Restructuring for AI Discoverability",
      "Source & Authority Signal Building",
      "Brand Voice Alignment Across AI Channels",
      "LLM Citation Monitoring & Reporting"
    ],
    process: [
      { title: "Audit", desc: "Test how ChatGPT, Perplexity, and Gemini currently describe your brand and cite (or don't cite) you." },
      { title: "Build", desc: "Strengthen entity signals, publish citation-worthy source content, and align brand facts across the web." },
      { title: "Track", desc: "Monitor citation frequency and accuracy across LLMs with monthly visibility reports." }
    ]
  },
  'meta-ads': {
    title: "Meta Ads",
    description: "Facebook and Instagram account architecture, creative testing cadence, and server-side tracking built to survive iOS privacy changes and platform noise — run by a dedicated Meta specialist team rather than a generalist media buyer splitting attention across platforms.",
    icon: <Facebook className="w-12 h-12" />,
    metric: "Dedicated Meta Specialist Team",
    features: [
      "Account Architecture & Campaign Structure",
      "Advantage+ & Broad Targeting Strategy",
      "Creative Testing Cadence",
      "Server-Side CAPI Tracking",
      "Retargeting & Lookalike Audience Builds",
      "Daily Budget & Bid Management"
    ],
    process: [
      { title: "Audit", desc: "Review historical account performance, pixel/CAPI health, and existing audience architecture." },
      { title: "Rebuild", desc: "Restructure campaigns for signal quality, set up server-side tracking, and launch a creative testing cadence." },
      { title: "Scale", desc: "Expand budgets against winning ad sets while continuously refreshing creative to fight fatigue." }
    ]
  },
  'google-ads': {
    title: "Google Ads",
    description: "Search, Shopping, Performance Max, and YouTube — run by a team that lives in the auction insights report. We build account structures that scale spend without letting CPCs run away, with the same rigor across every Google surface rather than a Search-only playbook.",
    icon: <TrendingUp className="w-12 h-12" />,
    metric: "Search + Shopping + PMax + YouTube",
    features: [
      "Search Campaign Structure & Keyword Strategy",
      "Google Shopping Feed Optimization",
      "Performance Max Campaign Management",
      "YouTube Ads & Video Campaigns",
      "Negative Keyword & Search Term Hygiene",
      "Smart Bidding Strategy & Budget Pacing"
    ],
    process: [
      { title: "Audit", desc: "Review account structure, search term reports, Merchant Center feed health, and conversion tracking." },
      { title: "Rebuild", desc: "Restructure campaigns, clean the product feed, and set bidding strategies matched to your margin." },
      { title: "Scale", desc: "Expand budget on winning campaigns and layer in Performance Max and YouTube for incremental reach." }
    ]
  },
  'snapchat-ads': {
    title: "Snapchat Ads",
    description: "An underused channel for reaching a younger, high-intent audience at typically lower CPMs than Meta or Google. We build Snap Ads, Collection Ads, and AR Lens campaigns for brands looking for an edge outside the two most saturated ad platforms.",
    icon: <Ghost className="w-12 h-12" />,
    metric: "Lower-Competition Channel",
    features: [
      "Snap Ads & Collection Ads Setup",
      "AR Lens Campaign Production",
      "Audience Targeting & Lookalikes",
      "Creative Built for Gen Z Attention Spans",
      "Cross-Platform Budget Allocation",
      "Performance Reporting & Optimization"
    ],
    process: [
      { title: "Audit", desc: "Assess audience fit and whether Snapchat's demographic overlaps with your actual buyer." },
      { title: "Launch", desc: "Build out Snap Ads and Collection Ads with creative designed for the platform's format and pace." },
      { title: "Scale", desc: "Optimize toward the audiences and placements converting, expanding budget incrementally." }
    ]
  },
  'openai-ads': {
    title: "OpenAI / ChatGPT Ads",
    description: "As ad placements arrive inside ChatGPT and other AI assistants, early movers will own the cheapest inventory before the auction gets competitive. We're building playbooks now so our clients are ready to advertise directly inside AI conversations the moment placements open up broadly — an emerging channel, not yet a mature one.",
    icon: <Cpu className="w-12 h-12" />,
    metric: "Early-Access Emerging Channel",
    features: [
      "Early-Access Account Setup & Onboarding",
      "AI-Assistant Ad Format Testing",
      "Placement Strategy as the Channel Opens",
      "Creative Built for Conversational Surfaces",
      "Cross-Channel Budget Planning",
      "First-Mover Positioning Advisory"
    ],
    process: [
      { title: "Position", desc: "Assess fit and get your brand queued for early access as placements become available." },
      { title: "Pilot", desc: "Test conversational ad formats at small scale as soon as the channel supports it." },
      { title: "Scale", desc: "Expand spend ahead of the competition once the channel matures and auction dynamics settle." }
    ]
  },
  'ecommerce-ads': {
    title: "Ecommerce & Marketplace Ads",
    description: "Amazon and Flipkart advertising run with the same rigor as our Meta and Google accounts — Sponsored Products, Sponsored Display, and search-term mining that turns marketplace traffic into profitable, repeatable sales. Our apparel client work on Amazon hit 11.2x ROAS on the top campaign using exactly this playbook.",
    icon: <ShoppingCart className="w-12 h-12" />,
    metric: "11.2x ROAS (Amazon)",
    features: [
      "Sponsored Products & Sponsored Display",
      "Search Term Mining & Negative Keyword Hygiene",
      "Campaign Segmentation by ASIN/SKU",
      "Marketplace Listing Optimization",
      "Amazon DSP & Retargeting",
      "Cross-Marketplace Budget Allocation"
    ],
    process: [
      { title: "Audit", desc: "Review campaign structure, search term reports, and listing quality against category benchmarks." },
      { title: "Segment", desc: "Restructure campaigns by ASIN/SKU and mine search terms to cut wasted spend." },
      { title: "Scale", desc: "Expand budget on proven segments and layer in DSP retargeting for incremental sales." }
    ]
  },
  'production-shoots': {
    title: "Production & Shoots",
    description: "On-location and studio photo/video production for brands that need real-world footage, not just AI-generated assets — full-day shoots, creative direction, and post-production for campaigns like our work with Airtel Business and Mizuno India.",
    icon: <Camera className="w-12 h-12" />,
    metric: "On-Location + Studio Production",
    features: [
      "Creative Concept & Shoot Planning",
      "On-Location & Studio Photography",
      "Video Production & Direction",
      "Talent & Location Coordination",
      "Post-Production & Editing",
      "Multi-Format Delivery (Social, OOH, Web)"
    ],
    process: [
      { title: "Concept", desc: "Develop the creative brief, shot list, and production plan against the campaign brief." },
      { title: "Shoot", desc: "Execute on-location or studio production with full creative and technical direction on set." },
      { title: "Deliver", desc: "Edit, grade, and export final assets in every format the campaign needs, from social to OOH." }
    ]
  },
  'influencer-marketing': {
    title: "Influencer Marketing",
    description: "Creator partnerships that feel native, not sponsored — from micro-influencer seeding to founder-led storytelling campaigns like our Billu Campaign, and fan-driven UGC drives like the playR jersey drop that hit 5M+ reach without a single paid placement. We handle creator sourcing, negotiation, briefing, and performance tracking end-to-end.",
    icon: <Megaphone className="w-12 h-12" />,
    metric: "5M+ Organic Reach (playR)",
    features: [
      "Creator Sourcing & Vetting",
      "Campaign Briefing & Creative Direction",
      "Contract Negotiation & Usage Rights",
      "Micro & Macro-Influencer Programs",
      "UGC Rights Management",
      "Performance Tracking & Reporting"
    ],
    process: [
      { title: "Source", desc: "Identify and vet creators whose audience and content style actually match the brand." },
      { title: "Brief", desc: "Give creators a clear creative direction while preserving the authentic, native format that performs." },
      { title: "Track", desc: "Measure reach, engagement, and conversion lift, then double down on what's working." }
    ]
  },
  'it-consulting': {
    title: "IT Consulting",
    description: "A senior technical review of your stack — hosting, integrations, security posture, and tooling — before we, or anyone else, touch a single line of code. We tell you what's actually broken versus what's just old, and what's worth fixing first.",
    icon: <Briefcase className="w-12 h-12" />,
    metric: "Full Stack Audit",
    features: [
      "Hosting & Infrastructure Review",
      "Third-Party Integration Audit",
      "Security Posture Assessment",
      "Tooling & Vendor Rationalization",
      "Scalability Bottleneck Identification",
      "Prioritized Remediation Roadmap"
    ],
    process: [
      { title: "Audit", desc: "Map your full stack — hosting, integrations, security, and tooling — end to end." },
      { title: "Diagnose", desc: "Separate what's genuinely broken from what's simply old but working fine." },
      { title: "Roadmap", desc: "Deliver a prioritized fix list ranked by business impact, not just technical severity." }
    ]
  },
  'brand-audit': {
    title: "Brand Audit",
    description: "A structured teardown of your visual identity, messaging, and market position against your real competitive set — surfacing exactly where the brand is inconsistent, dated, or simply invisible next to who you're actually competing with.",
    icon: <ShieldCheck className="w-12 h-12" />,
    metric: "6-Point Brand Teardown",
    features: [
      "Visual Identity Consistency Check",
      "Messaging & Positioning Audit",
      "Competitive Brand Benchmarking",
      "Tone of Voice Assessment",
      "Touchpoint-by-Touchpoint Review",
      "Prioritized Brand Fix List"
    ],
    process: [
      { title: "Collect", desc: "Pull every brand touchpoint — site, social, packaging, ads — into one audit view." },
      { title: "Benchmark", desc: "Compare against your real competitive set, not aspirational reference brands." },
      { title: "Report", desc: "Deliver a scored teardown with the highest-impact fixes ranked first." }
    ]
  },
  'digital-presence-review': {
    title: "Digital Presence Review",
    description: "A full sweep of every place your brand shows up online — website, social profiles, marketplaces, organic search, and AI answer engines — mapped against competitors to show exactly where you're losing visibility and to whom.",
    icon: <Compass className="w-12 h-12" />,
    metric: "Cross-Channel Visibility Map",
    features: [
      "Website & SEO Health Check",
      "Social Profile & Content Audit",
      "Marketplace Listing Review",
      "AI Answer Engine Presence Check (AEO/GEO)",
      "Competitor Channel Benchmarking",
      "Channel Prioritization Roadmap"
    ],
    process: [
      { title: "Scan", desc: "Crawl every channel your brand touches — web, social, marketplace, and AI search." },
      { title: "Map", desc: "Plot your presence against direct competitors channel by channel." },
      { title: "Prioritize", desc: "Rank channels by visibility gap and revenue potential, not vanity metrics." }
    ]
  },
  'strategy-planning': {
    title: "Strategy & Planning",
    description: "The roadmap before the build — goals, budget allocation, channel mix, and a 90-day execution plan that every subsequent engagement, whether design, development, or marketing, is scoped against.",
    icon: <Map className="w-12 h-12" />,
    metric: "90-Day Execution Roadmap",
    features: [
      "Goal & KPI Definition",
      "Budget Allocation Modeling",
      "Channel Mix Planning",
      "90-Day Execution Roadmap",
      "Resourcing & Timeline Planning",
      "Quarterly Review Cadence Setup"
    ],
    process: [
      { title: "Align", desc: "Lock business goals, budget, and success metrics with stakeholders up front." },
      { title: "Plan", desc: "Build the channel mix and 90-day roadmap every downstream engagement scopes against." },
      { title: "Review", desc: "Set a recurring review cadence so the plan adapts as real data comes in." }
    ]
  },
  'technical-assessment': {
    title: "Technical Assessment",
    description: "A deep technical audit of your site or app — performance, security, scalability, and code quality — with a prioritized fix list ranked by business impact rather than raw severity score.",
    icon: <ClipboardCheck className="w-12 h-12" />,
    metric: "Prioritized Fix List",
    features: [
      "Performance & Core Web Vitals Audit",
      "Security Vulnerability Scan",
      "Scalability & Load Testing",
      "Code Quality & Tech Debt Review",
      "Dependency & Vendor Risk Check",
      "Business-Impact-Ranked Fix List"
    ],
    process: [
      { title: "Scan", desc: "Run performance, security, and scalability checks against your live environment." },
      { title: "Diagnose", desc: "Review code quality and architecture for tech debt and hidden risk." },
      { title: "Prioritize", desc: "Rank every finding by business impact so engineering time goes to what matters." }
    ]
  },
  'branding': {
    title: "Branding",
    description: "Logo, visual identity system, and brand guidelines built to hold up across packaging, ads, and product — not just a logo file with no rules attached to keep it consistent as the brand scales.",
    icon: <Palette className="w-12 h-12" />,
    metric: "Full Identity System",
    features: [
      "Logo & Wordmark Design",
      "Color, Type & Visual System",
      "Brand Guidelines Documentation",
      "Packaging & Merchandise Application",
      "Tone of Voice Definition",
      "Brand Asset Library Handoff"
    ],
    process: [
      { title: "Discover", desc: "Understand positioning, audience, and competitive visual landscape before designing anything." },
      { title: "Design", desc: "Build the identity system — logo, color, type, and voice — as one coherent system." },
      { title: "Document", desc: "Ship brand guidelines and an asset library so the identity stays consistent at scale." }
    ]
  },
  'ui-ux-design': {
    title: "UI/UX Design",
    description: "Wireframes, prototypes, and interface design grounded in user research and conversion psychology — every screen justified by how it moves someone toward the action you actually want them to take.",
    icon: <MousePointerClick className="w-12 h-12" />,
    metric: "Research-Led Prototyping",
    features: [
      "User Research & Journey Mapping",
      "Wireframing & Information Architecture",
      "High-Fidelity Interactive Prototypes",
      "Conversion-Focused UI Design",
      "Usability Testing",
      "Design System Documentation"
    ],
    process: [
      { title: "Research", desc: "Map user journeys and friction points before touching a single wireframe." },
      { title: "Prototype", desc: "Build interactive, high-fidelity prototypes tested against real user behaviour." },
      { title: "Refine", desc: "Iterate against usability testing results and hand off a documented design system." }
    ]
  },
  'web-design': {
    title: "Web Design",
    description: "High-conversion website design — information architecture, visual system, and responsive layouts — handed off dev-ready so build doesn't stall waiting on design decisions mid-sprint.",
    icon: <Layout className="w-12 h-12" />,
    metric: "Dev-Ready Handoff",
    features: [
      "Information Architecture & Sitemap",
      "Visual System & Page Templates",
      "Responsive & Mobile-First Layouts",
      "Conversion-Focused Page Structure",
      "Dev-Ready Design File Handoff",
      "Design QA During Build"
    ],
    process: [
      { title: "Architect", desc: "Map the sitemap and information hierarchy against what actually converts." },
      { title: "Design", desc: "Build responsive, on-brand page templates ready to hand straight to development." },
      { title: "QA", desc: "Review the live build against design intent before launch, not after." }
    ]
  },
  'mobile-app-design': {
    title: "Mobile App Design",
    description: "iOS and Android interface design built around platform-native patterns — onboarding, navigation, and micro-interactions designed for retention, not just first-screen aesthetics.",
    icon: <Smartphone className="w-12 h-12" />,
    metric: "iOS + Android Native Patterns",
    features: [
      "Platform-Native UI Patterns (iOS/Android)",
      "Onboarding Flow Design",
      "Navigation & Information Architecture",
      "Micro-Interaction & Motion Design",
      "Accessibility-First Screen Design",
      "Developer Handoff Specs"
    ],
    process: [
      { title: "Map", desc: "Define the core user flows and platform conventions the app needs to respect." },
      { title: "Design", desc: "Build screens and micro-interactions around retention, not just visual polish." },
      { title: "Handoff", desc: "Deliver developer-ready specs and assets for a friction-free build." }
    ]
  },
  'landing-page-design': {
    title: "Landing Page Design",
    description: "Single-purpose, conversion-first landing pages built for a specific campaign or offer — structured around one clear call to action and tested against the exact traffic source it's built for.",
    icon: <Wand2 className="w-12 h-12" />,
    metric: "Single-CTA Conversion Focus",
    features: [
      "Offer-Specific Page Structure",
      "Single-CTA Conversion Design",
      "Copywriting & Messaging Hierarchy",
      "Mobile-First Responsive Build",
      "A/B Test-Ready Variants",
      "Speed-Optimized Page Build"
    ],
    process: [
      { title: "Brief", desc: "Lock the offer, audience, and traffic source the page needs to convert." },
      { title: "Design", desc: "Build a single-CTA page structured around that one conversion action." },
      { title: "Test", desc: "Ship A/B-ready variants and iterate against real conversion data." }
    ]
  },
  'mobile-app-development': {
    title: "Mobile App Development",
    description: "Native and cross-platform app builds — React Native or Swift/Kotlin depending on the requirement — shipped through App Store and Play Store review, not just handed off as source code and left for you to figure out.",
    icon: <Smartphone className="w-12 h-12" />,
    metric: "Native + Cross-Platform",
    features: [
      "React Native Cross-Platform Builds",
      "Native iOS (Swift) & Android (Kotlin)",
      "API & Backend Integration",
      "Push Notification & Deep Linking Setup",
      "App Store & Play Store Submission",
      "Post-Launch Monitoring & Updates"
    ],
    process: [
      { title: "Architect", desc: "Choose native or cross-platform based on performance and budget requirements." },
      { title: "Build", desc: "Develop and integrate against your backend and APIs with continuous QA." },
      { title: "Ship", desc: "Handle store submission, review, and post-launch monitoring end to end." }
    ]
  },
  'software-development': {
    title: "Software Development",
    description: "Custom internal tools and SaaS builds — from admin dashboards to full multi-tenant platforms — architected for the specific workflow you actually run, not a generic template you have to bend your process around.",
    icon: <FileCode2 className="w-12 h-12" />,
    metric: "Custom Internal Tooling",
    features: [
      "Custom Admin Dashboard Builds",
      "Multi-Tenant SaaS Architecture",
      "API Design & Third-Party Integration",
      "Role-Based Access Control",
      "Scalable Cloud Infrastructure Setup",
      "Ongoing Maintenance & Support"
    ],
    process: [
      { title: "Scope", desc: "Map the exact workflow the software needs to support, not a generic template." },
      { title: "Build", desc: "Architect and develop against real usage patterns, with scalability built in." },
      { title: "Support", desc: "Hand off with documentation and stay on for ongoing maintenance and iteration." }
    ]
  },
  'cms-development': {
    title: "CMS Development",
    description: "Headless and traditional CMS builds — Shopify, WordPress, Sanity, or a custom admin — so your team can ship content and product changes without filing a dev ticket for every small edit.",
    icon: <Layers className="w-12 h-12" />,
    metric: "Self-Serve Content Ops",
    features: [
      "Headless CMS Architecture (Sanity, etc.)",
      "Shopify & WordPress Custom Builds",
      "Content Modeling & Editor Experience",
      "Custom Admin Panel Development",
      "Migration From Legacy CMS",
      "Editor Training & Documentation"
    ],
    process: [
      { title: "Model", desc: "Define the content structure your team actually needs to move fast day to day." },
      { title: "Build", desc: "Implement the CMS and editor experience, headless or traditional as required." },
      { title: "Train", desc: "Hand off with documentation and training so the team is self-sufficient from day one." }
    ]
  },
  'blockchain-development': {
    title: "Blockchain Development",
    description: "Smart contract and dApp development for brands building loyalty, provenance, or token-gated experiences on-chain — engineered with the same security discipline as a payments system, because it functionally is one.",
    icon: <Link2 className="w-12 h-12" />,
    metric: "Audited Smart Contracts",
    features: [
      "Smart Contract Development (Solidity)",
      "Token & Loyalty Program Architecture",
      "dApp Frontend Development",
      "Security Audits & Testing",
      "Gas Optimization",
      "Multi-Chain Deployment Support"
    ],
    process: [
      { title: "Architect", desc: "Design the token, contract, and access logic against the exact use case." },
      { title: "Build & Audit", desc: "Develop and security-audit smart contracts before anything touches mainnet." },
      { title: "Deploy", desc: "Ship the dApp and contracts with gas-optimized, monitored deployment." }
    ]
  },
  'blockchain-integration': {
    title: "Blockchain Integration",
    description: "Wiring existing wallets, payment rails, or NFT/loyalty systems into your current stack — checkout, CRM, and backend — without a ground-up rebuild of infrastructure that already works.",
    icon: <Link2 className="w-12 h-12" />,
    metric: "Zero-Rebuild Wallet Integration",
    features: [
      "Wallet Connect & Authentication",
      "Crypto Payment Rail Integration",
      "NFT & Loyalty System Wiring",
      "Checkout & CRM Integration",
      "On-Chain Data Sync to Backend",
      "Compliance & Transaction Monitoring"
    ],
    process: [
      { title: "Audit", desc: "Review the existing stack to find the lowest-risk integration path." },
      { title: "Integrate", desc: "Wire wallets, payment rails, or on-chain systems into checkout, CRM, and backend." },
      { title: "Monitor", desc: "Set up transaction monitoring and compliance checks post-launch." }
    ]
  },
  'meme-marketing': {
    title: "MEME Marketing",
    description: "Culturally fluent, trend-jacked meme content built for organic reach — the kind of native, unmistakably-not-an-ad post that gets shared and saved instead of scrolled straight past.",
    icon: <Sparkles className="w-12 h-12" />,
    metric: "Native Trend-Jacked Content",
    features: [
      "Trend & Format Monitoring",
      "Rapid-Turnaround Meme Production",
      "Platform-Native Voice & Tone",
      "Brand-Safe Trend Filtering",
      "Community Reaction Tracking",
      "Weekly Content Batching"
    ],
    process: [
      { title: "Monitor", desc: "Track trending formats and cultural moments relevant to your audience daily." },
      { title: "Produce", desc: "Turn around brand-safe, on-trend content fast enough to still be relevant." },
      { title: "Measure", desc: "Track shares, saves, and sentiment to refine what actually lands next batch." }
    ]
  },
  'email-marketing': {
    title: "Email Marketing",
    description: "Campaign and newsletter strategy that turns your list into a genuine revenue channel — segmentation, copy, and design built to earn the open and the click, not just land in the inbox.",
    icon: <Mail className="w-12 h-12" />,
    metric: "List-to-Revenue Strategy",
    features: [
      "List Segmentation Strategy",
      "Campaign Calendar Planning",
      "Subject Line & Copywriting",
      "Template Design & Testing",
      "Deliverability & Sender Reputation Management",
      "Campaign Performance Reporting"
    ],
    process: [
      { title: "Segment", desc: "Break the list into groups that actually warrant different messaging." },
      { title: "Send", desc: "Plan and execute a campaign calendar built around real product and content moments." },
      { title: "Optimize", desc: "Test subject lines, send times, and design to lift open and click rates over time." }
    ]
  },
  'email-automation': {
    title: "Email Automation",
    description: "Welcome series, abandoned cart, post-purchase, and win-back flows built once and running forever — the highest-ROI channel in ecommerce, set up properly instead of left on a default template.",
    icon: <MailPlus className="w-12 h-12" />,
    metric: "Always-On Revenue Flows",
    features: [
      "Welcome & Onboarding Series",
      "Abandoned Cart & Browse Abandonment Flows",
      "Post-Purchase & Cross-Sell Sequences",
      "Win-Back & Re-Engagement Flows",
      "Dynamic Personalization & Segmentation",
      "Flow Performance Monitoring"
    ],
    process: [
      { title: "Map", desc: "Identify every lifecycle moment worth automating, from signup to win-back." },
      { title: "Build", desc: "Set up flows with proper segmentation and dynamic content, not generic templates." },
      { title: "Tune", desc: "Monitor flow performance monthly and iterate on the highest-revenue sequences." }
    ]
  },
  'crm-lead-automation': {
    title: "CRM & Lead Intake Automation",
    description: "A production AI agent that ingests inbound leads from website forms, WhatsApp, and email — classifying intent, extracting structured contact data, and staging qualified leads directly into your CRM pipeline with automatic follow-up scheduling. Built and running in production as part of our MarksOps agent suite.",
    icon: <Users className="w-12 h-12" />,
    metric: "5-Way Intent Classification",
    features: [
      "Omnichannel Lead Ingestion — Web, WhatsApp, Email",
      "AI Intent Classification (B2C, B2B Bulk, Dealer, Support, General)",
      "Structured Entity Extraction (contact, company, quantity, SKUs)",
      "Automated CRM Pipeline Staging",
      "24-Hour Follow-Up Activity Scheduling",
      "B2B & Dealer Tagging for Dunning Eligibility",
      "Real-Time High-Value Lead Alerts"
    ],
    process: [
      { title: "Ingest", desc: "Capture leads across website forms, WhatsApp, and inbox scans in real time or on a schedule." },
      { title: "Classify", desc: "Claude-powered intent classification and structured entity extraction for every inbound inquiry." },
      { title: "Route", desc: "Stage qualified leads into your CRM pipeline with tags, follow-up activities, and instant alerts to sales." }
    ]
  },
  'customer-support-automation': {
    title: "Customer Support AI Agent",
    description: "An AI support agent that handles order status, returns, complaints, and product queries across WhatsApp and email — replying in your brand's specific voice with live shipment and return-policy lookups, and a 4-point escalation matrix that hands off to humans the moment it matters.",
    icon: <MessageSquare className="w-12 h-12" />,
    metric: "Sub-2-Minute Brand-Voiced Replies",
    features: [
      "6-Category Intent Classification",
      "Live Courier Tracking & Order Lookups",
      "Return & Refund Policy Validation",
      "Multi-Brand Persona Response Generation",
      "4-Point Human Escalation Matrix",
      "Automated Helpdesk Ticket Staging",
      "Sentiment Detection & Fraud/Legal Keyword Alerts"
    ],
    process: [
      { title: "Classify", desc: "Detect intent and sentiment across every inbound WhatsApp and email message." },
      { title: "Resolve", desc: "Pull live tracking and order data, then reply in the correct brand voice within minutes." },
      { title: "Escalate", desc: "Automatically hand off to human agents on negative sentiment, high order value, or legal/fraud risk." }
    ]
  },
  'finance-bill-automation': {
    title: "Finance & Bill Ingestion Automation",
    description: "An AI agent that parses vendor invoices, ad platform bills, logistics freight bills, and bank transaction alerts — extracting tax breakdowns, classifying spend, and staging draft ERP entries with a strict zero-auto-posting mandate so a human always approves before anything posts.",
    icon: <FileText className="w-12 h-12" />,
    metric: "Zero Auto-Posting Safeguard",
    features: [
      "Multi-Source Bill Ingestion (Email, PDF, SMS Alerts)",
      "Tax Breakdown Extraction (CGST / SGST / IGST)",
      "5-Category Spend Classification",
      "Draft ERP Bill Staging — Never Auto-Posted",
      "Original Invoice Attachment Archiving",
      "Instant WhatsApp Approval Alerts",
      "SaaS Subscription & Renewal Tracking"
    ],
    process: [
      { title: "Ingest", desc: "Scan financial emails, PDF invoices, and card alerts from every vendor and platform you use." },
      { title: "Extract", desc: "Pull vendor, invoice number, PO reference, and full tax breakdown with high accuracy." },
      { title: "Stage", desc: "Create draft ERP bills and notify finance for approval — never posted automatically." }
    ]
  },
  'marketplace-price-monitoring': {
    title: "Marketplace Price Monitoring",
    description: "An AI agent that crawls your marketplace listings on Amazon and Flipkart twice daily, flags price deviations beyond 5% against your master pricing, and classifies the root cause — your own listing error, an unauthorized seller deviation, or a competitor undercutting you.",
    icon: <Search className="w-12 h-12" />,
    metric: "Twice-Daily Automated Crawls",
    features: [
      "Catalog Benchmark & MAP Management",
      "Automated Amazon & Flipkart Price Crawling",
      "5% Deviation Detection & Alerting",
      "Root-Cause Classification (Listing / Seller / Competitor)",
      "Anti-Bot Crawl Hygiene & Rate-Limit Handling",
      "Instant WhatsApp Deviation Alerts",
      "Weekly Price Health & Compliance Reporting"
    ],
    process: [
      { title: "Crawl", desc: "Pull live buy-box prices, seller identity, and stock across every active SKU, twice daily." },
      { title: "Detect", desc: "Compare against master pricing and MAP, flagging any deviation beyond the 5% tolerance band." },
      { title: "Alert", desc: "Classify root cause and dispatch high-priority alerts, backed by a weekly compliance report." }
    ]
  },
  'payment-reconciliation-automation': {
    title: "Payment Reconciliation Automation",
    description: "An AI agent that reconciles daily payment gateway settlements — Razorpay, CCAvenue — against your ERP sales orders, stages balanced draft bank journal entries, and flags failed payments, unmatched settlements, and refund spikes the moment they happen.",
    icon: <CreditCard className="w-12 h-12" />,
    metric: "4-Way Balanced Journal Staging",
    features: [
      "Daily Gateway Ingestion (Razorpay, CCAvenue)",
      "ERP Sales Order Matching by Order ID",
      "4-Way Draft Bank Journal Entry Staging",
      "Zero Auto-Posting — Human Approval Required",
      "High-Value Failed Payment Alerts (>₹5,000)",
      "Unmatched Settlement & UTR Discrepancy Flags",
      "Refund Spike Anomaly Detection"
    ],
    process: [
      { title: "Ingest", desc: "Pull T-1 captured, authorized, and failed payments plus settlement batches from every gateway." },
      { title: "Match", desc: "Cross-reference against ERP sales orders and classify each transaction as matched, unmatched, refund, or failed." },
      { title: "Stage", desc: "Create balanced draft journal entries and alert finance to anomalies in real time." }
    ]
  },
  'logistics-shipment-automation': {
    title: "Logistics & Shipment Automation",
    description: "An AI agent that processes real-time courier webhooks, runs scheduled customer tracking broadcasts in your brand voice, flags shipments delayed past their estimated delivery date, logs RTO events automatically, and reconciles daily COD remittances against your ERP.",
    icon: <Truck className="w-12 h-12" />,
    metric: "Real-Time Shipment Status Sync",
    features: [
      "Real-Time Courier Webhook Ingestion",
      "Daily Brand-Voiced Tracking Broadcasts",
      "Delayed Shipment Detection (>2 Days Past EDD)",
      "Automated RTO Event Logging",
      "Proactive Customer Delay Notifications",
      "Daily COD Remittance Reconciliation",
      "Multi-Brand Persona Messaging (playR.in, streetPlayR, Players Club)"
    ],
    process: [
      { title: "Track", desc: "Ingest live shipment status events and normalize them into your order records in real time." },
      { title: "Notify", desc: "Send scheduled, brand-voiced tracking updates and proactive alerts on delays." },
      { title: "Reconcile", desc: "Match daily COD remittance reports against orders, staging discrepancies for finance review." }
    ]
  },
  'accounting-sync-automation': {
    title: "Accounting Sync (Tally Integration)",
    description: "An AI agent that bridges your ERP into TallyPrime via Tally's native XML Gateway — validating GSTIN and state codes, mapping your chart of accounts to Tally ledgers, and staging unaccepted vouchers that always require accountant sign-off before they post.",
    icon: <Calculator className="w-12 h-12" />,
    metric: "GST-Compliant Voucher Staging",
    features: [
      "Sales, Purchase, Payment & Receipt Voucher Staging",
      "Zero Auto-Acceptance — Accountant Sign-Off Required",
      "Chart of Accounts to Tally Ledger Mapping",
      "GSTIN & State Code Syntax Validation",
      "Inter-State vs. Intra-State Tax Classification",
      "Day Book & Trial Balance Extraction",
      "Period-End ERP-to-Tally Reconciliation"
    ],
    process: [
      { title: "Validate", desc: "Check GSTIN format, state codes, and tax classification before building any voucher." },
      { title: "Map", desc: "Translate ERP accounts to the correct Tally ledgers and construct the XML voucher envelope." },
      { title: "Stage", desc: "Push unaccepted vouchers into Tally for accountant review — never auto-posted." }
    ]
  },
  'inventory-sync-automation': {
    title: "Inventory Sync (OMS ↔ ERP)",
    description: "An AI agent that keeps multi-warehouse stock aligned between your OMS and ERP in near real time — enforcing clear source-of-truth rules for live stock versus costing, flagging discrepancies over a defined threshold, and handling fulfillment and return stock events automatically.",
    icon: <Package className="w-12 h-12" />,
    metric: "Multi-Warehouse Stock Sync",
    features: [
      "Multi-Warehouse Inventory Synchronization",
      "OMS-Authoritative Live Stock, ERP-Authoritative Costing",
      "Discrepancy Alerts Beyond 10-Unit Threshold",
      "Resilient Ingestion with CSV Fallback",
      "SKU Catalog Mapping Integrity Checks",
      "Event-Driven Fulfillment Stock Decrements",
      "Automated QC & Return Restocking"
    ],
    process: [
      { title: "Sync", desc: "Reconcile live available stock across every warehouse against ERP records on a scheduled sweep." },
      { title: "Detect", desc: "Flag any SKU discrepancy beyond threshold and generate structured audit logs." },
      { title: "Resolve", desc: "Process fulfillment and return events automatically, isolating damaged stock to quarantine." }
    ]
  }
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const data = serviceData[slug || 'performance'] || serviceData['performance'];

  const serviceJsonLd = generateJsonLd('Service', {
    name: data.title,
    description: data.description,
    provider: {
      "@type": "Organization",
      "name": "Qala Labs"
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "name": "Growth Services",
      "itemListElement": data.features.map((f: string) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": f
        }
      }))
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={data.title} 
        description={data.description} 
        jsonLd={JSON.parse(serviceJsonLd)}
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Badge className="bg-blue-600 mb-6 px-4 py-1 rounded-full">Service Detail</Badge>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
                {data.title}
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                {data.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 rounded-2xl text-lg shadow-xl shadow-blue-200">
                    Book Free Audit <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <div className="px-8 py-4 bg-slate-900 text-white rounded-2xl flex items-center gap-3">
                  <Target className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Benchmark</p>
                    <p className="text-xl font-black">{data.metric}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-square bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="text-blue-600 scale-[3]">
                  {data.icon}
                </div>
                <div className="absolute top-10 right-10 w-20 h-20 bg-blue-100 rounded-full blur-2xl" />
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-32">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {data.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl">
              <h3 className="text-2xl font-bold mb-8">Our Process</h3>
              <div className="space-y-8">
                {data.process.map((step: any, i: number) => (
                  <div key={i} className="relative pl-10">
                    <div className="absolute left-0 top-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">
                      {i + 1}
                    </div>
                    <h4 className="font-bold mb-1">{step.title}</h4>
                    <p className="text-sm text-slate-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 mb-20">
            <div className="max-w-3xl mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-xs font-black uppercase tracking-widest mb-6">
                How We Research
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                We build every strategy on what we've actually audited — not assumptions.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Before we recommend anything, we run the same audit process on your category that we run on our own work: a structured teardown across content, services, pricing, SEO, and AI answer-engine visibility (AEO). Here's what that looked like the last time we ran it.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-slate-100">
                <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">Step 1</div>
                <h4 className="font-bold text-slate-900 mb-2">Competitive Teardown</h4>
                <p className="text-sm text-slate-600 leading-relaxed">We audited 6 direct competitor sites across positioning, service lines, and pricing transparency to find where the category is under-serving buyers.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100">
                <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">Step 2</div>
                <h4 className="font-bold text-slate-900 mb-2">SEO & AEO Audit</h4>
                <p className="text-sm text-slate-600 leading-relaxed">We checked meta structure, H1 usage, and — critically — structured data (FAQPage, HowTo, Organization schema) to see who's actually built to be cited by ChatGPT, Gemini, and Perplexity, not just ranked by Google.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100">
                <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">Step 3</div>
                <h4 className="font-bold text-slate-900 mb-2">Gap &amp; Pattern Analysis</h4>
                <p className="text-sm text-slate-600 leading-relaxed">We compared every finding into one table — content, services, pricing, SEO, AEO side by side — to isolate what's rare, valuable, and repeatable rather than cosmetic.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100">
                <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-3">Step 4</div>
                <h4 className="font-bold text-slate-900 mb-2">Ship &amp; Prove It</h4>
                <p className="text-sm text-slate-600 leading-relaxed">We apply the findings to our own site first — schema markup, pricing clarity, service pages like this one — before we ever recommend it to a client. Our MarksOps agent suite is the same standard: built and running in production, not a pitch deck.</p>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <p className="text-slate-600 text-sm max-w-xl">
                Want the same audit run on your category before we scope {data.title.toLowerCase()}? We'll show you exactly where your competitors are weak — with evidence, not opinions.
              </p>
              <Link to="/contact" className="flex-shrink-0">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-2xl font-bold">
                  Request Our Audit <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mb-20">
            <div className="max-w-3xl mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 text-xs font-black uppercase tracking-widest mb-6">
                Our Execution Process
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Research tells us what to fix. This is how we actually fix it.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Every {data.title.toLowerCase()} engagement runs through the same four-stage execution cycle — tracked live in{' '}
                <Link to="/q-manager" className="text-blue-600 font-bold hover:underline">Q Manager</Link>, our client dashboard, so you always know exactly what stage you're in.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Audit & Diagnose', duration: 'Week 1', desc: 'We apply the research findings to your specific accounts, tracking, and unit economics to lock the highest-leverage fixes.' },
                { step: '02', title: 'Architect & Build', duration: 'Weeks 2–4', desc: 'We build the campaigns, systems, or agents this service requires — instrumented from day one, not bolted on after.' },
                { step: '03', title: 'Run & Tune', duration: 'Weeks 5–8', desc: 'We test, tune, and iterate against weekly reviews — every change logged and visible in your dashboard in real time.' },
                { step: '04', title: 'Report & Compound', duration: 'Ongoing', desc: 'Weekly reporting and monthly strategy reviews inside Q Manager keep the roadmap current as results compound.' },
              ].map((s, i) => (
                <div key={i} className="relative p-6 bg-white border border-slate-200 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-black text-slate-100">{s.step}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{s.duration}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{s.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetail;