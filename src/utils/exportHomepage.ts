import { splitFeatures, stylePresets, type Profile, type StyleId } from '../data/studio';

const escapeHtml = (value: string) => value
  .split('&').join('&amp;')
  .split('<').join('&lt;')
  .split('>').join('&gt;')
  .split('"').join('&quot;')
  .split("'").join('&#039;');

const safeUrl = (value: string) => {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? escapeHtml(url.href) : '#';
  } catch {
    return '#';
  }
};

const themes: Record<StyleId, string> = {
  signal: '--bg:#0b0d0c;--ink:#f4f3ec;--muted:#a9aca7;--accent:#d9ff43;--paper:#151916;--line:#343a35;--display:"Arial Black","Noto Sans SC",sans-serif;--body:"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;',
  editorial: '--bg:#f1eadc;--ink:#1b1712;--muted:#6e6459;--accent:#ff4f2e;--paper:#e2d6c3;--line:#b6aa98;--display:"Noto Serif SC","Songti SC",serif;--body:"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;',
  sunlit: '--bg:#f6c945;--ink:#15120e;--muted:#5f4f27;--accent:#175cff;--paper:#ffe991;--line:#8f7428;--display:"Arial Black","Noto Sans SC",sans-serif;--body:"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;',
  paper: '--bg:#f7f5f0;--ink:#151515;--muted:#666;--accent:#d62f2f;--paper:#fff;--line:#b9b6af;--display:"Noto Serif SC","Songti SC",serif;--body:"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;',
};

