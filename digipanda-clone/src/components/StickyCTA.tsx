import React, { useState } from 'react';
import { ChevronUp, ChevronDown, X, Sparkles, Send, CheckCircle2, MessageSquare, Loader2, AlertCircle } from 'lucide-react';

export const StickyCTA: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetScale, setTargetScale] = useState('₹1Cr/mo');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const scaleOptions = ['₹25L/mo', '₹50L/mo', '₹1Cr/mo', '₹5Cr/mo+'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const payload = {
        name: name || 'Founder / Growth Lead',
        companyName: `Target Scale: ${targetScale}`,
        phone,
        email,
        description: `Requested Growth Plan for ${targetScale} scale horizon.`,
        source: 'sticky_growth_plan_drawer',
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
        let errDetail = `Server error (${response.status})`;
        try {
          const resData = await response.json();
          if (resData?.error) errDetail = resData.error;
        } catch {
          // ignore parse error
        }
        throw new Error(errDetail);
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
      }, 4000);
    } catch (err) {
      console.error('Lead submission failed:', err);
      setErrorMessage(
        'Submission failed. Please email us directly at hello@qalalabs.com or chat on WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-xl transition-all duration-500 font-sans">
      {/* Drawer Overlay / Modal */}
      {isOpen && (
        <div className="mb-3 p-6 rounded-3xl bg-[#090A15]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_#10B981]" />
              <span className="text-xs font-mono tracking-widest text-[#3FE0E0] uppercase font-bold">
                Direct Growth Plan Architect
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close drawer"
              className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitted ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto mb-3 animate-bounce" />
              <h4 className="text-lg font-bold text-white mb-1">Growth Plan Request Logged</h4>
              <p className="text-xs text-white/70">
                Our principal growth architect will review your {targetScale} roadmap and connect shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-center justify-between gap-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 min-w-0">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <a
                    href="mailto:hello@qalalabs.com"
                    className="underline font-bold text-[#3FE0E0] hover:text-white shrink-0 text-[11px]"
                  >
                    Email
                  </a>
                </div>
              )}
              <div>
                <label className="block text-[11px] font-mono uppercase text-white/60 mb-2">
                  Select Your Target Revenue Horizon:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {scaleOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTargetScale(opt)}
                      className={`py-2 px-1 text-xs rounded-xl font-bold font-mono transition-all border ${
                        targetScale === opt
                          ? 'bg-[#3FE0E0] text-black border-[#3FE0E0] shadow-[0_0_15px_rgba(63,224,224,0.4)]'
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0]"
                />
              </div>

              <input
                type="email"
                required
                placeholder="Business Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#3FE0E0]"
              />

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 shadow-lg transition-all"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Generate My Blueprint</span>
                    </>
                  )}
                </button>

                <a
                  href="https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I%20want%20to%20scale%20my%20business%20to%201Cr%2Fmo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-[#25D366] font-bold text-xs flex items-center gap-1.5 transition-all"
                  title="Direct WhatsApp Chat"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Persistent Pill Bar (Matches Image 1 and Image 2 bottom widget) */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 rounded-full bg-[#0A0C18]/90 backdrop-blur-xl border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:border-white/40 transition-all">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]" />
          </span>
          <span className="text-xs sm:text-sm font-medium text-white truncate">
            Ready to scale past <strong className="text-[#3FE0E0] font-bold">₹1Cr/mo</strong>?
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#3FE0E0] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(63,224,224,0.4)] group"
        >
          <span>Request Growth Plan</span>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};
