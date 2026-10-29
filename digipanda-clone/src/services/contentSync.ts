/**
 * Dynamic Content Sync Service (MySQL Hydration & SWR Fallback)
 * 
 * Provides reactive access to MySQL-driven website content.
 * Follows the Expand-Contract zero-downtime architecture:
 * 1. Initializes synchronously with local static bundle (instant paint, zero flash).
 * 2. Asynchronously revalidates against /api/content (or fallback /api/content.php).
 * 3. Reactive listeners update automatically when fresh data is fetched from MySQL.
 */

import { useState, useEffect, useMemo } from 'react';
import { caseStudies as defaultCaseStudies, CaseStudy } from '../data/caseStudies';
import { portfolioProjects as defaultPortfolio, PortfolioProject } from '../data/portfolioData';
import { blogPosts as defaultBlogPosts, BlogPost } from '../data/blogsData';
import { services as defaultServices, ServiceItem } from '../data/services';
import { products as defaultProducts, Product } from '../data/products';
import { agents as defaultAgents, AgentItem } from '../data/agents';
import {
  openRoles as defaultRoles,
  culturePillars as defaultPillars,
  perksList as defaultPerks,
  JobRole,
  CulturePillar,
  PerkItem,
} from '../data/careersData';
import {
  creatorTracks as defaultTracks,
  agencyModels as defaultModels,
  CreatorTrack,
  AgencyModel,
} from '../data/collectivesData';
import { UnifiedWorkItem } from '../data/workData';

export interface WebsiteDataState {
  caseStudies: CaseStudy[];
  portfolioProjects: PortfolioProject[];
  blogPosts: BlogPost[];
  services: ServiceItem[];
  products: Product[];
  agents: AgentItem[];
  openRoles: JobRole[];
  culturePillars: CulturePillar[];
  perksList: PerkItem[];
  creatorTracks: CreatorTrack[];
  agencyModels: AgencyModel[];
  isLoadedFromMySQL: boolean;
  isFetching: boolean;
  lastUpdated: number | null;
}

// Global in-memory reactive state
let currentState: WebsiteDataState = {
  caseStudies: defaultCaseStudies,
  portfolioProjects: defaultPortfolio,
  blogPosts: defaultBlogPosts,
  services: defaultServices,
  products: defaultProducts,
  agents: defaultAgents,
  openRoles: defaultRoles,
  culturePillars: defaultPillars,
  perksList: defaultPerks,
  creatorTracks: defaultTracks,
  agencyModels: defaultModels,
  isLoadedFromMySQL: false,
  isFetching: false,
  lastUpdated: null,
};

type Listener = (state: WebsiteDataState) => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => {
    try {
      listener(currentState);
    } catch (e) {
      console.error('[contentSync] Listener error:', e);
    }
  });
}

// In-flight request deduplication
let syncPromise: Promise<boolean> | null = null;

/**
 * Revalidates content from MySQL backend via dual-target endpoints.
 */
