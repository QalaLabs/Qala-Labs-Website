import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from './PageLayout';
import { Home, Compass, ArrowLeft, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="relative min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden py-16">
        {/* Background ambient lighting and grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(79,70,229,0.25),rgba(6,7,13,0))] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(63,224,224,0.08),rgba(6,7,13,0))] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider uppercase mb-8 shadow-[0_0_20px_rgba(79,70,229,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
            <span className="text-[#3FE0E0] font-bold">TELEMETRY_ERROR // 404</span>
            <span className="text-white/40">|</span>
            <span className="text-white/70">ORBIT_LOST</span>
          </div>

          {/* Large futuristic glitchy 404 visual */}
          <div className="relative mb-6 select-none">
            <div className="text-8xl sm:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/10 font-mono drop-shadow-[0_0_35px_rgba(63,224,224,0.3)]">
              404
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-mono text-[#3FE0E0]/60 tracking-[0.3em] uppercase">
              [ COORDINATES_UNDEFINED ]
            </div>
          </div>

          {/* Headline & Description */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            404 - Horizon Not Found
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed mb-8">
            The neural vector or resource endpoint you requested is outside our charted infrastructure coordinates. It may have moved to a higher orbit or been de-provisioned.
          </p>

          {/* Quick Route Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto mb-8 text-left">
            <Link
              to="/services"
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#3FE0E0]/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#4F46E5]/20 text-[#3FE0E0] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-[#3FE0E0] transition-colors">
                    Explore Capabilities
                  </div>
                  <div className="text-[10px] text-white/50">AI & Full-stack growth</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/contact-us"
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#3FE0E0]/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#3FE0E0]/20 text-[#3FE0E0] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-[#3FE0E0] transition-colors">
                    Dispatch Mission
                  </div>
                  <div className="text-[10px] text-white/50">Reach mission control</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#3FE0E0] text-white font-bold text-sm shadow-[0_0_25px_rgba(63,224,224,0.4)] hover:brightness-110 active:scale-95 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home Base</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-sm font-medium transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Coordinate</span>
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage;
