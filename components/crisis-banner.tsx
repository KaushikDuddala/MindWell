"use client"

import { AlertCircle, Phone, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function CrisisBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <aside
      className="bg-red-50 border-b border-red-200 py-3 px-4"
      role="complementary"
      aria-labelledby="crisis-banner-heading"
    >
      <div className="container mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" aria-hidden="true" />
          <div className="flex-1">
            <p id="crisis-banner-heading" className="text-sm font-semibold text-red-900">
              Crisis Support Available 24/7
            </p>
            <p className="text-sm text-red-800">
              If you're in crisis, help is available right now.{" "}
              <span className="font-medium">Call 988 (Suicide & Crisis Lifeline)</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild className="bg-white border-red-300 text-red-700 hover:bg-red-50">
            <a href="tel:988" aria-label="Call 988 Suicide and Crisis Lifeline">
              <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
              Call 988
            </a>
          </Button>
          <Button
            size="sm"
            variant="outline"
            asChild
            className="bg-white border-red-300 text-red-700 hover:bg-red-50 hidden sm:inline-flex"
          >
            <a href="sms:988" aria-label="Text 988 Suicide and Crisis Lifeline">
              <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
              Text 988
            </a>
          </Button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-red-100 rounded"
            aria-label="Dismiss crisis banner"
          >
            <X className="h-4 w-4 text-red-600" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  )
}
