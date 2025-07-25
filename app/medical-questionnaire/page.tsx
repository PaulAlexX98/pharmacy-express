"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, X, RotateCcw, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function MedicalQuestionnairePage() {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    ethnicity: "",
    targetWeight: "",
    goals: [] as string[],
    goalDescription: "",
  })

  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const router = useRouter()

  const ethnicityOptions = [
    "White British",
    "White Irish",
    "White Other",
    "Mixed White and Black Caribbean",
    "Mixed White and Black African",
    "Mixed White and Asian",
    "Mixed Other",
    "Asian or Asian British Indian",
    "Asian or Asian British Pakistani",
    "Asian or Asian British Bangladeshi",
    "Asian or Asian British Other",
    "Black or Black British Caribbean",
    "Black or Black British African",
    "Black or Black British Other",
    "Chinese",
    "Other Ethnic Group",
  ]

  const goalOptions = ["Alcohol Intake", "Diet", "Eating Habit", "Exercise", "Stop Smoking"]

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }))
  }

  const handleCancelBooking = () => {
    setShowCancelDialog(false)
    router.push("/")
  }

  const handleStartOver = () => {
    setFormData({
      height: "",
      weight: "",
      ethnicity: "",
      targetWeight: "",
      goals: [],
      goalDescription: "",
    })
    router.push("/services")
  }

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
              { step: 2, label: "User details", icon: "👤", active: false, completed: true },
              { step: 3, label: "Raf", icon: "📋", active: true, completed: false },
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
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "60%" }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Medical Questionnaire</h2>
          <p className="text-slate-600 dark:text-gray-400 mb-8">Please complete the required medical questionnaire</p>

          <div className="space-y-8">
            {/* Weight Management RAF */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white">Weight Management - (RAF)</CardTitle>
              </CardHeader>
            </Card>

            {/* BMI Calculation */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white">Calculating BMI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="height" className="text-slate-900 dark:text-white">
                    Height (CM) or Ft/inches *
                  </Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => setFormData((prev) => ({ ...prev, height: e.target.value }))}
                    className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="weight" className="text-slate-900 dark:text-white">
                    Weight (KG) or Stones *
                  </Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                    className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Ethnicity */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white">Ethnicity</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="ethnicity" className="text-slate-900 dark:text-white">
                    Please select your ethnicity from the drop down list below: *
                  </Label>
                  <Select
                    value={formData.ethnicity}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, ethnicity: value }))}
                  >
                    <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 max-h-60">
                      {ethnicityOptions.map((option) => (
                        <SelectItem key={option} value={option} className="text-white">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Goal Setting */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white">Goal Setting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-slate-900 dark:text-white block mb-4">
                    Please add below your target weight.
                  </Label>
                  <div>
                    <Label htmlFor="targetWeight" className="text-slate-900 dark:text-white">
                      Your target weight in Kilograms
                    </Label>
                    <Input
                      id="targetWeight"
                      value={formData.targetWeight}
                      onChange={(e) => setFormData((prev) => ({ ...prev, targetWeight: e.target.value }))}
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-slate-900 dark:text-white block mb-4">
                    Please select your goal from the drop down list below:
                  </Label>
                  <div className="bg-slate-700 border border-slate-600 rounded-md p-4 space-y-2 max-h-40 overflow-y-auto">
                    {goalOptions.map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={formData.goals.includes(goal)}
                          onCheckedChange={() => handleGoalToggle(goal)}
                        />
                        <Label htmlFor={goal} className="text-slate-900 dark:text-white cursor-pointer">
                          {goal}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm mt-2">Hold Ctrl/Cmd to select multiple options</p>
                  <p className="text-gray-400 text-sm">Please specify how you will achieve these goals?</p>
                </div>

                <div>
                  <Label htmlFor="goalDescription" className="text-slate-900 dark:text-white">
                    How you will achieve your goals
                  </Label>
                  <Textarea
                    id="goalDescription"
                    value={formData.goalDescription}
                    onChange={(e) => setFormData((prev) => ({ ...prev, goalDescription: e.target.value }))}
                    className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <Link href="/user-details">
              <Button variant="outline" className="border-slate-600 text-gray-400 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            </Link>

            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Next
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </div>
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
