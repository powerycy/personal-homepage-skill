import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const output = mkdtempSync(join(tmpdir(), 'ppt-capture-test-'));
const script = resolve(root, 'scripts/capture-slides.mjs');
const fixture = resolve(import.meta.dirname, 'fixtures/valid-deck.html');

try {
  const result = spawnSync(process.execPath, [script, fixture, '--output', output], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`capture script exited ${result.status}: ${result.stderr}`);
  const reportPath = join(output, 'qa-report.json');
  if (!existsSync(reportPath)) throw new Error('qa-report.json was not created');
  const report = JSON.parse(readFileSync(reportPath, 'utf8'));
  if (report.slideCount !== 2 || report.slides?.length !== 2) throw new Error('report does not contain both slides');
  if (!report.slides.every((slide) => slide.slideId && slide.currentNumber && slide.originalNumber && slide.title && slide.screenshot && slide.measurements)) {
    throw new Error('report is missing stable metadata, screenshot paths, or measurements');
  }
  const screenshots = readdirSync(output).filter((file) => file.endsWith('.png'));
  if (screenshots.length !== 2) throw new Error(`expected 2 screenshots, found ${screenshots.length}`);
  if (!report.slides.every((slide) => existsSync(join(output, slide.screenshot)))) throw new Error('report references a missing screenshot');

  const edgeOutput = mkdtempSync(join(tmpdir(), 'ppt-capture-edge-'));
  try {
    const edgeUrl = pathToFileURL(resolve(import.meta.dirname, 'fixtures/capture-edge-cases.html')).href;
    const edgeResult = spawnSync(process.execPath, [script, edgeUrl, '--output', edgeOutput], { encoding: 'utf8' });
    if (edgeResult.status !== 1) throw new Error(`active mismatch should exit 1, saw ${edgeResult.status}`);
    if (!`${edgeResult.stdout}\n${edgeResult.stderr}`.includes('active slide mismatch')) throw new Error('active mismatch diagnostic missing');

    const measureOutput = mkdtempSync(join(tmpdir(), 'ppt-capture-measure-'));
    try {
      const measureUrl = new URL(edgeUrl);
      measureUrl.searchParams.set('scenario', 'content-measure');
      const measureResult = spawnSync(process.execPath, [script, measureUrl.href, '--output', measureOutput], { encoding: 'utf8' });
      if (measureResult.status !== 0) throw new Error(`content measurement fixture exited ${measureResult.status}: ${measureResult.stderr}`);
      const measureReport = JSON.parse(readFileSync(join(measureOutput, 'qa-report.json'), 'utf8'));
      const firstBox = measureReport.slides[0].measurements.contentBoundingBox;
      if (firstBox.left !== 200 || firstBox.top !== 180 || firstBox.right !== 1000 || firstBox.bottom !== 480) {
        throw new Error(`decorative layer polluted content box: ${JSON.stringify(firstBox)}`);
      }
      if (measureReport.slides[0].measurements.bottomSafeZoneViolated) throw new Error('content fixture incorrectly violates bottom safe zone');

      const visibilityOutput = mkdtempSync(join(tmpdir(), 'ppt-capture-visibility-'));
      try {
        const visibilityUrl = new URL(edgeUrl);
        visibilityUrl.searchParams.set('scenario', 'visibility-override');
        const visibilityResult = spawnSync(process.execPath, [script, visibilityUrl.href, '--output', visibilityOutput], { encoding: 'utf8' });
        if (visibilityResult.status !== 0) throw new Error(`visibility override fixture exited ${visibilityResult.status}: ${visibilityResult.stderr}`);
        const visibilityReport = JSON.parse(readFileSync(join(visibilityOutput, 'qa-report.json'), 'utf8'));
        if (visibilityReport.slides[0].measurements.contentBoundingBox.right !== 1600) throw new Error('visible child under visibility:hidden ancestor was excluded');
      } finally {
        rmSync(visibilityOutput, { recursive: true, force: true });
      }
    } finally {
      rmSync(measureOutput, { recursive: true, force: true });
    }
  } finally {
    rmSync(edgeOutput, { recursive: true, force: true });
  }

  const invalidOutputRoot = mkdtempSync(join(tmpdir(), 'ppt-capture-output-'));
  const invalidOutputFile = join(invalidOutputRoot, 'not-a-directory');
  await import('node:fs').then(({ writeFileSync }) => writeFileSync(invalidOutputFile, 'file'));
  const outputFailure = spawnSync(process.execPath, [script, fixture, '--output', join(invalidOutputFile, 'child')], { encoding: 'utf8' });
  if (outputFailure.status !== 2) throw new Error(`output environment failure should exit 2, saw ${outputFailure.status}`);
  rmSync(invalidOutputRoot, { recursive: true, force: true });
  console.log('Capture contract test passed: two slide screenshots and qa-report.json were produced.');
} finally {
  rmSync(output, { recursive: true, force: true });
}
