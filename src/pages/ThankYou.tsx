"use client";

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Video, 
  MessageCircle, 
  ArrowRight, 
  FileText, 
  TrendingUp, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const WHATSAPP_URL = "https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I've%20booked%20my%2030-minute%20growth%20strategy%20call%20and%20wanted%20to%20connect%20directly.";

const ThankYou = () => {
  useEffect(() => {
    // 1. Google Analytics 4 (GA4) Event
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', 'schedule_call_complete', {
          event_category: 'booking',
          event_label: '30-Minute Growth Call Booked',
          value: 1
        });
        window.gtag('event', 'conversion', {
          send_to: 'G-9PM7WKEVHT'
        });
      }

      // 2. Meta Pixel Event
      if (window.fbq) {
        window.fbq('track', 'Schedule', {
          content_name: '30-Minute Growth Diagnostic',
          status: 'confirmed'
        });
        window.fbq('track', 'Lead');
      }

      // 3. Google Tag Manager Data Layer Push
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'calendar_booking_complete',
        appointment_type: '30_min_growth_call',
        timestamp: new Date().toISOString()
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <SEO
        title="Booking Confirmed | 30-Minute Growth Strategy Session | Qala Labs"
        description="Your 30-minute growth strategy session with Qala Labs is confirmed. Check your email for Google Meet details and view your session prep checklist."
        noIndex={true}
      />
      <Navbar />

      <main className="pt-32 pb-24 px-4 max-w-5xl mx-auto">
        {/* Top Success Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Call Confirmed & Logged
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            You're Confirmed for Your <br className="hidden sm:inline" />
            <span className="text-blue-600">30-Minute Growth Diagnostic</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A calendar invite with the direct <span className="font-bold text-slate-900 dark:text-white">Google Meet video link</span> has been dispatched to your email.
          </p>
        </motion.div>

        {/* Meeting Overview & Preparation Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Card 1: What to Expect */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">What We'll Cover</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Strictly 30 minutes, zero sales fluff</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">1</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block">Ad Account & Funnel Teardown</strong>
                  Uncovering ad fatigue, attribution bleed, and wasted spend across Meta, Google, or Amazon.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">2</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block">High-Converting Creative Angle Matrix</strong>
                  Identifying hooks and UGC formats that will drop your Blended CAC.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">3</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block">90-Day Scaling Blueprint</strong>
                  Prioritized experimentation roadmap tailored to push past your current revenue ceiling.
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Card 2: How to Prepare */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Call Preparation Kit</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">To get the highest ROI from our 30 minutes</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1">
                  1. Have Metrics Ready
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Last 30-60 days ad spend, MER (Marketing Efficiency Ratio), and top-performing product SKU links.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1">
                  2. Primary Bottleneck
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Think about what is capping your scale right now (e.g. creative production, ROAS drops past ₹10L/mo, retention).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1">
                  3. Join via Laptop
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  We'll be screen-sharing live ad accounts, creative frameworks, and analytics funnels.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Immediate Support / WhatsApp Fast Track */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-black text-lg text-white">Need to reschedule or speak earlier?</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Message our growth engineering team directly on WhatsApp for real-time adjustments.
              </p>
            </div>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl transition-all whitespace-nowrap"
          >
            <span>Message on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Case Studies / Return Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto h-12 px-6 rounded-xl border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
          >
            <Link to="/case-studies">
              Browse Client Case Studies <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>

          <Button
            asChild
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            <Link to="/">
              Return to Homepage
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
