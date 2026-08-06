#!/usr/bin/env node
import { existsSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { basename, isAbsolute, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const EXIT_VALIDATION = 1;
const EXIT_ENVIRONMENT = 2;
const STAGE_WIDTH = 1920;
const STAGE_HEIGHT = 1080;
const RECT_TOLERANCE = 2;

function usage(message = '') {
  if (message) console.error(message);
  console.error('Usage: node scripts/verify-html-ppt-stage.mjs <html-file-or-url> [--screenshots <dir>] [--viewport <WIDTHxHEIGHT>]');
  process.exit(EXIT_ENVIRONMENT);
}

const args = process.argv.slice(2);
if (!args.length || args.includes('--help') || args.includes('-h')) usage();
const target = args[0];
const screenshotFlagIndex = args.indexOf('--screenshots');
const screenshotDir = screenshotFlagIndex >= 0 ? args[screenshotFlagIndex + 1] : '';
const viewportFlagIndex = args.indexOf('--viewport');
const viewportValue = viewportFlagIndex >= 0 ? args[viewportFlagIndex + 1] : '';
if (screenshotFlagIndex >= 0 && !screenshotDir) usage('Missing directory after --screenshots.');
if (viewportFlagIndex >= 0 && !/^\d+x\d+$/.test(viewportValue)) usage('--viewport must use WIDTHxHEIGHT, for example 1920x1080.');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (error) {
  console.error('Playwright is required. Run the project package install, then `playwright install chromium`.');
  console.error(error.message);
  process.exit(EXIT_ENVIRONMENT);
}

function targetUrl(value) {
  if (/^https?:\/\//.test(value) || value.startsWith('file://')) return value;
  const absolute = isAbsolute(value) ? value : resolve(process.cwd(), value);
  if (!existsSync(absolute)) usage(`Target does not exist: ${absolute}`);
  return pathToFileURL(absolute).href;
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

function compactRect(rect) {
  return Object.fromEntries(Object.entries(rect).map(([key, value]) => [key, Number(value.toFixed(2))]));
}

function rectWithinTolerance(actual, expected) {
  return ['left', 'top', 'right', 'bottom', 'width', 'height']
    .every((key) => Math.abs(actual[key] - expected[key]) <= RECT_TOLERANCE);
}

function slideStateScript() {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const stage = document.querySelector('.stage');
  const stageRect = stage?.getBoundingClientRect();
  const intersects = (a, b) => Boolean(a && b && a.right > b.left && a.left < b.right && a.bottom > b.top && a.top < b.bottom);
  const effectiveOpacity = (element) => {
    let value = 1;
    for (let node = element; node instanceof Element; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.display === 'none') return 0;
      value *= Number(style.opacity);
    }
    return value;
  };
  const isPainted = (slide) => {
    const style = getComputedStyle(slide);
    const rect = slide.getBoundingClientRect();
    const hasVisibleContent = style.visibility !== 'hidden' || Array.from(slide.querySelectorAll('*')).some((child) => getComputedStyle(child).visibility === 'visible');
    return hasVisibleContent && effectiveOpacity(slide) > 0.01 && rect.width > 0 && rect.height > 0 && intersects(rect, stageRect) && intersects(rect, { left: 0, top: 0, right: innerWidth, bottom: innerHeight });
  };
  const painted = slides.filter(isPainted);
  const activeSlides = slides.filter((slide) => slide.classList.contains('active'));
  const counter = document.querySelector('[data-slide-counter], .slide-counter, .counter, #slideCounter, #counter');
  const counterNumbers = counter?.textContent?.match(/\d+/g)?.map(Number) || [];
  return {
    painted: painted.length,
    active: activeSlides.length,
    paintedIndex: painted.length === 1 ? slides.indexOf(painted[0]) : -1,
    activeIndex: activeSlides.length === 1 ? slides.indexOf(activeSlides[0]) : -1,
    paintedId: painted.length === 1 ? (painted[0].dataset.slideId || '').trim() : '',
    counterCurrent: counterNumbers[0] ?? null,
    counterTotal: counterNumbers[1] ?? null,
  };
}

function editStateScript() {
  const toggle = document.querySelector('.edit-toggle');
  const editableCount = document.querySelectorAll('[contenteditable="true"]:not([data-ppt-probe])').length;
  return {
    active: document.body.classList.contains('editing') || toggle?.getAttribute('aria-pressed') === 'true' || editableCount > 0,
    editableCount,
  };
}

async function pressAndRead(page, key) {
  await page.keyboard.press(key);
  await page.waitForTimeout(30);
  return page.evaluate(slideStateScript);
}

async function lastKeyPrevented(page) {
  return page.evaluate(() => window.__pptKeyEvents?.at(-1)?.prevented || false);
}

async function testShortcuts(page, slideCount) {
  const failed = [];
  const stateIsValid = (state, expectedIndex) => state.painted === 1
    && state.active === 1
    && state.paintedIndex === expectedIndex
    && state.activeIndex === expectedIndex
    && state.counterCurrent === expectedIndex + 1
    && state.counterTotal === slideCount;
  if (slideCount >= 2) {
    const cases = [
      ['Home', 0], ['ArrowRight', 1], ['ArrowLeft', 0], ['ArrowDown', 1], ['ArrowUp', 0],
      ['PageDown', 1], ['PageUp', 0], ['Space', 1], ['Home', 0], ['End', slideCount - 1],
    ];
    for (const [key, expectedIndex] of cases) {
      const state = await pressAndRead(page, key);
      if (state.counterCurrent !== expectedIndex + 1 || state.counterTotal !== slideCount) failed.push(`slide counter mismatch: ${key}`);
      else if (!stateIsValid(state, expectedIndex)) failed.push(key);
    }
  } else if (slideCount === 1) {
    for (const key of ['ArrowRight', 'ArrowDown', 'Space', 'PageDown', 'End', 'ArrowLeft', 'ArrowUp', 'PageUp', 'Home']) {
      await page.evaluate(() => document.activeElement?.blur());
      const state = await pressAndRead(page, key);
      if (!stateIsValid(state, 0) || !(await lastKeyPrevented(page))) failed.push(key);
    }
  }

  const contexts = ['input', 'textarea', 'select', 'contenteditable'];
  const isolationCases = slideCount >= 2
    ? [['ArrowRight', 0], ['ArrowDown', 0], ['Space', 0], ['PageDown', 0], ['End', 0], ['ArrowLeft', slideCount - 1], ['ArrowUp', slideCount - 1], ['PageUp', slideCount - 1], ['Home', slideCount - 1]]
    : [['ArrowRight', 0], ['ArrowDown', 0], ['Space', 0], ['PageDown', 0], ['End', 0], ['ArrowLeft', 0], ['ArrowUp', 0], ['PageUp', 0], ['Home', 0]];
  for (const context of contexts) {
    await page.evaluate((kind) => {
      const probe = document.createElement(kind === 'contenteditable' ? 'div' : kind);
      probe.dataset.pptProbe = kind;
      if (kind === 'contenteditable') probe.contentEditable = 'true';
      if (kind === 'select') probe.appendChild(new Option('one', 'one'));
      probe.style.position = 'fixed';
      probe.style.left = '-9999px';
      document.body.appendChild(probe);
    }, context);
    for (const [key, startIndex] of isolationCases) {
      await page.evaluate(() => document.activeElement?.blur());
      if (slideCount >= 2) await page.keyboard.press(startIndex === 0 ? 'Home' : 'End');
      await page.locator(`[data-ppt-probe="${context}"]`).focus();
      await page.keyboard.press(key);
      await page.waitForTimeout(20);
      const state = await page.evaluate(slideStateScript);
      if (!stateIsValid(state, startIndex) || await lastKeyPrevented(page)) failed.push(`editable/input context isolation: ${context} ${key}`);
    }
    const editBefore = await page.evaluate(editStateScript);
    await page.locator(`[data-ppt-probe="${context}"]`).focus();
    await page.keyboard.press('KeyE');
    await page.waitForTimeout(20);
    const editAfter = await page.evaluate(editStateScript);
    if (editBefore.active !== editAfter.active || await lastKeyPrevented(page)) failed.push(`editable/input context isolation: ${context} E`);
    await page.locator(`[data-ppt-probe="${context}"]`).evaluate((element) => element.remove());
  }

  const fullscreenBefore = await page.evaluate(() => window.__pptFullscreenCalls || 0);
  await page.keyboard.press('KeyF');
  await page.waitForTimeout(30);
  const fullscreenEntered = await page.evaluate(() => ({ calls: window.__pptFullscreenCalls || 0, active: window.__pptFullscreenActive || false }));
  const fullscreenSlide = await page.evaluate(slideStateScript);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(30);
  const fullscreenEscaped = await page.evaluate(() => ({ active: window.__pptFullscreenActive || false }));
  const afterFullscreenEscSlide = await page.evaluate(slideStateScript);
  await page.keyboard.press('KeyF');
  await page.waitForTimeout(30);
  const fullscreenReentered = await page.evaluate(() => ({ calls: window.__pptFullscreenCalls || 0, active: window.__pptFullscreenActive || false }));
  await page.keyboard.press('KeyF');
  await page.waitForTimeout(30);
  const fullscreenExited = await page.evaluate(() => ({ calls: window.__pptFullscreenCalls || 0, active: window.__pptFullscreenActive || false }));
  if (fullscreenEntered.calls !== fullscreenBefore + 1 || !fullscreenEntered.active) failed.push('F fullscreen enter behavior');
  if (fullscreenEscaped.active || fullscreenSlide.paintedId !== afterFullscreenEscSlide.paintedId) failed.push('Esc fullscreen exit behavior');
  if (fullscreenReentered.calls !== fullscreenBefore + 2 || !fullscreenReentered.active || fullscreenExited.calls !== fullscreenBefore + 3 || fullscreenExited.active) failed.push('F fullscreen toggle behavior');

  await page.evaluate(() => document.activeElement?.blur());
  await page.keyboard.press('KeyE');
  await page.waitForTimeout(30);
  if (!(await page.evaluate(editStateScript)).active) failed.push('E enter editing behavior');
  await page.evaluate(() => document.activeElement?.blur());
  await page.keyboard.press('KeyE');
  await page.waitForTimeout(30);
  if ((await page.evaluate(editStateScript)).active) failed.push('E exit editing behavior');

  await page.keyboard.press('KeyE');
  await page.waitForTimeout(20);
  const beforeEscSlide = await page.evaluate(slideStateScript);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(30);
  const afterEscSlide = await page.evaluate(slideStateScript);
  if ((await page.evaluate(editStateScript)).active || beforeEscSlide.paintedId !== afterEscSlide.paintedId) failed.push('Esc exit editing behavior');

  await page.keyboard.press('KeyE');
  await page.waitForTimeout(20);
  const editable = page.locator('[contenteditable="true"]:not([data-ppt-probe])').first();
  if (await editable.count()) {
    await editable.evaluate((element) => { element.innerHTML += '<span data-ppt-save-marker>saved marker</span>'; });
    const storageBefore = await page.evaluate(() => JSON.stringify(localStorage));
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+KeyS' : 'Control+KeyS');
    await page.waitForTimeout(30);
    const storageAfter = await page.evaluate(() => JSON.stringify(localStorage));
    if (storageBefore === storageAfter || !(await lastKeyPrevented(page))) failed.push('save shortcut persistence behavior');
  } else {
    failed.push('save shortcut persistence behavior');
  }
  await page.keyboard.press('Escape');
  return { failed, navigationSingleSlide: slideCount === 1 };
}

async function scanTransformConflicts(page, slideCount) {
  const conflicts = [];
  await page.keyboard.press('Home');
  for (let index = 0; index < slideCount; index += 1) {
    if (index > 0) await page.keyboard.press('PageDown');
    await page.waitForTimeout(30);
    const found = await page.evaluate(() => {
      const active = document.querySelector('.slide.active');
      const targets = [document.querySelector('.stage'), ...Array.from(active?.querySelectorAll('[data-layout-layer]') || [])].filter(Boolean);
      return targets.flatMap((element) => element.getAnimations().flatMap((animation) => {
        const keyframes = animation.effect?.getKeyframes?.() || [];
        if (!keyframes.some((frame) => Object.prototype.hasOwnProperty.call(frame, 'transform'))) return [];
        return [{
          slideId: element.closest('.slide')?.dataset.slideId?.trim() || 'stage',
          element: element.matches('.stage') ? '.stage' : '[data-layout-layer]',
          animation: animation.animationName || animation.id || 'anonymous',
        }];
      }));
    });
    conflicts.push(...found);
  }
  return [...new Map(conflicts.map((item) => [`${item.slideId}:${item.element}:${item.animation}`, item])).values()];
}

const defaultViewports = [
  { width: 1280, height: 720 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];
const viewports = viewportValue
  ? [{ width: Number(viewportValue.split('x')[0]), height: Number(viewportValue.split('x')[1]) }]
  : defaultViewports;
const failures = [];
const reports = [];
let browser;

try {
  browser = await chromium.launch({ headless: true });
} catch (error) {
  console.error('Playwright could not launch Chromium. Run `playwright install chromium`.');
  console.error(error.message);
  process.exit(EXIT_ENVIRONMENT);
}

try {
  if (screenshotDir) {
    try {
      mkdirSync(screenshotDir, { recursive: true });
    } catch (error) {
      console.error(`Could not create screenshot directory: ${error.message}`);
      await browser.close();
      process.exit(EXIT_ENVIRONMENT);
    }
  }

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    const consoleErrors = [];
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
    page.on('pageerror', (error) => consoleErrors.push(error.message));
    await page.addInitScript(() => {
      window.__pptKeyEvents = [];
      window.__pptFullscreenCalls = 0;
      window.__pptFullscreenActive = false;
      document.addEventListener('keydown', (event) => {
        requestAnimationFrame(() => {
          window.__pptKeyEvents.push({ key: event.key, prevented: event.defaultPrevented });
          if (event.key === 'Escape' && window.__pptFullscreenActive) window.__pptFullscreenActive = false;
        });
      });
      Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, get: () => true });
      Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => window.__pptFullscreenActive ? document.documentElement : null });
      Element.prototype.requestFullscreen = async function requestFullscreen() { window.__pptFullscreenCalls += 1; window.__pptFullscreenActive = true; };
      Document.prototype.exitFullscreen = async function exitFullscreen() { window.__pptFullscreenCalls += 1; window.__pptFullscreenActive = false; };
    });
    await page.goto(targetUrl(target), { waitUntil: 'load' });
    await page.waitForTimeout(250);

    const report = await page.evaluate(() => {
      const state = (() => {
        const slides = Array.from(document.querySelectorAll('.slide'));
        const stage = document.querySelector('.stage');
        const stageRect = stage?.getBoundingClientRect();
        const intersects = (a, b) => Boolean(a && b && a.right > b.left && a.left < b.right && a.bottom > b.top && a.top < b.bottom);
        const effectiveOpacity = (element) => {
          let value = 1;
          for (let node = element; node instanceof Element; node = node.parentElement) {
            const style = getComputedStyle(node);
            if (style.display === 'none') return 0;
            value *= Number(style.opacity);
          }
          return value;
        };
        const isPainted = (slide) => {
          const style = getComputedStyle(slide);
          const rect = slide.getBoundingClientRect();
          const hasVisibleContent = style.visibility !== 'hidden' || Array.from(slide.querySelectorAll('*')).some((child) => getComputedStyle(child).visibility === 'visible');
          return hasVisibleContent && effectiveOpacity(slide) > 0.01 && rect.width > 0 && rect.height > 0 && intersects(rect, stageRect) && intersects(rect, { left: 0, top: 0, right: innerWidth, bottom: innerHeight });
        };
        const painted = slides.filter(isPainted);
        return { painted: painted.length, active: slides.filter((slide) => slide.classList.contains('active')).length };
      })();
      const stage = document.querySelector('.stage');
      const slides = Array.from(document.querySelectorAll('.slide'));
      const metadata = slides.map((slide, index) => ({
        index,
        id: (slide.dataset.slideId || '').trim(),
        originalNumber: (slide.dataset.originalNumber || '').trim(),
        title: (slide.dataset.slideTitle || '').trim(),
      }));
      const duplicateIds = [...new Set(metadata.map((item) => item.id).filter((id, index, ids) => id && ids.indexOf(id) !== index))];
      const missingMetadata = metadata.filter((item) => !item.id || !item.originalNumber || !item.title);
      const brokenImages = Array.from(document.images)
        .filter((img) => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0)
        .map((img) => ({ src: img.getAttribute('src') || '', slideId: img.closest('.slide')?.dataset.slideId || 'unknown' }));
      if (!stage) return { ...state, missingStage: true, metadata, duplicateIds, missingMetadata, brokenImages };
      const rect = stage.getBoundingClientRect();
      return {
        ...state,
        missingStage: false,
        slideCount: slides.length,
        metadata,
        duplicateIds,
        missingMetadata,
        brokenImages,
        internalStageSize: { width: stage.offsetWidth, height: stage.offsetHeight },
        stageRect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height },
      };
    });
    Object.assign(report, await page.evaluate(slideStateScript));

    const named = `${viewport.width}x${viewport.height}`;
    if (report.missingStage) failures.push(`${named}: missing .stage element`);
    if (report.painted !== 1 || report.active !== 1) failures.push(`${named}: expected exactly one painted slide and one active slide, saw painted=${report.painted}, active=${report.active}`);
    if (report.painted === 1 && report.active === 1 && report.paintedIndex !== report.activeIndex) failures.push(`${named}: painted slide and active slide differ`);
    if (report.counterCurrent !== report.paintedIndex + 1 || report.counterTotal !== report.slideCount) {
      failures.push(`${named}: slide counter mismatch; expected ${report.paintedIndex + 1}/${report.slideCount}, saw ${report.counterCurrent}/${report.counterTotal}`);
    }
    if (report.duplicateIds.length) failures.push(`${named}: duplicate data-slide-id: ${report.duplicateIds.join(', ')}`);
    if (report.missingMetadata.length) {
      failures.push(`${named}: missing slide metadata (data-slide-id, data-original-number, or data-slide-title) on DOM positions ${report.missingMetadata.map((item) => item.index + 1).join(', ')}`);
    }
    if (report.brokenImages.length) {
      failures.push(`${named}: broken images: ${report.brokenImages.map((image) => `${image.src} [slide ${image.slideId}]`).join(', ')}`);
    }
    if (!report.missingStage) {
      if (Math.abs(report.internalStageSize.width - STAGE_WIDTH) > 0.5 || Math.abs(report.internalStageSize.height - STAGE_HEIGHT) > 0.5) {
        failures.push(`${named}: internal stage size must be ${STAGE_WIDTH}x${STAGE_HEIGHT}, saw ${report.internalStageSize.width}x${report.internalStageSize.height}`);
      }
      const expected = expectedStageRect(viewport);
      if (!rectWithinTolerance(report.stageRect, expected)) {
        failures.push(`${named}: stage does not fill the maximum 16:9 viewport rectangle; expected ${JSON.stringify(compactRect(expected))}, saw ${JSON.stringify(compactRect(report.stageRect))}`);
      }
    }

    const shortcuts = await testShortcuts(page, report.slideCount || 0);
    if (shortcuts.failed.length) failures.push(`${named}: missing or ineffective shortcuts: ${shortcuts.failed.join(', ')}`);

    const transformConflicts = await scanTransformConflicts(page, report.slideCount || 0);
    if (transformConflicts.length) {
      failures.push(`${named}: layout/motion transform conflict: ${transformConflicts.map((item) => `${item.element} on ${item.slideId} (${item.animation})`).join(', ')}`);
    }

    const metadataAfterNavigation = await page.evaluate(() => Array.from(document.querySelectorAll('.slide')).map((slide, index) => ({
      index,
      id: (slide.dataset.slideId || '').trim(),
      originalNumber: (slide.dataset.originalNumber || '').trim(),
      title: (slide.dataset.slideTitle || '').trim(),
    })));
    if (JSON.stringify(metadataAfterNavigation) !== JSON.stringify(report.metadata)) {
      failures.push(`${named}: slide metadata changed during navigation`);
    }

    await page.keyboard.press('Home');
    await page.waitForTimeout(30);
    await page.evaluate(() => {
      for (let i = 0; i < 12; i += 1) {
        document.body.dispatchEvent(new KeyboardEvent('keydown', { key: i % 2 === 0 ? 'ArrowRight' : 'ArrowLeft', bubbles: true, cancelable: true }));
      }
    });
    await page.waitForTimeout(40);
    const rapidState = await page.evaluate(slideStateScript);
    if (rapidState.painted !== 1 || rapidState.active !== 1 || rapidState.paintedIndex !== rapidState.activeIndex) failures.push(`${named}: rapid navigation left painted=${rapidState.painted}, active=${rapidState.active}, paintedIndex=${rapidState.paintedIndex + 1}, activeIndex=${rapidState.activeIndex + 1}`);
    if ((report.slideCount || 0) >= 2 && rapidState.paintedIndex !== 0) failures.push(`${named}: rapid navigation ended on index ${rapidState.paintedIndex + 1}, expected 1`);
    if (rapidState.counterCurrent !== rapidState.paintedIndex + 1 || rapidState.counterTotal !== report.slideCount) failures.push(`${named}: slide counter mismatch after rapid navigation`);

    await page.evaluate(() => { location.hash = 'slide-999999'; });
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(80);
    const staleTargetState = await page.evaluate(slideStateScript);
    if (staleTargetState.painted !== 1 || staleTargetState.active !== 1 || staleTargetState.paintedIndex !== staleTargetState.activeIndex
      || staleTargetState.counterCurrent !== staleTargetState.paintedIndex + 1 || staleTargetState.counterTotal !== report.slideCount) {
      failures.push(`${named}: deleted/stale slide target did not fall back to a valid live slide`);
    }
    if (consoleErrors.length) failures.push(`${named}: browser console errors: ${consoleErrors.join(' | ')}`);

    if (screenshotDir) {
      try {
        await page.screenshot({ path: resolve(screenshotDir, `${basename(target).replace(/\W+/g, '-')}-${named}.png`) });
      } catch (error) {
        console.error(`Could not write verification screenshot: ${error.message}`);
        await page.close();
        await browser.close();
        process.exit(EXIT_ENVIRONMENT);
      }
    }
    reports.push({
      viewport,
      slideCount: report.slideCount,
      stageRect: report.stageRect ? compactRect(report.stageRect) : null,
      expectedStageRect: compactRect(expectedStageRect(viewport)),
      metadata: report.metadata,
      internalStageSize: report.internalStageSize,
      shortcuts,
      transformConflicts,
      metadataAfterNavigation,
      rapidState,
      staleTargetState,
    });
    await page.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error('HTML PPT stage verification failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  console.error(JSON.stringify(reports, null, 2));
  process.exit(EXIT_VALIDATION);
}

console.log('HTML PPT stage verification passed:');
console.log(JSON.stringify(reports, null, 2));
