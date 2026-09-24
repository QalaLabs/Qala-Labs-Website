export interface CreatorTrack {
  id: string;
  title: string;
  badge: string;
  description: string;
  deliverables: string[];
  tools: string[];
  idealFor: string;
}

export interface CreatorPerk {
  title: string;
  description: string;
  stat?: string;
}

export const creatorTracks: CreatorTrack[] = [
  {
    id: 'short-form-ugc',
    title: 'Short-Form Video & UGC Virtuosos',
    badge: '100M+ VIEWS',
    description:
      'Master the first 3 seconds. Create scroll-stopping TikToks, Instagram Reels, and YouTube Shorts for international D2C brands, sports franchises, and high-growth apps.',
    deliverables: [
      'Authentic founder/creator style UGC videos',
      'High-velocity hook testing packs (5 hooks × 2 bodies)',
      'Product unboxing & cinematic lifestyle showcases',
      'Viral reaction & storytelling formats',
    ],
    tools: ['CapCut', 'Premiere Pro', 'DaVinci Resolve', 'iPhone 15/16 Pro / Sony FX3'],
    idealFor: 'On-camera creators, lifestyle storytellers, and conversion-focused video directors.',
  },
  {
    id: '3d-motion-cgi',
    title: '3D Motion & CGI Visualists',
    badge: 'CINEMATIC POLISH',
    description:
      'Push past flat design. Build physics-defying product reveals, futuristic industrial renderings, and hyper-realistic CGI mockups for luxury and tech brands.',
    deliverables: [
      'Photorealistic 3D product animations & explodes',
      'Futuristic typography & motion graphic bumpers',
      'Real-time WebGL asset preparation for interactive sites',
      'Virtual production & visual effects compositing',
    ],
    tools: ['Blender', 'Cinema 4D', 'Octane / Redshift', 'After Effects', 'Unreal Engine 5'],
    idealFor: '3D artists, motion designers, and industrial design visualizers.',
  },
  {
    id: 'ai-prompt-cinema',
    title: 'AI Filmmakers & Prompt Architects',
    badge: 'NEXT-GEN GENERATIVE',
    description:
      'Pioneer AI cinematography. Blend diffusion models, custom LoRAs, and cinematic prompts to build hyper-creative visual worlds previously restricted to \$500K Hollywood budgets.',
    deliverables: [
      'Hyper-realistic AI cinematic commercial spots',
      'Custom visual worldbuilding & brand lookbooks',
      'Generative concept art & key visual exploration',
      'Hybrid AI + live-action motion integration',
    ],
    tools: ['Midjourney v6', 'Flux', 'ComfyUI', 'Runway Gen-3 Alpha', 'Kling AI', 'Luma Dream Machine'],
    idealFor: 'AI artists, concept visualizers, and experimental directors.',
  },
  {
    id: 'creative-dev',
    title: 'Creative Technologists & Web Experimenters',
    badge: 'CODE AS ART',
    description:
      'Build generative web canvas experiences, interactive micro-sites, GLSL shader experiments, and dynamic product customizers that redefine the browser experience.',
    deliverables: [
      'Interactive 3D landing page hero sections',
      'Custom Three.js particle systems and physics simulations',
      'Dynamic audio-reactive visualizers',
      'Generative SVG / CSS micro-animations',
    ],
    tools: ['Three.js', 'React Three Fiber', 'GLSL', 'Vite', 'Tailwind', 'WebGPU'],
    idealFor: 'Creative developers, frontend artists, and interactive web craftsmen.',
  },
];

export const creatorPerks: CreatorPerk[] = [
  {
    title: 'Enterprise Brand Deal Flow',
    description: 'Direct access to paid briefs from global brands (WWF, Mizuno, playR, international startups) with zero pitching friction.',
    stat: '100% Paid Briefs',
  },
  {
    title: 'Qala AI Supercharged Tooling',
    description: 'Free access to our internal generative pipelines, automated b-roll generators, voice dubbing, and MarksOps asset managers.',
    stat: '10x Speed',
  },
  {
    title: 'Rapid 72-Hour Payout Cycles',
    description: 'No waiting 60 or 90 days for agency invoices to clear. We pay verified creators within 72 hours of brief sign-off.',
    stat: '72h Clear',
  },
  {
    title: 'Performance ROAS Revenue-Share',
    description: 'Earn upfront creative fees plus upside royalties when your creative hits breakthrough ad ROAS benchmarks.',
    stat: 'Up to 20% Upside',
  },
];

