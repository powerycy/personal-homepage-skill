#!/usr/bin/env node
import { existsSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { basename, isAbsolute, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);

function usage() {
  console.error('Usage: node scripts/verify-html-ppt-stage.mjs <html-file-or-url> [--screenshots <dir>]');
  process.exit(2);
}

const args = process.argv.slice(2);
if (!args.length || args.includes('--help') || args.includes('-h')) usage();

const target = args[0];
const screenshotFlagIndex = args.indexOf('--screenshots');
const screenshotDir = screenshotFlagIndex >= 0 ? args[screenshotFlagIndex + 1] : '';
if (screenshotFlagIndex >= 0 && !screenshotDir) usage();

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (error) {
  console.error('Could not load Playwright. Install it in the project or run with a runtime that exposes it on NODE_PATH.');
  console.error(error.message);
  process.exit(2);
}

const viewports = [
  { width: 1280, height: 720 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];
const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;
const RECT_TOLERANCE = 2;

function targetUrl(value) {
  if (/^https?:\/\//.test(value) || value.startsWith('file://')) return value;
  const absolute = isAbsolute(value) ? value : resolve(process.cwd(), value);
  if (!existsSync(absolute)) {
    console.error(`Target does not exist: ${absolute}`);
    process.exit(2);
  }
  return pathToFileURL(absolute).href;
}

function compactRect(rect) {
  return {
    left: Number(rect.left.toFixed(2)),
    top: Number(rect.top.toFixed(2)),
    right: Number(rect.right.toFixed(2)),
    bottom: Number(rect.bottom.toFixed(2)),
    width: Number(rect.width.toFixed(2)),
    height: Number(rect.height.toFixed(2)),
  };
}

function expectedStageRect(viewport) {
  const scale = Math.min(viewport.width / STAGE_WIDTH, viewport.height / STAGE_HEIGHT);
  const width = STAGE_WIDTH * scale;
  const height = STAGE_HEIGHT * scale;
  return {
    left: (viewport.width - width) / 2,
    top: (viewport.height - height) / 2,
    right: (viewport.width + width) / 2,
    bottom: (viewport.height + height) / 2,
    width,
    height,
  };
}

function rectDelta(actual, expected) {
  return {
    left: Math.abs(actual.left - expected.left),
    top: Math.abs(actual.top - expected.top),
    right: Math.abs(actual.right - expected.right),
    bottom: Math.abs(actual.bottom - expected.bottom),
    width: Math.abs(actual.width - expected.width),
    height: Math.abs(actual.height - expected.height),
  };
}

function rectWithinTolerance(actual, expected) {
  const delta = rectDelta(actual, expected);
  return Object.values(delta).every((value) => value <= RECT_TOLERANCE);
}

const failures = [];
const reports = [];
const browser = await chromium.launch({ headless: true });

try {
  if (screenshotDir) mkdirSync(screenshotDir, { recursive: true });

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    await page.goto(targetUrl(target), { waitUntil: 'load' });
    await page.waitForTimeout(250);

    const report = await page.evaluate(() => {
      function isVisibleSlide(slide) {
        const style = getComputedStyle(slide);
        const rect = slide.getBoundingClientRect();
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          Number(style.opacity) > 0.01 &&
          rect.width > 0 &&
          rect.height > 0
        );
      }

      const stage = document.querySelector('.stage');
      const controls = document.querySelector('.controls');
      const slides = Array.from(document.querySelectorAll('.slide'));
      const activeSlides = slides.filter(isVisibleSlide);
      const activeClassSlides = slides.filter((slide) => slide.classList.contains('active'));
      const images = Array.from(document.images).map((img) => ({
        src: img.getAttribute('src') || '',
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }));

      if (!stage) {
        return { missingStage: true, activeCount: activeSlides.length, activeClassCount: activeClassSlides.length, images };
      }

      const stageRect = stage.getBoundingClientRect();
      const controlsRect = controls ? controls.getBoundingClientRect() : null;
      const controlsOverlap = controlsRect
        ? Math.max(
            0,
            Math.min(stageRect.right, controlsRect.right) - Math.max(stageRect.left, controlsRect.left),
          ) * Math.max(
            0,
            Math.min(stageRect.bottom, controlsRect.bottom) - Math.max(stageRect.top, controlsRect.top),
          )
        : 0;

      return {
        missingStage: false,
        activeCount: activeSlides.length,
        activeClassCount: activeClassSlides.length,
        activeTitle: activeSlides[0]?.dataset?.title || '',
        stageRect: {
          left: stageRect.left,
          top: stageRect.top,
          right: stageRect.right,
          bottom: stageRect.bottom,
          width: stageRect.width,
          height: stageRect.height,
        },
        controlsRect: controlsRect
          ? {
              left: controlsRect.left,
              top: controlsRect.top,
              right: controlsRect.right,
              bottom: controlsRect.bottom,
              width: controlsRect.width,
              height: controlsRect.height,
            }
          : null,
        viewport: { width: innerWidth, height: innerHeight },
        controlsOverlap,
        brokenImages: images.filter((img) => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0),
      };
    });

    const named = `${viewport.width}x${viewport.height}`;
    if (screenshotDir) {
      await page.screenshot({ path: resolve(screenshotDir, `${basename(target).replace(/\W+/g, '-')}-${named}.png`), fullPage: true });
    }

    if (report.missingStage) failures.push(`${named}: missing .stage element`);
    if (report.activeCount !== 1) failures.push(`${named}: expected exactly one displayed slide, saw ${report.activeCount}`);
    if (report.activeClassCount !== 1) failures.push(`${named}: expected exactly one .active slide, saw ${report.activeClassCount}`);
    if (!report.missingStage) {
      const expected = expectedStageRect(viewport);
      if (!rectWithinTolerance(report.stageRect, expected)) {
        const delta = rectDelta(report.stageRect, expected);
        failures.push(
          `${named}: stage does not fill the maximum 16:9 viewport rectangle; expected ${JSON.stringify(compactRect(expected))}, saw ${JSON.stringify(compactRect(report.stageRect))}, delta ${JSON.stringify(compactRect(delta))}`,
        );
      }
    }
    if (report.brokenImages?.length) failures.push(`${named}: broken images: ${report.brokenImages.map((img) => img.src).join(', ')}`);

    reports.push({
      viewport,
      activeTitle: report.activeTitle,
      stageRect: report.stageRect ? compactRect(report.stageRect) : null,
      expectedStageRect: compactRect(expectedStageRect(viewport)),
      controlsOverlap: report.controlsOverlap ? Number(report.controlsOverlap.toFixed(2)) : 0,
      activeCount: report.activeCount,
      activeClassCount: report.activeClassCount,
    });

    await page.keyboard.press('End');
    await page.waitForTimeout(80);
    const afterEnd = await page.evaluate(() => ({
      displayed: Array.from(document.querySelectorAll('.slide')).filter((slide) => {
        const style = getComputedStyle(slide);
        const rect = slide.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0.01 && rect.width > 0 && rect.height > 0;
      }).length,
      active: document.querySelectorAll('.slide.active').length,
    }));
    if (afterEnd.displayed !== 1 || afterEnd.active !== 1) {
      failures.push(`${named}: End key navigation left displayed=${afterEnd.displayed}, active=${afterEnd.active}`);
    }

    for (let i = 0; i < 12; i += 1) await page.keyboard.press(i % 2 === 0 ? 'ArrowLeft' : 'ArrowRight');
    await page.waitForTimeout(80);
    const afterRapid = await page.evaluate(() => ({
      displayed: Array.from(document.querySelectorAll('.slide')).filter((slide) => {
        const style = getComputedStyle(slide);
        const rect = slide.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0.01 && rect.width > 0 && rect.height > 0;
      }).length,
      active: document.querySelectorAll('.slide.active').length,
    }));
    if (afterRapid.displayed !== 1 || afterRapid.active !== 1) {
      failures.push(`${named}: rapid navigation left displayed=${afterRapid.displayed}, active=${afterRapid.active}`);
    }

    await page.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error('HTML PPT stage verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('\nReports:');
  console.error(JSON.stringify(reports, null, 2));
  process.exit(1);
}

console.log('HTML PPT stage verification passed:');
console.log(JSON.stringify(reports, null, 2));
