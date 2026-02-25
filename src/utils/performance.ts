// Performance utilities for optimizing animations and loading

/**
 * Preload images
 */
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  const promises = imageUrls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.src = url
      img.onload = () => resolve()
      img.onerror = reject
    })
  })

  return Promise.all(promises)
}

/**
 * Lazy load component
 */
export const lazyLoadComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  return React.lazy(importFunc)
}

/**
 * Debounce function for resize listeners
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for scroll listeners
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Request idle callback with fallback
 */
export const requestIdleCallback =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (cb: IdleRequestCallback) => setTimeout(cb, 1)

/**
 * Cancel idle callback with fallback
 */
export const cancelIdleCallback =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? window.cancelIdleCallback
    : (id: number) => clearTimeout(id)

/**
 * Get optimized image URL
 */
export const getOptimizedImageUrl = (
  url: string,
  options?: {
    width?: number
    quality?: number
    format?: 'webp' | 'avif' | 'jpeg'
  }
): string => {
  // Implement your image optimization logic
  // This is a placeholder for CDN or Next.js image optimization
  return url
}

/**
 * Reduce motion check for accessibility
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * GPU acceleration helper
 */
export const enableGPUAcceleration = (element: HTMLElement) => {
  element.style.transform = 'translateZ(0)'
  element.style.willChange = 'transform'
}

/**
 * Remove GPU acceleration
 */
export const disableGPUAcceleration = (element: HTMLElement) => {
  element.style.transform = ''
  element.style.willChange = 'auto'
}

import React from 'react'
