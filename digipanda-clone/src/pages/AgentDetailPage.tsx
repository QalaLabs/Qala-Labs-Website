import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight, Cpu, Wrench, Plug } from 'lucide-react';
import { PageLayout } from './PageLayout';
import { agents } from '../data/agents';

const ACCENT = '#3FE0E0';

export const AgentDetailPage: React.FC = () => {
  const { slug } = useParams();
  const agent = agents.find((a) => a.slug === slug);

  if (!agent) return <Navigate to="/services/ai-automation" replace />;

  return (
    <PageLayout>
      <section className="relative pt-40 pb-16 bg-transparent overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${ACCENT}1A` }}
        />
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          <Link
            to="/services/ai-automation"
            className="text-xs font-mono text-white/40 hover:text-[#3FE0E0] uppercase tracking-widest transition-colors"
          >
            &larr; AI Automation
          </Link>
          <span
            className="inline-flex items-center gap-2 mt-6 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border"
            style={{ color: ACCENT, borderColor: `${ACCENT}40`, backgroundColor: `${ACCENT}14` }}
          >
            <Cpu className="w-3 h-3" /> MarksOps Agent
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight mt-4 mb-4">
            {agent.name}
          </h1>
          <p className="text-xl md:text-2xl font-medium" style={{ color: ACCENT }}>
            {agent.tagline}
          </p>
        </div>
      </section>

      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: ACCENT }}>
            <Wrench className="w-4 h-4" /> What it does
          </h2>
          <p className="text-white/80 leading-relaxed text-lg max-w-3xl">{agent.whatItDoes}</p>
        </div>
      </section>

      <section className="py-16 bg-white/[0.02] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: ACCENT }}>
            How it's built
          </h2>
          <div className="grid gap-4">
            {agent.howBuilt.map((line, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors"
              >
                <span
                  className="font-mono text-xs mt-1 shrink-0 w-6 h-6 rounded-full flex items-center justify-center border"
                  style={{ color: ACCENT, borderColor: `${ACCENT}40` }}
                >
                  {i + 1}
                </span>
                <span className="text-white/85 leading-relaxed">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {agent.integrations.length > 0 && (
        <section className="py-16 bg-transparent border-t border-white/10">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-white/40">
              <Plug className="w-4 h-4" /> Integrates with
            </h2>
            <div className="flex flex-wrap gap-3">
              {agent.integrations.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm border border-white/10 bg-white/[0.03] text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-transparent border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-medium text-white mb-6">
            Want an agent like this built for your operation?
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
