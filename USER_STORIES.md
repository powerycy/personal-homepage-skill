# User Stories and Acceptance Criteria

## Epic 1: Skill Discovery and Triggering

### Story 1.1: Generate personal homepage

As a user, I want the AI to recognize when I ask for a personal homepage, so that it uses homepage-specific design and content rules.

Acceptance:

- Given the user asks for a personal homepage, portfolio, resume page, creator homepage, or personal brand site, the Skill is applicable.
- Given the user asks for a generic SaaS landing page, the Skill is not used unless the page is primarily about a person.

### Story 1.2: Avoid generic SaaS output

As a user, I want my homepage to feel personal, so that visitors remember me rather than a generic product.

Acceptance:

- Hero includes name, role, tagline, CTA, and identity visual.
- Page does not use generic SaaS copy or layout as the main structure.
- Design review flags SaaS-like output.

## Epic 2: Identity and Style Selection

### Story 2.1: Match style to identity

As a user, I want the AI to choose a suitable style for my identity, so that a designer, engineer, creator, and job seeker do not all get the same page.

Acceptance:

- Technical users map to tech/AI/terminal/spatial styles.
- Designers map to magazine/gallery/editorial styles.
- Creators map to brand/bento/social styles.
- Job seekers map to premium resume/case-study styles.
- Consultants map to business personal brand styles.

### Story 2.2: Follow user-provided templates first

As a user, I want the AI to fully respect a concrete template, reference site, screenshot description, long prompt, or GitHub portfolio template, so that the generated homepage keeps the visual quality of the reference instead of drifting into weaker self-generated styles.

Acceptance:

- If the user provides a concrete reference, AI treats it as the selected direction.
- AI preserves the reference's information architecture, visual rhythm, component organization, typography mood, spacing, and motion model unless the user asks to reinterpret it.
- AI does not propose self-generated visual options first when a concrete reference exists.
- If source code reuse is requested, AI checks or records license boundaries before copying.

### Story 2.3: Show real visual previews only when unclear

As a user without a concrete visual reference, I want concrete visual previews before final code, so that I can react to real design possibilities instead of option cards.

Acceptance:

- If visual preference and reference are both unclear, AI provides 2-3 concrete homepage hero preview directions.
- Assistant-side explanation includes hero structure, color, typography, motion, 3D / cool-effect plan, project section, pros, and risks; when 3D is inappropriate, the plan explicitly says “not needed”.
- The visual preview itself does not contain A/B/C labels, pros/risks, workflow notes, template names, file names, or internal planning text.
- If user does not select, AI recommends the strongest fit.

## Epic 3: Information Architecture

### Story 3.1: Build meaningful sections

As a user, I want the page sections to reflect my actual identity and proof, so that the page is persuasive.

Acceptance:

- Candidate sections include Hero, About, Highlights, Skills, Projects, Experience, Content, Testimonials, Contact, Footer.
- Testimonials are used only when real endorsements exist or placeholders are explicitly marked.
- Irrelevant sections are removed instead of filled with fluff.
- Each section has a clear purpose and visual component.

### Story 3.2: Handle missing information

As a user with limited information, I want the AI to generate a usable draft with placeholders, so that I am not blocked.

Acceptance:

- AI uses explicit placeholders for missing metrics, links, images, or project results.
- AI does not invent schools, companies, followers, awards, or numbers.
- Placeholders are easy to replace.

## Epic 4: Content Quality

### Story 4.1: Write specific bio

As a user, I want specific copy instead of vague self-praise, so that the page sounds credible.

Acceptance:

- Bio is 3-5 sentences.
- Bio includes current direction, background, edge, and credibility.
- Copy avoids phrases such as “Passionate developer” and “Creative problem solver”.

### Story 4.2: Make project cards persuasive

As a user, I want each project to show proof of capability, so that visitors understand my work.

Acceptance:

- Each project includes problem, role, core features, stack, result or placeholder, link or placeholder.
- Project cards are visually differentiated.
- No project is reduced to only title and vague description.

### Story 4.3: Make skills capability-based

As a user, I want skills to explain what I can actually do, so that visitors see capability rather than tool names.

Acceptance:

- Skills are grouped by capability.
- Each skill connects to output, project, or method.
- Skill section is not only an icon wall.

## Epic 5: Code Generation

### Story 5.1: Generate React homepage

As a user, I want runnable React code, so that I can deploy and maintain the page.

Acceptance:

- Uses React + Tailwind + Framer Motion + lucide-react by default.
- Personal data is centralized in `profile` object or file.
- Components are separated by section.
- Page is responsive and accessible.

### Story 5.2: Generate pure HTML homepage

As a user, I want a single HTML file option, so that I can open or deploy it without build tools.

Acceptance:

- Output includes HTML, CSS, and JS in one file.
- No build step is required.
- Page supports mobile and reduced motion.
- No inaccessible external images are required.

### Story 5.3: Support 3D safely

As a user, I want 3D and cool effects, so that the page feels memorable without breaking performance.

Acceptance:

- 3D has fallback.
- Mobile simplifies heavy effects.
- No huge external model is loaded by default.
- Spline is used only with a user-provided link.

## Epic 6: Design Review

### Story 6.1: Final self-check

As a user, I want the AI to review the result before finishing, so that obvious template or quality issues are caught.

Acceptance:

- Final output includes design review summary.
- Review checks hero, content, projects, motion, 3D, accessibility, responsive behavior, and code quality.
- If review fails, AI revises or clearly reports what needs revision.

## Epic 7: Source Reuse

### Story 7.1: Reuse open-source code responsibly

As a user, I want AI to reference open-source products when helpful, so that development is faster and better.

Acceptance:

- AI checks or records license before copying source.
- Copied or adapted source keeps attribution.
- MotionSites is used only as design inspiration unless user provides lawful template content.
