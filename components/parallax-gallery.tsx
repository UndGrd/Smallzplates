"use client"

import { useState, useRef, useEffect } from "react"
import { useIntersectionObserver } from "@/utils/animations"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
}

interface ParallaxGalleryProps {
  images: GalleryImage[]
  title?: string
}

export default function ParallaxGallery({ images, title }: ParallaxGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })
  const sliderRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const goToNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const goToPrev = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Handle touch events for mobile swiping
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX
      const diff = touchStartX.current - touchEndX.current

      if (diff > 50) {
        goToNext()
      } else if (diff < -50) {
        goToPrev()
      }
    }

    slider.addEventListener("touchstart", handleTouchStart)
    slider.addEventListener("touchend", handleTouchEnd)

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart)
      slider.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  // Auto-advance the slider
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [isVisible, currentIndex, isTransitioning])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-10 flex items-center justify-between px-4">
        <button
          onClick={goToPrev}
          className="rounded-full bg-black/30 p-2 text-white hover:bg-black/50 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="rounded-full bg-black/30 p-2 text-white hover:bg-black/50 transition-all"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div ref={sliderRef} className="relative h-full w-full" style={{ touchAction: "pan-y" }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="h-full w-full object-cover"
              style={{
                transform: index === currentIndex ? "scale(1.1)" : "scale(1)",
                transition: "transform 10s ease-out",
              }}
            />
          </div>
        ))}
      </div>

      {title && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-cormorant font-light text-white text-center px-4">
            {title}
          </h2>
        </div>
      )}

      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? "bg-gold w-8" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
