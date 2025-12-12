"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Clock, CheckCircle, AlertCircle, CalendarDays } from "lucide-react"

interface Availability {
  day_of_week: number
  start_time: string
  end_time: string
}

interface ExistingAppointment {
  appointment_date: string
  start_time: string
  end_time: string
}

interface DateOverride {
  override_date: string
  is_available: boolean
  start_time: string | null
  end_time: string | null
}

interface BookingCalendarProps {
  counselorId: string
  availability: Availability[]
  existingAppointments: ExistingAppointment[]
  dateOverrides?: DateOverride[]
  userId: string
}

export function BookingCalendar({
  counselorId,
  availability,
  existingAppointments,
  dateOverrides = [],
  userId,
}: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Check if a specific date is blocked
  const isDateBlocked = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return dateOverrides.some((override) => override.override_date === dateString && !override.is_available)
  }

  // Check if a specific date has special availability
  const getSpecialAvailability = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return dateOverrides.find((override) => override.override_date === dateString && override.is_available)
  }

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return []

    const dateString = selectedDate.toISOString().split("T")[0]
    const dayOfWeek = selectedDate.getDay()

    // Check if date is blocked
    if (isDateBlocked(selectedDate)) {
      return []
    }

    // Check for special availability first
    const specialAvail = getSpecialAvailability(selectedDate)

    let slots: string[] = []

    if (specialAvail && specialAvail.start_time && specialAvail.end_time) {
      // Use special availability times
      const startHour = Number.parseInt(specialAvail.start_time.split(":")[0])
      const endHour = Number.parseInt(specialAvail.end_time.split(":")[0])

      for (let hour = startHour; hour < endHour; hour++) {
        const timeSlot = `${hour.toString().padStart(2, "0")}:00:00`
        slots.push(timeSlot)
      }
    } else {
      // Use regular weekly availability
      const dayAvailability = availability.filter((a) => a.day_of_week === dayOfWeek)

      if (dayAvailability.length === 0) return []

      dayAvailability.forEach((avail) => {
        const startHour = Number.parseInt(avail.start_time.split(":")[0])
        const endHour = Number.parseInt(avail.end_time.split(":")[0])

        for (let hour = startHour; hour < endHour; hour++) {
          const timeSlot = `${hour.toString().padStart(2, "0")}:00:00`
          if (!slots.includes(timeSlot)) {
            slots.push(timeSlot)
          }
        }
      })
    }

    // Filter out already booked slots
    slots = slots.filter((slot) => {
      const isBooked = existingAppointments.some(
        (apt) => apt.appointment_date === dateString && apt.start_time === slot,
      )
      return !isBooked
    })

    // Sort slots
    slots.sort()

    return slots
  }

  const formatTime = (time: string) => {
    const hour = Number.parseInt(time.split(":")[0])
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:00 ${ampm}`
  }

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select both a date and time")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const hour = Number.parseInt(selectedTime.split(":")[0])
      const endTime = `${(hour + 1).toString().padStart(2, "0")}:00:00`

      const { error: insertError } = await supabase.from("appointments").insert({
        user_id: userId,
        counselor_id: counselorId,
        appointment_date: selectedDate.toISOString().split("T")[0],
        start_time: selectedTime,
        end_time: endTime,
        status: "pending",
        notes: notes || null,
      })

      if (insertError) throw insertError

      setSuccess(true)
      setTimeout(() => {
        router.push("/appointments/my-appointments")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book appointment")
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableSlots = getAvailableTimeSlots()

  // Disable dates without availability or that are blocked
  const isDateDisabled = (date: Date) => {
    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
    if (isPast) return true

    // Check if blocked
    if (isDateBlocked(date)) return true

    // Check for special availability
    if (getSpecialAvailability(date)) return false

    // Check regular availability
    const dayOfWeek = date.getDay()
    const hasAvailability = availability.some((a) => a.day_of_week === dayOfWeek)
    return !hasAvailability
  }

  // Check if no availability is configured at all
  const hasNoAvailability = availability.length === 0 && dateOverrides.filter((d) => d.is_available).length === 0

  if (success) {
    return (
      <Card className="border-green-500/50 bg-green-500/5">
        <CardContent className="py-12 text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-500" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold">Appointment Booked!</h2>
          <p className="text-muted-foreground">
            Your appointment has been successfully scheduled. You&apos;ll receive a confirmation shortly.
          </p>
          <p className="text-sm text-muted-foreground">Redirecting to your appointments...</p>
        </CardContent>
      </Card>
    )
  }

  if (hasNoAvailability) {
    return (
      <Card>
        <CardContent className="py-12 text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <CalendarDays className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold">No Availability Set</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            This counselor hasn&apos;t set up their availability yet. Please check back later or choose a different
            counselor.
          </p>
          <Button variant="outline" onClick={() => router.push("/appointments")}>
            Browse Other Counselors
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Calendar Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Select Date
          </CardTitle>
          <CardDescription>Choose an available date for your appointment</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date)
              setSelectedTime("") // Reset time when date changes
            }}
            disabled={isDateDisabled}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {/* Time Selection & Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Appointment Details
          </CardTitle>
          <CardDescription>
            {selectedDate
              ? `Available times for ${selectedDate.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}`
              : "Select a date to view available times"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedDate && (
            <>
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Select Time
                </Label>
                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedTime === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(slot)}
                        className={`justify-center transition-all ${
                          selectedTime === slot ? "ring-2 ring-primary ring-offset-2" : "hover:border-primary"
                        }`}
                      >
                        {formatTime(slot)}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground">No available time slots for this date.</p>
                    <p className="text-xs text-muted-foreground mt-1">Please select another date.</p>
                  </div>
                )}
              </div>

              {selectedTime && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Share any specific concerns or topics you'd like to discuss..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  {/* Appointment Summary */}
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="text-sm font-medium">Appointment Summary</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        <span className="font-medium text-foreground">Date:</span>{" "}
                        {selectedDate.toLocaleDateString(undefined, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Time:</span> {formatTime(selectedTime)} -{" "}
                        {formatTime(
                          `${(Number.parseInt(selectedTime.split(":")[0]) + 1).toString().padStart(2, "0")}:00:00`,
                        )}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Duration:</span> 1 hour
                      </p>
                    </div>
                  </div>

                  {error && (
                    <div
                      className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md"
                      role="alert"
                    >
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full" size="lg">
                    {isSubmitting ? "Booking..." : "Confirm Appointment"}
                  </Button>
                </>
              )}
            </>
          )}

          {!selectedDate && (
            <div className="text-center py-8">
              <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Select a date from the calendar to see available times</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
