# SmartCampAI Design System - Quick Implementation Guide

**Fast reference for implementing the SmartCampAI branding in new projects**

---

## 🚀 5-Minute Setup

### 1. Copy Assets (1 minute)

```bash
cp -r SmartCampAI-Branding-Kit/assets/* your-project/public/
```

### 2. Install Font (1 minute)

**Next.js:**
```javascript
import { Jost } from "next/font/google";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// In layout/app
<body className={`${jost.variable} font-jost`}>
```

**HTML:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### 3. Set Up CSS (2 minutes)

Add to your `globals.css`:

```css
:root {
  --background: transparent;
  --foreground: #ffffff;
  --card: rgba(255, 255, 255, 0.15);
  --border: rgba(255, 255, 255, 0.2);
  --input: rgba(255, 255, 255, 0.1);
  --primary: #ffffff;
  --accent: #10b981;
  --radius: 0.5rem;
}

body {
  background-image: url('/jungle background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
  color: white;
}
```

### 4. Add Metadata (1 minute)

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon.png">

<meta property="og:image" content="/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

---

## 🎨 Component Quick Reference

### Glass Card

```jsx
<div className="rounded-lg border border-white/20 bg-white/15 backdrop-blur shadow-sm p-6">
  <h3 className="text-xl font-semibold text-white mb-2">Card Title</h3>
  <p className="text-white/80">Card content goes here</p>
</div>
```

**CSS:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 1.5rem;
}
```

### Buttons

**Default (White):**
```jsx
<button className="bg-white text-[#1f4d2f] px-4 py-2 rounded-md font-medium hover:bg-white/90 transition">
  Click Me
