"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <SEO 
        title="Insights & Strategy" 
        description="Expert takes on e-commerce scaling, performance marketing, and digital transformation." 
      />
      <Navbar />
      
      <div className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8 uppercase tracking-widest mx-auto"
          >
            Insights
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-extrabold text-zinc-50 mb-10 tracking-tighter leading-[1.05]">
            Insights for the <span className="text-indigo-500">1%</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            We share the exact frameworks we use to scale brands to 8-figures. No fluff, just data.
          </p>
        </motion.div>

        {loading ? (
          <div className="py-32 flex justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-24"
              >
                <Link to={`/blog/${featuredPost.slug}`}>
                  <div className="relative h-[600px] rounded-[4rem] overflow-hidden group cursor-pointer shadow-2xl border border-zinc-800/50">
                    <img 
                      src={featuredPost.image_url || "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      alt={featuredPost.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 p-12 md:p-20 text-white max-w-4xl">
                      <Badge className="bg-indigo-600 text-white mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px] border-none">Featured Article</Badge>
                      <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">{featuredPost.title}</h2>
                      <p className="text-xl text-zinc-300 mb-10 line-clamp-2 max-w-2xl leading-relaxed">{featuredPost.excerpt || "Read our latest deep dive into performance marketing and scale."}</p>
                      <Button className="bg-zinc-50 text-zinc-950 hover:bg-indigo-600 hover:text-white px-10 py-8 rounded-2xl font-black transition-all text-lg group">
                        Read Full Article <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Post Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {remainingPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <Card className="border-zinc-800/50 shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden group rounded-[3rem] bg-zinc-900/40 backdrop-blur-xl h-full flex flex-col hover:border-indigo-500/30">
                      <div className="h-64 overflow-hidden relative">
                        <img 
                          src={post.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute top-6 left-6">
                          <Badge className="bg-zinc-950/80 backdrop-blur-md text-zinc-100 border-zinc-700/50 font-bold px-4 py-1 rounded-full text-[10px] uppercase tracking-widest">
                            {post.category || "Strategy"}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="p-10 pb-4">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 8 min read</span>
                        </div>
                        <CardTitle className="text-2xl font-extrabold text-zinc-50 group-hover:text-indigo-400 transition-colors leading-tight tracking-tight">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-10 pt-0 flex-1 flex flex-col">
                        <p className="text-zinc-400 text-sm mb-10 line-clamp-3 leading-relaxed">
                          {post.excerpt || "Discover the frameworks we use to scale 8-figure brands."}
                        </p>
                        <div className="mt-auto">
                          <span className="text-indigo-400 font-black text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                            Read More <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-48 bg-zinc-900/40 backdrop-blur-xl rounded-[4rem] border border-zinc-800/50">
                <p className="text-zinc-500 font-bold text-xl">No insights published yet. Check back soon.</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blog;