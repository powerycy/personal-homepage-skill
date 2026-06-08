# Technical Route: personal-homepage-skill

## 1. 技术路线总览

personal-homepage-skill 的核心不是一个固定模板，而是一套 AI 可执行的生成管线：

```text
用户信息 → 参考/模板判断 → 身份判断 → 风格选择 → 信息架构 → 组件模式 → 动效模式 → 代码生成 → 设计审查
```

推荐第一版以 Skill 文档为核心，第二版再沉淀可复制模板源码。

## 2. 默认技术栈

### 2.1 React 主页路线

默认使用：

```text
React
Tailwind CSS
Framer Motion
lucide-react
```

适合：

- 用户要可维护项目。
- 用户要组件化结构。
- 用户要后续扩展。
- 用户要复杂动效。

建议结构：

```text
src/
  components/
    Hero.tsx
    About.tsx
    Highlights.tsx
    Skills.tsx
    Projects.tsx
    Experience.tsx
    Content.tsx
    Contact.tsx
    Footer.tsx
    AnimatedBackground.tsx
    ThreeFallback.tsx
  data/
    profile.ts
  styles/
    globals.css
```

### 2.2 3D 路线

需要 3D 时优先级：

1. CSS 3D transform：最轻量，适合卡片和 Hero 空间感。
2. Canvas 粒子 / 背景：轻量，适合 AI、技术、创作者。
3. React Three Fiber：适合 3D 几何体、节点、星球、项目空间墙。
4. Spline iframe：仅用户提供合法 Spline 链接时使用。

依赖建议：

```text
three
@react-three/fiber
@react-three/drei
```

限制：

- 不默认加载大型 3D 模型或大体积外部模型资源。
- 不编造 Spline URL。
- 移动端关闭复杂 3D 或降低复杂度。
- 必须有 fallback。

### 2.3 纯 HTML 路线

用户要求“单文件”“直接打开”“不要工程化”时使用：

```text
HTML
CSS
vanilla JavaScript
```

适合：

- 快速预览。
- 投递简历附带页面。
- 无构建环境。
- 分享给非技术用户。

要求：

- CSS 和 JS 内联。
- 不依赖随机外部图片。
- 字体可使用网络字体，但必须有 fallback。
- 动效优先 CSS transform / opacity。
- 支持 reduced motion。

## 3. 参考产品技术吸收

### 3.1 Anthropic frontend-design Skill

借鉴点：

- 明确 Skill 触发条件。
- 强调 production-grade 前端输出。
- 用视觉层级、排版、布局、动效约束 AI。
- 反普通模板风。
- 要求代码可运行。

落地方式：

- 在 [SKILL.md](SKILL.md) 中定义触发条件与默认流程。
- 在 [DESIGN_REVIEW.md](DESIGN_REVIEW.md) 中加入代码和视觉审查。

### 3.2 MotionSites

借鉴点：

- 高冲击 Hero。
- 动态背景层。
- 空间卡片构图。
- 高级渐变与光效。
- CTA 区块设计。
- Section 转场方式。

落地方式：

- 抽象为 MotionSites-inspired design patterns。
- 不复制其模板、付费 prompt、代码、文案、图片或具体模板结构。

### 3.3 beautiful-html-templates

借鉴点：

- 杂志风、作品集风、编辑器风、设计师风。
- 色彩、排版、卡片、留白、版式。
- HTML 可直接运行的模板思路。

落地方式：

- 将其风格语言抽象进 Magazine Portfolio、Dark Editorial Portfolio、Cute Pixel Creator、Terminal Hacker 等预设。

### 3.4 claude-design-skill

借鉴点：

- HTML-based artifact 生成。
- landing page、poster、deck、prototype 的多形态设计输出。
- 视觉描述与代码生成规范分离。

落地方式：

- 本 Skill 输出“视觉方向 + 页面结构 + 动效方案 + 完整代码 + 替换说明 + 部署说明 + 设计审查”。

## 4. 生成管线设计

### Step 1: 内容收集

必须识别：

```text
姓名 / 昵称
职业身份
一句话定位
个人简介
项目列表
技能列表
经历
内容账号
联系方式
视觉偏好
技术栈
是否需要 3D
是否需要深色模式
是否需要中英文
```

