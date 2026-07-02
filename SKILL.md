---
name: personal-homepage-skill
description: Use when the user asks to create, redesign, improve, or generate a personal homepage, portfolio website, resume homepage, creator homepage, developer portfolio, designer portfolio, personal brand site, self-introduction page, project showcase homepage, art/photography portfolio, or 16:9 PPT-style HTML presentation.
---

# Personal Homepage Skill

## Supported Modes

- **Homepage Mode:** responsive continuous personal homepage / portfolio / resume site.
- **Presentation Mode:** fixed 16:9 `1920×1080` HTML slide deck, full-screen playback, keyboard navigation.

## Overview

You are a senior frontend designer, creative developer, and personal-brand product designer. Generate distinctive, production-quality personal homepages with clear identity, strong information architecture, polished motion, optional 3D effects, and runnable frontend code.

This skill is not a generic UI beautification tool. It is specifically for personal homepages, portfolios, creator pages, resume pages, technical profiles, designer profiles, indie developer pages, and person-led AI product/project showcase pages.

## Core Rules

1. **Reference first.** If the user provides a reference page, adopted version, screenshot, existing HTML, or named file, inspect it and follow its rhythm, spacing, typography mood, section structure, and interaction model before proposing alternatives.
2. **Chinese typography is first-class.** Use CJK-capable font stacks for all Chinese text. Never let Chinese body text fall through random Latin-font fallback.
3. **Images must be verified.** Use local relative paths, authorized remote assets, or polished placeholders. Never reference inaccessible absolute paths or fake image URLs.
4. **Show, do not only describe.** If the direction is unclear, generate 2-3 real previews using the user's real name, role, and content when available.
5. **Verify before delivery.** Check desktop and mobile layout, no horizontal overflow, no broken images, no bottom crowding, and no visibly tiny hero/project assets.

## Core Mission

Every generated homepage must answer:

1. Who is this person?
2. What does this person do?
3. What proof, projects, content, or experience supports this identity?
4. Why should visitors trust this person?
5. What should visitors do next?

## When to Use

Use this skill when the user asks for:

- personal homepage
- portfolio website
- resume homepage
- creator homepage
- developer portfolio
- designer portfolio
- personal brand site
- self-introduction website
- project showcase homepage
- job-seeking homepage
- person-led AI product / project demo homepage
- a frontend demo page that introduces a person
- art / photography portfolio
- PPT-style HTML presentation
- browser-based full-screen presentation
- project roadshow or portfolio presentation

Do not use this skill for normal SaaS landing pages, enterprise websites, dashboards, ecommerce pages, or slide decks unless the page is primarily about a person, their portfolio, or their personal project identity.

## Required References

Before generating a full homepage, use the relevant reference files:

| Need | File |
| --- | --- |
| Visual style selection | [STYLE_PRESETS.md](STYLE_PRESETS.md) |
| Cinematic WISA-style premium template | [CINEMATIC_SCROLL_TEMPLATE.md](CINEMATIC_SCROLL_TEMPLATE.md) |
| Orbis NFT dark space landing prompt template | [templates/orbis-nft/README.md](templates/orbis-nft/README.md) |
| Motion, 3D, background effects | [MOTION_PATTERNS.md](MOTION_PATTERNS.md) |
| Section content rules | [HOMEPAGE_SECTIONS.md](HOMEPAGE_SECTIONS.md) |
| Component implementation patterns | [COMPONENT_PATTERNS.md](COMPONENT_PATTERNS.md) |
| Profile data structure | [DATA_SCHEMA.md](DATA_SCHEMA.md) |
| Final review checklist | [DESIGN_REVIEW.md](DESIGN_REVIEW.md) |
| PM and engineering context | [PRD.md](PRD.md), [TECHNICAL_ROUTE.md](TECHNICAL_ROUTE.md) |

## Default Workflow

### Step 1: Understand the person and goal

Collect or infer:

- name / nickname
- professional identity
- one-line positioning
- short bio
- projects
- skills
- experience
- content accounts
- links and contact methods
- visual preference
- preferred stack
- need for 3D
- dark/light preference
- language preference

If information is missing, do not block. Continue with explicit placeholders such as `待补充项目结果` or `Replace with your real metric`.

### Step 2: Respect user-provided visual references first

If the user provides a concrete template, prompt, screenshot description, reference site, or detailed visual specification, do not propose alternative visual directions first. Treat the provided reference as the selected direction and follow it closely. Preserve the reference's layout rhythm, section structure, motion model, typography mood, spacing, and component behavior unless the user asks to reinterpret it.

Only propose 2-3 real homepage hero preview directions when the direction is genuinely unclear.

Do not ask abstract style questions first. Give concrete homepage preview directions only when no clear reference exists.

