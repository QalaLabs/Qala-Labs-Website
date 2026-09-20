import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, BarChart3, Zap, Search, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';

const deliverables = [
  {
    icon: Search,
    title: 'AI Search Visibility Score',
    description: 'Where your brand currently appears (or doesn\'t) across ChatGPT, Perplexity, Google AI Overviews, and voice search.',
  },
  {
    icon: BarChart3,
    title: 'Channel Efficiency Analysis',
    description: 'A breakdown of which paid and organic channels are driving profitable growth — and which are burning budget.',
  },
  {
    icon: Zap,
    title: '5 Immediate Quick Wins',
    description: 'Specific, actionable changes you can make in the next 30 days to improve performance without increasing spend.',
  },
  {
    icon: Clock,
    title: 'Growth Roadmap',
    description: 'A 90-day prioritised action plan with estimated impact and effort for each recommendation.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Fill the form',
    description: 'Tell us about your business, current channels, and biggest growth bottleneck. Takes 2 minutes.',
  },
  {
    step: '02',
    title: 'We analyse everything',
    description: 'Our team audits your ads, SEO, AI search presence, and analytics within 48 hours.',
  },
  {
    step: '03',
    title: 'Receive your report',
    description: 'You get a custom PDF report with scores, benchmarks, and ranked recommendations.',
  },
  {
    step: '04',
    title: '15-minute strategy call',
    description: 'We walk you through the findings, answer your questions, and show you the fastest path forward.',
  },
];

const socialProof = [
  {
    quote: 'The audit identified ₹3L/month in wasted ad spend in the first pass. Switched agencies within a week.',
    author: 'Founder, D2C Wellness Brand',
    revenue: '₹4Cr/yr revenue',
  },
  {
    quote: 'We had no idea our brand was completely invisible to ChatGPT. The AI visibility report was a wake-up call.',
    author: 'CMO, B2B SaaS Platform',
    revenue: '₹12Cr ARR',
  },
  {
    quote: 'Most agencies sell during audits. Qala Labs gave us a report so detailed we could act on it ourselves — which is exactly why we chose to work with them.',
    author: 'Co-founder, Real Estate Developer',
    revenue: '500+ units sold',
  },
];

const industries = [
  'D2C / eCommerce',
  'SaaS / Tech',
  'Real Estate',
  'B2B Services',
  'Healthcare',
  'Education',
  'F&B',
  'Other',
];

