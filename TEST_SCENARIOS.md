# Test Scenarios: personal-homepage-skill

## Source

Feature specification for an AI Skill that generates personal homepages, portfolios, creator pages, job-seeking pages, technical pages, designer pages, animated pages, and 3D-enabled frontend demos.

## Coverage

- skill triggering
- identity and style selection
- template/reference-first routing
- visual direction previews only when direction is unclear
- information architecture
- React/Tailwind/Framer Motion output
- pure HTML output
- 3D fallback
- accessibility
- reduced motion
- mobile responsiveness
- anti-template review
- content quality
- reference and license boundaries

## Scenario 1: Skill triggers for technical personal homepage

**Priority:** Critical

**Preconditions:** User asks for a personal homepage for an AI engineer.

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User says: “帮我生成一个 AI 工程师个人主页，要酷炫、3D、项目展示。” | Skill is considered applicable. |
| 2 | Agent starts response. | Agent frames task as personal homepage, not SaaS landing page. |
| 3 | Agent selects style. | Agent recommends 3D Tech Portfolio / AI System Dashboard / Terminal Hacker. |

## Scenario 2: Skill does not over-trigger for SaaS landing page

**Priority:** High

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User asks: “给我的 SaaS 产品做官网首页。” | Agent does not treat it as personal homepage unless product page is about a person. |
| 2 | Agent responds. | Agent uses normal frontend design flow, not personal profile sections. |

## Scenario 3: Missing user info still produces useful placeholders

**Priority:** Critical

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User says: “我信息不多，先做求职主页。” | Agent does not repeatedly block with questions. |
| 2 | Agent proposes structure. | Uses placeholders for missing metrics, projects, links. |
| 3 | Agent writes copy. | Does not invent school, company, awards, or metrics. |

## Scenario 4: User-provided template is followed before self-generated directions

**Priority:** Critical

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User provides a concrete template, reference site, screenshot description, long visual prompt, or GitHub portfolio template. | Agent treats the reference as the selected direction. |
| 2 | Agent chooses visual route. | Agent does not propose self-generated visual options first. |
| 3 | Agent creates structure. | Information architecture, visual rhythm, component organization, typography mood, and motion model preserve the reference unless user asks to reinterpret it. |

## Scenario 4B: Real visual previews are proposed only when style is unclear

**Priority:** High

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User gives identity and projects but no visual preference or reference. | Agent provides 2-3 real homepage hero preview directions. |
| 2 | Review each direction. | Assistant-side explanation includes style name, hero, color, type, motion, 3D, project section, pros, and risks. The visual preview itself does not contain A/B/C labels, pros/risks, workflow notes, template names, file names, or internal planning text. |
| 3 | User does not choose. | Agent auto-recommends best direction with reasoning. |

## Scenario 5: Designer homepage selects editorial/portfolio style

**Priority:** High

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User asks for designer portfolio. | Agent selects Magazine Portfolio / Dark Editorial Portfolio / Spatial Project Gallery. |
| 2 | Agent creates IA. | Project gallery and case-study sections are prioritized. |
| 3 | Agent avoids technical dashboard style. | Page does not look like AI SaaS dashboard. |

## Scenario 6: Creator homepage emphasizes content platforms

**Priority:** High

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User says they are Xiaohongshu/Bilibili creator. | Agent selects Motion Gradient Brand or Creator Bento. |
| 2 | Agent structures content. | Includes platform cards, representative content, collaboration CTA. |
| 3 | Missing metrics. | Uses placeholders, no fake followers/views. |

## Scenario 7: React output uses centralized profile data

**Priority:** Critical

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User requests React homepage. | Agent uses React + Tailwind + Framer Motion by default. |
| 2 | Inspect code. | Profile data is centralized in `profile` object or file. |
| 3 | Inspect components. | Components render data instead of hard-coding all copy. |

## Scenario 8: Pure HTML single-file output

**Priority:** High

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User requests single HTML file. | Agent outputs HTML/CSS/JS in one file. |
| 2 | Inspect dependencies. | No build step required. |
| 3 | Inspect assets. | No random inaccessible external images. |
| 4 | Open in browser. | Page renders and interactions work. |

## Scenario 9: 3D effect has fallback

**Priority:** Critical

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User requests 3D homepage. | Agent includes 3D plan. |
| 2 | Inspect code. | Heavy 3D has fallback or CSS-only alternative. |
| 3 | Mobile mode. | 3D is simplified or disabled. |
| 4 | Reduced motion. | Animations are disabled or minimized. |

## Scenario 10: Accessibility and reduced motion

**Priority:** Critical

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Inspect CSS. | Contains `prefers-reduced-motion`. |
| 2 | Inspect images. | Images have alt text. |
| 3 | Inspect links/buttons. | Focus states exist. |
| 4 | Inspect decorative visuals. | Decorative backgrounds are `aria-hidden` when appropriate. |

## Scenario 11: Anti-template review catches AI slop

**Priority:** Critical

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | Generated page has generic purple gradient, equal cards, vague copy. | Agent flags it as failing design review. |
| 2 | Agent revises. | Hero becomes more identity-specific; skills and projects gain detail. |
| 3 | Final response. | Includes design review summary. |

## Scenario 12: Project card content quality

**Priority:** Critical

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User provides project names only. | Agent asks minimally or uses placeholders. |
| 2 | Agent creates project cards. | Each project includes problem, role, features, stack, result placeholder. |
| 3 | Inspect copy. | No vague one-liners only. |

## Scenario 13: Source reuse respects license boundaries

**Priority:** High

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User says source code can be copied. | Agent still checks license/authorization. |
| 2 | Source is open-source with permissive license. | Agent can copy/adapt and preserves attribution. |
| 3 | Source is MotionSites paid template or unclear license. | Agent does not copy; only abstracts design pattern. |

## Scenario 14: Final output includes required sections

**Priority:** Critical

| Step | Action | Expected Result |
| --- | --- | --- |
| 1 | User requests full homepage generation. | Final answer includes design direction, structure, motion plan, tech stack, code, replacement guide, deployment notes, review summary, next steps. |
| 2 | User asks only for Skill files. | Agent creates or outputs Skill folder structure. |

## Coverage Matrix

| Requirement | Scenario |
| --- | --- |
| Skill triggering | 1, 2 |
| Identity/style selection | 1, 4, 5, 6 |
| Template/reference-first routing | 4 |
| Real visual previews only when unclear | 4B |
| Missing info placeholders | 3, 12 |
| React code quality | 7 |
| Pure HTML | 8 |
| 3D fallback | 9 |
| Accessibility | 10 |
| Anti-template review | 11 |
| Source reuse | 13 |
| Final output format | 14 |
