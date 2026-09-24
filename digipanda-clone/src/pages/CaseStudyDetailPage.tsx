import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { PageLayout } from './PageLayout';
import { ArrowLeft, ArrowUpRight, Quote } from 'lucide-react';
import { getCaseStudyBySlug } from '../data/caseStudies';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) return <Navigate to="/case-studies" replace />;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-transparent border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/assets/caseStudyBg.webp')] bg-cover bg-center opacity-15 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-5xl">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-[#3FE0E0] uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All case studies
          </Link>

          <div className="mt-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
              {study.category}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight leading-tight mb-4">
              {study.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl">{study.subtitle}</p>
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden border border-white/10 aspect-[16/7] bg-black/40">
            <img
              src={study.thumb}
              alt={study.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/caseStudyBg.webp';
              }}
            />
          </div>
        </div>
      </section>

      {/* Challenge / Approach / Results */}
      <section className="relative py-24 bg-transparent">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-14">
              <div>
                <div className="eyebrow mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
                  The Challenge
                </div>
                <p className="text-white/80 text-base md:text-lg leading-relaxed">{study.challenge}</p>
              </div>

              <div>
                <div className="eyebrow mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
                  Our Approach
                </div>
                <ul className="space-y-4">
                  {study.approach.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="mt-1 shrink-0 w-6 h-6 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/30 text-[#3FE0E0] text-[11px] font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-white/80 text-base leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-3xl bg-white/[0.03] border border-white/10 p-8">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-6">
                  The Results
                </div>
                <div className="space-y-6">
                  {study.results.map((r) => (
                    <div key={r.label} className="pb-6 border-b border-white/10 last:border-0 last:pb-0">
                      <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
                        {r.value}
                      </div>
                      <div className="text-xs font-mono text-white/60 uppercase tracking-wider">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {study.testimonial && (
        <section className="relative py-20 bg-transparent border-t border-white/10">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <div className="relative rounded-[36px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-8 md:p-12 shadow-2xl backdrop-blur-md">
              <div className="text-[#3FE0E0] mb-6">
                <Quote className="w-10 h-10 opacity-80" />
              </div>
              <p className="text-white/90 text-lg leading-relaxed mb-8">"{study.testimonial.quote}"</p>
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-white font-bold text-lg">{study.testimonial.name}</h4>
                <p className="text-white/60 text-xs mt-0.5">{study.testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-24 bg-transparent border-t border-white/10 text-center">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mb-6">
            Ready for results like this?
          </h2>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-[#3FE0E0] text-black font-bold transition-all duration-300 shadow-lg hover:scale-105"
          >
            Book a Strategy Call
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </PageLayout>
  );
};
