import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Activity,
  ShieldCheck,
  X,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  Volume2,
  FileCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { caseStudies as cases, CaseStudy } from '../data/caseStudies';
import { allWorkItems, UnifiedWorkItem, WorkItemType } from '../data/workData';

export const CaseStudies: React.FC = () => {
  const [filter, setFilter] = useState<'all' | WorkItemType>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  // Filtered items based on active tab
  const displayedItems = useMemo(() => {
    if (filter === 'all') return allWorkItems;
    return allWorkItems.filter((item) => item.type === filter);
  }, [filter]);

  // Responsive slides calculation
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    updateSlides();
    window.addEventListener('resize', updateSlides);
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const maxIndex = Math.max(0, displayedItems.length - slidesToShow);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Keyboard and modal scroll lock management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCase(null);
      }
    };

    if (selectedCase) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCase]);

  const handleOpenTelemetry = (slug: string) => {
    const found = cases.find((c) => c.slug === slug);
    if (found) {
      setSelectedCase(found);
    }
  };

  return (
    <section id="work" className="relative py-28 bg-transparent overflow-hidden">
      {/* Anchor aliases for backward compatibility */}
      <div id="case-studies" className="sr-only" />
      <div id="our-work" className="sr-only" />

      {/* Inline styles for soundwave animation */}
      <style>{`
        @keyframes soundwave-bounce {
          0%, 100% { height: 25%; }
          50% { height: 100%; }
        }
        .animate-soundwave {
          animation: soundwave-bounce 1.1s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(79,70,229,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/assets/caseStudyBg.webp')] bg-cover bg-center opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
              Proven Track Record • Unified Repertory
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight">
              Our Work
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-2 max-w-xl">
              Empirical case studies, commercial production shoots, AI pipelines, and high-converting architectures shipped for category leaders.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous work item"
              className="w-12 h-12 rounded-full border border-white/20 bg-[#06070D]/80 hover:bg-[#3FE0E0] text-white hover:text-black transition-colors flex items-center justify-center shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next work item"
              className="w-12 h-12 rounded-full border border-white/20 bg-[#06070D]/80 hover:bg-[#3FE0E0] text-white hover:text-black transition-colors flex items-center justify-center shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Master Work Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-[#3FE0E0] text-black shadow-md shadow-[#3FE0E0]/20'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              All Work ({allWorkItems.length})
            </button>
            <button
              onClick={() => setFilter('case-study')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'case-study'
                  ? 'bg-[#3FE0E0] text-black shadow-md shadow-[#3FE0E0]/20'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Case Studies ({cases.length})
            </button>
            <button
              onClick={() => setFilter('portfolio')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === 'portfolio'
                  ? 'bg-[#3FE0E0] text-black shadow-md shadow-[#3FE0E0]/20'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Creative & Production ({allWorkItems.length - cases.length})
            </button>
          </div>

          <Link
            to="/work"
            className="text-xs text-[#3FE0E0] hover:underline font-semibold flex items-center gap-1.5"
          >
            <span>Explore Full Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Carousel Track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out -mx-3"
            style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
          >
            {displayedItems.map((item) => {
              const isCaseStudy = item.type === 'case-study';
              return (
                <div
                  key={item.id}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                >
                  <div className="relative group rounded-[32px] overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#3FE0E0] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(63,224,224,0.25)] h-[530px] flex flex-col justify-between p-6">
                    
                    {/* Category & Title */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="inline-block text-[11px] font-bold text-[#3FE0E0] uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            isCaseStudy
                              ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                              : 'border-[#3FE0E0]/30 text-[#3FE0E0] bg-[#3FE0E0]/10'
                          }`}
                        >
                          {isCaseStudy ? 'CASE STUDY' : 'PORTFOLIO'}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-[#3FE0E0] transition-colors truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/70 line-clamp-1">
                        {item.summary}
                      </p>
                    </div>

                    {/* Dual-Asset Thumbnail with Verified Metric Readout */}
                    <div className="relative rounded-2xl overflow-hidden mt-4 flex-1 bg-black/60 border border-white/10">
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 opacity-85"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/caseStudyBg.webp';
                        }}
                      />

                      {/* Elevated Verified Metric Readout Badge */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <div className="border border-[#3FE0E0]/40 bg-[#06070D]/85 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg max-w-[85%]">
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3FE0E0] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3FE0E0]" />
                          </span>
                          <span className="text-[11px] font-bold text-white tracking-wide truncate">
                            {item.metric}
                          </span>
                        </div>
                        
                        {isCaseStudy && (
                          <button
                            onClick={() => handleOpenTelemetry(item.slug)}
                            title="View Telemetry Breakdown"
                            className="w-8 h-8 rounded-full border border-white/20 bg-black/70 hover:bg-[#3FE0E0] text-white hover:text-black transition-colors flex items-center justify-center shrink-0 backdrop-blur-md"
                          >
                            <Activity className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Bottom Result Overlay Pill */}
                      <div className="absolute bottom-3 left-3 right-3 glass-panel px-3.5 py-2 rounded-xl border border-white/15 bg-[#06070D]/75 backdrop-blur-sm">
                        <div className="text-[11px] font-semibold text-white/90 truncate flex items-center justify-between">
                          <span>{isCaseStudy ? 'Attribution Verified' : 'Client Deliverable'}</span>
                          <span className="text-[#3FE0E0] font-mono text-[10px]">
                            {isCaseStudy ? 'CAPI / STRIPE' : item.client.slice(0, 16)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      {isCaseStudy ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleOpenTelemetry(item.slug)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#3FE0E0]/30 bg-[#3FE0E0]/10 hover:bg-[#3FE0E0] text-[#3FE0E0] hover:text-black text-xs font-bold transition-all duration-200"
                          >
                            <Activity className="w-3.5 h-3.5" />
                            <span>Proof Telemetry</span>
                          </button>

                          <Link
                            to={item.link}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-white/10 hover:border-white/30 text-white/80 hover:text-white text-xs font-semibold transition-colors"
                          >
                            <span>Read Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </>
                      ) : (
                        <Link
                          to={item.link}
                          className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl border border-white/10 hover:border-[#3FE0E0] bg-white/[0.03] hover:bg-[#3FE0E0] text-white hover:text-black text-xs font-bold transition-all duration-200"
                        >
                          <span>Explore Deliverable</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section Repertory CTA */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3FE0E0]/10 border border-[#3FE0E0]/30 flex items-center justify-center text-[#3FE0E0] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Looking for a specific industry or technology deployment?</div>
              <div className="text-xs text-white/60">Explore all {allWorkItems.length} client deliverables, case studies, and live production architectures.</div>
            </div>
          </div>

          <Link
            to="/work"
            className="shrink-0 px-5 py-2.5 rounded-full bg-[#3FE0E0] hover:bg-[#34D399] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:scale-105 flex items-center gap-2"
          >
            <span>View All Our Work ({allWorkItems.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Proof & Telemetry Modal */}
      {selectedCase && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="telemetry-modal-title"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="relative w-full max-w-2xl sm:max-w-3xl rounded-3xl border border-white/20 bg-[#0A0D18] shadow-[0_0_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full border border-[#3FE0E0]/40 bg-[#3FE0E0]/15 text-[#3FE0E0] text-[10px] font-mono font-bold uppercase tracking-wider">
                    {selectedCase.category}
                  </span>
                  <span className="text-white/40 text-xs font-mono">
                    PROOF_ID :: #QL-{selectedCase.slug.toUpperCase().slice(0, 8)}
                  </span>
                </div>
                <h3 id="telemetry-modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {selectedCase.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm mt-0.5">
                  {selectedCase.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                aria-label="Close telemetry modal"
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors flex items-center justify-center shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Section 1: Verified Telemetry Readout Banner */}
            <div className="mt-6 rounded-2xl border border-[#3FE0E0]/30 bg-gradient-to-r from-[#3FE0E0]/10 via-[#4F46E5]/10 to-transparent p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono text-[#3FE0E0] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Primary Commercial Verification
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {selectedCase.result}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 rounded-full border border-white/20 bg-black/40 text-xs font-mono text-white/80">
                  Audit: 100% Match
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Section 2: Results Metrics Grid */}
            <div className="mt-6">
              <h4 className="text-xs font-mono text-white/50 uppercase tracking-wider mb-3">
                Key Performance Indicators
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedCase.results.map((r, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]"
                  >
                    <div className="text-xs text-white/60">{r.label}</div>
                    <div className="text-lg font-bold text-[#3FE0E0] mt-1">{r.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Challenge & Engineering Approach */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <h4 className="text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                  The Friction
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  {selectedCase.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <h4 className="text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                  Engineered Intervention
                </h4>
                <ul className="space-y-1.5 text-xs text-white/80">
                  {selectedCase.approach.slice(0, 3).map((a, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#3FE0E0] shrink-0 font-bold">›</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 4: Founder / Partner Audio Testimonial */}
            {selectedCase.testimonial && (
              <div className="mt-6 p-4 rounded-xl border border-white/10 bg-[#06070D] flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-7 h-7 rounded-full bg-[#3FE0E0] text-black flex items-center justify-center hover:scale-105 transition-transform"
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                    <span className="font-semibold text-white">Client Voice Note // Attestation</span>
                  </div>

                  {/* Animated Soundwave Visualizer */}
                  <div className="flex items-center gap-1 h-4">
                    {[40, 75, 90, 50, 80, 100, 60, 85, 45, 95, 70, 40].map((h, i) => (
                      <span
                        key={i}
                        className={`w-0.5 rounded-full ${
                          isPlayingAudio ? 'bg-[#3FE0E0] animate-soundwave' : 'bg-white/20'
                        }`}
                        style={{
                          height: isPlayingAudio ? undefined : `${h * 0.15}px`,
                          animationDelay: `${(i % 5) * 0.12}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-xs text-white/70 italic border-l-2 border-[#3FE0E0]/60 pl-3 py-0.5">
                  "{selectedCase.testimonial.quote}"
                </blockquote>

                <div className="text-[11px] text-white/50 pl-3">
                  — <strong className="text-white/80">{selectedCase.testimonial.name}</strong>, {selectedCase.testimonial.role}
                </div>
              </div>
            )}

            {/* Modal Footer Link */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/40 font-mono">
                Full documentation & pipeline diagrams available.
              </span>
              <Link
                to={`/case-studies/${selectedCase.slug}`}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#3FE0E0] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default CaseStudies;
