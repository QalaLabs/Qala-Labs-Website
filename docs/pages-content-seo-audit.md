# Qala Labs Website — Pages Content & SEO Metadata

_Compiled from the codebase (React/Vite site, metadata rendered via `src/components/layout/SEO.tsx` using `react-helmet-async`)._

> **Note on keywords:** This codebase has no `meta name="keywords"` tag anywhere in `SEO.tsx` or any page. Every "Meta Keywords" field below is therefore `None`. The one exception is the Kashmiri Music case study, which embeds a `keywords` field inside its JSON-LD structured data (not a meta tag) — noted where relevant.

## Site-Wide SEO Defaults (`src/lib/seo.ts`)

| Field | Value |
|---|---|
| Site name | Qala Labs |
| Default description | India's full-service AI growth agency — combining performance marketing, AI automation, and AI search visibility to build brands that scale. |
| URL | https://qalalabs.com |
| Default OG image | https://qalalabs.com/og.svg |

---

## Home — `/`
**File:** `src/pages/Index.tsx`
**Meta Title:** Full-Service AI Growth Agency India | Qala Labs *(fallback; live SEO is fetched dynamically via `fetchPageSEO('home')` from Supabase CMS)*
**Meta Description:** India's full-service AI growth agency — combining performance marketing, AI automation, and AI search visibility to build brands that scale.
**Meta Keywords:** None

**Content Summary:**
- CMS-driven: fetches `page`/`page_blocks` from Supabase and renders via `BlockRenderer`, with a static `HomeHero` always shown first.
- H1 (HomeHero): "We are revenue engineers."
- Body: "Qala Labs fuses creative craft with data discipline to install the media buying, lifecycle automation, and revenue instrumentation your DTC brand needs to scale past ₹1Cr/mo — run by our team, tuned weekly against real unit economics, and handed off as a system you own."
- Stat tiles: Peak ROAS 28×, Avg ROAS 3.8×, Brands scaled 40+; client logos (playR, WWF, Trotr, Chrono Seconds).
- Remaining sections are CMS-configured blocks (dynamic).
- CTAs: hero "Book Free Audit"-style buttons.

---

## Services — `/services`
**File:** `src/pages/Services.tsx`
**Meta Title:** AI Automation, Performance Marketing & SEO Services | Qala Labs
**Meta Description:** Enterprise AI agents, SEO/AEO/GEO, Meta & Google Ads, creative production, and server-side analytics — full-service AI and growth agency for ambitious brands.
**Meta Keywords:** None

**Content Summary:**
- Eyebrow: "Our Capabilities"
- H1: "Full-Service AI & Growth Agency Services."
- Body: "From enterprise AI automation to SEO/AEO/GEO and performance marketing — we build end-to-end revenue engines that combine intelligent systems with aggressive media buying and data-driven creative."
- Renders `<ServicesGrid />` (service cards, see Service Detail below).
- Closing CTA: "Proof of Work" → H2 "See these services in action." Body: "From 28x ROAS on Meta Ads to 3.4M organic YouTube views and enterprise AI automation deployments — real results across industries." CTA: "View Case Studies" → `/case-studies`

---

## Service Detail — `/services/:slug`
**File:** `src/pages/ServiceDetail.tsx`
**Meta Title:** Dynamic per service (e.g. "AI Search Visibility", "Enterprise AI Automation", "Performance Marketing", "AI Creative Production", "Web Development", "CRO + Retention Engineering", "Analytics & Data", "eCommerce Growth", "Social Media Management")
**Meta Description:** Dynamic — each service's own unique description (e.g. for `ai-automation`: "B2B and SaaS teams using AI marketing see 4.2× average ROI...")
**Meta Keywords:** None

**Content Summary:**
- H1: service title; badge "Service Detail"
- Body: service description paragraph
- Benchmark stat badge (e.g. "3× Organic Visibility", "80% Efficiency Lift", "ROAS 28x", "3× Ad Engagement", "<1s Load Time", "+42% CVR Lift", "100% Accuracy", "310% YoY Growth", "12% Avg. Engagement")
- H2: "What's Included" — 5–8 bulleted features per service
- "Our Process" sidebar — 3-step process per service
- CTA: "Book Free Audit" → `/contact`
- 9 services: `seo-aeo-geo`, `social-media`, `ai-automation`, `performance`, `creative`, `web-dev`, `cro`, `data`, `strategy`