// Agency Collective Models & Data
export interface AgencyModel {
  id: string;
  title: string;
  badge: string;
  headline: string;
  description: string;
  features: string[];
  bestFor: string;
}

export interface AgencyBenefit {
  title: string;
  description: string;
  metric: string;
}

export const agencyModels: AgencyModel[] = [
  {
    id: 'white-label',
    title: 'White-Label AI & Engineering Infrastructure',
    badge: '100% UNBRANDED BACKING',
    headline: 'You own the client relationship. We power the deep tech.',
    description:
      'Deliver complex autonomous AI agent swarms, bespoke 3D WebGL experiences, and high-scale full-stack platforms under your agency brand. We operate as your elite upstream engineering SWAT team.',
    features: [
      'Dedicated solution engineers attending scoping calls under your domain',
      'Custom instance deployment of MarksOps autonomous multi-agent pipelines',
      'Strict NDAs and unbranded repositories, documentation, and staging links',
      'Guaranteed enterprise SLAs with 24/7 technical on-call escalation',
    ],
    bestFor: 'Boutique design studios, marketing agencies, and consultancies wanting to close \$50k-\$200k technical contracts without hiring 10 engineers.',
  },
  {
    id: 'co-pitch',
    title: 'Enterprise Joint Ventures & Co-Pitching',
    badge: 'WIN BIGGER TENDERS',
    headline: 'Partner with Qala Labs to win enterprise RFPs that neither could take alone.',
    description:
      'When your dream client requires both high-touch agency creative and deep enterprise AI/systems architecture, pitch together. Combine your brand resonance with Qala Labs deep tech pedigree.',
    features: [
      'Joint RFP response architecture and tailored technical proposal decks',
      'Direct pitch participation from Qala Labs technical founders and AI architects',
      'Transparent revenue split and unified project delivery governance',
      'Shared case study rights and co-branded industry thought leadership',
    ],
    bestFor: 'Established agencies competing against monolithic consulting giants (Accenture, Publicis, Deloitte) for digital transformation projects.',
  },
  {
    id: 'referral-syndicate',
    title: 'Inbound Referral & Reciprocal Deal Flow',
    badge: 'HIGH MARGIN REVENUE',
    headline: 'Monetize leads outside your niche and receive qualified referrals.',
    description:
      'Do clients ask you for custom AI agent swarms, complex marketplace architectures, or deep Three.js work that falls outside your core focus? Route them to Qala Labs and earn generous recurring retainers.',
    features: [
      'Up to 20% recurring referral commission on total project value or monthly retainers',
      'Reciprocal referral priority: We route branding, PR, and regional media requests back to our certified partner network',
      'Transparent deal tracking dashboard and immediate fee disbursements',
      'Zero operational overhead or delivery responsibility on your end',
    ],
    bestFor: 'Agencies with high inbound deal flow looking to create a passive, high-margin revenue stream while serving their clients better.',
  },
];

export const agencyBenefits: AgencyBenefit[] = [
  {
    title: 'Margin Expansion',
    description: 'Keep your core team lean while scaling billable project capacity by up to 300%.',
    metric: 'Up to 35% Margins',
  },
  {
    title: 'Rapid Scoping & Turnaround',
    description: 'Receive detailed technical architectures and fixed-scope pricing estimates within 48 hours.',
    metric: '48h Scoping',
  },
  {
    title: 'Production-Proven IP',
    description: 'Deploy battle-tested autonomous agents and 3D web engines that already power global brands.',
    metric: 'Zero Toy Tools',
  },
  {
    title: 'Global Delivery Footprint',
    description: 'Engineers, technical directors, and AI researchers across London, Delhi NCR, Dubai, and Amsterdam.',
    metric: '4 Timezones',
  },
];
