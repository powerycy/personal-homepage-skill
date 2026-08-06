#!/usr/bin/env node

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const targets = process.argv.slice(2).map((value) => path.resolve(value));
if (!targets.length) {
  console.error("Usage: test-export-html.mjs <deck.html> [more.html]");
  process.exit(2);
}

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const target of targets) {
    const qaRoot = await fs.mkdtemp(path.join(os.tmpdir(), "homepage-html-export-"));
    const context = await browser.newContext({ acceptDownloads: true });
    const page = await context.newPage();
    await page.goto(pathToFileURL(target).href);

    const editable = page.locator("[data-edit-id]").first();
    if ((await editable.count()) !== 1) throw new Error(`${target}: no editable node`);

    const marker = `__EXPORT_TEST_${Date.now()}__`;
    await editable.evaluate((element, value) => {
      element.innerHTML += value;
    }, marker);

    const exportButton = page.locator("#exportHtml");
    if ((await exportButton.count()) !== 1) throw new Error(`${target}: missing #exportHtml`);

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      exportButton.click({ force: true })
    ]);
    const exportedPath = path.join(qaRoot, download.suggestedFilename());
    await download.saveAs(exportedPath);

    const exportedSource = await fs.readFile(exportedPath, "utf8");
    if (!exportedSource.includes(marker)) throw new Error(`${target}: exported HTML missed edited text`);
    if (!/data-edit-version="export-\d+"/.test(exportedSource)) {
      throw new Error(`${target}: exported HTML missed unique edit version`);
    }

    const exportedPage = await context.newPage();
    await exportedPage.goto(pathToFileURL(exportedPath).href);
    const roundTripHtml = await exportedPage.locator("[data-edit-id]").first().innerHTML();
    if (!roundTripHtml.includes(marker)) throw new Error(`${target}: exported file did not retain edited text`);
    if ((await exportedPage.locator("#exportHtml").count()) !== 1) {
      throw new Error(`${target}: exported file cannot be re-exported`);
    }

    const [secondDownload] = await Promise.all([
      exportedPage.waitForEvent("download"),
      exportedPage.locator("#exportHtml").click({ force: true })
    ]);
    if (!secondDownload.suggestedFilename().endsWith(".html")) {
      throw new Error(`${target}: re-export did not produce HTML`);
    }

    results.push({
      target,
      exportedFile: path.basename(exportedPath),
      editedTextEmbedded: true,
      uniqueEditVersion: true,
      opensWithEdit: true,
      reExportWorks: true
    });
    await context.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
