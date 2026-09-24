import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  DollarSign,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Video,
  Box,
  BrainCircuit,
  Code2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { PageLayout } from './PageLayout';
import { creatorTracks, creatorPerks } from '../data/collectivesData';

const trackIcons: Record<string, React.ReactNode> = {
  'short-form-ugc': <Video className="w-6 h-6 text-[#3FE0E0]" />,
  '3d-motion-cgi': <Box className="w-6 h-6 text-[#A78BFA]" />,
  'ai-prompt-cinema': <BrainCircuit className="w-6 h-6 text-[#F472B6]" />,
  'creative-dev': <Code2 className="w-6 h-6 text-[#34D399]" />,
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
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [discipline, setDiscipline] = useState('Short-Form Video & UGC');
  const [channelLink, setChannelLink] = useState('');
  const [audienceReach, setAudienceReach] = useState('10k - 50k views/mo');
  const [creativeNote, setCreativeNote] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const payload = {
        name,
        companyName: `Creator: ${handle || name} (${discipline})`,
        phone,
        email,
        description: `Discipline: ${discipline}\nChannels/Portfolio: ${channelLink}\nEstimated Reach: ${audienceReach}\n\nCreative Note / Top Works:\n${creativeNote}`,
        source: 'creator_collective',
        b_url: honeypot || undefined,
      };

      // Dual-target endpoint support: attempt /api/lead first, then fallback to /api/lead.php if 404
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
        let errDesc = `Application failed with status (${response.status})`;
        try {
          const resJson = await response.json();
          if (resJson?.error) errDesc = resJson.error;
        } catch {
          // ignore parse error
        }
        throw new Error(errDesc);
      }

      // Strictly gate success only on response.ok
      setSubmitted(true);
      setName('');
      setHandle('');
      setEmail('');
      setPhone('');
      setChannelLink('');
      setCreativeNote('');
    } catch (err: any) {
      console.error('Creator Collective submission error:', err);
      setErrorMessage(
        err?.message || 'Submission failed. Please apply directly via email to creators@qalalabs.com'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-20 bg-[#06070D] overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#3FE0E0]/15 via-[#4F46E5]/10 to-transparent blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-ping" />
            INVITE-ONLY SYNDICATE // CREATOR COLLECTIVE
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium text-white tracking-tight leading-tight mt-4 mb-6">
            Turn Your Creative Craft Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FE0E0] via-[#A78BFA] to-[#4F46E5]">
              High-Ticket Brand Equity.
            </span>
          </h1>

          <p className="text-white/70 text-base sm:text-xl font-normal max-w-3xl mx-auto leading-relaxed mb-10">
            The bridge between visionary digital storytellers and global enterprise budgets.
            Access paid brand briefs, proprietary AI creative engines, and performance royalties with zero administrative friction.
          </p>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#3FE0E0]">125M+</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">Viral Impressions</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#A78BFA]">72 Hours</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">Guaranteed Payout</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#34D399]">Up to 20%</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">ROAS Royalties</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">0 Drag</div>
              <div className="text-[11px] font-mono text-white/50 uppercase mt-1">We Handle Ops</div>
            </div>
          </div>

          <a
            href="#apply-collective"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white hover:brightness-110 shadow-xl transition-all"
          >
            <span>Apply To The Syndicate</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 2. Why Join the Collective */}
      <section className="py-20 bg-[#080911] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono font-bold text-[#3FE0E0] uppercase tracking-widest mb-2">
              WHY THE BEST CREATORS JOIN US
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              Create Without The Corporate Sludge
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {creatorPerks.map((perk, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#3FE0E0]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#3FE0E0]/10 text-[#3FE0E0] border border-[#3FE0E0]/30 mb-4">
                    {perk.stat}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{perk.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Creator Tracks */}
      <section className="py-24 bg-[#06070D] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              SPECIALIZED DISCIPLINES
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-tight mb-4">
              Four Craft Horizons
            </h2>
            <p className="text-white/60 text-sm">
              We don't do generic influencer marketing. We select virtuosic specialists who treat social video, 3D CGI, and generative AI as high art.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {creatorTracks.map((track) => (
              <div
                key={track.id}
                className="p-8 rounded-3xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/10 hover:border-[#3FE0E0]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#121324] border border-white/10 flex items-center justify-center">
                      {trackIcons[track.id]}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#3FE0E0] px-3 py-1 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/25">
                      {track.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#3FE0E0] transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {track.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                      Deliverables & Formats
                    </div>
                    <ul className="space-y-2 text-xs text-white/80">
                      {track.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3FE0E0] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-white/40 font-mono">Tools: {track.tools.join(', ')}</span>
                  <a
                    href="#apply-collective"
                    onClick={() => setDiscipline(track.title)}
                    className="text-[#3FE0E0] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Apply for this track</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brand Roster & Proof */}
      <section className="py-16 bg-[#080911] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-white/50 mb-8">
            CREATOR BRIEFS DELIVERED FOR GLOBAL BRANDS & ICONIC VENTURES
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {featuredBrands.map((brand, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-xs font-semibold text-white/70 hover:text-white hover:border-[#3FE0E0]/30 transition-all"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Application Section */}
      <section id="apply-collective" className="py-24 bg-[#06070D] border-t border-white/10 relative">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0]" />
              SYNDICATE APPLICATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-tight mb-3">
              Request Your Invite
            </h2>
            <p className="text-white/60 text-sm">
              We review new creator submissions weekly. Share your proof of craft and let's make magic.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-white/[0.06] to-white/[0.015] border border-white/15 backdrop-blur-xl shadow-2xl">
            {submitted ? (
              <div className="p-10 rounded-3xl bg-[#121324] border border-[#3FE0E0] text-center">
                <div className="w-16 h-16 rounded-full bg-[#3FE0E0] text-black flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Submission Received!</h3>
                <p className="text-white/70 text-sm max-w-md mx-auto">
                  Our creator curation team is reviewing your channels. If your aesthetic matches upcoming brand briefs, we'll reach out within 72 hours with onboarding and brief previews.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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

                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-200 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href="mailto:creators@qalalabs.com"
                        className="inline-flex items-center gap-1 font-semibold text-[#3FE0E0] hover:underline shrink-0 text-xs uppercase tracking-wider"
                      >
                        Email Directly &rarr;
                      </a>
                      <a
                        href="https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I'm%20applying%20to%20the%20Creator%20Collective."
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#34D399] hover:underline shrink-0 text-xs uppercase tracking-wider"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp &rarr;
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liam Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Creator Handle / Moniker *</label>
                    <input
                      type="text"
                      required
                      placeholder="@liam.visuals"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="liam@creator.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Phone Number (with Country Code) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+44 7911 123456 or +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Primary Discipline *</label>
                    <select
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0B0C16] border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    >
                      <option value="Short-Form Video & UGC">Short-Form Video & UGC</option>
                      <option value="3D Motion & CGI Visualists">3D Motion & CGI Visualists</option>
                      <option value="AI Filmmakers & Prompt Architects">AI Filmmakers & Prompt Architects</option>
                      <option value="Creative Technologists & Web Experimenters">Creative Technologists & Web</option>
                      <option value="Hybrid / Other">Hybrid / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Audience Reach / Volume *</label>
                    <select
                      value={audienceReach}
                      onChange={(e) => setAudienceReach(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0B0C16] border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    >
                      <option value="Under 10k views/mo (Quality-First Focus)">Under 10k views/mo (Quality-First Focus)</option>
                      <option value="10k - 50k views/mo">10k - 50k views/mo</option>
                      <option value="50k - 250k views/mo">50k - 250k views/mo</option>
                      <option value="250k - 1M+ views/mo">250k - 1M+ views/mo</option>
                      <option value="1M+ Viral Reach">1M+ Viral Reach</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">
                    Portfolio / Social Links (TikTok, Instagram, YouTube, Behance, GitHub) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://instagram.com/... or https://tiktok.com/@..."
                    value={channelLink}
                    onChange={(e) => setChannelLink(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">
                    Your Signature Style & Top Performing Piece *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your creative edge, what tools you love, or links to your favorite 2-3 videos or visual assets..."
                    value={creativeNote}
                    onChange={(e) => setCreativeNote(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-2xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[11px] text-white/40">
                    Direct syndicate desk:{' '}
                    <a href="mailto:creators@qalalabs.com" className="text-[#3FE0E0] hover:underline">
                      creators@qalalabs.com
                    </a>
                  </span>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white hover:brightness-110 disabled:opacity-50 transition-all shadow-xl hover:scale-105"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Syndicate Application</span>
                        <ArrowRight className="w-4 h-4" />
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
