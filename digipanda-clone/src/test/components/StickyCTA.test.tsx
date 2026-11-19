import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StickyCTA } from '../../components/StickyCTA';

describe('StickyCTA Drawer Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders collapsed floating bottom bar initially', () => {
    render(<StickyCTA />);

    expect(screen.getByText(/Scale past/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request growth plan|get plan/i })).toBeInTheDocument();
  });

  it('expands drawer when CTA button is clicked', () => {
    render(<StickyCTA />);

    fireEvent.click(screen.getByRole('button', { name: /request growth plan|get plan/i }));

    expect(screen.getByText(/Direct Growth Plan Architect/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone \/ WhatsApp/i)).toBeInTheDocument();
  });

  it('submits growth plan request successfully', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    global.fetch = fetchMock;

    render(<StickyCTA />);

    fireEvent.click(screen.getByRole('button', { name: /request growth plan|get plan/i }));

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Alex Founder' },
    });
    fireEvent.change(screen.getByLabelText(/Business email/i), {
      target: { value: 'alex@brand.com' },
    });
    fireEvent.change(screen.getByLabelText(/Phone \/ WhatsApp/i), {
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
