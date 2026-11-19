import React from 'react';
import { PageLayout } from './PageLayout';
import { ServicesSection } from '../components/ServicesSection';
import { WhyDifferentSection } from '../components/WhyDifferentSection';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { Sparkles, Cpu, Zap, ArrowRight, ShieldCheck, CheckCircle2, Layers } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO
        title="Full-Stack AI & Growth Capabilities • GAAS Consultancy • Qala Labs"
        description="Explore Qala Labs' full-stack capabilities across AI automation, paid performance engineering, 3D WebGL landers, and autonomous operations swarms."
        image="/assets/og/og-services.jpg"
        url="/services"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Full-Stack AI & Growth Capabilities',
          provider: {
            '@type': 'Organization',
            name: 'Qala Labs',
            url: 'https://qalalabs.com',
          },
          serviceType: 'GAAS AI Engineering and Performance Marketing',
          description:
            'Explore Qala Labs full-stack capabilities across autonomous AI swarms, paid performance engineering, and high-converting WebGL web systems.',
          url: 'https://qalalabs.com/services',
        }}
      />

      {/* Flagship Native GAAS Architecture Banner */}
      <section className="pt-36 pb-6 bg-transparent">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="rounded-3xl border border-[#3FE0E0]/30 bg-gradient-to-r from-[#4F46E5]/15 via-[#3FE0E0]/10 to-transparent p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3FE0E0]/20 border border-[#3FE0E0]/40 text-[#3FE0E0] text-[11px] font-mono uppercase tracking-wider mb-3">
                <Cpu className="w-3.5 h-3.5" />
                <span>ALL SERVICES ARE NATIVELY AGENT-POWERED</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Every Engagement Includes Deployed Autonomous Swarms
              </h2>
              <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed">
                Whether you hire Qala Labs for paid media, creative production, or landing page engineering, our proprietary agent swarms (<strong className="text-white">MarksOps</strong>, <strong className="text-white">ReconSwarm</strong>, and <strong className="text-white">CreativeEngine</strong>) are deployed into your workflows from Day 1 to eliminate manual back-office drag.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
              <Link
                to="/gaas"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Explore Full GAAS Platform</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/tools"
                className="px-6 py-3 rounded-full border border-white/20 text-white font-medium text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <span>Run Free AI Diagnostic</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section with h1 */}
      <ServicesSection titleAs="h1" />

      {/* Split Comparison Slider Section */}
      <WhyDifferentSection />
    </PageLayout>
  );
};

export default ServicesPage;
