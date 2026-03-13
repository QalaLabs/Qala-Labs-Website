export const siteConfig = {
  name: "Qala Labs",
  description: "Revenue-growth and performance marketing agency specializing in E-com Scale and Digital Transformation.",
  url: "https://qalalabs.com",
  ogImage: "https://qalalabs.com/og.jpg",
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
      }
    ]
  };
};

export const generateJsonLd = (type: 'Organization' | 'Website' | 'CaseStudy' | 'Service' | 'BreadcrumbList', data: any) => {
  const base = {
    "@context": "https://schema.org",
    "@type": type,
  };
  return JSON.stringify({ ...base, ...data });
};