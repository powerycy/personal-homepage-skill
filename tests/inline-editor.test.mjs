import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const targets = [
  { name: 'single-html', file: 'templates/single-html/personal-homepage.html' },
  { name: 'presentation', file: 'templates/presentation-html/presentation.html' },
];

const browser = await chromium.launch();
const failures = [];

for (const target of targets) {
  const dir = await mkdtemp(join(tmpdir(), `smoke-${target.name}-`));
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  const url = pathToFileURL(resolve(root, target.file)).href;
  await page.goto(url);
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const marker = `SMOKE_${target.name}_${Date.now()}`;

  // 0. typing "e" inside a real input must not toggle editing
  const probe = await page.evaluate(() => {
    const input = document.createElement('input');
    input.setAttribute('data-editor-chrome', '');
    input.value = '';
    document.body.appendChild(input);
    input.focus();
    return document.activeElement === input;
  });
  if (!probe) failures.push(`${target.name}: probe input could not be focused`);
  await page.keyboard.press('e');
  const guardHeld = await page.evaluate(() => document.body.classList.contains('editing'));
  if (guardHeld) failures.push(`${target.name}: E toggled editing while typing in an input`);
  await page.evaluate(() => document.querySelector('[data-editor-chrome]')?.remove());

  // 1. E toggles editing on the first editable node
  const firstEditable = page.locator('[data-edit-id]').first();
  await page.keyboard.press('e');
  const editableOn = await firstEditable.getAttribute('contenteditable');
  if (editableOn !== 'true') failures.push(`${target.name}: E did not enable editing`);
  const bodyEditing = await page.evaluate(() => document.body.classList.contains('editing'));
  if (!bodyEditing) failures.push(`${target.name}: body.editing missing`);

  // 2. paste sanitization strips disallowed tags/attributes
  const sanitized = await page.evaluate((markerText) => {
    const node = document.querySelector('[data-edit-id]');
    node.focus();
    const dirty = `<h2 style="color:red" onclick="alert(1)"><b>bold</b> and <script>evil()<\/script><span class="x" style="font-size:99px">span</span><a href="javascript:evil()">bad</a><a href="https://example.com">good</a> ${markerText}</h2>`;
    const clipboard = new DataTransfer();
    clipboard.setData('text/html', dirty);
    node.dispatchEvent(new ClipboardEvent('paste', { clipboardData: clipboard, bubbles: true, cancelable: true }));
    return document.querySelector('[data-edit-id]').innerHTML;
  }, marker);
  if (sanitized.includes('<h2') || sanitized.includes('style=') || sanitized.includes('script') || sanitized.includes('javascript:')) {
    failures.push(`${target.name}: sanitize left dirty markup: ${sanitized}`);
  }
  if (!sanitized.includes('<b>bold</b>') || !sanitized.includes('href="https://example.com"')) {
    failures.push(`${target.name}: sanitize dropped allowed markup: ${sanitized}`);
  }

  // 2b. dropped markup passes through the same sanitizer
  const dropped = await page.evaluate((markerText) => {
    const node = document.querySelector('[data-edit-id]');
    node.focus();
    const dirty = `<div style="width:9999px"><img src=x onerror="evil()"><b>drop</b> ${markerText}</div>`;
    const transfer = new DataTransfer();
    transfer.setData('text/html', dirty);
    // Chromium has no DropEvent constructor; a plain Event with an attached
    // DataTransfer exercises the same handler path.
    const drop = new Event('drop', { bubbles: true, cancelable: true });
    drop.dataTransfer = transfer;
    node.dispatchEvent(drop);
    return document.querySelector('[data-edit-id]').innerHTML;
  }, marker);
  if (dropped.includes('<div') || dropped.includes('onerror') || dropped.includes('<img')) {
    failures.push(`${target.name}: drop sanitize left dirty markup: ${dropped}`);
  }
  if (!dropped.includes('<b>drop</b>')) {
    failures.push(`${target.name}: drop sanitize dropped allowed markup: ${dropped}`);
  }

  // 3. save on Cmd+S, then exit editing
  const mod = process.platform === 'darwin' ? 'Meta' : 'Control';
  await page.keyboard.press(`${mod}+s`);
  await page.keyboard.press('Escape');
  const editableOff = await firstEditable.getAttribute('contenteditable');
  if (editableOff !== 'false') failures.push(`${target.name}: Escape did not exit editing`);

  // 4. edits survive reload (localStorage)
  await page.reload();
  const afterReload = await firstEditable.innerHTML();
  if (!afterReload.includes(marker)) failures.push(`${target.name}: edits lost after reload`);

  // 5. reset restores the original text
  await page.keyboard.press('e');
  page.once('dialog', (dialog) => dialog.accept());
  await page.click('[data-editor-control="reset"]');
  await page.keyboard.press('Escape');
  const afterReset = await firstEditable.innerHTML();
  if (afterReset.includes(marker)) failures.push(`${target.name}: reset did not restore original`);

  // 6. export round trip
  await page.keyboard.press('e');
  await firstEditable.fill(marker);
  await page.keyboard.press('Escape');
  page.once('dialog', (dialog) => dialog.accept()); // placeholder warning may fire
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#exportHtml'),
  ]);
  const exportedPath = join(dir, 'exported.html');
  await download.saveAs(exportedPath);
  const exportedHtml = readFileSync(exportedPath, 'utf8');
  if (!exportedHtml.includes(marker)) failures.push(`${target.name}: marker missing in export`);
  if (!/data-edit-version="export-\d+"/.test(exportedHtml)) failures.push(`${target.name}: export lacks data-edit-version`);
  if (!exportedHtml.includes('__EXPORTED_EDITS__')) failures.push(`${target.name}: export lacks embedded edits`);

  // 7. exported file opens with edits and can re-export
  const page2 = await context.newPage();
  await page2.goto(pathToFileURL(exportedPath).href);
  await page2.waitForTimeout(300);
  const exportedTextVisible = await page2.locator('[data-edit-id]').first().innerHTML();
  if (!exportedTextVisible.includes(marker)) failures.push(`${target.name}: exported file lost edits on open`);
  const hasExportButton = await page2.locator('#exportHtml').count();
  if (!hasExportButton) failures.push(`${target.name}: exported file lost export button`);

  await context.close();

  // 8. touch devices have no hover: the controls must stay visible
  const touchContext = await browser.newContext({ hasTouch: true, viewport: { width: 390, height: 844 } });
  const touchPage = await touchContext.newPage();
  await touchPage.goto(url);
  await touchPage.waitForTimeout(300);
  const controlsVisible = await touchPage.evaluate(() => {
    const controls = document.querySelector('.edit-controls');
    if (!controls) return false;
    const style = getComputedStyle(controls);
    return style.opacity !== '0' && style.pointerEvents !== 'none';
  });
  if (!controlsVisible) failures.push(`${target.name}: edit controls unreachable on touch devices`);
  await touchContext.close();
}

await browser.close();

if (failures.length) {
  console.error('Smoke failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Inline editor behavior test passed: E toggle with input guard, paste sanitize, save/reload, reset, export round trip, and touch visibility on both templates.');
