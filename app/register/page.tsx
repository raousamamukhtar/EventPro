"use client"

import { EVENT_CONFIG } from "@/lib/config"
import { registrationSchema, type RegistrationFormData } from "@/lib/validation/registration"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Code,
  Zap,
  Clock,
  Mail,
  Rocket,
  CheckCircle,
  ArrowLeft,
  Home,
  ShieldCheck,
} from "lucide-react"
import { SuccessAlert } from "@/components/success-alert"
import Link from "next/link"

type RegistrationStep = "form" | "verify"

const defaultValues: RegistrationFormData = {
  name: "",
  email: "",
  phone: "",
  university: "",
  interests: "",
  teamName: "",
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm text-red-500 mt-1">{message}</p>
}

export default function RegistrationPage() {
  const router = useRouter()
  const [step, setStep] = useState<RegistrationStep>("form")
  const [otp, setOtp] = useState("")
  const [verifiedEmail, setVerifiedEmail] = useState("")
  const [apiError, setApiError] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [successUserName, setSuccessUserName] = useState("")
  const [successQrCode, setSuccessQrCode] = useState<string | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [otpResentMessage, setOtpResentMessage] = useState("")

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: "onBlur",
  })

  const handleSuccessClose = () => {
    setShowSuccessAlert(false)
    router.push("/")
  }

  const sendOtp = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    setApiError("")

    try {
      const response = await fetch("/api/register/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        const isResend = step === "verify"
        setVerifiedEmail(result.email || data.email)
        setOtp("")
        setStep("verify")
        if (isResend) {
          setOtpResentMessage("New code sent! Please check your email for the latest code — the previous one is no longer valid.")
        } else {
          setOtpResentMessage("")
        }
      } else {
        setApiError(result.error || "Failed to send verification code.")
      }
    } catch {
      setApiError("Failed to send verification code. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setApiError("Please enter the 6-digit verification code.")
      return
    }

    setIsSubmitting(true)
    setApiError("")

    try {
      const response = await fetch("/api/register/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: verifiedEmail, otp }),
      })

      const result = await response.json()

      if (response.ok) {
        setSuccessUserName(result.registration?.name || form.getValues("name"))
        setSuccessQrCode(result.qrCode ?? undefined)
        setShowSuccessAlert(true)
        form.reset(defaultValues)
        setOtp("")
        setStep("form")
      } else {
        const errorMsg = result.error || "Verification failed. Please try again."
        const isInvalidCode = result.error === "Invalid verification code. Please try again."
        setApiError(
          isInvalidCode
            ? "Invalid verification code. Make sure you're entering the latest code from your most recent email — clicking 'Resend code' generates a new code and invalidates the previous one."
            : errorMsg
        )
      }
    } catch {
      setApiError("Verification failed. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendOtp = async () => {
    setIsResending(true)
    setApiError("")
    await sendOtp(form.getValues())
    setIsResending(false)
  }

  const progressWidth = step === "form" ? "50%" : "100%"
  const stepLabel = step === "form" ? "Step 1 of 2" : "Step 2 of 2"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 animate-pulse">
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>EVENT REGISTRATION</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading tracking-tight text-gray-900 mb-3 sm:mb-4">
                  Register for {`${EVENT_CONFIG.name} ${EVENT_CONFIG.year}`}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4">
                  Join Pakistan&apos;s biggest AI event and be part of the future of technology
                </p>
              </div>

              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-700">Registration Progress</h4>
                  <span className="text-xs sm:text-sm text-gray-500">{stepLabel}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>

              {apiError && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {apiError}
                </div>
              )}

              {step === "form" ? (
                <form onSubmit={form.handleSubmit(sendOtp)} className="space-y-6 sm:space-y-8" noValidate>
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
                          {...form.register("name")}
                          placeholder="Enter your full name"
                          className="h-10 sm:h-12 text-sm sm:text-base border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                        />
                        <FieldError message={form.formState.errors.name?.message} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm sm:text-base font-semibold text-gray-700">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          placeholder="your.email@example.com"
                          className="h-10 sm:h-12 text-sm sm:text-base border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                        />
                        <FieldError message={form.formState.errors.email?.message} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm sm:text-base font-semibold text-gray-700">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          {...form.register("phone")}
                          placeholder="+92 300 1234567"
                          className="h-10 sm:h-12 text-sm sm:text-base border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                        />
                        <FieldError message={form.formState.errors.phone?.message} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="university" className="text-sm sm:text-base font-semibold text-gray-700">
                          University/Organization <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="university"
                          {...form.register("university")}
                          placeholder="Your university or company"
                          className="h-10 sm:h-12 text-sm sm:text-base border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                        />
                        <FieldError message={form.formState.errors.university?.message} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 border border-purple-100">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                      Experience & Preferences
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label className="text-base font-semibold text-gray-700">Programming Experience</Label>
                        <Controller
                          name="experience"
                          control={form.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
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
                          )}
                        />
                        <FieldError message={form.formState.errors.experience?.message} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-base font-semibold text-gray-700">Participation Type</Label>
                        <Controller
                          name="participationType"
                          control={form.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
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
                          )}
                        />
                        <FieldError message={form.formState.errors.participationType?.message} />
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="teamName" className="text-base font-semibold text-gray-700">
                          Team Name (Optional)
                        </Label>
                        <Input
                          id="teamName"
                          {...form.register("teamName")}
                          placeholder="If you're coming with a team"
                          className="h-12 text-base border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-xl transition-all duration-200"
                        />
                        <FieldError message={form.formState.errors.teamName?.message} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium text-gray-700 mb-1">Registration Terms</p>
                        <p>
                          By registering, you agree to participate in {`${EVENT_CONFIG.name} ${EVENT_CONFIG.year}`} and
                          receive event-related communications. Your email will be verified with a one-time code before
                          registration is completed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-base sm:text-lg font-bold py-3 sm:py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2" />
                          <span className="text-sm sm:text-base">Sending code...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          <span className="text-sm sm:text-base">Send Verification Code</span>
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
              ) : (
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-100 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <ShieldCheck className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h3>
                    <p className="text-gray-600 mb-1">
                      We sent a 6-digit verification code to
                    </p>
                    <p className="font-semibold text-blue-700">{verifiedEmail}</p>
                    <p className="text-sm text-gray-500 mt-3">The code expires in 10 minutes.</p>
                  </div>

                  {otpResentMessage && (
                    <div className="mb-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                      {otpResentMessage}
                    </div>
                  )}

                  <div className="flex flex-col items-center space-y-4">
                    <Label className="text-base font-semibold text-gray-700">Enter Verification Code</Label>
                    <InputOTP maxLength={6} value={otp} onChange={(val) => { setOtp(val); setOtpResentMessage("") }}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="h-12 w-12 text-lg rounded-xl" />
                        <InputOTPSlot index={1} className="h-12 w-12 text-lg rounded-xl" />
                        <InputOTPSlot index={2} className="h-12 w-12 text-lg rounded-xl" />
                        <InputOTPSlot index={3} className="h-12 w-12 text-lg rounded-xl" />
                        <InputOTPSlot index={4} className="h-12 w-12 text-lg rounded-xl" />
                        <InputOTPSlot index={5} className="h-12 w-12 text-lg rounded-xl" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleVerifyOtp}
                      disabled={isSubmitting || otp.length !== 6}
                      className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-base sm:text-lg font-bold py-3 sm:py-4 rounded-2xl shadow-2xl disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Complete Registration
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setStep("form")
                        setOtp("")
                        setApiError("")
                        setOtpResentMessage("")
                      }}
                      className="flex-1 border-2 border-gray-300 py-3 sm:py-4 rounded-2xl"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Edit Details
                    </Button>
                  </div>

                  <p className="text-center text-sm text-gray-500">
                    Didn&apos;t receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="text-blue-600 font-medium hover:underline disabled:opacity-50"
                    >
                      {isResending ? "Resending..." : "Resend code"}
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-4 sm:space-y-6">
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
                  <a
                    href="https://wa.me/923063754907"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Contact via WhatsApp
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <SuccessAlert
        isOpen={showSuccessAlert}
        onClose={handleSuccessClose}
        userName={successUserName}
        qrCode={successQrCode}
      />
    </div>
  )
}
