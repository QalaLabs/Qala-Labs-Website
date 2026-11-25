# Qala Labs: SEO Implementation Plan

Prepared 2026-11-19. Site: https://qalalabs.com. Code: `E:\Qala Labs\Website\New folder` (Vite + React + react-helmet-async, deployed as static files on Hostinger via `.htaccess`).

**Goal:** get qalalabs.com indexed correctly, then rank for AI agency / AI automation / MCP / AI agents / marketing agency in Delhi, Gurgaon and Noida.

**Evidence base:** a render check of all 56 sitemap URLs in a browser, curl checks of headers, robots, sitemap and llms.txt, plus about 10 SERP searches. There is no Search Console, backlink or Core Web Vitals data yet; Phase 0 collects it.

---

## 0. Findings this plan fixes (verified)

| # | Finding | Evidence |
|---|---|---|
| F1 | `/case-studies/` and `/portfolio/` return **403**. These are sitemap hubs at priority 0.9. | curl: `/case-studies` returns 301, then `/case-studies/` returns 403. Likely cause (to confirm): `public/case-studies/` and `public/portfolio/` exist as real folders of images with no index, and the `.htaccess` fallback rule `!-d` skips real directories. |
| F2 | 49 of 56 pages render the **homepage title and `canonical=/`**. Only `/`, `/who-we-are`, `/work` and `/contact-us` have their own. | Browser render of every sitemap URL. |
| F3 | **0 of 56** pages have JSON-LD. | Same render check. |
| F4 | The raw HTML for every route is an empty shell: same title, no H1, no body text. | curl on all 56 URLs. |
| F5 | Source and live site disagree. `ServiceDetail.tsx` passes its own title and JSON-LD to `<SEO>`, but the live page shows the homepage title and no JSON-LD. | Source read vs render. The live build is probably stale or Helmet isn't firing; confirm in Task 1.2. |
| F6 | Unknown URLs return 200 (the `.htaccess` fallback serves `index.html`), so they are soft-404s. | curl. |
| F7 | `/who-we-are` canonicals to `/about`; `/contact-us` canonicals to `/contact`. Both are listed in the sitemap under their own URL. | Render check. |
| F8 | `/llms.txt` is served as `text/html` (the SPA fallback), and its content links to pages that aren't in the sitemap. | curl headers. |
| F9 | No H1 on `/who-we-are`, `/services`, `/contact-us`. Case studies are about 260-320 words. | Render check. |
| F10 | `www.qalalabs.com/services` returned 200 with no redirect, although `.htaccess` has a www rule. | curl; may be a CDN-edge behavior. |
| F11 | No pages exist for MCP, AI agent development, AI marketing, n8n, WhatsApp AI, or any city. | Sitemap and route review. |

---

## Phase 0: Baseline and safety (Day 0-1)

| Task | Steps | Done when |
|---|---|---|
| 0.1 Check repo state | Run `git status` and `git log -3` in both `Website/` (master) and `Website/New folder/` (main). Work only in `New folder/`. | You know which branch is deployed and what's uncommitted. |
| 0.2 Security gate | Memory notes an unresolved leak: a hardcoded SMTP fallback in `server.js` in a public repo. Confirm the Hostinger SMTP password is rotated before pushing anything else. Confirm `.gitignore` excludes `admin/config.env`. | Rotation confirmed; no secrets in the diff. |
| 0.3 Search Console and Bing | Verify `qalalabs.com` as a domain property in Google Search Console and Bing Webmaster Tools. Submit the current sitemap. Run URL Inspection on `/`, `/services/ai-automation`, `/case-studies/` and `/who-we-are` (Live Test, then View Rendered HTML). | Real indexed or excluded status per URL, and a rendered-HTML screenshot for F2. |
| 0.4 Analytics | Install GA4 (or confirm it) and Microsoft Clarity. Both are in the current stack, and the site currently has no tracking tags. | Page views are visible in GA4 within a day. |
| 0.5 Performance baseline | Run PageSpeed Insights on `/`, `/services`, `/services/ai-automation`, mobile and desktop. Record LCP, INP and CLS. The homepage ships a Three.js bundle, so watch LCP and INP. | A baseline table is saved. |
| 0.6 Rank baseline | Record the current position and impressions for the target keyword list (Phase 3) from Search Console. | Baseline sheet exists. |

