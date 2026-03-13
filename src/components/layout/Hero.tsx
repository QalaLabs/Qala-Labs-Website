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
}

const Hero = ({ 
  title = "Scale Your Brand to 8-Figures with Revenue Engineering.",
  subtitle = "We combine high-performance paid media with high-velocity creative to build predictable scale engines for DTC & B2B.",
  ctaText = "Get Proposal",
  ctaUrl = "/contact",
  secondaryCtaText = "See Work",
  secondaryCtaUrl = "/portfolio",
  badgeText = "Generated ₹20L in 30 Days for Trotr via Meta B2B Lead Gen"
}: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      tl.from(headlineRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.2
      })
      .from(".hero-cta", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8
      }, "-=0.8");

      gsap.to(bgLayerRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 150,
        ease: "none"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden bg-slate-50"
      aria-labelledby="hero-heading"
    >
      <div 
        ref={bgLayerRef}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-sm font-bold mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            {badgeText}
          </motion.div>

          <h1 
            ref={headlineRef}
            id="hero-heading"
            className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight"
          >
            {title}
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to={ctaUrl}>
              <Button size="lg" className="hero-cta bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 rounded-2xl text-lg shadow-xl shadow-blue-500/20">
                {ctaText} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to={secondaryCtaUrl}>
              <Button size="lg" variant="outline" className="hero-cta px-8 py-7 rounded-2xl text-lg border-2">
                {secondaryCtaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;