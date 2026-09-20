"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail, Phone, Instagram, Linkedin, MapPin, MessageCircle, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
  "Performance Media",
  "Creative & Shoots",
  "Web & Conversion",
  "AI Automation"
];

const revenueRanges = [
  "< ₹5L/mo",
  "₹5L - ₹15L",
  "₹15L - ₹50L",
  "₹50L+"
];

const WHATSAPP_URL = "https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I'd%20like%20to%20request%20a%20growth%20audit%20for%20my%20DTC%20brand.";

const Contact = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    service: 'Performance Media',
    revenue: '₹5L - ₹15L',
    message: ''
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.website.trim()) {
      showError("Please enter your website or brand link.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      showError("Please complete your contact details.");
      return;
    }
    setLoading(true);

    const payload = {
      ...formData,
      source_url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString()
    };

    // 1. Capture lead in Supabase
    try {
      await supabase.from('leads').insert({
        email: formData.email.trim(),
        tool_used: 'contact_page_progressive',
        data: payload
      });
    } catch (dbErr) {
      console.warn("Supabase lead insert warning:", dbErr);
    }

    // 2. Trigger notification email via unified lead endpoint
    try {
      const res = await fetch('/api/lead.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          tool_used: 'contact_page_progressive',
          data: payload
        })
      });
      if (!res.ok) {
        console.warn("Lead email notification warning:", res.status);
      }
    } catch (smtpError) {
      console.error("Email trigger failed:", smtpError);
    }

    setLoading(false);
    setSubmitted(true);
    showSuccess("Audit request received! We'll be in touch within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <SEO
        title="Book a Free Growth Audit | DTC Performance Marketing Agency India"
        description="Get a free 15-minute performance audit and 90-day revenue growth plan for your DTC brand. Meta Ads, Google Shopping, Amazon, AI automation — we cover it all."
      />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column — Value Proposition & Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-700 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
              DTC Revenue Diagnostics
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              Let's Build Your <br /> <span className="text-blue-600">Scale Engine.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-xl">
              We partner with ambitious D2C brands ready to scale past ₹1Cr/mo without burning cash on unmeasured ad spend. Fill out the diagnosis below or jump straight to WhatsApp.
            </p>

            {/* Direct WhatsApp Fast Track Box */}
            <div className="mb-10 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Prefer an immediate chat?</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Connect with our growth engineering lead directly.</p>
                </div>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Traditional Contact Info */}
            <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/60 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Direct Inquiries</h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">hello@qalalabs.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/60 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Phone Line</h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">+91 60067 60151</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/60 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Delhi Innovation Lab</h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">2nd Floor, SE 30, Gyan Shakti Mandir Marg, Shalimar Bagh, New Delhi, 110088</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column — 2-Step Progressive Micro-Commitment Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <CardHeader className="bg-slate-900 text-white p-6 sm:p-8">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-blue-600 text-white text-[10px] uppercase font-bold tracking-wider">
                    Step {step} of 2
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">48-Hr Delivery</span>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-black">
                  {step === 1 ? "Diagnose Your Growth Potential" : "Where Should We Send The Plan?"}
                </CardTitle>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  {step === 1 
                    ? "Tell us about your brand to customize the 90-day roadmap." 
                    : "Enter your contact info to receive the confidential teardown."}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                  <motion.div 
                    className="bg-blue-500 h-full rounded-full"
                    animate={{ width: step === 1 ? "50%" : "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 bg-white dark:bg-slate-900">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-950/60 rounded-full flex items-center justify-center mx-auto mb-5 text-green-600">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Diagnosis Scheduled!</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
                      Our growth engineering team is running initial funnel checks on <span className="font-bold text-slate-900 dark:text-white">{formData.website}</span>. Expect your audit via email & WhatsApp within 24 hours.
                    </p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.form
                        key="step-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        onSubmit={handleNext}
                        className="space-y-5"
                      >
                        {/* Service Focus Pills */}
                        <div className="space-y-1.5">
                          <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Primary Scaling Need
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            {services.map(s => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setFormData({ ...formData, service: s })}
                                className={cn(
                                  "h-11 px-3 rounded-xl border text-xs font-bold transition-all text-center flex items-center justify-center",
                                  formData.service === s
                                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                    : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400"
                                )}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Revenue / Ad Spend Range Pills */}
                        <div className="space-y-1.5">
                          <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Monthly Ad Spend
                          </Label>
                          <div className="grid grid-cols-2 gap-2">
                            {revenueRanges.map(r => (
                              <button
                                key={r}
                                type="button"
                                onClick={() => setFormData({ ...formData, revenue: r })}
                                className={cn(
                                  "h-11 px-3 rounded-xl border text-xs font-bold transition-all text-center flex items-center justify-center",
                                  formData.revenue === r
                                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm"
                                    : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                                )}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Website URL */}
                        <div className="space-y-1">
                          <Label htmlFor="website" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Brand / Website URL *
                          </Label>
                          <Input 
                            id="website"
                            name="website"
                            type="url"
                            autoComplete="url"
                            placeholder="https://yourbrand.com"
                            required
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="rounded-xl h-12 text-sm"
                          />
                        </div>

                        <Button 
                          type="submit"
                          className="w-full h-13 min-h-[48px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 mt-4"
                        >
                          <span>Continue to Step 2</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </motion.form>
                    ) : (
                      <motion.form
                        key="step-2"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div className="space-y-1">
                          <Label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Full Name *
                          </Label>
                          <Input 
                            id="name"
                            name="name"
                            autoComplete="name"
                            required
                            placeholder="Aarav Sharma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="rounded-xl h-12 text-sm"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Work Email *
                          </Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="founder@yourbrand.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="rounded-xl h-12 text-sm"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="phone" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            WhatsApp Number * <span className="text-[10px] text-slate-400 font-normal">(for 24-hr roadmap delivery)</span>
                          </Label>
                          <Input 
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="rounded-xl h-12 text-sm"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="message" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Current Bottleneck <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
                          </Label>
                          <Textarea 
                            id="message"
                            name="message"
                            placeholder="E.g., high ad fatigue, ROAS dropped below 2.5x, scaling from ₹20L to ₹1Cr/mo..."
                            rows={2}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="rounded-xl text-sm resize-none"
                          />
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(1)}
                            className="h-13 min-h-[48px] px-5 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back
                          </Button>

                          <Button 
                            type="submit"
                            disabled={loading}
                            className="flex-1 h-13 min-h-[48px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Generating roadmap...</span>
                              </>
                            ) : (
                              <>
                                <span>Get 90-Day Roadmap</span>
                                <Sparkles className="w-4 h-4 text-cyan-300" />
                              </>
                            )}
                          </Button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;