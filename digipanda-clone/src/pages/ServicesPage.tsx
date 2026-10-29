import React from 'react';
import { PageLayout } from './PageLayout';
import { ServicesSection } from '../components/ServicesSection';
import { WhyDifferentSection } from '../components/WhyDifferentSection';
import { SEO } from '../components/SEO';

export const ServicesPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO
        title="Full-Stack AI & Growth Capabilities"
        description="Explore Qala Labs' full-stack capabilities across AI automation, paid performance engineering, generative creative engines, and custom software."
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
          serviceType: 'AI Engineering and Performance Marketing',
          description: 'Explore Qala Labs full-stack capabilities across AI automation, paid performance engineering, and software development.',
          url: 'https://qalalabs.com/services',
        }}
      />
      <ServicesSection titleAs="h1" />
      <WhyDifferentSection />
    </PageLayout>
  );
};
