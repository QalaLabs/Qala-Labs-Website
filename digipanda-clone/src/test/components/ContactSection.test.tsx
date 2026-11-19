import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactSection } from '../../components/ContactSection';

const fillForm = () => {
  fireEvent.change(screen.getByLabelText(/Full name/i), {
    target: { value: 'Test Lead' },
  });
  fireEvent.change(screen.getByLabelText(/Company \/ brand/i), {
    target: { value: 'Test Corp' },
  });
  fireEvent.change(screen.getByLabelText(/^Phone/i), {
    target: { value: '+91 9876543210' },
  });
  fireEvent.change(screen.getByLabelText(/^Email/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/Project details/i), {
    target: { value: 'Need an AI agent swarm' },
  });
};

describe('ContactSection Component (Lead Capture & Resilience)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all form input fields with visible labels', () => {
    render(<ContactSection />);

    expect(screen.getByLabelText(/Full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company \/ brand/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project details/i)).toBeInTheDocument();
  });

  it('submits successfully when /api/lead responds with 200', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    global.fetch = fetchMock;

    render(<ContactSection />);
    fillForm();

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
    fillForm();

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
    fillForm();

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/Submission failed\. Please email us directly at hello@qalalabs\.com/i)
      ).toBeInTheDocument();
    });

    expect(screen.queryByText('Inquiry Received!')).not.toBeInTheDocument();
  });
});
