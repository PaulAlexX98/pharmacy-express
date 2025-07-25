import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Facebook, Twitter, Youtube, Linkedin, MapPin, Mail, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">PHARMACY</span>
              <span className="text-xl font-bold text-cyan-600 dark:text-cyan-400">EXPRESS</span>
            </div>

            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-slate-600 dark:text-gray-400" />
              <div className="flex space-x-2 text-sm">
                <Link href="/login" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-300">
                  Login
                </Link>
                <span className="text-slate-600 dark:text-gray-400">|</span>
                <Link href="/register" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-300">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-12 flex flex-col justify-center">
                  <div className="text-sm text-emerald-100 mb-4 font-medium">Weight Loss Management</div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Weight Loss Clinic</h1>
                  <p className="text-emerald-50 text-lg mb-8 leading-relaxed">
                    NHS-approved medications available at pharmacy express backed by science.
                  </p>
                  <Link href="/services">
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-lg font-semibold w-fit">
                      Book Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
                <div className="relative h-96 md:h-auto">
                  <Image
                    src="/images/doctor-consultation.png"
                    alt="Doctor consultation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-slate-100 dark:bg-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-600 dark:text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
            From private services to over-the-counter medicines, we have everything you need to take care of your
            health. Explore our wide selection and find exactly what you're looking for with just a few clicks.
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-slate-200 to-blue-200 dark:from-slate-700 dark:to-blue-800 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-20 h-20 border-2 border-yellow-400 rotate-45"></div>
          <div className="absolute bottom-20 right-40 w-8 h-8 bg-yellow-400 rounded-full"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 border border-blue-300 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Subscribe to our Newsletter</h2>
          <div className="flex max-w-md mx-auto">
            <Input
              placeholder="Enter Your Email"
              className="bg-slate-800 border-slate-600 text-slate-900 dark:text-white placeholder:text-gray-400 rounded-r-none"
            />
            <Button className="bg-slate-900 hover:bg-slate-800 rounded-l-none px-8">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-200 dark:bg-slate-900 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">PHARMACY</span>
                <span className="text-xl font-bold text-cyan-600 dark:text-cyan-400">EXPRESS</span>
              </div>
              <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                Experience personalised, confidential care with our private pharmacy services tailored to your unique
                needs. Book your appointment today for expert consultations and bespoke solutions in a comfortable
                setting.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-slate-600 dark:text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-slate-600 dark:text-gray-400 hover:text-white cursor-pointer" />
                <Youtube className="w-5 h-5 text-slate-600 dark:text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-5 h-5 text-slate-600 dark:text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Information</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-slate-600 dark:text-gray-400 hover:text-white">
                    📋 About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 dark:text-gray-400 hover:text-white">
                    📞 Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 dark:text-gray-400 hover:text-white">
                    📄 Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 dark:text-gray-400 hover:text-white">
                    🔒 Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-600 dark:text-gray-400 hover:text-white">
                    ↩️ Returns Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <p className="text-slate-600 dark:text-gray-400">Got Questions? Call us</p>
                <p className="text-slate-900 dark:text-white text-xl font-bold">01924 971414</p>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-slate-600 dark:text-gray-400" />
                  <span className="text-slate-600 dark:text-gray-400">info@pharmacy-express.co.uk</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-slate-600 dark:text-gray-400 mt-1" />
                  <div className="text-slate-600 dark:text-gray-400">
                    <p>Unit 4, The Office Campus Paragon</p>
                    <p>Business Park Wakefield West</p>
                    <p>Yorkshire WF1 2UY</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CEO Info */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Ceo & Superintendent:</h3>
              <p className="text-cyan-600 dark:text-cyan-400 font-semibold">Wasim Malik</p>
              <p className="text-slate-600 dark:text-gray-400 text-sm mt-2">(GPhC No: 2066988)</p>
              <p className="text-cyan-600 dark:text-cyan-400 text-sm mt-4">Registered Pharmacy: 9012568</p>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <p className="text-slate-600 dark:text-gray-400 text-sm">© 2025 All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
