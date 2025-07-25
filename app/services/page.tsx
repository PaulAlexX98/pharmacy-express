"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
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

const services = [
  {
    id: "consultation",
    title: "Book a Consultation (Telephone)",
    description:
      "Unsure of which product you want? You can book a consultation with our pharmacist who will help guide you on selecting the correct product for your weight loss journey.",
    price: 20.0,
    type: "consultation",
  },
  {
    id: "mounjaro",
    title: "Mounjaro (tirzepatide)",
    description:
      "Mounjaro (tirzepatide) KwikPen solution for injection in pre-filled pen Available in 6 different strengths:2.5mg5mg7.5mg10mg12.5mg15mg",
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

export default function ServicesPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const router = useRouter()

  // Load selected services from localStorage on component mount
  useEffect(() => {
    const storedServices = localStorage.getItem("selectedServices")
    if (storedServices) {
      setSelectedServices(JSON.parse(storedServices))
    }
  }, [])

  // Save selected services to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("selectedServices", JSON.stringify(selectedServices))
  }, [selectedServices])

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const getTotalPrice = () => {
    let total = 0
    selectedServices.forEach((selectedId) => {
      // Check if it's a consultation service
      const consultationService = services.find((s) => s.id === selectedId && s.type === "consultation")
      if (consultationService) {
        total += consultationService.price
        return
      }

      // Check if it's a medication option
      services.forEach((service) => {
        if (service.type === "medication" && service.options) {
          const option = service.options.find((opt) => opt.id === selectedId)
          if (option) {
            total += option.price
          }
        }
      })
    })
    return total
  }

  const handleCancelBooking = () => {
    setShowCancelDialog(false)
    localStorage.removeItem("selectedServices")
    router.push("/")
  }

  const handleStartOver = () => {
    setSelectedServices([])
    localStorage.removeItem("selectedServices")
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
              { step: 1, label: "Service", icon: "🛍️", active: true },
              { step: 2, label: "User details", icon: "👤", active: false },
              { step: 3, label: "Raf", icon: "📋", active: false },
              { step: 4, label: "Login", icon: "🔐", active: false },
              { step: 5, label: "Payment", icon: "💳", active: false },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                    item.active ? "bg-blue-600" : "bg-emerald-600"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-sm mt-2">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-1 bg-slate-700 rounded-full">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "20%" }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Select Services</h2>
          <p className="text-slate-600 dark:text-gray-400 mb-8">Choose the services you'd like to book</p>

          <div className="space-y-6">
            {services.map((service) => (
              <Card key={service.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900 dark:text-white">{service.title}</CardTitle>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {service.type === "consultation" ? (
                    <div className="flex items-center space-x-3 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <Checkbox
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                      />
                      <label htmlFor={service.id} className="flex-1 cursor-pointer">
                        Consultation
                      </label>
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        £{service.price.toFixed(2)}
                      </Badge>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {service.options?.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-3 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg"
                        >
                          <Checkbox
                            id={option.id}
                            checked={selectedServices.includes(option.id)}
                            onCheckedChange={() => handleServiceToggle(option.id)}
                          />
                          <label htmlFor={option.id} className="flex-1 cursor-pointer">
                            {option.name}
                          </label>
                          <Badge variant="secondary" className="bg-blue-600 text-white">
                            £{option.price.toFixed(2)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <Link href="/">
              <Button variant="outline" className="border-slate-600 text-gray-400 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            </Link>

            <div className="text-right">
              <p className="text-gray-400 text-sm">Total: £{getTotalPrice().toFixed(2)}</p>
              <Link href="/user-details">
                <Button className="bg-blue-600 hover:bg-blue-700 mt-2" disabled={selectedServices.length === 0}>
                  Next
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </Link>
            </div>
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
