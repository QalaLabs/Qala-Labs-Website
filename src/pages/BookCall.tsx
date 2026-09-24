"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/layout/SEO';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';

const GOOGLE_CALENDAR_EMBED_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3uVz0fkqT5IV0zcPl4F9rdcA64YYzPKHZUAw9E8wO85YE95FfNoBcLeshW0STnxhI9ssMUCt6X?gv=true";
const GOOGLE_CALENDAR_DIRECT_URL = "https://calendar.app.google/EvA2Kw9rgA4xq8798";
const WHATSAPP_URL = "https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I'm%20trying%20to%20book%20a%20call%20on%20your%20calendar%20and%20wanted%20to%20coordinate%20a%20time.";

const BookCall = () => {
  const navigate = useNavigate();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <SEO
        title="Schedule Your 30-Minute Growth Strategy Call | Qala Labs"
        description="Select a 30-minute time slot for your DTC growth diagnostic with Qala Labs principal growth engineers."
      />
      <Navbar />

      <main className="pt-32 pb-24 px-4 max-w-5xl mx-auto">
        {/* Header with Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 text-blue-700 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Step 2 of 2: Pick Your Time Slot
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            Schedule Your <span className="text-blue-600">30-Minute Growth Call</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Select a convenient time below. You will receive an instant Google Calendar invitation and Google Meet link.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
            <a
              href={GOOGLE_CALENDAR_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline"
            >
              <span>Prefer opening in Google Calendar?</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Embedded Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden mb-8"
        >
          <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold tracking-wide">Live Availability Engine</span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>30-Minute 1-on-1 Growth Diagnostic</span>
            </div>
          </div>

          <div className="relative w-full min-h-[680px] bg-slate-50 dark:bg-slate-900/50">
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-6">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-xs font-bold">Loading Google Calendar scheduler...</p>
              </div>
            )}
            <iframe
              src={GOOGLE_CALENDAR_EMBED_URL}
              className="w-full h-[700px] border-0"
              title="Schedule a 30-minute call with Qala Labs"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </motion.div>

        {/* Floating / Sticky Confirmation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 sm:p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg">
                Finished picking your slot?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Click to confirm on our system, log your session, and unlock your Call Preparation Checklist.
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate('/thank-you')}
            className="w-full md:w-auto h-13 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>I've Completed My Booking</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Alternative WhatsApp Coordination */}
        <div className="text-center mt-10">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            Can't find a time that fits your timezone?
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Coordinate custom timing via WhatsApp</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookCall;
