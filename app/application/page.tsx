"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    telephone: "",
    nationality: "",
    address: "",
    gpsAddress: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [applicationId, setApplicationId] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Get verified phone number and check if user has an existing application
    const verifiedPhone = sessionStorage.getItem('verifiedPhoneNumber')
    if (!verifiedPhone) {
      router.push('/login')
      return
    }

    // Load existing application data if available
    const savedData = sessionStorage.getItem('applicationPersonalInfo')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }

    // Check for existing application ID
    const existingAppId = sessionStorage.getItem('applicationId')
    if (existingAppId) {
      setApplicationId(existingAppId)
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }
      // Save to session storage for persistence
      sessionStorage.setItem('applicationPersonalInfo', JSON.stringify(updated))
      return updated
    })
  }

  const handleNext = async () => {
    setError("")
    setIsLoading(true)

    // Validate required fields
    const requiredFields = ['firstName', 'surname', 'gender', 'dateOfBirth', 'email', 'telephone', 'nationality', 'address']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      setError('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    try {
      // Get user ID from verified phone number
      const verifiedPhone = sessionStorage.getItem('verifiedPhoneNumber')
      
      if (applicationId) {
        // Update existing application
        const response = await fetch(`/api/applications/${applicationId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalInfo: formData
          }),
        })

        const data = await response.json()
        if (!data.success) {
          throw new Error(data.message || 'Failed to update application')
        }
      } else {
        // Create new application (we'll complete it in later steps)
        // For now, just save to session storage and continue
        sessionStorage.setItem('applicationPersonalInfo', JSON.stringify(formData))
      }

      // Navigate to next step
      router.push('/application/guardian')
    } catch (error) {
      console.error('Error saving application:', error)
      setError(error.message || 'Failed to save application. Please try again.')
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

      {/* Application Form Card */}
      <Card className="relative z-10 w-full max-w-2xl bg-white shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Back Button */}
          <div className="flex justify-start">
            <Button variant="ghost" size="sm" asChild className="p-2">
              <Link href="/verify-otp">
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
            <p className="text-gray-600">Personal Information</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Details</h3>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Surname *</Label>
                <Input
                  id="surname"
                  type="text"
                  value={formData.surname}
                  onChange={(e) => handleInputChange("surname", e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Gender and DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="h-11 bg-gray-50 border-gray-200 rounded-lg">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 rounded-lg"
                  placeholder="e.g. kofimanu@gmail.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Telephone Number *</Label>
                <Input
                  id="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange("telephone", e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 rounded-lg"
                  placeholder="e.g. +233 24 123 4567"
                  required
                />
              </div>
            </div>

            {/* Nationality */}
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality *</Label>
              <Input
                id="nationality"
                type="text"
                value={formData.nationality}
                onChange={(e) => handleInputChange("nationality", e.target.value)}
                className="h-11 bg-gray-50 border-gray-200 rounded-lg"
                placeholder="e.g. Ghanaian"
                required
              />
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Residential Address *</Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 rounded-lg"
                  placeholder="e.g. House No. 123, Street Name, City"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpsAddress">GPS Address</Label>
                <Input
                  id="gpsAddress"
                  type="text"
                  value={formData.gpsAddress}
                  onChange={(e) => handleInputChange("gpsAddress", e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 rounded-lg"
                  placeholder="e.g. GA-123-4567"
                />
              </div>
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
              <Link href="/verify-otp">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <Button 
              onClick={handleNext}
              disabled={isLoading}
              className="h-11 px-6 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400"
            >
              {isLoading ? "Saving..." : "Next: Guardian Info"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
