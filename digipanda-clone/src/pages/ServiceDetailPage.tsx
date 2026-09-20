import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { PageLayout } from './PageLayout';
import { services } from '../data/services';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <PageLayout>
      <section className="pt-40 pb-24 bg-[#06070D]">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Link to="/services" className="text-xs font-mono text-white/40 hover:text-[#3FE0E0] uppercase tracking-widest">
            &larr; All services
          </Link>
          <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mt-6">{service.track}</span>
          <h1 className="text-4xl sm:text-5xl font-medium text-white tracking-tight mt-3 mb-4">{service.name}</h1>
          <p className="text-xl text-white/70">{service.tagline}</p>
          <p className="text-white/70 leading-relaxed mt-6">{service.description}</p>
          {/* TODO(concurrent session: Services): add deliverables list, proof points, CTA */}
        </div>
      </section>
    </PageLayout>
  );
};
