import React from 'react';
import { PageLayout } from './PageLayout';
import { ContactSection } from '../components/ContactSection';
import { BookingSection } from '../components/BookingSection';
import { FaqAccordion } from '../components/FaqAccordion';

export const ContactPage: React.FC = () => {
  return (
    <PageLayout>
      <ContactSection />
      <BookingSection />
      <FaqAccordion />
    </PageLayout>
  );
};
