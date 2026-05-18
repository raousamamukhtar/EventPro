"use client"

import { useEffect, useState } from "react"
import { Trophy, Users, Code, Zap, Star, Rocket, Award } from "lucide-react"
import { EVENT_CONFIG } from "@/lib/config"

interface TickerItem {
  id: number
  text: string
  icon: React.ReactNode
  color: string
}

const tickerItems: TickerItem[] = [
  {
    id: 0,
    text: `🎉 Welcome to ${EVENT_CONFIG.name}`,
    icon: <Zap className="w-4 h-4" />,
    color: "text-amber-600"
  },
  {
    id: 1,
    text: "🚀 Pakistan's Biggest Tech Event",
    icon: <Rocket className="w-4 h-4" />,
    color: "text-blue-600"
  },
  {
    id: 2,
    text: "🏆 PKR 150K Prize Pool",
    icon: <Trophy className="w-4 h-4" />,
    color: "text-amber-600"
  },
  {
    id: 3,
    text: `⚡ Hands-on Workshops`,
    icon: <Code className="w-4 h-4" />,
    color: "text-green-600"
  },
  {
    id: 4,
    text: "🌟 200+ Attendees Expected",
    icon: <Users className="w-4 h-4" />,
    color: "text-purple-600"
  },
  {
    id: 5,
    text: "💻 Code Hackathon Competition",
    icon: <Code className="w-4 h-4" />,
    color: "text-pink-600"
  },
  {
    id: 6,
    text: "🎯 Free Registration",
    icon: <Star className="w-4 h-4" />,
    color: "text-orange-600"
  },
  {
    id: 7,
    text: "🏅 Industry Expert Speakers",
    icon: <Award className="w-4 h-4" />,
    color: "text-indigo-600"
  },
  {
    id: 8,
    text: "🔥 Cutting-Edge Tech Stacks",
    icon: <Star className="w-4 h-4" />,
    color: "text-red-600"
  },
  {
    id: 9,
    text: "🚀 Next-Gen Web Development",
    icon: <Rocket className="w-4 h-4" />,
    color: "text-cyan-600"
  },
  {
    id: 10,
    text: "💎 Direct Mentorship Sessions",
    icon: <Star className="w-4 h-4" />,
    color: "text-emerald-600"
  }
]

export function EventTicker() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative overflow-hidden bg-slate-50 border-y border-slate-200/50 py-3 shadow-sm">
      {/* Bottom Ticker (Reverse Direction) */}
      <div className={`flex items-center space-x-8 animate-scroll-right ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-500`}>
        {[...tickerItems.reverse(), ...tickerItems.reverse()].map((item, index) => (
          <div key={`bottom-${index}`} className="flex items-center space-x-3 whitespace-nowrap">
            <div className={`${item.color} animate-pulse`}>
              {item.icon}
            </div>
            <span className="text-slate-700 font-semibold text-sm md:text-base">
              {item.text}
            </span>
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-ping"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function EventTickerStrip() {
  return (
    <div className="relative bg-slate-100/80 backdrop-blur-md border-y border-slate-200/40 py-3.5 overflow-hidden shadow-sm">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="lg:flex hidden items-center justify-center space-x-8 animate-pulse">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-slate-600 font-semibold text-xs uppercase tracking-wider">{EVENT_CONFIG.name.toUpperCase()}</span>
        </div>
        <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="text-slate-600 font-semibold text-xs uppercase tracking-wider">{EVENT_CONFIG.prizes.toUpperCase()}</span>
        </div>
        <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-indigo-500" />
          <span className="text-slate-600 font-semibold text-xs uppercase tracking-wider">{EVENT_CONFIG.attendees.toUpperCase()}</span>
        </div>
        <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-emerald-500" />
          <span className="text-slate-600 font-semibold text-xs uppercase tracking-wider">TECH & INNOVATION WORKSHOPS</span>
        </div>
        <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Rocket className="w-4 h-4 text-blue-500" />
          <span className="text-slate-600 font-semibold text-xs uppercase tracking-wider">{EVENT_CONFIG.date.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}