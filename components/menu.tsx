"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Info } from "lucide-react"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

// Menu item type
interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  tags: string[]
  nutrition?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

// Menu category type
interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

// Sample menu data
const menuData: MenuCategory[] = [
  {
    id: "starters",
    name: "Starters",
    items: [
      {
        id: "bruschetta",
        name: "Artisanal Bruschetta",
        description: "Toasted sourdough, heirloom tomatoes, basil, aged balsamic",
        price: 12,
        tags: ["vegetarian", "dairy-free"],
        nutrition: {
          calories: 320,
          protein: 8,
          carbs: 42,
          fat: 14,
        },
      },
      {
        id: "ceviche",
        name: "Citrus Ceviche",
        description: "Fresh catch, lime, cilantro, avocado, house-made tortilla chips",
        price: 16,
        tags: ["gluten-free", "dairy-free"],
        nutrition: {
          calories: 280,
          protein: 22,
          carbs: 18,
          fat: 12,
        },
      },
    ],
  },
  {
    id: "mains",
    name: "Main Plates",
    items: [
      {
        id: "risotto",
        name: "Wild Mushroom Risotto",
        description: "Arborio rice, seasonal mushrooms, truffle oil, parmesan",
        price: 24,
        tags: ["vegetarian", "gluten-free"],
        nutrition: {
          calories: 580,
          protein: 12,
          carbs: 68,
          fat: 28,
        },
      },
      {
        id: "salmon",
        name: "Cedar Plank Salmon",
        description: "Sustainably sourced salmon, maple glaze, seasonal vegetables",
        price: 32,
        tags: ["gluten-free", "dairy-free"],
        nutrition: {
          calories: 490,
          protein: 38,
          carbs: 22,
          fat: 26,
        },
      },
    ],
  },
  {
    id: "cocktails",
    name: "Craft Cocktails",
    items: [
      {
        id: "smoky-old-fashioned",
        name: "Smoky Old Fashioned",
        description: "Bourbon, smoked maple syrup, aromatic bitters, orange peel",
        price: 14,
        tags: ["gluten-free", "vegan"],
        nutrition: {
          calories: 220,
          protein: 0,
          carbs: 12,
          fat: 0,
        },
      },
      {
        id: "botanical-gin",
        name: "Botanical Gin Fizz",
        description: "Small-batch gin, elderflower, fresh citrus, rosemary, soda",
        price: 15,
        tags: ["gluten-free", "vegan"],
        nutrition: {
          calories: 180,
          protein: 0,
          carbs: 14,
          fat: 0,
        },
      },
    ],
  },
]

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [filteredMenu, setFilteredMenu] = useState<MenuCategory[]>(menuData)
  const [isOrderingTime, setIsOrderingTime] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Check if current time is between 11am and 5pm
  useEffect(() => {
    const checkOrderingTime = () => {
      const now = new Date()
      const hour = now.getHours()
      setIsOrderingTime(hour >= 11 && hour < 17)
    }

    checkOrderingTime()
    const interval = setInterval(checkOrderingTime, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  // Filter menu items based on selected allergen/diet
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredMenu(menuData)
    } else {
      const filtered = menuData
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => item.tags.includes(activeFilter)),
        }))
        .filter((category) => category.items.length > 0)

      setFilteredMenu(filtered)
    }
  }, [activeFilter])

  return (
    <section id="menu" className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-gold mb-4">Our Menu</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Expertly crafted dishes and cocktails made with the finest ingredients
          </p>

          {/* Allergen Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === "all" ? "bg-gold text-black" : "bg-transparent border border-gold text-gold"
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveFilter("vegetarian")}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === "vegetarian" ? "bg-gold text-black" : "bg-transparent border border-gold text-gold"
              }`}
            >
              Vegetarian
            </button>
            <button
              onClick={() => setActiveFilter("vegan")}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === "vegan" ? "bg-gold text-black" : "bg-transparent border border-gold text-gold"
              }`}
            >
              Vegan
            </button>
            <button
              onClick={() => setActiveFilter("gluten-free")}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === "gluten-free" ? "bg-gold text-black" : "bg-transparent border border-gold text-gold"
              }`}
            >
              Gluten-Free
            </button>
            <button
              onClick={() => setActiveFilter("dairy-free")}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === "dairy-free" ? "bg-gold text-black" : "bg-transparent border border-gold text-gold"
              }`}
            >
              Dairy-Free
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className={`space-y-12 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {filteredMenu.length > 0 ? (
            filteredMenu.map((category) => (
              <div key={category.id} className="mb-12">
                <h3 className="heading-md text-gold mb-6 border-b border-gold/30 pb-2">{category.name}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {category.items.map((item) => (
                    <div key={item.id} className="bg-black/50 p-6 border border-gold/20 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-bold">{item.name}</h4>
                        <div className="flex items-center">
                          <span className="text-gold font-bold">${item.price}</span>
                          {item.nutrition && (
                            <TooltipProvider>
                              <Tooltip
                                content={
                                  <div className="p-2">
                                    <p className="font-bold mb-1">Nutrition Facts</p>
                                    <p>Calories: {item.nutrition.calories}</p>
                                    <p>Protein: {item.nutrition.protein}g</p>
                                    <p>Carbs: {item.nutrition.carbs}g</p>
                                    <p>Fat: {item.nutrition.fat}g</p>
                                  </div>
                                }
                              >
                                <button className="ml-2 text-gray hover:text-gold">
                                  <Info size={16} />
                                  <span className="sr-only">Nutrition information</span>
                                </button>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                      <p className="text-gray mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-gold/10 text-gold rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p>No items match your selected filter. Please try another option.</p>
            </div>
          )}
        </div>

        {/* Online Ordering Button - Only visible during ordering hours */}
        {isOrderingTime && (
          <div className="mt-12 text-center">
            <a
              href="https://www.toasttab.com/restaurant-name/order"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-block"
            >
              Order Online
            </a>
            <p className="mt-2 text-sm text-gray">Online ordering available from 11am - 5pm</p>
          </div>
        )}
      </div>
    </section>
  )
}
