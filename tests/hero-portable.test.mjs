import { createRequire } from 'node:module';
import { cp, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const portableRoot = resolve(import.meta.dirname, '../templates/hero/portable');
const htmlPath = resolve(portableRoot, 'index.html');
const target = pathToFileURL(htmlPath).href;
const html = await readFile(htmlPath, 'utf8');
const failures = [];

if (html.includes('type="module"') || html.includes('.tsx')) failures.push('index.html still requires a module or TSX runtime');
if (/<(?:script|link)[^>]+(?:src|href)=["']https?:\/\//i.test(html)) failures.push('index.html contains a remote runtime dependency');

const assets = await readdir(resolve(portableRoot, 'assets'), { recursive: true });
for (const expected of ['hero.js', 'hero.css', 'hero.mp4', 'cinematic-text.mp4', 'metrics.mp4', 'technology.mp4', 'footer.mp4', 'portrait.jpg']) {
  if (!assets.some((file) => file.endsWith(expected))) failures.push(`missing portable asset ${expected}`);
}

const browser = await chromium.launch({ headless: true, channel: 'chromium' });
try {
  for (const viewport of [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(target, { waitUntil: 'load' });
    await page.waitForTimeout(1200);

    const state = await page.evaluate(() => ({
      rootChildren: document.querySelector('#root')?.childElementCount || 0,
      sections: Array.from(document.querySelectorAll('section, footer')).map((element) => element.id),
      videoCount: document.querySelectorAll('video').length,
      footerImages: document.querySelectorAll('#contact img').length,
      brokenImages: Array.from(document.images).filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      editButton: Boolean(document.querySelector('[data-editor-control="toggle"]')),
      exportButton: Boolean(document.querySelector('#exportHtml, [data-editor-control="export"]')),
    }));

    if (!state.rootChildren) failures.push(`${viewport.name}: React application did not mount from file://`);
    if (state.sections.join(',') !== 'top,about,metrics,technology,architecture,contact') failures.push(`${viewport.name}: incomplete page structure ${state.sections.join(',')}`);
    if (state.videoCount !== 4) failures.push(`${viewport.name}: expected four active video elements, found ${state.videoCount}`);
    if (state.footerImages !== 1) failures.push(`${viewport.name}: static footer portrait is missing`);
    if (state.brokenImages.length) failures.push(`${viewport.name}: broken images ${state.brokenImages.join(', ')}`);
    if (state.horizontalOverflow > 1) failures.push(`${viewport.name}: horizontal overflow ${state.horizontalOverflow}px`);
    if (!state.editButton || !state.exportButton) failures.push(`${viewport.name}: editing or export control is missing`);
    if (errors.length) failures.push(`${viewport.name}: console errors ${errors.join(' | ')}`);

    if (viewport.name === 'desktop') {
      await page.keyboard.press('KeyE');
      const editable = page.locator('[data-edit-id="hero-identity"]');
      if ((await editable.getAttribute('contenteditable')) !== 'true') failures.push('desktop: E did not enable inline editing');
      await editable.evaluate((element) => { element.innerHTML = 'Portable Test Name · AI Builder'; });
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+KeyS' : 'Control+KeyS');

      const downloadPromise = page.waitForEvent('download');
      await page.locator('#exportHtml').click();
      const download = await downloadPromise;
      const exportedRoot = await mkdtemp(resolve(tmpdir(), 'hero-export-roundtrip-'));
      try {
        await cp(resolve(portableRoot, 'assets'), resolve(exportedRoot, 'assets'), { recursive: true });
        const exportedHtml = resolve(exportedRoot, 'index.html');
        await download.saveAs(exportedHtml);
        const exportedPage = await browser.newPage({ viewport: { width: 1200, height: 800 } });
        await exportedPage.goto(pathToFileURL(exportedHtml).href, { waitUntil: 'load' });
        await exportedPage.waitForTimeout(1000);
        const roundTrip = await exportedPage.evaluate(() => ({
          editedText: document.querySelector('[data-edit-id="hero-identity"]')?.textContent,
          exportButton: Boolean(document.querySelector('#exportHtml, [data-editor-control="export"]')),
          editVersion: document.documentElement.dataset.editVersion,
        }));
        if (!roundTrip.editedText?.includes('Portable Test Name')) failures.push('desktop: exported HTML did not embed current edits');
        if (!roundTrip.exportButton || !roundTrip.editVersion) failures.push('desktop: exported HTML is not editable and re-exportable');
        await exportedPage.close();
      } finally {
        await rm(exportedRoot, { recursive: true, force: true });
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error('Hero portable regression failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Hero portable regression passed: the packaged folder opens directly from file:// on desktop and mobile.');
