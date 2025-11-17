# AI Agents Studio - Branding Implementation

**Design System:** SmartCampAI "Jungle Tech" Aesthetic
**Last Updated:** 2025-11-17

---

## Overview

AI Agents Studio implements the complete SmartCampAI branding guide, creating a unique "Jungle Tech" aesthetic that merges natural jungle imagery with modern glass morphism UI design.

---

## Core Branding Elements

### 1. Typography

**Font:** Jost (Google Fonts)

**Implementation:**
```typescript
// app/layout.tsx
import { Jost } from 'next/font/google'

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})
```

**Usage:**
- All text uses Jost font family
- Font weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Applied via Tailwind utility: `font-jost`

### 2. Color System

**Primary Colors:**
- **White:** `#ffffff` - Primary text, buttons
- **Emerald-500:** `#10b981` - Accent color (use sparingly)
- **Forest Green:** `#1f4d2f` - Text on white buttons

**Implementation:**
```css
/* app/globals.css */
:root {
  --foreground: #ffffff;
  --primary: #ffffff;
  --primary-foreground: #1f4d2f;
  --emerald-500: #10b981;
  --forest-green: #1f4d2f;
}
```

**Text Opacity Scale:**
- Primary text: `text-white` (100%)
- Secondary text: `text-white/80` (80%)
- Muted text: `text-white/70` (70%)
- Subtle text: `text-white/60` (60%)

### 3. Jungle Background

**Image:** `/public/jungle background.png`

**Implementation:**
```css
/* app/globals.css */
body {
  background-image: url('/jungle background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;  /* Parallax effect */
}
```

**Effect:** Fixed attachment creates subtle parallax as users scroll.

### 4. Glass Morphism

**Standard Glass Card:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
}
```

**Variants:**
- **Subtle:** `glass-card-subtle` - 10% opacity, 5px blur
- **Standard:** `glass-card` - 15% opacity, 10px blur
- **Enhanced:** `glass-card-enhanced` - 20% opacity, 12px blur

---

## Component Styling

### Button Variants

#### 1. Default Button (White)
```tsx
<Button variant="default">Click Me</Button>
```
- White background (`#ffffff`)
- Forest green text (`#1f4d2f`)
- Hover: 90% opacity

#### 2. Jungle Button
```tsx
<Button variant="jungle">Click Me</Button>
```
- Jungle background image
- Dark overlay (40% black)
- White text with 600 weight

#### 3. Outline Button
```tsx
<Button variant="outline">Click Me</Button>
```
- Transparent background
- White border (30% opacity)
- White text

#### 4. Emerald Button
```tsx
<Button variant="emerald">Click Me</Button>
```
- Emerald-500 background (`#10b981`)
- White text
- Box shadow with emerald tint

### Card Component

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

**Styling:**
- Glass morphism effect
- White/20 border
- Drop shadow for depth

### Input Component

```tsx
<Input placeholder="Enter text..." />
```

**Styling:**
- White/10 background
- White/20 border
- White text, white/70 placeholder
- Focus: white/50 border (2px)

---

## Layout Implementation

### Header

```tsx
<header className="jungle-overlay">
  <div className="container-custom py-6">
    {/* Logo + Navigation */}
  </div>
</header>
```

**Jungle Overlay:**
- Jungle background image
- 30% black overlay
- 2px backdrop blur

### Footer

**Required Elements:**
1. **Monkey Mascot** (left): `/public/Monkey_SmartCampAI-no-background.png`
2. **n8n Badge** (left): `/public/n8n-certified-creator.png`
3. **Copyright** (center): "© Created with ❤️ by SmartCamp.AI"
4. **Links** (right): Documentation, API, About Us

```tsx
<footer className="jungle-overlay">
  <div className="container-custom py-12">
    <div className="flex items-center justify-between">
      {/* Mascots */}
      {/* Copyright */}
      {/* Links */}
    </div>
  </div>
</footer>
```

---

## Asset Implementation

### Logo

**File:** `/public/SmartCampAIpng.png`

**Responsive Sizes:**
- Mobile: `h-12` (48px)
- Tablet: `h-14` (56px)
- Desktop: `h-16` (64px)

```tsx
<Image
  src="/SmartCampAIpng.png"
  alt="SmartCamp AI"
  className="h-12 w-auto sm:h-14 md:h-16"
  priority
/>
```

### Favicons

All favicons implemented in `app/layout.tsx` metadata:
- `favicon.ico` (legacy)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon.png` (48x48)
- `apple-touch-icon.png` (192x192)

### Open Graph Image

**File:** `/public/og-image.png` (1200×630px)

Configured in `app/layout.tsx` for social media sharing.

---

## Tailwind Configuration

**Key Additions:**

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      emerald: {
        500: '#10b981',
        600: '#059669',
      },
      forest: {
        green: '#1f4d2f',
      },
    },
    fontFamily: {
      jost: ['var(--font-jost)', 'sans-serif'],
    },
  },
}
```

---

## Utility Classes

**Glass Morphism:**
```html
<div class="glass-card">...</div>
<div class="glass-card-subtle">...</div>
<div class="glass-card-enhanced">...</div>
```

**Jungle Overlay:**
```html
<div class="jungle-overlay">...</div>
```

**Text Shadow (for readability):**
```html
<h1 class="text-shadow-lg">Heading</h1>
```

**Hover Effects:**
```html
<div class="hover-lift">Lifts on hover</div>
<div class="hover-scale">Scales on hover</div>
<span class="hover-emerald">Changes to emerald</span>
```

---

## Animations

**Entrance Animations:**
```html
<div class="animate-fade-in">Fades in</div>
<div class="animate-slide-in-left">Slides from left</div>
<div class="animate-scale-in">Scales in</div>
```

**Loading:**
```html
<div class="skeleton">Loading skeleton</div>
<Spinner size="md" />
<Loading text="Loading..." />
```

---

## Responsive Design

**Breakpoints:** (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-First Approach:**
```tsx
// Base styles target mobile
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

---

## Accessibility

**Focus States:**
All interactive elements have visible focus rings:
```css
.focus-ring {
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-white/50
  focus-visible:ring-offset-2
}
```

**Color Contrast:**
- White text on glass morphism backgrounds meets WCAG AA
- Text shadows enhance readability over busy jungle background

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Brand Consistency Checklist

- [x] Jost font loaded from Google Fonts
- [x] Jungle background fixed to body
- [x] Glass morphism applied to all cards
- [x] White text with appropriate opacity
- [x] Emerald green used only for accents
- [x] Forest green on white buttons
- [x] SmartCampAI logo in header
- [x] Monkey mascot in footer
- [x] n8n Certified Creator badge in footer
- [x] Copyright footer: "© Created with ❤️ by SmartCamp.AI"
- [x] All favicons configured
- [x] Open Graph image set
- [x] Responsive sizing implemented
- [x] Hover effects on interactive elements
- [x] Focus states accessible

---

## Future Enhancements

- [ ] Banana emoji slider (🍌) - requires custom Slider component
- [ ] Advanced animations for page transitions
- [ ] Dark mode variant (optional)
- [ ] Additional button variants as needed
- [ ] Custom form components (RadioGroup, Checkbox, Select)

---

**Reference:** See `branding/SmartCampAI_branding.md` for complete 95-page branding guide.

**Status:** ✅ Core branding fully implemented
