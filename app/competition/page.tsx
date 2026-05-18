"use client"

import { EVENT_CONFIG } from "@/lib/config"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Code, 
  Zap, 
  Clock, 
  Mail, 
  Phone, 
  Award, 
  Star, 
  ArrowRight, 
  Sparkles, 
  Target, 
  Rocket, 
  CheckCircle,
  ArrowLeft,
  Home,
  DollarSign,
  Lightbulb,
  TrendingUp,
  Globe,
  Shield,
  BookOpen,
  Users2,
  Presentation,
  Mic,
  Timer,
  Gift
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function StartupCompetitionPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 space-y-4 sm:space-y-0">
            <Link href="/" className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base">Back to Home</span>
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs sm:text-sm">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                PKR 150K Prizes
              </Badge>
              <Badge variant="outline" className="border-green-500 text-green-600 text-xs sm:text-sm">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {EVENT_CONFIG.date}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 animate-pulse">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>STARTUP COMPETITION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading tracking-tight text-gray-900 mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Startup Competition
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4 mb-8">
            Pitch your innovative AI startup idea and compete for prizes worth <span className="font-bold text-yellow-600">PKR 150,000</span>. 
            Get mentorship from industry experts and launch your startup journey!
          </p>
          
          {/* Prize Highlight */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-6 sm:p-8 border border-yellow-200 max-w-4xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-600 mb-2">🏆</div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">PKR 100,000</div>
                <div className="text-sm sm:text-base text-gray-600">1st Prize</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-600 mb-2">🥈</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">PKR 50,000</div>
                <div className="text-sm sm:text-base text-gray-600">2nd Prize</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-600 mb-2">🎁</div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Mentorship</div>
                <div className="text-sm sm:text-base text-gray-600">+ Resources</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {[
            { id: "overview", label: "Overview", icon: Target },
            { id: "prizes", label: "Prizes", icon: Trophy },
            { id: "rules", label: "Rules", icon: BookOpen },
            { id: "timeline", label: "Timeline", icon: Clock },
            { id: "mentors", label: "Mentors", icon: Users2 },
            { id: "register", label: "Register", icon: Rocket }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg transform scale-105"
                  : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
              }`}
            >
              <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8 sm:space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl">Innovation Challenge</CardTitle>
                    </div>
                    <CardDescription className="text-base sm:text-lg">
                      Present your groundbreaking AI startup idea that solves real-world problems. 
                      Focus on innovation, market potential, and technical feasibility.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm sm:text-base">AI/ML focused solutions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm sm:text-base">Market validation required</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm sm:text-base">Scalable business model</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Presentation className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl">Pitch Competition</CardTitle>
                    </div>
                    <CardDescription className="text-base sm:text-lg">
                      Deliver a compelling 5-minute pitch to a panel of industry experts, 
                      investors, and Google Developer Experts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Timer className="w-5 h-5 text-blue-500" />
                      <span className="text-sm sm:text-base">5-minute presentation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mic className="w-5 h-5 text-blue-500" />
                      <span className="text-sm sm:text-base">Q&A session included</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="text-sm sm:text-base">Expert panel judges</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Benefits */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-6 sm:p-8 border border-yellow-200">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                  Why Participate?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: DollarSign, title: "Cash Prizes", desc: "Win up to PKR 100,000" },
                    { icon: Users2, title: "Mentorship", desc: "Get guidance from experts" },
                    { icon: TrendingUp, title: "Networking", desc: "Connect with investors" },
                    { icon: Globe, title: "Exposure", desc: "Showcase to tech community" },
                    { icon: Shield, title: "Resources", desc: "Access to tools & platforms" },
                    { icon: Rocket, title: "Launch", desc: "Start your startup journey" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/80 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <benefit.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Prizes Tab */}
          {activeTab === "prizes" && (
            <div className="space-y-8 sm:space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 1st Prize */}
                <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-bl-2xl font-bold text-lg shadow-lg">
                    🏆 WINNER
                  </div>
                  
                  <CardHeader className="text-center pb-4">
                    <div className="relative w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-ping"></div>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-600 mb-4">
                      PKR 100,000
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">1st Place Prize</h3>
                    <CardDescription className="text-lg text-gray-600 leading-relaxed">
                      Winner of the startup idea pitching competition gets the <span className="font-semibold text-yellow-600">grand prize</span> plus exclusive mentorship opportunities with industry experts
                    </CardDescription>
                    
                    {/* Additional Benefits */}
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-center space-x-3">
                        <Users2 className="w-5 h-5 text-blue-600" />
                        <span className="text-sm sm:text-base font-medium">1-on-1 Mentorship Sessions</span>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <Globe className="w-5 h-5 text-green-600" />
                        <span className="text-sm sm:text-base font-medium">Global Exposure</span>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <Rocket className="w-5 h-5 text-purple-600" />
                        <span className="text-sm sm:text-base font-medium">Startup Incubation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 2nd Prize */}
                <Card className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-3 rounded-bl-2xl font-bold text-lg shadow-lg">
                    🥈 RUNNER-UP
                  </div>
                  
                  <CardHeader className="text-center pb-4">
                    <div className="relative w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-300 rounded-full animate-ping"></div>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600 mb-4">
                      PKR 50,000
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">2nd Place Prize</h3>
                    <CardDescription className="text-lg text-gray-600 leading-relaxed">
                      Runner-up receives <span className="font-semibold text-gray-600">substantial prize money</span> and access to our exclusive startup incubation program
                    </CardDescription>
                    
                    {/* Additional Benefits */}
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-center space-x-3">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <span className="text-sm sm:text-base font-medium">Learning Resources</span>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <Users2 className="w-5 h-5 text-green-600" />
                        <span className="text-sm sm:text-base font-medium">Community Access</span>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <span className="text-sm sm:text-base font-medium">Growth Support</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Rewards */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 sm:p-8 border border-purple-200">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                  Additional Rewards for All Participants
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Gift, title: "Swag Kit", desc: "Exclusive event merchandise" },
                    { icon: BookOpen, title: "Learning Credits", desc: "Access to premium courses" },
                    { icon: Users, title: "Network Access", desc: "Connect with 200+ attendees" },
                    { icon: Globe, title: "Global Recognition", desc: "Featured on our platforms" },
                    { icon: Shield, title: "Legal Support", desc: "Startup legal consultation" },
                    { icon: Rocket, title: "Launch Support", desc: "Technical implementation help" }
                  ].map((reward, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white/80 rounded-xl hover:shadow-lg transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <reward.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{reward.title}</h4>
                        <p className="text-sm text-gray-600">{reward.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Rules Tab */}
          {activeTab === "rules" && (
            <div className="space-y-8 sm:space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl">Eligibility</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">Open to all students and professionals</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">Teams of 1-4 members allowed</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">Must be original ideas (no existing startups)</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">AI/ML focus required</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Timer className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl">Presentation Rules</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">5-minute pitch presentation</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">3-minute Q&A session</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">Slides or demo required</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base">English presentation preferred</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Judging Criteria */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 sm:p-8 border border-blue-200">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                  Judging Criteria
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: Lightbulb, title: "Innovation", desc: "Originality & creativity", color: "from-yellow-500 to-orange-600" },
                    { icon: TrendingUp, title: "Market Potential", desc: "Business viability", color: "from-green-500 to-blue-600" },
                    { icon: Code, title: "Technical Feasibility", desc: "Implementation possibility", color: "from-purple-500 to-pink-600" },
                    { icon: Presentation, title: "Presentation", desc: "Communication skills", color: "from-red-500 to-pink-600" }
                  ].map((criteria, index) => (
                    <div key={index} className="text-center p-4 bg-white/80 rounded-xl">
                      <div className={`w-12 h-12 bg-gradient-to-r ${criteria.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <criteria.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{criteria.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{criteria.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="space-y-8 sm:space-y-12">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500 rounded-full"></div>
                
                {/* Timeline Items */}
                <div className="space-y-8">
                  {[
                    { time: "9:00 AM", title: "Registration & Check-in", desc: "Arrive early to register and get your competition materials", icon: "📝" },
                    { time: "10:00 AM", title: "Opening Ceremony", desc: "Welcome address and competition overview", icon: "🎤" },
                    { time: "11:00 AM", title: "Pitch Presentations", desc: "Teams present their startup ideas (5 min each)", icon: "💼" },
                    { time: "2:00 PM", title: "Q&A Sessions", desc: "Judges ask questions to each team", icon: "❓" },
                    { time: "4:00 PM", title: "Judging Deliberation", desc: "Expert panel evaluates all presentations", icon: "⚖️" },
                    { time: "5:00 PM", title: "Awards Ceremony", desc: "Announcement of winners and prize distribution", icon: "🏆" }
                  ].map((item, index) => (
                    <div key={index} className="relative flex items-start space-x-4 sm:space-x-8">
                      {/* Timeline Dot */}
                      <div className="relative z-10 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <div className="text-lg sm:text-xl font-bold text-gray-900">{item.title}</div>
                            <div className="text-sm sm:text-base text-yellow-600 font-semibold">{item.time}</div>
                          </div>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mentors Tab */}
          {activeTab === "mentors" && (
            <div className="space-y-8 sm:space-y-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Meet Your Mentors
                </h3>
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                  Get guidance from industry experts, successful entrepreneurs, and Google Developer Experts
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[
                  { name: "Ahmed Khan", role: "Startup Founder", company: "TechCorp Pakistan", expertise: "AI/ML", image: "👨‍💼", color: "from-blue-500 to-purple-600" },
                  { name: "Fatima Ali", role: "Google Developer Expert", company: "Google Cloud", expertise: "Cloud & AI", image: "👩‍💻", color: "from-green-500 to-blue-600" },
                  { name: "Usman Hassan", role: "Angel Investor", company: "Innovation Capital", expertise: "Investment", image: "👨‍💼", color: "from-purple-500 to-pink-600" },
                  { name: "Ayesha Malik", role: "AI Research Lead", company: "AI Research Lab", expertise: "Deep Learning", image: "👩‍🔬", color: "from-orange-500 to-red-600" },
                  { name: "Zain Rizvi", role: "Product Manager", company: "Tech Startup", expertise: "Product Strategy", image: "👨‍🚀", color: "from-teal-500 to-blue-600" },
                  { name: "Sara Ahmed", role: "Business Development", company: "Growth Partners", expertise: "Market Strategy", image: "👩‍💼", color: "from-indigo-500 to-purple-600" }
                ].map((mentor, index) => (
                  <Card key={index} className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <CardHeader className="text-center">
                      <div className={`w-20 h-20 bg-gradient-to-r ${mentor.color} rounded-full flex items-center justify-center text-3xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {mentor.image}
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">{mentor.name}</CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        <div className="font-semibold text-purple-600">{mentor.role}</div>
                        <div className="text-gray-500">{mentor.company}</div>
                      </CardDescription>
                      <Badge className={`bg-gradient-to-r ${mentor.color} text-white border-0 px-3 py-1 text-xs font-semibold`}>
                        {mentor.expertise}
                      </Badge>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Register Tab */}
          {activeTab === "register" && (
            <div className="space-y-8 sm:space-y-12">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Compete?
                </h3>
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                  Join the startup competition and showcase your innovative AI idea to industry experts and potential investors.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl">Competition Registration</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm sm:text-base">Free to participate</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm sm:text-base">Open to all skill levels</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm sm:text-base">Individual or team entries</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm sm:text-base">Mentorship included</span>
                      </div>
                    </div>
                    
                    <Link href="/register" className="block">
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                        <Rocket className="w-5 h-5 mr-2" />
                        Register for Competition
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl">Need Help?</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">Email Support</div>
                          <div className="text-sm text-gray-600">{EVENT_CONFIG.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">Phone Support</div>
                          <div className="text-sm text-gray-600">+92 300 1234567</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">WhatsApp Group</div>
                          <div className="text-sm text-gray-600">Join for updates</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full border-2 border-blue-300 hover:bg-blue-50 text-blue-600 font-bold py-4 rounded-xl transition-all duration-300">
                      <Mail className="w-5 h-5 mr-2" />
                      Contact Support
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 