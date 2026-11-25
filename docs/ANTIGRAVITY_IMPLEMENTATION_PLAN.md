# Antigravity Implementation Plan: qalalabs.com

Target: the Qala Labs website (`Website/New folder`, branch `main`, Vite + React 18 + react-router 6 + react-helmet-async + Supabase, hosted on Hostinger static + PHP).
Source of truth for the "why": `docs/SYSTEM_ARCHITECTURE.md`, `docs/SEO_IMPLEMENTATION_PLAN.md`, `docs/UIUX_PAGE_BY_PAGE_IMPROVEMENTS.md`.
Decisions confirmed by the owner: **light theme only**; **GitHub Actions can deploy to Hostinger**.

## 0. Rules for the agent (read first)

1. Work on a feature branch per task (`seo/t1-...`). Never push to `main` directly. Open one PR per task.
2. Never commit secrets. Never read, print or copy values from `server.js` SMTP fallbacks, `.env*`, `admin/config.env`, or `public/api/lead-mail.config.php`. Run a secret scan before every commit.
3. Do not touch the parent `Website/` repo (branch `master`: admin panel, CRM). Only `Website/New folder`.
4. After every task run: `npm run lint`, `npm run build`, then the task's acceptance checks. Report failures, do not hide them.
5. Do not mark a task done on build success alone; verify the behavior stated under "Accept".
6. `Website/AGENTS.md` still applies, except the dark-theme rules in its section 4 (superseded by light-only, see T8). Keep: no `setSubmitted(true)` in `finally`, dual lead endpoint with inline fallback, `bottom-24 sm:bottom-6` floating button, 500KB asset cap, heavy libs in manual chunks, `RouteTracker` + `ScrollToTop`, no filler copy.
7. Do not invent client results or numbers. Copy metrics only from existing pages or CMS rows; leave `TODO(owner)` where proof is missing.
8. Anything marked HUMAN needs the owner; stop and ask.

## 1. Human prerequisites (agent cannot do these)

| # | Task | Why |
|---|---|---|
| H1 | Rotate the Hostinger mailbox password; confirm in chat. Project notes say a fallback password was committed in public git history and the repo is public. | Nothing else ships safely until this is done. |
| H2 | Create Hostinger FTP/SFTP (or SSH) credentials and add GitHub repo secrets: `HOSTINGER_HOST`, `HOSTINGER_USER`, `HOSTINGER_PASSWORD` (or key), `HOSTINGER_DIR`. Also `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. | T11 deploy. Mechanism is the owner's choice; default below is FTP/SFTP deploy. |
| H3 | Verify qalalabs.com in Google Search Console and Bing Webmaster Tools. | Index and baseline data. |
| H4 | Provide GA4 ID, Meta Pixel ID, Clarity ID. | T9 analytics. |
| H5 | Provide the light palette (background, surface, text, brand, accent tokens), or approve the agent proposing one. | T8. |
| H6 | Say which cities have a real staffed office; approve publishable case-study numbers. | T13 city pages and proof. |

## 2. Tasks (in order)

### T0. Baseline snapshot (read-only)
- Run `git status`, `git log -5`, `npm ci`, `npm run build`. Save `dist` file list and the hashed entry filename.
- Fetch the live `https://qalalabs.com/` and compare its asset hash to the build. Record whether live is stale (earlier evidence: live shows a theme toggle and no JSON-LD, source forces dark and emits JSON-LD).
- **Accept:** a short `docs/baseline.md` with build result, live-vs-source diff, and the 8 template URLs to test.

### T1. Server rules (`public/.htaccess`)
Goal: real 404s, no 403 on hubs, correct file types.
- Move route-colliding image folders: `public/case-studies/*` and `public/portfolio/*` to `public/img/case-studies/` and `public/img/portfolio/`; update every reference (`grep -rn "/case-studies/\|/portfolio/" src public`) and CMS image URLs noted in a TODO list for the owner.
- Remove the blanket SPA fallback (rule 6). Serve prerendered files; unknown paths get `ErrorDocument 404 /404.html`.
- Keep HTTPS + non-www redirect; keep the `api/lead` to `api/lead.php` rewrite and deny rules and headers.
- Ensure `llms.txt` is `text/plain; charset=utf-8` and `sitemap.xml` is `application/xml` (`AddType` or `ForceType`).
- **Accept (on staging):** `/case-studies/` and `/portfolio/` return 200; an unknown path returns status 404; `curl -sI /llms.txt` shows text/plain; `www` redirects 301 to bare domain.
- **Risk:** a bad rule takes the site down. Test only on a staging subdomain first. Keep the previous file as `.htaccess.bak` outside the deploy.

