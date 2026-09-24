"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface RevenueEngineGyroscopeProps {
  className?: string;
  size?: number;
}

const RevenueEngineGyroscope: React.FC<RevenueEngineGyroscopeProps> = ({ 
  className = "", 
  size = 320 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pulseTriggerRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group for magnetic tilt
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLightBlue = new THREE.PointLight(0x3b82f6, 3, 20);
    pointLightBlue.position.set(5, 5, 5);
    scene.add(pointLightBlue);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 4, 20);
    pointLightCyan.position.set(-5, -5, 5);
    scene.add(pointLightCyan);

    // Core Materials
    const ringMaterialOuter = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: false,
    });

    const ringMaterialMid = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: false,
    });

    const ringMaterialInner = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      metalness: 0.8,
      roughness: 0.3,
      wireframe: true,
    });

    // 1. Outer Ring (X-Axis dominant)
    const ringGeomOuter = new THREE.TorusGeometry(3.0, 0.05, 24, 100);
    const ringOuter = new THREE.Mesh(ringGeomOuter, ringMaterialOuter);
    rootGroup.add(ringOuter);

    // 2. Middle Ring (Y-Axis dominant)
    const ringGeomMid = new THREE.TorusGeometry(2.35, 0.04, 20, 90);
    const ringMid = new THREE.Mesh(ringGeomMid, ringMaterialMid);
    rootGroup.add(ringMid);

    // 3. Inner Ring (Z-Axis / tilt dominant)
    const ringGeomInner = new THREE.TorusGeometry(1.7, 0.035, 16, 80);
    const ringInner = new THREE.Mesh(ringGeomInner, ringMaterialInner);
    rootGroup.add(ringInner);

    // 4. Central Crystalline Icosahedron (The Core)
    const coreGeom = new THREE.IcosahedronGeometry(0.95, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      roughness: 0.1,
      metalness: 0.5,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMaterial);
    rootGroup.add(coreMesh);

    // Core Wireframe Cage
    const wireGeom = new THREE.IcosahedronGeometry(1.05, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeom, wireMaterial);
    rootGroup.add(wireMesh);

    // Orbiting Satellites (Media Buying & Lifecycle signals)
    const satelliteCount = 5;
    const satellites: THREE.Mesh[] = [];
    const satelliteGroup = new THREE.Group();
    rootGroup.add(satelliteGroup);

    const satGeom = new THREE.SphereGeometry(0.1, 16, 16);
    const satColors = [0x38bdf8, 0x10b981, 0x60a5fa, 0x34d399, 0xa78bfa];

    for (let i = 0; i < satelliteCount; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: satColors[i % satColors.length] });
      const sat = new THREE.Mesh(satGeom, mat);
      satellites.push(sat);
      satelliteGroup.add(sat);
    }

    // Burst Pulse Particles (Click Effect)
    const burstCount = 60;
    const burstGeom = new THREE.BufferGeometry();
    const burstPos = new Float32Array(burstCount * 3);
    const burstVel = new Float32Array(burstCount * 3);

    for (let i = 0; i < burstCount; i++) {
      burstPos[i * 3] = 0;
      burstPos[i * 3 + 1] = 0;
      burstPos[i * 3 + 2] = 0;

      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(Math.random() * 2 - 1);
      const speed = 0.04 + Math.random() * 0.08;

      burstVel[i * 3] = speed * Math.sin(theta) * Math.cos(phi);
      burstVel[i * 3 + 1] = speed * Math.sin(theta) * Math.sin(phi);
      burstVel[i * 3 + 2] = speed * Math.cos(theta);
    }

    burstGeom.setAttribute('position', new THREE.BufferAttribute(burstPos, 3));
    const burstMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.12,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const burstPoints = new THREE.Points(burstGeom, burstMat);
    rootGroup.add(burstPoints);

    let burstLife = 0; // 0 to 1

    pulseTriggerRef.current = () => {
      burstLife = 1.0;
      // Reset positions to center
      const arr = burstGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < burstCount * 3; i++) {
        arr[i] = 0;
      }
      burstGeom.attributes.position.needsUpdate = true;
      burstMat.opacity = 1.0;
    };

    // Magnetic Mouse Physics
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.45;
    };

    const onPointerLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mouseleave', onPointerLeave);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || size;
      const h = container.clientHeight || size;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop with Visibility Check
    let animId: number;
    let isVisible = true;
    const clock = new THREE.Clock();

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const speedMultiplier = prefersReducedMotion ? 0.2 : (isHovered ? 2.2 : 1.0);

      // Rotations of orthogonal rings
      ringOuter.rotation.x += delta * 0.45 * speedMultiplier;
      ringOuter.rotation.y += delta * 0.25 * speedMultiplier;

      ringMid.rotation.y -= delta * 0.65 * speedMultiplier;
      ringMid.rotation.z += delta * 0.35 * speedMultiplier;

      ringInner.rotation.z += delta * 0.9 * speedMultiplier;
      ringInner.rotation.x -= delta * 0.5 * speedMultiplier;

      // Central core pulse & rotation
      coreMesh.rotation.y += delta * 0.75 * speedMultiplier;
      coreMesh.rotation.x += delta * 0.35 * speedMultiplier;
      wireMesh.rotation.y -= delta * 0.4 * speedMultiplier;

      const breathe = Math.sin(elapsed * 2.5) * 0.05 + 1.0;
      coreMesh.scale.set(breathe, breathe, breathe);
      coreMaterial.emissiveIntensity = 0.5 + Math.sin(elapsed * 3) * 0.3;

      // Satellites orbital calculation
      satellites.forEach((sat, i) => {
        const offset = (i * (Math.PI * 2)) / satelliteCount;
        const radius = 2.0 + Math.sin(elapsed + i) * 0.3;
        const angle = elapsed * 1.2 * speedMultiplier + offset;
        sat.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.4) * (radius * 0.6),
          Math.sin(angle) * radius
        );
      });

      // Handle burst particles
      if (burstLife > 0) {
        burstLife -= delta * 1.5;
        burstMat.opacity = Math.max(0, burstLife);
        const arr = burstGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < burstCount; i++) {
          arr[i * 3] += burstVel[i * 3];
          arr[i * 3 + 1] += burstVel[i * 3 + 1];
          arr[i * 3 + 2] += burstVel[i * 3 + 2];
        }
        burstGeom.attributes.position.needsUpdate = true;
      }

      // Smooth spring tilt
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;
      rootGroup.rotation.x = currentRotX;
      rootGroup.rotation.y = currentRotY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Clean disposal
      ringGeomOuter.dispose();
      ringGeomMid.dispose();
      ringGeomInner.dispose();
      coreGeom.dispose();
      wireGeom.dispose();
      satGeom.dispose();
      burstGeom.dispose();

      ringMaterialOuter.dispose();
      ringMaterialMid.dispose();
      ringMaterialInner.dispose();
      coreMaterial.dispose();
      wireMaterial.dispose();
      burstMat.dispose();

      renderer.dispose();
    };
  }, [size, isHovered]);

  return (
    <div 
      className={`relative flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => pulseTriggerRef.current()}
      title="Click to trigger revenue pulse"
      role="region"
      aria-label="Interactive 3D Revenue Engine Gyroscope"
    >
      <div 
        ref={containerRef} 
        className="w-full h-full min-w-[260px] min-h-[260px] cursor-pointer"
      />
      <div className="absolute bottom-1 right-2 pointer-events-none text-[9px] font-mono text-cyan-400/60 uppercase tracking-widest">
        Revenue.core // click to pulse
      </div>
    </div>
  );
};

export default RevenueEngineGyroscope;
