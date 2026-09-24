import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { NotFoundPage } from '../../pages/NotFoundPage';
import { PrivacyPolicyPage } from '../../pages/PrivacyPolicyPage';
import { TermsPage } from '../../pages/TermsPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { AgentDetailPage } from '../../pages/AgentDetailPage';
import { ServiceDetailPage } from '../../pages/ServiceDetailPage';
import { CaseStudyDetailPage } from '../../pages/CaseStudyDetailPage';
import { ContactPage } from '../../pages/ContactPage';
import { WhoWeArePage } from '../../pages/WhoWeArePage';
import { ServicesPage } from '../../pages/ServicesPage';
import { CaseStudiesPage } from '../../pages/CaseStudiesPage';

describe('Website Pages & Dynamic Routes', () => {
  it('renders 404 NotFoundPage with navigation escape routes', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404 - Horizon Not Found')).toBeInTheDocument();
    expect(screen.getByText('Back to Home Base')).toBeInTheDocument();
  });

  it('renders PrivacyPolicyPage with data protection disclosures', () => {
    render(
      <MemoryRouter>
        <PrivacyPolicyPage />
      </MemoryRouter>
    );

    const headings = screen.getAllByText(/Privacy Policy/i);
    expect(headings.length).toBeGreaterThan(0);
    expect(screen.getByText(/Information We Collect/i)).toBeInTheDocument();
  });

  it('renders TermsPage with terms of service sections', () => {
    render(
      <MemoryRouter>
        <TermsPage />
      </MemoryRouter>
    );

    const headings = screen.getAllByText(/Terms of Service/i);
    expect(headings.length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /Intellectual Property/i })).toBeInTheDocument();
  });

  it('renders ProductsPage listing internal software platforms', () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('MarksOps')).toBeInTheDocument();
    expect(screen.getByText('AI Receptionist')).toBeInTheDocument();
  });

  it('renders ProductDetailPage for valid slug /products/marksops', () => {
    render(
      <MemoryRouter initialEntries={['/products/marksops']}>
        <Routes>
          <Route path="/products/:slug" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    const titles = screen.getAllByText('MarksOps');
    expect(titles.length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Agentic Marketing, Sales, Ops & Finance — running as one system/i)
    ).toBeInTheDocument();
  });

  it('renders AgentDetailPage for valid slug /agents/crm-leads-agent', () => {
    render(
      <MemoryRouter initialEntries={['/agents/crm-leads-agent']}>
        <Routes>
          <Route path="/agents/:slug" element={<AgentDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('CRM Leads Agent')).toBeInTheDocument();
    expect(screen.getByText(/How It's Built/i)).toBeInTheDocument();
  });

  it('renders ServiceDetailPage for valid slug /services/ai-automation', () => {
    render(
      <MemoryRouter initialEntries={['/services/ai-automation']}>
        <Routes>
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('AI Automation')).toBeInTheDocument();
    expect(screen.getByText(/What this delivers/i)).toBeInTheDocument();
  });

  it('renders CaseStudyDetailPage for valid slug /case-studies/trotr-spain-pivot', () => {
    render(
      <MemoryRouter initialEntries={['/case-studies/trotr-spain-pivot']}>
        <Routes>
          <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Trotr: Spain Pivot')).toBeInTheDocument();
    expect(screen.getByText('The Challenge')).toBeInTheDocument();
    expect(screen.getByText('Our Approach')).toBeInTheDocument();
  });

  it('renders ContactPage with form', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Full Name *')).toBeInTheDocument();
  });

  it('renders WhoWeArePage, ServicesPage, and CaseStudiesPage without error', () => {
    const { unmount: unmount1 } = render(
      <MemoryRouter>
        <WhoWeArePage />
      </MemoryRouter>
    );
    unmount1();

    const { unmount: unmount2 } = render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );
    unmount2();

    const { unmount: unmount3 } = render(
      <MemoryRouter>
        <CaseStudiesPage />
      </MemoryRouter>
    );
    unmount3();
  });

  it('renders 404 page when unknown route is accessed in router', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-non-existent-route']}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404 - Horizon Not Found')).toBeInTheDocument();
  });
});
