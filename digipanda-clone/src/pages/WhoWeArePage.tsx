import React from 'react';
import { PageLayout } from './PageLayout';
import { AboutUsSection } from '../components/AboutUsSection';
import { SEO } from '../components/SEO';

export const WhoWeArePage: React.FC = () => {
  return (
    <PageLayout>
      <SEO
        title="Who We Are | About & Core Team"
        description="Meet the engineers, growth strategists, and performance architects scaling high-ticket and D2C brands at Qala Labs."
        image="/assets/og/og-about.jpg"
        url="/about"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'Who We Are | Qala Labs',
          description: 'Meet the engineers, growth strategists, and performance architects scaling high-ticket and D2C brands at Qala Labs.',
          url: 'https://qalalabs.com/about',
        }}
      />
      <AboutUsSection titleAs="h1" />
    </PageLayout>
  );
};
