export type Category = 'All' | 'Tech' | 'Creator' | 'Business' | 'Art';

export type VisualKey =
  | 'cinematic'
  | 'softProduct'
  | 'toonhub'
  | 'tech3d'
  | 'gradient'
  | 'magazine'
  | 'terminal'
  | 'resume'
  | 'pixel'
  | 'dashboard'
  | 'bento'
  | 'darkEditorial'
  | 'spatial'
  | 'business'
  | 'caseStudy'
  | 'museum';

export type IdentityFit =
  | 'ai-engineer'
  | 'frontend-engineer'
  | 'designer'
  | 'artist'
  | 'photographer'
  | 'creator'
  | 'job-seeker'
  | 'student'
  | 'founder'
  | 'consultant'
  | 'freelancer';

export type DensityMode =
  | 'minimal-card'
  | 'portfolio-standard'
  | 'case-study-rich'
  | 'creator-hub'
  | 'art-gallery';

export type TemplateDefinition = {
  id: string;
  name: string;
  category: Exclude<Category, 'All'>;
  visual: VisualKey;
  summary: string;
  bestFor: string;
  identityFits: IdentityFit[];
  densityModes: DensityMode[];
  layoutGrammar: string;
  typography: {
    display: string;
    body: string;
    cjk: string;
    mono?: string;
  };
  palette: {
    base: string;
    text: string;
    accent: string;
    secondary?: string;
  };
  heroPattern: string;
  sectionPlan: string[];
  motionPlan: string[];
  imagePolicy: string;
  generationNotes: string[];
  risks: string[];
  effects: string[];
  accent: string;
};

export const categoryFilters: Category[] = ['All', 'Tech', 'Creator', 'Business', 'Art'];

export const densityLabels: Record<DensityMode, string> = {
  'minimal-card': '名片式',
  'portfolio-standard': '作品集',
  'case-study-rich': '案例型',
  'creator-hub': '创作者',
  'art-gallery': '策展型',
};

export const identityLabels: Record<IdentityFit, string> = {
  'ai-engineer': 'AI 工程师',
  'frontend-engineer': '前端开发',
  designer: '设计师',
  artist: '艺术家',
  photographer: '摄影师',
  creator: '创作者',
  'job-seeker': '求职者',
  student: '学生',
  founder: 'Founder',
  consultant: '顾问',
  freelancer: '自由职业',
};

