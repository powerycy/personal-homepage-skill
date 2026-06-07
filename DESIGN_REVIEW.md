# Design Review Checklist

Run this checklist before saying a generated homepage is complete.

## 1. Reference Fidelity

Use this section when the user provided a concrete template, reference site, screenshot description, long visual prompt, or GitHub portfolio template.

- [ ] Did the output treat the provided reference as the selected direction?
- [ ] Did it preserve the reference's information architecture, visual rhythm, component organization, typography mood, spacing, and motion model?
- [ ] Did it avoid replacing the reference with a generic self-generated style, bento layout, dashboard, terminal UI, or random cyber/particle effect?
- [ ] If source code was reused, is the license checked or attribution recorded?

## 2. Personal Homepage Fit

- [ ] Does the page clearly introduce a person, not a SaaS product?
- [ ] Is the person visible in the Hero through name, role, identity, or visual symbol?
- [ ] Does the page answer who they are, what they do, why visitors should trust them, and what to do next?

## 3. Hero Memory Point

- [ ] Does the Hero have a distinctive composition?
- [ ] Is it more than plain left-text-right-image?
- [ ] Are name, role, tagline, primary CTA, and secondary CTA visible?
- [ ] Is the background visually rich but not distracting?
- [ ] Is the Hero readable on mobile?

## 4. Content Quality

- [ ] Is the bio specific and not generic?
- [ ] Are fake metrics avoided?
- [ ] Are placeholders clearly marked?
- [ ] Are skills described as capabilities with outputs?
- [ ] Are projects described with problem, role, features, stack, and result?

## 5. Project Persuasiveness

- [ ] Does each project explain what problem it solves?
- [ ] Does each project show the user's role?
- [ ] Does each project include tech stack or method?
- [ ] Does each project include result, learning, or placeholder?
- [ ] Are project cards visually differentiated?

## 6. Visual System Review

- [ ] If visual previews were shown, did they look like real homepage hero sections rather than option cards?
- [ ] Are option labels, pros/risks, workflow notes, template names, and file names absent from the visual composition?
- [ ] Does typography have personality and avoid a default Arial / Inter / Roboto / system-font-only look?
- [ ] Is there a decisive dominant palette with one or two sharp accents?
- [ ] Does the layout have a clear grammar instead of stacked centered sections?
- [ ] Does the page feel like one continuous real website, with no hard background seams, no PPT-like slide breakpoints, and no unrelated section-by-section background blocks?
- [ ] Does the background create identity-specific atmosphere instead of using random glow/orb filler?
- [ ] Is there one primary motion system rather than scattered particle/hover effects?
- [ ] Does the page look like a real deployable homepage, not a demo or planning artifact?

## 7. Anti-Template Review

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

## 8. Motion Review

- [ ] Motion supports hierarchy or interaction.
- [ ] Important text does not move while being read.
- [ ] There is reduced-motion support.
- [ ] Mobile disables or simplifies heavy motion.
- [ ] No scroll hijacking.
- [ ] No excessive particle density.

## 9. 3D Review

- [ ] 3D is optional and has fallback.
- [ ] No huge model is loaded by default.
- [ ] Spline is used only if user provided a real link.
- [ ] Text remains readable over 3D/background.
- [ ] Mobile experience is not broken.

## 10. Accessibility

- [ ] Semantic sections are used.
- [ ] Buttons and links have focus states.
- [ ] Images have alt text.
- [ ] Color contrast is sufficient.
- [ ] Decorative visuals are `aria-hidden`.
- [ ] Keyboard navigation works for interactive elements.

## 11. Responsive Design

- [ ] Hero works on small screens.
- [ ] Project cards stack cleanly.
- [ ] Text sizes remain readable.
- [ ] No horizontal overflow.
- [ ] Touch interactions do not require hover.

## 12. Code Quality

- [ ] Code runs with stated dependencies.
- [ ] Personal data is centralized.
- [ ] Components are clearly separated.
- [ ] CSS variables or Tailwind tokens are consistent.
- [ ] No unreachable external assets.
- [ ] No hard-coded personal copy deep in components.
- [ ] Deployment instructions are included.

## Final Decision

Use this summary format:

```text
Design review: PASS / NEEDS REVISION
Strongest part:
Main risk:
Changes made or recommended:
```
