import type { VisualKey } from '../data/templates';
import { CASE_STEPS, THREE_ITEMS } from './previewData';

function ResumePreview() {
  return (
    <div className="preview-shell bg-[#f8f5ed] font-cjk-sans text-[#171717]">
      <div className="absolute left-7 top-7 max-w-[240px] preview-title font-display-editorial text-[34px] font-extrabold leading-[0.98] tracking-[-0.04em]">清晰可信的求职主页</div>
      <div className="absolute right-6 top-7 rounded-full border border-black/15 px-4 py-2 text-xs font-bold">下载简历</div>
      <p className="absolute left-7 top-[118px] max-w-[235px] text-[12px] leading-5 text-black/55">用项目、技能和联系方式证明适配度，不堆满长段文字。</p>
      <div className="absolute bottom-6 left-7 right-7 grid grid-cols-3 gap-3">
        {THREE_ITEMS.map((item) => <div key={item} className="h-16 rounded-2xl border border-black/10 bg-white/70" />)}
      </div>
    </div>
  );
}

function BusinessPreview() {
  return (
    <div className="preview-shell bg-[#f5efe3] font-cjk-sans text-[#0f2f54]">
      <div className="absolute left-7 top-7 max-w-[250px] preview-title font-display-editorial text-[33px] font-extrabold leading-[0.98] tracking-[-0.04em]">让客户一眼知道你能解决什么</div>
      <p className="absolute left-7 top-[136px] max-w-[235px] text-[12px] leading-5 text-[#0f2f54]/62">服务对象、证明和预约入口分开，不让右侧信息压过主标题。</p>
      <div className="absolute bottom-6 left-7 rounded-full bg-[#0f2f54] px-5 py-3 text-xs font-bold text-white">预约交流</div>
      <div className="absolute bottom-6 right-7 grid gap-2">
        {THREE_ITEMS.map((item) => <div key={item} className="h-10 w-28 rounded-2xl border border-[#0f2f54]/15 bg-white/65" />)}
      </div>
    </div>
  );
}

function CaseStudyPreview() {
  return (
    <div className="preview-shell bg-[#111111] font-cjk-sans text-white">
      <div className="absolute left-6 top-6 max-w-[250px] preview-title text-[30px] font-black leading-[1]">用案例讲清真实能力</div>
      <p className="absolute left-6 top-[100px] max-w-[245px] text-[12px] leading-5 text-white/58">高密度内容也要拆成问题、角色、结果，而不是一整段塞满首屏。</p>
      <div className="absolute bottom-6 left-6 right-6 grid gap-3">
        {CASE_STEPS.map((label, i) => <div key={label} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-xs"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#ff6a3d] font-bold">{i + 1}</span>{label}</div>)}
      </div>
    </div>
  );
}

export const BusinessPreviews: Pick<Record<VisualKey, () => JSX.Element>, 'resume' | 'business' | 'caseStudy'> = {
  resume: ResumePreview,
  business: BusinessPreview,
  caseStudy: CaseStudyPreview,
};
