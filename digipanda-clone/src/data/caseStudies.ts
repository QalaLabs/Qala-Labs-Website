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
    subtitle: 'B2B Market Validation',
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
    subtitle: 'High-Ticket Travel Funnel',
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
    ],
    testimonial: {
      quote:
        'We had zero paying customers for our high-ticket Spain trip despite running traditional travel ads. Qala Labs stepped in, rewrote our narrative with founder-led storytelling, and generated ₹14 Lakhs in revenue at a staggering 28x ROAS.',
      name: 'Siddharth Roy',
      role: 'Co-Founder & CEO, Trotr',
    },
  },
  {
    slug: 'wwf-india',
    title: 'WWF India',
    subtitle: 'AI Ad Creative System',
    result: '80% Lower Cost • 50+ Creatives/wk',
    thumb: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    category: 'Generative AI',
    challenge:
      'WWF India needed a constant stream of high-quality wildlife and conservation creative to keep campaigns fresh, but traditional production and shoot cycles could not keep pace with the volume or the budget conservation marketing demands.',
    approach: [
      'Designed a generative AI creative pipeline focused on hyper-realistic wildlife and habitat imagery',
      'Built a repeatable system producing dozens of on-brand creative variations per week',
      'Kept every output aligned to WWF India’s conservation storytelling and visual standards',
    ],
    results: [
      { label: 'Cost per creative', value: '80% lower' },
      { label: 'Output pace', value: '50+ creatives / week' },
    ],
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
      'Prioritized provenance and trust signals throughout the buying journey',
    ],
    results: [
      { label: 'Pipeline generated', value: '₹4.2Cr+' },
      { label: 'Buyer segment', value: 'High-net-worth collectors' },
    ],
  },
  {
    slug: 'playr-ipl-merchandise',
    title: 'playR IPL Merchandise',
    subtitle: '8 IPL Franchises Merch Ecosystem',
    result: '₹2.5Cr+ Merchandise Revenue',
    thumb: 'https://images.unsplash.com/photo-1552667466-07d71e725e34?auto=format&fit=crop&q=80&w=1200',
    category: 'E-commerce & Retail',
    challenge:
      'Designing and deploying merchandise across 8 different IPL franchises simultaneously required both design consistency and manufacturing discipline at a scale most agencies aren’t built to handle.',
    approach: [
      'Delivered full technical design packs standardized across all 8 franchise partners',
      'Built fan loyalty funnels tuned to each franchise’s distinct fanbase',
      'Coordinated production and go-to-market timing around the IPL season calendar',
    ],
    results: [
      { label: 'Merchandise revenue', value: '₹2.5Cr+' },
      { label: 'Franchises covered', value: '8 IPL teams' },
    ],
    testimonial: {
      quote:
        'Designing and deploying merchandise systems across 8 IPL franchises requires serious design finesse and manufacturing discipline. Qala Labs delivered full technical packs and fan loyalty funnels that generated ₹2.5Cr+ across teams.',
      name: 'Vikram Mehta',
      role: 'Head of Brand & Merchandising, playR (IPL Partner)',
    },
  },
  {
    slug: 'gaffar-india',
    title: 'Gaffar India',
    subtitle: 'Market Stall to Digital Marketplace',
    result: '6 Asset Packages • 28-Day Delivery',
    thumb: '/assets/qala/gaffar-new-logo.webp',
    category: 'Brand Identity & Web',
    challenge:
      'Gaffar India carried decades of local market trust as a physical stall business, but had no digital identity or infrastructure to bring that trust online as a multi-vendor marketplace.',
    approach: [
      'Rebuilt the brand identity to balance Gaffar Market heritage with modern digital usability',
      'Shipped 6 complete asset packages covering brand, web, and marketplace UI',
      'Delivered the full rebrand and platform in a 28-day sprint',
    ],
    results: [
      { label: 'Asset packages delivered', value: '6' },
      { label: 'Delivery timeline', value: '28 days' },
    ],
    testimonial: {
      quote:
        'Qala Labs helped us turn a local market legacy into a modern marketplace identity. Their strategy balanced our Gaffar Market roots with digital usability — our sellers felt seen, buyers trusted the site more, and the brand is finally ready to scale.',
      name: 'Akaash Maskeen',
      role: 'Founder & CEO, Gaffar India',
    },
  },
  {
    slug: 'kashmiri-sound-movement',
    title: 'The Kashmiri Sound Movement',
    subtitle: 'Mystic Studio 8 Label Launch',
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
    ],
  },
  {
    slug: 'capital-keys',
    title: 'Capital Keys',
    subtitle: 'Real Estate Proptech Platform',
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
      { label: 'Qualified leads', value: '17+' },
    ],
  },
  {
    slug: 'amazon-ads-scaling',
    title: 'Amazon Ads Scaling',
    subtitle: 'D2C Advertising Engine',
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
    ],
  },
  {
    slug: 'd2c-bnpl-strategy',
    title: 'D2C BNPL Strategy',
    subtitle: 'Payment Architecture Optimization',
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
    ],
  },
];

export const getCaseStudyBySlug = (slug?: string) =>
  caseStudies.find((c) => c.slug === slug);
