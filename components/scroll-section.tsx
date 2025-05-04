"use client"

import { useRef, useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ScrollImage {
  src: string
  alt: string
  title: string
}

interface ScrollSectionProps {
  images: ScrollImage[]
}

export default function ScrollSection({ images }: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  
  // Handle scrolling within the section
  useEffect(() => {
    const scrollContainer = sectionRef.current
    if (!scrollContainer) return
    
    const handleScroll = () => {
      const sectionHeight = scrollContainer.clientHeight
      const scrollPosition = scrollContainer.scrollTop
      
      // Calculate which image should be active based on scroll position
      const index = Math.min(
        Math.floor(scrollPosition / sectionHeight),
        images.length - 1
      )
      
      setActiveIndex(index)
    }
    
    scrollContainer.addEventListener('scroll', handleScroll)
    
    // Initialize images as loaded
    setImagesLoaded(true)
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [images.length])
  
  // Scroll to the next image when clicking the arrow
  const scrollToNext = () => {
    if (!sectionRef.current) return
    
    const nextIndex = Math.min(activeIndex + 1, images.length - 1)
    sectionRef.current.scrollTo({
      top: nextIndex * sectionRef.current.clientHeight,
      behavior: 'smooth'
    })
  }
  
  return (
    <section className="relative h-screen bg-black">
      <div className="container-custom absolute top-0 left-0 right-0 z-10 pt-8">
        <h2 className="heading-lg text-gold text-center font-light">Experience Excellence</h2>
      </div>
      
      {/* Scroll indicator for first slide */}
      {activeIndex === 0 && (
        <button 
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={36} />
        </button>
      )}
      
      {/* Progress indicator */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-gold w-4 h-4' : 'bg-white/50'
            }`}
            onClick={() => {
              if (sectionRef.current) {
                sectionRef.current.scrollTo({
                  top: index * sectionRef.current.clientHeight,
                  behavior: 'smooth'
                })
              }
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
      
      <div 
        ref={sectionRef}
        className="snap-y snap-mandatory h-screen overflow-y-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className="snap-start h-screen w-full flex flex-col items-center justify-center relative"
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <div className="relative h-full w-full">
                {imagesLoaded && (
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                      index === activeIndex ? 'opacity-100' : 'opacity-80'
                    }`}
                  />
                )}
              </div>
            </div>
            
            <div className="relative z-20 text-center px-4 transform transition-all duration-700">
              <h3 className={`text-4xl md:text-6xl lg:text-7xl font-cormorant font-light text-white mb-6 ${
                index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                {image.title}
              </h3>
              <div className={`w-24 h-1 bg-gold mx-auto transition-all duration-700 delay-300 ${
                index === activeIndex ? 'w-24 opacity-100' : 'w-0 opacity-0'
              }`}></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Custom CSS for hiding scrollbars */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
} 