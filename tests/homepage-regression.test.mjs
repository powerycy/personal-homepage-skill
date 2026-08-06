import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const target = pathToFileURL(resolve(import.meta.dirname, '../templates/single-html/personal-homepage.html')).href;
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];
const failures = [];
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({ headless: true, ...(existsSync(chromePath) ? { executablePath: chromePath } : {}) });

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(target, { waitUntil: 'load' });
    await page.waitForTimeout(100);
    const state = await page.evaluate(() => ({
      hasPptStage: Boolean(document.querySelector('.stage, .stage-shell, .slide')),
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      verticalDocument: document.documentElement.scrollHeight > innerHeight,
      brokenImages: Array.from(document.images)
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.src),
    }));
    if (state.hasPptStage) failures.push(`${viewport.name}: Homepage Mode unexpectedly contains PPT stage/slide structure`);
    if (state.horizontalOverflow) failures.push(`${viewport.name}: horizontal overflow`);
    if (!state.verticalDocument) failures.push(`${viewport.name}: expected a continuous scrolling homepage`);
    if (state.brokenImages.length) failures.push(`${viewport.name}: broken images: ${state.brokenImages.join(', ')}`);
    if (errors.length) failures.push(`${viewport.name}: console errors: ${errors.join(' | ')}`);
    await page.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error('Homepage regression failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Homepage regression passed: desktop/mobile remain continuous, responsive, asset-clean, and free of PPT stage rules.');
