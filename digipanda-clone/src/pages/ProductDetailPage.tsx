import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { PageLayout } from './PageLayout';
import { products } from '../data/products';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) return <Navigate to="/products" replace />;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#06070D] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),rgba(255,255,255,0))] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Products
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-5">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            <span>{product.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight leading-tight mb-4">
            {product.name}
          </h1>
          <p className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399] font-medium mb-8">
            {product.tagline}
          </p>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl">
            {product.description}
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative py-20 bg-[#06070D] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/30 text-[#3FE0E0] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <span>WHAT IT DOES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              Built to run in production, not just demo well
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#3FE0E0]/40 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#3FE0E0] mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 bg-[#06070D] border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#38bdf8]/5 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
              <span>HOW IT WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              From input to approved action
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {product.howItWorks.map((step, index) => (
              <div
                key={step.title}
                className="relative p-6 rounded-3xl bg-white/[0.02] border border-white/10"
              >
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  Step {index + 1}
                </span>
                <h3 className="text-white font-bold mt-2 mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-[#06070D] border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(79,70,229,0.12),rgba(255,255,255,0))] pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mb-4">
            Want {product.name} running inside your business?
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-8">
            We'll walk through your stack and show you exactly where it plugs in.
          </p>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors"
          >
            Talk to Qala Labs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};
