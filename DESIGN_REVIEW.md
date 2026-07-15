# Design Review Checklist

Run this checklist before saying a generated homepage or PPT-style HTML presentation is complete.

## 1. Reference Fidelity

Use this section when the user provided a concrete template, reference site, screenshot description, long visual prompt, or GitHub portfolio template.

- [ ] Did the output treat the provided reference as the selected direction?
- [ ] Was a structured template decomposition created before coding?
- [ ] Did it preserve the reference's information architecture, visual rhythm, component organization, typography mood, spacing, and motion model?
- [ ] Was a desktop/mobile rendered comparison completed after implementation?
- [ ] Did it avoid replacing the reference with a generic self-generated style, bento layout, dashboard, terminal UI, or random cyber/particle effect?
- [ ] If source code was reused, is the license checked or attribution recorded?

## 1A. Homepage Requirement Coverage

- [ ] Is there a lightweight homepage requirement checklist?
- [ ] Does it map the original request, assets, target section/component, interaction state, and acceptance evidence?
- [ ] Are missing assets, unavailable proof, or approved omissions named explicitly?

## 2. Personal Homepage Fit

- [ ] Does the page clearly introduce a person, not a SaaS product?
- [ ] Is the person visible in the Hero through name, role, identity, or visual symbol?
- [ ] Does the page answer who they are, what they do, why visitors should trust them, and what to do next?

## 3. Chinese typography

- [ ] Chinese typography uses a CJK-capable font stack.
- [ ] Chinese body copy is not rendered in condensed Latin display fonts.
- [ ] Long Chinese paragraphs stay at readable body size with controlled width and line height.
- [ ] Title line breaks look intentional.
- [ ] Punctuation and spacing are natural for Chinese or mixed Chinese/English copy.

## 4. Hero section

- [ ] The Hero section has one clear focal point.
- [ ] Left and right columns or visual groups have balanced weight.
- [ ] Large titles do not collide with images or controls.
- [ ] Bottom edge has enough breathing room.
- [ ] CTA and navigation are visible and not crowded.

## 5. Hero Memory Point

- [ ] Does the Hero have a distinctive composition?
- [ ] Is it more than plain left-text-right-image?
- [ ] Are name, role, tagline, primary CTA, and secondary CTA visible?
- [ ] Is the background visually rich but not distracting?
- [ ] Is the Hero readable on mobile?

## 6. Content Quality

- [ ] Is the bio specific and not generic?
- [ ] Are fake metrics avoided?
- [ ] Are placeholders clearly marked?
- [ ] Are skills described as capabilities with outputs?
- [ ] Are projects described with problem, role, features, stack, and result?

## 7. Project Persuasiveness

- [ ] Does each project explain what problem it solves?
- [ ] Does each project show the user's role?
- [ ] Does each project include tech stack or method?
- [ ] Does each project include result, learning, or placeholder?
- [ ] Are project cards visually differentiated?

## 8. Visual System Review

- [ ] If visual previews were shown, did they look like real homepage hero sections rather than option cards?
- [ ] Are option labels, pros/risks, workflow notes, template names, and file names absent from the visual composition?
- [ ] Does typography have personality and avoid a default Arial / Inter / Roboto / system-font-only look?
- [ ] Is there a decisive dominant palette with one or two sharp accents?
- [ ] Does the layout have a clear grammar instead of stacked centered sections?
- [ ] Does the page feel like one continuous real website, with no hard background seams, no PPT-like slide breakpoints, and no unrelated section-by-section background blocks?
- [ ] Does the background create identity-specific atmosphere instead of using random glow/orb filler?
- [ ] Is there one primary motion system rather than scattered particle/hover effects?
- [ ] Does the page look like a real deployable homepage, not a demo or planning artifact?
- [ ] If content is intentionally sparse, does it use a low-content homepage strategy: real large image, single featured case, editorial whitespace, asymmetric composition, and useful CTA?
- [ ] Did the page avoid meaningless cards, empty icon walls, duplicate metrics, fake testimonials, or filler sections?

## 9. Anti-Template Review

Failure signals — all should be absent. Reject or revise if any signal is present.

