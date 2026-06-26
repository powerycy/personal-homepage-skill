# Reference Products and Original Design Notes

本文件记录 personal-homepage-skill 的参考产品、可借鉴点、原创整合方式和授权边界。

## 1. 总原则

本 Skill 是多来源参考后的原创整合：参考对象包括公开产品、作品集模板、设计网站、用户提供的视觉规格和已验证的个人主页案例。参考的目标是抽象信息架构、视觉节奏、交互模式和质量标准，而不是把某一个 Skill 或项目作为基础模板。

### 可以做

- 学习公开可见产品的设计方法、信息架构和交互模式。
- 将多个来源的高层模式抽象为原创的风格预设、组件规则和审查标准。
- 在文档中记录参考来源、可借鉴点、授权边界和原创落地方式。

### 不可以做

- 复制未授权商业模板。
- 复制 MotionSites 付费模板、代码、文案、图片、prompt 或具体模板结构。
- 声称使用了 MotionSites 官方模板。
- 编造许可证。
- 复制不清楚授权状态的素材。

## 2. Anthropic frontend-design Skill

参考地址：

```text
https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
```

### 可借鉴点

- Skill 通过 `name` 和 `description` 声明触发场景。
- 强调生产级前端质量，而不是简单 UI 美化。
- 明确视觉层级、排版、布局、动效和代码可运行性。
- 用规则约束 AI 避免普通模板化设计。

### 落地方式

- 在 [SKILL.md](SKILL.md) 中定义清晰触发条件。
- 在 [DESIGN_REVIEW.md](DESIGN_REVIEW.md) 中加入 production-grade 检查。
- 在 [COMPONENT_PATTERNS.md](COMPONENT_PATTERNS.md) 中沉淀可复用前端结构。

## 3. MotionSites

参考地址：

```text
https://motionsites.ai/
https://motionsites.ai/templates
https://motionsites.ai/backgrounds
```

### 可借鉴点

- 高冲击 Hero Section。
- 多层动态背景。
- 高级渐变、网格、光晕、粒子。
- 空间感项目卡片。
- Premium CTA 区域。
- Section 转场和滚动动效。
- AI Ready Template 的公开信息架构思路，不照搬具体模板结构。

### 落地为原创模式

在 Skill 中抽象为：

```text
layered animated hero background
high-contrast typography
spatial card composition
premium CTA section
floating 3D elements
animated background accents
polished section transitions
dynamic background layers
```

### 版权边界

- 不复制 MotionSites 代码。
- 不复制付费模板。
- 不复制模板文案。
- 不复制图片和素材。
- 不声称使用 MotionSites 官方模板。
- 只学习公开可见的设计方向。

## 4. beautiful-html-templates

参考地址：

```text
https://github.com/zarazhangrui/beautiful-html-templates
```

### 可借鉴点

- 杂志风。
- 作品集风。
- 编辑器风。
- 设计师风。
- 色彩、排版、卡片、留白和版式。
- 单文件 HTML 视觉表达。

### 落地方式

可沉淀为以下个人主页风格：

```text
Magazine Portfolio
Dark Editorial Portfolio
Terminal Hacker Homepage
Cute Pixel Creator
Spatial Project Gallery
```

## 5. claude-design-skill

参考地址：

```text
https://github.com/jiji262/claude-design-skill
```

### 可借鉴点

- HTML-based artifacts。
- Landing page / poster / deck / prototype 的生成方式。
- 视觉描述和代码生成规范分离。
- 输出时说明设计方向、结构、替换方式和部署方式。

### 落地方式

本 Skill 最终输出必须包含：

```text
视觉方向说明
页面结构说明
动效方案
技术栈说明
完整代码
如何替换个人信息
如何部署
后续优化建议
设计审查总结
```

## 6. Personal portfolio GitHub templates

用户明确认可以下两个 GitHub 个人主页模板可作为后续模板参考：

```text
https://github.com/codebucks27/Next.js-Developer-Portfolio-Starter-Code
https://github.com/0xPrateek/Portfolio-Template
```

### 使用规则

