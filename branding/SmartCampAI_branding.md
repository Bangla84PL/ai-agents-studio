# SmartCampAI Branding & Design System
## Complete Visual Identity Guide for Claude Code

**Version:** 1.0  
**Last Updated:** November 2025  
**Purpose:** Comprehensive branding guide for implementing SmartCampAI applications with perfect visual fidelity

---

## 📋 Table of Contents

1. [Brand Identity & Philosophy](#brand-identity--philosophy)
2. [Visual Language](#visual-language)
3. [Typography System](#typography-system)
4. [Color Palette & System](#color-palette--system)
5. [Logo & Brand Assets](#logo--brand-assets)
6. [Background & Visual Effects](#background--visual-effects)
7. [Component Styling](#component-styling)
8. [Layout & Spacing](#layout--spacing)
9. [Interactive Elements](#interactive-elements)
10. [Responsive Design](#responsive-design)
11. [Brand Personality & Voice](#brand-personality--voice)
12. [Implementation Checklist](#implementation-checklist)

---

## 🎯 Brand Identity & Philosophy

### Core Brand Statement
**SmartCampAI** is where **AI, Automations, and Web Development** converge in the digital jungle. We empower individuals and businesses to become the future through cutting-edge technology solutions delivered with organic warmth and professional excellence.

### Tagline
> **"You are the Future!"**

This isn't just a slogan—it's a promise. SmartCampAI empowers users to take control of their technological destiny.

### Brand Personality Traits

1. **Innovative & Forward-Thinking**
   - Embrace cutting-edge AI and automation technologies
   - Always looking ahead to next-generation solutions
   - Pioneer in the intersection of nature and technology

2. **Professional Yet Approachable**
   - Technical expertise delivered with warmth
   - Complex technology made accessible
   - Friendly guidance without condescension

3. **Organic & Natural**
   - "Jungle Tech" aesthetic reflects growth and natural evolution
   - Technology that feels alive and breathing
   - Balance between digital precision and organic flow

4. **Trustworthy & Reliable**
   - n8n Certified Creator status showcases expertise
   - Transparent processes and clear communication
   - Proven track record and professional credentials

5. **Playful & Creative**
   - Banana emoji sliders and monkey mascot add charm
   - Serious about work, not about ourselves
   - Technology can be powerful AND fun

---

## 🎨 Visual Language

### Design Philosophy: "Jungle Tech"

SmartCampAI's visual identity merges two seemingly opposite worlds:

- **The Jungle:** Natural, organic, lush, alive, growing
- **Technology:** Precise, digital, modern, efficient, powerful

This creates a unique aesthetic where:
- Lush jungle backgrounds meet glass morphism UI elements
- Organic imagery supports cutting-edge functionality
- Natural warmth balances digital precision
- Growth metaphors reflect technological advancement

### Key Visual Principles

#### 1. Glass Morphism
All UI elements use translucent, blurred backgrounds that float above the jungle backdrop, creating a sense of depth and modernity.

```css
/* Core Glass Effect */
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 0.5rem;
```

#### 2. High Contrast for Readability
White text on semi-transparent dark surfaces ensures perfect readability against the busy jungle background.

#### 3. Layered Depth
Multiple transparency levels create visual hierarchy:
- **Background Layer:** Fixed jungle image
- **Overlay Layer:** Dark transparent overlay (30-40%)
- **Component Layer:** Glass morphism cards and UI elements
- **Interactive Layer:** Buttons, inputs, and controls

#### 4. Organic Motion
All transitions and animations feel natural and fluid, never mechanical or robotic.

---

## 🔤 Typography System

### Primary Font: Jost

**Jost** is a geometric sans-serif font that perfectly balances modern professionalism with approachability. It's our exclusive brand font.

```javascript
// Font Implementation (Next.js)
import { Jost } from "next/font/google";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
```

### Font Weight Scale

| Weight | Value | Usage | Example |
|--------|-------|-------|---------|
| **Light** | 300 | Subtle emphasis, decorative text | "Explore our services" |
| **Regular** | 400 | Body text, descriptions, labels | Primary reading content |
| **Medium** | 500 | Emphasized text, navigation items | Menu items, button labels |
| **Semi-Bold** | 600 | Headings, section titles | "Interactive Components" |
| **Bold** | 700 | Hero headings, primary CTAs | "SmartCamp.AI" |

### Typography Scale

```css
/* Heading Scale */
.display-heading {
  font-size: 3rem;        /* 48px - Hero titles */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.h1 {
  font-size: 2.25rem;     /* 36px - Page titles */
  font-weight: 700;
  line-height: 1.2;
}

.h2 {
  font-size: 1.875rem;    /* 30px - Section headings */
  font-weight: 600;
  line-height: 1.25;
}

.h3 {
  font-size: 1.5rem;      /* 24px - Card titles */
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.025em;
}

.h4 {
  font-size: 1.125rem;    /* 18px - Component labels */
  font-weight: 600;
  line-height: 1.4;
}

/* Body Text Scale */
.body-large {
  font-size: 1.125rem;    /* 18px - Emphasized body */
  font-weight: 400;
  line-height: 1.6;
}

.body {
  font-size: 1rem;        /* 16px - Standard body */
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.body-small {
  font-size: 0.875rem;    /* 14px - Supporting text */
  font-weight: 400;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
}

.caption {
  font-size: 0.75rem;     /* 12px - Captions, specs */
  font-weight: 400;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.6);
}
```

### Typography Colors

All text uses white or white-opacity variations for consistency against the jungle background:

- **Primary Text:** `#ffffff` (Pure white)
- **Secondary Text:** `rgba(255, 255, 255, 0.8)` (80% white)
- **Muted Text:** `rgba(255, 255, 255, 0.7)` (70% white)
- **Subtle Text:** `rgba(255, 255, 255, 0.6)` (60% white)
- **Disabled Text:** `rgba(255, 255, 255, 0.5)` (50% white)
- **Accent Text:** `#10b981` (Emerald-500) - for highlights and emphasis

### Typography Best Practices

1. **Always use Jost** - Never substitute with system fonts
2. **Maintain hierarchy** - Use size and weight to establish visual importance
3. **Prioritize readability** - White text on transparent backgrounds requires careful opacity management
4. **Use emerald sparingly** - Emerald color is for special emphasis only
5. **Drop shadows when needed** - Add `drop-shadow-lg` class for text over complex backgrounds

```css
/* Text Drop Shadow for Enhanced Readability */
.text-with-shadow {
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.8));
}
```

---

## 🎨 Color Palette & System

### Primary Color System

SmartCampAI uses a **monochromatic white-based system** with **emerald green accents** against a rich jungle background.

#### Core CSS Variables

```css
:root {
  /* Backgrounds */
  --background: transparent;
  --foreground: #ffffff;
  
  /* Surfaces (Glass Morphism) */
  --card: rgba(255, 255, 255, 0.15);
  --card-foreground: #ffffff;
  
  /* Interactive Elements */
  --primary: #ffffff;
  --primary-foreground: #1f4d2f;  /* Dark forest green */
  --secondary: rgba(255, 255, 255, 0.1);
  --secondary-foreground: #ffffff;
  
  /* Muted Elements */
  --muted: rgba(255, 255, 255, 0.1);
  --muted-foreground: rgba(255, 255, 255, 0.7);
  
  /* Accents */
  --accent: rgba(255, 255, 255, 0.1);
  --accent-foreground: #ffffff;
  
  /* Borders & Inputs */
  --border: rgba(255, 255, 255, 0.2);
  --input: rgba(255, 255, 255, 0.1);
  --ring: rgba(255, 255, 255, 0.5);
  
  /* Semantic Colors */
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  
  /* Design System */
  --radius: 0.5rem;
}
```

### Transparency Scale

SmartCampAI's visual hierarchy relies heavily on white transparency levels:

| Opacity | RGBA Value | Usage | Visual Weight |
|---------|------------|-------|---------------|
| **5%** | `rgba(255, 255, 255, 0.05)` | Subtle hover states | Barely visible |
| **10%** | `rgba(255, 255, 255, 0.1)` | Input backgrounds, muted surfaces | Very subtle |
| **15%** | `rgba(255, 255, 255, 0.15)` | Card backgrounds (PRIMARY) | Noticeable but transparent |
| **20%** | `rgba(255, 255, 255, 0.2)` | Borders, dividers | Clear but not heavy |
| **30%** | `rgba(255, 255, 255, 0.3)` | Button borders, emphasized borders | Medium weight |
| **50%** | `rgba(255, 255, 255, 0.5)` | Focus rings, hover highlights | Strong presence |
| **60%** | `rgba(255, 255, 255, 0.6)` | Subtle text | Readable text |
| **70%** | `rgba(255, 255, 255, 0.7)` | Secondary text | Clear text |
| **80%** | `rgba(255, 255, 255, 0.8)` | Primary body text | Strong text |
| **90%** | `rgba(255, 255, 255, 0.9)` | Button hover states | Nearly solid |
| **100%** | `#ffffff` | Headings, primary text, buttons | Solid white |

### Dark Overlay Scale (for backgrounds)

| Opacity | RGBA Value | Usage |
|---------|------------|-------|
| **20%** | `rgba(0, 0, 0, 0.2)` | Subtle background darkening |
| **30%** | `rgba(0, 0, 0, 0.3)` | Header/footer overlays (PRIMARY) |
| **40%** | `rgba(0, 0, 0, 0.4)` | Jungle button overlays (PRIMARY) |
| **50%** | `rgba(0, 0, 0, 0.5)` | Modal backgrounds, strong overlays |

### Accent Colors: Emerald Green

SmartCampAI uses **emerald green** as its signature accent color, representing growth, nature, and technology in harmony.

```css
/* Emerald Green Palette */
--emerald-300: #6ee7b7;  /* Light emerald - soft highlights */
--emerald-400: #34d399;  /* Medium emerald - hover states */
--emerald-500: #10b981;  /* PRIMARY emerald - main accent */
--emerald-600: #059669;  /* Dark emerald - buttons, emphasis */
--emerald-700: #047857;  /* Deeper emerald - dark mode accents */
```

#### Emerald Usage Guidelines

✅ **DO use emerald for:**
- Tagline emphasis: "You are the Future!"
- Interactive element highlights on hover
- Success states and positive feedback
- Special emphasis in descriptive text
- Gradient overlays and effects
- Badge backgrounds for special features

❌ **DON'T use emerald for:**
- Body text (use white/opacity instead)
- Borders (use white/opacity instead)
- Card backgrounds (use white/opacity instead)
- Large surface areas (too overwhelming)

### Forest Green: Secondary Accent

```css
--forest-green: #1f4d2f;  /* Dark forest green */
```

**Usage:** Text color on solid white buttons (`button-default` variant), creating strong contrast and maintaining the natural theme.

### Semantic Colors

For error, warning, and success states:

```css
/* Semantic Color System */
--success: #10b981;       /* Emerald-500 - positive actions */
--warning: #f59e0b;       /* Amber-500 - caution states */
--error: #ef4444;         /* Red-500 - errors and destructive actions */
--info: #3b82f6;          /* Blue-500 - informational messages */
```

### Color Application Examples

```css
/* Card Background */
.card {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Input Field */
.input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

/* Primary Button */
.button-default {
  background: #ffffff;
  color: #1f4d2f;
}

.button-default:hover {
  background: rgba(255, 255, 255, 0.9);
}

/* Emerald Accent Button */
.button-emerald {
  background: #10b981;
  color: #ffffff;
}

.button-emerald:hover {
  background: #059669;
}

/* Tagline with Accent */
.tagline-accent {
  color: #10b981;  /* Emerald-500 */
  font-weight: 600;
}
```

---

## 🦘 Logo & Brand Assets

### Primary Logo: SmartCampAI Wordmark

**File:** `/public/SmartCampAIpng.png`

**Specifications:**
- **Format:** PNG with transparency
- **Optimal Dimensions:** 320×160px (2:1 ratio)
- **Background:** Transparent
- **Usage Context:** Headers, landing pages, primary branding

**Responsive Sizing:**
```css
/* Mobile */
.logo-mobile {
  height: 3rem;     /* 48px */
  width: auto;
}

/* Tablet */
@media (min-width: 640px) {
  .logo-tablet {
    height: 3.5rem;  /* 56px */
    width: auto;
  }
}

/* Desktop */
@media (min-width: 768px) {
  .logo-desktop {
    height: 4rem;    /* 64px */
    width: auto;
  }
}
```

**Usage Guidelines:**
- Always maintain aspect ratio
- Never add filters or color overlays
- Ensure adequate breathing room (minimum 16px clearance)
- Add hover effect: `hover:scale-105 hover:opacity-90`

### Mascot: SmartCampAI Monkey

**File:** `/public/Monkey_SmartCampAI-no-background.png`

**Specifications:**
- **Format:** PNG with transparency
- **Style:** Friendly, approachable, tech-savvy monkey character
- **Optimal Dimensions:** Square format (1:1 ratio)
- **Usage Context:** Footer, about sections, branding materials

**Responsive Sizing:**
```css
/* Mobile */
.monkey-mobile {
  height: 8rem;     /* 128px */
  width: 8rem;
  object-fit: contain;
}

/* Tablet/Desktop */
@media (min-width: 640px) {
  .monkey-desktop {
    height: 10rem;   /* 160px */
    width: 10rem;
    object-fit: contain;
  }
}
```

**Personality:**
The monkey mascot embodies SmartCampAI's brand personality:
- Intelligent and curious
- Playful but professional
- Tech-savvy and modern
- Friendly and approachable
- Represents growth and natural evolution in the tech jungle

**Usage Guidelines:**
- Always use on transparent backgrounds
- Maintain opacity at 90% with hover effect to 100%
- Add subtle scale animation on hover
- Never stretch or distort proportions

### Badge: n8n Certified Creator

**File:** `/public/n8n-certified-creator.png`

**Specifications:**
- **Format:** PNG
- **Context:** Showcases professional certification and expertise
- **Optimal Dimensions:** Square format
- **Link Target:** `https://n8n.io/creators/smart-camp-ai/`

**Responsive Sizing:**
```css
/* Mobile */
.n8n-badge-mobile {
  height: 7rem;     /* 112px */
  width: 7rem;
  object-fit: contain;
}

/* Tablet/Desktop */
@media (min-width: 640px) {
  .n8n-badge-desktop {
    height: 9rem;    /* 144px */
    width: 9rem;
    object-fit: contain;
  }
}
```

**Usage Guidelines:**
- Always link to n8n Creator profile
- Display alongside monkey mascot in footer
- Maintain professional presentation
- Add hover scale effect for interactivity

### Favicon System

SmartCampAI provides a complete favicon system for all platforms:

```javascript
// Favicon Configuration (Next.js)
icons: {
  icon: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' },
  ],
  shortcut: '/favicon.ico',
}
```

**Required Files:**
- `favicon.ico` - Legacy browser support
- `favicon-16x16.png` - Small icon size
- `favicon-32x32.png` - Standard icon size
- `favicon.png` - Base favicon
- `apple-touch-icon.png` - iOS home screen icon

### Open Graph Image

**File:** `/public/og-image.png`

**Specifications:**
- **Dimensions:** 1200×630px (1.91:1 ratio)
- **Format:** PNG or JPG
- **Usage:** Social media sharing (Facebook, LinkedIn, etc.)
- **Content:** SmartCampAI branding with tagline

```javascript
// Open Graph Configuration
openGraph: {
  type: 'website',
  locale: 'en_US',
  url: 'https://smartcamp.ai',
  siteName: 'SmartCampAI',
  title: 'SmartCamp.AI - AI | Automations | Web Dev',
  description: 'AI | Automations | Web Dev - SmartCampAI',
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'SmartCamp.AI - AI, Automations & Web Development',
    },
  ],
}
```

---

## 🌿 Background & Visual Effects

### Jungle Background Image

**File:** `/public/jungle background.png`

**Description:** A rich, immersive jungle scene with subtle technological elements woven into the natural imagery. The background creates the signature "Jungle Tech" aesthetic.

#### Implementation

```css
/* Global Jungle Background */
.jungle-background {
  background-image: url('/jungle background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;  /* Creates parallax effect */
  min-height: 100vh;
}
```

**Applied to:** The `<body>` element in `layout.tsx`

```jsx
<body className="jungle-background">
  {/* App content */}
</body>
```

#### Background Characteristics

- **Fixed Attachment:** Creates a subtle parallax effect as users scroll
- **Full Coverage:** Always covers the entire viewport
- **Centered Position:** Ensures the most interesting parts remain visible
- **High Resolution:** Maintains quality on retina displays

### Dark Overlays for Readability

To ensure text remains readable over the busy jungle background, SmartCampAI uses dark overlays on key UI sections.

#### Header Overlay

```css
/* Header with Jungle Background + Overlay */
.header {
  background-image: url('/jungle background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.header-overlay {
  background: rgba(0, 0, 0, 0.3);  /* 30% black overlay */
  backdrop-filter: blur(2px);       /* Subtle blur */
}
```

#### Footer Overlay

```css
/* Footer with Jungle Background + Overlay */
.footer {
  background-image: url('/jungle background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.footer-overlay {
  background: rgba(0, 0, 0, 0.3);  /* 30% black overlay */
  backdrop-filter: blur(2px);       /* Subtle blur */
}
```

#### Button Jungle Variant Overlay

The unique "jungle" button variant features the jungle background with a darker overlay:

```css
.button-jungle {
  position: relative;
  background-image: url('/jungle background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #ffffff;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.button-jungle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);  /* 40% black overlay */
  border-radius: inherit;
  z-index: 1;
}

.button-jungle > * {
  position: relative;
  z-index: 10;  /* Content appears above overlay */
}

.button-jungle:hover {
  opacity: 0.9;
}
```

### Glass Morphism Effect

The signature glass morphism effect creates a modern, floating UI aesthetic:

#### Standard Glass Effect (Cards, Major Components)

```css
.glass-standard {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);  /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}
```

**Usage:** Card components, modal dialogs, major UI sections

#### Subtle Glass Effect (Inputs, Minor Elements)

```css
.glass-subtle {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.375rem;
}
```

**Usage:** Input fields, select dropdowns, minor interactive elements

#### Enhanced Glass Effect (Emphasis)

```css
.glass-enhanced {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
```

**Usage:** Featured content, call-to-action cards, premium elements

### Browser Compatibility

Glass morphism requires `backdrop-filter` support. Provide graceful degradation:

```css
/* Fallback for browsers without backdrop-filter support */
@supports not (backdrop-filter: blur(10px)) {
  .glass-standard {
    background: rgba(255, 255, 255, 0.25);  /* Slightly more opaque */
  }
}
```

### Shadow System

Shadows add depth and hierarchy to glass morphism elements:

```css
/* Shadow Scale */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
              0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

---

## 🧩 Component Styling

### Card Component

Cards are the primary container component in SmartCampAI applications.

#### Structure

```jsx
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Card Title</h3>
    <p className="card-description">Card description text</p>
  </div>
  <div className="card-content">
    {/* Main content */}
  </div>
  <div className="card-footer">
    {/* Actions or additional info */}
  </div>
</div>
```

#### Styling

```css
.card {
  border-radius: 0.5rem;  /* 8px */
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.5rem;  /* 24px */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-title {
  font-size: 1.5rem;       /* 24px */
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
  color: #ffffff;
}

.card-description {
  font-size: 0.875rem;     /* 14px */
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.card-content {
  padding: 1.5rem;
  padding-top: 1rem;       /* Reduced top padding after header */
}

.card-footer {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  padding-top: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Button Components

SmartCampAI uses multiple button variants for different use cases.

#### Button Variants

##### 1. Default Button (White)

```css
.button-default {
  background: #ffffff;
  color: #1f4d2f;  /* Forest green text */
  height: 2.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.button-default:hover {
  background: rgba(255, 255, 255, 0.9);
}

.button-default:active {
  transform: scale(0.98);
}
```

##### 2. Jungle Button (Signature Style)

The most distinctive SmartCampAI button style:

```css
.button-jungle {
  position: relative;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  background-image: url('/jungle background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  transition: all 0.2s ease-in-out;
}

.button-jungle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: inherit;
  z-index: 1;
}

.button-jungle > * {
  position: relative;
  z-index: 10;
}

.button-jungle:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.button-jungle:active {
  transform: scale(0.98);
}
```

##### 3. Outline Button

```css
.button-outline {
  background: transparent;
  color: #ffffff;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.button-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}
```

##### 4. Ghost Button

```css
.button-ghost {
  background: transparent;
  color: #ffffff;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.button-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
}
```

##### 5. Emerald Button

```css
.button-emerald {
  background: #10b981;  /* Emerald-500 */
  color: #ffffff;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
  transition: all 0.2s ease-in-out;
}

.button-emerald:hover {
  background: #059669;  /* Emerald-600 */
  box-shadow: 0 6px 8px -1px rgba(16, 185, 129, 0.4);
}
```

#### Button Sizes

```css
/* Small */
.button-sm {
  height: 2.25rem;   /* 36px */
  padding: 0 0.75rem;
  font-size: 0.8125rem;
}

/* Default (Medium) */
.button {
  height: 2.5rem;    /* 40px */
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Large */
.button-lg {
  height: 2.75rem;   /* 44px */
  padding: 0 2rem;
  font-size: 0.9375rem;
}

/* Icon Button */
.button-icon {
  height: 2.5rem;
  width: 2.5rem;
  padding: 0;
}
```

#### Button States

```css
/* Focus State */
.button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* Disabled State */
.button:disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading State */
.button-loading {
  position: relative;
  color: transparent;
}

.button-loading::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### Input Components

#### Text Input

```css
.input {
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.input:focus {
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 0;
}

.input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Input with Icon */
.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
}

.input-with-icon {
  padding-left: 2.5rem;
}
```

#### Textarea

```css
.textarea {
  display: flex;
  width: 100%;
  min-height: 5rem;  /* 80px */
  border-radius: 0.375rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
  padding: 0.75rem;
  font-size: 0.875rem;
  color: #ffffff;
  resize: vertical;
  transition: all 0.2s ease-in-out;
}

.textarea::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.textarea:focus {
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 0;
}
```

#### Select Dropdown

```css
.select {
  display: flex;
  height: 2.5rem;
  width: 100%;
  appearance: none;
  border-radius: 0.375rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #ffffff;
  cursor: pointer;
  
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  
  transition: all 0.2s ease-in-out;
}

.select:focus {
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.select option {
  background: #1f4d2f;  /* Forest green */
  color: #ffffff;
  padding: 0.5rem;
}
```

### Slider Component

SmartCampAI features a unique slider with a **banana emoji** as the thumb—a playful touch that reinforces the jungle theme.

```css
.slider-container {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  touch-action: none;
  user-select: none;
}

.slider-track {
  position: relative;
  height: 0.5rem;
  width: 100%;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.slider-range {
  position: absolute;
  height: 100%;
  background: #10b981;  /* Emerald fill */
  border-radius: 9999px;
}

.slider-thumb {
  position: absolute;
  height: 1.25rem;
  width: 1.25rem;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.125rem;  /* 18px */
  cursor: grab;
  user-select: none;
  transition: transform 0.2s ease;
}

.slider-thumb:hover {
  transform: translate(-50%, -50%) scale(1.25);
}

.slider-thumb:active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.1);
}

/* Banana Emoji: 🍌 */
.slider-thumb::before {
  content: '🍌';
  display: block;
}
```

**Usage Note:** The banana emoji slider is a signature SmartCampAI design element. Always use 🍌 for slider thumbs.

### Radio Group

```css
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.radio-option {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.radio-option:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.radio-option-selected {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}

.radio-circle {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  transition: all 0.2s ease-in-out;
}

.radio-option-selected .radio-circle {
  border-color: #10b981;
  background: #10b981;
  box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.2);
}

.radio-label {
  flex: 1;
}

.radio-label-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 0.125rem;
}

.radio-label-description {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
}
```

### Toggle Switch

```css
.toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease-in-out;
}

.toggle-wrapper:hover {
  background: rgba(255, 255, 255, 0.08);
}

.toggle-label {
  flex: 1;
  margin-right: 1rem;
}

.toggle-label-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 0.125rem;
}

.toggle-label-description {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
}

.toggle-switch {
  position: relative;
  width: 2.75rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}

.toggle-switch-checked {
  background: #10b981;
}

.toggle-thumb {
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;
}

.toggle-switch-checked .toggle-thumb {
  transform: translateX(1.25rem);
}
```

### Checkbox

```css
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.checkbox-wrapper:hover {
  background: rgba(255, 255, 255, 0.08);
}

.checkbox {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  border-radius: 0.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

.checkbox-checked {
  border-color: #10b981;
  background: #10b981;
}

.checkbox-icon {
  width: 0.75rem;
  height: 0.75rem;
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.checkbox-checked .checkbox-icon {
  opacity: 1;
}
```

### Date Picker

```css
.date-picker-wrapper {
  position: relative;
  width: 100%;
}

.date-picker-input {
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  border-radius: 0.375rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.date-picker-input:focus {
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.date-picker-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
}

.date-picker-placeholder {
  color: rgba(255, 255, 255, 0.7);
}
```

---

## 📐 Layout & Spacing

### Container System

SmartCampAI uses a responsive container system with consistent maximum widths and padding.

```css
/* Standard Container */
.container {
  width: 100%;
  max-width: 1200px;  /* 6xl */
  margin: 0 auto;
  padding: 0 1rem;    /* 16px on mobile */
}

@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;  /* 24px on tablet */
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 2rem;    /* 32px on desktop */
  }
}

/* Narrow Container (for forms, focused content) */
.container-narrow {
  max-width: 768px;
}

/* Wide Container (for dashboards, data-heavy pages) */
.container-wide {
  max-width: 1536px;  /* 2xl */
}
```

### Spacing Scale

SmartCampAI uses Tailwind CSS's 4px-based spacing scale:

| Class | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `space-0` | 0 | 0px | Reset spacing |
| `space-1` | 0.25rem | 4px | Tightest spacing |
| `space-2` | 0.5rem | 8px | Very tight spacing |
| `space-3` | 0.75rem | 12px | Tight spacing |
| `space-4` | 1rem | 16px | **Standard spacing** |
| `space-5` | 1.25rem | 20px | Comfortable spacing |
| `space-6` | 1.5rem | 24px | **Medium spacing** |
| `space-8` | 2rem | 32px | **Large spacing** |
| `space-10` | 2.5rem | 40px | Extra large spacing |
| `space-12` | 3rem | 48px | Section spacing |
| `space-16` | 4rem | 64px | Major section spacing |
| `space-20` | 5rem | 80px | Hero section spacing |

### Common Spacing Patterns

```css
/* Card Padding */
.card-padding {
  padding: 1.5rem;  /* 24px - space-6 */
}

/* Section Spacing */
.section-spacing {
  margin-top: 2rem;    /* 32px - space-8 */
  margin-bottom: 2rem;
}

/* Component Gap */
.component-gap {
  gap: 1rem;  /* 16px - space-4 */
}

/* Form Element Spacing */
.form-spacing {
  margin-bottom: 1.5rem;  /* 24px - space-6 */
}
```

### Grid System

```css
/* 3-Column Grid (Desktop) */
.grid-3-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .grid-3-col {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

/* 2-Column Grid (Desktop) */
.grid-2-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid-2-col {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

/* Sidebar Layout */
.layout-sidebar {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .layout-sidebar {
    grid-template-columns: 250px 1fr;
  }
}
```

### Border Radius Scale

```css
/* Border Radius Values */
.rounded-sm { border-radius: 0.125rem; }  /* 2px */
.rounded    { border-radius: 0.25rem; }   /* 4px */
.rounded-md { border-radius: 0.375rem; }  /* 6px */
.rounded-lg { border-radius: 0.5rem; }    /* 8px - PRIMARY */
.rounded-xl { border-radius: 0.75rem; }   /* 12px */
.rounded-2xl { border-radius: 1rem; }     /* 16px */
.rounded-full { border-radius: 9999px; }  /* Fully rounded */
```

**Primary Border Radius:** `0.5rem` (8px) - Use for most components

### Z-Index Scale

Consistent z-index values prevent stacking conflicts:

```css
/* Z-Index Scale */
--z-base: 0;          /* Default layer */
--z-dropdown: 10;     /* Dropdown menus */
--z-sticky: 20;       /* Sticky headers */
--z-fixed: 30;        /* Fixed elements */
--z-modal-backdrop: 40;  /* Modal backgrounds */
--z-modal: 50;        /* Modal content */
--z-popover: 60;      /* Popovers, tooltips */
--z-toast: 70;        /* Toast notifications */
--z-tooltip: 80;      /* Tooltips (highest priority) */
```

---

## 🎮 Interactive Elements

### Hover Effects

SmartCampAI uses subtle, smooth hover effects that reinforce the organic "Jungle Tech" theme.

#### Standard Hover Scale

```css
.hover-scale {
  transition: transform 0.3s ease-in-out;
}

.hover-scale:hover {
  transform: scale(1.05);
}
```

**Usage:** Logos, images, cards

#### Subtle Hover Lift

```css
.hover-lift {
  transition: all 0.3s ease-in-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

**Usage:** Buttons, interactive cards

#### Hover Opacity

```css
.hover-opacity {
  transition: opacity 0.2s ease-in-out;
}

.hover-opacity:hover {
  opacity: 0.9;
}
```

**Usage:** Jungle buttons, images, logos

#### Hover Color Change

```css
.hover-emerald {
  transition: color 0.2s ease-in-out;
}

.hover-emerald:hover {
  color: #10b981;  /* Emerald-500 */
}
```

**Usage:** Links, taglines, accent text

### Focus States

All interactive elements must have clear, accessible focus states:

```css
.focus-ring {
  transition: all 0.2s ease-in-out;
}

.focus-ring:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}
```

**WCAG Requirement:** Focus indicators must have 3:1 contrast ratio and be visible on all interactive elements.

### Active States

```css
.button:active {
  transform: scale(0.98);
}

.card-interactive:active {
  transform: scale(0.99);
}
```

### Loading States

#### Spinner

```css
.spinner {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

#### Pulse

```css
.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

#### Skeleton Loader

```css
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: 0.375rem;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

### Transition System

```css
/* Standard Transitions */
.transition-default {
  transition: all 0.2s ease-in-out;
}

.transition-slow {
  transition: all 0.3s ease-in-out;
}

.transition-fast {
  transition: all 0.15s ease-in-out;
}

/* Specific Property Transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

.transition-transform {
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.transition-opacity {
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}
```

### Entrance Animations

```css
/* Fade In */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide In from Left */
.slide-in-left {
  animation: slideInLeft 0.4s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scale In */
.scale-in {
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## 📱 Responsive Design

### Breakpoint System

SmartCampAI uses Tailwind CSS's standard breakpoint system:

| Breakpoint | Min Width | Device | Design Focus |
|------------|-----------|--------|--------------|
| `xs` | Default | 0px - 639px | Mobile phones (portrait) |
| `sm` | 640px | Small tablets, large phones (landscape) |
| `md` | 768px | Tablets (portrait) |
| `lg` | 1024px | Tablets (landscape), small laptops |
| `xl` | 1280px | Laptops, desktops |
| `2xl` | 1536px | Large desktops, ultra-wide monitors |

### Mobile-First Approach

SmartCampAI follows a **mobile-first design philosophy**. All base styles target mobile devices, then enhance for larger screens:

```css
/* Base styles (mobile) */
.component {
  font-size: 1rem;
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    font-size: 1.125rem;
    padding: 1.5rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    font-size: 1.25rem;
    padding: 2rem;
  }
}
```

### Responsive Typography

```css
/* Hero Title */
.hero-title {
  font-size: 2rem;        /* 32px - mobile */
  line-height: 1.1;
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 2.5rem;    /* 40px - tablet */
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 3rem;      /* 48px - desktop */
  }
}

/* Body Text */
.body-responsive {
  font-size: 0.875rem;    /* 14px - mobile */
  line-height: 1.6;
}

@media (min-width: 768px) {
  .body-responsive {
    font-size: 1rem;      /* 16px - tablet+ */
  }
}
```

### Responsive Layout Patterns

#### Stack to Grid

```css
/* Mobile: Stacked */
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### Hide/Show Elements

```css
/* Hide on mobile, show on desktop */
.desktop-only {
  display: none;
}

@media (min-width: 1024px) {
  .desktop-only {
    display: block;
  }
}

/* Show on mobile, hide on desktop */
.mobile-only {
  display: block;
}

@media (min-width: 1024px) {
  .mobile-only {
    display: none;
  }
}
```

### Responsive Component Examples

#### Header Logo

```jsx
<Image
  src="/SmartCampAIpng.png"
  alt="SmartCamp AI"
  className="h-12 w-auto sm:h-14 md:h-16"
  priority
/>
```

- Mobile: 48px height
- Tablet: 56px height
- Desktop: 64px height

#### Footer Layout

```css
/* Mobile: Stacked vertically */
.footer-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Desktop: Horizontal layout */
@media (min-width: 1024px) {
  .footer-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0;
  }
}
```

### Touch Target Sizes

All interactive elements must meet minimum touch target requirements:

```css
/* Minimum Touch Target: 44×44px */
.touch-target {
  min-height: 2.75rem;  /* 44px */
  min-width: 2.75rem;
}

/* Buttons */
.button {
  height: 2.5rem;       /* 40px - acceptable */
  padding: 0.5rem 1rem;
}

.button-lg {
  height: 2.75rem;      /* 44px - optimal */
  padding: 0 2rem;
}
```

**WCAG Guideline:** Touch targets should be at least 44×44px for optimal accessibility.

---

## 🗣️ Brand Personality & Voice

### Tone of Voice

SmartCampAI's communication style reflects its unique position at the intersection of technology and nature:

#### 1. Professional but Approachable
- **Do:** Use clear, straightforward language
- **Don't:** Use unnecessary jargon or overly formal tone
- **Example:** "Let's build your AI workflow" instead of "Implement artificial intelligence automation infrastructure"

#### 2. Confident but Humble
- **Do:** Showcase expertise and success
- **Don't:** Boast or put down competitors
- **Example:** "We're n8n Certified Creators with proven results" instead of "We're the best automation experts"

#### 3. Encouraging and Empowering
- **Do:** Inspire users to take action
- **Don't:** Make technology seem intimidating
- **Example:** "You are the Future!" instead of "Advanced technology for experts only"

#### 4. Playful but Purposeful
- **Do:** Use personality and charm (banana sliders, monkey mascot)
- **Don't:** Sacrifice clarity for cuteness
- **Example:** Using 🍌 emoji sliders while maintaining functional clarity

#### 5. Clear and Direct
- **Do:** Get to the point quickly
- **Don't:** Use flowery or vague language
- **Example:** "AI | Automations | Web Dev" instead of "Comprehensive technological solutions for modern enterprises"

### Writing Guidelines

#### Headings
- Use action-oriented language
- Keep it concise (3-7 words ideal)
- Front-load important keywords
- Example: "Build Your AI Workflow" not "How You Can Build Your Own Artificial Intelligence Workflow System"

#### Body Copy
- Write in short paragraphs (2-3 sentences)
- Use active voice
- Address the user directly ("you," "your")
- Example: "Your AI journey starts here. We'll guide you every step of the way."

#### Button Labels
- Use action verbs
- Be specific about outcomes
- Keep it short (1-3 words)
- Examples: "Get Started," "Build Now," "Learn More"

#### Microcopy
- Be helpful and informative
- Anticipate user questions
- Add personality when appropriate
- Example placeholder: "yourname@email.com" instead of just "Email"

### Brand Vocabulary

#### Preferred Terms
- **AI** (not "Artificial Intelligence" unless necessary for clarity)
- **Automations** (not "Automated Workflows")
- **Web Dev** (not "Web Development" in taglines)
- **Jungle Tech** (when describing our aesthetic)
- **Glass Morphism** (when describing our UI style)

#### Avoid
- "Synergy," "Leverage," "Paradigm" (corporate buzzwords)
- "Cutting-edge" (overused, prefer "modern" or "advanced")
- "Revolutionary" (prefer "innovative" or "transformative")
- "Best-in-class" (too marketing-heavy)

### Emoji Usage

SmartCampAI embraces emojis to add personality and visual interest:

#### Appropriate Contexts
✅ Section headings: "📝 Form Elements"
✅ Feature highlights: "✨ Glass Morphism Design"
✅ Playful UI elements: 🍌 (banana slider thumb)
✅ Badge labels: "🌿 Jungle Tech Aesthetic"

#### Guidelines
- Use sparingly (1-2 per section maximum)
- Choose emojis that reinforce the jungle/tech theme
- Ensure emojis add meaning, not just decoration
- Test across platforms for consistent appearance

#### Preferred Emojis
- 🌿 🌴 🍃 (nature, jungle theme)
- 🤖 💻 ⚡ (technology, AI)
- 🍌 🐒 (mascot, playful elements)
- ✨ 🎨 🎯 (design, creativity)
- 📊 📈 📝 (data, business)

### Taglines and Slogans

#### Primary Tagline
> **"You are the Future!"**

This is SmartCampAI's core message—empowering and future-focused.

#### Service Description
> **"AI | Automations | Web Dev"**

Clean, direct, comprehensive. Use this consistently across all materials.

#### Extended Descriptions

**Short (Twitter Bio):**
"AI, Automations & Web Development. n8n Certified Creator. You are the Future! 🌿🤖"

**Medium (Website Header):**
"SmartCamp.AI provides cutting-edge AI solutions, automation workflows, and web development services. We empower you to embrace the future of technology."

**Long (About Page):**
"SmartCamp.AI stands at the intersection of nature and technology—where the organic meets the digital. As n8n Certified Creators, we specialize in AI integration, automation design, and modern web development. Our mission: empower individuals and businesses to become the future through accessible, powerful technology solutions delivered with professional excellence and organic warmth."

---

## ✅ Implementation Checklist

Use this checklist when implementing new SmartCampAI projects or components to ensure brand consistency:

### Visual Identity
- [ ] Jost font loaded from Google Fonts
- [ ] Font weights 300, 400, 500, 600, 700 available
- [ ] Jungle background image implemented
- [ ] Background set to `fixed` attachment
- [ ] Glass morphism effects applied to all cards
- [ ] White text with appropriate opacity levels
- [ ] Emerald green accent color used sparingly

### Logo & Assets
- [ ] Primary SmartCampAI logo in header
- [ ] Monkey mascot in footer
- [ ] n8n Certified Creator badge linked properly
- [ ] All favicons in place (16×16, 32×32, apple-touch-icon)
- [ ] Open Graph image configured
- [ ] Logo hover effects implemented

### Color System
- [ ] CSS custom properties defined in globals.css
- [ ] Transparency scale used consistently
- [ ] Dark overlays on header/footer (30% black)
- [ ] Emerald green (#10b981) used for accents only
- [ ] Forest green (#1f4d2f) used on white buttons
- [ ] All text uses white or white-opacity variants

### Typography
- [ ] All headings use appropriate font sizes
- [ ] Font weights match brand guidelines
- [ ] Line heights optimized for readability
- [ ] Text has proper drop shadows when needed
- [ ] Responsive font sizes implemented
- [ ] Emerald color used only for special emphasis

### Components
- [ ] Cards use standard glass morphism effect
- [ ] Buttons include all variants (default, jungle, outline, ghost)
- [ ] Inputs have glass effect backgrounds
- [ ] Sliders use banana emoji (🍌) as thumb
- [ ] All interactive elements have hover states
- [ ] Focus states visible and accessible
- [ ] Loading states implemented where needed

### Layout & Spacing
- [ ] Container max-width: 1200px
- [ ] Responsive padding (16px → 24px → 32px)
- [ ] Consistent spacing scale used
- [ ] Grid layouts responsive (stack to columns)
- [ ] Border radius: 0.5rem (8px) primary
- [ ] Z-index scale followed

### Responsive Design
- [ ] Mobile-first approach
- [ ] All breakpoints tested (sm, md, lg, xl)
- [ ] Typography scales responsively
- [ ] Layouts adapt to screen size
- [ ] Touch targets minimum 44×44px
- [ ] Images responsive and optimized

### Interactive Elements
- [ ] Hover effects smooth and subtle
- [ ] Active states provide feedback
- [ ] Transitions use standard timing (0.2s-0.3s)
- [ ] Animations natural and organic
- [ ] All states accessible via keyboard
- [ ] Loading states clear and visible

### Accessibility
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators clearly visible
- [ ] All interactive elements keyboard accessible
- [ ] ARIA labels where appropriate
- [ ] Alt text on all images
- [ ] Semantic HTML structure

### Brand Voice
- [ ] Tone professional but approachable
- [ ] Copy clear and direct
- [ ] Emojis used appropriately
- [ ] Taglines consistent with brand
- [ ] Button labels action-oriented
- [ ] Microcopy helpful and friendly

### Performance
- [ ] Jungle background optimized (WebP if possible)
- [ ] Fonts subset to Latin only
- [ ] Images lazy loaded where appropriate
- [ ] Animations use CSS transforms (GPU accelerated)
- [ ] Bundle size optimized
- [ ] Core Web Vitals targets met

### Browser Support
- [ ] Modern browsers tested (Chrome, Firefox, Safari, Edge)
- [ ] Backdrop-filter fallback provided
- [ ] CSS Grid with Flexbox fallback
- [ ] Vendor prefixes where needed

### Final QA
- [ ] All links work correctly
- [ ] Forms submit properly
- [ ] No console errors
- [ ] No accessibility errors (axe-core)
- [ ] Visual consistency across pages
- [ ] Mobile experience tested on real devices

---

## 🎓 Best Practices Summary

### Golden Rules

1. **Always use Jost font** - Never substitute or use system fonts
2. **White text on glass** - All text uses white or white-opacity
3. **Emerald sparingly** - Use #10b981 only for accents and emphasis
4. **Glass morphism everywhere** - All surfaces use transparent backgrounds with blur
5. **Jungle background fixed** - Creates signature parallax effect
6. **Banana emoji sliders** - 🍌 is our signature playful element
7. **Mobile-first design** - Start with mobile, enhance for desktop
8. **Smooth transitions** - Everything animates naturally (0.2-0.3s)
9. **Professional + playful** - Serious expertise with organic warmth
10. **You are the Future** - Empowering, future-focused messaging

### Quick Reference

**Primary Font:** Jost (Google Fonts)
**Primary Color:** White (#ffffff)
**Accent Color:** Emerald-500 (#10b981)
**Background:** Jungle image (fixed attachment)
**Card Background:** rgba(255, 255, 255, 0.15)
**Border Color:** rgba(255, 255, 255, 0.2)
**Border Radius:** 0.5rem (8px)
**Transition Speed:** 0.2s ease-in-out
**Max Width:** 1200px
**Breakpoints:** 640px, 768px, 1024px, 1280px, 1536px

---

## 📞 Contact & Resources

**Website:** https://smartcamp.ai
**Email:** hello@smartcamp.ai
**Phone:** +48 518 894 156
**n8n Creator Profile:** https://n8n.io/creators/smart-camp-ai/

---

**This document represents the complete SmartCampAI brand identity. Follow these guidelines to create consistent, professional, and visually striking applications that embody the "Jungle Tech" aesthetic and empower users to become the future.**

*Document Version 1.0 • November 2025 • SmartCamp.AI*

