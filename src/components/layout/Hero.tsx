"use client";

import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  badgeText?: string;
  bgColor?: string;
  isEditing?: boolean;
  onUpdate?: (props: any) => void;
}

const Hero = ({ 
  title = "Scale Your Brand to 8-Figures with Revenue Engineering.",
  subtitle = "We combine high-performance paid media with high-velocity creative to build predictable scale engines for DTC & B2B.",
  ctaText = "Get Proposal",
  ctaUrl = "/contact",
  secondaryCtaText = "See Work",
  secondaryCtaUrl = "/portfolio",
  badgeText = "Generated ₹20L in 30 Days for Trotr via Meta B2B Lead Gen",
  bgColor,
  isEditing,
  onUpdate
}: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isEditing) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      tl.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2
      })
      .from(".hero-cta-container", {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.6");

      gsap.to(bgLayerRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        ease: "none"
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isEditing]);

  const handleBlur = (field: string, e: React.FocusEvent<HTMLElement>) => {
    if (onUpdate) {
      onUpdate({ [field]: e.currentTarget.innerText });
    }
  };

  const particles = [
    { className: "particle-1", top: "20%", left: "10%", delay: 0 },
    { className: "particle-2", top: "60%", left: "15%", delay: 1 },
    { className: "particle-3", top: "30%", left: "80%", delay: 0.5 },
    { className: "particle-4", top: "70%", left: "85%", delay: 1.5 },
    { className: "particle-5", top: "15%", left: "50%", delay: 2 },
    { className: "particle-6", top: "80%", left: "40%", delay: 0.8 },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[85vh] flex items-center pt-32 pb-20 overflow-hidden transition-colors duration-500"
      style={{ 
        backgroundColor: bgColor || undefined,
        animation: !bgColor ? 'gradientShift 8s ease infinite' : undefined
      }}
      aria-labelledby="hero-heading"
    >
      {!bgColor && (
        <style>{`
          @keyframes gradientShift {
            0% { background-color: #f8fafc; }
            33% { background-color: #eff6ff; }
            66% { background-color: #eef2ff; }
            100% { background-color: #f8fafc; }
          }
          .dark @keyframes gradientShift {
            0% { background-color: #020617; }
            33% { background-color: #0f172a; }
            66% { background-color: #1e1b4b; }
            100% { background-color: #020617; }
          }
        `}</style>
      )}

      {/* Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute w-4 h-4 rounded-full bg-blue-400/20 dark:bg-blue-500/10 blur-sm z-0 ${p.className}`}
          style={{ top: p.top, left: p.left }}
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      <div 
        ref={bgLayerRef}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {badgeText && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-8 border border-blue-200/50 dark:border-blue-800/50 max-w-full text-center"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="truncate sm:whitespace-normal">{badgeText}</span>
            </motion.div>
          )}

          <h1 
            ref={headlineRef}
            id="hero-heading"
            contentEditable={isEditing}
            onBlur={(e) => handleBlur('title', e)}
            suppressContentEditableWarning={true}
            className={`text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight px-2 break-words outline-none ${isEditing ? 'hover:bg-blue-50/50 dark:hover:bg-blue-900/20 focus:bg-blue-50/50 dark:focus:bg-blue-900/20 rounded-lg transition-colors cursor-text' : ''}`}
          >
            {title}
          </h1>

          {subtitle && (
            <p 
              contentEditable={isEditing}
              onBlur={(e) => handleBlur('subtitle', e)}
              suppressContentEditableWarning={true}
              className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed px-4 outline-none ${isEditing ? 'hover:bg-blue-50/50 dark:hover:bg-blue-900/20 focus:bg-blue-50/50 dark:focus:bg-blue-900/20 rounded-lg transition-colors cursor-text' : ''}`}
            >
              {subtitle}
            </p>
          )}

          <div className="hero-cta-container flex flex-col sm:flex-row justify-center gap-4 px-6">
            {ctaText && (
              <Link to={ctaUrl} className="w-full sm:w-auto" onClick={(e) => isEditing && e.preventDefault()}>
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-10 py-8 rounded-2xl text-lg font-black shadow-xl shadow-blue-500/20 transition-all hover:scale-105">
                  {ctaText} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
            {secondaryCtaText && (
              <Link to={secondaryCtaUrl} className="w-full sm:w-auto" onClick={(e) => isEditing && e.preventDefault()}>
                <Button size="lg" variant="outline" className="w-full px-10 py-8 rounded-2xl text-lg font-bold border-2 border-slate-200 dark:border-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-900 transition-all">
                  {secondaryCtaText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;