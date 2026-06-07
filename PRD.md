# PRD: personal-homepage-skill

## 1. Summary

personal-homepage-skill 是一个专门用于生成高质量个人主页的 AI Skill。它帮助 AI 根据用户身份、项目、经历、内容账号和视觉偏好，生成具有强记忆点、动效、3D 空间感、可运行代码和个人品牌表达的前端页面。

第一版重点不是做模板站，而是做一套 AI 可执行的设计与代码生成规则，减少普通 AI 主页常见的模板感、SaaS 官网感、项目说服力不足和代码难维护问题。

## 2. Contacts

| 角色 | 负责人 | 说明 |
| --- | --- | --- |
| 产品负责人 | 用户 | 定义 Skill 目标、风格、输出质量 |
| AI 开发者 | Coding Agent / Ducc / Claude Code | 实现 Skill 文件、模板、测试与示例 |
| 设计负责人 | AI Designer Agent | 定义视觉系统、动效、反模板规则 |
| 前端负责人 | AI Frontend Agent | 负责 React / HTML 输出规范、可运行性、响应式 |
| 质量负责人 | AI Reviewer Agent | 使用测试场景和设计审查清单验证结果 |

## 3. Background

现在普通 AI 生成个人主页时常见问题包括：

- 页面像普通 SaaS 官网。
- 首屏没有记忆点。
- 技能区只是堆图标。
- 项目区没有说服力。
- 动效普通或乱炫。
- 页面像模板站。
- 3D / 空间感 / 交互感不足。
- 移动端适配差。
- 代码难维护。
- 文案空泛。

用户希望建立一个专门的 Skill，让 AI 在生成个人主页时拥有稳定的产品判断、视觉风格、动效模式、代码规范和审查机制。

## 4. Objective

### 4.1 产品目标

让 AI 能稳定生成个人主页、作品集主页、求职主页、创作者主页、技术人主页、设计师主页、独立开发者主页，以及以个人为主角的 AI 产品 / 项目展示主页。

页面必须同时满足：

1. 看起来像个人主页，而不是 SaaS 官网。
2. 首屏有强视觉记忆点。
3. 项目区有说服力。
4. 技能区能表达能力结构和实际产出。
5. 动效、3D 和视觉层次服务内容。
6. 代码可运行、可维护、易替换内容。
7. 移动端可读。
8. 不编造用户未提供的真实数字或链接。

### 4.2 Key Results

| KR | 目标 |
| --- | --- |
| KR1 | 只给一段个人简介时，AI 能产出包含占位符但结构完整的首页方案 |
| KR2 | 用户给项目列表时，AI 能转成有问题、角色、技术栈、结果的项目卡片 |
| KR3 | 至少支持 6 类身份：技术人、设计师、创作者、求职者、创业者/顾问、独立开发者 |
| KR4 | 至少支持 10 个视觉风格预设和 10 个动效模式 |
| KR5 | React 默认输出包含集中 profile 数据对象、组件结构和 reduced-motion 支持 |
| KR6 | 纯 HTML 输出不依赖不可访问资源，能直接在浏览器打开 |
| KR7 | 每次生成后必须执行设计审查清单 |

## 5. Market Segments

### 5.1 技术人 / AI 工程师

Job to be Done：我要展示技术定位、项目能力、开源/研究方向和 Demo，让招聘方、合作者或用户快速信任我。

### 5.2 独立开发者 / 开源作者

Job to be Done：我要展示我独立构建、发布和维护项目的能力，让用户、合作方或招聘方看到可运行 Demo、开源贡献和产品判断。

### 5.3 设计师 / 艺术生 / 视觉创作者

Job to be Done：我要展示作品风格、案例和审美，让访客迅速感知我的设计能力。

### 5.4 内容创作者 / 自媒体账号主

Job to be Done：我要展示账号定位、代表内容、内容数据和合作方式，把主页变成个人品牌入口。

### 5.5 求职者 / 学生 / 实习生

Job to be Done：我信息可能不多，但需要一个可信、清晰、专业的页面增强简历表达。

### 5.6 创业者 / 顾问 / 自由职业者

Job to be Done：我要展示我能解决什么问题、服务内容、案例成果和预约入口。

## 6. Value Propositions

