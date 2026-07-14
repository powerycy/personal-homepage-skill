# 16:9 HTML Presentation Starter

Use `presentation.html` when the user wants a PPT-style browser deck.

Rules:

- Single HTML file.
- Fixed 1920×1080 stage.
- Stage scales uniformly to the largest possible 16:9 viewport rectangle.
- Slides stay 16:9 on every device.
- Controls are transparent viewport overlays and must not reserve layout space.
- Use keyboard navigation and fullscreen shortcut.
- Use CJK-safe typography.
- Keep images relative to the HTML file.
- Give every slide unique semantic `data-slide-id`, preserved `data-original-number`, and current `data-slide-title` attributes.
- Generate counters from the live slide DOM and generate editable IDs from stable slide IDs.
- Keep stage/layout transforms separate from nested motion transforms.

Before delivery, resolve `SKILL_DIR`, `NODE_BIN`, dependency installation, and scratch `QA_ROOT` exactly as described in `PRESENTATION_WORKFLOW.md`, then run:

```bash
"$NODE_BIN" "$SKILL_DIR/scripts/verify-html-ppt-stage.mjs" /absolute/path/to/deck.html
"$NODE_BIN" "$SKILL_DIR/scripts/capture-slides.mjs" /absolute/path/to/deck.html --output "$QA_ROOT/slide-captures"
```

Exit code `1` means the deck failed validation or capture. Exit code `2` means invocation or environment setup failed.
