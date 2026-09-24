import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PageLayout } from './PageLayout';
import { services } from '../data/services';

const trackColor: Record<string, string> = {
  AI: '#3FE0E0',
  Design: '#A78BFA',
  Development: '#4F46E5',
  Marketing: '#34D399',
};

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const accent = trackColor[service.track] ?? '#3FE0E0';
  const related = services.filter((s) => s.track === service.track && s.slug !== service.slug).slice(0, 3);

  return (
    <PageLayout>
      <section className="relative pt-40 pb-16 bg-transparent overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${accent}1A` }}
        />
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          <Link to="/services" className="text-xs font-mono text-white/40 hover:text-[#3FE0E0] uppercase tracking-widest transition-colors">
            &larr; All services
          </Link>
          <span
            className="inline-flex items-center gap-2 mt-6 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border"
            style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}14` }}
          >
            {service.track}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight mt-4 mb-4">
            {service.name}
          </h1>
          <p className="text-xl md:text-2xl font-medium" style={{ color: accent }}>
            {service.tagline}
          </p>
          <p className="text-white/70 leading-relaxed mt-6 max-w-3xl">{service.description}</p>
        </div>
      </section>

      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accent }}>
            What this delivers
          </h2>
          <div className="grid gap-4">
            {service.deliverables.map((d, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: accent }} />
                <span className="text-white/85 leading-relaxed">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {service.agents && service.agents.length > 0 && (
        <section className="py-16 bg-transparent border-t border-white/10">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>
              Agents we've built
            </h2>
            <p className="text-white/50 text-sm mb-8 max-w-2xl">
              Not a slide deck — these are live agents already running inside MarksOps, our own multi-agent operations platform.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.agents.map((agent, i) => (
                <Link
                  key={i}
                  to={`/agents/${agent.slug}`}
                  className="group p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors block"
                >
                  <h3 className="font-bold text-white mb-1.5 flex items-center gap-2 justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                      {agent.name}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors" />
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">{agent.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.proof && service.proof.length > 0 && (
        <section className="py-16 bg-transparent border-t border-white/10">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>
              Proof it works
            </h2>
            <p className="text-white/50 text-sm mb-8 max-w-2xl">
              Real client work and our own shipped products, not case studies we made up for this page.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.proof.map((p, i) => (
                <Link
                  key={i}
                  to={p.type === 'case-study' ? `/case-studies/${p.slug}` : `/products/${p.slug}`}
                  className="group p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                      {p.type === 'case-study' ? 'Case Study' : 'Our Product'}
                    </span>
                    <span className="text-white/85 font-medium">{p.label}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-16 bg-white/[0.02] border-t border-white/10">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">
              Also in {service.track}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/services/${r.slug}`}
                  className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#3FE0E0]/40 transition-colors block"
                >
                  <h3 className="font-bold text-white mb-1">{r.name}</h3>
                  <p className="text-white/60 text-sm">{r.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-transparent border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-medium text-white mb-6">
            Ready to put this to work on your growth?
          </h2>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] hover:brightness-110 text-white rounded-full px-8 py-3.5 font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg"
          >
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};
