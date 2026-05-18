"use client"

import { EVENT_CONFIG } from "@/lib/config"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Mail, Phone, GraduationCap, RefreshCw, Download, CheckCircle, XCircle, Lock, Eye, EyeOff, Menu, X, Home } from "lucide-react"

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
  const [googleSheetsConfigured, setGoogleSheetsConfigured] = useState<boolean | null>(null)

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

  return (
    <div className="min-h-screen bg-gray-50">
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
          <div className={`sm:hidden transition-all duration-300 ease-in-out ${showMobileMenu ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="py-4 space-y-3 border-t border-gray-200 bg-gray-50/50">
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
              {registrations.map((registration) => (
                <div key={registration.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-3 sm:space-y-0">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg text-gray-900">{registration.name}</h3>
                      
                      {/* Contact Info - Responsive Layout */}
                      <div className="mt-2 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex sm:items-center text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{registration.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{registration.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GraduationCap className="w-4 h-4" />
                          <span className="truncate">{registration.university}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs sm:text-sm text-gray-500">
                        {typeof window !== "undefined" 
                          ? new Date(registration.created_at).toLocaleDateString()
                          : registration.created_at
                        }
                      </div>
                    </div>
                  </div>

                  {/* Badges - Responsive Layout */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {registration.experience && (
                      <Badge variant="secondary" className="text-xs">
                        {registration.experience}
                      </Badge>
                    )}
                    {registration.participation_type && (
                      <Badge variant="outline" className="text-xs">
                        {registration.participation_type}
                      </Badge>
                    )}
                    {registration.team_name && (
                      <Badge variant="default" className="text-xs">
                        Team: {registration.team_name}
                      </Badge>
                    )}
                  </div>

                  {registration.interests && (
                    <div className="mt-3 text-sm text-gray-600">
                      <strong className="text-gray-700">Interests:</strong> {registration.interests}
                    </div>
                  )}
                </div>
              ))}

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