- 当用户提供这些模板或类似 GitHub portfolio template 时，优先完全参照其信息架构、视觉节奏、组件组织和交互动效，再替换成用户内容。
- 不要先让用户从 3 个自创视觉方向中选择。
- 默认只作为设计参考 URL 使用，学习其信息架构、视觉节奏、组件组织和交互动效。
- 如果未来确需使用第三方开源代码，必须先核对许可证，并按许可证要求保留版权声明和出处。

## 7. Password manager soft product hero reference

用户明确认可 password manager landing page hero 的视觉风格可作为后续模板库参考。

### 可借鉴点

- 全视口循环背景视频作为柔和产品氛围，而不是随机粒子或强赛博背景。
- Helvetica Now Display Bold + Inter 的清晰高端字体组合。
- 深蓝灰正文色、紫色主 CTA、浅米灰登录按钮的克制色彩系统。
- 几何 SVG logo、居中 hero、inline Lucide icons、强 pill CTA。
- Framer Motion fade-up、按钮微缩放、移动端右侧 slide-in sheet、backdrop blur、链接 stagger。

### 落地方式

沉淀为 [STYLE_PRESETS.md](STYLE_PRESETS.md) 中的 `Soft Product Video Hero`。适合产品创作者、AI 工具作者、个人工具入口页和用户明确提供柔和高端 SaaS hero 参考的场景。

### 边界

- 这是用户提供的详细视觉规格，可作为参考风格和实现模式记录。
- 不声称来源许可证；如果后续复用第三方源码或素材，仍需单独核对授权。
- 背景视频 URL 仅在用户明确提供或允许时使用，不要为用户编造外部视频资源。

## 8. Google Arts & Culture art portfolio reference

用户明确提出 Google Arts & Culture 可作为艺术、美术、摄影个人主页模板参考。

参考地址：

```text
https://artsandculture.google.com/
```

### 可借鉴点

- 博物馆策展式发现入口：搜索/探索问题、专题导航、故事卡和作品集合并行出现。
- 白底 museum paper、大留白、精细黑色文字、克制的红/土色艺术强调色。
- 作品墙、虚拟展厅、艺术家/媒介/地点/主题等分类浏览结构。
- 内容组织更像展览和收藏，而不是普通作品集网格。
- 适合艺术家、摄影师、美术创作者、策展人、画廊型个人主页。

### 落地方式

沉淀为 [STYLE_PRESETS.md](STYLE_PRESETS.md) 中的 `Art Museum Portfolio`。实现时把个人作品组织成 Featured Work、Series、Virtual Gallery、Artist Statement、Exhibitions、Contact / Inquiry，而不是照搬 Google 页面。

### 边界

- 仅借鉴公开可见的高层设计模式和信息架构思路。
- 不复制 Google Arts & Culture 的源码、图片、艺术品素材、文案、馆藏数据或具体页面结构。
- 如果后续使用任何艺术图片，必须使用用户提供素材或已确认授权的公开素材。

## 9. TOONHUB character figurine carousel reference

用户明确认可 TOONHUB character-figurine carousel hero 可作为后续模板库参考。

### 可借鉴点

- 全视口强色块 hero，背景色随角色切换，而不是普通渐变背景。
- Anton Display + Inter 的玩具潮牌式字体组合。
- 中央 figurine、左右辅助角色、后景角色的 role-based carousel 构图。
- 巨型 ghost text `3D SHAPE`、SVG fractalNoise grain overlay、品牌标签和底部购买 / 发现 CTA。
- `activeIndex`、`isAnimating`、`isMobile` 状态；650ms navigation lock；角色位置由 activeIndex 推导。

### 落地方式

沉淀为 [STYLE_PRESETS.md](STYLE_PRESETS.md) 中的 `TOONHUB Figurine Carousel`。适合潮玩、角色 IP、3D 作品、玩具产品、视觉创作者、年轻创作者和需要强记忆点的个人品牌首页。

### 边界

- 用户提供的 Figma 图片 URL 可在该 demo 中用于预览；后续对外项目应优先使用用户自有或已授权素材。
- 不声称这些图片或 Figma 资源有可复用许可证；如果复用第三方素材，必须单独核对授权。
- 该模式主要适合 playful / collectible / creator identity，不默认用于严肃求职简历页。

