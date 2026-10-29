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
    slug: 'district-movies-transit',
    title: 'District Movies (Zomato)',
    subtitle: 'Hyperlocal Mumbai Transit Saturation & Scan-to-Book Funnel',
    result: '9 Mumbai Clusters • 6 Station Hubs',
    thumb: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=1200',
    category: 'Transit & OOH Growth',
    challenge:
      'District (by Zomato) needed to scale theatre movie-ticket bookings across Mumbai. While digital influencer campaigns drove curiosity, commuters lacked high-frequency physical touchpoints at daily transit choke points to trigger immediate ticket reservations.',
    approach: [
      'Mapped 9 high-density commuter clusters across Mumbai: Malad, Vasai, Borivali, Kalyan, Thane, Navi Mumbai, Andheri, and airport arterial routes',
      'Orchestrated auto-rickshaw fleet saturation combined with commuter domination across 6 major railway station nodes',
      'Integrated scan-to-book QR codes on all physical assets, routing directly into localized District app theatre listings with exclusive ticket offers',
    ],
    results: [
      { label: 'Geographic saturation', value: '9 high-density Mumbai clusters' },
      { label: 'Commuter nodes', value: '6 major railway hubs dominated' },
      { label: 'Booking friction', value: 'Instant QR routing to nearest 2-3 theatres' },
    ],
    testimonial: {
      quote:
        'Qala Labs bridged our digital influencer campaign with unavoidable physical daily frequency across Mumbai. Combining auto-rickshaw saturation with railway node branding and QR booking routes gave District cinema bookings massive local lift.',
      name: 'Soumya',
      role: 'Growth & Marketing Lead, District (Zomato)',
    },
  },
  {
    slug: 'ranfort-wellness-audit',
    title: 'Ranfort Wellness (Vedique)',
    subtitle: '246-URL Full-Stack Ecosystem Audit & Regulatory De-Risking',
    result: '246 URLs Audited • 5 Funnel 404s Resolved',
    thumb: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200',
    category: 'Technical Audit & Growth',
    challenge:
      'Ranfort Wellness operated across three fragmented domains (drshikhasharma.com, vedique.life, ranfortwellness.com) with 246 URLs plagued by broken funnel links (404s on high-intent blog traffic), 830KB payload bloat, and regulatory exposure under ASCI and Magic Remedies regulations in active ad campaigns.',
    approach: [
      'Executed an automated Python agent-reach crawl across all 246 URLs, uncovering HTTP errors, header caching defects, heading hierarchy breaks (4 H1s per post), and missing OpenGraph metadata',
      'Synthesized 438 multi-platform app reviews to pinpoint client attrition factors: billing opacity, response latency, and onboarding bottlenecks',
      'Restructured Meta and Google ad messaging away from high-risk medical disease claims into ASCI-compliant dietary lifestyle propositions, fixing expired festive offers and fragmented landing domains',
    ],
    results: [
      { label: 'Technical crawl depth', value: '246 URLs across 3 brand domains' },
      { label: 'Funnel leaks patched', value: '5 critical 404 cross-domain routes' },
      { label: 'Regulatory de-risking', value: '100% ASCI & Magic Remedies alignment' },
    ],
  },
  {
    slug: 'mizuno-india-launch',
    title: 'Mizuno India',
    subtitle: 'Commercial Production Shoot & 10-Week Pre-Launch Runway',
    result: '2-Day Shoot • 5 Creative Themes',
    thumb: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1200',
    category: 'Production & Shoots',
    challenge:
      'Mizuno needed to enter the competitive Indian sports performance footwear market timed with the World Badminton Championship in New Delhi. They required an authentic narrative grounded in Japanese craftsmanship without resorting to generic lifestyle clichés.',
    approach: [
      'Developed a 10-week pre-launch influencer runway structured around 5 creative themes: "Made in Silence", "Delhi Before the Arena", "The 1%", "The Coach Knows", and "First Blood"',
      'Directed a 2-day multi-location commercial production shoot in New Delhi across elite competition indoor courts and golden-hour outdoor training parks',
      'Captured cinema-grade athletic motion sequences, product engineering macro sequences, and unscripted coach testimonials for D2C e-commerce launch',
    ],
    results: [
      { label: 'Commercial shoot scope', value: '2-day multi-location 4K cinema capture' },
      { label: 'Creative themes', value: '5 distinct narrative blocks produced' },
      { label: 'Market runway', value: '10-week pre-launch athlete & coach campaign' },
    ],
    testimonial: {
      quote:
        "Qala Labs didn't just produce videos; they built an entire cinematic world around Mizuno's Japanese craft and Indian athletic grit. The 5 creative themes resonated deeply with academy coaches and elite athletes alike.",
      name: 'Karan Singhal',
      role: 'Country Marketing Director, Mizuno India',
    },
  },
  {
    slug: 'better-eats-whatsapp-funnel',
    title: 'Better Eats',
    subtitle: 'Click-to-WhatsApp Conversational Funnel & Attribution Engine',
    result: '100% Attributed Orders • Sub-2-Min Turnaround',
    thumb: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    category: 'Meta Lead Gen',
    challenge:
      'Better Eats faced high drop-off rates on mobile web checkouts where hungry customers abandoned food orders midway through multi-step forms. They needed a zero-friction conversational ordering experience directly inside WhatsApp.',
    approach: [
      'Built high-intent Instagram and Facebook ad campaigns with Click-to-WhatsApp deep links opening dynamic pre-populated order chats',
      'Configured the WhatsApp Business catalog, interactive menu browsing, instant greetings, and quick-reply decision trees',
      'Engineered standard operating operator scripts for address verification, automatic delivery charge calculation, and monthly attributed revenue tracking',
    ],
    results: [
      { label: 'Order attribution', value: '100% verified from ad click to delivery' },
      { label: 'Confirmation speed', value: '< 2 minutes per WhatsApp order' },
      { label: 'Form abandonment', value: 'Eliminated via conversational cart drawer' },
    ],
  },
  {
    slug: 'nectar-loyalty-engine',
    title: 'Nectar Loyalty Engine',
    subtitle: 'High-Concurrency Dual-Currency Progression Architecture',
    result: 'Dual-Currency • 7-Stage Security Pipeline',
    thumb: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200',
    category: 'Web App & Architecture',
    challenge:
      'High-volume merchandise brands need customer retention without bleeding margin through unconstrained discount stacking. Nectar required a loyalty system that separated spendable currency from lifetime VIP status while strictly defending unit economics and preventing API abuse during high-traffic drops.',
    approach: [
      'Architected a dual-currency engine: Nectar Points (spendable at 1 Pt = ₹1) and Nectar XP (lifetime progression score unlocking 5 VIP tiers: Rookie, Pro, Legend, Creators, Talent) with an automated 50% XP mirroring rule',
      'Implemented a 10% maximum order value spend cap rule to ensure every transaction preserves positive margin over base product costs and fulfillment',
      'Built a strict 7-stage server-side validation pipeline on Google Cloud Run: Identity verification, 20 req/min rate limiting, lifetime usage caps, tier multiplier validation, and tamper-proof ledger updates',
    ],
    results: [
      { label: 'VIP progression', value: '5 tiers with dynamic 5 pts/₹100 earn rate' },
      { label: 'Margin defense', value: '10% strict order spend limit guardrail' },
      { label: 'API security', value: '7-stage validation pipeline on Cloud Run' },
    ],
  },
];

export const getCaseStudyBySlug = (slug?: string) =>
  caseStudies.find((c) => c.slug === slug);