---

## Case Studies — `/case-studies`
**File:** `src/pages/CaseStudies.tsx`
**Meta Title:** DTC Ecommerce Case Studies India | Proven Revenue Growth | Qala Labs
**Meta Description:** Real results from real DTC brands — 28x ROAS, 11.2x Amazon ROAS, 5M+ viral reach. See how Qala Labs builds scale engines for ecommerce brands in India.
**Meta Keywords:** None

**Content Summary:**
- Badge: "The Proof is in the P&L"
- H1: "Proven Results."
- Body: "We don't just promise growth. We engineer it. Explore our 8-figure success stories and the data behind them."
- Filterable grid (featured: Nutrivend UK, Trotr, Gaffar India, Kashmiri Sound; plus DB-driven studies), category filter pills
- Closing CTA: H2 "Is your brand ready for an 8-figure scale?" Body: "Take our 2-minute scale potential assessment and get a custom 90-day roadmap." CTA: "Take the Scale Quiz" → `/quiz`

---

## Case Study Detail — `/case-studies/:slug`
**File:** `src/pages/CaseStudyDetail.tsx`
**Meta Title:** Dynamic — `study.title` (Supabase `case_studies` table)
**Meta Description:** Dynamic — `study.description`
**Meta Keywords:** None

**Content Summary:**
- H1: study title; category badge
- Video/image hero, metrics grid, dynamic content blocks (text, charts, galleries)
- "What We Learned" myth/reality section (when present)
- Closing CTA: "Ready to build your own scale engine?" → "Book Your Free Audit" → `/contact`

---

## Kashmiri Music Case Study — `/case-studies/kashmiri-movement`
**File:** `src/pages/KashmiriMusicCaseStudy.tsx`
**Meta Title:** Kashmiri Music Organic Growth Case Study: 3.4M Views
**Meta Description:** How Qala Labs launched Mystic Studio 8 as a digital-first Kashmiri music label, earning 3.4M+ YouTube views, 25.7K subscribers, and zero paid ad spend.
**Meta Keywords:** None *(JSON-LD schema field, not a meta tag, includes: "Kashmiri music marketing case study, organic YouTube growth, music label launch, creator-led content, Qala Labs")*

**Content Summary:**
- Badge: "Case Study: Cultural Movement"
- H1: "The Kashmiri Sound Movement."
- Body: "Importance of storytelling and influencer marketing in social media: How Mystic Studio 8 built a regional powerhouse from scratch in 90 days."
- Metrics: 3.4M+ YouTube views, 25.7K new subscribers, 61% avg. retention, ₹0 paid ad spend
- YouTube embed, organic growth strategy narrative

---

## Trotr Case Study — `/case-studies/Trotr-Meta-Lead-Generation`
**File:** `src/pages/TrotrCaseStudy.tsx`
**Meta Title:** Trotr Meta Lead Generation Case Study: 28x ROAS Travel Funnel
**Meta Description:** See how Qala Labs rebuilt Trotr's Meta lead generation funnel with founder-led storytelling, generating ₹14L revenue and 28x ROAS for a high-ticket Spain travel campaign.
**Meta Keywords:** None

**Content Summary:**
- Badge: "Case Study: Meta Lead Generation"
- H1: "Importance of Storytelling in Scale."
- Body: "How founder-led marketing and a refined funnel turned a failing travel campaign into a high-ticket conversion machine."
- Metrics: ₹14 Lakhs revenue, ₹6,700 CPA, 28x ROAS, ₹1,90,000 AOV
- Instagram Reel embeds; narrative about a failed Turkey campaign pivoting to Spain with founder-led storytelling

---

## Gaffar India Case Study — `/case-studies/gaffar-india-rebrand`
**File:** `src/pages/GaffarCaseStudy.tsx`
**Meta Title:** Ecommerce Rebranding Case Study — Gaffar India | Qala Labs
**Meta Description:** How Qala Labs rebranded Gaffar India from a market stall to a trusted ecommerce marketplace — new visual identity, digital-first positioning, and scalable brand architecture.
**Meta Keywords:** None

