"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Bot,
  MessageCircle,
  BarChart3,
  Users,
  Search,
  FileText,
  Workflow,
  Headphones,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';

// Each problem maps to one or more AI agent types we build
const problems = [
  {
    id: 'lead-response',
    label: "Leads go cold because no one replies fast enough",
    icon: MessageCircle,
    agents: ['lead-qualification']
  },
  {
    id: 'support-volume',
    label: "Support tickets/DMs pile up, team can't keep up",
    icon: Headphones,
    agents: ['support-agent']
  },
  {
    id: 'manual-data-entry',
    label: "Someone manually copies data between tools all day",
    icon: Workflow,
    agents: ['workflow-automation']
  },
  {
    id: 'reporting',
    label: "Reports/dashboards are built by hand every week",
    icon: BarChart3,
    agents: ['analytics-agent']
  },
  {
    id: 'content-volume',
    label: "We can't produce enough content, copy, or ad variants",
    icon: FileText,
    agents: ['content-agent']
  },
  {
    id: 'research',
    label: "Research and competitor tracking eats hours every week",
    icon: Search,
    agents: ['research-agent']
  },
  {
    id: 'internal-ops',
    label: "Internal requests (HR, IT, ops) bottleneck on one person",
    icon: Users,
    agents: ['ops-agent']
  },
  {
    id: 'sales-followup',
    label: "Sales follow-ups and CRM updates get forgotten",
    icon: Bot,
    agents: ['sales-agent', 'lead-qualification']
  }
];

const agentLibrary: Record<string, { title: string; description: string; metric: string; href: string }> = {
  'lead-qualification': {
    title: "Lead Qualification Agent",
    description: "Responds to every inbound lead in seconds, qualifies them against your ICP, and books the call — no rep required to touch the first reply.",
    metric: "< 60s Response Time",
    href: "/services/ai-automation"
  },
  'support-agent': {
    title: "Customer Support Agent",
    description: "Handles tier-1 support across chat, WhatsApp, and email — answers FAQs, pulls order status, and escalates only what actually needs a human.",
    metric: "70% Tickets Deflected",
    href: "/services/ai-automation"
  },
  'workflow-automation': {
    title: "Workflow Automation Agent",
    description: "Connects your CRM, sheets, and internal tools so data moves itself — no more copy-pasting between systems.",
    metric: "80% Efficiency Lift",
    href: "/services/ai-automation"
  },
  'analytics-agent': {
    title: "Reporting & Analytics Agent",
    description: "Pulls live data from every channel and ships a formatted report to your inbox or Slack on schedule, no spreadsheet wrangling.",
    metric: "100% Accuracy",
    href: "/services/data"
  },
  'content-agent': {
    title: "Content & Creative Agent",
    description: "Generates on-brand ad copy, captions, and video variants at scale, then routes them for a quick human approval pass.",
    metric: "3× Output Volume",
    href: "/services/creative"
  },
  'research-agent': {
    title: "Research & Market Intel Agent",
    description: "Continuously tracks competitors, pricing, and market signals and summarizes what changed, so your team starts from insight, not raw data.",
    metric: "Hours Saved Weekly",
    href: "/services/ai-automation"
  },
  'ops-agent': {
    title: "Internal Ops Agent",
    description: "Triages and routes internal requests, whether HR, IT, or procurement, so nothing sits in one person's inbox waiting.",
    metric: "80% Efficiency Lift",
    href: "/services/ai-automation"
  },
  'sales-agent': {
    title: "Sales Follow-Up Agent",
    description: "Keeps every deal moving, automatic follow-ups, CRM updates, and next-step reminders, so leads never go quiet.",
    metric: "+42% Pipeline Velocity",
    href: "/services/ai-automation"
  }
};

const AIAgentFinder = () => {
  const [step, setStep] = useState(0); // 0 = pick problems, 1 = email gate, 2 = results
  const [selected, setSelected] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleProblem = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const getRankedAgents = () => {
    const counts: Record<string, number> = {};
    selected.forEach((problemId) => {
      const problem = problems.find((p) => p.id === problemId);
      problem?.agents.forEach((a) => {
        counts[a] = (counts[a] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([agentId]) => agentId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const matchedAgents = getRankedAgents();
    const leadData = {
      problems: selected.map((id) => problems.find((p) => p.id === id)?.label),
      matched_agents: matchedAgents.map((id) => agentLibrary[id]?.title),
      status: 'qualified'
    };

    const { error } = await supabase.from('leads').insert({
      email,
      tool_used: 'ai_agent_finder',
      data: leadData
    });

    if (error) {
      setLoading(false);
      showError("Something went wrong. Please try again.");
      return;
    }

    try {
      const res = await fetch('/api/lead.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tool_used: 'ai_agent_finder', data: leadData })
      });
      if (!res.ok) {
        console.error("Email trigger failed:", await res.text());
        showError("Recommendations ready, but the confirmation email couldn't be sent.");
      }
    } catch (err) {
      console.error("Email trigger failed:", err);
      showError("Recommendations ready, but the confirmation email couldn't be sent.");
    }

    setLoading(false);
    showSuccess("Your AI agent recommendations are ready!");
    setStep(2);
  };

  const rankedAgents = getRankedAgents();

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
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">AI Agent Finder</p>
                <h3 className="text-3xl font-black text-slate-900 leading-tight">
                  What's eating your team's time right now?
                </h3>
                <p className="text-slate-500 mt-2">Select everything that applies. We'll match you to the right AI agent(s).</p>
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
                See My AI Agent Matches <ChevronRight className="ml-2 w-5 h-5" />
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
                  <Bot className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">Matching you to the right agent(s)...</h3>
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
                <h3 className="text-3xl md:text-4xl font-black mb-2">Here's the AI agent stack for you</h3>
                <p className="text-slate-400">Based on {selected.length} bottleneck{selected.length !== 1 ? 's' : ''} you flagged</p>
              </div>

              <div className="grid gap-4">
                {rankedAgents.map((agentId) => {
                  const agent = agentLibrary[agentId];
                  if (!agent) return null;
                  return (
                    <a
                      key={agentId}
                      href={agent.href}
                      className="block bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-black">{agent.title}</h4>
                        <span className="text-xs font-black uppercase tracking-widest text-blue-400">{agent.metric}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{agent.description}</p>
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
                Book a Free AI Strategy Call <ChevronRight className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAgentFinder;
