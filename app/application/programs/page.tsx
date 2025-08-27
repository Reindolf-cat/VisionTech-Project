"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react"
import Image from "next/image"

export default function ProgramsPage() {
  const [programData, setProgramData] = useState({
    programType: "",
    specificProgram: "",
  })

  const handleProgramTypeChange = (value: string) => {
    const updated = {
      programType: value,
      specificProgram: "", // Reset specific program when type changes
    }
    setProgramData(updated)
    // Save to session storage for persistence
    sessionStorage.setItem('applicationProgramInfo', JSON.stringify(updated))
  }

  const handleSpecificProgramChange = (value: string) => {
    setProgramData((prev) => {
      const updated = { ...prev, specificProgram: value }
      // Save to session storage for persistence
      sessionStorage.setItem('applicationProgramInfo', JSON.stringify(updated))
      return updated
    })
  }

  const getSpecificProgramOptions = () => {
    switch (programData.programType) {
      case "foundational":
        return [
          { value: "basic-computer-literacy", label: "Basic Computer Literacy" },
          { value: "microsoft-office-suite", label: "Microsoft Office Suite" },
          { value: "internet-email-essentials", label: "Internet & Email Essentials" },
          { value: "intro-keyboard-skills", label: "Intro to Keyboard Skills" },
        ]
      case "diploma":
        return [
          { value: "graphic-web-design", label: "Graphic & Web Design" },
          { value: "computer-networking", label: "Computer Networking" },
          { value: "software-development", label: "Software Development" },
          { value: "cybersecurity", label: "Cybersecurity" },
          { value: "database-management", label: "Database Management" },
        ]
      case "degree":
        return [
          { value: "advanced-software-engineering", label: "Advanced Software Engineering" },
          { value: "full-stack-web-development", label: "Full Stack Web Development" },
          { value: "advanced-networking-security", label: "Advanced Networking & Security" },
          { value: "data-science-analytics", label: "Data Science & Analytics" },
          { value: "it-project-management", label: "IT Project Management" },
        ]
      default:
        return []
    }
  }

  const getProgramTypeDescription = () => {
    switch (programData.programType) {
      case "foundational":
        return "Build essential computer skills and digital literacy for beginners."
      case "diploma":
        return "Comprehensive technical training programs for career advancement."
      case "degree":
        return "Advanced professional programs for specialized expertise and leadership roles."
      default:
        return "Select a program type to see available options."
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

      {/* Program Selection Card */}
      <Card className="relative z-10 w-full max-w-2xl bg-white shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Back Button */}
          <div className="flex justify-start">
            <Button variant="ghost" size="sm" asChild className="p-2">
              <Link href="/application/education">
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
            <p className="text-gray-600">Program Selection</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Program Selection Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Choose Your Program</h3>

            {/* Program Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="programType">Program Type *</Label>
              <Select value={programData.programType} onValueChange={handleProgramTypeChange}>
                <SelectTrigger className="h-11 bg-gray-50 border-gray-200 rounded-lg">
                  <SelectValue placeholder="Select program type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="foundational">Foundational Courses</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="degree">Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Program Description */}
            {programData.programType && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      {programData.programType.charAt(0).toUpperCase() + programData.programType.slice(1)} Programs
                    </p>
                    <p className="text-sm text-blue-700 mt-1">{getProgramTypeDescription()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Specific Program Selection */}
            {programData.programType && (
              <div className="space-y-2">
                <Label htmlFor="specificProgram">Specific Program *</Label>
                <Select value={programData.specificProgram} onValueChange={handleSpecificProgramChange}>
                  <SelectTrigger className="h-11 bg-gray-50 border-gray-200 rounded-lg">
                    <SelectValue placeholder="Select specific program" />
                  </SelectTrigger>
                  <SelectContent>
                    {getSpecificProgramOptions().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Program Details */}
            {programData.specificProgram && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Selected Program:</strong>{" "}
                  {getSpecificProgramOptions().find((opt) => opt.value === programData.specificProgram)?.label}
                </p>
                <p className="text-sm text-green-700 mt-2">
                  You have successfully selected your program. Click "Next" to review and submit your application.
                </p>
              </div>
            )}

            {/* Program Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-800">
                <strong>Important Information:</strong>
              </p>
              <ul className="text-sm text-gray-700 mt-2 space-y-1 list-disc list-inside">
                <li>Program duration and fees will be communicated after application review</li>
                <li>Some programs may have prerequisite requirements</li>
                <li>Class schedules will be provided upon acceptance</li>
                <li>You can change your program selection before final submission</li>
              </ul>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" asChild className="h-11 px-6 bg-transparent">
              <Link href="/application/education">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <Button
              className="h-11 px-6 bg-gray-900 hover:bg-gray-800"
              disabled={!programData.programType || !programData.specificProgram}
              asChild
            >
              <Link href="/application/review">
                Next: Review
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
