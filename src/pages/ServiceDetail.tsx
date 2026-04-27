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
  Users
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