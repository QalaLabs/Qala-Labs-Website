# Qala Labs — CMO SEO + Conversion Implementation Plan

**Prepared:** 2026-11-19  
**Site:** https://qalalabs.com  
**Live code path:** `Website/digipanda-clone` (Hostinger static SPA)  
**Sources reviewed:** `SEO_IMPLEMENTATION_PLAN.md`, `UIUX_PAGE_BY_PAGE_IMPROVEMENTS.md`, `seo-audit-2026-09-16.md`, brand-voice guidelines, live curl + browser audit  

**One-line verdict:** Your SEO plan is directionally correct and Phase 1 must ship before ads scale — but for Meta/Google conversion you also need dedicated ad landing pages, tighter brand voice (Qala OS / HITL), and a cut-down homepage. Shipping more keywords onto an empty crawler shell will burn budget.

---

## 1. Verdict on your recommendations

### What to keep (agree)

| Your recommendation | Why it stands |
|---|---|
| **F1–F6 as blockers** (403 hubs, empty shell, duplicate titles, soft 404s) | Re-verified live 2026-11-19: `/services/ai-automation` raw HTML still shows homepage `<title>` + `canonical=/`; `/case-studies/` and `/portfolio/` return **403**; `Last-Modified: Thu, 24 Sep 2026` — deploy is stale. |
| **Build-time prerender** over “just hope Google runs JS” | Correct for Hostinger. Digipanda today has **no** `entry-server`; New folder has SSR code but is not what’s serving traffic. Prerender must be built **into digipanda-clone**, not assumed from New folder. |
| **Phase 0: GSC, Bing, GA4, Clarity, PSI baseline** | Mandatory before Meta/Google spend. You cannot optimize ads without attribution or organic baselines. |
| **Site-wide UX A1–A12** (lazy images, H1, tap targets, form labels, one primary CTA, stop rotating H1) | Directly improves Quality Score / landing-page experience and mobile CVR. |
| **Thicken case studies to 600+ words; agent FAQs** | Thin pages convert poorly from cold ads and don’t rank. |
| **Clutch + reviews + entity “Qala Labs”** | Needed for B2B trust on high-ticket AI/automation deals. |

### What to change or de-prioritize (advise differently)

| Your recommendation | My advice |
|---|---|
| Treat `Website/New folder` as the work repo | **Wrong for execution.** Live IA matches **digipanda-clone**. Do all fixes there (or merge New-folder prerender patterns into digipanda). Working New folder alone won’t change production. |
| Deploy full Node SSR on Hostinger | Prefer **static prerender** (your plan’s recommended path). Node SSR on Hostinger is fragile; prerender keeps hosting simple. |
| Phase 3 city doorway set (Delhi / Gurgaon / Noida / Gurugram) **before** paid LPs | For ads launch, **defer city SEO pages to Week 4+**. First build **intent-matched ad LPs** (`/lp/...`) that are `noindex` or carefully canonicalized so they don’t cannibalize organic hubs. |
| Homepage title “AI Agency in India…” | Keep for **organic**. For **paid**, never send Meta/Google traffic to the long homepage — send to `/lp/{offer}`. |
| Lead with “autonomous agent swarms” everywhere | **Conflicts with brand-voice guidelines** (never claim full autonomy; HITL is the trust feature). Keep “agents” language; drop “autonomous / zero headcount / runs itself” from heroes and ad copy. |
| 15+ new SEO pages in Weeks 2–5 | Sequence: **indexation → top 5 money pages → ad LPs → then MCP/n8n/WhatsApp/city**. Don’t dilute engineering across 15 URLs while the shell is empty. |
| GA4 “site has no tracking” (plan assumption) | Digipanda `index.html` already has **GTM-PFN9PZRS**. Verify GTM → GA4 + Meta Pixel + Conversion Linker; don’t double-install. Confirm `RouteTracker` fires SPA pageviews. |

### Strategic gap your docs don’t cover (critical for ads)

Your SEO plan optimizes for **organic indexation**. It does **not** specify:

1. **Paid landing page architecture** (one LP per ad group / offer)
2. **Offer → CTA → CRM → calendar** funnel map
3. **Demo assets** (MarksOps walkthrough, voice agent audio, agent workflow clips)
4. **Message match** between ad creative and LP H1
5. **Thank-you / event firing** for Meta CAPI + Google Enhanced Conversions

Without those, you can rank and still lose money on ads.

---

## 2. Live-site CMO audit (page-by-page)

### Positioning conflict (fix first, content-level)

Three registers currently compete:

1. **Creative × Data × Impact studio** (live hero: “Where Ideas Turn Into Revenues”, viral reach)
2. **Autonomous GAAS / agent swarms** (`/gaas`, eyebrow copy)
3. **Qala OS Revenue OS** (brand book: one roof, HITL, revenue-per-hour)

**CMO decision:** Pick **one primary public narrative** for the next 90 days.

**Recommended primary:**  
> *Qala Labs builds and runs revenue systems — AI agents with human approval gates, performance marketing, and software — so founders see which spend becomes cash.*

Use GAAS as a **productized offer page**, not the whole brand. Use “Creative × Data” as a **supporting line**, not the H1.

---

### Homepage `/`

| Lens | Feedback |
|---|---|
| **Content** | Strong proof numbers (28x, ₹4.2Cr+, 45 leads) but H1 is poetic, not searchable or ads-ready. “125M+ viral reach” is vanity vs contribution margin (your own brand rule). Page is ~41 phone screens — too long for paid traffic. |
| **Imagery** | Glass “macOS window” hero is distinctive but feels SaaS-template adjacent. Team avatars work. Engine scrubber is clever; risk: looks like a toy dashboard if metrics aren’t labeled as client outcomes. |
| **Branding / color** | Light theme live vs AGENTS.md dark `#06070D` — brand inconsistency. Indigo `#4F46E5` + cyan work; avoid stacking more glow/pills. |
| **UI/UX** | Competing CTAs: Let’s Build / Book Discovery / Explore AI / sticky bar / chat. Mobile sticky truncates. Theme toggle + loader (“Initializing Horizon…”) add friction. |
| **Conversion fix** | Fixed H1 with primary keyword + outcome. One primary CTA (“Book 20-min diagnostic”). Collapse middle into tabs or “Results / How we work / Products”. Remove or demote sticky until scroll depth >50%. |

### `/services` + `/services/*`

| Lens | Feedback |
|---|---|
| **Content** | 13 services is a full agency menu — good for SEO breadth, bad for ads focus. Service pages are proof-anchored (good) but thin on process/FAQ/pricing bands. |
| **UI** | Text-heavy heroes; no diagram; CTA often below fold. |
| **Ads** | Do **not** send cold traffic to `/services` index. Map each campaign to one service or agent LP. |
| **Merge candidates** | Web design ↔ web development; mobile design ↔ mobile development (or clear “design vs build” intent). Rename slug `digital-marketing` → `performance-marketing` with 301. |

### `/agents/*` (9 pages) — **ads gold if productized**

| Lens | Feedback |
|---|---|
| **Content** | Clear “what it does / how built” but thin (~300 words). Missing: who buys it, integration list with logos, SLA, pricing model (setup + monthly), HITL copy, FAQ, 15s demo. |
| **Demo** | Highest-ROI media investment: screen recordings of Finance Bills → draft Odoo entry; Voice receptionist sample call; CRM lead SLA timer. |
| **Ads** | Meta/Google “AI agent / automation” traffic should land on **agent LPs** or MarksOps, not homepage. |

### `/products/*`

| Product | Feedback |
|---|---|
| **MarksOps** | Best asset. Needs public UI screenshots, architecture SVG, security/HITL note, “Request demo” CTA (not “Book discovery” generic). |
| **AI Receptionist** | Needs audio player + transcript — this is the demo. |
| **AI Recruiter / Q Manager** | Screenshot + one outcome metric each; otherwise look vaporware. |

### `/gaas`

Strong conversion skeleton (comparison table, pricing tiers, diagnostic). **Rewrite** autonomy / “death of the agency” language to HITL + revenue-per-hour to match brand book and reduce enterprise distrust.

