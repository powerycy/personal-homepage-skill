# Open Source Release Checklist

Use this checklist before publishing `personal-homepage-skill` to GitHub.

## 1. Repository basics

- [ ] Repository name is clear, for example `personal-homepage-skill`.
- [ ] README.md explains what the Skill does in the first screen.
- [ ] README.md includes installation or copy instructions.
- [ ] README.md includes at least 3 example prompts.
- [ ] README.md links to the demo deck and template gallery.
- [ ] README.md links to the main Skill file and reference files.
- [ ] Repository includes a license file.
- [ ] Repository includes CONTRIBUTING.md.
- [ ] Repository includes OPEN_SOURCE_PRD.md.
- [ ] Repository includes TEST_SCENARIOS.md.

## 2. Skill package quality

- [ ] SKILL.md has YAML frontmatter with `name` and `description`.
- [ ] `name` uses only letters, numbers, and hyphens.
- [ ] `description` starts with `Use when` and describes trigger conditions only.
- [ ] SKILL.md references all required support files.
- [ ] Every referenced support file exists.
- [ ] Required reference files are present:
  - [ ] STYLE_PRESETS.md
  - [ ] CINEMATIC_SCROLL_TEMPLATE.md
  - [ ] MOTION_PATTERNS.md
  - [ ] HOMEPAGE_SECTIONS.md
  - [ ] COMPONENT_PATTERNS.md
  - [ ] DATA_SCHEMA.md
  - [ ] DESIGN_REVIEW.md
  - [ ] REFERENCE_PRODUCTS.md

## 3. Product documentation

- [ ] PRD.md explains internal product goal and target users.
- [ ] OPEN_SOURCE_PRD.md explains GitHub release goal and value.
- [ ] USER_STORIES.md covers discovery, style selection, content quality, code generation, review, and reference boundaries.
- [ ] TEST_SCENARIOS.md covers trigger behavior, reference-first behavior, placeholders, React output, HTML output, accessibility, anti-slop, and license boundaries.
- [ ] TASK_BREAKDOWN.md explains next development phases.
- [ ] TECHNICAL_ROUTE.md explains default React, HTML, 3D, and review routes.

## 4. Visual and behavior guardrails

- [ ] Reference-first behavior is explicit.
- [ ] Visual previews are only used when the direction is unclear.
- [ ] Previews must look like real homepage hero sections, not option cards.
- [ ] The Skill forbids internal labels inside visual previews.
- [ ] Continuous Page Shell is documented.
- [ ] The design review checks for no hard background seams.
- [ ] Anti-AI-slop rules are documented.
- [ ] Fake metrics and fake testimonials are forbidden.

## 5. Source reuse and copyright

- [ ] REFERENCE_PRODUCTS.md lists public references and reuse boundaries.
- [ ] MotionSites is documented as inspiration only, not copied source.
- [ ] Google Arts & Culture is documented as high-level inspiration only.
- [ ] passer-by.com is documented as high-level layout inspiration only.
- [ ] GitHub portfolio templates are recorded as references without unverified license claims.
- [ ] No third-party source code is copied without license notes.
- [ ] No third-party images, logos, or avatars are included without permission.

## 6. Demo materials

- [ ] demo/personal-homepage-skill-overview.html opens in a browser.
- [ ] demo/template-gallery.html opens in a browser.
- [ ] Demo deck explains problem, solution, workflow, presets, quality rules, and roadmap.
- [ ] Template gallery shows all built-in visual presets and category filters.
- [ ] assets/template-previews/ includes preview images for all built-in visual presets.
- [ ] README.md embeds template preview images for GitHub browsing.
- [ ] Demo materials contain no private user data.
- [ ] Demo materials use only self-contained CSS/JS and public fonts.
- [ ] DEMO_SCRIPT.md explains how to present the deck and gallery.

## 7. GitHub hygiene

- [ ] Remove local paths that would confuse external users, or clearly mark them as examples.
- [ ] Check for secrets, API keys, personal tokens, and private URLs.
- [ ] Check for private screenshots or files.
- [ ] Use consistent file names and heading levels.
- [ ] Run a simple file-existence check before release.

## 8. Suggested release note

```text
Initial open-source release of personal-homepage-skill.

Includes:
- Skill entrypoint and reference files
- 16+ visual presets
- reference-first workflow
- anti-AI-slop design rules
- continuous webpage guardrails
- data schema, component patterns, motion patterns
- PRD, user stories, test scenarios, task breakdown
- GitHub release checklist and demo presentation
```
