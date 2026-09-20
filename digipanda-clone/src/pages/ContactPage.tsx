import React from 'react';
import { PageLayout } from './PageLayout';
import { ContactSection } from '../components/ContactSection';
import { FaqAccordion } from '../components/FaqAccordion';

export const ContactPage: React.FC = () => {
  return (
    <PageLayout>
      <ContactSection />
      <FaqAccordion />
    </PageLayout>
  );
};
