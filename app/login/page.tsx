"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, X, RotateCcw, LogIn, UserPlus, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const router = useRouter()

  const handleCancelBooking = () => {
    setShowCancelDialog(false)
    router.push("/")
  }

  const handleStartOver = () => {
    setLoginData({
      email: "",
      password: "",
    })
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    router.push("/services")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
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
      <div className="bg-slate-100 dark:bg-slate-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, label: "Service", icon: "🛍️", active: false, completed: true },
              { step: 2, label: "User details", icon: "👤", active: false, completed: true },
              { step: 3, label: "Raf", icon: "📋", active: false, completed: true },
              { step: 4, label: "Login", icon: "🔐", active: true, completed: false },
              { step: 5, label: "Payment", icon: "💳", active: false, completed: false },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                    item.active ? "bg-blue-600" : item.completed ? "bg-emerald-600" : "bg-slate-600 dark:bg-slate-700"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-sm mt-2">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-1 bg-slate-300 dark:bg-slate-700 rounded-full">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "80%" }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Sign In or Register</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Please sign in to your account or create a new one to continue
          </p>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
              <TabsTrigger value="signin" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-6">
              <Card className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-slate-900 dark:text-white">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                        className="bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-slate-900 dark:text-white">
                        Password *
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                        className="bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1"
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <Card className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-slate-900 dark:text-white">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="First name"
                          value={registerData.firstName}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, firstName: e.target.value }))}
                          className="bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-slate-900 dark:text-white">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Last name"
                          value={registerData.lastName}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, lastName: e.target.value }))}
                          className="bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="registerEmail" className="text-slate-900 dark:text-white">
                        Email Address *
                      </Label>
                      <Input
                        id="registerEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                        className="bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="registerPassword" className="text-slate-900 dark:text-white">
                        Password *
                      </Label>
                      <Input
                        id="registerPassword"
                        type="password"
                        placeholder="Enter your password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                        className="bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="text-slate-900 dark:text-white">
                        Confirm Password *
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        className="bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white mt-1"
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Register
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <Link href="/medical-questionnaire">
              <Button
                variant="outline"
                className="border-slate-300 dark:border-slate-600 text-gray-500 dark:text-gray-400 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            </Link>

            <Link href="/payment">
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
