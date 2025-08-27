"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic validation
    if (!phoneNumber.trim()) {
      setError("Please enter your phone number")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumber.trim() }),
      })

      const data = await response.json()

      if (data.success) {
        // Store phone number in session storage for OTP verification
        sessionStorage.setItem('phoneNumber', data.phoneNumber)
        router.push('/verify-otp')
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.')
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.')
      console.error('Error sending OTP:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '')
    
    // Format as Ghana number
    if (cleaned.length <= 10) {
      if (cleaned.length >= 3) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{0,4})/, '$1 $2 $3').trim()
      }
      return cleaned
    }
    return cleaned.slice(0, 10)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
    setError("") // Clear error when user starts typing
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

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo1.png"
              alt="VisionTech Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">Visiontech</h1>
            <p className="text-gray-600">Online Applications Portal</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  +233
                </span>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="e.g. 244 123 456"
                  className="h-12 bg-gray-50 border-gray-200 rounded-lg pl-16"
                  maxLength={13}
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Enter your Ghana mobile number (without country code)
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button 
              type="submit"
              disabled={isLoading || !phoneNumber.trim()}
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium disabled:bg-gray-400"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>

          {/* Back to Programs */}
          <div className="text-center pt-4">
            <Link href="/programs" className="text-sm text-gray-600 hover:text-gray-800">
              ← Back to Programs
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