export const templates: TemplateDefinition[] = [
  {
    id: 'cinematic-scroll-personal-brand',
    name: 'Cinematic Scroll Personal Brand',
    category: 'Tech',
    visual: 'cinematic',
    summary: '暗黑电影感、固定视频背景、滚动叙事和玻璃入口，用少量中文建立高级个人品牌。',
    bestFor: 'AI 工程师 / founder / 高级个人品牌',
    identityFits: ['ai-engineer', 'founder', 'frontend-engineer'],
    densityModes: ['minimal-card', 'portfolio-standard'],
    layoutGrammar: '大面积暗场、左侧身份叙事、右侧玻璃入口与项目线索，控制首屏文字密度。',
    typography: { display: 'Manrope / Archivo', body: 'Noto Sans SC', cjk: 'Noto Sans SC', mono: 'JetBrains Mono' },
    palette: { base: '#050507', text: '#f7f1e7', accent: '#f7f1e7', secondary: '#2a2a34' },
    heroPattern: '一行身份 + 短 tagline + 单个主 CTA，避免长段宣言铺满屏幕。',
    sectionPlan: ['Hero', 'Selected projects', 'System capabilities', 'Contact'],
    motionPlan: ['slow reveal', 'subtle video/gradient drift', 'glass hover'],
    imagePolicy: '优先使用真实产品录屏或项目截图；缺失时使用暗场抽象光斑和玻璃卡片。',
    generationNotes: ['保持留白，不把中文段落放大成标题。', '首屏左右视觉重量接近，右侧内容不超过 3 个入口。'],
    risks: ['长中文标题会破坏电影感；视频素材缺失时必须提供高质量 placeholder。'],
    effects: ['Scroll video', 'Word reveal', 'Glass footer'],
    accent: '#f7f1e7',
  },
  {
    id: 'soft-product-video-hero',
    name: 'Soft Product Video Hero',
    category: 'Creator',
    visual: 'softProduct',
    summary: '柔和产品视频、居中大标题、紫色 CTA，适合个人工具或创作入口。',
    bestFor: 'AI 工具作者 / 产品创作者 / 个人工具入口',
    identityFits: ['creator', 'founder', 'ai-engineer'],
    densityModes: ['minimal-card', 'portfolio-standard'],
    layoutGrammar: '居中 hero、柔和背景视频框、短导航与单 CTA。',
    typography: { display: 'Archivo', body: 'Noto Sans SC', cjk: 'Noto Sans SC' },
    palette: { base: '#d7d0ca', text: '#192837', accent: '#7342E2' },
    heroPattern: '一句产品化定位 + 一句解释，不使用 SaaS 式空泛大段。',
    sectionPlan: ['Hero video', 'Why it exists', 'Product screenshots', 'Contact'],
    motionPlan: ['soft fade', 'pill hover', 'video mask reveal'],
    imagePolicy: '需要产品截图/录屏；没有素材时用设备框 placeholder，不能引用不存在视频。',
    generationNotes: ['页面必须 person-led，不要变成公司官网。', 'CTA 和视频框大小要足够清晰。'],
    risks: ['容易变成通用 SaaS landing；图片小会显得廉价。'],
    effects: ['Looping video', 'Inline icons', 'Mobile sheet'],
    accent: '#7342E2',
  },
  {
    id: 'toonhub-figurine-carousel',
    name: 'TOONHUB Figurine Carousel',
    category: 'Creator',
    visual: 'toonhub',
    summary: 'Anton 潮玩标题、角色手办轮播和强色彩背景切换，适合视觉 IP。',
    bestFor: '潮玩 IP / 3D 角色 / 年轻创作者 / 产品视觉入口',
    identityFits: ['creator', 'artist', 'designer'],
    densityModes: ['creator-hub', 'art-gallery'],
    layoutGrammar: '强色背景、中央角色/作品、底部短文案与入口按钮。',
    typography: { display: 'Anton', body: 'Noto Sans SC', cjk: 'Noto Sans SC' },
    palette: { base: '#F4845F', text: '#111111', accent: '#F4845F', secondary: '#6BBF7A' },
    heroPattern: 'IP 名称 + 一句个性描述 + 作品入口。',
    sectionPlan: ['Hero carousel', 'Character/story', 'Works', 'Shop/social links'],
    motionPlan: ['carousel lock', 'shape drift', 'button snap'],
    imagePolicy: '强依赖角色/作品图；缺失时只能用明确的形状 placeholder，不能伪造角色图。',
    generationNotes: ['大标题可用于英文品牌名，中文解释必须小号清晰。', '角色图不得缩到看不见。'],
    risks: ['没有高质量图像时不建议使用；中英字体混用风险高。'],
    effects: ['character-figurine-carousel', '3D SHAPE', '650ms lock'],
    accent: '#F4845F',
  },
  {
    id: '3d-tech-portfolio',
    name: '3D Tech Portfolio',
    category: 'Tech',
    visual: 'tech3d',
    summary: '空间化项目卡、3D 几何体、代码窗和节点数据流，表达技术系统感。',
    bestFor: 'AI / 前端 / Coding Agent 开发者',
    identityFits: ['ai-engineer', 'frontend-engineer'],
    densityModes: ['portfolio-standard', 'case-study-rich'],
    layoutGrammar: '左侧代码身份面板，右侧 3D 项目物件，下面接项目证据。',
    typography: { display: 'Space Grotesk', body: 'Noto Sans SC', cjk: 'Noto Sans SC', mono: 'JetBrains Mono' },
    palette: { base: '#050d12', text: '#eafff9', accent: '#22f5c8' },
    heroPattern: '技术身份 + 正在构建的系统 + 可验证项目。',
    sectionPlan: ['Hero', 'Agent/project cards', 'Stack', 'Proof log'],
    motionPlan: ['grid drift', 'node pulse', '3D hover'],
    imagePolicy: '项目截图放入空间卡片；缺失时用代码窗和节点图替代。',
    generationNotes: ['项目卡要大到能看清，不要堆太多。'],
    risks: ['3D 过多会压缩正文；注意移动端降级。'],
    effects: ['3D cards', 'Grid drift', 'Node pulses'],
    accent: '#22f5c8',
  },
  {
    id: 'motion-gradient-brand',
    name: 'Motion Gradient Brand',
    category: 'Creator',
    visual: 'gradient',
    summary: '强烈渐变网格、品牌宣言、漂浮内容卡和磁性 CTA。',
    bestFor: '创作者 / AI 产品探索者 / founder',
    identityFits: ['creator', 'founder', 'freelancer'],
    densityModes: ['minimal-card', 'creator-hub'],
    layoutGrammar: '渐变氛围 + 少量浮层卡片 + 快速入口。',
    typography: { display: 'Archivo', body: 'Noto Sans SC', cjk: 'Noto Sans SC' },
    palette: { base: '#180f2c', text: '#ffffff', accent: '#ff7ac8', secondary: '#5cf4ff' },
    heroPattern: '一句有记忆点的创作宣言，附 2-3 个内容入口。',
    sectionPlan: ['Hero', 'Featured content', 'Collaborations', 'Contact'],
    motionPlan: ['gradient mesh', 'floating cards', 'magnetic CTA'],
    imagePolicy: '可无图，用 CSS 氛围；有内容封面时放入 bento 卡。',
    generationNotes: ['避免紫色渐变白底俗套，必须有明确视觉 thesis。'],
    risks: ['容易 AI slop；需要克制文案。'],
    effects: ['Gradient mesh', 'Parallax cards', 'Magnetic CTA'],
    accent: '#ff7ac8',
  },
  {
    id: 'magazine-portfolio',
    name: 'Magazine Portfolio',
    category: 'Art',
    visual: 'magazine',
    summary: '杂志封面式排版，适合用图像和标题建立记忆点。',
    bestFor: '设计师 / 艺术家 / 内容创作者',
    identityFits: ['designer', 'artist', 'creator', 'photographer'],
    densityModes: ['portfolio-standard', 'art-gallery'],
    layoutGrammar: '封面式大标题 + 主图 + 目录式项目入口。',
    typography: { display: 'DM Serif Display', body: 'Noto Serif SC', cjk: 'Noto Serif SC', mono: 'JetBrains Mono' },
    palette: { base: '#f4eadb', text: '#201610', accent: '#d85135' },
    heroPattern: '像杂志封面一样展示身份和作品主题。',
    sectionPlan: ['Cover hero', 'Featured stories', 'Selected works', 'About'],
    motionPlan: ['editorial reveal', 'image mask', 'soft page shift'],
    imagePolicy: '需要高质量作品图；没有图时用封面色块和排版构图。',
    generationNotes: ['中文 serif 要统一，不能混系统宋体。'],
    risks: ['作品图过小会失去封面感；标题过长需改写。'],
    effects: ['Cover layout', 'Image masks', 'Editorial reveal'],
    accent: '#d85135',
  },
  {
    id: 'terminal-hacker-homepage',
    name: 'Terminal Hacker Homepage',
    category: 'Tech',
    visual: 'terminal',
    summary: '命令行身份面板、项目日志、repo 卡和扫描线。',
    bestFor: '程序员 / 开源作者 / 安全研究 / Agent builder',
    identityFits: ['ai-engineer', 'frontend-engineer'],
    densityModes: ['minimal-card', 'portfolio-standard'],
    layoutGrammar: '终端窗口作为导航，项目作为 log entry。',
    typography: { display: 'JetBrains Mono', body: 'Noto Sans SC', cjk: 'Noto Sans SC', mono: 'JetBrains Mono' },
    palette: { base: '#020503', text: '#78ff9f', accent: '#78ff9f' },
    heroPattern: 'whoami / projects / status 的终端式表达。',
    sectionPlan: ['Terminal hero', 'Repo cards', 'Build log', 'Contact command'],
    motionPlan: ['typing', 'cursor blink', 'scanline'],
    imagePolicy: '图像不是必须；项目截图可放在 ASCII/terminal frame 中。',
    generationNotes: ['中文说明不要全用等宽小字，需有可读正文层。'],
    risks: ['过度终端化会降低非技术受众理解。'],
    effects: ['Typing', 'Cursor blink', 'Log stream'],
    accent: '#78ff9f',
  },
  {
    id: 'minimal-premium-resume',
    name: 'Minimal Premium Resume',
    category: 'Business',
    visual: 'resume',
    summary: '极简高级简历主页，强调可信、清晰、行动入口。',
    bestFor: '求职 / 学生 / 顾问 / 商务个人页',
    identityFits: ['job-seeker', 'student', 'consultant', 'freelancer'],
    densityModes: ['minimal-card', 'portfolio-standard', 'case-study-rich'],
    layoutGrammar: '干净纸面、明确层级、少量证明卡和下载/联系入口。',
    typography: { display: 'Fraunces', body: 'Noto Sans SC', cjk: 'Noto Sans SC' },
    palette: { base: '#f8f5ed', text: '#171717', accent: '#2c5bff' },
    heroPattern: '姓名 + 目标岗位/服务 + 三个可信证据。',
    sectionPlan: ['Hero', 'Experience', 'Projects', 'Contact'],
    motionPlan: ['subtle reveal', 'hover lift', 'clean CTA'],
    imagePolicy: '可用头像或不使用图片；头像缺失时用字母印章。',
    generationNotes: ['适合中文求职，正文必须清楚，不追求过强装饰。'],
    risks: ['过度极简可能显得空；需要真实证据填充。'],
    effects: ['Subtle reveal', 'Hover lift', 'Clean CTA'],
    accent: '#2c5bff',
  },
  {
    id: 'cute-pixel-creator',
    name: 'Cute Pixel Creator',
    category: 'Creator',
    visual: 'pixel',
    summary: '像素贴纸、游戏 UI、任务卡片和轻快动效。',
    bestFor: '年轻创作者 / 插画师 / 轻品牌',
    identityFits: ['creator', 'artist', 'designer'],
    densityModes: ['creator-hub', 'minimal-card'],
    layoutGrammar: '像素网格背景、任务卡、内容成就与社交入口。',
    typography: { display: 'Space Grotesk', body: 'Noto Sans SC', cjk: 'Noto Sans SC' },
    palette: { base: '#ffe9ef', text: '#322231', accent: '#ff8fb4' },
    heroPattern: '创作者任务面板，展示内容主题和入口。',
    sectionPlan: ['Hero quest', 'Content quests', 'Works', 'Links'],
    motionPlan: ['sprite hover', 'tiny bounce', 'card pop'],
    imagePolicy: '适合贴纸/插画/头像；缺失时用像素图形。',
    generationNotes: ['中文保持可爱但不要幼稚；正文不可过密。'],
    risks: ['不适合严肃商务；像素装饰不能盖过内容。'],
    effects: ['Sprite hover', 'Tiny bounce', 'Quest cards'],
    accent: '#ff8fb4',
  },
  {
    id: 'ai-system-dashboard',
    name: 'AI System Dashboard',
    category: 'Tech',
    visual: 'dashboard',
    summary: '把个人能力表达成 AI 系统图、Agent pipeline 和输出面板。',
    bestFor: 'LLM / Agent / AI 产品实践者',
    identityFits: ['ai-engineer', 'frontend-engineer', 'founder'],
    densityModes: ['portfolio-standard', 'case-study-rich'],
    layoutGrammar: '系统拓扑、能力节点、验证面板和输出样例。',
    typography: { display: 'JetBrains Mono', body: 'Noto Sans SC', cjk: 'Noto Sans SC', mono: 'JetBrains Mono' },
    palette: { base: '#07111f', text: '#e9fbff', accent: '#55d7ff' },
    heroPattern: '把“我能做什么”变成一个可验证系统。',
    sectionPlan: ['System hero', 'Capabilities', 'Case outputs', 'Verifier notes'],
    motionPlan: ['edge flow', 'skill nodes', 'panel reveal'],
    imagePolicy: '项目截图进入 output panel；无图时用结构化输出卡。',
    generationNotes: ['适合展示 Agent 链路，但每屏信息要分组。'],
    risks: ['容易变成密集 dashboard；注意中文解释层。'],
    effects: ['Edge flow', 'Skill nodes', 'Verifier panel'],
    accent: '#55d7ff',
  },
  {
    id: 'creator-bento-homepage',
    name: 'Creator Bento Homepage',
    category: 'Creator',
    visual: 'bento',
    summary: '平台入口、内容主题、精选作品和合作 CTA 的 bento 聚合页。',
    bestFor: '小红书 / 视频号 / 写作者 / 自媒体',
    identityFits: ['creator', 'freelancer'],
    densityModes: ['creator-hub', 'portfolio-standard'],
    layoutGrammar: 'Bento 卡片组织平台、内容栏目、代表作和合作入口。',
    typography: { display: 'Archivo', body: 'Noto Sans SC', cjk: 'Noto Sans SC' },
    palette: { base: '#15110a', text: '#fff8df', accent: '#ffe15a', secondary: '#ff7ac8' },
    heroPattern: '一句创作者定位 + 平台入口 + 最新内容。',
    sectionPlan: ['Bento hero', 'Channels', 'Featured posts', 'Collaboration'],
    motionPlan: ['bento fly-in', 'card expansion', 'content preview'],
    imagePolicy: '内容封面可放 bento；缺失时使用主题色卡和图标。',
    generationNotes: ['中文标题要短，卡片内容分层，不要塞满。'],
    risks: ['卡片过多会拥挤；移动端需重排。'],
    effects: ['Bento fly-in', 'Card expansion', 'Content preview'],
    accent: '#ffe15a',
  },
  {
    id: 'dark-editorial-portfolio',
    name: 'Dark Editorial Portfolio',
    category: 'Art',
    visual: 'darkEditorial',
    summary: '暗黑画廊、巨型标题、项目大图和电影感留白。',
    bestFor: '高级作品集 / 设计 / 创意技术',
    identityFits: ['designer', 'artist', 'photographer'],
    densityModes: ['portfolio-standard', 'art-gallery'],
    layoutGrammar: '暗色 editorial，作品图占主视觉，文字像展览说明。',
    typography: { display: 'Cormorant Garamond', body: 'Noto Serif SC', cjk: 'Noto Serif SC', mono: 'JetBrains Mono' },
    palette: { base: '#080706', text: '#efe4cf', accent: '#d7b46a' },
    heroPattern: '大标题 + 展览式副标题 + 作品入口。',
    sectionPlan: ['Hero', 'Featured works', 'Process', 'Contact'],
    motionPlan: ['mask reveal', 'image parallax', 'slow fade'],
    imagePolicy: '依赖高质量作品图；无图时用抽象色块不可冒充真实作品。',
    generationNotes: ['保留留白，不把所有项目挤在首屏。'],
    risks: ['中文长标题容易换行难看；图片质量决定成败。'],
    effects: ['Mask reveal', 'Image parallax', 'Slow fade'],
    accent: '#d7b46a',
  },
  {
    id: 'spatial-project-gallery',
    name: 'Spatial Project Gallery',
    category: 'Tech',
    visual: 'spatial',
    summary: '项目墙在空间中展开，重点展示多个 demo 和案例。',
    bestFor: '项目很多的开发者 / 作品集型主页',
    identityFits: ['frontend-engineer', 'ai-engineer', 'designer'],
    densityModes: ['portfolio-standard', 'case-study-rich'],
    layoutGrammar: '空间项目墙 + 单项目聚焦 + 技术标签。',
    typography: { display: 'Archivo', body: 'Noto Sans SC', cjk: 'Noto Sans SC' },
    palette: { base: '#090812', text: '#f4f0ff', accent: '#8f7cff' },
    heroPattern: '把项目集合做成可浏览的空间墙。',
    sectionPlan: ['Spatial hero', 'Project wall', 'Case detail', 'Contact'],
    motionPlan: ['CSS 3D', 'hover depth', 'project wall'],
    imagePolicy: '每个项目至少要有截图或稳定 placeholder，不能让图片过小。',
    generationNotes: ['项目多时先精选 4-6 个，剩余放 secondary。'],
    risks: ['3D 卡可能遮挡；必须截图检查。'],
    effects: ['CSS 3D', 'Hover depth', 'Project wall'],
    accent: '#8f7cff',
  },
  {
    id: 'business-personal-brand',
    name: 'Business Personal Brand',
    category: 'Business',
    visual: 'business',
    summary: '可信、转化导向、服务定位清楚，适合商务个人品牌。',
    bestFor: '顾问 / freelancer / founder / 服务提供者',
    identityFits: ['consultant', 'freelancer', 'founder'],
    densityModes: ['minimal-card', 'portfolio-standard'],
    layoutGrammar: '左侧清晰服务定位，右侧证明与预约入口，稳重留白。',
    typography: { display: 'Fraunces', body: 'Noto Sans SC', cjk: 'Noto Sans SC' },
    palette: { base: '#f5efe3', text: '#0f2f54', accent: '#0f2f54' },
    heroPattern: '服务对象 + 能解决的问题 + 明确预约 CTA。',
    sectionPlan: ['Hero', 'Services', 'Proof', 'Booking CTA'],
    motionPlan: ['proof cards', 'booking CTA', 'trust microcopy'],
    imagePolicy: '可用职业头像/案例截图；无图时用证明卡和服务卡。',
    generationNotes: ['不要写过长英文 headline；中文说明要短而可信。'],
    risks: ['容易像公司官网；首屏右侧证明卡不要多于 3 个。'],
    effects: ['Proof cards', 'Booking CTA', 'Trust microcopy'],
    accent: '#0f2f54',
  },
  {
    id: 'case-study-portfolio',
    name: 'Case Study Portfolio',
    category: 'Business',
    visual: 'caseStudy',
    summary: '以案例研究讲清问题、角色、过程、结果。',
    bestFor: '求职 / PM / 产品设计 / 开发作品集',
    identityFits: ['job-seeker', 'designer', 'frontend-engineer', 'student'],
    densityModes: ['case-study-rich', 'portfolio-standard'],
    layoutGrammar: '问题-角色-过程-结果的证据链，适合招聘方阅读。',
    typography: { display: 'Archivo', body: 'Noto Sans SC', cjk: 'Noto Sans SC' },
    palette: { base: '#111111', text: '#fff4ec', accent: '#ff6a3d' },
    heroPattern: '用一个代表案例建立可信度，再进入项目列表。',
    sectionPlan: ['Hero case', 'Problem/Role/Result', 'Evidence', 'More cases'],
    motionPlan: ['progress timeline', 'hover details', 'evidence cards'],
    imagePolicy: '案例截图必须足够大；缺图时用流程图和结果卡替代。',
    generationNotes: ['高密度但不能拥挤，超过 4-6 点就拆 section。'],
    risks: ['文字易过多；必须控制字号和留白。'],
    effects: ['Progress timeline', 'Hover details', 'Evidence cards'],
    accent: '#ff6a3d',
  },
  {
    id: 'art-museum-portfolio',
    name: 'Art Museum Portfolio',
    category: 'Art',
    visual: 'museum',
    summary: '参考 Google Arts & Culture 的策展式浏览体验，适合艺术、美术、摄影个人主页。',
    bestFor: '艺术家 / 摄影师 / 美术作品集 / 策展型创作者',
    identityFits: ['artist', 'photographer', 'designer'],
    densityModes: ['art-gallery'],
    layoutGrammar: '搜索/策展入口 + 作品墙 + 展览叙事。',
    typography: { display: 'Cormorant Garamond', body: 'Noto Serif SC', cjk: 'Noto Serif SC' },
    palette: { base: '#f7f3ea', text: '#211b16', accent: '#b5422f', secondary: '#e2b66e' },
    heroPattern: '像进入一个个人美术馆，先给探索入口再给作品墙。',
    sectionPlan: ['Museum hero', 'Collections', 'Artwork wall', 'Artist statement'],
    motionPlan: ['museum-curation', 'virtual gallery', 'artwork wall'],
    imagePolicy: '必须使用用户授权作品图；缺图时只用策展色块，不复制第三方艺术素材。',
    generationNotes: ['作品图要大、清楚、有 alt；标题不要压到作品。'],
    risks: ['第三方素材版权风险；图片太小会失败。'],
    effects: ['museum-curation', 'Virtual gallery', 'Artwork wall'],
    accent: '#b5422f',
  },
];

export const allTemplateNames = templates.map((template) => template.name).join(' / ');
