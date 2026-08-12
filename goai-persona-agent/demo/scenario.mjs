export const scenario = {
  caseId: 'persona-demo-paopao-001',
  subject: {
    publicName: '跑跑蹦蹦跳跳',
    legalName: '郑淑文',
    publicRole: '开源项目作者',
    hiddenFields: ['公司名称', '非公开联系方式'],
  },
  positions: [
    {
      id: 'scene-translator',
      label: 'AI 场景翻译官 / 开源产品人',
      recommended: true,
      statement: '把传统行业的真实问题，翻译成能运行、能传播、能迭代的 AI 产品。',
      rationale: '8 年品牌与项目运营形成场景判断力；连续开源项目和内容增长形成产品化与传播证据。',
    },
    {
      id: 'ai-growth',
      label: 'AI 产品增长运营',
      recommended: false,
      statement: '用内容、社群和产品反馈推动 AI 应用增长。',
      rationale: '招聘市场易理解，但区分度弱于“场景翻译官”。',
    },
    {
      id: 'brand-builder',
      label: '个人品牌与视觉工具作者',
      recommended: false,
      statement: '把个人经历做成可发布、可编辑的品牌资产。',
      rationale: '与主页 Skill 高度匹配，但无法覆盖其更广泛的 AI 产品实践。',
    },
  ],
  sources: [
    { id: 'resume-local', label: '本地简历', mode: 'local-read', defaultSelected: true, purpose: '经历抽取与缺口访谈' },
    { id: 'github-powerycy', label: 'GitHub / powerycy', mode: 'remote-read', defaultSelected: true, purpose: '项目与开源证据核验' },
    { id: 'public-content', label: '公开内容账号', mode: 'remote-read', defaultSelected: true, purpose: '内容主题与传播证据核验' },
    { id: 'life-sites', label: '作品 / 工作 / 生活网站', mode: 'remote-read', defaultSelected: false, purpose: '仅在逐站点授权后采集' },
  ],
  agents: [
    ['discovery', '洞察 / 访谈', '提取经历、追问缺口，不访问外部数据'],
    ['evidence', '证据与授权', '校验授权令牌、采集证据、维护来源台账'],
    ['strategy', '品牌策略', '生成定位候选、定义受众与表达边界'],
    ['content', '内容 / 信息架构', '把已验证主张组织成叙事结构'],
    ['visual', '视觉设计', '生成视觉规范与组件说明'],
    ['frontend', '前端实现', '调用 personal-homepage-skill 构建可发布页面'],
    ['qa', 'QA / 合规', '检查事实、隐私、无障碍、移动端与依赖'],
    ['delivery', '交付发布', '请求最终审批、发布、保存回滚点'],
  ],
  evidence: [
    { id: 'ev-resume-8y', source: '本地简历', capturedAt: '2026-08-12T00:00:00+08:00', summary: '8 年品牌、内容与项目运营经历' },
    { id: 'ev-github-projects', source: 'github.com/powerycy', capturedAt: '2026-08-12T16:00:00+08:00', summary: '多个公开 AI 应用与 Codex Skill 仓库' },
    { id: 'ev-homepage-skill', source: 'github.com/powerycy/personal-homepage-skill', capturedAt: '2026-08-12T16:00:00+08:00', summary: '个人主页生成、视觉规则、前端 QA 与开源演示' },
    { id: 'ev-talk-0718', source: '7.18 线下分享授权材料', capturedAt: '2026-08-12T00:00:00+08:00', summary: '“场景翻译官”观点与项目形成过程' },
  ],
};
