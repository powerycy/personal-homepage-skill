# personal-homepage-skill

A documentation-first AI Skill for generating distinctive, production-quality personal homepages.

This Skill helps compatible coding agents create personal brand sites, portfolio pages, resume homepages, creator hubs, developer profiles, and person-led project showcase pages without falling into generic AI-generated design patterns.

## What problem does it solve?

AI-generated personal homepages often look like the same generic SaaS landing page:

- vague hero copy
- purple gradients and random glowing orbs
- icon-wall skill sections
- weak project cards
- fake metrics or fake testimonials
- overused bento cards
- visual references ignored
- pages that feel like stacked slides instead of real websites

`personal-homepage-skill` gives the agent a stricter workflow for identity, references, visual style, information architecture, code generation, and final design review.

## Core behavior

### 1. Reference first

If the user provides a concrete template, reference site, screenshot description, detailed prompt, or GitHub portfolio template, the agent follows that reference first.

It should preserve:

- information architecture
- visual rhythm
- component organization
- typography mood
- spacing
- motion model

It should not ask the user to choose from unrelated self-generated style options first.

### 2. Real previews only when unclear

If the user gives no clear visual direction, the agent can propose 2-3 real homepage hero preview directions.

Those previews should look like real homepage hero sections. They must not contain internal labels such as option names, pros/risks, workflow notes, file names, or template names inside the visual composition.

### 3. Personal homepage fit

Every generated homepage must answer:

1. Who is this person?
2. What do they do?
3. What proof supports this identity?
4. Why should visitors trust them?
5. What should visitors click next?

### 4. Continuous webpage quality

Generated pages should feel like one real website, not PPT slides stacked vertically.

The Skill explicitly checks for:

- no hard background seams
- no slide-like breakpoints
- no unrelated section-by-section background blocks
- consistent visual grammar across sections

## Visual preset library

The Skill includes presets such as:

- Cinematic Scroll Personal Brand
- Clean Developer Homepage
- Soft Product Video Hero
- TOONHUB Figurine Carousel
- 3D Tech Portfolio
- Motion Gradient Brand
- Magazine Portfolio
- Terminal Hacker Homepage
- Minimal Premium Resume
- Cute Pixel Creator
- AI System Dashboard
- Creator Bento Homepage
- Dark Editorial Portfolio
- Art Museum Portfolio
- Spatial Project Gallery
- Business Personal Brand
- Case Study Portfolio

See [STYLE_PRESETS.md](STYLE_PRESETS.md).

## File map

| File | Purpose |
| --- | --- |
| [SKILL.md](SKILL.md) | Main Skill entrypoint and agent workflow |
| [STYLE_PRESETS.md](STYLE_PRESETS.md) | Visual style library |
| [CINEMATIC_SCROLL_TEMPLATE.md](CINEMATIC_SCROLL_TEMPLATE.md) | WISA-style dark cinematic template guidance |
| [MOTION_PATTERNS.md](MOTION_PATTERNS.md) | Animation, 3D, background, and fallback rules |
| [HOMEPAGE_SECTIONS.md](HOMEPAGE_SECTIONS.md) | Section-level content and visual guidance |
| [COMPONENT_PATTERNS.md](COMPONENT_PATTERNS.md) | Reusable component patterns |
| [DATA_SCHEMA.md](DATA_SCHEMA.md) | Profile data structure for generated pages |
| [DESIGN_REVIEW.md](DESIGN_REVIEW.md) | Final review checklist |
| [REFERENCE_PRODUCTS.md](REFERENCE_PRODUCTS.md) | Reference products and copyright boundaries |
| [PRD.md](PRD.md) | Internal product requirements |
| [OPEN_SOURCE_PRD.md](OPEN_SOURCE_PRD.md) | GitHub/open-source release PRD |
| [USER_STORIES.md](USER_STORIES.md) | User stories and acceptance criteria |
| [TEST_SCENARIOS.md](TEST_SCENARIOS.md) | QA scenarios for the Skill behavior |
| [TASK_BREAKDOWN.md](TASK_BREAKDOWN.md) | Suggested implementation roadmap |
| [TECHNICAL_ROUTE.md](TECHNICAL_ROUTE.md) | Recommended technical routes |
| [OPEN_SOURCE_CHECKLIST.md](OPEN_SOURCE_CHECKLIST.md) | GitHub release checklist |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guide |
| [DEMO_SCRIPT.md](DEMO_SCRIPT.md) | Talk track for presenting the Skill |
| [examples/PROMPTS.md](examples/PROMPTS.md) | Example prompts for testing and demos |
| [demo/personal-homepage-skill-overview.html](demo/personal-homepage-skill-overview.html) | Self-contained HTML presentation deck |
| [demo/template-gallery.html](demo/template-gallery.html) | Self-contained template gallery showing all built-in visual presets |

## Example prompts

### AI engineer homepage

```text
帮我生成一个个人主页。我是 AI 工程师，方向是 Agentic Search、Coding Agent 和 AI 产品实践。
项目包括 Search Agent、SlidePage 和 BossHunter。
页面要像高级数字名片，不要像 SaaS 官网。GitHub、小红书、公众号先用占位符。
```

### Strict reference-following homepage

```text
严格按照这个视觉要求做个人主页：暗黑电影感、固定全屏视频背景、滚动驱动视频、Manrope + JetBrains Mono、稀疏排版、玻璃质感 footer。
不要重新发明视觉风格。
```

### Clean developer homepage

```text
帮我做一个前端开发者个人主页，参考 passer-by.com 那种清爽排版：浅蓝白背景、简洁导航、头像/手绘形象、地点标签、About、GitHub CTA、项目卡片。
```

More prompts: [examples/PROMPTS.md](examples/PROMPTS.md)

## How to use

Place this folder in a compatible skills directory, for example:

```text
.claude/skills/personal-homepage-skill/
```

Then ask your agent to generate or improve a personal homepage.

The exact installation flow depends on your agent environment. This repository is documentation-first and does not require npm install.

## Demo

Open the self-contained presentation deck:

```text
demo/personal-homepage-skill-overview.html
```

Open the self-contained template gallery:

```text
demo/template-gallery.html
```

The deck is for explaining the Skill. The gallery is for visually browsing all built-in homepage template directions.

Deck navigation:

- Arrow Right / Space: next slide
- Arrow Left: previous slide
- Home: first slide
- End: last slide

Presentation script: [DEMO_SCRIPT.md](DEMO_SCRIPT.md)

## Source reuse and copyright

This Skill learns from high-level public design patterns and user-approved references, but it does not grant permission to copy third-party assets.

Rules:

- Do not copy paid templates, proprietary code, private screenshots, or unclear-license assets.
- Do not copy MotionSites paid templates, code, text, prompts, images, or exact template structures.
- Do not copy Google Arts & Culture assets, artwork, text, collection data, or exact page structure.
- Do not copy passer-by.com source, avatar, logo, text, or project data.
- For open-source code reuse, check the license and preserve attribution.

See [REFERENCE_PRODUCTS.md](REFERENCE_PRODUCTS.md).

## Roadmap

### V1: Documentation Skill

- Skill entrypoint
- visual presets
- motion patterns
- section rules
- component patterns
- data schema
- review checklist
- PM docs
- examples
- demo deck

### V2: Runnable templates

- React + Tailwind example
- single-file HTML example
- Next.js App Router example

### V3: Validation automation

- Markdown link checker
- generated homepage quality checker
- screenshot validation helper
- mobile and reduced-motion checks

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
