export interface JobRole {
  id: string;
  title: string;
  department: 'Engineering' | 'AI & Agents' | 'Creative & Design' | 'Growth & Strategy';
  location: string;
  type: 'Full-time' | 'Contract' | 'Fellowship';
  experience: string;
  compensation: string;
  tagline: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  techStack: string[];
}

export interface CulturePillar {
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface PerkItem {
  title: string;
  description: string;
  category: 'Setup & Tech' | 'Growth & Learning' | 'Health & Life' | 'Autonomy';
}

export const culturePillars: CulturePillar[] = [
  {
    title: 'Art Meets Engineering',
    tagline: 'Craft without technical depth is shallow; engineering without craft is soulless.',
    description:
      'We believe the next generation of digital products and brand ecosystems will be built by polymaths. Our engineers obsess over motion and typography; our designers code shaders and prompt neural models.',
    iconName: 'Sparkles',
  },
  {
    title: 'Autonomous Multi-Agent Leverage',
    tagline: 'Kill mundane drudgery with internal swarms.',
    description:
      'We built MarksOps so our team does not spend hours on manual reconciliation, formatting ad variants, or copying spreadsheet cells. You will command and deploy AI agent swarms from day one.',
    iconName: 'Cpu',
  },
  {
    title: 'Radical Agency & Low Bureaucracy',
    tagline: 'Default to aggressive action and thoughtful velocity.',
    description:
      'No five-stage approval committees. If you have an intuition backed by data or high-conviction creative taste, prototype it, test it, and ship it.',
    iconName: 'Zap',
  },
  {
    title: 'Global Stakes, Real Enterprise Impact',
    tagline: 'Not mock projects or toy sandboxes.',
    description:
      'From global conservation campaigns with WWF India to high-ticket travel funnels in Spain and multi-vendor marketplace architectures in London, our work impacts millions of users worldwide.',
    iconName: 'Globe',
  },
];

export const perksList: PerkItem[] = [
  {
    title: 'Top-Tier Workstation Stipend',
    description: 'Latest Apple Silicon MacBook Pro or high-spec Linux/Windows dev machine plus 4K display and ergonomic accessories.',
    category: 'Setup & Tech',
  },
  {
    title: 'Generous AI API & Research Budget',
    description: 'Unlimited access to Claude, OpenAI, Midjourney, Cursor, HuggingFace, and dedicated GPU compute credits for experimentation.',
    category: 'Setup & Tech',
  },
  {
    title: 'Learning & Conference Sponsorship',
    description: 'Annual allowance for technical workshops, design masterclasses, and global technology / design conferences.',
    category: 'Growth & Learning',
  },
  {
    title: 'Comprehensive Health & Wellness',
    description: 'Global health insurance coverage, mental wellness sessions, and gym or wellness stipend.',
    category: 'Health & Life',
  },
  {
    title: 'Work From Anywhere & Flexible Hours',
    description: 'Remote-first culture with hubs in London, Delhi NCR, Dubai, and Amsterdam. Asynchronous by default.',
    category: 'Autonomy',
  },
  {
    title: 'Performance Royalties & Profit Sharing',
    description: 'Competitive base salary paired with transparent venture upside and performance-based project bonuses.',
    category: 'Autonomy',
  },
];

export const openRoles: JobRole[] = [
  {
    id: 'senior-ai-agent-architect',
    title: 'Senior AI Agent Architect & Systems Engineer',
    department: 'AI & Agents',
    location: 'Remote / London / Delhi NCR',
    type: 'Full-time',
    experience: '4+ years in Python / TypeScript & LLM Systems',
    compensation: 'Competitive Base + Equity Tier',
    tagline: 'Design and deploy multi-agent coordination architectures for MarksOps and enterprise clients.',
    description:
      'We are looking for a systems engineer who views LLMs not as simple chat endpoints, but as probabilistic reasoning kernels in complex event-driven state machines. You will build resilient autonomous agent swarms that coordinate CRM pipelines, ad creative generation, and operational reconciliation.',
    responsibilities: [
      'Architect robust multi-agent swarms with state machines, checkpointing, and vector memory systems.',
      'Build low-latency streaming backends with FastAPI, Node.js, and Redis.',
      'Deploy production-ready fine-tuned models, structured output extractors, and automated evaluation harnesses.',
      'Partner with client engineering leaders to embed Qala Labs agent infrastructure into existing enterprise CRMs and ERPs.',
    ],
    requirements: [
      'Deep fluency with LangGraph, LlamaIndex, LiteLLM, or custom agent loop architectures.',
      'Proven experience shipping production Python and TypeScript applications with high reliability.',
      'Strong grasp of vector databases (pgvector, Qdrant), PostgreSQL performance, and asynchronous queues.',
      'Relentless curiosity about autonomous workflows and tool-calling reliability.',
    ],
    techStack: ['Python', 'TypeScript', 'LangGraph', 'FastAPI', 'pgvector', 'Redis', 'Docker'],
  },
  {
    id: 'lead-creative-technologist',
    title: 'Lead Creative Technologist & 3D WebGL Developer',
    department: 'Creative & Design',
    location: 'Remote / Hybrid (London / Delhi NCR)',
    type: 'Full-time',
    experience: '3+ years in Three.js, WebGL & Modern React',
    compensation: 'Competitive Base + Creative Bonus',
    tagline: 'Craft interactive digital worlds that blur the line between software and cinema.',
    description:
      'You are the rare bridge who can talk GLSL shaders, camera frustums, and physics simulation while having impeccable editorial taste in typography and spatial composition. You will lead our next-generation immersive web experiences for global brands.',
    responsibilities: [
      'Develop fluid, 60fps WebGL/Three.js interactive web graphics and volumetric visualizer components.',
      'Collaborate with brand directors to translate brand guidelines into kinetic, interactive digital systems.',
      'Optimize 3D models, texture budgets, and shader passes for instant loading on mobile and desktop devices.',
      'Pioneer the integration of real-time AI-generated assets into interactive 3D web canvases.',
    ],
    requirements: [
      'Mastery of Three.js / React Three Fiber, GLSL shaders, and modern CSS/Tailwind.',
      'Deep appreciation for micro-interactions, spring physics, and Apple-grade polish.',
      'Strong portfolio demonstrating high-craft interactive web design or generative visual experiments.',
      'Familiarity with WebGPU and headless 3D asset optimization pipelines is a strong plus.',
    ],
    techStack: ['Three.js', 'React', 'GLSL', 'WebGL', 'Tailwind CSS', 'Vite', 'Blender'],
  },
  {
    id: 'staff-full-stack-engineer',
    title: 'Staff Full-Stack Engineer (React, Node, Cloud)',
    department: 'Engineering',
    location: 'Remote (UK / India / EMEA Timezones)',
    type: 'Full-time',
    experience: '5+ years in Scaled Web Applications',
    compensation: 'Competitive Base + Performance Bonuses',
    tagline: 'Own the core web engine, data pipelines, and multi-tenant SaaS architectures.',
    description:
      'We build high-performance web products, multi-vendor marketplace engines, and custom analytics backends. We need an experienced full-stack engineer who values rock-solid type safety, graceful offline fallbacks, and sub-100ms API response times.',
    responsibilities: [
      'Lead architecture and development of scalable React/Next.js and Node.js microservices.',
      'Ensure resilient client-side UX with optimistic mutations, error boundaries, and dual-target API fallbacks.',
      'Design modular database schemas (PostgreSQL / MySQL / Redis) with high data integrity.',
      'Mentor junior engineers and establish rigorous CI/CD, testing, and performance budgets.',
    ],
    requirements: [
      'Expert-level TypeScript, React, and server-side runtimes (Node.js, edge workers).',
      'Track record of architecting resilient REST/GraphQL APIs and serverless backends.',
      'Obsession with performance metrics (Core Web Vitals, bundle tree-shaking, manual chunking).',
      'Clear, empathetic technical communication and pride in software craftsmanship.',
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Vercel / Cloud Run'],
  },
  {
    id: 'director-growth-performance',
    title: 'Director of Growth & Performance Architecture',
    department: 'Growth & Strategy',
    location: 'Remote / Dubai / London',
    type: 'Full-time',
    experience: '5+ years scaling \$1M+ paid media budgets',
    compensation: 'High Base + Performance Profit-Share',
    tagline: 'Engineer high-ticket conversion funnels, attribution architectures, and viral engines.',
    description:
      'Forget vanity metrics. We engineer full-funnel customer acquisition systems for D2C market leaders and B2B disruptors. You will lead paid acquisition strategy across Meta, Google, TikTok, and Amazon, while partnering with our AI engineering team to automate ad creative variant testing.',
    responsibilities: [
      'Lead media strategy and ROAS optimization for top-tier international brands.',
      'Deploy server-side Conversions API (CAPI), multi-touch attribution, and predictive LTV models.',
      'Direct our creative team on high-converting ad angles, hook scripts, and UGC frameworks.',
      'Leverage AI generative tools to rapidly produce and test 100+ creative variations per sprint.',
    ],
    requirements: [
      'Demonstrated history of scaling e-commerce or B2B accounts from 5-figure to 7-figure monthly budgets.',
      'Mastery of Meta Ads Manager, Google Ads (Search & PMax), TikTok Ads, and attribution tools (TripleWhale, Northbeam).',
      'Strong understanding of unit economics (CAC, LTV, payback period, blended ROAS).',
      'Exceptional analytical mindset paired with high creative intuition.',
    ],
    techStack: ['Meta CAPI', 'Google Ads', 'TikTok Ads', 'TripleWhale', 'GA4', 'SQL / BigQuery', 'Figma'],
  },
  {
    id: 'ai-prompt-creative-fellow',
    title: 'AI Prompt & Generative Media Fellow',
    department: 'Creative & Design',
    location: 'Remote',
    type: 'Fellowship',
    experience: '1-3 years portfolio in Generative Media',
    compensation: 'Monthly Fellowship Grant + Project Bonuses',
    tagline: 'Push the bleeding edge of diffusion models, LoRA fine-tuning, and AI cinematic storytelling.',
    description:
      'Are you the creator everyone asks "how did you generate that shot?" We are looking for an obsessive prompt engineer and generative artist to join our creative laboratory, producing mind-bending campaign visuals for global clients.',
    responsibilities: [
      'Generate ultra-high-fidelity imagery and video assets using Midjourney, Flux, ComfyUI, Runway, and Kling.',
      'Train bespoke LoRA weights and styling embeddings for client brand worlds.',
      'Collaborate with our video editors and 3D artists to compose hybrid generative-CGI motion spots.',
      'Document prompting workflows and build reusable node setups for internal creative tools.',
    ],
    requirements: [
      'A jaw-dropping portfolio of AI-generated cinematic visuals or experimental motion design.',
      'Fluency with ComfyUI workflows, ControlNet, IP-Adapter, and prompt tuning.',
      'Keen eye for lighting, composition, lens focal lengths, and color theory.',
      'Ability to rapidly iterate based on client art direction.',
    ],
    techStack: ['ComfyUI', 'Flux', 'Midjourney', 'Runway Gen-3', 'Photoshop', 'Premiere / DaVinci'],
  },
];
