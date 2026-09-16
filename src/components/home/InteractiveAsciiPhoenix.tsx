"use client";

import React from "react";

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  colorT: number; // 0 = warm core, 1 = cool outer edge
  baseAlpha: number;
}

const REPEL_RADIUS = 80;
const REPEL_STRENGTH = 16;
const SPRING = 0.05;
const DAMPING = 0.83;

const DENSITY_CHARS = [".", ":", "-", "+", "*", "#", "%", "@", "$"];

// Deterministic PRNG so the figure doesn't reshuffle on every re-render.
function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const pt = (a: [number, number], b: [number, number], t: number): [number, number] => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
];

/**
 * Generates a humanoid dot-matrix figure — small head, arms spread wide,
 * legs planted in a broad stance — with density fading and scatter growing
 * toward the extremities, echoing the reference ASCII/particle artwork.
 */
function generateHumanoid(width: number, height: number): Omit<Particle, "x" | "y" | "vx" | "vy">[] {
  const rng = makeRng(42);
  const particles: Omit<Particle, "x" | "y" | "vx" | "vy">[] = [];

  const add = (
    xNorm: number,
    yNorm: number,
    density: number,
    colorT: number
  ) => {
    const char = DENSITY_CHARS[Math.min(DENSITY_CHARS.length - 1, Math.round(density * (DENSITY_CHARS.length - 1)))];
    particles.push({
      homeX: xNorm * width,
      homeY: yNorm * height,
      char,
      colorT,
      baseAlpha: 0.35 + density * 0.6,
    });
  };

  // Skeleton keypoints, normalized 0-1 (x: left→right, y: top→bottom).
  const head: [number, number] = [0.5, 0.09];
  const neck: [number, number] = [0.5, 0.17];
  const shoulderL: [number, number] = [0.28, 0.21];
  const shoulderR: [number, number] = [0.72, 0.21];
  const elbowL: [number, number] = [0.08, 0.32];
  const elbowR: [number, number] = [0.92, 0.32];
  const handL: [number, number] = [-0.06, 0.4];
  const handR: [number, number] = [1.06, 0.4];
  const hip: [number, number] = [0.5, 0.55];
  const hipL: [number, number] = [0.4, 0.55];
  const hipR: [number, number] = [0.6, 0.55];
  const kneeL: [number, number] = [0.28, 0.75];
  const kneeR: [number, number] = [0.72, 0.75];
  const footL: [number, number] = [0.16, 0.98];
  const footR: [number, number] = [0.84, 0.98];

  // Head — dense little cluster.
  const headSamples = 70;
  for (let i = 0; i < headSamples; i++) {
    const angle = rng() * Math.PI * 2;
    const r = Math.sqrt(rng()) * 0.05;
    const x = head[0] + Math.cos(angle) * r * 0.7;
    const y = head[1] + Math.sin(angle) * r;
    const density = 1 - r / 0.05;
    add(x, y, Math.max(0.3, density), 0.05);
  }

  // Limb/torso capsule sampler with edge fade + scatter growth toward tips.
  const addCapsule = (
    a: [number, number],
    b: [number, number],
    baseR: number,
    endR: number,
    count: number,
    colorFrom: number,
    colorTo: number,
    fadeStart = 0.7
  ) => {
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const jitterT = Math.min(1, Math.max(0, t + (rng() - 0.5) * 0.06));
      const center = pt(a, b, jitterT);
      const radius = lerp(baseR, endR, jitterT);
      const fade = jitterT > fadeStart ? 1 - ((jitterT - fadeStart) / (1 - fadeStart)) * 0.8 : 1;
      if (rng() > fade + 0.15) continue; // thin out near the tips

      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const len = Math.hypot(dx, dy) || 1;
      const perpX = -dy / len;
      const perpY = dx / len;
      const scatterBoost = jitterT > fadeStart ? 1 + ((jitterT - fadeStart) / (1 - fadeStart)) * 3 : 1;
      const offset = (rng() * 2 - 1) * radius * scatterBoost;
      const along = (rng() - 0.5) * radius * 0.6;

      const x = center[0] + perpX * offset + (dx / len) * along;
      const y = center[1] + perpY * offset + (dy / len) * along;
      const density = Math.max(0.15, 1 - Math.abs(offset) / (radius * scatterBoost * 1.4));
      add(x, y, density, lerp(colorFrom, colorTo, jitterT));

      // occasional stray outlier for a "dissolving" look near tips
      if (jitterT > fadeStart && rng() < 0.5) {
        const strayOffset = offset * (1.5 + rng());
        add(
          center[0] + perpX * strayOffset + (dx / len) * along * 2,
          center[1] + perpY * strayOffset + (dy / len) * along * 2,
          0.15,
          Math.min(1, lerp(colorFrom, colorTo, jitterT) + 0.15)
        );
      }
    }
  };

  // Torso — warm core.
  addCapsule(neck, hip, 0.1, 0.08, 140, 0.1, 0.25, 0.85);
  // Shoulders bridge.
  addCapsule(shoulderL, shoulderR, 0.03, 0.03, 40, 0.15, 0.15, 1);
  // Arms — outward and slightly down, scattering at the hands.
  addCapsule(shoulderL, elbowL, 0.045, 0.035, 70, 0.2, 0.45);
  addCapsule(elbowL, handL, 0.035, 0.015, 70, 0.45, 0.85, 0.5);
  addCapsule(shoulderR, elbowR, 0.045, 0.035, 70, 0.2, 0.45);
  addCapsule(elbowR, handR, 0.035, 0.015, 70, 0.45, 0.85, 0.5);
  // Hips.
  addCapsule(hipL, hipR, 0.05, 0.05, 30, 0.2, 0.2, 1);
  // Legs — wide stance, scattering at the feet.
  addCapsule(hipL, kneeL, 0.055, 0.045, 80, 0.25, 0.55);
  addCapsule(kneeL, footL, 0.045, 0.02, 70, 0.55, 0.95, 0.55);
  addCapsule(hipR, kneeR, 0.055, 0.045, 80, 0.25, 0.55);
  addCapsule(kneeR, footR, 0.045, 0.02, 70, 0.55, 0.95, 0.55);

  return particles;
}

const CELL = 9;

const InteractiveAsciiPhoenix: React.FC<{ className?: string; width?: number; height?: number }> = ({
  className,
  width = 380,
  height = 460,
}) => {
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

  React.useEffect(() => {
    particlesRef.current = generateHumanoid(width, height).map((p) => ({
      ...p,
      x: p.homeX,
      y: p.homeY,
      vx: 0,
      vy: 0,
    }));
  }, [width, height]);

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
          p.vx += (p.homeX - p.x) * SPRING;
          p.vy += (p.homeY - p.y) * SPRING;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.x += p.vx;
          p.y += p.vy;
        }

        const displacement = Math.hypot(p.x - p.homeX, p.y - p.homeY);
        const glow = Math.min(displacement / 24, 1);

        // Orange core → violet edge, warmed further on displacement.
        const orange: [number, number, number] = [255, 150, 60];
        const violet: [number, number, number] = [150, 90, 220];
        const t = Math.min(1, p.colorT);
        const r = lerp(orange[0], violet[0], t) + glow * 30;
        const g = lerp(orange[1], violet[1], t) + glow * 20;
        const b = lerp(orange[2], violet[2], t);

        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${Math.min(1, p.baseAlpha + glow * 0.3)})`;
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
      aria-label="Interactive ASCII art of a Qala Labs figure"
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
