import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FlaskConical,
  ShieldCheck,
  Github,
  Linkedin,
  Mail,
  Phone,
  Terminal,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { ownerProfile } from '../data/certificatesData';

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const frameRef = useRef(null);

  // Dynamic Typewriter Effect cycling through Ajin's engineering roles
  useEffect(() => {
    const currentRole = ownerProfile.roles[roleIndex];
    const typeSpeed = isDeleting ? 35 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ownerProfile.roles.length);
      } else {
        setDisplayText(
          currentRole.substring(0, displayText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // 3D Holographic Profile Frame Tilt Handler
  const handleFrameMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTiltStyle({
      transform: `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`,
      transition: 'transform 0.15s ease-out'
    });
  };

  const handleFrameMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
    });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-24 px-4 sm:px-6 lg:px-10 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* ==================== LEFT COLUMN: KINETIC IDENTITY & TELEMETRY ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 xl:col-span-8 space-y-5 z-10"
        >
          {/* Top HUD Status Pill */}
          <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full cyber-glass border border-[#00F5FF]/25">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9D] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF9D]" />
            </span>
            <span className="font-mono text-xs text-[#00F5FF] tracking-widest uppercase">
              AJIN A // B.TECH ENGINEERING PORTFOLIO
            </span>
          </div>

          {/* Display Headline */}
          <div className="space-y-1.5">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-slate-400">
              AI • DEEP LEARNING • BIG DATA • BLOCKCHAIN ARCHITECT
            </p>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl xl:text-7xl tracking-tight leading-[0.95] uppercase">
              <span className="text-white inline-block mr-3">AJIN</span>
              <span className="text-holo inline-block">A.</span>
            </h1>
          </div>

          {/* Dynamic Typewriter Role Bar */}
          <div className="cyber-glass rounded-xl px-4 py-2.5 border-l-4 border-l-[#00F5FF] max-w-xl">
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 mb-0.5">
              <Terminal className="w-3.5 h-3.5 text-[#00F5FF]" />
              <span>SPECIALIZATION STREAM //</span>
            </div>
            <div className="font-display text-lg sm:text-xl md:text-2xl font-bold text-[#00FF9D] min-h-[32px] flex items-center">
              <span>{displayText}</span>
              <span className="w-2 h-5 bg-[#00F5FF] ml-1.5 inline-block animate-pulse" />
            </div>
          </div>

          {/* Verified Bio & Core Stack Summary */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            <strong className="text-white font-semibold">
              {ownerProfile.degreeTitle}
            </strong>
            . Building high-throughput neural networks in{' '}
            <span className="text-[#00F5FF] font-mono text-xs sm:text-sm">PyTorch</span>,
            GPU-accelerated parallel algorithms with{' '}
            <span className="text-[#00FF9D] font-mono text-xs sm:text-sm">NVIDIA CUDA</span>,
            enterprise database & cloud architectures on{' '}
            <span className="text-[#FF007F] font-mono text-xs sm:text-sm">
              AWS & Oracle OCI
            </span>
            , and decentralized{' '}
            <span className="text-[#8A2BE2] font-mono text-xs sm:text-sm">Blockchain</span>{' '}
            protocols.
          </p>

          {/* High-Contrast CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => scrollTo('rnd-projects')}
              className="group relative px-5 py-3 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-[#00F5FF] via-[#00D1FF] to-[#00FF9D] text-[#020205] shadow-[0_0_25px_rgba(0,245,255,0.35)] hover:shadow-[0_0_40px_rgba(0,255,157,0.6)] hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Explore R&D Lab</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo('aws-badges')}
              className="group px-5 py-3 rounded-xl font-display font-bold text-xs sm:text-sm uppercase tracking-wider cyber-glass-strong text-white border border-[#8A2BE2]/50 hover:border-[#00F5FF] hover:bg-[#8A2BE2]/15 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#00F5FF]" />
              <span>Verify Credentials</span>
            </button>

            <a
              href={ownerProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 text-slate-200 hover:text-[#00F5FF] border border-white/10 hover:border-[#00F5FF]/40 transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Direct Telemetry Strip */}
          <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            {ownerProfile.telemetryStats.map((stat) => (
              <div
                key={stat.code}
                className="cyber-glass rounded-xl p-3 border border-white/10 hover:border-[#00F5FF]/35 transition-colors"
              >
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  {stat.code}
                </div>
                <div className="font-display text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                  {stat.value}
                </div>
                <div className="text-[11px] text-[#00F5FF] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Direct Contact Mini-Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-400">
            <a
              href={`mailto:${ownerProfile.email}`}
              className="hover:text-[#00F5FF] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#00F5FF]" />
              <span>{ownerProfile.email}</span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href={`tel:${ownerProfile.phone.replace(/\s+/g, '')}`}
              className="hover:text-[#00FF9D] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#00FF9D]" />
              <span>{ownerProfile.phone}</span>
            </a>
            <span className="text-white/20">•</span>
            <a
              href={ownerProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00F5FF] transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#8A2BE2]" />
              <span>LinkedIn Verified ↗</span>
            </a>
          </div>
        </motion.div>

        {/* ==================== RIGHT COLUMN: COMPACT, BALANCED HOLOGRAPHIC PORTRAIT ==================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end relative z-10"
        >
          <div
            ref={frameRef}
            onMouseMove={handleFrameMouseMove}
            onMouseLeave={handleFrameMouseLeave}
            style={tiltStyle}
            className="relative w-full max-w-[285px] sm:max-w-[305px]"
          >
            {/* Soft Ambient Backlight */}
            <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-tr from-[#00F5FF]/20 via-[#8A2BE2]/15 to-[#00FF9D]/20 blur-xl pointer-events-none" />

            {/* Floating Telemetry Badge: Top Right */}
            <div className="absolute -top-3 right-3 z-30 cyber-glass-strong px-3 py-1 rounded-xl border border-[#00FF9D]/45 shadow-lg">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#00FF9D]" />
                <span className="font-mono text-[10px] font-bold text-[#00FF9D]">
                  3x AWS + 12x CERTIFIED
                </span>
              </div>
            </div>

            {/* Main Holographic Portrait Glass Frame (Reduced, Proportionate Ratio) */}
            <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-[#00F5FF]/50 via-white/10 to-[#8A2BE2]/50 shadow-2xl">
              <div className="relative rounded-[15px] overflow-hidden bg-[#070812]">
                {/* Top HUD Overlay inside Portrait */}
                <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[9px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
                  <span className="text-slate-200">ID // AJIN A</span>
                </div>

                {/* Ajin A's Local Profile Picture - Compact, Balanced Aspect Ratio */}
                <div className="w-full h-[290px] sm:h-[315px] bg-[#0a0c18] overflow-hidden">
                  <img
                    src={ownerProfile.profileImage}
                    alt="Ajin A - B.Tech Engineer"
                    className="w-full h-full object-cover object-top select-none"
                  />
                </div>

                {/* Bottom Identity & Telemetry Plate */}
                <div className="p-3.5 bg-[#070812]/95 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-mono text-[9px] text-[#00F5FF] uppercase tracking-widest">
                        B.TECH ENGINEER
                      </div>
                      <h2 className="font-display text-lg font-bold text-white leading-tight">
                        {ownerProfile.fullName}
                      </h2>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#00FF9D]/10 border border-[#00FF9D]/30 font-mono text-[9px] text-[#00FF9D] font-bold">
                      29 SKILLS
                    </span>
                  </div>

                  {/* Clean Pill Strip inside card footer */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10 font-mono text-[9px] text-center">
                    <div className="py-1 px-1.5 rounded bg-white/5 text-[#00F5FF]">
                      PyTorch
                    </div>
                    <div className="py-1 px-1.5 rounded bg-white/5 text-[#00FF9D]">
                      CUDA GPU
                    </div>
                    <div className="py-1 px-1.5 rounded bg-white/5 text-[#8A2BE2]">
                      Blockchain
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