### T2. Route manifest (single source of truth)
- Add `src/seo/routes.ts` exporting `staticRoutes` (path, template, title, description, priority, lastmod) matching `App.tsx` routes that should be public. Exclude `/admin*`, `/dashboard`, `/employee*`, `/client*`, `/login`, `/onboarding`, `/thank-you`, `/schedule`, `/demo/*`, `/p/:slug`.
- Add `scripts/build-manifest.ts`: reads `staticRoutes` plus published rows from Supabase (`services`, `blog_posts`, `case_studies`, `portfolio_projects`, `pages`) using the anon key, writes `dist/routes.json`. If Supabase is unreachable, fail the build (do not silently emit a partial site).
- **Accept:** `routes.json` contains every URL in the current sitemap that renders a real page, no duplicates, no admin routes.

### T3. One SEO source
- Refactor `src/components/layout/SEO.tsx` and `src/lib/seo.ts`: title, description, canonical (self, from route manifest, no trailing slash), OG/Twitter (absolute image URL), `robots` noindex flag, JSON-LD builders in `src/seo/schema.ts` (Organization with `sameAs`, WebSite, BreadcrumbList, Service, Article, FAQPage; LocalBusiness only if H6 confirms a real office).
- Remove hard-coded `<title>`, description, canonical and OG tags from `index.html` (leave charset, viewport, fonts, favicon). Also remove the duplicated page query in `Index.tsx` (`fetchPageSEO` + `.single()`).
- Fix canonical conflicts: pick `/about` (not `/who-we-are`) and `/contact` (not `/contact-us`); add 301s in `.htaccess` for the retired URLs.
- Use one OG image, 1200x630 JPG/PNG at `/og.jpg` (existing `og.jpg` is a placeholder: create a real one or leave `TODO(owner)`).
- **Accept:** in a unit/integration test, every manifest URL yields a unique title, a self-referencing canonical and valid JSON-LD.

### T4. Prerender at build time
- Add `scripts/prerender.ts`: for each manifest route call `render(url)` from `dist/server` (`entry-server.tsx` already exports `render(url): Promise<{html, helmet}>`), inject `helmet.title/meta/link/script` into the head and `html` into `<div id="root">` of `dist/index.html`, write `dist/<route>/index.html`. Also write `dist/404.html` (noindex).
- Serialize fetched CMS data into `window.__DATA__` and seed React Query on the client so hydration does not refetch or flash.
- Hydration hazards: guard `window`/`canvas`/Three.js code with lazy import in `useEffect`; make the homepage rotating H1 render one fixed value on server and first client render (static H1, rotating subtitle only).
- Replace the hand-listed page imports in `entry-server.tsx` (92 imports) with a route map driven by the manifest where practical (optional refactor; do not block T4 on it).
- Update `package.json`: `"build": "vite build && vite build --ssr src/entry-server.tsx --outDir dist/server && tsx scripts/build-manifest.ts && tsx scripts/prerender.ts && tsx scripts/generate-seo-files.ts"`.
- **Accept:** `curl -s <staging>/services/ai-automation` shows a unique `<title>`, one `<h1>`, body text and JSON-LD without JavaScript; no React hydration warnings in the console on 8 template pages.

### T5. Generated SEO files
- `scripts/generate-seo-files.ts` writes `dist/sitemap.xml` (only manifest URLs, real `lastmod`, no redirects), `dist/robots.txt` (Allow `/`, Disallow internal paths, Sitemap line), `dist/llms.txt` (links only to URLs in the manifest), and `dist/rss.xml` for the blog.
- Delete the hand-written `public/sitemap.xml` and `public/llms.txt` after generation works. Rewrite `llms.txt` content to name real services (AI automation, AI agents, MCP, AI search visibility, performance marketing) and only link live pages.
- **Accept:** every sitemap URL returns 200 with a self canonical; `llms.txt` has no dead links.

### T6. Quality gates script (`scripts/verify.ts`)
Run against `dist` (static checks) and optionally a staging URL. Fail the build when:
- a manifest page lacks exactly one H1, a unique title, a unique description, or a self canonical;
- a sitemap URL is missing from the manifest or vice versa;
- JSON-LD fails to parse;
- an internal link or image 404s; an `<img>` has no `alt`, `width` or `height`;
- any image file exceeds 500KB;
- a secret pattern appears in the diff or `dist` (add a simple regex scan; also recommend gitleaks in CI).
Add `npm run verify`.
- **Accept:** `npm run verify` passes on a good build and fails when you deliberately break a canonical.

