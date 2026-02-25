// Type definitions for 3D models and gallery items

export interface Model3D {
  id: string
  title: string
  description: string
  modelPath: string
  thumbnail?: string
  year: string
  category?: string
  tags?: string[]
}

export interface Animation {
  id: string
  title: string
  description: string
  videoPath?: string
  thumbnail: string
  duration?: string
  type: 'video' | 'interactive' | 'gif'
  year?: string
}

export interface GalleryItem {
  id: string
  title: string
  description?: string
  imagePath: string
  category: 'Illustration' | 'Design' | 'Photography'
  width: number
  height: number
  tags?: string[]
  year?: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface ContactInfo {
  label: string
  value: string
  link?: string
}

export interface NavItem {
  name: string
  href: string
}

// GSAP animation options
export interface AnimationOptions {
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
}

export interface ScrollTriggerOptions {
  trigger?: HTMLElement | string
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
}

// Theme types
export type Theme = 'dark' | 'light'

// Viewport sizes
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
