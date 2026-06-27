"use client"

import { EVENT_CONFIG } from "@/lib/config"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Calendar, MapPin, Users, Trophy, Code, Zap, Clock, Mail, Phone,
  Award, Star, ArrowRight, Sparkles, Target, Rocket, CheckCircle,
  ChevronDown, Brain, Cpu, Globe, Shield,
} from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { ScheduleModal } from "@/components/schedule-modal"
import { EventTicker, EventTickerStrip } from "@/components/event-ticker"

// ── Design tokens ──────────────────────────────────────────────────────────
const BASE    = "#02040f"
const GLASS   = "rgba(255,255,255,0.03)"
const BORDER  = "rgba(255,255,255,0.07)"
const GRAD    = "linear-gradient(135deg,#7c3aed 0%,#06b6d4 100%)"
const GRADT   = "linear-gradient(90deg,#22d3ee 0%,#818cf8 55%,#c084fc 100%)"

// ── Reusable atoms ─────────────────────────────────────────────────────────
function GradText({ children, from = "#22d3ee", to = "#a78bfa" }: { children: React.ReactNode; from?: string; to?: string }) {
  return (
    <span style={{ background: `linear-gradient(90deg,${from},${to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
      {children}
    </span>
  )
}

function SectionLabel({ icon, label, color = "#22d3ee" }: { icon: React.ReactNode; label: string; color?: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: `${color}10`, border: `1px solid ${color}30`, color }}>
      <span style={{ display: "contents", opacity: 0.8 }}>{icon}</span>
      {label}
    </div>
  )
}

function GlassCard({ children, color = "#ffffff", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <div className={`rounded-3xl p-8 transition-all duration-300 hover:border-white/15 group ${className}`} style={{ background: GLASS, border: `1px solid ${BORDER}` }}>
      {children}
    </div>
  )
}

function Chip({ children, color = "#22d3ee" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-bold inline-block" style={{ background: `${color}12`, border: `1px solid ${color}25`, color }}>
      {children}
    </span>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function AISeekhoDay() {
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const handleReg = () => { window.location.href = "/register" }

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: BASE }}>

      {/* ── Fixed Ambient Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.6]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute -top-32 right-0 w-[800px] h-[800px]" style={{ background: "radial-gradient(circle at 80% 10%, rgba(124,58,237,0.13) 0%, transparent 60%)" }} />
        <div className="absolute top-[45%] -left-20 w-[600px] h-[600px]" style={{ background: "radial-gradient(circle at 20% 60%, rgba(6,182,212,0.09) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 right-1/3 w-[700px] h-[500px]" style={{ background: "radial-gradient(circle at 60% 90%, rgba(79,70,229,0.07) 0%, transparent 60%)" }} />
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 w-full z-50" style={{ background: "rgba(2,4,15,0.82)", backdropFilter: "blur(28px)", borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)]" style={{ background: GRAD }}>
                <Rocket style={{ width: 18, height: 18 }} className="text-white" />
              </div>
              <span className="font-black text-lg tracking-tight text-white">{EVENT_CONFIG.name}</span>
            </div>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {[["#about", "About"], ["#highlights", "Highlights"], ["#speakers", "Speakers"]].map(([href, label]) => (
                <a key={label} href={href} className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 relative group">
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: GRADT }} />
                </a>
              ))}
              <button onClick={() => setShowScheduleModal(true)} className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 relative group">
                Schedule
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: GRADT }} />
              </button>
              <Button onClick={handleReg} className="h-9 px-5 text-sm font-bold text-white rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)]" style={{ background: GRAD }}>
                Register Free
              </Button>
            </div>

            {/* Mobile toggle */}
            <button className="lg:hidden p-2 text-white/60 hover:text-white" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <div className="space-y-1.5">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${showMobileMenu ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${showMobileMenu ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${showMobileMenu ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>

          {/* Mobile menu */}
          {showMobileMenu && (
            <div className="lg:hidden py-4 space-y-1" style={{ borderTop: `1px solid ${BORDER}` }}>
              {[["#about", "About"], ["#highlights", "Highlights"], ["#speakers", "Speakers"]].map(([href, label]) => (
                <a key={label} href={href} onClick={() => setShowMobileMenu(false)} className="block px-3 py-2.5 text-sm text-white/50 hover:text-white transition-colors">{label}</a>
              ))}
              <button onClick={() => { setShowScheduleModal(true); setShowMobileMenu(false) }} className="block w-full text-left px-3 py-2.5 text-sm text-white/50 hover:text-white transition-colors">Schedule</button>
              <div className="px-3 pt-2">
                <Button onClick={() => { handleReg(); setShowMobileMenu(false) }} className="w-full text-white font-bold" style={{ background: GRAD }}>Register Free</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Ticker */}
        <div className="absolute top-16 left-0 right-0 z-10 hidden lg:block"><EventTicker /></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* ─ Left ─ */}
            <div className="lg:col-span-7 space-y-8">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase" style={{ border: "1px solid rgba(6,182,212,0.35)", background: "rgba(6,182,212,0.06)", color: "#22d3ee" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
                {EVENT_CONFIG.tagline}
              </div>

              {/* Title */}
              <div className="space-y-5">
                <h1 className="font-black leading-[0.88] tracking-tighter" style={{ fontSize: "clamp(3rem,6.5vw,5.5rem)" }}>
                  <span className="text-white/85">Welcome to</span><br />
                  <span style={{ background: GRADT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {EVENT_CONFIG.name}
                  </span>
                </h1>
                <p className="text-lg text-white/40 leading-relaxed max-w-xl">
                  {EVENT_CONFIG.description}
                </p>
              </div>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  { icon: <Calendar style={{ width: 14, height: 14 }} className="text-cyan-400" />, label: EVENT_CONFIG.date },
                  { icon: <MapPin style={{ width: 14, height: 14 }} className="text-violet-400" />, label: EVENT_CONFIG.location },
                  { icon: <Users style={{ width: 14, height: 14 }} className="text-emerald-400" />, label: EVENT_CONFIG.attendees },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/55" style={{ border: `1px solid ${BORDER}`, background: GLASS }}>
                    {icon}{label}
                  </div>
                ))}
              </div>

              {/* Countdown */}
              <div className="p-px rounded-2xl" style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.4),rgba(124,58,237,0.4))" }}>
                <div className="rounded-[15px] p-1.5" style={{ background: "rgba(2,4,15,0.97)" }}>
                  <CountdownTimer />
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Button onClick={handleReg} size="lg" className="h-14 px-8 font-extrabold text-base rounded-2xl text-white" style={{ background: GRAD, boxShadow: "0 0 40px rgba(124,58,237,0.35)" }}>
                  <Rocket style={{ width: 20, height: 20 }} className="mr-2" />
                  Secure My Spot
                  <ArrowRight style={{ width: 20, height: 20 }} className="ml-2" />
                </Button>
                <Button onClick={() => setShowScheduleModal(true)} size="lg" variant="outline" className="h-14 px-8 font-bold text-base rounded-2xl text-white/65 hover:text-white" style={{ border: `1px solid ${BORDER}`, background: GLASS }}>
                  <Clock style={{ width: 20, height: 20 }} className="mr-2" />
                  View Schedule
                </Button>
              </div>
            </div>

            {/* ─ Right: LEAP-style event card ─ */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="absolute inset-0 pointer-events-none rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 70%)", filter: "blur(40px)" }} />
              <div
                onClick={handleReg}
                className="relative group cursor-pointer w-full max-w-[320px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:scale-[1.025]"
                style={{ background: "linear-gradient(155deg,#2e1a72 0%,#1c1050 30%,#0d0828 60%,#1a0d4e 85%,#28105e 100%)", boxShadow: "0 30px 80px rgba(88,28,220,0.45)" }}
              >
                <div className="absolute -top-16 -left-8 w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(139,92,246,0.25)", filter: "blur(70px)" }} />
                <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full pointer-events-none" style={{ background: "rgba(79,70,229,0.2)", filter: "blur(60px)" }} />
                <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center px-8 py-10 text-center" style={{ minHeight: 510 }}>
                  {/* Icon + name */}
                  <div className="flex flex-col items-center mb-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg,rgba(139,92,246,0.5),rgba(79,70,229,0.4))", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 0 30px rgba(167,139,250,0.4)" }}>
                      <Rocket style={{ width: 32, height: 32 }} className="text-white" />
                    </div>
                    <span className="text-white font-black text-3xl tracking-tight">{EVENT_CONFIG.name}</span>
                    <div className="flex items-center gap-2 mt-2.5">
                      <div className="h-px w-10 bg-violet-400/40" />
                      <span className="text-violet-300/70 text-[10px] font-bold uppercase tracking-[0.2em]">{EVENT_CONFIG.organizer}</span>
                      <div className="h-px w-10 bg-violet-400/40" />
                    </div>
                  </div>

                  {/* Date pill */}
                  <div className="flex items-center gap-2.5 rounded-full px-5 py-2 mb-10 text-[11px] font-semibold text-white/75" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <Calendar style={{ width: 14, height: 14, color: "#a78bfa" }} />
                    {EVENT_CONFIG.date}
                    <span className="w-1 h-1 rounded-full bg-white/30 inline-block" />
                    <MapPin style={{ width: 14, height: 14, color: "#a78bfa" }} />
                    {EVENT_CONFIG.location.split(",")[0]}
                  </div>

                  {/* Headline */}
                  <div className="flex-1 flex items-center justify-center mb-10">
                    <div>
                      <p className="text-violet-300/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Theme {EVENT_CONFIG.year}</p>
                      <h2 className="text-white font-black leading-[1.0] tracking-tight" style={{ fontSize: "clamp(2.8rem,8vw,3.25rem)" }}>
                        INTO<br />
                        <span style={{ background: "linear-gradient(90deg,#c4b5fd,#e0e7ff,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>NEW</span><br />
                        WORLDS
                      </h2>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center gap-2.5 flex-wrap mb-7">
                    <div className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-bold text-white/80" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                      <Trophy style={{ width: 12, height: 12, color: "#fde047" }} />{EVENT_CONFIG.prizes}
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-bold text-white/80" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                      <Users style={{ width: 12, height: 12, color: "#34d399" }} />{EVENT_CONFIG.attendees}
                    </div>
                  </div>

                  {/* CTA chip */}
                  <div className="flex items-center gap-2 bg-white rounded-full px-6 py-2.5 group-hover:bg-violet-50 transition-colors" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
                    <Sparkles style={{ width: 14, height: 14, color: "#7c3aed" }} />
                    <span className="text-[11px] font-black uppercase tracking-wider" style={{ color: "#5b21b6" }}>Register Free</span>
                    <ArrowRight style={{ width: 14, height: 14, color: "#7c3aed" }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <EventTickerStrip />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0" style={{ "--tw-divide-opacity": 1, borderColor: BORDER } as React.CSSProperties}>
            {[
              { num: "200+",     label: "Registered",   color: "#22d3ee", icon: <Users style={{ width: 22, height: 22 }} /> },
              { num: "PKR 150K", label: "Prize Pool",    color: "#fbbf24", icon: <Trophy style={{ width: 22, height: 22 }} /> },
              { num: "5+",       label: "Workshops",     color: "#a78bfa", icon: <Code style={{ width: 22, height: 22 }} /> },
              { num: "3+",       label: "Google Experts",color: "#34d399", icon: <Star style={{ width: 22, height: 22 }} /> },
            ].map(({ num, label, color, icon }) => (
              <div key={label} className="flex flex-col items-center py-12 px-6 text-center gap-2" style={{ background: BASE, borderColor: BORDER }}>
                <span style={{ color, opacity: 0.6 }}>{icon}</span>
                <span className="text-3xl sm:text-4xl font-black mt-1" style={{ color }}>{num}</span>
                <span className="text-xs text-white/30 font-bold uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <section id="about" className="relative py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionLabel icon={<Globe style={{ width: 12, height: 12 }} />} label={`About ${EVENT_CONFIG.name}`} />
          <div className="mt-6 mb-6">
            <h2 className="font-black tracking-tight" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
              Pakistan&apos;s Premier <GradText>AI Summit</GradText>
            </h2>
          </div>
          <p className="text-white/35 text-lg max-w-3xl leading-relaxed mb-16">
            A one-day Google AI-centric event — startup competition, hands-on workshops, and an AI product hackathon. Designed to empower the next generation of innovators through real challenges and world-class mentorship.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: <Brain style={{ width: 28, height: 28 }} />, color: "#22d3ee", title: "AI-Powered Learning", desc: "Hands-on labs led by Google Developer Experts covering Gemini API, Vertex AI, and Firebase." },
              { icon: <Cpu style={{ width: 28, height: 28 }} />, color: "#a78bfa", title: "Build & Compete", desc: "8-hour AI hackathon + PKR 150K startup pitch competition judged by top VCs." },
              { icon: <Shield style={{ width: 28, height: 28 }} />, color: "#34d399", title: "Network & Grow", desc: "Connect with 200+ developers and founders. Free Google Cloud Credits for all participants." },
            ].map(({ icon, color, title, desc }) => (
              <div key={title} className="rounded-3xl p-8 transition-all duration-300 hover:border-white/15" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                  {icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Event Highlights ── */}
      <section id="highlights" className="relative py-28" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionLabel icon={<Sparkles style={{ width: 12, height: 12 }} />} label="Event Highlights" color="#a78bfa" />
          <h2 className="mt-6 mb-16 font-black tracking-tight" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
            A Glimpse Into <GradText>the Future</GradText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Hackathon — wide */}
            <div className="md:col-span-2 rounded-3xl overflow-hidden transition-all duration-300 hover:border-cyan-500/25" style={{ background: "rgba(6,182,212,0.03)", border: "1px solid rgba(6,182,212,0.12)" }}>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.25)" }}>
                    <Code style={{ width: 20, height: 20, color: "#22d3ee" }} />
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Hackathon</h3>
                </div>
                <p className="text-white/35 text-sm leading-relaxed max-w-lg mb-6">
                  Build and deploy groundbreaking AI products using Google Gemini API, Vertex AI, and Firebase. Solve real-world problems in an 8-hour sprint with your team.
                </p>
                <div className="flex gap-2 flex-wrap">
                  {["Gemini API", "Vertex AI", "Firebase", "8 Hours"].map(t => <Chip key={t} color="#22d3ee">{t}</Chip>)}
                </div>
              </div>
              <div className="h-px" style={{ background: "linear-gradient(90deg,rgba(6,182,212,0.3),transparent)" }} />
              <div className="px-8 py-4 flex items-center justify-between">
                <span className="text-white/20 text-xs font-mono uppercase tracking-widest">Track / AI_HACKATHON</span>
                <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: "#22d3ee" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />Open Registration
                </div>
              </div>
            </div>

            {/* Startup */}
            <div className="rounded-3xl overflow-hidden transition-all duration-300 hover:border-violet-500/25" style={{ background: "rgba(167,139,250,0.03)", border: "1px solid rgba(167,139,250,0.12)" }}>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)" }}>
                    <Trophy style={{ width: 20, height: 20, color: "#a78bfa" }} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Startup Pitch</h3>
                </div>
                <p className="text-white/35 text-sm leading-relaxed mb-8">Pitch to top VCs and industry mentors. Compete for cash rewards and direct investment opportunities.</p>
                <div className="text-4xl font-black mb-1" style={{ color: "#a78bfa" }}>PKR 150K</div>
                <div className="text-xs text-white/25 uppercase tracking-widest font-bold">Total Prize Pool</div>
              </div>
            </div>

            {/* Workshop */}
            <div className="rounded-3xl overflow-hidden transition-all duration-300 hover:border-emerald-500/25" style={{ background: "rgba(52,211,153,0.03)", border: "1px solid rgba(52,211,153,0.12)" }}>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)" }}>
                    <Zap style={{ width: 20, height: 20, color: "#34d399" }} />
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Workshops</h3>
                </div>
                <p className="text-white/35 text-sm leading-relaxed mb-6">Hands-on labs by Google Developer Experts. Train, fine-tune, and build scalable agentic AI systems.</p>
                <div className="flex gap-2 flex-wrap">
                  {["Hands-On", "GDE-Led", "Free"].map(t => <Chip key={t} color="#34d399">{t}</Chip>)}
                </div>
              </div>
            </div>

            {/* Perks — wide */}
            <div className="md:col-span-2 rounded-3xl overflow-hidden transition-all duration-300 hover:border-yellow-500/20" style={{ background: "rgba(251,191,36,0.03)", border: "1px solid rgba(251,191,36,0.1)" }}>
              <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)" }}>
                      <Star style={{ width: 20, height: 20, color: "#fbbf24" }} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Expert Mentorship & Perks</h3>
                  </div>
                  <p className="text-white/35 text-sm leading-relaxed mb-5">Network directly with Google Developer Experts and global tech leaders. All participants receive Free Google Cloud Credits to build their next project.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Free Cloud Credits", "GDE Mentorship", "Certificates", "Food & Merch"].map(t => <Chip key={t} color="#fbbf24">{t}</Chip>)}
                  </div>
                </div>
                <div className="w-full sm:w-48 p-6 rounded-2xl text-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}` }}>
                  <div className="text-2xl font-black text-white mb-1">Unlimited</div>
                  <div className="text-[10px] text-white/25 uppercase tracking-widest mb-5">Cloud Credits</div>
                  <div className="h-px w-full mb-5" style={{ background: BORDER }} />
                  <div className="text-2xl font-black text-white mb-1">PKR 150K</div>
                  <div className="text-[10px] text-white/25 uppercase tracking-widest">Prize Pool</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prizes ── */}
      <section className="relative py-28" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(251,191,36,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionLabel icon={<Trophy style={{ width: 12, height: 12 }} />} label="Competition Prizes" color="#fbbf24" />
          <h2 className="mt-6 mb-4 font-black tracking-tight" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
            Startup <GradText from="#fbbf24" to="#f97316">Competition</GradText>
          </h2>
          <p className="text-white/35 text-lg mb-16 max-w-2xl">Compete for amazing cash prizes judged by top VCs and industry experts.</p>

          <div className="grid lg:grid-cols-2 gap-5 mb-10">
            {[
              { place: "1st", badge: "🏆 Winner", amount: "PKR 100K", color: "#fbbf24", perks: ["Google Cloud Credits", "GDE Mentorship", "Startup Incubation"], icon: <Trophy style={{ width: 28, height: 28 }} />, desc: "Grand prize plus exclusive mentorship and incubation with industry experts." },
              { place: "2nd", badge: "🥈 Runner-Up", amount: "PKR 50K", color: "#94a3b8", perks: ["Google Cloud Credits", "Networking Access", "Mentorship Sessions"], icon: <Award style={{ width: 28, height: 28 }} />, desc: "Runner-up prize plus access to our exclusive startup incubation program." },
            ].map(({ place, badge, amount, color, perks, icon, desc }) => (
              <div key={place} className="rounded-3xl p-8 relative overflow-hidden transition-all duration-300" style={{ background: `${color}04`, border: `1px solid ${color}20` }}>
                <div className="absolute top-0 right-0 px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl" style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
                  {badge}
                </div>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${color}12`, border: `1px solid ${color}25`, color }}>
                  {icon}
                </div>
                <div className="text-white/40 text-sm font-bold uppercase tracking-widest mb-2">{place} Place</div>
                <div className="font-black mb-4" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", color, lineHeight: 1 }}>{amount}</div>
                <p className="text-white/35 text-sm mb-6">{desc}</p>
                <div className="space-y-2.5">
                  {perks.map(p => (
                    <div key={p} className="flex items-center gap-2 text-sm text-white/40">
                      <CheckCircle style={{ width: 16, height: 16, color: "#34d399" }} />{p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* All-participant row */}
          <div className="rounded-3xl p-8" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-white mb-1">All Participants Receive</h3>
              <p className="text-white/25 text-sm">Every registered participant gets these exclusive benefits</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Code style={{ width: 22, height: 22 }} />, color: "#22d3ee", t: "Google Cloud Credits", d: "Free credits to build your projects" },
                { icon: <Users style={{ width: 22, height: 22 }} />, color: "#a78bfa", t: "Networking Access", d: "Connect with 200+ industry leaders" },
                { icon: <Trophy style={{ width: 22, height: 22 }} />, color: "#fbbf24", t: "Certificates", d: "Official participation certificates" },
              ].map(({ icon, color, t, d }) => (
                <div key={t} className="text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${color}12`, border: `1px solid ${color}25`, color }}>{icon}</div>
                  <div className="font-bold text-white text-sm mb-1">{t}</div>
                  <div className="text-white/25 text-xs">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Button onClick={handleReg} size="lg" className="h-14 px-10 font-extrabold text-base rounded-2xl text-white" style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)", boxShadow: "0 0 40px rgba(245,158,11,0.3)" }}>
              <Rocket style={{ width: 20, height: 20 }} className="mr-2" />Register for Competition<ArrowRight style={{ width: 20, height: 20 }} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Speakers ── */}
      <section id="speakers" className="relative py-28" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(167,139,250,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionLabel icon={<Users style={{ width: 12, height: 12 }} />} label="Meet Our Experts" color="#a78bfa" />
          <h2 className="mt-6 mb-6 font-black tracking-tight" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
            Speakers & <GradText>Mentors</GradText>
          </h2>
          <p className="text-white/35 text-lg mb-16 max-w-2xl">Industry experts, Google Developer Experts, and AI pioneers sharing cutting-edge knowledge.</p>

          {/* Keynote */}
          <div className="grid lg:grid-cols-2 gap-5 mb-8">
            {[
              { name: "Dr. Sarah Ahmed", role: "Google Developer Expert", company: "Google Cloud", expertise: "AI/ML & Cloud", emoji: "👩‍💻", color: "rgba(167,139,250,0.5),rgba(6,182,212,0.4)", keynote: "The Future of AI: From Research to Production" },
              { name: "Ahmed Hassan", role: "Senior AI Engineer", company: "TechCorp Pakistan", expertise: "Machine Learning", emoji: "👨‍💻", color: "rgba(6,182,212,0.5),rgba(59,130,246,0.4)", keynote: "Building Scalable AI Systems: Lessons from the Field" },
            ].map(({ name, role, company, expertise, emoji, color, keynote }) => (
              <div key={name} className="rounded-3xl p-8 flex gap-6 items-start" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0" style={{ background: `linear-gradient(135deg,${color})` }}>
                  {emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-3" style={{ background: "rgba(251,191,36,0.08)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}>
                    <Star style={{ width: 10, height: 10 }} />Keynote Speaker
                  </div>
                  <h3 className="text-xl font-black text-white mb-0.5">{name}</h3>
                  <p className="text-violet-400 text-sm font-semibold mb-0.5">{role}</p>
                  <p className="text-white/25 text-xs mb-3">{company}</p>
                  <Chip color="#a78bfa">{expertise}</Chip>
                  <div className="text-xs text-white/30 mt-4 p-3 rounded-xl" style={{ background: "rgba(167,139,250,0.05)", border: "1px solid rgba(167,139,250,0.1)" }}>
                    🎤 <span className="text-white/45">{keynote}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Speaker grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Fatima Khan", role: "Startup Mentor", company: "Innovation Hub", expertise: "Entrepreneurship", emoji: "🚀" },
              { name: "Usman Ali", role: "Senior AI Architect", company: "Tech Solutions", expertise: "Flutter & AI", emoji: "📱" },
              { name: "Ayesha Malik", role: "AI Research Lead", company: "AI Research Lab", expertise: "Deep Learning", emoji: "🧠" },
              { name: "Zain Rizvi", role: "Cloud Platform Expert", company: "DevOps Global", expertise: "Cloud & DevOps", emoji: "☁️" },
              { name: "Sana Javed", role: "AI Product Manager", company: "Microsoft", expertise: "Product Strategy", emoji: "💼" },
              { name: "Omar Farooq", role: "Data Science Lead", company: "Netflix", expertise: "Data Science", emoji: "📊" },
            ].map(({ name, role, company, expertise, emoji }) => (
              <div key={name} className="rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:border-white/15" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}` }}>{emoji}</div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white text-sm mb-0.5">{name}</h3>
                  <p className="text-white/35 text-xs mb-0.5">{role}</p>
                  <p className="text-white/20 text-xs mb-2">{company}</p>
                  <Chip color="#a78bfa">{expertise}</Chip>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schedule ── */}
      <section id="schedule" className="relative py-28" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionLabel icon={<Clock style={{ width: 12, height: 12 }} />} label="Event Schedule" color="#22d3ee" />
          <h2 className="mt-6 mb-16 font-black tracking-tight" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
            Full Day <GradText>Program</GradText>
          </h2>

          <div className="relative">
            <div className="absolute left-[76px] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom,rgba(6,182,212,0.6),rgba(124,58,237,0.6),rgba(236,72,153,0.3))" }} />
            <div className="space-y-3">
              {[
                { time: "9:00 AM",  title: "Registration & Welcome Coffee", type: "Reg",         icon: "👥", color: "#22d3ee", dur: "30 min" },
                { time: "9:30 AM",  title: "Opening Ceremony & Keynote",    type: "Keynote",     icon: "🎤", color: "#a78bfa", dur: "60 min" },
                { time: "10:30 AM", title: "Google AI Workshop — Gemini API",type: "Workshop",   icon: "💻", color: "#34d399", dur: "90 min" },
                { time: "12:00 PM", title: "Lunch Break & Networking",       type: "Break",      icon: "🍽️", color: "#fbbf24", dur: "60 min" },
                { time: "1:00 PM",  title: "AI Hackathon Begins",            type: "Hackathon",  icon: "🚀", color: "#818cf8", dur: "180 min" },
                { time: "2:00 PM",  title: "Startup Competition Pitches",    type: "Pitch",      icon: "🏅", color: "#f87171", dur: "120 min" },
                { time: "4:00 PM",  title: "GDE Talks & Mentorship",         type: "Talk",       icon: "👨‍🏫", color: "#fb923c", dur: "90 min" },
                { time: "5:30 PM",  title: "Hackathon Presentations",        type: "Demo",       icon: "📊", color: "#e879f9", dur: "60 min" },
                { time: "6:30 PM",  title: "Awards Ceremony & Closing",      type: "Ceremony",   icon: "🏆", color: "#34d399", dur: "30 min" },
              ].map(({ time, title, type, icon, color, dur }) => (
                <div key={time} className="flex items-stretch gap-5 group">
                  <div className="w-16 pt-5 text-right flex-shrink-0">
                    <span className="text-xs font-mono text-white/25 leading-none">{time}</span>
                  </div>
                  <div className="flex-shrink-0 w-5 flex flex-col items-center pt-5 relative z-10">
                    <div className="w-3 h-3 rounded-full mt-0.5 transition-all duration-300 group-hover:scale-125" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
                  </div>
                  <div className="flex-1 rounded-2xl p-5 mb-0 transition-all duration-300 group-hover:border-white/15" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xl">{icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="font-bold text-white text-sm">{title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase" style={{ background: `${color}15`, color, border: `1px solid ${color}28` }}>{type}</span>
                        </div>
                        <span className="text-xs text-white/20 font-mono">{dur}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-14">
            <Button onClick={() => setShowScheduleModal(true)} size="lg" className="h-14 px-8 font-bold rounded-2xl text-white" style={{ background: GRAD, boxShadow: "0 0 30px rgba(124,58,237,0.3)" }}>
              <Clock style={{ width: 20, height: 20 }} className="mr-2" />View Detailed Schedule<ArrowRight style={{ width: 20, height: 20 }} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="relative py-28" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionLabel icon={<Target style={{ width: 12, height: 12 }} />} label="FAQ" />
          <h2 className="mt-6 mb-16 font-black tracking-tight" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
            Got <GradText>Questions?</GradText>
          </h2>

          <div className="space-y-2.5">
            {[
              { q: `What is ${EVENT_CONFIG.name} ${EVENT_CONFIG.year}?`, a: `Pakistan's biggest AI event — workshops, hackathon, startup competition, and networking. A full day of learning, building, and connecting with the AI community.` },
              { q: "Who can participate?", a: "Students, developers, entrepreneurs, and anyone passionate about AI/ML. Beginner or expert — there's something for everyone." },
              { q: "Is it free to attend?", a: "Yes! Completely free to attend. Registration is required due to limited seating capacity." },
              { q: "What should I bring?", a: "Laptop, charger, and enthusiasm. All tools and resources for workshops and hackathons will be provided." },
              { q: "Can I join the hackathon as a team?", a: "Absolutely! Individual or teams of 2–4 members. Team collaboration enhances your chances of winning." },
              { q: "What are the competition prizes?", a: "PKR 100K for 1st place, PKR 50K for 2nd. All participants receive Google Cloud Credits, certificates, and networking access." },
              { q: "Will there be food and refreshments?", a: "Yes! Lunch, coffee, and refreshments throughout the day. Great opportunity to network while enjoying good food." },
              { q: "What if I'm new to AI/ML?", a: "Perfect! Beginner-friendly workshops and dedicated mentors. Designed to be inclusive for all skill levels." },
            ].map(({ q, a }, i) => (
              <div key={i} className="rounded-2xl overflow-hidden transition-all duration-300" style={{ background: GLASS, border: `1px solid ${openFaq === i ? "rgba(124,58,237,0.35)" : BORDER}` }}>
                <button className="w-full flex items-center justify-between p-6 text-left gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-white/75 text-sm leading-relaxed">{q}</span>
                  <ChevronDown style={{ width: 18, height: 18 }} className={`text-white/25 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <div className="h-px mb-4" style={{ background: BORDER }} />
                    <p className="text-white/35 text-sm leading-relaxed">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl p-8 text-center" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>
            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-white/25 text-sm mb-6">Our team is here to help.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`mailto:${EVENT_CONFIG.email}`}>
                <Button className="h-11 px-6 font-bold text-white rounded-xl" style={{ background: GRAD }}>
                  <Mail style={{ width: 16, height: 16 }} className="mr-2" />Email Us
                </Button>
              </a>
              <a href="https://wa.me/923063754907" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="h-11 px-6 font-bold rounded-xl text-white/60 hover:text-white" style={{ border: `1px solid ${BORDER}`, background: GLASS }}>
                  <Phone style={{ width: 16, height: 16 }} className="mr-2" />WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative pt-0 pb-10" style={{ borderTop: `1px solid ${BORDER}` }}>
        <EventTickerStrip />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          {/* CTA Banner */}
          <div className="rounded-3xl p-px mb-20" style={{ background: GRAD }}>
            <div className="rounded-[23px] p-10 sm:p-14 text-center" style={{ background: "#04061a" }}>
              <h2 className="font-black mb-4 tracking-tight" style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)" }}>
                Ready to Build the Future<br />
                <GradText>with AI?</GradText>
              </h2>
              <p className="text-white/35 text-lg mb-8 max-w-2xl mx-auto">
                Join us for an unforgettable day of learning, building, and networking. Don&apos;t miss Pakistan&apos;s biggest AI summit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleReg} size="lg" className="h-14 px-8 font-extrabold text-white rounded-2xl" style={{ background: GRAD, boxShadow: "0 0 40px rgba(124,58,237,0.4)" }}>
                  <Zap style={{ width: 20, height: 20 }} className="mr-2" />Register Now — It&apos;s Free!
                </Button>
                <Button onClick={() => setShowScheduleModal(true)} size="lg" variant="outline" className="h-14 px-8 font-bold text-white/60 hover:text-white rounded-2xl" style={{ border: `1px solid ${BORDER}`, background: GLASS }}>
                  <Clock style={{ width: 20, height: 20 }} className="mr-2" />View Schedule
                </Button>
              </div>
            </div>
          </div>

          {/* Footer grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: GRAD }}>
                  <Rocket style={{ width: 18, height: 18 }} className="text-white" />
                </div>
                <span className="font-black text-base text-white">{EVENT_CONFIG.name}</span>
              </div>
              <p className="text-white/25 text-sm leading-relaxed mb-5">Pakistan&apos;s premier AI summit — empowering the next generation of builders and innovators.</p>
              <div className="flex gap-2.5">
                {[<Mail style={{ width: 14, height: 14 }} />, <Users style={{ width: 14, height: 14 }} />, <Star style={{ width: 14, height: 14 }} />].map((icon, i) => (
                  <div key={i} className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white cursor-pointer transition-colors" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>{icon}</div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {[["#about", "About"], ["#highlights", "Highlights"], ["#speakers", "Speakers"], ["#schedule", "Schedule"], ["#faq", "FAQ"]].map(([href, label]) => (
                  <li key={label}>
                    <a href={href} className="text-white/25 hover:text-white/80 text-sm transition-colors flex items-center gap-2 group">
                      <ArrowRight style={{ width: 12, height: 12 }} className="group-hover:translate-x-0.5 transition-transform" />{label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-5">Event Tracks</h4>
              <ul className="space-y-3">
                {["AI Workshops", "AI Hackathon", "Startup Pitch", "GDE Talks", "Networking"].map(t => (
                  <li key={t} className="flex items-center gap-2 text-white/25 text-sm">
                    <CheckCircle style={{ width: 14, height: 14, color: "#34d399" }} />{t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-5">Contact</h4>
              <div className="space-y-4">
                {[
                  { icon: <Mail style={{ width: 12, height: 12 }} />, label: "Email", value: EVENT_CONFIG.email },
                  { icon: <Phone style={{ width: 12, height: 12 }} />, label: "Phone", value: "+92 306 3754907" },
                  { icon: <MapPin style={{ width: 12, height: 12 }} />, label: "Venue", value: "NFC-IET, Multan" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-violet-400" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>{icon}</div>
                    <div>
                      <div className="text-[10px] text-white/20 uppercase tracking-widest">{label}</div>
                      <div className="text-white/40 text-sm">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: `1px solid ${BORDER}` }}>
            <p className="text-white/15 text-xs">© {EVENT_CONFIG.year} {EVENT_CONFIG.organizer}. All rights reserved.</p>
            <div className="flex gap-6">
              {[["#", "Privacy Policy"], ["#", "Terms"], ["/admin", "Admin"]].map(([href, label]) => (
                <a key={label} href={href} className="text-white/15 hover:text-white/50 text-xs transition-colors">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating register CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={handleReg} className="h-12 px-6 font-extrabold text-white rounded-full" style={{ background: GRAD, boxShadow: "0 8px 32px rgba(124,58,237,0.5)" }}>
          <Rocket style={{ width: 16, height: 16 }} className="mr-2" />Register Free
        </Button>
      </div>

      <ScheduleModal isOpen={showScheduleModal} onClose={() => setShowScheduleModal(false)} />
    </div>
  )
}