---

## Phase 1: Critical indexation fixes (Week 1)

### 1.1 Fix the 403 on case-studies and portfolio (F1)
- **Do (preferred):** move the image folders so they no longer collide with the SPA routes: `public/case-studies/` to `public/img/case-studies/` and `public/portfolio/` to `public/img/portfolio/`. Update every reference (grep for `/case-studies/` and `/portfolio/` in `src/` and the CMS image URLs in Supabase).
- **Alternative:** keep the folders and add to `.htaccess` before rule 6: `RewriteRule ^(case-studies|portfolio)/?$ index.html [L]`.
- **Risk:** broken image URLs, so run a link check for 404 images afterward.
- **Verify:** `curl -sI https://qalalabs.com/case-studies/` and `/portfolio/` return 200; both render in a browser.

### 1.2 Resolve the stale-build / Helmet issue (F2, F5)
- Compare what's deployed against a fresh `npm run build`. Deployed `index.html` has Last-Modified Sep 24; compare its asset hash (`index-CPX3BG3o.js`) with a fresh build's.
- If the deploy is stale, redeploy `dist/`.
- If a fresh build still shows the homepage title on service pages, debug in this order: (1) `HelmetProvider` wraps the router, (2) `index.html` hard-codes `<title>`, `<meta>` and `<link rel=canonical>` outside Helmet (it does today, so Helmet tags can end up duplicated or ignored), (3) the SSR renderer in `entry-server.tsx`.
- **Fix:** remove the hard-coded title, description, canonical and OG tags from `index.html`. Let `<SEO>` own them, and keep a generic fallback inside `entry-server`.
- **Verify:** render check on all 56 URLs shows unique title and self-canonical on every page.

### 1.3 Prerender the public routes (F4, F6): the biggest change
Hostinger here is static hosting plus PHP. The repo already has `entry-server.tsx`, so use it at build time.
- **Recommended (static prerender):**
  1. Add `scripts/prerender.ts`. It builds a route list from `sitemap.xml` generation (Task 1.4): static routes plus CMS slugs fetched from Supabase (`pages`, `blog_posts`, `case_studies`, `services`, `portfolio_projects`).
  2. For each route, call `render(url)` from the SSR bundle and write `dist/<route>/index.html`, with Helmet tags injected.
  3. Add `"build": "vite build && vite build --ssr ... && tsx scripts/prerender.ts"`.
  4. Upload `dist/`.
- **Alternative:** move to a Node-capable host and run `server.js` SSR. This is more work and has security implications; do it only if you want it for other reasons.
- **Risks:** Supabase must be reachable and have RLS select policies for anon reads at build time (the memory notes `site_settings` had a 406). Pages that depend on `window` or Three.js need guards.
- **Verify:** `curl -s https://qalalabs.com/services/ai-automation | grep -c "<h1"` returns at least 1, and the raw title is unique per page.

### 1.4 Generate the sitemap and align canonicals (F7)
- Generate `sitemap.xml` from the same route list as prerender, with real `lastmod` values. Include only 200, indexable, self-canonical URLs.
- Choose one URL per page: redirect `/who-we-are` to `/about` (or the reverse) and `/contact-us` to `/contact` (or the reverse). Whichever you pick must match the sitemap and the canonical.
- Remove the trailing-slash 301s: pick no-slash and keep it everywhere.
- **Verify:** crawl every sitemap URL and assert status 200, canonical equals the URL, and one H1.

### 1.5 Real 404s (F6)
- Prerender a `/404.html` and add `ErrorDocument 404 /404.html` to `.htaccess`.
- Change rule 6 so it falls back to `index.html` only for known route prefixes, or rely on prerendered files plus `-f` / `-d` checks.
- Add `<meta name="robots" content="noindex">` on the NotFound page.
- **Verify:** an unknown URL returns 404.

