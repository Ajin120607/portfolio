import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

const BOOT_LOGS = [
  'MOUNTING QUANTUM_NEURAL_OS KERNEL v3.0.4...',
  'LOADING NEURAL WEIGHTS // 29 SKILL SYNAPSES SYNCED',
  'VERIFYING 3x AWS CREDLY CRYPTOGRAPHIC TOKENS... [OK]',
  'INDEXING 12 LOCAL CERTIFICATES (PYTORCH / CUDA / OCI / DBMS)... [OK]',
  'ESTABLISHING DIRECT TELEMETRY -> MAILTOAJINSAMUEL@GMAIL.COM... [READY]'
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 1450; // ~1.5 second high-tech terminal initialization
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setVisible(false);
            if (onComplete) onComplete();
          }, 220);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const activeLogCount = Math.min(
    BOOT_LOGS.length,
    Math.floor((progress / 100) * (BOOT_LOGS.length + 1))
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="ajin-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(12px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#020205] flex flex-col items-center justify-center px-6 select-none overflow-hidden"
        >
          {/* Ambient Background Glow */}
          <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#00F5FF]/10 blur-[130px] pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#8A2BE2]/15 blur-[130px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-2xl cyber-glass-strong rounded-2xl p-6 sm:p-8 border border-[#00F5FF]/30 shadow-[0_0_60px_rgba(0,245,255,0.12)]">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#FF007F] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFB800] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#00FF9D] inline-block animate-pulse" />
                <span className="ml-2 font-mono text-xs tracking-widest text-[#00F5FF] uppercase flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  AJIN_OS // BOOT_SEQUENCE_V3.0
                </span>
              </div>
              <span className="font-mono text-xs text-slate-400">
                MEM_ALLOC: 64.0 TB
              </span>
            </div>

            {/* Main Initialization Headline */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00FF9D] mb-2 tracking-wider">
                <Cpu className="w-4 h-4 animate-spin" />
                <span>QUANTUM NEURAL WORKSTATION</span>
              </div>
              <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-wider text-white uppercase">
                INITIALIZING AJIN_OS v3.0 //{' '}
                <span className="text-holo">
                  LOADING NEURAL WEIGHTS & CREDENTIALS...
                </span>
              </h1>
            </div>

            {/* Live Boot Log Lines */}
            <div className="bg-black/60 rounded-xl p-4 mb-6 border border-white/5 font-mono text-xs space-y-2 min-h-[125px]">
              {BOOT_LOGS.slice(0, activeLogCount).map((line, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-slate-300"
                >
                  <span className="text-[#00F5FF] shrink-0">{'>'}</span>
                  <span className="leading-relaxed">{line}</span>
                </div>
              ))}
              <div className="flex items-center gap-1 text-[#00FF9D]">
                <span>{'>'}</span>
                <span className="w-2 h-4 bg-[#00FF9D] inline-block animate-pulse" />
              </div>
            </div>

            {/* Percentage Counter & Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00FF9D]" />
                  NEURAL CORE SYNCHRONIZATION
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#00F5FF]">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00F5FF] via-[#8A2BE2] to-[#00FF9D] transition-all duration-75 shadow-[0_0_15px_#00F5FF]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
