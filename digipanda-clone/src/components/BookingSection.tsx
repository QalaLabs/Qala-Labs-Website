import React, { useState } from 'react';
import { Calendar, Clock, ExternalLink, MessageCircle, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const GOOGLE_CALENDAR_EMBED_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3uVz0fkqT5IV0zcPl4F9rdcA64YYzPKHZUAw9E8wO85YE95FfNoBcLeshW0STnxhI9ssMUCt6X?gv=true';
const GOOGLE_CALENDAR_DIRECT_URL = 'https://calendar.app.google/EvA2Kw9rgA4xq8798';
const WHATSAPP_URL =
  "https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I'm%20trying%20to%20book%20a%20call%20on%20your%20calendar%20and%20wanted%20to%20coordinate%20a%20time.";

export const BookingSection: React.FC = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [useDirectForm, setUseDirectForm] = useState(false);

  // Direct Appointment Request Form State
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    preferredSlot: '',
    agenda: '',
  });
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
        name: formData.name,
        companyName: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        description: `Appointment Request: 30-Min Growth Diagnostic\nPreferred Slot/Timeline: ${formData.preferredSlot || 'First Available'}\nDiscussion Agenda:\n${formData.agenda}`,
        source: 'appointment_booking',
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
        let errDesc = `Booking failed with status (${response.status})`;
        try {
          const resJson = await response.json();
          if (resJson?.error) errDesc = resJson.error;
        } catch {
          // ignore
        }
        throw new Error(errDesc);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Appointment booking error:', err);
      setErrorMessage(err?.message || 'Unable to submit booking right now. Please message us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book-call" className="relative py-28 bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/bgrk2.webp')] bg-center bg-cover opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-4xl">
        <div className="text-center mb-12">
          <div className="eyebrow">
            <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-blink" />
            Prefer To Talk First?
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Book A 30-Minute <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0]">Growth Call</span>
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto">
            Pick a slot on our live scheduler or submit an appointment request below to receive an instant Google Calendar invite.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
            <a
              href={GOOGLE_CALENDAR_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3FE0E0] hover:brightness-110"
            >
              <span>Open in Google Calendar</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <span className="text-white/30 hidden sm:inline">&bull;</span>

            <button
              type="button"
              onClick={() => setUseDirectForm(!useDirectForm)}
              className="text-xs font-semibold text-[#34D399] hover:underline"
            >
              {useDirectForm ? 'Switch to Interactive Scheduler' : "Calendar blocked? Use Direct Request Form"}
            </button>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.015] backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="bg-[#121324] text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3FE0E0]" />
              <span className="text-xs font-bold tracking-wide">
                {useDirectForm ? 'Direct Appointment Request' : 'Live Availability Engine'}
              </span>
            </div>
            <div className="text-xs text-white/50 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>30-Minute 1-on-1 Growth Diagnostic</span>
            </div>
          </div>

          {useDirectForm ? (
            <div className="p-6 sm:p-10 bg-[#0A0B14]">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-white/[0.03] border border-[#3FE0E0]/30 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#3FE0E0]/20 text-[#3FE0E0] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Appointment Request Confirmed!</h3>
                  <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
                    We've emailed a confirmation to <strong className="text-white">{formData.email}</strong> with Google Meet and calendar sync details.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={GOOGLE_CALENDAR_DIRECT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-black font-bold text-xs hover:brightness-110 transition-all inline-flex items-center gap-2"
                    >
                      <span>Add to Google Calendar</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl border border-white/20 text-white font-medium text-xs hover:bg-white/10 transition-all inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#34D399]" />
                      <span>WhatsApp Fast-Track</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field */}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Marcus Vance"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#3FE0E0] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                        Company / Brand *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Nutrivend UK"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#3FE0E0] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#3FE0E0] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#3FE0E0] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                      Preferred Date &amp; Time Window
                    </label>
                    <input
                      type="text"
                      value={formData.preferredSlot}
                      onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                      placeholder="e.g. Tomorrow 3:00 PM IST or Friday afternoon GMT"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#3FE0E0] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-1.5">
                      Primary Growth Focus / Challenges *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.agenda}
                      onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                      placeholder="Tell us what you want to achieve (e.g. 25x ROAS funnel, AI creative engine, autonomous ops swarms)..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#3FE0E0] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span>{errorMessage}</span>
                        <div className="mt-1 flex items-center gap-3">
                          <a href="mailto:hello@qalalabs.com" className="underline font-bold">Email Us Directly</a>
                          <span>&bull;</span>
                          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#34D399]">WhatsApp Chat</a>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-black font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3FE0E0]/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming Diagnostic Slot...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirm 30-Min Diagnostic Session</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="relative w-full min-h-[640px] bg-[#0A0B14]">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 p-6">
                  <div className="w-8 h-8 border-2 border-[#3FE0E0] border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-xs font-bold">Loading Google Calendar scheduler...</p>
                </div>
              )}
              <iframe
                src={GOOGLE_CALENDAR_EMBED_URL}
                className="w-full h-[680px] border-0"
                title="Schedule a 30-minute call with Qala Labs"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-white/50 mb-2">Can't find a time that fits your timezone?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#3FE0E0] hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Coordinate custom timing via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
