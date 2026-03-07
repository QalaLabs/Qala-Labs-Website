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
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30">
      <SEO title={post.title} description={post.excerpt} image={post.image_url} />
      <Navbar />
      
      <div className="pt-48 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-indigo-400 font-bold mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-indigo-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px] border-none">
              {post.category || "Strategy"}
            </Badge>
            <h1 className="text-4xl md:text-7xl font-extrabold text-zinc-50 mb-10 leading-[1.1] tracking-tighter">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-zinc-500 mb-16 pb-10 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-indigo-500 border border-zinc-800">
                  <User className="w-6 h-6" />
                </div>
                <span className="font-bold text-zinc-300">Qala Strategy Team</span>
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
                className="ml-auto p-4 hover:bg-zinc-900 rounded-2xl transition-colors border border-zinc-800"
                aria-label="Share article"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {post.image_url && (
              <div className="rounded-[4rem] overflow-hidden h-[600px] mb-16 shadow-2xl border border-zinc-800">
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div 
              className="prose prose-lg max-w-none prose-invert prose-headings:font-black prose-headings:tracking-tight prose-headings:text-zinc-50 prose-p:text-zinc-400 prose-p:leading-relaxed prose-blockquote:border-indigo-600 prose-blockquote:bg-indigo-600/5 prose-blockquote:p-10 prose-blockquote:rounded-[3rem] prose-blockquote:not-italic prose-a:text-indigo-400 prose-img:rounded-[3rem] prose-img:shadow-2xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-24 p-16 md:p-24 bg-zinc-900/50 backdrop-blur-xl rounded-[4rem] border border-zinc-800 text-white text-center relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight tracking-tight">Ready to apply these <br /> frameworks to your brand?</h3>
                <p className="text-zinc-400 mb-12 max-w-xl mx-auto text-lg leading-relaxed">
                  Our team can audit your current strategy and implement an 8-figure scale engine in under 30 days.
                </p>
                <Link to="/contact">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-8 rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 group">
                    Book Free Audit <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -ml-48 -mb-48" />
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;