# Server-Side Rendering & Meta Tags - Technical Implementation Guide

## How Your Crawler Infrastructure Works

Your website has a sophisticated setup for crawler readability:

```
Crawler Request
    ↓
Express Server (server.js)
    ↓
    ├─→ Is it a social bot? → Fetch OG data from DB → Return OG HTML
    │
    └─→ Is it a regular crawler? → Run SSR (React) → Get Helmet context → Inject meta tags
         ↓
    Return HTML with:
    - Server-rendered React content
    - Helmet-injected <title>, <meta>, <script> tags
    - JSON-LD structured data
```

---

## 1. Request Flow for Search Engine Crawlers

### Step 1: Crawler Hits Your Server
```
GET /blog/my-article HTTP/1.1
User-Agent: Googlebot/2.1
```

### Step 2: Server Detects It's a Crawler
`server.js` line 194: Regular crawlers (not social bots) get SSR treatment:

```javascript
if (!isSocialCrawler(req.headers['user-agent'])) {
  // This is a regular crawler like Googlebot, Bingbot
  // → Use React SSR to render the page
}
```

### Step 3: Server Renders React + Captures Helmet
`server.js` line 230: Calls the SSR renderer:

```javascript
const { html, helmet } = await render(req.originalUrl);
```

The `render` function:
- Renders React components on the server
- Captures everything Helmet added to the document head
- Returns the HTML + helmet context

### Step 4: Inject Meta Tags Into HTML Template
`server.js` lines 232-246: Extracts Helmet data and injects into template:

```javascript
const helmetTitle    = helmet?.title?.toString()   ?? '';
const helmetMeta     = helmet?.meta?.toString()    ?? '';
const helmetLink     = helmet?.link?.toString()    ?? '';
const helmetScript   = helmet?.script?.toString()  ?? '';

// Replace template placeholders:
page = page.replace(/<title>[^<]*<\/title>/, helmetTitle);
page = page.replace('<!--app-head-->', headInjection);
```

### Step 5: Return Full HTML to Crawler
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Your Page | Qala Labs</title>
  <meta name="description" content="...">
  <meta property="og:title" content="...">
  <script type="application/ld+json">{...}</script>
  <link rel="canonical" href="...">
  <!-- More meta tags -->
</head>
<body>
  <div id="root">
    <!-- Server-rendered React HTML -->
  </div>
</body>
</html>
```

---

## 2. Social Crawler Optimization

### Fast Path for Facebook, Twitter, LinkedIn, etc.

For social media crawlers, your server uses a **faster path** that skips React rendering:

```javascript
if (isSocialCrawler(req.headers['user-agent'])) {
  // Facebook, Twitter, LinkedIn, etc.
  // → Don't render React, just fetch OG data from DB
  // → Return pre-built OG tags immediately
}
```

Social crawler detection (line 51):
```javascript
function isSocialCrawler(ua = '') {
  return /linkedinbot|whatsapp|facebookexternalhit|twitterbot|slurp|telegrambot|discordbot|applebot/i.test(ua);
}
```

**Why?** Social crawlers only need OG tags, not full HTML rendering. This:
- ⚡ Reduces load time (no React rendering)
- 💾 Reduces server CPU
- 🔄 Allows cache-friendly responses

### OG Tag Generation (line 63-83)

For dynamic content (blog posts, case studies), the server fetches data:

```javascript
async function fetchOgData(pathname) {
  // For /blog/:slug
  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const { data } = await supabase
      .from('blog_posts')
      .select('title, excerpt, image_url')
      .eq('slug', blogMatch[1])
      .single();
    return { title: data.title, description: data.excerpt, image: data.image_url };
  }
  // Similar for /case-studies/:slug, /portfolio/:slug
}
```

Then builds the OG tags:
```javascript
function buildOgTags({ title, description, image, url, type }) {
  return `
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="${type}">
  `;
}
```

---

## 3. Helmet Configuration (React)

### How Helmet Works in Your Code

**SEO Component** (`src/components/layout/SEO.tsx`):

```tsx
const SEO = ({ title, description, image, article, noIndex, jsonLd, breadcrumbs }) => {
  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      {/* Title tag */}
      <title>{seoTitle}</title>

      {/* Meta tags */}
      <meta name="description" content={seoDescription} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(baseJsonLd)}
      </script>

      {/* Additional schemas */}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      {breadcrumbs && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
    </Helmet>
  );
};
```

**Key Points:**
- `<Helmet htmlAttributes={{ lang: "en" }}>` adds `lang="en"` to `<html>`
- All meta tags are collected by Helmet during rendering
- During SSR, these tags are extracted and injected into the template
- During CSR (client-side), Helmet updates the DOM dynamically

---

## 4. SSR Entry Point (`entry-server.tsx`)

This is where React components are rendered on the server:

```typescript
export async function render(url: string): Promise<{ html: string; helmet: any }> {
  const helmetContext: Record<string, any> = {};
  const queryClient = new QueryClient();

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            {/* ...all routes... */}
          </Routes>
        </StaticRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );

  return { html, helmet: helmetContext.helmet };
}
```

**StaticRouter** vs **BrowserRouter:**
- `BrowserRouter` (CSR) - Uses browser history API, can't work on server
- `StaticRouter` (SSR) - Receives URL as prop, renders once

**HelmetProvider Context:**
- `helmetContext` object is passed to HelmetProvider
- Helmet populates it with all meta tags during render
- Server extracts `helmetContext.helmet` after rendering

---

## 5. Template Injection (`dist/index.html`)

Your build process creates an HTML template with placeholders:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Qala Labs</title>
  <!--app-head-->  <!-- Helmet-injected meta tags go here -->
</head>
<body>
  <div id="root">
    <!--app-html-->  <!-- React HTML goes here -->
  </div>
  <script src="/main.js"></script>
</body>
</html>
```

