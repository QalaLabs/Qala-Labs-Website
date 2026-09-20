"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, ChevronUp, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from '@/utils/toast';
import { useUTM } from '@/hooks/useUTM';
import { cn } from '@/lib/utils';

const services = [
  "Performance Media",
  "Creative & Shoots",
  "AI Automation",
  "Full Growth Engine"
];

const budgetOptions = [
  "< ₹5L/mo",
  "₹5L - ₹15L",
  "₹15L - ₹50L",
  "₹50L+"
];

const WHATSAPP_URL = "https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I'm%20interested%20in%20scaling%20my%20DTC%20brand.%20Let's%20connect%20for%20a%20growth%20audit.";

const StickyCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const utmData = useUTM();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    service: 'Performance Media',
    budget: '₹5L - ₹15L'
  });

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.phone.trim()) {
      showError("Please provide your email and WhatsApp number.");
      return;
    }

    setLoading(true);

    const leadData = {
      ...formData,
      ...utmData,
      source_url: typeof window !== 'undefined' ? window.location.href : '',
      status: 'new',
      timestamp: new Date().toISOString()
    };

    try {
      // 1. Capture in Supabase
      try {
        await supabase.from('leads').insert({
          email: formData.email.trim(),
          tool_used: 'sticky_cta_microform',
          data: leadData
        });
      } catch (dbErr) {
        console.warn("Supabase direct insert warning:", dbErr);
      }

      // 2. Trigger unified backend lead endpoint
      const res = await fetch('/api/lead.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          tool_used: 'sticky_cta_microform',
          data: leadData
        })
      });

      if (!res.ok) {
        console.warn("Email confirmation status:", res.status);
      }

      setLoading(false);
      setSuccess(true);
      showSuccess("Strategy request received! Check your inbox.");
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setFormData({ email: '', phone: '', service: 'Performance Media', budget: '₹5L - ₹15L' });
      }, 3000);
    } catch (err: any) {
      console.error("Lead submission error:", err);
      setLoading(false);
      showError("Unable to submit. Please try again or reach out on WhatsApp.");
    }
  };

  return (
    <>
      {/* Persistent Floating Bar */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-3 md:p-6 pointer-events-none pb-[calc(12px+env(safe-area-inset-bottom))]"
          >
            {/* Desktop View: Sleek floating badge */}
            <div className="hidden md:flex max-w-7xl mx-auto justify-end">
              <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-white/15 flex items-center gap-4 p-2 pl-6 hover:border-blue-500/40 transition-all">
                <span className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Ready to scale past ₹1Cr/mo?
                </span>
                <Button 
                  onClick={() => setIsOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-5 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  Request Growth Plan <ChevronUp className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
                </Button>
              </div>
            </div>

            {/* Mobile View: High-Converting Thumb-Zone Action Bar */}
            <div className="md:hidden pointer-events-auto w-full max-w-md mx-auto flex items-center gap-2 bg-slate-950/95 backdrop-blur-2xl p-2 rounded-2xl border border-white/15 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[48px] px-4 rounded-xl bg-emerald-600/90 active:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                aria-label="Direct WhatsApp Chat"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => setIsOpen(true)}
                className="flex-[1.4] min-h-[48px] px-4 rounded-xl bg-blue-600 active:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 shrink-0 text-cyan-300" />
                <span>Get Growth Plan</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer: Mobile Bottom-Sheet & Desktop Slide-Over */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)} 
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-[70]" 
            />

            {/* Bottom Sheet on Mobile / Slide-Over on Desktop */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 md:left-auto md:top-0 md:bottom-0 md:w-full md:max-w-md bg-white dark:bg-slate-950 z-[80] shadow-2xl rounded-t-[2rem] md:rounded-t-none md:rounded-l-3xl border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 p-6 md:p-10 flex flex-col max-h-[88vh] md:max-h-full overflow-y-auto"
            >
              {/* Mobile Drag Indicator */}
              <div className="md:hidden w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4" />

              <button 
                onClick={() => setIsOpen(false)} 
                aria-label="Close growth plan form" 
                className="absolute top-5 right-5 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="flex-1 flex flex-col justify-center py-2">
                {success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-950/60 rounded-full flex items-center justify-center mx-auto mb-5 text-green-600">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Strategy Incoming!</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Our growth engineering team is preparing your custom teardown. Check your WhatsApp & Email within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider">
                          DTC Unit Economics
                        </Badge>
                        <span className="text-xs text-slate-400 font-mono">₹1Cr+ Roadmap</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Get Your Custom <span className="text-blue-600">Growth Plan.</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        We analyze your Meta/Google funnel, creative fatigue, and unit economics.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* One-Tap Budget Pills */}
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Current Monthly Ad Spend
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {budgetOptions.map(b => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setFormData({ ...formData, budget: b })}
                              className={cn(
                                "h-11 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center",
                                formData.budget === b
                                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30"
                                  : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400"
                              )}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Service Selection */}
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Core Growth Focus
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {services.map(s => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setFormData({ ...formData, service: s })}
                              className={cn(
                                "h-11 px-2.5 rounded-xl border text-[11px] font-bold transition-all text-center leading-tight flex items-center justify-center",
                                formData.service === s
                                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm"
                                  : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                              )}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Work Email */}
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Work Email</Label>
                        <Input 
                          type="email" 
                          required 
                          placeholder="founder@yourbrand.com"
                          value={formData.email} 
                          onChange={(e) => setFormData({...formData, email: e.target.value})} 
                          className="h-12 rounded-xl text-sm" 
                        />
                      </div>

                      {/* WhatsApp Phone */}
                      <div className="space-y-1">
                        <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          WhatsApp Number <span className="text-[10px] text-slate-400 font-normal">(for instant roadmap dispatch)</span>
                        </Label>
                        <Input 
                          type="tel" 
                          required 
                          placeholder="+91 98765 43210"
                          value={formData.phone} 
                          onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                          className="h-12 rounded-xl text-sm" 
                        />
                      </div>

                      {/* Submit */}
                      <Button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full h-13 min-h-[48px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 mt-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Synthesizing plan...</span>
                          </>
                        ) : (
                          <>
                            <span>Send 90-Day Roadmap</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>

                      {/* Direct WhatsApp Option */}
                      <p className="text-center text-[11px] text-slate-400 pt-2">
                        Need an immediate audit?{" "}
                        <a 
                          href={WHATSAPP_URL} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3 fill-current" />
                          Talk to lead on WhatsApp
                        </a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyCTA;