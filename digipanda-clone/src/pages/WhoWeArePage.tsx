import React from 'react';
import { PageLayout } from './PageLayout';
import { AboutUsSection } from '../components/AboutUsSection';

export const WhoWeArePage: React.FC = () => {
  return (
    <PageLayout>
      <AboutUsSection />
    </PageLayout>
  );
};