### 1.6 `llms.txt`, robots and www (F8, F10)
- Make sure `public/llms.txt` actually deploys and is served as `text/plain`. If it is missing from the host, that explains the HTML response.
- Rewrite its links to real, live URLs (replace `/services/performance`, `/services/creative`, `/services/web-dev`, `/services/cro` and `/services/data` with the service slugs that exist, or create those pages).
- `robots.txt`: keep `Allow: /`, add `Disallow:` for `/admin`, `/dashboard`, `/employee`, `/client`, `/onboarding`, `/login`, `/thank-you`, `/demo/`, `/schedule`, plus `noindex` meta on those pages, because robots alone doesn't deindex.
- Retest www: if it still returns 200, add the redirect at the CDN or hPanel level.

---

## Phase 2: On-page and schema (Week 2)

| Task | Detail |
|---|---|
| 2.1 Homepage meta | Title: `AI Agency in India: AI Automation, Agents & Marketing \| Qala Labs` (under 60 characters). Description: about 150 characters naming AI automation, AI agents, MCP and performance marketing, and Delhi NCR if the business wants local targeting. |
| 2.2 One H1 per page | Add H1 to `/who-we-are`, `/services`, `/contact-us`. The H1 contains the primary keyword. |
| 2.3 Title and meta template | Service: `{Service} Agency in India \| Qala Labs`. Case study: `{Client}: {result} \| Qala Labs`. Blog: `{Post title} \| Qala Labs`. Every description unique. |
| 2.4 Schema (JSON-LD) | Site-wide Organization with `sameAs` (LinkedIn, GitHub, X, Clutch, DesignRush, Crunchbase), WebSite, BreadcrumbList. Per page: Service on service pages, Article/BlogPosting on posts, FAQPage where an FAQ exists. `LocalBusiness` only for a real staffed office address. Validate in Rich Results Test. |
| 2.5 Open Graph | Use absolute image URLs (currently `/assets/og/og-default.jpg` relative). Use one 1200x630 image; `og.png` and `og-default.jpg` are inconsistent, so keep one. |
| 2.6 Image alt and sizes | Alt text on all images (the browser check found 0 missing on the one page I counted; recheck all). Add width and height to prevent CLS. |
| 2.7 Internal linking | Add a service-to-case-study link on every service page, a "Related services" block, breadcrumbs, and links from the blog to services. |
| 2.8 Thicken thin pages | Case studies: add problem / approach / results with numbers, targeting 600+ words. Agent and product pages: add use case, integrations, FAQ. |

---

## Phase 3: New pages for the target keywords (Weeks 2-5)

One page per intent, one owner per keyword, to avoid cannibalization. Difficulty ratings are the research agent's judgment from SERPs, not measured. Search volumes are unknown.

| Priority | Target keyword | URL | Notes |
|---|---|---|---|
| 1 | ai agency india | Homepage plus `/ai-agency-india` hub | Homepage owns "ai agency". |
| 2 | ai automation agency india | `/services/ai-automation` (exists; rebuild) | Add India qualifier, process, stack, pricing ranges, FAQ. |
| 3 | mcp server development | `/services/mcp-server-development` | New. Cleanest differentiator: publish open-source MCP servers on GitHub and link them. |
| 4 | ai agent development company india | `/services/ai-agent-development` | New; link to the existing `/agents/*` pages. |
| 5 | ai marketing agency india | `/services/ai-marketing` | New; links to performance marketing and GEO. |
| 6-8 | marketing agency in gurgaon / delhi / noida | `/marketing-agency-gurgaon`, `/marketing-agency-delhi`, `/marketing-agency-noida` | Each needs unique content: local proof, real address or service-area details, local clients. No templated doorway pages. Link them from a Delhi NCR hub. |
| 9 | ai automation agency gurugram | `/ai-automation-agency-gurugram` | Lowest-competition city niche in the research. |
| 10 | n8n automation agency | `/services/n8n-automation` | New. |
| 11 | whatsapp ai chatbot agency | `/services/whatsapp-ai-chatbot` | New. |
| 12 | performance marketing agency | `/services/performance-marketing` | The existing `/services/digital-marketing` renders an H1 of "Performance Marketing"; decide whether to rename and redirect. |
| 13-14 | what is an mcp server; ai agents for business | `/blog/what-is-mcp-server-guide`, `/blog/ai-agents-for-business` | Include code, a comparison table, and cost ranges. |
| 15+ | Case studies with numbers | existing `/case-studies/*` | Reuse client results you can publicly stand behind. |

