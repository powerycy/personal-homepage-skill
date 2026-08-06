export type StyleId = 'signal' | 'editorial' | 'sunlit' | 'paper';

export type Project = {
  name: string;
  problem: string;
  role: string;
  features: string;
  stack: string;
  result: string;
  link: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  project: Project;
};

export type StylePreset = {
  id: StyleId;
  name: string;
  description: string;
  bestFor: string;
  rationale: string;
  accent: string;
};

export const defaultProfile: Profile = {
  name: '好奇的小逸',
  role: '独立创作者 · 工具作者',
  tagline: '把模糊的个人经历，整理成别人愿意看完的主页。',
  bio: '我在做一套个人主页生成方法：先判断一个人真正需要表达什么，再决定版式和动效。比起堆模板，我更在意项目证据、中文阅读和最后能不能真的发布。',
  location: '中国 · 远程协作',
  email: '247133278@qq.com',
  project: {
    name: 'Personal Homepage Skill',
    problem: '普通 AI 生成的个人主页经常长得一样，也容易编造指标、忽略中文排版和真实项目证据。',
    role: '产品判断、规则设计与开源维护',
    features: '参考优先、18 种视觉方向、在线编辑、HTML 导出、桌面与移动端质量检查',
    stack: 'React · TypeScript · Vite · Playwright',
    result: '已开源，并提供可直接体验的在线 Studio。',
    link: 'https://github.com/powerycy/personal-homepage-skill',
  },
};

export const stylePresets: StylePreset[] = [
  {
    id: 'signal',
    name: 'Signal / 信号场',
    description: '黑色技术底、酸橙信号色、信息像系统日志一样展开。',
    bestFor: '开发者、AI 创作者、开源作者',
    rationale: '用明确的网格和项目证据表达技术感，不靠随机粒子或虚构指标。',
    accent: '#d9ff43',
  },
  {
    id: 'editorial',
    name: 'Editorial / 编辑部',
    description: '纸张底色、超大中文标题、杂志式项目编排。',
    bestFor: '设计师、写作者、内容创作者',
    rationale: '让文字和项目像一篇被认真编辑过的封面报道，适合内容本身有观点的人。',
    accent: '#ff4f2e',
  },
  {
    id: 'sunlit',
    name: 'Sunlit / 日光房',
    description: '暖黄主色、蓝色动作点、轻松但不幼稚。',
    bestFor: '独立开发者、自由职业者、年轻创作者',
    rationale: '用高可读的暖色和大胆几何建立亲近感，移动端仍保留清楚的行动入口。',
    accent: '#175cff',
  },
  {
    id: 'paper',
    name: 'Paper / 履历纸',
    description: '克制黑白、细红线索引、强调角色与结果。',
    bestFor: '求职者、顾问、产品与研究岗位',
    rationale: '减少装饰，把招聘方最关心的定位、经历和项目责任放到阅读第一层。',
    accent: '#d62f2f',
  },
];

export const splitFeatures = (features: string) => features.split(/[、，,]/).map((item) => item.trim()).filter(Boolean);
