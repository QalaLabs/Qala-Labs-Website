import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import {
  ArrowRight, Bot, Workflow, Shield, Clock, BarChart3,
  MessageSquare, Database, Cpu, CheckCircle2, Zap, Users
} from 'lucide-react';

const metrics = [
  { value: '80%', label: 'reduction in manual reporting hours for enterprise clients' },
  { value: '24/7', label: 'AI agents operating without human supervision' },
  { value: '3x', label: 'faster lead qualification with AI scoring models' },
  { value: '₹40L+', label: 'annual cost savings per enterprise deployment' },
];

const useCases = [
  {
    icon: MessageSquare,
    title: 'AI Lead Qualification',
    description: 'Deploy intelligent agents that score, segment, and route inbound leads based on fit — before your sales team picks up the phone.',
    outcomes: ['85% reduction in unqualified demo calls', 'Real-time lead scoring via CRM', 'Automated follow-up sequences'],
  },
  {
    icon: BarChart3,
    title: 'Automated Reporting & Analytics',
    description: 'Replace 15-hour manual reporting cycles with AI agents that pull, clean, and synthesise data from every platform into executive dashboards.',
    outcomes: ['Daily P&L dashboards without manual work', 'Cross-channel ROAS attribution', 'Anomaly detection & budget alerts'],
  },
  {
    icon: MessageSquare,
    title: 'Customer Support AI',
    description: 'Train AI on your product knowledge base to handle Tier 1 support at scale — resolving 70%+ of tickets without human intervention.',
    outcomes: ['Sub-30-second first response time', 'Seamless human handoff for complex cases', 'Multilingual support (EN, HI, TA, AR)'],
  },
  {
    icon: Database,
    title: 'Data Pipeline Automation',
    description: 'Connect disparate data sources — Shopify, Meta Ads, Google Analytics, CRMs — into a single automated data warehouse with zero manual ETL.',
    outcomes: ['Real-time inventory & revenue sync', 'Automated cohort analysis', 'Custom metric tracking without engineers'],
  },
  {
    icon: Workflow,
    title: 'Marketing Workflow Automation',
    description: 'End-to-end campaign orchestration — from creative briefing to ad trafficking to post-campaign reporting — automated and auditable.',
    outcomes: ['Campaign launch time cut from 3 days to 3 hours', 'Creative performance auto-tagging', 'Budget reallocation triggers'],
  },
  {
    icon: Users,
    title: 'Internal Knowledge Agents',
    description: 'Build private AI assistants trained on your SOPs, playbooks, and documentation — so every team member has instant access to institutional knowledge.',
    outcomes: ['Onboarding time reduced by 60%', 'SOP compliance enforcement', 'Version-controlled knowledge management'],
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery & Mapping',
    description: 'We audit your existing workflows, tech stack, and bottlenecks to identify automation opportunities with the highest ROI. Two-week engagement, fully documented.',
  },
  {
    step: '02',
    title: 'Architecture & Design',
    description: 'We design the AI system architecture — data flows, agent logic, integration points, and security model. No black boxes.',
  },
  {
    step: '03',
    title: 'Build & Deploy',
    description: 'Our engineers build and integrate the AI agents into your existing stack using battle-tested infrastructure. Staging environment before production.',
  },
  {
    step: '04',
    title: 'Monitor & Optimise',
    description: 'Ongoing monitoring, model fine-tuning, and performance optimisation with weekly reporting and quarterly strategy reviews.',
  },
];

const techStack = [
  'Claude (Anthropic)', 'GPT-4o', 'Gemini Pro', 'LangChain / LangGraph',
  'n8n', 'Zapier', 'Make.com', 'Supabase',
  'PostgreSQL', 'Redis', 'Pinecone', 'Weaviate',
  'Node.js', 'Python', 'TypeScript', 'REST & GraphQL APIs',
];

const EnterpriseAIAutomation = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Enterprise AI Automation Agency India | AI Agents & Workflow Automation | Qala Labs"
        description="Build enterprise AI agents that automate lead qualification, reporting, customer support, and marketing workflows. India's specialist AI automation agency for B2B and enterprise brands."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Enterprise AI Automation', url: '/enterprise-ai-automation' },
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-24 bg-[#06070D] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#06070D] to-blue-950/20" />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-blue-600/4 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-8"
          >
            <Bot className="w-3.5 h-3.5" /> Enterprise AI Automation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.05] max-w-4xl"
          >
            AI Agents That Work
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              While You Sleep.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
          >
            We design, build, and deploy custom AI automation systems for enterprise and high-growth brands — replacing manual workflows with intelligent agents that scale without headcount.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-colors shadow-xl shadow-blue-500/20 group"
            >
              Request Enterprise Proposal <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 px-8 py-4 rounded-2xl font-black text-lg transition-colors"
            >
              View Case Studies
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{m.value}</div>
                <div className="text-sm text-blue-100 leading-snug">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-xs font-black uppercase tracking-widest mb-6"
            >
              Use Cases
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              What we automate.
            </h2>
            <p className="text-xl text-slate-600">
              Every deployment is custom-built — but here are the workflows we've automated most successfully for enterprise clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600/15 transition-colors">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{uc.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{uc.description}</p>
                  <ul className="space-y-2">
                    {uc.outcomes.map((o, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{o}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#06070D]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-black uppercase tracking-widest mb-6"
            >
              How We Work
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              From discovery to deployment.
            </h2>
            <p className="text-slate-400">A structured four-phase engagement that delivers running AI agents in 8–12 weeks.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-7xl font-black text-white/5 absolute -top-4 -left-2 leading-none select-none">{p.step}</div>
                <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8">
                  <div className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">{p.step}</div>
                  <h3 className="text-xl font-black text-white mb-3">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-widest mb-6"
            >
              <Cpu className="w-3.5 h-3.5" /> Technology Stack
            </motion.div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Built on enterprise-grade infrastructure.
            </h2>
            <p className="text-slate-600">We're model-agnostic and stack-agnostic — we choose the right tools for your use case, not ours.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Security note */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Enterprise security & compliance by default.</h3>
              <p className="text-slate-600">All deployments include data isolation, role-based access control, audit logging, and SOC-2-aligned infrastructure. Your data never trains public models. Available on cloud or self-hosted.</p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black transition-colors group"
            >
              Discuss Security <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#06070D]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-blue-400 font-black uppercase tracking-widest text-xs mb-6">Let's Build</p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Ready to replace manual
              <br />work with AI?
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
              Tell us your highest-cost manual workflow. We'll come back with a technical proposal, ROI model, and implementation timeline in 5 business days.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-colors shadow-xl shadow-blue-500/20 group"
              >
                Request Enterprise Proposal <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ai-audit"
                className="inline-flex items-center gap-2 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 px-10 py-5 rounded-2xl font-black text-lg transition-colors"
              >
                Get Free AI Audit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EnterpriseAIAutomation;
