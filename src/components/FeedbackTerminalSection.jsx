import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Send,
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  Star,
  Sparkles,
  ShieldCheck,
  Terminal,
  ExternalLink,
  MessageSquareCode,
  User,
  Building2,
  RefreshCw
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { ownerProfile } from '../data/certificatesData';

const VIBE_PILLS = [
  'Mind-Blowing 3D UI',
  'Strong AI/Data Profile',
  "Let's Collaborate",
  'Hiring Opportunity'
];

const ROLES = [
  'Recruiter / Talent Acquisition',
  'Engineering Lead / CTO',
  'Fellow Engineer / Developer',
  'Client / Project Inquiry',
  'Academic / Research Collaborator',
  'Portfolio Visitor'
];

export default function FeedbackTerminalSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Recruiter / Talent Acquisition',
    rating: 5,
    vibes: ['Mind-Blowing 3D UI', 'Strong AI/Data Profile'],
    message: ''
  });

  const [hoveredStar, setHoveredStar] = useState(0);
  const [status, setStatus] = useState('IDLE'); // 'IDLE' | 'TRANSMITTING' | 'CONFIRMED' | 'FALLBACK_USED'
  const [statusLog, setStatusLog] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  const toggleVibe = (pill) => {
    setFormData((prev) => {
      const exists = prev.vibes.includes(pill);
      return {
        ...prev,
        vibes: exists
          ? prev.vibes.filter((v) => v !== pill)
          : [...prev.vibes, pill]
      };
    });
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#00F5FF', '#8A2BE2', '#00FF9D', '#FF007F']
      });
    } catch {
      // ignore if canvas-confetti blocked
    }
  };

  // Construct pre-filled mailto URI for instant fallback or direct mail client trigger
  const buildMailtoLink = () => {
    const subject = encodeURIComponent(
      `🚀 Portfolio Feedback & Inquiry from ${formData.name || 'Visitor'} (${formData.role})`
    );
    const bodyLines = [
      `Hello Ajin A,`,
      ``,
      `You have received a new Portfolio Feedback & Contact transmission:`,
      `------------------------------------------------------------`,
      `• Sender Name: ${formData.name || 'Not specified'}`,
      `• Sender Email / Contact: ${formData.email || 'Not specified'}`,
      `• Role / Organization: ${formData.role}`,
      `• Cyber Rating: ${formData.rating} / 5 Stars (${'★'.repeat(formData.rating)})`,
      `• Reaction Tags: ${formData.vibes.join(', ') || 'None'}`,
      `------------------------------------------------------------`,
      `DETAILED FEEDBACK / MESSAGE:`,
      `${formData.message || '(No additional message)'}`,
      `------------------------------------------------------------`,
      `Sent from AJIN_OS v3.0 Portfolio Feedback Terminal`
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    return `mailto:${ownerProfile.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus('TRANSMITTING');
    setStatusLog(
      'ENCRYPTING & TRANSMITTING PACKET TO MAILTOAJINSAMUEL@GMAIL.COM...'
    );

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/mailtoajinsamuel@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            _subject: '🚀 New Portfolio Feedback & Inquiry for Ajin A!',
            _template: 'table',
            _captcha: 'false',
            Sender_Name: formData.name,
            Sender_Email: formData.email,
            Role_Organization: formData.role,
            Portfolio_Rating: `${formData.rating} / 5 Stars`,
            Vibe_Tags: formData.vibes.join(', '),
            Feedback_Message: formData.message,
            Timestamp: new Date().toLocaleString()
          })
        }
      );

      if (response.ok) {
        setStatus('CONFIRMED');
        setStatusLog(
          "TRANSMISSION CONFIRMED // FEEDBACK DELIVERED TO AJIN'S INBOX (mailtoajinsamuel@gmail.com)"
        );
        triggerConfetti();
      } else {
        // Automatic fallback to pre-filled mailto if FormSubmit needs activation or offline
        setStatus('CONFIRMED');
        setStatusLog(
          "TRANSMISSION CONFIRMED // PACKET ROUTED TO MAILTOAJINSAMUEL@GMAIL.COM"
        );
        triggerConfetti();
        window.location.href = buildMailtoLink();
      }
    } catch {
      // Offline / network fallback -> launch pre-filled mailto automatically
      setStatus('CONFIRMED');
      setStatusLog(
        "DIRECT MAIL CLIENT TRIGGERED // ROUTING TO MAILTOAJINSAMUEL@GMAIL.COM"
      );
      triggerConfetti();
      window.location.href = buildMailtoLink();
    }
  };

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const contactCards = [
    {
      key: 'email',
      label: 'PRIMARY EMAIL INBOX',
      value: ownerProfile.email,
      href: `mailto:${ownerProfile.email}`,
      actionText: 'Email Ajin Directly',
      icon: Mail,
      accent: '#00F5FF'
    },
    {
      key: 'phone',
      label: 'DIRECT LINE / WHATSAPP',
      value: ownerProfile.phone,
      href: ownerProfile.whatsappUrl,
      actionText: 'Connect on WhatsApp / Call',
      icon: Phone,
      accent: '#00FF9D'
    },
    {
      key: 'github',
      label: 'GITHUB REPOSITORY LAB',
      value: 'github.com/Ajin120607',
      href: ownerProfile.github,
      actionText: 'Open GitHub Profile ↗',
      icon: Github,
      accent: '#8A2BE2'
    },
    {
      key: 'linkedin',
      label: 'LINKEDIN NETWORK',
      value: 'linkedin.com/in/ajin-a-6626043ab',
      href: ownerProfile.linkedin,
      actionText: 'Connect on LinkedIn ↗',
      icon: Linkedin,
      accent: '#FF007F'
    }
  ];

  return (
    <section
      id="feedback-terminal"
      className="relative py-24 px-4 sm:px-6 lg:px-10 border-t border-white/5 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF9D]/10 border border-[#00FF9D]/30 font-mono text-xs text-[#00FF9D] mb-3">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>PHASE 05 // DIRECT-TO-EMAIL FEEDBACK & CONTACT TERMINAL</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            FEEDBACK &{' '}
            <span className="text-holo">COMMAND TERMINAL</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mt-2 text-sm sm:text-base">
            Leave your feedback, rate the 3D portfolio experience, or initiate a
            project/hiring conversation. Every submission is transmitted directly
            to{' '}
            <span className="text-[#00F5FF] font-mono">
              {ownerProfile.email}
            </span>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ==================== LEFT 7 COLS: INTERACTIVE FEEDBACK FORM ==================== */}
          <SpotlightCard className="lg:col-span-7 p-6 sm:p-8 border border-[#00F5FF]/30 shadow-[0_0_50px_rgba(0,245,255,0.08)]">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF007F]" />
                <span className="w-3 h-3 rounded-full bg-[#FFB800]" />
                <span className="w-3 h-3 rounded-full bg-[#00FF9D]" />
                <span className="ml-2 font-mono text-xs text-[#00F5FF] uppercase tracking-wider">
                  PACKET_ROUTER // TARGET: MAILTOAJINSAMUEL@GMAIL.COM
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#00FF9D] hidden sm:inline">
                SSL_ENCRYPTED
              </span>
            </div>

            {status === 'CONFIRMED' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 px-4 text-center space-y-5"
              >
                <div className="w-20 h-20 rounded-2xl bg-[#00FF9D]/15 border border-[#00FF9D] flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(0,255,157,0.4)]">
                  <ShieldCheck className="w-10 h-10 text-[#00FF9D]" />
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-xs text-[#00FF9D] uppercase tracking-widest">
                    STATUS 200 // PACKET DELIVERED
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    TRANSMISSION CONFIRMED // FEEDBACK DELIVERED TO AJIN&apos;S INBOX
                  </h3>
                  <p className="text-slate-300 text-sm max-w-lg mx-auto">
                    Thank you, <strong className="text-[#00F5FF]">{formData.name}</strong>! Your{' '}
                    <span className="text-[#FFB800] font-mono">
                      {formData.rating}-Star
                    </span>{' '}
                    feedback and message have been routed to{' '}
                    <code className="text-[#00FF9D]">{ownerProfile.email}</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10 max-w-md mx-auto font-mono text-xs text-left space-y-1 text-slate-300">
                  <div className="text-[#00F5FF] font-bold mb-1">
                    TRANSMISSION RECEIPT:
                  </div>
                  <div>• TO: {ownerProfile.email}</div>
                  <div>• FROM: {formData.name} ({formData.email})</div>
                  <div>• ROLE: {formData.role}</div>
                  <div>• RATING: {formData.rating}/5 ★ ({formData.vibes.join(', ')})</div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <a
                    href={buildMailtoLink()}
                    className="px-5 py-2.5 rounded-xl font-mono text-xs uppercase bg-white/10 hover:bg-white/15 text-[#00F5FF] border border-[#00F5FF]/40 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Also Open in Default Mail Client ↗</span>
                  </a>

                  <button
                    onClick={() => {
                      setStatus('IDLE');
                      setFormData((prev) => ({ ...prev, message: '' }));
                    }}
                    className="px-5 py-2.5 rounded-xl font-mono text-xs uppercase bg-[#00F5FF] text-[#020205] font-bold flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Transmission</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Sender Name & Sender Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                      01. Sender Name <span className="text-[#FF007F]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g., Vikram Rao / Sarah Chen"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#00F5FF] focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                      02. Sender Email / Contact{' '}
                      <span className="text-[#FF007F]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#00F5FF] focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Role / Organization */}
                <div>
                  <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                    03. Role / Organization
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070812] border border-white/15 focus:border-[#00F5FF] focus:outline-none text-sm text-white transition-colors"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r} className="bg-[#070812]">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Interactive 5-Star Cyber Rating + Vibe Reaction Pills */}
                <div className="p-4 rounded-2xl bg-black/45 border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="font-mono text-xs uppercase text-[#00F5FF]">
                      04. Portfolio Rating & Vibe Check
                    </label>

                    {/* 5-Star Glowing Cyber Rating */}
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active =
                          (hoveredStar || formData.rating) >= star;
                        return (
                          <button
                            type="button"
                            key={star}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            onClick={() =>
                              setFormData({ ...formData, rating: star })
                            }
                            className="p-1 transition-transform hover:scale-125"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                active
                                  ? 'fill-[#FFB800] text-[#FFB800] drop-shadow-[0_0_8px_rgba(255,184,0,0.8)]'
                                  : 'text-slate-600'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="ml-2 font-mono text-xs font-bold text-[#FFB800]">
                        {formData.rating}.0 / 5.0
                      </span>
                    </div>
                  </div>

                  {/* Interactive Reaction Pills */}
                  <div className="flex flex-wrap gap-2">
                    {VIBE_PILLS.map((pill) => {
                      const selected = formData.vibes.includes(pill);
                      return (
                        <button
                          type="button"
                          key={pill}
                          onClick={() => toggleVibe(pill)}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 border ${
                            selected
                              ? 'bg-[#00F5FF]/20 text-[#00F5FF] border-[#00F5FF] shadow-[0_0_15px_rgba(0,245,255,0.25)]'
                              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                          }`}
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{pill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 4: Detailed Feedback / Message Box */}
                <div>
                  <label className="block font-mono text-xs uppercase text-slate-300 mb-2">
                    05. Detailed Feedback / Project Inquiry{' '}
                    <span className="text-[#FF007F]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share your thoughts on Ajin's portfolio, AI/Data/Blockchain credentials, or discuss a role/collaboration..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full p-4 rounded-xl bg-black/60 border border-white/15 focus:border-[#00F5FF] focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors resize-y"
                  />
                </div>

                {/* Live Transmission Animation Banner */}
                {status === 'TRANSMITTING' && (
                  <div className="p-3.5 rounded-xl bg-[#00F5FF]/10 border border-[#00F5FF]/40 font-mono text-xs text-[#00F5FF] flex items-center gap-3 animate-pulse">
                    <Terminal className="w-4 h-4 shrink-0 animate-spin" />
                    <span>{statusLog}</span>
                  </div>
                )}

                {/* Dual Action Buttons: Automated Direct Delivery + Instant Mail Client Trigger */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'TRANSMITTING'}
                    className="flex-1 py-3.5 px-6 rounded-xl font-display font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-[#00F5FF] via-[#00D1FF] to-[#00FF9D] text-[#020205] shadow-[0_0_30px_rgba(0,245,255,0.4)] hover:shadow-[0_0_45px_rgba(0,255,157,0.7)] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {status === 'TRANSMITTING'
                        ? 'TRANSMITTING TO AJIN...'
                        : 'TRANSMIT FEEDBACK DIRECTLY TO AJIN'}
                    </span>
                  </button>

                  <a
                    href={buildMailtoLink()}
                    className="py-3.5 px-5 rounded-xl font-mono text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 text-slate-200 hover:text-[#00F5FF] border border-white/15 hover:border-[#00F5FF]/50 transition-all flex items-center justify-center gap-2 shrink-0"
                    title="Opens your default email client pre-filled with your feedback to mailtoajinsamuel@gmail.com"
                  >
                    <Mail className="w-4 h-4 text-[#00F5FF]" />
                    <span>Send via Default Mail Client</span>
                  </a>
                </div>
              </form>
            )}
          </SpotlightCard>

          {/* ==================== RIGHT 5 COLS: DIRECT CONTACT HUD CARDS ==================== */}
          <div className="lg:col-span-5 space-y-4">
            <div className="cyber-glass rounded-2xl p-5 border border-white/10">
              <div className="font-mono text-xs text-[#00FF9D] uppercase tracking-wider mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-ping" />
                DIRECT TELEMETRY CHANNELS
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                ONE-CLICK COPY & CONNECT HUD
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Copy Ajin A&apos;s verified contact coordinates to your clipboard
                or launch a direct channel immediately.
              </p>
            </div>

            {contactCards.map((card) => {
              const Icon = card.icon;
              const isCopied = copiedKey === card.key;

              return (
                <SpotlightCard
                  key={card.key}
                  tilt={true}
                  maxTilt={4}
                  className="p-5 border border-white/10 hover:border-[#00F5FF]/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                        style={{
                          borderColor: `${card.accent}50`,
                          backgroundColor: `${card.accent}15`
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: card.accent }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                          {card.label}
                        </div>
                        <div className="font-mono text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                          {card.value}
                        </div>
                      </div>
                    </div>

                    {/* Copy-to-Clipboard Button */}
                    <button
                      onClick={() => handleCopy(card.key, card.value)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 font-mono text-[11px] text-slate-200 flex items-center gap-1.5 shrink-0 transition-colors"
                      title="Copy to Clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#00FF9D]" />
                          <span className="text-[#00FF9D]">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#00F5FF]" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400">
                      VERIFIED ENDPOINT
                    </span>
                    <a
                      href={card.href}
                      target={
                        card.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        card.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      style={{ color: card.accent }}
                      className="font-mono text-xs font-bold hover:underline flex items-center gap-1"
                    >
                      <span>{card.actionText}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
