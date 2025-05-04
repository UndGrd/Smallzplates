"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Geo-aware CTA function
  const handleCTAClick = () => {
    // This would be replaced with actual geolocation logic
    const userIsNearby = false // Placeholder for geolocation check

    if (userIsNearby && window.innerWidth < 768) {
      // If user is on mobile and nearby, scroll to phone tap link
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    } else {
      // Otherwise, open OpenTable modal
      window.open("https://www.opentable.com/restref/client/?rid=RESTAURANT_ID", "_blank")
    }
  }

  useEffect(() => {
    // Only attempt to play the video if it exists and is in view
    if (videoRef.current && inView) {
      const playVideo = async () => {
        try {
          // Make sure video is muted to improve chances of autoplay success
          if (videoRef.current) {
            videoRef.current.muted = true
            await videoRef.current.play()
            setVideoLoaded(true)
          }
        } catch (error) {
          console.error("Video autoplay failed:", error)
          setVideoError(true)
        }
      }

      // Add event listeners for better control
      const videoElement = videoRef.current

      const handleCanPlay = () => {
        playVideo()
      }

      const handleError = () => {
        console.error("Video loading error")
        setVideoError(true)
      }

      videoElement.addEventListener("canplay", handleCanPlay)
      videoElement.addEventListener("error", handleError)

      // Try to play immediately if already loaded
      if (videoElement.readyState >= 3) {
        playVideo()
      }

      return () => {
        videoElement.removeEventListener("canplay", handleCanPlay)
        videoElement.removeEventListener("error", handleError)
      }
    }
  }, [inView])

  return (
    <section id="welcome" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with Fallback Image */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted
              loop
              poster="/placeholder.svg?height=1080&width=1920"
              preload="auto"
            >
              <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        ) : (
          // Fallback to static image if video fails
          <div className="absolute inset-0">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Smallz Plates ambiance"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Hero Content */}
      <div ref={ref} className="container-custom relative z-10 text-center">
        <div
          className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="heading-xl mb-6 text-white">
            Custom Plates <br /> & Craft Cocktails
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience culinary artistry and handcrafted cocktails in an unforgettable atmosphere
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={handleCTAClick} className="btn btn-primary">
              Reserve a Table
            </button>
            <a href="#menu" className="btn btn-outline">
              Explore Menu
            </a>
          </div>
        </div>

        {/* Animated Flame Icon - Simplified to static for now */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-16 h-16">
          <div className="w-16 h-16 text-gold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
