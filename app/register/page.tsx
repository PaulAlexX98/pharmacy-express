import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Register Page</h1>
        <p className="text-gray-400 mb-8">Registration functionality coming soon</p>
        <Link href="/">
          <Button className="bg-emerald-600 hover:bg-emerald-700">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}
