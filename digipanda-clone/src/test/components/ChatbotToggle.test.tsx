import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ChatbotToggle } from '../../components/ChatbotToggle';

describe('ChatbotToggle Component', () => {
  it('renders closed floating button with proper mobile offset classes', () => {
    const { container } = render(
      <MemoryRouter>
        <ChatbotToggle />
      </MemoryRouter>
    );

    // Check Rule 2: bottom-24 sm:bottom-6 to prevent mobile overlap with StickyCTA
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('bottom-24');
    expect(wrapper).toHaveClass('sm:bottom-6');

    const toggleButton = screen.getByLabelText('Toggle Qala Assistant');
    expect(toggleButton).toBeInTheDocument();
  });

  it('opens chat window and allows sending messages', async () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter>
        <ChatbotToggle />
      </MemoryRouter>
    );

    const toggleButton = screen.getByLabelText('Toggle Qala Assistant');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Qala Labs Assistant')).toBeInTheDocument();
    expect(
      screen.getByText(/Welcome to Qala Labs!/i)
    ).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Type your inquiry...');
    fireEvent.change(input, { target: { value: 'How does MarksOps work?' } });

    const form = input.closest('form')!;
    fireEvent.submit(form);

    expect(screen.getByText('How does MarksOps work?')).toBeInTheDocument();
    expect(input).toHaveValue('');

    // Advance timers for bot response
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(
      screen.getByText(/MarksOps is our proprietary autonomous operations platform/i)
    ).toBeInTheDocument();

    vi.useRealTimers();
  });
});
