"use client"

import type React from "react"

import { useState } from "react"
import { Smartphone, Monitor, Tablet } from "lucide-react"

interface DevicePreviewProps {
  children: React.ReactNode
  title?: string
}

export default function DevicePreview({ children, title }: DevicePreviewProps) {
  const [activeDevice, setActiveDevice] = useState<"mobile" | "tablet" | "desktop">("desktop")

  return (
    <div className="bg-black py-16">
      <div className="container-custom">
        {title && <h2 className="heading-lg text-gold mb-8 text-center">{title}</h2>}

        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveDevice("mobile")}
            className={`p-3 rounded-full transition-all ${
              activeDevice === "mobile" ? "bg-gold text-black" : "bg-black/50 text-white"
            }`}
            aria-label="View mobile preview"
          >
            <Smartphone size={24} />
          </button>
          <button
            onClick={() => setActiveDevice("tablet")}
            className={`p-3 rounded-full transition-all ${
              activeDevice === "tablet" ? "bg-gold text-black" : "bg-black/50 text-white"
            }`}
            aria-label="View tablet preview"
          >
            <Tablet size={24} />
          </button>
          <button
            onClick={() => setActiveDevice("desktop")}
            className={`p-3 rounded-full transition-all ${
              activeDevice === "desktop" ? "bg-gold text-black" : "bg-black/50 text-white"
            }`}
            aria-label="View desktop preview"
          >
            <Monitor size={24} />
          </button>
        </div>

        <div className="flex justify-center">
          <div
            className={`bg-black border-4 border-gray-800 rounded-lg overflow-hidden transition-all duration-500 ${
              activeDevice === "mobile"
                ? "w-[320px] h-[568px]"
                : activeDevice === "tablet"
                  ? "w-[768px] h-[1024px]"
                  : "w-full h-[768px]"
            }`}
          >
            <div className="w-full h-full overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
