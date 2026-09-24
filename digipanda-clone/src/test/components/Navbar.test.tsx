import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';

describe('Navbar Component', () => {
  it('renders the brand logo and desktop navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Brand logo
    const homeLinks = screen.getAllByRole('link', { name: /qala/i });
    expect(homeLinks.length).toBeGreaterThan(0);

    // Desktop nav items
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Our Work' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tools' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /let's build/i })).toBeInTheDocument();
  });

  it('toggles mobile menu drawer on mobile toggle button click', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toBeInTheDocument();

    // Initially mobile menu links are not rendered in the drawer
    expect(screen.queryByText('Growth Tools')).not.toBeInTheDocument();

    // Open drawer
    fireEvent.click(toggleButton);
    expect(screen.getByText('Growth Tools')).toBeInTheDocument();
    expect(screen.getByText('Capabilities & AI')).toBeInTheDocument();

    // Close drawer
    fireEvent.click(toggleButton);
    expect(screen.queryByText('Growth Tools')).not.toBeInTheDocument();
  });

  it('closes mobile menu drawer when a link is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(toggleButton);

    const aboutLink = screen.getAllByRole('link', { name: 'About' })[1];
    fireEvent.click(aboutLink);

    expect(screen.queryByText('Core Team')).not.toBeInTheDocument();
  });
});
