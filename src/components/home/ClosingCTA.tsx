"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

/**
 * Lead capture endpoint URL.
 * Points to the PHP lead endpoint (POST /api/lead.php).
 * Coordinate with Prompt 6 or update this constant if the route changes.
 */
export const LEAD_ENDPOINT = '/api/lead.php';

export interface ClosingCTAProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  placeholderText?: string;
}

const ClosingCTA: React.FC<ClosingCTAProps> = ({ 
  title = "Ready to scale without burning cash?", 
  subtitle = "Creative × Data × Impact",
  description = "Get a custom 90-day growth roadmap: we analyze your funnel, uncover wasted ad spend, and send prioritized experiments.",
  primaryCtaText = "Get Growth Audit",
  secondaryCtaText = "Browse Verified Case Studies",
  placeholderText = "Enter your work email..."
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      const msg = "Please enter your email address.";
      setErrorMessage(msg);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      const msg = "Please enter a valid email address.";
      setErrorMessage(msg);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: trimmedEmail,
          source: 'closing_cta',
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        let serverMsg = `Submission error (HTTP ${response.status})`;
        try {
          const data = await response.json();
          if (data?.message) serverMsg = data.message;
          else if (data?.error) serverMsg = data.error;
        } catch {
          // Non-JSON response body
        }
        throw new Error(serverMsg);
      }

      const result = await response.json().catch(() => ({ success: true }));
      if (result && result.success === false) {
        throw new Error(result.message || result.error || "Lead submission could not be processed.");
      }

      // ONLY reach here on genuine successful HTTP 2xx response
      setIsSuccess(true);
      setEmail('');
      setErrorMessage(null);
      showSuccess("Thanks! We've received your request and will prepare your 90-day growth plan.");
    } catch (err: any) {
      // Real error state: display error in UI and error toast. DO NOT show fake success!
      const fallbackMsg = "Unable to submit audit request right now. Please try again or reach out at hello@qalalabs.com";
      const displayMsg = err?.message || fallbackMsg;
      setErrorMessage(displayMsg);
      showError(displayMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-slate-50/80 dark:bg-slate-900/90 rounded-[2.5rem] md:rounded-[3.5rem] p-8 sm:p-12 md:p-16 lg:p-20 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none text-center overflow-hidden"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />

          {/* Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-900/80 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{subtitle}</span>
          </div>

          {/* Heading & Subtext */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Form / Success State */}
          <div className="relative z-10 max-w-xl mx-auto">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 md:p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center shadow-sm"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Growth Audit Request Received!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  We've queued your request. Our growth engineers will evaluate your store and send prioritized 90-day experiment recommendations.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Submit another email
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full" noValidate>
                {/* Rounded input + primary button in bordered card container */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl sm:rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                  <div className="flex items-center flex-1 pl-4 pr-2">
                    <Mail className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mr-2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder={placeholderText}
                      disabled={isSubmitting}
                      className="w-full bg-transparent py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-base outline-none disabled:opacity-50"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl sm:rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black px-7 py-6 text-sm sm:text-base shadow-xl shadow-blue-500/25 transition-all whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>{primaryCtaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Real Error State - Visible Box */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 text-left"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Proof microcopy */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    15-min response
                  </span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Zero spam, 100% confidential
                  </span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Custom 90-day plan
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Secondary Case Studies Path */}
          <div className="relative z-10 mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Want to see real growth playbooks first?
            </span>
            <Link 
              to="/case-studies" 
              className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 hover:underline"
            >
              <span>{secondaryCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingCTA;