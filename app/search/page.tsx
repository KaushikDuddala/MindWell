"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Search, ExternalLink, Globe, BookOpen, Users, Calendar, Heart, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { ScrollAnimation } from "@/components/scroll-animation"

const searchEngines = [
  {
    name: "Google",
    url: "https://www.google.com/search?q=",
    description: "Search the web",
    icon: Search,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    name: "Bing",
    url: "https://www.bing.com/search?q=",
    description: "Microsoft Bing search",
    icon: Search,
    color: "bg-teal-500 hover:bg-teal-600",
  },
  {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    description: "Privacy-focused search",
    icon: Search,
    color: "bg-orange-500 hover:bg-orange-600",
  },
  {
    name: "Yahoo",
    url: "https://search.yahoo.com/search?p=",
    description: "Yahoo search",
    icon: Globe,
    color: "bg-purple-500 hover:bg-purple-600",
  },
]

const mentalHealthResources = [
  {
    name: "NAMI",
    url: "https://www.nami.org/search?q=",
    description: "National Alliance on Mental Illness",
    icon: Heart,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "MentalHealth.gov",
    url: "https://www.mentalhealth.gov/search?query=",
    description: "Government resources",
    icon: Globe,
    color: "bg-indigo-500 hover:bg-indigo-600",
  },
  {
    name: "Psychology Today",
    url: "https://www.psychologytoday.com/us/therapists?search=",
    description: "Find therapists",
    icon: Users,
    color: "bg-pink-500 hover:bg-pink-600",
  },
  {
    name: "NIMH",
    url: "https://www.nimh.nih.gov/search?q=",
    description: "Research & education",
    icon: BookOpen,
    color: "bg-cyan-500 hover:bg-cyan-600",
  },
]

const quickLinks = [
  {
    name: "Mental Health Resources",
    href: "/resources",
    icon: BookOpen,
    description: "Comprehensive guides and information",
  },
  {
    name: "Find a Counselor",
    href: "/appointments",
    icon: Calendar,
    description: "Book an appointment with a professional",
  },
  { name: "Community Forum", href: "/forum", icon: Users, description: "Connect with others on similar journeys" },
  { name: "Blog Articles", href: "/blog", icon: Heart, description: "Read stories and expert advice" },
]

const suggestedSearches = [
  "anxiety coping strategies",
  "depression symptoms",
  "mindfulness exercises",
  "stress management techniques",
  "therapy near me",
  "mental health support groups",
  "self-care tips",
  "how to help someone with depression",
]

export default function SearchPage() {
  const [query, setQuery] = useState("")

  const handleSearch = (engineUrl: string) => {
    if (query.trim()) {
      window.open(engineUrl + encodeURIComponent(query), "_blank", "noopener,noreferrer")
    }
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="space-y-16">
        {/* Header */}
        <ScrollAnimation className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full" aria-hidden="true">
            <Search className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Search Resources</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Search the web or mental health-specific resources to find the information you need
          </p>
        </ScrollAnimation>

        {/* Search Input */}
        <ScrollAnimation>
          <Card className="max-w-3xl mx-auto border-2">
            <CardContent className="pt-8 pb-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSearch(searchEngines[0].url)
                }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex-1">
                  <Label htmlFor="search-query" className="sr-only">
                    Search query
                  </Label>
                  <Input
                    id="search-query"
                    type="search"
                    placeholder="Enter your search query..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="text-lg h-14 px-6"
                    aria-label="Search query"
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 btn-animate" disabled={!query.trim()}>
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </ScrollAnimation>

        {/* Suggested Searches */}
        <ScrollAnimation className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-medium">Suggested searches:</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestedSearches.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="bg-transparent hover:bg-primary/10 transition-all"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Search Engines Grid */}
        <section>
          <ScrollAnimation className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">General Search Engines</h2>
          </ScrollAnimation>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {searchEngines.map((engine, index) => (
              <ScrollAnimation key={engine.name} delay={index * 50}>
                <button
                  onClick={() => handleSearch(engine.url)}
                  disabled={!query.trim()}
                  className={`${engine.color} text-white p-6 rounded-xl transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-left group w-full`}
                  aria-label={`Search with ${engine.name}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <engine.icon className="h-8 w-8" aria-hidden="true" />
                    <ExternalLink
                      className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{engine.name}</h3>
                  <p className="text-sm text-white/80">{engine.description}</p>
                </button>
              </ScrollAnimation>
            ))}
          </div>
        </section>

        {/* Mental Health Resources */}
        <section>
          <ScrollAnimation className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Mental Health Resources</h2>
            <p className="text-muted-foreground mt-2">Search specialized mental health databases</p>
          </ScrollAnimation>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {mentalHealthResources.map((resource, index) => (
              <ScrollAnimation key={resource.name} delay={index * 50}>
                <button
                  onClick={() => handleSearch(resource.url)}
                  disabled={!query.trim()}
                  className={`${resource.color} text-white p-6 rounded-xl transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-left group w-full`}
                  aria-label={`Search ${resource.name}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <resource.icon className="h-8 w-8" aria-hidden="true" />
                    <ExternalLink
                      className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{resource.name}</h3>
                  <p className="text-sm text-white/80">{resource.description}</p>
                </button>
              </ScrollAnimation>
            ))}
          </div>
        </section>

        {/* Internal Search */}
        <section>
          <ScrollAnimation className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Browse Our Site</h2>
            <p className="text-muted-foreground mt-2">Looking for something specific on MindWell?</p>
          </ScrollAnimation>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {quickLinks.map((link, index) => (
              <ScrollAnimation key={link.name} delay={index * 50}>
                <Card className="card-animate border-2 hover:border-primary/50">
                  <CardContent className="p-6">
                    <Link href={link.href} className="flex items-start gap-4 group">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <link.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                          {link.name}
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
