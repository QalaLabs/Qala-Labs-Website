-- Migration 011: Lead security hardening & query performance indexing
-- Date: 2026-09-20
-- Purpose: Restrict lead data access to verified staff and add critical B-tree & GIN indexes

-- 1. Tighten RLS on public.leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and public visitors to insert leads
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads" ON public.leads
  FOR INSERT WITH CHECK (true);

-- Revoke open read access and restrict strictly to verified staff
DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
DROP POLICY IF EXISTS "Staff can view leads" ON public.leads;
CREATE POLICY "Staff can view leads" ON public.leads
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'employee')
    )
  );

-- 2. Performance indexes for lead ingestion and CRM views
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_tool_used ON public.leads (tool_used);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_data_gin ON public.leads USING GIN (data);

-- 3. Content query performance indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies (slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_slug ON public.portfolio_projects (slug);
