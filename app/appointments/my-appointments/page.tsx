import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, Clock, MapPin, User } from "lucide-react"

export const metadata = {
  title: "My Appointments | Voices4Minds",
  description: "View and manage your counseling appointments",
}

export default async function MyAppointmentsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's appointments
  const { data: appointments } = await supabase
    .from("appointments")
    .select(
      `
      *,
      counselor:counselor_profiles(
        *,
        profiles(full_name, avatar_url)
      )
    `,
    )
    .eq("user_id", user.id)
    .order("appointment_date", { ascending: true })
    .order("start_time", { ascending: true })

  const upcomingAppointments = appointments?.filter((apt) => {
    const aptDate = new Date(`${apt.appointment_date}T${apt.start_time}`)
    return aptDate >= new Date() && apt.status !== "cancelled"
  })

  const pastAppointments = appointments?.filter((apt) => {
    const aptDate = new Date(`${apt.appointment_date}T${apt.start_time}`)
    return aptDate < new Date() || apt.status === "cancelled"
  })

  const formatTime = (time: string) => {
    const hour = Number.parseInt(time.split(":")[0])
    const minute = time.split(":")[1]
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minute} ${ampm}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container py-8 md:py-12 max-w-5xl w-full">
        <div className="space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">My Appointments</h1>
              <p className="text-muted-foreground mt-2">View and manage your counseling sessions</p>
            </div>
            <Button asChild>
              <Link href="/appointments">Book New Appointment</Link>
            </Button>
          </div>

          {/* Upcoming Appointments */}
          {upcomingAppointments && upcomingAppointments.length > 0 ? (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
              <div className="grid gap-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="h-6 w-6 text-primary" aria-hidden="true" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">
                              {appointment.counselor?.profiles?.full_name || "Counselor"}
                            </CardTitle>
                            <CardDescription>
                              {appointment.counselor?.credentials || "Licensed Counselor"}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)} variant="outline">
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                          <span>{new Date(appointment.appointment_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                          <span>
                            {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                          </span>
                        </div>
                      </div>
                      {appointment.counselor?.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" aria-hidden="true" />
                          <span>{appointment.counselor.location}</span>
                        </div>
                      )}
                      {appointment.notes && (
                        <div className="mt-4 p-3 bg-muted/50 rounded-md">
                          <p className="text-sm font-medium mb-1">Your Notes:</p>
                          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">No Upcoming Appointments</h3>
                <p className="text-muted-foreground mb-6">Schedule your first session with one of our counselors</p>
                <Button asChild>
                  <Link href="/appointments">Browse Counselors</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Past Appointments */}
          {pastAppointments && pastAppointments.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Past Appointments</h2>
              <div className="grid gap-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <User className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">
                              {appointment.counselor?.profiles?.full_name || "Counselor"}
                            </CardTitle>
                            <CardDescription>
                              {appointment.counselor?.credentials || "Licensed Counselor"}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)} variant="outline">
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" aria-hidden="true" />
                          <span>{new Date(appointment.appointment_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" aria-hidden="true" />
                          <span>
                            {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
