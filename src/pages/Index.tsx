"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import BlockRenderer from '@/components/cms/BlockRenderer';
import { supabase } from '@/integrations/supabase/client';
import { Page } from '@/types/editor';
import { Loader2 } from 'lucide-react';
import CaseStudySnapshots from '@/components/home/CaseStudySnapshots';

const Index = () => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', 'home')
        .single();
      
      if (!error && data) {
        setPage(data);
      }
      setLoading(false);
    };
    fetchHome();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // Fallback to default sections if no CMS page exists yet
  if (!page) {
    return (
      <div className="min-h-screen bg-slate-50">
        <SEO title="Qala Labs | Revenue Growth Agency" />
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
      <SEO 
        title={page.title} 
        description={page.description} 
      />
      <Navbar />
      <main>
        <BlockRenderer blocks={page.content} />
        {/* 
          The CaseStudySnapshots is now correctly configured to show 
          Trotr and Kashmiri Sound by default if no slugs are passed, 
          or we can pass them explicitly here.
        */}
        <CaseStudySnapshots 
          slugs={[
            'Trotr-Meta-Lead-Generation',
            'kashmiri-movement'
          ]} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;