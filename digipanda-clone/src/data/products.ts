export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  features: string[];
}

// TODO(concurrent session: Products): flesh out description/features from real source
// material — see the research folders named in the session prompt.
export const products: Product[] = [
  {
    slug: 'marksops',
    name: 'MarksOps',
    tagline: 'Agentic CRM + ERP for marketing operations',
    category: 'AI Automation',
    description: 'Multi-agent marketing operations platform unifying Marketing, Sales, Operations, and Finance into one agentic system.',
    features: [],
  },
  {
    slug: 'ai-recruiter',
    name: 'AI Recruiter',
    tagline: 'AI-powered hiring & candidate screening',
    category: 'AI Hiring',
    description: 'Automated resume screening and candidate ranking that cuts hiring time without cutting quality.',
    features: [],
  },
  {
    slug: 'ai-receptionist',
    name: 'AI Receptionist',
    tagline: 'RAG-powered voice agent for customer support & call handling',
    category: 'AI Voice',
    description: 'A voice AI agent that answers, qualifies, and routes calls 24/7, grounded in your own knowledge base via RAG.',
    features: [],
  },
  {
    slug: 'q-manager',
    name: 'Q Manager',
    tagline: 'Agency management Work OS with AI assistance',
    category: 'Agency Ops',
    description: 'A unified work OS for agencies — project management, shared client/team comms, and AI that drafts replies and turns conversations into tasks.',
    features: [],
  },
];
