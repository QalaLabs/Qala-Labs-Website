import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { PageLayout } from './PageLayout';
import { SEO } from '../components/SEO';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Calendar, Building, Sparkles, ExternalLink } from 'lucide-react';
import { getPortfolioProjectBySlug, portfolioProjects } from '../data/portfolioData';

export const PortfolioDetailPage: React.FC = () => {
  const { slug } = useParams();
  const project = getPortfolioProjectBySlug(slug);

  if (!project) return <Navigate to="/portfolio" replace />;

  const related = portfolioProjects
    .filter((p) => p.slug !== project.slug && (p.category === project.category || p.featured))
    .slice(0, 3);

  return (
    <PageLayout>
      <SEO
        title={`${project.title} | Portfolio`}
        description={project.summary}
        image={project.coverImage || '/assets/og/og-portfolio.jpg'}
        url={`/portfolio/${project.slug}`}
      />
      {/* 1. Project Hero */}
      <section className="relative pt-40 pb-16 bg-transparent border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(63,224,224,0.12),rgba(255,255,255,0))] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-[#3FE0E0] uppercase tracking-widest transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Selected Works
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3.5 py-1 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/30 text-[#3FE0E0] text-xs font-mono font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono">
              Deployed {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight leading-tight mb-4">
            {project.title}
          </h1>

          <div className="flex items-center gap-2 text-sm md:text-base font-mono text-[#3FE0E0] mb-8">
            <Building className="w-4 h-4" />
            <span>Client: {project.client}</span>
          </div>

          <p className="text-white/80 text-lg md:text-xl font-normal leading-relaxed max-w-3xl mb-10">
            {project.summary}
          </p>

          {/* Primary Visual Showcase */}
          <div className="rounded-[32px] overflow-hidden border border-white/15 bg-black/60 shadow-2xl relative">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full max-h-[560px] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/caseStudyBg.webp';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-white/15">
              <div>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                  Audited Deployment Impact
                </span>
                <span className="text-lg md:text-xl font-bold text-[#3FE0E0]">
                  {project.impactMetric}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {project.caseStudySlug && (
                  <Link
                    to={`/case-studies/${project.caseStudySlug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
                  >
                    <span>Read Deep Dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    to={project.liveUrl}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3FE0E0] text-black text-xs font-bold hover:brightness-110 transition-all shadow-lg"
                  >
                    <span>View Product</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Technical Deliverables & Specifications */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Deliverables list */}
            <div className="lg:col-span-7">
              <div className="eyebrow mb-4">
                <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
                Scope of Work & Deliverables
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-8">
                What We Engineered & Shipped
              </h2>

              <div className="space-y-4">
                {project.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#3FE0E0]/10 border border-[#3FE0E0]/25 flex items-center justify-center text-[#3FE0E0] shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base">{item}</h3>
                      <p className="text-white/60 text-xs mt-1">
                        Engineered under Qala Labs production SLA with dedicated QA validation.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Tech Stack & System Specs */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 md:p-8 space-y-6 sticky top-28">
                <div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-3">
                    Technology Architecture
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/[0.05] text-[#3FE0E0] border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">
                    Category Classification
                  </span>
                  <span className="text-white font-semibold text-sm">
                    {project.category}
                  </span>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">
                    Commercial Execution Status
                  </span>
                  <span className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Verified In Production
                  </span>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Link
                    to="/contact-us"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#3FE0E0] text-black font-bold text-xs transition-all shadow-lg hover:scale-105"
                  >
                    <span>Request Similar Deployment</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Related Works */}
      {related.length > 0 && (
        <section className="py-20 bg-transparent border-t border-white/10">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-[#3FE0E0] uppercase tracking-wider block">
                  More Selected Works
                </span>
                <h2 className="text-2xl font-medium text-white tracking-tight mt-1">
                  Explore Related Systems
                </h2>
              </div>
              <Link
                to="/portfolio"
                className="text-xs font-mono text-white/60 hover:text-white uppercase tracking-wider inline-flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/portfolio/${item.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#3FE0E0]/50 p-4 transition-all flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="h-36 rounded-xl overflow-hidden mb-3 bg-black/40">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/caseStudyBg.webp';
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#3FE0E0] uppercase block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-white font-bold text-sm group-hover:text-[#3FE0E0] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                    <span>{item.year}</span>
                    <span className="font-semibold text-white/80 group-hover:text-[#3FE0E0]">Inspect &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default PortfolioDetailPage;
