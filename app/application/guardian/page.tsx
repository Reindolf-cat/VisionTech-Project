"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function GuardianInfoPage() {
  const [guardianData, setGuardianData] = useState({
    guardianName: "",
    guardianOccupation: "",
    guardianTelephone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user came from previous step
    const personalInfo = sessionStorage.getItem('applicationPersonalInfo')
    if (!personalInfo) {
      router.push('/application')
      return
    }

    // Load existing guardian data if available
    const savedData = sessionStorage.getItem('applicationGuardianInfo')
    if (savedData) {
      setGuardianData(JSON.parse(savedData))
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setGuardianData((prev) => {
      const updated = { ...prev, [field]: value }
      // Save to session storage for persistence
      sessionStorage.setItem('applicationGuardianInfo', JSON.stringify(updated))
      return updated
    })
  }

  const handleNext = async () => {
    setError("")
    setIsLoading(true)

    // Validate required fields
    const requiredFields = ['guardianName', 'guardianOccupation', 'guardianTelephone']
    const missingFields = requiredFields.filter(field => !guardianData[field])
    
    if (missingFields.length > 0) {
      setError('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    try {
      // Save guardian data to session storage
      sessionStorage.setItem('applicationGuardianInfo', JSON.stringify(guardianData))
      
      // Navigate to next step
      router.push('/application/education')
    } catch (error) {
      console.error('Error saving guardian info:', error)
      setError('Failed to save guardian information. Please try again.')
    } finally {
      setIsLoading(false)
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

      {/* Guardian Information Card */}
      <Card className="relative z-10 w-full max-w-2xl bg-white shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Back Button */}
          <div className="flex justify-start">
            <Button variant="ghost" size="sm" asChild className="p-2">
              <Link href="/application">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo1.png"
              alt="VisionTech Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900">Application Form</h1>
            <p className="text-gray-600">Guardian Information</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Guardian Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Guardian Details</h3>

            {/* Guardian Name */}
            <div className="space-y-2">
              <Label htmlFor="guardianName">Guardian Full Name *</Label>
              <Input
                id="guardianName"
                type="text"
                value={guardianData.guardianName}
                onChange={(e) => handleInputChange("guardianName", e.target.value)}
                className="h-11 bg-gray-50 border-gray-200 rounded-lg"
                placeholder="e.g. John Doe"
                required
              />
            </div>

            {/* Guardian Occupation and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guardianOccupation">Guardian Occupation *</Label>
                <Input
                  id="guardianOccupation"
                  type="text"
                  value={guardianData.guardianOccupation}
                  onChange={(e) => handleInputChange("guardianOccupation", e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 rounded-lg"
                  placeholder="e.g. Teacher, Engineer, Farmer"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianTelephone">Guardian Telephone *</Label>
                <Input
                  id="guardianTelephone"
                  type="tel"
                  value={guardianData.guardianTelephone}
                  onChange={(e) => handleInputChange("guardianTelephone", e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 rounded-lg"
                  placeholder="e.g. +233 24 123 4567"
                  required
                />
              </div>
            </div>

            {/* Information Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Guardian information is required for applicants under 18 years of age or as an
                emergency contact. Please ensure all details are accurate.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" asChild className="h-11 px-6 bg-transparent">
              <Link href="/application">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <Button 
              onClick={handleNext}
              disabled={isLoading}
              className="h-11 px-6 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400"
            >
              {isLoading ? "Saving..." : "Next: Education"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
