"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { AlertCircle, Trash2, Plus, Clock, CalendarOff, CalendarPlus, CheckCircle } from "lucide-react"

const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
]

const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0")
  return { value: `${hour}:00:00`, label: `${i === 0 ? 12 : i > 12 ? i - 12 : i}:00 ${i >= 12 ? "PM" : "AM"}` }
})

interface Availability {
  id: string
  day_of_week: number
  start_time: string
  end_time: string
}

interface DateOverride {
  id: string
  override_date: string
  is_available: boolean
  start_time: string | null
  end_time: string | null
  reason: string | null
}

export default function CounselorAvailabilityPage() {
  const [availability, setAvailability] = useState<Availability[]>([])
  const [dateOverrides, setDateOverrides] = useState<DateOverride[]>([])
  const [newSlot, setNewSlot] = useState({ day_of_week: "", start_time: "", end_time: "" })
  const [selectedBlockDate, setSelectedBlockDate] = useState<Date | undefined>(undefined)
  const [blockReason, setBlockReason] = useState("")
  const [specialDate, setSpecialDate] = useState<Date | undefined>(undefined)
  const [specialStartTime, setSpecialStartTime] = useState("")
  const [specialEndTime, setSpecialEndTime] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      // Check if counselor
      const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", user.id).single()

      if (profile?.user_type !== "counselor") {
        router.push("/dashboard")
        return
      }

      setUserId(user.id)

      // Fetch recurring availability
      const { data: availabilityData } = await supabase
        .from("counselor_availability")
        .select("*")
        .eq("counselor_id", user.id)
        .eq("is_active", true)
        .order("day_of_week")
        .order("start_time")

      setAvailability(availabilityData || [])

      // Fetch date overrides
      const { data: overridesData } = await supabase
        .from("counselor_date_overrides")
        .select("*")
        .eq("counselor_id", user.id)
        .gte("override_date", new Date().toISOString().split("T")[0])
        .order("override_date")

      setDateOverrides(overridesData || [])
      setIsLoading(false)
    }

    fetchData()
  }, [router, supabase])

  const showSuccess = (message: string) => {
    setSuccess(message)
    setError(null)
    setTimeout(() => setSuccess(null), 3000)
  }

  const handleAddSlot = async () => {
    if (!newSlot.day_of_week || !newSlot.start_time || !newSlot.end_time) {
      setError("Please fill in all fields")
      return
    }

    if (newSlot.start_time >= newSlot.end_time) {
      setError("End time must be after start time")
      return
    }

    if (!userId) return

    setError(null)

    try {
      const { data, error: insertError } = await supabase
        .from("counselor_availability")
        .insert({
          counselor_id: userId,
          day_of_week: Number.parseInt(newSlot.day_of_week),
          start_time: newSlot.start_time,
          end_time: newSlot.end_time,
          is_active: true,
        })
        .select()

      if (insertError) throw insertError

      if (data && data.length > 0) {
        setAvailability([...availability, data[0]])
      }
      setNewSlot({ day_of_week: "", start_time: "", end_time: "" })
      showSuccess("Availability added successfully!")
    } catch (err: any) {
      console.error("[v0] Insert error:", err)
      if (err.code === "23505") {
        setError("This time slot already exists")
      } else {
        setError(err.message || "Failed to add availability")
      }
    }
  }

  const handleDeleteSlot = async (id: string) => {
    try {
      const { error: deleteError } = await supabase.from("counselor_availability").delete().eq("id", id)

      if (deleteError) throw deleteError

      setAvailability(availability.filter((slot) => slot.id !== id))
      showSuccess("Time slot removed")
    } catch (err) {
      setError("Failed to delete availability")
    }
  }

  const handleBlockDate = async () => {
    if (!selectedBlockDate || !userId) {
      setError("Please select a date to block")
      return
    }

    setError(null)

    try {
      const { data, error: insertError } = await supabase
        .from("counselor_date_overrides")
        .insert({
          counselor_id: userId,
          override_date: selectedBlockDate.toISOString().split("T")[0],
          is_available: false,
          reason: blockReason || null,
        })
        .select()
        .single()

      if (insertError) throw insertError

      setDateOverrides([...dateOverrides, data])
      setSelectedBlockDate(undefined)
      setBlockReason("")
      showSuccess("Date blocked successfully!")
    } catch (err: any) {
      if (err.code === "23505") {
        setError("This date is already blocked or has special hours")
      } else {
        setError(err.message || "Failed to block date")
      }
    }
  }

  const handleAddSpecialAvailability = async () => {
    if (!specialDate || !specialStartTime || !specialEndTime || !userId) {
      setError("Please fill in all fields for special availability")
      return
    }

    if (specialStartTime >= specialEndTime) {
      setError("End time must be after start time")
      return
    }

    setError(null)

    try {
      const { data, error: insertError } = await supabase
        .from("counselor_date_overrides")
        .insert({
          counselor_id: userId,
          override_date: specialDate.toISOString().split("T")[0],
          is_available: true,
          start_time: specialStartTime,
          end_time: specialEndTime,
        })
        .select()
        .single()

      if (insertError) throw insertError

      setDateOverrides([...dateOverrides, data])
      setSpecialDate(undefined)
      setSpecialStartTime("")
      setSpecialEndTime("")
      showSuccess("Special availability added!")
    } catch (err: any) {
      if (err.code === "23505") {
        setError("This date already has an override")
      } else {
        setError(err.message || "Failed to add special availability")
      }
    }
  }

  const handleDeleteOverride = async (id: string) => {
    try {
      const { error: deleteError } = await supabase.from("counselor_date_overrides").delete().eq("id", id)

      if (deleteError) throw deleteError

      setDateOverrides(dateOverrides.filter((override) => override.id !== id))
      showSuccess("Date override removed")
    } catch (err) {
      setError("Failed to delete override")
    }
  }

  const formatTime = (time: string) => {
    const hour = Number.parseInt(time.split(":")[0])
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:00 ${ampm}`
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen py-8 md:py-12">
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-5xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Manage Availability</h1>
            <p className="text-muted-foreground">Set your regular weekly hours and manage specific date exceptions</p>
          </div>

          {/* Status Messages */}
          {error && (
            <div
              className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-4 rounded-lg"
              role="alert"
            >
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 text-sm text-green-700 bg-green-50 p-4 rounded-lg" role="status">
              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{success}</span>
            </div>
          )}

          <Tabs defaultValue="weekly" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Weekly Schedule
              </TabsTrigger>
              <TabsTrigger value="block" className="flex items-center gap-2">
                <CalendarOff className="h-4 w-4" />
                Block Dates
              </TabsTrigger>
              <TabsTrigger value="special" className="flex items-center gap-2">
                <CalendarPlus className="h-4 w-4" />
                Special Hours
              </TabsTrigger>
            </TabsList>

            {/* Weekly Schedule Tab */}
            <TabsContent value="weekly" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Weekly Availability</CardTitle>
                  <CardDescription>
                    Set your regular weekly hours. Clients can book during these recurring time slots.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label>Day of Week</Label>
                      <Select
                        value={newSlot.day_of_week}
                        onValueChange={(value) => setNewSlot({ ...newSlot, day_of_week: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {DAYS_OF_WEEK.map((day) => (
                            <SelectItem key={day.value} value={day.value.toString()}>
                              {day.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Select
                        value={newSlot.start_time}
                        onValueChange={(value) => setNewSlot({ ...newSlot, start_time: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map((time) => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Select
                        value={newSlot.end_time}
                        onValueChange={(value) => setNewSlot({ ...newSlot, end_time: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map((time) => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button onClick={handleAddSlot} className="w-full">
                        <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                        Add Slot
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Weekly Schedule</CardTitle>
                  <CardDescription>Your regular availability for client bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  {availability.length > 0 ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {availability.map((slot) => {
                        const day = DAYS_OF_WEEK.find((d) => d.value === slot.day_of_week)
                        return (
                          <div
                            key={slot.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-card hover:shadow-sm transition-shadow"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{day?.label}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setAvailability(availability.filter((s) => s.id !== slot.id))
                                supabase.from("counselor_availability").delete().eq("id", slot.id)
                              }}
                              aria-label="Delete time slot"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                      <Clock className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground font-medium mb-2">No availability set yet</p>
                      <p className="text-sm text-muted-foreground">
                        Add time slots above to allow clients to book appointments
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Block Dates Tab */}
            <TabsContent value="block" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Block Specific Dates</CardTitle>
                  <CardDescription>
                    Mark dates when you&apos;re unavailable (vacations, holidays, personal time)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 items-start">
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedBlockDate}
                        onSelect={setSelectedBlockDate}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Selected Date</Label>
                        <Input
                          value={selectedBlockDate ? selectedBlockDate.toLocaleDateString() : ""}
                          placeholder="Select a date from the calendar"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Reason (Optional)</Label>
                        <Input
                          value={blockReason}
                          onChange={(e) => setBlockReason(e.target.value)}
                          placeholder="e.g., Vacation, Holiday, Personal"
                        />
                      </div>
                      <Button
                        onClick={async () => {
                          if (!selectedBlockDate || !userId) {
                            setError("Please select a date to block")
                            return
                          }
                          try {
                            const { data, error: insertError } = await supabase
                              .from("counselor_date_overrides")
                              .insert({
                                counselor_id: userId,
                                override_date: selectedBlockDate.toISOString().split("T")[0],
                                is_available: false,
                                reason: blockReason || null,
                              })
                              .select()
                            if (insertError) throw insertError
                            setSelectedBlockDate(undefined)
                            setBlockReason("")
                            showSuccess("Date blocked successfully!")
                          } catch (err: any) {
                            setError(err.message || "Failed to block date")
                          }
                        }}
                        className="w-full"
                        disabled={!selectedBlockDate}
                      >
                        <CalendarOff className="h-4 w-4 mr-2" />
                        Block This Date
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Blocked Dates List */}
              {dateOverrides.filter((o) => !o.is_available).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Blocked Dates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {dateOverrides
                        .filter((override) => !override.is_available)
                        .map((override) => (
                          <div
                            key={override.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-destructive/5"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                                <CalendarOff className="h-5 w-5 text-destructive" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {new Date(override.override_date + "T00:00:00").toLocaleDateString(undefined, {
                                    weekday: "long",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                                {override.reason && <p className="text-sm text-muted-foreground">{override.reason}</p>}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setDateOverrides(dateOverrides.filter((o) => o.id !== override.id))
                                supabase.from("counselor_date_overrides").delete().eq("id", override.id)
                              }}
                              aria-label="Remove block"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Special Hours Tab */}
            <TabsContent value="special" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Special Availability</CardTitle>
                  <CardDescription>
                    Set custom availability for specific dates outside your regular schedule
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 items-start">
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={specialDate}
                        onSelect={setSpecialDate}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Selected Date</Label>
                        <Input
                          value={specialDate ? specialDate.toLocaleDateString() : ""}
                          placeholder="Select a date from the calendar"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Select value={specialStartTime} onValueChange={setSpecialStartTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_OPTIONS.map((time) => (
                              <SelectItem key={time.value} value={time.value}>
                                {time.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <Select value={specialEndTime} onValueChange={setSpecialEndTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_OPTIONS.map((time) => (
                              <SelectItem key={time.value} value={time.value}>
                                {time.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={async () => {
                          if (!specialDate || !specialStartTime || !specialEndTime || !userId) {
                            setError("Please fill in all fields for special availability")
                            return
                          }
                          if (specialStartTime >= specialEndTime) {
                            setError("End time must be after start time")
                            return
                          }
                          try {
                            const { data, error: insertError } = await supabase
                              .from("counselor_date_overrides")
                              .insert({
                                counselor_id: userId,
                                override_date: specialDate.toISOString().split("T")[0],
                                is_available: true,
                                start_time: specialStartTime,
                                end_time: specialEndTime,
                              })
                              .select()
                            if (insertError) throw insertError
                            setSpecialDate(undefined)
                            setSpecialStartTime("")
                            setSpecialEndTime("")
                            showSuccess("Special availability added!")
                          } catch (err: any) {
                            setError(err.message || "Failed to add special availability")
                          }
                        }}
                        className="w-full"
                        disabled={!specialDate || !specialStartTime || !specialEndTime}
                      >
                        <CalendarPlus className="h-4 w-4 mr-2" />
                        Add Special Hours
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Hours List */}
              {dateOverrides.filter((o) => o.is_available).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Special Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {dateOverrides
                        .filter((override) => override.is_available)
                        .map((override) => (
                          <div
                            key={override.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-green-50 dark:bg-green-950/30"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <CalendarPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {new Date(override.override_date + "T00:00:00").toLocaleDateString(undefined, {
                                    weekday: "long",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                                {override.start_time && override.end_time && (
                                  <p className="text-sm text-muted-foreground">
                                    {formatTime(override.start_time)} - {formatTime(override.end_time)}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setDateOverrides(dateOverrides.filter((o) => o.id !== override.id))
                                supabase.from("counselor_date_overrides").delete().eq("id", override.id)
                              }}
                              aria-label="Remove special hours"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
