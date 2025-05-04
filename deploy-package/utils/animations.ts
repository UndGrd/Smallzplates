"use client"

import { useEffect, useRef, useState } from "react"

// Text animation - reveals text letter by letter
export const useTextReveal = (text: string, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    setDisplayedText("")
    setIsComplete(false)

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return { displayedText, isComplete }
}

// Parallax effect for images
export const useParallax = (speed = 0.2) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const elementTop = ref.current.getBoundingClientRect().top
      const elementHeight = ref.current.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate how far the element is from the viewport center
      const distanceFromCenter = elementTop - windowHeight / 2 + elementHeight / 2

      // Apply parallax effect
      setOffset(distanceFromCenter * speed)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return { ref, style: { transform: `translateY(${offset}px)` } }
}

// Intersection observer hook for triggering animations
export const useIntersectionObserver = (options = {}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return { ref, isVisible }
}