| Failure signal | Present? | Action |
| --- | --- | --- |
| generic purple gradient on white | Yes / No | Replace with identity-specific palette |
| random glowing balls with no design system | Yes / No | Use structured background layers |
| cheap glassmorphism everywhere | Yes / No | Reduce glass effects and improve hierarchy |
| all cards same size | Yes / No | Introduce bento, featured cards, or case-study layout |
| meaningless icon wall | Yes / No | Convert to capability-based skill cards |
| SaaS-style “grow your business” Hero | Yes / No | Recenter the person and their proof |
| Lorem ipsum | Yes / No | Replace with real copy or clear placeholders |
| `Passionate developer` style copy | Yes / No | Rewrite with specific capability and proof |
| over-rounded cards and excessive shadows | Yes / No | Reduce radius/shadows and sharpen layout system |
| every section centered | Yes / No | Add asymmetry, grids, editorial rhythm, or spatial composition |

## 10. Motion Review

- [ ] Motion supports hierarchy or interaction.
- [ ] Important text does not move while being read.
- [ ] There is reduced-motion support.
- [ ] Mobile disables or simplifies heavy motion.
- [ ] No scroll hijacking.
- [ ] No excessive particle density.

## 11. 3D Review

- [ ] 3D is optional and has fallback.
- [ ] No huge model is loaded by default.
- [ ] Spline is used only if user provided a real link.
- [ ] Text remains readable over 3D/background.
- [ ] Mobile experience is not broken.

## 12. Presentation Mode

- [ ] Presentation Mode uses a fixed 1920×1080 16:9 stage.
- [ ] Slide content does not reflow on phone or desktop.
- [ ] Text, images, and controls remain inside the safe area.
- [ ] Dense content is split into more slides instead of shrinking unreadably.
- [ ] Keyboard navigation works.
- [ ] Fullscreen behavior is available when requested.

## 13. Images

- [ ] Images are verified and accessible.
- [ ] No broken images are present.
- [ ] No important image is too small to understand.
- [ ] Meaningful images have alt text.
- [ ] Missing assets use polished placeholders.
- [ ] Local assets use relative paths that survive moving/deploying the folder.

## 14. Accessibility

- [ ] Semantic sections are used.
- [ ] Buttons and links have focus states.
- [ ] Images have alt text.
- [ ] Color contrast is sufficient.
- [ ] Decorative visuals are `aria-hidden`.
- [ ] Keyboard navigation works for interactive elements.

## 15. Inline Editing

- [ ] Standalone HTML deliverables include the default left-top hidden edit affordance unless explicitly disabled by the user.
- [ ] The edit control appears from the top-left hotzone, toggles edit mode, and uses a file-specific `localStorage` key.
- [ ] `E` toggles edit mode when focus is not inside editable text; `Cmd/Ctrl+S` saves.
- [ ] Common visible text is editable, but navigation/filter buttons that control page logic are not made editable.
- [ ] For HTML PPT/deck outputs, slide navigation ignores keyboard events from `[contenteditable="true"]` so arrow keys move the text cursor while editing.
- [ ] For dynamically rendered pages, edits are saved before filtering/re-rendering and restored after the DOM is refreshed.

## 16. Responsive Design

- [ ] Hero works on small screens.
- [ ] Project cards stack cleanly.
- [ ] Text sizes remain readable.
- [ ] No horizontal overflow.
- [ ] Touch interactions do not require hover.

## 17. HTML PPT / Deck-like Deliverable Review

Use this section when the user asks this skill for a PPT-style HTML file, deck demo, presentation layout, fixed-screen portfolio pitch, or any slide-like output.

