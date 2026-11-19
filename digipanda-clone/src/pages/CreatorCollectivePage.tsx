import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  DollarSign,
  Layers,
  ArrowRight,
  CheckCircle2,
  Video,
  Box,
  BrainCircuit,
  Code2,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Clock,
  Compass,
} from 'lucide-react';
import { PageLayout } from './PageLayout';
import { SEO } from '../components/SEO';
import { creatorTracks, creatorPerks } from '../data/collectivesData';
import { activeCreatorCampaigns } from '../data/creatorCampaigns';
import { CreatorQuoteForm } from '../components/creator/CreatorQuoteForm';

const trackIcons: Record<string, React.ReactNode> = {
  'short-form-ugc': <Video className="w-6 h-6 text-[#4F46E5]" />,
  '3d-motion-cgi': <Box className="w-6 h-6 text-[#0284C7]" />,
  'ai-prompt-cinema': <BrainCircuit className="w-6 h-6 text-[#8B5CF6]" />,
  'creative-dev': <Code2 className="w-6 h-6 text-[#10B981]" />,
};

const featuredBrands = [
  'WWF India',
  'Mizuno India',
  'playR Merchandise',
  'Trotr Spain',
  'Chrono Seconds',
  'Capital Keys',
];

export const CreatorCollectivePage: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState('Short-Form Video & UGC');

  const handleSelectTrack = (disciplineName: string) => {
    setSelectedDiscipline(disciplineName);
    const element = document.getElementById('apply-collective');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageLayout>
      <SEO
        title="Creator Collective • Turn Creative Craft Into High-Ticket Brand Equity"
        description="Join the Qala Labs Creator Collective. Submit your deliverable rates, post collaboration terms, and platform ad rights for enterprise brand briefs."
        image="/assets/og/og-creator.jpg"
        url="/creator-collective"
      />

      {/* 1. Hero Section */}
      <section className="relative pt-36 pb-20 bg-transparent overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#4F46E5]/10 via-[#0284C7]/10 to-transparent blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-ping" />
            <span>INVITE-ONLY SYNDICATE // CREATOR COLLECTIVE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Turn Your Creative Craft Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#0284C7] to-[#10B981]">
              High-Ticket Brand Equity.
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-xl font-normal max-w-3xl mx-auto leading-relaxed mb-10">
            The bridge between visionary digital storytellers and global enterprise budgets.
            Access paid brand briefs, proprietary AI creative pipelines, and performance royalties with zero administrative friction.
          </p>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#4F46E5]">125M+</div>
              <div className="text-[11px] font-mono text-slate-500 uppercase mt-1">Viral Impressions</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7]">72 Hours</div>
              <div className="text-[11px] font-mono text-slate-500 uppercase mt-1">Guaranteed Payout</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#10B981]">Up to 20%</div>
              <div className="text-[11px] font-mono text-slate-500 uppercase mt-1">ROAS Royalties</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">0 Drag</div>
              <div className="text-[11px] font-mono text-slate-500 uppercase mt-1">We Handle Ops</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#apply-collective"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#4F46E5] to-[#0284C7] text-white hover:brightness-110 shadow-xl transition-all hover:scale-105"
            >
              <span>Apply & Generate Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#active-sprints"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-bold text-xs uppercase tracking-wider border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
            >
              <Compass className="w-4 h-4 text-[#4F46E5]" />
              <span>Browse Active Brand Sprints</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Why Join the Collective */}
      <section className="py-20 bg-white/70 border-t border-slate-200/80">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-widest mb-2">
              WHY THE BEST CREATORS JOIN US
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Create Without The Corporate Drag
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {creatorPerks.map((perk, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#4F46E5]/40 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-50 text-[#4F46E5] border border-indigo-200 mb-4">
                    {perk.stat}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{perk.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Creator Tracks */}
      <section className="py-24 bg-transparent border-t border-slate-200/80">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              SPECIALIZED DISCIPLINES
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Four Craft Horizons
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              We select virtuosic specialists who treat social video, 3D CGI, and generative AI as high art.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {creatorTracks.map((track) => (
              <div
                key={track.id}
                className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#4F46E5]/50 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      {trackIcons[track.id]}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#4F46E5] px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 font-bold">
                      {track.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-[#4F46E5] transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {track.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Deliverables & Formats
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {track.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400 font-mono">Tools: {track.tools.join(', ')}</span>
                  <button
                    type="button"
                    onClick={() => handleSelectTrack(track.title)}
                    className="text-[#4F46E5] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Quote for this track</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brand Roster & Proof */}
      <section className="py-16 bg-white/60 border-t border-slate-200/80">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-8 font-semibold">
            CREATOR BRIEFS DELIVERED FOR GLOBAL BRANDS & ICONIC VENTURES
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {featuredBrands.map((brand, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 hover:text-[#4F46E5] hover:border-[#4F46E5]/40 transition-all shadow-sm"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Active Brand Campaigns Showcase (#active-sprints) */}
      <section id="active-sprints" className="py-20 bg-transparent border-t border-slate-200/80">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>OPEN FOR CREATOR PITCHES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Active Brand Sprints
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Have a specific brand match in mind? Click any active sprint to submit campaign-specific terms and rates.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCreatorCampaigns.map((camp) => (
              <div
                key={camp.slug}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#4F46E5]/40 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4F46E5] px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200">
                      {camp.brand}
                    </span>
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      {camp.brandBenchmarkPayout}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#4F46E5] transition-colors leading-snug">
                    {camp.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {camp.brief}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-slate-500 font-mono mb-4">
                    <div>• Scope: {camp.deliverableScope}</div>
                    <div>• Timeline: {camp.timeline}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">Route: /c/{camp.slug}</span>
                  <Link
                    to={`/creator-collective/c/${camp.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-[#0284C7] transition-colors"
                  >
                    <span>Pitch Campaign</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. General Syndicate Application Form (#apply-collective) */}
      <section id="apply-collective" className="py-24 bg-white/70 border-t border-slate-200/80 relative">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
              <span>GENERAL SYNDICATE INTAKE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              Request Your Invite & Quote
            </h2>
            <p className="text-slate-600 text-sm">
              We review new creator submissions weekly. Complete your 5-part rate card and collaboration terms below to join our booked roster.
            </p>
          </div>

          <CreatorQuoteForm
            sourceContext="creator_collective"
            defaultDiscipline={selectedDiscipline}
          />
        </div>
      </section>
    </PageLayout>
  );
};
