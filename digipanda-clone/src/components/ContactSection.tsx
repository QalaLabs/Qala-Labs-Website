import React, { useState } from 'react';
import { ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';

const partnersList = [
  'WWF India',
  'Chrono Seconds',
  'playR Merchandise',
  'Nutrivend UK',
  'Trotr Spain',
  'Gaffar India',
  'Mizuno India',
  'Capital Keys',
  'Mystic Studio 8',
  'Amazon Advertising',
  'Meta Marketing Partner',
  'Shopify Plus Ecosystem',
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    description: '',
    agree: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
        description: formData.description,
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

  return (
    <section id="contact-form" className="relative py-28 bg-[#06070D] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/form_bg.webp')] bg-cover bg-center opacity-25 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-center text-white mb-16 leading-tight flex flex-wrap items-center justify-center gap-3">
          <span>Let's Build</span>
          <span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white font-extrabold text-2xl md:text-3xl shadow-[0_0_25px_rgba(63,224,224,0.4)]">
            Q
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0]">Greatness</span>
          <span>Together!</span>
        </h2>

        {/* Form & Trust Card */}
        <div className="rounded-[40px] border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.015] backdrop-blur-xl p-6 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Form */}
            <div className="lg:col-span-7">
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-6">
                Discuss Your Vision With Us
              </h3>

              {submitted ? (
                <div className="p-8 rounded-3xl bg-[#121324] border border-[#3FE0E0] text-center">
                  <div className="w-16 h-16 rounded-full bg-[#3FE0E0] text-black flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Inquiry Received!</h4>
                  <p className="text-white/70 text-sm">
                    Thank you for reaching out to Qala Labs. A growth and engineering specialist will contact you within 24 hours.
                  </p>
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
