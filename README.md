# Olunde's Portfolio - Premium Creative Portfolio Website

A premium, immersive, animation-rich portfolio website built with Next.js, GSAP, and Three.js. This is an Awwwards-level creative experience showcasing 3D models, animations, and design work.

![Portfolio Preview](./preview.png)

## ✨ Features

- 🎨 **Immersive 3D Integration** - Three.js powered 3D model showcase
- 🎬 **Advanced GSAP Animations** - Scroll-triggered, parallax effects
- 🖼️ **Masonry Gallery** - Responsive illustration and design gallery
- 🎯 **Horizontal Scroll** - GSAP-powered horizontal scroll sections
- 🎭 **Custom Cursor** - Interactive custom cursor with hover effects
- 📱 **Fully Responsive** - Mobile-first design approach
- ⚡ **High Performance** - Optimized for 60fps animations
- 🎪 **Smooth Scrolling** - Lenis smooth scroll integration
- 🌗 **Dark Theme** - Premium dark color scheme
- 🔍 **SEO Optimized** - Meta tags and semantic HTML

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (ScrollTrigger, ScrollSmoother)
- **3D Rendering**: Three.js, React Three Fiber, Drei
- **Smooth Scroll**: Lenis
- **Additional**: Framer Motion, Split Type

## 📦 Installation

1. **Clone or navigate to the project directory**:

```bash
cd portfolio-website
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**:

```bash
npm run dev
```

4. **Open your browser** and navigate to:

```
http://localhost:3000
```

## 🎨 Project Structure

```
portfolio-website/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and custom CSS
│   │   ├── layout.tsx           # Root layout with providers
│   │   └── page.tsx             # Main page component
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx         # Hero with 3D model
│   │   │   ├── About.tsx        # About with parallax
│   │   │   ├── ModelsShowcase.tsx    # Horizontal scroll 3D showcase
│   │   │   ├── AnimationShowcase.tsx # Animation gallery
│   │   │   ├── IllustrationGallery.tsx # Masonry gallery
│   │   │   ├── OlundesSection.tsx    # Brand showcase
│   │   │   └── Contact.tsx      # Contact section
│   │   ├── SmoothScrollProvider.tsx  # Lenis integration
│   │   ├── Navigation.tsx       # Header navigation
│   │   └── Cursor.tsx           # Custom cursor
│   ├── utils/
│   │   ├── animations.ts        # Reusable GSAP animations
│   │   └── performance.ts       # Performance utilities
│   └── types/
│       └── index.ts             # TypeScript definitions
├── public/
│   └── models/                  # 3D models (GLTF/GLB)
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## 🎬 Animation Architecture

### GSAP ScrollTrigger

All scroll-based animations use GSAP ScrollTrigger:

- **Hero**: Parallax and fade animations
- **About**: Character-by-character text reveals
- **Models**: Horizontal scroll with pinning
- **Gallery**: Staggered masonry reveals

### Performance Optimizations

- GPU acceleration for transforms
- `will-change` for animated properties
- Lazy loading for images and models
- Debounced resize listeners
- RequestAnimationFrame for smooth updates

## 🎨 Customization Guide

### 1. Adding Your 3D Models

Replace placeholder geometry in `ModelsShowcase.tsx`:

```tsx
import { useGLTF } from "@react-three/drei";

function YourModel() {
  const { scene } = useGLTF("/models/your-model.glb");
  return <primitive object={scene} />;
}
```

Place your GLTF/GLB files in `public/models/`

### 2. Updating Content

Edit the data arrays in each section component:

**Models**: `src/components/sections/ModelsShowcase.tsx`

```tsx
const models = [
  { id: 1, title: "Your Model", description: "...", year: "2025" },
];
```

**Gallery**: `src/components/sections/IllustrationGallery.tsx`

```tsx
const galleryItems = [
  { id: 1, title: 'Your Work', category: 'Design', ... }
]
```

### 3. Color Scheme

Colors are defined in `tailwind.config.ts`:

```ts
colors: {
  charcoal: { /* dark shades */ },
  beige: { /* accent color */ }
}
```

### 4. Typography

Fonts are loaded in `src/app/layout.tsx`:

- Display: Clash Display
- Body: Inter

Change in the `<head>` section or replace with your fonts.

## 📱 Responsive Behavior

- **Mobile**: Single column, simplified animations
- **Tablet**: 2-column gallery, reduced parallax
- **Desktop**: Full experience with all effects

Breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## ⚡ Performance Tips

1. **Optimize 3D Models**:
   - Use Draco compression for GLTF files
   - Keep polygon count under 50k
   - Use texture atlases

2. **Image Optimization**:
   - Use Next.js Image component
   - Provide WebP/AVIF formats
   - Set proper width/height

3. **Animation Performance**:
   - Limit simultaneous animations
   - Use `transform` and `opacity` only
   - Avoid animating `width`, `height`, `top`, `left`

4. **Lighthouse Score**:
   ```bash
   npm run build
   npm run start
   # Run Lighthouse audit
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy with zero configuration

```bash
npm install -g vercel
vercel
```

### Netlify

1. Build the project:

```bash
npm run build
```

2. Deploy `out` directory to Netlify

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🎯 Future Enhancements

- [ ] CMS Integration (Sanity/Contentful)
- [ ] Blog/Writing section
- [ ] Case study pages
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Advanced 3D interactions
- [ ] WebGL shaders and effects
- [ ] Analytics integration

## 📄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note**: 3D features require WebGL support

## 🐛 Troubleshooting

### Build Errors

If you encounter TypeScript errors:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### GSAP ScrollTrigger Issues

Ensure cleanup in useEffect:

```tsx
useEffect(() => {
  // animations...
  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);
```

### 3D Performance Issues

Reduce model complexity or add LOD (Level of Detail):

```tsx
<Lod distances={[0, 10, 20]}>
  <mesh geometry={high} />
  <mesh geometry={medium} />
  <mesh geometry={low} />
</Lod>
```

## 📚 Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [Three.js Journey](https://threejs-journey.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Next.js Documentation](https://nextjs.org/docs)
- [Awwwards](https://www.awwwards.com/)

## 📝 License

This project is for portfolio use. Feel free to customize for your own work.

## 🙏 Credits

- **Design & Development**: Olunde
- **Fonts**: Clash Display (Indian Type Foundry), Inter (Rasmus Andersson)
- **3D Models**: Created in Blender

---

Built with ❤️ by Olunde - Creative Director & Digital Artist