### T7. Shared UI components (light-only)
- `src/components/media/Image.tsx`: requires `width`/`height`, `loading="lazy"` and `decoding="async"` by default, `priority` prop for the single hero (eager + `fetchpriority="high"`), WebP/AVIF via `vite-imagetools` with `srcset`. Replace raw `<img>` across pages incrementally (start with the homepage, `/work`, `/services`).
- `src/components/forms/LeadForm.tsx`: visible `<label>`s, `autocomplete`, inline validation on blur, error summary with `aria-live`, success only when `response.ok`, inline fallback (mailto and WhatsApp), tries `/api/lead` then `/api/lead.php` on 404. Migrate the 5 form pages (`/`, `/blog`, `/creator-collective`, `/agency-collective`, `/contact`).
- `src/components/floating/FloatingActions.tsx`: one manager for the sticky CTA and chat button; mobile uses `bottom-24 sm:bottom-6`; shorter label (no truncation); only one floating element visible at a time at 375px.
- `src/components/layout/SkipLink.tsx` plus `:focus-visible` rings; `<main id="main">` target.
- `src/components/motion/MotionProvider.tsx`: global `prefers-reduced-motion` switch; one duration/easing token set (150-300ms); pause the Three.js canvas when off-screen or the tab is hidden.
- Heading rules: one H1 per page, no skipped levels; add H1 to `/about`, `/services`, `/contact`. Add an ESLint rule or a test for it.
- Tap targets at least 44px (padding), body text 16px, label text at least 12px.
- **Accept:** on 375px, no horizontal scroll, no overlapping floating buttons, form labels present, keyboard Tab reaches the skip link first.

### T8. Light-only theme
- `src/main.tsx`: remove `ThemeProvider`'s `forcedTheme="dark"`/`defaultTheme="dark"`; no toggle; remove the theme toggle from the navbar. Set `color-scheme: light`.
- Define semantic light tokens in `globals.css`/`tailwind.config.ts` (from H5; if absent propose a palette and ask). Replace hardcoded `#06070D`, `bg-[#06070D]*` and `text-white`-on-dark patterns; retire `.qala-bg-ambient`/`.qala-grid-pattern` dark mesh or recolor for light.
- Update `Website/AGENTS.md` section 4 for the light palette (this edit is a human-reviewed change).
- **Accept:** axe/Lighthouse contrast passes (4.5:1 body, 3:1 large) on the 8 template pages; no leftover dark classes (`grep -rn "06070D\|bg-black\|dark:" src`).

### T9. Analytics layer
- One `src/lib/tags.ts` loads GA4, Meta Pixel and Clarity (IDs from `VITE_*` env), async, after first paint, with a consent gate (needs privacy-policy update; flag to owner). Wire `RouteTracker` (virtual page views) per `AGENTS.md`. Track form submits only on confirmed success.
- **Accept:** a page view fires per route change in the network tab; no tags load before consent if consent is configured.

### T10. Supabase hardening (needed before build-time reads)
- Write migrations (do not apply to prod without owner approval): select policies for published rows on `blog_posts`, `media_library`, `portfolio_projects`, `site_settings`; insert `site_settings` row `global_config`; lock down `SECURITY DEFINER` functions (`handle_new_user`, `rls_auto_enable`) and set `search_path`; add the 7 FK indexes; wrap `auth.uid()` as `(select auth.uid())`; remove duplicate permissive policies on `pages`/`page_blocks`.
- Run `get_advisors` (security and performance) before and after; list legacy tables (`users` with `password_hash`, `comments`, `likes`, `tags`) for owner decision, do not drop them.
- Remove `/demo/*` routes from the production build (Vite define or env flag).
- **Accept:** anon key reads published rows only; anon cannot read `leads`; advisor "security" findings reduced; build-time fetch succeeds.

