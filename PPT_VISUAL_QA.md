# HTML PPT Visual QA

Use this reference only for Presentation Mode, in two phases. Before authoring, apply the template, asset, composition, and sparse-slide rules. After rendering, apply computed-style and full-size screenshot review. Deterministic structure and interaction checks belong in `scripts/verify-html-ppt-stage.mjs`.

## Before authoring

### Template decomposition

Before implementation, record the reference template's:

- composition grid and dominant alignment
- headline, body, label, and numeral font roles
- title baseline and spacing to the first content row
- outer margins, internal whitespace rhythm, and bottom safe area
- person scale, crop, gaze direction, and relationship to copy
- image aspect ratios, crop logic, and screenshot framing
- decorative grammar, recurring chrome, page markers, and color bars
- motion model, transition duration, and layer ownership

After capture, compare the rendered slide against this record. A similar palette alone is not template fidelity.

### Asset priority

Use assets in this order:

1. Real project screenshot or documented project output.
2. User-provided image, video, photograph, or brand asset.
3. A derivative generated from real source material with provenance retained.
4. A newly generated visual when no truthful source asset can serve the page.

Do not insert cheap vector illustrations, generic icon scenes, fake dashboards, or unrelated stock imagery as temporary visual filler. Record each major asset's source, intended crop, and slide role in the slide requirement ledger.

### Visual center and safe-space review

Before authoring, record the intended title baseline, dominant content center, top/bottom whitespace relationship, and protected bottom zone for each layout family. Treat these as design targets, not automatic pass/fail thresholds. Intentional asymmetry is valid when the intended anchor and counterweight are explicit.

For complex slides, wrap the intended measurement boundary with `data-qa-content`. Mark purely decorative layers with `aria-hidden="true"` or `data-qa-ignore` so they do not pollute the content bounding box.

Check the rendered result in the After rendering phase below.

### Low-text slides

When a slide contains little text, choose one deliberate composition:

- a large real project visual or full-bleed scene
- a strong human or situational image with copy-aware cropping
- a designed numeral or quantitative visual
- an asymmetric spatial composition with a clear anchor and counterweight
- a restrained pause slide that supports the spoken narrative

Do not fill space with repeated cards, oversized generic icons, decorative gradients, or meaningless vector art. Empty space must feel intentional and connected to the narrative beat.

## After rendering

### Rendered visual balance review

Use `qa-report.json` as measurement evidence, then inspect the full-size screenshot. Check:

- title baseline consistency across related layouts
- center of the visible content bounding box relative to the intended composition
- top and bottom whitespace balance
- title-to-content separation
- footer, counter, caption, and bottom color-bar safety
- whether a large person, screenshot, or numeral creates an accidental competing focal point

Measurements flag risk; they do not decide composition quality. Intentional asymmetry is valid when the visual counterweight is clear.

### Computed-style and rendered-state review

When a modification appears correct in source but not on screen:

1. Read the final computed style on the affected node.
2. Inspect inherited styles, selector order, inline styles, animation state, and active page state.
3. Compare the final rendered screenshot before and after the change.
4. Confirm `.stage` and `data-layout-layer` retain their positioning transforms.
5. Put entrance or emphasis animation on a nested `data-motion-layer`.

Do not accept a source-code diff as evidence that a visual change took effect.

### Full-size screenshot review

Inspect every captured slide individually at full size. A montage may support deck-level rhythm review but cannot replace full-size inspection.

For each slide, record pass, revision, or approved exception for:

- template fidelity
- asset truthfulness and quality
- title baseline and hierarchy
- content center and whitespace balance
- text wrapping, clipping, and contrast
- bottom safe area and chrome collision
- screenshot/image scale and crop
- transition residue or adjacent-slide ghosting

The model must state what it inspected. `capture-slides.mjs` supplies screenshots and measurements; it does not automatically complete aesthetic acceptance.
