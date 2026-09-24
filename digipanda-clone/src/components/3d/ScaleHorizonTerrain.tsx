import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ScaleHorizonTerrainProps {
  className?: string;
}

interface MilestoneInfo {
  label: string;
  status: string;
  x: number;
  z: number;
  color: number;
  hex: string;
  thesis: string;
  dragSolved: string;
  deployments: string[];
  metrics: {
    targetMargin: string;
    blendedRoas: string;
    cacTarget: string;
    velocity: string;
  };
}

const MILESTONES: MilestoneInfo[] = [
  {
    label: '₹25L/mo',
    status: 'Validation Phase',
    x: -4,
    z: -2,
    color: 0x3b82f6,
    hex: '#3b82f6',
    thesis: 'Establish unit economic proof and offer resonance before capital allocation.',
    dragSolved: 'Ad fatigue and lack of statistical creative hook validation.',
    deployments: [
      '20-30 weekly high-variance ad creative variations',
      'Server-Side Meta Conversions API (CAPI) instrumentation',
      'Landing page conversion rate optimization (CRO > 2.8%)',
      'Direct WhatsApp buyer qualification micro-funnels',
    ],
    metrics: {
      targetMargin: '18% – 22%',
      blendedRoas: '3.5x – 4.0x',
      cacTarget: '₹450 – ₹650',
      velocity: '20+ Hooks / Wk',
    },
  },
  {
    label: '₹50L/mo',
    status: 'Inflection Phase',
    x: -1.5,
    z: -4,
    color: 0x3fe0e0,
    hex: '#3fe0e0',
    thesis: 'Diversify paid channels and expand basket sizes without margin dilution.',
    dragSolved: 'Single-channel audience fatigue on Meta and cart abandonment.',
    deployments: [
      'Multi-channel ad scaling (Google Search, PMax & Amazon Ads)',
      'Dynamic Buy-Now-Pay-Later (BNPL) checkout widgets (+20% AOV)',
      'Automated NDR handling & return-to-origin mitigation flows',
      'Email/SMS lifecycle retention sequences (Klaviyo)',
    ],
    metrics: {
      targetMargin: '24% – 28%',
      blendedRoas: '4.0x – 4.5x',
      cacTarget: '₹550 – ₹750',
      velocity: '35+ Hooks / Wk',
    },
  },
  {
    label: '₹1Cr/mo',
    status: 'Scale Phase',
    x: 1.5,
    z: -6,
    color: 0x34d399,
    hex: '#34d399',
    thesis: 'Replace manual operational drag with autonomous multi-agent swarms.',
    dragSolved: 'Payment reconciliation lag, inventory overselling, and CRM lead leaks.',
    deployments: [
      'MarksOps multi-agent operations swarms (CRM lead scoring & routing)',
      'Real-time automated financial & payment gateway reconciliation',
      'Omnichannel inventory synchronization across stores (Unicommerce)',
      'AI ad creative engine generating 50+ on-brand assets weekly',
    ],
    metrics: {
      targetMargin: '30% – 34%',
      blendedRoas: '4.8x – 5.5x',
      cacTarget: '< ₹850 Blended',
      velocity: '50+ Assets / Wk',
    },
  },
  {
    label: '₹5Cr/mo',
    status: 'Category Leader',
    x: 4,
    z: -8,
    color: 0xf59e0b,
    hex: '#f59e0b',
    thesis: 'Defensible category dominance backed by predictive lifetime value bidding.',
    dragSolved: 'Marginal efficiency decay at high-volume ad spend (>₹1Cr/mo spend).',
    deployments: [
      'Bespoke Media Mix Modeling (MMM) & predictive LTV cohort bidding',
      'Dedicated fine-tuned LoRA generative pipelines for zero shoot friction',
      'VIP concierge funnels and brand loyalty systems (>42% repeat rate)',
      'Global multi-warehouse routing and international localized checkouts',
    ],
    metrics: {
      targetMargin: '35%+',
      blendedRoas: '5.5x+ Blended',
      cacTarget: 'Defensible CAC',
      velocity: 'Endless Variations',
    },
  },
];