**Content Summary:**
- Badge: "Case Study: Brand Identity & Strategy"
- H1: "From Market Stall to Marketplace."
- Body: "Rebranding Gaffar India for scale: Modernizing a local market legacy into a trustworthy digital powerhouse."
- Metrics: 28 Days delivery, 6 asset Kits, +40% seller trust score, 12+ brand touchpoints
- Before/after logo comparison

---

## Nutrivend UK Case Study — `/case-studies/Meta-Lead-Generation-Ad-UK-Market`
**File:** `src/pages/NutrivendUKCaseStudy.tsx`
**Meta Title:** Not fully captured in extraction pass; page is themed around "Nutrivend UK: B2B Market Validation" (consistent with "45 B2B Leads • 71% Untapped Market" positioning used on the Case Studies card)
**Meta Description:** Not captured; themed around B2B market validation and untapped market expansion
**Meta Keywords:** None

**Content Summary:**
- "Blue Ocean Expansion" donut chart: 71% Untapped Market (MMA/Rugby/Crossfit segment vs. Commercial Gyms)
- "Velocity" stat: 78% (51% immediate urgency + 27% within current quarter)
- "Account Size Penetration" bar chart (1 Site / 2–5 Sites / 20+ Sites)
- Imagery: training/gym, personal trainer, vending scenes
- Theme: B2B market validation, untapped segment discovery, account-size expansion in UK market for a health/wellness vending brand

---

## BNPL Strategy Blog Post — `/blog/why-bnpl-core-payment-strategy-india`
**File:** `src/pages/BNPLStrategy.tsx`
**Meta Title:** Why BNPL Should Be Every D2C Brand's Core Payment Strategy in India | Qala Labs
**Meta Description:** BNPL cuts RTO, lifts AOV, and eliminates COD friction for D2C brands in India. A data-backed playbook for implementing Buy Now Pay Later to scale conversions and reduce reverse logistics.
**Meta Keywords:** None

**Content Summary:**
- Badge: "Payment Strategy • 8-Figure Framework"
- H1: "Why BNPL should be every D2C founder's core payment strategy in India."
- Byline: Aashirwad Bhansali
- Benefits (4 cards): Reduces RTO, Eliminates Cash Pain, Cuts Fraud, Lifts AOV
- Long-form image/graphics-driven article body

---

## Portfolio — `/portfolio`
**File:** `src/pages/Portfolio.tsx`
**Meta Title:** Creative Portfolio | UGC, Influencer & Ecommerce Marketing Work | Qala Labs
**Meta Description:** Browse Qala Labs' portfolio — Amazon Ads, playR influencer campaigns, UGC content, AI ad creatives, merchandise design, and real estate platforms for DTC brands.
**Meta Keywords:** None

**Content Summary:**
- Eyebrow: "Proof of Concept"
- H1: "The Creative Edge."
- Body: "From the #WhistlePodu army for playR to high-ticket real estate lead generation, we deploy creative that doesn't just look good—it converts."
- Renders `<PortfolioGrid />`

---

## Portfolio Detail — `/portfolio/:slug`
**File:** `src/pages/PortfolioDetail.tsx`
**Meta Title:** Dynamic — `project.title` (Supabase `portfolio_projects`); description/image not set on this SEO call (falls back to site defaults)
**Meta Description:** Not set (default)
**Meta Keywords:** None

**Content Summary:**
- H1: project title, category badge
- Slider/hero images, optional Instagram reel embeds, proof images
- Metrics grid, "Project Info" panel (category/location/software/date/client/platform)
- Dynamic content blocks
- Closing CTA: "Ready to dominate your vertical?" / "Let's build your scale engine." with "Visit Website" and "Book Your Free Audit" buttons

---

## Amazon Ads Portfolio — `/portfolio/Amazon-ads`
**File:** `src/pages/AmazonAdsPortfolio.tsx`
**Meta Title:** Amazon Ads Agency India — 11.2x ROAS Apparel Case Study | Qala Labs
**Meta Description:** How Qala Labs scaled Amazon Sponsored Ads for an Indian apparel brand to 11.2x ROAS and ₹2.7L+ monthly sales using campaign segmentation and search term mining.
**Meta Keywords:** None