信息不足时不阻塞，用明确占位符继续。

### Step 2: 参考 / 模板优先判断

如果用户提供了具体模板、参考站点、截图描述、长 prompt、GitHub portfolio template 或明确视觉规范，必须先把它当作已选方向处理。

执行规则：

```text
识别参考来源
保留参考的信息架构、视觉节奏、组件组织、动效模型和字体气质
替换为用户个人内容
默认只作为设计参考；如未来确需使用第三方开源代码，先核对许可证
不要先输出 3 个自创视觉方向
不要把高级参考改造成通用赛博、SaaS、终端或 bento 模板
```

当参考包含 WISA、暗黑电影感、scroll-driven video、Manrope + JetBrains Mono、glassmorphism footer 等信号时，优先走 [CINEMATIC_SCROLL_TEMPLATE.md](CINEMATIC_SCROLL_TEMPLATE.md)。

### Step 3: 真实视觉预览（仅方向不明确时）

只有当用户没有明确参考和视觉方向时，才输出 2-3 个候选方向。候选方向必须像真实首页 hero preview，而不是方案说明卡。

对话说明中可以包含：

```text
风格名称
适合人群
首屏结构
颜色方案
字体气质
动效方案
3D / 酷炫效果方案（不适合时明确写“不需要 3D”）
项目区设计
优点
风险
```

但视觉预览画面里不能出现 A/B/C 标签、优点/风险、workflow note、模板名、文件名或内部说明。预览必须使用用户真实姓名、身份、内容和 CTA。

### Step 4: 自动推荐或选择

默认推荐规则：

| 身份 | 推荐风格 |
| --- | --- |
| 技术人 / AI 工程师 | Cinematic Scroll Personal Brand / 3D Tech Portfolio / AI System Dashboard / Terminal Hacker |
| 设计师 | Magazine Portfolio / Spatial Project Gallery / Dark Editorial Portfolio |
| 创作者 | Cinematic Scroll Personal Brand / Motion Gradient Brand / Creator Bento Homepage / Cute Pixel Creator |
| 求职者 | Minimal Premium Resume / Case Study Portfolio |
| 创业者 / 顾问 | Cinematic Scroll Personal Brand / Motion Gradient Brand / Minimal Premium Resume |

### Step 5: 信息架构

输出每个 section 的目的、内容、组件和动效。

### Step 6: 代码生成

代码必须：

- 可运行。
- 组件清晰。
- 数据集中管理。
- 响应式完整。
- 动效可降级。
- 不依赖不可访问资源。
- 不把文案硬编码到组件深处。

### Step 7: 自检

使用 [DESIGN_REVIEW.md](DESIGN_REVIEW.md)。

## 5. 第一版实现建议

第一版不需要模板引擎，只需要稳定 V1 文档包：

```text
README.md
SKILL.md
PRD.md
TECHNICAL_ROUTE.md
REFERENCE_PRODUCTS.md
STYLE_PRESETS.md
MOTION_PATTERNS.md
HOMEPAGE_SECTIONS.md
COMPONENT_PATTERNS.md
DATA_SCHEMA.md
DESIGN_REVIEW.md
TEST_SCENARIOS.md
TASK_BREAKDOWN.md
USER_STORIES.md
```

## 6. 第二版工程化建议

增加模板目录：

```text
templates/
  react-tailwind/
    package.json
    src/
      App.tsx
      data/profile.ts
      components/
      styles/globals.css
  html-single-file/
    personal-homepage.html
  nextjs-app-router/
    app/page.tsx
    app/globals.css
    data/profile.ts
```

## 7. AI 开发注意事项

- 不要把个人主页做成 SaaS landing page。
- 不要用假数据伪造用户成就。
- 不要所有卡片一样大。
- 不要为了 3D 牺牲可读性。
- 不要默认依赖外部图片或不可访问 URL。
- 不要在用户未提供 Spline 链接时编造 Spline iframe。
- 不要复制 MotionSites 付费模板。
- 如未来确需使用第三方开源代码，必须先核对许可证，并按许可证要求保留版权声明和出处。
