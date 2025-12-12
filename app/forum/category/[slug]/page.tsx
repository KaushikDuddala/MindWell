import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MessageSquare, Users, ArrowLeft, Plus } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: category } = await supabase.from("forum_categories").select("name").eq("slug", slug).single()

  return {
    title: category ? `${category.name} | Forum` : "Forum Category",
    description: `Browse discussions in ${category?.name || "this category"}`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch category
  const { data: category, error } = await supabase.from("forum_categories").select("*").eq("slug", slug).single()

  if (error || !category) {
    notFound()
  }

  // Fetch posts in this category
  const { data: posts } = await supabase
    .from("forum_posts")
    .select(
      `
      *,
      author:profiles(full_name)
    `,
    )
    .eq("category_id", category.id)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" size="sm" asChild>
          <Link href="/forum">
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Back to Forum
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
          <Button asChild>
            <Link href="/forum/new">
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              New Post
            </Link>
          </Button>
        </div>

        {/* Posts */}
        {posts && posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      {post.is_pinned && (
                        <Badge variant="secondary" className="mb-2">
                          Pinned
                        </Badge>
                      )}
                      <CardTitle className="text-xl">
                        <Link href={`/forum/post/${post.id}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        <span className="text-sm">
                          By {post.author?.full_name || "Anonymous"} • {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" aria-hidden="true" />
                        <span>0</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" aria-hidden="true" />
                        <span>{post.view_count}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">No posts in this category yet</h3>
              <p className="text-muted-foreground mb-6">Be the first to start a discussion!</p>
              <Button asChild>
                <Link href="/forum/new">Create Post</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
