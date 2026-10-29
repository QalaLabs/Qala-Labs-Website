import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BookingSection } from '../../components/BookingSection';

describe('BookingSection Component (Appointment Booking Engine)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders Google Calendar scheduler and direct form switch button', () => {
    render(<BookingSection />);

    expect(screen.getByText(/Book A 30-Minute/i)).toBeInTheDocument();
    expect(screen.getByText(/Calendar blocked\? Use Direct Request Form/i)).toBeInTheDocument();
  });

  it('allows toggling to the direct appointment booking form and submitting an appointment', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, message: 'Lead captured successfully' }),
    });
    global.fetch = mockFetch;

    render(<BookingSection />);

    // Toggle to direct request form
    const toggleButton = screen.getByText(/Calendar blocked\? Use Direct Request Form/i);
    fireEvent.click(toggleButton);

    expect(screen.getByText(/Direct Appointment Request/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\. Marcus Vance/i)).toBeInTheDocument();

    // Fill in appointment details
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. Marcus Vance/i), {
      target: { value: 'Marcus Vance' },
    });
    fireEvent.change(screen.getByPlaceholderText(/e\.g\. Nutrivend UK/i), {
      target: { value: 'Nutrivend UK' },
    });
    fireEvent.change(screen.getByPlaceholderText(/you@company\.com/i), {
      target: { value: 'marcus@nutrivend.co.uk' },
    });
    fireEvent.change(screen.getByPlaceholderText(/\+91 98765 43210/i), {
      target: { value: '+44 20 7946 0912' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Tell us what you want to achieve/i), {
      target: { value: 'Need enterprise fitness vending validation and Meta ad scaling' },
    });

    const submitBtn = screen.getByRole('button', { name: /Confirm 30-Min Diagnostic Session/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/lead',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('appointment_booking'),
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Appointment Request Confirmed!/i)).toBeInTheDocument();
    });
  });
});
