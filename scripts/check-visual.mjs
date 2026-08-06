import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const css = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const app = readFileSync(resolve(root, 'src/App.tsx'), 'utf8');
const card = readFileSync(resolve(root, 'src/components/TemplateCard.tsx'), 'utf8');
const previews = ['tech', 'creator', 'business', 'art'].map((name) => readFileSync(resolve(root, `src/previews/${name}.tsx`), 'utf8')).join('\n');
const failures = [];

const checks = [
  [css.includes('overflow-x: hidden'), 'body should prevent horizontal overflow'],
  [css.includes('aspect-ratio: 16 / 10'), 'preview shell should use aspect-ratio'],
  [css.includes('min-height: 268px'), 'preview shell should keep readable minimum height'],
  [css.includes('@media (max-width: 640px)'), 'mobile preview rule should exist'],
  [css.includes('prefers-reduced-motion'), 'reduced motion support should exist'],
  [css.includes('--font-cjk-sans') && css.includes('--font-cjk-serif'), 'CJK font variables should exist'],
  [card.includes('flex h-full flex-col'), 'cards should stretch consistently'],
  [card.includes('safe-bottom-space'), 'cards should include bottom spacing guard'],
  [card.includes('balanced-title'), 'cards should use balanced title wrapping'],
  [card.includes('readable-copy'), 'cards should use readable copy rules'],
  [app.includes('max-w-[1500px]'), 'gallery shell should constrain maximum width'],
  [previews.includes('font-cjk-sans') || previews.includes('font-cjk-serif'), 'previews should use CJK font utilities'],
  [!previews.includes('Option A') && !previews.includes('preview.md') && !previews.includes('template.html'), 'previews should not expose internal workflow labels'],
];

for (const [ok, message] of checks) {
  if (!ok) failures.push(message);
}

if (failures.length) {
  console.error('Static visual guard failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Static visual guard passed: responsive shell, CJK utilities, card spacing, and preview authenticity rules are present.');
