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
  Mail,
  Palette,
  MessageCircle,
  ShoppingBag,
  Package,
  CreditCard,
  Store,
  Megaphone,
  TrendingUp,
  Wallet,
  Handshake
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
  'influencer-marketing': {
    title: "Influencer Marketing",
    description: "We run end-to-end influencer campaigns — creator matchmaking, deal negotiation, content briefs, and engagement analysis — across nano to celebrity tiers. From regional creator networks to national sports and entertainment partnerships, we deliver measurable reach, not vanity impressions.",
    icon: <Users className="w-12 h-12" />,
    metric: "4M+ Reach per Campaign",
    features: [
      "Creator Discovery & Matchmaking",
      "Deal Negotiation & Contracting",
      "Content Briefs & Approval Workflows",
      "Nano to Celebrity Tier Sourcing",
      "Sports & Entertainment Partnerships",
      "Engagement & Reach Reporting"
    ],
    process: [
      { title: "Match", desc: "Identify creators whose audience and voice fit your brand, not just their follower count." },
      { title: "Negotiate", desc: "Handle deal terms, contracts, and content requirements end-to-end." },
      { title: "Measure", desc: "Track reach, engagement, and conversion lift per creator and campaign." }
    ]
  },
  'email-sms-lifecycle': {
    title: "Email & SMS Lifecycle",
    description: "Retention is cheaper than acquisition. We design and run Klaviyo-grade lifecycle flows — welcome series, abandoned cart, post-purchase, win-back, and VIP segmentation — engineered to lift repeat purchase rate without adding a rupee of ad spend.",
    icon: <Mail className="w-12 h-12" />,
    metric: "+35% Repeat Revenue",
    features: [
      "Welcome & Onboarding Series",
      "Abandoned Cart Recovery Flows",
      "Post-Purchase & Cross-Sell Sequences",
      "Win-Back & Reactivation Campaigns",
      "VIP & Cohort Segmentation",
      "Deliverability & List Hygiene Management"
    ],
    process: [
      { title: "Map", desc: "Segment your list and map every lifecycle stage from first visit to repeat buyer." },
      { title: "Build", desc: "Design and deploy the flows in Klaviyo (or your ESP of choice), tuned to your catalog." },
      { title: "Optimise", desc: "A/B test subject lines, send times, and offers to lift open, click, and repeat rate." }
    ]
  },
  'brand-identity': {
    title: "Brand Identity",
    description: "Full brand identity systems — naming, logo, visual language, packaging, and guidelines — built for brands that are rebranding or launching fresh. We've taken legacy manufacturers to modern D2C-ready identities without losing what made them recognisable.",
    icon: <Palette className="w-12 h-12" />,
    metric: "Full Identity in 6 Weeks",
    features: [
      "Naming & Brand Strategy",
      "Logo & Visual Identity System",
      "Packaging & Label Design",
      "Brand Guidelines Documentation",
      "Legacy-to-Modern Rebrand Strategy",
      "Launch-Ready Asset Kits"
    ],
    process: [
      { title: "Discover", desc: "Understand what already works — heritage, equity, and audience perception — before changing it." },
      { title: "Design", desc: "Build the full identity system: logo, typography, colour, packaging, and voice." },
      { title: "Deliver", desc: "Ship guidelines and asset kits your team and vendors can use consistently." }
    ]
  },
  'whatsapp-marketing': {
    title: "WhatsApp Marketing",
    description: "WhatsApp is India's highest-intent channel. We build broadcast campaigns, cart-recovery flows, and conversational commerce journeys on Interakt/Convertway-grade infrastructure — turning your customer list into a direct revenue channel with open rates traditional email can't touch.",
    icon: <MessageCircle className="w-12 h-12" />,
    metric: "70%+ Open Rate",
    features: [
      "Broadcast Campaign Strategy",
      "Cart Recovery & Order Update Flows",
      "Conversational Commerce Journeys",
      "Catalog & Click-to-WhatsApp Ads Integration",
      "Interakt / Convertway Infrastructure Setup",
      "Opt-In Compliance & List Management"
    ],
    process: [
      { title: "Setup", desc: "Configure your WhatsApp Business API and connect it to your store and CRM." },
      { title: "Automate", desc: "Build cart-recovery, order-update, and conversational flows that feel human." },
      { title: "Scale", desc: "Layer in broadcast campaigns and click-to-WhatsApp ads to grow the channel." }
    ]
  },
  'marketplace-management': {
    title: "Marketplace Management",
    description: "Full-service seller operations for Amazon, Flipkart, and Myntra — listing optimisation, catalog health, A+ content, buy-box defense, and marketplace ads — backed by real inventory-sync infrastructure so what you sell online matches what's actually on the shelf.",
    icon: <ShoppingBag className="w-12 h-12" />,
    metric: "3 Marketplaces, 1 Team",
    features: [
      "Listing Optimisation & A+ Content",
      "Catalog Health & Compliance Monitoring",
      "Buy-Box Defense & Pricing Strategy",
      "Amazon / Flipkart / Myntra Ads Management",
      "Marketplace-Specific SEO",
      "Unified Reporting Across Marketplaces"
    ],
    process: [
      { title: "Audit", desc: "Review catalog health, listing quality, and ad performance across every marketplace." },
      { title: "Optimise", desc: "Fix listings, content, and pricing to win buy-box and improve organic rank." },
      { title: "Manage", desc: "Ongoing ads management and catalog operations, reported from one dashboard." }
    ]
  },
  'inventory-fulfillment': {
    title: "Inventory & Fulfillment",
    description: "Stock sync, reconciliation, and returns management across every channel you sell on. We connect your warehouse, marketplaces, and storefront into one live inventory truth — so you stop overselling and start planning fulfillment with real numbers.",
    icon: <Package className="w-12 h-12" />,
    metric: "Zero Oversell Guarantee",
    features: [
      "Multi-Channel Stock Sync",
      "Warehouse & 3PL Integration",
      "Returns & RTO Management",
      "Reorder Point & Demand Planning",
      "Unicommerce / Increff-Style Ops Setup",
      "Real-Time Inventory Dashboards"
    ],
    process: [
      { title: "Connect", desc: "Integrate your warehouse, marketplaces, and storefront into one inventory system." },
      { title: "Sync", desc: "Automate stock updates in real time to eliminate overselling and stockouts." },
      { title: "Plan", desc: "Use live data to forecast demand and plan fulfillment ahead of stockouts." }
    ]
  },
  'payment-reconciliation': {
    title: "Payment Reconciliation",
    description: "GST, UTR, and multi-gateway reconciliation — automated. We match every payout across Razorpay, marketplace settlements, and bank statements against your books, flagging discrepancies before they become a finance headache.",
    icon: <CreditCard className="w-12 h-12" />,
    metric: "100% Ledger Match",
    features: [
      "GST & UTR Reconciliation",
      "Multi-Gateway Payout Matching",
      "Marketplace Settlement Reconciliation",
      "Automated Discrepancy Flagging",
      "ERP / Accounting System Sync",
      "Monthly Reconciliation Reports"
    ],
    process: [
      { title: "Map", desc: "Map every payment source — gateways, marketplaces, bank feeds — into one ledger view." },
      { title: "Automate", desc: "Build automated matching rules with strict error handling for zero-loss translation." },
      { title: "Reconcile", desc: "Flag and resolve discrepancies monthly, with a clean audit trail for finance." }
    ]
  },
  'd2c-storefront': {
    title: "D2C Storefront Build",
    description: "A dedicated Shopify/headless storefront build for brands where the store itself is the buying decision — merchandising, subscriptions, and checkout customisation beyond what a general web-dev retainer covers.",
    icon: <Store className="w-12 h-12" />,
    metric: "Launch in 4 Weeks",
    features: [
      "Shopify / Headless Storefront Build",
      "Merchandising & Collection Strategy",
      "Subscription & Bundle Setup",
      "Checkout Customisation",
      "Theme & App Consolidation",
      "Post-Launch QA & Handover"
    ],
    process: [
      { title: "Design", desc: "Merchandising-led storefront design built around how you actually sell." },
      { title: "Build", desc: "Shopify or headless build with subscriptions, bundles, and checkout customisation." },
      { title: "Launch", desc: "QA, migration, and handover with documentation for your team." }
    ]
  },
  'marketing-agent': {
    title: "Marketing Agent",
    description: "Ad optimization, creative testing, and content/hashtag strategy — run by AI, approved by humans. The Marketing Agent mirrors our Marketing Captain and its specialists: it proposes budget shifts and creative swaps, you approve, it executes.",
    icon: <Megaphone className="w-12 h-12" />,
    metric: "Human-Approved Autonomy",
    features: [
      "Automated Budget & Bid Optimisation",
      "AI-Driven Creative Testing",
      "Content & Hashtag Strategy Generation",
      "Human-Approval Gate on Every Action",
      "Cross-Channel Performance Monitoring",
      "Weekly Recommendation Digest"
    ],
    process: [
      { title: "Connect", desc: "Link your ad accounts and content channels to the Marketing Captain." },
      { title: "Propose", desc: "The agent surfaces budget, bid, and creative recommendations daily." },
      { title: "Approve", desc: "You approve or reject each action — the agent executes only what's greenlit." }
    ]
  },
  'sales-agent': {
    title: "Sales Agent",
    description: "Lead scoring, deal forecasting, and outreach sequencing, tuned to your pipeline. The Sales Agent and its specialists watch every deal stage and surface the ones about to slip.",
    icon: <TrendingUp className="w-12 h-12" />,
    metric: "Pipeline, Always Scored",
    features: [
      "AI Lead Scoring",
      "Deal Forecasting & Slip Detection",
      "Automated Outreach Sequencing",
      "Pipeline Stage Analysis",
      "CRM-Native Integration",
      "Human-Approval Gate on Outreach"
    ],
    process: [
      { title: "Score", desc: "Every lead and open deal is scored and ranked continuously." },
      { title: "Forecast", desc: "The agent flags deals at risk of slipping before your team notices." },
      { title: "Act", desc: "Approve outreach sequences and next steps the agent recommends." }
    ]
  },
  'finance-agent': {
    title: "Finance Agent",
    description: "Invoice processing, GST/UTR reconciliation, and ROI calculation without the manual spreadsheet layer. Zero-loss data translation between your ERP, payment gateways, and books.",
    icon: <Wallet className="w-12 h-12" />,
    metric: "Zero-Loss Reconciliation",
    features: [
      "Automated Invoice Processing",
      "GST / UTR Reconciliation",
      "Campaign & Channel ROI Calculation",
      "ERP-to-Accounting Sync",
      "Strict Error Handling & Audit Trail",
      "Human-Approval Gate on Postings"
    ],
    process: [
      { title: "Ingest", desc: "Connect invoices, gateway payouts, and ERP records into one pipeline." },
      { title: "Reconcile", desc: "The agent matches records and flags discrepancies with zero data loss." },
      { title: "Approve", desc: "Your finance team reviews and approves postings before they're final." }
    ]
  },
  'operations-agent': {
    title: "Operations Agent",
    description: "Inventory control, resource allocation, and workflow optimization across your stack — the Operations Agent keeps stock, staffing, and fulfillment in sync.",
    icon: <Cpu className="w-12 h-12" />,
    metric: "One Live Ops Picture",
    features: [
      "Real-Time Inventory Monitoring",
      "Resource & Staffing Allocation",
      "Workflow Bottleneck Detection",
      "Fulfillment & 3PL Coordination",
      "Cross-System Ops Dashboard",
      "Human-Approval Gate on Reallocation"
    ],
    process: [
      { title: "Monitor", desc: "The agent watches inventory, workflows, and resourcing in real time." },
      { title: "Recommend", desc: "It surfaces reallocation and process fixes as they're needed." },
      { title: "Approve", desc: "Your ops lead approves changes before they go live." }
    ]
  },
  'influencer-agent': {
    title: "Influencer Agent",
    description: "Brand matchmaking, deal negotiation, and engagement analysis for creator partnerships — run at a speed and scale manual outreach can't match.",
    icon: <Handshake className="w-12 h-12" />,
    metric: "Creator Deals, Scaled",
    features: [
      "AI Creator Discovery & Matchmaking",
      "Automated Outreach & Negotiation Support",
      "Engagement & Fraud Analysis",
      "Contract & Deliverable Tracking",
      "Campaign Performance Rollups",
      "Human-Approval Gate on Deals"
    ],
    process: [
      { title: "Discover", desc: "The agent surfaces creators matched to your audience and budget." },
      { title: "Negotiate", desc: "It drafts terms and tracks deliverables against contracts." },
      { title: "Approve", desc: "Your team signs off on deals before they're confirmed." }
    ]
  },
  'attribution-engine': {
    title: "Attribution Engine",
    description: "The flagship semantic, intent-weighted attribution capability — sold standalone. Know which channel, creative, and touchpoint actually drove the sale, not just which one was last-clicked.",
    icon: <Target className="w-12 h-12" />,
    metric: "True Multi-Touch Attribution",
    features: [
      "Semantic, Intent-Weighted Attribution Modeling",
      "Cross-Channel Touchpoint Mapping",
      "Server-Side Event Collection",
      "Clean-Causality Reporting",
      "Integration with Existing Ad Stack",
      "Custom Attribution Dashboards"
    ],
    process: [
      { title: "Instrument", desc: "Deploy server-side tracking across every channel and touchpoint." },
      { title: "Model", desc: "Apply intent-weighted attribution instead of last-click or first-click defaults." },
      { title: "Report", desc: "See true channel and creative contribution in a dashboard built for your team." }
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetail;