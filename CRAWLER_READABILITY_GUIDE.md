# Crawler Readability & AI-Friendly Content Guide

This guide ensures that all website content remains easily readable by search engine crawlers and AI systems.

## Overview

Your website uses:
- **Server-Side Rendering (SSR)** with React Helmet for meta tags
- **Structured Data (JSON-LD)** for semantic meaning
- **Sitemap** for content discovery
- **robots.txt** for crawler instructions
- **Open Graph & Twitter Cards** for social sharing

---

## 1. Creating Crawler-Friendly Pages

### Required SEO Component

Every public page must use the `<SEO>` component with appropriate metadata:

```tsx
import SEO from '@/components/layout/SEO';
import { generateBreadcrumbSchema } from '@/lib/seo';

const MyPage = () => {
  return (
    <div>
      <SEO
        title="Page Title"
        description="Page description under 160 characters"
        image="/path/to/og-image.jpg"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Section', url: '/section' },
          { name: 'Page', url: '/section/page' }
        ]}
        jsonLd={generateBreadcrumbSchema([...])}
      />
      <main id="main-content">
        {/* Page content */}
      </main>
    </div>
  );
};
```

### Metadata Requirements

| Field | Max Length | Example |
|-------|-----------|---------|
| `title` | 60 chars | "AI Automation Services" |
| `description` | 160 chars | "Enterprise AI agents, automation..." |
| `image` | — | Must be 1200×630px minimum |
| `breadcrumbs` | — | Include for nested pages |

---

## 2. Structured Data (JSON-LD) Schemas

Use appropriate schemas from `/src/lib/seo.ts`:

### For Articles & Blog Posts
```tsx
import { generateBlogSchema } from '@/lib/seo';

<SEO
  jsonLd={generateBlogSchema({
    slug: 'my-blog-post',
    title: 'My Blog Post',
    excerpt: 'Short description',
    image_url: '/image.jpg',
    created_at: '2026-05-02T00:00:00Z',
    updated_at: '2026-05-02T00:00:00Z',
    category: 'Marketing'
  })}
/>
```

### For Case Studies
```tsx
import { generateCaseStudySchema } from '@/lib/seo';

<SEO
  jsonLd={generateCaseStudySchema({
    slug: 'my-case-study',
    title: 'Case Study Title',
    description: 'Summary',
    image_url: '/image.jpg',
    category: 'Performance Marketing',
    results: { headline: 'Revenue Growth' }
  })}
/>
```

### For Portfolio Items
```tsx
import { generatePortfolioSchema } from '@/lib/seo';

<SEO
  jsonLd={generatePortfolioSchema({
    slug: 'project-name',
    title: 'Project Title',
    description: 'Project details',
    image_url: '/image.jpg',
    category: 'Design'
  })}
/>
```

### For Service Pages
```tsx
import { generateServiceSchema } from '@/lib/seo';

<SEO
  jsonLd={generateServiceSchema({
    slug: 'service-name',
    title: 'Service Title',
    description: 'Service description',
    image_url: '/image.jpg'
  })}
/>
```

### For FAQ Sections
```tsx
import { generateFAQSchema } from '@/lib/seo';

<SEO
  jsonLd={generateFAQSchema([
    {
      question: 'How do you price services?',
      answer: 'Pricing depends on scope...'
    },
    {
      question: 'What is your typical timeline?',
      answer: 'Projects typically take 4-12 weeks...'
    }
  ])}
/>
```

---

## 3. Semantic HTML Best Practices

### Use Proper Heading Hierarchy
```tsx
<main id="main-content">
  <h1>Page Title (Only one H1 per page)</h1>
  
  <section>
    <h2>Section Title</h2>
    <p>Content...</p>
    
    <h3>Subsection</h3>
    <p>Detailed content...</p>
  </section>
</main>
```

### Image Alt Text (Critical for Crawlers)
```tsx
<img 
  src="/hero-image.jpg" 
  alt="Description of image content that helps crawlers understand visual content"
  width="1200"
  height="630"
/>
```

### Article Structure
```tsx
<article>
  <header>
    <h1>Article Title</h1>
    <time dateTime="2026-05-02">May 2, 2026</time>
    <address>By <a href="#author">Author Name</a></address>
  </header>
  
  <section>
    <h2>Section Heading</h2>
    <p>Content...</p>
  </section>
</article>
```

---

## 4. Dynamic Content & CMS Pages

### Updating Sitemap.xml

When adding new pages, update `/public/sitemap.xml`:

```xml
<url>
  <loc>https://qalalabs.com/your-new-page</loc>
  <lastmod>2026-05-02</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

**Priorities:**
- `1.0` - Homepage
- `0.95` - Main service pages
- `0.9` - Core pages (About, Services)
- `0.85` - Case studies, portfolio (high value)
- `0.8` - Detail pages
- `0.7` - Secondary content
- `0.6` - Tertiary content
- `0.5` - Legal pages

---

## 5. Pages That Should Block Crawlers

These are automatically blocked by `robots.txt`:

```
Disallow: /admin/*      # Admin dashboard
Disallow: /login        # Authentication
Disallow: /dashboard    # User dashboard
Disallow: /onboarding   # Onboarding flow
Disallow: /employee/*   # Employee portal
Disallow: /client/*     # Client portal
Disallow: /api/*        # API endpoints
Disallow: /demo/*       # Demo pages
Disallow: /p/*          # Dynamic CMS pages (use with care)
```

If you create new protected routes, add them to `/public/robots.txt`:

```
User-agent: *
Disallow: /your-new-protected-route
```

---

## 6. Social Media Crawlers

These crawlers get special treatment via `server.js`:

- **Facebook** (facebookexternalhit)
- **Twitter/X** (Twitterbot)
- **LinkedIn** (linkedinbot)
- **WhatsApp**
- **Discord** (discordbot)
- **Telegram** (telegrambot)

They bypass React rendering and receive pre-rendered Open Graph tags for performance.

---

## 7. Canonical URLs

Canonical URLs are automatically generated:

```html
<link rel="canonical" href="https://qalalabs.com/your-page" />
```

Ensure:
- Each page has exactly one canonical URL
- Use HTTPS URLs
- No query parameters (unless intentional)
- No trailing slashes inconsistency

---

## 8. robots.txt Rules

Current configuration blocks:
- ✅ All crawlers from `/admin`, `/login`, `/dashboard`
- ✅ Bad bots: AhrefsBot, SemrushBot, MJ12bot, DotBot
- ✅ Crawl delays to be respectful of server resources

To update, edit `/public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /new-protected-area

User-agent: Googlebot
Crawl-delay: 0.5

User-agent: bingbot
Crawl-delay: 1

User-agent: BadBot
Disallow: /
```

---

## 9. Server-Side Rendering (SSR)

Your Express server (`server.js`) handles:

1. **SSR for bots**: Renders React + Helmet on the server
2. **Social crawler optimization**: Detects social bots and serves pre-rendered OG tags
3. **Fallback for failures**: Returns client-side rendered app if SSR fails

No action needed — this is automatic!

---

## 10. Crawlability Checklist

Before launching new pages:

- [ ] Page has `<SEO>` component with title, description, image
- [ ] Page uses proper heading hierarchy (h1, h2, h3)
- [ ] All images have descriptive alt text
- [ ] Content is semantic HTML (not divs with styles)
- [ ] Page has appropriate JSON-LD schema (Article, Service, etc.)
- [ ] Page added to `sitemap.xml` with correct priority
- [ ] If protected, page blocked in `robots.txt`
- [ ] Breadcrumbs included for nested pages
- [ ] No JavaScript-only content (crawlers may not execute JS)
- [ ] Links use standard `<a href>` tags
- [ ] Meta description is 150-160 characters
- [ ] OG image is 1200×630px minimum

---

## 11. Testing Crawler Readability

### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Use "URL Inspection" tool to test any page
4. View "Coverage" to see crawled pages

### Rich Results Test
Test structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)

### Screaming Frog
Download [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) to:
- Crawl entire site
- Check for missing meta tags
- Verify heading structure
- Find broken links

### OpenAI Crawler
Your content is crawled for AI search visibility by:
- GPTBot (OpenAI)
- CCBot (Common Crawl)
- Claudebot (Anthropic)

These are allowed by default.

---

## 12. Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Page not indexed | Missing from sitemap | Add to `/public/sitemap.xml` |
| Bad OG preview | Image too small | Use 1200×630px images |
| Duplicate content | No canonical URL | Helmet sets this automatically |
| Crawling blocked | robots.txt rule | Review `/public/robots.txt` |
| Missing schema | No jsonLd prop | Add `jsonLd={generateXSchema(...)}` |
| Low crawl rate | Crawl delay too high | Check `robots.txt` crawl-delay |

---

## 13. Future Enhancements

Potential improvements for better crawler readability:

- [ ] Add breadcrumb navigation to all pages
- [ ] Implement breadcrumb schema on listing pages
- [ ] Add author/date metadata to all articles
- [ ] Create rich snippets for pricing information
- [ ] Add review/rating schema if applicable
- [ ] Implement AMP pages for mobile crawlers
- [ ] Create WebStories for visual content
- [ ] Add video schema if applicable
- [ ] Implement LocalBusiness schema if you have physical locations
- [ ] Create custom 404 page with sitemap links

---

## Support & Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Yoast SEO Academy](https://yoast.com/academy/)
- [Moz SEO Beginner's Guide](https://moz.com/beginners-guide-to-seo)

---

**Last Updated:** May 2, 2026  
**Status:** ✅ All public pages crawler-friendly