export function generateHomepageHtml(profile: Profile, styleId: StyleId) {
  const style = stylePresets.find((item) => item.id === styleId) ?? stylePresets[0];
  const e = escapeHtml;
  const initials = e(profile.name.replace(/\s/g, '').slice(0, 2) || 'ME');
  const features = splitFeatures(profile.project.features);
  const version = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const projectUrl = safeUrl(profile.project.link);
  const projectLink = profile.project.link ? `<a class="project-link" href="${projectUrl}" target="_blank" rel="noreferrer">打开项目 ↗</a>` : '';

  return `<!doctype html>
<html lang="zh-CN" data-edit-version="${version}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${e(profile.tagline)}" />
  <title>${e(profile.name)} — ${e(profile.role)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@600;900&display=swap');
    :root{${themes[styleId]}}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--body);overflow-x:hidden}a{color:inherit}button,a{outline-offset:4px}button:focus-visible,a:focus-visible{outline:3px solid var(--accent)}
    .page{width:min(100%,1440px);margin:auto}.nav{display:flex;justify-content:space-between;align-items:center;padding:24px clamp(20px,5vw,72px);border-bottom:1px solid var(--line);font-size:12px;letter-spacing:.12em}.nav strong{font:900 28px/1 var(--display)}.nav strong i,.label,.project-story small{color:var(--accent)}
    .hero{min-height:82vh;position:relative;display:grid;align-items:end;padding:clamp(90px,12vw,170px) clamp(20px,5vw,72px) 48px;border-bottom:1px solid var(--line);overflow:hidden}.hero-copy{position:relative;z-index:2;max-width:1050px}.hero-role,.label{font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}.hero h1{margin:18px 0 8px;font:900 clamp(68px,13vw,190px)/.84 var(--display);letter-spacing:-.07em}.hero h2{max-width:820px;margin:28px 0 34px;font:700 clamp(24px,4vw,54px)/1.08 var(--display);letter-spacing:-.04em}.actions{display:flex;gap:10px;flex-wrap:wrap}.actions a,.project-link{display:inline-flex;align-items:center;gap:10px;padding:13px 18px;border:1px solid var(--ink);text-decoration:none;font-weight:800}.actions a:first-child{background:var(--accent);color:#111;border-color:var(--accent)}.orbit{position:absolute;right:-7vw;top:4vh;width:clamp(260px,39vw,560px);aspect-ratio:1;border:1px solid var(--line);border-radius:50%;display:grid;place-items:center;opacity:.9}.orbit:before,.orbit:after{content:"";position:absolute;border:1px solid var(--line);border-radius:50%;inset:12%}.orbit:after{inset:28%}.orbit span{font:900 clamp(80px,12vw,180px)/1 var(--display);color:var(--accent)}
    .about{display:grid;grid-template-columns:160px 1fr;gap:48px;padding:clamp(70px,10vw,140px) clamp(20px,5vw,72px);border-bottom:1px solid var(--line)}.about-copy{max-width:950px;margin:0;font:600 clamp(27px,4.4vw,62px)/1.22 var(--display);letter-spacing:-.035em}.meta{grid-column:2;display:flex;gap:20px;flex-wrap:wrap;color:var(--muted);font-size:14px}
    .project{padding:clamp(70px,9vw,130px) clamp(20px,5vw,72px)}.project-heading{display:grid;grid-template-columns:160px 1fr;gap:48px;align-items:start}.project-heading h2{margin:0;font:900 clamp(48px,8vw,110px)/.92 var(--display);letter-spacing:-.055em}.project-layout{display:grid;grid-template-columns:minmax(260px,.8fr) 1.2fr;gap:clamp(32px,6vw,90px);margin-top:70px}.poster{min-height:470px;background:var(--accent);color:#111;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}.poster span{font:900 clamp(150px,25vw,340px)/1 var(--display)}.poster i{position:absolute;left:18px;bottom:18px;font:700 12px/1 var(--body);letter-spacing:.16em}.project-story{display:grid;gap:28px}.project-story>div{padding-bottom:24px;border-bottom:1px solid var(--line)}.project-story small{font-weight:900;letter-spacing:.15em}.project-story p{margin:10px 0 0;font-size:18px;line-height:1.75}.features{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.features span{padding:13px;background:var(--paper);font-size:14px}.stack{color:var(--muted)}
    .footer{margin-top:50px;padding:clamp(70px,10vw,130px) clamp(20px,5vw,72px) 36px;background:var(--ink);color:var(--bg)}.footer h2{max-width:900px;margin:0 0 44px;font:900 clamp(45px,8vw,105px)/.95 var(--display);letter-spacing:-.05em}.footer>a{font-size:clamp(18px,3vw,34px);font-weight:800}.footer p{margin-top:80px;color:color-mix(in srgb,var(--bg) 60%,transparent);font-size:11px;letter-spacing:.1em;text-transform:uppercase}
    [contenteditable="true"]{outline:2px dashed var(--accent);outline-offset:5px;cursor:text}.edit-hotzone{position:fixed;z-index:1000;left:0;top:0;width:110px;height:70px}.edit-controls{position:fixed;z-index:1001;left:14px;top:14px;display:flex;gap:7px;opacity:0;transform:translateY(-8px);transition:.2s}.edit-hotzone:hover+.edit-controls,.edit-controls:hover,.edit-controls:focus-within{opacity:1;transform:none}.edit-controls button{border:1px solid #444;background:#111;color:#fff;border-radius:999px;padding:9px 13px;font:700 12px/1 var(--body);cursor:pointer}.edit-controls button.primary{background:var(--accent);color:#111;border-color:var(--accent)}
    @media(max-width:720px){.nav span{display:none}.hero{min-height:720px}.orbit{right:-120px;top:70px}.hero-copy{padding-top:200px}.about,.project-heading{grid-template-columns:1fr;gap:24px}.meta{grid-column:1}.project-layout{grid-template-columns:1fr}.poster{min-height:330px}.features{grid-template-columns:1fr}.footer p{margin-top:50px}}
    @media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
    @media print{.edit-hotzone,.edit-controls{display:none!important}}
  </style>
</head>
<body>
  <div class="edit-hotzone" aria-hidden="true"></div>
  <div class="edit-controls" aria-label="页面编辑工具"><button id="edit-toggle">编辑</button><button id="export-button" class="primary">导出 HTML</button></div>
  <main class="page">
    <nav class="nav"><strong>${initials}<i>.</i></strong><span>ABOUT / WORK / CONTACT</span></nav>
    <section class="hero">
      <div class="orbit" aria-hidden="true"><span>${initials}</span></div>
      <div class="hero-copy"><p class="hero-role" data-edit-id="hero-role">${e(profile.role)}</p><h1 data-edit-id="hero-name">${e(profile.name)}</h1><h2 data-edit-id="hero-tagline">${e(profile.tagline)}</h2><div class="actions"><a href="#project">看项目 ↓</a><a href="mailto:${e(profile.email)}">联系我 ↗</a></div></div>
    </section>
    <section class="about"><p class="label">01 / ABOUT</p><p class="about-copy" data-edit-id="about-bio">${e(profile.bio)}</p><div class="meta"><span data-edit-id="about-location">⌖ ${e(profile.location)}</span><span data-edit-id="about-email">✉ ${e(profile.email)}</span></div></section>
    <section class="project" id="project"><div class="project-heading"><p class="label">02 / SELECTED WORK</p><h2 data-edit-id="project-name">${e(profile.project.name)}</h2></div><div class="project-layout"><div class="poster" aria-hidden="true"><span>${e(profile.project.name.slice(0,1) || 'P')}</span><i>CASE / 01</i></div><div class="project-story"><div><small>PROBLEM</small><p data-edit-id="project-problem">${e(profile.project.problem)}</p></div><div><small>MY ROLE</small><p data-edit-id="project-role">${e(profile.project.role)}</p></div><div><small>OUTPUT</small><p data-edit-id="project-result">${e(profile.project.result)}</p></div><div class="features">${features.map((feature, index) => `<span>${String(index + 1).padStart(2, '0')} ${e(feature)}</span>`).join('')}</div><p class="stack" data-edit-id="project-stack">${e(profile.project.stack)}</p>${projectLink}</div></div></section>
    <footer class="footer"><h2 data-edit-id="footer-cta">有具体问题，欢迎直接来聊。</h2><a href="mailto:${e(profile.email)}">${e(profile.email)} ↗</a><p>Made from real information. No invented metrics. · ${e(style.name)}</p></footer>
  </main>
  <script>
  (()=>{const root=document.documentElement;const base='homepage-studio-edits:'+location.pathname;const key=base+':'+root.dataset.editVersion;let editing=false;const nodes=()=>[...document.querySelectorAll('[data-edit-id]')];const load=()=>{let saved={};try{saved=JSON.parse(localStorage.getItem(key)||localStorage.getItem(base)||'{}')}catch{}nodes().forEach(n=>{if(saved[n.dataset.editId]!=null)n.innerHTML=saved[n.dataset.editId]})};const save=()=>{const data={};nodes().forEach(n=>data[n.dataset.editId]=n.innerHTML);localStorage.setItem(key,JSON.stringify(data));return data};const toggle=()=>{editing=!editing;nodes().forEach(n=>n.contentEditable=String(editing));document.getElementById('edit-toggle').textContent=editing?'保存':'编辑';if(!editing)save()};const exportHtml=()=>{save();const clone=document.documentElement.cloneNode(true);clone.dataset.editVersion=Date.now()+'-'+Math.random().toString(36).slice(2,8);clone.querySelectorAll('[data-edit-id]').forEach(n=>n.contentEditable='false');const blob=new Blob(['<!doctype html>\\n'+clone.outerHTML],{type:'text/html;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='${e(profile.name).replace(/[^a-zA-Z0-9\u4e00-\u9fa5-]/g,'-') || 'homepage'}.html';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};document.getElementById('edit-toggle').addEventListener('click',toggle);document.getElementById('export-button').addEventListener('click',exportHtml);document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='s'){e.preventDefault();save()}else if(e.key.toLowerCase()==='e'&&!e.target.closest('[contenteditable="true"]'))toggle()});load()})();
  </script>
</body>
</html>`;
}

export function downloadHomepage(profile: Profile, styleId: StyleId) {
  const html = generateHomepageHtml(profile, styleId);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${profile.name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5-]/g, '-') || 'homepage'}.html`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}
