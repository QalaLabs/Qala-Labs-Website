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
    title: "AI Agents & Automation",
    description: "We build autonomous AI agents that handle customer support, lead qualification, and internal operations. By integrating LLMs with your existing stack, we reduce manual overhead by up to 80%.",
    icon: <Bot className="w-12 h-12" />,
    metric: "80% Efficiency Lift",
    features: [
      "Custom AI Support Agents",
      "Automated Lead Qualification",
      "n8n & Make.com Workflows",
      "LLM Integration (OpenAI/Claude)",
      "Internal Process Automation"
    ],
    process: [
      { title: "Audit", desc: "Mapping your manual bottlenecks and data flows." },
      { title: "Build", desc: "Developing custom agents and workflow logic." },
      { title: "Deploy", desc: "Seamless integration into your existing stack." }
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
    title: "Creative Production",
    description: "High-velocity creative testing is the heartbeat of modern scale. We produce 100+ high-converting ad variants weekly.",
    icon: <Zap className="w-12 h-12" />,
    metric: "35% Lower CPA",
    features: [
      "Creator-Led Content (UGC)",
      "Direct Response Video Editing",
      "Static Ad Design",
      "Hook & CTA Testing",
      "Creative Strategy Workshops"
    ],
    process: [
      { title: "Ideation", desc: "Data-driven hook and angle research." },
      { title: "Production", desc: "Rapid filming and editing cycles." },
      { title: "Analysis", desc: "Performance feedback loop for next batch." }
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
    title: "Conversion Optimization",
    description: "Stop leaking revenue at the finish line. We eliminate friction in your customer journey from landing page to checkout.",
    icon: <Search className="w-12 h-12" />,
    metric: "+42% CVR Lift",
    features: [
      "Heatmap & Session Analysis",
      "Rigorous A/B Testing",
      "Checkout Flow Optimization",
      "Landing Page Design",
      "User Psychology Audits"
    ],
    process: [
      { title: "Analyze", desc: "Identify drop-off points in the funnel." },
      { title: "Hypothesize", desc: "Create data-backed test variations." },
      { title: "Test", desc: "Run experiments to find winning changes." }
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