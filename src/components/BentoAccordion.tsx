"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Box, Torus, Octahedron, Icosahedron, Cylinder, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";
import { ChartPieIcon, ArrowPathIcon, LinkSolidIcon, Cog8ToothIcon, SearchIcon, LinkIcon, ChevronDownIcon } from "./icons";

const features = [
  { id: 0, title: "Real-Time Analytics", description: "Live dashboards with sub-second query latency. Monitor pipeline health, throughput, and anomaly detection from a unified control plane.", icon: <ChartPieIcon className="h-10 w-10" /> },
  { id: 1, title: "Auto-Sync Pipelines", description: "Bi-directional data sync with conflict resolution and incremental updates across 200+ connectors.", icon: <ArrowPathIcon className="h-10 w-10" /> },
  { id: 2, title: "Native Integrations", description: "One-click connections to Snowflake, BigQuery, Postgres, and REST APIs with schema-aware mapping.", icon: <LinkSolidIcon className="h-10 w-10" /> },
  { id: 3, title: "Workflow Orchestration", description: "Visual DAG builder with conditional branching, retry policies, and version-controlled deployment pipelines for production-grade automation.", icon: <Cog8ToothIcon className="h-10 w-10" /> },
  { id: 4, title: "Smart Discovery", description: "AI-powered schema inference and data cataloging that surfaces lineage and quality scores automatically.", icon: <SearchIcon className="h-10 w-10" /> },
  { id: 5, title: "Webhook Engine", description: "Event-driven triggers with signed payloads, rate limiting, and dead-letter queues for reliable delivery.", icon: <LinkIcon className="h-10 w-10" /> },
];

