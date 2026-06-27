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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import {
  Calendar, MapPin, Users, Trophy, Code, Zap, Mail, Rocket,
  CheckCircle, ArrowLeft, ShieldCheck, Home,
} from "lucide-react"
import { SuccessAlert } from "@/components/success-alert"
import Link from "next/link"

const BASE   = "#02040f"
const GLASS  = "rgba(255,255,255,0.04)"
const BORDER = "rgba(255,255,255,0.08)"
const GRAD   = "linear-gradient(135deg,#7c3aed,#06b6d4)"

const defaultValues: RegistrationFormData = {
  name: "", email: "", phone: "", university: "", teamName: "", interests: "",
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1"><span>⚠</span>{message}</p>
}

function Field({ label, required, children, error }: { label: string; required?: boolean; children: React.ReactNode; error?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-white/60">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      {children}
      {error && <FieldError message={error} />}
    </div>
  )
}

const inputCls = "h-11 rounded-xl text-sm text-white placeholder:text-white/20 border focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/60 transition-all bg-transparent"
const inputStyle = { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }

export default function RegistrationPage() {
  const router = useRouter()
  const [step, setStep] = useState<"form" | "verify">("form")
  const [otp, setOtp] = useState("")
  const [verifiedEmail, setVerifiedEmail] = useState("")
  const [apiError, setApiError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [successName, setSuccessName] = useState("")
  const [successQr, setSuccessQr] = useState<string | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resentMsg, setResentMsg] = useState("")

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: "onBlur",
  })

  const sendOtp = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    setApiError("")
    try {
      const res = await fetch("/api/register/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (res.ok) {
        const isResend = step === "verify"
        setVerifiedEmail(json.email || data.email)
        setOtp("")
        setStep("verify")
        setResentMsg(isResend ? "New code sent! The previous one is no longer valid." : "")
      } else {
        setApiError(json.error || "Failed to send verification code.")
      }
    } catch {
      setApiError("Connection error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerify = async () => {
    if (otp.length !== 6) { setApiError("Enter the 6-digit code."); return }
    setIsSubmitting(true)
    setApiError("")
    try {
      const res = await fetch("/api/register/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: verifiedEmail, otp }),
      })
      const json = await res.json()
      if (res.ok) {
        setSuccessName(json.registration?.name || form.getValues("name"))
        setSuccessQr(json.qrCode ?? undefined)
        setShowSuccess(true)
        form.reset(defaultValues)
        setOtp("")
        setStep("form")
      } else {
        setApiError(
          json.error === "Invalid verification code. Please try again."
            ? "Invalid code. Make sure you're using the latest code from your most recent email."
            : json.error || "Verification failed."
        )
      }
    } catch {
      setApiError("Connection error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    setApiError("")
    await sendOtp(form.getValues())
    setIsResending(false)
  }

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: BASE }}>

      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 right-0 w-96 h-96" style={{ background: "radial-gradient(circle,rgba(124,58,237,0.12),transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-96 h-96" style={{ background: "radial-gradient(circle,rgba(6,182,212,0.08),transparent 70%)" }} />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50" style={{ background: "rgba(2,4,15,0.85)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
            <Home style={{ width: 16, height: 16 }} />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: GRAD }}>
              <Rocket style={{ width: 14, height: 14 }} className="text-white" />
            </div>
            <span className="font-black text-sm text-white">{EVENT_CONFIG.name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Calendar style={{ width: 12, height: 12 }} />
            <span className="hidden sm:inline">{EVENT_CONFIG.date}</span>
            <span className="sm:hidden">Aug 21</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">

          {/* ── Main Form ── */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl overflow-hidden" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>

              {/* Header */}
              <div className="px-6 sm:px-8 pt-8 pb-6 text-center" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}>
                  <Rocket style={{ width: 12, height: 12 }} />
                  Free Registration
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                  Join {EVENT_CONFIG.name} {EVENT_CONFIG.year}
                </h1>
                <p className="text-sm text-white/35">Pakistan&apos;s Premier AI Summit — Workshops, Hackathon & Startup Pitch</p>
              </div>

              {/* Progress */}
              <div className="px-6 sm:px-8 pt-5 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white/30 uppercase tracking-widest">{step === "form" ? "Step 1 of 2 — Details" : "Step 2 of 2 — Verify"}</span>
                  <span className="text-xs text-white/20">{step === "form" ? "50%" : "100%"}</span>
                </div>
                <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-1 rounded-full transition-all duration-500" style={{ width: step === "form" ? "50%" : "100%", background: GRAD }} />
                </div>
              </div>

              {/* Error */}
              {apiError && (
                <div className="mx-6 sm:mx-8 mb-2 rounded-xl border border-red-500/20 bg-red-500/08 px-4 py-3 text-sm text-red-400" style={{ background: "rgba(239,68,68,0.08)" }}>
                  {apiError}
                </div>
              )}

              <div className="px-6 sm:px-8 pb-8">

                {/* ── Step 1: Form ── */}
                {step === "form" ? (
                  <form onSubmit={form.handleSubmit(sendOtp)} className="space-y-6 pt-4" noValidate>

                    {/* Personal Info */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <Users style={{ width: 12, height: 12 }} />Personal Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Full Name" required error={form.formState.errors.name?.message}>
                          <Input {...form.register("name")} placeholder="Your full name" className={inputCls} style={inputStyle} />
                        </Field>
                        <Field label="Email Address" required error={form.formState.errors.email?.message}>
                          <Input type="email" {...form.register("email")} placeholder="you@example.com" className={inputCls} style={inputStyle} />
                        </Field>
                        <Field label="Phone Number" required error={form.formState.errors.phone?.message}>
                          <Input {...form.register("phone")} placeholder="03001234567" className={inputCls} style={inputStyle} />
                        </Field>
                        <Field label="University / Organization" required error={form.formState.errors.university?.message}>
                          <Input {...form.register("university")} placeholder="NFC-IET, NUST, etc." className={inputCls} style={inputStyle} />
                        </Field>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: BORDER }} />

                    {/* Event Details */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <Code style={{ width: 12, height: 12 }} />Event Details
                      </h3>

                      {/* Team Name — full width, prominent */}
                      <Field label="Team Name" required error={form.formState.errors.teamName?.message}>
                        <Input {...form.register("teamName")} placeholder="Your team name (or solo name)" className={inputCls} style={inputStyle} />
                      </Field>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Experience Level" error={form.formState.errors.experience?.message}>
                          <Controller name="experience" control={form.control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className={`${inputCls} w-full`} style={inputStyle}>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent style={{ background: "#0d0f1a", border: `1px solid ${BORDER}` }}>
                                <SelectItem value="beginner">🟢 Beginner (0–1 yr)</SelectItem>
                                <SelectItem value="intermediate">🟡 Intermediate (1–3 yr)</SelectItem>
                                <SelectItem value="advanced">🟠 Advanced (3+ yr)</SelectItem>
                                <SelectItem value="expert">🔴 Expert (5+ yr)</SelectItem>
                              </SelectContent>
                            </Select>
                          )} />
                        </Field>
                        <Field label="Participation Type" error={form.formState.errors.participationType?.message}>
                          <Controller name="participationType" control={form.control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className={`${inputCls} w-full`} style={inputStyle}>
                                <SelectValue placeholder="What interests you?" />
                              </SelectTrigger>
                              <SelectContent style={{ background: "#0d0f1a", border: `1px solid ${BORDER}` }}>
                                <SelectItem value="workshops">📚 Workshops Only</SelectItem>
                                <SelectItem value="hackathon">💻 AI Hackathon</SelectItem>
                                <SelectItem value="startup">🏆 Startup Pitch</SelectItem>
                                <SelectItem value="all">🚀 Everything</SelectItem>
                              </SelectContent>
                            </Select>
                          )} />
                        </Field>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="rounded-xl p-4 text-xs text-white/25 leading-relaxed flex items-start gap-3" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}` }}>
                      <CheckCircle style={{ width: 14, height: 14, color: "#34d399", flexShrink: 0, marginTop: 1 }} />
                      By registering you agree to participate in {EVENT_CONFIG.name} {EVENT_CONFIG.year} and receive event communications. Your email will be verified before registration is complete.
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button type="submit" disabled={isSubmitting} className="flex-1 h-12 font-bold text-sm rounded-2xl text-white" style={{ background: GRAD, opacity: isSubmitting ? 0.6 : 1 }}>
                        {isSubmitting
                          ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Sending code...</>
                          : <><Mail style={{ width: 16, height: 16 }} className="mr-2" />Send Verification Code</>}
                      </Button>
                      <Link href="/" className="sm:w-auto w-full">
                        <Button type="button" variant="outline" className="w-full h-12 font-bold text-sm rounded-2xl text-white/50 hover:text-white" style={{ border: `1px solid ${BORDER}`, background: "transparent" }}>
                          <ArrowLeft style={{ width: 16, height: 16 }} className="mr-2" />Back
                        </Button>
                      </Link>
                    </div>
                  </form>
                ) : (

                  /* ── Step 2: OTP ── */
                  <div className="space-y-6 pt-4">
                    <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)" }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}>
                        <ShieldCheck style={{ width: 28, height: 28, color: "#a78bfa" }} />
                      </div>
                      <h3 className="text-xl font-black text-white mb-1">Check Your Email</h3>
                      <p className="text-sm text-white/40 mb-1">We sent a 6-digit code to</p>
                      <p className="text-sm font-bold text-violet-400 break-all">{verifiedEmail}</p>
                      <p className="text-xs text-white/20 mt-2">Expires in 10 minutes</p>
                    </div>

                    {resentMsg && (
                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/08 px-4 py-3 text-sm text-emerald-400" style={{ background: "rgba(52,211,153,0.07)" }}>
                        {resentMsg}
                      </div>
                    )}

                    {/* OTP Slots */}
                    <div className="flex flex-col items-center gap-3">
                      <Label className="text-sm font-semibold text-white/50">Enter 6-digit verification code</Label>
                      <InputOTP maxLength={6} value={otp} onChange={(v) => { setOtp(v); setResentMsg("") }}>
                        <InputOTPGroup className="gap-2 sm:gap-3">
                          {[0,1,2,3,4,5].map(i => (
                            <InputOTPSlot key={i} index={i} className="h-12 w-10 sm:h-14 sm:w-12 text-base sm:text-lg font-bold rounded-xl border text-white" style={{ background: "rgba(255,255,255,0.05)", borderColor: otp.length > i ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.1)" }} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={handleVerify} disabled={isSubmitting || otp.length !== 6} className="flex-1 h-12 font-bold text-sm rounded-2xl text-white" style={{ background: GRAD, opacity: isSubmitting || otp.length !== 6 ? 0.5 : 1 }}>
                        {isSubmitting
                          ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Verifying...</>
                          : <><CheckCircle style={{ width: 16, height: 16 }} className="mr-2" />Complete Registration</>}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => { setStep("form"); setOtp(""); setApiError(""); setResentMsg("") }} className="flex-1 h-12 font-bold text-sm rounded-2xl text-white/50 hover:text-white" style={{ border: `1px solid ${BORDER}`, background: "transparent" }}>
                        <ArrowLeft style={{ width: 16, height: 16 }} className="mr-2" />Edit Details
                      </Button>
                    </div>

                    <p className="text-center text-sm text-white/25">
                      Didn&apos;t receive it?{" "}
                      <button type="button" onClick={handleResend} disabled={isResending} className="text-violet-400 font-semibold hover:text-violet-300 transition-colors disabled:opacity-40">
                        {isResending ? "Sending..." : "Resend code"}
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Event Info */}
            <div className="rounded-2xl p-5" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Event Info</h3>
              <div className="space-y-3">
                {[
                  { icon: <Calendar style={{ width: 14, height: 14 }} />, color: "#22d3ee", label: "Date", value: EVENT_CONFIG.date },
                  { icon: <MapPin style={{ width: 14, height: 14 }} />, color: "#a78bfa", label: "Venue", value: EVENT_CONFIG.location },
                  { icon: <Users style={{ width: 14, height: 14 }} />, color: "#34d399", label: "Attendees", value: EVENT_CONFIG.attendees },
                ].map(({ icon, color, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}12`, border: `1px solid ${color}25`, color }}>{icon}</div>
                    <div>
                      <div className="text-[10px] text-white/20 uppercase tracking-widest">{label}</div>
                      <div className="text-sm font-semibold text-white/70">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="rounded-2xl p-5" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Highlights</h3>
              <div className="space-y-3">
                {[
                  { icon: <Trophy style={{ width: 14, height: 14 }} />, color: "#fbbf24", title: "PKR 150K Prizes", desc: "Startup competition" },
                  { icon: <Code style={{ width: 14, height: 14 }} />, color: "#22d3ee", title: "Google AI Workshops", desc: "Hands-on sessions" },
                  { icon: <Users style={{ width: 14, height: 14 }} />, color: "#34d399", title: "200+ Attendees", desc: "Network & grow" },
                  { icon: <Zap style={{ width: 14, height: 14 }} />, color: "#a78bfa", title: "Free to Attend", desc: "No registration fee" },
                ].map(({ icon, color, title, desc }) => (
                  <div key={title} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}12`, border: `1px solid ${color}25`, color }}>{icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-white/70">{title}</div>
                      <div className="text-xs text-white/25">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-2xl p-5" style={{ background: GLASS, border: `1px solid ${BORDER}` }}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Need Help?</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Mail style={{ width: 14, height: 14 }} />
                  <span className="text-xs break-all">{EVENT_CONFIG.email}</span>
                </div>
              </div>
              <a href="https://wa.me/923063754907" target="_blank" rel="noopener noreferrer">
                <Button className="w-full h-10 text-sm font-bold rounded-xl text-white" style={{ background: GRAD }}>
                  <Users style={{ width: 14, height: 14 }} className="mr-2" />WhatsApp Support
                </Button>
              </a>
            </div>

          </div>
        </div>
      </div>

      <SuccessAlert isOpen={showSuccess} onClose={() => { setShowSuccess(false); router.push("/") }} userName={successName} qrCode={successQr} />
    </div>
  )
}
