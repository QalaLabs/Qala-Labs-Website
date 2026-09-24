import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from './PageLayout';
import { products } from '../data/products';

export const ProductsPage: React.FC = () => {
  return (
    <PageLayout>
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
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {products.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#3FE0E0]/40 transition-all duration-300 block"
              >
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{p.category}</span>
                <h2 className="text-2xl font-bold text-white mt-2 mb-2">{p.name}</h2>
                <p className="text-white/70">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
