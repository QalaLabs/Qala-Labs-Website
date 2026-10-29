import { caseStudies, CaseStudy } from './caseStudies';
import { portfolioProjects, PortfolioProject } from './portfolioData';

export type WorkItemType = 'case-study' | 'portfolio';

export interface UnifiedWorkItem {
  id: string;
  slug: string;
  type: WorkItemType;
  title: string;
  client: string;
  category: string;
  metric: string;
  thumb: string;
  summary: string;
  technologies?: string[];
  deliverables?: string[];
  results?: { label: string; value: string }[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
  link: string;
  featured?: boolean;
}

// Convert case studies to unified items
const mappedCaseStudies: UnifiedWorkItem[] = caseStudies.map((cs) => ({
  id: `cs-${cs.slug}`,
  slug: cs.slug,
  type: 'case-study',
  title: cs.title,
  client: cs.title,
  category: cs.category,
  metric: cs.result,
  thumb: cs.thumb,
  summary: cs.subtitle,
  results: cs.results,
  testimonial: cs.testimonial,
  link: `/case-studies/${cs.slug}`,
  featured: true,
}));

// Convert portfolio projects to unified items
const mappedPortfolio: UnifiedWorkItem[] = portfolioProjects.map((p) => ({
  id: `port-${p.slug}`,
  slug: p.slug,
  type: 'portfolio',
  title: p.title,
  client: p.client,
  category: p.category,
  metric: p.impactMetric,
  thumb: p.coverImage,
  summary: p.summary,
  technologies: p.technologies,
  deliverables: p.deliverables,
  link: `/portfolio/${p.slug}`,
  featured: p.featured,
}));

// Interleave and curate for optimal repertory representation
export const allWorkItems: UnifiedWorkItem[] = [
  // Flagship AI & Creative
  mappedPortfolio.find((i) => i.slug === 'wwf-ai-creative-studio')!,
  // Flagship B2B Validation
  mappedCaseStudies.find((i) => i.slug === 'nutrivend-uk')!,
  // Flagship High-Ticket Travel
  mappedCaseStudies.find((i) => i.slug === 'trotr-spain-pivot')!,
  // Flagship Performance Footwear Shoot & Launch Runway
  mappedCaseStudies.find((i) => i.slug === 'mizuno-india-launch')!,
  mappedPortfolio.find((i) => i.slug === 'mizuno-india-launch-production')!,
  // Flagship Loyalty Progression Engine & Cloud Run Security (Nectar)
  mappedCaseStudies.find((i) => i.slug === 'nectar-loyalty-engine')!,
  mappedPortfolio.find((i) => i.slug === 'nectar-loyalty-progression-engine')!,
  // Flagship Real Estate Proptech Platform
  mappedPortfolio.find((i) => i.slug === 'capital-keys-real-estate-platform')!,
  mappedCaseStudies.find((i) => i.slug === 'capital-keys')!,
  // Flagship Fandom & Team Merchandise
  mappedPortfolio.find((i) => i.slug === 'playr-real-fans-content')!,
  // Flagship Streetwear Storefront
  mappedPortfolio.find((i) => i.slug === 'streetplayr-storefront')!,
  // Flagship Marketplace Transformation
  mappedCaseStudies.find((i) => i.slug === 'gaffar-india')!,
  mappedPortfolio.find((i) => i.slug === 'gaffar-india-marketplace')!,
  // Flagship Amazon Performance
  mappedCaseStudies.find((i) => i.slug === 'amazon-ads-scaling')!,
  // Flagship Cultural Sound Movement
  mappedCaseStudies.find((i) => i.slug === 'kashmiri-sound-movement')!,
  // Flagship Aviation Academy
  mappedPortfolio.find((i) => i.slug === 'airborne-aviation-academy')!,
  // Flagship UGC & Lifestyle
  mappedPortfolio.find((i) => i.slug === 'instagram-ugc-lifestyle')!,
  // Flagship Sports League Hub
  mappedPortfolio.find((i) => i.slug === 'world-pickleball-league')!,
  // Synthetic AI Persona Videos
  mappedPortfolio.find((i) => i.slug === 'hi-astro-ai-character-videos')!,
  // Creator-Led Salon Content
  mappedPortfolio.find((i) => i.slug === 'billu-salon-social-content')!,
  // B2B Exhibition Production
  mappedPortfolio.find((i) => i.slug === 'airtel-business-exhibition')!,
  // Recipe UGC Series
  mappedPortfolio.find((i) => i.slug === 'shakti-bhog-ugc-content')!,
  // Autonomous Multi-Agent Operations
  mappedPortfolio.find((i) => i.slug === 'marksops-autonomous-suite')!,
  // 3D Volumetric Horizon Engine
  mappedPortfolio.find((i) => i.slug === 'volumetric-horizon-3d')!,
].filter(Boolean);

export const getWorkItemBySlug = (slug?: string) =>
  allWorkItems.find((w) => w.slug === slug) ||
  mappedCaseStudies.find((w) => w.slug === slug) ||
  mappedPortfolio.find((w) => w.slug === slug);
