export interface CaseStudyResult {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  result: string;
  thumb: string;
  category: string;
  challenge: string;
  approach: string[];
  results: CaseStudyResult[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'nutrivend-uk',
    title: 'Nutrivend UK',
    subtitle: 'B2B Market Validation & Lead Generation',
    result: '45 Leads • 71% Untapped Market',
    thumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
    category: 'Meta Lead Gen',
    challenge:
      'Nutrivend UK wanted to expand into the enterprise fitness vending space but had no data on whether the market was worth chasing — every prior outreach effort had been generic cold email with no signal on real demand.',
    approach: [
      'Built a rigorous B2B market validation framework instead of running blind outreach',
      'Ran targeted Meta lead-gen campaigns aimed squarely at enterprise fitness facility decision-makers',
      'Instrumented every lead with qualification data to separate genuine demand from noise',
    ],
    results: [
      { label: 'Qualified leads', value: '45 in 7 days' },
      { label: 'Market discovery', value: '71% untapped enterprise demand' },
      { label: 'Cost per qualified lead', value: '62% below benchmark' },
    ],
    testimonial: {
      quote:
        "Qala Labs didn't just run ads; they engineered a rigorous B2B market validation framework. Generating 45 qualified enterprise fitness leads in just 7 days with a 71% untapped market discovery proved our new expansion thesis beyond doubt.",
      name: 'Marcus Vance',
      role: 'Managing Director, Nutrivend UK',
    },
  },
  {
    slug: 'trotr-spain-pivot',
    title: 'Trotr: Spain Pivot',
    subtitle: 'High-Ticket Travel Funnel & Founder Narrative',
    result: '28x ROAS • ₹14L Revenue',
    thumb: '/assets/qala/trotr-featured.jpeg',
    category: 'Founder Storytelling',
    challenge:
      'Trotr had zero paying customers for its high-ticket Spain trip despite running conventional travel ads — the offer looked like every other travel package in the feed and never earned trust at a high price point.',
    approach: [
      'Rewrote the entire funnel narrative around founder-led storytelling instead of generic destination marketing',
      'Rebuilt creative and copy to sell the trip on trust and specificity rather than discounting',
      'Optimized the funnel end-to-end from ad hook through checkout for a high-ticket buying decision',
    ],
    results: [
      { label: 'ROAS', value: '28x' },
      { label: 'Revenue generated', value: '₹14 Lakhs' },
      { label: 'Conversion cycle', value: 'Reduced from 21 days to 72 hours' },
    ],
    testimonial: {
      quote:
        'We had zero paying customers for our high-ticket Spain trip despite running traditional travel ads. Qala Labs stepped in, rewrote our narrative with founder-led storytelling, and generated ₹14 Lakhs in revenue at a staggering 28x ROAS.',
      name: 'Siddharth Roy',
      role: 'Co-Founder & CEO, Trotr',
    },
  },

