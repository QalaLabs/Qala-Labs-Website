import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Search,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  X,
  Cpu,
  Eye,
  Calendar,
  Building,
} from 'lucide-react';
import { PageLayout } from './PageLayout';
import { SEO } from '../components/SEO';
import { portfolioProjects, PortfolioProject } from '../data/portfolioData';

export const PortfolioPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const categories = [
    'All',
    'AI Creative',
    'Web Development',
    'Content Creation',
    'Production & Shoots',
    'Brand Systems',
    'Performance Marketing',
  ];

  const filteredProjects = portfolioProjects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <PageLayout>
      <SEO
        title="Portfolio & Selected Works"
        description="Explore engineering systems, creative engines, and custom digital experiences built by Qala Labs."
        image="/assets/og/og-portfolio.jpg"
        url="/portfolio"
      />
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-20 bg-[#06070D] overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[350px] bg-gradient-to-r from-[#3FE0E0]/15 via-[#4F46E5]/15 to-[#A78BFA]/10 blur-[130px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            THE REPERTORY // SELECTED WORKS & SYSTEMS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium text-white tracking-tight leading-tight mt-4 mb-6">
            Where Art Meets{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399]">
              High-Scale Engineering.
            </span>
          </h1>

          <p className="text-white/70 text-base sm:text-xl font-normal max-w-3xl mx-auto leading-relaxed mb-8">
            A curated index of autonomous AI swarms, 3D WebGL experiences, marketplace architectures, and viral media campaigns shipped for global market leaders.
          </p>

          {/* Repertory Mode Switcher */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <Link
              to="/work"
              className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/70 hover:text-white text-xs font-bold transition-all"
            >
              All Work
            </Link>
            <Link
              to="/case-studies"
              className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/70 hover:text-white text-xs font-bold transition-all"
            >
              Case Studies
            </Link>
            <span className="px-4 py-2 rounded-full border border-[#3FE0E0] bg-[#3FE0E0]/15 text-[#3FE0E0] text-xs font-bold">
              Portfolio Deliverables
            </span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#3FE0E0]">30+</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">Shipped Deployments</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#A78BFA]">₹40Cr+</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">Client Gross Value</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#34D399]">125M+</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">Audience Reach</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">4 Hubs</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">Global Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Controls & Filter Section */}
      <section className="py-12 bg-[#080911] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by client, technology, keyword..."
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

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-[#3FE0E0] transition-all duration-300 flex flex-col justify-between p-6 hover:shadow-[0_0_40px_-10px_rgba(63,224,224,0.25)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3FE0E0] px-3 py-1 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/25">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-white/40">{project.year}</span>
                  </div>

                  <Link to={`/portfolio/${project.slug}`} className="block group/title">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover/title:text-[#3FE0E0] transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-xs font-mono text-white/60 mb-4">{project.client}</p>

                  {/* Thumbnail Banner */}
                  <Link to={`/portfolio/${project.slug}`} className="relative rounded-2xl overflow-hidden mb-4 h-48 bg-black/50 block group/img">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover/img:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/caseStudyBg.webp';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 glass-panel px-3.5 py-1.5 rounded-xl border border-white/15">
                      <div className="text-xs font-semibold text-[#3FE0E0] truncate">
                        {project.impactMetric}
                      </div>
                    </div>
                  </Link>

                  <p className="text-white/70 text-xs line-clamp-3 leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-white/60 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-bold text-white/80 hover:text-[#3FE0E0] transition-colors inline-flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Inspect</span>
                  </button>

                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="text-xs font-semibold text-[#3FE0E0] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-white/50">
              <p className="text-base">No projects matched your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 text-xs font-bold text-[#3FE0E0] hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Project Detail Inspect Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0B0C16] border border-white/20 rounded-[32px] p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pr-8 mb-6">
              <span className="text-[10px] font-mono text-[#3FE0E0] uppercase tracking-widest block mb-1">
                {activeModalProject.category} • {activeModalProject.year}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {activeModalProject.title}
              </h3>
              <p className="text-sm font-mono text-white/60">Client: {activeModalProject.client}</p>
            </div>

            <div className="rounded-2xl overflow-hidden mb-6 h-56 bg-black">
              <img
                src={activeModalProject.coverImage}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/caseStudyBg.webp';
                }}
              />
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[#3FE0E0]/30 mb-6 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase text-white/40">Verified Business Impact</div>
                <div className="text-base sm:text-lg font-bold text-[#3FE0E0]">
                  {activeModalProject.impactMetric}
                </div>
              </div>
            </div>

            <div className="space-y-5 text-sm mb-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                  System Architecture & Overview
                </h4>
                <p className="text-white/80 leading-relaxed">{activeModalProject.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                  Core Engineering Deliverables
                </h4>
                <ul className="space-y-2">
                  {activeModalProject.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-white/75">
                      <CheckCircle2 className="w-4 h-4 text-[#3FE0E0] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-white/[0.04] text-white/80 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              {activeModalProject.caseStudySlug ? (
                <Link
                  to={`/case-studies/${activeModalProject.caseStudySlug}`}
                  onClick={() => setActiveModalProject(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white hover:brightness-110 shadow-lg inline-flex items-center gap-1.5"
                >
                  <span>Read Full Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              ) : activeModalProject.liveUrl ? (
                <Link
                  to={activeModalProject.liveUrl}
                  onClick={() => setActiveModalProject(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white hover:brightness-110 shadow-lg inline-flex items-center gap-1.5"
                >
                  <span>Open Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <div className="text-xs text-white/40">Enterprise Private Deployment</div>
              )}

              <button
                onClick={() => setActiveModalProject(null)}
                className="text-xs text-white/50 hover:text-white"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
