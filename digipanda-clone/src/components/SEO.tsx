import React, { useEffect } from 'react';
import { canonicalPath, trimToWords } from '../lib/seo';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
  schema?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'Qala Labs | Creative × Data × Impact • AI & Growth Studio';
const DEFAULT_DESCRIPTION =
  'Qala Labs blends art and engineering to build autonomous growth systems, AI creative engines, and high-converting digital products.';
const DEFAULT_IMAGE = '/assets/og/og-default.jpg';
const SITE_URL = 'https://qalalabs.com';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noindex = false,
  schema,
}) => {
  const fullTitle = title
    ? title.includes('Qala Labs')
      ? title
      : `${title} | Qala Labs`
    : DEFAULT_TITLE;

  const resolvedUrl = url || (typeof window !== 'undefined' ? window.location.pathname : '/');
  // Duplicate routes (/our-work, /blogs, /career, ...) canonicalise to the sitemap URL.
  const resolvedPath = resolvedUrl.startsWith('http') ? resolvedUrl : canonicalPath(resolvedUrl);
  const canonicalUrl = resolvedPath.startsWith('http')
    ? resolvedPath
    : `${SITE_URL}${resolvedPath.startsWith('/') ? resolvedPath : `/${resolvedPath}`}`;

  // Keep snippets inside the ~155 character limit without cutting words in half.
  const metaDescription = trimToWords(description, 155);

  const imageUrl = image.startsWith('http')
    ? image
    : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  useEffect(() => {
    // Set page title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta description
    setMetaTag('name', 'description', metaDescription);

    // Robots meta tag
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:image', imageUrl);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Qala Labs');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', imageUrl);

    // Dynamic JSON-LD Structured Data
    let schemaScript = document.getElementById('qala-jsonld-page') as HTMLScriptElement | null;
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'qala-jsonld-page';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [fullTitle, metaDescription, imageUrl, canonicalUrl, type, noindex, schema]);

  return null;
};
