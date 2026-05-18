"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Sparkles, Trophy, Users, Rocket, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessAlertProps {
  isOpen: boolean
  onClose: () => void
  userName: string
}

export function SuccessAlert({ isOpen, onClose, userName }: SuccessAlertProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setShowConfetti(true)
      
      // Auto close after 8 seconds
      const timer = setTimeout(() => {
        onClose()
      }, 8000)

      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
      setShowConfetti(false)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-confetti-${i % 4}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'][i % 5]
              }}
            />
          ))}
        </div>
      )}

      {/* Main Alert */}
      <div className={`relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-200/50 transform transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Success Icon */}
        <div className="relative p-8 text-center">
          <div className="relative mb-6">
            {/* Animated background circles */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse animation-delay-1000"></div>
            
            {/* Main icon */}
            <div className="relative w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-slow">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              🎉 Registration Successful!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Welcome <span className="font-bold text-blue-600">{userName}</span>! 
              You're now part of Pakistan's biggest AI event.
            </p>

            {/* Event Highlights */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-blue-800">PKR 150K</div>
                <div className="text-xs text-blue-600">Prizes</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-purple-800">200+</div>
                <div className="text-xs text-purple-600">Attendees</div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <Sparkles className="w-5 h-5 text-yellow-600 mr-2 animate-spin" />
                What's Next?
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Check your email for confirmation</li>
                <li>• Join our WhatsApp group</li>
                <li>• Prepare for the hackathon</li>
                <li>• Follow us on social media</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Awesome!
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
} 