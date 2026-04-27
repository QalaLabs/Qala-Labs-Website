"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import BlockRenderer from '@/components/cms/BlockRenderer';
import { supabase } from '@/integrations/supabase/client';
import { Page, Block, BlockType } from '@/types/editor';
import LoadingScreen from '@/components/layout/LoadingScreen';
import { fetchPageSEO, SEOData } from '@/utils/seoFetcher';

const Index = () => {
  const [page, setPage] = useState<Page | null>(null);
  const [seo, setSeo] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      setLoading(true);
      
      try {
        const [seoData, pageRes] = await Promise.all([
          fetchPageSEO('home'),
          supabase.from('pages').select('*').eq('slug', 'home').single()
        ]);

        setSeo(seoData);

        if (pageRes.error || !pageRes.data) {
          setLoading(false);
          return;
        }

        const { data: blocksData } = await supabase
          .from('page_blocks')
          .select('*')
          .eq('page_id', pageRes.data.id)
          .order('sort_order', { ascending: true });

        const blocks: Block[] = (blocksData || []).map(b => ({
          id: b.id,
          type: b.block_type as BlockType,
          props: b.content_data,
          sort_order: b.sort_order
        }));

        setPage({ ...pageRes.data, content: blocks });
      } catch (err) {
        console.error("Error loading homepage:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, []);

  if (loading) {
    return (
      <>
        <SEO
          title="Full-Service AI Growth Agency India | Qala Labs"
          description="India's full-service AI growth agency — combining performance marketing, AI automation, and AI search visibility to build brands that scale."
        />
        <LoadingScreen />
      </>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-slate-50">
        <SEO
          title="Full-Service AI Growth Agency India | Qala Labs"
          description="India's full-service AI growth agency — combining performance marketing, AI automation, and AI search visibility to build brands that scale."
        />
        <Navbar />
        <div className="pt-40 pb-20 text-center px-4">
          <h1 className="text-4xl font-black text-slate-900 mb-6">CMS Initialization Required</h1>
          <p className="text-slate-500 mb-8">Go to Admin {'>'} CMS Pages and click "Import Site Structure" to go live.</p>
          <a href="/admin/pages" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold">Go to Admin</a>
        </div>
        <Footer />
      </div>
    );
  }

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
        <BlockRenderer blocks={page.content} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;