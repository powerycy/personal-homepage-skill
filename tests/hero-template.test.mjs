import { createRequire } from 'node:module';
import { createServer } from 'vite';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const server = await createServer({ server: { host: '127.0.0.1' } });
await server.listen();

const address = server.httpServer.address();
const port = typeof address === 'object' && address ? address.port : 5173;
const target = `http://127.0.0.1:${port}/templates/hero/preview.html`;
const browser = await chromium.launch({ headless: true, channel: 'chromium' });
const failures = [];

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
    await page.waitForTimeout(1500);

    const state = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      sectionIds: Array.from(document.querySelectorAll('section, footer')).map((element) => element.id),
      brokenImages: Array.from(document.images).filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
      videoSources: Array.from(document.querySelectorAll('video')).map((video) => video.getAttribute('src')).filter(Boolean),
      notReadyVideos: Array.from(document.querySelectorAll('video')).filter((video) => video.readyState < 1).map((video) => video.getAttribute('src')),
      autoplayConfigured: Array.from(document.querySelectorAll('video')).filter((video) => video.autoplay && video.muted && video.loop && video.playsInline).length,
      footerPortraitVisible: Boolean(document.querySelector('#contact img[src]')),
      footerVideoCount: document.querySelectorAll('#contact video').length,
      portraitFallbackCount: document.querySelectorAll('.hero-portrait-fallback').length,
      profileVisible: document.body.innerText.includes('YOUR NAME'),
      ctas: Array.from(document.querySelectorAll('#top a')).map((link) => link.textContent?.trim()),
      unlabeledButtons: Array.from(document.querySelectorAll('button')).filter((button) => !(button.textContent || '').trim() && !button.getAttribute('aria-label')).length,
      editButton: Boolean(document.querySelector('[data-editor-control="toggle"]')),
      exportButton: Boolean(document.querySelector('#exportHtml, [data-editor-control="export"]')),
    }));

    if (state.overflow > 1) failures.push(`${viewport.name}: horizontal overflow ${state.overflow}px`);
    if (state.sectionIds.join(',') !== 'top,about,metrics,technology,architecture,contact') failures.push(`${viewport.name}: unexpected section structure ${state.sectionIds.join(',')}`);
    if (state.brokenImages.length) failures.push(`${viewport.name}: broken images ${state.brokenImages.join(', ')}`);
    if (state.videoSources.length !== 4) failures.push(`${viewport.name}: expected 4 active bundled videos, found ${state.videoSources.length}`);
    if (state.notReadyVideos.length) failures.push(`${viewport.name}: video metadata did not load ${state.notReadyVideos.join(', ')}`);
    if (state.autoplayConfigured !== 3) failures.push(`${viewport.name}: expected three autoplay-configured background videos, found ${state.autoplayConfigured}`);
    if (!state.footerPortraitVisible || state.footerVideoCount !== 0) failures.push(`${viewport.name}: footer must use the final-source static portrait by default`);
    if (state.portraitFallbackCount !== 0) failures.push(`${viewport.name}: obsolete portrait fallback shape is still rendered`);
    if (!state.profileVisible) failures.push(`${viewport.name}: personal identity placeholder is not visible`);
    if (!state.ctas.includes('Explore the system') || !state.ctas.includes('Meet the builder')) failures.push(`${viewport.name}: hero CTAs are incomplete`);
    if (state.unlabeledButtons) failures.push(`${viewport.name}: ${state.unlabeledButtons} unlabeled buttons`);
    if (!state.editButton || !state.exportButton) failures.push(`${viewport.name}: portable editing controls are missing`);
    if (errors.length) failures.push(`${viewport.name}: console errors ${errors.join(' | ')}`);

    await page.mouse.click(viewport.width - 12, Math.floor(viewport.height / 2));
    await page.waitForTimeout(350);

    if (viewport.name === 'desktop') {
      const heroVideo = page.locator('#top video');
      await page.mouse.move(120, 120);
      await page.mouse.move(960, 120);
      await page.waitForTimeout(250);
      const scrubbedTime = await heroVideo.evaluate((video) => video.currentTime);
      if (scrubbedTime <= 0) failures.push('desktop: hero mouse scrub did not advance the original video');
    }

    const menuButton = page.getByRole('button', { name: 'Open navigation menu' }).last();
    await menuButton.click();
    await page.getByRole('button', { name: 'Metrics' }).click();
    await page.waitForTimeout(450);
    if (!page.url().endsWith('#metrics')) failures.push(`${viewport.name}: Metrics navigation did not update the target`);
    const metricsPlaying = await page.locator('#metrics video').evaluate((video) => !video.paused && video.currentTime > 0);
    if (!metricsPlaying) failures.push(`${viewport.name}: metrics video did not play when scrolled into view`);
    await page.close();
  }
} finally {
  await browser.close();
  await server.close();
}

if (failures.length) {
  console.error('Hero template regression failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Hero template regression passed: desktop/mobile rendering, fallbacks, navigation, identity, assets, and accessibility checks are clean.');