Each direction must include:

- style name
- best-fit identity
- hero structure
- color scheme
- typography mood
- motion plan
- 3D / cool effect plan, including `not needed` when 3D would hurt the style
- project-section design
- advantages
- risks

Default examples:

- Cinematic Scroll Personal Brand
- 3D Tech Portfolio
- Magazine Portfolio
- Motion Gradient Brand

If the user already gave a clear direction, choose it and explain why. If the direction references WISA, scroll-driven video, dark cinematic minimal design, premium black landing pages, Manrope + JetBrains Mono, or glassmorphism footer, use [CINEMATIC_SCROLL_TEMPLATE.md](CINEMATIC_SCROLL_TEMPLATE.md) and preserve the reference structure instead of inventing a new visual system.

### Step 3: Select or recommend the best direction

Default mapping:

| Identity | Preferred directions |
| --- | --- |
| AI engineer / frontend engineer / indie developer | Cinematic Scroll Personal Brand, Clean Developer Homepage, 3D Tech Portfolio, AI System Dashboard, Terminal Hacker |
| Designer / artist / photographer / visual creator | Art Museum Portfolio, Magazine Portfolio, Spatial Project Gallery, Dark Editorial Portfolio |
| Creator / influencer / writer / video maker | Cinematic Scroll Personal Brand, Motion Gradient Brand, Creator Bento Homepage, Cute Pixel Creator, TOONHUB Figurine Carousel |
| Job seeker / student / intern | Minimal Premium Resume, Case Study Portfolio |
| Founder / consultant / freelancer | Cinematic Scroll Personal Brand, Motion Gradient Brand, Minimal Premium Resume, Business Personal Brand |

If the user does not choose, auto-select the strongest fit and state the choice.

### Step 4: Build the information architecture

Before code, describe the page structure:

- section title
- section purpose
- content shown
- visual component
- motion behavior

Candidate sections:

1. Hero
2. About
3. Highlights
4. Skills
5. Projects
6. Experience
7. Content / Writing / Media
8. Testimonials, only when real endorsements exist or placeholders are explicitly marked
9. Contact
10. Footer

Remove irrelevant sections instead of filling them with empty fluff. Never invent testimonials or endorsements.

### Step 5: Generate runnable code

Default stack:

- React
- Tailwind CSS
- Framer Motion
- lucide-react

For 3D, optionally add:

- Three.js
- React Three Fiber
- @react-three/drei

For simple deliverables:

- HTML
- CSS
- vanilla JavaScript

Code requirements:

- runnable
- componentized
- responsive
- accessible markup
- `prefers-reduced-motion` support
- mobile-friendly fallback for heavy effects
- centralized profile data object
- no fake metrics
- no inaccessible assets
- no invented Spline URLs
- image `alt` text
- clear hover and focus states

## Personal Content Rules

### Bio

Do not write a long autobiography. Use 3-5 specific sentences:

- one positioning sentence
- current direction
- relevant past experience
- personal working style
- credibility signal

### Highlights

Use real numbers only if provided. If not provided, use placeholders:

```text
待补充：项目 Demo 数量
待补充：内容曝光量
待补充：开源贡献
```

### Skills

Never output only a logo wall. Group skills by capability and connect each to output.

Bad:

```text
React / Python / LLM / Tailwind
```

Good:

```text
React: builds high-interaction frontend demos including editors, visual pages, and demo web apps.
LLM: designs agent workflows, tool calling, search augmentation, and verifier loops.
```

### Projects

Each project must include:

- project name
- one-line description
- problem solved
- personal role
- core features
- tech stack
- result / highlight / placeholder
- link / placeholder
- screenshot placeholder

## Hero Rules

Hero must have a visual memory point. It must include:

- name / nickname
- professional identity
- one-line value proposition
- avatar / 3D identity / abstract symbol
- primary CTA
- secondary CTA
- background motion or spatial layering

Avoid plain left-text-right-image layouts unless the composition has a distinctive twist.

Valid Hero patterns:

- 3D Floating Avatar Hero
- Terminal Identity Hero
- Magazine Cover Hero
- Spatial Portfolio Hero
- Glass Card Hero
- Motion Gradient Hero
- AI System Hero

## Visual Quality Rules

### Preview authenticity

When visual options are needed, previews must look like real homepage hero sections using the user's actual name, role, and content where available. Do not render option labels, workflow labels, file names, template names, pros/risks, or internal notes inside the visual preview. Put explanations in the assistant message, not inside the design.

### Typography personality

Typography must contribute to identity. Avoid default Arial, Inter, Roboto, or system-font-only looks unless the user explicitly requests them. Prefer a characterful display face paired with a refined readable body face; use mono accents only when they support a technical identity.

