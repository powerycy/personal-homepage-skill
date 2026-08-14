import React, { useMemo, useState, useSyncExternalStore } from 'react'
import {
  ArchiveRestore,
  BadgeCheck,
  BookOpenCheck,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleAlert,
  CircleUserRound,
  ClipboardCheck,
  Code2,
  Eye,
  FileCheck2,
  FileText,
  Fingerprint,
  Github,
  Globe2,
  History,
  LayoutDashboard,
  Link2,
  LockKeyhole,
  MemoryStick,
  MessageSquareText,
  MoreHorizontal,
  Network,
  Palette,
  Pause,
  Plus,
  RefreshCcw,
  Rocket,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Undo2,
  UserRoundSearch,
  X,
} from 'lucide-react'
import homepagePreview from '../assets/homepage-delivery-example.jpg'
import styles from './styles.css'
import { AGENTS, POSITIONING_OPTIONS, SOURCE_CATALOG, getActiveScenario } from './domain.js'
import { workspaceStore } from './store.js'

const PLUGIN_ID = '@powerycy/dsh-personaproof-plugin'

function useWorkspace() {
  return useSyncExternalStore(workspaceStore.subscribe, workspaceStore.getSnapshot, workspaceStore.getSnapshot)
}

function gateClass(status) {
  return status === 'approved' ? 'is-approved' : status === 'locked' ? 'is-locked' : status.includes?.('revoked') ? 'is-revoked' : 'is-pending'
}

function formatTime(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit' }).format(date)
}

function DeepSeekBrand({ compact = false }) {
  return <div className={`pp-dsh-brand ${compact ? 'is-compact' : ''}`}>
    <img src="/favicon.svg" alt="DeepSeek Harness" />
    {!compact && <div><strong>DeepSeek Harness</strong><span>official workspace</span></div>}
  </div>
}

function PersonaBrand({ compact = false }) {
  return <div className={`pp-brand ${compact ? 'is-compact' : ''}`}>
    <span className="pp-brand-mark"><Fingerprint size={21} /></span>
    {!compact && <div><strong>人设有据</strong><span>PersonaProof</span></div>}
  </div>
}

function Sidebar({ collapsed = false }) {
  const state = useWorkspace()
  const active = getActiveScenario(state)
  return <aside className={`pp-sidebar ${collapsed ? 'is-collapsed' : ''}`} aria-label="个人品牌工作区">
    <div className="pp-brand-stack">
      <DeepSeekBrand compact={collapsed} />
      <div className="pp-brand-join" />
      <PersonaBrand compact={collapsed} />
    </div>

    <button className="pp-new-scenario" onClick={() => state.profile ? workspaceStore.setOverlay({ type: 'scenario' }) : workspaceStore.loadDemo()}>
      <Plus size={18} /> {!collapsed && <span>{state.profile ? '新建场景版本' : '建立品牌档案'}</span>}
    </button>

    {!collapsed && state.profile && <section className="pp-profile-mini">
      <span className="pp-profile-avatar">跑</span>
      <div><small>唯一事实主档案</small><strong>{state.profile.alias}</strong><span>{state.profile.displayName} · 公司隐藏</span></div>
      <ShieldCheck size={16} />
    </section>}

    {!collapsed && <div className="pp-side-heading"><span>场景版本</span><small>{state.scenarios.length}/5</small></div>}
    <nav className="pp-scenario-list" aria-label="品牌场景版本">
      {state.scenarios.map((scenario, index) => <button
        key={scenario.id}
        className={`pp-scenario-row ${scenario.id === active?.id ? 'is-active' : ''}`}
        onClick={() => workspaceStore.selectScenario(scenario.id)}
        title={collapsed ? scenario.name : undefined}
      >
        <span className="pp-scenario-icon">{index === 0 ? <BriefcaseBusiness size={17} /> : <Target size={17} />}</span>
        {!collapsed && <><span><strong>{scenario.name}</strong><small>{scenario.status === 'published' ? '已发布' : scenario.status === 'rolled-back' ? '已回滚' : scenario.gates.G1 === 'approved' ? '定位已确认' : '等待定位'}</small></span><i className={scenario.id === active?.id ? 'is-live' : ''} /></>}
      </button>)}
      {!state.scenarios.length && !collapsed && <div className="pp-side-empty">一个人只有一份事实底座；求职、创作、合作等版本只改变表达重点。</div>}
    </nav>

    <div className="pp-sidebar-foot">
      {!collapsed && <button className="pp-demo-link" onClick={() => workspaceStore.loadDemo()}><Sparkles size={15} />载入郑淑文授权案例</button>}
      <div className="pp-local-badge"><LockKeyhole size={15} />{!collapsed && <span>本地优先 · 按来源授权</span>}</div>
    </div>
  </aside>
}

