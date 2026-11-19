import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  DollarSign,
  TrendingUp,
  Tag,
  Share2,
  Video,
} from 'lucide-react';
import { PageLayout } from './PageLayout';
import { SEO } from '../components/SEO';
import { CreatorQuoteForm } from '../components/creator/CreatorQuoteForm';
import {
  getCampaignBySlug,
  activeCreatorCampaigns,
} from '../data/creatorCampaigns';

export const CreatorCampaignApplyPage: React.FC = () => {
  const { slug = 'mizuno-wave-revolt' } = useParams<{ slug: string }>();
  const campaign = getCampaignBySlug(slug);

  const otherCampaigns = activeCreatorCampaigns
    .filter((c) => c.slug !== campaign.slug)
    .slice(0, 3);

  return (
    <PageLayout>
      <SEO
        title={`${campaign.title} • Creator Quote & Terms Intake | Qala Labs`}
        description={`Submit your creative deliverable rates, post collaboration terms, and platform ad rights for ${campaign.brand}'s active creator sprint.`}
        image="/assets/og/og-creator.jpg"
        url={`/creator-collective/c/${campaign.slug}`}
      />

      <div className="relative pt-36 pb-24 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-[#4F46E5]/10 via-[#0284C7]/10 to-transparent blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
          {/* Back Navigation & Breadcrumb */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/creator-collective"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 hover:text-[#4F46E5] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Creator Collective</span>
            </Link>

            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline-block">
              CAMPAIGN SPRINT // VERIFIED INTAKE
            </span>
          </div>

          {/* Campaign Brief Header Card */}
          <div className="p-8 sm:p-12 rounded-[36px] bg-white/90 border border-slate-200 backdrop-blur-xl shadow-xl mb-12 relative overflow-hidden">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-50 text-[#4F46E5] border border-indigo-200">
                {campaign.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                {campaign.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {campaign.title}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
              {campaign.brief}
            </p>

            {/* Campaign Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Brand Benchmark Payout
                </div>
                <div className="text-base font-bold text-[#4F46E5]">
                  {campaign.brandBenchmarkPayout}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Deliverable Scope
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  {campaign.deliverableScope}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Production Timeline
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  {campaign.timeline}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Ad Rights Scope
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  {campaign.adRightsRequired}
                </div>
              </div>
            </div>

            {/* Deliverable Highlights */}
            {campaign.deliverableHighlights && campaign.deliverableHighlights.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Creative Directives & Deliverable Highlights:
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {campaign.deliverableHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Anchor & Introduction */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOMIZE DELIVERABLES & RATES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Submit Your Campaign Quote & Terms
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Tailor your deliverable rates, feed collaboration preferences, and platform ad usage.
              Quotes submit directly to {campaign.brand}&apos;s lead review team.
            </p>
          </div>

          {/* The Master Quote Form */}
          <div className="mb-16">
            <CreatorQuoteForm
              campaign={campaign}
              sourceContext={`creator_campaign_${campaign.slug}`}
              defaultDiscipline={
                campaign.category.includes('Footwear') || campaign.category.includes('Sports')
                  ? 'Short-Form Video & UGC'
                  : 'Lifestyle & D2C'
              }
            />
          </div>

          {/* Other Active Sprints */}
          {otherCampaigns.length > 0 && (
            <div className="pt-12 border-t border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Explore Other Active Brand Sprints
                  </h3>
                  <p className="text-xs text-slate-500">
                    Apply to multiple brand briefs in the Qala Creator Collective
                  </p>
                </div>
                <Link
                  to="/creator-collective"
                  className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1"
                >
                  <span>View All Sprints</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {otherCampaigns.map((other) => (
                  <Link
                    key={other.slug}
                    to={`/creator-collective/c/${other.slug}`}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#4F46E5]/40 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4F46E5] mb-2 block">
                        {other.brand}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-[#4F46E5] transition-colors">
                        {other.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                        {other.brief}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">
                        {other.brandBenchmarkPayout}
                      </span>
                      <span className="text-[#4F46E5] font-semibold flex items-center gap-0.5">
                        Quote &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