function FeaturesBackground() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 1;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#F1F6F4", 30, 100]} />
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight position={[10, 20, 10]} intensity={3} color="#FFC801" />
      <directionalLight position={[-10, 0, -10]} intensity={2} color="#114C5A" />

      <group ref={groupRef} position={[0, -5, -30]}>
        <Torus args={[20, 0.5, 64, 128]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshPhysicalMaterial color="#114C5A" metalness={0.9} roughness={0.1} clearcoat={1} ior={1.5} />
        </Torus>
        <Torus args={[25, 0.2, 64, 128]} rotation={[Math.PI / 2.2, 0.2, 0]}>
          <meshStandardMaterial color="#FFC801" metalness={1} roughness={0.2} emissive="#FF9932" emissiveIntensity={0.3} />
        </Torus>
        <Torus args={[35, 0.05, 64, 128]} rotation={[Math.PI / 3, -0.2, 0]}>
          <meshStandardMaterial color="#172B36" metalness={0.8} roughness={0.5} />
        </Torus>
      </group>

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

function FeatureModel({ type, isHovered }: { type: number; isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isHovered ? 3 : 0.5);
      meshRef.current.rotation.x += delta * (isHovered ? 1.5 : 0.2);
    }
    if (groupRef.current) {
      const targetScale = isHovered ? 1.3 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const getGeometry = () => {
    switch (type) {
      case 0:
        return (
          <Box args={[1.5, 1.5, 1.5]} ref={meshRef}>
            <meshStandardMaterial color="#FFC801" metalness={0.5} roughness={0.1} emissive="#FFC801" emissiveIntensity={isHovered ? 0.4 : 0.1} />
          </Box>
        );
      case 1:
        return (
          <Torus args={[1, 0.4, 32, 64]} ref={meshRef}>
            <meshStandardMaterial color="#FF9932" metalness={0.8} roughness={0.1} emissive="#FF9932" emissiveIntensity={isHovered ? 0.4 : 0.1} />
          </Torus>
        );
      case 2:
        return (
          <Icosahedron args={[1.2, 0]} ref={meshRef}>
            <meshStandardMaterial color="#114C5A" metalness={0.9} roughness={0.1} emissive="#114C5A" emissiveIntensity={isHovered ? 0.6 : 0.2} />
          </Icosahedron>
        );
      case 3:
        return (
          <Cylinder args={[1, 1, 1.5, 32]} ref={meshRef}>
            <meshStandardMaterial color="#0e1d25" metalness={0.9} roughness={0.1} emissive="#0e1d25" emissiveIntensity={isHovered ? 0.8 : 0.2} />
          </Cylinder>
        );
      case 4:
        return (
          <Octahedron args={[1.2, 0]} ref={meshRef}>
            <meshStandardMaterial color="#D9E8E2" metalness={0.8} roughness={0.2} emissive="#D9E8E2" emissiveIntensity={isHovered ? 0.8 : 0.2} />
          </Octahedron>
        );
      case 5:
        return (
          <Sphere args={[1.2, 32, 32]} ref={meshRef}>
            <meshStandardMaterial color="#FF9932" metalness={0.6} roughness={0.2} emissive="#FF9932" emissiveIntensity={isHovered ? 0.5 : 0.1} />
          </Sphere>
        );
      default:
        return <Box args={[1, 1, 1]} ref={meshRef} />;
    }
  };

  return (
    <group ref={groupRef}>
      <Float speed={isHovered ? 4 : 2} rotationIntensity={isHovered ? 2 : 1} floatIntensity={isHovered ? 2 : 1}>
        {getGeometry()}
      </Float>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={3} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={2} color="#FFC801" />
    </group>
  );
}

function TiltCard({ children, isActive, onMouseEnter, onMouseLeave, onFocus, onBlur, className }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    onMouseLeave();
  };

  return (
    <div
      ref={cardRef}
      className={`relative h-full w-full overflow-hidden rounded-[2rem] border border-[#0e1d25]/10 transition-all duration-[180ms] ease-out ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
      style={{
        transform: `perspective(1200px) rotateX(${isActive ? rotation.x : 0}deg) rotateY(${isActive ? rotation.y : 0}deg) scale(${isActive ? 1.02 : 1})`,
        zIndex: isActive ? 10 : 1,
        background: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "blur(24px)",
        boxShadow: isActive ? "0 32px 80px rgba(17,76,90,0.16)" : "0 12px 40px rgba(17,76,90,0.08)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isActive ? 1 : 0,
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 200, 1, 0.16), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[2rem] transition-opacity duration-300"
        style={{
          opacity: isActive ? 1 : 0,
          padding: "2px",
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 153, 50, 0.64), transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {children}
    </div>
  );
}

export function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const activeIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile((prev) => {
        if (prev !== mobile) {
          setActiveIndex(activeIndexRef.current);
          return mobile;
        }
        return prev;
      });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const handleInteract = (index: number | null) => {
    setActiveIndex(index);
  };

  if (isMobile === null) {
    return <section id="features" className="mx-auto min-h-[600px] w-full max-w-7xl px-6 py-32 layout-reflow" />;
  }

  return (
    <section id="features" className="relative z-20 -mt-10 w-full overflow-hidden rounded-[3rem] bg-[#F1F6F4] px-6 py-32 text-[#172B36] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] layout-reflow">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
          <FeaturesBackground />
        </Canvas>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#F1F6F4] via-transparent to-[#F1F6F4]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm font-mono font-bold uppercase tracking-[0.3em] text-[#FF9932]">Core Capabilities</p>
          <h2 className="mb-6 text-4xl font-mono font-bold text-[#172B36] md:text-6xl">Built for technical teams</h2>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[#114C5A]/80">
            Every module is engineered for speed, observability, and seamless integration across your stack.
          </p>
        </div>

        <div className="w-full layout-reflow">
          {isMobile ? (
            <div className="flex w-full flex-col gap-4">
              {features.map((f, i) => (
                <article
                  key={f.id}
                  className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${activeIndex === i ? "border-[#FFC801]" : "border-[#114C5A]/20"}`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white p-6 text-left micro-interaction hover:bg-[#D9E8E2]/35"
                    onClick={() => handleInteract(activeIndex === i ? null : i)}
                    aria-expanded={activeIndex === i}
                  >
                    <div className="flex items-center gap-4 text-[#114C5A]">
                      <div className="text-[#FF9932]">{f.icon}</div>
                      <span className="text-left font-mono text-xl font-bold">{f.title}</span>
                    </div>
                    <ChevronDownIcon className={`h-6 w-6 flex-shrink-0 text-[#114C5A] transition-transform duration-[350ms] ease-in-out ${activeIndex === i ? "rotate-180 text-[#FFC801]" : ""}`} />
                  </button>
                  <div className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-[350ms] ease-in-out ${activeIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pt-0 text-lg leading-relaxed text-[#172B36]/70">{f.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid w-full auto-rows-[280px] grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((f, i) => (
                <div key={f.id} className={`h-full w-full ${i === 0 ? "md:col-span-2" : ""} ${i === 3 ? "md:col-span-2" : ""}`}>
                  <TiltCard
                    isActive={activeIndex === i}
                    onMouseEnter={() => handleInteract(i)}
                    onMouseLeave={() => handleInteract(null)}
                    onFocus={() => handleInteract(i)}
                    onBlur={() => handleInteract(null)}
                    className={i === 0 || i === 3 ? "bg-gradient-to-br from-white to-[#D9E8E2]/40" : "bg-white"}
                  >
                    <div className={`pointer-events-none absolute right-[-20px] top-[-20px] z-0 h-[200px] w-[200px] transition-opacity duration-500 ${activeIndex === i ? "opacity-100" : "opacity-60"}`}>
                      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                        <FeatureModel type={i} isHovered={activeIndex === i} />
                      </Canvas>
                    </div>

                    <div className="relative z-10 flex h-full flex-col p-8 md:p-10">
                      <div className={`transition-colors duration-300 ${activeIndex === i ? "text-[#FF9932]" : "text-[#114C5A]"}`}>{f.icon}</div>
                      <div className="mt-auto">
                        <h3 className="mb-3 font-mono text-2xl font-bold text-[#114C5A] md:text-3xl">{f.title}</h3>
                        <p className="max-w-md text-base leading-relaxed text-[#172B36]/80 md:text-lg">{f.description}</p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