function EmptyWorkspace() {
  return <main className="pp-empty">
    <div className="pp-empty-mark"><Fingerprint size={50} /></div>
    <div className="pp-eyebrow"><span /> DeepSeek Harness × PersonaProof</div>
    <h1>人人都应该有<br /><em>自己的人设。</em></h1>
    <p>不是替你编故事，而是从真实经历中挖出价值、找到方向、补齐证据，让你在信息爆炸里更容易被看见、被记住。</p>
    <div className="pp-hero-actions">
      <button className="pp-primary" onClick={() => workspaceStore.loadDemo()}><Sparkles size={18} />体验郑淑文授权案例</button>
      <button className="pp-secondary" onClick={() => workspaceStore.loadDemo()}><FileText size={18} />从简历开始</button>
    </div>
    <div className="pp-promise-grid">
      <div><UserRoundSearch /><strong>先挖掘，再定位</strong><span>主动访谈，不用一份简历草率贴标签</span></div>
      <div><Link2 /><strong>先授权，再找证据</strong><span>没有 G2，外部个人资料工具直接拒绝</span></div>
      <div><Rocket /><strong>主站是交付，不是起点</strong><span>八个职能 Agent 协作、验收、发布和回滚</span></div>
    </div>
  </main>
}

const VIEW_ITEMS = [
  { id: 'workbench', label: '品牌工作台', icon: MessageSquareText },
  { id: 'evidence', label: '证据账本', icon: FileCheck2 },
  { id: 'site', label: '主站预览', icon: Globe2 },
  { id: 'trace', label: '协作审计', icon: Network },
]

function WorkspaceHeader({ state, scenario }) {
  return <header className="pp-header">
    <div className="pp-current-profile"><span>跑</span><div><small>当前主档案 · {state.profile.id}</small><strong>{state.profile.alias}</strong></div></div>
    <div className="pp-view-switch" role="tablist" aria-label="工作区视图">
      {VIEW_ITEMS.map(item => { const Icon = item.icon; return <button key={item.id} className={state.view === item.id ? 'is-active' : ''} onClick={() => workspaceStore.setView(item.id)}><Icon size={15} />{item.label}</button> })}
    </div>
    <div className="pp-header-actions">
      <button onClick={() => workspaceStore.setOverlay({ type: 'memory' })} title="长期品牌记忆"><MemoryStick size={18} /></button>
      <button onClick={() => workspaceStore.setOverlay({ type: 'consent' })} title="授权中心"><ShieldCheck size={18} /></button>
      <button title="更多"><MoreHorizontal size={18} /></button>
    </div>
  </header>
}

function GateRail({ scenario }) {
  const gates = [
    { id: 'G0', label: '长期档案', status: 'approved' },
    { id: 'G1', label: '定位方向', status: scenario.gates.G1 },
    { id: 'G2', label: '数据来源', status: scenario.gates.G2 },
    { id: 'G3', label: '公开发布', status: scenario.gates.G3 },
  ]
  return <div className="pp-gate-rail">{gates.map((gate, index) => <React.Fragment key={gate.id}>
    <div className={gateClass(gate.status)}><span>{gate.status === 'approved' ? <Check size={12} /> : gate.id}</span><div><strong>{gate.label}</strong><small>{gate.status === 'approved' ? '已同意' : gate.status === 'locked' ? '未开放' : gate.status.includes?.('revoked') ? '已撤回' : '待确认'}</small></div></div>
    {index < gates.length - 1 && <i />}
  </React.Fragment>)}</div>
}

