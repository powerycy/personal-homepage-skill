import { Camera, GalleryHorizontalEnd, Grid3X3 } from 'lucide-react';
import type { VisualKey } from '../data/templates';
import { MUSEUM_COLORS } from './previewData';

function MagazinePreview() {
  return (
    <div className="preview-shell bg-[#f4eadb] font-cjk-serif text-[#201610]">
      <div className="absolute inset-x-5 top-5 flex justify-between border-b border-black/20 pb-2 font-mono text-[10px] uppercase tracking-[0.2em]"><span>Issue 01</span><span>Portfolio</span></div>
      <div className="absolute left-6 top-16 max-w-[235px] preview-title font-display-editorial text-[44px] leading-[0.86] tracking-[-0.045em]">作品像杂志封面一样被看见</div>
      <div className="absolute bottom-5 right-5 h-36 w-32 rounded-t-full bg-[linear-gradient(160deg,#d85135,#f2b08b)]" />
      <div className="absolute bottom-6 left-6 max-w-[175px] text-xs leading-5 text-black/58">图像、标题和目录共同组织视觉叙事。</div>
    </div>
  );
}

function DarkEditorialPreview() {
  return (
    <div className="preview-shell bg-[#080706] font-cjk-serif">
      <div className="absolute left-6 top-6 max-w-[240px] preview-title font-display-editorial text-[45px] font-bold leading-[0.86] text-[#efe4cf]">暗场作品集需要留白</div>
      <div className="absolute bottom-5 right-5 flex gap-3">
        <div className="h-36 w-20 rounded-full bg-[#d7b46a]" />
        <div className="h-36 w-24 rounded-t-[48px] bg-[#46382a]" />
        <div className="h-36 w-16 rounded-full bg-[#efe4cf]" />
      </div>
      <div className="absolute bottom-7 left-7 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d7b46a]">Gallery / 2026</div>
    </div>
  );
}

function MuseumPreview() {
  return (
    <div className="preview-shell bg-[var(--museum-paper)] font-cjk-serif text-[#211b16]">
      <div className="absolute inset-x-5 top-4 flex items-center justify-between border-b border-black/10 pb-3 text-[10px] font-bold uppercase tracking-[0.2em]">
        <span className="flex items-center gap-2"><Camera size={14} /> Personal Museum</span>
        <span>Explore</span>
      </div>
      <div className="absolute left-6 top-16 max-w-[230px]">
        <div className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs text-black/55">想先看哪组作品？</div>
        <h3 className="preview-title mt-5 font-display-editorial text-[40px] font-bold leading-[0.88] tracking-[-0.035em]">把作品整理成一座小型美术馆</h3>
      </div>
      <div className="absolute right-5 top-16 grid w-[130px] grid-cols-2 gap-2">
        {MUSEUM_COLORS.map((color, i) => <div key={color} className="rounded-2xl" style={{ height: i % 2 ? 66 : 92, background: color }} />)}
      </div>
      <div className="absolute bottom-5 left-6 flex gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
        <span className="flex items-center gap-1"><GalleryHorizontalEnd size={13} /> Collection</span>
        <span className="flex items-center gap-1"><Grid3X3 size={13} /> Wall</span>
      </div>
    </div>
  );
}

export const ArtPreviews: Pick<Record<VisualKey, () => JSX.Element>, 'magazine' | 'darkEditorial' | 'museum'> = {
  magazine: MagazinePreview,
  darkEditorial: DarkEditorialPreview,
  museum: MuseumPreview,
};
