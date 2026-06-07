# Demo Script: personal-homepage-skill

Use this script when presenting the Skill to users, contributors, or reviewers.

## Demo goal

Show that `personal-homepage-skill` is not a generic homepage generator. It is a quality-control system for AI agents that generate personal homepages.

## Audience

- AI coding agent users
- Skill authors
- frontend developers
- designers
- personal-brand creators
- open-source contributors

## Suggested talk track

### 1. Open with the problem

Most AI-generated personal homepages fail in the same ways:

- They look like SaaS landing pages.
- The hero is generic.
- Skills are icon walls.
- Projects are weak cards.
- Visual references are ignored.
- The page feels like stacked slides, not a real website.

### 2. Explain the solution

This Skill gives the agent a structured workflow:

1. Recognize personal homepage requests.
2. Follow user-provided references first.
3. Use visual presets only when needed.
4. Build strong information architecture.
5. Generate runnable frontend code.
6. Review the result before claiming completion.

### 3. Show reference-first behavior

Use the cinematic or passer-by examples:

- If user gives a concrete reference, the agent should not ask for three unrelated styles.
- It should preserve layout rhythm, typography mood, component structure, and motion model.

### 4. Show the preset library

Mention representative presets:

- Cinematic Scroll Personal Brand
- Clean Developer Homepage
- Soft Product Video Hero
- TOONHUB Figurine Carousel
- 3D Tech Portfolio
- Magazine Portfolio
- Art Museum Portfolio
- Terminal Hacker Homepage
- Minimal Premium Resume
- Business Personal Brand

### 5. Show quality guardrails

Highlight the checks:

- no fake metrics
- no fake testimonials
- no random glowing orbs
- no generic purple gradients
- no inaccessible assets
- no hard section seams
- no slide-like page breakpoints
- no copied unclear-license assets

### 6. Show open-source structure

Point to:

- SKILL.md as the entrypoint
- STYLE_PRESETS.md as the visual library
- MOTION_PATTERNS.md for animation guidance
- DESIGN_REVIEW.md for final checks
- TEST_SCENARIOS.md for QA
- examples/PROMPTS.md for demos

## Demo materials

Open the presentation deck:

```text
demo/personal-homepage-skill-overview.html
```

Open the template gallery:

```text
demo/template-gallery.html
```

Use the deck to explain the workflow and quality rules. Use the gallery to show all built-in visual presets as real homepage-style preview cards.

Deck navigation:

- Arrow Right / Space: next slide
- Arrow Left: previous slide
- Home: first slide
- End: last slide

## Live demo prompt

Use this prompt in a compatible agent:

```text
帮我生成一个个人主页。我是独立开发者，做 AI 工具和技术文章。
希望页面高级、个人品牌感强，不要像 SaaS 官网。项目包括 Search Agent、SlidePage 和 BossHunter。GitHub、小红书、公众号先用占位符。
```

Expected behavior:

- Skill applies.
- Agent chooses a personal homepage direction.
- Missing data uses placeholders.
- Project cards include problem, role, features, stack, and result placeholders.
- Final output includes design review.

## Closing message

This Skill does not replace designer taste. It preserves the good parts of designer taste inside an agent workflow, so agents stop producing the same generic homepage over and over.
