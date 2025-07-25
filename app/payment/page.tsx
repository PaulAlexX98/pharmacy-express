"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, X, RotateCcw, CreditCard, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Service data (should match the services page)
const services = [
  {
    id: "consultation",
    title: "Book a Consultation (Telephone)",
    price: 20.0,
    type: "consultation",
  },
  {
    id: "mounjaro",
    title: "Mounjaro (tirzepatide)",
    options: [
      { id: "2.5mg-starter", name: "2.5mg Plus 1L Sharps Bin (Starter Pack)", price: 125.0 },
      { id: "2.5mg", name: "2.5mg", price: 120.0 },
      { id: "5mg", name: "5mg", price: 127.0 },
      { id: "7.5mg", name: "7.5mg", price: 134.95 },
      { id: "10mg", name: "10mg", price: 140.0 },
      { id: "12.5mg", name: "12.5mg", price: 169.95 },
      { id: "15mg", name: "15mg", price: 170.0 },
    ],
    type: "medication",
  },
]

export default function PaymentPage() {
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const router = useRouter()

  // Get selected services from localStorage or URL params
  useEffect(() => {
    // Try to get from localStorage first
    const storedServices = localStorage.getItem("selectedServices")
    if (storedServices) {
      setSelectedServices(JSON.parse(storedServices))
    } else {
      // Fallback: simulate some selected services for demo
      setSelectedServices(["consultation", "2.5mg"])
    }
  }, [])

  const getSelectedServiceDetails = () => {
    const selectedDetails: Array<{ name: string; price: number; quantity: number }> = []

    selectedServices.forEach((selectedId) => {
      // Check if it's a consultation service
      const consultationService = services.find((s) => s.id === selectedId && s.type === "consultation")
      if (consultationService) {
        selectedDetails.push({
          name: `${consultationService.title} - Consultation`,
          price: consultationService.price,
          quantity: 1,
        })
        return
      }

      // Check if it's a medication option
      services.forEach((service) => {
        if (service.type === "medication" && service.options) {
          const option = service.options.find((opt) => opt.id === selectedId)
          if (option) {
            selectedDetails.push({
              name: `${service.title} - ${option.name}`,
              price: option.price,
              quantity: 1,
            })
          }
        }
      })
    })

    return selectedDetails
  }

  const getTotalPrice = () => {
    return getSelectedServiceDetails().reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCancelBooking = () => {
    setShowCancelDialog(false)
    // Clear stored services
    localStorage.removeItem("selectedServices")
    router.push("/")
  }

  const handleStartOver = () => {
    // Clear stored services
    localStorage.removeItem("selectedServices")
    router.push("/services")
  }

  const bookingDetails = {
    id: "PCSB1753366349076",
    services: getSelectedServiceDetails(),
    total: getTotalPrice(),
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Weight Management Service</h1>
            <p className="text-sm text-blue-400">Booking: {bookingDetails.id}</p>
          </div>
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
              { step: 4, label: "Login", icon: "🔐", active: false, completed: true },
              { step: 5, label: "Payment", icon: "💳", active: true, completed: false },
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
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "100%" }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Payment</h2>
          <p className="text-slate-600 dark:text-gray-400 mb-8">Complete your booking payment</p>

          {/* Booking Summary */}
          <Card className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-white">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white mb-3">Services:</p>
                  <div className="space-y-3">
                    {bookingDetails.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start bg-white dark:bg-slate-700 p-3 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="text-slate-900 dark:text-white font-medium">{service.name}</p>
                          <p className="text-sm text-slate-600 dark:text-gray-400">Quantity: {service.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-900 dark:text-white font-semibold">£{service.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-300 dark:border-slate-600 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-slate-900 dark:text-white">Total:</p>
                    <p className="font-semibold text-xl text-slate-900 dark:text-white">
                      £{bookingDetails.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <div className="text-center mb-8">
            <Button className="bg-slate-700 hover:bg-slate-600 text-white px-12 py-4 text-lg">
              <CreditCard className="w-5 h-5 mr-3" />
              Pay by Card
            </Button>
          </div>

          {/* Security Information */}
          <div className="space-y-4 text-center text-sm">
            <div className="flex items-center justify-center space-x-2 text-emerald-400">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span>You will be redirected to a secure payment page to complete your payment.</span>
            </div>

            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <Shield className="w-4 h-4" />
              <span>Your payment information is encrypted and secure</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <Link href="/login">
              <Button variant="outline" className="border-slate-300 dark:border-slate-600 text-gray-400 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
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