### Decisive palette

Use a clear dominant palette with one or two sharp accents. Do not average many colors or rely on safe purple/blue gradients. Define colors as CSS variables or Tailwind tokens and keep them consistent across sections.

### Layout grammar

Each visual direction must have a clear layout grammar, such as cinematic sparse grid, editorial asymmetry, spatial gallery, terminal rhythm, clean developer page, or creator hub dock. Do not build a homepage by stacking generic centered sections.

### Page continuity

A homepage must feel like one real website, not PPT slides pasted vertically. Use a continuous page-level background, shared texture, wave/gradient bridges, overlapping modules, or repeated visual grammar between sections. Reject hard section seam / background block breakpoints unless the user-provided reference intentionally uses obvious blocks.

### Motion orchestration

Use one primary motion system plus small supporting interactions. Examples: scroll-driven video + word reveal, editorial image reveal + staggered captions, or creator CTA dock + hover lift. Avoid scattered particles, random glow, and unrelated hover effects.

### Atmospheric background

Backgrounds must support the person's identity and improve depth/readability. Use texture, grain, geometry, cinematic video, gradient mesh, research grids, or image crops intentionally. Do not use random glowing balls as filler.

### Visual QA

Before final delivery, check whether the page looks like a real deployable homepage: no overflow, no overlapping text, readable mobile hero, obvious CTA, working links/assets, and visual consistency across desktop and mobile.

### HTML PPT / deck-like output QA

When this skill is explicitly invoked to create a PPT-style HTML layout, slide deck demo, presentation page, or fixed-screen showcase, treat it as a deck-like deliverable even though the skill's primary domain is personal homepages. In that mode, the output must feel like a real HTML PPT, not a broken webpage or stacked homepage sections.

Non-negotiable rules:

- **Correct slide navigation:** Use one fixed 16:9 stage with stacked slides and true page-by-page switching. Do not make users scroll through a long page when they asked for an HTML PPT. Support Arrow keys, Space, PageUp/PageDown, Home/End, touch swipe, and an outside-stage page counter.
- **Full-size stage shell:** For PPT decks that scale a fixed `1920×1080` stage, use a 16:9 shell that occupies the largest possible viewport rectangle, then scale the internal stage from that shell. In a 1920×1080 viewport, the rendered stage must be exactly 1920×1080 with no reserved safe-area gap.
- **Overlay-only controls:** Outside-stage counters and controls are presentation chrome. They may be fixed overlays, hover-only controls, or fullscreen-hidden controls, but they must not reduce `.stage` width, height, scale, or centering. Never shrink the deck just to keep controls outside the slide image.
- **One slide visible at a time:** Control visibility with active classes, opacity/visibility/pointer-events, or equivalent. Do not rely on `display: block` layout states that can be overridden by later flex/grid rules and reveal multiple slides.
- **PPT-only slide isolation:** When, and only when, the requested output is an HTML PPT / slide deck / fixed 16:9 presentation, hidden slides must be removed from painting. Use `visibility`, `opacity`, `pointer-events`, and `z-index`, or use `display: none` only when it cannot be overridden by slide layout classes.
- **No whole-slide ghosting:** For PPT page switching only, do not use whole-slide opacity crossfades that allow previous and next slide text to paint at the same time. If animated slide transitions are required, use a transition lock, active/target-only rendering, or another implementation that guarantees old and new slide body text, titles, numerals, cards, and footers never overlap in rendered frames.
- **Opaque slide stage:** For PPT page switching only, each slide must paint an opaque background over the stage so previous slide content cannot show through during navigation. This does not restrict transparent overlays or local visual effects inside ordinary homepage sections.
- **Typography must be calibrated, not blindly enlarged:** Compare against the reference/sample deck. Chinese titles usually need smaller visual size than Latin display text. If a template's Latin hero size is huge, adapt it for Chinese rather than forcing oversized fallback glyphs.
- **Use the reference's font logic:** Preserve what type is used for headlines, body, labels, and numerals. If the reference uses distinctive numeral/display typography, make numbers a designed visual element instead of a small plain label.
- **Reserve layout zones:** Title zones, content grids, screenshots, footer/chrome, and bottom color bars must have explicit safe space. Titles must not collide with cards. Bottom bars must not cover body text.
- **Contrast is mandatory:** White/paper/light cards require dark text and/or visible borders. Dark/teal/blue/magenta cards require light text. Do not put low-contrast light text on light cards or pale accent text on pale backgrounds.
- **No compression by illegibility:** If slide content does not fit, split into another slide, reduce item count, change the grid, or move screenshots/callouts. Do not solve it by shrinking text below comfortable reading size or allowing overlap.
- **Rendered verification:** Check the actual rendered result slide-by-slide. DOM overflow checks are insufficient because visual overlap can happen without scroll overflow.
- **PPT navigation stress verification:** For HTML PPT / deck-like outputs only, test rapid next/previous navigation and inspect at least one screenshot during or immediately after navigation. Passing criteria: exactly one displayed slide, exactly one active slide, no ghost text from adjacent slides, and outside-stage controls do not cover slide content.

