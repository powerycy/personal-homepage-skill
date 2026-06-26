import { ArrowUpRight } from 'lucide-react';
import type { VisualKey } from '../data/templates';
import { FOUR_ITEMS } from './previewData';

function CinematicPreview() {
  return (
    <div className="preview-shell bg-[#050507] font-cjk-sans text-[#f7f1e7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_34%,rgba(255,255,255,0.15),transparent_21%),linear-gradient(130deg,#050507,#181821_56%,#050507)]" />
      <div className="noise" />
      <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">AI Engineer</div>
      <div className="absolute left-5 top-[82px] max-w-[250px]">
        <div className="preview-title text-[32px] font-black leading-[0.96] tracking-[-0.045em]">把想法做成可运行的 Agent 产品</div>
        <p className="mt-3 max-w-[220px] text-[12px] leading-5 text-white/60">项目、系统能力与联系方式在一个连续叙事里展开。</p>
      </div>
      <div className="absolute bottom-5 left-5 flex gap-2 text-[10px] text-white/50"><span>Projects</span><span>/</span><span>Proof</span><span>/</span><span>Contact</span></div>
      <div className="absolute bottom-5 right-5 rounded-3xl border border-white/14 bg-white/10 p-4 backdrop-blur-xl">
        <div className="mb-8 h-1 w-20 rounded bg-white/50" />
        <ArrowUpRight size={22} />
      </div>
    </div>
  );
}

function CleanDeveloperPreview() {
  return (
    <div className="preview-shell overflow-hidden bg-[#edf7ff] font-cjk-sans text-[#17212f]">
      <div className="absolute -bottom-16 -left-14 h-44 w-[120%] -rotate-3 rounded-[50%] bg-[linear-gradient(90deg,#b7dcff,#f9fbff)]" />
      <div className="absolute inset-x-5 top-5 flex justify-between text-[10px] font-black text-[#17212f]/62">
        <span>xy.</span>
        <span>About Projects GitHub</span>
      </div>
      <div className="absolute left-7 top-[72px] rounded-full bg-white px-4 py-2 text-[11px] font-black shadow-[0_14px_30px_rgba(80,140,200,0.18)]">Hangzhou / Remote</div>
      <div className="absolute left-7 top-[122px] max-w-[260px] font-display-condensed text-[34px] font-black leading-[0.96] tracking-[-0.055em]">
        Hi, I am a <span className="text-[#3279ff]">frontend developer</span>.
      </div>
      <div className="absolute right-10 top-[78px] h-[138px] w-[138px] rounded-[42%_58%_45%_55%] border-2 border-[#3279ff]/18 bg-[linear-gradient(135deg,#fff,#d7ecff)] shadow-[0_24px_55px_rgba(80,140,200,0.2)]" />
      <div className="absolute bottom-8 right-8 rounded-full bg-white px-4 py-2 text-[11px] font-black text-[#3279ff]">Open GitHub</div>
    </div>
  );
}

function Tech3DPreview() {
  return (
    <div className="preview-shell bg-[#050d12] font-cjk-sans">
      <div className="noise" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,245,200,0.16),transparent_38%),radial-gradient(circle_at_80%_30%,rgba(34,245,200,0.25),transparent_22%)]" />
      <div className="absolute left-5 top-5 rounded-2xl border border-emerald-300/20 bg-black/35 p-4 font-mono text-[10px] leading-5 text-emerald-200/80">
        <div>$ whoami</div><div>AI · Frontend · Agent</div><div>status: shipping</div>
      </div>
      <div className="absolute right-8 top-12 h-32 w-32 rotate-12 rounded-3xl border border-emerald-200/30 bg-emerald-300/10 shadow-[0_0_50px_rgba(34,245,200,0.35)]" />
      <div className="absolute bottom-6 left-5 max-w-[255px]">
        <div className="preview-title text-[30px] font-bold leading-[0.98]">空间化展示真实项目</div>
        <p className="mt-2 text-[12px] leading-5 text-white/58">截图、技术栈与结果分层展示，不把证据缩成小图标。</p>
      </div>
    </div>
  );
}

function TerminalPreview() {
  return (
    <div className="preview-shell bg-[#020503] font-mono text-[#78ff9f]">
      <div className="absolute inset-4 rounded-2xl border border-green-300/20 bg-black/55 p-5">
        <div className="mb-4 flex gap-2"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-300" /><span className="h-2.5 w-2.5 rounded-full bg-green-300" /></div>
        <div className="space-y-2 text-[11px]"><p>&gt; whoami</p><p className="font-cjk-sans text-white">Agent 产品开发者</p><p>&gt; projects --active</p><p className="text-white/70">browser pilot · verifier · eval loop</p><p>&gt; contact <span className="animate-pulse">█</span></p></div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="preview-shell bg-[#07111f] font-mono">
      <div className="noise" />
      <div className="absolute left-5 top-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-[11px] text-cyan-100">INPUT → AGENT → OUTPUT</div>
      <div className="absolute left-1/2 top-[46%] grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/30 bg-cyan-300/10 text-xs font-bold text-cyan-100 shadow-[0_0_55px_rgba(85,215,255,0.35)]">YOU</div>
      <div className="absolute bottom-5 left-5 max-w-[250px] font-cjk-sans text-[12px] leading-5 text-white/62">把能力拆成输入、推理、产出和验证，适合 AI 系统型个人主页。</div>
      {FOUR_ITEMS.map((i) => <div key={i} className="absolute h-12 w-20 rounded-xl border border-cyan-200/20 bg-white/5" style={{ left: `${18 + i * 17}%`, bottom: i % 2 ? 74 : 104 }} />)}
    </div>
  );
}

function SpatialPreview() {
  return (
    <div className="preview-shell bg-[#090812] font-cjk-sans" style={{ perspective: 700 }}>
      <div className="absolute left-6 top-6 max-w-[210px]">
        <div className="preview-title text-[30px] font-black leading-[0.98]">项目很多，也要有主次</div>
        <p className="mt-3 text-[12px] leading-5 text-white/58">精选 4–6 个项目进入首屏，其余放到二级区域。</p>
      </div>
      {FOUR_ITEMS.map((i) => (
        <div key={i} className="absolute h-28 w-36 rounded-3xl border border-violet-200/20 bg-violet-300/15 shadow-2xl" style={{ right: `${18 + i * 8}px`, bottom: `${28 + i * 26}px`, transform: `rotateY(${-28 + i * 8}deg) rotateZ(${-8 + i * 4}deg)` }} />
      ))}
    </div>
  );
}

export const TechPreviews: Pick<Record<VisualKey, () => JSX.Element>, 'cinematic' | 'clean' | 'tech3d' | 'terminal' | 'dashboard' | 'spatial'> = {
  cinematic: CinematicPreview,
  clean: CleanDeveloperPreview,
  tech3d: Tech3DPreview,
  terminal: TerminalPreview,
  dashboard: DashboardPreview,
  spatial: SpatialPreview,
};
