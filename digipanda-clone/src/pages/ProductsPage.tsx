import { SEO } from '../components/SEO';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageLayout } from './PageLayout';
import { products } from '../data/products';

const OUTCOMES: Record<string, string> = {
  marksops: 'One supervised ops layer for marketing, sales, finance, and logistics.',
  'ai-recruiter': 'Score and shortlist candidates with a transparent scorecard trail.',
  'ai-receptionist': '24/7 RAG-grounded call answering with transcripts and CRM handoff.',
  'q-manager': 'A single command surface for campaigns, tasks, and agent status.',
};

export const ProductsPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO
        title="Proprietary AI Products & Growth Software"
        description="Explore Qala Labs' in-house software products: MarksOps multi-agent operations platform, AI Recruiter, AI Voice Receptionist, and Q-Manager."
        image="/assets/og/og-products.jpg"
        url="/products"
      />
      <section className="relative pt-40 pb-24 bg-transparent">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-5">
              OUR PRODUCTS
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight leading-tight">
              We don't just use AI tools.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399]">
                We build them.
              </span>
            </h1>
            <p className="text-base text-white/70 mt-5 max-w-2xl mx-auto">
              Production systems we run on our own operations — available as products for brands that need the same leverage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {products.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#3FE0E0]/40 transition-all duration-300 block"
              >
                <div className="aspect-[16/9] rounded-2xl border border-white/10 bg-gradient-to-br from-[#4F46E5]/20 via-transparent to-[#3FE0E0]/15 mb-5 flex items-end p-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    {p.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-1 mb-2">{p.name}</h2>
                <p className="text-white/70 text-base">{OUTCOMES[p.slug] ?? p.tagline}</p>
                <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[#3FE0E0] group-hover:gap-2.5 transition-all">
                  See demo
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
