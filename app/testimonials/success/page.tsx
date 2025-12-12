import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Testimonial Submitted | MindCare",
}

export default function TestimonialSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl">Thank You for Sharing!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Your testimonial has been submitted and is pending review. Once approved, it will be visible to help inspire
            others on their mental health journey.
          </p>
          <div className="flex flex-col gap-3 pt-4">
            <Button asChild>
              <Link href="/testimonials">View Testimonials</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
