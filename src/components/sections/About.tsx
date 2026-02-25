'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const text = textRef.current
    const image = imageRef.current

    if (!section || !title || !text || !image) return

    // Split text for character animation - split by words and chars
    const splitTitle = new SplitType(title, { types: 'words,chars' })

    // Ensure text and image are visible
    gsap.set(text, { opacity: 1 })
    gsap.set(image, { opacity: 1 })

    // Enhanced title reveal animation with scale and rotation
    gsap.fromTo(
      splitTitle.chars,
      { 
        y: 100, 
        opacity: 0,
        scale: 0.5,
        rotationX: -90,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        stagger: 0.02,
        duration: 1,
        ease: 'back.out(1.5)',
        immediateRender: false,
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Add continuous parallax effect on scroll
    gsap.to(splitTitle.words, {
      y: -20,
      ease: 'none',
      stagger: 0.05,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    })

    // Text slide in (opacity already set above)
    gsap.fromTo(
      text,
      { y: 40, opacity: 0.3 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 85%',
        },
      }
    )

    // Image parallax
    gsap.to(image, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    // Background parallax layer
    gsap.to('.about-bg-layer', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative section-padding overflow-hidden bg-charcoal-900"
    >
      {/* Parallax Background Layer */}
      <div className="about-bg-layer absolute inset-0 bg-gradient-to-b from-charcoal-950 to-charcoal-900 opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start min-h-[60vh]">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <h2
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold leading-tight mb-8 overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              <span className="inline-block will-change-transform">Crafting Digital</span>
              <br />
              <span className="text-beige-400 inline-block will-change-transform drop-shadow-[0_0_30px_rgba(212,204,187,0.3)]">Experiences</span>
            </h2>

            <div className="space-y-6">
              <p
                ref={textRef}
                className="text-lg md:text-xl text-beige-300 leading-relaxed max-w-2xl relative z-10"
              >
                At the intersection of art and technology, I create immersive digital
                experiences that push the boundaries of visual storytelling. From 3D
                sculptural forms to dynamic animations, each piece is crafted with
                meticulous attention to detail and a passion for innovation.
              </p>

              <p className="text-lg md:text-xl text-beige-300 leading-relaxed max-w-2xl relative z-10">
                As the founder of <strong className="text-beige-100">Olunde's Art Auction Marketplace</strong>,
                I'm bridging the gap between artists and collectors in the digital age,
                creating platforms that celebrate creativity and authenticity.
              </p>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="relative">
            <div
              ref={imageRef}
              className="aspect-[4/5] bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-2xl overflow-hidden glow-effect relative"
              style={{ opacity: 1 }}
            >
              {/* Profile Picture */}
              <img
                src="/profile/profile.jpg"
                alt="Olunde - Creative Director & Digital Artist"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ opacity: 1 }}
                onError={(e) => {
                  console.error('Image failed to load');
                  (e.target as HTMLImageElement).style.border = '2px solid red';
                }}
              />
              {/* Gradient overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 to-transparent pointer-events-none" />
            </div>

            {/* Floating accent elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-beige-400/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-beige-400/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
