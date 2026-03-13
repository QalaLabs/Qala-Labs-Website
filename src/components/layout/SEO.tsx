"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig, getBaseJsonLd } from '@/lib/seo';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  noIndex?: boolean;
  jsonLd?: any;
}

const SEO = ({ title, description, image, article, noIndex, jsonLd }: SEOProps) => {
  const location = useLocation();
  const seoTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const seoDescription = description || siteConfig.description;
  const seoImage = image || siteConfig.ogImage;
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
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content={siteConfig.name} />

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
    </Helmet>
  );
};

export default SEO;