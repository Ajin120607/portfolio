import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  FileText,
  Sparkles,
  CheckCircle2,
  Calendar,
  Hash,
  Eye
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { credlyBadges, certificatesData } from '../data/certificatesData';

const CATEGORIES = [
  'All',
  'AI & Data Science',
  'Cloud & Databases',
  'Programming & Tech'
];

export default function CredentialsVaultSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlySpecializations, setOnlySpecializations] = useState(false);
  const [activeCertModal, setActiveCertModal] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredCertificates = certificatesData.filter((cert) => {
    const matchesCategory =
      selectedCategory === 'All' || cert.category === selectedCategory;
    const matchesSpec = !onlySpecializations || cert.isSpecialization;
    return matchesCategory && matchesSpec;
  });

  const openModal = (cert) => {
    setZoomLevel(1);
    setActiveCertModal(cert);
  };

  const closeModal = () => {
    setActiveCertModal(null);
    setZoomLevel(1);
  };

  return (
    <div className="relative z-10">
      {/* ============================================================================
          PART A: 3D AWS CREDLY BADGE VAULT (HEXAGONAL HOLOGRAPHIC TOKENS)
      ============================================================================ */}
      <section
        id="aws-badges"
        className="py-20 px-4 sm:px-6 lg:px-10 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/30 font-mono text-xs text-[#00F5FF] mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PHASE 04A // 3D HOLOGRAPHIC CLOUD VAULT</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                VERIFIED AWS / CREDLY{' '}
                <span className="text-holo">BADGE TRIAD</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
                Official Amazon Web Services Training and Certification digital
                credentials issued to Ajin A. Click any badge token to verify
                live cryptographic authenticity on Credly.
              </p>
            </div>

            <div className="font-mono text-xs text-[#00FF9D] px-4 py-2 rounded-xl bg-[#00FF9D]/10 border border-[#00FF9D]/30 self-start md:self-auto">
              3 / 3 TOKENS CRYPTOGRAPHICALLY VERIFIED
            </div>
          </div>

          {/* 3-Column Hexagonal Holographic AWS Badge Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {credlyBadges.map((badge) => (
              <SpotlightCard
                key={badge.id}
                tilt={true}
                maxTilt={6}
                className="p-6 flex flex-col justify-between border border-[#00F5FF]/25 shadow-[0_0_30px_rgba(0,245,255,0.06)] group"
              >
                <div>
                  {/* Top Telemetry Bar */}
                  <div className="flex items-center justify-between font-mono text-xs mb-4">
                    <span
                      className="px-2.5 py-0.5 rounded font-bold border text-[11px]"
                      style={{
                        color: badge.accentColor,
                        borderColor: `${badge.accentColor}50`,
                        backgroundColor: `${badge.accentColor}15`
                      }}
                    >
                      {badge.code}
                    </span>
                    <span className="text-[#00FF9D] flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      AWS VERIFIED
                    </span>
                  </div>

                  {/* Compact 3D Metallic Hexagonal Token Display */}
                  <div className="relative my-2 flex items-center justify-center py-3">
                    <div
                      className="absolute w-32 h-32 rounded-full border border-dashed animate-spin-slow pointer-events-none"
                      style={{ borderColor: `${badge.accentColor}35` }}
                    />
                    <div
                      className="absolute w-24 h-24 rounded-full blur-xl opacity-35 group-hover:opacity-65 transition-opacity"
                      style={{ backgroundColor: badge.accentColor }}
                    />

                    {/* Proportionate Token Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                      <img
                        src={badge.image}
                        alt={badge.title}
                        onError={(e) => {
                          e.currentTarget.src = badge.remoteImage;
                        }}
                        className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,245,255,0.3)]"
                      />
                    </div>
                  </div>

                  {/* Badge Title & Issuer */}
                  <div className="text-center mt-2 mb-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#00F5FF] mb-1">
                      {badge.subtitle}
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                      {badge.title}
                    </h3>
                    <p className="font-mono text-[11px] text-slate-400 mt-1">
                      Issued by {badge.issuer}
                    </p>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed text-center mb-5">
                    {badge.description}
                  </p>
                </div>

                {/* Skills & Live Verification CTA */}
                <div className="space-y-3.5 pt-3.5 border-t border-white/10">
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {badge.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href={badge.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      borderColor: badge.accentColor
                    }}
                    className="w-full py-2.5 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#00F5FF]/20 via-[#8A2BE2]/25 to-[#00FF9D]/20 hover:from-[#00F5FF] hover:to-[#00FF9D] text-white hover:text-[#020205] border transition-all flex items-center justify-center gap-2"
                  >
                    <span>VERIFY LIVE ON CREDLY ↗</span>
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================================
          PART B: LOCAL CERTIFICATE GALLERY (ALL 12 EXTRACTED CERTIFICATES)
      ============================================================================ */}
      <section
        id="certificates"
        className="py-20 px-4 sm:px-6 lg:px-10 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header & Category Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A2BE2]/15 border border-[#8A2BE2]/40 font-mono text-xs text-[#00F5FF] mb-3">
                <Award className="w-3.5 h-3.5 text-[#8A2BE2]" />
                <span>PHASE 04B // VERIFIED LOCAL CERTIFICATE ARCHIVE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                SPECIALIZATIONS &{' '}
                <span className="text-holo">CERTIFICATES VAULT</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
                All 12 official certificates & multi-course specializations
                extracted directly from Ajin A&apos;s local archive. Click any
                certificate for Fullscreen Lightbox inspection.
              </p>
            </div>

            {/* Interactive Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                const count =
                  category === 'All'
                    ? certificatesData.length
                    : certificatesData.filter((c) => c.category === category)
                        .length;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-gradient-to-r from-[#00F5FF] to-[#8A2BE2] text-white font-bold shadow-[0_0_20px_rgba(0,245,255,0.4)]'
                        : 'cyber-glass text-slate-300 hover:text-white hover:border-[#00F5FF]/40'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] ${
                        active
                          ? 'bg-black/30 text-white'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              <button
                onClick={() => setOnlySpecializations(!onlySpecializations)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                  onlySpecializations
                    ? 'bg-[#00FF9D]/20 text-[#00FF9D] border-[#00FF9D]'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flagship Specializations (3)</span>
              </button>
            </div>
          </div>

          {/* Certificate Cards Grid (Balanced, Compact Preview Ratio) */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence>
              {filteredCertificates.map((cert) => (
                <motion.div
                  layout
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <SpotlightCard
                    tilt={true}
                    maxTilt={5}
                    onClick={() => openModal(cert)}
                    className={`h-full flex flex-col justify-between cursor-pointer group overflow-hidden p-4 border ${
                      cert.isSpecialization
                        ? 'border-[#00F5FF]/45 shadow-[0_0_25px_rgba(0,245,255,0.1)]'
                        : 'border-white/10 hover:border-[#00F5FF]/40'
                    }`}
                  >
                    <div>
                      {/* Compact Certificate Preview Frame */}
                      <div className="relative rounded-lg overflow-hidden bg-[#05060e] border border-white/10 mb-3.5 h-36 sm:h-40 flex items-center justify-center p-1.5">
                        <img
                          src={cert.previewImage}
                          alt={cert.title}
                          loading="lazy"
                          className="w-full h-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Top Badge Overlay */}
                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                          <span
                            className="px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border"
                            style={{
                              backgroundColor: 'rgba(2, 2, 5, 0.85)',
                              color: cert.accent,
                              borderColor: `${cert.accent}60`
                            }}
                          >
                            {cert.badgeLabel}
                          </span>

                          {cert.isSpecialization && (
                            <span className="px-1.5 py-0.5 rounded bg-[#00FF9D] text-[#020205] font-mono text-[9px] font-extrabold uppercase shadow">
                              SPEC
                            </span>
                          )}
                        </div>

                        {/* Hover Inspect Prompt */}
                        <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <span className="px-3 py-1.5 rounded-lg bg-[#00F5FF] text-[#020205] font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect HD</span>
                          </span>
                        </div>
                      </div>

                      {/* Category & Date */}
                      <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1">
                        <span style={{ color: cert.accent }}>{cert.category}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {cert.date}
                        </span>
                      </div>

                      {/* Title & Issuer */}
                      <h3 className="font-display text-base font-bold text-white group-hover:text-[#00F5FF] transition-colors leading-snug mb-1 line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="font-mono text-[11px] text-slate-400 mb-2">
                        {cert.issuer}
                      </p>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-2">
                        {cert.summary}
                      </p>
                    </div>

                    {/* Footer Metadata & Action Links */}
                    <div className="pt-2.5 border-t border-white/10 space-y-2">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-slate-400 flex items-center gap-1 truncate max-w-[130px]">
                          <Hash className="w-3 h-3 text-[#00F5FF] shrink-0" />
                          {cert.credentialId}
                        </span>
                        <span className="text-[#00F5FF] font-semibold flex items-center gap-1">
                          <span>VIEW</span>
                          <ZoomIn className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ============================================================================
          HIGH-RESOLUTION FULLSCREEN LIGHTBOX MODAL WITH ZOOM & PDF VERIFICATION
      ============================================================================ */}
      <AnimatePresence>
        {activeCertModal && (
          <motion.div
            key="cert-lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[95] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl cyber-glass-strong rounded-3xl border border-[#00F5FF]/40 shadow-[0_0_80px_rgba(0,245,255,0.2)] overflow-hidden"
            >
              {/* Modal Top Toolbar */}
              <div className="px-5 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-black/60">
                <div>
                  <div className="font-mono text-[10px] text-[#00F5FF] uppercase tracking-widest">
                    {activeCertModal.code} // CREDENTIAL ID: {activeCertModal.credentialId}
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">
                    {activeCertModal.title}
                  </h3>
                </div>

                {/* Zoom & Close Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-xs text-[#00F5FF] px-2">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.25, z + 0.25))}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-lg bg-[#FF007F]/20 hover:bg-[#FF007F] text-white border border-[#FF007F]/50 transition-colors ml-2"
                    title="Close Modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[78vh] overflow-y-auto">
                <div className="lg:col-span-8 bg-[#05060c] p-4 sm:p-6 flex items-center justify-center overflow-auto max-h-[58vh] lg:max-h-[70vh]">
                  <img
                    src={activeCertModal.previewImage}
                    alt={activeCertModal.title}
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'center center'
                    }}
                    className="max-w-full max-h-[56vh] object-contain rounded-lg shadow-2xl transition-transform duration-200"
                  />
                </div>

                <div className="lg:col-span-4 p-5 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between bg-[#070812]/90 space-y-5">
                  <div className="space-y-3.5">
                    <div>
                      <span className="font-mono text-[10px] uppercase px-2.5 py-1 rounded bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]/30">
                        {activeCertModal.category}
                      </span>
                      <h4 className="font-display text-lg font-bold text-white mt-2.5">
                        {activeCertModal.title}
                      </h4>
                      <p className="font-mono text-xs text-[#00FF9D] mt-0.5">
                        {activeCertModal.issuer}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeCertModal.summary}
                    </p>

                    <div className="bg-black/50 rounded-xl p-3 border border-white/10 space-y-1.5 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">EARNER:</span>
                        <span className="text-white font-bold">AJIN A</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">ISSUE DATE:</span>
                        <span className="text-slate-200">
                          {activeCertModal.date}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">CREDENTIAL ID:</span>
                        <span className="text-[#00F5FF]">
                          {activeCertModal.credentialId}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="font-mono text-[10px] text-slate-400 uppercase mb-1.5">
                        VERIFIED COMPETENCIES:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCertModal.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[11px] text-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-white/10">
                    <a
                      href={activeCertModal.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#00F5FF] to-[#00FF9D] text-[#020205] hover:opacity-95 transition-all flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Open Original PDF ↗</span>
                    </a>

                    {activeCertModal.verifyUrl && (
                      <a
                        href={activeCertModal.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl font-mono text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4 text-[#00F5FF]" />
                        <span>Verify Credential Online ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
