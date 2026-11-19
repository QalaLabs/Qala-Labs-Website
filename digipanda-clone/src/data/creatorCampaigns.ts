export interface CreatorCampaign {
  slug: string;
  brand: string;
  title: string;
  category: string;
  badge: string;
  brief: string;
  deliverableScope: string;
  targetAudience: string;
  brandBenchmarkPayout: string;
  benchmarkAmountRange: [number, number];
  recommendedDeliverables: {
    reel: boolean;
    staticPost: boolean;
    carousel: boolean;
    storyPack: boolean;
  };
  adRightsRequired: string;
  timeline: string;
  deliverableHighlights: string[];
}

export const activeCreatorCampaigns: CreatorCampaign[] = [
  {
    slug: 'mizuno-wave-revolt',
    brand: 'Mizuno India',
    title: 'Mizuno Wave Revolt 3 Performance Launch',
    category: 'Athletic Footwear & Performance',
    badge: 'ACTIVE BRAND BRIEF // VERIFIED BUDGET',
    brief:
      'Showcase the dual-layer Enerzy foam cushioning through cinematic running POV footage, slow-motion stride impacts, and honest marathoner/streetwear styling.',
    deliverableScope: '1x 9:16 Reel/Short + 1x Carousel Post + 3x Story Frames',
    targetAudience: 'Marathon runners, functional fitness enthusiasts, and premium sneakerheads in Mumbai, Delhi & Bangalore.',
    brandBenchmarkPayout: '₹55,000 - ₹85,000',
    benchmarkAmountRange: [55000, 85000],
    recommendedDeliverables: {
      reel: true,
      staticPost: false,
      carousel: true,
      storyPack: true,
    },
    adRightsRequired: '60 Days Paid Meta & YouTube Ad Rights',
    timeline: 'Assets required within 7 days of shoe delivery',
    deliverableHighlights: [
      'High-impact hook: Kinetic running sound design or slow-mo pavement strike',
      'Honest wear-test feedback highlighting energy return vs standard EVA shoes',
      'Clean aesthetic joint-collab with @mizunoindia on feed',
    ],
  },
  {
    slug: 'wwf-wildlife-conserve',
    brand: 'WWF India',
    title: 'Project Tiger & Endangered Eco-Habitats',
    category: 'Conservation & Climate Action',
    badge: 'CAUSE CAMPAIGN // IMPACT SPONSORSHIP',
    brief:
      'Drive youth engagement and grassroots conservation pledges. Blend captivating wildlife storytelling, responsible tourism ethics, and immersive field documentation.',
    deliverableScope: '1x Storytelling Reel + 1x Multi-slide Educational Carousel',
    targetAudience: 'Environmentally-conscious Gen Z & Millennials, eco-travelers, and documentary enthusiasts.',
    brandBenchmarkPayout: '₹40,000 - ₹65,000',
    benchmarkAmountRange: [40000, 65000],
    recommendedDeliverables: {
      reel: true,
      staticPost: false,
      carousel: true,
      storyPack: true,
    },
    adRightsRequired: '30 Days Whitelisting & Organic Re-sharing',
    timeline: 'Campaign flight launches in 10 days',
    deliverableHighlights: [
      'Narrative hook linking everyday urban habits to protected tiger corridors',
      'Carousel breaking down 5 tangible ways to sponsor forest ranger kits',
      'Link sticker to verified WWF India donation micro-portal',
    ],
  },
  {
    slug: 'playr-smart-wearables',
    brand: 'playR Merchandise',
    title: 'Smart GPS Tracking & Pro Athlete Gear',
    category: 'Sports Tech & Connected Wearables',
    badge: 'TECH SPRINT // HIGH ENGAGEMENT',
    brief:
      'Put pro-grade FIFA-approved GPS sprint tracking vests on athletes and soccer creators. Reveal top speeds, heat maps, and distance covered in raw match conditions.',
    deliverableScope: '1x Kinetic POV Reel + 1x High-Res Feed Post + Story Pack',
    targetAudience: 'Footballers, academy athletes, fitness creators, and sports performance coaches.',
    brandBenchmarkPayout: '₹45,000 - ₹75,000',
    benchmarkAmountRange: [45000, 75000],
    recommendedDeliverables: {
      reel: true,
      staticPost: true,
      carousel: false,
      storyPack: true,
    },
    adRightsRequired: '90 Days Meta & Google Performance Max Whitelisting',
    timeline: '10 days production window',
    deliverableHighlights: [
      'Side-by-side heat map visualization synced with on-pitch sprint action',
      'App companion screen recording highlighting speed stats',
      'Exclusive creator discount promo code integration',
    ],
  },
  {
    slug: 'trotr-spain-luxury',
    brand: 'Trotr Spain',
    title: 'Bespoke European Travel & Luggage Craft',
    category: 'Luxury Travel & Craftsmanship',
    badge: 'GLOBAL BRIEF // PREMIUM TIERS',
    brief:
      'Cinematic travel cinematography capturing Trotr bespoke polycarbonate carry-ons gliding through Iberian plazas, bullet trains, and design boutique hotels.',
    deliverableScope: '1x Cinematic Film Reel + 1x Carousel + 30 Days Ad Rights',
    targetAudience: 'Frequent global travelers, digital nomads, and design architects.',
    brandBenchmarkPayout: '₹70,000 - ₹1,20,000',
    benchmarkAmountRange: [70000, 120000],
    recommendedDeliverables: {
      reel: true,
      staticPost: false,
      carousel: true,
      storyPack: true,
    },
    adRightsRequired: '90 Days Global Meta & TikTok Paid Ad Rights',
    timeline: 'Rolling delivery within 14 days',
    deliverableHighlights: [
      'Color-graded 4K footage highlighting aircraft-grade aluminum handles',
      'Effortless 360-degree silent spinner wheel transitions',
      'Joint collaboration post on creator feed with verified tag',
    ],
  },
  {
    slug: 'chrono-seconds-luxury',
    brand: 'Chrono Seconds',
    title: 'Rare Vintage & Pre-Owned Horology Showcase',
    category: 'Luxury Watches & Heritage',
    badge: 'HIGH-TICKET HOROLOGY // MACRO 4K',
    brief:
      'Macro 4K lens scrutiny of certified Rolex, Omega, and Audemars Piguet timepieces. Highlight provenance verification, mechanical movement sweeps, and investment appreciation.',
    deliverableScope: '1x Macro 4K Reel + 1x Collector Carousel + Story Pack',
    targetAudience: 'Watch collectors, high-net-worth investors, and luxury lifestyle connoisseurs.',
    brandBenchmarkPayout: '₹60,000 - ₹1,00,000',
    benchmarkAmountRange: [60000, 100000],
    recommendedDeliverables: {
      reel: true,
      staticPost: false,
      carousel: true,
      storyPack: true,
    },
    adRightsRequired: '60 Days Instagram Whitelisting & Feed Pinning',
    timeline: '7 days turnaround from timepiece handoff',
    deliverableHighlights: [
      'Macro 100mm lens sweeping across balance wheel and guilloché dials',
      'Education on serial verification and vault authentication certification',
      'Joint Instagram Collab post with @chronoseconds',
    ],
  },
];