- [ ] The output uses true page-by-page slide navigation instead of long-page scrolling.
- [ ] Arrow keys, Space, PageUp/PageDown, Home/End, touch swipe, and page counter work.
- [ ] Only one slide is visible at a time; slide visibility cannot be broken by flex/grid `display` rules.
- [ ] Hidden slides are removed from painting through visibility/opacity/pointer-events/z-index or a non-overridable `display: none` strategy.
- [ ] Whole-slide opacity crossfades are absent, or transition locking proves old and new slide text never paint at the same time.
- [ ] Slides have opaque stage backgrounds; previous slide titles, numerals, cards, and footers cannot show through during navigation.
- [ ] The deck keeps a fixed 16:9 stage and scales as a whole.
- [ ] A 16:9 stage shell occupies the largest possible viewport rectangle and scales the internal `1920×1080` stage from shell dimensions.
- [ ] At common presentation sizes such as `1280×720`, `1440×900`, and `1920×1080`, the rendered stage equals the expected maximum 16:9 rectangle.
- [ ] Title sizes are calibrated against the reference and do not overpower Chinese text.
- [ ] Distinctive numeral typography/design from the reference is preserved or thoughtfully adapted.
- [ ] Titles do not overlap color blocks, screenshots, cards, or body text.
- [ ] Bottom bars/callouts do not cover text, captions, screenshots, or footer chrome.
- [ ] White/paper/light cards use dark text and sufficient border/contrast.
- [ ] Dark/teal/blue/magenta cards use high-contrast light text.
- [ ] If content is dense, it is split or redesigned rather than shrunk into illegibility.
- [ ] Rendered screenshots were inspected; `scrollHeight`/DOM overflow alone was not treated as enough.
- [ ] Rapid next/previous navigation was stress-tested for deck-like outputs; exactly one displayed slide and one active slide were present during/after navigation.
- [ ] Outside-stage controls are fixed overlays, hover-only, or fullscreen-hidden; they do not reduce stage width, height, scale, or centering.
- [ ] Stage scaling does not reserve a controls safe area; controls chrome never makes a 16:9 playback viewport render smaller than the maximum 16:9 rectangle.
- [ ] If inline editing is present, editing text with arrow keys does not change slides.
- [ ] Every slide has a unique semantic `data-slide-id`, a preserved `data-original-number`, and a current `data-slide-title`.
- [ ] Current page number and total count come from the live slide DOM after deletion or reordering.
- [ ] The slide requirement ledger is fully reconciled with evidence or an explicit approved omission.
- [ ] `scripts/verify-html-ppt-stage.mjs` completed with exit code 0.
- [ ] `scripts/capture-slides.mjs` produced one screenshot per slide and a readable `qa-report.json`.
- [ ] Every full-size screenshot was reviewed with `PPT_VISUAL_QA.md`; measurements were treated as risk signals rather than automatic aesthetic approval.
- [ ] Layout transforms remain on `.stage` / `data-layout-layer`; motion transforms are isolated on nested motion layers.

## 18. Code Quality

- [ ] Code runs with stated dependencies.
- [ ] Personal data is centralized.
- [ ] Components are clearly separated.
- [ ] CSS variables or Tailwind tokens are consistent.
- [ ] No unreachable external assets.
- [ ] No hard-coded personal copy deep in components.
- [ ] Deployment instructions are included.

## Verification record

- [ ] Build/check commands were run when available.
- [ ] Desktop width was inspected for Homepage Mode.
- [ ] Mobile width was inspected for Homepage Mode.
- [ ] Desktop/mobile screenshots were captured or inspected for Homepage Mode when layout changed.
- [ ] Final computed styles were checked for changed Homepage elements.
- [ ] Assets and key interactions were checked in the rendered page.
- [ ] If transforms failed to take effect, positioning layers were separated from animation layers only when needed.
- [ ] Slide-id, page numbers, 1920×1080, presentation keyboard shortcuts, and bottom safe-zone rules must not be required for Homepage Mode.
- [ ] 1920×1080 slide stage was inspected for Presentation Mode.
- [ ] For HTML PPT outputs, stage-centering geometry was checked across at least three viewport sizes, manually or with `scripts/verify-html-ppt-stage.mjs`.
- [ ] For HTML PPT outputs, Playwright and Chromium came from declared project dependencies; environment failures were not reported as deck failures or passes.
- [ ] Any skipped check is named honestly in the delivery note.

## Final Decision

Use this summary format:

```text
Design review: PASS / NEEDS REVISION
Strongest part:
Main risk:
Changes made or recommended:
```
