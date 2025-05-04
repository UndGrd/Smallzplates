"use client"

import { useInView } from "react-intersection-observer"

interface BannerProps {
  title: string
  image: string
  alt: string
}

export default function Banner({ title, image, alt }: BannerProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={image || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div ref={ref} className="container-custom relative z-10 text-center">
        <h2
          className={`heading-lg text-white font-light transition-all duration-1000 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {title}
        </h2>
      </div>
    </section>
  )
}
