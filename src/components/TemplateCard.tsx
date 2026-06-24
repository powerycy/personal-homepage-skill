import { ArrowUpRight } from 'lucide-react';
import type { TemplateDefinition } from '../data/templates';
import { densityLabels, identityLabels } from '../data/templates';
import { PreviewCanvas } from './PreviewCanvas';

export function TemplateCard({ template, index }: { template: TemplateDefinition; index: number }) {
  const identities = template.identityFits.slice(0, 3).map((identity) => identityLabels[identity]);
  const densities = template.densityModes.slice(0, 2).map((density) => densityLabels[density]);

  return (
    <article
      data-testid="template-card"
      className="template-card flex h-full flex-col rounded-[32px] p-4 opacity-0 translate-y-7 animate-[card-enter_0.45s_cubic-bezier(0.22,1,0.36,1)_forwards]"
      style={{ animationDelay: `${index * 35}ms` }}
    >
      <PreviewCanvas visual={template.visual} />
      <div className="safe-bottom-space flex flex-1 flex-col px-1 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/42">{template.category}</p>
            <h2 className="balanced-title font-display-condensed text-2xl font-black leading-[1.02] tracking-[-0.035em] text-white">
              {template.name}
            </h2>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10" style={{ color: template.accent }}>
            <ArrowUpRight size={18} />
          </span>
        </div>
        <p className="readable-copy mt-4 min-h-[72px] text-sm text-white/68">{template.summary}</p>
        <div className="mt-3 rounded-2xl bg-black/22 px-3 py-2 text-xs leading-5 text-white/58">
          <div>适合：{template.bestFor}</div>
          <div className="mt-1 text-white/42">密度：{densities.join(' / ')}</div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {identities.map((identity) => (
            <span key={identity} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/62">
              {identity}
            </span>
          ))}
        </div>
        <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-white/45">风险：{template.risks[0]}</p>
      </div>
    </article>
  );
}