Cannibalization rules: city pages own "marketing agency in {city}". Page 5 owns "ai marketing agency". The homepage owns "ai agency". Do not reuse "marketing agency" in the titles of pages 5 and 12.

Also check the existing blog: all six posts are D2C or creative topics, so none targets the AI keywords.

---

## Phase 4: Off-site and AI-search visibility (starts Week 1, continuous)

1. **Directories:** claim and complete Clutch (reviews first), DesignRush, GoodFirms, Sortlist, Marketing Monk, Krowdbase, JustDial. Use identical name, address, phone and description everywhere.
2. **Reviews:** ask 5-10 current clients for Clutch/Google reviews.
3. **Google Business Profile:** only for a real, staffed location. Do not create fake Noida or Gurgaon addresses. Use service-area pages for the other cities.
4. **Entity disambiguation:** Qala Tech and Qualabs exist. Use the full name "Qala Labs" consistently, with Organization schema and an About page with founder bios.
5. **Content distribution:** DEV.to, Hashnode, LinkedIn articles for MCP and n8n posts; open-source repos on GitHub.
6. **AI-search checks:** monthly, run 10-15 prompts in ChatGPT, Perplexity and Google AI Overviews (for example "best AI agency in India", "MCP server development company India") and log whether Qala Labs is cited. `llms.txt` is cheap but its effect is unproven; don't count on it.

---

## Phase 5: Measurement and cadence

| Metric | Source | Target (indicative, set after Phase 0 baseline) |
|---|---|---|
| Indexed pages vs sitemap pages | Search Console, Pages report | 56 of 56 indexed (or intentionally excluded) within 6 weeks |
| Impressions and clicks for target keywords | Search Console, Performance | Upward trend monthly; no fixed number promised |
| Core Web Vitals | PageSpeed / CrUX | LCP at most 2.5s, INP at most 200ms, CLS at most 0.1 |
| Rich result eligibility | Rich Results Test | Organization, Service, Article, FAQ pass |
| Leads from organic | GA4 + the Supabase `leads` table | Track after tag install (Task 0.4) |
| AI citations | Manual monthly prompt log | Any appearance is a win; record it |

Cadence: weekly check of Search Console errors during Phases 1-2; monthly review afterward. Re-run the full 56-URL render check after every deploy that touches routing, metadata or `.htaccess`.

---

## Suggested timeline and effort

| Week | Work | Rough effort |
|---|---|---|
| 1 | Phase 0, tasks 1.1, 1.2, 1.5, 1.6; start Phase 4 listings | 2-3 days dev, 1 day setup |
| 2 | Tasks 1.3 and 1.4 (prerender and sitemap); Phase 2 | 3-5 days dev |
| 3-5 | Phase 3 pages in priority order; first MCP repo | 1-2 pages per week plus writing time |
| Ongoing | Phase 4, Phase 5 | A few hours a week |

These effort figures are estimates, not measured.

---

## Rollback and testing notes
- Deploy `.htaccess` changes carefully: a bad rule can take the whole site down. Keep a copy of the working file and test in a staging subdomain first.
- After each deploy, run the render check and curl checks above.
- Tasks 1.1, 1.4 and 1.6 are low-risk. Task 1.3 is the biggest change and should go to staging first.

## Open questions for the business
1. Is there a real staffed office in Delhi, Gurgaon or Noida? That decides Google Business Profile and LocalBusiness schema.
2. Which client results can be published publicly, with numbers?
3. Stay on Hostinger static hosting with a build-time prerender, or move to a Node host?
4. Should `/products/*` and `/agents/*` be kept as separate pages, or merged into service pages?
