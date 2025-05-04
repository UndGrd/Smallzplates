"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ClientOnly } from "@/components/ui-wrapper"

// Dynamically import components with no SSR
const Header = dynamic(() => import('@/components/header'), { ssr: false })
const OurStory = dynamic(() => import('@/components/our-story'), { ssr: false })
const Banner = dynamic(() => import('@/components/banner'), { ssr: false })
const Menu = dynamic(() => import('@/components/menu'), { ssr: false })
const Gallery = dynamic(() => import('@/components/gallery'), { ssr: false })
const Reservations = dynamic(() => import('@/components/reservations'), { ssr: false })
const Contact = dynamic(() => import('@/components/contact'), { ssr: false })
const Footer = dynamic(() => import('@/components/footer'), { ssr: false })
const ImmersiveSlider = dynamic(() => import('@/components/immersive-slider'), { ssr: false })
const StickySection = dynamic(() => import('@/components/sticky-section'), { ssr: false })
const TextAnimation = dynamic(() => import('@/components/text-animation'), { ssr: false })
const DevicePreview = dynamic(() => import('@/components/device-preview'), { ssr: false })
const ScrollSection = dynamic(() => import('@/components/scroll-section'), { ssr: false })

// Updated with the actual food, cocktail, and atmosphere images
const featuredImages = [
  { 
    src: "/images/featured/culinary-excellence.jpg", 
    alt: "Culinary Excellence - Chef garnishing a gourmet dish",
    title: "Culinary Excellence" 
  },
  { 
    src: "/images/featured/crafted-cocktails.jpg", 
    alt: "Crafted Cocktails - Bartender creating a signature drink with flame",
    title: "Crafted Cocktails" 
  },
  { 
    src: "/images/featured/atmosphere.jpg", 
    alt: "Atmosphere - Elegant restaurant interior with warm lighting",
    title: "Unforgettable Atmosphere" 
  },
]

// Sample data for our new components
const parallaxImages = [
  { src: "/placeholder.svg", alt: "Signature dish presentation" },
  { src: "/placeholder.svg", alt: "Craft cocktail creation" },
  { src: "/placeholder.svg", alt: "Restaurant ambiance" },
  { src: "/placeholder.svg", alt: "Chef preparing a dish" },
]

const immersiveSlides = [
  {
    title: "Culinary Excellence",
    description:
      "Experience the art of fine dining with our chef's carefully crafted dishes using only the freshest ingredients.",
    image: "/images/featured/culinary-excellence.jpg",
    alt: "Chef preparing a gourmet dish",
  },
  {
    title: "Craft Cocktails",
    description: "Our mixologists create unique cocktails that complement our menu and elevate your dining experience.",
    image: "/images/featured/crafted-cocktails.jpg",
    alt: "Bartender preparing a craft cocktail",
  },
  {
    title: "Unforgettable Atmosphere",
    description: "Immerse yourself in our carefully designed space that balances elegance with comfort.",
    image: "/images/featured/atmosphere.jpg",
    alt: "Restaurant interior",
  },
]

const stickyItems = [
  {
    title: "Locally Sourced Ingredients",
    description: "We partner with local farmers and producers to bring you the freshest seasonal ingredients.",
    image: "/placeholder.svg?height=1080&width=1920",
  },
  {
    title: "Handcrafted With Care",
    description: "Every dish is prepared with attention to detail and a passion for culinary excellence.",
    image: "/placeholder.svg?height=1080&width=1920",
  },
  {
    title: "Sustainable Practices",
    description: "We're committed to sustainable practices that respect our environment and community.",
    image: "/placeholder.svg?height=1080&width=1920",
  },
  {
    title: "Award-Winning Chef",
    description:
      "Our executive chef brings years of experience and innovation to create unforgettable dining experiences.",
    image: "/placeholder.svg?height=1080&width=1920",
  },
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <div className="h-screen bg-black flex items-center justify-center">
      <p className="text-white text-2xl">Loading Smallz Plates...</p>
    </div>
  }

  return (
    <ClientOnly>
      <main>
        <Header />

        {/* Hero replaced with Immersive Slider */}
        <section id="welcome">
          <ImmersiveSlider slides={immersiveSlides} />
        </section>

        <div className="py-16 bg-black">
          <div className="container-custom">
            <h2 className="heading-lg text-gold mb-8 text-center font-light">
              <TextAnimation text="Welcome to Smallz Plates" type="reveal" />
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-center font-light">
              <TextAnimation
                text="Experience culinary artistry and handcrafted cocktails in an unforgettable atmosphere. Our passion for quality ingredients and innovative techniques creates a dining experience like no other."
                type="fade"
                delay={500}
              />
            </p>
          </div>
        </div>

        {/* Featured Images Scroll Section */}
        <ScrollSection images={featuredImages} />

        {/* Device Preview Section */}
        <DevicePreview title="Responsive Design Preview">
          <div className="p-4 bg-black min-h-full">
            <h3 className="text-2xl font-cormorant font-light text-gold mb-4">Smallz Plates Menu</h3>
            <p className="mb-6 font-light">Experience our seasonal menu items on any device.</p>

            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border border-gold/20 p-4 rounded-lg">
                  <h4 className="text-lg font-light mb-2">Signature Dish {item}</h4>
                  <p className="text-gray font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p className="text-gold mt-2 font-light">$24</p>
                </div>
              ))}
            </div>
          </div>
        </DevicePreview>

        <OurStory />

        <Banner
          title="Fresh Ingredients, Exceptional Flavors"
          image="/placeholder.svg?height=800&width=1600"
          alt="Fresh ingredients on a wooden table"
        />

        <section id="menu">
          <Menu />
        </section>

        {/* Sticky Section */}
        <StickySection items={stickyItems} title="Our Philosophy" />

        <Banner
          title="Craft Cocktails, Unforgettable Memories"
          image="/placeholder.svg?height=800&width=1600"
          alt="Bartender preparing craft cocktails"
        />

        <section id="gallery">
          <Gallery />
        </section>

        <section id="reservations">
          <Reservations />
        </section>

        <Contact />
        <Footer />
      </main>
    </ClientOnly>
  )
}