const AIAudit = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    industry: 'D2C / eCommerce',
    monthly_revenue: '5L-25L',
    biggest_challenge: '',
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.website.trim()) {
      showError('Please enter your brand or website URL.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.website.trim()) {
      showError('Please fill in your name, email, and website.');
      return;
    }
    setLoading(true);

    try {
      const payload = {
        ...formData,
        source_url: typeof window !== 'undefined' ? window.location.href : '',
        timestamp: new Date().toISOString(),
      };

      try {
        await supabase.from('leads').insert({
          email: formData.email.trim(),
          tool_used: 'ai_audit_form',
          data: payload,
        });
      } catch (dbErr) {
        console.warn('Supabase insert warning:', dbErr);
      }

      try {
        const res = await fetch('/api/lead.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email.trim(),
            tool_used: 'ai_audit_form',
            data: payload,
          }),
        });
        if (!res.ok) {
          console.warn('Email trigger status:', res.status);
        }
      } catch (err) {
        console.error('Email trigger failed:', err);
      }

      setSubmitted(true);
      showSuccess("Audit request confirmed! We'll deliver your report within 48 hours.");
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ai_audit_form_submitted', { email: formData.email });
      }
    } catch {
      showError('Something went wrong. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Free AI Growth Audit | 15-Minute Strategy Session | Qala Labs"
        description="Get a free, personalised AI growth audit from Qala Labs. We'll audit your paid ads, SEO, AI search visibility, and analytics — and deliver 5 quick wins within 48 hours."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Free AI Audit', url: '/ai-audit' },
        ]}
      />
      <Navbar />

      {/* Hero + Form */}
      <section className="pt-36 pb-24 bg-[#06070D] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-[#06070D] to-[#06070D]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-8"
              >
                Free · No Obligation · 48-Hour Turnaround
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight leading-[1.05]"
              >
                Find Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                  Biggest Growth Lever.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-400 leading-relaxed mb-10"
              >
                Most brands are wasting 30–50% of their marketing budget without knowing it. Our free AI Growth Audit identifies where you're losing money, which channels deserve more investment, and exactly what to do next — delivered in 48 hours.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                {[
                  'Completely free — no credit card, no sales pressure',
                  'Personalised report based on your actual data',
                  '48-hour delivery from form submission',
                  '15-min video call to walk through findings',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">You're in the queue.</h3>
                    <p className="text-slate-600 mb-8">
                      We'll have your personalised AI Growth Audit ready within 48 hours. Check your inbox — we'll reach out to schedule your 15-minute call.
                    </p>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 text-blue-600 font-black hover:underline"
                    >
                      Back to homepage <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-wider">
                          Step {step} of 2
                        </span>
                        <span className="text-xs font-mono text-slate-400">48-Hr Delivery</span>
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 mb-1">
                        {step === 1 ? "Brand & Funnel Diagnostic" : "Where Should We Send The Report?"}
                      </h2>
                      <p className="text-slate-500 text-xs">
                        {step === 1 ? "Step 1 of 2: Let's inspect your current channel efficiency." : "Step 2 of 2: Recipient contact for custom PDF + Loom breakdown."}
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all duration-300"
                          style={{ width: step === 1 ? "50%" : "100%" }}
                        />
                      </div>
                    </div>

                    {step === 1 ? (
                      <form onSubmit={handleNext} className="space-y-4">
                        <div>
                          <Label htmlFor="audit-website" className="text-xs font-black uppercase tracking-widest text-slate-600 mb-1.5 block">
                            Brand Website URL *
                          </Label>
                          <Input
                            id="audit-website"
                            name="website"
                            type="url"
                            autoComplete="url"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://yourbrand.com"
                            required
                            className="rounded-xl h-12 text-sm"
                          />
                        </div>

                        <div>
                          <Label className="text-xs font-black uppercase tracking-widest text-slate-600 mb-1.5 block">
                            Industry / Sector
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            {['D2C / eCommerce', 'SaaS / Tech', 'Real Estate', 'B2B / Other'].map((ind) => (
                              <button
                                key={ind}
                                type="button"
                                onClick={() => setFormData({ ...formData, industry: ind })}
                                className={cn(
                                  "h-10 px-3 rounded-xl border text-xs font-bold transition-all text-center flex items-center justify-center",
                                  formData.industry === ind
                                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-400"
                                )}
                              >
                                {ind}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs font-black uppercase tracking-widest text-slate-600 mb-1.5 block">
                            Current Monthly Revenue
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { label: '< ₹5L/mo', val: 'under-5L' },
                              { label: '₹5L - ₹25L', val: '5L-25L' },
                              { label: '₹25L - ₹1Cr', val: '25L-1Cr' },
                              { label: '₹1Cr+', val: '1Cr-5Cr' }
                            ].map((rev) => (
                              <button
                                key={rev.val}
                                type="button"
                                onClick={() => setFormData({ ...formData, monthly_revenue: rev.val })}
                                className={cn(
                                  "h-10 px-3 rounded-xl border text-xs font-bold transition-all text-center flex items-center justify-center",
                                  formData.monthly_revenue === rev.val
                                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400"
                                )}
                              >
                                {rev.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black h-13 min-h-[48px] rounded-xl text-sm shadow-lg shadow-blue-500/20 mt-2"
                        >
                          <span>Continue to Step 2</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                        <div className="text-center pt-2">
                          <a 
                            href="https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I'd%20like%20to%20request%20a%20quick%20growth%20audit."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-emerald-600 hover:underline inline-flex items-center gap-1"
                          >
                            <span>Prefer WhatsApp? Fast-track here →</span>
                          </a>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="audit-name" className="text-xs font-black uppercase tracking-widest text-slate-600 mb-1.5 block">
                              Name *
                            </Label>
                            <Input
                              id="audit-name"
                              name="name"
                              autoComplete="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Arjun Mehta"
                              required
                              className="rounded-xl h-12 text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="audit-phone" className="text-xs font-black uppercase tracking-widest text-slate-600 mb-1.5 block">
                              WhatsApp Phone *
                            </Label>
                            <Input
                              id="audit-phone"
                              name="phone"
                              type="tel"
                              autoComplete="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+91 98765 43210"
                              required
                              className="rounded-xl h-12 text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="audit-email" className="text-xs font-black uppercase tracking-widest text-slate-600 mb-1.5 block">
                            Work Email *
                          </Label>
                          <Input
                            id="audit-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="arjun@yourbrand.com"
                            required
                            className="rounded-xl h-12 text-sm"
                          />
                        </div>

                        <div>
                          <Label htmlFor="audit-bottleneck" className="text-xs font-black uppercase tracking-widest text-slate-600 mb-1.5 block">
                            Biggest Bottleneck <span className="text-slate-400 font-normal">(Optional)</span>
                          </Label>
                          <textarea
                            id="audit-bottleneck"
                            name="biggest_challenge"
                            value={formData.biggest_challenge}
                            onChange={(e) => setFormData({ ...formData, biggest_challenge: e.target.value })}
                            placeholder="E.g. rising CPAs, poor organic search, low retention..."
                            rows={2}
                            className="w-full border border-input bg-background rounded-xl px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                          />
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(1)}
                            className="h-13 min-h-[48px] px-4 rounded-xl border-slate-200 text-slate-700"
                          >
                            Back
                          </Button>
                          <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black h-13 min-h-[48px] rounded-xl text-sm shadow-lg shadow-blue-500/20"
                          >
                            {loading ? (
                              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Preparing...</>
                            ) : (
                              <>Get My Free 48-Hr Audit <ArrowRight className="w-4 h-4 ml-2" /></>
                            )}
                          </Button>
                        </div>

                        <p className="text-center text-[11px] text-slate-400 pt-1">
                          Zero spam. Confidential 48-hr diagnosis tailored to your unit economics.
                        </p>
                      </form>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-xs font-black uppercase tracking-widest mb-6"
            >
              What's Inside
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              What you get with your audit.
            </h2>
            <p className="text-slate-600">This isn't a generic checklist. Every audit is custom-built for your brand and channels.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600/15 transition-colors">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">{d.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{d.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-white mb-4 tracking-tight">How it works.</h2>
            <p className="text-slate-400">From form to findings in 48 hours.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white/5 border border-white/10 rounded-3xl p-8"
              >
                <div className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">{s.step}</div>
                <h3 className="text-xl font-black text-white mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">What clients say.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {socialProof.map((sp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 italic">"{sp.quote}"</p>
                <div>
                  <div className="font-black text-slate-900 text-sm">{sp.author}</div>
                  <div className="text-slate-500 text-xs mt-1">{sp.revenue}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              Stop guessing. Start growing.
            </h2>
            <p className="text-blue-100 text-lg mb-10">
              It's free. It's fast. And it might be the most valuable 2 minutes you spend on your marketing this quarter.
            </p>
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-2xl font-black text-lg transition-colors group"
            >
              Get My Free Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAudit;
