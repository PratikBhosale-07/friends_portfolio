'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

// Your actual illustrations and design work
const galleryItems = [
  // Illustrations
  { id: 1, title: 'Batman Character Design', category: 'Illustration', image: '/images/illustrations/Batman design finishif1.png', width: 400, height: 500 },
  { id: 2, title: 'Cyber Skull Scenery', category: 'Illustration', image: '/images/illustrations/Cyber skull scenery1.png', width: 400, height: 600 },
  { id: 3, title: 'Character Head Design', category: 'Illustration', image: '/images/illustrations/Character designn Head.png', width: 400, height: 550 },
  { id: 4, title: 'Futuristic Marketplace', category: 'Illustration', image: '/images/illustrations/Futuristic marketplace composition1.png', width: 400, height: 450 },
  { id: 5, title: 'Futuristic Indian Street', category: 'Illustration', image: '/images/illustrations/Futuritic indian street.png', width: 400, height: 600 },
  { id: 6, title: 'Street Illustration', category: 'Illustration', image: '/images/illustrations/Street illustrationfinalle2.png', width: 400, height: 450 },
  { id: 7, title: 'Portrait Black Man', category: 'Illustration', image: '/images/illustrations/Portrait black man1.png', width: 400, height: 550 },
  { id: 8, title: 'Face Portrait', category: 'Illustration', image: '/images/illustrations/Face portrait2.png', width: 400, height: 550 },
  { id: 9, title: 'Dreamscape', category: 'Illustration', image: '/images/illustrations/Dreamscape.png', width: 400, height: 500 },
  { id: 10, title: 'Mech Design', category: 'Illustration', image: '/images/illustrations/Mech.png', width: 400, height: 550 },
  { id: 11, title: 'Scene Illustration', category: 'Illustration', image: '/images/illustrations/scene illus.png', width: 400, height: 450 },
  { id: 12, title: 'Orchid Illustration', category: 'Illustration', image: '/images/illustrations/orcgid illustratiob.png', width: 400, height: 500 },
  { id: 13, title: 'Storyboard Page 1', category: 'Illustration', image: '/images/illustrations/page 1 copy.png', width: 400, height: 300 },
  { id: 14, title: 'Storyboard Page 2', category: 'Illustration', image: '/images/illustrations/page 2.png', width: 400, height: 300 },
  { id: 15, title: 'Board Work 1', category: 'Illustration', image: '/images/illustrations/Board work 1.png', width: 400, height: 300 },
  { id: 16, title: 'Board Work 2', category: 'Illustration', image: '/images/illustrations/Boards work 2.png', width: 400, height: 300 },
  { id: 17, title: 'Board Work 3', category: 'Illustration', image: '/images/illustrations/Boards work 3.png', width: 400, height: 300 },
  { id: 18, title: 'Literary Poster', category: 'Illustration', image: '/images/illustrations/literary poster.png', width: 400, height: 550 },
  { id: 19, title: 'Poster Design', category: 'Illustration', image: '/images/illustrations/poster.png', width: 400, height: 550 },
  { id: 20, title: 'Wallpaper Design', category: 'Illustration', image: '/images/illustrations/Wallpapers ahh.png', width: 400, height: 500 },
  
  // Design Work - Commercial
  { id: 21, title: 'Makar Sankranti Campaign', category: 'Design', image: '/images/design/Makar sankranti design.png', width: 400, height: 400 },
  { id: 22, title: 'Menu Design', category: 'Design', image: '/images/design/Single paged menu.png', width: 400, height: 550 },
  { id: 23, title: 'Voucher Design', category: 'Design', image: '/images/design/voucher.png', width: 400, height: 300 },
  
  // Design Work - Personal Projects
  { id: 24, title: 'Aether Audio Packaging', category: 'Design', image: '/images/design/Aether audio box packaging.png', width: 400, height: 500 },
  { id: 25, title: 'Headphones Design', category: 'Design', image: '/images/design/hedfones design.png', width: 400, height: 400 },
  { id: 26, title: 'Packaging Design Study', category: 'Design', image: '/images/design/Packge design vector .png', width: 400, height: 500 },
  { id: 27, title: 'Get It Loud Campaign', category: 'Design', image: '/images/design/get it loud.png', width: 400, height: 450 },
  { id: 28, title: 'Sahara Design', category: 'Design', image: '/images/design/Sahara.png', width: 400, height: 500 },
  { id: 29, title: 'Shadow Design', category: 'Design', image: '/images/design/Shadow.png', width: 400, height: 500 },
  { id: 30, title: 'Farewell Invitation', category: 'Design', image: '/images/design/Farewell inv.png', width: 400, height: 450 },
]

function GalleryItem({ item, index }: { item: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="masonry-item relative group cursor-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl bg-charcoal-900">
        {/* Actual image */}
        <div
          className="w-full relative"
          style={{
            aspectRatio: `${item.width}/${item.height}`,
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6"
        >
          <h3 className="text-xl font-display font-semibold mb-2 text-center">
            {item.title}
          </h3>
          <span className="text-sm text-beige-400 mb-4">{item.category}</span>
          <button className="px-6 py-2 border border-beige-400 rounded-full text-sm hover:bg-beige-400 hover:text-charcoal-950 transition-all">
            View Details
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function IllustrationGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [filter, setFilter] = useState<'All' | 'Illustration' | 'Design'>('All')

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    gsap.fromTo(
      title,
      { y: 80, opacity: 0 },
      {
        y: 0,
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

  const filteredItems =
    filter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter)

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-padding bg-charcoal-900 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-display font-semibold mb-8"
          >
            Selected
            <br />
            <span className="text-beige-400">Works</span>
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4">
            {['All', 'Illustration', 'Design'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === category
                    ? 'bg-beige-400 text-charcoal-950'
                    : 'border border-beige-400 text-beige-400 hover:bg-beige-400/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {filteredItems.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
