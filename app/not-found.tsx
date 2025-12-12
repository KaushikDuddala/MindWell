import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Home, Search } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Page Not Found | Voices4Minds",
  description: "The page you're looking for doesn't exist.",
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-orange-600" aria-hidden="true" />
          </div>
          <CardTitle className="text-3xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            We couldn't find the page you're looking for. It may have been moved or doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" aria-hidden="true" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" aria-hidden="true" />
                Search Site
              </Link>
            </Button>
          </div>
          <div className="pt-6 border-t mt-6">
            <p className="text-sm text-gray-600 mb-3">Need immediate support?</p>
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
