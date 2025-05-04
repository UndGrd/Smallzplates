"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLIFrameElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Load map when section comes into view
  useEffect(() => {
    if (inView && !mapLoaded && mapRef.current) {
      // Using dark mode map with the updated location
      mapRef.current.src =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2938.9346875863196!2d-83.28382492346546!3d42.52029997127544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824b7c3c4e0c1c9%3A0x1c9c4c24b8f20e8a!2s30100%20Telegraph%20Rd%2C%20Bingham%20Farms%2C%20MI%2048025!5e0!3m2!1sen!2sus!4v1714782000000!5m2!1sen!2sus&map_id=8f48fccc6a5c1e42"
      setMapLoaded(true)
    }
  }, [inView, mapLoaded])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // This would be replaced with actual form submission logic
    alert("Thank you for joining our VIP list!")
  }

  return (
    <section id="contact" className="section-padding bg-black">
      <div className="container-custom">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="heading-lg text-gold mb-4 font-light">Contact Us</h2>
          <p className="max-w-2xl mx-auto mb-8 font-light">
            We'd love to hear from you. Get in touch with us for reservations, private events, or any questions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-black/50 p-6 rounded-lg border border-gold/20 mb-8">
              <h3 className="text-xl font-light mb-4">Find Us</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Location</p>
                    <p>30100 Telegraph Road</p>
                    <p>Bingham Farms, MI 48025</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+12485550130" className="hover:text-gold">
                      (248) 555-0130
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Contact</p>
                    <a href="mailto:mgmt@smallzplates.com" className="hover:text-gold">
                      mgmt@smallzplates.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="text-gold mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p>Monday - Thursday: 4pm - 11pm</p>
                    <p>Friday - Saturday: 4pm - 1am</p>
                    <p>Sunday: 4pm - 10pm</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://wa.me/12485550130"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gold hover:underline"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-black/50 p-6 rounded-lg border border-gold/20">
              <h3 className="text-xl font-light mb-4">Join Our VIP List</h3>
              <p className="mb-4 font-light">
                Subscribe to receive updates on special events, new menu items, and exclusive offers.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-light mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 bg-black/50 border border-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-light mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 bg-black/50 border border-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>

                <div className="hidden">
                  {/* Honeypot field for spam protection */}
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" />
                </div>

                <div>
                  <label htmlFor="birthday" className="block text-sm font-light mb-1">
                    Birthday (for special offers)
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    className="w-full px-4 py-2 bg-black/50 border border-gold/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>

                <button type="submit" className="w-full btn btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="h-[500px] rounded-lg overflow-hidden">
            <iframe
              ref={mapRef}
              title="Smallz Plates Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="bg-black"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
