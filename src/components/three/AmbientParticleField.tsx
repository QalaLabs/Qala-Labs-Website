"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AmbientParticleFieldProps {
  className?: string;
}

const AmbientParticleField: React.FC<AmbientParticleFieldProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 70;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle grid
    const count = 10000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x1e3a8a); // deep blue
    const color2 = new THREE.Color(0x06b6d4); // electric cyan
    const color3 = new THREE.Color(0x3b82f6); // neon blue

    const xRange = 160;
    const yRange = 100;
    const zRange = 60;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * xRange;
      const y = (Math.random() - 0.5) * yRange;
      const z = (Math.random() - 0.5) * zRange;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Gradient color based on position
      const mixRatio = (x + xRange / 2) / xRange;
      const chosenColor = Math.random() > 0.6 ? color2 : (mixRatio > 0.5 ? color3 : color1);

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circular particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(8, 8, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop with IntersectionObserver
    let animationFrameId: number;
    let isVisible = true;
    const clock = new THREE.Clock();

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      
      // Smooth lerp mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      particles.rotation.y = prefersReducedMotion ? 0 : elapsed * 0.03 + mouseX * 0.2;
      particles.rotation.x = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.02) * 0.05 + mouseY * 0.15;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      if (!prefersReducedMotion) {
        for (let i = 0; i < count; i += 2) {
          const i3 = i * 3;
          const origX = originalPositions[i3];
          const origZ = originalPositions[i3 + 2];
          // Gentle wave propagation
          array[i3 + 1] = originalPositions[i3 + 1] + Math.sin(elapsed * 0.8 + origX * 0.05 + origZ * 0.05) * 1.8;
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} 
      aria-hidden="true"
    />
  );
};

export default AmbientParticleField;
