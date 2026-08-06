# 报名事实表

核对日期：2026-08-06（Asia/Shanghai）

## 赛事事实

| 项目 | 已核实事实 | 来源 |
| --- | --- | --- |
| 官方入口 | 外滩黑客松 2026 | <https://hackathon2026.app.weavefox.cn/> |
| 线上提交窗口 | 2026-07-20 至 2026-08-09 | 官方赛事页“赛程安排” |
| 专业评审 | 创意、实用、完成度、技术难度 | 官方赛事页“专业评审” |
| 有效作品 | 必须有评委可直接访问并执行核心功能的公网链接 | 官方赛事页“挑战内容 / 有效参赛定义” |
| 必交材料 | 作品公网链接、完整可访问使用手册、小红书公开作品介绍链接、报名信息清单 | 官方赛事页“作品提交 / 有效参赛定义” |
| 身份要求 | 实名手机号，一人一号；需完成实名认证 | 官方赛事页“参赛资格” |
| 作品上限 | 同一实名认证账号最多提交 20 个不同作品 | 官方赛事页“作品提交” |
| 人气奖话题 | `#外滩大会全民黑客松`、`#外滩大会AICoding大赛` | 官方赛事页“人气奖评选” |

## 赛道选择

**选择：自助报名。**

官方对自助报名的说明是“使用本地编程工具自部署的参赛作品，请走统一提交入口”。本项目实际使用 React、TypeScript、Vite、Playwright 与 AI Coding 助手在本地仓库中完成，并部署到 GitHub Pages。

**不选择百度秒哒应用美学赛道。** 项目没有完全使用秒哒创作和发布。即使视觉方向与“应用美学”契合，也不能把本地代码重构描述成秒哒作品。

## 项目事实

| 字段 | 可提交内容 | 验证位置 |
| --- | --- | --- |
| 作品名 | AI Personal Homepage Studio——把真实经历变成可发布的个人品牌网站 | 本目录与产品页 |
| 类型 | Web / H5、创作工具、个人品牌工具 | `src/App.tsx` |
| 公网链接 | <https://powerycy.github.io/personal-homepage-skill/> | GitHub Pages 配置 |
| 使用手册 | <https://powerycy.github.io/personal-homepage-skill/guide.html> | `public/guide.html` |
| 公开源码 | <https://github.com/powerycy/personal-homepage-skill> | GitHub |
| 技术栈 | React 18、TypeScript、Vite、CSS、Playwright | `package.json` 与源码 |
| 内置视觉方向 | Studio 提供 4 个可切换发布方向；Skill 注册表保留 18 个生成方向 | `src/data/studio.ts`、`src/data/templates.ts` |
| 核心流程 | 真实资料输入 → 风格切换 → 桌面/手机预览 → 在线编辑 → 导出 HTML | `src/App.tsx` |
| 数据处理 | 表单草稿只保存在当前浏览器 localStorage；无账号、无服务端上传 | `src/App.tsx` |
| 运行时 AI | 公网 Studio 运行时不调用在线模型，不自动扩写或编造经历 | 源码网络调用检查、产品说明 |
| AI 开发参与 | AI Coding 助手参与仓库审计、需求拆解、代码实现、测试与文案；作者负责目标、取舍、事实确认与提交责任 | 本次开发记录 |
| 导出能力 | 生成单文件 HTML；稳定 `data-edit-id`；可在导出页继续编辑并二次导出 | `src/utils/exportHomepage.ts`、`tests/studio-e2e.test.mjs` |
| 移动端 | 390×844 实测无横向溢出 | `tests/studio-e2e.test.mjs`、截图 04 |
| 许可证 | Personal Homepage Skill Non-Commercial License；非商业使用需署名，商业使用需另行许可 | `LICENSE` |
| 小红书公开笔记 | 标题“我的获奖skill，作品集 ppt skill”；item ID `6a7068d7000000003301e958`；公开链接已核对可打开 | 用户提供链接与公开页面 |

## 禁止写入报名表的内容

- 未经核实的用户数、转化率、曝光量、获奖经历或用户评价。
- “完全使用秒哒完成”或任何与真实开发过程不符的平台归属。
- 未由参赛人确认的姓名、年龄、省市、身份、手机号。
- 尚未真实发布的小红书链接或尚未生成的参赛凭证 ID。
