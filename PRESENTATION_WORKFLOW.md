# 16:9 HTML Presentation Workflow

Use this mode when the user asks for PPT, slides, presentation HTML, pitch deck, project roadshow, competition deck, teaching deck, or a PowerPoint-style browser presentation.

## Core model

Presentation Mode is different from Homepage Mode:

- Homepage Mode creates a responsive continuous website.
- Presentation Mode creates a fixed 16:9 slide deck.

For now this skill standardizes on a **1920×1080 16:9 stage**. Every slide is authored at that size and scaled uniformly to fit the browser viewport. The deck may letterbox or pillarbox, but slide content must not reflow based on device width.

## Mode detection

Switch to Presentation Mode when the user says:

- PPT
- presentation
- slides
- slide deck
- 路演 PPT
- 项目汇报
- 比赛演示
- HTML PPT
- 浏览器全屏播放

If the user asks for a personal homepage and a PPT in the same task, ask which deliverable should be produced first unless they provide a clear order.

## Stage rules

- Canvas size: `1920px × 1080px`.
- Aspect ratio: 16:9.
- Each slide is one full-screen page during playback.
- The stage scales as a whole to the viewport and must occupy the largest possible 16:9 rectangle. In a 1920×1080 viewport, the rendered stage should be exactly 1920×1080 with no reserved safe-area gap.
- Do not subtract control bars, captions, edit panels, browser hints, or bottom safe areas from the stage scaling calculation. Presentation playback takes priority over visible controls.
- Do not use responsive breakpoints to rearrange slide content.
- Do not use normal webpage scrolling as the slide mechanism.
- Use `.slide.active` / `.slide.visible` style visibility control rather than `display: none` when slide layout classes may override display.
- Use a 16:9 wrapper/shell for layout and scale the internal 1920×1080 stage from the wrapper dimensions. Avoid centering a transformed 1920×1080 element directly in CSS grid/flex, because its unscaled layout box can push the rendered stage off-center.
- Include `prefers-reduced-motion` support.
- Provide keyboard navigation: ArrowLeft, ArrowRight, Space, PageUp, PageDown, Home, End, and F for fullscreen when available.

## Controls and fullscreen chrome

- Treat navigation controls, page counters, edit buttons, and helper hints as viewport overlays, not layout rows.
- Controls may be fixed or absolutely positioned over the viewport with transparent styling, fade on idle, or hide in fullscreen.
- Controls must not reduce `.stage` width, height, scale, or centering.
- Never make a deck smaller just to keep controls outside the slide image. If controls collide with content during presentation, hide them or make them hover-only.
- Verify with `scripts/verify-html-ppt-stage.mjs`; it should fail when a 16:9 viewport leaves unused margins caused by controls.

## Density modes

### Low density / speaker-led

Best for live presentations, roadshows, public sharing, and competitions.

Rules:

- One idea per slide.
- 1-3 bullets max.
- Very large headings, short copy.
- More slides are better than cramped slides.
- Use images and diagrams as the main proof, not decoration.

### High density / reading-first

Best for internal review, handouts, reports, and async project summaries.

Rules:

- 4-6 bullets/cards per slide max.
- Use grids, tables, annotated screenshots, and captions.
- Keep text comfortably readable at 1920×1080.
- Split into continuation slides instead of shrinking text too far.

## Visual style mapping

Homepage templates can become presentation themes:

- Cinematic Scroll Personal Brand → cinematic roadshow deck.
- Terminal Hacker Homepage → technical demo / open-source deck.
- AI System Dashboard → AI Agent architecture deck.
- Case Study Portfolio → project case-study deck.
- Art Museum Portfolio → art / photography portfolio deck.
- Creator Bento Homepage → creator strategy / content plan deck.
- Business Personal Brand → business proposal / consulting deck.

Use `STYLE_PRESETS.md` for the visual direction, but translate homepage sections into slide layouts.

## Image rules

- Scan images before creating the outline.
- Use images large enough to understand.
- Do not place important screenshots as tiny thumbnails.
- Use relative paths for local assets.
- If an image is missing, use a deliberate placeholder and state it honestly.
- One slide should usually have one dominant image or a clear 2-up comparison.

## Chinese typography rules

- Titles: short, balanced, CJK-capable font stack.
- Body: readable CJK sans or serif; never oversized long paragraphs.
- Labels/chrome: consistent font and casing.
- Avoid mixing many fonts in one deck.
- If a Chinese title wraps badly, rewrite it shorter instead of shrinking it until unreadable.

## Verification

Before delivery:

- Run build/check scripts if modifying this repository.
- Open the deck at desktop size.
- Check at least one small viewport to confirm 16:9 scaling works.
- Verify slide count, navigation, active slide visibility, and fullscreen shortcut.
- Check no text or images overflow the 1920×1080 safe area.
- Check local images/videos resolve from relative paths.
