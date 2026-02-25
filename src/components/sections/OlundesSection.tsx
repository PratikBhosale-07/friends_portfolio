'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function OlundesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const content = contentRef.current

    if (!section || !title || !content) return

    // Pin section for dramatic reveal
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true,
    })

    // Title reveal
    gsap.fromTo(
      title,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Content reveal - ensure it's visible
    gsap.set(content, { opacity: 1 })
    gsap.fromTo(
      content,
      { y: 30 },
      {
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.6,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-charcoal-950 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-beige-400/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-beige-400/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo/Brand Mark */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-block p-8 border-2 border-beige-400 rounded-2xl glow-effect">
              <h3 className="text-4xl md:text-6xl font-display font-bold text-beige-400">
                OLUNDE'S
              </h3>
            </div>
          </motion.div>

          {/* Title */}
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold mb-8 leading-tight"
          >
            Art Auction
            <br />
            <span className="text-beige-400">Marketplace</span>
          </h2>

          {/* Description */}
          <div ref={contentRef} className="space-y-8 relative">
            <p className="text-xl md:text-2xl text-beige-300 leading-relaxed max-w-3xl mx-auto relative z-10">
              As the founder of <strong className="text-beige-100">Olunde's Art Auction Marketplace</strong>,
              I'm bridging the gap between artists and collectors in the digital age,
              creating platforms that celebrate creativity and authenticity.
            </p>

            <p className="text-lg md:text-xl text-beige-300 leading-relaxed max-w-3xl mx-auto relative z-10">
              A premium digital platform connecting collectors with exceptional
              artworks. Where artistic vision meets technological innovation,
              creating a curated marketplace for the discerning art enthusiast.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl md:text-5xl font-display font-bold text-beige-400 mb-2">
                  500+
                </div>
                <div className="text-sm text-beige-300">Artworks</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-display font-bold text-beige-400 mb-2">
                  200+
                </div>
                <div className="text-sm text-beige-300">Artists</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-display font-bold text-beige-400 mb-2">
                  50+
                </div>
                <div className="text-sm text-beige-300">Countries</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://olundes.com" target="_blank" className="btn-primary">
                Visit Marketplace
              </Link>
              <button className="btn-outline">View Case Study</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