### T11. CI/CD deploy (`.github/workflows/ci.yml`)
- Pipeline: checkout, node, `npm ci`, secret scan, `npm run build` (with `VITE_*` and Supabase secrets), `npm run verify`, Lighthouse CI on the 8 templates (budgets: LCP <= 2.5s, CLS <= 0.1, no asset > 500KB), upload `dist` as an artifact.
- Deploy job (only on `main`, after gates): default is FTP/SFTP deploy (`SamKirkland/FTP-Deploy-Action`) of `dist/` to `${{ secrets.HOSTINGER_DIR }}` after first deploying to a staging subdomain and smoke-testing it. If the owner prefers SSH/rsync or Git deploy, swap the step; confirm first.
- Exclude `api/lead-mail.config.php` and other server-side config from `--delete`/sync so credentials are never overwritten or removed.
- Add a repository dispatch or Supabase webhook trigger so publishing CMS content triggers a rebuild; plus a nightly scheduled run.
- Post-deploy: crawl the manifest on production (reuse `verify.ts` URL mode) and fail loudly on any non-200 or canonical mismatch.
- **Accept:** a PR runs the gates; merging to `main` deploys to staging, passes the smoke test, then production; a deliberate bad canonical blocks the deploy.

### T12. Lead endpoint consolidation
- Treat `public/api/lead.php` as the production endpoint: add honeypot, simple per-IP rate limit, server-side validation, JSON `{success}` with proper HTTP status, CORS restricted to the site origin.
- Keep the browser's direct, RLS-guarded insert into `leads`. Stop deploying `server.js` for production. Remove any hardcoded SMTP fallback from `server.js` (and tell the owner that git history still contains the old value, so H1 rotation is mandatory; history rewrite is an owner decision).
- **Accept:** a test submit returns 2xx and the team email arrives (owner confirms); a forced failure shows the inline fallback and never a success toast.

### T13. Content templates and new pages
- Templates in `src/templates/`: Hub, Service, Agent, Product, CaseStudy, Article, City, Legal. Pages become thin wrappers fed by CMS rows (fields: slug, template, seo_title, seo_description, og_image, noindex, faq JSON, related slugs, metrics JSON with source and period).
- Create or rewrite (copy drafted from existing proof only; mark gaps `TODO(owner)`):
  - `/services/ai-automation` (add India, process, stack, FAQ, pricing range placeholder),
  - `/services/mcp-server-development`, `/services/ai-agent-development`, `/services/ai-marketing`, `/services/n8n-automation`, `/services/whatsapp-ai-chatbot`,
  - city pages `/marketing-agency-delhi`, `/marketing-agency-gurgaon`, `/marketing-agency-noida`, `/ai-automation-agency-gurugram` (only with real local content from H6; no templated doorway text),
  - blog: `/blog/what-is-mcp-server-guide`, `/blog/ai-agents-for-business`.
- Merge overlapping service pages with 301s: web design + web development + landing pages + UI/UX; mobile designing + mobile development. Align `/services/digital-marketing` slug and H1. Pick one proof hub (`/case-studies`), redirect `/work` and `/portfolio`.
- Case studies: metrics above the fold, client name or "anonymized" label, quote, stack, related links; target 600+ words where proof exists.
- **Accept:** each new page has one H1 with its target keyword, unique title/description, FAQ schema if it has an FAQ, and is in the manifest and sitemap; one keyword owner per page (see the cannibalization table in `SEO_IMPLEMENTATION_PLAN.md`).

### T14. Media upgrades
- MarksOps demo: a 20-30s muted looped WebM/MP4 with poster, played on view (needs owner-supplied footage or screenshots; do not fabricate UI). Workflow SVG per agent page. Real campaign creatives on case studies (owner assets).
- **Accept:** videos have poster, no autoplay audio, respect reduced motion.

## 3. Definition of done (whole project)
- All sitemap URLs: 200, self canonical, unique title and description, one H1, JSON-LD valid, in raw HTML without JavaScript.
- `/case-studies/` and `/portfolio/` (or their replacements) return 200; unknown URLs return 404.
- Light-only theme, no toggle; contrast and axe pass on the 8 templates.
- Lighthouse mobile on templates: LCP <= 2.5s, CLS <= 0.1 (lab); field data checked in Search Console after launch.
- CI deploys automatically and blocks on failed gates; no secrets in repo or `dist`.
- Search Console shows the new sitemap submitted and pages indexed over the following weeks (indexing time is outside our control).

## 4. Suggested Antigravity setup
- One agent per task, tasks T1-T6 sequential (each depends on the last), T7/T8/T9 can run in parallel branches after T3, T10 before T4 goes live, T11 after T6.
- Give each agent this file plus the three docs listed at the top, and require a PR with: what changed, acceptance evidence (command output), and anything it could not verify.
- Review T1, T4, T10 and T11 yourself before merging; they are the ones that can take the site down or expose data.