function ChatBubble({ message }) {
  return <div className={`pp-chat-bubble is-${message.role}`}><p>{message.text}</p><time>{formatTime(message.at)}</time></div>
}

function PositioningCard({ option, scenario }) {
  const selected = scenario.selectedPositioningId === option.id
  return <button className={`pp-position-card ${selected ? 'is-selected' : ''}`} onClick={() => scenario.gates.G1 === 'pending' && workspaceStore.confirmDirection(option.id)}>
    <div><span>{option.id === 'scene-translator' ? '最推荐' : '备选方向'}</span><b>{option.fit}% 匹配</b></div>
    <h3>{option.title}</h3>
    <p>{option.reason}</p>
    <small>{selected ? <><Check size={13} />已由本人确认</> : <><ChevronRight size={13} />选择这个方向</>}</small>
  </button>
}

function WorkbenchView({ state, scenario }) {
  const [text, setText] = useState('')
  const positioning = POSITIONING_OPTIONS.find(item => item.id === scenario.selectedPositioningId)
  const submit = () => { workspaceStore.send(text); setText('') }
  return <div className="pp-workbench">
    <div className="pp-workbench-scroll">
      <div className="pp-context-strip"><Bot size={15} /><span>只召回 <strong>{scenario.name}</strong> 所需上下文</span><small>主档案事实跨场景一致</small></div>
      <GateRail scenario={scenario} />

      <section className="pp-brief-card">
        <div className="pp-brief-head"><div><small>PERSONA DISCOVERY</small><h2>我看见的，不只是一份简历。</h2></div><span><BadgeCheck size={16} />公司信息隐藏</span></div>
        <p>你真正稀缺的不是“会用 AI”，而是能把传统行业里的真实问题，翻译成能运行、能传播、能持续迭代的产品。开源项目与内容影响力让这个判断有了可验证的抓手。</p>
        <div className="pp-signal-grid">
          <div><strong>真实场景</strong><span>长期一线业务与运营经历</span></div>
          <div><strong>产品落地</strong><span>从问题到可运行 AI 项目</span></div>
          <div><strong>公开创造</strong><span>开源作者与持续内容输出</span></div>
          <div><strong>传播翻译</strong><span>让非技术人理解并使用 AI</span></div>
        </div>
      </section>

      <section className="pp-positioning-section">
        <div className="pp-section-title"><div><small>G1 · DIRECTION CONSENT</small><h2>先确认“怎么被记住”</h2></div><p>未经本人确认，不进入外部证据检索。</p></div>
        <div className="pp-position-grid">{POSITIONING_OPTIONS.map(option => <PositioningCard key={option.id} option={option} scenario={scenario} />)}</div>
      </section>

      {scenario.gates.G1 === 'approved' && <section className="pp-next-action">
        <div><span className="pp-next-icon"><ShieldCheck /></span><div><small>下一步 · G2</small><h3>{positioning?.title}</h3><p>方向已确认。现在可以逐项决定哪些来源可被只读核验、用于什么目的、保留多久。</p></div></div>
        <div className="pp-next-buttons">
          <button className="pp-ghost-danger" onClick={() => workspaceStore.attemptGitHub()}><Github size={16} />先试访问 GitHub</button>
          <button className="pp-primary" onClick={() => workspaceStore.setOverlay({ type: 'consent' })}><LockKeyhole size={16} />打开授权中心</button>
        </div>
      </section>}

      {scenario.gates.G2 === 'approved' && scenario.status !== 'qa-passed' && <section className="pp-team-launch">
        <div><Network /><div><small>AGENTTEAMS RUN</small><h2>证据已授权，让 8 个 Agent 开始协作。</h2><p>现场会出现一次 QA 退回，证明 Leader 不是无条件接受所有生成结果。</p></div></div>
        <button className="pp-primary" onClick={() => workspaceStore.runTeam()}><Sparkles size={17} />运行完整闭环</button>
      </section>}

      {scenario.messages.map(message => <ChatBubble key={message.id} message={message} />)}
    </div>
    <div className="pp-composer-wrap">
      <div className="pp-composer-tools"><button><FileText size={14} />简历</button><button onClick={() => workspaceStore.setOverlay({ type: 'consent' })}><Github size={14} />授权来源</button><button onClick={() => workspaceStore.setView('site')}><Globe2 size={14} />主页效果</button></div>
      <div className="pp-composer"><textarea rows={2} value={text} onChange={event => setText(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit() } }} placeholder="继续补充你的经历、目标或不想公开的内容…" /><button disabled={!text.trim()} onClick={submit} aria-label="发送"><Send size={17} /></button></div>
      <p>人设可以包装，事实不能编造。关键方向、数据来源和公开发布始终由你确认。</p>
    </div>
  </div>
}

