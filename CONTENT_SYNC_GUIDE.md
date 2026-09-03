# Content Sync Guide - Qala Labs Website

This document explains how to sync all blog posts, case studies, and portfolio items to the Supabase database.

## 📋 Overview

The website has three main content sections:
- **Blog Posts** - Stored in `blog_posts` table
- **Case Studies** - Stored in `case_studies` table  
- **Portfolio Projects** - Stored in `portfolio_projects` table

## 🗄️ Database Schema

### Migration File
Location: `supabase/migrations/010_content_tables.sql`

This migration creates three tables with the following structure:

#### blog_posts
```sql
- id (UUID, Primary Key)
- title (TEXT, required)
- slug (TEXT, unique, required)
- excerpt (TEXT)
- content (TEXT, full article content)
- image_url (TEXT)
- category (TEXT)
- author (TEXT, default: "Qala Strategy Team")
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- published (BOOLEAN, default: true)
```

#### case_studies
```sql
- id (UUID, Primary Key)
- title (TEXT, required)
- slug (TEXT, unique, required)
- category (TEXT)
- image_url (TEXT)
- description (TEXT)
- results (JSONB - stores metrics like revenue, ROAS, etc.)
- content (TEXT, full case study content)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- published (BOOLEAN, default: true)
```

#### portfolio_projects
```sql
- id (UUID, Primary Key)
- title (TEXT, required)
- slug (TEXT, unique, required)
- category (TEXT)
- image_url (TEXT)
- description (TEXT)
- result (TEXT, key achievement)
- content (TEXT, full project description)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- published (BOOLEAN, default: true)
```

## 📝 Content Data

### Sync Script Location
`sync-content.ts` - Located in the root of the Website directory

This script contains:
- **1 Blog Post**: "Why BNPL should be every D2C founder's core payment strategy in India"
- **4 Case Studies**:
  - Nutrivend UK: B2B Market Validation
  - Trotr: Spain Pivot
  - Gaffar India: Marketplace Rebrand
  - Kashmiri Sound: Cultural Movement
- **7 Portfolio Projects**:
  - WWF India: AI Ad Creatives
  - playR: IPL Merchandise Partner
  - World Pickleball League: Apparel
  - Capital Keys: Real Estate Platform
  - Amazon Ads: Performance Scaling
  - Instagram UGC: Authentic Stories
  - CSK: Fandom Movement

## 🚀 How to Sync Content

### Prerequisites
1. Ensure `.env` file is configured with Supabase credentials:
   ```
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. Install dependencies:
   ```bash
   cd "New folder"
   npm install
   ```

### Step 1: Apply Migration

Apply the database migration to create the tables:

**Option A: Using Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy the contents of `supabase/migrations/010_content_tables.sql`
5. Execute the query

**Option B: Using Supabase CLI**
```bash
supabase migration up
```

### Step 2: Run Sync Script

From the `New folder` directory, run:

```bash
npm run sync-content
```

Expected output:
```
🚀 Starting content sync...

🔄 Syncing blog posts...
✅ Synced: Why BNPL should be every D2C founder's core payment strategy in India

🔄 Syncing case studies...
✅ Synced: Nutrivend UK: B2B Market Validation
✅ Synced: Trotr: Spain Pivot
✅ Synced: Gaffar India
✅ Synced: Kashmiri Sound

🔄 Syncing portfolio projects...
✅ Synced: WWF India: AI Ad Creatives
✅ Synced: playR: IPL Merchandise Partner
✅ Synced: World Pickleball League: Apparel
✅ Synced: Capital Keys: Real Estate Platform
✅ Synced: Amazon Ads: Performance Scaling
✅ Synced: Instagram UGC: Style Meets Real Life
✅ Synced: CSK: Real Fans, Real Roar

✅ Content sync completed successfully!

📊 Summary:
  - 1 blog post(s)
  - 4 case studies
  - 7 portfolio projects