**Content Summary:**
- Badge: "Sponsored Products & Sponsored Display"
- H1: "Amazon Ads: Performance Scaling for Apparel Brand"
- Metrics: 11.2x top campaign ROAS, ₹2.7L+ monthly sales, 6.5+ account ROAS, Apparel category

---

## Instagram UGC Portfolio — `/portfolio/Instagram-user-generated-content`
**File:** `src/pages/InstagramUGCPortfolio.tsx`
**Meta Title:** UGC Content Agency India — Instagram Creator Campaign | Qala Labs
**Meta Description:** How Qala Labs produced creator-led UGC content for playR to drive product relatability and ecommerce conversions on Instagram — authentic, scroll-stopping, performance-tested.
**Meta Keywords:** None

**Content Summary:**
- Badge: "The Try on campaign"
- H1: "Style Meets Real Life."
- Metrics: 100K+ total views, 5K+ saves, 8.4% engagement, 12% conversion lift
- 4 Instagram reel embeds

---

## CSK/playR Influencer Portfolio — `/portfolio/influencer-marketing-campaign-playR`
**File:** `src/pages/CSKInfluencerPortfolio.tsx`
**Meta Title:** Influencer Marketing Case Study - playR IPL Campaign 5M+ Reach | Qala Labs
**Meta Description:** How Qala Labs drove 5M+ reach and 12% engagement for the playR jersey drop using real-fan UGC and influencer marketing - without a single paid placement.
**Meta Keywords:** None

**Content Summary:**
- Badge: "Behind the playR jersey drop"
- Metrics: 5M+ viral reach, 12% engagement, 35% conversion lift, 500+ fan reels
- 6 Instagram reel embeds
- Note: old slug `/portfolio/influencer-marketing-campaign-chennai-super-kings` now redirects here

---

## Capital Keys Portfolio — `/portfolio/real-estate-website-development`
**File:** `src/pages/CapitalKeysPortfolio.tsx`
**Meta Title:** Luxury Real Estate Website Development — Capital Keys | Qala Labs
**Meta Description:** How Qala Labs built Capital Keys' full-stack real estate platform — property listings, lead capture dashboards, CRM integration, and a custom admin panel.
**Meta Keywords:** None

**Content Summary:**
- Badge: "Full-Stack Web Development"
- H1: "Capital Keys: Premium Real Estate Engine."
- Body: "We developed a complete digital ecosystem for Capital Keys, a premium India-based real estate platform. From high-converting listings to advanced lead intelligence dashboards."
- Metrics: 17+ leads (30 days), 64.7% conversion rate, India/Real-Estate market focus, Full CMS system

---

## WWF India Portfolio — `/portfolio/ai-ad-creatives-wwfindia`
**File:** `src/pages/WWFIndiaPortfolio.tsx`
**Meta Title:** AI Ad Creatives for NGO — WWF India Awareness Campaign | Qala Labs
**Meta Description:** How Qala Labs used AI image generation to produce high-impact, low-cost awareness campaign creatives for WWF India — scaling visual output without scaling the budget.
**Meta Keywords:** None

**Content Summary:**
- Metrics: -80% production time, 42% engagement lift, 3.8% CTR, AI Creative category
- Creative showcase: "The Guardian," "Ecosystem Harmony," "Future Conservation" — AI-generated wildlife/conservation imagery

---

## Blog — `/blog`
**File:** `src/pages/Blog.tsx`
**Meta Title:** DTC Growth Insights & Performance Marketing Strategy | Qala Labs
**Meta Description:** Expert playbooks on scaling DTC brands in India — CAC reduction, ROAS improvement, Meta Ads, AI automation, and ecommerce growth strategy.
**Meta Keywords:** None

**Content Summary:**
- H1: "Insights for the 1%"
- Body: "We share the exact frameworks we use to scale brands to 8-figures. No fluff, just data."
- Featured post (hardcoded BNPL post) + DB-driven post grid with categories, read time, "Read Full Article"/"Read More" CTAs

---

## Blog Detail — `/blog/:slug`
**File:** `src/pages/BlogDetail.tsx`
**Meta Title:** Dynamic — `post.title` (Supabase `blog_posts`)
**Meta Description:** Dynamic — `post.excerpt`
**Meta Keywords:** None

