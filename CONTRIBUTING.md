# Contributing Guide

Thanks for helping improve `personal-homepage-skill`.

This project is a documentation-first AI Skill. Contributions should make agents better at generating personal homepages, not just add more templates.

## What to contribute

Good contributions:

- Better trigger rules in `SKILL.md`.
- New visual presets in `STYLE_PRESETS.md`.
- Better motion or 3D fallback guidance in `MOTION_PATTERNS.md`.
- Stronger section rules in `HOMEPAGE_SECTIONS.md`.
- Reusable component ideas in `COMPONENT_PATTERNS.md`.
- More realistic example prompts in `examples/PROMPTS.md`.
- More test scenarios in `TEST_SCENARIOS.md`.
- Clearer design review checks in `DESIGN_REVIEW.md`.
- License-safe references in `REFERENCE_PRODUCTS.md`.

Avoid contributions that:

- Copy paid templates, private source, or unclear-license assets.
- Add many generic presets with no distinct visual grammar.
- Encourage fake metrics, fake testimonials, or invented personal data.
- Make the Skill over-ask users before producing useful output.
- Turn every homepage into a SaaS landing page.
- Add heavy runtime dependencies without a clear reason.

## Contribution principles

### 1. Reference-first behavior is core

If a user gives a concrete reference, template, screenshot, prompt, or site, the agent should follow it closely before inventing new directions.

Do not weaken this rule.

### 2. Visual quality beats preset count

A preset should define:

- best-fit identity
- vibe
- color system
- typography mood
- hero structure
- section structure
- motion behavior
- risks

Do not add a preset that is only a name and a vague style label.

### 3. Personal content must stay honest

The Skill should never invent:

- companies
- schools
- awards
- follower counts
- project metrics
- testimonials
- links

Use clear placeholders instead.

### 4. Webpage continuity matters

Generated homepages should feel like real websites, not stacked slides. Guard against hard background seams, unrelated section blocks, and PPT-like breakpoints.

### 5. Copyright boundaries matter

When adding a reference:

- Record the source URL.
- State what can be learned at a high level.
- State what must not be copied.
- Do not claim license status unless you checked it.

## How to propose a new visual preset

Use this format in `STYLE_PRESETS.md`:

```md
## Preset Name

**Best for:** who should use it.

**Vibe:** emotional and visual feel.

**Color:** dominant palette and accent policy.

**Typography:** display/body/mono roles.

**Hero:** first-screen composition.

**Sections:** recommended follow-up structure.

**Motion:** primary motion system and fallback.

**Risks:** how it can fail.

**Reference pattern:** optional high-level reference summary.
```

## How to add a reference product

Use this format in `REFERENCE_PRODUCTS.md`:

```md
## Reference name

Reference URL:

```text
https://example.com/
```

### What to learn

- High-level layout or interaction ideas.

### How to apply

- Which preset or rule it should affect.

### Boundaries

- What must not be copied.
```

## Review checklist for pull requests

Before opening a PR, check:

- [ ] No private data, secrets, or API keys.
- [ ] No copied unclear-license source or assets.
- [ ] Internal links still work.
- [ ] SKILL.md still has valid frontmatter.
- [ ] New presets are distinct and useful.
- [ ] Test scenarios or design review checks are updated when behavior changes.
- [ ] README.md is updated if the public user flow changes.

## Suggested PR title style

Use short, clear titles:

```text
Add clean developer homepage preset
Strengthen reference-first workflow
Add art portfolio example prompts
Improve reference and license boundaries
```
