import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Target, Users, Heart, Shield, ArrowRight } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

export const metadata = {
  title: "About Voices4Minds | Our Mission",
  description:
    "Learn about Voices4Minds's mission to provide accessible mental health support, resources, and community for individuals seeking wellness.",
}

export default function AboutPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="space-y-24">
        {/* Header */}
        <ScrollAnimation className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">About Voices4Minds</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We believe mental health care should be accessible, compassionate, and stigma-free for everyone.
          </p>
        </ScrollAnimation>

        {/* Mission Section */}
        <section className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollAnimation animation="fade-left">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Voices4Minds was founded with a clear mission: to break down barriers to mental health care and create a
                supportive community where individuals feel safe seeking help.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We recognize that seeking support for mental health can feel overwhelming. That&apos;s why we&apos;ve
                created a comprehensive platform that connects individuals with professional counselors, educational
                resources, and a compassionate community—all in one accessible place.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Through technology and human connection, we&apos;re working to destigmatize mental health challenges and
                ensure that everyone has access to the support they need to thrive.
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-right" delay={200}>
            <Card className="bg-primary/5 border-primary/20 border-2">
              <CardContent className="pt-8 pb-8">
                <blockquote className="text-xl italic text-muted-foreground leading-relaxed">
                  &quot;Mental health is not a destination, but a process. It&apos;s about how you drive, not where
                  you&apos;re going.&quot;
                </blockquote>
                <p className="mt-6 font-semibold">— Noam Shpancer, PhD</p>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </section>

        {/* Values Section */}
        <section>
          <ScrollAnimation className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Compassion",
                description:
                  "We approach every individual with empathy, understanding, and genuine care for their well-being.",
              },
              {
                icon: Users,
                title: "Community",
                description:
                  "We foster connections and create safe spaces where people can share experiences without judgment.",
              },
              {
                icon: Shield,
                title: "Confidentiality",
                description:
                  "We prioritize privacy and security, ensuring all information remains protected and confidential.",
              },
              {
                icon: Target,
                title: "Accessibility",
                description:
                  "We strive to make mental health resources available to everyone, regardless of their circumstances.",
              },
            ].map((value, index) => (
              <ScrollAnimation key={value.title} delay={index * 100}>
                <Card className="h-full card-animate border-2 hover:border-primary/50">
                  <CardContent className="pt-8 space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <value.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </section>

        {/* What We Offer */}
        <section className="bg-muted/50 rounded-3xl py-16 px-8">
          <ScrollAnimation className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center">What We Offer</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Professional Counseling Services",
                  description:
                    "Connect with licensed mental health professionals through our intuitive appointment scheduling system. Choose from a diverse network of counselors with various specializations.",
                },
                {
                  title: "Educational Resources",
                  description:
                    "Access comprehensive information about mental health conditions, treatment options, coping strategies, and wellness tips curated by mental health experts.",
                },
                {
                  title: "Supportive Community",
                  description:
                    "Join moderated forums where you can share your experiences, ask questions, and find support from others who understand what you're going through.",
                },
                {
                  title: "Crisis Resources",
                  description:
                    "Immediate access to national and local helplines, ensuring that urgent support is always just a call or text away.",
                },
                {
                  title: "Personal Stories & Blog",
                  description:
                    "Read inspiring testimonials and blog posts from individuals who have navigated their mental health journeys, offering hope and practical insights.",
                },
              ].map((item, index) => (
                <ScrollAnimation key={item.title} delay={index * 100}>
                  <div className="flex gap-6">
                    <div className="h-3 w-3 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{item.description}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ScrollAnimation>
        </section>

        {/* CTA */}
        <ScrollAnimation>
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 border-2 max-w-4xl mx-auto">
            <CardContent className="py-16 text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Join Our Community Today</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Take the first step toward better mental health. Create a free account to access our resources, connect
                with counselors, and join a supportive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild className="btn-animate text-lg px-8 py-6">
                  <Link href="/auth/sign-up">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="btn-animate text-lg px-8 py-6 bg-transparent">
                  <Link href="/resources">Explore Resources</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </div>
  )
}