**Content Summary:**
- H1: post title, category badge, author "Qala Strategy Team", date, read time, share button
- Rendered HTML body (`post.content`)
- Closing CTA: "Ready to apply these frameworks to your brand?" → "Book Free Audit" → `/contact`

---

## Pricing — `/pricing`
**File:** `src/pages/Pricing.tsx`
**Meta Title:** Performance Marketing Agency Pricing India | Qala Labs
**Meta Description:** Transparent, performance-based pricing for DTC brands in India. From ₹1.5L/month growth packages to full-scale market domination. No hidden fees.
**Meta Keywords:** None

**Content Summary:**
- H1: "Investment in Scale."
- Body: "No hidden fees. No fluff. Just performance-based pricing designed to align our success with your revenue growth."
- 3 tiers: Growth Engine (₹1.5L/mo), Market Dominator (₹3.5L/mo, "Most Popular"), Enterprise (Custom)
- Feature comparison table
- CTA: "Book a free growth audit" → `/contact`

---

## Contact — `/contact`
**File:** `src/pages/Contact.tsx`
**Meta Title:** Book a Free Growth Audit | DTC Performance Marketing Agency India
**Meta Description:** Get a free 15-minute performance audit and 90-day revenue growth plan for your DTC brand. Meta Ads, Google Shopping, Amazon, AI automation — we cover it all.
**Meta Keywords:** None

**Content Summary:**
- H1: "Let's Build Your Scale Engine."
- Body: "We only partner with brands we know we can scale. Fill out the form to see if you're a fit for our 8-figure framework."
- Contact info: hello@qalalabs.com, +91 60067 60151, New Delhi address; LinkedIn/Instagram links
- Lead capture form (name, email, phone, website, service, revenue, message) — submits to Supabase edge function + `/api/lead.php`
- Embedded Google Map
- CTA: "Send Audit Request"

---

## Tools — `/tools`
**File:** `src/pages/Tools.tsx`
**Meta Title:** Free DTC Growth Tools & ROAS Calculators | Qala Labs
**Meta Description:** Free calculators for DTC brands in India — ROAS estimator, CAC calculator, LTV:CAC ratio tool, and ad spend planner. Plan your path to 8-figure revenue.
**Meta Keywords:** None

**Content Summary:**
- H1: "Growth Tools"
- Body: "Data-driven calculators built on the same frameworks we use to scale our 8-figure partners."
- Tabbed tools: Ecommerce Cost Calculator, ROI Calculator, Profitability Estimator, LTV:CAC Unit Economics
- Closing CTAs: "Not sure which service you actually need?" → `/service-finder`; "Need a custom growth model?" → `/contact`

---

## Quiz — `/quiz`
**File:** `src/pages/Quiz.tsx`
**Meta Title:** Is Your DTC Brand Ready to Scale? Free Quiz | Qala Labs
**Meta Description:** Take our 2-minute DTC scale-readiness quiz and get a personalised 90-day growth roadmap. Find out what's holding back your ROAS, CAC, and revenue growth.
**Meta Keywords:** None

**Content Summary:**
- H1: "Is your brand ready to scale?"
- Body: "Take the 2-minute assessment used by 8-figure brands to audit their growth infrastructure."
- Renders `<ScaleQuiz />` interactive component

---

## Service Finder — `/service-finder`
**File:** `src/pages/ServiceFinder.tsx`
**Meta Title:** Which Growth Service Do You Need? Free Diagnosis | Qala Labs
**Meta Description:** Tell us what's slowing your growth down and get matched to the exact Qala Labs service that fixes it — traffic, conversion, automation, creative, or strategy.
**Meta Keywords:** None

**Content Summary:**
- H1: "Not sure what you actually need?"
- Body: "Tell us what's broken. We'll tell you exactly which service fixes it — no generic sales pitch."
- Renders `<ServiceFinder />` interactive component

---

## About — `/about`
**File:** `src/pages/About.tsx`
**Meta Title:** About Qala Labs | Full-Service AI Growth Agency India
**Meta Description:** Qala Labs is India's full-service AI growth agency — combining performance marketing, AI automation, and AI search visibility. Rigorous research, hands-on execution, measurable revenue growth.
**Meta Keywords:** None

