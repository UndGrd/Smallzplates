"use client"

import { useEffect, useState } from "react"
import { useIntersectionObserver } from "@/utils/animations"

interface TextAnimationProps {
  text: string
  className?: string
  delay?: number
  type?: "reveal" | "fade" | "slide"
}

export default function TextAnimation({ text, className = "", delay = 0, type = "reveal" }: TextAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      if (type === "reveal") {
        let index = 0
        const timer = setTimeout(() => {
          const interval = setInterval(() => {
            setDisplayText(text.substring(0, index))
            index++
            if (index > text.length) {
              clearInterval(interval)
              setHasAnimated(true)
            }
          }, 50)
          return () => clearInterval(interval)
        }, delay)
        return () => clearTimeout(timer)
      } else {
        setTimeout(() => {
          setDisplayText(text)
          setHasAnimated(true)
        }, delay)
      }
    }
  }, [isVisible, text, delay, type, hasAnimated])

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0"

    switch (type) {
      case "fade":
        return "animate-fade-in"
      case "slide":
        return "animate-slide-up"
      default:
        return ""
    }
  }

  return (
    <div ref={ref} className={`overflow-hidden font-cormorant font-light ${className}`}>
      {type === "reveal" ? (
        <span className="inline-block">{displayText}</span>
      ) : (
        <span className={`inline-block transition-all duration-1000 ${getAnimationClass()}`}>
          {type === "reveal" ? displayText : text}
        </span>
      )}
    </div>
  )
}
