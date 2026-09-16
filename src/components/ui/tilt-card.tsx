"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // Maximum tilt angle in degrees (default 12)
  perspective?: number; // CSS perspective value (default 1000px)
  scale?: number; // Scale factor on hover (default 1.02)
  speed?: number; // Transition speed in ms (default 400)
  glare?: boolean; // Enable specular glare effect (default true)
  maxGlare?: number; // Maximum glare opacity (0 to 1, default 0.3)
  className?: string;
  gyroscope?: boolean; // Enable device tilt on mobile
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
  glare = true,
  maxGlare = 0.3,
  className = "",
  gyroscope = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef<number | null>(null);

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const width = rect.width;
      const height = rect.height;

      // Calculate percentage from -1 to 1
      const percentX = (x / width - 0.5) * 2;
      const percentY = (y / height - 0.5) * 2;

      // Calculate rotation angles
      const rotateX = -(percentY * maxTilt);
      const rotateY = percentX * maxTilt;

      setTransform(`perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`);

      if (glare) {
        // Position glare opposite to tilt for realistic specular reflection
        const glareX = (x / width) * 100;
        const glareY = (y / height) * 100;
        const glareAngle = Math.atan2(y - height / 2, x - width / 2) * (180 / Math.PI) - 90;

        setGlareStyle({
          opacity: maxGlare,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${maxGlare}) 0%, rgba(255, 255, 255, 0) 70%)`,
          transform: `rotate(${glareAngle}deg)`
        });
      }
    });
  }, [reducedMotion, maxTilt, perspective, scale, glare, maxGlare]);

  const handleMouseEnter = useCallback(() => {
    if (reducedMotion) return;
    setIsHovered(true);
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion) return;
    setIsHovered(false);
    if (rafId.current) cancelAnimationFrame(rafId.current);

    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    if (glare) {
      setGlareStyle({ opacity: 0 });
    }
  }, [reducedMotion, perspective, glare]);

  // Optional mobile gyroscope listener
  useEffect(() => {
    if (!gyroscope || reducedMotion || typeof window === 'undefined') return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      // Clamp values between -30 and 30 deg
      const gamma = Math.max(-30, Math.min(30, e.gamma));
      const beta = Math.max(-30, Math.min(30, e.beta - 45)); // assume holding at 45deg angle

      const rotateY = (gamma / 30) * (maxTilt * 0.75);
      const rotateX = -(beta / 30) * (maxTilt * 0.75);

      setTransform(`perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`);
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, [gyroscope, reducedMotion, maxTilt, perspective]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: reducedMotion ? 'none' : transform,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : `transform ${speed}ms cubic-bezier(.03,.98,.52,.99)`,
        willChange: isHovered ? 'transform' : 'auto'
      }}
      className={`relative ${className}`}
      {...props}
    >
      {children}
      {glare && !reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-30"
          style={glareStyle}
        />
      )}
    </div>
  );
};

export default TiltCard;
