"use client";

import React from "react";
import sourceImageUrl from "@/assets/hero-ascii-source.jpg";

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

// Density ramp, sparse → dense, echoing the reference character-density art.
const RAMP = [".", ":", "+", "x", "X", "%", "8", "0", "@"];

const REPEL_RADIUS = 70;
const REPEL_STRENGTH = 15;
const SPRING = 0.05;
const DAMPING = 0.83;
const DARK_CUTOFF = 22; // luminance below this is treated as background (invisible)

interface ImageAsciiArtProps {
  className?: string;
  /** Fixed size. Omit both to fill the parent element responsively. */
  width?: number;
  height?: number;
  gridCols?: number;
}

/**
 * Renders a source photo as colored, density-mapped ASCII characters on the
 * dark hero background — brighter/more saturated pixels become denser,
 * brighter glyphs, dark pixels fade into the background. Particles scatter
 * away from the cursor/touch and spring back to their sampled position.
 */
const ImageAsciiArt: React.FC<ImageAsciiArtProps> = ({
  className,
  width: fixedWidth,
  height: fixedHeight,
  gridCols: fixedGridCols,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = React.useState({ width: fixedWidth ?? 0, height: fixedHeight ?? 0 });

  React.useEffect(() => {
    if (fixedWidth && fixedHeight) return;
    const el = containerRef.current;
    if (!el) return;
    const update = () => setMeasured({ width: el.clientWidth, height: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fixedWidth, fixedHeight]);

  const width = fixedWidth ?? measured.width;
  const height = fixedHeight ?? measured.height;
  // Scale character density with the container's width so mobile stays light
  // and large desktop banners stay detailed, unless an explicit value is given.
  const gridCols = fixedGridCols ?? Math.round(Math.min(220, Math.max(60, width / 6)));
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const particlesRef = React.useRef<Particle[]>([]);
  const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const [ready, setReady] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Sample the source image into a low-res grid and build particles from it.
  React.useEffect(() => {
    if (!width || !height) return;
    let cancelled = false;
    const img = new Image();
    img.src = sourceImageUrl;
    img.onload = () => {
      if (cancelled) return;
      const rows = Math.max(1, Math.min(260, Math.round((gridCols * height) / width)));

      // Crop the source like CSS `object-fit: cover` so tall/narrow (mobile)
      // containers don't stretch the photo — they just see a cropped slice.
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

      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = gridCols;
      sampleCanvas.height = rows;
      const sctx = sampleCanvas.getContext("2d");
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
          const jitterX = (Math.random() - 0.5) * cellW * 0.4;
          const jitterY = (Math.random() - 0.5) * cellH * 0.4;
          const homeX = col * cellW + cellW / 2 + jitterX;
          const homeY = row * cellH + cellH / 2 + jitterY;

          // Boost saturation/brightness so it reads as a glow against the dark bg.
          const boost = 1.15;
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
            alpha: Math.min(1, (luminance - DARK_CUTOFF) / (255 - DARK_CUTOFF) + 0.15),
          });
        }
      }

      particlesRef.current = particles;
      setReady(true);
    };

    return () => {
      cancelled = true;
    };
  }, [width, height, gridCols]);

  React.useEffect(() => {
    if (!width || !height) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let rafId: number;
    const cellSize = width / gridCols;
    ctx.font = `${Math.max(6, cellSize * 1.4)}px "IBM Plex Mono", monospace`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      for (const p of particlesRef.current) {
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
          p.vx += (p.homeX - p.x) * SPRING;
          p.vy += (p.homeY - p.y) * SPRING;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        }

        const displacement = Math.hypot(p.x - p.homeX, p.y - p.homeY);
        const glow = Math.min(displacement / 20, 1);

        ctx.fillStyle = `rgba(${p.r | 0}, ${p.g | 0}, ${p.b | 0}, ${Math.min(1, p.alpha + glow * 0.4)})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [width, height, gridCols, reduceMotion, ready]);

  const updateMouseFromClient = (clientX: number, clientY: number) => {
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
    <div ref={containerRef} className={fixedWidth ? undefined : "w-full h-full"}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive ASCII art rendering of a Qala Labs visual"
        className={className}
        onMouseMove={(e) => updateMouseFromClient(e.clientX, e.clientY)}
        onMouseLeave={() => {
          mouseRef.current.active = false;
        }}
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (t) updateMouseFromClient(t.clientX, t.clientY);
        }}
        onTouchEnd={() => {
          mouseRef.current.active = false;
        }}
      />
    </div>
  );
};

export default ImageAsciiArt;
