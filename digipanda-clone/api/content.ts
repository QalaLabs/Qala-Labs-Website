import type { IncomingMessage, ServerResponse } from 'http';
import { caseStudies } from '../src/data/caseStudies';
import { portfolioProjects } from '../src/data/portfolioData';
import { blogPosts } from '../src/data/blogsData';
import { services } from '../src/data/services';
import { products } from '../src/data/products';
import { agents } from '../src/data/agents';
import { openRoles, culturePillars, perksList } from '../src/data/careersData';
import { creatorTracks, agencyModels } from '../src/data/collectivesData';

export interface VercelRequest extends IncomingMessage {
  query: { [key: string]: string | string[] };
  method?: string;
}

export interface VercelResponse extends ServerResponse {
  send: (body: any) => VercelResponse;
  json: (jsonBody: any) => VercelResponse;
  status: (statusCode: number) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
    return;
  }

  const queryType = req.query?.type;
  const type = typeof queryType === 'string' ? queryType : 'all';
  const querySlug = req.query?.slug;
  const slug = typeof querySlug === 'string' ? querySlug : null;

  try {
    let data: any = null;

    switch (type) {
      case 'case-studies':
      case 'case_studies':
        data = caseStudies;
        break;

      case 'case-study':
        if (!slug) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, error: 'Slug parameter required' }));
          return;
        }
        data = caseStudies.find((c) => c.slug === slug);
        if (!data) {
          res.statusCode = 404;
          res.end(JSON.stringify({ success: false, error: 'Case study not found' }));
          return;
        }
        break;

      case 'portfolio':
      case 'portfolio_projects':
        data = portfolioProjects;
        break;

      case 'blogs':
      case 'blog_posts':
        data = blogPosts;
        break;

      case 'services':
        data = services;
        break;

      case 'products':
        data = products;
        break;

      case 'agents':
      case 'ai_agents':
        data = agents;
        break;

      case 'careers':
        data = { openRoles, culturePillars, perksList };
        break;

      case 'collectives':
        data = { creatorTracks, agencyModels };
        break;

      case 'all':
      default:
        data = {
          caseStudies,
          portfolioProjects,
          blogPosts,
          services,
          products,
          agents,
          careers: { openRoles, culturePillars, perksList },
          collectives: { creatorTracks, agencyModels },
        };
        break;
    }

    res.statusCode = 200;
    res.end(
      JSON.stringify({
        success: true,
        data,
        source: 'serverless-hybrid',
        timestamp: new Date().toISOString(),
      })
    );
  } catch (err: any) {
    res.statusCode = 500;
    res.end(JSON.stringify({ success: false, error: err.message || 'Server error' }));
  }
}
