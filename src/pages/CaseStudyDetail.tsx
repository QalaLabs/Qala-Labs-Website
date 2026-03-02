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
  Users
} from 'lucide-react';
import { motion } from "framer-motion";

const caseStudiesData: Record<string, any> = {
  'skincare-scale-10m': {
    title: "Scaling a Skincare Brand to $10M ARR",
    category: "E-com Scale",
    heroImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200",
    metrics: [
      { label: "ROAS", value: "4.2x", icon: <Target className="w-5 h-5" /> },
      { label: "Growth", value: "310%", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Revenue", value: "$10M+", icon: <BarChart3 className="w-5 h-5" /> },
      { label: "New Customers", value: "45k+", icon: <Users className="w-5 h-5" /> }
    ],
    challenge: "The brand was stuck at $200k/mo with rising CPAs and inconsistent attribution. Their creative testing was slow, and they lacked a clear retention strategy.",
    solution: "We deployed our 'Scale Engine' framework, starting with a full data infrastructure rebuild. We implemented server-side tracking and launched a high-velocity creator-led creative engine.",
    results: [
      "Reduced blended CPA by 35% within 60 days",
      "Scaled monthly spend from $50k to $250k while maintaining efficiency",
      "Implemented Klaviyo flows that increased LTV by 22%",
      "Successfully launched 3 new SKUs with 100% sell-through in 48 hours"
    ]
  },
  'legacy-retail-transformation': {
    title: "Digital Transformation for Legacy Retailer",
    category: "Transformation",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    metrics: [
      { label: "ROAS", value: "3.8x", icon: <Target className="w-5 h-5" /> },
      { label: "Growth", value: "120%", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Revenue", value: "$25M+", icon: <BarChart3 className="w-5 h-5" /> },
      { label: "Efficiency", value: "+45%", icon: <Zap className="w-5 h-5" /> }
    ],
    challenge: "A 20-year-old retail brand was struggling to transition their brick-and-mortar success to the digital space. Their legacy ERP didn't sync with their web store, leading to massive inventory issues.",
    solution: "We rebuilt their entire stack using Headless Shopify and integrated a custom middleware to sync their ERP in real-time. We then launched a full-funnel performance strategy to capture digital demand.",
    results: [
      "120% YoY growth in digital revenue",
      "Reduced manual inventory management time by 80%",
      "Achieved a 3.8x blended ROAS across all digital channels",
      "Successfully migrated 500k+ customer records without downtime"
    ]
  },
  'fashion-global-expansion': {
    title: "Global Expansion for Fashion Creator",
    category: "Global Scale",
    heroImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200",
    metrics: [
      { label: "ROAS", value: "5.1x", icon: <Target className="w-5 h-5" /> },
      { label: "Growth", value: "450%", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Revenue", value: "$5M+", icon: <BarChart3 className="w-5 h-5" /> },
      { label: "Markets", value: "3 New", icon: <Users className="w-5 h-5" /> }
    ],
    challenge: "A UK-based creator brand wanted to expand into the US and UAE but didn't know how to handle localized creative, shipping, or cross-border ad optimization.",
    solution: "We implemented a multi-store architecture with localized currency and shipping. We built a global scale engine that used market-specific creator content to drive high-intent traffic.",
    results: [
      "Reached $1M/mo in US revenue within 4 months",
      "Maintained a 5.1x ROAS during aggressive international scaling",
      "Localized creative outperformed generic ads by 3x",
      "Built a global community of 200k+ active customers"
    ]
  }
};

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const data = caseStudiesData[slug || 'skincare-scale-10m'] || caseStudiesData['skincare-scale-10m'];

  return (
    <div className="min-h-screen bg-white">
      <SEO title={data.title} description={data.challenge} />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-blue-600 mb-6 px-4 py-1 rounded-full">{data.category}</Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              {data.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {data.metrics.map((m: any, i: number) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="text-blue-600 mb-3">{m.icon}</div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                  <p className="text-2xl font-black text-slate-900">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[3rem] overflow-hidden h-[500px] mb-16 shadow-2xl">
              <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              <div className="md:col-span-2 space-y-12">
                <section>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-blue-600" /> The Challenge
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {data.challenge}
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-blue-600" /> The Solution
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {data.solution}
                  </p>
                </section>
              </div>

              <aside className="space-y-8">
                <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-xl">
                  <h3 className="text-2xl font-bold mb-6">Key Results</h3>
                  <ul className="space-y-4">
                    {data.results.map((r: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 bg-blue-600 text-white rounded-[2.5rem] shadow-xl text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready for these results?</h3>
                  <p className="text-blue-100 mb-6 text-sm">Book a free audit to see how we can scale your brand.</p>
                  <Link to="/contact">
                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-6 rounded-xl">
                      Book Free Audit
                    </Button>
                  </Link>
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudyDetail;