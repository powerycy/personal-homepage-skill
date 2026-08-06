#!/usr/bin/env node
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const url = process.env.STUDIO_URL || 'http://127.0.0.1:5173/';
const output = resolve(process.argv[2] || 'docs/hackathon2026/screenshots');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ headless: true, ...(existsSync(chromePath) ? { executablePath: chromePath } : {}) });
try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await desktop.goto(url, { waitUntil: 'domcontentloaded' });
  await desktop.evaluate(() => document.fonts?.ready);
  await desktop.screenshot({ path: resolve(output, '01-studio-desktop.png'), fullPage: false });
  await desktop.locator('.preview-panel').screenshot({ path: resolve(output, '02-live-preview.png') });
  await desktop.getByRole('tab', { name: '02 选择表达方式' }).click();
  await desktop.screenshot({ path: resolve(output, '03-style-switcher.png'), fullPage: false });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await mobile.goto(url, { waitUntil: 'domcontentloaded' });
  await mobile.evaluate(() => document.fonts?.ready);
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow !== 0) throw new Error(`mobile horizontal overflow: ${overflow}px`);
  await mobile.screenshot({ path: resolve(output, '04-studio-mobile.png'), fullPage: false });
  console.log(`Studio screenshots saved to ${output}`);
} finally {
  await browser.close();
}