**On server render** (`server.js` line 246):
```javascript
page = page.replace('<!--app-head-->', headInjection);
page = page.replace('<!--app-html-->', html);
```

Result:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Blog Post | Qala Labs</title>
  <meta name="description" content="...">
  <meta property="og:title" content="Blog Post">
  <script type="application/ld+json">{"@type":"Article",...}</script>
</head>
<body>
  <div id="root">
    <!-- Actual React HTML from server render -->
  </div>
</body>
</html>
```

---

## 6. Structured Data (JSON-LD) Injection

### Organization Schema (Always Included)
`src/lib/seo.ts` line 51-129:

```typescript
export const getBaseJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://qalalabs.com/#organization",
      "name": "Qala Labs",
      "url": "https://qalalabs.com",
      "logo": { "@type": "ImageObject", "url": "https://qalalabs.com/favicon.png" },
      "sameAs": [
        "https://twitter.com/qalalabs",
        "https://www.linkedin.com/company/qalalabs/"
      ]
    },
    {
      "@type": "ProfessionalService",
      "name": "Qala Labs",
      "serviceType": ["Performance Marketing", "AI Automation", ...],
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United States" }
      ]
    }
  ]
});
```

This is **always** included on every page, then optionally combined with page-specific schemas:

```tsx
// Blog page example:
<SEO
  jsonLd={generateBlogSchema({
    slug: 'my-post',
    title: 'My Blog Post',
    excerpt: 'Summary...',
    image_url: '/image.jpg'
  })}
/>
```

Results in **two** `<script type="application/ld+json">` blocks in the HTML:
1. Base organization schema
2. Page-specific article schema

Google and other crawlers can parse both.

---

## 7. Handling Protected Routes

**Admin, employee, client portals** are served as plain SPA (no SSR):

```javascript
// server.js line 202
if (req.path.startsWith('/admin') || req.path.startsWith('/login')) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  return res.status(200).send(template);  // SPA shell, no SSR
}
```

Also blocked in `robots.txt`:
```
Disallow: /admin
Disallow: /admin/
Disallow: /login
Disallow: /dashboard
```

---

## 8. Fallback/Error Handling

If SSR fails for any reason:

```javascript
// server.js line 223-227
const render = await getSSRRenderer();
if (!render) {
  // SSR bundle not available (not built yet)
  return res.status(200).send(template);  // Fallback to SPA
}
```

And in the render function (entry-server.tsx line 112-115):
```typescript
try {
  const html = renderToString(...);
  return { html, helmet: helmetContext.helmet };
} catch (err) {
  console.error('[SSR] Render error:', err);
  // Return empty html — Express will fall back to SPA
}
```

This ensures:
- ✅ Website never crashes
- ✅ Client-side React handles fallback
- ✅ Some content is always served

---

## 9. Performance Optimizations

### Lazy Component Loading
`src/App.tsx` line 21-42:

```tsx
// Direct import (fast load for critical pages)
import Index from "./pages/Index";

