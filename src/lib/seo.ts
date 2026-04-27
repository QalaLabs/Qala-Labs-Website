export const siteConfig = {
  name: "Qala Labs",
  description: "India's full-service AI growth agency — combining performance marketing, AI automation, and AI search visibility to build brands that scale.",
  url: "https://qalalabs.com",
  ogImage: "https://qalalabs.com/og.svg",
  links: {
    twitter: "https://twitter.com/qalalabs",
    linkedin: "https://www.linkedin.com/company/qalalabs/",
  },
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}) {
  return {
    title: title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@qalalabs",
    },
    icons: "/favicon.ico",
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export const getBaseJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteConfig.url}/favicon.png`
        },
        "sameAs": [
          siteConfig.links.twitter,
          siteConfig.links.linkedin
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        "url": siteConfig.url,
        "name": siteConfig.name,
        "publisher": {
          "@id": `${siteConfig.url}/#organization`
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        "name": siteConfig.name,
        "url": siteConfig.url,
        "description": siteConfig.description,
        "image": `${siteConfig.url}/og.svg`,
        "priceRange": "₹₹₹",
        "areaServed": [
          { "@type": "Country", "name": "India" },
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "United Kingdom" }
        ],
        "serviceType": [
          "Performance Marketing",
          "DTC Growth Agency",
          "Meta Ads Management",
          "Google Shopping Ads",
          "Amazon Ads Management",
          "AI Automation for Ecommerce",
          "UGC Content Production",
          "Creator Marketing"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Growth Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Growth Engine",
                "description": "Full Meta & Google Ads management, creative strategy, and server-side tracking for DTC brands doing ₹10L–₹50L monthly revenue."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Market Dominator",
                "description": "Aggressive multi-channel performance marketing and AI automation for 8-figure DTC brands."
              }
            }
          ]
        },
        "parentOrganization": {
          "@id": `${siteConfig.url}/#organization`
        }
      }
    ]
  };
};

export const generateJsonLd = (type: string, data: any) => {
  const base = {
    "@context": "https://schema.org",
    "@type": type,
  };
  return JSON.stringify({ ...base, ...data });
};

export const generateCaseStudySchema = (study: any) => {
  return generateJsonLd('Article', {
    "@id": `${siteConfig.url}/case-studies/${study.slug}#article`,
    "headline": study.title,
    "description": study.description,
    "image": study.image_url,
    "datePublished": study.created_at || new Date().toISOString(),
    "dateModified": study.updated_at || study.created_at || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Qala Labs",
      "@id": `${siteConfig.url}/#organization`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Qala Labs",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/favicon.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/case-studies/${study.slug}`
    },
    "about": {
      "@type": "Thing",
      "name": study.category || "DTC Ecommerce Growth"
    },
    "keywords": `${study.category || "performance marketing"}, DTC growth, ecommerce India, ${study.results?.headline || "revenue growth"}`,
    "articleSection": "Case Study"
  });
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`
    }))
  };
};

export const generateBlogSchema = (post: any) => {
  return generateJsonLd('Article', {
    "@id": `${siteConfig.url}/blog/${post.slug}#article`,
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image_url,
    "datePublished": post.created_at || new Date().toISOString(),
    "dateModified": post.updated_at || post.created_at || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Qala Labs",
      "@id": `${siteConfig.url}/#organization`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Qala Labs",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/favicon.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`
    },
    "keywords": `${post.category || "performance marketing"}, DTC ecommerce India, growth strategy`,
    "articleSection": post.category || "Strategy"
  });
};