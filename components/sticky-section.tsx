"use client"

import { useRef, useEffect, useState } from "react"

interface StickyContentItem {
  title: string
  description: string
  image: string
}

interface StickySectionProps {
  items: StickyContentItem[]
  title?: string
}

export default function StickySection({ items, title }: StickySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { top, height } = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how far we've scrolled into the section
      const scrollPosition = -top
      const totalScrollLength = height - windowHeight

      // Calculate progress (0 to 1)
      const currentProgress = Math.max(0, Math.min(1, scrollPosition / totalScrollLength))
      setProgress(currentProgress)

      // Calculate which item should be active based on progress
      const itemIndex = Math.min(items.length - 1, Math.floor(currentProgress * items.length))
      setActiveIndex(itemIndex)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items.length])

  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: `${items.length * 100}vh` }}>
      {title && (
        <div className="sticky top-0 left-0 w-full py-12 z-10 bg-black">
          <h2 className="text-3xl md:text-4xl font-playfair text-gold text-center">{title}</h2>
        </div>
      )}

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-3xl md:text-5xl font-playfair text-white mb-6">{item.title}</h3>
                <p className="text-lg md:text-xl text-white/80">{item.description}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-2">
          {items.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${index === activeIndex ? "bg-gold w-8" : "bg-white/50 w-2"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
