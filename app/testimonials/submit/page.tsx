import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Submit Your Testimonial | MindCare",
  description: "Share your mental health recovery story and inspire others in their journey.",
}

export default async function SubmitTestimonialPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/testimonials/submit")
  }

  async function submitTestimonial(formData: FormData) {
    "use server"

    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/auth/login")
    }

    const content = formData.get("content") as string
    const condition = formData.get("condition") as string
    const rating = Number.parseInt(formData.get("rating") as string)

    await supabase.from("testimonials").insert({
      user_id: user.id,
      content,
      condition,
      rating,
      status: "pending",
    })

    redirect("/testimonials/success")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Share Your Story</CardTitle>
            <CardDescription className="text-base">
              Your testimonial will be reviewed before being published. Thank you for inspiring others with your
              journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={submitTestimonial} className="space-y-6">
              {/* Condition */}
              <div className="space-y-2">
                <Label htmlFor="condition">
                  What challenge did you overcome?{" "}
                  <span className="text-red-500" aria-label="required">
                    *
                  </span>
                </Label>
                <Input
                  id="condition"
                  name="condition"
                  placeholder="e.g., Anxiety, Depression, PTSD"
                  required
                  aria-required="true"
                />
              </div>

              {/* Testimonial Content */}
              <div className="space-y-2">
                <Label htmlFor="content">
                  Your Story{" "}
                  <span className="text-red-500" aria-label="required">
                    *
                  </span>
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Share your experience, what helped you, and how you've progressed in your mental health journey..."
                  required
                  aria-required="true"
                  rows={8}
                  className="resize-none"
                />
                <p className="text-sm text-gray-500">
                  Please be respectful and avoid sharing personal information of others.
                </p>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label htmlFor="rating">
                  How would you rate your experience?{" "}
                  <span className="text-red-500" aria-label="required">
                    *
                  </span>
                </Label>
                <Select name="rating" required>
                  <SelectTrigger id="rating" aria-required="true">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars - Excellent</SelectItem>
                    <SelectItem value="4">4 Stars - Very Good</SelectItem>
                    <SelectItem value="3">3 Stars - Good</SelectItem>
                    <SelectItem value="2">2 Stars - Fair</SelectItem>
                    <SelectItem value="1">1 Star - Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3" role="note">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">Privacy Notice</p>
                  <p>
                    Your name will be displayed with your testimonial. If you prefer to remain anonymous, please contact
                    us after submission.
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" size="lg" className="flex-1">
                  Submit Testimonial
                </Button>
                <Button type="button" variant="outline" size="lg" asChild>
                  <Link href="/testimonials">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
