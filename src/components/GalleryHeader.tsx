import { Sparkles } from 'lucide-react';
import { templates } from '../data/templates';

export function GalleryHeader() {
  return (
    <div className="relative isolate border-b border-white/10 px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_15%,rgba(255,255,255,0.13),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(115,66,226,0.28),transparent_24%)]" />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
            <Sparkles size={15} /> Personal Homepage Skill Library
          </div>
          <h1 className="balanced-title font-display-condensed text-[clamp(2.45rem,7vw,6.4rem)] font-black leading-[0.92] tracking-[-0.065em] text-white">
            Personal Homepage Skill Gallery
          </h1>
          <p className="readable-copy mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
            用真实首页首屏预览选择个人主页方向，并把中文字体、图片、留白、响应式和生成质量门禁写进 skill 工作流。
          </p>
        </div>

        <div className="grid min-w-[270px] gap-3 rounded-[28px] border border-white/12 bg-black/25 p-4 text-sm text-white/72">
          <div className="flex items-center justify-between">
            <span>Templates</span>
            <strong className="font-mono text-2xl text-white">{templates.length}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Quality gates</span>
            <strong className="font-mono text-2xl text-white">5</strong>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 text-xs leading-5">
            Reference first → real previews → CJK-safe generation → desktop/mobile visual QA.
          </div>
        </div>
      </div>
    </div>
  );
}
