import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface CreativeDataDualCoreProps {
  className?: string;
}

export const CreativeDataDualCore: React.FC<CreativeDataDualCoreProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'both' | 'creative' | 'data'>('both');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || 420;
    let height = container.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const lightCreative = new THREE.PointLight(0xa855f7, 4, 20); // Purple/violet creative glow
    lightCreative.position.set(-4, 3, 4);
    scene.add(lightCreative);

    const lightData = new THREE.PointLight(0x3fe0e0, 4, 20); // Qala Cyan data glow
    lightData.position.set(4, -3, 4);
    scene.add(lightData);

    // 1. Creative Core (Organic fluid sphere with perlin-like displacement)
    const creativeGeom = new THREE.SphereGeometry(1.6, 64, 64);
    const origPositions = creativeGeom.attributes.position.clone();
    
    const creativeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.5,
      roughness: 0.15,
      metalness: 0.3,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const creativeMesh = new THREE.Mesh(creativeGeom, creativeMaterial);
    creativeMesh.position.x = -1.9;
    mainGroup.add(creativeMesh);

    // 2. Data Engineering Core (Precision geometric dodecahedron / icosahedron wireframe + vertices)
    const dataGroup = new THREE.Group();
    dataGroup.position.x = 1.9;
    mainGroup.add(dataGroup);

    const dataGeom = new THREE.IcosahedronGeometry(1.6, 2);
    const dataWireMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.6,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
    });
    const dataMesh = new THREE.Mesh(dataGeom, dataWireMat);
    dataGroup.add(dataMesh);

    // Node vertices points
    const dataPointsMat = new THREE.PointsMaterial({
      color: 0x3fe0e0,
      size: 0.08,
      transparent: true,
      opacity: 0.95,
    });
    const dataPoints = new THREE.Points(dataGeom, dataPointsMat);
    dataGroup.add(dataPoints);

    // Inner glowing core for data
    const dataInnerGeom = new THREE.OctahedronGeometry(0.8, 0);
    const dataInnerMat = new THREE.MeshBasicMaterial({
      color: 0x3fe0e0,
      wireframe: true,
    });
    const dataInnerMesh = new THREE.Mesh(dataInnerGeom, dataInnerMat);
    dataGroup.add(dataInnerMesh);

    // 3. Central Synaptic Energy Bridge (Connecting Creative & Data)
    const bridgeLineCount = 14;
    const bridgeGroup = new THREE.Group();
    mainGroup.add(bridgeGroup);

    const bridgeLines: THREE.Line[] = [];
    const bridgePoints: Float32Array[] = [];

    for (let i = 0; i < bridgeLineCount; i++) {
      const lineGeom = new THREE.BufferGeometry();
      const pts = new Float32Array(20 * 3);
      lineGeom.setAttribute('position', new THREE.BufferAttribute(pts, 3));

      const lineMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0x3fe0e0 : 0xc084fc,
        transparent: true,
        opacity: 0.45 + Math.random() * 0.4,
      });

      const line = new THREE.Line(lineGeom, lineMat);
      bridgeLines.push(line);
      bridgePoints.push(pts);
      bridgeGroup.add(line);
    }

    // Interactive pointer physics & dragging
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let currRotY = 0;
    let currRotX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = x * 0.35;
        targetRotX = -y * 0.25;
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 420;
      height = container.clientHeight || 340;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // Visibility observer
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

      const elapsed = clock.getElapsedTime();

      // 1. Organic wave displacement on Creative Mesh
      if (!prefersReducedMotion) {
        const posAttr = creativeGeom.attributes.position as THREE.BufferAttribute;
        const pos = posAttr.array as Float32Array;
        const orig = origPositions.array as Float32Array;

        for (let i = 0; i < pos.length; i += 3) {
          const ox = orig[i];
          const oy = orig[i + 1];
          const oz = orig[i + 2];
          const wave = Math.sin(ox * 2.5 + elapsed * 2.2) * 
                       Math.cos(oy * 2.5 + elapsed * 1.8) * 
                       Math.sin(oz * 2.5 + elapsed * 1.5) * 0.18;
          pos[i] = ox + (ox / 1.6) * wave;
          pos[i + 1] = oy + (oy / 1.6) * wave;
          pos[i + 2] = oz + (oz / 1.6) * wave;
        }
        posAttr.needsUpdate = true;
      }

      creativeMesh.rotation.y += 0.008;
      creativeMesh.rotation.x += 0.005;

      // 2. Data Engineering rotations
      dataMesh.rotation.y -= 0.012;
      dataMesh.rotation.z += 0.008;
      dataInnerMesh.rotation.x += 0.02;
      dataInnerMesh.rotation.y += 0.02;

      // 3. Update Bridge lines with sine oscillations
      for (let l = 0; l < bridgeLineCount; l++) {
        const pts = bridgePoints[l];
        const lineGeom = bridgeLines[l].geometry;
        const yOffset = (l / bridgeLineCount - 0.5) * 1.8;

        for (let p = 0; p < 20; p++) {
          const t = p / 19; // 0 (creative) to 1 (data)
          const px = -1.9 + t * 3.8;
          const py = yOffset + Math.sin(t * Math.PI + elapsed * 3 + l) * 0.35;
          const pz = Math.cos(t * Math.PI * 2 + elapsed * 2 + l) * 0.4;

          pts[p * 3] = px;
          pts[p * 3 + 1] = py;
          pts[p * 3 + 2] = pz;
        }
        (lineGeom.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      }

      // Smooth pointer lerping
      currRotY += (targetRotY - currRotY) * 0.06;
      currRotX += (targetRotX - currRotX) * 0.06;
      mainGroup.rotation.y = currRotY;
      mainGroup.rotation.x = currRotX;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      creativeGeom.dispose();
      creativeMaterial.dispose();
      origPositions.dispose();
      dataGeom.dispose();
      dataWireMat.dispose();
      dataPointsMat.dispose();
      dataInnerGeom.dispose();
      dataInnerMat.dispose();
      bridgeLines.forEach(l => {
        l.geometry.dispose();
        (l.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* 3D Canvas */}
      <div 
        ref={containerRef} 
        className="w-full h-[320px] md:h-[360px] cursor-grab active:cursor-grabbing select-none"
      />

      {/* Floating Indicators Pill Bar */}
      <div className="flex items-center justify-between w-full px-4 sm:px-6 -mt-3 z-10 text-xs font-mono select-none">
        <button
          onClick={() => setActiveTab(activeTab === 'creative' ? 'both' : 'creative')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
            activeTab === 'creative' || activeTab === 'both'
              ? 'text-purple-300 bg-purple-950/60 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
              : 'text-white/40 bg-white/5 border-white/10'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="font-semibold">Creative Craft</span>
        </button>

        <div className="text-[10px] text-white/40 uppercase tracking-[2px] hidden sm:block">
          Fused &times; Revenue Engine
        </div>

        <button
          onClick={() => setActiveTab(activeTab === 'data' ? 'both' : 'data')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
            activeTab === 'data' || activeTab === 'both'
              ? 'text-[#3FE0E0] bg-[#06b6d4]/15 border-[#3FE0E0]/40 shadow-[0_0_15px_rgba(63,224,224,0.3)]'
              : 'text-white/40 bg-white/5 border-white/10'
          }`}
        >
          <span className="font-semibold">Data Discipline</span>
          <span className="w-2 h-2 rounded-full bg-[#3FE0E0] animate-pulse" />
        </button>
      </div>
    </div>
  );
};

export default CreativeDataDualCore;
