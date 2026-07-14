# Homepage Generation Workflow

## 1. Mode detection

Classify the task as one of these modes:

- New homepage from content or topic.
- Redesign existing homepage or HTML.
- Improve a generated homepage.
- Browse/select visual style.
- Produce a single HTML deliverable.
- Produce a React/Tailwind project.

If the user gives a specific file path, reference page, or adopted final version, treat it as the primary reference.

## 2. Discovery

Gather missing inputs only when they materially affect the result:

- Name and preferred display name.
- Role or identity.
- Goal: job seeking, portfolio, creator hub, consulting, art, technical brand.
- Audience: recruiters, clients, fans, collaborators, admissions, community.
- Available projects, assets, screenshots, video, portrait, logos, links.
- Preferred language and tone.
- Visual references.
- Delivery format: single HTML or React/Tailwind.

Create a lightweight homepage requirement checklist before coding. Keep it short, but map each important original request to known assets, the target section/component, expected interaction state, and acceptance evidence. Mark approved omissions explicitly instead of silently dropping requirements.

## 3. Reference-first behavior

When a reference exists:

- Preserve the visual rhythm before inventing a new style.
- Reuse the spacing logic, section order, and typography mood.
- Match the reference’s density level.
- Improve only where the user’s content needs adaptation.
- Do not force a template-selection step unless the user asks for alternatives.
- Write a structured template decomposition before coding: section rhythm, grid, type scale, media behavior, motion, component states, and density.
- After implementation, run a desktop/mobile rendered comparison against the reference or adopted version and record the visible deltas.

## 4. Style previews

When direction is unclear, create 2-3 real homepage hero previews.

Preview rules:

- Use real user content when available.
- Show homepage chrome only when it would exist in the final page: name, nav, CTA, section hint, contact.
- Do not show internal labels such as option names, template names, file paths, workflow notes, or source-doc labels inside the preview.
- Make each preview distinct in typography, palette, layout grammar, and motion thesis.
- The preview must be feasible for a full responsive homepage.

## 5. Image workflow

If assets are provided, follow `IMAGE_WORKFLOW.md` before outlining the page. Images should shape the page, not be added after the layout is fixed.

## 6. Information architecture

Choose density mode and section structure:

- Minimal: hero, proof, contact.
- Portfolio: hero, selected projects, skills, about, contact.
- Case study: hero case, problem/role/result, process, evidence, more cases.
- Creator: hero, platforms, content themes, featured posts, collaboration.
- Art: hero, collections, artwork wall, statement, contact.

For low-content pages, use a low-content homepage strategy instead of padding the page. Prefer a real large image, one single featured case, editorial whitespace, asymmetric composition, and a strong CTA. Do not fill space with meaningless cards, duplicate metrics, empty icon grids, or fake testimonials.

## 7. Generation rules

- Centralize profile/content data.
- Use semantic sections and accessible headings.
- Use CJK-safe font variables.
- Keep long Chinese text in body scale.
- Use relative asset paths.
- Include `prefers-reduced-motion` support.
- Avoid fake metrics, fake links, fake logos, and fake image URLs.
- Make project cards specific: problem, role, features, stack, result.

## 8. Verification

Before delivery:

- Run build/check scripts when available.
- Inspect desktop and mobile widths.
- Capture or inspect desktop/mobile screenshots when layout or style changed materially.
- Check final computed styles for the elements that were changed, especially colors, transforms, display, position, z-index, overflow, and font values.
- Check no horizontal overflow.
- Check images load or placeholders are intentional.
- Check assets and key interactions, including navigation, CTA links, filters, editing controls, hover/focus states, and reduced-motion behavior.
- Check hero title wrapping.
- Check bottom spacing.
- Check visual balance between columns.
- Separate positioning layers from animation layers only when needed to fix ineffective transforms or overridden motion; do not introduce this pattern as a default requirement.
- Confirm that slide-id, page numbers, 1920×1080, presentation keyboard shortcuts, and bottom safe-zone rules must not be required for Homepage Mode.
- Review against `DESIGN_REVIEW.md`.
