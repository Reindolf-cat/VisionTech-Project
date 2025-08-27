"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Get phone number from session storage
    const storedPhoneNumber = sessionStorage.getItem('phoneNumber')
    if (!storedPhoneNumber) {
      // Redirect back to login if no phone number is stored
      router.push('/login')
      return
    }
    setPhoneNumber(storedPhoneNumber)
  }, [router])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      setError("") // Clear error when user starts typing

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const otpCode = otp.join("")
    
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phoneNumber: phoneNumber,
          code: otpCode 
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Clear phone number from session storage
        sessionStorage.removeItem('phoneNumber')
        // Store verified phone number for the application form
        sessionStorage.setItem('verifiedPhoneNumber', data.phoneNumber)
        router.push('/application')
      } else {
        setError(data.message || 'Invalid OTP. Please try again.')
        // Clear OTP inputs on error
        setOtp(["", "", "", "", "", ""])
        // Focus first input
        const firstInput = document.getElementById('otp-0')
        firstInput?.focus()
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.')
      console.error('Error verifying OTP:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setError("")

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumber }),
      })

      const data = await response.json()

      if (data.success) {
        // Clear current OTP
        setOtp(["", "", "", "", "", ""])
        // Show success message temporarily
        setError("") // Clear any previous errors
        // You could show a success toast here
      } else {
        setError(data.message || 'Failed to resend OTP. Please try again.')
      }
    } catch (error) {
      setError('Network error. Please try again.')
      console.error('Error resending OTP:', error)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/lab.png')",
          filter: "blur(3px)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* OTP Verification Card */}
      <Card className="relative z-10 w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Back Button */}
          <div className="flex justify-start">
            <Button variant="ghost" size="sm" asChild className="p-2">
              <Link href="/login">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo1.png"
              alt="VisionTech Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">Verify OTP</h1>
            <p className="text-gray-600 text-sm">Enter the 6-digit code sent to your phone</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Phone Number Display */}
          {phoneNumber && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Code sent to: <span className="font-medium">{phoneNumber}</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Fields */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold bg-gray-50 border-gray-200 rounded-lg"
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            {/* Verify Button */}
            <Button
              type="submit"
              disabled={isLoading || otp.some((digit) => !digit)}
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium disabled:bg-gray-400"
            >
              {isLoading ? "Verifying..." : "Verify & Continue"}
            </Button>
          </form>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button 
                onClick={handleResendOTP}
                disabled={isResending}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400"
              >
                {isResending ? "Sending..." : "Resend Code"}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
