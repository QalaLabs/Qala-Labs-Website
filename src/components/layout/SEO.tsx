"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/lib/seo';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

const SEO = ({ title, description, image, article }: SEOProps) => {
  const seoTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const seoDescription = description || siteConfig.description;
  const seoImage = image || siteConfig.ogImage;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="image" content={seoImage} />

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:type" content={article ? 'article' : 'website'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Helmet>
  );
};

export default SEO;