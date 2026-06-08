# Task Breakdown for AI Development

This file gives an AI developer a practical build plan for personal-homepage-skill.

## Phase 1: Documentation Skill MVP

### Task 1: Validate Skill metadata

- Check [SKILL.md](SKILL.md) frontmatter.
- Ensure `name` uses only letters, numbers, and hyphens.
- Ensure `description` starts with `Use when` and only describes trigger conditions.

Acceptance:

- Skill appears in available skills list.
- Total YAML frontmatter stays under 1024 characters.

### Task 2: Wire reference files

- Ensure [SKILL.md](SKILL.md) points to all reference files.
- Ensure every referenced file exists.
- Ensure file names are stable.

Acceptance:

- No broken internal links.
- AI can follow the workflow from SKILL.md.

### Task 3: Expand style presets if needed

- Add more examples from open-source style libraries if license permits.
- Keep each style tied to identity and use case.
- Avoid copying proprietary templates.

Acceptance:

- At least 10 presets.
- Each has best-fit user type, hero, sections, motion, risks.

### Task 4: Expand motion patterns

- Add implementation snippets for CSS-only versions.
- Add Framer Motion variants.
- Add React Three Fiber wrapper pattern.

Acceptance:

- Each motion pattern includes use case, rules, risks, fallback.

### Task 5: Verify content and anti-template rules

- Check that project, skill, hero, and copy rules are explicit.
- Add examples of bad vs good copy.

Acceptance:

- Skill prevents generic “Passionate developer” output.
- Skill requires project problem/role/result fields.

## Phase 2: Templates

### Task 6: Create React Tailwind template

Suggested structure:

```text
templates/react-tailwind/
  package.json
  index.html
  src/
    App.tsx
    data/profile.ts
    components/
    styles/globals.css
```

Acceptance:

- `npm install` and `npm run dev` work.
- Default page renders with placeholder profile.
- Mobile layout works.

### Task 7: Create single-file HTML template

Suggested structure:

```text
templates/html-single-file/personal-homepage.html
```

Acceptance:

- Opens directly in browser.
- Includes responsive sections.
- Includes reduced-motion support.
- No build step.

### Task 8: Create Next.js App Router template

Suggested structure:

```text
templates/nextjs-app-router/
  app/page.tsx
  app/globals.css
  data/profile.ts
```

Acceptance:

- `npm run dev` works.
- SSR-safe animations.
- No client-only code in server components unless isolated.

## Phase 3: Examples

### Task 9: Add example prompts

Create:

```text
examples/ai-engineer-homepage.md
examples/designer-portfolio-homepage.md
examples/creator-homepage.md
examples/student-resume-homepage.md
examples/indie-hacker-homepage.md
```

Acceptance:

- Each example includes input prompt, selected style, page structure, and expected quality notes.

### Task 10: Add reference-first visual routing workflow

Show concrete visual directions, not abstract style labels, but only when the user has not already provided a concrete reference.

Acceptance:

- If the user provides a concrete template, reference site, screenshot description, long prompt, or GitHub portfolio template, AI follows that reference first and does not output self-generated visual options first.
- If no visual direction is clear, AI provides 2-3 real homepage hero preview directions before code; option-card visuals are forbidden.
- Visual previews do not contain A/B/C labels, pros/risks, workflow notes, template names, file names, or internal planning text.
- WISA-style, dark cinematic, scroll-driven video, Manrope + JetBrains Mono, and glass footer references route to [CINEMATIC_SCROLL_TEMPLATE.md](CINEMATIC_SCROLL_TEMPLATE.md).

## Phase 4: Automation

### Task 11: Add screenshot validation script

Optional script:

```text
scripts/validate-homepage.mjs
```

Checks:

- page loads
- no console errors
- mobile screenshot
- desktop screenshot
- no horizontal overflow

Acceptance:

- Script can run against local dev server or HTML file.

### Task 12: Add design lint checklist

Optional script or prompt checklist:

- scan for forbidden copy
- scan for unverified metrics and missing placeholder markers
- scan for missing reduced-motion CSS
- scan for profile object

Acceptance:

- Common violations are reported before final answer.

## Suggested Agent Division

| Agent | Responsibility |
| --- | --- |
| PM Agent | PRD, user types, success metrics |
| Design Agent | style presets, hero patterns, anti-template rules |
| Motion Agent | motion patterns, 3D fallback, accessibility |
| Frontend Agent | React/HTML templates, data schema |
| QA Agent | test scenarios, design review, regression checks |

## Do Not Do

- Do not start with templates before Skill behavior is stable.
- Do not copy MotionSites paid templates.
- Do not add heavy 3D models by default.
- Do not overbuild a template marketplace in V1.
- Do not generate fake personal data.
