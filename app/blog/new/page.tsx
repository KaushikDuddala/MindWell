"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

export default function NewBlogPostPage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/login")
      } else {
        setUser(user)
      }
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error: insertError } = await supabase
        .from("blog_posts")
        .insert({
          title,
          excerpt: excerpt || null,
          content,
          category: category || null,
          author_id: user.id,
          is_published: isPublished,
          published_at: isPublished ? new Date().toISOString() : null,
        })
        .select()
        .single()

      if (insertError) throw insertError

      router.push(`/blog/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create blog post")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-8 md:py-12">
      <div className="w-full max-w-4xl px-4 space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Write a Blog Post</h1>
          <p className="text-muted-foreground">Share your story, insights, or advice with the community</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Article Details</CardTitle>
            <CardDescription>Fill in the information below to create your blog post</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Give your post a compelling title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Personal Story, Coping Strategies, Self-Care"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  maxLength={50}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief summary of your post (appears in blog listing)"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  maxLength={300}
                />
                <p className="text-xs text-muted-foreground">Optional: A short preview of your article</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Share your thoughts, experiences, and insights..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={16}
                  className="resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="publish-toggle" className="cursor-pointer">
                    Publish immediately
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Make this post visible to everyone. You can save as draft if unchecked.
                  </p>
                </div>
                <Switch id="publish-toggle" checked={isPublished} onCheckedChange={setIsPublished} />
              </div>

              {error && (
                <div
                  className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md"
                  role="alert"
                >
                  <AlertCircle className="h-4 w-4 mt-0.5" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : isPublished ? "Publish Post" : "Save as Draft"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base">Writing Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Write from personal experience and be authentic</li>
              <li>• Use clear, accessible language that everyone can understand</li>
              <li>• Include practical tips or takeaways when possible</li>
              <li>• Be respectful of different experiences and perspectives</li>
              <li>• Consider adding trigger warnings if discussing sensitive topics</li>
              <li>• Encourage readers to seek professional help when appropriate</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
