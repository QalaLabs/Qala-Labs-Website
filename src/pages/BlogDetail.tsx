import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2, User } from 'lucide-react';
import { motion } from "framer-motion";

const BlogDetail = () => {
  const { slug } = useParams();

  // Placeholder data - in a real app, fetch from Supabase
  const post = {
    title: "The 2024 E-com Attribution Playbook",
    content: `
      <p>In the post-iOS 14.5 world, traditional attribution models have crumbled. Brands that rely solely on Meta's 7-day click or Google's last-click attribution are flying blind. At Qala Labs, we've developed a proprietary framework that combines server-side tracking with first-party data modeling to provide a single source of truth.</p>
      
      <h3>The Death of the Pixel</h3>
      <p>Browser-based tracking is no longer sufficient. With the rise of ad blockers and privacy-focused browser updates, up to 30% of your conversion data is being lost before it even reaches your dashboard. This leads to inefficient bidding and wasted ad spend.</p>
      
      <h3>The Solution: Server-Side GTM</h3>
      <p>By moving your tracking to a server-side environment, you bypass browser restrictions and ensure 100% data accuracy. This allows for better audience matching and more precise optimization of your scale engine.</p>
      
      <blockquote>"Data is the new oil, but only if you have the right refinery. Server-side tracking is that refinery for modern DTC brands."</blockquote>
      
      <h3>Key Takeaways for 2024</h3>
      <ul>
        <li>Implement CAPI (Conversions API) for all major platforms.</li>
        <li>Focus on blended ROAS and contribution margin over platform-specific metrics.</li>
        <li>Build a first-party data moat through high-value lead magnets and retention flows.</li>
      </ul>
    `,
    category: "Strategy",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    author: "Alex Rivera",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO title={post.title} description="Expert takes on e-commerce scaling and attribution." />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-blue-600 mb-6 px-4 py-1 rounded-full">{post.category}</Badge>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-500 mb-12 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-900">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <button className="ml-auto p-2 hover:bg-slate-50 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-[3rem] overflow-hidden h-[500px] mb-16 shadow-2xl">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div 
              className="prose prose-lg max-w-none prose-slate prose-headings:font-black prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:not-italic prose-a:text-blue-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] text-white text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to fix your attribution?</h3>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Our team can audit your current tracking setup and implement a server-side solution in under 7 days.
              </p>
              <Link to="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl font-bold">
                  Book Free Audit
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;