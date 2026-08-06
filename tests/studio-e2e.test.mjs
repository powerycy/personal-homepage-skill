import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { chromium } from 'playwright';

const appUrl = process.env.STUDIO_URL || 'http://127.0.0.1:5173/';
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
console.log('studio-e2e: launching browser');
const browser = await chromium.launch({ headless: true, ...(existsSync(chromePath) ? { executablePath: chromePath } : {}) });
const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
let exportServer;

try {
  await page.goto(appUrl, { waitUntil: 'domcontentloaded' });
  console.log('studio-e2e: app loaded');
  await page.getByLabel('姓名 / 昵称', { exact: true }).fill('导出往返测试');
  await page.getByLabel('一句话定位', { exact: true }).fill('这句话必须写进导出的独立网页。');
  assert.equal(await page.locator('[data-edit-id="hero-name"]').innerText(), '导出往返测试');

  await page.getByRole('tab', { name: '02 选择表达方式' }).click();
  await page.getByRole('button', { name: /Sunlit \/ 日光房/ }).click();
  assert.ok((await page.locator('.homepage-preview').getAttribute('class')).includes('theme-sunlit'));

  await page.getByRole('tab', { name: '03 编辑并导出' }).click();
  await page.getByRole('button', { name: /开启在线编辑/ }).click();
  const editableTagline = page.locator('[data-edit-id="hero-tagline"]');
  assert.equal(await editableTagline.getAttribute('contenteditable'), 'true');
  await editableTagline.fill('在线编辑后的真实文案。');
  await editableTagline.blur();
  console.log('studio-e2e: inline edit passed');

  const firstDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: /导出独立 HTML/ }).click();
  const firstFile = await (await firstDownload).path();
  assert.ok(firstFile, 'first export should have a local download path');
  const firstHtml = await readFile(firstFile, 'utf8');
  assert.match(firstHtml, /在线编辑后的真实文案。/);
  assert.match(firstHtml, /data-edit-version=/);
  assert.match(firstHtml, /id="edit-toggle"/);
  assert.match(firstHtml, /id="export-button"/);
  assert.doesNotMatch(firstHtml, /Rarity score/);
  console.log('studio-e2e: first export passed');

  exportServer = createServer((_request, response) => {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end(firstHtml);
  });
  await new Promise((resolve) => exportServer.listen(0, '127.0.0.1', resolve));
  const address = exportServer.address();
  assert.ok(address && typeof address === 'object');
  const exported = await context.newPage();
  await exported.goto(`http://127.0.0.1:${address.port}/exported.html`, { waitUntil: 'commit' });
  await exported.locator('#edit-toggle').waitFor({ state: 'attached' });
  await exported.locator('#edit-toggle').click();
  const exportedName = exported.locator('[data-edit-id="hero-name"]');
  await exportedName.fill('二次导出仍然可编辑');
  await exportedName.blur();
  const secondDownload = exported.waitForEvent('download');
  await exported.locator('#export-button').click();
  const secondFile = await (await secondDownload).path();
  assert.ok(secondFile, 'second export should have a local download path');
  const secondHtml = await readFile(secondFile, 'utf8');
  assert.match(secondHtml, /二次导出仍然可编辑/);
  assert.match(secondHtml, /data-edit-version=/);
  console.log('studio-e2e: export round trip passed');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(appUrl, { waitUntil: 'domcontentloaded' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.equal(overflow, 0, 'mobile page should not overflow horizontally');

  console.log('studio-e2e: PASS');
} finally {
  if (exportServer) await new Promise((resolve) => exportServer.close(resolve));
  await browser.close();
}