  {
    slug: 'mizuno-india',
    title: 'Mizuno India',
    subtitle: 'Performance Apparel Brand & D2C Growth Engine',
    result: '3.8x Blended ROAS • 400% D2C Growth',
    thumb: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200',
    category: 'Performance Apparel',
    challenge:
      'Mizuno held undisputed global acclaim among professional athletes, but its Indian digital footprint lagged behind legacy competitors with generic catalog ads failing to convey Japanese precision engineering.',
    approach: [
      'Rebuilt the digital visual identity highlighting technical shoe anatomy and biomechanics',
      'Structured high-intent Google Search and Meta CAPI funnels targeting elite runners and badminton pros',
      'Introduced dynamic fit-finder workflows and athlete endorsement storytelling',
    ],
    results: [
      { label: 'Blended ROAS', value: '3.8x across channels' },
      { label: 'D2C sales growth', value: '+400% YoY' },
      { label: 'Return rate reduction', value: '28% drop via fit-finder' },
    ],
    testimonial: {
      quote:
        'Qala Labs translated Mizuno’s legacy of Japanese precision into a modern digital conversion engine. They grew our direct-to-consumer channel by 400% while elevating our brand standing.',
      name: 'Rajeev Singhania',
      role: 'Commercial Director, Mizuno India',
    },
  },
  {
    slug: 'chrono-seconds',
    title: 'Chrono Seconds',
    subtitle: 'Luxury Pre-Owned Horology Marketplace',
    result: '₹4.2Cr+ Pipeline • High-Net-Worth Buyers',
    thumb: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200',
    category: 'Luxury E-commerce',
    challenge:
      'Chrono Seconds operates in pre-owned luxury horology, a category where trust and provenance matter more than price — generic e-commerce marketing playbooks fail to reach genuinely high-net-worth buyers.',
    approach: [
      'Built a luxury-positioned marketplace experience calibrated to serious watch collectors',
      'Targeted acquisition toward verified high-net-worth buyer segments rather than broad reach',
      'Prioritized provenance, archival documentation, and vault authentication signals throughout the buying journey',
    ],
    results: [
      { label: 'Pipeline generated', value: '₹4.2Cr+' },
      { label: 'Average order value', value: '₹8.4 Lakhs' },
      { label: 'Buyer segment', value: 'Verified HNW collectors' },
    ],
    testimonial: {
      quote:
        'Selling rare Patek Philippe and Rolex references online requires bulletproof credibility. Qala Labs crafted a digital provenance experience that gave collectors complete confidence, driving over ₹4.2Cr in verified pipeline.',
      name: 'Rohan Kapoor',
      role: 'Founder & Horological Curator, Chrono Seconds',
    },
  },
  {
    slug: 'gaffar-india',
    title: 'Gaffar India',
    subtitle: 'Market Stall to Digital Multi-Vendor Marketplace',
    result: '6 Asset Packages • 28-Day Delivery',
    thumb: '/assets/qala/gaffar-new-logo.webp',
    category: 'Brand Identity & Web',
    challenge:
      'Gaffar India carried decades of local market trust as a physical stall business, but had no digital identity or infrastructure to bring that trust online as a multi-vendor marketplace.',
    approach: [
      'Rebuilt the brand identity to balance Gaffar Market heritage with modern digital usability',
      'Shipped 6 complete asset packages covering brand, web, and marketplace UI',
      'Delivered the full rebrand and platform in a rapid 28-day sprint',
    ],
    results: [
      { label: 'Asset packages delivered', value: '6' },
      { label: 'Delivery timeline', value: '28 days' },
      { label: 'Merchant onboarding', value: '120+ vendors live on day one' },
    ],
    testimonial: {
      quote:
        'Qala Labs helped us turn a local market legacy into a modern marketplace identity. Their strategy balanced our Gaffar Market roots with digital usability — our sellers felt seen, buyers trusted the site more, and the brand is finally ready to scale.',
      name: 'Akaash Maskeen',
      role: 'Founder & CEO, Gaffar India',
    },
  },
  {
    slug: 'capital-keys',
    title: 'Capital Keys',
    subtitle: 'Real Estate Proptech Platform & CRM Engine',
    result: '64.7% Conversion • 17+ Leads',
    thumb: 'https://images.unsplash.com/photo-1486324803388-c52646db42da?auto=format&fit=crop&q=80&w=1200',
    category: 'Web App & CRM',
    challenge:
      'Capital Keys needed a real estate platform that could convert serious property inquiries into qualified leads without losing buyers to a clunky web experience.',
    approach: [
      'Designed and built a proptech web app with an integrated CRM for lead capture',
      'Optimized the inquiry-to-lead flow to remove friction at every step',
      'Built the platform to serve as the single source of truth for the sales pipeline',
    ],
    results: [
      { label: 'Inquiry-to-lead conversion', value: '64.7%' },
      { label: 'Qualified leads', value: '17+ in initial rollout' },
      { label: 'Agent response latency', value: '< 90 seconds via webhook' },
    ],
  },
  {
    slug: 'marksops-autonomous-swarm',
    title: 'MarksOps Autonomous Operations Swarm',
    subtitle: 'Enterprise AI Agent Orchestration',
    result: '94% Less Manual Drag • 24/7 Autonomy',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    category: 'AI & Automation',
    challenge:
      'Internal marketing, CRM lead scoring, and financial reconciliation required hours of daily manual spreadsheet reconciliation and repetitive copy-pasting between disparate software tools.',
    approach: [
      'Engineered an autonomous multi-agent swarm architecture with persistent state checkpointing',
      'Integrated real-time webhooks connecting advertising spend, bank feeds, and CRM statuses',
      'Deployed self-correcting error recovery routines allowing swarms to operate continuously without human intervention',
    ],
    results: [
      { label: 'Manual task reduction', value: '94% automated' },
      { label: 'Processing latency', value: '< 1.4 seconds per event' },
      { label: 'Weekly hours saved', value: '160+ team hours' },
    ],
    testimonial: {
      quote:
        'MarksOps proved that AI agents are no longer experimental prototypes. They run our operational backbone 24/7 with zero hallucinations and complete financial auditability.',
      name: 'Aashirwad Sharma',
      role: 'Founder & Head of Systems, Qala Labs',
    },
  },
  {
    slug: 'amazon-ads-scaling',
    title: 'Amazon Ads Scaling',
    subtitle: 'D2C Advertising Engine & Algorithmic Bidding',
    result: '11.2x ROAS • 47% Lower ACOS',
    thumb: '/assets/qala/amazon-ads-hero.webp',
    category: 'Amazon Performance',
    challenge:
      'A D2C brand selling on Amazon was spending aggressively on ads but watching ACOS creep upward without a proportional gain in scale.',
    approach: [
      'Rebuilt the Amazon advertising account structure around a performance-first bidding architecture',
      'Systematically cut wasted spend while reallocating budget toward proven high-ROAS placements',
      'Layered in continuous creative and keyword testing to keep performance compounding',
    ],
    results: [
      { label: 'ROAS', value: '11.2x' },
      { label: 'ACOS reduction', value: '47% lower' },
      { label: 'Organic rank boost', value: 'Top 3 for primary search terms' },
    ],
  },
  {
    slug: 'kashmiri-sound-movement',
    title: 'The Kashmiri Sound Movement',
    subtitle: 'Mystic Studio 8 Label Launch & Organic Reach',
    result: '3.4M+ Views • Zero Ad Spend',
    thumb: '/assets/qala/kashmir-street-musician.webp',
    category: 'Cultural Movement',
    challenge:
      'Mystic Studio 8 needed to launch a new music label rooted in Kashmiri sound and street culture without a paid media budget to manufacture reach.',
    approach: [
      'Built a cultural movement narrative around authentic Kashmiri street musicians rather than a conventional label launch',
      'Prioritized organic distribution and shareability over paid amplification',
      'Let the story and the music carry the launch rather than manufactured hype',
    ],
    results: [
      { label: 'Views generated', value: '3.4M+' },
      { label: 'Ad spend', value: '₹0 (fully organic)' },
      { label: 'Streaming saves', value: '42,000+ Spotify saves' },
    ],
  },
  {
    slug: 'd2c-bnpl-strategy',
    title: 'D2C BNPL Strategy',
    subtitle: 'Payment Architecture Optimization & AOV Expansion',
    result: '15-30% Conversion Uplift',
    thumb: '/assets/qala/bnpl-featured.webp',
    category: 'Growth Architecture',
    challenge:
      'A D2C brand was losing checkout conversions to price hesitation at the final step, with no flexible payment options to bridge the gap for hesitant buyers.',
    approach: [
      'Audited the checkout flow to isolate where price hesitation was costing conversions',
      'Introduced and optimized Buy-Now-Pay-Later placement across the purchase funnel',
      'Tuned messaging around the new payment architecture to normalize its use at checkout',
    ],
    results: [
      { label: 'Conversion uplift', value: '15–30%' },
      { label: 'Cart abandonment drop', value: '22% reduction' },
      { label: 'Average order value', value: '+18% increase' },
    ],
  },
];

export const getCaseStudyBySlug = (slug?: string) =>
  caseStudies.find((c) => c.slug === slug);
