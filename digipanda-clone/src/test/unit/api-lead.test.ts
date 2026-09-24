import { describe, it, expect, vi, beforeEach } from 'vitest';
import handler, { VercelRequest, VercelResponse } from '../../../api/lead';

function createMockReqRes(options: {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}) {
  const req = {
    method: options.method || 'POST',
    body: options.body,
    headers: options.headers || {},
    query: {},
    cookies: {},
  } as unknown as VercelRequest;

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
    send: vi.fn(function (data: any) {
      (res as any).data = data;
      return res;
    }),
    end: vi.fn(function () {
      return res;
    }),
    redirect: vi.fn(),
  } as unknown as VercelResponse & { data: any; statusCode: number; headers: Record<string, string> };

  return { req, res };
}

describe('API Lead Handler (/api/lead)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('handles CORS OPTIONS preflight request with 200', async () => {
    const { req, res } = createMockReqRes({ method: 'OPTIONS' });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.end).toHaveBeenCalled();
  });

  it('rejects non-POST HTTP methods with 405 Method Not Allowed', async () => {
    const { req, res } = createMockReqRes({ method: 'GET' });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.data).toEqual({ success: false, error: 'Method not allowed' });
  });

  it('rejects invalid JSON body string with 400', async () => {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: 'invalid-json-payload{',
    });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.data).toEqual({ success: false, error: 'Invalid JSON body' });
  });

  it('silently absorbs honeypot bot submissions (b_url present) with 200', async () => {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        b_url: 'http://spam-link.com',
        name: 'Spam Bot',
      },
    });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.data).toEqual({ success: true, message: 'Lead captured successfully' });
  });

  it('validates required name field', async () => {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        name: '',
        companyName: 'Acme Corp',
        phone: '+1234567890',
        email: 'acme@example.com',
        description: 'Need AI agents',
      },
    });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.data.error).toBe('Name is required');
  });

  it('validates required companyName field', async () => {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        name: 'Jane Doe',
        companyName: '  ',
        phone: '+1234567890',
        email: 'jane@example.com',
        description: 'Need AI agents',
      },
    });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.data.error).toBe('Company name is required');
  });

  it('validates phone format', async () => {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        name: 'Jane Doe',
        companyName: 'Acme Corp',
        phone: '12', // too short
        email: 'jane@example.com',
        description: 'Need AI agents',
      },
    });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.data.error).toBe('A valid phone number is required');
  });

  it('validates email format', async () => {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        name: 'Jane Doe',
        companyName: 'Acme Corp',
        phone: '+1 555-123-4567',
        email: 'invalid-email-address',
        description: 'Need AI agents',
      },
    });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.data.error).toBe('A valid email is required');
  });

  it('validates description field', async () => {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        name: 'Jane Doe',
        companyName: 'Acme Corp',
        phone: '+1 555-123-4567',
        email: 'jane@example.com',
        description: '',
      },
    });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.data.error).toBe('Description is required');
  });

  it('successfully captures valid lead', async () => {
    const { req, res } = createMockReqRes({
      method: 'POST',
      body: {
        name: 'Aashirwad Sharma',
        companyName: 'Qala Labs Client',
        phone: '+91 98765 43210',
        email: 'client@qalalabs.com',
        description: 'Looking to implement an autonomous ops swarm for order reconciliation',
        source: 'contact_section',
      },
    });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.data).toEqual({ success: true, message: 'Lead captured successfully' });
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });
});
