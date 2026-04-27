import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Monitor, ShoppingBag, Briefcase, CheckCircle2, TrendingUp } from 'lucide-react';

const industries = [
  {
    id: 'real-estate',
    icon: Building2,
    label: 'Real Estate',
    headline: 'Fill your pipeline with qualified property buyers and investors.',
    description: 'Real estate brands need a different playbook — high intent, long sales cycles, and channel diversity. We combine performance lead gen, AI-powered nurturing, and hyper-local content to turn cold audiences into commission-ready conversations.',
    color: 'blue',
    stats: [
      { value: '₹12', label: 'average cost per qualified property lead' },
      { value: '4.2x', label: 'ROAS on Meta lead gen campaigns' },
      { value: '68%', label: 'lead-to-site-visit conversion via AI follow-up' },
    ],
    services: [
      'Meta & Google Ads for property launches',
      'WhatsApp lead nurturing automation',
      'AI-powered property recommendation chatbots',
      'Hyper-local SEO for developer & broker websites',
      'Virtual tour production & paid promotion',
      'Investor targeting via LinkedIn & programmatic',
    ],
    brands: ['Residential developers', 'Commercial real estate', 'PropTech platforms', 'Real estate brokerages'],
  },
  {
    id: 'saas',
    icon: Monitor,
    label: 'SaaS',
    headline: 'Drive qualified pipeline and lower your CAC with content-led growth.',
    description: 'SaaS growth in 2026 runs on content authority, product-led acquisition, and precise demand gen. We combine AEO/GEO for organic discovery with performance marketing for paid pipeline — all tracked to pipeline, not pageviews.',
    color: 'violet',
    stats: [
      { value: '2.8x', label: 'increase in qualified trial signups' },
      { value: '55%', label: 'reduction in CAC through content-led funnels' },
      { value: '#1', label: 'AI search visibility achieved for 4 SaaS clients' },
    ],
    services: [
      'SEO, AEO & GEO for SaaS category keywords',
      'Product-led growth content strategy',
      'LinkedIn demand generation campaigns',
      'G2 & Capterra review velocity programs',
      'Competitor SEO displacement campaigns',
      'AI search visibility for category queries',
    ],
    brands: ['B2B SaaS platforms', 'Dev tools & API products', 'Vertical SaaS (HR, Finance, Legal)', 'Marketplace & PLG startups'],
  },
  {
    id: 'd2c',
    icon: ShoppingBag,
    label: 'D2C',
    headline: 'Scale profitably with performance marketing that actually works.',
    description: 'DTC brands live and die on CAC:LTV. We run Meta and Google Ads with server-side tracking, test creative at velocity, and build retention systems that compound revenue — so you scale spend without sacrificing margin.',
    color: 'emerald',
    stats: [
      { value: '28x', label: 'ROAS achieved on Meta Ads (highest in portfolio)' },
      { value: '3.4M', label: 'organic YouTube views for a D2C brand' },
      { value: '4.1x', label: 'average blended ROAS across active DTC clients' },
    ],
    services: [
      'Meta & Google Ads management (performance)',
      'UGC & creative production at scale',
      'Server-side tracking & attribution',
      'Email & SMS retention marketing',
      'Amazon Ads & marketplace growth',
      'Influencer & creator marketing',
    ],
    brands: ['Fashion & apparel', 'Health & wellness', 'Food & beverage', 'Beauty & personal care', 'Sports & outdoor'],
  },
  {
    id: 'b2b',
    icon: Briefcase,
    label: 'B2B',
    headline: 'Build pipeline, not just awareness.',
    description: 'B2B marketing has a demand generation problem — too much top-of-funnel activity, not enough pipeline. We run account-based marketing, LinkedIn campaigns, and AI-powered outbound that ties every rupee to opportunities created.',
    color: 'orange',
    stats: [
      { value: '3x', label: 'faster MQL-to-SQL conversion with AI lead scoring' },
      { value: '40%', label: 'lower CPL via intent-driven LinkedIn targeting' },
      { value: '6–8 wk', label: 'average time to first qualified opportunity' },
    ],
    services: [
      'Account-based marketing (ABM) strategy',
      'LinkedIn Ads & organic authority building',
      'AI-powered outbound sequences',
      'B2B SEO & thought leadership content',
      'Demand gen & intent-based targeting',
      'Sales enablement content & collateral',
    ],
    brands: ['Professional services firms', 'Manufacturing & industrial', 'Enterprise software vendors', 'B2B marketplaces'],
  },
];

