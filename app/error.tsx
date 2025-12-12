"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("[v0] Error occurred:", error)
  }, [error])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600" aria-hidden="true" />
          </div>
          <CardTitle className="text-3xl">Something Went Wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            We encountered an unexpected error. Please try again or return to the home page.
          </p>
          {error.message && (
            <details className="text-left bg-gray-50 p-4 rounded border text-sm">
              <summary className="cursor-pointer font-medium text-gray-700">Error Details</summary>
              <p className="mt-2 text-gray-600 font-mono text-xs break-all">{error.message}</p>
            </details>
          )}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            <Button onClick={reset}>
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
              Try Again
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" aria-hidden="true" />
                Go Home
              </Link>
            </Button>
          </div>
          <div className="pt-6 border-t mt-6">
            <p className="text-sm text-gray-600 mb-3">In crisis? Help is available 24/7</p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="bg-red-50 border-red-300 text-red-700 hover:bg-red-100"
            >
              <a href="tel:988">Call 988 - Crisis Lifeline</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
