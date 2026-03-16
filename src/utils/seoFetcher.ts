"use client";

import { supabase } from "@/integrations/supabase/client";

export interface SEOData {
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
}

export const fetchPageSEO = async (slug: string): Promise<SEOData> => {
  // 1. Try to fetch specific page SEO from the pages table
  const { data: pageData } = await supabase
    .from('pages')
    .select('title, description')
    .eq('slug', slug)
    .single();

  // 2. Fetch global defaults from site_settings
  const { data: settingsData } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'global_config')
    .single();

  const globalSEO = settingsData?.value?.seo?.global || {};
  const defaultTitle = globalSEO.site_name || "Qala Labs";
  const defaultDesc = globalSEO.description || "Revenue Growth Agency";

  // 3. Return page-specific data with global fallbacks
  return {
    title: pageData?.title ? `${pageData.title} | ${defaultTitle}` : defaultTitle,
    description: pageData?.description || defaultDesc,
    ogImage: settingsData?.value?.appearance?.logo_url || "/og-image.jpg",
    noIndex: false
  };
};