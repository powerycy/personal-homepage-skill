# 16:9 HTML Presentation Workflow

Use this mode when the user asks for PPT, slides, presentation HTML, pitch deck, project roadshow, competition deck, teaching deck, or a PowerPoint-style browser presentation.

## Contents

- Core model and mode detection
- Eight-problem acceptance map
- QA workspace and audit-only branch
- Stage, metadata, motion-layer, keyboard, and control rules
- Density, visual style, image, and Chinese typography rules
- Verification commands, artifacts, dependencies, and exit codes

## Core model

Presentation Mode is different from Homepage Mode:

- Homepage Mode creates a responsive continuous website.
- Presentation Mode creates a fixed 16:9 slide deck.

For now this skill standardizes on a **1920×1080 16:9 stage**. Every slide is authored at that size and scaled uniformly to fit the browser viewport. The deck may letterbox or pillarbox, but slide content must not reflow based on device width.

Detailed visual judgment for template fidelity, asset quality, composition, and low-text slides lives in [PPT_VISUAL_QA.md](PPT_VISUAL_QA.md). Read its pre-authoring section before asset/layout decisions and its rendered-review section after capture. Do not duplicate those rules here.

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

## Eight-problem acceptance map

Use this table as the single naming contract for the eight PPT problems. Every problem needs both a rule and evidence.

| Problem | Required rule | Acceptance evidence |
| --- | --- | --- |
| Requirement omission | Maintain and reconcile the slide requirement ledger. | Every source requirement has a stable slide ID, status, and screenshot/check evidence or an approved omission. |
| Template fidelity | Decompose the reference before coding and compare the rendered result afterward. | `template-decomposition.txt` plus full-size slide comparison notes. |
| Asset selection | Follow the real-source-first asset priority and record provenance. | Ledger asset entry, resolved file, source/provenance, crop, and screenshot. |
| Visual balance | Review title baseline, content center, whitespace, and bottom safety. | `qa-report.json` measurements plus human/model judgment in `visual-review.txt`. |
| Sparse slides | Choose a deliberate low-text composition instead of filler. | Named sparse-slide strategy and full-size screenshot review. |
| Ineffective changes | Check computed styles and compare final screenshots; separate layout and motion layers. | Computed-style finding, before/after screenshot reference, and transform audit result. |
| Shortcut coverage | Test actual key behavior and editing-context isolation. | `verify-html-ppt-stage.mjs` exit 0 with semantic shortcut results. |
| Deletion and numbering | Use stable semantic metadata and generate current numbering from live DOM. | Unique IDs, preserved original numbers, current DOM counter, and safe deleted-state fallback. |

## QA workspace and Audit-only branch

Do not assume the current directory is the Skill directory. Resolve explicit paths before running tools:

```bash
SKILL_DIR="${CODEX_HOME:-$HOME/.codex}/skills/personal-homepage-skill"
DECK_HTML="/absolute/path/to/deck.html"
QA_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/personal-homepage-ppt-qa.XXXXXX")"
NODE_BIN="$(command -v node || true)"
case "$NODE_BIN" in /*) test -x "$NODE_BIN" || NODE_BIN="" ;; *) NODE_BIN="" ;; esac
```

Require `NODE_BIN` to be an executable absolute path; otherwise clear it and use the fallback below. If `NODE_BIN` is empty in Codex, load workspace dependencies and set it to the returned absolute Node.js executable. If that loader is unavailable, discover the installed runtime without hardcoding a bundle version:

```bash
NODE_BIN="$(find "$HOME/.cache/codex-runtimes" -path '*/dependencies/node/bin/node' -type f -perm -111 -print -quit 2>/dev/null)"
PNPM_BIN="$(find "$HOME/.cache/codex-runtimes" -path '*/dependencies/bin/fallback/pnpm' -type f -perm -111 -print -quit 2>/dev/null)"
```

Require `test -x "$NODE_BIN"`; if it still fails, classify the run as exit-code-2 environment failure. Do not hardcode a cache bundle identifier. Confirm that `$SKILL_DIR/scripts/verify-html-ppt-stage.mjs` exists before continuing.

Use these standard QA artifacts:

- `$QA_ROOT/slide-requirements.json`: requirement ledger for authoring or audit.
- `$QA_ROOT/template-decomposition.txt`: reference analysis; write `not provided` when no reference exists.
- `$QA_ROOT/stage-checks/`: deterministic viewport screenshots.
- `$QA_ROOT/slide-captures/`: one full-size screenshot per slide and `qa-report.json`.
- `$QA_ROOT/visual-review.txt`: per-slide pass, revision, or approved-exception judgment.

For an existing-deck audit, build the ledger from the user's request and the current deck, keep all artifacts under `$QA_ROOT`, and never modify the deck unless the user separately authorizes an edit. Record the deck hash before and after the audit when immutability matters. If the user forbids all filesystem writes, deterministic checks may run without `--screenshots`, but full rendered visual acceptance is blocked because capture requires scratch output; report that limitation instead of claiming a pass.

## Narrative contract

Before page-level authoring, confirm the intended audience, presentation goal, and narrative sequence. The ledger prevents omission, but it does not by itself guarantee a coherent story. Visible slide copy must address the audience and must not expose production notes, QA instructions, or planning scaffolds.

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

