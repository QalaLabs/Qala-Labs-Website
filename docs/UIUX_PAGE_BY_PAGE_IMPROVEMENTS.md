# Qala Labs: UI/UX, media and motion improvements, page by page

Prepared 2026-11-19 for https://qalalabs.com. Companion to `SEO_IMPLEMENTATION_PLAN.md`.

## How this was tested, and what it can't tell you

- **Measured at a 375px phone width** on 54 of the 56 sitemap URLs. `/case-studies` and `/portfolio` return 403, so they were not testable. Measured: images (count, bytes, size attributes, lazy loading, alt), tap-target sizes, text sizes, horizontal overflow, landmarks, heading order, forms, animation counts, and a rough contrast check.
- **Looked at in a browser:** homepage (desktop and mobile), `/services/ai-automation`, `/case-studies/mizuno-india`, `/blog/28x-roas-funnel-blueprint`. The other pages were measured, not looked at. Where a recommendation for an unseen page is based on its template, it says "template".
- **Not reliable:** LCP and CLS came back as 0 because the test ran in a background frame, so treat them as "unmeasured". The contrast check is a rough heuristic and was calibrated for the dark theme while the site loaded in its light theme, so the contrast counts are flags to re-test, not findings. An axe-core accessibility run was blocked by the permission system, so there is no automated WCAG result.
- **Re-test with:** Lighthouse and axe DevTools on the 8 template pages, in both light and dark themes, plus a real phone.
- The site follows the rules in `Website/AGENTS.md` (500KB asset budget, `bottom-24 sm:bottom-6` for floating buttons, `#06070D` dark base, ambient mesh). Recommendations below stay inside those rules.

## Headline numbers (375px, 54 pages)

| Measure | Result |
|---|---|
| Images with `width`/`height` set | 0 of 616 |
| Images lazy-loaded | 27 of 616 (589 are not) |
| Homepage image weight | 59 images, 2.27MB (`hero-ascii-source.jpg` 414KB, `bgrk1.webp` 344KB) |
| `/work` image weight | about 1.0MB |
| Homepage height on a phone | 33,748px (about 41 screens) |
| Homepage text under 14px | 445 of 629 text elements (164 under 12px) |
| Homepage interactive elements under 40px | 90 of 137 |
| Interactive elements under 40px, simplest pages | about 35 per page (nav and footer) |
| `prefers-reduced-motion` CSS found | 0 pages |
| Skip-to-content link found | 0 pages |
| Pages with a heading level skipped (for example h1 to h3) | 45 of 54 |
| Pages with no H1 | `/who-we-are`, `/services`, `/contact-us` |
| Inputs with no label | 35 across 5 form pages; 28 rely on placeholder only |
| Video elements / GIFs | 0 / 0 |
| Horizontal scroll on phone | none |

---

## A. Site-wide fixes (do these first; they affect all 56 pages)

