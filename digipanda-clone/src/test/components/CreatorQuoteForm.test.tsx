import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreatorQuoteForm } from '../../components/creator/CreatorQuoteForm';
import { activeCreatorCampaigns } from '../../data/creatorCampaigns';

describe('CreatorQuoteForm Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all 5 form sections with default benchmarks', () => {
    render(<CreatorQuoteForm />);

    // Section 1: Creator Identity & Reach
    expect(screen.getByText(/Creator Identity & Social Reach/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Creator Handle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Primary Discipline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Follower Tier/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Portfolio or Channel URL/i)).toBeInTheDocument();

    // Section 2: Deliverable Rates
    expect(screen.getByText(/Creative Deliverable Rates \(INR ₹\)/i)).toBeInTheDocument();
    expect(screen.getByText(/BENCHMARK: ₹25,000/i)).toBeInTheDocument();
    expect(screen.getByText(/BENCHMARK: ₹15,000/i)).toBeInTheDocument();
    expect(screen.getByText(/BENCHMARK: ₹20,000/i)).toBeInTheDocument();
    expect(screen.getByText(/BENCHMARK: ₹8,000/i)).toBeInTheDocument();

    // Section 3: Collaboration & Terms
    expect(screen.getByText(/Post Collaboration & Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Collaboration Format/i)).toBeInTheDocument();
    expect(screen.getByText(/Open to Joint Collab\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Included in creative rates/i)).toBeInTheDocument();
    expect(screen.getByText(/Extra Collab Fee \(\+₹\.\.\.\)/i)).toBeInTheDocument();

    // Section 4: Platform Ad Rights
    expect(screen.getByText(/Platform Ad Rights Breakdown & Usage Duration/i)).toBeInTheDocument();
    expect(screen.getByText(/📸 Instagram Ad Rights/i)).toBeInTheDocument();
    expect(screen.getByText(/▶️ YouTube Ad Rights/i)).toBeInTheDocument();
    expect(screen.getByText(/👥 Facebook Ad Rights/i)).toBeInTheDocument();
    expect(screen.getByText(/⏱️ Total Usage Time Period/i)).toBeInTheDocument();

    // Section 5: Live Calculator & Pitch Note
    expect(screen.getByText(/Total Quoted Package & Campaign Benchmark/i)).toBeInTheDocument();
    expect(screen.getByText(/LIVE PACKAGE CALCULATOR/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Concept & Pitch Note/i)).toBeInTheDocument();
  });

  it('updates live calculator when extra collab and ad rights fees are selected', async () => {
    render(<CreatorQuoteForm />);

    // Default deliverables: Reel (25000) + Carousel (20000) + StoryPack (8000) = 53000
    expect(screen.getAllByText(/₹53,000/).length).toBeGreaterThan(0);

    // Select Extra Collab Fee (+₹5,000 default)
    const extraCollabRadio = screen.getByLabelText(/Extra Collab Fee/i);
    fireEvent.click(extraCollabRadio);

    // Total should now be 53,000 + 5,000 = 58,000
    expect(screen.getAllByText(/₹58,000/).length).toBeGreaterThan(0);

    // Select Extra Ad Rights Fee (+₹10,000 default)
    const extraAdRadio = screen.getByLabelText(/Extra Ad Rights Fee/i);
    fireEvent.click(extraAdRadio);

    // Total should now be 58,000 + 10,000 = 68,000
    expect(screen.getAllByText(/₹68,000/).length).toBeGreaterThan(0);
  });

  it('submits form successfully and displays confirmation screen', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => ({ success: true, message: 'Lead captured successfully' }),
    });
    vi.stubGlobal('fetch', mockFetch);

    render(<CreatorQuoteForm campaign={activeCreatorCampaigns[0]} />);

    // Fill Section 1
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'Aarav Mehta' },
    });
    fireEvent.change(screen.getByLabelText(/Creator Handle/i), {
      target: { value: '@aarav.fit' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'aarav@creator.in' },
    });
    fireEvent.change(screen.getByLabelText(/WhatsApp Phone Number/i), {
      target: { value: '+91 99887 76655' },
    });
    fireEvent.change(screen.getByLabelText(/Portfolio or Channel URL/i), {
      target: { value: 'https://instagram.com/aarav.fit' },
    });

    // Fill Concept & Pitch Note
    fireEvent.change(screen.getByLabelText(/Concept & Pitch Note/i), {
      target: {
        value: 'Kinetic 4K video showing Mizuno dual-foam energy return during 10K sprint test.',
      },
    });

    // Submit form
    const submitBtn = screen.getByRole('button', { name: /Submit Quote/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Your Creator Quote is Queued/i)).toBeInTheDocument();
      expect(screen.getByText(/APPLICATION & QUOTE TRANSMITTED/i)).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalled();
  });
});
