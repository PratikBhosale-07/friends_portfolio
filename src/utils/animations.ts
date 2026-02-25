// Animation utilities for reusable GSAP animations

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fade in animation with optional direction
 */
export const fadeIn = (
  element: HTMLElement | string,
  options?: {
    duration?: number
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    distance?: number
  }
) => {
  const { duration = 1, delay = 0, direction = 'up', distance = 60 } = options || {}

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return gsap.from(element, {
    ...directionMap[direction],
    opacity: 0,
    duration,
    delay,
    ease: 'power3.out',
  })
}

/**
 * Scroll-triggered fade in
 */
export const scrollFadeIn = (
  element: HTMLElement | string,
  options?: {
    duration?: number
    start?: string
    end?: string
    scrub?: boolean
  }
) => {
  const { duration = 1, start = 'top 80%', end = 'top 20%', scrub = false } = options || {}

  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
    },
  })
}

/**
 * Parallax effect
 */
export const parallax = (
  element: HTMLElement | string,
  options?: {
    speed?: number
    start?: string
    end?: string
  }
) => {
  const { speed = -20, start = 'top bottom', end = 'bottom top' } = options || {}

  return gsap.to(element, {
    yPercent: speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: 1,
    },
  })
}

/**
 * Stagger animation for multiple elements
 */
export const staggerReveal = (
  elements: HTMLElement[] | NodeListOf<Element> | string,
  options?: {
    duration?: number
    stagger?: number
    delay?: number
  }
) => {
  const { duration = 0.8, stagger = 0.1, delay = 0 } = options || {}

  return gsap.from(elements, {
    y: 80,
    opacity: 0,
    duration,
    stagger,
    delay,
    ease: 'power3.out',
  })
}

/**
 * Scale in animation
 */
export const scaleIn = (
  element: HTMLElement | string,
  options?: {
    duration?: number
    delay?: number
    from?: number
  }
) => {
  const { duration = 0.8, delay = 0, from = 0.8 } = options || {}

  return gsap.from(element, {
    scale: from,
    opacity: 0,
    duration,
    delay,
    ease: 'back.out(1.7)',
  })
}

/**
 * Text reveal animation (for split text)
 */
export const textReveal = (
  chars: HTMLElement[] | NodeListOf<Element>,
  options?: {
    duration?: number
    stagger?: number
  }
) => {
  const { duration = 0.8, stagger = 0.03 } = options || {}

  return gsap.from(chars, {
    y: 100,
    opacity: 0,
    rotateX: -90,
    stagger,
    duration,
    ease: 'power3.out',
  })
}

/**
 * Horizontal scroll section
 */
export const horizontalScroll = (
  container: HTMLElement,
  scrollElement: HTMLElement,
  options?: {
    start?: string
    pin?: boolean
  }
) => {
  const { start = 'top top', pin = true } = options || {}
  const scrollWidth = scrollElement.scrollWidth - window.innerWidth

  return gsap.to(scrollElement, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start,
      end: () => `+=${scrollWidth}`,
      scrub: 1,
      pin,
      anticipatePin: 1,
    },
  })
}

/**
 * Pin section
 */
export const pinSection = (
  element: HTMLElement | string,
  options?: {
    start?: string
    end?: string
    pinSpacing?: boolean
  }
) => {
  const { start = 'top top', end = '+=100%', pinSpacing = true } = options || {}

  return ScrollTrigger.create({
    trigger: element,
    start,
    end,
    pin: true,
    pinSpacing,
  })
}

/**
 * Cleanup all ScrollTriggers
 */
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}
