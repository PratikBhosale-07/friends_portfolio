'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'

gsap.registerPlugin(ScrollTrigger)

// Your actual animations
const animations = [
  {
    id: 1,
    title: 'Boxing Animation',
    description: '3D character animation - Combat sequence',
    thumbnail: '/animations/Boxing animation.mp4',
    type: 'video' as const,
  },
  {
    id: 2,
    title: 'Nach Basanti Nach',
    description: 'Dance animation sequence',
    thumbnail: '/animations/Nach Basanti Nach.mp4',
    type: 'video' as const,
  },
  {
    id: 3,
    title: 'Parkour',
    description: 'Dynamic movement animation',
    thumbnail: '/animations/Parkour.mp4',
    type: 'video' as const,
  },
  {
    id: 4,
    title: 'Water Dynamics',
    description: 'Fluid simulation and water effects',
    thumbnail: '/animations/Water Droplet.mp4',
    type: 'video' as const,
  },
  {
    id: 5,
    title: 'Swing Animation',
    description: 'Character movement study',
    thumbnail: '/animations/swing-final-1.gif',
    type: 'video' as const,
  },
  {
    id: 6,
    title: 'Waterflow',
    description: 'Advanced fluid animation',
    thumbnail: '/animations/Waterflow animation.mp4',
    type: 'video' as const,
  },
]

function AnimationCard({ animation, index }: { animation: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    } else if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [inView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group cursor-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video bg-charcoal-900 rounded-xl overflow-hidden relative">
        {/* Actual animation video */}
        <video
          ref={videoRef}
          src={animation.thumbnail}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          preload="metadata"
        />

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center"
        >
          <button className="btn-outline">View Full</button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="text-xl font-display font-semibold mb-2">
          {animation.title}
        </h3>
        <p className="text-beige-300">{animation.description}</p>
      </div>
    </motion.div>
  )
}

export default function AnimationShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    gsap.fromTo(
      title,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="animations"
      className="section-padding bg-charcoal-950 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-display font-semibold mb-16"
        >
          Animation
          <br />
          <span className="text-beige-400">Showcase</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {animations.map((animation, index) => (
            <AnimationCard
              key={animation.id}
              animation={animation}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
