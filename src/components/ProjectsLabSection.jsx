import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FlaskConical,
  GitBranch,
  Github,
  ArrowUpRight,
  Radio,
  Code2,
  Cpu,
  CheckCircle2,
  Terminal,
  PlusCircle,
  Layers
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { projectsData } from '../data/projectsData';
import { ownerProfile } from '../data/certificatesData';

export default function ProjectsLabSection() {
  const [showExpansionGuide, setShowExpansionGuide] = useState(false);

  return (
    <section
      id="rnd-projects"
      className="relative py-24 px-4 sm:px-6 lg:px-10 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF9D]/10 border border-[#00FF9D]/30 font-mono text-xs text-[#00FF9D] mb-3">
              <FlaskConical className="w-3.5 h-3.5 animate-pulse" />
              <span>PHASE 03 // ACTIVE ENGINEERING & R&D LAB</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              ONGOING PROJECTS &{' '}
              <span className="text-holo">R&D BLUEPRINTS</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
              Classified engineering initiatives currently in active R&D and
              training. Connected to{' '}
              <a
                href={ownerProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00F5FF] underline decoration-[#00F5FF]/40 hover:text-[#00FF9D]"
              >
                github.com/Ajin120607
              </a>{' '}
              for continuous deployment as new builds drop.
            </p>
          </div>

          {/* Live GitHub Telemetry & Expansion Guide Trigger */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowExpansionGuide(!showExpansionGuide)}
              className="px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 text-[#00F5FF] border border-[#00F5FF]/30 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>
                {showExpansionGuide
                  ? 'Hide Expansion Schema'
                  : 'Extensible R&D Schema'}
              </span>
            </button>

            <a
              href={ownerProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider bg-[#00FF9D]/15 hover:bg-[#00FF9D]/25 text-[#00FF9D] border border-[#00FF9D]/40 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,157,0.15)]"
            >
              <Github className="w-4 h-4" />
              <span>Track Live Commits (@Ajin120607)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Optional Developer Drawer showing how easily Ajin can add future projects */}
        {showExpansionGuide && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 cyber-glass-strong rounded-2xl p-5 border border-[#00F5FF]/40 font-mono text-xs"
          >
            <div className="flex items-center justify-between text-[#00F5FF] mb-2">
              <span className="flex items-center gap-2 font-bold">
                <Terminal className="w-4 h-4" />
                MODULAR R&D EXPANSION ARCHITECTURE // src/data/projectsData.js
              </span>
              <span className="text-[#00FF9D]">PLUG & PLAY READY</span>
            </div>
            <p className="text-slate-300 mb-3 font-sans text-sm">
              This R&D Lab is engineered for effortless expansion. As ongoing
              projects reach production or new breakthroughs start, simply add
              an entry to <code className="text-[#00F5FF]">src/data/projectsData.js</code>{' '}
              and the 3D blueprint grid automatically renders the new card,
              progress pipeline, and GitHub telemetry.
            </p>
          </motion.div>
        )}

        {/* 2x2 Blueprint Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {projectsData.map((project, index) => {
            const isSlotCard = project.isPlaceholder;

            return (
              <SpotlightCard
                key={project.id}
                tilt={true}
                maxTilt={4}
                className={`p-6 sm:p-8 flex flex-col justify-between blueprint-grid border ${
                  isSlotCard
                    ? 'border-dashed border-[#00FF9D]/45 bg-[#040814]/80'
                    : 'border-[#00F5FF]/25'
                }`}
              >
                <div>
                  {/* Top Blueprint Status Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10">
                    <span className="font-mono text-xs text-slate-400 tracking-wider">
                      {project.code}
                    </span>

                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] font-semibold border"
                      style={{
                        color: project.statusColor,
                        borderColor: `${project.statusColor}50`,
                        backgroundColor: `${project.statusColor}15`
                      }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                          style={{ backgroundColor: project.statusColor }}
                        />
                        <span
                          className="relative inline-flex rounded-full h-2 w-2"
                          style={{ backgroundColor: project.statusColor }}
                        />
                      </span>
                      <span>{project.status}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <div className="font-mono text-xs uppercase tracking-widest text-[#00F5FF] mb-1">
                      {project.category} // {project.statusPhase}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Special Radar Animation if it's the "Next Breakthrough Slot" */}
                  {isSlotCard && (
                    <div className="my-5 p-4 rounded-2xl bg-black/50 border border-[#00FF9D]/30 flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full border border-[#00FF9D]/50 flex items-center justify-center shrink-0">
                        <div className="absolute inset-1 rounded-full border border-dashed border-[#00F5FF]/50 animate-spin-slow" />
                        <Radio className="w-6 h-6 text-[#00FF9D] animate-pulse" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold text-[#00FF9D]">
                          LIVE GITHUB TELEMETRY SYNCHRONIZED
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Ready for next project deployment. Visitors can inspect
                          active commits and upcoming repositories directly on
                          GitHub.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Architecture Specifications */}
                  <div className="bg-black/45 rounded-xl p-4 border border-white/10 mb-5 space-y-2">
                    <div className="font-mono text-[11px] text-[#00F5FF] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>BLUEPRINT SPECIFICATIONS //</span>
                    </div>
                    {project.architectureSpecs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-300"
                      >
                        <span className="text-[#00FF9D] font-mono mt-0.5">
                          0{i + 1}.
                        </span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Animated R&D Progress Pipeline */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                      <span className="text-slate-400">
                        R&D PIPELINE PROGRESS
                      </span>
                      <span
                        className="font-bold"
                        style={{ color: project.accentColor }}
                      >
                        {project.progress}% // {project.eta}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${project.progress}%`,
                          background: `linear-gradient(90deg, ${project.accentColor}, ${project.statusColor})`,
                          boxShadow: `0 0 15px ${project.accentColor}`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Footer: Tech Stack Pills & GitHub Telemetry Link */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[11px] text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                      {project.metrics.slice(0, 2).map((m) => (
                        <div key={m.label}>
                          <div className="font-mono text-[10px] text-slate-400 uppercase">
                            {m.label}
                          </div>
                          <div className="font-mono text-xs text-white font-semibold">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-[#00F5FF] text-white hover:text-[#020205] border border-white/15 hover:border-[#00F5FF] transition-all flex items-center gap-1.5"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>GitHub Lab</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
