export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  client: string;
  category:
    | 'AI Creative'
    | 'Web Development'
    | 'Content Creation'
    | 'Production & Shoots'
    | 'Brand Systems'
    | 'Performance Marketing'
    | '3D & WebGL';
  year: string;
  coverImage: string;
  summary: string;
  impactMetric: string;
  deliverables: string[];
  technologies: string[];
  liveUrl?: string;
  caseStudySlug?: string;
  featured?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'wwf-india-featured',
    slug: 'wwf-ai-creative-studio',
    title: 'WWF India: AI Ad Creatives',
    client: 'WWF India',
    category: 'AI Creative',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    summary:
      'Generative AI creative pipeline trained on conservation guidelines, delivering wildlife campaign assets at 80% lower production cost.',
    impactMetric: '80% Lower Production Cost • 50+ Assets/Wk',
    deliverables: [
      'Bespoke LoRA Model Fine-Tuning',
      'ComfyUI Node-Based Multi-Format Generation',
      'Aspect Ratio Batch Export Pipeline (9:16, 1:1, 16:9)',
      'Brand Guideline Automated Enforcement Guardrails',
    ],
    technologies: ['ComfyUI', 'Flux', 'PyTorch', 'Next.js', 'Python', 'Tailwind'],
    featured: true,
  },
  {
    id: 'capital-keys-featured',
    slug: 'capital-keys-real-estate-platform',
    title: 'Capital Keys: Real Estate Platform',
    client: 'Capital Keys',
    category: 'Web Development',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    summary:
      'High-converting luxury proptech web platform featuring interactive property map filters, buyer registration funnels, and real-time CRM webhooks.',
    impactMetric: '17+ Leads • 64.7% Conversion',
    deliverables: [
      'Custom React Proptech Architecture',
      'Interactive Map & Property Tour Hub',
      'Real-Time Broker CRM Webhook Engine',
      'Instant Lead Qualification Funnel',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Twilio API', 'SendGrid'],
    caseStudySlug: 'capital-keys',
    featured: true,
  },
  {
    id: 'amazon-ads-featured',
    slug: 'amazon-ads-scaling',
    title: 'Amazon Ads: Performance Scaling',
    client: 'Amazon Brand Ecosystem',
    category: 'Performance Marketing',
    year: '2025',
    coverImage: '/assets/qala/amazon-ads-hero.webp',
    summary:
      'Strategic restructuring of Amazon Sponsored Products and Brand placements, cutting wasted spend and maximizing conversion share.',
    impactMetric: '11.2x ROAS • ₹2.7L Sales',
    deliverables: [
      'Sponsored Products & Brand Store Restructuring',
      'Algorithmic Dayparting & Bid Management',
      'Negative Keyword Harvesting Routines',
      'ACOS Leak Elimination Architecture',
    ],
    technologies: ['Amazon Advertising Console', 'Helium 10', 'Dataflow', 'BigQuery'],
    caseStudySlug: 'amazon-ads-scaling',
    featured: true,
  },
  {
    id: 'streetplayr-featured',
    slug: 'streetplayr-storefront',
    title: 'StreetplayR: Brand, UX & Storefront',
    client: 'playR Streetwear',
    category: 'Web Development',
    year: '2025',
    coverImage: '/assets/qala/streetplayr/hero.jpg',
    summary:
      'Custom e-commerce build and brand system for playR’s urban streetwear division, optimized for mobile conversion velocity and drop culture.',
    impactMetric: 'Brand System + Commerce Build',
    deliverables: [
      'Headless Shopify Plus Front-End Architecture',
      'Drop-Countdown Notification Modules',
      'Mobile-First Cart Drawer & Fast Checkout Flow',
      'Streetwear Design System & Typography Pack',
    ],
    technologies: ['Shopify Plus', 'React', 'Liquid', 'Tailwind CSS', 'Figma'],
    featured: true,
  },
  {
    id: 'instagram-ugc-featured',
    slug: 'instagram-ugc-lifestyle',
    title: 'Instagram UGC: Style Meets Real Life',
    client: 'D2C Apparel & Lifestyle Brands',
    category: 'Content Creation',
    year: '2025',
    coverImage: '/assets/qala/csk-ugc-hero.webp',
    summary:
      'Relatable creator-led short-form content designed to bypass ad blindness and convert organic social scrollers into first-time buyers.',
    impactMetric: 'Relatability Converts Better',
    deliverables: [
      'Creator Casting & Briefing Protocols',
      'High-Conversion Hook Scripting',
      '9:16 Vertical Video Production & Color Grading',
      'Meta Whitelisting & Dark Post Orchestration',
    ],
    technologies: ['CapCut Pro', 'Premiere Pro', 'Meta Ads Manager', 'Figma'],
    featured: true,
  },
  {
    id: 'csk-influencer-featured',
    slug: 'playr-real-fans-content',
    title: 'playR: Real Fans, Real Roar',
    client: 'playR Merchandise (Official IPL Merchandise Partner)',
    category: 'Content Creation',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1552667466-07d71e725e34?auto=format&fit=crop&q=80&w=1200',
    summary:
      'Viral fan loyalty campaigns, matchday content, and official team merchandise kits engineered for playR x Chennai Super Kings Merch for IPL 2025 and 7 other IPL franchises.',
    impactMetric: 'Viral Fandom Momentum • 12,000+ Orders',
    deliverables: [
      'Franchise Technical Design Packs (Apparel & Accessories)',
      'Matchday Social Fandom Video Challenges',
      'High-Concurrency Matchday Shopify Plus Architecture',
      'Official Chennai Super Kings Fan Merchandise Packaging',
    ],
    technologies: ['Shopify Plus', 'Figma', 'Liquid', 'React', 'Meta CAPI'],
    featured: true,
  },
  {
    id: 'mizuno-india-featured',
    slug: 'mizuno-india-launch-production',
    title: 'Mizuno India: Launch Campaign',
    client: 'Mizuno India',
    category: 'Production & Shoots',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1200',
    summary:
      'Commercial multi-day production shoot capturing Mizuno’s elite running footwear and apparel in dynamic athletic motion across track and turf.',
    impactMetric: '2-Day Shoot • 5 Content Themes',
    deliverables: [
      'Full On-Location Commercial Shoot Direction',
      'Athlete Action Capture & Slow-Mo Video Packs',
      'High-Res Commercial Hero Banners for D2C Store',
      'Social Cutdowns & Paid Ad Performance Variants',
    ],
    technologies: ['Sony FX6 Cinema', 'DaVinci Resolve', 'Capture One', 'Photoshop'],
    featured: true,
  },
  {
    id: 'hi-astro-featured',
    slug: 'hi-astro-ai-character-videos',
    title: 'Hi Astro: AI Character Videos',
    client: 'Hi Astro Media',
    category: 'AI Creative',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    summary:
      'Automated synthetic media pipeline generating 48 hyper-realistic AI character videos in 9:16 vertical format with automated lip-sync.',
    impactMetric: '48 Videos • 9:16 Vertical',
    deliverables: [
      'Synthetic AI Persona Character Rigging',
      'Automated Script Generation & Voice Synthesis',
      'Dynamic Lip-Sync & Micro-Expression Alignment',
      'Batch Video Rendering & Export Pipeline',
    ],
    technologies: ['ElevenLabs', 'ComfyUI', 'HeyGen API', 'Python', 'FFmpeg'],
    featured: true,
  },
  {
    id: 'billu-campaign-featured',
    slug: 'billu-salon-social-content',
    title: 'Billu: Salon-at-Home Content',
    client: 'Billu Care',
    category: 'Content Creation',
    year: '2025',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200',
    summary:
      'Monthly creator program producing 15 native beauty and salon-at-home demonstration videos highlighting trust, hygiene, and convenience.',
    impactMetric: '15 Posts/Month • Creator-Led',
    deliverables: [
      'Regional Creator Onboarding & Storyboard Briefs',
      'Hygiene Verification Narrative Framework',
      'Call-To-Action Booking App Link Embeds',
      'Monthly Retargeting Ad Refresh Batches',
    ],
    technologies: ['Meta Creator Studio', 'CapCut Pro', 'Canva Enterprise', 'Airtable'],
    featured: false,
  },
  {
    id: 'airtel-business-featured',
    slug: 'airtel-business-exhibition',
    title: 'Airtel Business: Exhibition Coverage',
    client: 'Airtel Business',
    category: 'Production & Shoots',
    year: '2024',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
    summary:
      'High-impact enterprise video coverage capturing Airtel’s flagship B2B technology exhibition, keynote demos, and executive partner interactions.',
    impactMetric: 'Enterprise B2B Launch Coverage',
    deliverables: [
      'Multi-Cam On-Site Event Video Production',
      'Executive Leadership Soundbites & Micro-Interviews',
      'Same-Day Social Highlight Teasers',
      'Post-Event Enterprise Recap Film for Key Accounts',
    ],
    technologies: ['Canon Cinema EOS', 'DJI Ronin', 'DaVinci Resolve', 'Premiere Pro'],
    featured: false,
  },
  {
    id: 'airborne-aviation-featured',
    slug: 'airborne-aviation-academy',
    title: 'Airborne Aviation: Pilot Academy Website',
    client: 'Airborne Aviation Academy',
    category: 'Web Development',
    year: '2025',
    coverImage: '/portfolio/airborne-aviation/hero.jpg',
    summary:
      'Complete digital academy platform featuring commercial pilot training course catalogs, alumni airline route maps, and admission inquiry flows.',
    impactMetric: 'Course Catalog + Alumni Route Map',
    deliverables: [
      'Bespoke Aviation Training Website UI/UX',
      'Interactive Flight Hours & Fleet Explorer',
      'Admission Screening Application Workflow',
      'Automated Counselor CRM Routing',
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    featured: true,
  },
  {
    id: 'gaffar-india-featured',
    slug: 'gaffar-india-marketplace',
    title: 'Gaffar India: Wholesale & Retail Marketplace',
    client: 'Gaffar India',
    category: 'Web Development',
    year: '2025',
    coverImage: '/portfolio/gaffar-india/hero-thumb.jpg',
    summary:
      'Multi-vendor electronics marketplace bringing 120+ merchants and 1,000+ SKUs online with fast merchant payouts and consumer counterfeit protections.',
    impactMetric: 'Multi-Vendor Marketplace • 1,000+ SKUs',
    deliverables: [
      'Multi-Vendor Architecture & Merchant Onboarding Hub',
      '1,000+ Electronics SKU Catalog Database',
      'Automated Merchant Escrow & Settlement Ledger',
      'Mobile-Optimized Fast Checkout Experience',
    ],
    technologies: ['Next.js', 'PostgreSQL', 'Node.js', 'Tailwind CSS', 'Razorpay'],
    caseStudySlug: 'gaffar-india',
    featured: true,
  },
  {
    id: 'shakti-bhog-featured',
    slug: 'shakti-bhog-ugc-content',
    title: 'Shakti Bhog: Recipe-Led UGC Content',
    client: 'Shakti Bhog Foods',
    category: 'Content Creation',
    year: '2024',
    coverImage: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=1200',
    summary:
      'Authentic culinary recipe reels spotlighting staple wheat, flour, and grains in everyday household meals, driving viral organic engagement.',
    impactMetric: 'Creator-Led Recipe Reel',
    deliverables: [
      'Culinary Creator Cooking Series & Food Styling',
      'Traditional Recipe Video Directing & Editing',
      'Nutritional Fact Graphic Overlays',
      'Festive Campaign Organic Social Calendars',
    ],
    technologies: ['Premiere Pro', 'After Effects', 'Instagram Reels', 'YouTube Shorts'],
    featured: false,
  },
  {
    id: 'world-pickleball-league-featured',
    slug: 'world-pickleball-league',
    title: 'World Pickleball League Official Apparel & Brand System',
    client: 'World Pickleball League (CSC & Bharat Jammers)',
    category: 'Brand Systems',
    year: '2025',
    coverImage: '/assets/qala/pickleball/csc-banner.png',
    summary:
      'Complete pro tournament apparel identity, team kits, and performance fan merchandise system for the premier international pickleball circuit.',
    impactMetric: 'Pro-Tour Apparel & Merch Identity',
    deliverables: [
      'Pro-Tour Team Kits & Player Performance Jerseys',
      'Court-Side Event Merch & Fan Apparel Line',
      'Custom Typography & Team Badging System',
      'Manufacturing Tech Packs & Spec Sheets',
    ],
    technologies: ['Figma', 'Illustrator', 'Apparel Tech Packs', 'Shopify Plus'],
    featured: true,
  },
  {
    id: 'marksops-platform',
    slug: 'marksops-autonomous-suite',
    title: 'MarksOps Autonomous Operations Platform',
    client: 'Qala Labs Internal Software',
    category: 'AI Creative',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    summary:
      'Autonomous multi-agent swarms orchestrating marketing, CRM lead enrichment, financial reconciliation, and multi-channel attribution as a unified real-time system.',
    impactMetric: '94% Reduction in Manual Ops Drag',
    deliverables: [
      'Multi-Agent State Machine Architecture',
      'Event-Driven Streaming Queues (Redis/FastAPI)',
      'Vector Memory & Checkpointing (pgvector)',
      'Real-Time Webhook Reconciliation Engine',
    ],
    technologies: ['FastAPI', 'LangGraph', 'TypeScript', 'pgvector', 'Docker', 'Tailwind'],
    liveUrl: '/products/marksops',
    featured: true,
  },
  {
    id: 'volumetric-horizon-webgl',
    slug: 'volumetric-horizon-3d',
    title: 'Interactive 3D Volumetric Horizon WebGL Engine',
    client: 'Qala Labs Design Lab',
    category: '3D & WebGL',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
    summary:
      'Cinematic 60fps real-time WebGL interactive canvas rendering dual-core creative/data intelligence with physics-driven particles and audio reactivity.',
    impactMetric: '60 FPS Smooth Rendering across Mobile & Web',
    deliverables: [
      'Custom GLSL Fragment & Vertex Shaders',
      'Memory-Optimized Particle Buffers',
      'Dynamic Camera Spline Navigation',
      'Zero-Dependency Fallback Rendering',
    ],
    technologies: ['Three.js', 'WebGL', 'GLSL', 'Vite', 'TypeScript'],
    featured: true,
  },
];

export const getPortfolioProjectBySlug = (slug?: string): PortfolioProject | undefined =>
  portfolioProjects.find((p) => p.slug === slug);