```

## 🔄 How the Website Uses This Data

### Blog Page (`src/pages/Blog.tsx`)
- Fetches from `blog_posts` table
- Displays featured post first
- Shows remaining posts in grid
- Has hardcoded BNPL post that merges with database posts

### Case Studies Page (`src/pages/CaseStudies.tsx`)
- Fetches from `case_studies` table
- Has 4 hardcoded featured studies that merge with database
- Allows filtering by category
- Links to individual case study pages

### Portfolio Page (`src/pages/Portfolio.tsx`)
- Uses `PortfolioGrid` component
- Fetches from `portfolio_projects` table
- Has 7 hardcoded featured projects that merge with database
- Allows filtering by category

## 🔗 Individual Page Components

Each content type has individual page components that display full details:

### Blog Details
- Route: `/blog/:slug`
- Component: `src/pages/BlogDetail.tsx`
- Fetches: Single blog post by slug

### Case Study Details
- Routes:
  - `/case-studies/:slug` (generic detail page)
  - Individual pages like `/case-studies/kashmiri-movement`
- Components: 
  - `src/pages/CaseStudyDetail.tsx` (generic)
  - Individual pages like `KashmiriMusicCaseStudy.tsx`

### Portfolio Details
- Route: `/portfolio/:slug`
- Component: `src/pages/PortfolioDetail.tsx`

## 📊 Hardcoded vs Database Content

The website has a hybrid approach:

### Hardcoded Content (in page files)
- Ensures featured content always displays
- Falls back if database is unavailable
- Provides default imagery

### Database Content
- Allows adding new content without code changes
- Powers the list views
- Can be updated via admin panel (if built)
- Merges with hardcoded content (avoiding duplicates by slug)

## ✏️ Adding New Content

To add new content after initial sync:

### Option 1: Supabase Dashboard
1. Go to your Supabase project
2. Navigate to Tables
3. Select the appropriate table (blog_posts, case_studies, or portfolio_projects)
4. Click "Insert row" and fill in the fields

### Option 2: Update sync-content.ts
1. Add entry to the appropriate array (BLOG_POSTS, CASE_STUDIES, PORTFOLIO_PROJECTS)
2. Run `npm run sync-content` again

### Required Fields
**Blog Posts:**
- title (required)
- slug (required, unique)
- excerpt
- category
- created_at

**Case Studies:**
- title (required)
- slug (required, unique)
- category
- description
- results (JSON object with metrics)

**Portfolio Projects:**
- title (required)
- slug (required, unique)
- category
- description
- result (key achievement)

## 🔍 Verification

After syncing, verify content in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to Table Editor
3. Check each table:
   - `blog_posts` - should have 1 entry
   - `case_studies` - should have 4 entries
   - `portfolio_projects` - should have 7 entries

Or check the website:
- Visit `/blog` - should show featured BNPL post + database posts
- Visit `/case-studies` - should show all 4 case studies
- Visit `/portfolio` - should show all 7 projects

## 🐛 Troubleshooting

### "SUPABASE_URL is missing"
- Ensure `.env` file exists with `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Check you're in the correct directory (`New folder`)

### "Failed to connect to Supabase"
- Verify Supabase credentials are correct
- Check your Supabase project is active
- Ensure you have internet connection

### "Duplicate key error"
- Some entries may already exist (upsert will update them)
- Check Supabase dashboard to verify

### Content not appearing on website
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors
- Verify data in Supabase dashboard

## 📚 Related Files

- **Sync Script:** `sync-content.ts`
- **Migration:** `supabase/migrations/010_content_tables.sql`
- **Blog Page:** `New folder/src/pages/Blog.tsx`
- **Case Studies Page:** `New folder/src/pages/CaseStudies.tsx`
- **Portfolio Page:** `New folder/src/pages/Portfolio.tsx`
- **Blog Detail Component:** `New folder/src/components/layout/BlogDetail.tsx`
- **Portfolio Grid:** `New folder/src/components/portfolio/PortfolioGrid.tsx`

## 📝 Next Steps

1. ✅ Apply the migration (010_content_tables.sql)
2. ✅ Run the sync script (`npm run sync-content`)
3. ✅ Verify content in Supabase dashboard
4. ✅ Test website pages to see content appear
5. Consider building an admin panel for content management

---

For questions or issues, refer to the sync-content.ts file for the complete data structure.
