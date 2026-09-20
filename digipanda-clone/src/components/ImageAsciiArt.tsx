import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  r: number;
  g: number;
  b: number;
  alpha: number;
}

// Density ramp: sparse → dense character glyphs
const RAMP = ['.', ':', '+', 'x', 'X', '%', '8', '0', '@'];

const REPEL_RADIUS = 85;
const REPEL_STRENGTH = 16;
const SPRING = 0.055;
const DAMPING = 0.82;
const DARK_CUTOFF = 20; // Ignore dark background pixels

export interface ImageAsciiArtProps {
  className?: string;
  imageSrc?: string;
  gridCols?: number;
}

export const ImageAsciiArt: React.FC<ImageAsciiArtProps> = ({
  className = '',
  imageSrc = '/assets/qala/hero-ascii-source.jpg',
  gridCols: fixedGridCols,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Watch for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Measure container dimensions responsively
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { clientWidth, clientHeight } = el;
      if (clientWidth > 0 && clientHeight > 0) {
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { width, height } = dimensions;
  const gridCols = fixedGridCols ?? Math.round(Math.min(180, Math.max(50, width / 7.5)));

  // Sample the source image onto a low-res grid and create particles
  useEffect(() => {
    if (!width || !height) return;

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      if (cancelled) return;

      const rows = Math.max(1, Math.min(220, Math.round((gridCols * height) / width)));

      // Cover aspect calculation (preserve source image aspect ratio)
      const containerAspect = width / height;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      let sx = 0;
      let sy = 0;
      let sWidth = img.naturalWidth;
      let sHeight = img.naturalHeight;

      if (imgAspect > containerAspect) {
        sWidth = img.naturalHeight * containerAspect;
        sx = (img.naturalWidth - sWidth) / 2;
      } else {
        sHeight = img.naturalWidth / containerAspect;
        sy = (img.naturalHeight - sHeight) / 2;
      }

      // Offscreen canvas for downsampling
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = gridCols;
      sampleCanvas.height = rows;
      const sctx = sampleCanvas.getContext('2d');
      if (!sctx) return;

      sctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, gridCols, rows);
      const data = sctx.getImageData(0, 0, gridCols, rows).data;

      const cellW = width / gridCols;
      const cellH = height / rows;
      const particles: Particle[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const i = (row * gridCols + col) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          if (luminance < DARK_CUTOFF) continue;

          const level = Math.min(RAMP.length - 1, Math.floor((luminance / 255) * RAMP.length));
          const jitterX = (Math.random() - 0.5) * cellW * 0.35;
          const jitterY = (Math.random() - 0.5) * cellH * 0.35;
          const homeX = col * cellW + cellW / 2 + jitterX;
          const homeY = row * cellH + cellH / 2 + jitterY;

          // Boost saturation and brightness for vivid cyber glow
          const boost = 1.2;
          particles.push({
            homeX,
            homeY,
            x: homeX,
            y: homeY,
            vx: 0,
            vy: 0,
            char: RAMP[level],
            r: Math.min(255, r * boost),
            g: Math.min(255, g * boost),
            b: Math.min(255, b * boost),
            alpha: Math.min(1, (luminance - DARK_CUTOFF) / (255 - DARK_CUTOFF) + 0.2),
          });
        }
      }

      particlesRef.current = particles;
      setIsLoaded(true);
    };

    return () => {
      cancelled = true;
    };
  }, [width, height, gridCols, imageSrc]);

  // Main animation frame loop
  useEffect(() => {
    if (!width || !height || !isLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let rafId: number;
    const cellSize = width / gridCols;
    ctx.font = `${Math.max(6.5, cellSize * 1.35)}px "IBM Plex Mono", monospace`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      const particles = particlesRef.current;
      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        if (!reduceMotion) {
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < REPEL_RADIUS) {
              const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }

          // Spring physics back to home position
          p.vx += (p.homeX - p.x) * SPRING;
          p.vy += (p.homeY - p.y) * SPRING;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        }

        const displacement = Math.hypot(p.x - p.homeX, p.y - p.homeY);
        const glow = Math.min(displacement / 22, 1);

        ctx.fillStyle = `rgba(${p.r | 0}, ${p.g | 0}, ${p.b | 0}, ${Math.min(1, p.alpha + glow * 0.45)})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [width, height, gridCols, reduceMotion, isLoaded]);

  const updateMouse = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
      active: true,
    };
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive ASCII art rendering of Qala Labs visual"
        className={`w-full h-full block transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onMouseMove={(e) => updateMouse(e.clientX, e.clientY)}
        onMouseEnter={(e) => updateMouse(e.clientX, e.clientY)}
        onMouseLeave={() => {
          mouseRef.current.active = false;
        }}
        onTouchStart={(e) => {
          const t = e.touches[0];
          if (t) updateMouse(t.clientX, t.clientY);
        }}
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (t) updateMouse(t.clientX, t.clientY);
        }}
        onTouchEnd={() => {
          mouseRef.current.active = false;
        }}
      />
    </div>
  );
};

export default ImageAsciiArt;