/**
 * Returns campaign by slug or synthesizes a dynamic campaign
 */
export function getCampaignBySlug(slug: string): CreatorCampaign {
  const normalized = slug.toLowerCase().trim();
  const matched = activeCreatorCampaigns.find(
    (c) => c.slug.toLowerCase() === normalized || c.slug.toLowerCase().replace(/-/g, '') === normalized.replace(/-/g, '')
  );

  if (matched) return matched;

  // Synthesize readable brand & title from slug
  const readable = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    slug,
    brand: readable,
    title: `${readable} Creator Sprint`,
    category: 'Brand Sprint & Creative Co-Production',
    badge: 'INVITE-ONLY CAMPAIGN BRIEF',
    brief: `Exclusive creator sprint for ${readable}. Propose your customized deliverable package, post collaboration terms, and platform ad rights below.`,
    deliverableScope: '1x High-Velocity Reel/Short + Carousel or Story Pack',
    targetAudience: 'Target demographic aligned with your creator niche and audience distribution.',
    brandBenchmarkPayout: '₹50,000 - ₹80,000',
    benchmarkAmountRange: [50000, 80000],
    recommendedDeliverables: {
      reel: true,
      staticPost: true,
      carousel: true,
      storyPack: true,
    },
    adRightsRequired: '30-60 Days Meta / YouTube Ad Usage',
    timeline: 'Production turnaround within 7-10 days',
    deliverableHighlights: [
      'High-converting first 3-second visual hook',
      'Platform-native vertical production (9:16 4K)',
      'Clear brand positioning and custom conversion CTA',
    ],
  };
}
