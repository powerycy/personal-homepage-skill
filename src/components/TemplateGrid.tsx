import type { TemplateDefinition } from '../data/templates';
import { allTemplateNames } from '../data/templates';
import { TemplateCard } from './TemplateCard';

export function TemplateGrid({ templates }: { templates: TemplateDefinition[] }) {
  if (!templates.length) {
    return <p className="p-8 text-white/60">没有匹配的模板方向。</p>;
  }

  return (
    <section
      className="grid gap-5 p-5 pt-0 sm:p-7 sm:pt-0 lg:grid-cols-2 xl:grid-cols-3"
      data-template-count={templates.length}
      aria-label={allTemplateNames}
    >
      {templates.map((template, index) => (
        <TemplateCard key={template.id} template={template} index={index} />
      ))}
    </section>
  );
}
