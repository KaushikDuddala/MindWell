import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Quote, Heart, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/scroll-animation"

export const metadata = {
  title: "Testimonials - Stories of Hope and Recovery | MindWell",
  description:
    "Read inspiring stories from individuals who have overcome mental health challenges and found support through counseling and community.",
}

export default async function TestimonialsPage() {
  const supabase = await createClient()

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*, profiles(full_name)")
    .eq("status", "approved")
    .order("created_at", { ascending: false })

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="space-y-16">
        {/* Header Section */}
        <ScrollAnimation className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full" aria-hidden="true">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">Stories of Hope and Recovery</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Real experiences from individuals who have overcome mental health challenges. Their courage inspires us all
            to seek help and support one another.
          </p>
        </ScrollAnimation>

        {/* Share Your Story CTA */}
        <ScrollAnimation>
          <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-0 max-w-3xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Share Your Story</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Your journey could inspire someone else to seek help. Share your experience and be part of our
                supportive community.
              </p>
              <Button asChild size="lg" className="btn-animate">
                <Link href="/testimonials/submit">
                  Submit Your Testimonial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </ScrollAnimation>

        {/* Testimonials Grid */}
        <section aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="sr-only">
            Testimonials from our community
          </h2>
          {testimonials && testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <ScrollAnimation key={testimonial.id} delay={index * 100}>
                  <Card className="border-2 card-animate hover:border-primary/50 h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Quote className="h-10 w-10 text-primary/50 mb-4" aria-hidden="true" />
                          <h3 className="font-semibold text-lg">{testimonial.profiles?.full_name || "Anonymous"}</h3>
                          {testimonial.condition && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Overcame: <span className="font-medium">{testimonial.condition}</span>
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <blockquote className="text-muted-foreground italic leading-relaxed text-lg">
                        "{testimonial.content}"
                      </blockquote>
                      <time className="block text-sm text-muted-foreground mt-6" dateTime={testimonial.created_at}>
                        {new Date(testimonial.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </time>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <ScrollAnimation className="text-center py-16">
              <Heart className="h-20 w-20 text-muted-foreground mx-auto mb-6" aria-hidden="true" />
              <p className="text-muted-foreground text-xl">No testimonials yet. Be the first to share your story!</p>
            </ScrollAnimation>
          )}
        </section>

        {/* Support Section */}
        <ScrollAnimation className="text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Need Support?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            If you're struggling with mental health challenges, you're not alone. Reach out to our counselors or join
            our supportive community.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button asChild size="lg" className="btn-animate">
              <Link href="/appointments">
                Book an Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-animate bg-transparent">
              <Link href="/resources">View Resources</Link>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  )
}
