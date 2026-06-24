# Image Workflow

Images must be handled before final information architecture is locked. A homepage or PPT-style HTML deck with broken, tiny, or randomly cropped images feels unfinished even when the code runs.

## 1. Scan

For a supplied asset folder, list image and video files:

- `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`, `.gif`
- `.mp4`, `.webm`, `.mov` when video is intended

Capture filename, format, approximate dimensions when available, and likely role.

## 2. Classify roles

Use these roles:

- hero portrait
- project screenshot
- product video
- artwork
- content cover
- logo or wordmark
- QR code
- background texture

## 3. Evaluate usability

For each asset, mark usable or not usable and explain why.

Usable assets should have:

- enough resolution for their intended placement
- clear subject
- acceptable cropping
- authorized usage
- a role in the page narrative

Not usable assets include:

- tiny screenshots for full-width hero use
- unreadable compressed captures
- unrelated images
- assets with unknown copyright when used as content
- files referenced by path but not present

## 4. Placement rules

- Use hero images large enough to be understood.
- Use `object-fit` and aspect-ratio containers to prevent distortion.
- Give every meaningful image alt text.
- Use relative paths in generated deliverables.
- Avoid absolute local paths in HTML/CSS.
- Do not invent cloud URLs, Figma URLs, Spline URLs, or CDN paths.

## 5. Missing image fallback

When assets are missing or weak:

- use a polished CSS placeholder
- use initials or a wordmark
- use project mockup frames
- use abstract identity symbols
- use deliberate color blocks for art-gallery layouts

Make missing content explicit through labels like “待补充” only when appropriate for an editable draft.
