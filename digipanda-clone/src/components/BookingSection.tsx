import React, { useState } from 'react';
import { Calendar, Clock, ExternalLink, MessageCircle } from 'lucide-react';

const GOOGLE_CALENDAR_EMBED_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3uVz0fkqT5IV0zcPl4F9rdcA64YYzPKHZUAw9E8wO85YE95FfNoBcLeshW0STnxhI9ssMUCt6X?gv=true';
const GOOGLE_CALENDAR_DIRECT_URL = 'https://calendar.app.google/EvA2Kw9rgA4xq8798';
const WHATSAPP_URL =
  "https://wa.me/916006760151?text=Hi%20Qala%20Labs%2C%20I'm%20trying%20to%20book%20a%20call%20on%20your%20calendar%20and%20wanted%20to%20coordinate%20a%20time.";

export const BookingSection: React.FC = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section className="relative py-28 bg-transparent overflow-hidden">
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
            Pick a slot below and get an instant Google Calendar invite with a Meet link — no back-and-forth emails.
          </p>

          <a
            href={GOOGLE_CALENDAR_DIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-[#3FE0E0] hover:brightness-110"
          >
            <span>Prefer opening in Google Calendar?</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="rounded-[32px] border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.015] backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="bg-[#121324] text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3FE0E0]" />
              <span className="text-xs font-bold tracking-wide">Live Availability Engine</span>
            </div>
            <div className="text-xs text-white/50 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>30-Minute 1-on-1 Growth Diagnostic</span>
            </div>
          </div>

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
