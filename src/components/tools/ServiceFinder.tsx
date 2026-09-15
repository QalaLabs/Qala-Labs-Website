"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Bot,
  Search,
  BarChart3,
  Users,
  Zap,
  Globe2,
  Database,
  Rocket,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

// Each problem maps to one or more of Qala Labs' real services (see ServicesGrid.tsx)
const problems = [
  {
    id: 'traffic',
    label: "Not enough traffic or leads coming in",
    icon: Search,
    services: ['ai-search-visibility', 'performance-marketing']
  },
  {
    id: 'conversion',
    label: "Traffic comes in but doesn't convert",
    icon: Rocket,
    services: ['cro']
  },
  {
    id: 'ad-efficiency',
    label: "Ad spend feels inefficient, ROAS is dropping",
    icon: BarChart3,
    services: ['performance-marketing', 'analytics-data']
  },
  {
    id: 'manual-work',
    label: "My team is buried in manual, repetitive work",
    icon: Bot,
    services: ['ai-automation']
  },
  {
    id: 'website',
    label: "Website is slow, clunky, or hard to manage",
    icon: Globe2,
    services: ['web-dev']
  },
  {
    id: 'social',
    label: "Social presence is inconsistent or underperforming",
    icon: Users,
    services: ['social-media']
  },
  {
    id: 'creative',
    label: "Ad creative is stale, we can't produce enough variants",
    icon: Zap,
    services: ['ai-creative']
  },
  {
    id: 'visibility',
    label: "No clear visibility into what's actually working",
    icon: Database,
    services: ['analytics-data']
  },
  {
    id: 'plateau',
    label: "Overall growth has plateaued, need bigger-picture strategy",
    icon: Rocket,
    services: ['ecommerce-growth']
  }
];

const serviceLibrary: Record<string, { title: string; description: string; metric: string; href: string }> = {
  'ai-automation': {
    title: "Enterprise AI Automation",
    description: "Custom AI agents and workflow automation that eliminate the manual layer, from CRM to lead qualification to internal ops.",
    metric: "80% Efficiency Lift",
    href: "/services/ai-automation"
  },
  'ai-search-visibility': {
    title: "AI Search Visibility",
    description: "Technical SEO + AI Overviews (AEO) + LLM citation strategy (GEO) bundled into one service so you're the answer wherever customers search.",
    metric: "3× Organic Visibility",
    href: "/services/seo-aeo-geo"
  },
  'performance-marketing': {
    title: "Performance Marketing",
    description: "Aggressive bidding strategy plus proprietary attribution across Meta, TikTok, and Google, optimized for return on every rupee.",
    metric: "ROAS 28x",
    href: "/services/performance"
  },
  'social-media': {
    title: "Social Media Management",
    description: "Content strategy, community management, and trend hijacking that keeps your brand relevant to your core audience.",
    metric: "12% Avg. Engagement",
    href: "/services/social-media"
  },
  'ai-creative': {
    title: "AI Creative Production",
    description: "AI video, AI-scripted UGC, and ElevenLabs voiceovers combined with human direction to ship 100+ ad variants a week.",
    metric: "3× Ad Engagement",
    href: "/services/creative"
  },
  'web-dev': {
    title: "Web Development",
    description: "Headless commerce builds that load in under a second, decoupled from Shopify for full design freedom and speed.",
    metric: "<1s Load Time",
    href: "/services/web-dev"
  },
  'cro': {
    title: "CRO + Retention Engineering",
    description: "Heatmap audits, A/B testing, AI-triggered email flows and LTV maximisation, fixing the funnel you're already paying to fill.",
    metric: "+42% CVR Lift",
    href: "/services/cro"
  },
  'analytics-data': {
    title: "Analytics & Data",
    description: "Custom dashboards and server-side tracking that give you one accurate source of truth for LTV, CAC, and margin.",
    metric: "100% Accuracy",
    href: "/services/data"
  },
  'ecommerce-growth': {
    title: "eCommerce Growth",
    description: "A fractional growth team aligning product roadmap, inventory, and marketing strategy to scale you to 8 figures and beyond.",
    metric: "310% YoY Growth",
    href: "/services/strategy"
  }
};

const ServiceFinder = () => {
  const [step, setStep] = useState(0); // 0 = pick problems, 1 = email gate, 2 = results
  const [selected, setSelected] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleProblem = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const getRankedServices = () => {
    const counts: Record<string, number> = {};
    selected.forEach((problemId) => {
      const problem = problems.find((p) => p.id === problemId);
      problem?.services.forEach((s) => {
        counts[s] = (counts[s] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([serviceId]) => serviceId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const matchedServices = getRankedServices();
    const leadData = {
      problems: selected.map((id) => problems.find((p) => p.id === id)?.label),
      matched_services: matchedServices.map((id) => serviceLibrary[id]?.title),
      status: 'qualified'
    };

    const { error } = await supabase.from('leads').insert({
      email,
      tool_used: 'service_finder',
      data: leadData
    });

    if (error) {
      setLoading(false);
      showError("Something went wrong. Please try again.");
      return;
    }

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tool_used: 'service_finder', data: leadData })
      });
    } catch (err) {
      console.error("Email trigger failed:", err);
    }

    setLoading(false);
    showSuccess("Your recommendations are ready!");
    setStep(2);
  };

  const rankedServices = getRankedServices();

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="pick"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-100"
          >
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">Growth Bottleneck Finder</p>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">
                  What's slowing your growth down right now?
                </h3>
                <p className="text-slate-500 mt-2">Select everything that applies. We'll match you to the right service(s).</p>
              </div>

              <div className="grid gap-3">
                {problems.map((problem) => {
                  const Icon = problem.icon;
                  const isSelected = selected.includes(problem.id);
                  return (
                    <button
                      key={problem.id}
                      type="button"
                      onClick={() => toggleProblem(problem.id)}
                      className={`group flex items-center gap-4 p-5 border rounded-2xl transition-all text-left ${
                        isSelected
                          ? "bg-blue-600 border-blue-600"
                          : "bg-slate-50 hover:bg-slate-100 border-slate-100"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? "bg-white text-blue-600" : "bg-white text-slate-400"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`font-bold flex-1 transition-colors ${isSelected ? "text-white" : "text-slate-700"}`}>
                        {problem.label}
                      </span>
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? "bg-white border-white" : "border-slate-300"
                      }`}>
                        {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <Button
                onClick={() => setStep(1)}
                disabled={selected.length === 0}
                className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xl shadow-xl shadow-blue-500/20 transition-all disabled:opacity-40"
              >
                See My Recommendations <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="email"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-100"
          >
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">Matching you to the right services...</h3>
                <p className="text-slate-500">Where should we send your personalized recommendation?</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Work Email</Label>
                  <Input
                    type="email"
                    required
                    placeholder="ceo@brand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-xl text-lg px-6"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xl shadow-xl shadow-blue-500/20 transition-all">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Show My Recommendations"}
                </Button>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="text-sm font-bold text-slate-400 hover:text-slate-600 flex items-center gap-2 mx-auto"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-[3.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10 space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-xs font-black uppercase tracking-widest mb-6">
                  <CheckCircle2 className="w-4 h-4" /> Recommendation Ready
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-2">Here's what will move the needle</h3>
                <p className="text-slate-400">Based on {selected.length} bottleneck{selected.length !== 1 ? 's' : ''} you flagged</p>
              </div>

              <div className="grid gap-4">
                {rankedServices.map((serviceId) => {
                  const service = serviceLibrary[serviceId];
                  if (!service) return null;
                  return (
                    <a
                      key={serviceId}
                      href={service.href}
                      className="block bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-black">{service.title}</h4>
                        <span className="text-xs font-black uppercase tracking-widest text-blue-400">{service.metric}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{service.description}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-400 mt-3">
                        View service <ChevronRight className="w-4 h-4" />
                      </span>
                    </a>
                  );
                })}
              </div>

              <a
                href="/contact"
                className="flex items-center justify-center gap-2 w-full h-16 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-xl transition-all"
              >
                Book a Free Strategy Call <ChevronRight className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceFinder;
