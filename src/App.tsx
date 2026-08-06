import { useMemo, useState } from 'react';
import { GalleryHeader } from './components/GalleryHeader';
import { TemplateFilters } from './components/TemplateFilters';
import { TemplateGrid } from './components/TemplateGrid';
import type { Category } from './data/templates';
import { templates } from './data/templates';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const filteredTemplates = useMemo(
    () => templates.filter((template) => selectedCategory === 'All' || template.category === selectedCategory),
    [selectedCategory],
  );

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <section className="mx-auto max-w-[1500px] overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/40 backdrop-blur-2xl">
        <GalleryHeader />
        <TemplateFilters selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
        <TemplateGrid templates={filteredTemplates} />
      </section>
    </main>
  );
}

export default App;