| # | Fix | Why | Effort |
|---|---|---|---|
| A1 | Add `width`, `height` (or `aspect-ratio`) to every `<img>` and `loading="lazy"` plus `decoding="async"` to all below-the-fold images. Keep the first hero image eager with `fetchpriority="high"`. | No image reserves space, so layout shift is likely on slow connections. 589 images load eagerly. | Small (shared `Image` component) |
| A2 | Convert remaining PNG/JPG to WebP or AVIF and add responsive `srcset`. The `hero-ascii-source.jpg` and `bgrk1.webp` should be shrunk or replaced by CSS. | 7 to 11 legacy-format images per page; the homepage ships 2.27MB of images. | Small to medium |
| A3 | Add `@media (prefers-reduced-motion: reduce)` that disables the keyframes, parallax and canvas animation; pause the Three.js scene when it is off-screen or the tab is hidden. | No reduced-motion rule found on any page; the homepage has 49 animating elements and 3 canvases. | Small |
| A4 | Add a skip link ("Skip to main content") as the first focusable element, with a visible focus state. Add visible `:focus-visible` rings that work on both themes. | None detected. | Small |
| A5 | Fix heading order: one H1 per page, no skipped levels. Add H1 to `/who-we-are`, `/services`, `/contact-us`. | 45 of 54 pages skip a level. | Small |
| A6 | Raise tap targets: footer and nav links, chips, and icon buttons to at least 44x44px (padding is enough; the visual size can stay). | About 35 small targets even on simple pages. | Small |
| A7 | Raise the minimum text size. Make body 16px; keep mono eyebrow labels at 12px minimum with higher contrast; avoid 10-11px text. | Homepage: 164 text elements under 12px. | Medium |
| A8 | Fix form labels. Visible `<label>` for every input, `autocomplete` attributes, inline validation on blur, and an error summary. Keep the `AGENTS.md` rule that success shows only when `response.ok`. | 35 unlabeled inputs; 28 placeholder-only. | Small to medium |
| A9 | Run a real contrast check in both themes with axe or Lighthouse, then fix the eyebrow, caption and muted-grey text. | Contrast counts in this audit are unreliable, but muted mono text on glass panels is the likeliest offender. | Small |
| A10 | Fix the mobile floating stack: the sticky "Request Growth Plan" bar plus two floating buttons (chat and a second sparkle button) stack and overlap the hero CTA. The bar text is truncated ("Ready to scale pa..."). Show one floating action, shorten the copy, and keep `bottom-24 sm:bottom-6`. | Seen on the mobile homepage screenshot. | Small |
| A11 | Make the homepage H1 stable. It rotates ("28X ROAS FUNNELS", "125M+ VIRAL REACH", "AUTONOMOUS SCALE"). Keep one fixed, keyword-bearing H1 and animate only a sub-line, with `aria-live="off"` and reduced-motion support. | Rotating H1 text is bad for crawlers and for readers who pause on it. | Small |
| A12 | Pick one primary CTA per page type (see the content audit). Keep the secondary CTA visually quieter. | Four CTAs compete on every page. | Small |
| A13 | Add a proper loading skeleton for CMS-driven pages so there is no blank flash before content. | CMS pages render after fetch; prerender (SEO plan 1.3) helps most. | Medium |
| A14 | Theme check: the live site rendered in a light theme with a dark/light toggle, but the source (`main.tsx`) sets `forcedTheme="dark"` and `AGENTS.md` says the canonical background is dark `#06070D`. This means the deployed build is not the current source. Redeploy from source (see SYSTEM_ARCHITECTURE.md), then re-run the UI measurements, because some numbers above may change. | Live site and source disagree. | Small |

---

## B. Template-level improvements

### B1. Homepage `/`
- **Text:** the H1 needs the keyword (see A11). Add one sentence stating what you do and where (AI agency and marketing, India). 3,000+ words is a lot; cut the long middle sections or collapse them into tabs.
- **Page length:** 33,748px on a phone. Aim for at most 12 screens. Group proof into one "Results" strip.
- **Images:** 59 images and 2.27MB. Lazy-load everything below the hero; replace the ASCII hero JPG with CSS or SVG.
- **Video:** none. Add one 20-30 second muted looped product demo of MarksOps (WebM/MP4, poster image, play on view, no autoplay audio). This would be your strongest asset for a "build AI agents" audience.
- **Animation:** 49 animating elements and 3 canvases is heavy. Keep one hero animation; make the rest scroll-triggered, one-shot, 150-300ms, with reduced-motion fallbacks.
- **Social proof:** the avatar stack's "₹2.5Cr+" badge is clipped on mobile; use a readable counter.
- **Forms:** one form on the page has 6 unlabeled inputs; see A8.

### B2. Service pages (`/services/*`, 13 pages)
- **Seen:** `/services/ai-automation`. Text-only hero, a strong subhead, but no visual and no CTA above the fold except the floating bar.
- **Image:** add a diagram per service (input to agent to approved action) as an SVG, with alt text describing the flow.
- **Text:** add a "Who this is for" line, a 3-step process, an FAQ, and a result stat with its source. Pages are 170-560 words.
- **Page:** put a primary button in the hero. Add related case study cards and related services (the pages already have "Also in..." blocks; make them visual cards).
- **Animation:** a subtle reveal on the process steps only.

