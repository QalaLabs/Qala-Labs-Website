"use client";

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2, User, Loader2, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { format } from 'date-fns';
import { showSuccess } from '@/utils/toast';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error || !data) {
        navigate('/blog');
      } else {
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug, navigate]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showSuccess("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO title={post.title} description={post.excerpt} image={post.image_url} />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-blue-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">
              {post.category || "Strategy"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-500 mb-12 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <User className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-900">Qala Strategy Team</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(post.created_at), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
              <button 
                onClick={handleShare}
                className="ml-auto p-3 hover:bg-slate-50 rounded-2xl transition-colors border border-slate-100"
                aria-label="Share article"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {post.image_url && (
              <div className="rounded-[3rem] overflow-hidden h-[500px] mb-16 shadow-2xl border border-slate-100">
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div 
              className="prose prose-lg max-w-none prose-slate prose-headings:font-black prose-headings:tracking-tight prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:p-8 prose-blockquote:rounded-[2rem] prose-blockquote:not-italic prose-a:text-blue-600 prose-img:rounded-[2rem] prose-img:shadow-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-24 p-12 md:p-20 bg-slate-900 rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Ready to apply these <br /> frameworks to your brand?</h3>
                <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
                  Our team can audit your current strategy and implement an 8-figure scale engine in under 30 days.
                </p>
                <Link to="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-8 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 group">
                    Book Free Audit <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -ml-32 -mb-32" />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;