**Content Summary:**
- Composed of sections: AboutHero ("Book" and "Case Pack" CTAs/modals), AboutKPIs, AboutPrinciples, SuccessFramework, PlatformStack, AboutProcess, AboutResearch, Team, FAQ (shared with Home), ClosingCTA
- Theme: agency credibility — KPIs, principles, success framework, platform/tech stack, process, research rigor, team bios, FAQ, closing CTA

---

## Career — `/career`
**File:** `src/pages/Career.tsx`
**Meta Title:** Careers at Qala Labs | Join a DTC Performance Marketing Agency India
**Meta Description:** Work on 8-figure DTC brands — Meta Ads, AI automation, UGC, ecommerce. Join Qala Labs and build the next generation of revenue growth engines.
**Meta Keywords:** None

**Content Summary:**
- Badge: "We're Hiring"
- H1: "Join the Scale Engine."
- 9 open roles (Video Editor, Copywriter, Content Creator/UGC, Automation Specialist, Ecommerce Manager, Digital Marketing Manager, Graphic Designer, Vibe Coder), each with salary range (₹30,000–₹40,000), type (Full-time/On-site), responsibilities, requirements
- Includes JobPosting JSON-LD schema
- CTAs: "View Details" (modal), "Apply Now" (application modal with resume upload)

---

## Agency Network — `/agency-network`
**File:** `src/pages/AgencyNetwork.tsx`
**Meta Title:** Agency Partner Network | Collaborate with a DTC Growth Agency India | Qala Labs
**Meta Description:** Freelancers, performance marketers, and growth consultants: join Qala Labs' partner network and collaborate on high-impact DTC ecommerce projects.
**Meta Keywords:** None

**Content Summary:**
- Composed of: NetworkHero, NetworkStats, NetworkBenefits, NetworkForm + shared ClosingCTA (customized: "Not an agency or freelancer? No problem." pointing to Creator Collective)

---

## Creator Collective — `/creator-collective`
**File:** `src/pages/CreatorCollective.tsx`
**Meta Title:** Creator Collective | UGC & Influencer Marketing for DTC Brands India | Qala Labs
**Meta Description:** Creators and influencers: join Qala Labs' Creator Collective to make UGC content for India's fastest-growing DTC ecommerce brands. Paid collabs, performance data, creative freedom.
**Meta Keywords:** None

**Content Summary:**
- Badge: "The Collective"
- H1: "Creators of Impact."
- Body: "We bridge the gap between elite creators and 8-figure brands. No boring scripts, just authentic storytelling that converts."
- "Why join?" — Creative Freedom, Premium Brands, Performance Data; "100+ creators joined" social proof
- Onboarding form: platforms (Instagram, TikTok, YouTube, Facebook, Threads, Quora, Reddit, Discord), average payouts (reel/static/carousel), barter acceptance
- CTA: "Submit Onboarding"

---

## AI Search Visibility — `/ai-search-visibility`
**File:** `src/pages/AISearchVisibility.tsx`
**Meta Title:** AI Search Visibility | SEO + AEO + GEO Agency India | Qala Labs
**Meta Description:** India's first full-service SEO, AEO (Answer Engine Optimisation), and GEO (Generative Engine Optimisation) agency. Own search across Google, ChatGPT, Perplexity, and AI Overviews.
**Meta Keywords:** None

**Content Summary:**
- H1: "Own Every Surface Where Search Happens."
- Body: "Google AI Overviews. ChatGPT. Perplexity. Voice search... We do SEO, AEO, and GEO so you win everywhere."
- Stats bar: 60%+ zero-click searches, 40% Gen Z use TikTok/AI as primary search, 1B+ ChatGPT users, 3x more qualified traffic from AEO
- "The Problem" section: old playbook vs. what's happening vs. Qala Labs approach (3-column comparison)
- "Three Pillars": SEO, AEO, GEO — each with description and sub-items
- Services grid: AI Search Audit, Entity Building, Content Strategy, Technical Optimisation, Monthly Reporting, Competitor Gap Analysis
- FAQ accordion (5 Q&As on AEO/GEO/SEO differences)
- CTA: "Get Free AI Visibility Audit" → `/ai-audit`, "Talk to Our Team" → `/contact`

---

