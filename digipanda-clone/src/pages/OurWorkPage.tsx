import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Camera,
  Globe,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageLayout } from './PageLayout';
import { allWorkItems, UnifiedWorkItem, WorkItemType } from '../data/workData';

const categories = [
  'All',
  'AI Creative',
  'Web Development',
  'Content Creation',
  'Production & Shoots',
  'Brand Systems',
  'Performance Marketing',
];

export const OurWorkPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | WorkItemType>('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on type, category, and search query
  const filteredItems = useMemo(() => {
    return allWorkItems.filter((item) => {
      // Type filter
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All') {
        const itemCat = item.category.toLowerCase();
        const selCat = selectedCategory.toLowerCase();
        if (!itemCat.includes(selCat) && !selCat.includes(itemCat)) {
          // Additional friendly match
          if (selectedCategory === 'Performance Marketing' && !itemCat.includes('performance') && !itemCat.includes('meta') && !itemCat.includes('amazon') && !itemCat.includes('lead gen')) {
            return false;
          }
          if (selectedCategory === 'Web Development' && !itemCat.includes('web') && !itemCat.includes('crm') && !itemCat.includes('app')) {
            return false;
          }
          if (selectedCategory === 'Brand Systems' && !itemCat.includes('brand') && !itemCat.includes('identity')) {
            return false;
          }
          if (selectedCategory === 'Production & Shoots' && !itemCat.includes('production') && !itemCat.includes('shoot')) {
            return false;
          }
          if (selectedCategory === 'AI Creative' && !itemCat.includes('ai')) {
            return false;
          }
          if (selectedCategory === 'Content Creation' && !itemCat.includes('content') && !itemCat.includes('ugc')) {
            return false;
          }
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesClient = item.client.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesMetric = item.metric.toLowerCase().includes(q);
        const matchesTech = item.technologies?.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesClient && !matchesSummary && !matchesMetric && !matchesTech) {
          return false;
        }
      }

      return true;
    });
  }, [selectedType, selectedCategory, searchQuery]);

  const caseStudyCount = allWorkItems.filter((i) => i.type === 'case-study').length;
  const portfolioCount = allWorkItems.filter((i) => i.type === 'portfolio').length;

  return (
    <PageLayout>
      <SEO
        title="Our Work • Case Studies & Creative Repertory | Qala Labs"
        description="Explore Qala Labs' complete portfolio and verified case studies: AI creative pipelines, commercial production shoots, high-converting storefronts, and B2B scale engines."
        url="/work"
      />

      <div className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#3FE0E0]/30 bg-[#3FE0E0]/10 text-[#3FE0E0] text-xs font-mono font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            UNIFIED WORK REPERTORY
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Our Work: <span className="text-[#3FE0E0]">Creative</span> Meets Verified Performance.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed">
            From verified financial ROI case studies with attribution telemetry to high-craft digital storefronts, AI generation pipelines, and commercial production shoots. Everything we engineer is built to deliver compounding commercial advantage.
          </p>
        </div>

        {/* Aggregate Proof Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="text-center p-3 border-r border-white/5 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-black text-[#3FE0E0]">₹4.2Cr+</div>
            <div className="text-xs text-white/60 font-mono mt-1">Verified Luxury Pipeline</div>
          </div>
          <div className="text-center p-3 border-r border-white/5 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-black text-[#34D399]">28x ROAS</div>
            <div className="text-xs text-white/60 font-mono mt-1">Highest Attributed Return</div>
          </div>
          <div className="text-center p-3 border-r border-white/5 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-black text-[#c084fc]">80% Lower</div>
            <div className="text-xs text-white/60 font-mono mt-1">AI Asset Production Cost</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl sm:text-3xl font-black text-white">45 Leads</div>
            <div className="text-xs text-white/60 font-mono mt-1">Enterprise B2B in 7 Days</div>
          </div>
        </div>

        {/* Master Filter Toolbar */}
        <div className="space-y-6 mb-12">
          
          {/* Top Switcher: All Work vs Case Studies vs Portfolio */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-full sm:w-auto">
              <button
                onClick={() => setSelectedType('all')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === 'all'
                    ? 'bg-[#3FE0E0] text-black shadow-lg shadow-[#3FE0E0]/20'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                All Work ({allWorkItems.length})
              </button>
              <button
                onClick={() => setSelectedType('case-study')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === 'case-study'
                    ? 'bg-[#3FE0E0] text-black shadow-lg shadow-[#3FE0E0]/20'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Case Studies ({caseStudyCount})
              </button>
              <button
                onClick={() => setSelectedType('portfolio')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === 'portfolio'
                    ? 'bg-[#3FE0E0] text-black shadow-lg shadow-[#3FE0E0]/20'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Creative & Portfolio ({portfolioCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients, tech, metrics..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'border border-[#3FE0E0] bg-[#3FE0E0]/15 text-[#3FE0E0] font-bold'
                      : 'border border-white/10 bg-white/[0.02] text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-white/50 mb-8 font-mono">
          <span>SHOWING {filteredItems.length} OF {allWorkItems.length} DEPLOYED WORKS</span>
          <span>FILTER: {selectedType.toUpperCase()} // {selectedCategory.toUpperCase()}</span>
        </div>

        {/* Work Grid */}
        {filteredItems.length === 0 ? (
          <div className="p-16 rounded-3xl border border-white/10 bg-white/[0.02] text-center max-w-lg mx-auto">
            <p className="text-white/60 text-sm mb-4">No work matches your current filters or search query.</p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#3FE0E0] text-black text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isCaseStudy = item.type === 'case-study';
              return (
                <article
                  key={item.id}
                  className="group rounded-3xl border border-white/10 bg-[#080B14]/80 backdrop-blur-xl overflow-hidden hover:border-[#3FE0E0]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_40px_rgba(63,224,224,0.15)]"
                >
                  <div>
                    {/* Visual Preview */}
                    <div className="relative aspect-video overflow-hidden bg-black/60">
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080B14] via-black/30 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isCaseStudy
                              ? 'border border-[#34D399]/40 bg-[#34D399]/20 text-[#34D399]'
                              : 'border border-[#3FE0E0]/40 bg-[#3FE0E0]/20 text-[#3FE0E0]'
                          }`}
                        >
                          {isCaseStudy ? 'Verified Case Study' : 'Portfolio Deliverable'}
                        </span>

                        <span className="px-2.5 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white/80 text-[10px] font-mono">
                          {item.category}
                        </span>
                      </div>

                      {/* Impact Metric Pill on Cover */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="p-2.5 rounded-xl border border-white/15 bg-black/75 backdrop-blur-md flex items-center justify-between text-xs">
                          <span className="text-white/60 font-mono text-[10px]">VERIFIED OUTCOME</span>
                          <span className="font-bold text-[#3FE0E0] truncate max-w-[200px]">
                            {item.metric}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6">
                      <div className="text-[11px] font-mono text-white/40 mb-1.5 uppercase tracking-wider">
                        {item.client}
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-[#3FE0E0] transition-colors mb-2.5">
                        {item.title}
                      </h3>

                      <p className="text-white/70 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                        {item.summary}
                      </p>

                      {/* Deliverables or Results Badges */}
                      {item.results && item.results.length > 0 && (
                        <div className="space-y-1.5 mb-4 text-xs">
                          {item.results.slice(0, 2).map((r, i) => (
                            <div key={i} className="flex items-center justify-between text-[11px] text-white/60 p-1.5 rounded-lg bg-white/[0.02]">
                              <span>{r.label}</span>
                              <span className="font-bold text-white">{r.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.deliverables && item.deliverables.length > 0 && (
                        <div className="space-y-1 mb-4 text-xs">
                          {item.deliverables.slice(0, 2).map((d, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-white/70 truncate">
                              <span className="text-[#3FE0E0]">✓</span>
                              <span className="truncate">{d}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Technologies Chips */}
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {item.technologies.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] text-[10px] font-mono text-white/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-white/5 mt-auto">
                    <Link
                      to={item.link}
                      className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl border border-white/10 hover:border-[#3FE0E0] bg-white/[0.03] hover:bg-[#3FE0E0] text-white hover:text-black font-bold text-xs uppercase tracking-wider transition-all duration-200"
                    >
                      <span>{isCaseStudy ? 'Read Case Study' : 'View Deliverable'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Comprehensive Conversion Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-br from-[#121428] via-[#080B14] to-[#04050A] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#4F46E5]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#3FE0E0]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full border border-[#34D399]/40 bg-[#34D399]/15 text-[#34D399] text-xs font-mono font-bold uppercase tracking-wider inline-block mb-4">
              LAUNCH YOUR NEXT DEPLOYMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Have a complex brand, engineering, or growth challenge?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/70">
              We audit your funnel, design the architecture, and ship production systems within 14–28 days.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#3FE0E0] hover:bg-[#34D399] text-black font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg hover:scale-105"
              >
                Discuss Your Project
              </Link>
              <Link
                to="/tools"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200"
              >
                Explore Growth Tools
              </Link>
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default OurWorkPage;
