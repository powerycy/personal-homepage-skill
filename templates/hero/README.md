# Hero — Cinematic Neural-AI Landing Template

Use this template when the user wants a dark, cinematic, full-viewport personal project page with a futuristic neural-AI / cyberpunk aesthetic. It includes the original SynapseX video set, mouse-scrubbed hero video, scramble text animations, 3D perspective scroll, and a monospace-driven visual identity. Users may keep the originals or replace individual sources in `videos.ts`; CSS fallbacks remain available for loading failures and reduced-motion users.

## Open Or Share The Portable Version

The ready-to-share version is in `portable/` and follows the same structure as the user's other homepage templates:

```text
portable/
├── index.html
├── 使用说明.txt
└── assets/
    ├── hero.js
    ├── hero.css
    ├── images/
    └── videos/
```

Double-click `portable/index.html`; it works from `file://` without Node.js, npm, Vite, or a local server. When sharing, compress and send the **entire `portable` folder**, not `index.html` alone. The recipient can unzip it and double-click `index.html` directly. Video and image attachments remain separate so users can identify and replace them.

Regenerate the portable folder after changing source code or content:

```bash
npm run build:hero-portable
```

## Run The Development Preview

From the Skill root, install dependencies and run the Vite development server, then open `/templates/hero/preview.html`.

```bash
npm install
npm run dev
```

The root build includes this preview as a second Vite entry. Edit `content.ts` first when adapting identity and contact information. The original media is stored under `assets/`; edit `videos.ts` when replacing one or more sources.

## When To Select

- The user asks for a "SynapseX-style" page, dark cinematic landing, or futuristic neural-AI interface.
- The user wants full-viewport video backgrounds with black background and white text.
- The user wants mouse-driven video scrubbing, scramble text reveals, and smooth scroll.
- The page is a person-led AI product showcase, tech product landing, or sci-fi portfolio.
- The user mentions Space Mono / Anton-style typography or a monospace visual identity; self-host those fonts when specifically required.

## When Not To Select

- Light-themed or colorful homepage requests.
- Traditional resume or job-seeking pages.
- E-commerce or SaaS dashboard pages.
- Pages where video backgrounds are not desired or bandwidth is a concern.

## Visual System

### Fonts

- `SF Mono` / `ui-monospace`: all body text, headings, and UI labels, with CJK-capable fallbacks.
- `Avenir Next Condensed` / `Impact`: oversized watermark text only (e.g. background ghost text).

The default preview intentionally avoids remote font requests. If the user supplies licensed local webfonts, self-host them and update `index.css`:

```css
@font-face { font-family: 'Your Mono'; src: url('./assets/your-mono.woff2') format('woff2'); font-display: swap; }
```

### Colors

```js
colors: {
  background: '#000000',    // pure black
  text: '#ffffff',           // pure white
  textDim: 'rgba(255,255,255,0.4)',
  textFaint: 'rgba(255,255,255,0.25)',
  glass: 'rgba(255,255,255,0.15)',
  glassBorder: 'rgba(255,255,255,0.10)',
}
```

### Typography Scale

- Hero heading: `clamp(40px, 10vw, 100px)`, `font-light`, `tracking-[-0.03em]`, `leading-[0.95]`
- Section heading: `clamp(36px, 8vw, 72px)`, `font-light`
- Body text: `13px` mobile, `15px` desktop, `text-white/60`
- Watermark: `clamp(120px, 30vw, 521px)`, condensed display stack, `opacity: 0.1`
- Metrics: `clamp(48px, 10vw, 96px)`, `font-light`

### Smooth Scroll

Uses `Lenis` with `duration: 1.2`, `smoothWheel: true`, `touchMultiplier: 1.5`. Skipped when `prefers-reduced-motion` is active.

## Section Blueprint

### 1. Hero (Mouse-Scrubbed Video)

- Full viewport (`h-screen` / `100dvh`).
- An optional background video is **paused** and scrubbed by horizontal mouse movement (delta-based, sensitivity 0.8). Coarse pointers and reduced-motion users get the static CSS fallback.
- Dot grid overlay (`radial-gradient`, 24px grid, `opacity: 0.05`).
- Large watermark text behind content (condensed display stack, radial gradient clip, `opacity: 0.1`).
- ScrambleIn text reveals for heading words with staggered delays (200ms, 500ms, 700ms, 1000ms).
- Bottom row: left column (heading + paragraph), right column (heading).
- Entrance gate: 800ms delay after mount before content fades in.

### 2. Cinematic Text (3D Perspective Scroll)

- Full viewport.
- Auto-playing looped muted video background.
- Top gradient overlay (`linear-gradient` from `#010103` to transparent, 180px).
- Centered paragraph text with `rotateX(24deg)` 3D perspective transform.
- Scroll-driven `translateY` (60px to -120px) and opacity (0 to 1) via Framer Motion `useScroll` + `useSpring`.
- `transformPerspective: 400`.

### 3. Metrics (Full-Screen Video + Data Grid)

- Full viewport.
- Full-bleed auto-playing looped muted video with `object-cover`.
- Centered heading "Performance Metrics" (uppercase, `tracking-[0.2em]`, `text-white/40`). Default values are visibly marked `TBD`; replace them only with verified data.
- 3-column grid of metric values (`clamp(48px, 10vw, 96px)`, `font-light`) and labels.
- Staggered entrance animation (0.15s delay per item).

### 4. Technology (Video Background + Feature Cards)