| 用户痛点 | Skill 提供的价值 |
| --- | --- |
| 不知道个人主页该放什么 | 自动生成信息架构和模块优先级 |
| AI 页面像模板 | 内置反 AI 模板规则和风格库 |
| 首屏普通 | 强制 Hero 必须有个人身份和视觉记忆点 |
| 项目表达弱 | 使用项目描述公式包装项目说服力 |
| 技能区空泛 | 按能力分组并关联实际产出 |
| 想要酷炫但怕乱 | 动效和 3D 有性能、可读性和降级规则 |
| 代码难改 | 文案集中在 profile 数据对象中 |
| 不会部署 | 输出部署说明和替换指南 |

## 7. Solution

### 7.1 UX / Workflow

默认流程：

1. 收集或推断用户身份、目标、内容、视觉偏好。
2. 判断用户是否提供了模板、参考站点、截图描述、长 prompt 或 GitHub portfolio template。
3. 如果有明确参考，优先严格迁移其信息架构、视觉节奏、组件组织和动效模型，再替换成用户内容。
4. 只有方向不明确时，才生成 2-3 个真实首页首屏预览说明，避免把方案说明卡伪装成视觉预览。
5. 根据身份自动推荐或等待用户选择方向。
6. 输出页面信息架构。
7. 生成代码。
8. 做设计自检。
9. 告知如何替换信息和部署。

如果用户明确要求“直接写代码”，可以跳过确认，但仍需在最终输出中说明采用的方向。

### 7.2 Key Features

#### F1. 身份识别与风格选择

Skill 必须判断用户属于哪类主页场景，并匹配视觉风格。

#### F2. 参考模板优先与真实预览兜底

当用户提供具体模板、参考站点、截图描述、长 prompt 或 GitHub portfolio template 时，优先完整参照其信息架构、视觉节奏、组件组织、字体气质和动效模型，不先让用户从自创视觉方向中选择。

只有在视觉方向不明确时，才输出 2-3 个真实首页首屏预览方向。对话说明中可以包含风格名、首屏结构、颜色、字体、动效、3D / 酷炫效果方案（不适合时明确写“不需要 3D”）、项目区设计、优点、风险；但视觉预览画面里不能出现 A/B/C、优点/风险、workflow note、模板名、文件名或内部说明。

#### F3. 页面信息架构生成

候选模块包括 Hero、About、Highlights、Skills、Projects、Experience、Content、Testimonials、Contact、Footer。无真实背书时移除 Testimonials，或在用户明确要求时标记为占位。

#### F4. React 代码输出

默认技术栈：React、Tailwind CSS、Framer Motion、lucide-react。需要 3D 时可加入 React Three Fiber、@react-three/drei。

#### F5. 纯 HTML 输出

当用户要求单文件时，输出 HTML、CSS、JavaScript，避免不可访问资源。

#### F6. 动效与 3D 降级

支持 prefers-reduced-motion、移动端降级、3D fallback、低密度粒子、局部视差。

#### F7. 设计审查

生成后必须执行设计自检，防止 SaaS 官网感、假数据、卡片重复、动效过载等问题。

### 7.3 Technology

第一版重点是文档型 Skill，不强制实现运行时脚本。

V1 文档包文件：

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

后续可增加：

```text
templates/react-tailwind/
templates/html-single-file/
templates/nextjs-app-router/
examples/
scripts/preview-generator.mjs
```

### 7.4 Assumptions

- 用户愿意用占位符补齐缺失信息。
- 第一版不需要真实在线模板市场。
- 视觉参考可以来自开源项目和公开站点，但不能复制商业付费模板。
- React + Tailwind + Framer Motion 是默认主技术路线。
- 单文件 HTML 是必要兜底路线。

## 8. Release

### V1: 文档型 Skill

包含 Skill 主文件、README、PRD、技术路线、参考产品说明、风格库、动效库、页面模块、组件模式、数据结构、审查清单、测试场景、任务拆解和用户故事。

### V2: 示例与模板

增加 AI 工程师、设计师、创作者、求职者、独立开发者主页示例。

### V3: 可运行模板工程

增加 React、Next.js、纯 HTML 模板目录。

### V4: 视觉预览与自动验证

增加预览生成脚本、截图验证、移动端检查和自动设计评分。
