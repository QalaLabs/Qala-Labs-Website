import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { PageLayout } from './PageLayout';
import { getBlogPostBySlug, blogPosts } from '../data/blogsData';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Playbook URL copied to clipboard!');
    }
  };

  return (
    <PageLayout>
      <article className="relative pt-36 pb-24 bg-[#06070D] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          {/* Back to Blog */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-[#3FE0E0] transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Field Notes & Playbooks</span>
          </Link>

          {/* Metadata Header */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3FE0E0] px-3 py-1 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/25">
              {post.category}
            </span>
            <span className="text-xs font-mono text-white/50 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="text-xs font-mono text-white/50 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-medium text-white tracking-tight leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8">
            {post.subtitle}
          </p>

          {/* Author & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10 mb-10">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border border-white/20"
              />
              <div>
                <div className="text-sm font-bold text-white">{post.author.name}</div>
                <div className="text-xs text-white/50">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:border-[#3FE0E0]/50 transition-all flex items-center gap-2 text-xs"
                title="Share article"
              >
                <Share2 className="w-4 h-4 text-[#3FE0E0]" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Cover Hero Image */}
          <div className="rounded-3xl overflow-hidden mb-12 h-72 sm:h-[420px] bg-black relative border border-white/10 shadow-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/caseStudyBg.webp';
              }}
            />
          </div>

          {/* Article Body Content */}
          <div className="space-y-12 text-white/80 leading-relaxed text-base sm:text-lg">
            {post.content.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                {sec.sectionHeading && (
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-4">
                    {sec.sectionHeading}
                  </h2>
                )}

                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-white/80 font-light leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.callout && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#4F46E5]/10 to-[#3FE0E0]/10 border-l-4 border-[#3FE0E0] my-6">
                    <p className="text-white font-medium italic text-base sm:text-lg">
                      "{sec.callout}"
                    </p>
                  </div>
                )}

                {sec.bulletPoints && (
                  <ul className="space-y-3 pt-2">
                    {sec.bulletPoints.map((item, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm sm:text-base text-white/75">
                        <CheckCircle2 className="w-5 h-5 text-[#3FE0E0] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Article Tags */}
          <div className="flex flex-wrap gap-2 pt-12 pb-8 border-b border-white/10 mt-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] text-white/70 border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Growth Diagnostic CTA */}
          <div className="my-16 p-8 sm:p-12 rounded-[32px] bg-gradient-to-r from-[#121324] to-[#0B0C16] border border-[#3FE0E0]/40 shadow-2xl text-center">
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0]" />
              APPLY THESE SYSTEMS TO YOUR BRAND
            </div>
            <h3 className="text-2xl sm:text-4xl font-medium text-white tracking-tight mb-3">
              Want Us To Architect Your Growth Funnel?
            </h3>
            <p className="text-white/70 text-sm max-w-xl mx-auto mb-6">
              Book a 30-minute diagnostic session with our systems engineers and growth directors. We audit your funnel and identify leverage points with zero fluff.
            </p>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white hover:brightness-110 shadow-xl transition-all"
            >
              <span>Schedule Diagnostic Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="pt-8">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6">
                FURTHER FIELD NOTES
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/blog/${rel.slug}`}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#3FE0E0]/40 transition-all block group"
                  >
                    <span className="text-[10px] font-mono text-[#3FE0E0] uppercase tracking-wider block mb-2">
                      {rel.category} • {rel.readTime}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-[#3FE0E0] transition-colors mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-white/60 line-clamp-2">{rel.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </PageLayout>
  );
};
