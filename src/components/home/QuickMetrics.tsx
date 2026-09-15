"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StatusChip from '@/components/ui/status-chip';
import { 
  Quote, 
  TrendingUp, 
  Zap, 
  IndianRupee, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import GaffarLogo from '@/assets/gaffar-new-logo.webp';

export interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
  iconType?: string;
}

export interface QuickMetricsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  // Testimonial overrides
  quote?: string;
  author?: string;
  role?: string;
  companyLogo?: string;
  caseStudyUrl?: string;
  // Stat overrides
  revenueStat?: string;
  revenueLabel?: string;
  roasStat?: string;
  reachStat?: string;
  reachLabel?: string;
  automationStat?: string;
  // Backwards compatibility for results prop
  results?: any[];
}

const useCountUp = (targetValue: string, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  const numericPart = parseFloat(targetValue.replace(/[^0-9.]/g, '')) || 0;
  const prefix = targetValue.match(/^[^0-9.]+/)?.[0] || '';
  const suffix = targetValue.match(/[0-9.]+(.+)$/)?.[1] || '';

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(progress * numericPart);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [numericPart, duration, start]);

  const formattedCount = numericPart % 1 === 0 ? Math.floor(count) : count.toFixed(1);
  return `${prefix}${formattedCount}${suffix}`;
};

const StatValue = ({ value, isVisible }: { value: string; isVisible: boolean }) => {
  const animatedValue = useCountUp(value, 2000, isVisible);
  return <>{animatedValue}</>;
};

const QuickMetrics: React.FC<QuickMetricsProps> = ({
  title = "Proven Performance",
  subtitle = "Real Revenue Impact. No Vanity Metrics.",
  description = "How Qala Labs pairs data-backed creative, precision media buying, and growth engineering to build scalable brand equity.",
  quote = "Qala Labs helped us turn a local market legacy into a modern marketplace identity. Their strategy balanced our Gaffar Market roots with digital usability — our sellers felt seen, buyers trusted the site more, and the brand is finally ready to scale.",
  author = "Akaash Maskeen",
  role = "Founder & CEO, Gaffar India",
  companyLogo = GaffarLogo,
  caseStudyUrl = "/case-studies/gaffar-india-rebrand",
  revenueStat = "₹3Cr+",
  revenueLabel = "Client Revenue Generated",
  roasStat = "5X",
  reachStat = "5M+",
  reachLabel = "Audience Reach & Views",
  automationStat = "20+",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-28 bg-slate-50/70 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <StatusChip label="Verified data" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{title}</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {subtitle}
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Two-Column Proof Grid: Quote Card + Stacked Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Large Testimonial Card (lg:col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex"
          >
            <div className="w-full bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between relative overflow-hidden group">
              {/* Subtle ambient lighting */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
                    <Quote className="w-6 h-6 fill-current opacity-80" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Verified Client Story</span>
                  </div>
                </div>

                {/* The Quote */}
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight mb-8">
                  “{quote}”
                </blockquote>
              </div>

              {/* Author & Proof Footer */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 overflow-hidden flex items-center justify-center shrink-0">
                    <img 
                      src={companyLogo} 
                      alt={author} 
                      className="w-full h-full object-contain" 
                      loading="lazy" 
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-base md:text-lg">{author}</p>
                    <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">{role}</p>
                  </div>
                </div>

                {caseStudyUrl && (
                  <Link 
                    to={caseStudyUrl}
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors py-2 px-3.5 rounded-full bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 w-fit"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stacked Pair of Stat Cards (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Stat Card 1: Revenue & Media Returns */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1"
            >
              <div className="h-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-7 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all">
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                    Revenue Impact
                  </span>
                </div>

                {/* Main Stat */}
                <div className="my-2">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                    <StatValue value={revenueStat} isVisible={isVisible} />
                  </div>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {revenueLabel}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Direct attributable revenue generated across client storefronts and high-intent campaigns.
                  </p>
                </div>

                {/* Bottom Benchmark */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span>{roasStat} Average Campaign ROAS</span>
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 font-medium">Meta & Google</span>
                </div>
              </div>
            </motion.div>

            {/* Stat Card 2: Scale & Autonomous Systems */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <div className="h-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-7 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all">
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                    Scale & Systems
                  </span>
                </div>

                {/* Main Stat */}
                <div className="my-2">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                    <StatValue value={reachStat} isVisible={isVisible} />
                  </div>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {reachLabel}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Organic creator distribution and viral brand reach engineered for DTC and high-growth brands.
                  </p>
                </div>

                {/* Bottom Benchmark */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{automationStat} Automations Built</span>
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 font-medium">10+ Yrs Exp.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickMetrics;