import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ScaleHorizonTerrainProps {
  className?: string;
}

const MILESTONES = [
  { label: '₹25L/mo', status: 'Validation', x: -4, z: -2, color: 0x3b82f6 },
  { label: '₹50L/mo', status: 'Inflection', x: -1.5, z: -4, color: 0x3fe0e0 },
  { label: '₹1Cr/mo', status: 'Scale Phase', x: 1.5, z: -6, color: 0x34d399 },
  { label: '₹5Cr/mo', status: 'Category Leader', x: 4, z: -8, color: 0xf59e0b },
];

export const ScaleHorizonTerrain: React.FC<ScaleHorizonTerrainProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scaleLevel, setScaleLevel] = useState<number>(3); // 1 to 4 index
  const scaleRef = useRef(scaleLevel);
  scaleRef.current = scaleLevel;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070d, 0.08);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 5.5);
    camera.lookAt(0, 0.5, -4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x06070d, 0.95);
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0x3fe0e0, 3);
    dirLight.position.set(0, 8, 2);
    scene.add(dirLight);

    // Terrain Plane Geometry
    const segX = 48;
    const segY = 48;
    const planeGeom = new THREE.PlaneGeometry(24, 24, segX, segY);
    planeGeom.rotateX(-Math.PI / 2);

    const origY = new Float32Array(planeGeom.attributes.position.count);
    const pos = planeGeom.attributes.position.array as Float32Array;

    for (let i = 0; i < planeGeom.attributes.position.count; i++) {
      const x = pos[i * 3];
      const z = pos[i * 3 + 2];
      const h = Math.sin(x * 0.45) * Math.cos(z * 0.35) * 1.1 + Math.cos(x * 0.8 + z * 0.6) * 0.4;
      pos[i * 3 + 1] = h;
      origY[i] = h;
    }
    planeGeom.computeVertexNormals();

    const terrainMaterial = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      emissive: 0x0a1026,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: true,
    });
    const terrainMesh = new THREE.Mesh(planeGeom, terrainMaterial);
    scene.add(terrainMesh);

    // Solid terrain underneath for depth
    const solidMat = new THREE.MeshBasicMaterial({
      color: 0x06070d,
      transparent: true,
      opacity: 0.85,
    });
    const solidMesh = new THREE.Mesh(planeGeom, solidMat);
    solidMesh.position.y = -0.02;
    scene.add(solidMesh);

    // Milestone Beacons
    const beaconGroup = new THREE.Group();
    scene.add(beaconGroup);

    const beaconPillars: { mesh: THREE.Mesh; light: THREE.PointLight; idx: number }[] = [];

    MILESTONES.forEach((m, idx) => {
      const pillarGeom = new THREE.CylinderGeometry(0.04, 0.04, 2.5, 12);
      const pillarMat = new THREE.MeshBasicMaterial({ color: m.color, transparent: true, opacity: 0.85 });
      const pillar = new THREE.Mesh(pillarGeom, pillarMat);
      pillar.position.set(m.x, 1.25, m.z);

      const beaconLight = new THREE.PointLight(m.color, 2, 6);
      beaconLight.position.set(m.x, 2.5, m.z);

      // Top glowing bulb
      const bulbGeom = new THREE.SphereGeometry(0.15, 16, 16);
      const bulbMat = new THREE.MeshBasicMaterial({ color: m.color });
      const bulb = new THREE.Mesh(bulbGeom, bulbMat);
      bulb.position.y = 1.25;
      pillar.add(bulb);

      beaconGroup.add(pillar);
      beaconGroup.add(beaconLight);
      beaconPillars.push({ mesh: pillar, light: beaconLight, idx: idx + 1 });
    });

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 320;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // Mouse drag rotation
    let isDragging = false;
    let prevMouseX = 0;
    let yaw = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const onMouseUp = () => {
      isDragging = false;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      yaw += dx * 0.005;
      prevMouseX = e.clientX;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);

    // Animation Loop
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
      const currentScale = scaleRef.current;

      // Animate terrain vertices (advancing wave)
      if (!prefersReducedMotion) {
        const pArr = planeGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < planeGeom.attributes.position.count; i++) {
          const x = pArr[i * 3];
          const z = pArr[i * 3 + 2];
          const wave = Math.sin(z * 0.4 + elapsed * 1.5 + x * 0.2) * 0.35;
          pArr[i * 3 + 1] = origY[i] * (0.8 + currentScale * 0.2) + wave;
        }
        planeGeom.attributes.position.needsUpdate = true;
      }

      // Update beacon intensities based on active scale level
      beaconPillars.forEach(({ mesh, light, idx }) => {
        const isActive = idx <= currentScale;
        const bulb = mesh.children[0] as THREE.Mesh;
        if (isActive) {
          light.intensity = 2.5 + Math.sin(elapsed * 4 + idx) * 0.8;
          (mesh.material as THREE.MeshBasicMaterial).opacity = 0.95;
          if (bulb) bulb.scale.set(1.2, 1.2, 1.2);
        } else {
          light.intensity = 0.2;
          (mesh.material as THREE.MeshBasicMaterial).opacity = 0.2;
          if (bulb) bulb.scale.set(0.7, 0.7, 0.7);
        }
      });

      // Smooth camera yaw
      camera.position.x = Math.sin(yaw) * 6;
      camera.position.z = Math.cos(yaw) * 6 - 1;
      camera.lookAt(0, 0.5, -4);

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

      planeGeom.dispose();
      terrainMaterial.dispose();
      solidMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative rounded-3xl border border-white/10 bg-[#06070d] p-5 md:p-6 overflow-hidden select-none ${className}`}>
      {/* Card Header matching image 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <span className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          SCALE ARCHITECTURE // 3D VOLUMETRIC HORIZON
        </span>
        <span className="text-xs font-mono text-white/50">
          Unit economics held stable across revenue tiers
        </span>
      </div>

      {/* 3D Canvas */}
      <div 
        ref={containerRef} 
        className="w-full h-[280px] md:h-[340px] cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden border border-white/5"
        title="Drag horizontally to orbit the 3D scale terrain"
      />

      {/* Interactive Milestone Controller */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase text-white/60 tracking-wider">
            TARGET SCALE HORIZON // DRAG TO ORBIT
          </span>
          <span className="text-xs font-mono font-bold text-[#34D399]">
            {MILESTONES[scaleLevel - 1].label} &bull; {MILESTONES[scaleLevel - 1].status}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {MILESTONES.map((m, idx) => (
            <button
              key={m.label}
              onClick={() => setScaleLevel(idx + 1)}
              className={`p-3 rounded-xl text-left transition-all font-mono border ${
                scaleLevel === idx + 1
                  ? 'bg-[#4F46E5]/25 border-[#4F46E5] text-white shadow-lg shadow-[#4F46E5]/20 ring-1 ring-[#4F46E5]'
                  : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="text-sm font-bold text-white">{m.label}</div>
              <div className="text-[10px] text-white/50 truncate mt-0.5">{m.status}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScaleHorizonTerrain;
