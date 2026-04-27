import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Target, Eye, Users, Zap, BarChart3 } from 'lucide-react';

const heroStats = [
  { value: '28x', label: 'Highest ROAS achieved on Meta Ads', sub: 'D2C fashion brand, 90-day campaign' },
  { value: '3.4M', label: 'Organic YouTube views', sub: 'D2C wellness brand, content strategy' },
  { value: '₹12', label: 'Cost per qualified property lead', sub: 'Real estate developer, Meta Ads' },
  { value: '80%', label: 'Reduction in manual reporting hours', sub: 'Enterprise AI automation deployment' },
  { value: '4.1x', label: 'Average blended ROAS across active clients', sub: 'Portfolio average, last 12 months' },
  { value: '48hr', label: 'Average time to first AI search citation', sub: 'After GEO optimisation implementation' },
];

const campaigns = [
  {
    category: 'Performance Marketing',
    icon: Target,
    color: 'blue',
    results: [
      {
        title: 'Meta Ads — D2C Fashion Brand',
        metrics: [
          { label: 'ROAS', value: '28x' },
          { label: 'CPP reduction', value: '64%' },
          { label: 'Revenue from paid', value: '₹2.4Cr' },
        ],
        description: 'Full-funnel Meta Ads strategy with 40+ UGC creatives, server-side tracking, and dynamic product ads across prospecting and retargeting.',
        tags: ['Meta Ads', 'UGC Creative', 'D2C', 'Server-Side Tracking'],
      },
      {
        title: 'Google Shopping — eCommerce Aggregator',
        metrics: [
          { label: 'ROAS', value: '11.2x' },
          { label: 'CPC reduction', value: '38%' },
          { label: 'SKUs managed', value: '4,200+' },
        ],
        description: 'Feed optimisation, Performance Max campaigns, and custom bidding scripts for a large eCommerce aggregator with complex inventory.',
        tags: ['Google Shopping', 'PMax', 'Feed Optimisation', 'Automation'],
      },
      {
        title: 'Lead Gen — Real Estate Developer',
        metrics: [
          { label: 'CPL', value: '₹12' },
          { label: 'Lead-to-site-visit', value: '68%' },
          { label: 'Projects launched', value: '6' },
        ],
        description: 'Meta lead gen campaigns with instant form and landing page split tests, combined with WhatsApp nurturing automation for warm lead conversion.',
        tags: ['Meta Ads', 'Lead Generation', 'Real Estate', 'WhatsApp Automation'],
      },
      {
        title: 'UK Market Expansion — Nutrivend',
        metrics: [
          { label: 'CPL (UK)', value: '£4.20' },
          { label: 'Leads in 60 days', value: '1,200+' },
          { label: 'ROAS', value: '6.8x' },
        ],
        description: 'Cold audience lead generation campaigns across the UK market for a health & wellness vending brand entering a new geography.',
        tags: ['Meta Ads', 'UK Market', 'International Expansion', 'Lead Gen'],
      },
    ],
  },
  {
    category: 'AI Search & SEO',
    icon: Eye,
    color: 'violet',
    results: [
      {
        title: 'AEO + GEO — B2B SaaS Platform',
        metrics: [
          { label: 'AI citation rate', value: '+340%' },
          { label: 'Organic traffic', value: '+82%' },
          { label: 'Qualified trials', value: '2.8x' },
        ],
        description: 'Full SEO + AEO + GEO overhaul including entity building, structured content for AI answer capture, and technical SEO remediation.',
        tags: ['SEO', 'AEO', 'GEO', 'SaaS', 'Content Strategy'],
      },
      {
        title: 'Local SEO + AI Visibility — Real Estate Brand',
        metrics: [
          { label: 'Local rank positions', value: 'Top 3' },
          { label: 'Organic leads/month', value: '+120' },
          { label: 'ChatGPT citations', value: '12 queries' },
        ],
        description: 'Hyper-local SEO strategy combined with knowledge graph entity building to dominate both Google Maps and AI-generated recommendations.',
        tags: ['Local SEO', 'AEO', 'Real Estate', 'Entity Building'],
      },
    ],
  },
  {
    category: 'AI Automation',
    icon: Zap,
    color: 'emerald',
    results: [
      {
        title: 'Reporting Automation — Enterprise Brand',
        metrics: [
          { label: 'Reporting time saved', value: '80%' },
          { label: 'Annual cost saving', value: '₹42L' },
          { label: 'Data sources unified', value: '11' },
        ],
        description: 'Custom AI data pipeline that unified 11 marketing and commerce platforms into a single automated executive dashboard with anomaly alerts.',
        tags: ['AI Automation', 'Data Engineering', 'Enterprise', 'Reporting'],
      },
      {
        title: 'Lead Qualification Bot — B2B SaaS',
        metrics: [
          { label: 'Unqualified demos', value: '-78%' },
          { label: 'Sales cycle', value: '-30%' },
          { label: 'Leads processed/day', value: '500+' },
        ],
        description: 'Custom AI lead scoring and qualification agent integrated into HubSpot, routing only ICP-matched leads to the sales team.',
        tags: ['AI Agents', 'Lead Scoring', 'HubSpot', 'B2B SaaS'],
      },
    ],
  },
  {
    category: 'Creative & Influencer',
    icon: Users,
    color: 'orange',
    results: [
      {
        title: 'YouTube Content Strategy — D2C Brand',
        metrics: [
          { label: 'Organic views', value: '3.4M' },
          { label: 'Subscribers gained', value: '42K' },
          { label: 'Content pieces', value: '60+' },
        ],
        description: 'Long-form educational content strategy with SEO-optimised scripts, thumbnail testing, and distribution across YouTube and Instagram Reels.',
        tags: ['Content Strategy', 'YouTube', 'SEO', 'D2C'],
      },
      {
        title: 'CSK Influencer Campaign',
        metrics: [
          { label: 'Influencer reach', value: '8.2M' },
          { label: 'Engagement rate', value: '6.4%' },
          { label: 'Campaign ROAS', value: '4.7x' },
        ],
        description: 'Multi-tier influencer marketing campaign during IPL season with nano, micro, and macro influencers across Instagram and YouTube.',
        tags: ['Influencer Marketing', 'IPL', 'Cricket', 'Meta Ads'],
      },
    ],
  },
];