### B3. Agent pages (`/agents/*`, 9 pages)
- **Image:** one architecture or workflow diagram (SVG) per agent; show the integration logos (Tally, Shiprocket, etc.) with correct brand assets.
- **Video:** a 15-second screen recording of each agent's key action.
- **Text:** add a use case with numbers and a short FAQ. At 290-380 words they are thin.
- **Page:** link back to the pillar `/services/ai-automation` and across to sibling agents.

### B4. Product pages (`/products/*`, 4 pages) and `/products`
- `/products` is 66 words, a card list. Add a screenshot or short loop per product, a one-line outcome, and a clear "See demo" action.
- `/products/marksops` is the best page. Add a real UI screenshot or a short demo video, an architecture diagram, and a security and data-handling note (buyers of AI agents ask).

### B5. Case studies (`/case-studies/*`, 10 pages)
- **Seen:** `/case-studies/mizuno-india`. A large lifestyle hero photo fills the first screen, but the result metrics are not visible there.
- **Page:** move the headline metrics (for example 3.8x, 400%) into the hero as a stat row; keep the photo secondary.
- **Image:** replace generic photos with real campaign creatives, dashboards (blurred if confidential) and before/after charts.
- **Video:** include the campaign reel or a 30-second recap where the client allows it.
- **Text:** the Amazon Ads page doesn't name the client; add a named testimonial or label it clearly as anonymized.
- **Animation:** count-up on the metrics, once, with reduced-motion support.

### B6. Blog (`/blog`, 6 posts)
- **Seen:** `/blog/28x-roas-funnel-blueprint` has a good hero, author byline and read time.
- **Page:** add a table of contents, a "key takeaways" box at the top, related posts, and one in-content CTA.
- **Image:** custom diagrams or charts for each post; give every image a descriptive alt.
- **Text:** posts are 410-640 words and dated Jan to Mar 2026. Refresh dates and numbers.
- `/blog` index: add category filters, a featured post, and an email signup.

