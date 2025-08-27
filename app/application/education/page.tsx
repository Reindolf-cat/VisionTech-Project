"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, FileText, Camera } from "lucide-react"
import Image from "next/image"

export default function EducationPage() {
  const [educationData, setEducationData] = useState({
    highestEducation: "",
    yearCompleted: "",
    proofOfEducation: null as File | null,
    passportPicture: null as File | null,
  })

  const handleInputChange = (field: string, value: string) => {
    setEducationData((prev) => {
      const updated = { ...prev, [field]: value }
      // Save to session storage for persistence
      sessionStorage.setItem('applicationEducationInfo', JSON.stringify(updated))
      return updated
    })
  }

  const handleFileChange = (field: string, file: File | null) => {
    setEducationData((prev) => ({ ...prev, [field]: file }))
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

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

      {/* Education Information Card */}
      <Card className="relative z-10 w-full max-w-2xl bg-white shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Back Button */}
          <div className="flex justify-start">
            <Button variant="ghost" size="sm" asChild className="p-2">
              <Link href="/application/guardian">
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
            <p className="text-gray-600">Education & Documents</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Education Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Educational Background</h3>

            {/* Highest Education and Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="highestEducation">Highest Education *</Label>
                <Select
                  value={educationData.highestEducation}
                  onValueChange={(value) => handleInputChange("highestEducation", value)}
                >
                  <SelectTrigger className="h-11 bg-gray-50 border-gray-200 rounded-lg">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BECE">BECE</SelectItem>
                    <SelectItem value="WASSCE">WASSCE</SelectItem>
                    <SelectItem value="HND">HND</SelectItem>
                    <SelectItem value="DIPLOMA">DIPLOMA</SelectItem>
                    <SelectItem value="DEGREE">DEGREE</SelectItem>
                    <SelectItem value="OTHER">OTHER</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearCompleted">Year Completed *</Label>
                <Select
                  value={educationData.yearCompleted}
                  onValueChange={(value) => handleInputChange("yearCompleted", value)}
                >
                  <SelectTrigger className="h-11 bg-gray-50 border-gray-200 rounded-lg">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Required Documents</h3>

            {/* Proof of Education Upload */}
            <div className="space-y-2">
              <Label htmlFor="proofOfEducation">Upload Proof of Education *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  id="proofOfEducation"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("proofOfEducation", e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label htmlFor="proofOfEducation" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <FileText className="w-8 h-8 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      {educationData.proofOfEducation ? (
                        <span className="text-green-600 font-medium">{educationData.proofOfEducation.name}</span>
                      ) : (
                        <>
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Passport Picture Upload */}
            <div className="space-y-2">
              <Label htmlFor="passportPicture">Upload Passport Picture *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  id="passportPicture"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("passportPicture", e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label htmlFor="passportPicture" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <Camera className="w-8 h-8 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      {educationData.passportPicture ? (
                        <span className="text-green-600 font-medium">{educationData.passportPicture.name}</span>
                      ) : (
                        <>
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">JPG, PNG up to 2MB</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Upload Guidelines */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>Upload Guidelines:</strong>
              </p>
              <ul className="text-sm text-amber-700 mt-2 space-y-1 list-disc list-inside">
                <li>Ensure documents are clear and readable</li>
                <li>Passport photo should be recent (within 6 months)</li>
                <li>All documents must be in PDF, JPG, or PNG format</li>
                <li>Maximum file size: 5MB for certificates, 2MB for photos</li>
              </ul>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" asChild className="h-11 px-6 bg-transparent">
              <Link href="/application/guardian">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <Button className="h-11 px-6 bg-gray-900 hover:bg-gray-800" asChild>
              <Link href="/application/programs">
                Next: Programs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
