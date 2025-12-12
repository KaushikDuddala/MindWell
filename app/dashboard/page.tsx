import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, MessageSquare, BookOpen, User, ArrowRight, Clock, BarChart3, Edit } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: appointments } = await supabase
    .from("appointments")
    .select(`
      *,
      counselor:counselor_profiles(
        profiles(full_name)
      )
    `)
    .eq("user_id", user.id)
    .order("appointment_date", { ascending: true })
    .limit(5)

  const { data: drafts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("author_id", user.id)
    .eq("is_published", false)
    .order("updated_at", { ascending: false })
    .limit(3)

  const isCounselor = profile?.user_type === "counselor"

  const quickActionCards = [
    {
      title: "My Appointments",
      icon: Calendar,
      value: appointments?.length || 0,
      subtitle: "Upcoming sessions",
      href: "/appointments",
      action: "Book Appointment",
    },
    {
      title: "Community",
      icon: MessageSquare,
      value: "Join",
      subtitle: "Connect with others",
      href: "/forum",
      action: "Visit Forum",
    },
    {
      title: "Resources",
      icon: BookOpen,
      value: "Explore",
      subtitle: "Learn and grow",
      href: "/resources",
      action: "View Resources",
    },
    ...(isCounselor
      ? [
          {
            title: "Profile",
            icon: User,
            value: "Settings",
            subtitle: "Manage account",
            href: "/counselor/profile",
            action: "Edit Profile",
          },
        ]
      : []),
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="space-y-12">
        <ScrollAnimation>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Welcome back, {profile?.full_name || "there"}!
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">Here&apos;s an overview of your wellness journey</p>
          </div>
        </ScrollAnimation>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickActionCards.map((item, index) => (
            <ScrollAnimation key={item.title} delay={index * 100}>
              <Card className="card-animate border-2 hover:border-primary/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  <item.icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{item.value}</div>
                  <p className="text-sm text-muted-foreground mt-1">{item.subtitle}</p>
                  <Button
                    size="sm"
                    className="mt-4 w-full btn-animate group"
                    variant={index === 0 ? "default" : "outline"}
                    asChild
                  >
                    <Link href={item.href}>
                      {item.action}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {isCounselor && (
          <ScrollAnimation delay={400}>
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Counselor Portal</CardTitle>
                    <CardDescription>Manage your practice and client appointments</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="btn-animate w-full sm:w-auto">
                  <Link href="/counselor/dashboard">
                    Go to Counselor Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollAnimation>
        )}

        <ScrollAnimation delay={isCounselor ? 500 : 400}>
          <Card className="border-2 bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Your Blog Drafts</CardTitle>
                  <CardDescription>Posts you're working on ({drafts?.length || 0})</CardDescription>
                </div>
                <BookOpen className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {drafts && drafts.length > 0 ? (
                  drafts.map((draft) => (
                    <div
                      key={draft.id}
                      className="flex items-center justify-between p-3 bg-background rounded border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{draft.title || "Untitled"}</p>
                        <p className="text-xs text-muted-foreground">
                          Updated {new Date(draft.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="btn-animate bg-transparent ml-2 flex-shrink-0"
                      >
                        <Link href={`/blog/${draft.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No drafts yet. Start writing!</p>
                )}
              </div>
              <Button variant="outline" asChild className="w-full mt-4 btn-animate bg-transparent">
                <Link href="/blog">View All Drafts</Link>
              </Button>
            </CardContent>
          </Card>
        </ScrollAnimation>

        {appointments && appointments.length > 0 && (
          <ScrollAnimation delay={isCounselor ? 600 : 500}>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled counseling sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {appointments.map((appointment, index) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between border-b pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">
                            {appointment.counselor?.profiles?.full_name || "Counselor"}
                          </p>
                          <p className="text-muted-foreground">
                            {new Date(appointment.appointment_date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}{" "}
                            at {appointment.start_time}
                          </p>
                          <p className="text-sm text-muted-foreground capitalize mt-1">
                            Status: <span className="font-medium">{appointment.status}</span>
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild className="btn-animate bg-transparent">
                        <Link href="/appointments/my-appointments">View Details</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        )}

        {/* Quick Actions */}
        <ScrollAnimation delay={isCounselor ? 700 : 600}>
          <Card className="bg-muted/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quick Actions</CardTitle>
              <CardDescription>What would you like to do today?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild className="btn-animate">
                  <Link href="/appointments">Book a Session</Link>
                </Button>
                <Button variant="outline" asChild className="btn-animate bg-transparent">
                  <Link href="/forum/new">Start a Discussion</Link>
                </Button>
                <Button variant="outline" asChild className="btn-animate bg-transparent">
                  <Link href="/blog/new">Write a Blog Post</Link>
                </Button>
                <Button variant="outline" asChild className="btn-animate bg-transparent">
                  <Link href="/testimonials/submit">Share Your Story</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </div>
  )
}
