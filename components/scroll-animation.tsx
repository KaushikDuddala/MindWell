"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale"
  delay?: number
  threshold?: number
}

export function ScrollAnimation({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const animationClass = {
      "fade-up": "scroll-animate",
      "fade-left": "scroll-animate-left",
      "fade-right": "scroll-animate-right",
      scale: "scroll-animate-scale",
    }[animation]

    element.classList.add(animationClass)
    element.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [animation, delay, threshold])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
