"use client";

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
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

const CaseStudyDetail = () => {
  const { slug } = useParams();

  // In a real app, you'd fetch this from Supabase based on the slug
  const caseData = {
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
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO title={caseData.title} description={caseData.challenge} />
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
            <Badge className="bg-blue-600 mb-6 px-4 py-1 rounded-full">{caseData.category}</Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              {caseData.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {caseData.metrics.map((m, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="text-blue-600 mb-3">{m.icon}</div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
                  <p className="text-2xl font-black text-slate-900">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[3rem] overflow-hidden h-[500px] mb-16 shadow-2xl">
              <img src={caseData.heroImage} alt={caseData.title} className="w-full h-full object-cover" />
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              <div className="md:col-span-2 space-y-12">
                <section>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-blue-600" /> The Challenge
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {caseData.challenge}
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-blue-600" /> The Solution
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {caseData.solution}
                  </p>
                </section>
              </div>

              <aside className="space-y-8">
                <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-xl">
                  <h3 className="text-2xl font-bold mb-6">Key Results</h3>
                  <ul className="space-y-4">
                    {caseData.results.map((r, i) => (
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
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-6 rounded-xl">
                    Book Free Audit
                  </Button>
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;