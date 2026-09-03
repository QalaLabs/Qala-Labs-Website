/**
 * Content Sync Script
 * Syncs all blog posts, case studies, and portfolio items to Supabase
 * Run with: npm run sync-content (after adding to package.json)
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

// Use service role key if available, otherwise use anon key
const supabaseKey = envVars['SUPABASE_SERVICE_ROLE_KEY'] || process.env.SUPABASE_SERVICE_ROLE_KEY ||
                    envVars['SUPABASE_ANON_KEY'] || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(
  envVars['SUPABASE_URL'] || process.env.SUPABASE_URL || '',
  supabaseKey
);

// ============================================================================
// BLOG POSTS DATA
// ============================================================================

const BLOG_POSTS = [
  {
    title: "Why BNPL should be every D2C founder's core payment strategy in India",
    slug: "why-bnpl-core-payment-strategy-india",
    excerpt: "Discover why Buy Now Pay Later (BNPL) is transforming conversion, AOV, and operational health for D2C brands in India.",
    category: "Strategy",
    author: "Qala Strategy Team",
    created_at: "2026-02-16T00:00:00Z",
    image_url: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200",
    content: `
# Why BNPL should be every D2C founder's core payment strategy in India

## The Problem with Traditional Payment Methods

For D2C founders in India, payment friction remains one of the biggest conversion killers. While credit card penetration is growing, the reality is:
- Most D2C customers don't have credit cards
- Debit card EMI options are limited and expensive
- COD (Cash on Delivery) kills margins and increases cart abandonment

## BNPL: The Game Changer

Buy Now Pay Later solutions have fundamentally changed consumer behavior in India. Here's why BNPL should be your core payment strategy:

### 1. Conversion Uplift
BNPL typically increases conversion by 15-30% for D2C brands. When customers see they can pay in installments, cart abandonment drops significantly.

### 2. Average Order Value Increase
Customers are willing to spend more when they can pay in parts. We've seen AOV increases of 20-40% for brands that introduce BNPL.

### 3. Operational Simplicity
Unlike COD, BNPL providers handle collections and defaults. You get paid upfront, and the BNPL provider takes on the risk.

### 4. Customer Data
BNPL providers share customer data, giving you insights into purchase patterns and enabling better targeting for repeat purchases.

## Implementation Strategy

### Step 1: Partner with Multiple Providers
Don't rely on a single BNPL provider. Partner with 2-3 major players (Razorpay, Cashfree, etc.) to maximize reach.

### Step 2: Optimize Checkout Flow
Make BNPL the primary payment option. Feature it prominently in your checkout flow.

### Step 3: A/B Test Messaging
Test different messaging around BNPL installments. "Pay in 3 installments" vs "0% EMI" vs "Split your payment" often have different conversion rates.

### Step 4: Track Key Metrics
- BNPL conversion rate
- BNPL repeat customer rate
- Default rate (work with providers to minimize)
- BNPL customer LTV vs non-BNPL

## The Future

BNPL in India is still in the growth phase. First-mover advantage is real. Brands that optimize their payment strategy now will have a significant edge over competitors in 2026 and beyond.

The brands that win will be those that understand BNPL not just as a payment option, but as a fundamental part of their customer acquisition and retention strategy.
    `
  }
];

// ============================================================================
// CASE STUDIES DATA
// ============================================================================

const CASE_STUDIES = [
  {
    title: "Nutrivend UK: B2B Market Validation",
    slug: "Meta-Lead-Generation-Ad-UK-Market",
    category: "Meta Lead Generation",
    image_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=900",
    description: "How Qala Labs used Meta lead generation and A/B audience engineering to help Nutrivend UK validate untapped B2B fitness facility markets and generate 45 qualified leads.",
    results: {
      headline: "45 B2B Leads • 71% Untapped Market",
      leads: 45,
      market_share: "71%",
      duration: "7 days"
    },
    content: `# Nutrivend UK: B2B Market Validation\n\n## The Challenge\n\nNutrivend, a UK-based B2B nutrition solutions company, approached us with a unique problem: they wanted to expand their market reach into niche fitness segments but weren't sure which segments had the most demand.\n\nTheir current market was commercial gyms, but they suspected there was significant opportunity in MMA facilities, CrossFit boxes, and specialty training centers.\n\n## Our Strategy\n\nInstead of guessing, we built a Meta lead generation campaign designed to test multiple niche fitness audience segments simultaneously.\n\n### Phase 1: Audience Engineering (Days 1-3)\n- Created detailed audience segments for MMA facility owners, CrossFit gym owners, functional fitness trainers, sports science facilities\n- Built custom lookalike audiences from existing customers\n- Set up A/B testing across 8 different audience variations\n\n### Phase 2: Lead Generation (Days 4-7)\n- Launched lead form ads targeting all segments\n- Optimized for lead quality (not just volume)\n- Refined audiences based on daily performance data\n\n## Results\n\n- **45 qualified B2B leads** generated in 7 days\n- **71% of market** was previously untapped\n- **78% purchase intent** velocity for enterprise accounts\n- **Clear segment winners** identified for further expansion\n\n## Key Insights\n\n1. The MMA/specialty fitness segment had 3x more purchase intent than commercial gyms\n2. Decision velocity was critical - accounts with 20+ sites showed highest interest\n3. Founder/owner targeting converted 40% better than facility manager targeting`
  },
  {
    title: "Trotr: Spain Pivot",
    slug: "Trotr-Meta-Lead-Generation",
    category: "Lead Generation",
    image_url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=900",
    description: "How Qala Labs rebuilt Trotr's Meta lead generation funnel with founder-led storytelling, generating ₹14L revenue and 28x ROAS for a high-ticket travel campaign.",
    results: {
      headline: "28x ROAS • ₹14L Revenue",
      roas: 28,
      revenue: "₹1,400,000",
      aov: "₹190,000"
    },
    content: `# Trotr: Spain Pivot - 28x ROAS Travel Lead Generation\n\n## The Challenge\n\nTrotr, a high-ticket group travel company, had launched a campaign for a Spain trip with zero paying customers despite strong metrics.\n\n## The Problem\n\nMost travel ads focus on destination photos, cheap prices, urgency. High-ticket group travel differs: buying community experience + founder credibility + peace of mind.\n\n## Our Solution: Founder-Led Storytelling\n\n### Creative Strategy\n1. **Founder Positioning**: Founder-led content vs generic travel photos\n2. **Social Proof First**: Testimonials from past participants\n3. **Process Transparency**: Trip design & execution\n4. **Value Clarification**: Experience quality over destination\n\n### Media Strategy\n- Shifted to engaged customer lookalikes\n- Sequential story across 5 ads\n- 4x more video than static images\n\n## Results\n\n- **₹14 Lakhs revenue** in first 30 days\n- **28x ROAS** (vs 0x previously)\n- **₹6,700 CPA** for high-ticket leads\n- **AOV: ₹1,90,000**\n- **100% booking conversion** from leads`
  },
  {
    title: "Gaffar India",
    slug: "gaffar-india-rebrand",
    category: "Brand Identity",
    image_url: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=900",
    description: "How Qala Labs rebranded Gaffar India from a market stall to a trusted ecommerce marketplace.",
    results: {
      headline: "Marketplace Rebrand • 6 Asset Kits",
      duration: "28 Days"
    },
    content: `# Gaffar India: Market Stall to Marketplace\n\n## Challenge\n\nLegacy spice brand with centuries of history. Visual identity looked dated on digital, didn't communicate trust to online shoppers.\n\n## Approach\n\nModernize while preserving brand DNA. Keep core name + heritage messaging, modernize visual language for digital platforms, establish trust signals.\n\n## Deliverables\n\n- Primary + secondary logos\n- Color palette & typography\n- Package design system\n- Digital-first asset kit\n- Marketplace interface guidelines\n\n## Results\n\n- **40% increase** in seller trust score\n- **28 days** delivery with full coordination\n- **6 asset packages** for different touchpoints\n- **12+ brand touchpoints** covered`
  },
  {
    title: "Kashmiri Sound",
    slug: "kashmiri-movement",
    category: "Cultural Movement",
    image_url: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?auto=format&fit=crop&q=80&w=900",
    description: "How Qala Labs launched Mystic Studio 8 as a digital-first Kashmiri music label, earning 3.4M+ YouTube views, 25.7K subscribers, and zero paid ad spend.",
    results: {
      headline: "Zero Ad Spend • 25K Subs • 3.4M Views",
      views: "3,400,000",
      subscribers: "25,700",
      ad_spend: "₹0"
    },
    content: `# The Kashmiri Sound Movement\n\n## Challenge\n\nLaunch digital-first Kashmiri music label in market where: Kashmiri music minimal online presence, young Kashmiris consuming Western music, regional channels consolidated. Zero marketing budget.\n\n## Strategy: Cultural Movement, Not Band Launch\n\n### Phase 1: Community Over Audience\n- 12 micro-influencers in Kashmir's creative community\n- Genuine relationships, not transactional\n- Each became content collaborator\n\n### Phase 2: Authenticity-First Content\n- Documented real rehearsals\n- Showed cultural significance\n- Featured emerging artists\n- Built narrative around pride\n\n### Phase 3: Platform Play\n- YouTube (long-form)\n- Instagram Reels (discovery)\n- Cross-promotion with artists\n- Spotify playlists\n\n## Results\n\n- **3.4M+ YouTube views** in 6 months\n- **25,700 subscribers**\n- **61% retention rate** (vs 30% benchmark)\n- **Zero ad spend**\n- **Viral organic growth** in Kashmir`
  },
  {
    title: "playR: Community-Driven Loyalty Revenue",
    slug: "playr-community-loyalty-revenue",
    category: "Community Building",
    image_url: "https://images.unsplash.com/photo-1552667466-07d71e725e34?auto=format&fit=crop&q=80&w=900",
    description: "How Qala Labs built community loyalty ecosystem for playR IPL merchandise, driving repeat purchases and brand advocacy.",
    results: {
      headline: "Community-Led Growth • 45% Repeat Rate",
      engagement: "500+ Active Members",
      retention: "45% Repeat Rate"
    },
    content: `# playR: Community-Driven Loyalty & Revenue\n\n## Strategy\n\nCommunity engagement platform for IPL merchandise. Loyalty points, exclusive drops, fan contests.\n\n## Results\n\n- **500+ engaged collectors**\n- **45% repeat purchase rate**\n- **8x community engagement** vs standard social\n- Sustainable revenue streams beyond one-time merch\n\n## Outcome\n\nTransformed transactional merch into community-driven loyalty engine.`
  }
];

// ============================================================================
// PORTFOLIO PROJECTS DATA
// ============================================================================

const PORTFOLIO_PROJECTS = [
  {
    title: "WWF India: AI Ad Creatives",
    slug: "ai-ad-creatives-wwfindia",
    category: "AI Creative",
    image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    description: "AI-generated ad creative system that reduced production costs by 80% while maintaining brand consistency.",
    result: "80% Lower Production Cost",
    technologies: ["AI", "Generative AI", "Creative Automation"],
    content: `# WWF India: AI Ad Creative System

Developed an AI-powered ad creative generation system for WWF India that:
- Generates on-brand ad variations in seconds
- Maintains 99%+ brand consistency
- Reduced production costs from ₹50,000 per creative to ₹10,000
- Scaled creative output from 2 per week to 50+ per week
- Improved CTR by 23% through rapid A/B testing`
  },
  {
    title: "playR: IPL Merchandise Partner",
    slug: "ipl-merchandise-partner-playr",
    category: "Merchandise Design",
    image_url: "https://images.unsplash.com/photo-1552667466-07d71e725e34?auto=format&fit=crop&q=80&w=800",
    description: "Complete merchandise ecosystem design for 8 IPL franchises, including apparel, accessories, and retail systems.",
    result: "Full Ecosystem • 8 Franchises",
    technologies: ["E-commerce", "Product Design", "Retail Systems"],
    content: `# playR: IPL Merchandise Ecosystem

Designed and executed merchandise system for playR across all 8 IPL franchises:
- Team-specific apparel designs (8 unique collections)
- Retail-ready product specifications
- Wholesale partner guidelines
- Digital merchandising strategy
- Inventory management system
- Generated ₹2.5Cr+ in merchandise revenue across franchises`
  },
  {
    title: "World Pickleball League: Apparel",
    slug: "merchandise-design-apparel",
    category: "Merchandise Design",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    description: "Professional apparel and kit design for World Pickleball League's inaugural season.",
    result: "Full Kit & Retail System",
    technologies: ["Apparel Design", "Retail", "Manufacturing"],
    content: `# World Pickleball League: Official Apparel

Designed complete apparel system for WPL:
- 6 team-specific kits with brand integration
- Performance specification guidelines
- Manufacturing-ready technical packages
- Retail launch plan and partnership strategy
- Became official merchandise partner for the league`
  },
  {
    title: "Capital Keys: Real Estate Platform",
    slug: "real-estate-website-development",
    category: "Web Development",
    image_url: "https://images.unsplash.com/photo-1486324803388-c52646db42da?auto=format&fit=crop&q=80&w=800",
    description: "Full-stack real estate platform with lead generation and CRM integration.",
    result: "17+ Leads • 64.7% Conversion",
    technologies: ["React", "Node.js", "CRM", "Web Development"],
    content: `# Capital Keys: Real Estate Platform

Built comprehensive real estate lead generation platform:
- Property listing database with advanced search
- Lead capture and qualification system
- Integrated CRM for agent management
- Video property tours and 3D walkthroughs
- Generated 17+ qualified leads in first month
- 64.7% conversion rate from lead to viewing`
  },
  {
    title: "Amazon Ads: Performance Scaling",
    slug: "Amazon-ads",
    category: "Performance Marketing",
    image_url: "https://images.unsplash.com/photo-1633356713697-12f330a4f2c7?auto=format&fit=crop&q=80&w=800",
    description: "Amazon advertising optimization and scaling strategy for DTC brands.",
    result: "11.2x ROAS • ₹2.7L Sales",
    technologies: ["Amazon Advertising", "Performance Marketing", "Data Analytics"],
    content: `# Amazon Ads: Performance Scaling

Scaled Amazon advertising for ecommerce brand:
- Keyword research and bid optimization
- Product listing optimization
- Sponsored Products, Brands, and Display campaigns
- Achieved 11.2x ROAS
- Generated ₹2.7L in attributed sales
- Reduced ACOS by 47% over 90 days`
  },
  {
    title: "Instagram UGC: Style Meets Real Life",
    slug: "Instagram-user-generated-content",
    category: "Content Creation",
    image_url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800",
    description: "User-generated content strategy combining authentic customer stories with brand positioning.",
    result: "Relatability Converts Better",
    technologies: ["Content Strategy", "Social Media", "Community Management"],
    content: `# Instagram UGC: Authentic Brand Storytelling

Developed UGC strategy for fashion brand:
- Curated authentic customer content
- Built community contributor program
- Trained customer creators on brand aesthetic
- Increased engagement by 156%
- Generated 340+ pieces of usable content
- Achieved 2.3x higher conversion on UGC vs branded content`
  },
  {
    title: "CSK: Real Fans, Real Roar",
    slug: "influencer-marketing-campaign-chennai-super-kings",
    category: "User Generated Content",
    image_url: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&q=80&w=800",
    description: "Fan engagement campaign for Chennai Super Kings leveraging organic supporter community.",
    result: "Viral Fandom Momentum",
    technologies: ["Influencer Marketing", "Community Engagement", "Social Media"],
    content: `# CSK: Fandom Movement Campaign

Orchestrated viral CSK fan engagement:
- #WhistlePodu campaign reaching 2M+ impressions
- Community creator partnerships with 50+ fan accounts
- Match day activation strategy
- Generated 125M+ organic impressions
- Built sustainable fan community momentum
- Turned casual fans into brand advocates`
  }
];

// ============================================================================
// SYNC FUNCTIONS
// ============================================================================

async function syncBlogPosts() {
  console.log('🔄 Syncing blog posts...');

  for (const post of BLOG_POSTS) {
    const { data, error } = await supabase
      .from('blog_posts')
      .upsert(
        [{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          category: post.category,
          created_at: post.created_at,
          image_url: post.image_url,
          content: post.content,
        }],
        { onConflict: 'slug' }
      );

    if (error) {
      console.error(`❌ Error syncing blog post "${post.title}":`, error);
    } else {
      console.log(`✅ Synced: ${post.title}`);
    }
  }
}

async function syncCaseStudies() {
  console.log('\n🔄 Syncing case studies...');

  for (const study of CASE_STUDIES) {
    // First try to update if exists
    const { data: existingData } = await supabase
      .from('case_studies')
      .select('id')
      .eq('slug', study.slug)
      .single();

    if (existingData) {
      // Update existing
      const { error } = await supabase
        .from('case_studies')
        .update({
          title: study.title,
          category: study.category,
          image_url: study.image_url,
          description: study.description,
          results: study.results,
          content: study.content,
        })
        .eq('slug', study.slug);

      if (error) {
        console.error(`❌ Error updating case study "${study.title}":`, error);
      } else {
        console.log(`✅ Updated: ${study.title}`);
      }
    } else {
      // Insert new
      const { error } = await supabase
        .from('case_studies')
        .insert([{
          title: study.title,
          slug: study.slug,
          category: study.category,
          image_url: study.image_url,
          description: study.description,
          results: study.results,
          content: study.content,
        }]);

      if (error) {
        console.error(`❌ Error syncing case study "${study.title}":`, error);
      } else {
        console.log(`✅ Synced: ${study.title}`);
      }
    }
  }
}

async function syncPortfolio() {
  console.log('\n🔄 Syncing portfolio projects...');

  for (const project of PORTFOLIO_PROJECTS) {
    // First try to update if exists
    const { data: existingData } = await supabase
      .from('portfolio_projects')
      .select('id')
      .eq('slug', project.slug)
      .single();

    if (existingData) {
      // Update existing
      const { error } = await supabase
        .from('portfolio_projects')
        .update({
          title: project.title,
          category: project.category,
          image_url: project.image_url,
          description: project.description,
          technologies: project.technologies,
        })
        .eq('slug', project.slug);

      if (error) {
        console.error(`❌ Error updating portfolio "${project.title}":`, error);
      } else {
        console.log(`✅ Updated: ${project.title}`);
      }
    } else {
      // Insert new
      const { error } = await supabase
        .from('portfolio_projects')
        .insert([{
          title: project.title,
          slug: project.slug,
          category: project.category,
          image_url: project.image_url,
          description: project.description,
          technologies: project.technologies,
        }]);

      if (error) {
        console.error(`❌ Error syncing portfolio "${project.title}":`, error);
      } else {
        console.log(`✅ Synced: ${project.title}`);
      }
    }
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('🚀 Starting content sync...\n');

  try {
    await syncBlogPosts();
    await syncCaseStudies();
    await syncPortfolio();

    console.log('\n✅ Content sync completed successfully!');
    console.log(`
📊 Summary:
  - ${BLOG_POSTS.length} blog post(s)
  - ${CASE_STUDIES.length} case studies
  - ${PORTFOLIO_PROJECTS.length} portfolio projects
    `);
  } catch (error) {
    console.error('❌ Critical error during sync:', error);
    process.exit(1);
  }
}

main();
