import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  Cpu,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  MapPin,
  Clock,
  DollarSign,
  Send,
  ExternalLink,
} from 'lucide-react';
import { PageLayout } from './PageLayout';
import { openRoles, culturePillars, perksList, JobRole } from '../data/careersData';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6 text-[#3FE0E0]" />,
  Cpu: <Cpu className="w-6 h-6 text-[#A78BFA]" />,
  Zap: <Zap className="w-6 h-6 text-[#FBBF24]" />,
  Globe: <Globe className="w-6 h-6 text-[#34D399]" />,
};

export const CareersPage: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [activeRoleModal, setActiveRoleModal] = useState<JobRole | null>(null);

  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [selectedRoleTitle, setSelectedRoleTitle] = useState<string>('');
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const departments = ['All', 'AI & Agents', 'Engineering', 'Creative & Design', 'Growth & Strategy'];

  const filteredRoles =
    selectedDept === 'All'
      ? openRoles
      : openRoles.filter((role) => role.department === selectedDept);

  const handleOpenApply = (role?: JobRole) => {
    if (role) {
      setActiveRoleModal(role);
      setSelectedRoleTitle(role.title);
    } else {
      setSelectedRoleTitle('General Application / Pitch Your Craft');
    }
    setSubmitted(false);
    setErrorMessage(null);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const payload = {
        name: applicantName,
        companyName: `Applicant: ${selectedRoleTitle || 'General Application'}`,
        phone: applicantPhone,
        email: applicantEmail,
        description: `Role Applied: ${selectedRoleTitle}\nPortfolio/Links: ${portfolioLink}\n\nPitch/Experience:\n${coverNote}`,
        source: 'careers_page',
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
        let errDesc = `Application submission encountered an issue (${response.status})`;
        try {
          const resJson = await response.json();
          if (resJson?.error) errDesc = resJson.error;
        } catch {
          // ignore parse error
        }
        throw new Error(errDesc);
      }

      // Strictly gate success only when response.ok is confirmed
      setSubmitted(true);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setPortfolioLink('');
      setCoverNote('');
    } catch (err: any) {
      console.error('Career application submission failed:', err);
      setErrorMessage(
        err?.message || 'Submission encountered an error. Please apply directly via email to careers@qalalabs.com'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-20 bg-[#06070D] overflow-hidden">
        {/* Subtle cybernetic glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#4F46E5]/20 to-[#3FE0E0]/15 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
            JOIN THE EXPEDITION // CAREERS AT QALA LABS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-medium text-white tracking-tight leading-tight mt-4 mb-6">
            Build The Future Of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399]">
              Creative Intelligence.
            </span>
          </h1>

          <p className="text-white/70 text-base sm:text-xl font-normal max-w-3xl mx-auto leading-relaxed mb-10">
            We are artisans, systems architects, researchers, and growth engineers. We replace mundane corporate drag with
            autonomous agent leverage, giving ambitious minds the canvas to create world-class software and culture-defining brands.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/60">
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#3FE0E0]" />
              Remote-First & 4 Global Hubs
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#A78BFA]" />
              MarksOps AI Leverage
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#34D399]" />
              Equity & Profit-Share Tiers
            </span>
          </div>
        </div>
      </section>

      {/* 2. The Qala Operating Code (Culture) */}
      <section className="py-20 bg-[#06070D] border-t border-white/10 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono font-bold text-[#3FE0E0] uppercase tracking-widest mb-2">
              OUR OPERATING CODE
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
              How We Work, Think, and Ship
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {culturePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#3FE0E0]/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#121324] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {iconMap[pillar.iconName]}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-sm font-semibold text-[#3FE0E0] mb-3">{pillar.tagline}</p>
                <p className="text-white/60 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Perks & Benefits */}
      <section className="py-20 bg-[#080911] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-mono font-bold text-[#3FE0E0] uppercase tracking-widest mb-2">
                FOUNDER-GRADE ENVIRONMENT
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight">
                Crafted For High-Output Creators
              </h2>
            </div>
            <p className="text-white/50 text-sm max-w-md mt-4 md:mt-0">
              We invest relentlessly in tooling, autonomy, and wellbeing so you do the best work of your career.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perksList.map((perk, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
              >
                <span className="text-[10px] font-mono text-[#3FE0E0] uppercase tracking-wider block mb-2">
                  {perk.category}
                </span>
                <h4 className="text-base font-bold text-white mb-2">{perk.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Open Roles Directory */}
      <section id="open-roles" className="py-24 bg-[#06070D] border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/30 text-[#4F46E5] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              OPEN ROLES
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-tight mb-4">
              Find Your Trajectory
            </h2>
            <p className="text-white/60 text-sm">
              Filter by discipline and click on any position to inspect the technical stack and apply.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedDept === dept
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white shadow-lg shadow-[#3FE0E0]/20'
                    : 'bg-white/[0.03] text-white/70 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Listings Grid */}
          <div className="space-y-4">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/10 hover:border-[#3FE0E0]/50 transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#3FE0E0]/10 border border-[#3FE0E0]/30 text-[#3FE0E0]">
                        {role.department}
                      </span>
                      <span className="text-xs font-mono text-white/50 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {role.location}
                      </span>
                      <span className="text-xs font-mono text-white/50 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {role.type}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#3FE0E0] transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 max-w-3xl leading-relaxed">
                      {role.tagline}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {role.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-white/60 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleOpenApply(role)}
                      className="px-6 py-3 rounded-full text-xs font-bold bg-white/10 hover:bg-[#3FE0E0] hover:text-black text-white transition-all flex items-center gap-2 border border-white/10"
                    >
                      <span>Role Details & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* General Pitch Box */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#121324] to-[#0A0B14] border border-[#3FE0E0]/30 text-center max-w-3xl mx-auto">
            <h4 className="text-xl font-bold text-white mb-2">Don't See The Exact Role For Your Craft?</h4>
            <p className="text-white/70 text-sm mb-6 max-w-xl mx-auto">
              We frequently hire exceptional polymaths and creators before a formal role is opened. Pitch us what you can build.
            </p>
            <button
              onClick={() => {
                setActiveRoleModal(null);
                handleOpenApply();
              }}
              className="px-8 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white hover:brightness-110 shadow-lg transition-all inline-flex items-center gap-2"
            >
              <span>Pitch Your Craft</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Role Detail & Application Modal */}
      {(activeRoleModal || selectedRoleTitle) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0B0C16] border border-white/20 rounded-[32px] p-6 sm:p-10 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setActiveRoleModal(null);
                setSelectedRoleTitle('');
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Role Header */}
            <div className="mb-6 pr-8">
              <span className="text-[10px] font-mono text-[#3FE0E0] uppercase tracking-widest block mb-1">
                {activeRoleModal?.department || 'OPEN EXPEDITION'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {activeRoleModal?.title || 'Pitch Your Craft to Qala Labs'}
              </h3>
              {activeRoleModal && (
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-white/60">
                  <span>{activeRoleModal.location}</span>
                  <span>•</span>
                  <span>{activeRoleModal.experience}</span>
                  <span>•</span>
                  <span className="text-[#34D399]">{activeRoleModal.compensation}</span>
                </div>
              )}
            </div>

            {/* Role Details Overview (If specific role selected) */}
            {activeRoleModal && (
              <div className="space-y-6 mb-8 border-b border-white/10 pb-8 text-sm">
                <div>
                  <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-xs">About The Mission</h4>
                  <p className="text-white/70 leading-relaxed">{activeRoleModal.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-xs">Core Responsibilities</h4>
                  <ul className="space-y-2">
                    {activeRoleModal.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-[#3FE0E0] shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-xs">Requirements & Instincts</h4>
                  <ul className="space-y-2">
                    {activeRoleModal.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Application Form */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">
                Submit Your Application
              </h4>

              {submitted ? (
                <div className="p-8 rounded-3xl bg-[#121324] border border-[#3FE0E0] text-center">
                  <div className="w-14 h-14 rounded-full bg-[#3FE0E0] text-black flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h5 className="text-xl font-bold text-white mb-2">Application Received!</h5>
                  <p className="text-white/70 text-sm max-w-md mx-auto">
                    Thank you for applying for <span className="text-[#3FE0E0] font-semibold">{selectedRoleTitle}</span>.
                    Our engineering and creative leadership review all applications within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-4">
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
                      <a
                        href={`mailto:careers@qalalabs.com?subject=Application%20for%20${encodeURIComponent(selectedRoleTitle)}`}
                        className="inline-flex items-center gap-1 font-semibold text-[#3FE0E0] hover:underline shrink-0 text-xs uppercase tracking-wider"
                      >
                        Email Directly &rarr;
                      </a>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ada Lovelace"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="ada@domain.com"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1.5">Phone Number (with Country Code) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+44 7123 456789 or +91 98765 43210"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 mb-1.5">Portfolio / GitHub / LinkedIn *</label>
                      <input
                        type="text"
                        required
                        placeholder="https://github.com/... or https://readcv.com/..."
                        value={portfolioLink}
                        onChange={(e) => setPortfolioLink(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1.5">
                      Why Qala Labs & Proof of Work *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about the hardest technical or creative problem you solved, or why you want to collaborate with our team..."
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-2xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3FE0E0] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-white/40">
                      Direct inquiries:{' '}
                      <a href="mailto:careers@qalalabs.com" className="text-[#3FE0E0] hover:underline">
                        careers@qalalabs.com
                      </a>
                    </span>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white hover:brightness-110 disabled:opacity-50 transition-all shadow-xl hover:scale-105"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};
