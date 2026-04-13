"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig, getBaseJsonLd, generateBreadcrumbSchema } from '@/lib/seo';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  noIndex?: boolean;
  jsonLd?: any;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const SEO = ({ title, description, image, article, noIndex, jsonLd, breadcrumbs }: SEOProps) => {
  const location = useLocation();
  const seoTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const seoDescription = description || siteConfig.description;
  
  // Ensure the image URL is absolute for social crawlers
  const getFullImageUrl = (img?: string) => {
    if (!img) return siteConfig.ogImage;
    if (img.startsWith('http')) return img;
    return `${siteConfig.url}${img.startsWith('/') ? '' : '/'}${img}`;
  };

  const seoImage = getFullImageUrl(image);
  const canonicalUrl = `${siteConfig.url}${location.pathname}`;

  const baseJsonLd = getBaseJsonLd();

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="image" content={seoImage} />
      <link rel="canonical" href={canonicalUrl} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:secure_url" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content="@qalalabs" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(baseJsonLd)}
      </script>
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
      {breadcrumbs && breadcrumbs.length > 1 && (
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema(breadcrumbs))}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;