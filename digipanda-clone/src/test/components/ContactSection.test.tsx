import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactSection } from '../../components/ContactSection';

describe('ContactSection Component (Lead Capture & Resilience)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all form input fields', () => {
    render(<ContactSection />);

    expect(screen.getByPlaceholderText('Full Name *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Company / Brand Name *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contact Number *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell us about your project, goals, or bottlenecks *')).toBeInTheDocument();
  });

  it('submits successfully when /api/lead responds with 200', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    global.fetch = fetchMock;

    render(<ContactSection />);

    fireEvent.change(screen.getByPlaceholderText('Full Name *'), {
      target: { value: 'Test Lead' },
    });
    fireEvent.change(screen.getByPlaceholderText('Company / Brand Name *'), {
      target: { value: 'Test Corp' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contact Number *'), {
      target: { value: '+91 9876543210' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email Address *'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Tell us about your project, goals, or bottlenecks *'), {
      target: { value: 'Need an AI agent swarm' },
    });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Inquiry Received!')).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/lead',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('falls back to /api/lead.php if /api/lead returns 404 (Dual Endpoint Capability)', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      });
    global.fetch = fetchMock;

    render(<ContactSection />);

    fireEvent.change(screen.getByPlaceholderText('Full Name *'), {
      target: { value: 'Fallback User' },
    });
    fireEvent.change(screen.getByPlaceholderText('Company / Brand Name *'), {
      target: { value: 'Fallback Corp' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contact Number *'), {
      target: { value: '+91 9876543210' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email Address *'), {
      target: { value: 'fallback@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Tell us about your project, goals, or bottlenecks *'), {
      target: { value: 'Need migration' },
    });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock).toHaveBeenNthCalledWith(1, '/api/lead', expect.anything());
      expect(fetchMock).toHaveBeenNthCalledWith(2, '/api/lead.php', expect.anything());
      expect(screen.getByText('Inquiry Received!')).toBeInTheDocument();
    });
  });

  it('displays fail-safe error banner and does NOT set submitted on failure', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network offline'));
    global.fetch = fetchMock;

    render(<ContactSection />);

    fireEvent.change(screen.getByPlaceholderText('Full Name *'), {
      target: { value: 'Error Test' },
    });
    fireEvent.change(screen.getByPlaceholderText('Company / Brand Name *'), {
      target: { value: 'Error Corp' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contact Number *'), {
      target: { value: '+91 9876543210' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email Address *'), {
      target: { value: 'err@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Tell us about your project, goals, or bottlenecks *'), {
      target: { value: 'Testing network failure resilience' },
    });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/Submission failed\. Please email us directly at hello@qalalabs\.com/i)
      ).toBeInTheDocument();
    });

    // Verify submitted message is NOT present (no unconditional success)
    expect(screen.queryByText('Inquiry Received!')).not.toBeInTheDocument();
  });
});
