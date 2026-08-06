import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const css = readFileSync(resolve(root, 'src/index.css'), 'utf8');
const app = readFileSync(resolve(root, 'src/App.tsx'), 'utf8');
const preview = readFileSync(resolve(root, 'src/components/HomepagePreview.tsx'), 'utf8');
const exporter = readFileSync(resolve(root, 'src/utils/exportHomepage.ts'), 'utf8');
const failures = [];

const checks = [
  [css.includes('overflow-x: hidden'), 'body should prevent horizontal overflow'],
  [css.includes('max-width: 1600px'), 'Studio shell should constrain maximum width'],
  [css.includes('container-type: inline-size'), 'generated preview should use container-responsive rules'],
  [css.includes('@container (max-width: 520px)'), 'mobile homepage preview rule should exist'],
  [css.includes('@media (max-width: 640px)'), 'mobile Studio rule should exist'],
  [css.includes('prefers-reduced-motion'), 'reduced motion support should exist'],
  [css.includes("'Noto Sans SC'") && css.includes("'Noto Serif SC'"), 'CJK font stacks should exist'],
  [app.includes("device === 'mobile'") && app.includes('移动端预览'), 'desktop/mobile preview switch should exist'],
  [app.includes('写入真实资料') && app.includes('选择表达方式') && app.includes('编辑并导出'), 'three-step workflow should exist'],
  [preview.includes('data-edit-id') && preview.includes('contentEditable'), 'preview should expose stable inline editing fields'],
  [exporter.includes('data-edit-version') && exporter.includes('导出 HTML'), 'portable HTML export controls should exist'],
  [!app.includes('Rarity score') && !preview.includes('Rarity score') && !exporter.includes('Rarity score'), 'public Studio should not contain invented scores'],
];

for (const [ok, message] of checks) if (!ok) failures.push(message);

if (failures.length) {
  console.error('Static Studio visual guard failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Static Studio visual guard passed: responsive preview, CJK typography, editing, export, and anti-fake-data rules are present.');
