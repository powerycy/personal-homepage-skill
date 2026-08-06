import { useEffect, useMemo, useState } from 'react';
import { ArrowDownToLine, BookOpen, Check, ChevronLeft, ChevronRight, Github, Monitor, PencilLine, RotateCcw, Smartphone } from 'lucide-react';
import { HomepagePreview } from './components/HomepagePreview';
import { Field, TextAreaField } from './components/StudioFields';
import { defaultProfile, stylePresets, type Profile, type StyleId } from './data/studio';
import { downloadHomepage } from './utils/exportHomepage';

const STORAGE_KEY = 'ai-homepage-studio:draft-v1';

type Step = 'profile' | 'style' | 'preview';

const steps: { id: Step; label: string; number: string }[] = [
  { id: 'profile', label: '写入真实资料', number: '01' },
  { id: 'style', label: '选择表达方式', number: '02' },
  { id: 'preview', label: '编辑并导出', number: '03' },
];

function App() {
  const [profile, setProfile] = useState<Profile>(() => {
    try {
      const draft = localStorage.getItem(STORAGE_KEY);
      return draft ? { ...defaultProfile, ...JSON.parse(draft) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });
  const [styleId, setStyleId] = useState<StyleId>('signal');
  const [step, setStep] = useState<Step>('profile');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const style = useMemo(() => stylePresets.find((item) => item.id === styleId) ?? stylePresets[0], [styleId]);
  const activeIndex = steps.findIndex((item) => item.id === step);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSaved(true);
    const timer = window.setTimeout(() => setSaved(false), 900);
    return () => window.clearTimeout(timer);
  }, [profile]);

  const update = <K extends keyof Profile>(key: K, value: Profile[K]) => setProfile((current) => ({ ...current, [key]: value }));
  const updateProject = (key: keyof Profile['project'], value: string) =>
    setProfile((current) => ({ ...current, project: { ...current.project, [key]: value } }));

  const next = () => setStep(steps[Math.min(activeIndex + 1, steps.length - 1)].id);
  const previous = () => setStep(steps[Math.max(activeIndex - 1, 0)].id);

  return (
    <main className="studio-app">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="AI Personal Homepage Studio 首页">
          <span className="brand-mark" aria-hidden="true">H/</span>
          <span><strong>Homepage Studio</strong><small>把真实经历变成可发布的网站</small></span>
        </a>
        <nav aria-label="辅助导航">
          <a href="guide.html"><BookOpen size={17} /> 使用手册</a>
          <a href="https://github.com/powerycy/personal-homepage-skill" target="_blank" rel="noreferrer"><Github size={17} /> 源码</a>
        </nav>
      </header>

      <section className="studio-intro" id="top">
        <div>
          <p className="kicker">AI PERSONAL HOMEPAGE STUDIO · BROWSER ONLY</p>
          <h1>先讲清楚你是谁，<br /><em>再谈页面有多酷。</em></h1>
        </div>
        <p className="intro-copy">资料只留在当前浏览器。没有登录、没有上传、没有“自动编造亮点”。完成三步，就能下载一个可继续编辑的独立 HTML。</p>
      </section>

      <div className="studio-grid">
        <aside className="control-panel" aria-label="主页生成控制区">
          <div className="step-tabs" role="tablist" aria-label="生成步骤">
            {steps.map((item) => (
              <button key={item.id} className={step === item.id ? 'active' : ''} onClick={() => setStep(item.id)} role="tab" aria-selected={step === item.id}>
                <span>{item.number}</span>{item.label}
              </button>
            ))}
          </div>

          <div className="panel-content">
            {step === 'profile' && (
              <section className="form-section" aria-labelledby="profile-heading">
                <div className="section-heading"><span>01</span><div><h2 id="profile-heading">写入真实资料</h2><p>示例内容仅帮助理解结构，请替换后再发布。</p></div></div>
                <div className="field-grid two">
                  <Field label="姓名 / 昵称" value={profile.name} onChange={(value) => update('name', value)} />
                  <Field label="身份" value={profile.role} onChange={(value) => update('role', value)} />
                </div>
                <Field label="一句话定位" value={profile.tagline} onChange={(value) => update('tagline', value)} />
                <TextAreaField label="个人简介" value={profile.bio} onChange={(value) => update('bio', value)} hint="写当前方向、过去经验和工作方式，不写空泛自夸。" />
                <div className="field-grid two">
                  <Field label="所在地" value={profile.location} onChange={(value) => update('location', value)} />
                  <Field label="联系邮箱" type="email" value={profile.email} onChange={(value) => update('email', value)} />
                </div>
                <div className="form-divider"><span>项目证据</span><small>不填指标，也能把问题、角色和产出讲清楚</small></div>
                <Field label="项目名称" value={profile.project.name} onChange={(value) => updateProject('name', value)} />
                <TextAreaField label="解决的问题" value={profile.project.problem} onChange={(value) => updateProject('problem', value)} />
                <div className="field-grid two">
                  <Field label="你的角色" value={profile.project.role} onChange={(value) => updateProject('role', value)} />
                  <Field label="技术 / 方法" value={profile.project.stack} onChange={(value) => updateProject('stack', value)} />
                </div>
                <TextAreaField label="核心功能" value={profile.project.features} onChange={(value) => updateProject('features', value)} hint="用顿号或逗号分隔。" />
                <Field label="真实结果或当前状态" value={profile.project.result} onChange={(value) => updateProject('result', value)} />
                <Field label="项目链接（可选）" type="url" value={profile.project.link} onChange={(value) => updateProject('link', value)} />
              </section>
            )}

            {step === 'style' && (
              <section className="form-section" aria-labelledby="style-heading">
                <div className="section-heading"><span>02</span><div><h2 id="style-heading">选择表达方式</h2><p>同一份资料切换风格，信息不会丢。</p></div></div>
                <div className="style-list">
                  {stylePresets.map((preset) => (
                    <button key={preset.id} className={`style-option ${styleId === preset.id ? 'selected' : ''}`} onClick={() => setStyleId(preset.id)} style={{ '--swatch': preset.accent } as React.CSSProperties}>
                      <span className="style-swatch" aria-hidden="true"><i /><i /><i /></span>
                      <span><strong>{preset.name}</strong><small>{preset.description}</small><em>{preset.bestFor}</em></span>
                      <span className="check">{styleId === preset.id && <Check size={16} />}</span>
                    </button>
                  ))}
                </div>
                <div className="style-note"><strong>当前方向：{style.name}</strong><p>{style.rationale}</p></div>
              </section>
            )}

            {step === 'preview' && (
              <section className="form-section" aria-labelledby="preview-heading">
                <div className="section-heading"><span>03</span><div><h2 id="preview-heading">编辑并导出</h2><p>开启在线编辑后，直接点击预览里的文字。</p></div></div>
                <button className={`action-card ${editMode ? 'active' : ''}`} onClick={() => setEditMode((value) => !value)}>
                  <PencilLine size={21} /><span><strong>{editMode ? '结束在线编辑' : '开启在线编辑'}</strong><small>所有可编辑文字都有稳定字段 ID</small></span>
                </button>
                <button className="action-card primary" onClick={() => downloadHomepage(profile, styleId)}>
                  <ArrowDownToLine size={21} /><span><strong>导出独立 HTML</strong><small>离线可打开、可编辑、可再次导出</small></span>
                </button>
                <div className="export-checks">
                  <p><Check size={15} /> 中文字体与移动端布局</p>
                  <p><Check size={15} /> 键盘焦点与减少动效</p>
                  <p><Check size={15} /> 不依赖项目源码运行</p>
                  <p><Check size={15} /> 不生成评价与虚假数字</p>
                </div>
              </section>
            )}
          </div>

          <footer className="panel-footer">
            <button className="ghost-button" onClick={() => { setProfile(defaultProfile); localStorage.removeItem(STORAGE_KEY); }}><RotateCcw size={15} /> 恢复示例</button>
            <span className={`save-state ${saved ? 'show' : ''}`}><Check size={14} /> 已存浏览器</span>
            <div className="step-actions">
              <button onClick={previous} disabled={activeIndex === 0} aria-label="上一步"><ChevronLeft size={19} /></button>
              <button className="next-button" onClick={next} disabled={activeIndex === steps.length - 1}>{activeIndex === steps.length - 1 ? '完成' : '下一步'}<ChevronRight size={18} /></button>
            </div>
          </footer>
        </aside>

        <section className="preview-panel" aria-label="个人主页实时预览">
          <div className="preview-toolbar">
            <div><span className="live-dot" /> 实时预览 <small>{style.name}</small></div>
            <div className="device-toggle" aria-label="预览设备">
              <button className={device === 'desktop' ? 'active' : ''} onClick={() => setDevice('desktop')} aria-label="桌面预览"><Monitor size={17} /></button>
              <button className={device === 'mobile' ? 'active' : ''} onClick={() => setDevice('mobile')} aria-label="移动端预览"><Smartphone size={17} /></button>
            </div>
          </div>
          <div className={`preview-stage ${device}`}>
            <HomepagePreview profile={profile} styleId={styleId} editMode={editMode} onProfileChange={setProfile} />
          </div>
          <p className="preview-caption">这里不是效果图：切换风格、修改资料、在线编辑和导出都真实可用。</p>
        </section>
      </div>
    </main>
  );
}

export default App;
