# Open Source PRD: personal-homepage-skill

## 1. Summary

personal-homepage-skill is an AI Skill for generating high-quality personal homepages, portfolios, resume sites, creator pages, developer profiles, and person-led project showcase pages.

The open-source goal is to turn a proven private skill into a reusable community package. It helps coding agents avoid generic SaaS-looking pages, weak project sections, fake metrics, broken visual systems, and inaccessible frontend output.

## 2. Contacts

| Role | Owner | Notes |
| --- | --- | --- |
| Maintainer | Repository owner | Owns roadmap, releases, issue triage, and contribution review |
| Skill users | Claude Code / Ducc / compatible agent users | Use the Skill to generate personal homepages |
| Contributors | Designers, frontend developers, AI workflow builders | Improve presets, examples, tests, and docs |
| Reviewers | Maintainer-selected reviewers | Check visual quality, copyright boundaries, and behavior regressions |

## 3. Background

AI-generated personal homepages often fail in predictable ways:

- They look like generic SaaS landing pages.
- They use the same purple gradients, random glowing orbs, and centered sections.
- They ask users to choose vague styles even when users already provided a concrete reference.
- They invent metrics, awards, companies, links, or testimonials.
- They turn projects into weak title-description cards.
- They overuse particles, glassmorphism, and 3D without supporting the message.
- They stack sections like slides, causing hard background seams and pages that do not feel like real websites.
- They generate code that is hard to customize or not responsive.

This Skill packages a stricter product/design/frontend workflow for agents. It tells the agent when to follow a reference, when to propose previews, how to structure personal content, what visual presets to use, and how to review the final output.

## 4. Objective

### Objective

Make personal homepage generation more reliable, more beautiful, and easier to maintain for AI coding agents and their users.

### Why it matters

A personal homepage is often a first impression. A weak page can make strong work look generic. A strong page helps visitors understand who the person is, what they do, why they are credible, and what to click next.

### Key Results

| KR | Target |
| --- | --- |
| KR1 | A new user can understand what the Skill does in under 3 minutes from README.md |
| KR2 | The Skill includes clear trigger rules, anti-slop design rules, and final review criteria |
| KR3 | The template library includes at least 10 distinct visual presets with best-fit users, hero patterns, motion, and risks |
| KR4 | The Skill documents reference-first behavior when users provide templates, prompts, screenshots, or reference sites |
| KR5 | The package includes example prompts that cover engineers, creators, designers, students, founders, and artists |
| KR6 | The package includes test scenarios for trigger behavior, reference following, placeholders, accessibility, and reference boundaries |
| KR7 | The package includes an open-source checklist and contribution guide before GitHub release |

## 5. Market Segments

### Segment 1: AI coding agent users

Job: “I want my agent to create a personal homepage that looks good without me rewriting every design decision.”

Constraints:

- May not know frontend design vocabulary.
- May provide incomplete personal data.
- Needs runnable code or clear file-by-file output.

### Segment 2: Developers and AI engineers

Job: “I want to show technical positioning, projects, demos, GitHub, and content in a memorable page.”

Constraints:

- Wants strong technical identity without looking like a SaaS dashboard.
- Needs project proof, not just a skill logo wall.

### Segment 3: Designers, artists, and photographers

Job: “I want a portfolio-like homepage with strong visual taste and curation.”

Constraints:

- Needs image-led or editorial structure.
- Must avoid copying proprietary art assets or museum content.

### Segment 4: Creators and self-media operators

Job: “I want one page that connects my identity, content platforms, projects, and contact path.”

Constraints:

- Needs platform links and content cards.
- Metrics may be missing and must not be invented.

### Segment 5: Skill authors and maintainers

Job: “I want a reusable skill package that can be improved, tested, and shared.”

Constraints:

- Needs clear file structure, contribution rules, test cases, and copyright boundaries.

## 6. Value Propositions

| Pain | Value |
| --- | --- |
| Generic AI homepage design | Opinionated visual presets and anti-slop rules |
| User provides a great reference but agent ignores it | Reference-first routing rules |
| Weak content structure | Personal homepage section rules and data schema |
| Fake achievements | Placeholder-first content policy |
| Broken motion or inaccessible effects | Motion, 3D, reduced-motion, and mobile fallback rules |
| Pages feel like stacked slides | Continuous Page Shell and no hard background seam checks |
| Hard-to-review output | Design review checklist and test scenarios |
| Hard to open-source | PM docs, release checklist, contribution guide, and demo deck |

## 7. Solution

### 7.1 UX / Workflow

The Skill guides agents through this flow:

1. Recognize the task as a personal homepage / portfolio / personal brand site.
2. Collect or infer person, goal, projects, content, links, and visual preference.
3. If the user provides a concrete reference, follow it first.
4. If the direction is unclear, provide 2-3 real homepage hero preview directions.
5. Select the strongest style for the person.
6. Build information architecture.
7. Generate code or file-by-file implementation.
8. Run design review before claiming completion.

### 7.2 Key Features

#### F1. Trigger rules

Clear conditions for when the Skill applies and when it does not.

#### F2. Reference-first behavior

Concrete references override generic style exploration. This includes templates, screenshots, detailed prompts, GitHub portfolio templates, and reference sites.

#### F3. Visual preset library

Presets include cinematic, clean developer, product hero, figurine carousel, 3D tech, motion gradient, magazine, terminal, resume, pixel, dashboard, bento, editorial, museum, spatial, business, and case-study directions.

#### F4. Content rules

Rules for bio, projects, skills, highlights, links, placeholders, and testimonials.

#### F5. Motion and 3D rules

One primary motion system, reduced-motion support, mobile fallback, no invented Spline URLs, no heavy default models.

#### F6. Continuous webpage rules

Generated pages should feel like real websites, not PPT slides pasted vertically. Backgrounds should connect through shared systems, gradients, waves, masks, overlap, or repeated visual grammar.

#### F7. Review and tests

Design review checklist and test scenarios help catch regressions before release.

### 7.3 Technology

The package is documentation-first:

```text
SKILL.md
STYLE_PRESETS.md
MOTION_PATTERNS.md
HOMEPAGE_SECTIONS.md
COMPONENT_PATTERNS.md
DATA_SCHEMA.md
DESIGN_REVIEW.md
REFERENCE_PRODUCTS.md
PRD.md
TECHNICAL_ROUTE.md
USER_STORIES.md
TEST_SCENARIOS.md
TASK_BREAKDOWN.md
README.md
```

For GitHub release, this package also includes:

```text
OPEN_SOURCE_PRD.md
OPEN_SOURCE_CHECKLIST.md
CONTRIBUTING.md
DEMO_SCRIPT.md
examples/PROMPTS.md
demo/personal-homepage-skill-overview.html
```

### 7.4 Assumptions

- Users already have a compatible agent environment that can load Markdown-based skills.
- The first open-source release is a documentation Skill, not a template marketplace.
- Visual references can be described and abstracted, but proprietary source, images, and paid templates must not be copied.
- Community contributions will mostly improve presets, examples, tests, docs, and optional templates.

## 8. Release

### V1: GitHub documentation release

Ships the Skill docs, PM docs, examples, checklist, and demo deck.

### V1.1: Example expansion

Adds more real prompts and expected output notes for major user types.

### V2: Template examples

Adds runnable template examples for React, single-file HTML, and Next.js.

### V3: Automated validation

Adds scripts for link checking, Markdown structure checks, and generated homepage screenshot validation.
