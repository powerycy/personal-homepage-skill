import { Boxes, Palette, Sparkles } from 'lucide-react';
import type { VisualKey } from '../data/templates';
import { PIXEL_ITEMS } from './previewData';

function SoftProductPreview() {
  return (
    <div className="preview-shell bg-[#cfc8c5] font-cjk-sans text-[#192837]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_65%,rgba(255,255,255,0.58),transparent_28%),linear-gradient(135deg,#d7d0ca,#aab3b3)]" />
      <div className="absolute left-5 top-5 flex items-center gap-4 text-xs font-bold">
        <Boxes size={22} />
        <span>作品</span><span>工具</span><span>联系</span>
      </div>
      <div className="absolute right-5 top-4 rounded-full bg-[#7342E2] px-4 py-2 text-xs font-bold text-white">预约交流</div>
      <div className="absolute left-1/2 top-[53%] w-[78%] -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="preview-title text-[32px] font-black leading-[1.02] tracking-[-0.045em]">把个人工具做成清楚入口 <Sparkles className="inline" size={20} /></div>
        <p className="mx-auto mt-4 max-w-[270px] text-xs leading-5 opacity-70">产品截图要足够大；没有视频时用设备框占位。</p>
      </div>
    </div>
  );
}

function OrbisNftPreview() {
  return (
    <div className="preview-shell overflow-hidden bg-[#010828] font-cjk-sans text-[#EFF4FF]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_28%,rgba(72,104,210,0.55),transparent_34%),radial-gradient(circle_at_78%_20%,rgba(111,255,0,0.12),transparent_24%),linear-gradient(145deg,#010828,#06165a_58%,#010828)]" />
      <div className="noise opacity-25 mix-blend-lighten" />
      <div className="absolute left-5 top-5 font-display-condensed text-[22px] uppercase tracking-[0.08em]">Orbis.Nft</div>
      <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full border border-white/18 bg-white/[0.04] px-7 py-3 text-[9px] font-black uppercase tracking-[0.22em] backdrop-blur-md">Home Gallery Buy NFT</div>
      <div className="absolute right-5 top-5 grid gap-2">
        {[0, 1].map((item) => <div key={item} className="h-9 w-9 rounded-2xl border border-white/18 bg-white/[0.05] backdrop-blur-md" />)}
      </div>
      <div className="absolute left-6 top-[86px] max-w-[265px]">
        <div className="font-display-condensed text-[38px] uppercase leading-[0.92] tracking-[0.01em]">Beyond earth<br />and ( its )<br />boundaries</div>
      </div>
      <div className="absolute left-[48%] top-[103px] rotate-[-3deg] font-display-script text-[31px] text-[#6FFF00] opacity-95 mix-blend-screen">Nft collection</div>
      <div className="absolute bottom-5 left-6 font-mono text-[10px] uppercase tracking-[0.15em] text-white/48">Rarity score: 8.7 / 9.0 / 8.2</div>
      <div className="absolute bottom-10 right-6 flex items-end gap-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className={`${item === 1 ? 'h-32 w-24' : 'h-24 w-20'} rounded-[24px] border border-white/18 bg-white/[0.045] p-2 backdrop-blur-md`}>
            <div className="h-full rounded-[18px] bg-[radial-gradient(circle_at_50%_45%,rgba(111,255,0,0.32),transparent_40%),#10266c]" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-6 h-1.5 w-28 rounded-full bg-[#6FFF00]" />
    </div>
  );
}

function ToonhubPreview() {
  return (
    <div className="preview-shell overflow-hidden bg-[#F4845F] font-cjk-sans text-[#111]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.42),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.16),transparent_60%,rgba(0,0,0,0.14))]" />
      <div className="noise opacity-20" />
      <div className="absolute left-5 top-4 font-display-condensed text-3xl font-black leading-none tracking-[-0.04em]">TOONHUB</div>
      <div className="absolute left-1/2 top-[44%] h-40 w-28 -translate-x-1/2 -translate-y-1/2 rounded-[44px] bg-[linear-gradient(180deg,#fff7e9,#f06b4f)] shadow-[0_26px_42px_rgba(0,0,0,0.22)]" />
      <div className="absolute left-[18%] top-[40%] h-28 w-20 -translate-y-1/2 -rotate-6 rounded-[36px] bg-[#6BBF7A] opacity-70 blur-[1px]" />
      <div className="absolute right-[18%] top-[40%] h-28 w-20 -translate-y-1/2 rotate-6 rounded-[36px] bg-[#E882B4] opacity-70 blur-[1px]" />
      <div className="absolute bottom-5 left-5 max-w-[235px]">
        <div className="preview-title font-display-condensed text-[32px] font-black leading-[0.9] tracking-[-0.04em]">角色作品集入口</div>
        <p className="mt-2 text-[11px] font-semibold leading-4 text-black/62">有角色图就放大展示；没有图就明确使用形状占位。</p>
      </div>
      <div className="absolute bottom-5 right-5 rounded-full bg-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white">Works</div>
    </div>
  );
}

function GradientPreview() {
  return (
    <div className="preview-shell bg-[#180f2c] font-cjk-sans">
      <div className="absolute -left-16 top-2 h-48 w-48 rounded-full bg-[#ff7ac8] blur-2xl" />
      <div className="absolute right-0 top-6 h-44 w-44 rounded-full bg-[#5cf4ff] blur-2xl" />
      <div className="absolute bottom-0 left-24 h-36 w-52 rounded-full bg-[#ffe15a] blur-2xl" />
      <div className="absolute left-6 top-7 rounded-full bg-white/15 px-4 py-2 text-xs font-bold">Creator Lab</div>
      <div className="absolute bottom-7 left-6 max-w-[270px] preview-title text-[34px] font-black leading-[0.94] tracking-[-0.045em]">内容、产品和想法都要有记忆点</div>
      <div className="absolute right-6 bottom-7 rounded-3xl bg-white/18 p-4 backdrop-blur-xl"><Palette /></div>
    </div>
  );
}

function PixelPreview() {
  return (
    <div className="preview-shell bg-[#ffe9ef] font-cjk-sans text-[#322231]">
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#f8bdd0 1px, transparent 1px), linear-gradient(90deg, #f8bdd0 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
      <div className="absolute left-7 top-7 grid h-20 w-20 grid-cols-4 gap-1">
        {PIXEL_ITEMS.map((i) => <span key={i} className="bg-[#ff8fb4]" style={{ opacity: i % 3 === 0 ? 1 : 0.45 }} />)}
      </div>
      <div className="absolute bottom-7 left-7 max-w-[240px] preview-title text-3xl font-bold leading-[0.98]">轻快创作者任务板</div>
      <div className="absolute right-7 top-7 rounded-2xl border-4 border-[#322231] bg-[#fff7b7] px-4 py-3 text-xs font-black">Quest!</div>
    </div>
  );
}

function BentoPreview() {
  return (
    <div className="preview-shell bg-[#15110a] font-cjk-sans">
      <div className="absolute inset-4 grid grid-cols-4 grid-rows-3 gap-3">
        <div className="col-span-2 row-span-2 rounded-3xl bg-[#ffe15a] p-4 text-2xl font-black leading-none text-black">创作者<br />入口</div>
        <div className="col-span-2 rounded-3xl bg-white/12 p-4 text-sm">小红书 / 视频号</div>
        <div className="rounded-3xl bg-[#ff7ac8]" />
        <div className="rounded-3xl bg-[#5cf4ff]" />
        <div className="col-span-2 rounded-3xl bg-white/12 p-4 text-sm">精选内容</div>
      </div>
    </div>
  );
}

export const CreatorPreviews: Pick<Record<VisualKey, () => JSX.Element>, 'softProduct' | 'orbisNft' | 'toonhub' | 'gradient' | 'pixel' | 'bento'> = {
  softProduct: SoftProductPreview,
  orbisNft: OrbisNftPreview,
  toonhub: ToonhubPreview,
  gradient: GradientPreview,
  pixel: PixelPreview,
  bento: BentoPreview,
};