### B7. Contact and forms (`/contact-us`)
- Visible labels, grouped fields, an error summary and clear success and failure states (the site's own rule requires an inline fallback with the `mailto:` and WhatsApp buttons).
- Add a response-time promise, an office or working-hours line, and a calendar embed.
- The page has no H1.

### B8. Collective pages, careers, legal
- `/creator-collective` and `/agency-collective`: 600-660 words with a form each. Add real partner logos or testimonials, and use one CTA.
- `/careers`: add job cards with location, type and apply links.
- `/privacy-policy`, `/terms`: add a table of contents and a last-updated date; keep the layout plain.

---

## C. Per-page checklist (all 56 sitemap URLs)

Legend: **Seen** = viewed in a browser; **Measured** = metrics only; **Template** = recommendations come from the template group above.

| # | URL | Status | Top improvements for this page |
|---|---|---|---|
| 1 | `/` | Seen + measured | A10, A11; cut length by about half; lazy-load images; replace the hero ASCII JPG; add the MarksOps demo video; raise small text; label the form. |
| 2 | `/who-we-are` | Measured | Add an H1; fix the canonical (SEO plan); show real team photos with names and roles; shorten (1,100+ words); reduce tiny text. |
| 3 | `/services` | Measured | Add an H1; replace the heavy `bgrk1.webp` background; turn the service list into a clear grid with icons; group 13 services into 3-4 categories. |
| 4 | `/work` | Measured | About 1.0MB of images: compress and lazy-load; reduce small text; add filters by service and industry; merge with the case-studies hub. |
| 5 | `/case-studies` | **403, not testable** | Fix the 403 first (SEO plan 1.1); then apply B5 hub patterns (filter, result chips, thumbnails). |
| 6 | `/portfolio` | **403, not testable** | Fix the 403; then decide whether it merges with the case-studies hub. |
| 7 | `/products` | Measured (66 words) | Product cards with a screenshot or loop each; one-line outcomes; compare table. |
| 8 | `/blog` | Measured | Category filters, featured post, signup form (label it), pagination. |
| 9 | `/creator-collective` | Measured | B8; one CTA; real creator proof; label the form. |
| 10 | `/agency-collective` | Measured | B8; partner tiers as a simple table; testimonials; label the form. |
| 11 | `/careers` | Measured | Job cards, apply flow, fewer tiny labels (132 text elements under 14px). |
| 12 | `/contact-us` | Measured | B7; add an H1; label all 6 inputs. |
| 13 | `/privacy-policy` | Template | B8; table of contents; last-updated date. |
| 14 | `/terms` | Template | B8; same as above. |
| 15 | `/services/ai-automation` | Seen | B2; add a hero diagram, FAQ, and primary CTA button; pair with the MarksOps demo. |
| 16 | `/services/ai-voice-agents` | Measured (about 330 words) | Add an audio sample or short call recording player (with transcript); the FAQ already exists, so keep it. |
| 17 | `/services/branding` | Template | Show before/after logo or brand-system visuals; a process strip. |
| 18 | `/services/ui-ux-design` | Template | Embed 2-3 real screens with captions; a prototype video. |
| 19 | `/services/web-design` | Template | Live site thumbnails with load-time stats; consider merging with web development (content audit). |
| 20 | `/services/mobile-app-designing` | Template | Device mockups; merge with mobile app development. |
| 21 | `/services/landing-page-designing` | Template | Before/after conversion examples. |
| 22 | `/services/web-development` | Template | Stack diagram; performance scores as proof. |
| 23 | `/services/mobile-app-development` | Template | App screenshots and store links where they exist. |
| 24 | `/services/software-development` | Template | Architecture diagram and one deeper case study link. |
| 25 | `/services/digital-marketing` | Measured | H1 reads "Performance Marketing"; align the slug or heading; add a channel-mix visual and a results chart. |
| 26 | `/services/search-engine-optimization` | Measured | Add a simple SEO/AEO/GEO diagram; show a ranking or traffic example if you have one. |
| 27 | `/services/social-media-marketing` | Template | Creative grid of real posts and reels; a short reel video. |
| 28-36 | `/agents/*` (9 pages) | Measured, template | B3 for each: workflow SVG, integration logos, 15-second screen capture, FAQ, links to the pillar. |
| 37 | `/products/marksops` | Measured | B4; real UI screenshots, a demo video, an architecture diagram, a trust and security note. |
| 38 | `/products/ai-recruiter` | Measured | Screenshot of the candidate pipeline; a sample scorecard. |
| 39 | `/products/ai-receptionist` | Measured | Audio demo with transcript; a call-flow diagram. |
| 40 | `/products/q-manager` | Measured | Dashboard screenshots; a short walkthrough video. |
| 41-50 | `/case-studies/*` (10 pages) | Measured; Mizuno seen | B5; move metrics above the fold, real creatives instead of generic photos, quotes, a "related case study" block. |
| 51-56 | `/blog/*` (6 posts) | Measured; one seen | B6; table of contents, takeaways, custom diagrams, refreshed dates, a related-posts block. |

---

## D. Suggested order of work

1. **Week 1, quick wins (A1, A3, A4, A5, A6, A10, A11).** Mostly shared components. Biggest effect on speed, accessibility and mobile polish.
2. **Week 2, A2, A7, A8, A9, A12, A14 and the form pages.** Then re-run Lighthouse and axe on the 8 template pages in both themes.
3. **Weeks 3-4, media:** the MarksOps demo video, workflow diagrams for the agent pages, real creatives for case studies.
4. **Ongoing:** refresh blog dates, add images per post, and re-measure.

## E. Open questions
1. ~~Dark or light?~~ Decided: **light only** (confirmed 2026-11-25). Remove `forcedTheme="dark"`, the toggle and the dark-only rules in `AGENTS.md`; re-run the contrast checks on the light palette.
2. Can the MarksOps UI be shown publicly, in a demo or in screenshots?
3. Can case-study results and client names be shown on the pages?