export async function syncContentFromMySQL(force = false): Promise<boolean> {
  const CACHE_TTL_MS = 60_000; // 1 minute client freshness
  if (!force && currentState.lastUpdated && Date.now() - currentState.lastUpdated < CACHE_TTL_MS) {
    return true;
  }

  if (syncPromise) {
    return syncPromise;
  }

  currentState = { ...currentState, isFetching: true };
  notify();

  syncPromise = (async () => {
    try {
      // 1. Dual endpoint capability (attempt /api/content first, then fallback to /api/content.php)
      let res: Response;
      try {
        res = await fetch('/api/content?type=all', {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok && res.status === 404) {
          res = await fetch('/api/content.php?type=all', {
            headers: { Accept: 'application/json' },
          });
        }
      } catch {
        // Network or offline fallback to .php endpoint
        res = await fetch('/api/content.php?type=all', {
          headers: { Accept: 'application/json' },
        });
      }

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const json = await res.json();
      if (!json || json.success !== true || !json.data) {
        throw new Error('Invalid JSON payload from MySQL API');
      }

      const d = json.data;

      currentState = {
        caseStudies: Array.isArray(d.caseStudies) && d.caseStudies.length > 0 ? d.caseStudies : defaultCaseStudies,
        portfolioProjects: Array.isArray(d.portfolioProjects) && d.portfolioProjects.length > 0 ? d.portfolioProjects : defaultPortfolio,
        blogPosts: Array.isArray(d.blogPosts) && d.blogPosts.length > 0 ? d.blogPosts : defaultBlogPosts,
        services: Array.isArray(d.services) && d.services.length > 0 ? d.services : defaultServices,
        products: Array.isArray(d.products) && d.products.length > 0 ? d.products : defaultProducts,
        agents: Array.isArray(d.agents) && d.agents.length > 0 ? d.agents : defaultAgents,
        openRoles: d.careers?.openRoles?.length > 0 ? d.careers.openRoles : defaultRoles,
        culturePillars: d.careers?.culturePillars?.length > 0 ? d.careers.culturePillars : defaultPillars,
        perksList: d.careers?.perksList?.length > 0 ? d.careers.perksList : defaultPerks,
        creatorTracks: d.collectives?.creatorTracks?.length > 0 ? d.collectives.creatorTracks : defaultTracks,
        agencyModels: d.collectives?.agencyModels?.length > 0 ? d.collectives.agencyModels : defaultModels,
        isLoadedFromMySQL: json.source === 'mysql',
        isFetching: false,
        lastUpdated: Date.now(),
      };

      notify();
      return true;
    } catch (err) {
      // Graceful fail-safe: keep static defaults active
      currentState = { ...currentState, isFetching: false };
      notify();
      return false;
    } finally {
      syncPromise = null;
    }
  })();

  return syncPromise;
}

/**
 * Hook to access the full reactive content state synced with MySQL.
 */
export function useDynamicContent(): WebsiteDataState {
  const [state, setState] = useState<WebsiteDataState>(currentState);

  useEffect(() => {
    const handleUpdate = (updated: WebsiteDataState) => setState(updated);
    listeners.add(handleUpdate);

    // Initial background sync (skip in automated test environments)
    const isTest = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test';
    if (!isTest) {
      syncContentFromMySQL();
    }

    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  return state;
}

/**
 * Granular hooks for specific sections
 */
export function useDynamicCaseStudies(): CaseStudy[] {
  const { caseStudies } = useDynamicContent();
  return caseStudies;
}

export function useDynamicServices(): ServiceItem[] {
  const { services } = useDynamicContent();
  return services;
}

export function useDynamicPortfolio(): PortfolioProject[] {
  const { portfolioProjects } = useDynamicContent();
  return portfolioProjects;
}

export function useDynamicBlogPosts(): BlogPost[] {
  const { blogPosts } = useDynamicContent();
  return blogPosts;
}

export function useDynamicProducts(): Product[] {
  const { products } = useDynamicContent();
  return products;
}

export function useDynamicAgents(): AgentItem[] {
  const { agents } = useDynamicContent();
  return agents;
}

export function useDynamicCareers() {
  const { openRoles, culturePillars, perksList } = useDynamicContent();
  return { openRoles, culturePillars, perksList };
}

export function useDynamicCollectives() {
  const { creatorTracks, agencyModels } = useDynamicContent();
  return { creatorTracks, agencyModels };
}

export function useDynamicUnifiedWork(): UnifiedWorkItem[] {
  const { caseStudies, portfolioProjects } = useDynamicContent();
  return useMemo(() => {
    const csItems: UnifiedWorkItem[] = caseStudies.map((cs) => ({
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
    const portItems: UnifiedWorkItem[] = portfolioProjects.map((p) => ({
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
    return [...csItems, ...portItems];
  }, [caseStudies, portfolioProjects]);
}
