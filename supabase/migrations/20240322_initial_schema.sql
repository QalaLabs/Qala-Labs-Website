-- Enable RLS on all tables
-- Profiles table (already partially defined, ensuring completeness)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  tool_used TEXT,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view leads" ON public.leads
  FOR SELECT TO authenticated USING (true);

-- Services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  metric TEXT,
  icon_name TEXT,
  slug TEXT UNIQUE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view services" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Case Studies table
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  video_url TEXT,
  results JSONB DEFAULT '{"headline": "", "metrics": [], "learnings": []}'::jsonb,
  content JSONB DEFAULT '{"blocks": []}'::jsonb,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view case studies" ON public.case_studies
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage case studies" ON public.case_studies
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Portfolio Projects table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  video_url TEXT,
  website_url TEXT,
  metrics JSONB DEFAULT '[]'::jsonb,
  project_info JSONB DEFAULT '{}'::jsonb,
  slider_images JSONB DEFAULT '[]'::jsonb,
  instagram_reels JSONB DEFAULT '[]'::jsonb,
  proof_images JSONB DEFAULT '[]'::jsonb,
  content JSONB DEFAULT '{"blocks": []}'::jsonb,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view portfolio" ON public.portfolio_projects
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage portfolio" ON public.portfolio_projects
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Blog Posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT,
  status TEXT DEFAULT 'draft',
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage posts" ON public.blog_posts
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Pages table (CMS)
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'draft',
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published pages" ON public.pages
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage pages" ON public.pages
  FOR ALL TO authenticated USING (auth.uid() = user_id);