import React from 'react';
import { PageLayout } from './PageLayout';
import { ServicesSection } from '../components/ServicesSection';
import { WhyDifferentSection } from '../components/WhyDifferentSection';

export const ServicesPage: React.FC = () => {
  return (
    <PageLayout>
      <ServicesSection />
      <WhyDifferentSection />
    </PageLayout>
  );
};
