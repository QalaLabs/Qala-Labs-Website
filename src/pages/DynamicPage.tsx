"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Page, Block, BlockType } from '@/types/editor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import BlockRenderer from '@/components/cms/BlockRenderer';
import { Loader2 } from 'lucide-react';
import NotFound from './NotFound';
import { fetchPageSEO, SEOData } from '@/utils/seoFetcher';

const DynamicPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  
  const [page, setPage] = useState<Page | null>(null);
  const [seo, setSeo] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPageData = async () => {
      if (!slug) return;
      setLoading(true);
      
      try {
        // Fetch SEO and Page Content in parallel
        const [seoData, pageRes] = await Promise.all([
          fetchPageSEO(slug),
          supabase.from('pages').select('*').eq('slug', slug).single()
        ]);

        setSeo(seoData);

        if (pageRes.error || !pageRes.data) {
          setError(true);
          return;
        }

        if (!isPreview && pageRes.data.status !== 'published') {
          setError(true);
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
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [slug, isPreview]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !page) {
    return <NotFound />;
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
      
      <main className="pt-20">
        {isPreview && (
          <div className="bg-amber-500 text-white text-center py-2 text-xs font-black uppercase tracking-widest sticky top-20 z-40">
            Preview Mode — Changes are not live
          </div>
        )}
        <BlockRenderer blocks={page.content} />
      </main>

      <Footer />
    </div>
  );
};

export default DynamicPage;