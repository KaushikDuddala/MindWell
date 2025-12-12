import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { BookingCalendar } from "@/components/booking-calendar"

export default async function BookAppointmentPage({ params }: { params: Promise<{ counselorId: string }> }) {
  const { counselorId } = await params
  const supabase = await createClient()

  // Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch counselor details
  const { data: counselor, error } = await supabase
    .from("counselor_profiles")
    .select(
      `
      *,
      profiles (
        id,
        full_name,
        avatar_url
      )
    `,
    )
    .eq("id", counselorId)
    .single()

  if (error || !counselor) {
    redirect("/appointments")
  }

  // Fetch counselor availability
  const { data: availability } = await supabase
    .from("counselor_availability")
    .select("*")
    .eq("counselor_id", counselorId)
    .eq("is_active", true)
    .order("day_of_week")

  // Fetch existing appointments to block those times
  const { data: existingAppointments } = await supabase
    .from("appointments")
    .select("appointment_date, start_time, end_time")
    .eq("counselor_id", counselorId)
    .in("status", ["pending", "confirmed"])

  const { data: dateOverrides } = await supabase
    .from("counselor_date_overrides")
    .select("override_date, is_available, start_time, end_time")
    .eq("counselor_id", counselorId)
    .gte("override_date", new Date().toISOString().split("T")[0])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Counselor Info */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-primary">{counselor.profiles?.full_name?.charAt(0) || "C"}</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Schedule with {counselor.profiles?.full_name || "Counselor"}
              </h1>
              <p className="text-muted-foreground">{counselor.credentials || "Licensed Counselor"}</p>
              {counselor.bio && <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{counselor.bio}</p>}
            </div>
          </div>

          {/* Booking Calendar Component - Added dateOverrides prop */}
          <BookingCalendar
            counselorId={counselorId}
            availability={availability || []}
            existingAppointments={existingAppointments || []}
            dateOverrides={dateOverrides || []}
            userId={user.id}
          />
        </div>
      </div>
    </div>
  )
}