// Lazy imports (loaded only when needed)
const Services = React.lazy(() => import("./pages/Services"));
const Blog = React.lazy(() => import("./pages/Blog"));
```

Homepage is directly imported because it's the most visited page.

### Query Client Configuration
`src/entry-server.tsx` line 52-54:

```typescript
const queryClient = new QueryClient({
  defaultOptions: { 
    queries: { 
      retry: false,           // Don't retry on server
      staleTime: Infinity     // Cache forever on server
    } 
  },
});
```

This prevents slow database queries during SSR.

### Social Crawler Optimization
Social bots don't need full React rendering, they get pre-built OG tags in < 100ms.

---

## 10. Testing Your SSR

### Verify Meta Tags Are Rendered

**View page source** (Ctrl+U in browser):
```bash
# Should contain:
<title>Page Title | Qala Labs</title>
<meta name="description" content="...">
<meta property="og:title" content="...">
<script type="application/ld+json">...</script>
```

### Test with curl
```bash
curl -H "User-Agent: Googlebot" https://qalalabs.com/blog/my-post
# Should return full HTML with meta tags
```

### Test with social crawler user agent
```bash
curl -H "User-Agent: facebookexternalhit" https://qalalabs.com/blog/my-post
# Should return fast HTML with OG tags only
```

### Inspect in DevTools
1. Open DevTools (F12)
2. Go to Sources tab
3. Right-click → Open in browser
4. View page source (Ctrl+U)
5. Check `<head>` section has all meta tags

---

## 11. Adding New Routes

When adding a new public page:

### 1. Create the page component:
```tsx
// src/pages/NewPage.tsx
import SEO from '@/components/layout/SEO';

const NewPage = () => (
  <div>
    <SEO
      title="Your Page Title"
      description="Your description..."
      image="/og-image.jpg"
      jsonLd={generateBreadcrumbSchema([...])}
    />
    <Navbar />
    <main>
      {/* Content */}
    </main>
    <Footer />
  </div>
);

export default NewPage;
```

### 2. Add to both routers:
**`src/App.tsx`** (client-side):
```tsx
const NewPage = React.lazy(() => import("./pages/NewPage"));

// In AppRoutes:
<Route path="/new-page" element={<NewPage />} />
```

**`src/entry-server.tsx`** (server-side):
```tsx
import NewPage from './pages/NewPage';

// In Routes:
<Route path="/new-page" element={<NewPage />} />
```

### 3. Update sitemap:
```xml
<url>
  <loc>https://qalalabs.com/new-page</loc>
  <lastmod>2026-05-02</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### 4. Build and test:
```bash
npm run build
npm start
curl -H "User-Agent: Googlebot" http://localhost:3000/new-page
```

---

## 12. Debugging SSR Issues

### Problem: Meta tags not appearing

**Check 1:** Is Helmet wrapping the page?
```tsx
<SEO title="..." description="..." />
```

**Check 2:** Is the route in `entry-server.tsx`?
```tsx
<Route path="/your-page" element={<YourPage />} />
```

**Check 3:** View server logs:
```
[SSR] Render error for /your-page: ...
```

**Check 4:** Test locally:
```bash
npm run build
npm start
# Then check page source
```

### Problem: JSON-LD not validating

Use [Google Rich Results Test](https://search.google.com/test/rich-results):
1. Paste your URL
2. Check "Did you validate your JSON-LD?"
3. Fix syntax errors

### Problem: Slow SSR rendering

1. Check database queries (are they slow?)
2. Check lazy component loading (use React.lazy for big components)
3. Monitor: `console.time()` / `console.timeEnd()` in render function

---

## 13. Build & Deployment

### Build Process
```bash
npm run build
```

This creates:
- `dist/` - Client bundle (JS, CSS, images)
- `dist/index.html` - Template with <!--app-head--> and <!--app-html-->
- `dist/server/entry-server.js` - SSR bundle

### Deployment
```bash
npm run build
npm start
# Server listens on $PORT (default 3000)
```

The server automatically:
1. Reads `dist/index.html` template
2. Loads `dist/server/entry-server.js` renderer
3. Serves SSR on every GET request
4. Falls back to SPA if SSR fails

---

## 14. Environment Variables

In `.env`:
```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SITE_URL=https://qalalabs.com
```

These are used by:
- Server.js for OG data fetching
- Entry-server.tsx for schema generation
- SEO.tsx for canonical URL generation

---

## Resources

- [React Helmet Async](https://github.com/staylor/react-helmet-async)
- [React Router Server](https://reactrouter.com/docs/en/v6/guides/data-patterns/ssr)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)

---

**Last Updated:** May 2, 2026  
**Maintainer:** Your Team
