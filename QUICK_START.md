# Quick Start: Content Sync

## ⚡ 2-Minute Setup

### Step 1: Create Database Tables
```bash
# Go to Supabase Dashboard > SQL Editor
# Copy contents of: supabase/migrations/010_content_tables.sql
# Paste and Execute
```

### Step 2: Sync Content
```bash
cd "New folder"
npm run sync-content
```

That's it! All blogs, case studies, and portfolio items are now in Supabase.

---

## What Gets Synced?

✅ **1 Blog Post**
- "Why BNPL should be every D2C founder's core payment strategy in India"

✅ **4 Case Studies**
- Nutrivend UK: B2B Market Validation
- Trotr: Spain Pivot  
- Gaffar India: Marketplace Rebrand
- Kashmiri Sound: Cultural Movement

✅ **7 Portfolio Projects**
- WWF India: AI Ad Creatives
- playR: IPL Merchandise Partner
- World Pickleball League: Apparel
- Capital Keys: Real Estate Platform
- Amazon Ads: Performance Scaling
- Instagram UGC: Authentic Stories
- CSK: Fandom Movement

---

## Verify It Worked

✅ Check Supabase Dashboard:
- blog_posts table: 1 row
- case_studies table: 4 rows
- portfolio_projects table: 7 rows

✅ Check Website:
- `/blog` shows BNPL article
- `/case-studies` shows all 4 case studies
- `/portfolio` shows all 7 projects

---

## Files Created/Updated

1. **supabase/migrations/010_content_tables.sql** - Database schema
2. **sync-content.ts** - Data and sync script
3. **New folder/package.json** - Added `npm run sync-content` command
4. **CONTENT_SYNC_GUIDE.md** - Detailed documentation
5. **QUICK_START.md** - This file

---

## Detailed Docs

See `CONTENT_SYNC_GUIDE.md` for:
- Database schema details
- Troubleshooting
- Adding new content
- Integration with website code

---

**Done!** Your website content is now in Supabase. 🚀
