import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

const requiredFiles = [
  'package.json',
  'index.html',
  'SKILL.md',
  'README.md',
  'STYLE_PRESETS.md',
  'HOMEPAGE_GENERATION_WORKFLOW.md',
  'DESIGN_REVIEW.md',
  'IMAGE_WORKFLOW.md',
  'PRESENTATION_WORKFLOW.md',
  'PPT_VISUAL_QA.md',
  'templates/orbis-nft/README.md',
  'templates/presentation-html/README.md',
  'templates/presentation-html/presentation.html',
  'scripts/capture-slides.mjs',
  'scripts/verify-html-ppt-stage.mjs',
  'src/main.tsx',
  'src/App.tsx',
  'src/index.css',
  'src/data/templates.ts',
  'src/data/profile-schema.ts',
  'src/data/studio.ts',
  'src/components/HomepagePreview.tsx',
  'src/components/StudioFields.tsx',
  'src/utils/exportHomepage.ts',
  'public/guide.html',
  'src/components/GalleryHeader.tsx',
  'src/components/TemplateFilters.tsx',
  'src/components/TemplateGrid.tsx',
  'src/components/TemplateCard.tsx',
  'src/components/PreviewCanvas.tsx',
  'src/previews/tech.tsx',
  'src/previews/creator.tsx',
  'src/previews/business.tsx',
  'src/previews/art.tsx',
  'src/previews/previewData.ts',
  'assets/template-previews/orbis-nft-space-landing.svg',
  'vite.config.ts',
  'tsconfig.json',
];

const requiredTemplates = [
  'Cinematic Scroll Personal Brand',
  'Soft Product Video Hero',
  '3D Tech Portfolio',
  'Motion Gradient Brand',
  'Magazine Portfolio',
  'Terminal Hacker Homepage',
  'Minimal Premium Resume',
  'Cute Pixel Creator',
  'AI System Dashboard',
  'Creator Bento Homepage',
  'Dark Editorial Portfolio',
  'Spatial Project Gallery',
  'Business Personal Brand',
  'Case Study Portfolio',
  'Art Museum Portfolio',
  'TOONHUB Figurine Carousel',
  'Clean Developer Homepage',
  'Orbis NFT Space Landing',
];

const requiredSnippets = {
  'SKILL.md': ['name: personal-homepage-skill', 'Homepage Mode', 'Presentation Mode', 'PRESENTATION_WORKFLOW.md', 'PPT_VISUAL_QA.md', '$SKILL_DIR', 'must not be applied to Homepage Mode', 'Reference first', 'Chinese typography', 'Images must be verified'],
  'HOMEPAGE_GENERATION_WORKFLOW.md': ['Mode detection', 'Reference-first behavior', 'Style previews', 'Verification'],
  'PRESENTATION_WORKFLOW.md': ['1920×1080', '16:9', 'keyboard navigation', 'Eight-problem acceptance map', 'Requirement omission', 'Template fidelity', 'Asset selection', 'Visual balance', 'Sparse slides', 'Ineffective changes', 'Shortcut coverage', 'Deletion and numbering', 'Audit-only branch', 'SKILL_DIR', 'NODE_BIN', 'slide-requirements.json', 'template-decomposition.txt', 'visual-review.txt', 'slide requirement ledger', 'data-slide-id', 'verify-html-ppt-stage.mjs', 'capture-slides.mjs', 'Low density / speaker-led', 'High density / reading-first'],
  'PPT_VISUAL_QA.md': ['two phases', 'Before authoring', 'After rendering', 'Template decomposition', 'Asset priority', 'Visual center', 'Low-text slides', 'Full-size screenshot review'],
  'templates/orbis-nft/README.md': ['Orbis NFT Space Landing Prompt Template', 'liquid-glass', 'Anton', 'Condiment', 'CloudFront video slots'],
  'templates/presentation-html/presentation.html': ['--stage-w: 1920', '--stage-h: 1080', 'class="slide active"', 'data-slide-id=', 'data-original-number=', 'data-slide-title=', 'ArrowRight', 'Escape', 'requestFullscreen'],
  'scripts/capture-slides.mjs': ['qa-report.json', 'slide.dataset.slideId', 'titleBaseline', 'contentBoundingBox', 'bottomSafeZoneViolated'],
  'scripts/verify-html-ppt-stage.mjs': ['duplicate data-slide-id', 'missing or ineffective shortcuts', 'broken images', 'layout/motion transform conflict'],
  'DESIGN_REVIEW.md': ['Chinese typography', 'Hero section', 'Presentation Mode', 'Images', 'Verification record'],
  'IMAGE_WORKFLOW.md': ['Classify roles', 'Evaluate usability', 'Missing image fallback'],
  'STYLE_PRESETS.md': requiredTemplates,
  'src/index.css': [
    '@tailwind base;',
    '.studio-grid',
    '.homepage-preview',
    'container-type: inline-size',
    "'Noto Sans SC'",
    'focus-visible',
    'prefers-reduced-motion',
  ],
  'src/data/templates.ts': [
    'export type TemplateDefinition',
    'identityFits',
    'densityModes',
    'imagePolicy',
    'generationNotes',
    'risks',
    'typography',
  ],
  'src/App.tsx': ['HomepagePreview', 'downloadHomepage', 'stylePresets', 'localStorage', '编辑并导出'],
  'src/utils/exportHomepage.ts': ['data-edit-version', 'data-edit-id', 'localStorage', '导出 HTML', 'prefers-reduced-motion'],
  'public/guide.html': ['公开使用手册', '写入真实资料', '导出与发布', '隐私与限制'],
};

const failures = [];
const fileContents = new Map();

for (const file of requiredFiles) {
  const path = resolve(root, file);
  if (!existsSync(path)) {
    failures.push(`Missing file: ${file}`);
    continue;
  }
  fileContents.set(file, readFileSync(path, 'utf8'));
}

for (const [file, snippets] of Object.entries(requiredSnippets)) {
  const content = fileContents.get(file);
  if (!content) continue;
  for (const snippet of snippets) {
    if (!content.includes(snippet)) {
      failures.push(`${file} missing snippet: ${snippet}`);
    }
  }
}

const templateRegistry = fileContents.get('src/data/templates.ts');
if (templateRegistry) {
  for (const template of requiredTemplates) {
    if (!templateRegistry.includes(template)) {
      failures.push(`src/data/templates.ts missing template: ${template}`);
    }
  }

  const templateCount = (templateRegistry.match(/id: '/g) || []).length;
  if (templateCount < requiredTemplates.length) {
    failures.push(`Expected at least ${requiredTemplates.length} template entries, found ${templateCount}`);
  }
}

for (const doc of ['SKILL.md', 'README.md', 'STYLE_PRESETS.md', 'HOMEPAGE_GENERATION_WORKFLOW.md', 'PRESENTATION_WORKFLOW.md', 'PPT_VISUAL_QA.md', 'DESIGN_REVIEW.md', 'IMAGE_WORKFLOW.md']) {
  const content = fileContents.get(doc);
  if (!content) continue;
  if (/\b(TODO|TBD|FIXME)\b/i.test(content)) {
    failures.push(`${doc} contains placeholder marker TODO/TBD/FIXME`);
  }
}

if (failures.length) {
  console.error('Homepage Studio spec check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Homepage Studio spec check passed: public workflow, export logic, skill docs, CJK rules, and visual presets are present.');
