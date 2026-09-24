import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../../components/Footer';

describe('Footer Component', () => {
  it('renders global offices and live timezone indicators', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/India \(Delhi NCR\):/i)).toBeInTheDocument();
    expect(screen.getByText(/United Kingdom \(London\):/i)).toBeInTheDocument();
    expect(screen.getByText(/UAE \(Dubai\):/i)).toBeInTheDocument();
    expect(screen.getByText(/Netherlands \(Amsterdam\):/i)).toBeInTheDocument();
  });

  it('renders legal and privacy policy links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');

    const termsLink = screen.getByRole('link', { name: /terms of service/i });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms');
  });

  it('renders contact email and partner badges', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('hello@qalalabs.com')).toBeInTheDocument();
    expect(screen.getByText(/TeleCMI/i)).toBeInTheDocument();
    expect(screen.getByText(/Interakt/i)).toBeInTheDocument();
    expect(screen.getByText(/Easebuzz/i)).toBeInTheDocument();
  });
});
