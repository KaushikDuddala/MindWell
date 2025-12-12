"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [userType, setUserType] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        supabase
          .from("profiles")
          .select("user_type")
          .eq("id", user.id)
          .single()
          .then(({ data }) => {
            setUserType(data?.user_type || "user")
          })
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase
          .from("profiles")
          .select("user_type")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            setUserType(data?.user_type || "user")
          })
      } else {
        setUserType(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary animate-pulse-soft" aria-hidden="true" />
            <Link href="/" className="text-xl font-bold hover:text-primary transition-colors">
              MindWell
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="/resources"
              className="text-sm font-medium hover:text-primary transition-all duration-300 link-animate"
            >
              Resources
            </Link>
            <Link
              href="/appointments"
              className="text-sm font-medium hover:text-primary transition-all duration-300 link-animate"
            >
              Find a Counselor
            </Link>
            <Link
              href="/forum"
              className="text-sm font-medium hover:text-primary transition-all duration-300 link-animate"
            >
              Community
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-primary transition-all duration-300 link-animate"
            >
              Blog
            </Link>
            <Link
              href="/testimonials"
              className="text-sm font-medium hover:text-primary transition-all duration-300 link-animate"
            >
              Testimonials
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium hover:text-primary transition-all duration-300 link-animate"
            >
              Search
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-all duration-300 link-animate"
            >
              About
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="btn-animate bg-transparent">
                    My Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  {userType === "counselor" && (
                    <DropdownMenuItem asChild>
                      <Link href="/counselor/dashboard">Counselor Portal</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/appointments/my-appointments">My Appointments</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild className="btn-animate bg-transparent">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="btn-animate">
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 transition-transform duration-200 hover:scale-110"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background animate-fade-in-down">
          <nav
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4"
            aria-label="Mobile navigation"
          >
            <Link
              href="/resources"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/appointments"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find a Counselor
            </Link>
            <Link
              href="/forum"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 border-t flex flex-col gap-3">
              {user ? (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  {userType === "counselor" && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/counselor/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        Counselor Portal
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/auth/sign-up" onClick={() => setMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
