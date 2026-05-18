"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap, Rocket, Star, Trophy } from "lucide-react"
import { EVENT_CONFIG } from "@/lib/config"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set target date: August 21, 2026
    const targetDate = new Date("2026-08-21T09:00:00").getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    setIsVisible(true)

    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const TimeUnit = ({ value, label, icon, iconColor }: { value: number; label: string; icon: React.ReactNode; iconColor: string }) => (
    <div className="relative group">
      <div className="relative bg-white border border-slate-200/60 rounded-2xl p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.06)] transform transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className={`w-8 h-8 ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
        </div>
        
        {/* Time value */}
        <div className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2 font-mono tracking-tight">
          {value.toString().padStart(2, "0")}
        </div>
        
        {/* Label */}
        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
          {label}
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="bg-white/90 border border-slate-200/60 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden">
        <CardContent className="p-8 sm:p-10">
          {/* Enhanced Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl lg:flex hidden items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
                 Event Starts In
              </h3>
              <div className="w-12 h-12 bg-purple-50 border border-purple-100 rounded-xl lg:flex hidden items-center justify-center">
                <Rocket className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            
            <div className="lg:flex hidden items-center justify-center space-x-6 mb-4">
              <div className="flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
                <Star className="w-4 h-4 text-blue-600 animate-pulse" />
                <span>Pakistan's Premier Tech Summit</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 border border-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold">
                <Trophy className="w-4 h-4 text-purple-600" />
                <span>{EVENT_CONFIG.prizes}</span>
              </div>
            </div>
            
            <p className="text-slate-600 text-lg font-medium max-w-2xl mx-auto">
              ⚡ Join Pakistan's premier tech summit and innovation challenge!
            </p>
          </div>

          {/* Enhanced Countdown Grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <TimeUnit 
              value={timeLeft.days} 
              label="Days" 
              iconColor="text-blue-500"
              icon={<Clock className="w-6 h-6" />}
            />
            <TimeUnit 
              value={timeLeft.hours} 
              label="Hours" 
              iconColor="text-purple-500"
              icon={<Zap className="w-6 h-6" />}
            />
            <TimeUnit 
              value={timeLeft.minutes} 
              label="Minutes" 
              iconColor="text-pink-500"
              icon={<Star className="w-6 h-6" />}
            />
            <TimeUnit 
              value={timeLeft.seconds} 
              label="Seconds" 
              iconColor="text-orange-500"
              icon={<Rocket className="w-6 h-6" />}
            />
          </div>

          {/* Enhanced Footer */}
          <div className="text-center mt-10">
            <div className="lg:flex hidden flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <Badge className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 px-6 py-2.5 text-sm font-bold rounded-full shadow-sm">
                <Rocket className="w-4 h-4 mr-2 text-blue-600" />
                 Early Bird Registration Open
              </Badge>
              <Badge className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-100 px-6 py-2.5 text-sm font-bold rounded-full shadow-sm">
                <Trophy className="w-4 h-4 mr-2 text-purple-600" />
                 Limited Seats Available
              </Badge>
            </div>
            
            <div className="mt-6 text-slate-500 text-sm">
              <p>⚡ Don't miss out on Pakistan's most exciting tech summit of 2026!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}