- Full viewport.
- Full-bleed auto-playing looped muted video with `object-cover`.
- Top row: left heading ("Adaptive Intelligence", two-line, `clamp(36px, 8vw, 72px)`) + right paragraph.
- Bottom 4-column grid of feature cards (title + description).
- Staggered entrance animations.

### 5. Architecture (Layer Cards)

- Full viewport, centered content.
- Pure black background (no video).
- Centered heading block: uppercase label, heading, paragraph.
- 3 stacked layer cards (72px height, `border border-white/10`, `rounded-lg`).
- Each card: layer index (left, uppercase, dim) + layer name (right, `font-light`).

### 6. Footer (Portrait + Social Links)

- Split layout: left portrait, right content.
- Portrait: static image with radial gradient mask (edge fade into black), radial glow background, brightness/contrast filter, Framer Motion scale+fade entrance.
- Content: logo + brand name, description paragraph, social links row, copyright.
- Social links: pill-shaped buttons with inline SVG brand icons (Feishu, Douyin, X, GitHub, Instagram, YouTube), ScrambleText on hover, motion scale on hover/tap.

## Custom Components

### ScrambleIn

Entrance reveal animation. After a delay, runs an interval (25ms) revealing characters left-to-right at 0.5 chars per frame. Unrevealed chars show random chars up to 3 positions ahead. Spaces always render as spaces.

Props: `text: string`, `delay: number`, `triggered: boolean`.

### ScrambleText

Hover-driven scramble. On hover: scrambles all chars, then reveals left-to-right at 4 frames per char (25ms interval). On unhover: resets to original text.

Props: `text: string`, `isHovered: boolean`, `className?: string`.

### SynapseXLogo

4-fold rotationally symmetric abstract SVG mark. Each quadrant is the same path rotated 0/90/180/270 degrees. ViewBox `-50 -50 100 100`.

Props: `size?: number` (default 18), `className?: string`, `color?: string` (default `currentColor`).

### SquashHamburger

3-bar animated hamburger that morphs into an X. Spring animation (stiffness 300, damping 20). Desktop: 18x12px, 1.5px bars. Mobile: 15x10px, 1.2px bars.

Props: `open: boolean`, `mobile?: boolean`, `color?: string` (default `#fff`).

### Navbar

Fixed top navbar with glass pills. Desktop: logo pill + expanding menu capsule (hamburger + nav links) + download button. Mobile: collapsing logo + expanding menu capsule + small download button. Uses ScrambleText for nav link hover, Lenis for smooth scroll-to navigation.

### SocialLinks

Row of social media pill buttons. Each uses inline SVG brand icons, ScrambleText on hover, Framer Motion scale animations. Supports: Feishu, Douyin, X, GitHub, Instagram, YouTube.

## Implementation Stack

- React 18 + TypeScript
- Vite 5.4
- Tailwind CSS 3.4
- Framer Motion 12
- Lenis 1.1 (smooth scroll)
- Bootstrap Icons (Apple icon only)

### package.json dependencies

```json
{
  "dependencies": {
  "framer-motion": "^12.43.0",
  "lenis": "^1.3.26",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.6.3",
    "vite": "^6.0.7"
  }
}
```

### tailwind.config.js

```js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SFMono-Regular', 'SF Mono', 'ui-monospace', 'PingFang SC', 'monospace'],
        serif: ['SFMono-Regular', 'SF Mono', 'ui-monospace', 'Songti SC', 'serif'],
        mono: ['SFMono-Regular', 'SF Mono', 'ui-monospace', 'PingFang SC', 'monospace'],
        display: ['Avenir Next Condensed', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## Video Configuration

All default video sources resolve to bundled assets in `videos.ts`:

```typescript
export const VIDEOS = {
  hero: new URL('./assets/videos/hero.mp4', import.meta.url).href,
  cinematicText: new URL('./assets/videos/cinematic-text.mp4', import.meta.url).href,
  metrics: new URL('./assets/videos/metrics.mp4', import.meta.url).href,
  technology: new URL('./assets/videos/technology.mp4', import.meta.url).href,
  footer: new URL('./assets/videos/footer.mp4', import.meta.url).href,
} as const
```

Hero video is mouse-scrubbed (paused, not auto-playing). The other bundled section videos use muted looping playback only while their section is visible, reducing mobile CPU use; playback retries after the first pointer interaction when browser policy blocks autoplay. Reduced-motion users see the static fallback/poster. The final Trae source uses `portrait.jpg` for the footer by default. Set `TEMPLATE_OPTIONS.footerMedia` to `video` to use the bundled legacy `footer.mp4` variant instead. See `assets/README.md` for provenance and checksums.

## Adaptation Rules

- Keep the six-section structure (Hero, Cinematic Text, Metrics, Technology, Architecture, Footer) unless the user asks for fewer sections.
- Preserve the pure black (`#000`) background and white text palette.
- Keep the monospace-led identity and CJK-capable fallbacks; self-host any non-system webfonts.
- Keep the ScrambleIn / ScrambleText animation system for headings and nav links.
- Keep the mouse-scrub video interaction in the Hero section.
- Keep Lenis smooth scroll with reduced-motion fallback.
- Replace brand name, product description, metrics values, feature names, and social links with the user's content.
- Start with `content.ts`; never ship the example name, email, or copyright unchanged.
- Keep the bundled originals or replace video sources with the user's authorized assets. Do not invent video URLs.
- If the user provides a portrait image for the Footer, apply the radial gradient mask and background glow for edge blending.
- Keep `prefers-reduced-motion` support by pausing nonessential animation.
