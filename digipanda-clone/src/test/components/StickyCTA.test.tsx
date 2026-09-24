import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StickyCTA } from '../../components/StickyCTA';

describe('StickyCTA Drawer Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders collapsed floating bottom bar initially', () => {
    render(<StickyCTA />);

    expect(screen.getByText(/Ready to scale past/i)).toBeInTheDocument();
    expect(screen.getByText('Request Growth Plan')).toBeInTheDocument();
  });

  it('expands drawer when CTA button is clicked', () => {
    render(<StickyCTA />);

    const openBtn = screen.getByText('Request Growth Plan');
    fireEvent.click(openBtn);

    expect(screen.getByText(/Direct Growth Plan Architect/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name (Optional)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Business Email Address *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone / WhatsApp Number *')).toBeInTheDocument();
  });

  it('submits growth plan request successfully', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    global.fetch = fetchMock;

    render(<StickyCTA />);

    // Open drawer
    fireEvent.click(screen.getByText('Request Growth Plan'));

    // Fill form
    fireEvent.change(screen.getByPlaceholderText('Your Name (Optional)'), {
      target: { value: 'Alex Founder' },
    });
    fireEvent.change(screen.getByPlaceholderText('Business Email Address *'), {
      target: { value: 'alex@brand.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone / WhatsApp Number *'), {
      target: { value: '+91 9876543210' },
    });

    const sendBtn = screen.getByRole('button', { name: /generate my blueprint/i });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(screen.getByText(/Growth Plan Request Logged/i)).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/lead',
      expect.objectContaining({
        method: 'POST',
      })
    );
  });
});
