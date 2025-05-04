"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"

// Sample gallery images
const galleryImages = [
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Custom plate with seasonal ingredients",
    caption: "Shot with Midjourney v6",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Craft cocktail with aromatic garnish",
    caption: "Shot with Midjourney v6",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Signature dessert presentation",
    caption: "Shot with Midjourney v6",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Chef's special with artistic plating",
    caption: "Shot with Midjourney v6",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Seasonal tasting menu item",
    caption: "Shot with Midjourney v6",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Handcrafted cocktail with fresh ingredients",
    caption: "Shot with Midjourney v6",
  },
]

// Sample Instagram posts
const instagramPosts = [
  {
    id: "post1",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "Tonight's special: Truffle-infused risotto with wild mushrooms #SmallzPlates",
    likes: 124,
    timestamp: "2 days ago",
  },
  {
    id: "post2",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "Our signature Smoky Old Fashioned - perfect for these cool evenings #CraftCocktails",
    likes: 98,
    timestamp: "3 days ago",
  },
  {
    id: "post3",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "Behind the scenes with our chef preparing tonight's tasting menu #ChefLife",
    likes: 156,
    timestamp: "5 days ago",
  },
  {
    id: "post4",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "New seasonal ingredients just arrived! Can't wait to create something special #FarmToTable",
    likes: 112,
    timestamp: "1 week ago",
  },
  {
    id: "post5",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "Weekend vibes with our botanical gin fizz #WeekendCocktails",
    likes: 143,
    timestamp: "1 week ago",
  },
  {
    id: "post6",
    imageUrl: "/placeholder.svg?height=600&width=600",
    caption: "Join us for happy hour every weekday from 4-6pm #HappyHour",
    likes: 87,
    timestamp: "2 weeks ago",
  },
]

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<"gallery" | "instagram">("gallery")
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="gallery" className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-gold mb-4">Gallery</h2>
          <p className="max-w-2xl mx-auto mb-8">A visual journey through our culinary creations and craft cocktails</p>

          {/* Gallery Tabs */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-2 transition-all ${
                activeTab === "gallery" ? "bg-gold text-black" : "bg-transparent border-b border-gold text-gold"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab("instagram")}
              className={`px-6 py-2 transition-all ${
                activeTab === "instagram" ? "bg-gold text-black" : "bg-transparent border-b border-gold text-gold"
              }`}
            >
              Instagram
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {activeTab === "gallery" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg">
                  <picture>
                    <source type="image/avif" srcSet={image.src.replace(".jpg", ".avif")} />
                    <source type="image/webp" srcSet={image.src.replace(".jpg", ".webp")} />
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-end justify-start p-4">
                    <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm">{image.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {instagramPosts.map((post) => (
                <div key={post.id} className="bg-black/30 rounded-lg overflow-hidden border border-gold/10">
                  <img
                    src={post.imageUrl || "/placeholder.svg"}
                    alt="Instagram post"
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                  <div className="p-3">
                    <p className="text-sm text-gray line-clamp-2">{post.caption}</p>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray">
                      <span>{post.likes} likes</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/smallzplates"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            Follow us on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
