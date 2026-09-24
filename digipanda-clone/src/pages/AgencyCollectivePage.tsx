import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Handshake,
  Workflow,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { PageLayout } from './PageLayout';
import { agencyModels, agencyBenefits } from '../data/collectivesData';

export const AgencyCollectivePage: React.FC = () => {
  const [agencyName, setAgencyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [agencySize, setAgencySize] = useState('6-20 Specialists');
  const [preferredModel, setPreferredModel] = useState('White-Label AI & Engineering');
  const [scopeDetails, setScopeDetails] = useState('');
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
        name: contactName,
        companyName: agencyName,
        phone,
        email,
        description: `Agency Website: ${website}\nTeam Size: ${agencySize}\nPreferred Model: ${preferredModel}\n\nCollaboration Goals & Active Client Needs:\n${scopeDetails}`,
        source: 'agency_collective',
        b_url: honeypot || undefined,
      };

      // Dual-target endpoint: attempt /api/lead, fallback to /api/lead.php if 404
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
        let errDesc = `Partnership inquiry failed with status (${response.status})`;
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
      setAgencyName('');
      setContactName('');
      setEmail('');
      setPhone('');
      setWebsite('');
      setScopeDetails('');
    } catch (err: any) {
      console.error('Agency Collective application error:', err);
      setErrorMessage(
        err?.message || 'Submission failed. Please reach out directly to partners@qalalabs.com'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-20 bg-[#06070D] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-r from-[#4F46E5]/20 via-[#3FE0E0]/15 to-[#34D399]/10 blur-[130px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            PARTNER NETWORK // AGENCY COLLECTIVE
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium text-white tracking-tight leading-tight mt-4 mb-6">
            Scale Your Agency With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399]">
              Deep AI & Engineering.
            </span>
          </h1>

          <p className="text-white/70 text-base sm:text-xl font-normal max-w-3xl mx-auto leading-relaxed mb-10">
            Boutique design studios, growth agencies, and consultancies win bigger enterprise retainers when backed by Qala Labs.
            White-label our autonomous multi-agent pipelines, 3D WebGL engines, and enterprise web infrastructure.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            {agencyBenefits.map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#3FE0E0]">{item.metric}</div>
                <div className="text-xs font-semibold text-white mt-1">{item.title}</div>
                <div className="text-[10px] text-white/50 mt-1">{item.description}</div>
              </div>
            ))}
          </div>

          <a
            href="#partner-intake"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white hover:brightness-110 shadow-xl transition-all"
          >
            <span>Become An Agency Partner</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 2. Collaboration Models */}
      <section className="py-24 bg-[#080911] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono font-bold text-[#3FE0E0] uppercase tracking-widest mb-2">
              COLLABORATION ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-tight mb-4">
              Three Ways We Partner
            </h2>
            <p className="text-white/60 text-sm">
              Whether you need invisible white-label execution or a formidable co-pitching ally, we align incentives around your growth.
            </p>
          </div>

          <div className="space-y-8">
            {agencyModels.map((model) => (
              <div
                key={model.id}
                className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-white/[0.04] to-transparent border border-white/10 hover:border-[#3FE0E0]/50 transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                  <div>
                    <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-[#3FE0E0] px-3 py-1 rounded-full bg-[#3FE0E0]/10 border border-[#3FE0E0]/25 mb-3">
                      {model.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[#3FE0E0] transition-colors">
                      {model.title}
                    </h3>
                    <p className="text-base text-[#34D399] font-medium mb-3">
                      {model.headline}
                    </p>
                    <p className="text-white/70 text-sm max-w-3xl leading-relaxed">
                      {model.description}
                    </p>
                  </div>

                  <a
                    href="#partner-intake"
                    onClick={() => setPreferredModel(model.title)}
                    className="shrink-0 px-6 py-2.5 rounded-full text-xs font-bold bg-white/10 hover:bg-[#3FE0E0] hover:text-black text-white transition-all inline-flex items-center gap-2 border border-white/10"
                  >
                    <span>Choose Model</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid md:grid-cols-2 gap-3 pt-6 border-t border-white/10">
                  {model.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#3FE0E0] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 text-[11px] font-mono text-white/40">
                  <span className="text-[#3FE0E0]">IDEAL FOR:</span> {model.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Tech We Give Your Agency */}
      <section className="py-20 bg-[#06070D] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              CAPABILITY MATRIX
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mb-3">
              Capabilities You Can Sell Tomorrow
            </h2>
            <p className="text-white/60 text-sm">
              Instant access to high-demand enterprise offerings without the overhead of building an in-house R&D division.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#3FE0E0]/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#121324] border border-white/10 flex items-center justify-center mb-4 text-[#3FE0E0]">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Autonomous Multi-Agent Swarms</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Deploy white-labeled MarksOps instances for your clients: automated CRM lead enrichment, multi-channel review harvesting, and autonomous support routing.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#A78BFA]/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#121324] border border-white/10 flex items-center justify-center mb-4 text-[#A78BFA]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">3D WebGL & Spatial Micro-Sites</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Level up your design pitches with interactive Three.js 3D web canvases, physics-based simulations, and 60fps luxury landing pages that blow client boards away.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#34D399]/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#121324] border border-white/10 flex items-center justify-center mb-4 text-[#34D399]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">High-Ticket Attribution & Media</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Offer server-side Meta CAPI setups, TripleWhale attribution data modeling, and algorithmic ad testing pipelines that justify premium \$15k+/mo media retainers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Partner Application Form */}
      <section id="partner-intake" className="py-24 bg-[#080911] border-t border-white/10 relative">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow">
              <span className="w-2 h-2 rounded-full bg-[#3FE0E0]" />
              AGENCY ALLIANCE INTAKE
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-tight mb-3">
              Explore A Strategic Partnership
            </h2>
            <p className="text-white/60 text-sm">
              We onboard a limited cohort of non-competing partner agencies per quarter to maintain elite delivery focus.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-white/[0.06] to-white/[0.015] border border-white/15 backdrop-blur-xl shadow-2xl">
            {submitted ? (
              <div className="p-10 rounded-3xl bg-[#121324] border border-[#3FE0E0] text-center">
                <div className="w-16 h-16 rounded-full bg-[#3FE0E0] text-black flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Partnership Request Received!</h3>
                <p className="text-white/70 text-sm max-w-md mx-auto">
                  Our agency alliance leads will review your agency profile and schedule a 30-minute confidential scoping call within 24 hours.
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
                        href="mailto:partners@qalalabs.com"
                        className="inline-flex items-center gap-1 font-semibold text-[#3FE0E0] hover:underline shrink-0 text-xs uppercase tracking-wider"
                      >
                        Email Directly &rarr;
                      </a>
                      <a
                        href="https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20we'd%20like%20to%20discuss%20an%20Agency%20Collective%20partnership."
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
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Agency / Studio Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Apex Digital Studios"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Your Name & Role *</label>
                    <input
                      type="text"
                      required
                      placeholder="Marcus Chen, Managing Director"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Business Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@apexdigital.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Direct Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+44 20 7946 0958 or +1 415 555 2671"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Agency Website URL *</label>
                    <input
                      type="text"
                      required
                      placeholder="https://apexdigital.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">Agency Team Size *</label>
                    <select
                      value={agencySize}
                      onChange={(e) => setAgencySize(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0B0C16] border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    >
                      <option value="1-5 Specialists (Boutique)">1-5 Specialists (Boutique)</option>
                      <option value="6-20 Specialists">6-20 Specialists</option>
                      <option value="21-50 Specialists">21-50 Specialists</option>
                      <option value="50+ Enterprise Studio">50+ Enterprise Studio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">Primary Collaboration Model *</label>
                  <select
                    value={preferredModel}
                    onChange={(e) => setPreferredModel(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0B0C16] border border-white/20 rounded-xl text-sm text-white focus:outline-none focus:border-[#3FE0E0] transition-colors"
                  >
                    <option value="White-Label AI & Engineering Infrastructure">
                      White-Label AI & Engineering Infrastructure (Unbranded delivery)
                    </option>
                    <option value="Enterprise Joint Ventures & Co-Pitching">
                      Enterprise Joint Ventures & Co-Pitching (Win larger tenders together)
                    </option>
                    <option value="Inbound Referral & Reciprocal Deal Flow">
                      Inbound Referral & Reciprocal Deal Flow (Monetize out-of-scope inquiries)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">
                    Current Needs or Target Opportunities *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about a client brief you want to win, an AI workflow you want to offer, or where your current technical bottlenecks are..."
                    value={scopeDetails}
                    onChange={(e) => setScopeDetails(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-2xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[11px] text-white/40">
                    Direct alliance lead:{' '}
                    <a href="mailto:partners@qalalabs.com" className="text-[#3FE0E0] hover:underline">
                      partners@qalalabs.com
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
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Partnership Request</span>
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
