"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle, XCircle, Loader2, Camera, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScanResult {
  success: boolean
  alreadyAttended?: boolean
  registration?: {
    name: string
    email: string
    university: string
    participation_type?: string
    attended_at?: string
  }
  error?: string
}

interface QrScannerProps {
  adminToken: string
  onClose: () => void
}

export function QrScanner({ adminToken, onClose }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const scannerRef = useRef<{ stop: () => void } | null>(null)
  const [status, setStatus] = useState<"scanning" | "loading" | "result">("scanning")
  const [result, setResult] = useState<ScanResult | null>(null)
  const [cameraError, setCameraError] = useState("")

  useEffect(() => {
    startScanner()
    return () => stopScanner()
  }, [])

  const stopScanner = () => {
    scannerRef.current?.stop()
    streamRef.current?.getTracks().forEach((t) => t.stop())
  }

  const startScanner = async () => {
    setCameraError("")
    setStatus("scanning")
    setResult(null)

    try {
      const { Html5Qrcode } = await import("html5-qrcode")

      const containerId = "qr-reader-container"
      const html5QrCode = new Html5Qrcode(containerId)

      const devices = await Html5Qrcode.getCameras()
      if (!devices.length) {
        setCameraError("No camera found on this device.")
        return
      }

      // Prefer back camera on mobile
      const camera = devices.find((d) => /back|rear|environment/i.test(d.label)) ?? devices[devices.length - 1]

      await html5QrCode.start(
        camera.id,
        { fps: 10, qrbox: { width: 220, height: 220 } },
        async (decodedText) => {
          html5QrCode.stop().catch(() => {})
          scannerRef.current = null
          await handleScan(decodedText)
        },
        () => {}
      )

      scannerRef.current = { stop: () => html5QrCode.stop().catch(() => {}) }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.toLowerCase().includes("permission") || msg.toLowerCase().includes("denied")) {
        setCameraError("Camera access denied. Please allow camera permission and try again.")
      } else {
        setCameraError("Could not start camera. " + msg)
      }
    }
  }

  const handleScan = async (token: string) => {
    setStatus("loading")
    try {
      const res = await fetch("/api/admin/mark-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      setResult(data)
      setStatus("result")
    } catch {
      setResult({ success: false, error: "Network error. Please try again." })
      setStatus("result")
    }
  }

  const handleScanAnother = () => {
    setResult(null)
    startScanner()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Camera className="w-5 h-5" />
            <span className="font-bold text-lg">Scan Attendance QR</span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div className="p-5">
          {/* Scanning state */}
          {status === "scanning" && (
            <>
              {cameraError ? (
                <div className="text-center py-6 space-y-4">
                  <XCircle className="w-12 h-12 text-red-400 mx-auto" />
                  <p className="text-sm text-red-600">{cameraError}</p>
                  <Button onClick={startScanner} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" /> Retry
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 text-center mb-3">
                    Point the camera at the participant's QR code
                  </p>
                  {/* html5-qrcode mounts into this div */}
                  <div
                    id="qr-reader-container"
                    className="w-full rounded-xl overflow-hidden border-2 border-blue-200"
                    style={{ minHeight: 260 }}
                  />
                </>
              )}
            </>
          )}

          {/* Loading state */}
          {status === "loading" && (
            <div className="text-center py-10 space-y-3">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
              <p className="text-gray-600 font-medium">Marking attendance…</p>
            </div>
          )}

          {/* Result state */}
          {status === "result" && result && (
            <div className="space-y-4">
              {result.error ? (
                <div className="text-center py-4 space-y-3">
                  <XCircle className="w-14 h-14 text-red-400 mx-auto" />
                  <p className="font-semibold text-red-700">{result.error}</p>
                </div>
              ) : result.alreadyAttended ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-600">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-bold text-base">Already Checked In</span>
                  </div>
                  <ParticipantCard registration={result.registration!} />
                  <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    This participant was already marked present.
                    {result.registration?.attended_at && (
                      <> Checked in at {new Date(result.registration.attended_at).toLocaleTimeString()}.</>
                    )}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-7 h-7" />
                    <span className="font-bold text-lg">Attendance Marked!</span>
                  </div>
                  <ParticipantCard registration={result.registration!} />
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button onClick={handleScanAnother} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  <Camera className="w-4 h-4 mr-2" /> Scan Next
                </Button>
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ParticipantCard({ registration }: { registration: NonNullable<ScanResult["registration"]> }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-1">
      <p className="font-bold text-gray-900 text-lg leading-tight">{registration.name}</p>
      <p className="text-sm text-gray-500">{registration.email}</p>
      <p className="text-sm text-gray-500">{registration.university}</p>
      {registration.participation_type && (
        <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
          {registration.participation_type}
        </span>
      )}
    </div>
  )
}
