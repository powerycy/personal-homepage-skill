# Cinematic Scroll Personal Brand Template

Use this template when the user asks for a personal homepage with references such as:

- WISA-style landing page
- dark cinematic minimal landing page
- premium black video-background homepage
- scroll-driven video background
- Manrope + JetBrains Mono
- glassmorphism footer
- fewer decorative cyber cards, more film-like layout

This template exists because the default 3D Tech / Motion Gradient / Cyber Orb directions can look too noisy or generic for premium personal-brand pages. When the user provides a detailed cinematic reference, preserve its structure instead of inventing a new visual system.

## Core Principle

Strictly migrate the reference structure, then replace content with the person's identity. Do not reinterpret it as neon cyberpunk, bento-heavy, dashboard UI, terminal UI, or generic Linktree.

## Visual Signature

- Pure black or near-black base.
- Fixed full-screen video or cinematic abstract background.
- Large sparse typography.
- Minimal color accents; mostly white and translucent white.
- 90% viewport-width layout rhythm.
- Clamp-based typography and spacing.
- Glassmorphism used only for nav, CTA surfaces, footer, and modal layers.
- Motion feels editorial and cinematic, not playful.

## Recommended Structure

```text
0. Loading screen
1. Fixed video background layer
2. Fixed header with glass nav
3. Hero screen, 12-column / 2-row grid
4. 200px spacer
5. ScrollReveal statement section
6. 3-column supporting grid
7. 200px spacer
8. Glassmorphism footer / follow card
9. QR modal for platform links if needed
```

Do not add dense project-card grids unless the user explicitly asks. Projects can live in the 3-column grid and footer links.

## Best-Fit Use Cases

- AI engineer / AI creator personal brand pages.
- Founder, consultant, or creator pages where premium trust matters more than showing many cards.
- Unified social-link pages that should feel like a cinematic landing page rather than a Linktree.
- Users who provide a concrete high-quality landing page reference and say to follow it strictly.

## Stack

Default to the user's requested stack when provided. For the proven WISA-style implementation:

```text
react ^19.0.0
react-dom ^19.0.0
motion ^12.23.24
gsap ^3.14.2
lucide-react ^0.546.0
tailwindcss ^4.1.14
@tailwindcss/vite ^4.1.14
@vitejs/plugin-react ^5.0.4
vite ^6.2.0
```

Use `motion/react` for viewport reveals and header transforms. Use GSAP ScrollTrigger for word-by-word scroll reveal.

## Required Interaction Patterns

### Scroll-driven video

- Fixed video background behind all content.
- Map scroll progress from top to footer start.
- Guard video scrubbing with `video.seeking` before assigning `currentTime` to prevent tearing and frame flicker.
- Add a loading screen until `canplaythrough`.

### Header

- Fixed header at top, `w-[90%]`, centered.
- Motion transform slides header upward after scroll.
- Right nav uses glass background and mono labels.
- Nav item hover uses vertical fly-out / fly-in text animation.

### CTA Button

- Two-part button: text surface + arrow surface with 1px gap.
- Default background: `bg-white/8 backdrop-blur-[80px]`.
- Hover: white background, black text.
- Arrow uses horizontal fly-out / fly-in animation.

### ScrollReveal

- Word-by-word reveal.
- Base opacity around `0.1`.
- Optional blur from `4px` to `0px`.
- Rotation from `3deg` to `0deg`.
- Use scrubbed ScrollTrigger animation.

### Footer

- Glass card with:
  - `backgroundColor: rgba(26, 26, 26, 0.6)`
  - `backdropFilter: blur(80px)`
  - `border: 1px solid rgba(255,255,255,0.1)`
  - `padding: clamp(32px, 4vw, 64px)`
- Top CTA section with large heading and two-part button.
- Link grid: Brand / Projects / Platforms / Connect.
- Copyright bar.

## Content Mapping for Personal Homepages

| Reference Slot | Personal Homepage Slot |
| --- | --- |
| WISA logo | Person wordmark / nickname logo |
| Sports headline | Name + personal positioning |
| Sports description | 1-2 sentence personal intro |
| Explore CTA | Follow / Contact / View GitHub |
| Program statement | About / worldview / credibility statement |
| 3-column grid | Identity tags, projects, content platforms |
| Company/services/connect footer | Brand, Projects, Platforms, Connect |

## Anti-Patterns

Avoid these when this template is selected:

- Random neon orbs replacing the video-led composition.
- Dense bento grids in the hero.
- Floating 3D cards as the primary visual memory point.
- Dashboard panels, terminal panels, or system maps.
- Too many bright colors.
- Over-rounded cards and heavy shadows.
- Centering every section.
- Adding sections beyond the requested 3-5 screen rhythm.

## Proven Example

The `curious-xiaoyi-homepage` implementation created in this project is the reference-quality example:

```text
curious-xiaoyi-homepage/
├── package.json
├── vite.config.ts
├── index.html
└── src/
    ├── App.tsx
    ├── index.css
    └── components/
        ├── ScrollReveal.tsx
        └── ScrollReveal.css
```

When asked to create a similar page, reproduce the same structure and adapt content, links, and CTA labels. Do not redesign the visual system unless the user asks for a different style.