## Enterprise AI Automation — `/enterprise-ai-automation`
**File:** `src/pages/EnterpriseAIAutomation.tsx`
**Meta Title:** Enterprise AI Automation Agency India | AI Agents & Workflow Automation | Qala Labs
**Meta Description:** Build enterprise AI agents that automate lead qualification, reporting, customer support, and marketing workflows. India's specialist AI automation agency for B2B and enterprise brands.
**Meta Keywords:** None

**Content Summary:**
- H1: "AI Agents That Work While You Sleep."
- Body: "We design, build, and deploy custom AI automation systems for enterprise and high-growth brands — replacing manual workflows with intelligent agents that scale without headcount."
- Metrics bar: 80% reduction in manual reporting, 24/7 AI agents, 3x faster lead qualification, ₹40L+ annual savings
- 6 use cases: AI Lead Qualification, Automated Reporting & Analytics, Customer Support AI, Data Pipeline Automation, Marketing Workflow Automation, Internal Knowledge Agents
- 4-step process: Discovery & Mapping, Architecture & Design, Build & Deploy, Monitor & Optimise
- Tech stack: Claude, GPT-4o, Gemini Pro, LangChain, n8n, Zapier, Make.com, Supabase, etc.
- Security section: "Enterprise security & compliance by default"
- CTA: "Request Enterprise Proposal" → `/contact`, "Get Free AI Audit" → `/ai-audit`

---

## Industries — `/industries`
**File:** `src/pages/Industries.tsx`
**Meta Title:** Industry-Specific Marketing & AI Solutions | Real Estate, SaaS, D2C, B2B | Qala Labs
**Meta Description:** Qala Labs builds tailored AI and performance marketing strategies for Real Estate, SaaS, D2C, and B2B brands. Vertical expertise, measurable outcomes.
**Meta Keywords:** None

**Content Summary:**
- H1: "We Know Your Market."
- Body: "Generic marketing gets generic results. We build category-specific strategies for Real Estate, SaaS, D2C, and B2B brands..."
- Interactive industry switcher (4 tabs), each with headline, description, 3 stats, services list, "who we work with" tags:
  - Real Estate: ₹12 avg CPL, 4.2x ROAS, 68% lead-to-visit
  - SaaS: 2.8x trial signups, 55% CAC reduction, #1 AI search visibility
  - D2C: 28x ROAS, 3.4M YouTube views, 4.1x avg blended ROAS
  - B2B: 3x faster MQL-to-SQL, 40% lower CPL, 6–8wk to first opportunity
- Industries strip (all 4 as clickable cards)
- CTA: "Get Free Growth Audit" → `/ai-audit`

---

## AI Audit — `/ai-audit`
**File:** `src/pages/AIAudit.tsx`
**Meta Title:** Free AI Growth Audit | 15-Minute Strategy Session | Qala Labs
**Meta Description:** Get a free, personalised AI growth audit from Qala Labs. We'll audit your paid ads, SEO, AI search visibility, and analytics — and deliver 5 quick wins within 48 hours.
**Meta Keywords:** None

**Content Summary:**
- H1: "Find Your Biggest Growth Lever."
- Body: "Most brands are wasting 30–50% of their marketing budget without knowing it. Our free AI Growth Audit identifies where you're losing money..."
- Lead form (name, phone, email, website, industry, revenue, biggest challenge) — submits to Supabase edge function + `/api/lead.php`
- "What's Inside": AI Search Visibility Score, Channel Efficiency Analysis, 5 Immediate Quick Wins, Growth Roadmap
- 4-step "How it works" process
- Social proof testimonials (3 quotes)
- CTA: "Get My Free Audit"

---

## Results — `/results`
**File:** `src/pages/Results.tsx`
**Meta Title:** Results & Performance Metrics | Qala Labs Agency Proof
**Meta Description:** Real campaign results from Qala Labs: 28x ROAS on Meta Ads, 3.4M YouTube views, ₹12 CPL for real estate, 80% reporting time saved with AI automation. Numbers that speak for themselves.
**Meta Keywords:** None

