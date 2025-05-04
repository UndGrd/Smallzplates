"use client"

import { useEffect, useState } from 'react'

/**
 * This component provides a safe way to handle client-side browser APIs
 * It ensures that document/window references are only used in the browser
 * and not during server-side rendering
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <>{children}</>
}

/**
 * This function safely accesses the document object
 * Only use it inside useEffect hooks or event handlers
 */
export function safeDocument() {
  if (typeof document !== 'undefined') {
    return document
  }
  return null
}

/**
 * This function safely accesses the window object
 * Only use it inside useEffect hooks or event handlers
 */
export function safeWindow() {
  if (typeof window !== 'undefined') {
    return window
  }
  return null
} 