## Mandatory slide requirement ledger

Before authoring, create a slide requirement ledger from the user's request and source materials. This ledger is a working artifact for the deck task, not visible slide content. Each row must contain:

- source requirement or exact request excerpt
- required source asset or evidence
- intended slide action or interaction
- expected page state
- stable `data-slide-id`
- verification evidence: screenshot filename, automated check, or explicit manual review
- status: pending, pass, revised, intentionally omitted with reason

Reconcile every row before delivery. A deck does not pass because it looks complete; every requested item needs evidence or an explicit omission approved by the user.

## Reference template decomposition

When the user supplies a template, screenshot, existing deck, or adopted version, inspect it before coding. Record the layout grid, title baseline, font roles, whitespace rhythm, person scale, image aspect ratios and crops, decorative system, footer/chrome, and motion model. Use [PPT_VISUAL_QA.md](PPT_VISUAL_QA.md) for the visual comparison contract.

## Stable slide metadata and numbering

Every slide must expose semantic metadata:

```html
<section
  class="slide"
  data-slide-id="problem-context"
  data-original-number="07"
  data-slide-title="Why the next opportunity is outside the AI circle"
>
```

- `data-slide-id` is unique and stable across copy edits, deletion, and reordering. Prefer semantic IDs over `slide-07`.
- `data-original-number` records the source or first-draft page number and does not change after reordering.
- `data-slide-title` records the current page title for QA and capture reports.
- Current number and total count are generated from the live `.slide` DOM collection.
- Clamp the active index after deletion. If a hash or saved state targets a deleted slide, fall back safely to the nearest valid slide.
- Generate editable element IDs from the stable slide ID plus semantic text role, never from current DOM order alone.

## Layout and motion layer separation

Do not let an animation overwrite positioning transforms. Put layout placement and motion on separate elements:

```html
<div data-layout-layer class="position-layer">
  <div data-motion-layer class="motion-layer">...</div>
</div>
```

The stage scaling transform and `data-layout-layer` transforms are layout state. Animation libraries and CSS keyframes may animate `data-motion-layer`; they must not replace transforms on `.stage` or `data-layout-layer`.

## Required keyboard behavior

Test behavior rather than searching source strings:

- ArrowLeft/ArrowUp/PageUp move backward.
- ArrowRight/ArrowDown/Space/PageDown move forward.
- Home and End move to the first and final live slide.
- F enters or exits fullscreen when the browser permits it.
- Esc exits editing without changing slides; browser-native Esc exits fullscreen and must leave the current slide unchanged.
- E toggles inline editing outside form fields and editable text.
- Cmd/Ctrl+S prevents the browser save-page action and persists edits.
- Navigation shortcuts do nothing when the target is `input`, `textarea`, `select`, or `[contenteditable="true"]`.

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

Install declared dependencies once in the Skill directory when needed. With standard Node/npm:

```bash
NPM_BIN="$(command -v npm || true)"
NPX_BIN="$(command -v npx || true)"
case "$NPM_BIN" in /*) test -x "$NPM_BIN" ;; *) false ;; esac
case "$NPX_BIN" in /*) test -x "$NPX_BIN" ;; *) false ;; esac
"$NPM_BIN" ci --prefix "$SKILL_DIR"
(cd "$SKILL_DIR" && "$NPX_BIN" playwright install chromium)
```

If Codex exposes Node and pnpm only through workspace dependencies, set `NODE_BIN` and `PNPM_BIN` from that tool result, prepend `dirname "$NODE_BIN"` to `PATH`, run `"$PNPM_BIN" dlx npm@11.4.2 ci --prefix "$SKILL_DIR"`, then run `"$NODE_BIN" "$SKILL_DIR/node_modules/playwright/cli.js" install chromium`. Do not rely on global Playwright or a globally installed browser.

Run both Presentation Mode tools with absolute paths:

```bash
"$NODE_BIN" "$SKILL_DIR/scripts/verify-html-ppt-stage.mjs" "$DECK_HTML" \
  --screenshots "$QA_ROOT/stage-checks"

"$NODE_BIN" "$SKILL_DIR/scripts/capture-slides.mjs" "$DECK_HTML" \
  --output "$QA_ROOT/slide-captures"
```

`verify-html-ppt-stage.mjs` checks deterministic structure and behavior: stage geometry, exactly one painted/active slide, stable metadata, broken assets, required shortcut behavior, rapid navigation, and high-confidence transform conflicts. `capture-slides.mjs` captures every slide, measures title and content geometry, and writes `qa-report.json`; it does not decide whether the deck is aesthetically good.

Exit codes are contractual:

- `0`: checks or capture completed successfully.
- `1`: the deck failed validation or capture/navigation could not complete.
- `2`: invocation or environment failure, including missing Playwright or Chromium.

After capture, inspect every full-size screenshot with the post-render section of [PPT_VISUAL_QA.md](PPT_VISUAL_QA.md), write `$QA_ROOT/visual-review.txt`, and reconcile `$QA_ROOT/slide-requirements.json`.

These workflow, stage, numbering, shortcut, and PPT visual rules apply only to Presentation Mode. They must not be applied to Homepage Mode.