export const ScaleHorizonTerrain: React.FC<ScaleHorizonTerrainProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scaleLevel, setScaleLevel] = useState<number>(3); // 1 to 4 index
  const scaleRef = useRef(scaleLevel);
  scaleRef.current = scaleLevel;

  const currentMilestone = MILESTONES[scaleLevel - 1];

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
        const isActive = idx === currentScale;
        const isReached = idx <= currentScale;
        const bulb = mesh.children[0] as THREE.Mesh;
        if (isActive) {
          light.intensity = 3.5 + Math.sin(elapsed * 5) * 1.2;
          (mesh.material as THREE.MeshBasicMaterial).opacity = 1.0;
          if (bulb) bulb.scale.set(1.4, 1.4, 1.4);
        } else if (isReached) {
          light.intensity = 1.5;
          (mesh.material as THREE.MeshBasicMaterial).opacity = 0.7;
          if (bulb) bulb.scale.set(1.0, 1.0, 1.0);
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
    <div className={`relative rounded-3xl border border-white/10 bg-[#06070d] p-5 md:p-6 overflow-hidden select-none shadow-2xl ${className}`}>
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
        className="w-full h-[260px] md:h-[320px] cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden border border-white/5 relative"
        title="Drag horizontally to orbit the 3D scale terrain"
      />

      {/* Interactive Milestone Controller */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono uppercase text-white/60 tracking-wider">
            TARGET SCALE HORIZON // CLICK TIER TO INSPECT
          </span>
          <span className="text-xs font-mono font-bold" style={{ color: currentMilestone.hex }}>
            {currentMilestone.label} &bull; {currentMilestone.status}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {MILESTONES.map((m, idx) => {
            const isSelected = scaleLevel === idx + 1;
            return (
              <button
                key={m.label}
                onClick={() => setScaleLevel(idx + 1)}
                className={`p-3 rounded-xl text-left transition-all font-mono border ${
                  isSelected
                    ? 'bg-white/10 text-white shadow-lg ring-1'
                    : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
                style={{
                  borderColor: isSelected ? m.hex : undefined,
                  boxShadow: isSelected ? `0 0 20px -5px ${m.hex}40` : undefined,
                }}
              >
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{m.label}</span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.hex }} />
                </div>
                <div className="text-[10px] text-white/50 truncate mt-0.5">{m.status}</div>
              </button>
            );
          })}
        </div>

        {/* Informative Diagnostic Telemetry Panel */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                Architectural Horizon Thesis
              </span>
              <p className="text-sm sm:text-base font-medium text-white mt-0.5">
                {currentMilestone.thesis}
              </p>
            </div>
            <div className="shrink-0 px-3 py-1 rounded-full text-xs font-mono font-bold border" style={{ color: currentMilestone.hex, borderColor: `${currentMilestone.hex}40`, backgroundColor: `${currentMilestone.hex}15` }}>
              {currentMilestone.status}
            </div>
          </div>

          {/* Key Metrics Benchmarks Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] font-mono text-white/40 uppercase block">Contribution Margin</span>
              <span className="text-base font-bold text-white mt-1 block">{currentMilestone.metrics.targetMargin}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] font-mono text-white/40 uppercase block">Target Blended ROAS</span>
              <span className="text-base font-bold text-[#34D399] mt-1 block">{currentMilestone.metrics.blendedRoas}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] font-mono text-white/40 uppercase block">Blended CAC Target</span>
              <span className="text-base font-bold text-[#3FE0E0] mt-1 block">{currentMilestone.metrics.cacTarget}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] font-mono text-white/40 uppercase block">Creative Velocity</span>
              <span className="text-base font-bold text-[#F59E0B] mt-1 block">{currentMilestone.metrics.velocity}</span>
            </div>
          </div>

          {/* Critical Drag & Deployed Systems Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-3.5 rounded-xl bg-red-500/[0.04] border border-red-500/20">
              <span className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-wider block mb-1">
                ⚠ Critical Drag Solved At This Tier
              </span>
              <p className="text-white/80 leading-relaxed">
                {currentMilestone.dragSolved}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
              <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1.5">
                ✓ Mandatory Production Systems Deployed
              </span>
              <ul className="space-y-1 text-white/70">
                {currentMilestone.deployments.map((dep, dIdx) => (
                  <li key={dIdx} className="flex items-center gap-1.5">
                    <span className="text-emerald-400">•</span>
                    <span>{dep}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleHorizonTerrain;

