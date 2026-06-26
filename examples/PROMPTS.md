# Example Prompts

Use these prompts to test or demonstrate `personal-homepage-skill`.

Each example includes the user prompt, expected routing, and quality notes. Do not treat the sample people or projects as real user data.

## 1. AI engineer personal brand

### Prompt

```text
帮我生成一个个人主页。我叫「好奇的小逸」，定位是大厂基座模型算法工程师 / AI 产品实践者。
方向包括大语言模型、RLHF、Agentic Search、Coding Agent、Vibe Coding、AI 产品实践。
页面要像高级数字名片，不要像完整简历。访客 3 秒知道我是谁，10 秒知道我做什么，30 秒能点进小红书 / GitHub / 知乎 / 公众号 / 视频号。
```

### Expected routing

- Skill applies.
- Best presets: Cinematic Scroll Personal Brand, 3D Tech Portfolio, AI System Dashboard.
- If user provides WISA-style reference, follow the cinematic reference first.

### Quality notes

- Hero must center the person, not a product.
- Do not invent content metrics.
- Social/content links can use placeholders or QR modal placeholders.

## 2. Strict cinematic reference

### Prompt

```text
严格按照这个视觉要求做个人主页：暗黑电影感、固定全屏视频背景、滚动驱动视频、Manrope + JetBrains Mono、稀疏排版、玻璃质感 footer。
不要重新发明视觉风格。
```

### Expected routing

- Reference-first behavior.
- Use Cinematic Scroll Personal Brand and CINEMATIC_SCROLL_TEMPLATE.md.
- Do not propose 2-3 alternative visual directions first.

### Quality notes

- Preserve sparse layout rhythm.
- Use one primary motion system: scroll video + reveal.
- Avoid generic dashboard, bento, terminal, or purple gradient replacement.

## 3. Clean developer homepage

### Prompt

```text
帮我做一个前端开发者个人主页，参考 passer-by.com 那种清爽排版：浅蓝白背景、简洁导航、头像/手绘形象、地点标签、About、GitHub CTA、项目卡片。
```

### Expected routing

- Reference-first behavior.
- Use Clean Developer Homepage.
- Learn layout rhythm only; do not copy passer-by.com source, avatar, logo, text, or project data.

### Quality notes

- Page should feel continuous, not like background blocks.
- Use soft wave or gradient bridges between sections.
- Project cards should have clear links and short descriptions.

## 4. Designer portfolio

### Prompt

```text
我是一名视觉设计师，想做个人作品集主页。项目有品牌设计、海报、摄影和交互页面。
希望像一本高级杂志，有大标题、留白、作品图墙、案例故事和联系入口。
```

### Expected routing

- Skill applies.
- Best presets: Magazine Portfolio, Dark Editorial Portfolio, Spatial Project Gallery, Art Museum Portfolio.

### Quality notes

- Image-led sections should dominate.
- Do not use AI dashboard or terminal visuals.
- If real images are missing, use clear placeholders rather than fake portfolio images.

## 5. Art / photography portfolio

### Prompt

```text
我是一名摄影师，想做个人主页。可以参考 Google Arts & Culture 的策展感：作品墙、系列、展览、艺术家陈述、联系入口。
```

### Expected routing

- Reference-first behavior.
- Use Art Museum Portfolio.
- Learn curation patterns only; do not copy Google assets, artwork, text, or collection data.

### Quality notes

- Use museum-paper background, refined typography, and curated story cards.
- Organize work by series, themes, exhibitions, or medium.

## 6. Creator / self-media homepage

### Prompt

```text
我是小红书和 B 站内容创作者，主题是 AI 学习、AI 工具和个人效率。
帮我生成一个个人主页，重点是内容入口、代表笔记、视频、合作联系和个人介绍。
```

### Expected routing

- Skill applies.
- Best presets: Creator Bento Homepage, Motion Gradient Brand, Cinematic Scroll Personal Brand.

### Quality notes

- Do not invent follower count or views.
- Use content cards and platform CTAs.
- Collaboration CTA should be obvious.

## 7. Student job-seeking homepage

### Prompt

```text
我是应届生，想做 AI 产品 / 前端方向求职主页。信息还不多，先用占位符做一个高级、可信、可以部署的版本。
```

### Expected routing

- Skill applies.
- Best presets: Minimal Premium Resume, Case Study Portfolio.

### Quality notes

- Use placeholders for missing project results.
- Do not invent university, internship, awards, or metrics.
- Keep page credible and readable.

## 8. Playful product / character IP page

### Prompt

```text
我想做一个角色 IP / 潮玩方向的个人主页，参考 TOONHUB 那种全屏角色轮播、鲜艳背景、Anton 大字、中心人物、左右辅助角色和 DISCOVER CTA。
```

### Expected routing

- Reference-first behavior.
- Use TOONHUB Figurine Carousel.
- Use user-provided or authorized character images.

### Quality notes

- Keep carousel motion disciplined.
- Do not use inaccessible Figma images unless user provided them for the demo.
- Not recommended for serious resume pages unless requested.

## 9. Founder / consultant homepage

### Prompt

```text
我是 AI 产品顾问，帮创业团队把 AI 能力落地成真实产品。
做一个个人品牌主页，要有服务方向、案例、方法论、预约咨询入口和 GitHub / 文章链接。
```

### Expected routing

- Skill applies.
- Best presets: Business Personal Brand, Cinematic Scroll Personal Brand, Motion Gradient Brand.

### Quality notes

- Keep personal credibility visible.
- Avoid generic “grow your business” SaaS copy.
- If case results are missing, use placeholders.

## 10. No clear visual direction

### Prompt

```text
帮我做一个个人主页。我是独立开发者，做过几个 AI 小工具，也写技术文章。
```

### Expected routing

- Skill applies.
- Since no concrete visual direction exists, propose 2-3 real homepage hero preview directions.
- Do not put A/B/C labels, pros/risks, workflow notes, file names, or template names inside the visual composition.

### Quality notes

- Auto-recommend the strongest fit if user does not choose.
- Use placeholders for missing details.

## 11. Orbis NFT / collectible project landing

### Prompt

```text
把我提供的 Orbis.Nft 提示词做成一个可复用模板方向：暗色太空主题、CloudFront 视频背景、liquid glass UI、Anton + Condiment 字体、4 个 section，包括 hero、about、collection grid 和 final CTA。
这个模板后续用于我的个人项目 / NFT collection / 数字藏品发布页，不是普通简历页。
```

### Expected routing

- Reference-first behavior.
- Use Orbis NFT Space Landing and `templates/orbis-nft/README.md`.
- Treat the prompt as an authorized visual specification for a person-led project page.
- Do not turn `personal-homepage-skill` into a generic NFT marketplace generator.

### Quality notes

- Preserve the four-section structure, dark navy / cream / neon palette, Anton display type, Condiment accent type, and liquid-glass CSS behavior.
- Replace brand copy, rarity scores, social links, texture, and video URLs unless the user explicitly authorizes the provided assets.
- Do not invent NFT metrics, prices, blockchain claims, or unavailable media URLs.
