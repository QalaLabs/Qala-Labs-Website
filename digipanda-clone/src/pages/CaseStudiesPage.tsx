import React from 'react';
import { PageLayout } from './PageLayout';
import { CaseStudies } from '../components/CaseStudies';
import { ClientsGrid } from '../components/ClientsGrid';
import { Testimonials } from '../components/Testimonials';

export const CaseStudiesPage: React.FC = () => {
  return (
    <PageLayout>
      <CaseStudies />
      <ClientsGrid />
      <Testimonials />
    </PageLayout>
  );
};
