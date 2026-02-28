export const siteConfig = {
  name: "Qala Labs",
  description: "Revenue-growth and performance marketing agency specializing in E-com Scale and Digital Transformation.",
  url: "https://qalalabs.com",
  ogImage: "https://qalalabs.com/og.jpg",
  links: {
    twitter: "https://twitter.com/qalalabs",
    github: "https://github.com/qalalabs",
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
    title: `${title} | Qala Labs`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
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

export const generateJsonLd = (type: 'Organization' | 'Website' | 'CaseStudy', data: any) => {
  const base = {
    "@context": "https://schema.org",
    "@type": type,
  };
  return JSON.stringify({ ...base, ...data });
};