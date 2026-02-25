'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

// Your 3D models and renders
const models = [
  {
    id: 1,
    title: 'Boji Character Design',
    description: '3D character modeling and rendering',
    year: '2025',
    images: ['/models/boji front re.png', '/models/boji side.png', '/models/boji side two.png'],
  },
  {
    id: 2,
    title: 'Headphone Product Render',
    description: 'Professional product visualization',
    year: '2025',
    images: ['/models/Re_ Hedfone front .png', '/models/Re_ Hedfone back .png'],
  },
  {
    id: 3,
    title: 'Environmental Design',
    description: '3D environment and scene composition',
    year: '2024',
    images: ['/models/environment.png'],
  },
  {
    id: 4,
    title: 'Asset Collection',
    description: '3D asset creation and design',
    year: '2024',
    images: ['/models/Asset 1.png', '/models/Asset 2.png', '/models/Asset 3.png'],
  },
  {
    id: 5,
    title: 'God Particle Animation',
    description: 'Particle system and VFX',
    year: '2024',
    images: ['/models/God particle.mp4'],
  },
]

function ModelPreview({ index }: { index: number }) {
  const groupRef = useRef<THREE.Group>(null)

  // Different geometry for each model preview
  const geometries = [
    <boxGeometry args={[1.5, 1.5, 1.5]} />,
    <sphereGeometry args={[1, 32, 32]} />,
    <torusGeometry args={[0.8, 0.4, 16, 100]} />,
    <octahedronGeometry args={[1.2]} />,
  ]

  return (
    <group ref={groupRef}>
      <mesh>
        {geometries[index % 4]}
        <meshStandardMaterial
          color="#d4ccbb"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

export default function ModelsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [selectedModel, setSelectedModel] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const scrollContainer = scrollContainerRef.current

    if (!section || !scrollContainer) return

    // Horizontal scroll animation
    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth

    gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="models"
      className="relative h-screen overflow-hidden bg-charcoal-950"
    >
      <div className="absolute top-12 left-6 md:left-12 z-20">
        <h2 className="text-4xl md:text-6xl font-display font-semibold mb-4">
          3D Models
        </h2>
        <p className="text-beige-300 text-lg">Scroll to explore →</p>
      </div>

      <div
        ref={scrollContainerRef}
        className="absolute top-0 left-0 h-full flex items-center gap-8 px-6 md:px-12"
        style={{ width: 'max-content' }}
      >
        {models.map((model, index) => (
          <div
            key={model.id}
            className="flex-shrink-0 w-[80vw] md:w-[50vw] h-[70vh] cursor-hover"
            onMouseEnter={() => setSelectedModel(index)}
          >
            <div className="relative h-full bg-charcoal-900 rounded-2xl overflow-hidden glow-effect">
              {/* Model render display */}
              <div className="absolute inset-0">
                {model.images && model.images[0] && (
                  model.images[0].endsWith('.mp4') ? (
                    <video
                      src={model.images[0]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={model.images[0]}
                      alt={model.title}
                      fill
                      sizes="(max-width: 768px) 80vw, 50vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  )
                )}
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 gradient-overlay">
                <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2">
                  {model.title}
                </h3>
                <p className="text-beige-300 mb-1">{model.description}</p>
                <p className="text-sm text-beige-400">{model.year}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Spacer for scroll */}
        <div className="flex-shrink-0 w-12" />
      </div>
    </section>
  )
}
