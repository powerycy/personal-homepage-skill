import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const docs = {
  skill: readFileSync(resolve(root, 'SKILL.md'), 'utf8'),
  workflow: readFileSync(resolve(root, 'HOMEPAGE_GENERATION_WORKFLOW.md'), 'utf8'),
  review: readFileSync(resolve(root, 'DESIGN_REVIEW.md'), 'utf8'),
};

const text = Object.values(docs).join('\n').toLowerCase();
const failures = [];

function requireSnippet(snippet, label = snippet) {
  if (!text.includes(snippet.toLowerCase())) failures.push(`Missing Homepage QA rule: ${label}`);
}

function requireAll(snippets, label) {
  for (const snippet of snippets) requireSnippet(snippet, label);
}

requireAll([
  'lightweight homepage requirement checklist',
  'original request',
  'assets',
  'target section/component',
  'interaction state',
  'acceptance evidence',
], 'requirement omission checklist');

requireAll([
  'structured template decomposition',
  'before coding',
  'desktop/mobile rendered comparison',
], 'template fidelity workflow');

requireAll([
  'low-content homepage strategy',
  'real large image',
  'single featured case',
  'editorial whitespace',
  'asymmetric composition',
  'meaningless cards',
], 'sparse homepage strategy');

requireAll([
  'final computed styles',
  'desktop/mobile screenshots',
  'assets and key interactions',
  'separate positioning layers from animation layers only when needed',
], 'ineffective change verification');

requireAll([
  'slide-id',
  'page numbers',
  '1920×1080',
  'presentation keyboard shortcuts',
  'bottom safe-zone rules',
  'must not be required for homepage mode',
], 'homepage/presentation boundary');

if (failures.length) {
  console.error('Homepage QA rules test failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Homepage QA rules test passed: omissions, template fidelity, sparse content, ineffective changes, and mode boundaries are documented.');
