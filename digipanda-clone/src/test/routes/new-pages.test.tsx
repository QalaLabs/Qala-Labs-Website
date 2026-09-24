import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { CareersPage } from '../../pages/CareersPage';
import { CreatorCollectivePage } from '../../pages/CreatorCollectivePage';
import { AgencyCollectivePage } from '../../pages/AgencyCollectivePage';
import { PortfolioPage } from '../../pages/PortfolioPage';
import { BlogPage } from '../../pages/BlogPage';
import { BlogDetailPage } from '../../pages/BlogDetailPage';
import { CaseStudiesPage } from '../../pages/CaseStudiesPage';
import { CaseStudyDetailPage } from '../../pages/CaseStudyDetailPage';
import { OurWorkPage } from '../../pages/OurWorkPage';

describe('New Strategic Pages & Ecosystem Routes', () => {
  it('renders CareersPage with open roles and culture pillars', () => {
    render(
      <MemoryRouter initialEntries={['/careers']}>
        <CareersPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/CAREERS AT QALA LABS/i)).toBeInTheDocument();
    expect(screen.getByText(/Creative Intelligence/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Art Meets Engineering/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Senior AI Agent Architect & Systems Engineer/i)).toBeInTheDocument();
  });

  it('renders CreatorCollectivePage with syndicate tracks and invite form', () => {
    render(
      <MemoryRouter initialEntries={['/creator-collective']}>
        <CreatorCollectivePage />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/CREATOR COLLECTIVE/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Short-Form Video & UGC Virtuosos/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/3D Motion & CGI Visualists/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/125M\+/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Request Your Invite/i)).toBeInTheDocument();
  });

  it('renders AgencyCollectivePage with partnership models and intake form', () => {
    render(
      <MemoryRouter initialEntries={['/agency-collective']}>
        <AgencyCollectivePage />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/AGENCY COLLECTIVE/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/White-Label AI & Engineering Infrastructure/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Enterprise Joint Ventures & Co-Pitching/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Explore A Strategic Partnership/i)).toBeInTheDocument();
  });

  it('renders PortfolioPage with client repertory and project filters', () => {
    render(
      <MemoryRouter initialEntries={['/portfolio']}>
        <PortfolioPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/SELECTED WORKS & SYSTEMS/i)).toBeInTheDocument();
    expect(screen.getByText(/MarksOps Autonomous Operations Platform/i)).toBeInTheDocument();
    expect(screen.getByText(/playR x Chennai Super Kings Merch for IPL 2025/i)).toBeInTheDocument();
    expect(screen.getByText(/Interactive 3D Volumetric Horizon WebGL Engine/i)).toBeInTheDocument();
  });

  it('renders CaseStudiesPage with enhanced case studies directory', () => {
    render(
      <MemoryRouter initialEntries={['/case-studies']}>
        <CaseStudiesPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/VERIFIED OUTCOMES/i)).toBeInTheDocument();
    expect(screen.getAllByText('Mizuno India').length).toBeGreaterThan(0);
    expect(screen.getByText('Trotr: Spain Pivot')).toBeInTheDocument();
    expect(screen.getByText('MarksOps Autonomous Operations Swarm')).toBeInTheDocument();
  });

  it('renders CaseStudyDetailPage for new case studies', () => {
    render(
      <MemoryRouter initialEntries={['/case-studies/mizuno-india']}>
        <Routes>
          <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Mizuno India')).toBeInTheDocument();
  });

  it('renders BlogPage with playbooks and private dispatch newsletter', () => {
    render(
      <MemoryRouter initialEntries={['/blog']}>
        <BlogPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/PERSPECTIVES & PLAYBOOKS/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/The D2C BNPL Strategy Guide: Unlocking 15-30% Conversion Uplift/i).length
    ).toBeGreaterThan(0);
    expect(screen.getByText(/Subscribe to Qala Field Notes/i)).toBeInTheDocument();
  });

  it('renders BlogDetailPage for a valid playbook slug', () => {
    render(
      <MemoryRouter initialEntries={['/blog/d2c-bnpl-strategy-guide']}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/The D2C BNPL Strategy Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/The Price Hesitation Cliff at Checkout/i)).toBeInTheDocument();
  });

  it('renders OurWorkPage covering all case studies and portfolio in unified repertory', () => {
    render(
      <MemoryRouter initialEntries={['/work']}>
        <OurWorkPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/UNIFIED WORK REPERTORY/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Work:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Nutrivend UK/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/WWF India: AI Ad Creatives/i).length).toBeGreaterThan(0);
  });
});