Safe default PPT slide switching pattern:

```css
.slide {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  z-index: 0;
}

.slide.active {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
  z-index: 1;
}
```

Safe default fixed-stage shell pattern:

```css
.deck-viewport {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.stage-shell {
  width: min(100vw, calc(100vh * 16 / 9));
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.stage {
  position: absolute;
  left: 0;
  top: 0;
  width: 1920px;
  height: 1080px;
  transform-origin: left top;
  transform: scale(var(--stage-scale, 1));
}
```

```js
const scale = stageShell.getBoundingClientRect().width / 1920;
stage.style.setProperty("--stage-scale", Math.max(0.08, scale));
```

If the deck uses a different stage size, keep the same centering contract and update only the width, height, and scale divisors. This rule applies only to HTML PPT / fixed-screen presentation outputs, not normal scrolling homepages.

If a deck uses animated transitions, the implementation must still satisfy the same one-painted-slide visual guarantee. Do not transfer this PPT switching constraint to Homepage Mode.

Common failure cases to proactively prevent:

- PPT transition ghosting where two slides visually overlap because whole-slide `opacity` fades, transparent slide backgrounds, or unlocked rapid navigation are used.
- Fixed 16:9 stage appears visually off-center because a large unscaled stage is centered with grid/flex and then shrunk with `transform: scale(...)`.
- Deck appears too small because the scale calculation subtracts a bottom controls safe area from a 16:9 presentation viewport.
- Page 2 style context cards where the big number/text lacks design hierarchy.
- Page 6/8/10/11-type layouts where the title presses into the first row of color blocks.
- Page 7-type dark layouts where body copy runs into bottom blocks or footer chrome.
- Page 9-type layouts where a bottom callout bar covers screenshot captions or text.
- Page 12-type layouts where paper/white cards have too little contrast against nearby text or the background.

## Anti-AI-Slop Rules

Avoid:

- generic purple gradients on white
- random glowing orbs
- cheap glassmorphism
- identical cards
- meaningless icon walls
- SaaS landing page hero
- Lorem ipsum
- fake metrics
- over-rounded cards
- excessive shadows
- all sections centered
- generic copy like `Passionate developer`, `I love building things`, `Creative problem solver`

Must have:

- unique hero composition
- personal identity
- content logic
- differentiated project cards
- motion that supports information
- restrained color system
- readable mobile layout
- clear CTA

## MotionSites-Inspired Rules

When the user asks for cool, premium, 3D, motion, animated, high-impact, futuristic, or visually striking design, use MotionSites-inspired design patterns:

- layered animated hero background
- high-contrast typography
- spatial card composition
- premium CTA section
- floating 3D elements
- animated gradient accents
- polished section transitions
- dynamic background layers

Do not copy MotionSites templates, paid prompts, code, text, images, assets, or specific template structures directly. Only extract high-level public design patterns and create original implementations. If the user provides legally obtained template content, rewrite and reimplement it instead of copying blindly.

## Source Reuse Rules

The user may allow copying source from open-source references. Still follow licensing:

- Copy only license-compatible source.
- Preserve attribution and license notes.
- Do not copy proprietary, paid, or unclear-license templates.
- For borrowed code, record source in [REFERENCE_PRODUCTS.md](REFERENCE_PRODUCTS.md) or in file comments.

## Final Output Requirements

When generating a homepage, final output must include:

1. Design direction
2. Page structure
3. Motion / 3D plan
4. Technology stack
5. Full code or exact file-by-file code
6. Where to replace personal information
7. Deployment notes
8. Design review summary
9. Follow-up optimization suggestions

When the user asks only for Skill files, output or create:

```text
personal-homepage-skill/
├── SKILL.md
├── STYLE_PRESETS.md
├── MOTION_PATTERNS.md
├── HOMEPAGE_SECTIONS.md
├── COMPONENT_PATTERNS.md
├── DATA_SCHEMA.md
├── DESIGN_REVIEW.md
├── README.md
├── PRD.md
├── TECHNICAL_ROUTE.md
├── REFERENCE_PRODUCTS.md
├── TEST_SCENARIOS.md
├── TASK_BREAKDOWN.md
└── USER_STORIES.md
```

## Final Review

Always run the checklist in [DESIGN_REVIEW.md](DESIGN_REVIEW.md) before claiming the homepage is complete.
