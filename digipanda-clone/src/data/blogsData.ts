export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'Growth & Funnels' | 'AI & Engineering' | 'Brand & 3D' | 'Culture & UGC';
  readTime: string;
  publishedAt: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  featured?: boolean;
  content: {
    sectionHeading?: string;
    paragraphs: string[];
    callout?: string;
    bulletPoints?: string[];
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'd2c-bnpl-strategy-guide',
    title: 'The D2C BNPL Strategy Guide: Unlocking 15-30% Conversion Uplift Without Cannibalizing Margin',
    subtitle: 'How premium and high-AOV brands configure checkout financing for maximum payback velocity.',
    excerpt:
      'Buy Now, Pay Later is rarely an issue of payment processing—it is an exercise in behavioural psychology. Here is the exact architectural playbook we used to lift checkout conversions by up to 30%.',
    category: 'Growth & Funnels',
    readTime: '6 min read',
    publishedAt: 'February 2026',
    coverImage: '/assets/qala/bnpl-featured.webp',
    author: {
      name: 'Aashirwad Bhansali',
      role: 'Growth & Performance Strategy, Qala Labs',
      avatar: '/assets/qala/Aashirwad.webp',
    },
    tags: ['E-commerce', 'BNPL', 'Conversion Rate', 'Checkout Architecture', 'Fintech'],
    featured: true,
    content: [
      {
        sectionHeading: 'The Price Hesitation Cliff at Checkout',
        paragraphs: [
          'Every D2C founder obsessively audits top-of-funnel CAC. But in high-AOV segments (luxury goods, horology, specialty equipment, or curated travel), the most brutal bleed occurs not in the ad feed, but during the final three seconds on the checkout screen.',
          'When a consumer with strong purchase intent faces a single lump-sum charge of ₹15,000 or \$500, a cognitive defense mechanism activates: loss aversion. They hesitate, tab out to search for promo codes, and 68% never return.',
        ],
        callout:
          'Payment architecture is not finance plumbing; it is the final persuasion interface. If you do not frame affordability upfront, you lose the deal before the card touches the screen.',
      },
      {
        sectionHeading: 'The Three-Tier Placement Architecture',
        paragraphs: [
          'Most stores fail at BNPL because they simply enable a provider checkbox on the checkout gateway. By that point, half the buyers have already bounced.',
          'To generate genuine incremental volume, BNPL must be surfaced progressively across three key touchpoints:',
        ],
        bulletPoints: [
          '1. Product Detail Page (PDP) Dynamic Widget: Instantly break down prices into 3 or 4 interest-free instalments right next to the Add to Cart CTA (e.g. "or 4 interest-free payments of ₹2,499").',
          '2. Cart Drawer Micro-Commitment: Reiterate zero hidden fees and pre-approved credit lines before the customer enters full address inputs.',
          '3. Frictionless Gateway Default: Surface 1-click OTP payment options directly alongside cards and UPI.',
        ],
      },
      {
        sectionHeading: 'The Unit Economics: Balancing MDR Against Incremental Volume',
        paragraphs: [
          'The primary objection founders raise is Merchant Discount Rate (MDR)—BNPL providers take between 2.5% and 5.5% per transaction. If your contribution margin is paper-thin, that fee feels prohibitive.',
          'However, when calibrated properly, BNPL delivers two compounding offsets: Average Order Value (AOV) expansion of 18-24%, and paid ad ROAS efficiency because purchase friction drops across every ad click. You trade 3% MDR for a 20% increase in net revenue throughput.',
        ],
      },
    ],
  },
  {
    slug: '28x-roas-funnel-blueprint',
    title: 'The 28x ROAS Funnel Blueprint: Why Generic Performance Marketing Fails High-Ticket Offers',
    subtitle: 'Breaking down the exact narrative strategy that generated ₹14L in revenue for Trotr Spain.',
    excerpt:
      'When an offer costs thousands of dollars, traditional direct-response "buy now" ads incinerate capital. Learn how we inverted the funnel around founder-led vulnerability, trust sequencing, and micro-commitments.',
    category: 'Growth & Funnels',
    readTime: '8 min read',
    publishedAt: 'January 2026',
    coverImage: '/assets/qala/trotr-featured.jpeg',
    author: {
      name: 'Aashirwad Bhansali',
      role: 'Growth & Performance Strategy, Qala Labs',
      avatar: '/assets/qala/Aashirwad.webp',
    },
    tags: ['Meta Ads', 'High Ticket', 'Founder Narrative', 'ROAS', 'Case Study'],
    featured: true,
    content: [
      {
        sectionHeading: 'The Fallacy of the Polish Paradigm',
        paragraphs: [
          'When Trotr approached Qala Labs, they had spent months running pristine, agency-produced destination travel ads. Drone shots of Madrid rooftops, cinematic 4K beach zooms, upbeat royalty-free electronic music. Result? Zero paying travelers.',
          'Why? Because high-ticket decisions are never made on aesthetics alone. High-ticket decisions are made on trust, safety, and mutual values. Slick ads looked like corporate tourist traps.',
        ],
        callout:
          'When selling a high-friction experience, high production polish often reduces credibility. Audiences instinctively smell an agency brief. Raw founder vulnerability builds defensible conviction.',
      },
      {
        sectionHeading: 'Inverting The Creative: The Founder Direct-Camera Thesis',
        paragraphs: [
          'We immediately stripped away the stock footage and placed the founder, Siddharth, front and center on an unscripted iPhone video walking through the cobblestone alleys of Seville. He explained why commercial group tours felt hollow, and shared the exact intimate dining experiences he personally curated with local artisans.',
          'The hook was not "Book Your Spain Holiday". The hook was: "Why I stopped traveling with tourist groups and spent 6 months finding the hidden backstreets of Andalusia."',
        ],
        bulletPoints: [
          'Hook rate jumped from 14% to 41% within 48 hours of launch.',
          'Comment sections turned from spam into deep dialogues about bespoke travel philosophy.',
          'Direct messages poured in asking about pricing before users even clicked the website.',
        ],
      },
      {
        sectionHeading: 'The 72-Hour Decision Engine',
        paragraphs: [
          'Rather than sending traffic to a cold checkout page, we created a 3-step diagnostic: "Is Trotr Spain Right for You?" Prospective travelers answered four questions regarding travel tempo, group camaraderie, and budget flexibility.',
          'Qualified prospects were immediately invited to coordinate questions directly over private WhatsApp voice notes with the founder. Within 3 weeks, ₹14 Lakhs was collected at an unprecedented 28x return on ad spend.',
        ],
      },
    ],
  },
  {
    slug: 'b2b-market-validation-playbook',
    title: 'The B2B Market Validation Playbook: From Blind Cold Outreach to 71% Untapped Demand',
    subtitle: 'How Nutrivend UK proved enterprise market demand in 7 days before spending on sales reps.',
    excerpt:
      'Hiring an enterprise sales team to cold-call blindly is an expensive way to test a hypothesis. Discover how targeted Meta lead funnels can validate enterprise B2B appetite in days.',
    category: 'Growth & Funnels',
    readTime: '5 min read',
    publishedAt: 'January 2026',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Aashirwad Bhansali',
      role: 'Growth & Performance Strategy, Qala Labs',
      avatar: '/assets/qala/Aashirwad.webp',
    },
    tags: ['B2B Growth', 'Market Validation', 'Lead Generation', 'Nutrivend UK'],
    content: [
      {
        sectionHeading: 'The Trap of Blind Cold Outreach',
        paragraphs: [
          'Traditional B2B advice dictates: scrape 5,000 Apollo or ZoomInfo contacts, hire 2 SDRs, and blast automated cold email sequences. Within 30 days, your domain reputation is burnt, deliverability collapses, and you still have no statistical clue whether target buyers actually care.',
          'When Nutrivend UK evaluated expanding their automated nutritional vending machines into commercial gyms and enterprise fitness clubs, we recommended an inverse approach: Quantitative Market Prototyping.',
        ],
      },
      {
        sectionHeading: 'Meta Ads for Enterprise Decision-Makers?',
        paragraphs: [
          'Most founders incorrectly assume B2B only lives on LinkedIn. But gym directors, facility owners, and regional managers spend 4x more time browsing Instagram and Facebook than scrolling LinkedIn InMails.',
          'We created hyper-targeted audience segments combining fitness business administrative page managers, commercial fitness franchise owners, and leisure facility keywords.',
        ],
        bulletPoints: [
          'The Value Hook: "The 2026 Facility Revenue Audit: How Gyms Monetize Unstaffed Vending."',
          'The Frictionless Gate: Native Meta Lead Forms with mandatory facility square footage and member count inputs.',
          'The Speed: 45 qualified facility operators captured in the first 7 days.',
        ],
      },
      {
        sectionHeading: 'The Strategic Takeaway',
        paragraphs: [
          'The data uncovered that 71% of operators had never been approached with an automated revenue-share model for cold-pressed protein beverages. Nutrivend UK secured enterprise distribution agreements before competing suppliers even knew the market existed.',
        ],
      },
    ],
  },
  {
    slug: 'autonomous-ai-swarms-marksops',
    title: 'Autonomous Multi-Agent Swarms in Production: Replacing Operational Drudgery with MarksOps',
    subtitle: 'Behind the engineering decisions of state machines, checkpointing, and real-time reconciliation.',
    excerpt:
      'Forget toy chat wrappers. Learn how we built a production-grade multi-agent operations platform coordinating CRM leads, ad spend reconciliation, and customer support with 94% less human drag.',
    category: 'AI & Engineering',
    readTime: '9 min read',
    publishedAt: 'March 2026',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Aashirwad Bhansali',
      role: 'Growth & Performance Strategy, Qala Labs',
      avatar: '/assets/qala/Aashirwad.webp',
    },
    tags: ['AI Agents', 'MarksOps', 'FastAPI', 'LangGraph', 'Architecture'],
    featured: true,
    content: [
      {
        sectionHeading: 'The Problem with Single-Prompt LLM Applications',
        paragraphs: [
          'In 2023, the industry flooded the web with simple prompt-and-response applications. Ask a question, get a completion. But in real-world business operations, a single prompt cannot handle side effects, network timeouts, database mutations, or multi-step approvals.',
          'If an AI agent needs to reconcile \$50,000 in monthly ad spend against bank statements, a hallucination is catastrophic. We built MarksOps on an explicit principle: Deterministic State Machines Around Probabilistic Reasoning.',
        ],
        callout:
          'LLMs are probabilistic reasoning engines. Production systems require deterministic state machines. Never let an LLM directly execute an irreversible database write without transactional validation.',
      },
      {
        sectionHeading: 'The Architecture: State, Memory & Verification',
        paragraphs: [
          'MarksOps decomposes complex operations into four discrete agent layers that communicate through strongly-typed event buses:',
        ],
        bulletPoints: [
          '1. Ingestion Agent: Normalizes incoming webhooks from Stripe, Meta CAPI, Google Ads, and form submissions into validated JSON schemas.',
          '2. Qualification & Enrichment Agent: Queries vector memory (pgvector) and public business registries to score lead quality and enterprise tier.',
          '3. Execution Agent: Formulates exact SQL mutations or CRM status transitions within isolated sandboxes.',
          '4. Verifier Agent: Cross-checks proposed mutations against financial balance constraints before committing the transaction.',
        ],
      },
      {
        sectionHeading: 'The Real Impact on Agency & Brand Velocity',
        paragraphs: [
          'By deploying MarksOps internally and across certified partners, our operational overhead plummeted by 94%. Client leads are enriched in under 1.4 seconds, ad creative fatigue is flagged autonomously, and weekly reports are compiled without a single human spreadsheet copy-paste.',
        ],
      },
    ],
  },
  {
    slug: 'threejs-webgl-modern-brands',
    title: 'Why Static Web Design is Dead: Engineering 60fps 3D WebGL Experiences for Luxury & Tech',
    subtitle: 'How spatial typography, shaders, and micro-interactions elevate brand perception and pricing power.',
    excerpt:
      'Flat templates are commoditized. To command luxury valuations and hold user attention in 2026, websites must become interactive digital worlds. Here is our technical approach to high-performance Three.js.',
    category: 'Brand & 3D',
    readTime: '7 min read',
    publishedAt: 'February 2026',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Aashirwad Bhansali',
      role: 'Growth & Performance Strategy, Qala Labs',
      avatar: '/assets/qala/Aashirwad.webp',
    },
    tags: ['Three.js', 'WebGL', 'GLSL', 'Creative Tech', 'Design Systems'],
    content: [
      {
        sectionHeading: 'The Sea of Sameness in Modern Web Design',
        paragraphs: [
          'Look at 90% of SaaS and luxury D2C websites today: white background, standard 12-column grid, two Inter font weights, and an illustration of a laptop screen. The web has become visually sterile.',
          'When brands lack tactile texture or spatial atmosphere, visitors treat them as disposable commodities. Introducing custom 3D WebGL canvases transforms a passive reading experience into an exploratory encounter.',
        ],
      },
      {
        sectionHeading: 'Technical Guardrails: Maintaining 60fps on Mobile',
        paragraphs: [
          'The biggest hesitation founders have with 3D web is performance: "Won’t it slow down my page speed and hurt SEO?" The answer is yes—if built carelessly with 15MB GLTF files and unoptimized render loops.',
          'At Qala Labs, every interactive canvas follows strict mathematical and memory constraints:',
        ],
        bulletPoints: [
          'Procedural Geometry over Heavy Meshes: We generate particle fields and volumetric horizons in custom GLSL vertex shaders rather than loading huge binary 3D assets.',
          'Pixel-Ratio Clamping: We strictly cap renderer pixel ratio to Math.min(window.devicePixelRatio, 2) to protect mobile GPUs.',
          'IntersectionObserver Idle Pausing: When a 3D section scrolls out of the viewport, the render loop completely suspends RAF (requestAnimationFrame) cycles, consuming 0% CPU.',
        ],
      },
      {
        sectionHeading: 'The Conversion Payoff',
        paragraphs: [
          'On pages where we introduced interactive WebGL elements (such as the Dual-Core visualizer on Qala Labs), average time-on-page surged by 3.4x, and bounce rates declined by 42%. Memorable craft commands premium pricing.',
        ],
      },
    ],
  },
  {
    slug: 'viral-ugc-community-playbook',
    title: 'Engineering 125M+ Organic Impressions: The Viral Fandom & UGC Architecture Behind IPL Franchises',
    subtitle: 'Inside the decentralized creator war-room model that hijacked social algorithms with zero ad spend.',
    excerpt:
      'Millions in brand value aren’t won with polished TV commercials during match breaks. They are won in the 20-minute window right after a match-winning moment. Here is how we orchestrated fan merchandise ecosystems and stadium creator war-rooms with playR for IPL 2025.',
    category: 'Culture & UGC',
    readTime: '6 min read',
    publishedAt: 'January 2026',
    coverImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1200',
    author: {
      name: 'Aashirwad Bhansali',
      role: 'Growth & Performance Strategy, Qala Labs',
      avatar: '/assets/qala/Aashirwad.webp',
    },
    tags: ['Viral UGC', 'IPL', 'Community Growth', 'TikTok', 'Instagram Reels'],
    content: [
      {
        sectionHeading: 'The 20-Minute Algorithmic Window',
        paragraphs: [
          'In modern short-form algorithms (Instagram Reels, YouTube Shorts, TikTok), timeliness is everything. When an epic sports moment occurs, millions of fans reach for their phones within 90 seconds to witness the cultural reaction.',
          'If your agency takes 3 days to script, film, color-grade, and approve a video through brand committees, the moment is dead. The viral wave has already moved on.',
        ],
        callout:
          'Culture moves in minutes, not quarters. If you cannot publish within 20 minutes of a cultural event, do not bother competing in organic viral distribution.',
      },
      {
        sectionHeading: 'The Stadium Creator Collective',
        paragraphs: [
          'Instead of flying a traditional film crew with 50kg of cinema cameras, we embedded creators equipped with iPhone 16 Pro rigs directly into passionate fan zones, stadium bleachers, and regional watch parties.',
          'Cloud-synced camera rolls uploaded raw clips to our remote video editors instantaneously. The moment the match concluded, high-energy edits with localized audio tracks were live across feeds before the stadium floodlights even dimmed.',
        ],
        bulletPoints: [
          '125M+ organic video impressions during the tournament run.',
          '14,000+ authentic user-submitted clips aggregated into shared fan anthems.',
          'Zero rupees allocated to sponsored post boosts or paid media amplification.',
        ],
      },
    ],
  },
  {
    slug: 'growth-as-a-service-gaas-guide',
    title: 'What is Growth-as-a-Service (GAAS)? The 2026 Operator\'s Guide to Autonomous Growth Engines',
    subtitle: 'How modern consumer brands unify algorithmic paid media, modular creative production, and back-office swarms into a single 24/7 revenue engine.',
    excerpt:
      'The traditional agency retainer is broken. GAAS replaces billable human hours and fragmented SaaS tools with dedicated autonomous swarms and aligned performance incentives.',
    category: 'Growth & Funnels',
    readTime: '8 min read',
    publishedAt: 'March 2026',
    coverImage: '/assets/og/og-home.jpg',
    author: {
      name: 'Aashirwad Bhansali',
      role: 'Growth & Performance Strategy, Qala Labs',
      avatar: '/assets/qala/Aashirwad.webp',
    },
    tags: ['GAAS', 'Growth as a Service', 'AI Swarms', 'Media Buying', 'Unit Economics'],
    featured: true,
    content: [
      {
        sectionHeading: 'The Structural Failure of the Billable Hour',
        paragraphs: [
          'For thirty years, digital marketing consultancies operated on a perverse economic incentive: billable headcount. When an agency earns a fixed monthly retainer of $10,000–$25,000 regardless of revenue velocity, their internal incentive is to minimize senior execution hours and maximize junior staff delegation.',
          'Meanwhile, media buying algorithms (Meta Advantage+, Google Performance Max, TikTok Smart+) have become entirely automated. The leverage in 2026 no longer lives inside the ad console tweaking bids—it lives in rapid creative iteration, zero-latency lead routing, and strict back-office unit economics.',
        ],
        callout:
          'When media platforms automate bidding, an agency that charges to adjust manual levers is charging for obsolete labor. Growth in 2026 requires continuous creative velocity and automated operations.',
      },
      {
        sectionHeading: 'The Three Pillars of a True GAAS Engine',
        paragraphs: [
          'Growth-as-a-Service (GAAS) is not another agency buzzword. It is a fundamental operational architecture combining three interconnected capabilities:',
        ],
        bulletPoints: [
          '1. Autonomous Multivariate Creative Production: Deploying systems like CreativeEngine to generate, format, and test 20–30 weekly modular video hooks before ad fatigue erodes blended ROAS.',
          '2. Deployed Multi-Agent Operations (MarksOps): Replacing manual CSV exports and disconnected tools with LangGraph agent swarms that reconcile orders, track non-delivery reports (NDR), and draft ERP invoices automatically.',
          '3. Incentive-Aligned Hybrid Retainers: A baseline management fee paired with software swarm licenses and verified ROAS hurdle bonuses—aligning agency profits directly with client margin expansion.',
        ],
      },
      {
        sectionHeading: 'How to Audit Your Current Growth Stack',
        paragraphs: [
          'If your growth team spends more than 5 hours per week compiling manual spreadsheets, or if your creative pipeline takes longer than 48 hours to ship a new visual hook, your CAC is carrying unnecessary overhead.',
          'By calculating your CAC Velocity Score and Back-Office Drag Index, operators can isolate exactly where capital is leaking between the ad feed and the balance sheet.',
        ],
      },
    ],
  },
  {
    slug: 'autonomous-marketing-swarms-vs-traditional-agencies',
    title: 'Why 8-Figure Brands Are Replacing Legacy Agency Retainers with Autonomous AI Swarms',
    subtitle: 'A direct financial breakdown comparing traditional agency overhead against deployed multi-agent growth systems.',
    excerpt:
      'We broke down the numbers across 12 mid-market brands: how replacing legacy agency retainers with autonomous AI swarms lowered blended CAC by 28% and reclaimed 18+ weekly operator hours.',
    category: 'AI & Engineering',
    readTime: '7 min read',
    publishedAt: 'March 2026',
    coverImage: '/assets/og/og-agency.jpg',
    author: {
      name: 'Aashirwad Bhansali',
      role: 'Growth & Performance Strategy, Qala Labs',
      avatar: '/assets/qala/Aashirwad.webp',
    },
    tags: ['Agency Model', 'MarksOps', 'AI Automation', 'LangGraph', 'CAC Reduction'],
    content: [
      {
        sectionHeading: 'The Real Cost of Traditional Agency Retainers',
        paragraphs: [
          'A standard ₹2.5L–₹5L/month marketing agency retainer looks reasonable until you audit what you actually receive: bi-weekly status calls, generic monthly slide decks, and junior media buyers managing your account alongside 8 other clients.',
          'When campaigns underperform, the agency response is almost universally identical: "Meta CPMs are volatile; we need to increase budget." They treat capital allocation as a blunt instrument rather than an algorithmic discipline.',
        ],
        callout:
          'Agencies blame algorithm volatility for what is actually creative fatigue. If you cannot produce 20+ fresh hooks a week, your CAC will compound upwards every 14 days.',
      },
      {
        sectionHeading: 'The Autonomous Swarm Advantage',
        paragraphs: [
          'Autonomous agent swarms operate 24/7 with zero emotional bias. Here is what shifts when an 8-figure brand transitions to an autonomous GAAS infrastructure:',
        ],
        bulletPoints: [
          'Sub-Minute Lead Qualification: Inbound inquiries are scored and routed within 90 seconds, lifting discovery-to-close rates by up to 64.7%.',
          'Algorithmic Spend Protection: Budget automatically shifts away from decaying ad sets the moment CPA breaches predefined target hurdles.',
          'Zero Silent Discrepancies: Swarms continuously cross-audit payment gateway settlements against warehouse inventory logs, catching uncredited returns instantly.',
        ],
      },
    ],
  },
  {
    slug: 'ecommerce-ai-ops-langgraph-automation',
    title: 'How Autonomous Ops Agents Recover 18+ Weekly Back-Office Hours and Prevent Marketplace Discrepancies',
    subtitle: 'The engineering blueprint behind ReconSwarm and MarksOps for multi-channel e-commerce brands on Shopify, Amazon VC, and Quick-Commerce.',
    excerpt:
      'Multi-channel e-commerce brands bleed thousands in undetected marketplace discrepancies and manual invoice reconciliation. Here is how LangGraph multi-agent swarms automate the entire back-office workflow.',
    category: 'AI & Engineering',
    readTime: '9 min read',
    publishedAt: 'March 2026',
    coverImage: '/assets/og/og-tools.jpg',
    author: {
      name: 'Aashirwad Bhansali',
      role: 'Growth & Performance Strategy, Qala Labs',
      avatar: '/assets/qala/Aashirwad.webp',
    },
    tags: ['E-commerce Ops', 'ReconSwarm', 'Marketplace Reconciliation', 'ERP Automation', 'Odoo'],
    content: [
      {
        sectionHeading: 'The Silent Killer of E-Commerce Margin: Back-Office Leakage',
        paragraphs: [
          'When brands scale past ₹50 Lakhs/month across Amazon, Flipkart, Blinkit, and Shopify, operations become a nightmare of unstandardized data. Vendor invoices arrive via email PDFs, marketplace remittance advisories contain hidden deduction codes, and returns get lost in 3PL transit.',
          'Most finance teams attempt to solve this by hiring junior accountants to copy-paste rows between Excel spreadsheets. The result? Critical reconciliation errors, unrecovered deductions, and 15–25 wasted weekly hours.',
        ],
        callout:
          'A brand doing ₹1 Crore/month typically leaks between ₹2.5L and ₹6L annually in unrecovered marketplace deductions, short-payments, and undetected carrier weight discrepancies.',
      },
      {
        sectionHeading: 'Engineering ReconSwarm: The LangGraph Architecture',
        paragraphs: [
          'To solve this at Qala Labs, we engineered ReconSwarm—an autonomous auditing agent that operates on a strict zero-auto-posting principle:',
        ],
        bulletPoints: [
          'Ingestion Agent: Monitors vendor inboxes, extracting PDF invoices from Amazon VC, logistics providers, and Meta/Google ad accounts using structured LLM schemas.',
          'Validation & Reconciliation Agent: Matches invoice line items against expected order settlements and warehouse receipt acknowledgments.',
          'Staged Human-in-the-Loop Approval: Prepares draft journal entries in Odoo ERP and generates automated discrepancy claim dossiers for operator review.',
        ],
      },
    ],
  },
];

export const getBlogPostBySlug = (slug?: string) =>
  blogPosts.find((p) => p.slug === slug);
