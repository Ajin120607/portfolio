import React, { Component, Suspense } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import NeuralBackground3D from './components/NeuralBackground3D';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ProjectsLabSection from './components/ProjectsLabSection';
import CredentialsVaultSection from './components/CredentialsVaultSection';
import FeedbackTerminalSection from './components/FeedbackTerminalSection';
import { ownerProfile } from './data/certificatesData';
import { Cpu, Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';

// Graceful Error Boundary for 3D WebGL Canvas
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#020205] blueprint-grid opacity-40" />
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020205] text-slate-100 relative selection:bg-[#00F5FF]/30 selection:text-[#00F5FF]">
      {/* 1.5s High-Tech Terminal Boot Preloader */}
      <Preloader />

      {/* Subtle CRT Scanline & Film Grain Overlay */}
      <div className="crt-overlay" />

      {/* Interactive 3D WebGL Particle Neural Network & Icosahedron Core */}
      <WebGLErrorBoundary>
        <Suspense fallback={null}>
          <NeuralBackground3D />
        </Suspense>
      </WebGLErrorBoundary>

      {/* Top HUD & Floating Bottom Glass Dock Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <SkillsSection />
        <ProjectsLabSection />
        <CredentialsVaultSection />
        <FeedbackTerminalSection />
      </main>

      {/* Cybernetic Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#020205]/90 backdrop-blur-xl py-12 pb-24 md:pb-28 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#00F5FF]/15 border border-[#00F5FF]/40 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#00F5FF]" />
            </div>
            <div>
              <div className="font-display font-bold text-white tracking-wider">
                {ownerProfile.fullName} // QUANTUM NEURAL OS v3.0
              </div>
              <p className="font-mono text-xs text-slate-400">
                {ownerProfile.degreeTitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-400">
            <a
              href={`mailto:${ownerProfile.email}`}
              className="hover:text-[#00F5FF] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#00F5FF]" />
              <span>{ownerProfile.email}</span>
            </a>
            <a
              href={`tel:${ownerProfile.phone.replace(/\s+/g, '')}`}
              className="hover:text-[#00FF9D] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#00FF9D]" />
              <span>{ownerProfile.phone}</span>
            </a>
            <a
              href={ownerProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5 text-[#8A2BE2]" />
              <span>GitHub</span>
            </a>
            <a
              href={ownerProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#FF007F]" />
              <span>LinkedIn</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-[#00F5FF] text-slate-300 hover:text-[#020205] border border-white/10 transition-all"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
