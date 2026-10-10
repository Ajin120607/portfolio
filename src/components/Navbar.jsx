import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Sparkles,
  FlaskConical,
  ShieldCheck,
  Award,
  MessageSquareCode,
  Github,
  Menu,
  X,
  Radio
} from 'lucide-react';
import { ownerProfile } from '../data/certificatesData';

const NAV_ITEMS = [
  { id: 'hero', label: 'Hero', shortLabel: 'Hero', icon: Sparkles, code: '01' },
  { id: 'skills-core', label: 'Skills Core', shortLabel: 'Skills', icon: Cpu, code: '02' },
  { id: 'rnd-projects', label: 'R&D Projects', shortLabel: 'R&D', icon: FlaskConical, code: '03' },
  { id: 'aws-badges', label: 'AWS Badges', shortLabel: 'Badges', icon: ShieldCheck, code: '04' },
  { id: 'certificates', label: 'Certificates', shortLabel: 'Certs', icon: Award, code: '05' },
  { id: 'feedback-terminal', label: 'Feedback Terminal', shortLabel: 'Contact', icon: MessageSquareCode, code: '06' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const scrollPosition = window.scrollY + 260;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Top Floating Cybernetic Glass HUD Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-10 ${
          scrolled ? 'py-2' : 'py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto cyber-glass-strong rounded-2xl px-3.5 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.65)] border border-[#00F5FF]/20">
          {/* Brand Identity */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group min-w-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-[#00F5FF]/50 shrink-0 shadow-[0_0_15px_rgba(0,245,255,0.25)] group-hover:border-[#00FF9D] transition-colors">
              <img
                src={ownerProfile.profileImage}
                alt={ownerProfile.fullName}
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#00FF9D] ring-1 ring-black" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm sm:text-lg tracking-wider text-white group-hover:text-[#00F5FF] transition-colors">
                  AJIN A
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/30">
                  OS_v3.0
                </span>
              </div>
              <p className="font-mono text-[9px] sm:text-[10px] text-slate-400 tracking-wider uppercase truncate">
                B.Tech // AI • Big Data • Blockchain
              </p>
            </div>
          </button>

          {/* Desktop Smooth-Scroll Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00F5FF]/20 to-[#8A2BE2]/25 text-[#00F5FF] border border-[#00F5FF]/40 shadow-[0_0_15px_rgba(0,245,255,0.18)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Status Telemetry */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection('feedback-terminal')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00FF9D]/10 border border-[#00FF9D]/30 hover:border-[#00FF9D] transition-all group"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9D] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF9D]" />
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-[#00FF9D] uppercase">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </button>

            <a
              href={ownerProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 hover:bg-[#00F5FF]/15 text-slate-300 hover:text-[#00F5FF] border border-white/10 hover:border-[#00F5FF]/40 transition-all"
              title="GitHub Profile (@Ajin120607)"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#00F5FF] border border-[#00F5FF]/30"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown HUD Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden max-w-7xl mx-auto mt-2 cyber-glass-strong rounded-2xl p-4 border border-[#00F5FF]/30 shadow-2xl space-y-2">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className="font-mono text-[11px] text-[#00FF9D] flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                AVAILABLE FOR OPPORTUNITIES
              </span>
              <span className="font-mono text-[10px] text-slate-400">HUD NAV</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`p-3 rounded-xl font-mono text-xs flex items-center gap-2 text-left transition-all ${
                      isActive
                        ? 'bg-[#00F5FF]/20 text-[#00F5FF] border border-[#00F5FF]/40'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Bottom Floating Cybernetic Quick Dock (Responsive on BOTH Mobile & Desktop!) */}
      <div className="fixed bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 flex items-center justify-around sm:justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl cyber-glass-strong border border-[#00F5FF]/25 shadow-[0_10px_40px_rgba(0,0,0,0.85)]">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl font-mono text-[10px] sm:text-[11px] transition-all duration-200 flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 ${
                isActive
                  ? 'bg-[#00F5FF] text-[#020205] font-bold shadow-[0_0_16px_rgba(0,245,255,0.55)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden text-[9px] leading-none">{item.shortLabel}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
