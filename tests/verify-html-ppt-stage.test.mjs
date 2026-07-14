import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const verifier = resolve(root, 'scripts/verify-html-ppt-stage.mjs');
const fixtures = resolve(import.meta.dirname, 'fixtures');
const edgeFixture = pathToFileURL(resolve(fixtures, 'verifier-edge-cases.html'));
const failures = [];

function runVerifier(args) {
  return new Promise((resolveRun) => {
    const child = spawn(process.execPath, [verifier, ...args], { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('close', (status, signal) => resolveRun({ status, signal, stdout, stderr }));
  });
}

async function runLimited(jobs, limit = 3) {
  const results = new Array(jobs.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, jobs.length) }, async () => {
    while (cursor < jobs.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await jobs[index]();
    }
  }));
  return results;
}

const invalidJobs = [
  ['duplicate-slide-id.html', 'duplicate data-slide-id'],
  ['missing-shortcuts.html', 'missing or ineffective shortcuts'],
  ['broken-image.html', 'broken images'],
  ['transform-conflict.html', 'layout/motion transform conflict'],
].map(([fixture, expected]) => ({
  label: fixture,
  expected,
  run: () => runVerifier([resolve(fixtures, fixture), '--viewport', '1280x720']),
}));

for (const [scenario, expected] of [
  ['single-missing-special', 'missing or ineffective shortcuts'],
  ['single-missing-navigation', 'missing or ineffective shortcuts'],
  ['fake-special', 'missing or ineffective shortcuts'],
  ['bad-edit-context', 'editable/input context isolation'],
  ['wrong-stage-size', 'internal stage size'],
  ['transparent-stage', 'painted slide'],
  ['painted-active-mismatch', 'painted slide and active slide differ'],
  ['fullscreen-no-toggle', 'F fullscreen toggle behavior'],
  ['later-transform', 'layout/motion transform conflict'],
  ['blank-metadata', 'missing slide metadata'],
  ['missing-metadata', 'missing slide metadata'],
  ['metadata-drift', 'slide metadata changed during navigation'],
  ['stale-counter', 'slide counter mismatch'],
  ['rapid-loss', 'rapid navigation ended on'],
]) {
  const url = new URL(edgeFixture);
  url.searchParams.set('scenario', scenario);
  invalidJobs.push({ label: scenario, expected, run: () => runVerifier([url.href, '--viewport', '1280x720']) });
}

const invalidResults = await runLimited(invalidJobs.map((job) => job.run));
invalidResults.forEach((result, index) => {
  const { label, expected } = invalidJobs[index];
  const output = `${result.stdout}\n${result.stderr}`;
  if (result.status !== 1) failures.push(`${label}: expected exit 1, saw ${result.status}${result.signal ? ` (${result.signal})` : ''}`);
  if (!output.toLowerCase().includes(expected.toLowerCase())) failures.push(`${label}: expected diagnostic containing “${expected}”`);
});

const invalidOutputRoot = mkdtempSync(join(tmpdir(), 'ppt-verifier-output-'));
const invalidOutputFile = join(invalidOutputRoot, 'not-a-directory');
writeFileSync(invalidOutputFile, 'file');
const screenshotFailureRoot = mkdtempSync(join(tmpdir(), 'ppt-verifier-screenshot-'));
mkdirSync(join(screenshotFailureRoot, 'valid-deck-html-1280x720.png'));

const singleValidUrl = new URL(edgeFixture);
singleValidUrl.searchParams.set('scenario', 'single-valid');
const finalJobs = [
  { label: 'output environment failure', status: 2, args: [resolve(fixtures, 'valid-deck.html'), '--screenshots', join(invalidOutputFile, 'child'), '--viewport', '1280x720'] },
  { label: 'screenshot environment failure', status: 2, args: [resolve(fixtures, 'valid-deck.html'), '--screenshots', screenshotFailureRoot, '--viewport', '1280x720'] },
  { label: 'valid-deck.html', status: 0, args: [resolve(fixtures, 'valid-deck.html'), '--viewport', '1280x720'] },
  { label: 'single-valid', status: 0, args: [singleValidUrl.href, '--viewport', '1280x720'] },
  { label: 'alternate counter', status: 0, args: [`${edgeFixture.href}?scenario=alternate-counter`, '--viewport', '1280x720'] },
  { label: 'presentation template', status: 0, args: [resolve(root, 'templates/presentation-html/presentation.html'), '--viewport', '1280x720'] },
];
const finalResults = await runLimited(finalJobs.map((job) => () => runVerifier(job.args)));
finalResults.forEach((result, index) => {
  const job = finalJobs[index];
  if (result.status !== job.status) failures.push(`${job.label}: expected exit ${job.status}, saw ${result.status}\n${result.stderr}`);
});

rmSync(invalidOutputRoot, { recursive: true, force: true });
rmSync(screenshotFailureRoot, { recursive: true, force: true });

if (failures.length) {
  console.error('Verifier contract test failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Verifier contract test passed: invalid fixtures fail with targeted diagnostics; multi-slide, single-slide, and template fixtures pass.');
