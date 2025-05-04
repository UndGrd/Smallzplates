"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("welcome")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const handleScroll = () => {
      // Handle header background change on scroll
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Handle active section detection
      if (typeof document !== 'undefined') {
        const sections = document.querySelectorAll("section[id]")
        const scrollPosition = window.scrollY + 100 // Offset for better detection

        sections.forEach((section) => {
          const sectionId = section.getAttribute("id") || ""
          const sectionTop = (section as HTMLElement).offsetTop
          const sectionHeight = (section as HTMLElement).offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId)
          }
        })
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const initOpenTable = () => {
    // OpenTable widget initialization would go here
    if (typeof window !== 'undefined') {
      window.open("https://www.opentable.com/restref/client/?rid=RESTAURANT_ID", "_blank")
    }
  }

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsOpen(false)

    // Smooth scroll to section
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  if (!isMounted) {
    // Return a simple placeholder while on server or during hydration
    return <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-95 py-2"></header>
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black bg-opacity-95 py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link href="/" className="relative z-10">
          <div className={`relative transition-all duration-300 ${scrolled ? "w-80 h-32" : "w-112 h-48"}`}>
            <img src="/images/logo.png" alt="Smallz Plates" className="object-contain w-full h-full" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#welcome"
            className={`nav-link ${activeSection === "welcome" ? "text-gold" : ""}`}
            onClick={() => handleNavClick("welcome")}
          >
            HOME
          </Link>
          <Link
            href="#our-story"
            className={`nav-link ${activeSection === "our-story" ? "text-gold" : ""}`}
            onClick={() => handleNavClick("our-story")}
          >
            OUR STORY
          </Link>
          <Link
            href="#menu"
            className={`nav-link ${activeSection === "menu" ? "text-gold" : ""}`}
            onClick={() => handleNavClick("menu")}
          >
            MENU
          </Link>
          <Link
            href="#gallery"
            className={`nav-link ${activeSection === "gallery" ? "text-gold" : ""}`}
            onClick={() => handleNavClick("gallery")}
          >
            GALLERY
          </Link>
          <Link
            href="#contact"
            className={`nav-link ${activeSection === "contact" ? "text-gold" : ""}`}
            onClick={() => handleNavClick("contact")}
          >
            CONTACT
          </Link>
          <button
            onClick={initOpenTable}
            className="btn btn-primary uppercase text-xs tracking-wider"
            aria-label="Reserve a table"
          >
            RESERVE TABLE
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white z-10"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center space-y-8 transition-all duration-300 md:hidden ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <Link
            href="#welcome"
            className={`nav-link-mobile ${activeSection === "welcome" ? "text-gold" : ""}`}
            onClick={() => handleNavClick("welcome")}
          >
            Home
          </Link>
          <Link
            href="#our-story"
            className={`nav-link-mobile ${activeSection === "our-story" ? "text-gold" : ""}`}
            onClick={() => handleNavClick("our-story")}
          >
            Our Story
          </Link>
          <Link
            href="#menu"
            className={`nav-link-mobile ${activeSection === "menu" ? "text-gold" : ""}`}
            onClick={() => handleNavClick("menu")}
          >
            Menu
          </Link>
          <Link
            href="#gallery"
            className={`nav-link-mobile ${activeSection === "gallery" ? "text-gold" : ""}`}
            onClick={() => handleNavClick("gallery")}
          >
            Gallery
          </Link>
          <Link
            href="#contact"
            className={`nav-link-mobile ${activeSection === "contact" ? "text-gold" : ""}`}
            onClick={() => handleNavClick("contact")}
          >
            Contact
          </Link>
          <button
            onClick={() => {
              initOpenTable()
              setIsOpen(false)
            }}
            className="btn btn-primary uppercase tracking-[0.2em] text-xs"
          >
            Reserve Table
          </button>
        </div>
      </div>
    </header>
  )
}
