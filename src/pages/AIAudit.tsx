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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    monthly_revenue: '',
    biggest_challenge: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.website) {
      showError('Please fill in your name, email, and website.');
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke('lead-engine', {
        body: {
          email: formData.email,
          tool_used: 'ai_audit_form',
          data: {
            ...formData,
            source_url: window.location.href,
            timestamp: new Date().toISOString(),
          },
        },
      });

      if (error) throw error;

      try {
        await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            source: 'ai_audit_page',
            timestamp: new Date().toISOString(),
          }),
        });
      } catch {
        // SMTP fallback silent fail — lead already captured in Supabase
      }

      setSubmitted(true);
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'ai_audit_form_submitted', { email: formData.email });
      }
    } catch {
      showError('Something went wrong. Please try again or email us directly.');
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
                    <div className="mb-8">
                      <h2 className="text-2xl font-black text-slate-900 mb-2">Request Your Free Audit</h2>
                      <p className="text-slate-500 text-sm">Takes 2 minutes. We'll do the rest.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5 block">
                            Name *
                          </Label>
                          <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Arjun Mehta"
                            required
                            className="rounded-xl"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5 block">
                            Phone
                          </Label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5 block">
                          Work Email *
                        </Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="arjun@yourbrand.com"
                          required
                          className="rounded-xl"
                        />
                      </div>

                      <div>
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5 block">
                          Website *
                        </Label>
                        <Input
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://yourbrand.com"
                          required
                          className="rounded-xl"
                        />
                      </div>

                      <div>
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5 block">
                          Industry
                        </Label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full border border-input bg-background rounded-xl px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <option value="">Select your industry</option>
                          {industries.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5 block">
                          Monthly Revenue (approx.)
                        </Label>
                        <select
                          value={formData.monthly_revenue}
                          onChange={(e) => setFormData({ ...formData, monthly_revenue: e.target.value })}
                          className="w-full border border-input bg-background rounded-xl px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          <option value="">Select range</option>
                          <option value="under-5L">Under ₹5L/month</option>
                          <option value="5L-25L">₹5L – ₹25L/month</option>
                          <option value="25L-1Cr">₹25L – ₹1Cr/month</option>
                          <option value="1Cr-5Cr">₹1Cr – ₹5Cr/month</option>
                          <option value="5Cr+">₹5Cr+/month</option>
                        </select>
                      </div>

                      <div>
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5 block">
                          Biggest marketing challenge right now
                        </Label>
                        <textarea
                          value={formData.biggest_challenge}
                          onChange={(e) => setFormData({ ...formData, biggest_challenge: e.target.value })}
                          placeholder="E.g. rising CPAs, poor SEO, no idea which channels work, scaling beyond ₹X..."
                          rows={3}
                          className="w-full border border-input bg-background rounded-xl px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-2xl text-base shadow-lg shadow-blue-500/20"
                      >
                        {loading ? (
                          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                        ) : (
                          <>Get My Free Audit <ArrowRight className="w-4 h-4 ml-2" /></>
                        )}
                      </Button>

                      <p className="text-center text-xs text-slate-400">
                        No spam. No sales calls unless you want one. Unsubscribe anytime.
                      </p>
                    </form>
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