**Content Summary:**
- H1: "Numbers That Don't Lie."
- Body: "Every number below is from a real campaign, a real client, and a real outcome..."
- Hero stats grid (6 tiles): 28x ROAS, 3.4M YouTube views, ₹12 CPL, 80% reduction in reporting hours, 4.1x avg blended ROAS, 48hr avg AI citation time
- Tabbed campaign breakdown by category: Performance Marketing, AI Search & SEO, AI Automation, Creative & Influencer — result cards (metrics + description + tags)
- "Performance by industry" benchmark grid (D2C, Real Estate, SaaS, B2B)
- CTA: "Get Free Audit" → `/ai-audit`, "Talk to Our Team" → `/contact`

---

## Privacy Policy — `/privacy`
**File:** `src/pages/Privacy.tsx`
**Meta Title:** Privacy Policy | Qala Labs
**Meta Description:** None set (SEO called with title only — falls back to site default description)
**Meta Keywords:** None

**Content Summary:**
- H1: "Privacy Policy" (Last updated: June 10, 2026)
- 15 numbered sections: Introduction, Information We Collect, Meta Pixel & Third-Party Tracking, How We Use Info, How We Share Info, Data Retention, Privacy Rights (GDPR/CCPA), Data Security, International Data Transfers, Children's Privacy, Third-Party Links, Marketing Communications, CCPA Disclosure, Changes to Policy, Contact Us, Data Protection Officer
- Contact: privacy@qalalabs.com, dpo@qalalabs.com

---

## Terms of Service — `/terms`
**File:** `src/pages/Terms.tsx`
**Meta Title:** Terms of Service | Qala Labs
**Meta Description:** None set (falls back to default)
**Meta Keywords:** None

**Content Summary:**
- H1: "Terms of Service" (Last updated: June 10, 2026)
- 20 numbered sections: Acceptance of Terms, Use License & Restrictions, IP Rights, Account Registration, Services & Products, Pricing & Payment, Limitation of Liability, Disclaimer of Warranties, Indemnification, Third-Party Links, Professional Advice Disclaimer, Confidentiality, Cookies & Tracking, Governing Law, Dispute Resolution, Termination, Changes to Terms, Entire Agreement, Contact Info, Acknowledgment
- Contact: legal@qalalabs.com, support@qalalabs.com

---

## 404 Not Found — `*` (utility page)
**File:** `src/pages/NotFound.tsx`
**Meta Title:** 404 - Page Not Found
**Meta Description:** None set
**Meta Keywords:** None
**noIndex:** true

**Content Summary:**
- Large "404" decorative heading
- H2: "Lost in the funnel?"
- Body: "The page you're looking for doesn't exist or has been moved to a new growth stage."
- CTAs: "Return Home" → `/`, "Go Back" (browser history)

---

## Dynamic CMS Page — `/p/:slug` (utility, CMS-driven — not a static marketing page)
**File:** `src/pages/DynamicPage.tsx`
**Meta Title:** Dynamic — fetched via `fetchPageSEO(slug)` from Supabase, per-page
**Meta Description:** Dynamic — same source
**Meta Keywords:** None

**Content Summary:**
- No hardcoded content; fetches a `pages`/`page_blocks` record by slug from Supabase and renders via `BlockRenderer`. Falls back to `NotFound` if the page doesn't exist.

---

## Dashboard — `/admin` (utility page, not public marketing content)
**File:** `src/pages/Dashboard.tsx`
**Meta Title:** No `<SEO>` component used
**Content Summary:** Authenticated client/partner dashboard — requires login. Welcome header with "Active Scale Engine" badge; imports ProjectTimeline, TaskBoard, AssetManager, RevenueChart. Not part of public marketing navigation.

---

## Login — `/login` (utility page, not public marketing content)
**File:** `src/pages/Login.tsx`
**Meta Title:** No `<SEO>` component used
**Content Summary:** Supabase Auth UI login form; role-based redirect logic (admin/employee/client) after authentication. No public marketing copy.

---

## Onboarding (not routed in `App.tsx` — internal/preview-only, not public marketing content)
**File:** `src/pages/Onboarding.tsx`
**Meta Title:** Onboarding Sequence
**Meta Description:** What to expect after joining the Qala Labs scale engine.
**Meta Keywords:** None

**Content Summary:**
- Mock 3-email onboarding sequence timeline (Welcome email, Asset Collection Day 1, Strategy Locked Day 3) — internal client-onboarding communication preview.
