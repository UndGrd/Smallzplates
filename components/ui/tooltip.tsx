"use client"

import type * as React from "react"
import { createContext, useContext, useState } from "react"

// Create context for tooltip state
const TooltipContext = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({
  open: false,
  setOpen: () => {},
})

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return <TooltipContext.Provider value={{ open, setOpen }}>{children}</TooltipContext.Provider>
}

// Custom hook to use tooltip context
function useTooltip() {
  const context = useContext(TooltipContext)
  if (!context) {
    throw new Error("useTooltip must be used within a TooltipProvider")
  }
  return context
}

// Main Tooltip component that's exported and used in menu.tsx
export function Tooltip({
  children,
  content,
}: {
  children: React.ReactNode
  content: React.ReactNode
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX + rect.width / 2,
    })
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  return (
    <TooltipRoot>
      <TooltipTrigger onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </TooltipTrigger>

      {isVisible && (
        <TooltipContent
          className="absolute z-50 bg-black border border-gold/30 rounded-md shadow-lg p-3 text-white text-sm"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: "translateX(-50%)",
            minWidth: "200px",
          }}
        >
          {content}
        </TooltipContent>
      )}
    </TooltipRoot>
  )
}

export const TooltipRoot = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative inline-block">{children}</div>
}

export const TooltipTrigger = ({
  children,
  onMouseEnter,
  onMouseLeave,
}: { children: React.ReactNode; onMouseEnter?: any; onMouseLeave?: any }) => {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  )
}

export const TooltipContent = ({
  children,
  className,
  style,
}: { children: React.ReactNode; className?: string; style?: any }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
