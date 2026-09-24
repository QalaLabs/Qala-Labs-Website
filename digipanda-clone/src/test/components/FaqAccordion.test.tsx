import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FaqAccordion } from '../../components/FaqAccordion';

describe('FaqAccordion Component', () => {
  it('renders all FAQ questions collapsed by default', () => {
    render(<FaqAccordion />);

    expect(
      screen.getByText('What makes Qala Labs fundamentally different from traditional agencies?')
    ).toBeInTheDocument();
    expect(
      screen.getByText('How did Qala Labs achieve a 28x ROAS for high-ticket travel with Trotr?')
    ).toBeInTheDocument();

    // Answers should not be visible initially
    expect(
      screen.queryByText(/Traditional agencies separate engineering, creative/i)
    ).not.toBeInTheDocument();
  });

  it('expands FAQ item on click and toggles close on second click', () => {
    render(<FaqAccordion />);

    const questionButton = screen.getByText(
      'What makes Qala Labs fundamentally different from traditional agencies?'
    );

    // Click to open
    fireEvent.click(questionButton);
    expect(
      screen.getByText(/Traditional agencies separate engineering, creative, and performance/i)
    ).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(questionButton);
    expect(
      screen.queryByText(/Traditional agencies separate engineering, creative, and performance/i)
    ).not.toBeInTheDocument();
  });
});