const colorMap: Record<string, { icon: string; tag: string; tagText: string; metric: string }> = {
  blue: { icon: 'text-blue-600 bg-blue-600/10', tag: 'bg-blue-600/10', tagText: 'text-blue-700', metric: 'text-blue-600' },
  violet: { icon: 'text-violet-600 bg-violet-600/10', tag: 'bg-violet-600/10', tagText: 'text-violet-700', metric: 'text-violet-600' },
  emerald: { icon: 'text-emerald-600 bg-emerald-600/10', tag: 'bg-emerald-600/10', tagText: 'text-emerald-700', metric: 'text-emerald-600' },
  orange: { icon: 'text-orange-600 bg-orange-600/10', tag: 'bg-orange-600/10', tagText: 'text-orange-700', metric: 'text-orange-600' },
};

const tabs = campaigns.map((c) => c.category);

const Results = () => {
  const [activeTab, setActiveTab] = useState(0);
  const active = campaigns[activeTab];
  const colors = colorMap[active.color];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Results & Performance Metrics | Qala Labs Agency Proof"
        description="Real campaign results from Qala Labs: 28x ROAS on Meta Ads, 3.4M YouTube views, ₹12 CPL for real estate, 80% reporting time saved with AI automation. Numbers that speak for themselves."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Results', url: '/results' },
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-24 bg-[#06070D] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-[#06070D] to-[#06070D]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-8"
          >
            <TrendingUp className="w-3.5 h-3.5" /> Results & Proof of Work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.05] max-w-4xl"
          >
            Numbers That
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Don't Lie.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mb-16 leading-relaxed"
          >
            Every number below is from a real campaign, a real client, and a real outcome. We track CPL, ROAS, revenue attribution, and qualified pipeline — not impressions and vanity metrics.
          </motion.p>

          {/* Hero stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {heroStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{s.value}</div>
                <div className="text-sm text-slate-300 font-bold mb-1">{s.label}</div>
                <div className="text-xs text-slate-500">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Results */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-xs font-black uppercase tracking-widest mb-6"
            >
              Campaign Breakdown
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Results across every channel.
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {tabs.map((tab, i) => {
              const tabCampaign = campaigns[i];
              const TabIcon = tabCampaign.icon;
              const tabColors = colorMap[tabCampaign.color];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm transition-all ${
                    activeTab === i
                      ? `${tabColors.icon} border-2 border-current`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <TabIcon className="w-4 h-4" /> {tab}
                </button>
              );
            })}
          </div>

          {/* Results cards */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {active.results.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-black text-slate-900 mb-4">{result.title}</h3>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {result.metrics.map((m, j) => (
                    <div key={j} className="text-center p-3 rounded-2xl bg-white border border-slate-100">
                      <div className={`text-xl font-black ${colors.metric}`}>{m.value}</div>
                      <div className="text-xs text-slate-500 leading-snug mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-5">{result.description}</p>

                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag, j) => (
                    <span key={j} className={`px-2.5 py-1 rounded-xl ${colors.tag} ${colors.tagText} text-xs font-bold`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies CTA */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Want the full story behind these numbers?</h3>
            <p className="text-slate-600">Read detailed case studies with methodology, challenges, and learnings.</p>
          </div>
          <Link
            to="/case-studies"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black transition-colors group"
          >
            Read Case Studies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Industry performance */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Performance by industry.</h2>
            <p className="text-slate-600">Benchmarks from campaigns run in the last 12 months.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                industry: 'D2C & eCommerce',
                stats: [
                  { label: 'Avg. Meta ROAS', value: '7.2x' },
                  { label: 'Avg. Google ROAS', value: '5.8x' },
                  { label: 'UGC win rate', value: '74%' },
                ],
                color: 'blue',
              },
              {
                industry: 'Real Estate',
                stats: [
                  { label: 'Avg. CPL (Meta)', value: '₹18' },
                  { label: 'Lead-to-visit', value: '62%' },
                  { label: 'Avg. campaign ROAS', value: '4.2x' },
                ],
                color: 'emerald',
              },
              {
                industry: 'SaaS & Tech',
                stats: [
                  { label: 'Trial signups', value: '+2.8x' },
                  { label: 'CAC reduction', value: '55%' },
                  { label: 'Organic growth', value: '+82%' },
                ],
                color: 'violet',
              },
              {
                industry: 'B2B Services',
                stats: [
                  { label: 'CPL reduction', value: '40%' },
                  { label: 'SQL conversion', value: '3x' },
                  { label: 'Pipeline velocity', value: '+45%' },
                ],
                color: 'orange',
              },
            ].map((ind, i) => {
              const indColors = colorMap[ind.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-100"
                >
                  <h3 className={`text-lg font-black mb-6 ${indColors.metric}`}>{ind.industry}</h3>
                  <div className="space-y-4">
                    {ind.stats.map((s, j) => (
                      <div key={j} className="flex justify-between items-center">
                        <span className="text-slate-600 text-sm">{s.label}</span>
                        <span className={`font-black text-sm ${indColors.metric}`}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
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
            <p className="text-blue-400 font-black uppercase tracking-widest text-xs mb-6">Your Turn</p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Ready to add your name
              <br />to this list?
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
              Start with a free AI Growth Audit. We'll benchmark your current performance against these numbers and show you what's possible.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/ai-audit"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-colors shadow-xl shadow-blue-500/20 group"
              >
                Get Free Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 px-10 py-5 rounded-2xl font-black text-lg transition-colors"
              >
                Talk to Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Results;
