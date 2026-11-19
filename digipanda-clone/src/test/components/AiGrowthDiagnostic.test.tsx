import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AiGrowthDiagnostic } from '../../components/AiGrowthDiagnostic';

describe('AiGrowthDiagnostic Component (Flagship Lead Magnet)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Step 1 with business sector and revenue parameters', () => {
    render(<AiGrowthDiagnostic />);

    expect(screen.getByText('AI Growth & Ops Diagnostic Engine')).toBeInTheDocument();
    expect(screen.getByText('D2C Brand')).toBeInTheDocument();
    expect(screen.getByText('B2B SaaS')).toBeInTheDocument();
    expect(screen.getByText(/Next: Assess Back-Office & Creative Friction/i)).toBeInTheDocument();
  });

  it('allows stepping from Step 1 to Step 2 and Step 3 to view diagnostic scores', async () => {
    render(<AiGrowthDiagnostic />);

    // Click Next to Step 2
    fireEvent.click(screen.getByText(/Next: Assess Back-Office & Creative Friction/i));

    expect(screen.getByText(/Weekly Manual Reporting & Ops Hours/i)).toBeInTheDocument();
    expect(screen.getByText(/Lead \/ High-Intent Inquiry Response Latency/i)).toBeInTheDocument();

    // Click Calculate Score to Step 3
    fireEvent.click(screen.getByText(/Calculate AI Growth Diagnostic Score/i));

    expect(screen.getByText('CAC Velocity Score')).toBeInTheDocument();
    expect(screen.getByText('Back-Office Drag')).toBeInTheDocument();
    expect(screen.getByText('Automation Potential')).toBeInTheDocument();
    expect(screen.getByText(/Est. Capital Recovery/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Marcus Vance')).toBeInTheDocument();
  });

  it('submits lead successfully to /api/lead and shows execution roadmap', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    global.fetch = fetchMock;

    render(<AiGrowthDiagnostic />);

    // Step 1 -> Step 2
    fireEvent.click(screen.getByText(/Next: Assess Back-Office & Creative Friction/i));
    // Step 2 -> Step 3
    fireEvent.click(screen.getByText(/Calculate AI Growth Diagnostic Score/i));

    // Fill form
    fireEvent.change(screen.getByPlaceholderText('Marcus Vance'), {
      target: { value: 'Test Founder' },
    });
    fireEvent.change(screen.getByPlaceholderText('Nutrivend UK'), {
      target: { value: 'Apex Brands' },
    });
    fireEvent.change(screen.getByPlaceholderText('marcus@nutrivend.co.uk'), {
      target: { value: 'founder@apexbrands.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('+44 20 7946 0912'), {
      target: { value: '+91 9999988888' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Receive 12-Point Blueprint & Audit/i }));

    await waitFor(() => {
      expect(screen.getByText('Diagnostic & Architecture Roadmap Dispatched!')).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/lead',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('displays fail-safe error banner with email and WhatsApp fallback on API error', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network offline'));
    global.fetch = fetchMock;

    render(<AiGrowthDiagnostic />);

    // Step 1 -> Step 2 -> Step 3
    fireEvent.click(screen.getByText(/Next: Assess Back-Office & Creative Friction/i));
    fireEvent.click(screen.getByText(/Calculate AI Growth Diagnostic Score/i));

    // Fill form
    fireEvent.change(screen.getByPlaceholderText('Marcus Vance'), {
      target: { value: 'Fail Test' },
    });
    fireEvent.change(screen.getByPlaceholderText('Nutrivend UK'), {
      target: { value: 'Fail Corp' },
    });
    fireEvent.change(screen.getByPlaceholderText('marcus@nutrivend.co.uk'), {
      target: { value: 'fail@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('+44 20 7946 0912'), {
      target: { value: '+91 9999911111' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Receive 12-Point Blueprint & Audit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email hello@qalalabs.com/i)).toBeInTheDocument();
      expect(screen.getByText(/WhatsApp Direct/i)).toBeInTheDocument();
    });
  });
});