function EvidenceView({ scenario }) {
  const typeName = { fact: '事实', inference: '推断', packaging: '包装' }
  return <div className="pp-evidence-view">
    <section className="pp-evidence-hero"><div><small>CLAIM–EVIDENCE LEDGER</small><h2>每一句公开表达，都知道凭什么。</h2><p>事实必须绑定证据；推断要展示理由和置信度；包装只能升级表达，不能创造新事实。</p></div><div className="pp-ledger-stats"><span><b>{scenario.claims.length}</b> 主张</span><span><b>{scenario.grants.filter(item => item.status === 'active').length}</b> 有效授权</span><span><b>{scenario.claims.filter(item => item.status === 'needs-review').length}</b> 待复核</span></div></section>
    {!scenario.claims.length ? <div className="pp-empty-ledger"><BookOpenCheck /><h3>证据账本还没有内容</h3><p>通过 G2 并运行 AgentTeams 后，主张、证据和 QA 结果会出现在这里。</p><button className="pp-primary" onClick={() => workspaceStore.setView('workbench')}>返回品牌工作台</button></div> : <div className="pp-claim-list">{scenario.claims.map(claim => <article key={claim.id} className={`is-${claim.type} is-${claim.status}`}>
      <div><span>{typeName[claim.type]}</span><small>{Math.round(claim.confidence * 100)}% confidence</small><i>{claim.status === 'accepted' ? '可公开' : claim.status === 'rejected' ? 'QA 已退回' : '授权变化，待复核'}</i></div>
      <h3>{claim.text}</h3><p>{claim.explanation}</p>
      <footer><Link2 size={14} /><span>{claim.evidenceIds.length ? claim.evidenceIds.join(' · ') : '没有证据引用'}</span></footer>
    </article>)}</div>}
    {scenario.grants.some(item => item.status === 'active' && item.sourceId === 'github') && <section className="pp-revoke-panel"><div><Undo2 /><span><strong>撤回机制可现场验证</strong><small>撤回 GitHub 后，关联主张进入复核，公开版本自动回滚。</small></span></div><button onClick={() => workspaceStore.revokeGithub()}><RotateCcw size={15} />撤回 GitHub 并回滚</button></section>}
  </div>
}

function SiteView({ scenario }) {
  const published = scenario.status === 'published'
  const qaReady = scenario.status === 'qa-passed'
  return <div className="pp-site-view">
    <div className="pp-site-toolbar"><div><small>PERSONAL BRAND DELIVERY</small><h2>定制个人品牌主站</h2></div><div><span className={published ? 'is-live' : ''}>{published ? 'v1.0.0 已发布' : qaReady ? 'QA 已通过 · 等待 G3' : '预览模式'}</span>{qaReady && <button className="pp-primary" onClick={() => workspaceStore.publish()}><Rocket size={15} />审阅并同意发布</button>}</div></div>
    <section className="pp-site-frame">
      <div className="pp-browser-chrome"><i /><i /><i /><span>personaproof.local/paopaobengbengtiaotiao</span><BadgeCheck size={15} /></div>
      <div className="pp-site-shot"><img src={homepagePreview} alt="用户提供的星球个人主页 Demo 桌面效果" /><div className="pp-shot-label"><span>已授权视觉交付示例</span><strong>最终页面将替换为郑淑文真实内容与已验证证据</strong></div></div>
    </section>
    <div className="pp-site-meta">
      <article><Palette /><div><small>视觉方向</small><strong>每个人一套，不是通用模板</strong><p>根据定位、受众和真实内容决定视觉语言；此处展示用户提供的“星球”效果。</p></div></article>
      <article><ClipboardCheck /><div><small>公开边界</small><strong>公司隐藏 · 无证据强断言已删除</strong><p>页面只使用已通过 G1/G2/G3 的内容和来源。</p></div></article>
      <article><History /><div><small>版本治理</small><strong>发布清单、撤回和回滚</strong><p>每版保存 Claim、授权与构建映射，不只保存一份网页文件。</p></div></article>
    </div>
  </div>
}

