import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WhyDifferentSection } from '../../components/WhyDifferentSection';

describe('WhyDifferentSection Component (Split Comparison Slider)', () => {
  it('renders section headline, pillars, and dual-state convergence canvas', () => {
    render(<WhyDifferentSection />);

    expect(screen.getByText(/WHY WE'RE DIFFERENT/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Creative Craft/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Data Discipline/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the tactile comparison slider with all 4 dimensions', () => {
    render(<WhyDifferentSection />);

    // Check dimension names
    expect(screen.getByText('Core Metric Focus')).toBeInTheDocument();
    expect(screen.getByText('Speed & Iteration')).toBeInTheDocument();
    expect(screen.getByText('Data & Attribution')).toBeInTheDocument();
    expect(screen.getByText('Technology Backbone')).toBeInTheDocument();

    // Check Standard Agency items
    expect(screen.getByText('Vanity impressions & clicks')).toBeInTheDocument();
    expect(screen.getByText('3-4 week manual cycles')).toBeInTheDocument();
    expect(screen.getByText('Blended pixel guesswork')).toBeInTheDocument();
    expect(screen.getByText('Spreadsheets & generic templates')).toBeInTheDocument();

    // Check Qala items
    expect(screen.getByText('Verified ROAS & bottom-line GMV')).toBeInTheDocument();
    expect(screen.getByText('48-hour autonomous creative loops')).toBeInTheDocument();
    expect(screen.getByText('Server-side CAPI telemetry & margin attribution')).toBeInTheDocument();
    expect(screen.getByText('Custom AI pipelines & scalable React/Cloud architectures')).toBeInTheDocument();
  });

  it('allows interacting with preset buttons and range slider', () => {
    render(<WhyDifferentSection />);

    const standardBtn = screen.getByRole('button', { name: /standard agency view/i });
    const splitBtn = screen.getByRole('button', { name: /50\/50 split view/i });
    const qalaBtn = screen.getByRole('button', { name: /qala revenue engine view/i });
    const slider = screen.getByLabelText(/comparison slider position/i);

    expect(standardBtn).toBeInTheDocument();
    expect(splitBtn).toBeInTheDocument();
    expect(qalaBtn).toBeInTheDocument();
    expect(slider).toBeInTheDocument();

    // Initial state is 50/50
    expect(screen.getByText('Balanced Split (50/50)')).toBeInTheDocument();

    // Click Qala Engine View
    fireEvent.click(qalaBtn);
    expect(screen.getByText(/85% Qala Bias/i)).toBeInTheDocument();

    // Click Standard Agency View
    fireEvent.click(standardBtn);
    expect(screen.getByText(/85% Legacy Bias/i)).toBeInTheDocument();

    // Drag slider directly
    fireEvent.change(slider, { target: { value: '75' } });
    expect(screen.getByText(/75% Qala Bias/i)).toBeInTheDocument();
  });
});
