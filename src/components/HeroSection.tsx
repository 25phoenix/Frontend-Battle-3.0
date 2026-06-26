"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, TorusKnot } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import {
  ArrowTrendingUpIcon,
  SearchIcon,
  ChevronRightIcon,
  Cube16SolidIcon,
  LinkSolidIcon,
  ChevronUpSolidIcon,
  ChevronDownIcon,
  ArrowPathIcon,
} from "./icons";

function BackgroundParticles() {
  const count = 3000;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 80;
      p[i * 3 + 1] = (Math.random() - 0.5) * 80;
      p[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.x = t * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#D9E8E2" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function LiquidInteractiveShapes() {
  const knotRef = useRef<THREE.Mesh>(null);
  const sphereRef1 = useRef<THREE.Mesh>(null);
  const sphereRef2 = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const mat1Ref = useRef<any>(null);
  const mat2Ref = useRef<any>(null);

  const targetColor1 = useRef(new THREE.Color("#114C5A"));
  const targetColor2 = useRef(new THREE.Color("#FFC801"));
  const targetColor3 = useRef(new THREE.Color("#FF9932"));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.4;
      knotRef.current.rotation.y = t * 0.3;
    }
    if (sphereRef1.current) {
      const targetX = Math.cos(t * 0.5) * 6;
      const targetY = Math.sin(t * 0.8) * 4;
      sphereRef1.current.position.x = THREE.MathUtils.lerp(sphereRef1.current.position.x, targetX, 0.1);
      sphereRef1.current.position.y = THREE.MathUtils.lerp(sphereRef1.current.position.y, targetY, 0.1);
    }
    if (sphereRef2.current) {
      const targetX = Math.sin(t * 0.6) * -7;
      const targetY = Math.cos(t * 1.1) * 5;
      sphereRef2.current.position.x = THREE.MathUtils.lerp(sphereRef2.current.position.x, targetX, 0.1);
      sphereRef2.current.position.y = THREE.MathUtils.lerp(sphereRef2.current.position.y, targetY, 0.1);
    }

    const hueShift = ((state.pointer.x + 1) / 2 + (state.pointer.y + 1) / 2) * 0.5;

    targetColor1.current.setHSL((0.55 + hueShift) % 1, 0.7, 0.3);
    targetColor2.current.setHSL((0.13 + hueShift) % 1, 0.9, 0.5);
    targetColor3.current.setHSL((0.08 + hueShift) % 1, 0.9, 0.6);

    if (materialRef.current) materialRef.current.color.lerp(targetColor1.current, 0.05);
    if (mat1Ref.current) {
      mat1Ref.current.color.lerp(targetColor2.current, 0.05);
      mat1Ref.current.emissive.lerp(targetColor3.current, 0.05);
    }
    if (mat2Ref.current) {
      mat2Ref.current.color.lerp(targetColor3.current, 0.05);
      mat2Ref.current.emissive.lerp(targetColor1.current, 0.05);
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={1.8} floatIntensity={2.5}>
        <TorusKnot args={[3, 0.6, 256, 64]} position={[0, 0, -8]} ref={knotRef}>
          <MeshDistortMaterial
            ref={materialRef}
            color="#114C5A"
            distort={0.4}
            speed={4}
            roughness={0.12}
            metalness={0.9}
            wireframe={true}
          />
        </TorusKnot>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.2, 64, 64]} position={[6, 3, -12]} ref={sphereRef1}>
          <MeshDistortMaterial ref={mat1Ref} color="#FFC801" distort={0.3} speed={3} roughness={0.1} metalness={0.9} emissive="#FF9932" emissiveIntensity={0.6} />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[1.5, 64, 64]} position={[-7, -4, -15]} ref={sphereRef2}>
          <MeshDistortMaterial ref={mat2Ref} color="#D9E8E2" distort={0.4} speed={2} roughness={0.3} metalness={0.8} emissive="#114C5A" emissiveIntensity={0.5} />
        </Sphere>
      </Float>
    </>
  );
}

function Scene() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const targetCamX = state.pointer.x * 4;
    const targetCamY = state.pointer.y * 4;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.03);
    state.camera.lookAt(0, 0, 0);

    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, state.pointer.x * 15, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, state.pointer.y * 15, 0.1);

      const hue = ((state.pointer.x + 1) / 2 + (state.pointer.y + 1) / 2) * 0.5;
      const targetColor = new THREE.Color().setHSL((0.1 + hue) % 1, 0.9, 0.6);
      lightRef.current.color.lerp(targetColor, 0.1);
    }
  });

  return (
    <>
      <fog attach="fog" args={["#0e1d25", 18, 54]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#FFC801" />
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#114C5A" />
      <pointLight ref={lightRef} position={[0, 0, 5]} intensity={8} distance={30} color="#FF9932" />

      <Stars radius={50} depth={50} count={5000} factor={6} saturation={1} fade speed={2} />
      <BackgroundParticles />
      <LiquidInteractiveShapes />
    </>
  );
}

