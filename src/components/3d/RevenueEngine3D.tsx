"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface RevenueEngine3DProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  showControlsHint?: boolean;
}

export const RevenueEngine3D: React.FC<RevenueEngine3DProps> = ({
  className = "",
  height = "320px",
  width = "100%",
  showControlsHint = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    const isWebGLSupported = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!isWebGLSupported()) {
      setWebglError(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    let renderer: THREE.WebGLRenderer | null = null;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      setWebglError(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- WebGL Context Loss Handling ---
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };

    const handleContextRestored = () => {
      setWebglError(false);
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    // --- 3D Objects: Qala Revenue Operating System Core ---
    const engineGroup = new THREE.Group();
    scene.add(engineGroup);

    // 1. Core Geometric Polyhedron (Icosahedron representing the core model)
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x06070d,
      emissive: 0x2563eb,
      emissiveIntensity: 0.35,
      shininess: 90,
      flatShading: true,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    engineGroup.add(coreMesh);

    // 2. Glowing Precision Wireframe
    const wireframeGeometry = new THREE.WireframeGeometry(coreGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.85,
      linewidth: 1,
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    engineGroup.add(wireframe);

    // 3. Inner Pulsing Jewel (Magician & Sage fusion)
    const innerJewelGeometry = new THREE.OctahedronGeometry(0.65, 0);
    const innerJewelMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
    });
    const innerJewel = new THREE.Mesh(innerJewelGeometry, innerJewelMaterial);
    engineGroup.add(innerJewel);

    // 4. Orbital Rings (Revenue Data Streams)
    const ring1Geometry = new THREE.TorusGeometry(1.85, 0.018, 16, 100);
    const ring1Material = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 3;
    engineGroup.add(ring1);

    const ring2Geometry = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    engineGroup.add(ring2);

    // 5. Orbiting Nodes (Autonomous agents & metrics)
    const nodeCount = 5;
    const nodes: THREE.Mesh[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.07, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      engineGroup.add(node);
      nodes.push(node);
    }

    // 6. Ambient Particle Starfield / Signal Cloud
    const particleCount = isMobile ? 35 : 70;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cursorLight = new THREE.PointLight(0x3b82f6, 4, 10);
    cursorLight.position.set(2, 2, 4);
    scene.add(cursorLight);

    const secondaryLight = new THREE.PointLight(0x06b6d4, 2, 8);
    secondaryLight.position.set(-3, -2, 2);
    scene.add(secondaryLight);

    // --- Interaction / Cursor Tracking ---
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotationY = x * Math.PI * 0.8;
      targetRotationX = y * Math.PI * 0.8;

      // Move point light with cursor for specular sheen
      cursorLight.position.x = x * 8;
      cursorLight.position.y = -y * 8;
    };

    const handleMouseEnter = () => setIsInteracting(true);
    const handleMouseLeave = () => {
      setIsInteracting(false);
      targetRotationX = 0;
      targetRotationY = 0;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // --- Visibility / Intersection Observer for Battery Life ---
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Pause GPU consumption when out of view

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth easing towards mouse position
        currentRotationX += (targetRotationX - currentRotationX) * 0.08;
        currentRotationY += (targetRotationY - currentRotationY) * 0.08;

        // Base idle rotation + interactive rotation
        engineGroup.rotation.y = currentRotationY + elapsedTime * 0.25;
        engineGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.4) * 0.1;

        // Inner jewel counters-rotation
        innerJewel.rotation.y = -elapsedTime * 0.5;
        innerJewel.rotation.z = elapsedTime * 0.3;

        // Pulse core scale slightly like a heartbeat
        const pulse = 1 + Math.sin(elapsedTime * 2) * 0.03;
        coreMesh.scale.set(pulse, pulse, pulse);
        wireframe.scale.set(pulse, pulse, pulse);

        // Orbital rings counter-rotation
        ring1.rotation.z = elapsedTime * 0.3;
        ring2.rotation.z = -elapsedTime * 0.2;

        // Move orbiting nodes along elliptical paths
        nodes.forEach((node, i) => {
          const angle = elapsedTime * 0.6 + (i * Math.PI * 2) / nodeCount;
          const radius = 1.85;
          node.position.x = Math.cos(angle) * radius;
          node.position.y = Math.sin(angle) * Math.cos(Math.PI / 3) * radius;
          node.position.z = Math.sin(angle) * Math.sin(Math.PI / 3) * radius;
        });

        // Subtle particle drift
        particleSystem.rotation.y = elapsedTime * 0.05;
      }

      renderer?.render(scene, camera);
    };

    animate();

    // --- Resource Disposal & Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);

      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);

      // Recursive disposal of Three.js resources
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        }
      });

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl select-none ${className}`}
      style={{ height, width, minHeight: '260px' }}
      aria-label="Interactive 3D Qala Revenue Operating System Core"
    >
      {/* 3D WebGL Canvas mounted here */}

      {/* Fallback for WebGL Error or Unsupported Devices */}
      {webglError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 p-6 text-center text-slate-300">
          <div className="w-16 h-16 rounded-full border-2 border-blue-500/40 flex items-center justify-center mb-3 text-blue-400">
            <span className="font-mono text-xl font-bold">OS</span>
          </div>
          <p className="font-mono text-xs text-blue-300 uppercase tracking-wider">Qala Revenue Engine</p>
          <p className="text-xs text-slate-400 mt-1">Interactive 3D mode paused on this device</p>
        </div>
      )}

      {/* Subtle Interactive Status HUD Overlay */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none text-[10px] font-mono text-slate-500/80">
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isInteracting ? 'bg-cyan-400 animate-ping' : 'bg-blue-500'}`} />
          <span>core.system // {isInteracting ? 'tracking' : 'idle'}</span>
        </span>
        {showControlsHint && (
          <span className="hidden sm:inline-block text-slate-400/60">hover to rotate 3D</span>
        )}
      </div>
    </div>
  );
};

export default RevenueEngine3D;
