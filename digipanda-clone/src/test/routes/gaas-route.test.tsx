import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { GaasPage } from '../../pages/GaasPage';
import { RouteTracker } from '../../components/RouteTracker';

describe('GAAS Route & High-Converting Landing Page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders GaasPage with headline, broken agency comparison, and hybrid pricing', () => {
    render(
      <MemoryRouter initialEntries={['/gaas']}>
        <Routes>
          <Route path="/gaas" element={<GaasPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/The Death of the Agency Retainer/i)).toBeInTheDocument();
    expect(screen.getByText(/Why 8-Figure Brands Fire Traditional Agencies/i)).toBeInTheDocument();
    expect(screen.getByText('MarksOps')).toBeInTheDocument();
    expect(screen.getByText('ReconSwarm')).toBeInTheDocument();
    expect(screen.getByText('CreativeEngine')).toBeInTheDocument();
    expect(screen.getByText('Growth Core')).toBeInTheDocument();
    expect(screen.getByText('Autonomous Swarm Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Sovereign')).toBeInTheDocument();
  });

  it('RouteTracker dispatches virtual pageview to window.dataLayer and window.fbq', () => {
    window.dataLayer = [];
    window.fbq = vi.fn();

    render(
      <MemoryRouter initialEntries={['/gaas']}>
        <RouteTracker />
      </MemoryRouter>
    );

    expect(window.dataLayer.length).toBeGreaterThan(0);
    expect(window.dataLayer[0]).toMatchObject({
      event: 'page_view',
      page_path: '/gaas',
    });
    expect(window.fbq).toHaveBeenCalledWith('track', 'PageView');
  });
});
