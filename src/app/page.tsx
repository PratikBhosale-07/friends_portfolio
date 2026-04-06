import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Navigation from '@/components/Navigation'
import Cursor from '@/components/Cursor'
import Loading from '@/components/Loading'

// Lazy load sections that aren't immediately visible
const ModelsShowcase = dynamic(() => import('@/components/sections/ModelsShowcase'), {
  loading: () => <div className="h-screen bg-charcoal-950" />,
})
const AnimationShowcase = dynamic(() => import('@/components/sections/AnimationShowcase'), {
  loading: () => <div className="min-h-screen bg-charcoal-900" />,
})
const IllustrationGallery = dynamic(() => import('@/components/sections/IllustrationGallery'), {
  loading: () => <div className="min-h-screen bg-charcoal-900" />,
})
const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="min-h-screen bg-charcoal-900" />,
})

export default function Home() {
  return (
    <>
      <Loading />
      <main className="relative">
        <Cursor />
        <Navigation />
        <Hero />
        <About />
        <ModelsShowcase />
        <AnimationShowcase />
        <IllustrationGallery />
        <Contact />
      </main>
    </>
  )
}
