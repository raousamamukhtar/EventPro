"use client"

import { EVENT_CONFIG } from "@/lib/config"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  X, 
  Award, 
  Star, 
  ArrowRight, 
  Sparkles, 
  Target, 
  Rocket, 
  CheckCircle,
  ArrowLeft,
  Home
} from "lucide-react"
import { SuccessAlert } from "@/components/success-alert"
import Link from "next/link"

interface FormData {
  name: string
  email: string
  phone: string
  university: string
  experience: string
  interests: string
  teamName: string
  participationType: string
}

export default function RegistrationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    university: "",
    experience: "",
    interests: "",
    teamName: "",
    participationType: "",
  })

  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successUserName, setSuccessUserName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSuccessClose = () => {
    setShowSuccessAlert(false)
    router.push("/")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.university.trim()) {
      alert("Please fill in all required fields.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.")
      return
    }

    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid phone number.")
      return
    }

    setIsSubmitting(true)

    try {
      if (process.env.NODE_ENV === 'development') {
      console.log("Submitting registration data:", formData)
    }
      
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

              if (process.env.NODE_ENV === 'development') {
          console.log("Response status:", response.status)
          console.log("Response headers:", response.headers)
        }

      if (response.ok) {
        const result = await response.json()
        if (process.env.NODE_ENV === 'development') {
          console.log("Registration successful:", result)
        }
        setSuccessUserName(result.registration.name || formData.name)
        setShowSuccessAlert(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          university: "",
          experience: "",
          interests: "",
          teamName: "",
          participationType: "",
        })
      } else {
        const errorText = await response.text()
        console.error("Registration failed with status:", response.status)
        console.error("Error response:", errorText)
        
        let errorMessage = 'Something went wrong. Please try again.'
        
        try {
          const error = JSON.parse(errorText)
          errorMessage = error.error || error.message || errorMessage
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError)
        }
        
        if (errorMessage.includes("Email already registered")) {
          alert("This email is already registered. Please use a different email address.")
        } else if (errorMessage.includes("Missing required fields")) {
          alert("Please fill in all required fields.")
        } else if (errorMessage.includes("temporarily unavailable")) {
          alert("Registration service is temporarily unavailable. Please try again later.")
        } else {
          alert(`Registration failed: ${errorMessage}`)
        }
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("Registration failed. Please check your internet connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-sm">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {EVENT_CONFIG.date}
              </Badge>
              <Badge variant="outline" className="border-green-500 text-green-600 text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {EVENT_CONFIG.location}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-4 sm:p-6 lg:p-8">
              {/* Form Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 animate-pulse">
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>EVENT REGISTRATION</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading tracking-tight text-gray-900 mb-3 sm:mb-4">
                  Register for {`${EVENT_CONFIG.name} ${EVENT_CONFIG.year}`}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4">
                  Join Pakistan's biggest AI event and be part of the future of technology
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-700">Registration Progress</h4>
                  <span className="text-xs sm:text-sm text-gray-500">Step 1 of 1</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Personal Information Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm sm:text-base font-semibold text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="h-10 sm:h-12 text-sm sm:text-base border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm sm:text-base font-semibold text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="h-10 sm:h-12 text-sm sm:text-base border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm sm:text-base font-semibold text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="h-10 sm:h-12 text-sm sm:text-base border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university" className="text-sm sm:text-base font-semibold text-gray-700">
                        University/Organization <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="university"
                        required
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        placeholder="Your university or company"
                        className="h-10 sm:h-12 text-sm sm:text-base border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Experience & Preferences Section */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 border border-purple-100">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                    Experience & Preferences
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-base font-semibold text-gray-700">
                        Programming Experience
                      </Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                        <SelectTrigger className="h-12 text-base border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">🟢 Beginner (0-1 years)</SelectItem>
                          <SelectItem value="intermediate">🟡 Intermediate (1-3 years)</SelectItem>
                          <SelectItem value="advanced">🟠 Advanced (3+ years)</SelectItem>
                          <SelectItem value="expert">🔴 Expert (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="participationType" className="text-base font-semibold text-gray-700">
                        Participation Type
                      </Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, participationType: value })}>
                        <SelectTrigger className="h-12 text-base border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200">
                          <SelectValue placeholder="What are you most interested in?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workshops">📚 Workshops Only</SelectItem>
                          <SelectItem value="hackathon">💻 AI Hackathon</SelectItem>
                          <SelectItem value="startup">🏆 Startup Competition</SelectItem>
                          <SelectItem value="all">🚀 Everything</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="teamName" className="text-base font-semibold text-gray-700">
                        Team Name (Optional)
                      </Label>
                      <Input
                        id="teamName"
                        value={formData.teamName}
                        onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                        placeholder="If you're coming with a team"
                        className="h-12 text-base border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-green-600 animate-pulse" />
                    Additional Information
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="interests" className="text-base font-semibold text-gray-700">
                      Areas of Interest
                    </Label>
                    <Textarea
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      placeholder="Tell us about your interests in AI/ML, specific technologies you want to learn, projects you're working on, etc."
                      rows={4}
                      className="text-base border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl resize-none transition-all duration-200"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      This helps us tailor the experience to your interests and connect you with like-minded participants.
                    </p>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-gray-700 mb-1">Registration Terms</p>
                      <p>By registering, you agree to participate in {`${EVENT_CONFIG.name} ${EVENT_CONFIG.year}`} and receive event-related communications. Your data will be handled according to our privacy policy.</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-base sm:text-lg font-bold py-3 sm:py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                        <span className="text-sm sm:text-base">Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        <span className="text-sm sm:text-base">Complete Registration</span>
                      </>
                    )}
                  </Button>
                  <Link href="/" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-2 border-gray-300 hover:bg-gray-50 text-base sm:text-lg font-bold py-3 sm:py-4 rounded-2xl transition-all duration-300"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-sm sm:text-base">Back to Home</span>
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar with Event Info */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sm:space-y-6">
              {/* Event Highlights */}
              <Card className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-heading text-gray-900 mb-3 sm:mb-4">🎯 Event Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">PKR 150K Prizes</p>
                      <p className="text-sm text-gray-600">Startup competition rewards</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Google AI Workshops</p>
                      <p className="text-sm text-gray-600">Hands-on sessions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">200+ Attendees</p>
                      <p className="text-sm text-gray-600">Networking opportunities</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Free Registration</p>
                      <p className="text-sm text-gray-600">No cost to attend</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Details */}
              <Card className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading text-gray-900 mb-4">📅 Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Date & Time</p>
                      <p className="text-sm text-gray-600">{EVENT_CONFIG.date} • 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Venue</p>
                      <p className="text-sm text-gray-600">{EVENT_CONFIG.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Duration</p>
                      <p className="text-sm text-gray-600">Full Day Event</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading text-gray-900 mb-4">📞 Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{EVENT_CONFIG.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                  
                  </div>
                  <a
  href="https://chat.whatsapp.com/KjhcYpc8ZoI777OxE4REOz?mode=ac_t"
  target="_blank"
  rel="noopener noreferrer"
  className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
>
  <Users className="w-4 h-4 mr-2" />
  Join WhatsApp Group
</a>

                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      <SuccessAlert
        isOpen={showSuccessAlert}
        onClose={handleSuccessClose}
        userName={successUserName}
      />
    </div>
  )
} 