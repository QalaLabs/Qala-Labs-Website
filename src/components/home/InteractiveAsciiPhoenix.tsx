"use client";

import React from "react";

// Source glyph — the Qala phoenix, same mark used across the site's ASCII moments.
const PHOENIX_ASCII_LINES = [
  '            _,.-------.,_',
  '        ,;~\'             \'~;,',
  '     ,;                     ;,',
  '    ;                         ;',
  '   ,                           ,',
  '   ;          /\\   /\\          ;',
  '   |         /  \\ /  \\         |',
  '   |    _,--\'    V    \'--,_    |',
  '    \\  /       /\\ /\\       \\  /',
  '     \\/       /  V  \\       \\/',
  '      \\      /       \\      /',
  '       \\    /  QALA   \\    /',
  '        \\  /   LABS    \\  /',
  '         \\/             \\/',
  '          \\.           ./',
  '            \\.       ./',
  '              \\.   ./',
  '                \\ /',
  '                 V',
];

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
}

const CELL = 11; // px per character cell
const REPEL_RADIUS = 90;
const REPEL_STRENGTH = 14;
const SPRING = 0.06;
const DAMPING = 0.82;

/**
 * Interactive ASCII rendering of the Qala phoenix. Each glyph is a particle
 * that scatters away from the cursor (or touch) and eases back home —
 * a living version of the static ASCII motif already used in the hero.
 */
const InteractiveAsciiPhoenix: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const particlesRef = React.useRef<Particle[]>([]);
  const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const width = React.useMemo(
    () => Math.max(...PHOENIX_ASCII_LINES.map((l) => l.length)) * CELL,
    []
  );
  const height = PHOENIX_ASCII_LINES.length * CELL;

  React.useEffect(() => {
    const particles: Particle[] = [];
    PHOENIX_ASCII_LINES.forEach((line, row) => {
      for (let col = 0; col < line.length; col++) {
        const char = line[col];
        if (char === " ") continue;
        const homeX = col * CELL + CELL / 2;
        const homeY = row * CELL + CELL / 2;
        particles.push({ homeX, homeY, x: homeX, y: homeY, vx: 0, vy: 0, char });
      }
    });
    particlesRef.current = particles;
  }, []);

  React.useEffect(() => {
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
    ctx.font = `${CELL}px "IBM Plex Mono", monospace`;
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
          // spring back home
          p.vx += (p.homeX - p.x) * SPRING;
          p.vy += (p.homeY - p.y) * SPRING;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        }

        const displacement = Math.hypot(p.x - p.homeX, p.y - p.homeY);
        const glow = Math.min(displacement / 20, 1);
        const isCore = p.char === "Q" || p.char === "A" || p.char === "L" || p.char === "B" || p.char === "S";

        const r = 56 + glow * 160;
        const g = 130 + glow * 90;
        const b = 246;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${isCore ? 0.95 : 0.6 + glow * 0.4})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [width, height, reduceMotion]);

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
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Interactive ASCII art of the Qala Labs phoenix mark"
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
  );
};

export default InteractiveAsciiPhoenix;
