import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Float, Line } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Orbit,
  LayoutGrid,
  Sparkles,
  Database,
  Code2,
  BarChart3,
  Award,
  Zap,
  CheckCircle2
} from 'lucide-react';
import * as THREE from 'three';
import SpotlightCard from './SpotlightCard';
import { skillClusters, all29Skills } from '../data/certificatesData';

const CLUSTER_ICONS = {
  'cluster-01': Sparkles,
  'cluster-02': BarChart3,
  'cluster-03': Code2,
  'cluster-04': Database,
  'cluster-05': Award
};

function OrbitalSkillConstellation({ activeSkill, onSelectSkill, selectedClusterId }) {
  const groupRef = useRef();

  // Compute Fibonacci sphere positions for all 29 skills
  const nodes = useMemo(() => {
    const count = all29Skills.length;
    return all29Skills.map((skill, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 3.5;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      return {
        ...skill,
        position: [x, y, z]
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.14;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Quantum Core */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial
            color="#00F5FF"
            emissive="#00F5FF"
            emissiveIntensity={0.6}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.45, 24, 24]} />
          <meshBasicMaterial color="#8A2BE2" transparent opacity={0.45} />
        </mesh>
      </Float>

      {/* 29 Interactive 3D Skill Nodes & Neural Synapse Lines */}
      {nodes.map((node) => {
        const isSelected = activeSkill?.name === node.name;
        const isDimmed =
          selectedClusterId !== 'ALL' && node.clusterId !== selectedClusterId;

        return (
          <group key={node.id} position={node.position}>
            {/* Synapse Line to Core */}
            <Line
              points={[
                [0, 0, 0],
                [-node.position[0], -node.position[1], -node.position[2]]
              ]}
              color={node.color}
              lineWidth={isSelected ? 2 : 0.7}
              transparent
              opacity={isDimmed ? 0.05 : isSelected ? 0.75 : 0.2}
            />

            {/* 3D Node Sphere */}
            <mesh onClick={() => onSelectSkill(node)}>
              <sphereGeometry args={[isSelected ? 0.14 : 0.09, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isDimmed ? 0.2 : 1}
              />
            </mesh>

            {/* Interactive Floating 3D HTML Pill */}
            <Html distanceFactor={9.5} center zIndexRange={[10, 0]}>
              <button
                onClick={() => onSelectSkill(node)}
                onMouseEnter={() => onSelectSkill(node)}
                style={{
                  borderColor: isSelected ? node.color : 'rgba(255,255,255,0.18)',
                  boxShadow: isSelected ? `0 0 20px ${node.color}` : 'none',
                  opacity: isDimmed ? 0.25 : 1
                }}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] whitespace-nowrap transition-all duration-200 backdrop-blur-md border ${
                  isSelected
                    ? 'bg-[#020205] text-white font-bold scale-110'
                    : 'bg-[#070812]/85 text-slate-200 hover:scale-105'
                }`}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                  style={{ backgroundColor: node.color }}
                />
                {node.name}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function SkillsSection() {
  const [viewMode, setViewMode] = useState('bento'); // 'bento' | 'orbital'
  const [activeSkill, setActiveSkill] = useState(all29Skills[0]);
  const [selectedClusterId, setSelectedClusterId] = useState('ALL');

  return (
    <section
      id="skills-core"
      className="relative py-24 px-4 sm:px-6 lg:px-10 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Interactive View Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/30 font-mono text-xs text-[#00F5FF] mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>PHASE 02 // 29-POINT SKILL CONSTELLATION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              NEURAL SKILL <span className="text-holo">ARCHITECTURE</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
              All 29 verified engineering competencies mapped across 5 specialized
              clusters. Hover or select any skill node to inspect its domain
              telemetry, or switch into the interactive 3D Orbital Constellation.
            </p>
          </div>

          {/* Interactive Toggle: Cybernetic Bento Matrix vs 3D Orbital Node View */}
          <div className="inline-flex items-center p-1.5 rounded-2xl cyber-glass-strong border border-[#00F5FF]/30 self-start lg:self-auto">
            <button
              onClick={() => setViewMode('bento')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                viewMode === 'bento'
                  ? 'bg-gradient-to-r from-[#00F5FF] to-[#00FF9D] text-[#020205] font-bold shadow-[0_0_20px_rgba(0,245,255,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Cybernetic Bento Matrix</span>
            </button>
            <button
              onClick={() => setViewMode('orbital')}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                viewMode === 'orbital'
                  ? 'bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] text-white font-bold shadow-[0_0_20px_rgba(138,43,226,0.5)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Orbit className="w-4 h-4" />
              <span>3D Orbital Node View</span>
            </button>
          </div>
        </div>

        {/* Live Telemetry Inspector Bar (Reacts to hovered/clicked skill across both views) */}
        <div className="mb-8 cyber-glass-strong rounded-2xl p-4 sm:p-5 border border-[#00F5FF]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_0_35px_rgba(0,245,255,0.08)]">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: `${activeSkill.color}18`,
                borderColor: activeSkill.color,
                boxShadow: `0 0 20px ${activeSkill.color}40`
              }}
            >
              <Zap className="w-6 h-6" style={{ color: activeSkill.color }} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="font-mono text-[10px] uppercase px-2 py-0.5 rounded font-semibold"
                  style={{
                    backgroundColor: `${activeSkill.color}20`,
                    color: activeSkill.color
                  }}
                >
                  {activeSkill.clusterCode} // {activeSkill.clusterName}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  SYNAPSE_ACTIVE
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                {activeSkill.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Domain Application:{' '}
                <span className="text-[#00F5FF] font-mono">
                  {activeSkill.domain}
                </span>
              </p>
            </div>
          </div>

          <div className="w-full md:w-64 shrink-0 space-y-1.5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">NEURAL PROFICIENCY</span>
              <span
                className="font-bold text-sm"
                style={{ color: activeSkill.color }}
              >
                {activeSkill.level}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${activeSkill.level}%`,
                  backgroundColor: activeSkill.color,
                  boxShadow: `0 0 12px ${activeSkill.color}`
                }}
              />
            </div>
          </div>
        </div>

        {/* ==================== VIEW MODE 1: CYBERNETIC BENTO MATRIX VIEW ==================== */}
        <AnimatePresence mode="wait">
          {viewMode === 'bento' ? (
            <motion.div
              key="bento-matrix"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
            >
              {skillClusters.map((cluster, idx) => {
                const Icon = CLUSTER_ICONS[cluster.id] || Cpu;
                // First 2 clusters span 3 columns on lg; last 3 span 2 columns on lg
                const colSpan =
                  idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';

                return (
                  <SpotlightCard
                    key={cluster.id}
                    tilt={true}
                    maxTilt={4}
                    className={`${colSpan} p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-[#00F5FF]/40`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className="font-mono text-xs font-bold px-2.5 py-1 rounded-md border"
                          style={{
                            color: cluster.accent,
                            borderColor: `${cluster.accent}50`,
                            backgroundColor: `${cluster.accent}15`
                          }}
                        >
                          {cluster.code} // {cluster.skills.length} SKILLS
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">
                          {cluster.metric}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="p-2.5 rounded-xl border"
                          style={{
                            borderColor: `${cluster.accent}40`,
                            backgroundColor: `${cluster.accent}12`
                          }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: cluster.accent }}
                          />
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                          {cluster.name}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                        {cluster.description}
                      </p>

                      {/* Interactive Skill Pills */}
                      <div className="flex flex-wrap gap-2.5">
                        {cluster.skills.map((skill) => {
                          const fullSkill = all29Skills.find(
                            (s) => s.name === skill.name
                          );
                          const isSelected = activeSkill?.name === skill.name;

                          return (
                            <button
                              key={skill.name}
                              onMouseEnter={() =>
                                fullSkill && setActiveSkill(fullSkill)
                              }
                              onClick={() =>
                                fullSkill && setActiveSkill(fullSkill)
                              }
                              style={{
                                borderColor: isSelected
                                  ? cluster.accent
                                  : 'rgba(255,255,255,0.12)',
                                backgroundColor: isSelected
                                  ? `${cluster.accent}25`
                                  : 'rgba(255,255,255,0.03)',
                                boxShadow: isSelected
                                  ? `0 0 18px ${cluster.accent}55`
                                  : 'none'
                              }}
                              className="group px-3.5 py-2 rounded-xl border text-left transition-all duration-200 hover:scale-[1.03] flex items-center gap-2"
                            >
                              <span
                                className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                                style={{ backgroundColor: cluster.accent }}
                              />
                              <span className="font-sans text-xs sm:text-sm font-medium text-slate-100">
                                {skill.name}
                              </span>
                              <span
                                className="font-mono text-[10px] opacity-75 ml-1"
                                style={{ color: cluster.accent }}
                              >
                                {skill.level}%
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer Telemetry */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2
                          className="w-3.5 h-3.5"
                          style={{ color: cluster.accent }}
                        />
                        VERIFIED DOMAIN CLUSTER
                      </span>
                      <span style={{ color: cluster.accent }}>
                        HOVER NODE FOR TELEMETRY
                      </span>
                    </div>
                  </SpotlightCard>
                );
              })}
            </motion.div>
          ) : (
            /* ==================== VIEW MODE 2: 3D ORBITAL NODE VIEW ==================== */
            <motion.div
              key="orbital-view"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="cyber-glass-strong rounded-3xl border border-[#00F5FF]/30 overflow-hidden relative"
            >
              {/* Cluster Filter Bar inside 3D Viewport */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-black/40">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedClusterId('ALL')}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                      selectedClusterId === 'ALL'
                        ? 'bg-[#00F5FF] text-[#020205] font-bold'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    ALL 29 SKILLS
                  </button>
                  {skillClusters.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedClusterId(c.id)}
                      style={{
                        borderColor:
                          selectedClusterId === c.id
                            ? c.accent
                            : 'rgba(255,255,255,0.1)',
                        backgroundColor:
                          selectedClusterId === c.id
                            ? `${c.accent}25`
                            : 'rgba(255,255,255,0.03)',
                        color: selectedClusterId === c.id ? c.accent : '#cbd5e1'
                      }}
                      className="px-3 py-1.5 rounded-lg font-mono text-xs border transition-all"
                    >
                      {c.code}: {c.shortName}
                    </button>
                  ))}
                </div>
                <span className="font-mono text-xs text-[#00FF9D]">
                  DRAG TO ORBIT 3D SPHERE • SCROLL TO ZOOM
                </span>
              </div>

              {/* Interactive Three.js 3D Skill Constellation Canvas */}
              <div className="h-[540px] sm:h-[620px] w-full relative cursor-grab active:cursor-grabbing">
                <Canvas camera={{ position: [0, 0, 8.2], fov: 50 }}>
                  <ambientLight intensity={0.8} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F5FF" />
                  <pointLight position={[-10, -10, -10]} intensity={1.2} color="#8A2BE2" />
                  <OrbitalSkillConstellation
                    activeSkill={activeSkill}
                    onSelectSkill={setActiveSkill}
                    selectedClusterId={selectedClusterId}
                  />
                  <OrbitControls
                    enablePan={false}
                    minDistance={5}
                    maxDistance={12}
                    autoRotate
                    autoRotateSpeed={0.5}
                  />
                </Canvas>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
