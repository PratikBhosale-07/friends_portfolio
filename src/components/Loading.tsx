'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-charcoal-950 flex flex-col items-center justify-center"
    >
      {/* Logo or Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold text-beige-400">
          PORTFOLIO
        </h1>
        <p className="text-beige-300 mt-2 text-sm tracking-widest">
          CREATIVE SHOWCASE
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-charcoal-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-beige-400 to-beige-300"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Progress Percentage */}
      <motion.p
        className="mt-4 text-beige-400 text-sm font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {Math.round(progress)}%
      </motion.p>
    </motion.div>
  )
}
