"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SEO from '@/components/layout/SEO';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      title: "The 2024 E-com Attribution Playbook",
      excerpt: "How to navigate the post-iOS 14.5 world with proprietary data modeling and first-party tracking.",
      category: "Strategy",
      date: "Mar 15, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Scaling Creator Brands to $1M/mo",
      excerpt: "A deep dive into the infrastructure required to handle viral growth without breaking your supply chain.",
      category: "Case Study",
      date: "Mar 10, 2024",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Why Headless Commerce is No Longer Optional",
      excerpt: "Performance metrics don't lie: site speed is the #1 conversion killer in 2024.",
      category: "Tech",
      date: "Mar 5, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Insights & Strategy" description="Expert takes on e-commerce scaling, performance marketing, and digital transformation." />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-6">Insights for the 1%</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We share the exact frameworks we use to scale brands to 8-figures. No fluff, just data.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Featured"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10 text-white max-w-3xl">
              <Badge className="bg-blue-600 mb-4">Featured Article</Badge>
              <h2 className="text-4xl font-bold mb-4">The Future of Performance Marketing: AI-Driven Creative at Scale</h2>
              <p className="text-lg text-slate-200 mb-6">Learn how we're using generative AI to produce 100+ high-converting ad variants per week for our top-tier clients.</p>
              <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
                Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Card key={i} className="border-none shadow-xl hover:shadow-2xl transition-shadow overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                <Button variant="link" className="p-0 text-blue-600 font-bold">
                  Read More <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;