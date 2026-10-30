const SITE_URL = 'https://qalalabs.com';

/**
 * Trim text to at most `max` characters without cutting a word in half.
 * Adds an ellipsis only when something was removed.
 */
export const trimToWords = (text: string, max = 155): string => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${base.replace(/[\s,;:.\-–—]+$/, '')}…`;
};

/**
 * SEO title for long editorial headlines: keeps the full text when it fits,
 * otherwise uses the part before the first colon ("The 28x ROAS Funnel Blueprint: Why...").
 * The page H1 keeps the full headline.
 */
export const shortTitle = (title: string, max = 55): string => {
  if (title.length <= max) return title;
  const head = title.split(':')[0].trim();
  return head.length > 0 && head.length <= max ? head : trimToWords(title, max);
};

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

/**
 * Convert "February 2026" / "Feb 12, 2026" / "2026-02-12" into an ISO date
 * (YYYY-MM-DD) for schema.org. Month-only inputs resolve to the 1st.
 * Returns undefined when the value cannot be parsed, so callers can omit the field.
 */
export const toIsoDate = (value?: string): string | undefined => {
  if (!value) return undefined;
  const v = value.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);

  const lower = v.toLowerCase();
  const year = lower.match(/\b(19|20)\d{2}\b/)?.[0];
  const monthIdx = MONTHS.findIndex((m) => lower.includes(m.slice(0, 3)));
  if (!year || monthIdx === -1) return undefined;

  // A standalone 1-2 digit number (not part of the year) is the day of month.
  const day = lower.replace(year, ' ').match(/\b(0?[1-9]|[12]\d|3[01])\b/);
  const dayNum = day ? Number(day[1]) : 1;
  return `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
};

export interface Crumb {
  name: string;
  /** Path ("/services") or absolute URL. */
  url: string;
}

const abs = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url}`);

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.url),
  })),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

/**
 * Duplicate routes that render the same page. The canonical URL for each is
 * the path listed in public/sitemap.xml.
 */
const CANONICAL_ALIASES: Record<string, string> = {
  '/about': '/who-we-are',
  '/team': '/who-we-are',
  '/service': '/services',
  '/our-work': '/work',
  '/blogs': '/blog',
  '/career': '/careers',
  '/creators': '/creator-collective',
  '/agencies': '/agency-collective',
  '/growth-tools': '/tools',
  '/contact': '/contact-us',
};

const CANONICAL_PREFIX_ALIASES: [string, string][] = [
  ['/service/', '/services/'],
  ['/blogs/', '/blog/'],
];

export const canonicalPath = (pathname: string): string => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (CANONICAL_ALIASES[path]) return CANONICAL_ALIASES[path];
  for (const [from, to] of CANONICAL_PREFIX_ALIASES) {
    if (path.startsWith(from)) return `${to}${path.slice(from.length)}`;
  }
  return path;
};