### `/work`, `/case-studies`, `/portfolio`

**403 on hubs is a trust and SEO emergency** — ads that click “see our work” die. Fix folders first. Then: metrics in hero, real creatives (not stock), named clients where allowed, related-service links.

### `/contact`, StickyCTA, Tools

Form unlabeled inputs hurt a11y and CVR. Calendar embed is good — make it the **primary** path for high-intent. Tools/diagnostic is excellent **middle-funnel lead magnet** for Meta lead ads / Google remarketing — gate PDF lightly, fire `Lead` event.

### Blog

D2C/creative topics only — none target AI/automation keywords. For ads: use blog as **retargeting content**, not primary LP. Publish MCP / agents-for-business / n8n guides after indexation fix.

---

## 3. Ads architecture (Meta + Google) — conversion system

### Principle

**Organic pages rank. Ad LPs convert. Case studies prove. Calendar closes.**

Never point Search/Meta prospecting to `/`. Use:

```
Ad creative (1 promise + 1 proof number)
  → /lp/{offer}?utm_...
    → Primary CTA: Book diagnostic / Request demo
      → /thank-you?offer=...  (fire conversions)
        → Sales (calendar + WhatsApp fallback)
```

### Recommended LP inventory (build Week 1–2, before heavy spend)

| LP URL | Primary keyword / ad theme | Proof | CTA |
|---|---|---|---|
| `/lp/ai-automation` | AI automation agency India | MarksOps 94% manual reduction | Book diagnostic |
| `/lp/ai-voice-agent` | AI receptionist / voice agent | Call sample + CRM booking | Book demo call |
| `/lp/performance-marketing` | Meta/Google ads agency | Trotr 28x / Amazon 11.2x | Growth diagnostic |
| `/lp/marksops` | Multi-agent ops platform | Architecture + HITL | Request demo |
| `/lp/crm-leads-agent` | Lead follow-up automation | 24h SLA loop | Book install call |
| `/lp/finance-agents` | Finance bill / reconciliation AI | Odoo/Tally staged drafts | Book walkthrough |
| `/lp/web-cro` | High-converting web / LPs | Capital Keys 64.7% | Start project |
| `/lp/seo-aeo` | SEO + AEO/GEO | Airborne / schema proof | Free technical audit |

**Rules for every LP (above the fold):**

1. H1 matches ad headline (±same promise)  
2. One proof metric with source (client or “anonymized D2C”)  
3. Who it’s for (1 line)  
4. Primary CTA only  
5. Trust: logos + HITL sentence + response-time promise  
6. FAQ (3–5) for Quality Score / objections  
7. `noindex,follow` **or** canonical to organic service page (pick one policy and stick to it)  
8. UTM + `tool_used` / `campaign` field into lead API  

### Tracking checklist (ads will fail without this)

- [ ] GTM: GA4 config, Meta Pixel, Google Ads tag  
- [ ] SPA `RouteTracker` → virtual page_view  
- [ ] Events: `generate_lead`, `schedule`, `demo_request`, `tools_submit`  
- [ ] Meta CAPI + Google Enhanced Conversions from `/api/lead`  
- [ ] Thank-you page unique per offer  
- [ ] Clarity heatmaps on all `/lp/*`  
- [ ] Offline conversion import from closed-won (monthly)

### Budget sequencing advice (CMO)

1. **Week 0–1:** Tracking + indexation + LP1–3 only. Soft spend for learning.  
2. **Week 2:** Scale winners; pause anything with message mismatch.  
3. **Week 3+:** Agent-specific LPs + remarketing to blog/tools.  
4. Do **not** run broad “AI agency” Meta traffic to homepage while “Initializing Horizon” loader and 41-screen scroll still exist.

---

## 4. Implementation plan (phased)

### Phase 0 — Safety & measurement (Days 0–2)

