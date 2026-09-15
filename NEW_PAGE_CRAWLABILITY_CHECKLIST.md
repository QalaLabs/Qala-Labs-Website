# New Page Crawlability Checklist

**Page Title:** _______________________  
**Page URL:** _______________________  
**Created By:** _______________________  
**Date:** _______________________

---

## ✅ SEO Component Setup

- [ ] SEO component imported: `import SEO from '@/components/layout/SEO';`
- [ ] `title` provided (50-60 characters)
- [ ] `description` provided (150-160 characters)
- [ ] `image` provided (1200×630px, HTTPS URL)
- [ ] `noIndex` set to `false` (unless intentional)

```tsx
<SEO
  title="Your Page Title"
  description="Your page description..."
  image="/og-image.jpg"
/>
```

---

## ✅ Semantic HTML

- [ ] Page has exactly **one** `<h1>` tag
- [ ] Heading hierarchy is correct (h1 → h2 → h3, no jumps)
- [ ] Content wrapped in `<main id="main-content">` or `<article>`
- [ ] All images have descriptive `alt` text
- [ ] Links use `<a href>` tags (not `<button onClick>`)
- [ ] Forms use proper `<form>`, `<input>`, `<label>` elements

---

## ✅ Structured Data (JSON-LD)

Choose the appropriate schema:

**For Articles/Blog Posts:**
```tsx
import { generateBlogSchema } from '@/lib/seo';

<SEO
  jsonLd={generateBlogSchema({
    slug: 'your-post-slug',
    title: 'Your Article Title',
    excerpt: 'Short description...',
    image_url: '/image.jpg',
    category: 'Category Name'
  })}
/>
```

**For Case Studies:**
```tsx
import { generateCaseStudySchema } from '@/lib/seo';

<SEO
  jsonLd={generateCaseStudySchema({
    slug: 'your-case-study',
    title: 'Case Study Title',
    description: 'Summary...',
    image_url: '/image.jpg'
  })}
/>
```

**For Portfolio/Projects:**
```tsx
import { generatePortfolioSchema } from '@/lib/seo';

<SEO
  jsonLd={generatePortfolioSchema({
    slug: 'project-name',
    title: 'Project Title',
    description: 'Details...',
    image_url: '/image.jpg'
  })}
/>
```

**For Services:**
```tsx
import { generateServiceSchema } from '@/lib/seo';

<SEO
  jsonLd={generateServiceSchema({
    slug: 'service-slug',
    title: 'Service Name',
    description: 'Service details...',
    image_url: '/image.jpg'
  })}
/>
```

**For FAQ Sections:**
```tsx
import { generateFAQSchema } from '@/lib/seo';

<SEO
  jsonLd={generateFAQSchema([
    { question: 'Q1?', answer: 'A1...' },
    { question: 'Q2?', answer: 'A2...' }
  ])}
/>
```

- [ ] Appropriate schema type selected
- [ ] All schema fields populated
- [ ] Schema includes images, dates, authors where applicable

---

## ✅ Breadcrumbs (If Nested)

If page is nested (e.g., `/services/something`):

```tsx
<SEO
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Your Service', url: '/services/your-service' }
  ]}
/>
```

- [ ] Breadcrumbs included for nested pages
- [ ] Breadcrumbs form a logical hierarchy

---

## ✅ Accessibility

- [ ] Page passes [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/) standards
- [ ] All form inputs have associated `<label>` elements
- [ ] Color contrast meets AA standards (4.5:1 for text)
- [ ] Interactive elements have visible focus states
- [ ] Images have meaningful alt text (not "image" or "photo")
- [ ] Video has captions (if applicable)

---

## ✅ Sitemap Update

- [ ] Page URL added to `/public/sitemap.xml`
- [ ] `lastmod` date is today's date (2026-05-02)
- [ ] Correct `priority` assigned:
  - Service pages: 0.95
  - Case studies/portfolio: 0.85-0.9
  - Blog posts: 0.8
  - Secondary content: 0.7
  - Legal/tertiary: 0.5-0.6

```xml
<url>
  <loc>https://qalalabs.com/your-new-page</loc>
  <lastmod>2026-05-02</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## ✅ robots.txt (If Protected)

If this is a protected/private page, add to `/public/robots.txt`:

```
Disallow: /your-protected-path
Disallow: /your-protected-path/
```

- [ ] Protected pages added to robots.txt
- [ ] Public pages NOT blocked in robots.txt

---

## ✅ Mobile & Performance

- [ ] Page responsive on mobile (375px - 1920px)
- [ ] Images optimized (< 100KB for web)
- [ ] No JavaScript required for core content
- [ ] Page loads in < 3 seconds (lighthouse)
- [ ] Cumulative Layout Shift (CLS) < 0.1

---

## ✅ Content Quality

- [ ] Title is unique and descriptive
- [ ] Description is unique and compelling
- [ ] Content is original (not duplicated elsewhere)
- [ ] Links point to relevant, authoritative sources
- [ ] No keyword stuffing or over-optimization
- [ ] Grammar and spelling are correct
- [ ] Content is updated with current information

---

## ✅ Social Sharing

- [ ] OG image renders correctly on [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Twitter card renders correctly on [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] LinkedIn preview looks good when shared
- [ ] Image dimensions are 1200×630px

---

## ✅ Final Testing

Before marking complete:

1. **URL Inspection:** Test in [Google Search Console](https://search.google.com/search-console)
   - [ ] Page renders correctly
   - [ ] All links are crawlable
   - [ ] No crawl errors

2. **Rich Results:** Test in [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [ ] Schema validates without errors
   - [ ] Rich snippet previews correctly

3. **Lighthouse:** Run in Chrome DevTools
   - [ ] Performance: > 90
   - [ ] Accessibility: > 90
   - [ ] Best Practices: > 90
   - [ ] SEO: > 90

4. **Manual Check:**
   - [ ] Page appears in sitemap
   - [ ] Breadcrumbs work correctly
   - [ ] All images load
   - [ ] All links are valid

---

## Notes

_Add any special considerations, edge cases, or additional notes here:_

```
Example: This page uses dynamic content from the database, 
so the description is updated via the API response.
```

---

## Sign-Off

- **Checked By:** _______________________
- **Date Checked:** _______________________
- **Status:** ☐ Ready for Production ☐ Needs Fixes

---

**Resources:**
- [Crawler Readability Guide](./CRAWLER_READABILITY_GUIDE.md)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
