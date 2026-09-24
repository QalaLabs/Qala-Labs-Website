import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { PageLayout } from './PageLayout';
import { blogPosts, BlogPost } from '../data/blogsData';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const categories = ['All', 'Growth & Funnels', 'AI & Engineering', 'Brand & 3D', 'Culture & UGC'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterLoading(true);
    setNewsletterError(null);

    try {
      const payload = {
        name: newsletterName || 'Newsletter Subscriber',
        companyName: 'Newsletter Dispatch',
        phone: '+00 0000000000',
        email: newsletterEmail,
        description: `Subscribed to Qala Labs Field Notes & Growth Playbooks from BlogPage`,
        source: 'blog_newsletter',
        b_url: honeypot || undefined,
      };

      // Dual endpoint support: attempt /api/lead, fallback to /api/lead.php if 404
      let response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 404) {
        response = await fetch('/api/lead.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        let errDesc = `Subscription failed (${response.status})`;
        try {
          const resJson = await response.json();
          if (resJson?.error) errDesc = resJson.error;
        } catch {
          // ignore parse error
        }
        throw new Error(errDesc);
      }

      // Strictly gate success only on response.ok
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
      setNewsletterName('');
    } catch (err: any) {
      console.error('Newsletter submission failed:', err);
      setNewsletterError(
        err?.message || 'Subscription failed. Please write directly to hello@qalalabs.com'
      );
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <PageLayout>
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-20 bg-[#06070D] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-r from-[#4F46E5]/20 via-[#3FE0E0]/15 to-transparent blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            FIELD NOTES // PERSPECTIVES & PLAYBOOKS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium text-white tracking-tight leading-tight mt-4 mb-6">
            The Qala{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399]">
              Playbooks & Insights.
            </span>
          </h1>

          <p className="text-white/70 text-base sm:text-xl font-normal max-w-3xl mx-auto leading-relaxed mb-10">
            Unfiltered tactical insights on autonomous multi-agent systems, high-ticket conversion architectures, 3D WebGL craft, and viral fandom engineering.
          </p>
        </div>
      </section>

      {/* 2. Featured Article Spotlight */}
      {featuredPost && (
        <section className="py-8 bg-[#06070D]">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group rounded-[36px] overflow-hidden border border-white/10 bg-gradient-to-r from-white/[0.04] to-white/[0.01] hover:border-[#3FE0E0] transition-all duration-300 block p-6 sm:p-10 hover:shadow-[0_0_50px_-10px_rgba(63,224,224,0.25)]"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3FE0E0] px-3 py-1 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/25">
                      FEATURED PLAYBOOK • {featuredPost.category}
                    </span>
                    <span className="text-xs font-mono text-white/50 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featuredPost.readTime}
                    </span>
                    <span className="text-xs font-mono text-white/50 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {featuredPost.publishedAt}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 group-hover:text-[#3FE0E0] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm sm:text-base text-white/70 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{featuredPost.author.name}</div>
                        <div className="text-[11px] text-white/50">{featuredPost.author.role}</div>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#3FE0E0] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      <span>Read Playbook</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden h-64 sm:h-80 bg-black relative">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/caseStudyBg.webp';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* 3. Filter Bar & Articles Directory */}
      <section className="py-16 bg-[#080911] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search playbooks by topic or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0] transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white shadow-lg shadow-[#3FE0E0]/20'
                      : 'bg-white/[0.03] text-white/70 border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-[#3FE0E0] transition-all duration-300 flex flex-col justify-between p-6 hover:shadow-[0_0_40px_-10px_rgba(63,224,224,0.25)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3FE0E0] px-3 py-1 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/25">
                      {post.category}
                    </span>
                    <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#3FE0E0] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-white/60 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="relative rounded-2xl overflow-hidden mb-4 h-44 bg-black/50">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/caseStudyBg.webp';
                      }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-white/60 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-white/10"
                    />
                    <span className="text-white/60">{post.author.name}</span>
                  </div>
                  <span className="text-[#3FE0E0] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 text-white/50">
              <p className="text-base">No playbooks found matching your query.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 text-xs font-bold text-[#3FE0E0] hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Newsletter Subscription Box */}
      <section className="py-20 bg-[#06070D] border-t border-white/10 relative">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-white/[0.06] to-white/[0.015] border border-white/15 backdrop-blur-xl text-center shadow-2xl">
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0]" />
              PRIVATE DISPATCH
            </div>
            <h3 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mb-3">
              Subscribe to Qala Field Notes
            </h3>
            <p className="text-white/60 text-sm max-w-xl mx-auto mb-8">
              We send one deep-dive playbook every two weeks on AI systems engineering, conversion mechanics, and brand craft. Zero spam.
            </p>

            {newsletterSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#121324] border border-[#3FE0E0] max-w-md mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#3FE0E0] mx-auto mb-2" />
                <h4 className="text-lg font-bold text-white mb-1">You're on the dispatch list</h4>
                <p className="text-xs text-white/70">
                  Welcome aboard. Look out for our next breakdown in your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto space-y-3">
                {/* Honeypot field for bot suppression */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="b_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {newsletterError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-200 text-xs flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{newsletterError}</span>
                    </div>
                    <a
                      href="mailto:hello@qalalabs.com"
                      className="text-[#3FE0E0] hover:underline font-bold text-[10px] uppercase"
                    >
                      Email Us &rarr;
                    </a>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    className="px-4 py-3 bg-white/[0.04] border border-white/20 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0] transition-colors sm:w-1/3"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email *"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="px-4 py-3 bg-white/[0.04] border border-white/20 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0] transition-colors flex-1"
                  />
                  <button
                    type="submit"
                    disabled={newsletterLoading}
                    className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white hover:brightness-110 disabled:opacity-50 transition-all shadow-lg shrink-0 inline-flex items-center justify-center gap-2"
                  >
                    {newsletterLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