| # | Task | Owner | Done when |
|---|---|---|---|
| 0.1 | Confirm **digipanda-clone** is the deploy source; stop dual-repo drift | Eng | One README “source of truth” |
| 0.2 | Rotate any leaked SMTP/secrets; audit `server.js` | Eng | No secrets in git |
| 0.3 | GSC + Bing domain verify; submit sitemap | Marketing | Properties live |
| 0.4 | Audit GTM container: GA4, Pixel, Ads, SPA pageviews | Marketing | Realtime hits on route change |
| 0.5 | PSI mobile/desktop on `/`, `/services/ai-automation`, `/gaas` | Eng | Baseline sheet |
| 0.6 | Decide public narrative: **Revenue systems + HITL** (recommended) | Founders | Written one-pager |

### Phase 1 — Indexation unblock (Week 1) — **do before scaling ads**

| # | Task | Notes |
|---|---|---|
| 1.1 | Fix **403** on `/case-studies` & `/portfolio` | Move `public/case-studies` → `public/img/case-studies` (same for portfolio) **or** `.htaccess` exception |
| 1.2 | **Redeploy** fresh digipanda build (stale since 2026-09-24) | Compare asset hashes |
| 1.3 | Add **prerender pipeline** to digipanda | Port pattern from New folder `entry-server` / `scripts/prerender.ts`; output `dist/<route>/index.html` |
| 1.4 | Unique title, description, canonical, H1, JSON-LD in **raw HTML** | Verify with `curl.exe` (not browser) |
| 1.5 | Real 404 + noindex NotFound; fix soft-404 SPA catch-all | |
| 1.6 | Align aliases: `/who-we-are`→`/about`, `/contact-us`→`/contact` (301) | Sitemap = canonical set only |
| 1.7 | Ship `llms.txt` as `text/plain` with **live** URLs | |
| 1.8 | Absolute OG PNG/JPG 1200×630 (no SVG) | Required for Meta ad previews & organic shares |

**Exit criteria:** `curl.exe https://qalalabs.com/services/ai-automation` shows unique `<title>`, `<h1>`, and JSON-LD. Case-studies hub returns 200.

### Phase 2 — Conversion UX + brand voice (Week 1–2, parallel)

| # | Task |
|---|---|
| 2.1 | Homepage: fixed keyword H1; cut to ≤12 mobile screens; one primary CTA |
| 2.2 | Kill competing floaters (one FAB max); fix StickyCTA copy truncation |
| 2.3 | Form labels, autocomplete, error summary, mailto/WhatsApp fallback (AGENTS.md) |
| 2.4 | Image: width/height, lazy, WebP; hero eager + `fetchpriority=high` |
| 2.5 | `prefers-reduced-motion`; pause Three.js when off-screen |
| 2.6 | Skip link + focus-visible |
| 2.7 | Rewrite heroes: remove “autonomous / zero headcount”; add HITL + one-roof |
| 2.8 | Theme: pick **one** default (recommend dark per AGENTS.md **or** light — not both half-shipped) |

### Phase 3 — Ad LPs + demos (Week 2) — **ads go-live gate**

| # | Task |
|---|---|
| 3.1 | Build LP template component (hero, proof, process, FAQ, CTA, schema FAQPage) |
| 3.2 | Ship first 4 LPs: ai-automation, performance-marketing, marksops, ai-voice-agent |
| 3.3 | Thank-you pages + conversion events |
| 3.4 | MarksOps 20–30s demo (muted, captions, poster) |
| 3.5 | Voice agent audio sample + transcript |
| 3.6 | 2–3 agent workflow SVGs (finance, CRM, inventory) |
| 3.7 | Soft launch ads: ₹ learning budget; iterate creative ↔ H1 match |

### Phase 4 — Organic money pages (Weeks 2–4)

| Priority | Page | Action |
|---|---|---|
| 1 | `/services/ai-automation` | Rebuild: India intent, stack, HITL, FAQ, pricing bands, MarksOps embed |
| 2 | `/services/ai-agent-development` | **New** pillar linking all `/agents/*` |
| 3 | `/services/ai-voice-agents` | Audio demo + FAQ |
| 4 | `/services/performance-marketing` | 301 from digital-marketing; charts |
| 5 | All `/agents/*` | +300 words use case, FAQ, demo, sibling links |
| 6 | Case studies | Metrics in hero; 600+ words; related service |
| 7 | `/products/marksops` | Screenshots + security note + demo CTA |

