"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Page } from '@/types/editor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import BlockRenderer from '@/components/cms/BlockRenderer';
import { Loader2 } from 'lucide-react';
import NotFound from './NotFound';

const DynamicPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        setError(true);
      } else {
        // If not in preview mode, only show published pages
        if (!isPreview && data.status !== 'published') {
          setError(true);
        } else {
          setPage(data);
        }
      }
      setLoading(false);
    };

    fetchPage();
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
      <SEO 
        title={page.title} 
        description={page.description} 
      />
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