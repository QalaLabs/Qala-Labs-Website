import React from 'react';
import { PageLayout } from './PageLayout';
import { ContactSection } from '../components/ContactSection';
import { FaqAccordion } from '../components/FaqAccordion';
import { SEO } from '../components/SEO';

export const ContactPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO
        title="Contact & Schedule Growth Diagnostic"
        description="Discuss your brand vision and revenue goals directly with Qala Labs growth strategists."
        image="/assets/og/og-contact.jpg"
        url="/contact"
      />
      <ContactSection />
      <FaqAccordion />
    </PageLayout>
  );
};
