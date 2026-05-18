"use client"

import { EVENT_CONFIG } from "@/lib/config"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Trophy, Code, Zap, Clock, Mail, Phone, X, Award, Star, ArrowRight, Sparkles, Target, Rocket, CheckCircle, ChevronDown, Home } from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { ScheduleModal } from "@/components/schedule-modal"
import { EventTicker, EventTickerStrip } from "@/components/event-ticker"
export default function AISeekhoDay() {
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const handleRegistration = () => {
    window.location.href = '/register'
  }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-purple-200 selection:text-slate-900 font-sans overflow-hidden relative">
      {/* Dynamic Cosmic Background Gradients - Light Mode */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-3xl animate-pulse"></div>
        <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06)_0%,transparent_70%)] blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)] blur-3xl animate-pulse animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-30"></div>
      </div>

      {/* Navigation - Fixed directly at absolute top of page */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/50 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-lg sm:text-xl font-extrabold text-slate-800 cursor-pointer hover:opacity-85 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{EVENT_CONFIG.name}</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#about" className="text-slate-600 hover:text-slate-950 transition-colors font-semibold relative group">
                About
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#highlights" className="text-slate-600 hover:text-slate-950 transition-colors font-semibold relative group">
                Highlights
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#speakers" className="text-slate-600 hover:text-slate-950 transition-colors font-semibold relative group">
                Speakers
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button 
                onClick={() => setShowScheduleModal(true)}
                className="text-slate-600 hover:text-slate-950 transition-colors font-semibold relative group"
              >
                Schedule
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <Button 
                onClick={handleRegistration} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow-[0_4px_15px_rgba(79,70,229,0.2)] hover:shadow-[0_4px_25px_rgba(79,70,229,0.35)] transform hover:scale-105 transition-all duration-300"
              >
                Register Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${showMobileMenu ? 'rotate-45 translate-y-1' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${showMobileMenu ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${showMobileMenu ? '-rotate-45 -translate-y-1' : ''}`}></span>
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${showMobileMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="py-4 space-y-4 border-t border-gray-200">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  setShowMobileMenu(false)
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 w-full"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <a 
                href="#about" 
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setShowMobileMenu(false)}
              >
                About
              </a>
              <a 
                href="#highlights" 
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setShowMobileMenu(false)}
              >
                Highlights
              </a>
              <a 
                href="#speakers" 
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setShowMobileMenu(false)}
              >
                Speakers
              </a>
              <button 
                onClick={() => {
                  setShowScheduleModal(true)
                  setShowMobileMenu(false)
                }}
                className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Schedule
              </button>
              <Button 
                onClick={() => {
                  handleRegistration()
                  setShowMobileMenu(false)
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-44 pb-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Animated Event Ticker */}
        <div className="absolute top-20 left-0 right-0 z-10 lg:flex hidden">
          <EventTicker />
        </div>

        {/* Ambient Glowing Orbs & Dotted Matrix Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[10%] left-[-10%] w-[45rem] h-[45rem] rounded-full bg-gradient-to-tr from-blue-300/10 to-indigo-400/5 blur-[120px] animate-pulse pointer-events-none" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-purple-300/10 to-pink-400/5 blur-[120px] animate-pulse animation-delay-2000 pointer-events-none" />
          <div className="absolute top-[35%] left-[25%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-rose-200/5 to-amber-200/5 blur-[100px] animate-pulse animation-delay-4000 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(0,0,0,0.012)_1.5px,transparent_1.5px)] bg-[size:30px_30px] opacity-40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Rebranded Branding & Info Bento */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left">
              
              {/* Premium Glow Tagline Badge */}
              <div className="inline-flex">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative flex items-center space-x-2 bg-blue-50/90 border border-blue-100/80 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-blue-700 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:border-blue-200">
                    <Rocket className="w-4 h-4 text-blue-600 animate-bounce" />
                    <span className="uppercase tracking-wider text-[10px] sm:text-xs">{EVENT_CONFIG.tagline}</span>
                  </div>
                </div>
              </div>

              {/* Title Section */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7.5xl font-black tracking-tight leading-[0.95] text-slate-900">
                  <span className="font-heading bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 bg-clip-text text-transparent">
                    Welcome to
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent filter drop-shadow-[0_4px_12px_rgba(79,70,229,0.05)]">
                    {EVENT_CONFIG.name}
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                  {EVENT_CONFIG.description}
                </p>
              </div>

              {/* Grid of 4 Premium Glass Bento Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                {/* Date Card */}
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 flex items-center space-x-4 hover:border-blue-500/25 hover:shadow-[0_8px_30px_rgba(59,130,246,0.05)] transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                    <Calendar className="w-5 h-5 text-blue-600 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Timeline</div>
                    <div className="text-sm font-bold text-slate-800">{EVENT_CONFIG.date}</div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 flex items-center space-x-4 hover:border-purple-500/25 hover:shadow-[0_8px_30px_rgba(168,85,247,0.05)] transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                  <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Venue</div>
                    <div className="text-sm font-bold text-slate-800 truncate" title={EVENT_CONFIG.location}>{EVENT_CONFIG.location.split(',')[0]}</div>
                  </div>
                </div>

                {/* Prizes Card */}
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 flex items-center space-x-4 hover:border-pink-500/25 hover:shadow-[0_8px_30px_rgba(236,72,153,0.05)] transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                  <div className="p-3 bg-pink-50 border border-pink-100 rounded-xl">
                    <Trophy className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Rewards</div>
                    <div className="text-sm font-bold text-slate-800">{EVENT_CONFIG.prizes}</div>
                  </div>
                </div>

                {/* Attendees Card */}
                <div className="bg-white/90 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 flex items-center space-x-4 hover:border-emerald-500/25 hover:shadow-[0_8px_30px_rgba(16,185,129,0.05)] transition-all duration-300 hover:translate-y-[-2px] shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Attendance</div>
                    <div className="text-sm font-bold text-slate-800">{EVENT_CONFIG.attendees}</div>
                  </div>
                </div>
              </div>

              {/* Countdown Timer in sleek glass container */}
              <div className="bg-white/40 backdrop-blur-md border border-slate-200/30 rounded-3xl p-1.5 max-w-xl shadow-[0_15px_45px_rgba(0,0,0,0.02)]">
                <CountdownTimer />
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl pt-2">
                <Button
                  onClick={handleRegistration}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-extrabold px-8 py-6 rounded-2xl shadow-[0_10px_25px_rgba(79,70,229,0.25)] hover:shadow-[0_12px_35px_rgba(79,70,229,0.4)] transform hover:scale-102 transition-all duration-300 group flex-1"
                >
                  <span className="relative flex items-center justify-center space-x-2">
                    <Rocket className="w-5 h-5" />
                    <span>Secure My Spot</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </Button>
                
                <Button
                  onClick={() => setShowScheduleModal(true)}
                  size="lg"
                  variant="outline"
                  className="bg-white/90 backdrop-blur-md border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-800 hover:text-slate-900 font-bold px-8 py-6 rounded-2xl shadow-sm transform hover:scale-102 transition-all duration-300 flex-1"
                >
                  <Target className="w-5 h-5 mr-2 text-slate-600" />
                  <span>Detailed Schedule</span>
                </Button>
              </div>
            </div>

            {/* Right Column: Dynamic Tech Illustration Glassmorphic Control Dashboard */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center w-full">
              
              {/* Decorative light ring background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-[2.5rem] blur-2xl opacity-60 pointer-events-none"></div>
              
              {/* Premium 2026 Tech Graphic Bento Wrapper */}
              <div className="relative group w-full max-w-[450px] aspect-square rounded-[2.5rem] p-1.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden">
                
                <div className="absolute inset-0 bg-white/95 rounded-[2.35rem] z-0 transition-opacity group-hover:opacity-90"></div>
                
                <div className="relative w-full h-full rounded-[2.35rem] overflow-hidden z-10 flex flex-col justify-between p-6">
                  
                  {/* Backdrop graphic */}
                  <Image
                    src="/hero-image.png"
                    alt={EVENT_CONFIG.name}
                    fill
                    className="object-cover transform scale-100 group-hover:scale-103 transition-transform duration-700 opacity-95"
                    priority
                  />
                  
                  {/* Subtle glass shader vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-90 z-20"></div>
                  
                  {/* Live Network Active Capsule (Top Left) */}
                  <div className="absolute top-5 left-5 z-30 flex items-center space-x-2 bg-white/90 backdrop-blur-xl border border-slate-200/50 px-3 py-1.5 rounded-xl shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-700 tracking-wide uppercase">LIVE MONITOR ACTIVE</span>
                  </div>

                  {/* Dynamic Stats Capsule (Top Right) */}
                  <div className="absolute top-5 right-5 z-30 flex items-center space-x-2 bg-white/90 backdrop-blur-xl border border-slate-200/50 px-3 py-1.5 rounded-xl shadow-lg">
                    <span className="text-[10px] font-extrabold text-slate-700 tracking-wide uppercase">124 NODES / 99.9%</span>
                  </div>

                  {/* Dynamic registration overlay badge (Center) */}
                  <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="bg-white/95 backdrop-blur-md border border-slate-200/50 px-6 py-4 rounded-2xl shadow-2xl flex flex-col items-center space-y-2">
                      <Rocket className="w-8 h-8 text-blue-600 animate-bounce" />
                      <span className="text-xs font-bold text-slate-800">REGISTRATION GATEWAY OPEN</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">click to register now</span>
                    </div>
                  </div>

                  {/* Brand & Meta Label (Bottom) */}
                  <div className="relative z-30 mt-auto pt-4 flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-extrabold text-white tracking-wide font-heading drop-shadow-sm">{EVENT_CONFIG.organizer}</h3>
                      <p className="text-[10px] font-bold text-slate-200 uppercase tracking-widest drop-shadow-sm">Innovation Summit 2026</p>
                    </div>
                    <div className="bg-indigo-600/90 backdrop-blur-xl border border-indigo-400/30 px-3.5 py-1.5 rounded-xl shadow-md">
                      <span className="text-[10px] font-black text-white tracking-wider uppercase">GATEWAY OPEN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

        {/* Global Floating Register Now Trigger */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleRegistration}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold px-6 py-4 rounded-full shadow-[0_8px_30px_rgba(79,70,229,0.35)] hover:shadow-[0_8px_45px_rgba(79,70,229,0.5)] transform hover:scale-110 transition-all duration-300 group flex items-center space-x-2"
          >
            <Rocket className="w-5 h-5" />
            <span>Secure Spot</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Event Ticker Strip */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <EventTickerStrip />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Star className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>About {EVENT_CONFIG.name}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading tracking-tight text-gray-900 mb-4 sm:mb-6">
              About the Event
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              A one-day Google AI-centric event featuring a startup competition, hands-on workshops, and a product
              hackathon designed to empower the next generation of AI innovators.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">200+</div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">Attendees</div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">15+</div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">Previous Events</div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <Code className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">5+</div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">Workshops</div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">3+</div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">GDEs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights - 2026 Bento Grid Style with Custom Visuals */}
      <section id="highlights" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Event Ticker Strip */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <EventTickerStrip />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.015)_1px,transparent_0)] bg-[size:30px_30px] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md border border-slate-200/50 text-slate-800 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-sm">
              <Star className="w-4 h-4 text-purple-600 animate-pulse" />
              <span>Event Highlights</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading tracking-tight text-slate-900 mb-6">
              A Glimpse into the Future
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
              Experience Pakistan's most modern event registration and tech summit ecosystem with hands-on challenges and futuristic learning structures.
            </p>
          </div>

          {/* Asymmetric Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Bento Card 1: AI Hackathon (Span 2 Columns, Premium Custom Picture) */}
            <div className="md:col-span-2 bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-3xl overflow-hidden group hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.06)] flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">AI Hackathon</h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                  Build and deploy groundbreaking software products using Google Gemini API, Vertex AI, Firebase, and state-of-the-art tech stacks. Solve real-world issues in a high-intensity 8-hour sprint.
                </p>
              </div>
              
              {/* Card visual showcase */}
              <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden border-t border-slate-100 bg-slate-50">
                <Image 
                  src="/hackathon-card.png" 
                  alt="AI Hackathon console" 
                  fill 
                  className="object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-95"></div>
              </div>
            </div>

            {/* Bento Card 2: Startup Competition (Span 1 Column, Vertical Showcase) */}
            <div className="bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-3xl overflow-hidden group hover:border-pink-500/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(236,72,153,0.06)] flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-pink-500/10 rounded-xl">
                    <Trophy className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">Startup Pitch</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Pitch your tech startup idea to top Venture Capitalists and industry mentors. Compete for cash rewards and direct investment opportunities.
                </p>
              </div>

              {/* Card visual showcase */}
              <div className="relative w-full h-[180px] overflow-hidden border-t border-slate-100 bg-slate-50">
                <Image 
                  src="/startup-card.png" 
                  alt="Startup vision & growth" 
                  fill 
                  className="object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-95"></div>
              </div>
            </div>

            {/* Bento Card 3: Hands-on Workshops (Span 1 Column, Globe Showcase) */}
            <div className="bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-3xl overflow-hidden group hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(168,85,247,0.06)] flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">AI Workshops</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Hands-on developer labs conducted by Google Developer Experts. Learn how to train, fine-tune, and build scalable agentic AI systems.
                </p>
              </div>

              {/* Card visual showcase */}
              <div className="relative w-full h-[180px] overflow-hidden border-t border-slate-100 bg-slate-50">
                <Image 
                  src="/workshop-card.png" 
                  alt="Knowledge sphere workshop" 
                  fill 
                  className="object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-95"></div>
              </div>
            </div>

            {/* Bento Card 4: GDE Talks & Perks (Span 2 Columns, Stats & Details) */}
            <div className="md:col-span-2 bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-3xl p-6 sm:p-8 overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.06)] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">Expert Mentorship & Perks</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Direct networking sessions with Google Developer Experts, tech lead founders, and global leaders. All registered participants receive **Free Google Cloud Credits** to fuel their next-generation developments.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] sm:text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg">Free Cloud Credits</span>
                  <span className="text-[10px] sm:text-xs font-bold text-purple-700 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-lg">GDE Mentorship</span>
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">Food & Merch</span>
                </div>
              </div>

              {/* Dynamic stats mini card */}
              <div className="w-full sm:w-[180px] bg-white/90 border border-slate-200/60 rounded-2xl p-4 space-y-4 text-center sm:text-left shadow-sm">
                <div>
                  <div className="text-2xl font-extrabold text-slate-800">PKR 150K</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Total Prize Pool</div>
                </div>
                <div className="h-px bg-slate-200"></div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-800">Unlimited</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Google Cloud Credits</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200 rounded-full blur-2xl opacity-40 animate-float animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-30 animate-float animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <Trophy className="w-4 h-4" />
              <span>🏆 COMPETITION PRIZES</span>
            </div>
            <h2 className="text-6xl font-heading tracking-tight text-gray-900 mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Startup Competition
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Compete for <span className="font-bold text-yellow-600">amazing cash prizes</span> in our startup pitching competition
            </p>
          </div>

          {/* Prize Cards */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {/* 1st Place Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Winner Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-bl-2xl font-bold text-lg shadow-lg">
                  🏆 WINNER
                </div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <CardHeader className="text-center pb-8 pt-12">
                  {/* Animated Icon */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-ping"></div>
                  </div>
                  
                  <CardTitle className="text-4xl font-heading tracking-tight text-gray-900 mb-4">1st Place</CardTitle>
                  <div className="text-7xl font-display font-feature-numeric bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6 animate-pulse">
                    PKR 100K
                  </div>
                  <CardDescription className="text-lg text-gray-600 leading-relaxed">
                    Winner of the startup idea pitching competition gets the <span className="font-semibold text-yellow-600">grand prize</span> plus exclusive mentorship opportunities with industry experts
                  </CardDescription>
                  
                  {/* Additional Benefits */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Google Cloud Credits</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
                      <Users className="w-4 h-4" />
                      <span>Mentorship Program</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-purple-600">
                      <Rocket className="w-4 h-4" />
                      <span>Startup Incubation</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* 2nd Place Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
                {/* Runner-up Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-3 rounded-bl-2xl font-bold text-lg shadow-lg">
                  🥈 RUNNER-UP
                </div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <CardHeader className="text-center pb-8 pt-12">
                  {/* Animated Icon */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-300 rounded-full animate-ping"></div>
                  </div>
                  
                  <CardTitle className="text-4xl font-heading tracking-tight text-gray-900 mb-4">2nd Place</CardTitle>
                  <div className="text-7xl font-display font-feature-numeric bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent mb-6 animate-pulse">
                    PKR 50K
                  </div>
                  <CardDescription className="text-lg text-gray-600 leading-relaxed">
                    Runner-up receives <span className="font-semibold text-gray-600">substantial prize money</span> and access to our exclusive startup incubation program
                  </CardDescription>
                  
                  {/* Additional Benefits */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Google Cloud Credits</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
                      <Users className="w-4 h-4" />
                      <span>Networking Access</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-purple-600">
                      <Rocket className="w-4 h-4" />
                      <span>Mentorship Sessions</span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Additional Prizes Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-heading text-gray-900 mb-4">🎁 Additional Rewards</h3>
              <p className="text-lg text-gray-600">All participants receive exclusive benefits</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Google Cloud Credits</h4>
                <p className="text-sm text-gray-600">Free credits to build your projects</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Networking Access</h4>
                <p className="text-sm text-gray-600">Connect with industry leaders</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Certificates</h4>
                <p className="text-sm text-gray-600">Official participation certificates</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 px-4 sm:px-6 lg:px-8">
  <Button 
    onClick={handleRegistration} 
    className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold px-6 py-4 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 group text-base sm:text-lg md:text-xl"
  >
    <Rocket className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 mr-2 sm:mr-3 group-hover:animate-bounce" />
    Register for Competition
    <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform" />
  </Button>
</div>

        </div>
      </section>

      {/* Speakers & Mentors */}
      <section id="speakers" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-30 animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full blur-2xl opacity-40 animate-float animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30 animate-float animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <Users className="w-4 h-4" />
              <span>MEET OUR EXPERTS</span>
            </div>
            <h2 className="text-5xl font-heading tracking-tight text-gray-900 mb-6">
              Speakers & Mentors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry experts, Google Developer Experts, and AI pioneers who will share their knowledge and guide you through the future of technology
            </p>
          </div>

          {/* Keynote Speakers */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">🎤 Keynote Speakers</h3>
              <p className="text-lg text-gray-600">Leading voices in AI and technology</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Dr. Sarah Ahmed",
                  role: "Google Developer Expert",
                  company: "Google Cloud",
                  expertise: "AI/ML & Cloud",
                  color: "from-purple-500 to-pink-600",
                  emoji: "👩‍💻",
                  description: "Leading AI researcher with 10+ years in machine learning and cloud architecture. Former Google AI researcher with 50+ publications.",
                  keynote: "The Future of AI: From Research to Production"
                },
                {
                  name: "Ahmed Hassan",
                  role: "Senior AI Engineer",
                  company: "TechCorp Pakistan",
                  expertise: "Machine Learning",
                  color: "from-blue-500 to-cyan-600",
                  emoji: "👨‍💻",
                  description: "Expert in building scalable AI solutions and mentoring developers. Built AI systems used by 1M+ users worldwide.",
                  keynote: "Building Scalable AI Systems: Lessons from the Field"
                }
              ].map((speaker, index) => (
                <div key={`keynote-${index}`} className="group">
                                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden group-hover:scale-105">
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 mx-auto sm:mx-0">
                            <div className={`absolute inset-0 bg-gradient-to-r ${speaker.color} rounded-full blur-sm opacity-50`}></div>
                            <div className="relative rounded-full border-4 border-white shadow-lg w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center text-4xl sm:text-5xl">
                              {speaker.emoji}
                            </div>
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                            <Star className="w-3 h-3" />
                            <span>KEYNOTE SPEAKER</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                            {speaker.name}
                          </h3>
                          <p className="text-purple-600 font-semibold text-sm mb-1">
                            {speaker.role}
                          </p>
                          <p className="text-gray-500 text-sm mb-3">
                            {speaker.company}
                          </p>
                          <Badge className={`bg-gradient-to-r ${speaker.color} text-white border-0 px-3 py-1 text-xs font-semibold mb-3`}>
                            {speaker.expertise}
                          </Badge>
                          <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {speaker.description}
                          </p>
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                            <p className="text-sm font-semibold text-purple-800">
                              🎤 Keynote: <span className="font-normal">{speaker.keynote}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Speakers */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">👥 All Speakers & Mentors</h3>
            <p className="text-lg text-gray-600">Meet our complete lineup of experts</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                {
                  name: "Fatima Khan",
                  role: "Startup Mentor",
                  company: "Innovation Hub",
                  expertise: "Entrepreneurship",
                  color: "from-green-500 to-emerald-600",
                  emoji: "🚀",
                  description: "Successfully launched 5 AI startups and passionate about mentoring. Helped 100+ entrepreneurs scale their AI businesses."
                },
                {
                  name: "Usman Ali",
                  role: "Google Developer Expert",
                  company: "GDG Lahore",
                  expertise: "Flutter & AI",
                  color: "from-orange-500 to-red-600",
                  emoji: "📱",
                  description: "Flutter expert with deep knowledge of AI integration in mobile apps. Created 20+ AI-powered mobile applications."
                },
                {
                  name: "Ayesha Malik",
                  role: "AI Research Lead",
                  company: "AI Research Lab",
                  expertise: "Deep Learning",
                  color: "from-indigo-500 to-purple-600",
                  emoji: "🧠",
                  description: "PhD in Computer Science specializing in neural networks and AI ethics. Published 30+ papers on AI safety and fairness."
                },
                {
                  name: "Zain Rizvi",
                  role: "Tech Community Leader",
                  company: "GDG Cloud Lahore",
                  expertise: "Cloud & DevOps",
                  color: "from-teal-500 to-blue-600",
                  emoji: "☁️",
                  description: "Building the next generation of cloud-native AI applications. Led 50+ cloud migration projects for AI startups."
                },
                {
                  name: "Sana Javed",
                  role: "AI Product Manager",
                  company: "Microsoft",
                  expertise: "Product Strategy",
                  color: "from-pink-500 to-rose-600",
                  emoji: "💼",
                  description: "Product leader with expertise in AI product development. Launched 10+ AI products with 5M+ users."
                },
                {
                  name: "Omar Farooq",
                  role: "Data Science Lead",
                  company: "Netflix",
                  expertise: "Data Science",
                  color: "from-violet-500 to-purple-600",
                  emoji: "📊",
                  description: "Expert in recommendation systems and data analytics. Built AI systems that serve 200M+ users daily."
                },
                {
                  name: "Layla Hassan",
                  role: "AI Ethics Researcher",
                  company: "Stanford AI Lab",
                  expertise: "AI Ethics",
                  color: "from-amber-500 to-orange-600",
                  emoji: "⚖️",
                  description: "Leading researcher in AI ethics and responsible AI development. Advised 20+ companies on AI governance."
                }
            ].map((speaker, index) => (
              <div key={index} className="group">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden group-hover:scale-105">
                  <div className="p-6">
                    {/* Speaker Header */}
                    <div className="text-center mb-6">
                      <div className="relative w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <div className={`absolute inset-0 bg-gradient-to-r ${speaker.color} rounded-full blur-sm opacity-50`}></div>
                        <div className="relative rounded-full border-4 border-white shadow-lg w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center text-3xl">
                          {speaker.emoji}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {speaker.name}
                      </h3>
                      <p className="text-purple-600 font-semibold text-sm mb-1">
                        {speaker.role}
                      </p>
                      <p className="text-gray-500 text-sm mb-3">
                        {speaker.company}
                      </p>
                      <Badge className={`bg-gradient-to-r ${speaker.color} text-white border-0 px-3 py-1 text-xs font-semibold`}>
                        {speaker.expertise}
                      </Badge>
                    </div>

                    {/* Speaker Description */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {speaker.description}
                      </p>
                      
                      {/* Social Links */}
                      <div className="flex justify-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs hover:scale-110 transition-transform duration-200 cursor-pointer">
                          <Mail className="w-3 h-3" />
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs hover:scale-110 transition-transform duration-200 cursor-pointer">
                          <Users className="w-3 h-3" />
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs hover:scale-110 transition-transform duration-200 cursor-pointer">
                          <Star className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Learn from the Best?</h3>
              <p className="text-gray-600 mb-6">
                Our speakers and mentors are here to guide you through your AI journey. Don't miss this opportunity to learn from industry experts!
              </p>
              <Button
                onClick={handleRegistration}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group"
              >
                <Zap className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Schedule Section */}
      <section id="schedule" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
              <Clock className="w-4 h-4" />
              <span>Event Schedule</span>
            </div>
            <h2 className="text-5xl font-heading tracking-tight text-gray-900 mb-6">Full Day Schedule</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A comprehensive day of learning, building, and networking with the AI community</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Timeline Container */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
              
              {/* Schedule Items */}
              <div className="space-y-6">
                {[
                  { 
                    time: "9:00 AM", 
                    title: "🚀 Registration & Welcome Coffee", 
                    description: "Check-in, networking, and morning refreshments with the AI community",
                    type: "registration",
                    duration: "30 min",
                    icon: "👥",
                    color: "from-blue-500 to-blue-600"
                  },
                  { 
                    time: "9:30 AM", 
                    title: "🎯 Opening Ceremony & Keynote", 
                    description: "Welcome address and keynote on the future of AI development in Pakistan",
                    type: "keynote",
                    duration: "60 min",
                    icon: "🎤",
                    color: "from-purple-500 to-purple-600"
                  },
                  { 
                    time: "10:30 AM", 
                    title: "⚡ Google AI Workshop - Gemini API", 
                    description: "Hands-on session on building AI applications with Gemini API and Vertex AI",
                    type: "workshop",
                    duration: "90 min",
                    icon: "💻",
                    color: "from-green-500 to-green-600"
                  },
                  { 
                    time: "12:00 PM", 
                    title: "🍕 Lunch Break & Networking", 
                    description: "Networking session with fellow developers and industry experts",
                    type: "break",
                    duration: "60 min",
                    icon: "🍽️",
                    color: "from-yellow-500 to-yellow-600"
                  },
                  { 
                    time: "1:00 PM", 
                    title: "💻 AI Hackathon Begins", 
                    description: "Start building innovative AI products using Google technologies - Build the future!",
                    type: "hackathon",
                    duration: "180 min",
                    icon: "🚀",
                    color: "from-indigo-500 to-indigo-600"
                  },
                  { 
                    time: "2:00 PM", 
                    title: "🏆 Startup Competition Pitches", 
                    description: "Watch innovative startup ideas compete for PKR 100K & PKR 50K prizes",
                    type: "competition",
                    duration: "120 min",
                    icon: "🏅",
                    color: "from-red-500 to-red-600"
                  },
                  { 
                    time: "4:00 PM", 
                    title: "🌟 GDE Talks & Mentorship Sessions", 
                    description: "Learn from Google Developer Experts and industry leaders",
                    type: "talk",
                    duration: "90 min",
                    icon: "👨‍🏫",
                    color: "from-pink-500 to-pink-600"
                  },
                  { 
                    time: "5:30 PM", 
                    title: "🎤 Hackathon Presentations", 
                    description: "Teams present their AI solutions and prototypes to judges",
                    type: "presentation",
                    duration: "60 min",
                    icon: "📊",
                    color: "from-orange-500 to-orange-600"
                  },
                  { 
                    time: "6:30 PM", 
                    title: "🏅 Awards Ceremony & Closing", 
                    description: "Announcement of winners and closing remarks with networking",
                    type: "ceremony",
                    duration: "30 min",
                    icon: "🏆",
                    color: "from-emerald-500 to-emerald-600"
                  },
              ].map((item, index) => (
                  <div key={index} className="relative group">
                    {/* Timeline Dot */}
                    <div className={`absolute left-6 w-3 h-3 bg-gradient-to-r ${item.color} rounded-full shadow-md transform -translate-x-1.5 group-hover:scale-110 transition-all duration-300 z-10`}></div>
                    
                    {/* Content Card */}
                    <div className="ml-12 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group-hover:scale-[1.01]">
                      <div className="p-5">
                        <div className="flex items-start space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-lg shadow-md flex-shrink-0`}>
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg font-bold text-gray-900">{item.time}</span>
                              <Badge className={`bg-gradient-to-r ${item.color} text-white border-0 px-2 py-0.5 text-xs font-semibold`}>
                                {item.type.toUpperCase()}
                              </Badge>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                                {item.duration}
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                            
                            {/* Additional Info - Compact */}
                            <div className="flex items-center space-x-3 mt-3 pt-2 border-t border-gray-50">
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span className="font-medium">{item.duration}</span>
                              </div>
                              {item.type === "workshop" && (
                                <div className="flex items-center space-x-1 text-xs text-green-600">
                                  <Code className="w-3 h-3" />
                                  <span className="font-medium">Hands-on</span>
                                </div>
                              )}
                              {item.type === "competition" && (
                                <div className="flex items-center space-x-1 text-xs text-yellow-600">
                                  <Trophy className="w-3 h-3" />
                                  <span className="font-medium">PKR 150K</span>
                                </div>
                              )}
                              {item.type === "hackathon" && (
                                <div className="flex items-center space-x-1 text-xs text-blue-600">
                                  <Users className="w-3 h-3" />
                                  <span className="font-medium">Teams</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              ))}
              </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience the Future of AI?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Join us for an unforgettable day of learning, building, and networking with Pakistan's AI community. 
                  Don't miss out on this opportunity to shape the future of technology!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setShowScheduleModal(true)}
                size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group"
              >
                    <Clock className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                View Detailed Schedule
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </Button>
                  <Button
                    onClick={handleRegistration}
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-bold px-8 py-4 rounded-xl transition-all duration-300"
                  >
                    <Zap className="w-6 h-6 mr-3 animate-pulse" />
                    Register Now
              </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Sponsors & Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading tracking-tight text-gray-900 mb-6">Sponsors & Partners</h2>
            <p className="text-xl text-gray-600">Supported by leading tech organizations</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
            <div className="bg-gray-100 p-8 rounded-lg w-full h-24 flex items-center justify-center">
              <span className="text-gray-600 font-medium">GDG Lahore</span>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg w-full h-24 flex items-center justify-center">
              <span className="text-gray-600 font-medium">GDG Cloud Lahore</span>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg w-full h-24 flex items-center justify-center">
              <Image src="/placeholder-logo.svg" alt="NFC-IET" width={80} height={40} className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-40 animate-float animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-30 animate-float animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <Target className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-5xl font-heading tracking-tight text-gray-900 mb-6">
              Got Questions?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about {`${EVENT_CONFIG.name} ${EVENT_CONFIG.year}`}
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {[
              {
                question: `What is ${EVENT_CONFIG.name} ${EVENT_CONFIG.year}?`,
                answer: `${EVENT_CONFIG.name} is Pakistan's biggest AI event featuring workshops, hackathons, startup competitions, and networking opportunities. It's a comprehensive day of learning, building, and connecting with the AI community.`,
                icon: "🎯"
              },
              {
                question: "Who can participate in the event?",
                answer: "The event is open to students, developers, entrepreneurs, and anyone interested in AI/ML. Whether you're a beginner or expert, there's something for everyone!",
                icon: "👥"
              },
              {
                question: "Is the event free to attend?",
                answer: `Yes! ${EVENT_CONFIG.name} ${EVENT_CONFIG.year} is completely free to attend. However, registration is required due to limited seating capacity.`,
                icon: "💰"
              },
              {
                question: "What should I bring to the event?",
                answer: "Bring your laptop, charger, and enthusiasm! We'll provide all the necessary tools and resources for workshops and hackathons.",
                icon: "💻"
              },
              {
                question: "Can I participate in the hackathon as a team?",
                answer: "Absolutely! You can participate individually or form teams of 2-4 members. Team collaboration is encouraged and can enhance your chances of winning.",
                icon: "🤝"
              },
              {
                question: "What are the prizes for the competitions?",
                answer: "The startup competition offers PKR 100K for 1st place and PKR 50K for 2nd place. All participants receive Google Cloud credits, certificates, and networking opportunities.",
                icon: "🏆"
              },
              {
                question: "Will there be food and refreshments?",
                answer: "Yes! We'll provide lunch, coffee, and refreshments throughout the day. It's a great opportunity to network while enjoying good food.",
                icon: "🍕"
              },
              {
                question: "What if I'm new to AI/ML?",
                answer: "Perfect! We have beginner-friendly workshops and mentors to help you get started. The event is designed to be inclusive for all skill levels.",
                icon: "🚀"
              },
              {
                question: "How can I stay updated about the event?",
                answer: "Follow our social media channels and join our WhatsApp group for the latest updates, speaker announcements, and event details.",
                icon: "📱"
              }
            ].map((faq, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                  <button 
                    className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-xl"
                    onClick={() => {
                      const content = document.getElementById(`faq-content-${index}`)
                      const icon = document.getElementById(`faq-icon-${index}`)
                      if (content && icon) {
                        content.classList.toggle('hidden')
                        icon.classList.toggle('rotate-180')
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-lg shadow-md flex-shrink-0">
                        {faq.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        <ChevronDown 
                          id={`faq-icon-${index}`}
                          className="w-5 h-5 text-gray-400 transition-transform duration-300" 
                        />
                      </div>
                    </div>
                  </button>
                  
                  <div 
                    id={`faq-content-${index}`}
                    className="hidden px-4 pb-4 border-t border-gray-50"
                  >
                    <div className="pt-3">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Reach out to our team and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
  href="mailto:{EVENT_CONFIG.email}"
  className="inline-block"
>
  <Button
    size="lg"
    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group text-base sm:text-lg"
  >
    <Mail className="w-5 h-5 mr-2 sm:mr-3" />
    Contact Us
    <ArrowRight className="w-5 h-5 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform" />
  </Button>
</a>

<a
  href="https://chat.whatsapp.com/KjhcYpc8ZoI777OxE4REOz?mode=ac_t"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block"
>
  <Button
    size="lg"
    variant="outline"
    className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-bold px-8 py-4 rounded-xl transition-all duration-300"
  >
    <Users className="w-5 h-5 mr-3" />
    Join WhatsApp Group
  </Button>
</a>

              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced Aesthetic Footer */}
      <footer className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px] opacity-30"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500 rounded-full blur-2xl opacity-30 animate-float animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-500 rounded-full blur-3xl opacity-20 animate-float animation-delay-4000"></div>
        </div>

        {/* Event Ticker Strip */}
        <div className="relative z-10">
          <EventTickerStrip />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Image src="/placeholder-logo.svg" alt={EVENT_CONFIG.organizer} width={32} height={32} className="rounded-lg" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{EVENT_CONFIG.organizer}</h3>
                  <p className="text-blue-200 text-sm">Google Developer Groups on Campus</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Empowering students with cutting-edge technology knowledge and fostering innovation in the AI community.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200 cursor-pointer">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200 cursor-pointer">
                  <Users className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200 cursor-pointer">
                  <Star className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                    About Event
                  </a>
                </li>
                <li>
                  <a href="#schedule" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                    Event Schedule
                  </a>
                </li>
                <li>
                  <a href="#speakers" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                    Speakers & Mentors
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Event Highlights */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Event Highlights</h4>
              <ul className="space-y-3">
                <li className="text-gray-300 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  AI Workshops
                </li>
                <li className="text-gray-300 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Hackathon
                </li>
                <li className="text-gray-300 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Startup Competition
                </li>
                <li className="text-gray-300 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Networking
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Mail className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">{EVENT_CONFIG.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Phone className="w-3 h-3 text-white" />
                  </div>
                  <div>
  <p className="text-sm text-gray-400">Phone</p>
  <a
    href="https://chat.whatsapp.com/KjhcYpc8ZoI777OxE4REOz?mode=ac_t"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white underline hover:text-green-400 transition"
  >
    Join WhatsApp Group
  </a>
</div>

                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">NFC-IET</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h2 className="text-4xl font-heading tracking-tight text-white mb-6">
                Ready to Build the Future with AI?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join us for an unforgettable day of learning, building, and networking with the AI community. 
                Don't miss this opportunity to shape the future of technology!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={handleRegistration}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <Zap className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                  Register Now - It's Free!
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button
                  onClick={() => setShowScheduleModal(true)}
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-all duration-300"
                >
                  <Clock className="w-5 h-5 mr-3" />
                  View Schedule
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 {EVENT_CONFIG.organizer}. All rights reserved. | {`${EVENT_CONFIG.name} ${EVENT_CONFIG.year}`}
              </div>
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors duration-200">Code of Conduct</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Schedule Modal */}
      <ScheduleModal 
        isOpen={showScheduleModal} 
        onClose={() => setShowScheduleModal(false)}
        onGoHome={() => {
          setShowScheduleModal(false)
          window.location.href = '/'
        }}
      />
    </div>
  )
}
