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
    <div className="min-h-screen bg-slate-50">
      <SEO title="Insights & Strategy" description="Expert takes on e-commerce scaling, performance marketing, and digital transformation." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">Insights for the <span className="text-blue-600">1%</span></h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We share the exact frameworks we use to scale brands to 8-figures. No fluff, just data.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-16">
                <Link to={`/blog/${featuredPost.slug}`}>
                  <div className="relative h-[500px] rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl">
                    <img 
                      src={featuredPost.image_url || "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={featuredPost.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-10 md:p-16 text-white max-w-3xl">
                      <Badge className="bg-blue-600 mb-4 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]">Featured Article</Badge>
                      <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{featuredPost.title}</h2>
                      <p className="text-lg text-slate-200 mb-8 line-clamp-2">{featuredPost.excerpt || "Read our latest deep dive into performance marketing and scale."}</p>
                      <Button className="bg-white text-slate-900 hover:bg-blue-600 hover:text-white px-8 py-6 rounded-2xl font-black transition-all">
                        Read Full Article <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Post Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {remainingPosts.map((post, i) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="border-none shadow-xl hover:shadow-2xl transition-all overflow-hidden group rounded-[2.5rem] bg-white h-full flex flex-col">
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={post.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none font-bold">
                          {post.category || "Strategy"}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-8 pb-4">
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 8 min read</span>
                      </div>
                      <CardTitle className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 flex-1 flex flex-col">
                      <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed">
                        {post.excerpt || "Discover the frameworks we use to scale 8-figure brands."}
                      </p>
                      <div className="mt-auto">
                        <span className="text-blue-600 font-black text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100">
                <p className="text-slate-400 font-bold">No insights published yet. Check back soon.</p>
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