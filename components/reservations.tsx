"use client"

import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import Script from "next/script"

export default function Reservations() {
  const openTableRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    // This would be replaced with actual OpenTable widget initialization
    if (inView && openTableRef.current && (window as any).OpenTable) {
      ;(window as any).OpenTable.Widget.render(
        {
          restaurantId: 123456, // Replace with actual restaurant ID
          type: "standard",
          theme: "dark",
          iframe: true,
          newtab: false,
          modal: false,
          domainId: 1,
          alignWithCoordinates: false,
          style: "width:100%;",
        },
        openTableRef.current,
      )
    }
  }, [inView])

  return (
    <section id="reservations" className="section-padding bg-black/90">
      <div className="container-custom">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="heading-lg text-gold mb-4">Reservations</h2>
          <p className="max-w-2xl mx-auto mb-8">Reserve your table for an unforgettable dining experience</p>
        </div>

        <div className="bg-black/50 p-6 rounded-lg border border-gold/20 max-w-3xl mx-auto">
          <div ref={openTableRef} className="w-full min-h-[300px] flex items-center justify-center">
            {/* OpenTable widget will be rendered here */}
            <p className="text-gray">Loading reservation system...</p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray mb-2">Prefer to make a reservation by phone?</p>
            <a href="tel:+12485550130" className="text-gold hover:underline">
              (248) 555-0130
            </a>

            <div className="mt-4 pt-4 border-t border-gold/20">
              <h3 className="text-lg font-bold mb-2">Walk-ins & Waitlist</h3>
              <p className="text-sm text-gray mb-4">
                We welcome walk-ins based on availability. Join our digital waitlist for real-time updates.
              </p>
              <a
                href="https://www.yelp.com/waitlist/smallz-plates"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline inline-block"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </div>

      <Script
        id="opentable-script"
        src="//www.opentable.com/widget/reservation/loader?rid=123456&type=standard&theme=dark&iframe=true&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website"
        strategy="lazyOnload"
      />
    </section>
  )
}
