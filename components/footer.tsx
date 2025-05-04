import Link from "next/link"
import { Instagram, Facebook, Twitter, YoutubeIcon as Yelp } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gold/20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gold mb-4">Smallz Plates</h3>
            <p className="mb-4 max-w-md">
              Custom plates and craft cocktails in an unforgettable atmosphere. Join us for an exceptional dining
              experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/smallzplates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/smallzplates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com/smallzplates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://www.yelp.com/biz/smallz-plates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gold transition-colors"
                aria-label="Yelp"
              >
                <Yelp size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#welcome" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#our-story" className="hover:text-gold transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#menu" className="hover:text-gold transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-gold transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#reservations" className="hover:text-gold transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">More</h4>
            <ul className="space-y-2">
              <li>
                <a href="/gift-cards" className="hover:text-gold transition-colors">
                  Gift Cards
                </a>
              </li>
              <li>
                <a href="/loyalty" className="hover:text-gold transition-colors">
                  Loyalty Program
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-gold transition-colors">
                  Private Events
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-gold transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gold transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-8 text-center text-sm text-gray">
          <p>&copy; {currentYear} Smallz Plates. All rights reserved.</p>
          <p className="mt-2">
            <a href="/accessibility" className="hover:text-gold transition-colors">
              Accessibility
            </a>{" "}
            |{" "}
            <a href="/sitemap" className="hover:text-gold transition-colors">
              Sitemap
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
