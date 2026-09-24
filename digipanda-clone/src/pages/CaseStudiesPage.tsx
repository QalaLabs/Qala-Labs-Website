import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, Filter, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { PageLayout } from './PageLayout';
import { SEO } from '../components/SEO';
import { caseStudies } from '../data/caseStudies';
import { ClientsGrid } from '../components/ClientsGrid';
import { Testimonials } from '../components/Testimonials';

export const CaseStudiesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Meta Lead Gen',
    'Founder Storytelling',
    'Brand Identity & Web',
    'Web App & CRM',
    'Amazon Performance',
    'Cultural Movement',
  ];

  const filteredStudies = caseStudies.filter((study) => {
    const matchesCategory =
      selectedCategory === 'All' || study.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.challenge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageLayout>
      <SEO
        title="Case Studies & Verified Proof"
        description="Real balance sheets, real customer acquisition, and empirical revenue outcomes engineered by Qala Labs."
        image="/assets/og/og-home.jpg"
        url="/case-studies"
      />
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-20 bg-[#06070D] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#4F46E5]/20 via-[#3FE0E0]/15 to-transparent blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            PROVEN TRACK RECORD // VERIFIED OUTCOMES
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium text-white tracking-tight leading-tight mt-4 mb-6">
            Case Studies &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399]">
              Verified Proof.
            </span>
          </h1>

          <p className="text-white/70 text-base sm:text-xl font-normal max-w-3xl mx-auto leading-relaxed mb-8">
            Real balance sheets. Real customer acquisition. Real enterprise leverage.
            Explore how we engineer breakout growth, autonomous AI workflows, and culture-defining brands.
          </p>

          {/* Repertory Mode Switcher */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <Link
              to="/work"
              className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/70 hover:text-white text-xs font-bold transition-all"
            >
              All Work
            </Link>
            <span className="px-4 py-2 rounded-full border border-[#3FE0E0] bg-[#3FE0E0]/15 text-[#3FE0E0] text-xs font-bold">
              Verified Case Studies
            </span>
            <Link
              to="/portfolio"
              className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/70 hover:text-white text-xs font-bold transition-all"
            >
              Portfolio Deliverables
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#3FE0E0]">28x</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">Peak Funnel ROAS</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#A78BFA]">11.2x</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">Amazon Ads ROAS</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#34D399]">64.7%</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">Inquiry Conversion</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">45 B2B</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">Enterprise Leads in 7d</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Directory & Filters */}
      <section className="py-16 bg-[#080911] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          {/* Controls bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search case studies by brand, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0] transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white shadow-lg shadow-[#3FE0E0]/20'
                      : 'bg-white/[0.03] text-white/70 border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Case Studies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <Link
                key={study.slug}
                to={`/case-studies/${study.slug}`}
                className="group relative rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-[#3FE0E0] transition-all duration-300 flex flex-col justify-between p-6 hover:shadow-[0_0_40px_-10px_rgba(63,224,224,0.25)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3FE0E0] px-3 py-1 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/25">
                      {study.category}
                    </span>
                    <span className="text-xs text-white/40 font-mono group-hover:text-white transition-colors flex items-center gap-1">
                      <span>Deep Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#3FE0E0] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-xs text-white/60 mb-4">{study.subtitle}</p>

                  {/* Thumbnail Banner */}
                  <div className="relative rounded-2xl overflow-hidden mb-4 h-48 bg-black/50">
                    <img
                      src={study.thumb}
                      alt={study.title}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/caseStudyBg.webp';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 glass-panel px-3.5 py-1.5 rounded-xl border border-white/15">
                      <div className="text-xs font-semibold text-[#3FE0E0] truncate">
                        {study.result}
                      </div>
                    </div>
                  </div>

                  <p className="text-white/70 text-xs line-clamp-3 leading-relaxed mb-4">
                    {study.challenge}
                  </p>
                </div>

                {/* Key Results Badges */}
                <div className="pt-4 border-t border-white/10 space-y-1.5">
                  {study.results.slice(0, 2).map((res, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px]">
                      <span className="text-white/50">{res.label}</span>
                      <span className="text-white font-mono font-semibold">{res.value}</span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {filteredStudies.length === 0 && (
            <div className="text-center py-20 text-white/50">
              <p className="text-base">No case studies found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 text-xs font-bold text-[#3FE0E0] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Clients Grid & Praise */}
      <ClientsGrid />
      <Testimonials />
    </PageLayout>
  );
};
