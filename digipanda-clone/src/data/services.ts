export interface ServiceItem {
  slug: string;
  name: string;
  track: 'AI' | 'Design' | 'Development' | 'Marketing';
  tagline: string;
  description: string;
  deliverables: string[];
  agents?: { slug: string; name: string; desc: string }[];
  proof?: { type: 'case-study' | 'product'; slug: string; label: string }[];
}

export const services: ServiceItem[] = [
  {
    slug: 'ai-automation',
    name: 'AI Automation',
    track: 'AI',
    tagline: 'Multi-agent systems that run marketing, sales, ops, and finance as one workflow.',
    description:
      "We don't bolt AI onto your stack — we build the agents ourselves. MarksOps, our in-house multi-agent operations platform, unifies a LangGraph agent engine with a FastAPI backend so Marketing, Sales, Operations, and Finance share one native data layer instead of six disconnected SaaS tools. On top of it runs a deployed ops-automation layer that ingests real vendor emails, CRM leads, and marketplace listings and turns them into staged, human-approved actions — never silent auto-execution.",
    deliverables: [
      'CRM lead intake & scoring agents with a 24-hour SLA-backed follow-up loop',
      'Finance-bill ingestion (Amazon VC, Meta/Google Ads, logistics, SaaS renewals) parsed and staged as draft entries — zero auto-posting, every write needs human approval',
      'Marketplace price-discrepancy crawler and multichannel inventory sync (Unicommerce)',
      'Post-purchase logistics tracking, NDR handling, and payment reconciliation agents (Shiprocket, gateway feeds)',
      'AI ad-creative generation that cut cost 80% and produced 50+ on-brand creatives/week for WWF India',
    ],
    agents: [
      { slug: 'financial-reconciliation-agent', name: 'Financial Reconciliation Agent', desc: 'Matches payment-gateway settlements against orders and bank feeds automatically, flags mismatches for human review — never auto-posts.' },
      { slug: 'finance-bills-agent', name: 'Finance Bills Agent', desc: 'Reads incoming vendor emails (Amazon VC, Meta/Google Ads, logistics, SaaS renewals), extracts and classifies spend, stages draft entries in Odoo ERP.' },
      { slug: 'ai-voice-receptionist', name: 'AI Voice Agent / Receptionist', desc: 'RAG-grounded voice agent that answers, qualifies, and routes calls 24/7, grounded in our own knowledge base.' },
      { slug: 'crm-leads-agent', name: 'CRM Leads Agent', desc: 'Scores inbound leads and enforces a 24-hour SLA-backed follow-up loop so nothing goes cold.' },
      { slug: 'marketplace-crawler', name: 'Marketplace Crawler', desc: 'Watches competitor and marketplace listings for price discrepancies and alerts the team in real time.' },
      { slug: 'inventory-sync-agent', name: 'Inventory Sync Agent', desc: 'Keeps stock levels consistent across channels via Unicommerce, so nothing oversells.' },
      { slug: 'logistics-ndr-agent', name: 'Logistics & NDR Agent', desc: 'Tracks post-purchase shipments end to end (Shiprocket) and manages non-delivery-report resolution automatically.' },
      { slug: 'tally-connector-agent', name: 'Tally Connector Agent', desc: 'Syncs approved financial entries into Tally Prime via a native XML connector.' },
      { slug: 'customer-support-agent', name: 'Customer Support Agent', desc: 'Handles omnichannel support conversations, escalating only what a human genuinely needs to see.' },
    ],
    proof: [
      { type: 'product', slug: 'marksops', label: 'MarksOps — the platform these agents run on' },
    ],
  },
  {
    slug: 'ai-voice-agents',
    name: 'AI Voice Agents',
    track: 'AI',
    tagline: 'A RAG-grounded voice agent that answers, qualifies, and routes calls 24/7.',
    description:
      "Our AI Receptionist is a voice agent built on retrieval-augmented generation — it answers calls grounded in your own knowledge base, not a generic script. It qualifies callers, answers common questions correctly the first time, and routes anything it can't resolve to the right human, so no lead sits in a missed-call log overnight.",
    deliverables: [
      'RAG pipeline grounded in your product docs, FAQs, and pricing — no hallucinated answers',
      '24/7 call answering, qualification, and routing to the right team member',
      'Booking and follow-up capture wired straight into your CRM/lead pipeline',
      'Call transcripts and structured summaries for every conversation',
    ],
    proof: [
      { type: 'product', slug: 'ai-receptionist', label: 'AI Receptionist — the product itself' },
    ],
  },
  {
    slug: 'branding',
    name: 'Branding',
    track: 'Design',
    tagline: 'Identity systems built for brands making the leap from stall to storefront to scale.',
    description:
      "Branding work at Qala Labs is judged by one thing: does it convert once it ships. We've taken a market-stall business to a full digital marketplace identity, launched an independent music label from zero, and built merchandise systems across 8 IPL franchises — always shipped as a real, usable asset kit, not a moodboard.",
    deliverables: [
      'Gaffar India: market-stall brand rebuilt into a full digital marketplace identity — 6 asset packages, 28-day delivery',
      'The Kashmiri Sound Movement: Mystic Studio 8 label launch — 3.4M+ views, zero ad spend, organic-only',
      'playR: 8 IPL franchise merchandise identity systems, ₹2.5Cr+ merchandise revenue',
      'Brand guideline kits, logo systems, and packaging design ready for production',
    ],
    proof: [
      { type: 'case-study', slug: 'gaffar-india', label: 'Gaffar India — market stall to digital marketplace' },
      { type: 'case-study', slug: 'kashmiri-sound-movement', label: 'The Kashmiri Sound Movement — label launch' },
    ],
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    track: 'Design',
    tagline: 'Interfaces designed around one metric: does the user complete the task.',
    description:
      "We design UI/UX for the products we then build — real estate portals, CRM dashboards, multi-vendor marketplaces — so the design has to survive contact with real workflows and real data, not just a Figma prototype. Capital Keys is the clearest proof: a proptech CRM/web-app interface that converted at 64.7% and generated 17+ qualified leads.",
    deliverables: [
      'Capital Keys: real estate proptech web-app UI/UX — 64.7% conversion, 17+ leads',
      'Marketplace UI/UX systems (Gaffar India multi-vendor storefront)',
      'CRM/dashboard interface design (MarksOps, Q Manager Work OS)',
      'Design-to-dev handoff as production-ready component specs, not static mockups',
    ],
    proof: [
      { type: 'case-study', slug: 'capital-keys', label: 'Capital Keys — proptech web app & CRM' },
      { type: 'case-study', slug: 'gaffar-india', label: 'Gaffar India — marketplace UI/UX' },
      { type: 'product', slug: 'q-manager', label: 'Q Manager — Work OS dashboard' },
    ],
  },
  {
    slug: 'web-design',
    name: 'Web Design',
    track: 'Design',
    tagline: 'Web design built to launch inside weeks, not quarters.',
    description:
      "Every web design engagement we run ends in a live, indexable site — we've taken brands from a market stall to a fully digitized marketplace storefront in a 28-day delivery window, and we design every page with SEO and crawlability baked in from the wireframe stage, not bolted on after launch.",
    deliverables: [
      'Full marketplace storefront design & build (Gaffar India, 28-day delivery)',
      'Responsive, SEO-structured page templates from day one',
      'Design systems reusable across a growing page catalog',
      'Direct handoff into our own Web Development track — no design-to-dev drop-off',
    ],
    proof: [
      { type: 'case-study', slug: 'gaffar-india', label: 'Gaffar India — full marketplace storefront' },
    ],
  },
  {
    slug: 'mobile-app-designing',
    name: 'Mobile App Designing',
    track: 'Design',
    tagline: 'Mobile-first interfaces for the same products we design and ship end to end.',
    description:
      'Our mobile app design work follows the same rule as everything else we design: it has to be buildable by our own engineering team, and it has to convert. We design mobile experiences for the client portals and dashboards behind products like Q Manager and Capital Keys, where a client checking project status or a lead reviewing a listing needs to complete the task in seconds, not minutes.',
    deliverables: [
      'Mobile-first dashboard and portal UI (client-facing and internal)',
      'Component libraries shared between web and mobile builds for consistency',
      'Usability passes focused on task completion time, not just visual polish',
    ],
    proof: [
      { type: 'product', slug: 'q-manager', label: 'Q Manager — client/team mobile-first portal' },
    ],
  },
  {
    slug: 'landing-page-designing',
    name: 'Landing Page Designing',
    track: 'Design',
    tagline: 'Landing pages built around a single conversion event, tested until it wins.',
    description:
      "A landing page from us is a hypothesis with a design attached. Trotr's founder-storytelling travel funnel used this approach to hit 28x ROAS and ₹14L revenue on a single high-ticket offer — the page existed to test one narrative angle, and we iterated the layout until the numbers proved it out.",
    deliverables: [
      'Trotr: founder-storytelling high-ticket funnel — 28x ROAS, ₹14L revenue',
      'Single-offer, single-CTA landing pages built for paid traffic',
      'On-page A/B test variants tied directly to ad creative hooks',
      'Server-side conversion tracking wired in from launch, not retrofitted',
    ],
    proof: [
      { type: 'case-study', slug: 'trotr-spain-pivot', label: 'Trotr: Spain Pivot — 28x ROAS funnel' },
    ],
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    track: 'Development',
    tagline: 'Next.js/React builds engineered for multi-vendor scale, not a template site.',
    description:
      'We build the marketplaces, CRM portals, and proptech platforms our design and marketing work runs on — Next.js/React on the frontend, MySQL/Postgres and custom APIs underneath, built to hold up under real transaction volume and multi-vendor complexity, not just to demo well.',
    deliverables: [
      'Multi-vendor marketplace engines (Gaffar India digital marketplace)',
      'Custom CRM/proptech web portals (Capital Keys, 64.7% conversion)',
      'High-performance MySQL/PostgreSQL-backed data layers with secure access controls',
      'Performance-tuned builds (SSR, code-splitting) engineered for Core Web Vitals',
    ],
    proof: [
      { type: 'case-study', slug: 'gaffar-india', label: 'Gaffar India — multi-vendor marketplace engine' },
      { type: 'case-study', slug: 'capital-keys', label: 'Capital Keys — proptech CRM web portal' },
    ],
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    track: 'Development',
    tagline: 'Mobile builds that share the same backend and design system as the web product.',
    description:
      "Mobile development at Qala Labs isn't a separate codebase bolted onto the web app after the fact — it's built against the same API layer and design system as everything else we ship, so client portals and internal tools behave identically whether someone opens them on desktop or on their phone.",
    deliverables: [
      'React Native / mobile-web hybrid builds sharing one backend',
      'Push notification and offline-state handling for field/on-the-go use',
      'App builds tied to the same CI/build pipeline as the web product',
    ],
    proof: [
      { type: 'product', slug: 'q-manager', label: 'Q Manager — shared backend across web & mobile' },
    ],
  },
  {
    slug: 'software-development',
    name: 'Software Development',
    track: 'Development',
    tagline: 'The same multi-agent, multi-tenant systems engineering we run our own products on.',
    description:
      "This is the engineering discipline behind our own products: MarksOps' LangGraph agent engine and FastAPI backend, and Q Manager, our internal Work OS unifying project management, shared client/team comms, and AI-assisted task creation across Admin/Team Lead/Team Member/Client roles. We build custom software the same way — role-scoped access, real data models, and zero-auto-execution safety rails on anything that touches money or client data.",
    deliverables: [
      'Multi-agent backend architecture (LangGraph + FastAPI), the exact stack behind MarksOps',
      'Role-based multi-tenant systems (Admin / Team Lead / Team Member / Client scoping)',
      'Integration engineering: Odoo ERP, WhatsApp (Convertway), Unicommerce, Shiprocket, Tally Prime',
      'Safety-first automation: staged/draft writes with mandatory human approval on financial actions',
    ],
    proof: [
      { type: 'product', slug: 'marksops', label: 'MarksOps — multi-agent backend platform' },
      { type: 'product', slug: 'q-manager', label: 'Q Manager — role-based multi-tenant Work OS' },
    ],
  },
  {
    slug: 'digital-marketing',
    name: 'Performance Marketing',
    track: 'Marketing',
    tagline: 'Performance marketing measured in contribution margin, not impressions.',
    description:
      'Every performance campaign we run is built around one number: contribution margin, not vanity reach. That discipline is what took Trotr to 28x ROAS on a single high-ticket funnel and Amazon Ads scaling to 11.2x ROAS with a 47% lower ACOS — real profit outcomes, tracked with server-side attribution so the numbers hold up under scrutiny.',
    deliverables: [
      'Trotr: 28x ROAS, ₹14L revenue on a founder-led high-ticket funnel',
      'Amazon Ads scaling: 11.2x ROAS, 47% lower ACOS',
      'Nutrivend UK: 45 enterprise leads, 71% untapped market identified via B2B audience engineering',
      'D2C BNPL payment-architecture optimization: 15–30% conversion uplift',
      'Server-side conversion tracking (Meta CAPI, GA4) so attribution survives iOS/ad-blocker signal loss',
    ],
    proof: [
      { type: 'case-study', slug: 'trotr-spain-pivot', label: 'Trotr: Spain Pivot — 28x ROAS' },
      { type: 'case-study', slug: 'amazon-ads-scaling', label: 'Amazon Ads Scaling — 11.2x ROAS' },
      { type: 'case-study', slug: 'nutrivend-uk', label: 'Nutrivend UK — 45 enterprise leads' },
    ],
  },
  {
    slug: 'search-engine-optimization',
    name: 'Search Engine Optimization',
    track: 'Marketing',
    tagline: 'SEO built for how people find you now — search engines, AI answer engines, and generative search alike.',
    description:
      "We run SEO as three overlapping disciplines: classic technical/on-page SEO, AEO (answer-engine optimization for featured snippets and AI Overviews), and GEO (generative-engine optimization for how tools like ChatGPT and Perplexity cite you). Our Airborne Aviation Academy engagement was built and audited around exactly this stack — global areaServed schema, crawlability fixes, and structured content built to be quoted, not just ranked.",
    deliverables: [
      'Technical SEO audits (Core Web Vitals, crawlability, structured data/schema)',
      'AEO: content structured to win featured snippets and AI Overview placements',
      'GEO: content and schema built to be cited correctly by AI answer engines',
      'Global areaServed and multi-region schema expansion (proven on Airborne Aviation Academy)',
    ],
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    track: 'Marketing',
    tagline: "Community and creator programs that earn reach organically, and paid social that doesn't waste it.",
    description:
      "Some of our best social results cost nothing in ad spend — The Kashmiri Sound Movement label launch hit 3.4M+ organic views on zero paid budget. Where we do run paid social, like the CSK influencer/UGC program, we hold ourselves to the same bar: 5M+ reach and 12% engagement, not just impressions.",
    deliverables: [
      'CSK influencer & UGC program: 5M+ reach, 12% engagement',
      'The Kashmiri Sound Movement: 3.4M+ organic views, zero ad spend',
      'Creator/UGC funnel design and management end to end',
      'Community loyalty and lifecycle programs layered on top of acquisition',
    ],
    proof: [
      { type: 'case-study', slug: 'kashmiri-sound-movement', label: 'The Kashmiri Sound Movement — 3.4M+ organic views' },
    ],
  },
];
