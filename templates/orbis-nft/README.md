# Orbis NFT Space Landing Prompt Template

Use this template when the user explicitly provides, asks to reuse, or asks to adapt the `Orbis.Nft` dark space NFT landing page prompt. It is a high-impact visual reference for a person-led project, creator drop, collectible/IP page, or portfolio project showcase. Do not use it as the default for ordinary personal resumes or SaaS pages.

## Source Prompt Summary

Create a four-section landing page called `Orbis.Nft` with a dark space theme, CloudFront video backgrounds, liquid-glass UI, Anton headings/nav, Condiment script accents, monospace body copy, deep navy background, cream text, and neon green accent details.

## When To Select

- The user provides this exact prompt or asks for an NFT / collectible / digital object landing page.
- The page is a personal project, creator collection, artist drop, IP showcase, or portfolio proof page.
- The user wants a dark cinematic page with full-bleed video, liquid glass, and oversized condensed typography.

## When Not To Select

- Normal resume, job-seeking, consultant, or developer homepage requests.
- Generic company SaaS landing pages.
- Cases where the user has no rights to the requested video, texture, NFT, or collectible assets.

## Visual System

### Fonts

- `Anton`: headings, logo, navigation, CTA display text. Alias as `font-grotesk`.
- `Condiment`: cursive accent and overlay words. Alias as `font-condiment`.
- System monospace: paragraphs, labels, rarity metadata.

Load in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Condiment&display=swap" rel="stylesheet">
```

### Colors

```js
colors: {
  background: '#010828',
  cream: '#EFF4FF',
  neon: '#6FFF00',
}
```

### Liquid Glass Effect

Use `.liquid-glass` on the navbar, social icon buttons, NFT cards, and card overlays.

```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.45) 0%,
    rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%,
    rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%,
    rgba(255,255,255,0.45) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### Texture Overlay

Add a fixed full-screen texture overlay above the page:

- `z-index: 50`
- `pointer-events: none`
- `background-image: url('/texture.png')`
- `background-size: cover`
- `mix-blend-mode: lighten`
- `opacity: 0.6`

If `/texture.png` is missing, create a CSS grain fallback or ask the user for an authorized texture asset. Do not reference a fake texture URL.

## Section Blueprint

### 1. Hero

- Full viewport.
- Full-bleed looping muted autoplay video with `object-cover`.
- `max-w-[1831px]` centered container.
- Section clips the video with `rounded-b-[32px]`.
- Header:
  - Left logo: `Orbis.Nft`, Anton, 16px, uppercase.
  - Center nav: liquid glass, `rounded-[28px]`, `px-[52px] py-[24px]`, hidden below `lg`.
  - Links: Homepage, Gallery, Buy NFT, FAQ, Contact.
- Main heading:
  - Anton uppercase.
  - Responsive size: 40px mobile, 60px `sm`, 75px `md`, 90px `lg`.
  - Copy:

```text
Beyond earth
and ( its ) familiar boundaries
```

- Accent: `Nft collection` in Condiment, neon, absolute right of heading, slight rotate, `mix-blend-exclusion`.
- Social buttons:
  - Desktop: top-right vertical stack, 56px square buttons, Mail/Twitter/Github from `lucide-react`.
  - Mobile: centered horizontal row below heading.

### 2. About / Intro

- Full viewport.
- Full-bleed looping muted autoplay video with `object-cover`.
- Top row:
  - Left heading: `Hello! I'm orbis`, Anton uppercase, 32px-60px.
  - Overlay `Orbis` in Condiment neon with `mix-blend-exclusion`.
  - Right monospace uppercase paragraph, 14px-16px, max width 266px.
- Bottom row:
  - Two decorative text columns with repeated low-opacity monospace copy.
  - Hide right column below `lg`.

### 3. Collection Grid

- Solid `#010828` background.
- Header:
  - Left heading: `Collection of` plus indented `Space objects`; `Space` uses Condiment neon.
  - Right CTA: `SEE ALL CREATORS` with large `SEE`, stacked smaller words, and neon underline bar.
- Grid:
  - Desktop: 3 columns.
  - Tablet: 2 columns.
  - Mobile: 1 column.
  - Gap: 24px.
- NFT card:
  - `.liquid-glass`, `rounded-[32px]`, 18px padding, hover `bg-white/10`.
  - Square video area with rounded 24px clipping.
  - Bottom overlay bar with rarity label, score value, and circular purple gradient arrow button.

### 4. CTA / Final Section

- Full-width video rendered as `w-full h-auto block`, not `object-cover`.
- Absolute right-aligned text block over video.
- Condiment `Go beyond` neon accent at the top-left of the heading block.
- Anton uppercase CTA:

```text
JOIN US.
REVEAL WHAT'S HIDDEN.
DEFINE WHAT'S NEXT.
FOLLOW THE SIGNAL.
```

- Bottom-left vertical social icon rail with liquid-glass container and responsive button dimensions.

## Default Video Slots

These are the CloudFront video slots from the user-provided prompt.

Use these URLs only when the user explicitly provided or authorizes this template prompt for the current project:

```text
Hero: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4
Intro: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4
Card 1: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4
Card 2: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4
Card 3: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4
CTA: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4
```

If the project is not literally `Orbis.Nft`, replace all brand text, collection names, nav labels, scores, and asset URLs with the user's authorized content.

## Implementation Stack

- React + TypeScript + Vite.
- Tailwind CSS.
- `lucide-react` for Mail, Twitter, Github.
- No additional packages required.
- All videos must use `autoPlay loop muted playsInline`.
- Build mobile-first with `sm`, `md`, and `lg` breakpoints.
- Preserve `prefers-reduced-motion` support by pausing nonessential animation and avoiding surprise motion.

## Adaptation Rules

- Keep the four-section structure unless the user asks for a shorter hero-only variant.
- Preserve the font contrast: Anton for blunt display, Condiment for neon script accents, mono for metadata.
- Preserve the deep navy / cream / neon palette unless the user provides a brand palette.
- Keep the page visual-first, but include enough project context to answer who made it, what it is, and what action to take next.
- Do not invent rarity scores, collection stats, prices, blockchain details, or social links.
- For personal-homepage use, frame the NFT collection as the person's project proof, not as an anonymous marketplace.
