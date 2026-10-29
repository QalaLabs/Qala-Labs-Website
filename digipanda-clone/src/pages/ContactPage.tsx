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
        description="Discuss your brand vision and revenue goals directly with Qala Labs growth strategists. Schedule a 20-minute discovery call."
        image="/assets/og/og-contact.jpg"
        url="/contact"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact & Schedule Growth Diagnostic | Qala Labs',
          description: 'Discuss your brand vision and revenue goals directly with Qala Labs growth strategists.',
          url: 'https://qalalabs.com/contact',
          mainEntity: {
            '@type': 'Organization',
            name: 'Qala Labs',
            email: 'hello@qalalabs.com',
            url: 'https://qalalabs.com',
          },
        }}
      />
      <ContactSection titleAs="h1" />
      <FaqAccordion />
    </PageLayout>
  );
};
