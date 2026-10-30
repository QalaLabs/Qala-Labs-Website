# Qala Labs: SEO, AEO & GEO Content Strategy (Final)

**Date:** 2026-10-30
**Goal:** revenue engineering. Content is judged by qualified pipeline and closed revenue, not traffic.
**Supersedes:** the earlier draft of this file, which was written against the old `main` codebase (DTC-agency positioning, 40-page IA). That is not the site that is live.

---

## Implementation status (branch `claude/seo-aeo-geo-implementation`)

**Done in code** (verified: typecheck, 90 unit tests, production build, and rendered-page checks in a browser):
- Meta descriptions are trimmed at a word boundary (155 chars) in `SEO.tsx`. Duplicate routes (`/our-work`, `/blogs`, `/career`, `/contact`, `/about`, and similar) now canonicalise to the sitemap URL.
- Titles are shorter for service, agent, product, case study and blog pages. Blog SEO titles use the text before the colon; the H1 keeps the full headline.
- Schema:
  - FAQPage on the homepage (7 visible Q&As).
  - BreadcrumbList on service, agent, product, case study and blog pages.
  - Article on case studies.
  - Valid ISO `datePublished` and `dateModified` on blog posts.
  - Product pages switched from `Product` to `SoftwareApplication`.
  - `areaServed` (IN, GB) on services.
- The Airborne Aviation SEO, AEO and GEO case study is added, with figures recomputed from the weekly Search Console series. The old page's "+59% daily impression growth" could not be reproduced from that series, so it is omitted. It is linked from the SEO service page and added to the sitemap (73 URLs).
- `public/llms.txt` is published with current URLs, replacing the soft 404.
- Five Open Graph image paths that pointed at files that do not exist now use existing images.
- Helpers and tests live in `src/lib/seo.ts` and `src/test/unit/seo.test.ts`.

**Not done, needs a decision or infrastructure:**
- G1 prerendering, G2 deploying a build, G3 real HTTP 404s, G4 lead attribution, G5 Search Console.
- The canonical company definition wording and the Organization schema expansion (needs real profile URLs and addresses).
- Off-site profiles and the content calendar pieces.

---

## 1. What I checked, and what is true today

Three different things are called "the website". They disagree.

