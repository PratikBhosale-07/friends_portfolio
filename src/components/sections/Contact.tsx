'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com', icon: 'IG' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'LI' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'TW' },
]

const contactInfo = [
  { label: 'Email', value: 'rishabbharadwaj850@gmail.com', link: 'mailto:rishabbharadwaj850@gmail.com' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    // Split text animation
    const chars = title.innerText.split('')
    title.innerHTML = chars
      .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')

    const spans = title.querySelectorAll('span')

    gsap.fromTo(
      spans,
      { y: 100, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.02,
        duration: 0.8,
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
      id="contact"
      className="relative min-h-screen flex items-center justify-center bg-charcoal-950 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 204, 187, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="mb-20">
            <h2
              ref={titleRef}
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 leading-none"
              style={{ perspective: '1000px' }}
            >
              Let's Create
            </h2>

            <p className="text-2xl md:text-4xl text-beige-400 font-display font-medium mb-16 max-w-3xl">
              Ready to bring your vision to life? Let's collaborate.
            </p>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="text-sm text-beige-400 mb-2">{info.label}</div>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-2xl md:text-3xl font-display link-underline cursor-hover"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <div className="text-2xl md:text-3xl font-display">
                      {info.value}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <a
                href="mailto:rishabbharadwaj850@gmail.com"
                className="inline-block btn-primary text-lg"
              >
                Start a Conversation
              </a>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="border-t border-beige-400/20 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex flex-wrap gap-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-2 cursor-hover"
                  >
                    <div className="w-10 h-10 border border-beige-400 rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-beige-400 group-hover:text-charcoal-950 transition-all">
                      {social.icon}
                    </div>
                    <span className="text-sm text-beige-300 group-hover:text-beige-100 transition-colors">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>

              <div className="text-sm text-beige-400">
                © {new Date().getFullYear()} Rishab Bharadwaj. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
