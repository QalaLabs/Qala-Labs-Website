import { describe, it, expect, vi, beforeEach } from 'vitest';
import handler, { VercelRequest, VercelResponse } from '../../../api/content';
import { syncContentFromMySQL, useDynamicCaseStudies } from '../../services/contentSync';

function createMockReqRes(options: {
  method?: string;
  query?: Record<string, string>;
  headers?: Record<string, string>;
}) {
  const req = {
    method: options.method || 'GET',
    query: options.query || {},
    headers: options.headers || {},
  } as unknown as VercelRequest;

  let endedData = '';
  const res = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    setHeader: vi.fn(function (name: string, val: string) {
      res.headers[name] = val;
      return res;
    }),
    status: vi.fn(function (code: number) {
      res.statusCode = code;
      return res;
    }),
    json: vi.fn(function (data: any) {
      (res as any).data = data;
      return res;
    }),
    end: vi.fn(function (chunk?: string) {
      if (chunk) endedData = chunk;
      return res;
    }),
    get endedData() {
      return endedData ? JSON.parse(endedData) : (res as any).data;
    },
  } as unknown as VercelResponse & {
    data: any;
    statusCode: number;
    headers: Record<string, string>;
    endedData: any;
  };

  return { req, res };
}

describe('API Content Handler (/api/content)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('handles CORS OPTIONS preflight request with 200', async () => {
    const { req, res } = createMockReqRes({ method: 'OPTIONS' });
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.end).toHaveBeenCalled();
  });

  it('rejects non-GET HTTP methods with 405 Method Not Allowed', async () => {
    const { req, res } = createMockReqRes({ method: 'POST' });
    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res.endedData).toMatchObject({
      success: false,
      error: 'Method not allowed',
    });
  });

  it('serves all website data bundles when type=all or unspecified', async () => {
    const { req, res } = createMockReqRes({ method: 'GET', query: { type: 'all' } });
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const body = res.endedData;
    expect(body.success).toBe(true);
    expect(body.data.caseStudies.length).toBeGreaterThan(0);
    expect(body.data.portfolioProjects.length).toBeGreaterThan(0);
    expect(body.data.blogPosts.length).toBeGreaterThan(0);
    expect(body.data.services.length).toBeGreaterThan(0);
    expect(body.data.products.length).toBeGreaterThan(0);
    expect(body.data.agents.length).toBeGreaterThan(0);
  });

  it('filters data by type=case-studies', async () => {
    const { req, res } = createMockReqRes({ method: 'GET', query: { type: 'case-studies' } });
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const body = res.endedData;
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data[0]).toHaveProperty('slug');
  });

  it('retrieves individual case study by slug', async () => {
    const { req, res } = createMockReqRes({
      method: 'GET',
      query: { type: 'case-study', slug: 'nutrivend-uk' },
    });
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const body = res.endedData;
    expect(body.success).toBe(true);
    expect(body.data.slug).toBe('nutrivend-uk');
    expect(body.data.title).toBe('Nutrivend UK');
  });

  it('returns 404 when querying an unknown slug', async () => {
    const { req, res } = createMockReqRes({
      method: 'GET',
      query: { type: 'case-study', slug: 'non-existent-case-study' },
    });
    await handler(req, res);

    expect(res.statusCode).toBe(404);
    expect(res.endedData).toMatchObject({
      success: false,
      error: 'Case study not found',
    });
  });

  it('contentSync service safely handles offline/unreachable API with graceful fallback', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));
    const success = await syncContentFromMySQL(true);
    // Should gracefully return false without throwing or crashing
    expect(success).toBe(false);
  });
});
