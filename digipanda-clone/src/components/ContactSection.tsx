import React, { useState } from 'react';
import { ArrowRight, Check, Loader2, AlertCircle, MessageCircle, Calendar, ExternalLink, RefreshCw, Mail } from 'lucide-react';

const GOOGLE_CALENDAR_EMBED_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3uVz0fkqT5IV0zcPl4F9rdcA64YYzPKHZUAw9E8wO85YE95FfNoBcLeshW0STnxhI9ssMUCt6X?gv=true';
const GOOGLE_CALENDAR_DIRECT_URL = 'https://calendar.app.google/EvA2Kw9rgA4xq8798';

const partnersList = [
  'TeleCMI (Cloud Telephony)',
  'Interakt (WhatsApp API)',
  'Easebuzz (Payment Infra)',
  'playR Merchandise',
  'WWF India',
  'Gaffar India',
  'Chrono Seconds',
  'Nutrivend UK',
  'Trotr Spain',
  'Mizuno India',
  'Capital Keys',
  'Mystic Studio 8',
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    agree: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCalendarEmbed, setShowCalendarEmbed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const fullDescription = formData.website
        ? `${formData.description}\nWebsite: ${formData.website}`
        : formData.description;

      const payload = {
        name: formData.name,
        companyName: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        description: fullDescription,
        source: 'contact_section',
      };

      // Try serverless endpoint first, fallback to PHP if 404
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
        let errMessage = `Server error (${response.status})`;
        try {
          const resData = await response.json();
          if (resData?.error) errMessage = resData.error;
        } catch {
          // ignore parse error
        }
        throw new Error(errMessage);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Lead submission failed:', err);
      setErrorMessage('Submission failed. Please email us directly at hello@qalalabs.com');
    } finally {
      setLoading(false);
    }
  };

  const whatsappHref = `https://wa.me/916006760151?text=${encodeURIComponent(
    `Hi Qala Labs, I just submitted an inquiry for ${formData.companyName || 'my brand'}. Let's discuss our growth requirements.`
  )}`;

  return (
    <section id="contact-form" className="relative py-28 bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(79,70,229,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/assets/form_bg.webp')] bg-cover bg-center opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Real-Time Booking Status Indicator */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium tracking-wide shadow-[0_0_25px_rgba(16,185,129,0.15)] backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-center">
              <span className="font-semibold text-emerald-200">2 Discovery Slots Open for This Week</span>
              <span className="hidden sm:inline"> &mdash; London &amp; Delhi</span>
              <span className="text-emerald-400/80 text-xs ml-1.5 font-mono">(Avg response: 4h)</span>
            </span>
          </div>
        </div>

        {/* Section Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-center text-white mb-10 leading-tight flex flex-wrap items-center justify-center gap-3">
          <span>Let's Build</span>
          <span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white font-extrabold text-2xl md:text-3xl shadow-[0_0_25px_rgba(63,224,224,0.4)]">
            Q
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0]">Greatness</span>
          <span>Together!</span>
        </h2>

        {/* 3-Step Engagement Roadmap Visualizer */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="p-3 sm:p-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-xl">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              
              {/* Step 1 */}
              <div className="flex-1 flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#3FE0E0]/30 transition-all group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#3FE0E0] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  01
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-[#3FE0E0] transition-colors">
                    20-min Discovery
                  </div>
                  <div className="text-[11px] text-white/50 truncate">
                    No pitch. Direct unit economics review
                  </div>
                </div>
              </div>

              {/* Connecting Gradient Line (Desktop) */}
              <div className="hidden md:flex items-center justify-center shrink-0 px-1">
                <div className="w-8 lg:w-12 h-0.5 bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399] relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#3FE0E0] shadow-[0_0_8px_#3FE0E0]" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex-1 flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#3FE0E0]/30 transition-all group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#3FE0E0] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  02
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-[#3FE0E0] transition-colors">
                    Custom Revenue Audit <span className="text-[#34D399] text-[11px] font-normal">(Free)</span>
                  </div>
                  <div className="text-[11px] text-white/50 truncate">
                    Attribution telemetry &amp; leak modeling
                  </div>
                </div>
              </div>

              {/* Connecting Gradient Line (Desktop) */}
              <div className="hidden md:flex items-center justify-center shrink-0 px-1">
                <div className="w-8 lg:w-12 h-0.5 bg-gradient-to-r from-[#4F46E5] via-[#3FE0E0] to-[#34D399] relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#3FE0E0] shadow-[0_0_8px_#3FE0E0]" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex-1 flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#3FE0E0]/30 transition-all group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#3FE0E0] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  03
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-[#3FE0E0] transition-colors">
                    48h Sprint Roadmap
                  </div>
                  <div className="text-[11px] text-white/50 truncate">
                    Actionable backlog &amp; deployment plan
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Form & Trust Card */}
        <div className="rounded-[40px] border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.015] backdrop-blur-xl p-6 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Form */}
            <div className="lg:col-span-7">
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-6">
                Discuss Your Vision With Us
              </h3>

              {submitted ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121324] border border-[#3FE0E0]/40 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#3FE0E0] text-black flex items-center justify-center shrink-0 shadow-lg shadow-[#3FE0E0]/20">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white">Inquiry Received!</h4>
                      <p className="text-white/60 text-xs sm:text-sm">
                        Thank you for reaching out to Qala Labs.
                      </p>
                    </div>
                  </div>

                  {/* Auto-reply email confirmation pill */}
                  <div className="mb-6 p-3.5 rounded-2xl bg-[#4F46E5]/10 border border-[#4F46E5]/30 flex items-center gap-3 text-xs text-white/80">
                    <Mail className="w-4 h-4 text-[#3FE0E0] shrink-0" />
                    <span>
                      <strong className="text-white">Auto-reply sent:</strong> An automated confirmation has been dispatched to{' '}
                      <span className="text-[#3FE0E0] font-mono">{formData.email || 'your email'}</span>.
                    </span>
                  </div>

                  <p className="text-white/80 text-sm mb-6 leading-relaxed">
                    Our performance team has received your submission for <span className="text-white font-semibold">{formData.companyName || 'your brand'}</span>. How would you prefer to connect next?
                  </p>

                  {/* Two Immediate Action Paths */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Option 1: WhatsApp */}
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/20 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <MessageCircle className="w-6 h-6 text-[#25D366]" />
                          <span className="text-[10px] font-mono font-bold text-[#25D366] bg-[#25D366]/20 px-2 py-0.5 rounded-full">
                            FASTEST
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-white group-hover:text-[#25D366] transition-colors">
                          WhatsApp Direct Chat
                        </h5>
                        <p className="text-xs text-white/60 mt-1">
                          Message our growth team directly on WhatsApp with your query prefilled.
                        </p>
                      </div>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366]">
                        <span>Open WhatsApp</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>

                    {/* Option 2: 30-Min Growth Diagnostic */}
                    <button
                      type="button"
                      onClick={() => setShowCalendarEmbed((prev) => !prev)}
                      className="p-4 rounded-2xl bg-[#4F46E5]/10 border border-[#4F46E5]/30 hover:border-[#3FE0E0] hover:bg-[#4F46E5]/20 transition-all flex flex-col justify-between text-left group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Calendar className="w-6 h-6 text-[#3FE0E0]" />
                          <span className="text-[10px] font-mono font-bold text-[#3FE0E0] bg-[#3FE0E0]/20 px-2 py-0.5 rounded-full">
                            30 MIN
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-white group-hover:text-[#3FE0E0] transition-colors">
                          Book a 30-min Google Meet
                        </h5>
                        <p className="text-xs text-white/60 mt-1">
                          Pick a dedicated slot on Google Calendar with zero back-and-forth emails.
                        </p>
                      </div>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#3FE0E0]">
                        <span>{showCalendarEmbed ? 'Hide Calendar' : 'View Available Slots'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>

                  {/* Optional Calendar Scheduler Embed when clicked */}
                  {showCalendarEmbed && (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 bg-[#0A0B14]">
                      <div className="px-4 py-2.5 bg-[#121324] border-b border-white/10 flex items-center justify-between">
                        <span className="text-xs text-white/70 font-mono">Google Calendar Scheduler</span>
                        <a
                          href={GOOGLE_CALENDAR_DIRECT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#3FE0E0] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open in New Tab</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <iframe
                        src={GOOGLE_CALENDAR_EMBED_URL}
                        className="w-full h-[520px] border-0"
                        title="Book a 30-minute growth diagnostic"
                      />
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setShowCalendarEmbed(false);
                      }}
                      className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Submit another inquiry</span>
                    </button>
                    <a
                      href="mailto:hello@qalalabs.com"
                      className="text-xs text-[#3FE0E0] hover:underline"
                    >
                      hello@qalalabs.com
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-200 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                      <a
                        href="mailto:hello@qalalabs.com"
                        className="inline-flex items-center gap-1 font-semibold text-[#3FE0E0] hover:underline shrink-0 text-xs uppercase tracking-wider"
                      >
                        Email directly &rarr;
                      </a>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 bg-transparent border border-white/20 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Company / Brand Name *"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-6 py-4 bg-transparent border border-white/20 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center border border-white/20 rounded-full px-4 bg-transparent focus-within:border-[#3FE0E0] transition-colors">
                      <span className="text-sm text-white/50 pr-2 border-r border-white/10 flex items-center gap-1.5">
                        <img src="/assets/india-flag.png" alt="India" className="w-4 h-4 rounded-sm object-cover" />
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="Contact Number *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-4 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                      />
                    </div>

                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 bg-transparent border border-white/20 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Website URL (e.g. https://yourbrand.com)"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-6 py-4 bg-transparent border border-white/20 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0] transition-colors"
                    />
                  </div>

                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project, goals, or bottlenecks *"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-6 py-4 bg-transparent border border-white/20 rounded-3xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0] transition-colors resize-none"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-white/70 select-none">
                      <input
                        type="checkbox"
                        checked={formData.agree}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                        className="rounded border-gray-600 accent-[#3FE0E0] w-4 h-4"
                      />
                      <span>
                        I accept the privacy policy and consent to be contacted regarding this project.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] hover:brightness-110 disabled:opacity-50 text-white py-3 px-8 rounded-full font-bold text-sm transition-all duration-300 shadow-xl hover:scale-105 group"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Backed by Data */}
            <div className="lg:col-span-5 lg:pl-6 lg:border-l border-white/10">
              <h4 className="text-2xl font-medium text-white mb-2">
                Backed by Data, Driven by Craft
              </h4>
              <p className="text-white/70 text-sm mb-6">
                From high-ticket travel funnels to global conservation campaigns and IPL merchandise ecosystems.
              </p>

              <div className="grid grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-2">
                {partnersList.map((partner, i) => (
                  <div
                    key={i}
                    className="bg-[#121324] border border-white/10 rounded-xl p-3.5 flex items-center justify-center h-20 text-center hover:border-[#3FE0E0]/40 transition-colors"
                  >
                    <span className="font-semibold text-xs md:text-sm text-white/90">
                      {partner}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