export function HeroSection() {
  const highlights = [
    { label: "10M+", value: "Records processed" },
    { label: "99.9%", value: "Uptime SLA" },
    { label: "3×", value: "Faster deployment" },
  ];

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-24 layout-reflow">
      <div className="absolute inset-0 z-0 bg-[#0e1d25]">
        <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
          <Scene />
        </Canvas>
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#0e1d25]/55 to-[#0e1d25]" />
      </div>

      <div className="relative z-20 mx-auto mt-10 flex w-full max-w-7xl flex-col items-center text-center gap-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFC801]/30 bg-[#172B36]/80 px-5 py-2 font-mono text-sm tracking-[0.2em] text-[#FFC801] shadow-[0_0_15px_rgba(255,200,1,0.2)] backdrop-blur-md">
          <ArrowTrendingUpIcon className="h-4 w-4" />
          NEXT-GEN AI PLATFORM
        </div>

        <h1 className="text-5xl font-mono font-bold leading-[0.95] tracking-[-0.04em] text-[#F1F6F4] drop-shadow-2xl sm:text-6xl md:text-8xl lg:text-9xl">
          Automate your data.
          <br />
          <span className="bg-gradient-to-r from-[#FF9932] via-[#FFC801] to-[#F1F6F4] bg-clip-text text-transparent">
            Accelerate everything.
          </span>
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-[#D9E8E2] sm:text-xl md:text-2xl">
          NexusFlow transforms raw data into actionable intelligence with AI-driven pipelines, real-time sync, and enterprise-grade automation for teams that move fast.
        </p>

        <div className="mt-4 flex w-full flex-wrap justify-center gap-4 sm:gap-6">
          <a
            href="#pricing"
            className="group flex items-center gap-3 rounded-2xl border border-[#FFC801]/50 bg-gradient-to-r from-[#FF9932] to-[#FFC801] px-8 py-4 text-lg font-bold text-[#172B36] shadow-[0_0_40px_rgba(255,200,1,0.45)] micro-interaction hover:-translate-y-0.5 hover:scale-[1.02] sm:px-10 sm:py-5 sm:text-xl"
          >
            Start Free Trial
            <ChevronRightIcon className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#features"
            className="group flex items-center gap-3 rounded-2xl border border-[#D9E8E2]/30 bg-[#172B36]/55 px-8 py-4 text-lg font-semibold text-[#F1F6F4] backdrop-blur-md micro-interaction hover:-translate-y-0.5 hover:border-[#D9E8E2]/60 hover:bg-[#172B36]/80 sm:px-10 sm:py-5 sm:text-xl"
          >
            <SearchIcon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
            Explore Features
          </a>
        </div>

        <div className="mt-10 grid w-full max-w-5xl gap-4 rounded-[2rem] border border-white/10 bg-[#0e1d25]/75 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.25)] glass-card lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC801]/20 bg-[#FFC801]/10 px-3 py-1 text-sm font-semibold text-[#FFC801]">
              <Cube16SolidIcon className="h-4 w-4" />
              Live orchestration
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#F1F6F4] sm:text-3xl">
              Keep every signal, workflow, and decision visible in one place.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-[#D9E8E2]/80 sm:text-lg">
              From anomaly detection to downstream approvals, NexusFlow gives operators polished control without sacrificing speed.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D9E8E2]/15 bg-white/5 px-3 py-2 text-sm text-[#D9E8E2]">
                <LinkSolidIcon className="h-4 w-4 text-[#FF9932]" />
                200+ connectors
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D9E8E2]/15 bg-white/5 px-3 py-2 text-sm text-[#D9E8E2]">
                <ArrowPathIcon className="h-4 w-4 text-[#FFC801]" />
                Sync in seconds
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Smart routing", copy: "Context-aware automation", icon: <ChevronUpSolidIcon className="h-5 w-5" /> },
              { title: "Instant insight", copy: "Live performance telemetry", icon: <ChevronDownIcon className="h-5 w-5" /> },
              { title: "Secure by design", copy: "Audit-ready controls", icon: <LinkSolidIcon className="h-5 w-5" /> },
              { title: "Always on", copy: "Elastic reliability", icon: <ArrowPathIcon className="h-5 w-5" /> },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#172B36]/70 p-4 text-left shadow-inner">
                <div className="mb-3 inline-flex rounded-xl bg-[#FFC801]/12 p-2 text-[#FFC801]">{item.icon}</div>
                <p className="font-semibold text-[#F1F6F4]">{item.title}</p>
                <p className="mt-1 text-sm text-[#D9E8E2]/70">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-8 border-t border-[#D9E8E2]/10 pt-12 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="flex flex-col items-center rounded-2xl border border-white/5 bg-white/5 px-6 py-4 backdrop-blur-sm">
              <span className="mb-2 text-4xl font-mono font-bold text-[#FFC801] drop-shadow-lg md:text-5xl">{item.label}</span>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D9E8E2]/80">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
