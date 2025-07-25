"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, X, RotateCcw, AlertCircle, AlertTriangle, CalendarIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: Date | undefined
  addressLine1: string
  addressLine2: string
  city: string
  postcode: string
  country: string
  notes: string
}

interface FormErrors {
  [key: string]: string
}

export default function UserDetailsPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: undefined,
    addressLine1: "",
    addressLine2: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
    notes: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showErrors, setShowErrors] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(2000, 0)) // Start from year 2000
  const router = useRouter()

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "The user details first name field is required."
    if (!formData.lastName.trim()) newErrors.lastName = "The user details last name field is required."
    if (!formData.email.trim()) newErrors.email = "The user details email field is required."
    if (!formData.phone.trim()) newErrors.phone = "The user details phone field is required."
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "The user details dob field is required."
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = "The user details address 1 field is required."
    if (!formData.city.trim()) newErrors.city = "The user details city field is required."
    if (!formData.postcode.trim()) newErrors.postcode = "The user details postcode field is required."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Proceed to next step
      window.location.href = "/medical-questionnaire"
    } else {
      setShowErrors(true)
    }
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleCancelBooking = () => {
    setShowCancelDialog(false)
    router.push("/")
  }

  const handleStartOver = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: undefined,
      addressLine1: "",
      addressLine2: "",
      city: "",
      postcode: "",
      country: "United Kingdom",
      notes: "",
    })
    setErrors({})
    setShowErrors(false)
    router.push("/services")
  }

  // Generate years from 1920 to current year
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => currentYear - i)

  // Generate months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const handleYearChange = (year: string) => {
    const newDate = new Date(Number.parseInt(year), calendarMonth.getMonth())
    setCalendarMonth(newDate)
  }

  const handleMonthChange = (monthIndex: string) => {
    const newDate = new Date(calendarMonth.getFullYear(), Number.parseInt(monthIndex))
    setCalendarMonth(newDate)
  }

  useEffect(() => {
    if (showErrors && Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setShowErrors(false)
      }, 3000) // 3 seconds

      return () => clearTimeout(timer)
    }
  }, [showErrors, errors])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">Weight Management Service</h1>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent"
              onClick={() => setShowCancelDialog(true)}
            >
              <X className="w-4 h-4 mr-1" />
              Cancel Booking
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black bg-transparent"
              onClick={handleStartOver}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Start Over
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-slate-100 dark:bg-slate-800 py-6 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, label: "Service", icon: "🛍️", active: false, completed: true },
              { step: 2, label: "User details", icon: "👤", active: true, completed: false },
              { step: 3, label: "Raf", icon: "📋", active: false, completed: false },
              { step: 4, label: "Login", icon: "🔐", active: false, completed: false },
              { step: 5, label: "Payment", icon: "💳", active: false, completed: false },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                    item.active ? "bg-blue-600" : item.completed ? "bg-emerald-600" : "bg-slate-600"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-sm mt-2">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-1 bg-slate-700 rounded-full">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "40%" }}></div>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {showErrors && Object.keys(errors).length > 0 && (
        <div className="fixed top-20 right-4 space-y-2 z-50">
          {Object.entries(errors).map(([field, error], index) => (
            <Alert
              key={`${field}-${index}`}
              className="bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700 text-red-800 dark:text-red-100 max-w-sm animate-in slide-in-from-right-full duration-300"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1 right-1 h-6 w-6 p-0 text-red-300 hover:text-red-100"
                onClick={() => {
                  const newErrors = { ...errors }
                  delete newErrors[field]
                  setErrors(newErrors)
                  if (Object.keys(newErrors).length === 0) {
                    setShowErrors(false)
                  }
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Alert>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Your Details</h2>
          <p className="text-slate-600 dark:text-gray-400 mb-8">Please provide your contact information</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-slate-900 dark:text-white">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1 ${errors.firstName ? "border-red-500" : ""}`}
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-slate-900 dark:text-white">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1 ${errors.lastName ? "border-red-500" : ""}`}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-slate-900 dark:text-white">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-slate-900 dark:text-white">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1 ${errors.phone ? "border-red-500" : ""}`}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dateOfBirth" className="text-slate-900 dark:text-white">
                Date of Birth *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1 ${errors.dateOfBirth ? "border-red-500" : ""}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfBirth ? format(formData.dateOfBirth, "dd/MM/yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  align="start"
                >
                  <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between space-x-2">
                      <Select value={calendarMonth.getMonth().toString()} onValueChange={handleMonthChange}>
                        <SelectTrigger className="w-[130px] bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 max-h-60">
                          {months.map((month, index) => (
                            <SelectItem key={index} value={index.toString()} className="text-slate-900 dark:text-white">
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={calendarMonth.getFullYear().toString()} onValueChange={handleYearChange}>
                        <SelectTrigger className="w-[100px] bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 max-h-60">
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()} className="text-slate-900 dark:text-white">
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth}
                    onSelect={(date) => handleInputChange("dateOfBirth", date)}
                    month={calendarMonth}
                    onMonthChange={setCalendarMonth}
                    disabled={(date) => date > new Date() || date < new Date("1920-01-01")}
                    initialFocus
                    className="text-slate-900 dark:text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Address Information */}
            <div className="pt-4">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Address Information</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="addressLine1" className="text-slate-900 dark:text-white">
                    Address Line 1 *
                  </Label>
                  <Input
                    id="addressLine1"
                    placeholder="Enter your address"
                    value={formData.addressLine1}
                    onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                    className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1 ${errors.addressLine1 ? "border-red-500" : ""}`}
                  />
                </div>

                <div>
                  <Label htmlFor="addressLine2" className="text-slate-900 dark:text-white">
                    Address Line 2
                  </Label>
                  <Input
                    id="addressLine2"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.addressLine2}
                    onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                    className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-slate-900 dark:text-white">
                      City *
                    </Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1 ${errors.city ? "border-red-500" : ""}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postcode" className="text-slate-900 dark:text-white">
                      Postcode *
                    </Label>
                    <Input
                      id="postcode"
                      placeholder="Enter your postcode"
                      value={formData.postcode}
                      onChange={(e) => handleInputChange("postcode", e.target.value)}
                      className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1 ${errors.postcode ? "border-red-500" : ""}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-slate-900 dark:text-white">
                      Country *
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Ireland">Ireland</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="pt-4">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Additional Information</h3>
              <div>
                <Label htmlFor="notes" className="text-slate-900 dark:text-white">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Please share any additional information, special requirements, or notes about your appointment..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1 min-h-[100px]"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link href="/services">
                <Button variant="outline" className="border-slate-600 text-gray-400 bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              </Link>

              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Next
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Cancel Booking Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span>Cancel Booking</span>
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-300">
              Are you sure you want to cancel this booking?
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-gray-500 dark:text-gray-300 mb-4">This action will:</p>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>• Delete all your booking data</li>
              <li>• Remove your appointment slot</li>
              <li>• Clear any form submissions</li>
              <li>• Redirect you to the homepage</li>
            </ul>
            <p className="text-red-400 text-sm mt-4 font-medium">This action cannot be undone.</p>
          </div>

          <DialogFooter className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              className="border-slate-300 dark:border-slate-600 text-gray-500 dark:text-gray-400"
            >
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking} className="bg-red-600 hover:bg-red-700">
              <X className="w-4 h-4 mr-2" />
              Yes, Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
