import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  submitLead,
  formatCreatorDescription,
  submitCreatorLead,
  CreatorApplicationPayload,
} from '../../services/submitLead';

describe('submitLead Service & Creator Description Formatter', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const mockCreatorData: CreatorApplicationPayload = {
    fullName: 'Liam Vance',
    handle: '@liam.visuals',
    email: 'liam@creator.io',
    phone: '+91 98765 43210',
    discipline: 'Short-Form Video & UGC',
    followerTier: 'Micro · 10K - 100K',
    portfolioUrl: 'https://instagram.com/liam.visuals',
    rates: {
      reel: 25000,
      reelEnabled: true,
      staticPost: 15000,
      staticPostEnabled: false,
      carousel: 20000,
      carouselEnabled: true,
      storyPack: 8000,
      storyPackEnabled: true,
    },
    collab: {
      format: 'Instagram Joint Collab Post (Co-author on profile feed)',
      openToJointCollab: true,
      feeType: 'extra',
      extraFeeAmount: 5000,
    },
    adRights: {
      instagram: '2 months',
      youtube: '2 months',
      facebook: '1 month',
      totalDuration: '60 days',
      feeType: 'extra',
      extraFeeAmount: 10000,
    },
    totalQuotedFee: 68000, // 25000 + 20000 + 8000 + 5000 + 10000 = 68000
    campaignBenchmark: '₹55,000 - ₹85,000',
    conceptPitch: 'Kinetic 4K POV running hook with sound design and 5-day turnaround.',
    campaignSlug: 'mizuno-wave-revolt',
    campaignTitle: 'Mizuno Wave Revolt 3 Performance Launch',
  };

  it('formats structured creator description correctly with all 5 sections', () => {
    const formatted = formatCreatorDescription(mockCreatorData);

    // Section 1
    expect(formatted).toContain('Liam Vance');
    expect(formatted).toContain('@liam.visuals');
    expect(formatted).toContain('Short-Form Video & UGC');
    expect(formatted).toContain('Micro · 10K - 100K');
    expect(formatted).toContain('https://instagram.com/liam.visuals');

    // Section 2: Deliverable Rates
    expect(formatted).toContain('Reel / Short Video (30–60s 9:16): ₹25,000');
    expect(formatted).toContain('Carousel (Multi-Slide Story): ₹20,000');
    expect(formatted).toContain('Story Pack (2–3 Framed Stories): ₹8,000');
    expect(formatted).not.toContain('Static Post (High-Res Photo): ₹15,000');

    // Section 3: Collab Terms
    expect(formatted).toContain('Instagram Joint Collab Post (Co-author on profile feed)');
    expect(formatted).toContain('✓ Yes, Open to Collab');
    expect(formatted).toContain('+₹5,000 (Separate Add-on)');

    // Section 4: Ad Rights
    expect(formatted).toContain('📸 Instagram Ad Rights: 2 months');
    expect(formatted).toContain('▶️ YouTube Ad Rights: 2 months');
    expect(formatted).toContain('👥 Facebook Ad Rights: 1 month');
    expect(formatted).toContain('⏱️ Total Usage Time Period: 60 days');
    expect(formatted).toContain('+₹10,000 (Separate Add-on)');

    // Section 5: Total & Benchmark
    expect(formatted).toContain('Total Quoted Fee: ₹68,000');
    expect(formatted).toContain('Brand Benchmark Reference: ₹55,000 - ₹85,000');
    expect(formatted).toContain('Kinetic 4K POV running hook');
  });

  it('dispatches creator payload using dual-target fallback logic', async () => {
    // First attempt /api/lead returns 404, fallback to /api/lead.php returns 200
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        status: 404,
        ok: false,
        json: async () => ({ error: 'Not Found' }),
      })
      .mockResolvedValueOnce({
        status: 200,
        ok: true,
        json: async () => ({ success: true, message: 'Lead captured successfully' }),
      });

    vi.stubGlobal('fetch', mockFetch);

    const result = await submitCreatorLead(mockCreatorData);

    expect(result.success).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      '/api/lead',
      expect.objectContaining({ method: 'POST' })
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      '/api/lead.php',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('handles server failure without setting success true', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      status: 500,
      ok: false,
      json: async () => ({ success: false, error: 'Database connection failed' }),
    });

    vi.stubGlobal('fetch', mockFetch);

    const result = await submitCreatorLead(mockCreatorData);

    expect(result.success).toBe(false);
    expect(result.error).toContain('Database connection failed');
  });
});