### Phase 5 — Keyword expansion (Weeks 4–8) — after indexation healthy

Follow your Phase 3 keyword table, with this order change:

1. MCP server development (+ public GitHub repo)  
2. n8n automation  
3. WhatsApp AI chatbot  
4. AI marketing agency hub  
5. **Then** city pages — only with unique local proof (no doorway templates)  
6. Blog: MCP guide, AI agents for business  

### Phase 6 — Off-site & authority (continuous)

Clutch profile + 5–10 reviews, DesignRush/GoodFirms, LinkedIn distribution, GitHub MCP, monthly AI-citation prompt log, GBP **only** if real staffed office.

---

## 5. Page-type conversion templates (use everywhere)

### Service / Agent / LP hero (required blocks)

```
[Eyebrow: category]
H1: {Outcome} for {who} — not {buzzword}
Sub: 1 sentence mechanism (HITL / one roof / media + agents)
Proof strip: 3 metrics with sources
Primary CTA | Secondary: See how it works (anchor)
Who it's for | Who it's not for
```

### Mid-page

- 3-step process  
- Integration logos  
- 1 case study card  
- FAQ (schema)  
- Final CTA + calendar  

### CTA copy bank (message match)

| Offer | Primary CTA |
|---|---|
| Automation / agents | “Book agent install diagnostic” |
| Voice | “Hear a live demo” |
| Performance | “Get a 20-min funnel teardown” |
| MarksOps | “Request MarksOps walkthrough” |
| SEO | “Request technical SEO audit” |
| Design/dev | “Start a project brief” |

---

## 6. Brand, color, imagery directives

| Area | Directive |
|---|---|
| **Color** | Keep Electric Indigo / Neon Cyan / Emerald. One theme default. Ambient mesh OK; no extra purple glow stacks. |
| **Type** | Manrope + IBM Plex Mono stay. Body ≥16px; mono labels ≥12px with contrast. |
| **Imagery** | Prefer real product UI, campaign creatives, diagrams. Kill heavy ASCII JPG / legacy DigiPanda rasters. |
| **Motion** | ≤1 hero animation; scroll-triggered one-shots 150–300ms; respect reduced-motion. |
| **Voice** | Numbers > adjectives. “Recommend → approve → execute.” Never “autonomous” for money actions. |

---

## 7. Success metrics (90 days)

| Metric | Target |
|---|---|
| Indexable URLs returning unique title/H1 in curl | 100% of sitemap |
| `/case-studies` & `/portfolio` | 200 OK |
| Organic impressions (GSC) | Upward month-on-month after Week 3 |
| Paid LP CVR (view → lead) | ≥3% Search, ≥1.5% Meta cold (tune by offer) |
| Cost per qualified diagnostic booked | Track by offer; kill LOB above target weekly |
| CWV mobile LCP | ≤2.5s on LP template (no Three.js on `/lp/*`) |
| Clutch reviews | ≥5 within 60 days |

---

## 8. Open decisions (need founder input)

1. **Primary narrative** for 90 days: Revenue OS / HITL vs Creative studio vs Autonomous GAAS?  
2. **Office** for GBP + LocalBusiness schema?  
3. **Which metrics/clients** are public-safe?  
4. **LP indexing policy:** `noindex` vs canonical to `/services/*`?  
5. **Theme:** dark-only or light-only?  
6. Can MarksOps UI and voice call samples be shown publicly?

---

## 9. Suggested first sprint (5 engineering days)

1. Fix 403 hubs + redeploy digipanda  
2. Prerender MVP for top 20 URLs  
3. Homepage CTA/H1/length cut + form labels  
4. LP template + 2 LPs (ai-automation, performance-marketing)  
5. GTM conversion events + thank-you  

Marketing parallel: GSC, creative angles matched to LP H1s, Clutch outreach, demo video script.

---

*This plan supersedes conflicting “work in New folder only” instructions for production work. Port SSR/prerender ideas from New folder into digipanda-clone; keep New folder as reference until explicitly migrated.*
