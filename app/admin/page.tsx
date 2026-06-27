"use client"

import { EVENT_CONFIG } from "@/lib/config"

import { useState, useEffect, lazy, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Users, Mail, Phone, GraduationCap, RefreshCw, Download, CheckCircle, XCircle, Lock, Eye, EyeOff, Menu, X, Home, QrCode, UserCheck, Pencil, Trash2, Save } from "lucide-react"

const QrScanner = lazy(() => import("@/components/qr-scanner").then((m) => ({ default: m.QrScanner })))

interface Registration {
  id: number
  name: string
  email: string
  phone: string
  university: string
  experience?: string
  interests?: string
  team_name?: string
  participation_type?: string
  attended?: boolean
  attended_at?: string
  created_at: string
}

interface Stats {
  total: number
  byExperience: Array<{ experience: string; count: string }>
  byParticipationType: Array<{ participation_type: string; count: string }>
}

// Input sanitization function
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000) // Limit length
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showScanner, setShowScanner] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [googleSheetsConfigured, setGoogleSheetsConfigured] = useState<boolean | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<Registration>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/admin/verify', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        setIsAuthenticated(true)
        fetchData()
        checkGoogleSheetsConfig()
      } else {
        // If not authenticated, clear token and stay on login page
        setIsAuthenticated(false)
        localStorage.removeItem('admin_token')
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Auth check failed:', error)
      }
      setIsAuthenticated(false)
      localStorage.removeItem('admin_token')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    const sanitizedEmail = sanitizeInput(loginData.email)
    const sanitizedPassword = sanitizeInput(loginData.password)

    if (!sanitizedEmail || !sanitizedPassword) {
      setLoginError("Please fill in all fields")
      return
    }

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: sanitizedEmail,
          password: sanitizedPassword
        })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('admin_token', data.token)
        setIsAuthenticated(true)
        fetchData()
        checkGoogleSheetsConfig()
      } else {
        const errorData = await response.json()
        setLoginError(errorData.message || "Login failed")
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Login error:', error)
      }
      setLoginError("Network error. Please check your connection and try again.")
    }
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (token) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Logout error:', error)
      }
    } finally {
      localStorage.removeItem('admin_token')
      setIsAuthenticated(false)
      setLoginData({ email: "", password: "" })
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }

      if (process.env.NODE_ENV === 'development') {
        console.log("Fetching data...")
        console.log("Token:", token ? 'Present' : 'Missing')
      }
      
      const [registrationsRes, statsRes] = await Promise.all([
        fetch("/api/registrations", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch("/api/registrations?stats=true", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }),
      ])

      if (process.env.NODE_ENV === 'development') {
        console.log("API responses:", {
          registrationsStatus: registrationsRes.status,
          statsStatus: statsRes.status,
          registrationsOk: registrationsRes.ok,
          statsOk: statsRes.ok
        })
      }

      if (registrationsRes.ok && statsRes.ok) {
        const registrationsData = await registrationsRes.json()
        const statsData = await statsRes.json()
        
        if (process.env.NODE_ENV === 'development') {
          console.log("Data received:", {
            registrationsCount: registrationsData.length,
            statsTotal: statsData.total
          })
        }
        
        setRegistrations(registrationsData)
        setStats(statsData)
      } else {
        // Log errors only in development
        if (process.env.NODE_ENV === 'development') {
          console.error("API calls failed:", {
            registrationsStatus: registrationsRes.status,
            statsStatus: statsRes.status,
            registrationsText: await registrationsRes.text().catch(() => 'Failed to get response text'),
            statsText: await statsRes.text().catch(() => 'Failed to get response text')
          })
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error fetching data:", error)
      }
    } finally {
      setLoading(false)
    }
  }

  const checkGoogleSheetsConfig = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) return

      const response = await fetch("/api/registrations?check-sheets=true", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setGoogleSheetsConfigured(data.googleSheetsConfigured)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error checking Google Sheets config:", error)
      }
      setGoogleSheetsConfigured(false)
    }
  }

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        alert("Not authenticated")
        return
      }

      const response = await fetch("/api/export", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const blob = await response.blob()
        
        // Create download link
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${EVENT_CONFIG.name.toLowerCase().replace(/\s+/g, '-')}-registrations-${new Date().toISOString().split("T")[0]}.csv`
        
        // Trigger download
        document.body.appendChild(link)
        link.click()
        
        // Cleanup
        setTimeout(() => {
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }, 100)
      } else {
        const errorText = await response.text()
        if (process.env.NODE_ENV === 'development') {
          console.error("Export failed:", errorText)
        }
        alert("Failed to export registrations")
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Export failed:", error)
      }
      alert("Failed to export registrations")
    }
  }

  const startEdit = (reg: Registration) => {
    setEditingId(reg.id)
    setEditForm({
      name: reg.name,
      phone: reg.phone,
      university: reg.university,
      experience: reg.experience ?? "",
      interests: reg.interests ?? "",
      team_name: reg.team_name ?? "",
      participation_type: reg.participation_type ?? "",
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const saveEdit = async (id: number) => {
    setIsSaving(true)
    try {
      const token = localStorage.getItem("admin_token")
      const res = await fetch(`/api/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm),
      })
      if (res.ok) {
        const updated = await res.json()
        setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)))
        setEditingId(null)
        setEditForm({})
      }
    } finally {
      setIsSaving(false)
    }
  }

  const confirmDelete = async (id: number) => {
    setIsDeleting(true)
    try {
      const token = localStorage.getItem("admin_token")
      const res = await fetch(`/api/registrations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id))
        setStats((prev) => prev ? { ...prev, total: prev.total - 1 } : prev)
      }
    } finally {
      setIsDeleting(false)
      setDeleteConfirmId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Admin Login</CardTitle>
            <CardDescription className="text-gray-600">
              Access {EVENT_CONFIG.name} Admin Dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="Enter admin email"
                  className="h-12 text-base border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="h-12 text-base border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-700">{loginError}</span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Lock className="w-4 h-4 mr-2" />
                Login to Dashboard
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="text-blue-600 hover:text-blue-700"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const adminToken = typeof window !== "undefined" ? localStorage.getItem("admin_token") ?? "" : ""

  return (
    <div className="min-h-screen bg-gray-50">
      {showScanner && (
        <Suspense fallback={null}>
          <QrScanner adminToken={adminToken} onClose={() => setShowScanner(false)} />
        </Suspense>
      )}
      {/* Responsive Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-600">{EVENT_CONFIG.name}</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-900">Admin</h1>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button onClick={() => setShowScanner(true)} size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <QrCode className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">Scan QR</span>
                <span className="lg:hidden">Scan</span>
              </Button>
              <Button onClick={handleExport} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">Export CSV</span>
                <span className="lg:hidden">Export</span>
              </Button>
              <Button onClick={fetchData} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">Refresh</span>
                <span className="lg:hidden">Refresh</span>
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={`p-3 h-10 w-10 rounded-lg transition-colors ${
                  showMobileMenu 
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {showMobileMenu ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`sm:hidden transition-all duration-300 ease-in-out ${showMobileMenu ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="py-4 space-y-3 border-t border-gray-200 bg-gray-50/50">
              <Button onClick={() => { setShowScanner(true); setShowMobileMenu(false) }} size="sm" className="w-full justify-start h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <QrCode className="w-5 h-5 mr-3" />
                Scan QR Code
              </Button>
              <Button onClick={handleExport} variant="outline" size="sm" className="w-full justify-start h-12 text-base">
                <Download className="w-5 h-5 mr-3" />
                Export CSV
              </Button>
              <Button onClick={fetchData} variant="outline" size="sm" className="w-full justify-start h-12 text-base">
                <RefreshCw className="w-5 h-5 mr-3" />
                Refresh Data
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm" className="w-full justify-start h-12 text-base text-red-600 hover:text-red-700 border-red-200 hover:border-red-300">
                Logout
              </Button>
              <Button onClick={() => router.push('/')} variant="ghost" size="sm" className="w-full justify-start h-12 text-base text-blue-600 hover:text-blue-700">
                <Home className="w-5 h-5 mr-3" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hackathon</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.byParticipationType.find((p) => p.participation_type === "hackathon")?.count || 0}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Startup Competition</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.byParticipationType.find((p) => p.participation_type === "startup")?.count || 0}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Workshop Only</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.byParticipationType.find((p) => p.participation_type === "workshops")?.count || 0}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Everything (All Events)</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.byParticipationType.find((p) => p.participation_type === "hackathon,startup,workshops")?.count || 0}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-green-200 bg-green-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800">Attended</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">
                  {registrations.filter((r) => r.attended).length}
                </div>
                <p className="text-xs text-green-600 mt-1">of {stats.total} registered</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Registrations List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Recent Registrations</CardTitle>
            <CardDescription className="text-sm sm:text-base">All registered participants for {EVENT_CONFIG.name}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              {registrations.map((registration) => {
                const isEditing = editingId === registration.id
                const isConfirmingDelete = deleteConfirmId === registration.id

                return (
                  <div key={registration.id} className={`border rounded-lg p-4 transition-colors ${isEditing ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}>
                    {/* Header row: name + date + action buttons */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900">{registration.name}</h3>
                        <div className="mt-1 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex sm:items-center text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4 shrink-0" />
                            <span className="truncate">{registration.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4 shrink-0" />
                            <span>{registration.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GraduationCap className="w-4 h-4 shrink-0" />
                            <span className="truncate">{registration.university}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-gray-400 hidden sm:block">
                          {new Date(registration.created_at).toLocaleDateString()}
                        </span>
                        {!isEditing && !isConfirmingDelete && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => startEdit(registration)} className="h-8 px-2 text-blue-600 border-blue-200 hover:bg-blue-50">
                              <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setDeleteConfirmId(registration.id)} className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50">
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Delete confirmation */}
                    {isConfirmingDelete && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex flex-col sm:flex-row sm:items-center gap-3">
                        <p className="text-sm text-red-700 flex-1">Delete <strong>{registration.name}</strong>? This cannot be undone.</p>
                        <div className="flex gap-2 shrink-0">
                          <Button size="sm" variant="destructive" onClick={() => confirmDelete(registration.id)} disabled={isDeleting} className="h-8">
                            {isDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1" /> : <Trash2 className="w-3.5 h-3.5 mr-1" />}
                            {isDeleting ? "Deleting…" : "Confirm Delete"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setDeleteConfirmId(null)} disabled={isDeleting} className="h-8">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Inline edit form */}
                    {isEditing && (
                      <div className="mt-4 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Full Name</Label>
                            <Input value={editForm.name ?? ""} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} className="h-9 text-sm" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Phone</Label>
                            <Input value={editForm.phone ?? ""} onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))} className="h-9 text-sm" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">University / Organization</Label>
                            <Input value={editForm.university ?? ""} onChange={(e) => setEditForm((f) => ({ ...f, university: e.target.value }))} className="h-9 text-sm" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Team Name</Label>
                            <Input value={editForm.team_name ?? ""} onChange={(e) => setEditForm((f) => ({ ...f, team_name: e.target.value }))} placeholder="Optional" className="h-9 text-sm" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Experience</Label>
                            <Select value={editForm.experience ?? ""} onValueChange={(v) => setEditForm((f) => ({ ...f, experience: v }))}>
                              <SelectTrigger className="h-9 text-sm">
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                                <SelectItem value="expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600 mb-1 block">Participation Type</Label>
                            <Select value={editForm.participation_type ?? ""} onValueChange={(v) => setEditForm((f) => ({ ...f, participation_type: v }))}>
                              <SelectTrigger className="h-9 text-sm">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="workshops">Workshops Only</SelectItem>
                                <SelectItem value="hackathon">AI Hackathon</SelectItem>
                                <SelectItem value="startup">Startup Competition</SelectItem>
                                <SelectItem value="all">Everything</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 mb-1 block">Interests</Label>
                          <Textarea value={editForm.interests ?? ""} onChange={(e) => setEditForm((f) => ({ ...f, interests: e.target.value }))} rows={2} className="text-sm resize-none" placeholder="Optional" />
                        </div>
                        <div className="flex gap-2 pt-1">
                          <Button size="sm" onClick={() => saveEdit(registration.id)} disabled={isSaving} className="h-8 bg-blue-600 hover:bg-blue-700 text-white">
                            <Save className="w-3.5 h-3.5 mr-1" />
                            {isSaving ? "Saving…" : "Save Changes"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit} disabled={isSaving} className="h-8">
                            <X className="w-3.5 h-3.5 mr-1" /> Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Badges (view mode only) */}
                    {!isEditing && (
                      <>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {registration.attended && (
                            <Badge className="text-xs bg-green-100 text-green-700 border border-green-300 hover:bg-green-100">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Attended
                              {registration.attended_at && (
                                <span className="ml-1 opacity-75">
                                  · {new Date(registration.attended_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </span>
                              )}
                            </Badge>
                          )}
                          {registration.experience && <Badge variant="secondary" className="text-xs">{registration.experience}</Badge>}
                          {registration.participation_type && <Badge variant="outline" className="text-xs">{registration.participation_type}</Badge>}
                          {registration.team_name && <Badge variant="default" className="text-xs">Team: {registration.team_name}</Badge>}
                        </div>
                        {registration.interests && (
                          <div className="mt-2 text-sm text-gray-600">
                            <strong className="text-gray-700">Interests:</strong> {registration.interests}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}

              {registrations.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">No registrations yet</p>
                  <p className="text-sm">Share the registration link to get started!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