| | Live (qalalabs.com, checked 2026-10-30 ~00:35 IST) | Source (`digipanda-clone/`, master @ `5881df9`) | Old repo `main` (this branch's base) |
|---|---|---|---|
| Positioning | "Creative × Data × Impact • AI & Growth Studio" | Same title; hero H1 "Where Ideas Turn Into Revenues"; "AI & Creative Growth Lab • London & Delhi" | "Full-service AI growth agency", DTC-heavy |
| Build | `index-CPX3BG3o.js` (Sept 24 build, `Last-Modified: 24 Sep`) | Includes Oct 29 SEO commit `6dfef92` (JSON-LD, H1 hierarchy, 72-URL sitemap) | Superseded |
| Homepage HTML | **2,842 bytes, empty shell, no JSON-LD** | `index.html` has Organization + WebSite JSON-LD | n/a |
| Sitemap | 56 URLs | 72 URLs | 60 URLs (old routes) |
| Rendering | Client-side React SPA | Client-side React SPA (no SSR, no prerender) | Had SSR code, never deployed |

**Verified facts on the live site**
1. Every URL returns the same 2,842-byte shell with the same `<title>`. That includes a made-up path (`/zzz-not-a-page-123` returns HTTP 200). All per-page titles, descriptions, canonicals and schema are injected by JavaScript in `SEO.tsx` after load.
2. The newest build (with JSON-LD and the bigger sitemap) exists in your local `dist/` but was not live when I checked. Shipping it is step one.
3. `/llms.txt` and `/llms-full.txt` return **HTTP 200 with the HTML shell** (a soft 404). Master has no `public/llms.txt`; the one on the old branch describes the old site and old URLs.
4. `robots.txt` is correct and permissive (`Allow: /`, sitemap listed). No AI-crawler rules, which is fine for GEO.
5. `og-default.jpg` is a real image live, but live pages emit a *relative* `og:image`; the new source fixes this to absolute URLs.
6. No `FAQPage` schema exists anywhere in source, even though the homepage has a 7-question FAQ.
7. Blog `publishedAt` values are strings like "February 2026", which are not valid ISO dates for `BlogPosting.datePublished`. There is no `dateModified`.
8. Service-page titles are built as `Name • Tagline | Qala Labs`; taglines are long sentences, so titles run well past 100 characters and get truncated in results.

**Not verified (no access):** Search Console, GA4, keyword volumes (Ahrefs needs authorizing), actual indexation. Real Googlebot and AI-crawler behaviour is unconfirmed: my test requests with a spoofed Googlebot user agent got 403 and a GPTBot-labelled one got 429, which is most likely the host's anti-spoofing or rate limiting, but confirm in Search Console's URL Inspection and the host's bot settings. Every keyword below is a hypothesis until validated.

---

## 2. Gates (nothing else works until these are done)

| # | Gate | Why | Owner / effort |
|---|---|---|---|
| G1 | **Prerender every route at build time** (static HTML per URL, e.g. `vite-ssg`-style or a post-build prerender step). All ~72 routes come from data files (`services.ts`, `agents.ts`, `products.ts`, `caseStudies.ts`, `portfolioData.ts`, `blogsData.ts`), so the route list is known at build. Works on Hostinger static hosting with the existing `.htaccess`. | Googlebot can render JS but slowly and unreliably. Most AI crawlers generally do not execute JavaScript, so today they see an empty page. For a studio selling AI visibility this is the single biggest issue. | Dev, 1–3 days |
| G2 | **Deploy the Oct 29 build**, then verify with `curl` (default UA) on 5 page types: title, description, canonical, H1, JSON-LD must be in the raw HTML. | Live is a month behind. | Dev, 1 hr |
| G3 | **Real 404s.** Unknown paths must return HTTP 404 (prerendered `404.html` + `.htaccess` `ErrorDocument`) and `noindex`. | Soft 404s waste crawl budget and can index junk. | Dev, 2 hrs |
| G4 | **Lead attribution.** Every lead record (`/api/lead`, email queue, CRM) stores landing page, first-touch source/UTM and content cluster. GTM, GA4 and Meta Pixel are already installed. | Without it the revenue KPIs below cannot be reported. | Dev, 1 day |
| G5 | **Search Console + Bing Webmaster.** The Google verification meta is already in `index.html`; submit the new sitemap, inspect 10 key URLs. | Baseline and indexation proof. | You, 30 min |
| G6 | **llms.txt**: either publish a correct one in `public/` or remove the soft-404. Treat it as a cheap hedge only; no major engine has confirmed using it for ranking or citation. | Avoid serving HTML at a `.txt` URL. | Dev, 30 min |

Do not promote any content until G1 and G2 pass. Writing can proceed in parallel.

---

## 3. Entity and positioning (the GEO foundation)

AI engines cite entities they can describe consistently. Right now the description varies by surface ("AI & Growth Studio", "AI & Creative Growth Lab", "autonomous growth systems", "creative craft with data discipline").

**One canonical definition, used verbatim on the homepage, `/who-we-are`, Organization schema, LinkedIn, Clutch/GoodFirms and every bio:**

> Qala Labs is an AI and growth studio with teams in London and Delhi. We build the revenue system brands run on: performance marketing, AI agents and automation, search visibility, and custom software.

(Edit wording to taste; the point is one sentence, repeated.)

Actions:
- Put that sentence in crawlable body text near the top of `/` and `/who-we-are` (the H1 has a rotating word, which is fine visually but should not be the only description).
- Treat `/who-we-are` as the **entity home**. Add `Organization` fields: `address` (Delhi NCR and London), `foundingDate`, `founder` (Person), `areaServed`, `knowsAbout`, `sameAs` for every real profile. `sameAs` currently lists only LinkedIn.
- Add `Person` schema for named authors (blog posts are all by Aashirwad Bhansali) with role and `sameAs`. Named, credentialed authors are a trust signal for both Google and AI engines.
- Keep the revenue-engineering promise visible: **"We install the revenue system your brand runs on."** Every pillar page states which part of the system it covers (Acquire, Convert, Instrument, Automate).

---

## 4. Content architecture (clusters mapped to the live IA)

The live site has real depth that competitors cannot copy: 9 agent pages, 4 products, 8 case studies, 18 portfolio entries, 13 services. The strategy is to turn that into five clusters, each with a pillar, supporting answer pages, and proof.

| Cluster | Revenue-system layer | Pillar (existing) | Proof assets (real) | Priority |
|---|---|---|---|---|
| **A. AI agents & automation** | Automate | `/services/ai-automation`, `/products/marksops` | 9 `/agents/*` pages, MarksOps, AI Receptionist, Q Manager, Nectar Loyalty Engine | **1** (most differentiated) |
| **B. Performance & growth** | Acquire / Convert | `/services/digital-marketing` | Trotr 28x ROAS / ₹14L, Amazon 11.2x, Nutrivend 45 leads / 71% untapped, BNPL | **1** (closest to revenue) |
| **C. Search: SEO + AEO + GEO** | Acquire | `/services/search-engine-optimization` (thin today) | Airborne Aviation SEO/AEO/GEO case study (Search Console data) | **2** (category claim) |
| **D. Build: web, app, software** | Convert / Instrument | `/services/web-development`, `/services/software-development` | Gaffar India, Capital Keys, Chrono Seconds | 3 |
| **E. Creative, UGC & social** | Acquire | `/services/social-media-marketing` | Kashmiri Sound (3.4M views, ₹0 spend), CSK/playR (5M reach), Mizuno, Shakti Bhog | 3 |

**Gap that matters most:** the Airborne SEO/AEO/GEO case study lives only in the old repo (`AirborneAviationSEOCaseStudy.tsx`). It is the only Search Console-backed proof and it is **not on the new site**. Port it into `caseStudies.ts` first; the SEO service page currently names Airborne but links to no case study.

Be honest in that case study: 26.3K impressions over 12 weeks and +59% daily impression growth are real, but most clicks come from brand queries and the non-branded target queries (e.g. "pilot training cost in india") still have near-zero clicks. State that and show the plan. This candour is itself the differentiator against agencies that publish only wins, and it is more likely to be cited.

---

## 5. SEO plan (rank and convert)

**5.1 Page-level fixes (templates, so one change fixes many pages)**
- **Titles ≤ 60 chars, descriptions 140–155 chars, written not truncated.** Replace `${name} • ${tagline}` with a hand-written `seoTitle` and `seoDescription` field on each service, agent, product, case study and portfolio item. `description.slice(0,155)` cuts mid-word today.
- Format: `Primary keyword phrase | Qala Labs`. Example: `Search Engine Optimization (SEO, AEO, GEO) | Qala Labs`.
- One H1 per page (done in the Oct 29 commit); verify after prerender.
- Self-referencing canonicals, absolute OG URLs, per-page OG images (the code already references `og-services`, `og-products`, `og-blog`, etc.). Files `og-agency`, `og-blog`, `og-careers`, `og-creator`, `og-products` are referenced but **not in `public/assets/og/`**; add them or fall back to `og-default`.
- Alias routes (`/service`, `/service/:slug`, `/our-work`, `/blogs`, `/team`, `/about`, `/career`, `/creators`, `/agencies`, `/growth-tools`) currently render duplicate content. 301 them to the canonical URL in `.htaccess` (one already is: BNPL).
- Sitemap: generate from the same data files at build, with real `lastmod`. Today's hand-written file already drifted (live has removed case studies the source dropped).

**5.2 Intent map (hypotheses to validate in week 1)**

| Page | Primary intent (hypothesis) | Secondary |
|---|---|---|
| `/services/digital-marketing` | performance marketing agency India / Delhi / London | Meta ads agency for D2C |
| `/services/search-engine-optimization` | SEO agency India; AEO / GEO agency | AI search optimization services |
| `/services/ai-automation` | AI automation agency; business process automation with AI | AI agents for ecommerce |
| `/services/ai-voice-agents`, `/products/ai-receptionist` | AI voice receptionist / AI phone agent for business | |
| `/services/web-development` | ecommerce / marketplace development company | custom web app development India |
| `/agents/*` (9 pages) | "[task] automation": reconcile Shiprocket/Unicommerce/Tally with AI, NDR automation, ecommerce inventory sync | long-tail, low competition, high intent |
| `/products/marksops` | multi-agent operations platform / AI operations for ecommerce | |
| `/blog/*` | see §7 | |

London and Delhi are both real locations; use "Delhi NCR" and "London" modifiers only on pages where the work genuinely happened, and put the addresses in schema. Do not create thin city-landing pages.

**5.3 Internal linking rule:** every blog post links to its cluster pillar, one case study, and one conversion node (the audit/booking flow). Every case study links to its service page and back. Service pages already carry a `proof` list; make those real anchor links in prerendered HTML.

---

## 6. AEO plan (be the answer)

AEO = structured so Google AI Overviews, featured snippets, voice and "People also ask" can lift a passage.

**Answer-block template (every service, agent, product and blog page):**
1. H2 phrased as the question a buyer types ("What does an AI voice receptionist do for a clinic?").
2. Directly under it, a **40–60 word self-contained answer** in plain text. No "it depends" opener, no brand fluff.
3. Then the depth: steps, a comparison table, numbers from our own work.
4. Visible "Last updated" date and author.

**Required additions**
- **FAQPage schema** (currently absent). Start with the homepage FAQ (7 Qs already written), then 4–6 Qs on each service, product and agent page. Only mark up Q&As that are visible on the page.
- **Definition lead** on each pillar: "[Term] is…" in the first paragraph (AEO, GEO, multi-agent system, NDR, etc.).
- **Comparison tables** where real: "AI voice agent vs IVR vs human receptionist", "SEO vs AEO vs GEO", "MarksOps vs stitching Zapier + spreadsheets". Tables are the format most often lifted.
- **HowTo only where it is a real procedure** with real steps (e.g. Meta Pixel + CAPI setup). Do not mark up marketing copy as HowTo.
- **Breadcrumb schema** on all nested pages (service, agent, product, case study, blog).
- **Schema by template**, as specified:

| Template | Schema |
|---|---|
| Home / Who we are | Organization (expanded), WebSite, Person (founders) |
| Service | Service (+ `areaServed`, `provider`), FAQPage, BreadcrumbList |
| Agent / Product | SoftwareApplication (or Service for agents), FAQPage, BreadcrumbList |
| Case study | Article/`CreativeWork` with `about` and `mentions`, BreadcrumbList |
| Blog | BlogPosting with ISO `datePublished` + `dateModified`, `author` Person with `sameAs`, BreadcrumbList |
| Contact | ContactPage + Organization `contactPoint` |

---

## 7. GEO plan (be the source AI engines cite)

GEO is earned by **being citable and being corroborated off-site**, not by markup tricks.

**7.1 Create citable assets (original, specific, quotable)**
These are what ChatGPT, Perplexity, Gemini and AI Overviews can attribute to Qala because nobody else has them:
1. **Own-data benchmark:** "Meta Ads CPA and ROAS by category, from Qala-managed accounts" (needs client approval and anonymization).
2. **Teardowns with real numbers:** the Trotr Spain pivot (28x ROAS, ₹14L revenue, ₹1.9L AOV), Amazon Ads 11.2x / 47% lower ACOS, Nutrivend 71% untapped market. Three already exist as blog posts; add the data tables and a "what we'd do differently" section.
3. **MarksOps architecture notes:** state machines, checkpointing, zero-auto-post finance policy. Technical specificity is rare and highly citable.
4. **Our own GEO experiment:** pick 25 buyer prompts, record which engines cite Qala today, make the changes in this plan, re-measure monthly and publish the results. This is the proof for Cluster C and costs nothing.
5. **Airborne SEO/AEO/GEO case study** (ported, honest version).

**7.2 Corroborate off-site (engines trust what other sources repeat)**
- Same canonical definition on LinkedIn (company + founders), Clutch, GoodFirms, Google Business Profile (Delhi), Crunchbase/AngelList-type listings that actually apply, and Instagram/YouTube where the case-study video lives.
- Founder bylines on LinkedIn that link back to the teardown posts.
- Answer genuine questions on Reddit and Quora (r/ecommerce, r/IndiaBusiness-type threads) with data, not links. Platforms like Reddit are heavily cited by AI engines.
- Collect 5–10 named client quotes (with permission) and put them in `Review` markup only if they are real and visible.

**7.3 Access policy:** keep `Allow: /`. Decide deliberately whether to allow `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot` and `Google-Extended`; for a studio selling AI visibility, allow them. Do not rely on the host default: confirm none of these are blocked by the Hostinger/CDN bot rules (see §1).

**7.4 Measurement (GEO has no standard dashboard yet)**
- Prompt panel: 25 prompts × (ChatGPT, Perplexity, Gemini, Google AI Overviews), run manually each month. Log: is Qala mentioned, is it cited with a link, who else is cited, is the description accurate.
- Referral traffic from `chatgpt.com`, `perplexity.ai`, `gemini.google.com` in GA4 (set up a channel group).
- Treat results as directional; AI answers vary run to run.

---

## 8. Content calendar (90 days)

Cadence: **2 pieces per week** after the gates pass. Quality over volume; each piece needs a named proof asset.

### Days 0–14: gates + foundation
- G1–G6 (above). Validate §5.2 keywords in Ahrefs/Search Console.
- Write `seoTitle` / `seoDescription` for all ~70 pages (template change).
- Port the Airborne SEO/AEO/GEO case study to the new site.
- Publish the canonical definition; expand Organization and Person schema.
- Start the GEO prompt panel baseline (before any changes).

### Days 15–45: pillars and answer pages
| Wk | Piece | Cluster | Type |
|---|---|---|---|
| 3 | Rebuild `/services/search-engine-optimization` as the SEO + AEO + GEO pillar with FAQ schema | C | Pillar |
| 3 | "SEO vs AEO vs GEO: what each one wins" (definition + table) | C | Answer |
| 4 | Rebuild `/services/ai-automation` with agent index, FAQ, comparison table | A | Pillar |
| 4 | "How to reconcile Shiprocket, Unicommerce and Tally with AI agents" | A | Cluster / agent link |
| 5 | Trotr 28x ROAS teardown (upgrade existing post with data tables) | B | Proof |
| 5 | "Meta Ads for high-ticket offers: the funnel we used" | B | Cluster |
| 6 | "What does an AI voice receptionist cost and replace?" | A | Answer |
| 6 | FAQ blocks + schema on all 9 agent pages | A | Template |

### Days 46–90: depth, off-site, first measurement
| Wk | Piece | Cluster |
|---|---|---|
| 7 | Own-data Meta CPA/ROAS benchmark (anonymized) | B |
| 7 | MarksOps architecture deep-dive | A |
| 8 | Amazon Ads 11.2x / 47% lower ACOS teardown | B |
| 8 | "Eval: how our site performs in AI answers" (GEO experiment v1) | C |
| 9 | Marketplace build: Gaffar India architecture note | D |
| 10 | UGC/fandom engineering: CSK/playR 5M reach, no paid placement | E |
| 11 | Directory/profile rollout complete (Clutch, GoodFirms, GBP) | GEO |
| 12 | Day-90 review: keep / refresh / merge / kill using Search Console + lead data | all |

Distribution per piece: LinkedIn post from a founder profile with the headline number, one carousel, a short video clip where one exists, an email to the relevant nurture list, and a Reddit/Quora answer where a genuine question exists.

---

## 9. KPIs (revenue first)

**Primary (decide what we keep):**
- Qualified leads and booked calls attributed to content (first-touch and assisted)
- Pipeline value and closed revenue sourced from content, by cluster
- Content-to-lead conversion rate by page
- Cost per content-sourced qualified lead

**Diagnostics (explain why revenue moved):**
- Indexed pages vs. submitted, impressions and non-brand queries (Search Console)
- Featured snippet / AI Overview appearances (manual sampling)
- GEO panel: mention rate, citation rate, accuracy of description
- Referral sessions from AI engines

**Targets:** I am not setting traffic targets because there is no baseline and the site is not yet crawlable. Set them after 30 days of Search Console data; propose revenue targets once you give me a day-90 pipeline number.

**Kill rule:** at 90 days, a page with no impressions and no assisted leads is merged or removed. Traffic without leads gets an offer/CTA fix first.

---

## 10. Content standards

1. Each piece names a target query, the intent it serves, a proof asset, a cluster and a next step.
2. First 100 words state the outcome in rupees, pounds, hours or percentage, with the source.
3. Never publish a client name or number without written approval; keep one approvals sheet.
4. Numbers repeated across pages (28x, 11.2x, 3.4M, 5M, ₹14L) come from one source file so they cannot drift.
5. No invented credentials, reviews or statistics. If we lack data, we say so (as in the Airborne write-up).
6. Dates: ISO in data, human-readable in UI; show "Updated" on anything older than 6 months.

---

## 11. Open items I need from you

1. **Approve G1** (prerender at build). It is the highest-leverage change on the list.
2. **Confirm deploy path:** is Hostinger the production host (headers say yes), or Vercel (a `vercel.json` exists)?
3. **Day-90 revenue target** for content (pipeline or closed revenue), to size cadence.
4. **Client approvals** for named numbers and the benchmark dataset.
5. **Access:** authorize Ahrefs and share Search Console so I can replace hypotheses with volumes.
6. **Profiles:** which real profiles exist for `sameAs` (LinkedIn, Instagram, YouTube, Clutch, Google Business Profile).
7. **Review and deploy** the branch above. Nothing is live until a build is deployed (gate G2).

---

*Evidence trail: live checks via `curl` on 2026-10-30; source read from `digipanda-clone/` (master `5881df9`), including `SEO.tsx`, `index.html`, `services.ts`, `blogsData.ts`, `caseStudies.ts`, `products.ts`, `agents.ts`, `public/sitemap.xml`, `public/robots.txt`; Airborne figures from `AirborneAviationSEOCaseStudy.tsx` on the old branch.*
