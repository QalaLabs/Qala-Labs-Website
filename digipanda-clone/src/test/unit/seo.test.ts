import { describe, it, expect } from 'vitest';
import { breadcrumbSchema, canonicalPath, faqSchema, shortTitle, toIsoDate, trimToWords } from '../../lib/seo';

describe('trimToWords', () => {
  it('returns short text unchanged', () => {
    expect(trimToWords('Short description.', 155)).toBe('Short description.');
  });

  it('never exceeds the limit and does not cut a word in half', () => {
    const text = 'Qala Labs builds autonomous growth systems and creative engines for ambitious brands across India and the United Kingdom every single day';
    const out = trimToWords(text, 60);
    expect(out.length).toBeLessThanOrEqual(60);
    expect(out.endsWith('…')).toBe(true);
    const body = out.slice(0, -1);
    expect(text.startsWith(body)).toBe(true);
    expect(text[body.length]).toBe(' ');
  });
});

describe('toIsoDate', () => {
  it('parses month and year to the first of the month', () => {
    expect(toIsoDate('February 2026')).toBe('2026-02-01');
    expect(toIsoDate('January 2026')).toBe('2026-01-01');
  });

  it('parses a full date and passes ISO dates through', () => {
    expect(toIsoDate('Feb 12, 2026')).toBe('2026-02-12');
    expect(toIsoDate('2026-03-05')).toBe('2026-03-05');
  });

  it('returns undefined when the value is not a date', () => {
    expect(toIsoDate('soon')).toBeUndefined();
    expect(toIsoDate(undefined)).toBeUndefined();
  });
});

describe('canonicalPath', () => {
  it('maps duplicate routes to the sitemap URL', () => {
    expect(canonicalPath('/our-work')).toBe('/work');
    expect(canonicalPath('/about')).toBe('/who-we-are');
    expect(canonicalPath('/contact')).toBe('/contact-us');
    expect(canonicalPath('/career')).toBe('/careers');
    expect(canonicalPath('/blogs/some-post')).toBe('/blog/some-post');
    expect(canonicalPath('/service/branding')).toBe('/services/branding');
  });

  it('leaves canonical paths alone and strips trailing slashes', () => {
    expect(canonicalPath('/services/ai-automation')).toBe('/services/ai-automation');
    expect(canonicalPath('/')).toBe('/');
    expect(canonicalPath('/work/')).toBe('/work');
  });
});

describe('schema builders', () => {
  it('builds an ordered BreadcrumbList with absolute URLs', () => {
    const out = breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
    ]);
    expect(out['@type']).toBe('BreadcrumbList');
    expect(out.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(out.itemListElement[1].item).toBe('https://qalalabs.com/services');
  });

  it('builds FAQPage markup from question and answer pairs', () => {
    const out = faqSchema([{ q: 'What is GEO?', a: 'Generative engine optimization.' }]);
    expect(out['@type']).toBe('FAQPage');
    expect(out.mainEntity[0].name).toBe('What is GEO?');
    expect(out.mainEntity[0].acceptedAnswer.text).toBe('Generative engine optimization.');
  });
});

describe('shortTitle', () => {
  it('keeps short titles whole', () => {
    expect(shortTitle('Search Engine Optimization Services')).toBe('Search Engine Optimization Services');
  });

  it('uses the part before the colon for long editorial headlines', () => {
    expect(shortTitle('The 28x ROAS Funnel Blueprint: Why Generic Performance Marketing Fails High-Ticket Offers')).toBe(
      'The 28x ROAS Funnel Blueprint',
    );
  });

  it('falls back to a word-safe trim when there is no usable colon', () => {
    const out = shortTitle('A very long headline without any colon that keeps going past the limit of the title', 40);
    expect(out.length).toBeLessThanOrEqual(40);
  });
});
