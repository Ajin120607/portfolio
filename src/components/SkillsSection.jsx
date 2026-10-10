import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
  CheckCircle2,
  Hand
} from 'lucide-react';
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
  const { size, camera } = useThree();
  const isMobile = size.width < 640;

  // Adjust camera distance dynamically for mobile portrait vs desktop
  useEffect(() => {
    camera.position.set(0, 0, isMobile ? 9.5 : 8.2);
    camera.updateProjectionMatrix();
  }, [isMobile, camera]);

  // Compute Fibonacci sphere positions for all 29 skills (scaled for mobile screens)
  const nodes = useMemo(() => {
    const count = all29Skills.length;
    const radius = isMobile ? 2.55 : 3.5;

    return all29Skills.map((skill, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      return {
        ...skill,
        position: [x, y, z]
      };
    });
  }, [isMobile]);

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
          <icosahedronGeometry args={[isMobile ? 0.7 : 0.95, 1]} />
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
          <sphereGeometry args={[isMobile ? 0.32 : 0.45, 24, 24]} />
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
              lineWidth={isSelected ? 1.8 : 0.6}
              transparent
              opacity={isDimmed ? 0.04 : isSelected ? 0.75 : 0.18}
            />

            {/* 3D Node Sphere */}
            <mesh onClick={() => onSelectSkill(node)}>
              <sphereGeometry args={[isSelected ? 0.13 : 0.08, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isDimmed ? 0.2 : 1}
              />
            </mesh>

            {/* Interactive Floating 3D HTML Pill (Responsive size for mobile & desktop) */}
            <Html distanceFactor={isMobile ? 10.5 : 9.5} center zIndexRange={[10, 0]}>
              <button
                onClick={() => onSelectSkill(node)}
                onMouseEnter={() => onSelectSkill(node)}
                style={{
                  borderColor: isSelected ? node.color : 'rgba(255,255,255,0.18)',
                  boxShadow: isSelected ? `0 0 16px ${node.color}` : 'none',
                  opacity: isDimmed ? 0.22 : 1
                }}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-mono text-[9px] sm:text-[11px] whitespace-nowrap transition-all duration-200 backdrop-blur-md border ${
                  isSelected
                    ? 'bg-[#020205] text-white font-bold scale-110'
                    : 'bg-[#070812]/85 text-slate-200 hover:scale-105'
                }`}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mr-1"
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
  const [mobileTouchOrbit, setMobileTouchOrbit] = useState(true);

  return (
    <section
      id="skills-core"
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-10 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Interactive View Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
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
              clusters. Tap or hover any skill node to inspect its domain
              telemetry, or switch into the interactive 3D Orbital Constellation.
            </p>
          </div>

          {/* Interactive Toggle: Cybernetic Bento Matrix vs 3D Orbital Node View */}
          <div className="inline-flex w-full sm:w-auto items-center p-1.5 rounded-2xl cyber-glass-strong border border-[#00F5FF]/30">
            <button
              onClick={() => setViewMode('bento')}
              className={`flex-1 sm:flex-initial justify-center px-3.5 sm:px-4 py-2.5 rounded-xl font-mono text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all ${
                viewMode === 'bento'
                  ? 'bg-gradient-to-r from-[#00F5FF] to-[#00FF9D] text-[#020205] font-bold shadow-[0_0_20px_rgba(0,245,255,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Bento Matrix</span>
            </button>
            <button
              onClick={() => setViewMode('orbital')}
              className={`flex-1 sm:flex-initial justify-center px-3.5 sm:px-4 py-2.5 rounded-xl font-mono text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all ${
                viewMode === 'orbital'
                  ? 'bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] text-white font-bold shadow-[0_0_20px_rgba(138,43,226,0.5)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Orbit className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>3D Orbital View</span>
            </button>
          </div>
        </div>

        {/* Live Telemetry Inspector Bar */}
        <div className="mb-8 cyber-glass-strong rounded-2xl p-4 sm:p-5 border border-[#00F5FF]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_0_35px_rgba(0,245,255,0.08)]">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: `${activeSkill.color}18`,
                borderColor: activeSkill.color,
                boxShadow: `0 0 20px ${activeSkill.color}40`
              }}
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: activeSkill.color }} />
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
                  {activeSkill.clusterCode} // {activeSkill.clusterShortName || activeSkill.clusterName}
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-2xl font-bold text-white mt-0.5">
                {activeSkill.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Domain:{' '}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-6"
            >
              {skillClusters.map((cluster, idx) => {
                const Icon = CLUSTER_ICONS[cluster.id] || Cpu;
                const colSpan =
                  idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2';

                return (
                  <SpotlightCard
                    key={cluster.id}
                    tilt={true}
                    maxTilt={4}
                    className={`${colSpan} p-5 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-[#00F5FF]/40`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-md border"
                          style={{
                            color: cluster.accent,
                            borderColor: `${cluster.accent}50`,
                            backgroundColor: `${cluster.accent}15`
                          }}
                        >
                          {cluster.code} // {cluster.skills.length} SKILLS
                        </span>
                        <span className="font-mono text-[10px] sm:text-[11px] text-slate-400">
                          {cluster.metric}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="p-2.5 rounded-xl border shrink-0"
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
                        <h3 className="font-display text-lg sm:text-2xl font-bold text-white">
                          {cluster.name}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
                        {cluster.description}
                      </p>

                      {/* Interactive Skill Pills */}
                      <div className="flex flex-wrap gap-2">
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
                              className="group px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border text-left transition-all duration-200 hover:scale-[1.03] flex items-center gap-1.5"
                            >
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: cluster.accent }}
                              />
                              <span className="font-sans text-xs sm:text-sm font-medium text-slate-100">
                                {skill.name}
                              </span>
                              <span
                                className="font-mono text-[10px] opacity-75 ml-0.5"
                                style={{ color: cluster.accent }}
                              >
                                {skill.level}%
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2
                          className="w-3.5 h-3.5"
                          style={{ color: cluster.accent }}
                        />
                        VERIFIED CLUSTER
                      </span>
                      <span style={{ color: cluster.accent }}>
                        TAP / HOVER NODE
                      </span>
                    </div>
                  </SpotlightCard>
                );
              })}
            </motion.div>
          ) : (
            /* ==================== VIEW MODE 2: MOBILE & DESKTOP 3D ORBITAL NODE VIEW ==================== */
            <motion.div
              key="orbital-view"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              className="cyber-glass-strong rounded-3xl border border-[#00F5FF]/30 overflow-hidden relative"
            >
              {/* Cluster Filter Bar inside 3D Viewport (Horizontally scrollable on mobile) */}
              <div className="p-3.5 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/40">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                  <button
                    onClick={() => setSelectedClusterId('ALL')}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[11px] whitespace-nowrap shrink-0 transition-all ${
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
                      className="px-3 py-1.5 rounded-lg font-mono text-[11px] border whitespace-nowrap shrink-0 transition-all"
                    >
                      {c.shortName}
                    </button>
                  ))}
                </div>

                {/* Mobile Touch Orbit Toggle */}
                <div className="flex items-center justify-between sm:justify-end gap-2">
                  <button
                    onClick={() => setMobileTouchOrbit(!mobileTouchOrbit)}
                    className={`sm:hidden px-2.5 py-1 rounded-lg font-mono text-[10px] border flex items-center gap-1.5 ${
                      mobileTouchOrbit
                        ? 'bg-[#00FF9D]/15 text-[#00FF9D] border-[#00FF9D]/40'
                        : 'bg-white/5 text-slate-400 border-white/10'
                    }`}
                  >
                    <Hand className="w-3 h-3" />
                    <span>{mobileTouchOrbit ? '3D Touch Spin: ON' : 'Page Scroll Mode'}</span>
                  </button>
                  <span className="font-mono text-[10px] sm:text-xs text-[#00FF9D]">
                    TAP OR DRAG 3D SPHERE
                  </span>
                </div>
              </div>

              {/* Interactive Three.js 3D Skill Constellation Canvas */}
              <div
                className="h-[420px] sm:h-[580px] w-full relative"
                style={{ touchAction: mobileTouchOrbit ? 'none' : 'pan-y' }}
              >
                <Canvas
                  camera={{ position: [0, 0, 8.2], fov: 50 }}
                  dpr={[1, 1.5]}
                >
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
                    enableZoom={false}
                    enableRotate={mobileTouchOrbit}
                    autoRotate
                    autoRotateSpeed={0.6}
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
