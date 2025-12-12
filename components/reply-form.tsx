"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

interface ReplyFormProps {
  postId: string
  userId: string
}

export function ReplyForm({ postId, userId }: ReplyFormProps) {
  const [content, setContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { error: insertError } = await supabase.from("forum_replies").insert({
        post_id: postId,
        author_id: userId,
        content,
      })

      if (insertError) throw insertError

      setContent("")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post reply")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Write your reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={6}
        className="resize-none"
      />
      {error && (
        <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md" role="alert">
          <AlertCircle className="h-4 w-4 mt-0.5" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Reply"}
      </Button>
    </form>
  )
}