function TraceView({ scenario }) {
  const agentMap = Object.fromEntries(AGENTS.map(agent => [agent.id, agent]))
  return <div className="pp-trace-view">
    <section className="pp-team-board"><div className="pp-section-title"><div><small>AGENTTEAMS CONTROL PLANE</small><h2>8 个职能，不是一句“多 Agent”。</h2></div><p>共享同一个 Case State，Leader 接受或退回 Worker 产物。</p></div><div className="pp-agent-grid">{scenario.agentRuns.map(agent => <article key={agent.id} className={`is-${agent.status}`}><span>{agent.leader ? <Fingerprint /> : agent.id.includes('visual') ? <Palette /> : agent.id.includes('frontend') ? <Code2 /> : agent.id.includes('qa') ? <ShieldCheck /> : agent.id.includes('publish') ? <Rocket /> : <Bot />}</span><div><small>{agent.leader ? 'TEAM LEADER' : agent.skill}</small><strong>{agent.name}</strong></div><i>{agent.status === 'accepted' ? '已验收' : agent.status === 'waiting' ? '等 G3' : '待运行'}</i></article>)}</div></section>
    <section className="pp-trace-log"><div className="pp-section-title"><div><small>TRACE / LOG</small><h2>任务、工具、闸门和退回都可回放</h2></div><span>{scenario.trace.length} events</span></div>{!scenario.trace.length ? <div className="pp-empty-trace"><Network /><p>完成定位和授权后运行 AgentTeams。</p></div> : <div className="pp-trace-list">{scenario.trace.map(item => <article key={item.id} className={item.event.includes('rejected') || item.event.includes('denied') ? 'is-alert' : ''}><span /><time>{formatTime(item.at)}</time><div><small>{item.event} · {agentMap[item.agentId]?.name || item.agentId}</small><strong>{item.message}</strong>{item.skill && <p>Skill: {item.skill}</p>}</div></article>)}</div>}</section>
  </div>
}

function ConsentDialog({ scenario }) {
  const [selected, setSelected] = useState(() => scenario.grants.filter(item => item.status === 'active').map(item => item.sourceId))
  const toggle = id => setSelected(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id])
  const locked = scenario.gates.G1 !== 'approved'
  return <div className="pp-modal pp-consent-dialog"><button className="pp-modal-close" onClick={() => workspaceStore.setOverlay(null)}><X size={18} /></button><div className="pp-modal-heading"><span><ShieldCheck /></span><div><small>G2 · SOURCE CONSENT</small><h2>授权不是一句“全部允许”</h2></div></div><p>每个来源绑定用途、只读方式和有效期。未选择的来源继续拒绝访问，撤回后会追溯影响。</p><div className="pp-source-list">{SOURCE_CATALOG.map(source => <label key={source.id} className={selected.includes(source.id) ? 'is-selected' : ''}><input type="checkbox" checked={selected.includes(source.id)} disabled={locked} onChange={() => toggle(source.id)} /><span className="pp-source-icon">{source.id === 'github' ? <Github /> : source.id === 'resume' ? <FileText /> : source.id === 'homepage-demo' ? <Globe2 /> : <MessageSquareText />}</span><span><strong>{source.name}</strong><small>{source.purpose}</small><em>{source.mode}</em></span></label>)}</div>{locked ? <div className="pp-locked-message"><LockKeyhole />请先完成 G1 定位确认。</div> : <button className="pp-primary pp-wide" disabled={!selected.length} onClick={() => workspaceStore.grantSources(selected)}>批准所选来源</button>}</div>
}

