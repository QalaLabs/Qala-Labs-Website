"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const [showFallback, setShowFallback] = useState(false);

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
      }, "-=0.8")
      .from(cardRef.current, {
        x: 100,
        opacity: 0,
        rotateY: -20,
        duration: 1.5
      }, "-=1.2");

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

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        gsap.to(cardRef.current, {
          rotateY: xPos,
          rotateX: -yPos,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50"
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
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-left">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 text-sm font-bold mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Generated ₹12Cr in 90 days for GlowSkin
            </motion.div>

            <h1 
              ref={headlineRef}
              id="hero-heading"
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight"
            >
              Scale Your DTC Brand to <span className="text-blue-600">8-Figures</span> with Data-Driven Creative.
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              We combine high-performance paid media with high-converting creative to dominate your niche.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="hero-cta bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 rounded-2xl text-lg shadow-xl shadow-blue-200">
                Get Proposal <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="hero-cta px-8 py-7 rounded-2xl text-lg border-2">
                See Work
              </Button>
            </div>
          </div>

          <div className="flex-1 perspective-1000 w-full max-w-2xl">
            <div 
              ref={cardRef}
              className="relative bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-4 md:p-8 transform-style-3d"
            >
              <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-900 relative">
                {showFallback ? (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <PlayCircle className="w-20 h-20" />
                  </div>
                ) : (
                  <Lottie 
                    animationData={null}
                    path="https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json"
                    loop={true}
                    className="w-full h-full object-cover opacity-90"
                    onError={() => setShowFallback(true)}
                  />
                )}
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Live Performance</p>
                      <p className="text-white text-xl font-black">₹1,24,500.00 <span className="text-green-400 text-sm">↑ 24%</span></p>
                    </div>
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <ArrowRight className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;