</button>
```

**Jungle Button:**
```jsx
<button className="relative px-4 py-2 rounded-md font-semibold text-white border border-white/30 hover:opacity-90 transition" 
  style={{
    backgroundImage: "url('/jungle background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}>
  <span className="absolute inset-0 bg-black/40 rounded-md -z-10"></span>
  <span className="relative z-10">Jungle Button</span>
</button>
```

**Emerald Button:**
```jsx
<button className="bg-emerald-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-emerald-600 transition">
  Action Button
</button>
```

### Input Field

```jsx
<input 
  type="text"
  placeholder="Enter text..."
  className="w-full h-10 px-3 rounded-md border border-white/20 bg-white/10 backdrop-blur text-white placeholder:text-white/70 focus:border-white/50 focus:outline-none transition"
/>
```

### Slider with Banana Emoji

```jsx
<div className="relative w-full">
  <input 
    type="range"
    min="0"
    max="100"
    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
  />
  <span className="absolute text-lg pointer-events-none" style={{left: `${value}%`, top: '-4px', transform: 'translateX(-50%)'}}>
    🍌
  </span>
</div>
```

---

## 🎯 Color Palette Cheat Sheet

### Primary Colors
```css
/* Text Colors */
--white: #ffffff;                    /* Primary text */
--white-80: rgba(255, 255, 255, 0.8);  /* Body text */
--white-70: rgba(255, 255, 255, 0.7);  /* Secondary text */

/* Accent */
--emerald: #10b981;                  /* Highlights, accents */
--forest: #1f4d2f;                   /* Text on white buttons */

/* Backgrounds */
--glass-card: rgba(255, 255, 255, 0.15);    /* Cards */
--glass-input: rgba(255, 255, 255, 0.1);    /* Inputs */
--glass-border: rgba(255, 255, 255, 0.2);   /* Borders */

/* Overlays */
--overlay-dark: rgba(0, 0, 0, 0.3);   /* Header/footer */
--overlay-darker: rgba(0, 0, 0, 0.4); /* Buttons */
```

### Tailwind Classes
```jsx
// Text
text-white                 // Pure white
text-white/80             // Body text
text-white/70             // Muted text
text-emerald-500          // Accent text

// Backgrounds
bg-white/15               // Card background
bg-white/10               // Input background
bg-black/30               // Dark overlay

// Borders
border-white/20           // Standard border
border-white/30           // Emphasized border
```

---

## 📐 Spacing & Layout

### Container
```jsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
  {/* Content */}
</div>
```

### Grid Layout
```jsx
// 3-column responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### Common Spacing
- **Padding:** `p-4` (16px), `p-6` (24px), `p-8` (32px)
- **Margin:** `mt-4` (16px), `mt-6` (24px), `mt-8` (32px)
- **Gap:** `gap-4` (16px), `gap-6` (24px), `gap-8` (32px)

---

## 🔤 Typography Quick Reference

### Headings
```jsx
<h1 className="text-4xl font-bold text-white">Hero Title</h1>
<h2 className="text-3xl font-semibold text-white">Section Title</h2>
<h3 className="text-2xl font-semibold text-white">Card Title</h3>
<h4 className="text-xl font-semibold text-white">Subsection</h4>
```

### Body Text
```jsx
<p className="text-base text-white/80">Standard body text</p>
<p className="text-sm text-white/70">Small text</p>
<p className="text-xs text-white/60">Caption text</p>
```

### Font Weights
```css
font-light      /* 300 */
font-normal     /* 400 */
font-medium     /* 500 */
font-semibold   /* 600 */
font-bold       /* 700 */
```

---

## 📱 Responsive Breakpoints

```css
/* Tailwind Breakpoints */
sm:   /* @media (min-width: 640px) */
md:   /* @media (min-width: 768px) */
lg:   /* @media (min-width: 1024px) */
xl:   /* @media (min-width: 1280px) */
2xl:  /* @media (min-width: 1536px) */
```

### Responsive Example
```jsx
<div className="text-2xl sm:text-3xl lg:text-4xl">
  Responsive heading
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

---

## ✨ Effects & Transitions

### Hover Effects
```jsx
// Scale on hover
<div className="hover:scale-105 transition-transform duration-300">
  
// Opacity on hover
<div className="hover:opacity-90 transition-opacity duration-200">

// Color on hover
<a className="text-white hover:text-emerald-500 transition-colors">
```

### Focus States
```jsx
<button className="focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2">
  Button with focus ring
</button>
```

### Loading Spinner
```jsx
<div className="animate-spin rounded-full h-8 w-8 border-2 border-white/30 border-t-white"></div>
```

---

## 🎭 Common Patterns

### Header Pattern
```jsx
<header className="sticky top-0 z-50 border-b border-white/20"
  style={{
    backgroundImage: "url('/jungle background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}>
  <div className="bg-black/30 backdrop-blur-sm">
    <div className="container mx-auto px-4 py-4">
      <img src="/SmartCampAIpng.png" alt="SmartCamp AI" className="h-12" />
    </div>
  </div>
</header>
```

### Footer Pattern
```jsx
<footer className="border-t border-white/20 mt-auto"
  style={{
    backgroundImage: "url('/jungle background.png')",
    backgroundSize: "cover"
  }}>
  <div className="bg-black/30 backdrop-blur-sm">
    <div className="container mx-auto px-4 py-8">
      <img src="/Monkey_SmartCampAI-no-background.png" alt="Mascot" className="h-32" />
      <p className="text-white/70 text-sm">&copy; 2025 SmartCamp AI</p>
    </div>
  </div>
</footer>
```

### Form Pattern
```jsx
<form className="space-y-6">
  <div className="space-y-2">
    <label className="text-sm font-medium text-white">Email</label>
    <input 
      type="email"
      className="w-full h-10 px-3 rounded-md border border-white/20 bg-white/10 backdrop-blur text-white placeholder:text-white/70"
      placeholder="you@example.com"
    />
  </div>
  
  <button className="w-full bg-emerald-500 text-white py-2 rounded-md font-semibold hover:bg-emerald-600 transition">
    Submit
  </button>
</form>
```

---

## 🚨 Common Mistakes to Avoid

### ❌ DON'T
```jsx
// Wrong: No glass effect
<div className="bg-gray-800 p-4">

// Wrong: System font
<body style="font-family: Arial">

// Wrong: Dark text
<p className="text-gray-900">

// Wrong: No transparency
<div className="bg-white">

// Wrong: Overusing emerald
<div className="bg-emerald-500 text-emerald-300">
```

### ✅ DO
```jsx
// Right: Glass morphism
<div className="bg-white/15 backdrop-blur border border-white/20 p-4">

// Right: Jost font
<body className="font-jost">

// Right: White text
<p className="text-white/80">

// Right: Transparent with blur
<div className="bg-white/15 backdrop-blur">

// Right: Emerald as accent only
<span className="text-emerald-500">Accent</span>
```

---

## ⚡ Performance Tips

```jsx
// 1. Optimize jungle background
// Convert to WebP: jungle-background.webp

// 2. Use Next.js Image
import Image from 'next/image'
<Image src="/SmartCampAIpng.png" alt="Logo" width={200} height={100} priority />

// 3. Lazy load below-fold images
<img loading="lazy" src="/mascot.png" alt="Mascot" />

// 4. Subset fonts
const jost = Jost({ subsets: ["latin"] })

// 5. Use CSS transforms (GPU accelerated)
<div className="transform hover:scale-105">
```

---

## 📋 Pre-Launch Checklist

Quick verification before going live:

- [ ] Jost font loads correctly
- [ ] Jungle background displays (fixed attachment)
- [ ] All cards have glass morphism effect
- [ ] Text is white or white/opacity
- [ ] Emerald used only for accents
- [ ] Logo in header (responsive sizing)
- [ ] Mascot in footer
- [ ] All favicons working
- [ ] OG image configured
- [ ] Mobile responsive (test on device)
- [ ] Hover states working
- [ ] Focus states visible
- [ ] Loading states implemented

---

## 📚 Full Documentation

For complete specifications, see:
- **SmartCampAI_branding.md** - Complete 95-page guide
- **README.md** - Setup instructions
- **ASSET_INVENTORY.md** - All assets with specs

---

## 🆘 Quick Help

**Issue:** Text not readable
**Fix:** Ensure white text (`text-white` or `text-white/80`) on transparent backgrounds

**Issue:** Background not fixed
**Fix:** Add `background-attachment: fixed` to body

**Issue:** Glass effect not working
**Fix:** Add `backdrop-filter: blur(10px)` with `-webkit-` prefix for Safari

**Issue:** Font not loading
**Fix:** Check Google Fonts link or Next.js font import

**Issue:** Images not showing
**Fix:** Verify files are in `/public/` directory and paths start with `/`

---

*SmartCampAI • Quick Implementation Guide • Version 1.0*

