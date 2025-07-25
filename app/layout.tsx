import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/hooks/use-theme"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "Pharmacy Express - Weight Management Service",
  description: "Professional weight management services with NHS-approved medications",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider defaultTheme="dark" storageKey="pharmacy-theme">
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