const colorMap: Record<string, { bg: string; text: string; badge: string; badgeText: string; stat: string }> = {
  blue: {
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    badge: 'bg-blue-600/10',
    badgeText: 'text-blue-700',
    stat: 'text-blue-600',
  },
  violet: {
    bg: 'bg-violet-600',
    text: 'text-violet-600',
    badge: 'bg-violet-600/10',
    badgeText: 'text-violet-700',
    stat: 'text-violet-600',
  },
  emerald: {
    bg: 'bg-emerald-600',
    text: 'text-emerald-600',
    badge: 'bg-emerald-600/10',
    badgeText: 'text-emerald-700',
    stat: 'text-emerald-600',
  },
  orange: {
    bg: 'bg-orange-600',
    text: 'text-orange-600',
    badge: 'bg-orange-600/10',
    badgeText: 'text-orange-700',
    stat: 'text-orange-600',
  },
};

const Industries = () => {
  const [activeIndustry, setActiveIndustry] = useState('real-estate');
  const active = industries.find((ind) => ind.id === activeIndustry)!;
  const colors = colorMap[active.color];
  const Icon = active.icon;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Industry-Specific Marketing & AI Solutions | Real Estate, SaaS, D2C, B2B | Qala Labs"
        description="Qala Labs builds tailored AI and performance marketing strategies for Real Estate, SaaS, D2C, and B2B brands. Vertical expertise, measurable outcomes."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Industries', url: '/industries' },
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-24 bg-[#06070D] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#06070D] to-slate-900/50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-slate-300 text-xs font-black uppercase tracking-widest mb-8"
          >
            <TrendingUp className="w-3.5 h-3.5" /> Industries
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.05] max-w-4xl"
          >
            We Know
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400">
              Your Market.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
          >
            Generic marketing gets generic results. We build category-specific strategies for Real Estate, SaaS, D2C, and B2B brands — combining performance data, AI automation, and deep vertical knowledge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {industries.map((ind) => {
              const IndIcon = ind.icon;
              const indColors = colorMap[ind.color];
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustry(ind.id)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm transition-all ${
                    activeIndustry === ind.id
                      ? `${indColors.bg} text-white shadow-lg`
                      : 'bg-white/10 text-slate-400 hover:text-white hover:bg-white/15 border border-white/10'
                  }`}
                >
                  <IndIcon className="w-4 h-4" />
                  {ind.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Active Industry Detail */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.badge} ${colors.badgeText} text-xs font-black uppercase tracking-widest mb-6`}>
                <Icon className="w-3.5 h-3.5" />
                {active.label}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                {active.headline}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {active.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-10">
                {active.stats.map((s, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className={`text-2xl font-black mb-1 ${colors.stat}`}>{s.value}</div>
                    <div className="text-xs text-slate-500 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/ai-audit"
                  className={`inline-flex items-center gap-2 ${colors.bg} text-white px-8 py-4 rounded-2xl font-black transition-colors group`}
                >
                  Get Free Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 hover:border-slate-400 px-8 py-4 rounded-2xl font-black transition-colors"
                >
                  View Case Studies
                </Link>
              </div>
            </motion.div>

            <motion.div
              key={activeIndustry + '-right'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <h3 className="text-lg font-black text-slate-900 mb-6">What we do for {active.label}</h3>
                <ul className="space-y-3">
                  {active.services.map((service, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${colors.text}`} />
                      <span className="text-slate-700 text-sm leading-snug">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-[#06070D]">
                <h3 className="text-lg font-black text-white mb-4">Who we work with</h3>
                <div className="flex flex-wrap gap-2">
                  {active.brands.map((brand, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-white/10 text-slate-300 text-xs font-bold">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries strip */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Explore all industries.</h2>
            <p className="text-slate-600">Each vertical gets a strategy built for its buyers, its economics, and its channels.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => {
              const IndIcon = ind.icon;
              const indColors = colorMap[ind.color];
              return (
                <motion.button
                  key={ind.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => {
                    setActiveIndustry(ind.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${indColors.badge} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <IndIcon className={`w-5 h-5 ${indColors.text}`} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{ind.label}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{ind.description}</p>
                  <div className={`mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest ${indColors.text} group-hover:gap-2 transition-all`}>
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.button>
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
            <p className="text-blue-400 font-black uppercase tracking-widest text-xs mb-6">Get Started</p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Your industry is competitive.
              <br />Your strategy should be too.
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
              Book a free 15-minute audit and we'll show you exactly where your biggest growth opportunity is hiding.
            </p>
            <Link
              to="/ai-audit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-colors shadow-xl shadow-blue-500/20 group"
            >
              Get Free Growth Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industries;
