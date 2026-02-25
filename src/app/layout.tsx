import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export const metadata: Metadata = {
  title: "Rishab Bharadwaj Portfolio",
  description: "Immersive portfolio showcasing 3D art, animations, and digital design",
  keywords: ["3D artist", "digital art", "creative director", "portfolio", "animation", "design"],
  authors: [{ name: "Rishab Bharadwaj" }],
  openGraph: {
    title: "Rishab Bharadwaj Portfolio",
    description: "Creative Director & Digital Artist",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,500,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-texture">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
