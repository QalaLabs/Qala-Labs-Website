"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import BlockRenderer from '@/components/cms/BlockRenderer';
import HomeHero from '@/components/home/HomeHero';
import { supabase } from '@/integrations/supabase/client';
import { Page, Block, BlockType } from '@/types/editor';
import LoadingScreen from '@/components/layout/LoadingScreen';
import { fetchPageSEO, SEOData } from '@/utils/seoFetcher';

const CACHE_KEY_PAGE = 'qala_home_page_cache_v1';
const CACHE_KEY_SEO = 'qala_home_seo_cache_v1';

const getInitialPage = (): Page | null => {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(CACHE_KEY_PAGE);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const getInitialSEO = (): SEOData | null => {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(CACHE_KEY_SEO);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const Index = () => {
  const [page, setPage] = useState<Page | null>(getInitialPage);
  const [seo, setSeo] = useState<SEOData | null>(getInitialSEO);

  useEffect(() => {
    let isMounted = true;
    const fetchHome = async () => {
      try {
        const [seoData, pageRes] = await Promise.all([
          fetchPageSEO('home'),
          supabase.from('pages').select('*').eq('slug', 'home').single()
        ]);

        if (!isMounted) return;

        if (seoData) {
          setSeo(seoData);
          try {
            localStorage.setItem(CACHE_KEY_SEO, JSON.stringify(seoData));
          } catch {}
        }

        if (pageRes.error || !pageRes.data) return;

        // Fetch blocks in parallel if page is found
        const { data: blocksData } = await supabase
          .from('page_blocks')
          .select('*')
          .eq('page_id', pageRes.data.id)
          .order('sort_order', { ascending: true });

        if (!isMounted) return;

        let blocks: Block[] = [];
        if (blocksData && blocksData.length > 0) {
          blocks = blocksData.map(b => ({
            id: b.id,
            type: b.block_type as BlockType,
            props: b.content_data,
            sort_order: b.sort_order
          }));
        } else if (Array.isArray(pageRes.data.content)) {
          blocks = pageRes.data.content;
        }

        const fullPage: Page = { ...pageRes.data, content: blocks };
        setPage(fullPage);
        try {
          localStorage.setItem(CACHE_KEY_PAGE, JSON.stringify(fullPage));
        } catch {}
      } catch (err) {
        console.error("Error loading homepage data:", err);
      }
    };

    fetchHome();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {seo && (
        <SEO 
          title={seo.title} 
          description={seo.description} 
          image={seo.ogImage}
        />
      )}
      <Navbar />
      <main id="main-content">
        <HomeHero />
        <BlockRenderer
          skipHero
          blocks={
            page?.content?.[0]?.type === 'hero'
              ? page.content.slice(1)
              : page?.content || []
          }
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;