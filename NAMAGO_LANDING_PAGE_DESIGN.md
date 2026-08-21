# NAMAGO — LANDING PAGE DESIGN SPECIFICATION
Version 1.0 | August 20, 2026

---

## TABLE OF CONTENTS
1. [Design Overview](#design-overview)
2. [Layout Structure](#layout-structure)
3. [Mobile Design (320px - 768px)](#mobile-design)
4. [Desktop Design (1024px+)](#desktop-design)
5. [Design System Tokens](#design-system-tokens)
6. [Component Specifications](#component-specifications)
7. [Interactions & Animations](#interactions--animations)
8. [Accessibility Requirements](#accessibility-requirements)

---

## DESIGN OVERVIEW

### Purpose
Convert visitors into learners within 5 seconds by clearly communicating:
- What NamaGO does
- Who it's for
- Why they should start now

### Design Direction
**Playful Minimalism + Kinetic UI**

### Key Principles
1. **Bangalore-first:** Visual language reflects the city
2. **Clear hierarchy:** One primary message, one primary action
3. **Fast loading:** Optimized for mobile networks
4. **Welcoming:** Friendly but not childish
5. **Confident:** Modern, polished, professional

---

## LAYOUT STRUCTURE

### Page Sections (Top to Bottom)
```
┌─────────────────────────────────────┐
│ 1. HERO SECTION                     │  ← First impression
├─────────────────────────────────────┤
│ 2. SOCIAL PROOF                     │  ← Trust signals
├─────────────────────────────────────┤
│ 3. HOW IT WORKS                     │  ← Value proposition
├─────────────────────────────────────┤
│ 4. FEATURES                         │  ← Key benefits
├─────────────────────────────────────┤
│ 5. TESTIMONIAL/DEMO                 │  ← Credibility
├─────────────────────────────────────┤
│ 6. FINAL CTA                        │  ← Conversion
├─────────────────────────────────────┤
│ 7. FOOTER                           │  ← Links & info
└─────────────────────────────────────┘
```

---

## MOBILE DESIGN (320px - 768px)

### SECTION 1: HERO (Above the Fold)

```
┌─────────────────────────────────────┐
│                                     │
│  [Logo: NamaGO]                     │  ← 24px height
│                                     │
│  ─────────────────────              │
│                                     │
│     Learn Kannada.                  │  ← H1: 40px bold
│     Live Bangalore.                 │
│                                     │
│  ─────────────────────              │
│                                     │
│  Short lessons. Real conversations. │  ← Body: 18px
│  Kannada you can actually use.      │
│                                     │
│  ─────────────────────              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   Start Learning — It's     │   │  ← Primary CTA
│  │          Free               │   │     56px height
│  └─────────────────────────────┘   │     Border radius: 16px
│                                     │
│         [illustration or            │
│      abstract visual element]       │  ← Bangalore-inspired
│                                     │     Karnataka green accent
│                                     │
│  No downloads needed • 5 min first  │  ← Small text: 14px
│               lesson                │     Muted color
│                                     │
└─────────────────────────────────────┘
```

**Specifications:**
- **Background:** Warm off-white (#FFFBF5)
- **Padding:** 24px horizontal, 48px vertical
- **Content max-width:** 100% (minus padding)
- **Visual element:** Abstract path/pattern in Karnataka green with 20% opacity
- **CTA position:** Fixed at center, hard to miss

**Visual Element Options:**
1. Abstract geometric path (like a winding road)
2. Stylized Kannada script character (ಕ or ನ) as background
3. Minimal Bangalore skyline silhouette
4. Organic flowing shapes in brand colors

---

### SECTION 2: SOCIAL PROOF

```
┌─────────────────────────────────────┐
│                                     │
│    Trusted by students & newcomers  │  ← Caption: 14px
│           across Bangalore          │
│                                     │
│  ─────────────────────              │
│                                     │
│    ⭐⭐⭐⭐⭐                         │  ← Stars: 20px
│                                     │
│  "Finally, a Kannada app that       │  ← Quote: 16px italic
│   actually helps me in real life"   │
│                                     │
│         — Priya, Student            │  ← Attribution: 14px
│                                     │
│  ─────────────────────              │
│                                     │
│     📱 5,000+ learners              │  ← Stats in row
│     🔥 500+ daily active            │     16px each
│     ⭐ 4.8/5 rating                 │
│                                     │
└─────────────────────────────────────┘
```

**Specifications:**
- **Background:** Subtle warm gray (#F5F3F0)
- **Padding:** 32px horizontal, 48px vertical
- **Text alignment:** Center
- **Stats layout:** Vertical stack on mobile

---

### SECTION 3: HOW IT WORKS

```
┌─────────────────────────────────────┐
│                                     │
│       How NamaGO Works              │  ← H2: 32px bold
│                                     │
│  ─────────────────────              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │         [Icon: 📖]          │   │
│  │                             │   │
│  │   1. Learn Practical        │   │  ← Step card
│  │      Phrases                │   │     H3: 20px
│  │                             │   │     Body: 16px
│  │   Start with real Bangalore │   │     Padding: 24px
│  │   situations. No boring     │   │     Background: White
│  │   grammar first.            │   │     Border radius: 20px
│  └─────────────────────────────┘   │     Shadow: Soft
│                                     │
│           ↓ 16px gap ↓              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │         [Icon: 🎤]          │   │
│  │                             │   │
│  │   2. Practice Speaking      │   │
│  │                             │   │
│  │   Record yourself. Get      │   │
│  │   instant feedback. Build   │   │
│  │   confidence.               │   │
│  └─────────────────────────────┘   │
│                                     │
│           ↓ 16px gap ↓              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │         [Icon: 🤖]          │   │
│  │                             │   │
│  │   3. Chat with AI           │   │
│  │                             │   │
│  │   Practice with an AI waiter,│   │
│  │   auto driver, or shopkeeper│   │
│  └─────────────────────────────┘   │
│                                     │
│           ↓ 16px gap ↓              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │         [Icon: 🎯]          │   │
│  │                             │   │
│  │   4. Use It IRL             │   │
│  │                             │   │
│  │   Complete real-world       │   │
│  │   missions. Actually speak  │   │
│  │   Kannada.                  │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Specifications:**
- **Background:** Warm off-white (#FFFBF5)
- **Padding:** 32px horizontal, 64px vertical
- **Card spacing:** 16px vertical gap
- **Icon size:** 48px
- **Cards hover:** Subtle lift (2px translate up)

---

### SECTION 4: FEATURES

```
┌─────────────────────────────────────┐
│                                     │
│   Why Learners Love NamaGO          │  ← H2: 32px bold
│                                     │
│  ─────────────────────              │
│                                     │
│  ✅ Bangalore-Focused               │  ← Feature list
│     Learn the Kannada you'll        │     18px + 16px
│     actually use in the city        │     24px line spacing
│                                     │
│  ✅ Short Lessons                   │
│     5-7 minutes. Perfect for        │
│     your commute                    │
│                                     │
│  ✅ Speaking Practice               │
│     Record yourself and get         │
│     instant feedback                │
│                                     │
│  ✅ AI Conversations                │
│     Practice real scenarios         │
│     with AI characters              │
│                                     │
│  ✅ Real-World Missions             │
│     Take your learning beyond       │
│     the screen                      │
│                                     │
│  ✅ Track Your Progress             │
│     Streaks, XP, and levels to      │
│     keep you motivated              │
│                                     │
└─────────────────────────────────────┘
```

**Specifications:**
- **Background:** Gradient (Warm off-white to light green tint)
- **Padding:** 32px horizontal, 64px vertical
- **Checkmark:** Karnataka green (#2D5F2E)
- **Feature spacing:** 32px vertical gap

---

### SECTION 5: DEMO PREVIEW

```
┌─────────────────────────────────────┐
│                                     │
│     See It In Action                │  ← H2: 32px bold
│                                     │
│  ─────────────────────              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │    [Screenshot/Demo GIF]    │   │  ← Phone mockup
│  │                             │   │     Aspect ratio: 9:19.5
│  │    Showing lesson UI or     │   │     Max-width: 280px
│  │    speaking practice        │   │     Shadow: Medium
│  │                             │   │     Border radius: 32px
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  "I learned how to order food in    │  ← Testimonial: 18px italic
│   Kannada in just 10 minutes!"      │
│                                     │
│      — Rahul, Software Engineer     │  ← 14px
│                                     │
└─────────────────────────────────────┘
```

**Specifications:**
- **Background:** Warm off-white (#FFFBF5)
- **Padding:** 32px horizontal, 64px vertical
- **Phone mockup:** Centered, subtle shadow
- **Demo type:** Animated GIF or video (max 5MB)

---

### SECTION 6: FINAL CTA

```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│    Ready to Speak Kannada?          │  ← H2: 36px bold
│                                     │
│  Join thousands learning Bangalore's│  ← Body: 18px
│          local language             │
│                                     │
│  ─────────────────────              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   Start Learning — It's     │   │  ← Primary CTA
│  │          Free               │   │     Same as hero
│  └─────────────────────────────┘   │
│                                     │
│    No credit card • No download     │  ← Reassurance: 14px
│         required                    │     Muted
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Specifications:**
- **Background:** Karnataka green (#2D5F2E)
- **Text color:** Warm off-white (#FFFBF5)
- **Padding:** 48px horizontal, 80px vertical
- **Text alignment:** Center
- **CTA button:** Inverted colors (white bg, green text)

---

### SECTION 7: FOOTER

```
┌─────────────────────────────────────┐
│                                     │
│  [Logo: NamaGO]                     │  ← 20px height
│                                     │
│  Learn Kannada. Live Bangalore.     │  ← Tagline: 14px
│                                     │
│  ─────────────────────              │
│                                     │
│  About                              │  ← Links: 16px
│  How It Works                       │     24px line height
│  FAQ                                │     Karnataka green
│  Privacy                            │
│  Terms                              │
│  Contact                            │
│                                     │
│  ─────────────────────              │
│                                     │
│  Follow Us                          │
│  [Twitter] [Instagram] [LinkedIn]   │  ← Social icons: 24px
│                                     │
│  ─────────────────────              │
│                                     │
│  Made with ❤️ in Bangalore          │  ← Small: 12px
│  © 2026 NamaGO                      │     Muted
│                                     │
└─────────────────────────────────────┘
```

**Specifications:**
- **Background:** Deep charcoal (#1A1A1A)
- **Text color:** Warm off-white (#FFFBF5)
- **Padding:** 32px horizontal, 48px vertical
- **Link hover:** Warm yellow underline

---

## DESKTOP DESIGN (1024px+)

### Key Differences from Mobile

**1. Hero Section - Side-by-Side Layout**
```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│  [Logo]                                    [Try Demo]     │  ← Header
│                                                           │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  LEFT SIDE (50%)           RIGHT SIDE (50%)              │
│                                                           │
│  Learn Kannada.            [Large Visual Element]        │
│  Live Bangalore.                                         │
│                            • Illustration                │
│  Short lessons. Real       • Phone mockup                │
│  conversations.            • Abstract animation          │
│  Kannada you can                                         │
│  actually use.             [Motion graphic showing       │
│                             app in use]                  │
│  [Start Learning]                                        │
│                                                           │
│  No downloads • 5 min                                    │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**2. How It Works - Horizontal Cards**
```
┌───────────────────────────────────────────────────────────┐
│                 How NamaGO Works                          │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │   📖     │  │   🎤     │  │   🤖     │  │   🎯     │ │
│  │  Learn   │  │ Practice │  │   Chat   │  │   Use    │ │
│  │ Phrases  │  │ Speaking │  │  with AI │  │  It IRL  │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
└───────────────────────────────────────────────────────────┘
```

**3. Features - Two Column Grid**
```
┌───────────────────────────────────────────────────────────┐
│              Why Learners Love NamaGO                     │
│                                                           │
│  LEFT COLUMN              RIGHT COLUMN                    │
│                                                           │
│  ✅ Bangalore-Focused      ✅ Real-World Missions        │
│  ✅ Short Lessons          ✅ Track Progress             │
│  ✅ Speaking Practice      ✅ AI Conversations           │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**Desktop Specifications:**
- **Max content width:** 1200px
- **Content centered:** Auto margins
- **Horizontal padding:** 80px
- **Section vertical padding:** 120px
- **Typography scale:** +10% from mobile
- **Hero height:** 100vh (full viewport)
- **Sticky header:** Optional with scroll

---

## DESIGN SYSTEM TOKENS

### Colors

```css
/* Primary Palette */
--color-primary: #2D5F2E;          /* Karnataka Green */
--color-primary-light: #4A8F4C;    /* Light Green */
--color-primary-dark: #1A3D1B;     /* Dark Green */

/* Accent Palette */
--color-accent: #F4B223;           /* Warm Yellow */
--color-accent-light: #FFD666;     /* Light Yellow */
--color-secondary: #D97652;        /* Terracotta/Coral */

/* Neutral Palette */
--color-background: #FFFBF5;       /* Warm Off-White */
--color-surface: #FFFFFF;          /* Pure White */
--color-surface-muted: #F5F3F0;    /* Warm Gray */
--color-text: #1A1A1A;             /* Deep Charcoal */
--color-text-muted: #666666;       /* Medium Gray */
--color-text-light: #999999;       /* Light Gray */

/* Semantic Colors */
--color-success: #4A8F4C;          /* Accessible Green */
--color-error: #D9534F;            /* Accessible Red */
--color-warning: #F4B223;          /* Warning Yellow */
--color-info: #5DADE2;             /* Info Blue */
```

### Typography

```css
/* Font Families */
--font-primary: 'Nunito', 'Noto Sans', -apple-system, sans-serif;
--font-kannada: 'Noto Sans Kannada', 'Tunga', serif;

/* Font Sizes - Mobile */
--text-display-mobile: 40px;
--text-h1-mobile: 32px;
--text-h2-mobile: 28px;
--text-h3-mobile: 20px;
--text-body-mobile: 16px;
--text-body-large-mobile: 18px;
--text-small-mobile: 14px;
--text-caption-mobile: 12px;

/* Font Sizes - Desktop */
--text-display-desktop: 56px;
--text-h1-desktop: 48px;
--text-h2-desktop: 36px;
--text-h3-desktop: 24px;
--text-body-desktop: 18px;
--text-body-large-desktop: 20px;
--text-small-desktop: 16px;
--text-caption-desktop: 14px;

/* Font Weights */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;

/* Line Heights */
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### Spacing

```css
/* Spacing Scale (4px base) */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### Border Radius

```css
/* Radius Scale */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 24px;
--radius-full: 9999px;

/* Component-Specific */
--radius-button: 16px;
--radius-card: 20px;
--radius-phone: 32px;
```

### Shadows

```css
/* Shadow Scale */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.12);

/* Component Shadows */
--shadow-button: 0 2px 8px rgba(45, 95, 46, 0.15);
--shadow-button-hover: 0 4px 12px rgba(45, 95, 46, 0.25);
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-card-hover: 0 8px 16px rgba(0, 0, 0, 0.12);
```

### Transitions

```css
/* Duration */
--duration-fast: 100ms;
--duration-normal: 200ms;
--duration-slow: 300ms;

/* Easing */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## COMPONENT SPECIFICATIONS

### Primary CTA Button

```css
.button-primary {
  /* Dimensions */
  height: 56px;
  padding: 0 32px;
  min-width: 200px;
  
  /* Typography */
  font-family: var(--font-primary);
  font-size: 18px;
  font-weight: var(--font-semibold);
  
  /* Colors */
  background: var(--color-primary);
  color: var(--color-background);
  
  /* Borders */
  border: none;
  border-radius: var(--radius-button);
  
  /* Effects */
  box-shadow: var(--shadow-button);
  transition: all var(--duration-normal) var(--ease-out);
  cursor: pointer;
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-button-hover);
}

.button-primary:active {
  transform: translateY(0);
  transition-duration: var(--duration-fast);
}

/* Responsive */
@media (max-width: 768px) {
  .button-primary {
    width: 100%;
    max-width: 400px;
  }
}
```

**States:**
- **Default:** Karnataka green with shadow
- **Hover:** Lift 2px up, increase shadow
- **Active:** Compress back down (80-120ms)
- **Focus:** 3px yellow outline for keyboard navigation
- **Disabled:** 50% opacity, no pointer events

---

### Feature Card

```css
.feature-card {
  /* Layout */
  padding: var(--space-6);
  
  /* Background */
  background: var(--color-surface);
  
  /* Borders */
  border-radius: var(--radius-card);
  
  /* Effects */
  box-shadow: var(--shadow-card);
  transition: all var(--duration-normal) var(--ease-out);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.feature-card-icon {
  font-size: 48px;
  margin-bottom: var(--space-4);
}

.feature-card-title {
  font-size: var(--text-h3-mobile);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-2);
  color: var(--color-text);
}

.feature-card-description {
  font-size: var(--text-body-mobile);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-muted);
}
```

---

### Logo

```css
.logo {
  /* Container */
  display: flex;
  align-items: center;
  gap: var(--space-2);
  
  /* Mobile */
  height: 24px;
}

.logo-icon {
  /* SVG or image */
  height: 100%;
  width: auto;
}

.logo-text {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: var(--font-extrabold);
  color: var(--color-primary);
  letter-spacing: -0.5px;
}

/* Desktop */
@media (min-width: 1024px) {
  .logo {
    height: 32px;
  }
  
  .logo-text {
    font-size: 24px;
  }
}
```

---

### Section Container

```css
.section {
  /* Spacing */
  padding: var(--space-16) var(--space-6);
  
  /* Layout */
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

/* Desktop */
@media (min-width: 1024px) {
  .section {
    padding: var(--space-24) var(--space-20);
    max-width: 1200px;
  }
}
```

---

## INTERACTIONS & ANIMATIONS

### Page Load Animation

```
1. Hero section fades in (300ms)
2. Headline slides up (200ms, 100ms delay)
3. Subtext fades in (200ms, 200ms delay)
4. CTA button scales in (300ms spring, 300ms delay)
5. Visual element animates in (400ms, 400ms delay)
```

**Implementation:**
- Use CSS keyframes + animation-delay
- Respect prefers-reduced-motion
- Fallback: instant display

---

### Scroll Animations

**Section Enter:**
- Fade up 20px + opacity 0→1
- Duration: 400ms
- Easing: ease-out
- Trigger: When 20% of section enters viewport

**Cards Stagger:**
- Each card delays +100ms from previous
- Same fade-up animation
- Creates cascading effect

**Implementation:**
- Intersection Observer API
- Add `.is-visible` class when in view
- CSS handles transition

---

### Button Micro-Interactions

**Primary CTA:**
1. **Idle:** Subtle pulse animation (scale 1.0 → 1.02 → 1.0, 2s loop)
2. **Hover:** Lift up 2px, shadow grows
3. **Press:** Compress down, 80ms
4. **Release:** Spring back, 120ms

**Secondary Links:**
1. **Idle:** Underline hidden
2. **Hover:** Underline slides in from left (200ms)
3. **Focus:** Outline appears

---

### Mobile Touch Feedback

```css
.interactive {
  -webkit-tap-highlight-color: rgba(45, 95, 46, 0.1);
  user-select: none;
}

.interactive:active {
  opacity: 0.8;
  transform: scale(0.98);
  transition: all 80ms ease-out;
}
```

---

## ACCESSIBILITY REQUIREMENTS

### Color Contrast
- **AA Standard:** All text meets WCAG 2.1 AA (4.5:1 for normal, 3:1 for large)
- **AAA Target:** Primary content aims for AAA (7:1)

**Contrast Ratios:**
- Primary green on off-white: 5.8:1 ✓
- Charcoal on off-white: 12.5:1 ✓
- White on primary green: 6.2:1 ✓

---

### Keyboard Navigation

**Requirements:**
1. All interactive elements focusable
2. Logical tab order (top to bottom)
3. Visible focus indicators (3px yellow outline)
4. Skip to main content link
5. Enter/Space activates buttons
6. Escape closes any modals

**Focus Styles:**
```css
*:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}
```

---

### Screen Readers

**Semantic HTML:**
```html
<header role="banner">
<nav role="navigation" aria-label="Main">
<main role="main">
<section aria-labelledby="features-heading">
<footer role="contentinfo">
```

**ARIA Labels:**
- Logo link: `aria-label="NamaGO Home"`
- CTA button: `aria-label="Start learning Kannada"`
- Social icons: `aria-label="Follow us on Twitter"`

**Image Alt Text:**
- Decorative: `alt=""` or `role="presentation"`
- Meaningful: Descriptive alt text
- Icons: `aria-hidden="true"` with text label

---

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Fallbacks:**
- Animations instantly complete
- Parallax effects disabled
- Scroll-based animations removed
- Essential state changes remain visible

---

### Touch Targets

**Minimum Sizes:**
- Buttons: 44x44px (iOS/Android standard)
- Links: 44px height
- Icons: 44px tap area (even if visual is smaller)

**Spacing:**
- 8px minimum between targets
- 16px preferred for comfortable tapping

---

### Performance Budget

**Targets:**
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1

**Optimizations:**
- Hero image: WebP format, <200KB
- Inline critical CSS
- Defer non-critical JS
- Lazy load below-fold images
- Preconnect to external domains

---

## RESPONSIVE BREAKPOINTS

```css
/* Mobile First Approach */

/* Small Mobile */
@media (min-width: 320px) { }

/* Mobile */
@media (min-width: 480px) { }

/* Tablet */
@media (min-width: 768px) {
  /* Two-column layouts start */
  /* Larger typography */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Max-width containers */
  /* Side-by-side hero */
  /* Horizontal cards */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Increased whitespace */
  /* Larger max-widths */
}
```

---

## IMPLEMENTATION CHECKLIST

### HTML Structure
- [ ] Semantic HTML5 elements
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] ARIA labels where needed
- [ ] Meta tags (viewport, description, OG tags)
- [ ] Favicon and touch icons

### CSS
- [ ] Design tokens as CSS variables
- [ ] Mobile-first media queries
- [ ] Flexbox/Grid layouts
- [ ] Reduced motion support
- [ ] Focus styles
- [ ] Print stylesheet (optional)

### JavaScript
- [ ] Scroll animations (Intersection Observer)
- [ ] Smooth scroll to sections
- [ ] CTA click tracking (analytics)
- [ ] Form validation (if sign-up added)
- [ ] No JS required for core functionality

### Performance
- [ ] Optimized images (WebP)
- [ ] Lazy loading
- [ ] Minified CSS/JS
- [ ] Critical CSS inlined
- [ ] Font loading strategy

### Testing
- [ ] Mobile devices (iOS Safari, Chrome)
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Keyboard navigation
- [ ] Screen reader (VoiceOver/NVDA)
- [ ] Color contrast checker
- [ ] Lighthouse audit (>90 scores)

---

## DESIGN ASSETS NEEDED

### Graphics
1. **Logo:**
   - SVG format
   - Horizontal and vertical versions
   - Monochrome version
   - Favicon (16x16, 32x32, 192x192)

2. **Hero Visual:**
   - Abstract illustration
   - 800x600px minimum
   - Karnataka green accent
   - Transparent PNG or SVG

3. **Icons:**
   - 48x48px for feature cards
   - Emoji or custom SVG
   - Consistent style

4. **Phone Mockup:**
   - High-res screenshot (1170x2532)
   - Or animated GIF/video
   - Clean, uncluttered

### Typography
- **Google Fonts:** Nunito (400, 600, 700, 800)
- **Noto Sans Kannada** for script support

### Images
- Hero section illustration
- Demo/preview mockup
- Optional: Team photo or Bangalore photo

---

## FINAL NOTES

### Core Message Hierarchy
1. **What:** Learn Kannada
2. **How:** Short lessons, speaking, AI, missions
3. **Why:** Live comfortably in Bangalore
4. **Who:** Newcomers, students, professionals
5. **When:** Start now (free, 5 minutes)

### Conversion Optimization
- Primary CTA appears 3 times (hero, mid-page, footer)
- Every section answers "Why should I continue?"
- Social proof early (above fold if possible)
- Clear benefits over features
- Zero friction (no download, no payment)

### Brand Personality
- **Voice:** Friendly but capable, local but welcoming
- **Tone:** Encouraging, practical, modern
- **Feel:** Confident simplicity, thoughtful minimalism

---

**The landing page should answer in 5 seconds:**
1. What is this? (Kannada learning app)
2. Is this for me? (Bangalore newcomers)
3. What do I do? (Click Start Learning)

If a visitor can't answer these, simplify further.

---

END OF LANDING PAGE SPECIFICATION
