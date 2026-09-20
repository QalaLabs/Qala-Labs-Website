import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PageLayout } from './PageLayout';
import { products } from '../data/products';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) return <Navigate to="/products" replace />;

  return (
    <PageLayout>
      <section className="pt-40 pb-24 bg-[#06070D]">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{product.category}</span>
          <h1 className="text-4xl sm:text-5xl font-medium text-white tracking-tight mt-3 mb-4">{product.name}</h1>
          <p className="text-xl text-white/70 mb-8">{product.tagline}</p>
          <p className="text-white/70 leading-relaxed">{product.description}</p>
          {/* TODO(concurrent session: Products): add feature grid, screenshots, CTA */}
        </div>
      </section>
    </PageLayout>
  );
};
