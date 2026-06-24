import type { Category } from '../data/templates';
import { categoryFilters } from '../data/templates';

export function TemplateFilters({ selectedCategory, onSelect }: { selectedCategory: Category; onSelect: (category: Category) => void }) {
  return (
    <div className="flex flex-wrap gap-3 px-6 py-6 sm:px-10 lg:px-12" aria-label="Template category filters">
      {categoryFilters.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className="rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{
            borderColor: selectedCategory === category ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.14)',
            background: selectedCategory === category ? '#f8f4ec' : 'rgba(255,255,255,0.06)',
            color: selectedCategory === category ? '#101015' : 'rgba(255,255,255,0.72)',
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
