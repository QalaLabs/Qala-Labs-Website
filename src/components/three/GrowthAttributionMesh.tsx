"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NodeData {
  id: string;
  name: string;
  category: string;
  metric: string;
  color: number;
  pos: [number, number, number];
}

const NODES: NodeData[] = [
  {
    id: 'media',
    name: 'Performance Media',
    category: 'GTM.1 / Acquisition',
    metric: 'Meta & Google CAPI High-Signal',
    color: 0x3b82f6, // Neon Blue
    pos: [-3.2, 1.4, 0.4],
  },
  {
    id: 'creative',
    name: 'Creative Engine',
    category: 'Creative Craft',
    metric: 'Iterative Hook & Angle Testing',
    color: 0xa855f7, // Violet
    pos: [-2.0, -1.8, 1.0],
  },
  {
    id: 'ai-lifecycle',
    name: 'AI Lifecycle Flow',
    category: 'GTM.2 / Retention',
    metric: 'WhatsApp & Klaviyo Automation',
    color: 0x10b981, // Emerald
    pos: [2.2, 1.8, -0.6],
  },
  {
    id: 'sku-economics',
    name: 'SKU Unit Economics',
    category: 'GTM.3 / Instrumentation',
    metric: 'Real-Time CAC:LTV Tracking',
    color: 0x06b6d4, // Cyan
    pos: [3.0, -1.4, 0.8],
  },
  {
    id: 'compounding-scale',
    name: 'Compounding Revenue',
    category: 'System Yield',
    metric: 'Scalable to \u20B91Cr+/mo',
    color: 0xf59e0b, // Amber Gold
    pos: [0, 0, 0],
  },
];

// Edges connecting to the central hub and between synergistic modules
const CONNECTIONS = [
  ['media', 'compounding-scale'],
  ['creative', 'compounding-scale'],
  ['ai-lifecycle', 'compounding-scale'],
  ['sku-economics', 'compounding-scale'],
  ['media', 'creative'],
  ['ai-lifecycle', 'sku-economics'],
];

const GrowthAttributionMesh: React.FC<{ className?: string }> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<NodeData>(NODES[4]); // default to compounding-scale

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 3, 25);
    pointLight.position.set(0, 4, 6);
    scene.add(pointLight);

    // Build Node Meshes
    const nodeMeshes: { mesh: THREE.Mesh; data: NodeData; halo: THREE.Mesh }[] = [];
    const interactiveObjects: THREE.Object3D[] = [];

    NODES.forEach((node) => {
      const isHub = node.id === 'compounding-scale';
      const geom = new THREE.SphereGeometry(isHub ? 0.65 : 0.42, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: isHub ? 0.8 : 0.5,
        roughness: 0.2,
        metalness: 0.8,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(...node.pos);
      mesh.userData = { nodeData: node };

      // Surrounding wireframe halo
      const haloGeom = new THREE.IcosahedronGeometry(isHub ? 0.95 : 0.65, 1);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const halo = new THREE.Mesh(haloGeom, haloMat);
      mesh.add(halo);

      mainGroup.add(mesh);
      nodeMeshes.push({ mesh, data: node, halo });
      interactiveObjects.push(mesh);
    });

    // Build Spline Curves & Energy Packets
    interface SignalPacket {
      curve: THREE.CatmullRomCurve3;
      mesh: THREE.Mesh;
      speed: number;
      progress: number;
    }
    const signalPackets: SignalPacket[] = [];
    const splineLines: THREE.Line[] = [];

    CONNECTIONS.forEach(([startId, endId]) => {
      const n1 = NODES.find(n => n.id === startId)!;
      const n2 = NODES.find(n => n.id === endId)!;

      const p1 = new THREE.Vector3(...n1.pos);
      const p2 = new THREE.Vector3(...n2.pos);
      // Mid-point arched in Z for depth
      const mid = p1.clone().lerp(p2, 0.5).add(new THREE.Vector3(0, 0.3, 0.5));

      const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      const points = curve.getPoints(30);
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      mainGroup.add(line);
      splineLines.push(line);

      // Packet traveling along curve
      const packetGeom = new THREE.SphereGeometry(0.08, 12, 12);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const packetMesh = new THREE.Mesh(packetGeom, packetMat);
      mainGroup.add(packetMesh);

      signalPackets.push({
        curve,
        mesh: packetMesh,
        speed: 0.25 + Math.random() * 0.25,
        progress: Math.random(),
      });
    });

    // Raycasting for interactive hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    container.addEventListener('mousemove', onPointerMove);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 360;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    let isVisible = true;
    const clock = new THREE.Clock();

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    let targetRotY = 0;
    let targetRotX = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Slow orbital drift
      if (!prefersReducedMotion) {
        targetRotY = Math.sin(elapsed * 0.3) * 0.25;
        targetRotX = Math.cos(elapsed * 0.2) * 0.15;
      }
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;

      // Animate Halos
      nodeMeshes.forEach(({ halo, mesh }) => {
        halo.rotation.y += delta * 0.8;
        halo.rotation.x += delta * 0.4;
      });

      // Animate Signal Packets
      signalPackets.forEach(pkt => {
        pkt.progress = (pkt.progress + delta * pkt.speed) % 1.0;
        const pt = pkt.curve.getPoint(pkt.progress);
        pkt.mesh.position.copy(pt);
      });

      // Raycaster check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const data = hit.userData.nodeData as NodeData;
        if (data && data.id !== activeNode.id) {
          setActiveNode(data);
        }
        hit.scale.set(1.2, 1.2, 1.2);
      } else {
        nodeMeshes.forEach(({ mesh }) => {
          mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      nodeMeshes.forEach(({ mesh, halo }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
        halo.geometry.dispose();
        (halo.material as THREE.Material).dispose();
      });

      splineLines.forEach(line => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });

      signalPackets.forEach(pkt => {
        pkt.mesh.geometry.dispose();
        (pkt.mesh.material as THREE.Material).dispose();
      });

      renderer.dispose();
    };
  }, [activeNode.id]);

  return (
    <div className={`relative rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl p-6 overflow-hidden ${className}`}>
      {/* 3D Scene */}
      <div 
        ref={containerRef} 
        className="w-full h-[320px] md:h-[380px] cursor-pointer"
        title="Hover over nodes to inspect attribution signals"
      />

      {/* Floating HUD Telemetry */}
      <div className="absolute top-4 left-6 pointer-events-none">
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Attribution &times; Growth Graph</span>
        </div>
        <div className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
          <span>{activeNode.name}</span>
        </div>
        <div className="text-xs text-slate-400 font-mono mt-0.5">
          {activeNode.category} &mdash; <span className="text-cyan-400 font-bold">{activeNode.metric}</span>
        </div>
      </div>

      {/* Interactive Legend Bar */}
      <div className="flex flex-wrap items-center gap-2 mt-2 pt-3 border-t border-white/5">
        {NODES.map((n) => (
          <button
            key={n.id}
            onClick={() => setActiveNode(n)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all flex items-center gap-1.5 ${
              activeNode.id === n.id
                ? 'bg-white/20 text-white border border-white/30 font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span 
              className="w-2 h-2 rounded-full inline-block" 
              style={{ backgroundColor: `#${n.color.toString(16).padStart(6, '0')}` }} 
            />
            {n.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GrowthAttributionMesh;
