#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { basename, isAbsolute, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const EXIT_CAPTURE = 1;
const EXIT_ENVIRONMENT = 2;

function usage(message = '') {
  if (message) console.error(message);
  console.error('Usage: node scripts/capture-slides.mjs <html-file-or-url> --output <dir> [--settle-ms <number>]');
  process.exit(EXIT_ENVIRONMENT);
}

const args = process.argv.slice(2);
if (!args.length || args.includes('--help') || args.includes('-h')) usage();
const target = args[0];
const outputIndex = args.indexOf('--output');
const settleIndex = args.indexOf('--settle-ms');
const outputDir = outputIndex >= 0 ? args[outputIndex + 1] : '';
const settleMs = settleIndex >= 0 ? Number(args[settleIndex + 1]) : 250;
if (!outputDir) usage('Missing required --output directory.');
if (!Number.isFinite(settleMs) || settleMs < 0) usage('--settle-ms must be a non-negative number.');

function targetUrl(value) {
  if (/^https?:\/\//.test(value) || value.startsWith('file://')) return value;
  const absolute = isAbsolute(value) ? value : resolve(process.cwd(), value);
  if (!existsSync(absolute)) usage(`Target does not exist: ${absolute}`);
  return pathToFileURL(absolute).href;
}

function safeName(value, fallback) {
  const normalized = String(value || '').normalize('NFKD').replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();
  return normalized || fallback;
}

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (error) {
  console.error('Playwright is required. Run the project package install, then `playwright install chromium`.');
  console.error(error.message);
  process.exit(EXIT_ENVIRONMENT);
}

try {
  mkdirSync(resolve(outputDir), { recursive: true });
} catch (error) {
  console.error(`Could not create capture output directory: ${error.message}`);
  process.exit(EXIT_ENVIRONMENT);
}
let browser;
try {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  browser = await chromium.launch({ headless: true, ...(existsSync(chromePath) ? { executablePath: chromePath } : {}) });
} catch (error) {
  console.error('Playwright could not launch Chromium. Run `playwright install chromium`.');
  console.error(error.message);
  process.exit(EXIT_ENVIRONMENT);
}

const consoleErrors = [];
const report = {
  schemaVersion: 1,
  target: targetUrl(target),
  sourceName: basename(target),
  viewport: { width: 1920, height: 1080 },
  capturedAt: new Date().toISOString(),
  slideCount: 0,
  slides: [],
  consoleErrors,
};

try {
  const page = await browser.newPage({ viewport: report.viewport, deviceScaleFactor: 1 });
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(report.target, { waitUntil: 'load' });
  await page.waitForFunction(() => document.querySelector('.stage') && document.querySelectorAll('.slide').length > 0);
  await page.evaluate(async () => {
    await document.fonts?.ready;
    await Promise.all(Array.from(document.images).map(async (image) => {
      if (image.complete) return;
      await Promise.race([
        new Promise((resolveImage) => image.addEventListener('load', resolveImage, { once: true })),
        new Promise((resolveImage) => image.addEventListener('error', resolveImage, { once: true })),
        new Promise((resolveImage) => setTimeout(resolveImage, 3000)),
      ]);
    }));
  });
  await page.waitForTimeout(settleMs);

  const metadata = await page.evaluate(() => Array.from(document.querySelectorAll('.slide')).map((slide, index) => ({
    currentNumber: index + 1,
    slideId: (slide.dataset.slideId || '').trim(),
    originalNumber: (slide.dataset.originalNumber || '').trim(),
    title: (slide.dataset.slideTitle || '').trim(),
  })));
  report.slideCount = metadata.length;
  await page.keyboard.press('Home');

  for (let index = 0; index < metadata.length; index += 1) {
    if (index > 0) await page.keyboard.press('PageDown');
    await page.waitForTimeout(settleMs);
    const state = await page.evaluate(() => {
      const slides = Array.from(document.querySelectorAll('.slide'));
      const visible = slides.filter((slide) => {
        const style = getComputedStyle(slide);
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0.01;
      });
      const active = slides.filter((slide) => slide.classList.contains('active'));
      return {
        count: visible.length,
        index: visible.length === 1 ? slides.indexOf(visible[0]) : -1,
        activeCount: active.length,
        activeIndex: active.length === 1 ? slides.indexOf(active[0]) : -1,
      };
    });
    if (state.count !== 1 || state.index !== index) {
      throw new Error(`Could not navigate to slide ${index + 1}; visible=${state.count}, visibleIndex=${state.index + 1}`);
    }
    if (state.activeCount !== 1 || state.activeIndex !== index) {
      throw new Error(`active slide mismatch on slide ${index + 1}; active=${state.activeCount}, activeIndex=${state.activeIndex + 1}`);
    }

    const measurements = await page.evaluate(() => {
      const slide = document.querySelector('.slide.active');
      const stage = document.querySelector('.stage');
      const stageRect = stage.getBoundingClientRect();
      const scale = stageRect.width / 1920;
      const toStageRect = (rect) => ({
        left: Number(((rect.left - stageRect.left) / scale).toFixed(2)),
        top: Number(((rect.top - stageRect.top) / scale).toFixed(2)),
        right: Number(((rect.right - stageRect.left) / scale).toFixed(2)),
        bottom: Number(((rect.bottom - stageRect.top) / scale).toFixed(2)),
        width: Number((rect.width / scale).toFixed(2)),
        height: Number((rect.height / scale).toFixed(2)),
      });
      const effectiveOpacity = (element) => {
        let value = 1;
        for (let node = element; node instanceof Element && node !== slide.parentElement; node = node.parentElement) {
          const style = getComputedStyle(node);
          if (style.display === 'none') return 0;
          value *= Number(style.opacity);
        }
        return value;
      };
      const titleCandidate = slide.querySelector('[data-slide-title-element], h1, h2, .slide-title');
      const title = titleCandidate && effectiveOpacity(titleCandidate) > 0.01 ? titleCandidate : null;
      const explicitContent = Array.from(slide.querySelectorAll('[data-qa-content]'));
      const semanticSelector = 'h1, h2, h3, h4, h5, h6, p, li, img, video, figure, table, blockquote, pre, code, canvas, svg, [data-qa-content]';
      const candidates = explicitContent.length ? explicitContent : Array.from(slide.querySelectorAll(semanticSelector));
      const content = candidates.filter((element) => {
        if (element.closest('[aria-hidden="true"], [data-qa-ignore]')) return false;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && effectiveOpacity(element) > 0.01 && rect.width > 0 && rect.height > 0;
      });
      const contentRects = content.map((element) => element.getBoundingClientRect());
      const contentBox = contentRects.length ? {
        left: Math.min(...contentRects.map((rect) => rect.left)),
        top: Math.min(...contentRects.map((rect) => rect.top)),
        right: Math.max(...contentRects.map((rect) => rect.right)),
        bottom: Math.max(...contentRects.map((rect) => rect.bottom)),
      } : null;
      if (contentBox) {
        contentBox.width = contentBox.right - contentBox.left;
        contentBox.height = contentBox.bottom - contentBox.top;
      }
      const images = Array.from(slide.querySelectorAll('img')).map((image) => ({
        src: image.getAttribute('src') || '',
        alt: image.getAttribute('alt') || '',
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        rect: toStageRect(image.getBoundingClientRect()),
      }));
      const normalizedContent = contentBox ? toStageRect(contentBox) : null;
      return {
        stageScale: Number(scale.toFixed(4)),
        titleRect: title ? toStageRect(title.getBoundingClientRect()) : null,
        titleBaseline: title ? Number(((title.getBoundingClientRect().bottom - stageRect.top) / scale).toFixed(2)) : null,
        contentBoundingBox: normalizedContent,
        contentMeasurementSource: explicitContent.length ? 'data-qa-content' : 'semantic-content',
        topWhitespace: normalizedContent ? normalizedContent.top : 1080,
        bottomWhitespace: normalizedContent ? Number((1080 - normalizedContent.bottom).toFixed(2)) : 1080,
        bottomSafeZoneViolated: normalizedContent ? normalizedContent.bottom > 1020 : false,
        overflow: normalizedContent ? normalizedContent.left < 0 || normalizedContent.top < 0 || normalizedContent.right > 1920 || normalizedContent.bottom > 1080 : false,
        images,
      };
    });

    const item = metadata[index];
    const filename = `${String(index + 1).padStart(2, '0')}-${safeName(item.slideId, `slide-${index + 1}`)}.png`;
    try {
      await page.locator('.stage').screenshot({ path: resolve(outputDir, filename), animations: 'disabled' });
    } catch (error) {
      error.qaEnvironmentFailure = true;
      throw error;
    }
    report.slides.push({ ...item, screenshot: filename, measurements });
  }
  await page.close();
} catch (error) {
  console.error(`Slide capture failed: ${error.message}`);
  process.exitCode = error.qaEnvironmentFailure ? EXIT_ENVIRONMENT : EXIT_CAPTURE;
} finally {
  await browser.close();
  try {
    writeFileSync(resolve(outputDir, 'qa-report.json'), `${JSON.stringify(report, null, 2)}\n`);
  } catch (error) {
    console.error(`Could not write qa-report.json: ${error.message}`);
    process.exitCode = EXIT_ENVIRONMENT;
  }
}

if (!process.exitCode) {
  console.log(`Captured ${report.slideCount} slides to ${resolve(outputDir)}`);
  console.log(`QA report: ${resolve(outputDir, 'qa-report.json')}`);
}
