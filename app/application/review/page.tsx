"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, User, Users, GraduationCap, BookOpen } from "lucide-react"
import Image from "next/image"

export default function ReviewPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  // State to hold the application data
  const [applicationData, setApplicationData] = useState({
    personalInfo: null,
    guardianInfo: null,
    educationInfo: null,
    programInfo: null
  })

  // Load data from sessionStorage when component mounts
  useEffect(() => {
    const loadApplicationData = () => {
      try {
        const personalInfo = sessionStorage.getItem('applicationPersonalInfo')
        const guardianInfo = sessionStorage.getItem('applicationGuardianInfo')
        const educationInfo = sessionStorage.getItem('applicationEducationInfo')
        const programInfo = sessionStorage.getItem('applicationProgramInfo')

        setApplicationData({
          personalInfo: personalInfo ? JSON.parse(personalInfo) : null,
          guardianInfo: guardianInfo ? JSON.parse(guardianInfo) : null,
          educationInfo: educationInfo ? JSON.parse(educationInfo) : null,
          programInfo: programInfo ? JSON.parse(programInfo) : null
        })
      } catch (error) {
        console.error('Error loading application data:', error)
      }
    }

    loadApplicationData()
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError("")

    try {
      // Get all application data from session storage
      const personalInfo = sessionStorage.getItem('applicationPersonalInfo')
      const guardianInfo = sessionStorage.getItem('applicationGuardianInfo')
      const educationInfo = sessionStorage.getItem('applicationEducationInfo')
      const programInfo = sessionStorage.getItem('applicationProgramInfo')
      const verifiedPhone = sessionStorage.getItem('verifiedPhoneNumber')

      if (!personalInfo || !guardianInfo || !educationInfo || !programInfo) {
        throw new Error('Please complete all sections of the application')
      }

      // Get user ID by finding user with verified phone number
      const userResponse = await fetch('/api/users/by-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: verifiedPhone }),
      })

      const userData = await userResponse.json()
      if (!userData.success) {
        throw new Error('User verification failed. Please try logging in again.')
      }

      // Create complete application
      const applicationResponse = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.data.id,
          personalInfo: JSON.parse(personalInfo),
          guardianInfo: JSON.parse(guardianInfo),
          educationInfo: JSON.parse(educationInfo),
          programInfo: JSON.parse(programInfo),
        }),
      })

      const applicationData = await applicationResponse.json()
      if (!applicationData.success) {
        throw new Error(applicationData.message || 'Failed to submit application')
      }

      // Update application status to submitted
      await fetch(`/api/applications/${applicationData.data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'SUBMITTED'
        }),
      })

      // Clear session storage
      sessionStorage.removeItem('applicationPersonalInfo')
      sessionStorage.removeItem('applicationGuardianInfo')
      sessionStorage.removeItem('applicationEducationInfo')
      sessionStorage.removeItem('applicationProgramInfo')
      sessionStorage.removeItem('verifiedPhoneNumber')

      // Store application number for display
      sessionStorage.setItem('submittedApplicationNumber', applicationData.data.applicationNumber)

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting application:', error)
      setError(error.message || 'Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
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

        {/* Success Card */}
        <Card className="relative z-10 w-full max-w-md bg-white shadow-2xl">
          <CardContent className="text-center space-y-6 pt-8">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900">Application Submitted!</h1>
              <p className="text-gray-600">
                Thank you for applying to VisionTech University. We have received your application and will review it shortly.
              </p>
              {(() => {
                const appNumber = sessionStorage.getItem('submittedApplicationNumber')
                return appNumber ? (
                  <p className="text-sm font-medium text-blue-600">
                    Application Number: {appNumber}
                  </p>
                ) : null
              })()}
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>What's Next?</strong>
              </p>
              <ul className="text-sm text-green-700 mt-2 space-y-1 list-disc list-inside">
                <li>You will receive a confirmation email shortly</li>
                <li>Our admissions team will review your application</li>
                <li>We will contact you within 3-5 business days</li>
                <li>Keep your phone and email accessible</li>
              </ul>
            </div>
            <Button className="w-full h-12 bg-gray-900 hover:bg-gray-800" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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

      {/* Review Card */}
      <Card className="relative z-10 w-full max-w-2xl bg-white shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Back Button */}
          <div className="flex justify-start">
            <Button variant="ghost" size="sm" asChild className="p-2">
              <Link href="/application/programs">
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
            <h1 className="text-2xl font-semibold text-gray-900">Review & Submit</h1>
            <p className="text-gray-600">Please review your information before submitting</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Application Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Application Summary</h3>

            {/* Personal Information Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-5 h-5 text-gray-600" />
                <h4 className="font-medium text-gray-900">Personal Information</h4>
                <Button variant="ghost" size="sm" asChild className="ml-auto">
                  <Link href="/application" className="text-blue-600 hover:text-blue-700">Edit</Link>
                </Button>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Name:</strong> {applicationData.personalInfo?.firstName} {applicationData.personalInfo?.surname || 'Not provided'}</p>
                <p><strong>Email:</strong> {applicationData.personalInfo?.email || 'Not provided'}</p>
                <p><strong>Phone:</strong> {applicationData.personalInfo?.telephone || 'Not provided'}</p>
                <p><strong>Address:</strong> {applicationData.personalInfo?.address || 'Not provided'}</p>
              </div>
            </div>

            {/* Guardian Information Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-5 h-5 text-gray-600" />
                <h4 className="font-medium text-gray-900">Guardian Information</h4>
                <Button variant="ghost" size="sm" asChild className="ml-auto">
                  <Link href="/application/guardian" className="text-blue-600 hover:text-blue-700">Edit</Link>
                </Button>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Guardian Name:</strong> {applicationData.guardianInfo?.guardianName || 'Not provided'}</p>
                <p><strong>Occupation:</strong> {applicationData.guardianInfo?.guardianOccupation || 'Not provided'}</p>
                <p><strong>Phone:</strong> {applicationData.guardianInfo?.guardianTelephone || 'Not provided'}</p>
              </div>
            </div>

            {/* Education Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <GraduationCap className="w-5 h-5 text-gray-600" />
                <h4 className="font-medium text-gray-900">Education & Documents</h4>
                <Button variant="ghost" size="sm" asChild className="ml-auto">
                  <Link href="/application/education" className="text-blue-600 hover:text-blue-700">Edit</Link>
                </Button>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Highest Education:</strong> {applicationData.educationInfo?.highestEducation || 'Not selected'}</p>
                <p><strong>Year Completed:</strong> {applicationData.educationInfo?.yearCompleted || 'Not selected'}</p>
                <p><strong>Documents:</strong> {
                  applicationData.educationInfo?.documents && applicationData.educationInfo?.passportPhoto
                    ? 'Proof of Education & Passport Photo uploaded'
                    : applicationData.educationInfo?.documents
                      ? 'Proof of Education uploaded'
                      : applicationData.educationInfo?.passportPhoto
                        ? 'Passport Photo uploaded'
                        : 'No documents uploaded'
                }</p>
              </div>
            </div>

            {/* Program Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <BookOpen className="w-5 h-5 text-gray-600" />
                <h4 className="font-medium text-gray-900">Program Selection</h4>
                <Button variant="ghost" size="sm" asChild className="ml-auto">
                  <Link href="/application/programs" className="text-blue-600 hover:text-blue-700">Edit</Link>
                </Button>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Program Type:</strong> {applicationData.programInfo?.programType || 'Not selected'}</p>
                <p><strong>Specific Program:</strong> {applicationData.programInfo?.specificProgram || 'Not selected'}</p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Declaration:</strong>
              </p>
              <p className="text-sm text-blue-700 mt-2">
                By submitting this application, I declare that all information provided is true and accurate to the best of my knowledge.
                I understand that any false information may result in the rejection of my application or dismissal from the program.
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
              <Link href="/application/programs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <Button
              className="h-11 px-6 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}