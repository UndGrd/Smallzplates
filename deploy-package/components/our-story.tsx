"use client"

import { useInView } from "react-intersection-observer"
import { Player } from "@lottiefiles/react-lottie-player"

export default function OurStory() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="our-story" className="section-padding bg-black">
      <div className="container-custom">
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div>
            <h2 className="heading-lg text-gold mb-6 font-light">Our Story</h2>
            <p className="mb-4 font-light">
              Founded with a passion for culinary excellence, Smallz Plates brings together the art of custom plating
              and craft cocktails to create an unforgettable dining experience.
            </p>
            <p className="mb-4 font-light">
              Our chef-driven menu features locally sourced ingredients, transformed into creative dishes that delight
              both the palate and the eye. Each plate is a canvas, each cocktail a masterpiece.
            </p>
            <p className="font-light">
              We believe in the power of food and drink to create memories, foster connections, and tell stories. Join
              us on this culinary journey.
            </p>
          </div>
          <div className="relative h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Chef preparing a custom plate"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-4 right-4">
              <Player
                autoplay
                loop
                src="/scroll-cue.json" // This would be a Lottie JSON file
                style={{ width: "64px", height: "64px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
