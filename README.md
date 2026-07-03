# Personal Homepage Skill

一个让 AI Agent 稳定生成高质量个人主页、作品集和 HTML PPT 的 Skill + 模板库。

An AI Skill + template gallery for generating polished personal homepages, portfolios, and HTML presentations with Claude Code / AI coding agents.

![GitHub Repo stars](https://img.shields.io/github/stars/powerycy/personal-homepage-skill?style=social)
![GitHub license](https://img.shields.io/github/license/powerycy/personal-homepage-skill)
![Built with React](https://img.shields.io/badge/Built%20with-React%20%2B%20Tailwind-61DAFB)
![Skill](https://img.shields.io/badge/AI%20Skill-Claude%20Code%20%2F%20Ducc-8A2BE2)

> 如果这个项目帮助你生成了更好的个人主页、作品集、创作者主页或 HTML 演示文稿，欢迎点一个 ⭐ Star。

## Template demos

精选 3 个代表性输出：星球空间、潮玩手办和电影感主页。

### 01 · Orbis NFT Space Landing

![Orbis NFT Space Landing demo](assets/demo-orbis-nft-space-landing.gif)

### 02 · TOONHUB Figurine Carousel

![TOONHUB Figurine Carousel demo](assets/demo-toonhub-figurine-carousel.gif)

### 03 · Cinematic Scroll Personal Brand

![Cinematic Scroll Personal Brand demo](assets/demo-cinematic-scroll-personal-brand.gif)

## 可以生成什么？

- 个人主页 / personal homepage
- 作品集网站 / portfolio website
- 求职主页 / resume homepage
- 创作者主页 / creator homepage
- 开发者 / 设计师作品集
- 艺术 / 摄影作品集
- 个人项目展示页
- 16:9 HTML PPT / 浏览器演示文稿

## 为什么需要它？

很多 AI 生成的个人展示页都会变成同一种廉价模板：

- 首屏文案空泛，看不出这个人是谁
- 到处是紫色渐变和随机发光球
- 技能区只是 logo 墙
- 项目卡片没有问题、角色、功能、结果
- 编造虚假指标和虚假评价
- 用户给的视觉参考被忽略
- 页面缺少统一的视觉系统和内容层次

`personal-homepage-skill` 的目标是让 Agent 在生成个人主页或 HTML 演示文稿时遵守更严格的流程：先理解人和内容目标，再跟随参考，再组织信息架构，最后做视觉和内容质量检查。

## 项目包含什么？

- AI Skill 主入口与生成规则
- Reference-first 个人主页生成工作流
- 16+ 个视觉模板方向
- 可交互 React + Tailwind 模板 Gallery
- 单文件 HTML 主页模板
- React + Tailwind 主页模板
- 16:9 HTML 演示文稿模板
- 中文 / CJK 字体与排版规则
- 图片使用与占位规则
- 设计自检清单
- 模板注册表、文档结构和静态视觉检查脚本

## 核心原则

### 1. 用户给参考，就优先跟随参考

如果用户提供了具体模板、参考网站、截图描述、详细 Prompt 或 GitHub 作品集模板，Agent 必须优先跟随该参考，而不是先让用户从 3 个自己生成的风格里选。

需要保留参考的：

- 信息架构
- 视觉节奏
- 组件组织方式
- 字体气质
- 间距关系
- 动效模型

### 2. 方向不清楚时，才给真实预览

如果用户没有明确视觉方向，Agent 可以给 2-3 个真实主页首屏预览方向。

预览必须像真实个人主页，而不是选项卡片。视觉画面里不能出现：

- Option A / B / C
- template name
- pros / risks
- workflow notes
- file name
- 内部说明文字

### 3. 每个主页都必须回答 5 个问题

1. 这个人是谁？
2. 他 / 她做什么？
3. 有哪些项目、内容、经历或作品能证明？
4. 为什么访问者应该信任？
5. 访问者下一步应该点击哪里？

### 4. 输出形式要匹配用户目标

Skill 同时支持连续网页和 HTML 演示文稿。Agent 需要先判断用户要的是个人主页、作品集页面，还是 16:9 演示文稿，再选择对应的信息密度、版式节奏、交互方式和质量检查标准。

## 快速开始

### 作为 Skill 使用

把这个文件夹放到兼容的 skills 目录中，例如：

```text
.claude/skills/personal-homepage-skill/
```

然后让 Agent 生成或优化个人主页、作品集页面或 HTML 演示文稿即可。

### 运行模板 Gallery

```bash
npm install
npm run dev
```

### 运行检查

```bash
npm run check
```

- `npm run dev`：打开可交互模板 Gallery。
- `npm run check`：运行文档结构、模板注册表和构建检查。

## 模板 Gallery

项目内置 18 个视觉方向。实际生成时，Agent 会优先跟随用户给定参考；模板只在方向不清楚或用户主动选择时使用。

更完整的可交互 Gallery：

```text
demo/template-gallery.html
```

| 模板 | 预览 |
| --- | --- |
| Cinematic Scroll Personal Brand | ![Cinematic Scroll Personal Brand](assets/template-previews/cinematic-scroll-personal-brand.svg) |
| Soft Product Video Hero | ![Soft Product Video Hero](assets/template-previews/soft-product-video-hero.svg) |
| Orbis NFT Space Landing | ![Orbis NFT Space Landing](assets/template-previews/orbis-nft-space-landing.svg) |
| TOONHUB Figurine Carousel | ![TOONHUB Figurine Carousel](assets/template-previews/toonhub-figurine-carousel.svg) |
| Clean Developer Homepage | ![Clean Developer Homepage](assets/template-previews/clean-developer-homepage.svg) |
| 3D Tech Portfolio | ![3D Tech Portfolio](assets/template-previews/3d-tech-portfolio.svg) |
| Motion Gradient Brand | ![Motion Gradient Brand](assets/template-previews/motion-gradient-brand.svg) |
| Magazine Portfolio | ![Magazine Portfolio](assets/template-previews/magazine-portfolio.svg) |
| Terminal Hacker Homepage | ![Terminal Hacker Homepage](assets/template-previews/terminal-hacker-homepage.svg) |
| Minimal Premium Resume | ![Minimal Premium Resume](assets/template-previews/minimal-premium-resume.svg) |
| Cute Pixel Creator | ![Cute Pixel Creator](assets/template-previews/cute-pixel-creator.svg) |
| AI System Dashboard | ![AI System Dashboard](assets/template-previews/ai-system-dashboard.svg) |
| Creator Bento Homepage | ![Creator Bento Homepage](assets/template-previews/creator-bento-homepage.svg) |
| Dark Editorial Portfolio | ![Dark Editorial Portfolio](assets/template-previews/dark-editorial-portfolio.svg) |
| Art Museum Portfolio | ![Art Museum Portfolio](assets/template-previews/art-museum-portfolio.svg) |
| Spatial Project Gallery | ![Spatial Project Gallery](assets/template-previews/spatial-project-gallery.svg) |
| Business Personal Brand | ![Business Personal Brand](assets/template-previews/business-personal-brand.svg) |
| Case Study Portfolio | ![Case Study Portfolio](assets/template-previews/case-study-portfolio.svg) |

## Demo links

- [Overview HTML deck](demo/personal-homepage-skill-overview.html) — explains the Skill workflow and quality rules.
- [Template gallery](demo/template-gallery.html) — browse built-in visual directions.
- [Demo script](DEMO_SCRIPT.md) — presentation notes for introducing the project.

## 文件结构

<details>
<summary>查看文档和源码结构</summary>

| 文件 | 作用 |
| --- | --- |
| [SKILL.md](SKILL.md) | Skill 主入口和 Agent 工作流 |
| [STYLE_PRESETS.md](STYLE_PRESETS.md) | 视觉模板库 |
| [CINEMATIC_SCROLL_TEMPLATE.md](CINEMATIC_SCROLL_TEMPLATE.md) | WISA 风格暗黑电影感模板说明 |
| [HOMEPAGE_GENERATION_WORKFLOW.md](HOMEPAGE_GENERATION_WORKFLOW.md) | 响应式主页生成流程 |
| [PRESENTATION_WORKFLOW.md](PRESENTATION_WORKFLOW.md) | 16:9 HTML 演示文稿生成流程 |
| [IMAGE_WORKFLOW.md](IMAGE_WORKFLOW.md) | 图片资产处理规则 |
| [MOTION_PATTERNS.md](MOTION_PATTERNS.md) | 动效、3D、背景和降级规则 |
| [HOMEPAGE_SECTIONS.md](HOMEPAGE_SECTIONS.md) | 页面 section 内容规则 |
| [COMPONENT_PATTERNS.md](COMPONENT_PATTERNS.md) | 组件实现模式 |
| [DATA_SCHEMA.md](DATA_SCHEMA.md) | 个人主页数据结构 |
| [DESIGN_REVIEW.md](DESIGN_REVIEW.md) | 最终设计检查清单 |
| [REFERENCE_PRODUCTS.md](REFERENCE_PRODUCTS.md) | 参考产品和版权边界 |
| [PRD.md](PRD.md) | 内部产品需求文档 |
| [OPEN_SOURCE_PRD.md](OPEN_SOURCE_PRD.md) | GitHub 开源版本 PRD |
| [USER_STORIES.md](USER_STORIES.md) | 用户故事和验收标准 |
| [TEST_SCENARIOS.md](TEST_SCENARIOS.md) | Skill 行为测试场景 |
| [TASK_BREAKDOWN.md](TASK_BREAKDOWN.md) | 后续开发任务拆解 |
| [TECHNICAL_ROUTE.md](TECHNICAL_ROUTE.md) | 推荐技术路线 |
| [OPEN_SOURCE_CHECKLIST.md](OPEN_SOURCE_CHECKLIST.md) | 开源发布检查清单 |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 贡献指南 |
| [DEMO_SCRIPT.md](DEMO_SCRIPT.md) | 演示讲稿 |
| [examples/PROMPTS.md](examples/PROMPTS.md) | 使用示例 |
| [demo/personal-homepage-skill-overview.html](demo/personal-homepage-skill-overview.html) | 自包含 HTML 演示 Deck |
| [demo/template-gallery.html](demo/template-gallery.html) | 自包含模板 Gallery |
| [assets/template-previews/](assets/template-previews/) | 模板预览图片 |
| [src/](src/) | React + Tailwind 模板 Gallery 源码 |
| [templates/](templates/) | 可复用主页、HTML 演示文稿和用户授权 prompt 模板 |
| [scripts/](scripts/) | 校验脚本 |

</details>

## 版权和素材边界

<details>
<summary>查看版权和素材使用边界</summary>

这个 Skill 会学习公开设计模式和用户授权参考，但不会授予复制第三方资产的权限。

规则：

- 不复制付费模板、专有代码、私人截图或许可证不明确的资产。
- 不复制 MotionSites 的付费模板、代码、文案、Prompt、图片或精确模板结构。
- 不复制 Google Arts & Culture 的图片、艺术品、文案、收藏数据或精确页面结构。
- 不复制 passer-by.com 的源码、头像、logo、文案或项目数据。
- 如果复用开源代码，必须检查许可证并保留署名。

更多说明见：[REFERENCE_PRODUCTS.md](REFERENCE_PRODUCTS.md)

</details>

## 路线图

### V1：文档型 Skill

- Skill 主入口
- 视觉模板库
- 动效模式
- section 规则
- 组件模式
- 数据结构
- 设计检查清单
- 使用示例
- 演示 Deck
- 模板 Gallery
- 模板预览图片

### V2：可运行模板与 Gallery

- React + Tailwind 示例
- 单文件 HTML 示例
- 16:9 HTML 演示文稿示例
- 可交互模板 Gallery

### V3：自动化校验

- 模板注册表检查
- Skill 文档结构检查
- 静态视觉规则检查
- 后续可继续补充截图校验、移动端和 reduced-motion 检查

## 支持项目

如果这个项目帮助你生成了更好的个人主页、作品集或 HTML 演示文稿，欢迎点一个 ⭐ Star。

这会帮助更多人发现项目，也支持后续继续补充模板、示例和质量检查流程。

## 贡献

见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 联系作者

- 邮箱：247133278@qq.com
- 微信：loonges
- QQ：247133278
- 小红书 / B站：好奇的小逸

## License

See [LICENSE](LICENSE) for usage terms.
