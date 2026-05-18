"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Clock, MapPin, Users, Code, Trophy, Zap, Coffee, Presentation, Award, Sparkles, Target, Rocket, Star, Home } from "lucide-react"

interface ScheduleItem {
  time: string
  title: string
  description: string
  type: "registration" | "keynote" | "workshop" | "break" | "hackathon" | "competition" | "talk" | "presentation" | "ceremony"
  duration: string
  location?: string
  speaker?: string
  highlight?: boolean
}

const scheduleData: ScheduleItem[] = [
  {
    time: "9:00 AM",
    title: "🚀 Registration & Welcome Coffee",
    description: "Check-in, networking, and morning refreshments with the AI community",
    type: "registration",
    duration: "30 min",
    location: "Main Hall",
    highlight: true
  },
  {
    time: "9:30 AM",
    title: "🎯 Opening Ceremony & Keynote",
    description: "Welcome address and keynote on the future of AI development in Pakistan",
    type: "keynote",
    duration: "60 min",
    location: "Main Auditorium",
    speaker: "Dr. Sarah Ahmed - Google AI",
    highlight: true
  },
  {
    time: "10:30 AM",
    title: "⚡ Google AI Workshop - Gemini API",
    description: "Hands-on session on building AI applications with Gemini API and Vertex AI",
    type: "workshop",
    duration: "90 min",
    location: "Workshop Room A",
    speaker: "Ahmed Khan - Google Developer Expert",
    highlight: true
  },
  {
    time: "12:00 PM",
    title: "🍕 Lunch Break & Networking",
    description: "Networking session with fellow developers and industry experts",
    type: "break",
    duration: "60 min",
    location: "Dining Hall"
  },
  {
    time: "1:00 PM",
    title: "💻 AI Hackathon Begins",
    description: "Start building innovative AI products using Google technologies - Build the future!",
    type: "hackathon",
    duration: "180 min",
    location: "Innovation Lab",
    highlight: true
  },
  {
    time: "2:00 PM",
    title: "🏆 Startup Competition Pitches",
    description: "Watch innovative startup ideas compete for PKR 100K & PKR 50K prizes",
    type: "competition",
    duration: "120 min",
    location: "Main Auditorium",
    highlight: true
  },
  {
    time: "4:00 PM",
    title: "🌟 GDE Talks & Mentorship Sessions",
    description: "Learn from Google Developer Experts and industry leaders",
    type: "talk",
    duration: "90 min",
    location: "Conference Rooms"
  },
  {
    time: "5:30 PM",
    title: "🎤 Hackathon Presentations",
    description: "Teams present their AI solutions and prototypes to judges",
    type: "presentation",
    duration: "60 min",
    location: "Main Auditorium",
    highlight: true
  },
  {
    time: "6:30 PM",
    title: "🏅 Awards Ceremony & Closing",
    description: "Announcement of winners and closing remarks with networking",
    type: "ceremony",
    duration: "30 min",
    location: "Main Auditorium",
    highlight: true
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "registration":
      return <Users className="w-5 h-5" />
    case "keynote":
      return <Presentation className="w-5 h-5" />
    case "workshop":
      return <Code className="w-5 h-5" />
    case "break":
      return <Coffee className="w-5 h-5" />
    case "hackathon":
      return <Code className="w-5 h-5" />
    case "competition":
      return <Trophy className="w-5 h-5" />
    case "talk":
      return <Users className="w-5 h-5" />
    case "presentation":
      return <Presentation className="w-5 h-5" />
    case "ceremony":
      return <Award className="w-5 h-5" />
    default:
      return <Clock className="w-5 h-5" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "registration":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "keynote":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "workshop":
      return "bg-green-100 text-green-800 border-green-200"
    case "break":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "hackathon":
      return "bg-indigo-100 text-indigo-800 border-indigo-200"
    case "competition":
      return "bg-red-100 text-red-800 border-red-200"
    case "talk":
      return "bg-pink-100 text-pink-800 border-pink-200"
    case "presentation":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "ceremony":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  onGoHome?: () => void
}

export function ScheduleModal({ isOpen, onClose, onGoHome }: ScheduleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-300">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200/50 animate-in slide-in-from-bottom-4 duration-300"
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Enhanced Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">Event Schedule</h2>
                  <p className="text-sm sm:text-base lg:text-xl text-gray-600">August 21, 2026 • NFC-IET</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500 bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-xl">
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  <span className="font-medium">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                  <span className="font-medium">Main Campus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  <span className="font-medium">200+ Attendees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                  <span className="font-medium">PKR 150K Prizes</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 self-start sm:self-auto">
              {/* Desktop Home Button */}
              {onGoHome && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onGoHome}
                  className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-gray-300 hover:border-blue-300 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  <Home className="w-4 h-4" />
                  <span className="font-medium">Home</span>
                </Button>
              )}
              
              {/* Mobile Home Button */}
              {onGoHome && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onGoHome}
                  className="sm:hidden text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full p-2 transition-all duration-200"
                >
                  <Home className="w-5 h-5" />
                </Button>
              )}
              
              {/* Enhanced Close Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="text-gray-700 hover:text-red-600 hover:bg-red-50 border-gray-300 hover:border-red-300 px-3 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <X className="w-4 h-4 mr-2" />
                <span className="font-medium hidden sm:inline">Close</span>
              </Button>
            </div>
          </div>

          {/* Enhanced Schedule Timeline */}
          <div className="space-y-3 sm:space-y-4">
            {scheduleData.map((item, index) => (
              <Card 
                key={index} 
                className={`border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                  item.highlight 
                    ? 'border-blue-200 bg-gradient-to-r from-blue-50/50 to-purple-50/50 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    {/* Enhanced Time and Icon */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-center space-x-3 sm:space-x-0 sm:space-y-2 min-w-[80px] sm:min-w-[100px]">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg ${
                        item.highlight 
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse' 
                          : 'bg-gradient-to-br from-gray-500 to-gray-600'
                      }`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="text-center sm:text-center">
                        <div className="font-bold text-gray-900 text-xs sm:text-sm">{item.time}</div>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.duration}</div>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-3 space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <h3 className={`text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 ${item.highlight ? 'text-blue-900' : ''}`}>
                            {item.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 mb-3 leading-relaxed">{item.description}</p>
                        </div>
                        <Badge className={`${getTypeColor(item.type)} font-semibold text-xs px-2 sm:px-3 py-1 self-start sm:self-auto`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </Badge>
                      </div>

                      {/* Enhanced Additional Info */}
                      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                        {item.location && (
                          <div className="flex items-center space-x-2 bg-white/80 px-2 sm:px-3 py-1 rounded-full border">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                            <span className="font-medium">{item.location}</span>
                          </div>
                        )}
                        {item.speaker && (
                          <div className="flex items-center space-x-2 bg-white/80 px-2 sm:px-3 py-1 rounded-full border">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                            <span className="font-medium">{item.speaker}</span>
                          </div>
                        )}
                        {item.highlight && (
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-2 sm:px-3 py-1 rounded-full border border-blue-200">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                            <span className="font-medium text-blue-800">Featured Session</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Footer */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-blue-200">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">9</div>
                <div className="text-xs sm:text-sm text-blue-600 font-semibold">Sessions</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-purple-200">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">8</div>
                <div className="text-xs sm:text-sm text-purple-600 font-semibold">Hours</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-green-200">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-1 sm:mb-2">200+</div>
                <div className="text-xs sm:text-sm text-green-600 font-semibold">Attendees</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-yellow-200">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600 mb-1 sm:mb-2">PKR 150K</div>
                <div className="text-xs sm:text-sm text-yellow-600 font-semibold">Total Prizes</div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-2">
                🚀 Ready to join the innovation summit? Register now and be part of Pakistan's premier tech event!
              </p>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-white" />
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 