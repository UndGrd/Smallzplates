"use client"

import { useState, useRef, useEffect } from "react"
import { useIntersectionObserver } from "@/utils/animations"
import TextAnimation from "./text-animation"

interface SlideContent {
  title: string
  description: string
  image: string
  alt: string
}

interface ImmersiveSliderProps {
  slides: SlideContent[]
}

export default function ImmersiveSlider({ slides }: ImmersiveSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })
  const sliderRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const goToSlide = (index: number) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setActiveIndex(index)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 1000)
  }

  const goToNext = () => {
    goToSlide((activeIndex + 1) % slides.length)
  }

  const goToPrev = () => {
    goToSlide((activeIndex - 1 + slides.length) % slides.length)
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
  }, [activeIndex])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext()
      } else if (e.key === "ArrowLeft") {
        goToPrev()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeIndex])

  return (
    <div ref={ref} className="relative h-screen overflow-hidden bg-black">
      <div ref={sliderRef} className="h-full w-full" style={{ touchAction: "pan-y" }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.alt}
              className="h-full w-full object-cover"
              style={{
                transform: index === activeIndex ? "scale(1.05)" : "scale(1)",
                transition: "transform 8s ease-out",
              }}
            />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 md:px-12">
              <div
                className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
                  index === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <h2 className="text-4xl md:text-6xl font-cormorant font-light text-white mb-6">
                  <TextAnimation text={slide.title} type="reveal" delay={300} />
                </h2>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
                  <TextAnimation text={slide.description} type="fade" delay={800} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 transition-all ${index === activeIndex ? "bg-gold w-12" : "bg-white/50 w-2"} rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