function ScenarioDialog() {
  const [name, setName] = useState('创作者合作版')
  const [audience, setAudience] = useState('内容合作方、活动主办方与 AI 创作者')
  const [goal, setGoal] = useState('突出开源作品、观点和公开表达能力')
  return <div className="pp-modal"><button className="pp-modal-close" onClick={() => workspaceStore.setOverlay(null)}><X size={18} /></button><div className="pp-modal-heading"><span><Target /></span><div><small>ONE TRUTH · MANY CONTEXTS</small><h2>新建场景版本</h2></div></div><p>场景版本可以改变受众、重点、语气和视觉，但不能改变主档案里的事实。</p><label className="pp-field">版本名称<input value={name} onChange={event => setName(event.target.value)} /></label><label className="pp-field">目标受众<input value={audience} onChange={event => setAudience(event.target.value)} /></label><label className="pp-field">希望达成<input value={goal} onChange={event => setGoal(event.target.value)} /></label><button className="pp-primary pp-wide" onClick={() => workspaceStore.createScenario({ name, audience, goal })}>创建场景版本</button></div>
}

function MemoryDialog({ profile }) {
  return <div className="pp-modal"><button className="pp-modal-close" onClick={() => workspaceStore.setOverlay(null)}><X size={18} /></button><div className="pp-modal-heading"><span><MemoryStick /></span><div><small>G0 · LONG-TERM BRAND MEMORY</small><h2>你的品牌档案由你控制</h2></div></div><p>只保存确认过的核心档案、证据摘要、定位假设、阶段总结和发布记录；原始敏感材料默认留在本地证据库。</p><div className="pp-memory-status"><span className={profile.memory.paused ? 'is-paused' : ''} /><div><strong>{profile.memory.paused ? '长期记忆已暂停' : '长期记忆已启用'}</strong><small>{profile.memory.items} 条精简记忆 · 可查看、更正、撤销和硬删除</small></div></div><button className="pp-secondary pp-wide" onClick={() => workspaceStore.toggleMemory()}>{profile.memory.paused ? <><ArchiveRestore size={15} />恢复长期记忆</> : <><Pause size={15} />暂停长期记忆</>}</button></div>
}

function Overlay({ state, scenario }) {
  if (!state.overlay) return null
  return <div className="pp-modal-backdrop" role="dialog" aria-modal="true">
    {state.overlay.type === 'consent' && scenario && <ConsentDialog scenario={scenario} />}
    {state.overlay.type === 'scenario' && <ScenarioDialog />}
    {state.overlay.type === 'memory' && state.profile && <MemoryDialog profile={state.profile} />}
  </div>
}

function Notice({ text }) {
  if (!text) return null
  const denied = text.includes('拒绝') || text.includes('撤回') || text.includes('必须')
  return <div className={`pp-notice ${denied ? 'is-alert' : ''}`}>{denied ? <CircleAlert size={15} /> : <Check size={15} />}{text}</div>
}

function PersonaWorkspace() {
  const state = useWorkspace()
  const scenario = getActiveScenario(state)
  return <section className="pp-workspace">
    {state.profile && scenario ? <><WorkspaceHeader state={state} scenario={scenario} />{state.view === 'evidence' ? <EvidenceView scenario={scenario} /> : state.view === 'site' ? <SiteView scenario={scenario} /> : state.view === 'trace' ? <TraceView scenario={scenario} /> : <WorkbenchView state={state} scenario={scenario} />}</> : <EmptyWorkspace />}
    <Overlay state={state} scenario={scenario} />
    <Notice text={state.notice} />
  </section>
}

export const inject = ['slots']

export function apply(ctx) {
  ctx.effect(() => {
    const style = document.createElement('style')
    style.dataset.plugin = PLUGIN_ID
    style.textContent = styles
    document.head.appendChild(style)
    return () => style.remove()
  }, 'personaproof: visual system')
  ctx.effect(() => ctx.slots.register({ name: 'sidebar', priority: -100 }, Sidebar), 'personaproof: brand workspace sidebar')
  ctx.effect(() => ctx.slots.register({ name: 'conversation', priority: -100 }, PersonaWorkspace), 'personaproof: governed brand workspace')
}