## 10. Passer-by developer homepage reference

用户明确提出 passer-by.com 的排版可学习，用作清爽个人开发者主页参考。

参考地址：

```text
https://passer-by.com/
```

### 可借鉴点

- 简洁顶部导航：左侧个人 logo / wordmark，中间少量栏目，右侧 GitHub 入口。
- 首屏集中表达身份：地点标签、问候语、姓名、突出色职业关键词、短副标题和两个 CTA。
- 轻量视觉记忆点：手绘头像 / sketch portrait 与 location pill，而不是大面积产品图或随机粒子。
- 浅蓝白连续背景：hero 到内容区通过波浪、渐变和留白过渡，页面像一个真实网站而不是分块 PPT。
- About、GitHub CTA、项目卡片自然衔接；项目卡片信息短、入口明确、hover overlay 可强化点击感。
- 适合前端开发者、开源作者、技术博客、摄影/文字/留言入口聚合型个人站。

### 落地方式

沉淀为 [STYLE_PRESETS.md](STYLE_PRESETS.md) 中的 `Clean Developer Homepage`。实现时复用其高层布局节奏：clean nav、centered developer hero、portrait/sketch visual、soft wave divider、About split、open-source CTA、project grid。不要复制其源码、头像、logo、文案或具体项目内容。

### 边界

- 只学习公开可见的高层排版和信息架构。
- 不复制 passer-by.com 的源码、图片、头像、logo、项目数据或文案。
- 如果需要类似头像，应使用用户自有照片、授权插画、AI 生成并确认可用的形象，或抽象身份符号。

## 11. Orbis NFT space landing prompt template

用户明确提供 `Orbis.Nft` 暗色太空 NFT landing page 提示词，并要求集成到本 Skill 的模板库中。

### 可借鉴点

- 四段式项目 landing page：视频 hero、视频 intro、collection grid、最终 CTA。
- Anton display typography + Condiment neon script accent + monospace metadata 的强字体分工。
- 深 navy 背景、cream 文本、neon green accent 的克制高对比色彩系统。
- `.liquid-glass` 组件效果用于导航、社交按钮、NFT 卡片和卡片 overlay。
- 固定 texture overlay、CloudFront 视频槽位、desktop/mobile 社交按钮布局和响应式 section sizing。

### 落地方式

沉淀为 [STYLE_PRESETS.md](STYLE_PRESETS.md) 中的 `Orbis NFT Space Landing`，完整模板规格记录在 [templates/orbis-nft/README.md](templates/orbis-nft/README.md)。适合个人项目发布、数字藏品、NFT collection、角色 IP 和艺术项目展示页；用于个人主页场景时，应把 collection 作为这个人的项目证明。

### 边界

- 该模板来自用户提供的详细视觉规格，可作为后续 prompt 模板和实现参考。
- CloudFront 视频 URL、`/texture.png`、rarity scores、社交链接和 NFT 数据仅在用户明确授权当前项目使用时复用。
- 不默认编造 NFT 价格、链上信息、藏品指标、社交链接或外部媒体 URL。
- 不把该模板作为普通简历、求职主页或通用 SaaS landing page 的默认风格。

## 12. 推荐参考来源清单

后续扩展模板时，可以优先参考这些来源的高层设计模式：

| 来源 | 可借鉴内容 | 注意事项 |
| --- | --- | --- |
| beautiful-html-templates | HTML 视觉表达、杂志风和作品集风思路 | 只抽象设计模式；如使用代码需先核对许可证 |
| claude-design-skill | Artifact 输出规范、设计说明结构 | 仅学习规则组织方式，不照搬项目无关内容 |

## 13. 第三方授权记录建议

如果未来确实使用了第三方开源代码或素材，记录格式建议如下：

```text
Reference: [project name]
Source: [URL]
License: [license]
Used for: [high-level design reference / licensed code / licensed asset]
Notes: [brief summary]
```

## 14. 当前文档包的处理方式

本目录第一版主要是原创规划文档和 Skill 指令，吸收了用户给出的需求。未直接复制 MotionSites 的任何付费或专有内容。
