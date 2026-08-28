#!/usr/bin/env node
// Export round-trip QA: modify an editable node, export, reopen the downloaded
// file, and verify edits plus re-export. Run without arguments to check every
// bundled template that ships the export control, or pass explicit HTML files
// (for example a page the skill just generated).

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";
const DEFAULT_TARGETS = [
  "templates/single-html/personal-homepage.html",
  "templates/presentation-html/presentation.html",
  "templates/hero/portable/index.html",
];

const args = process.argv.slice(2);
const targets = (args.length ? args : DEFAULT_TARGETS).map((value) =>
  path.resolve(import.meta.dirname, "..", value)
);

for (const target of targets) {
  const exists = await fs
    .access(target)
    .then(() => true)
    .catch(() => false);
  if (!exists) {
    console.error(`File not found: ${target}`);
    process.exit(2);
  }
}

const browser = await chromium.launch({ headless: true });
const results = [];

const exportButton = (page) =>
  page.locator('#exportHtml, [data-editor-control="export"]').first();

try {
  for (const target of targets) {
    const qaRoot = await fs.mkdtemp(path.join(os.tmpdir(), "homepage-html-export-"));
    const context = await browser.newContext({ acceptDownloads: true });
    const page = await context.newPage();
    // Placeholder warnings use confirm() before exporting; always accept in QA.
    page.on("dialog", (dialog) => dialog.accept());
    await page.goto(pathToFileURL(target).href);
    await page.locator("[data-edit-id]").first().waitFor({ state: "attached" });

    const editable = page.locator("[data-edit-id]").first();
    const marker = `__EXPORT_TEST_${Date.now()}__`;
    await editable.evaluate((element, value) => {
      element.innerHTML += value;
    }, marker);

    if ((await exportButton(page).count()) !== 1) {
      throw new Error(`${target}: missing export control (#exportHtml or [data-editor-control="export"])`);
    }

    // The control is hidden chrome (opacity 0, pointer-events none) until hover,
    // so dispatch a DOM click instead of a positional one.
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.evaluate(() => {
        document.querySelector('#exportHtml, [data-editor-control="export"]').click();
      })
    ]);
    const exportedPath = path.join(qaRoot, download.suggestedFilename());
    await download.saveAs(exportedPath);

    // Bundled folders (hero portable) reference sibling assets; copy them so the
    // exported file can boot its scripts and stay re-exportable.
    const sourceAssets = path.join(path.dirname(target), "assets");
    const hasAssets = await fs
      .access(sourceAssets)
      .then(() => true)
      .catch(() => false);
    if (hasAssets) {
      await fs.cp(sourceAssets, path.join(qaRoot, "assets"), { recursive: true });
    }

    const exportedSource = await fs.readFile(exportedPath, "utf8");
    if (!exportedSource.includes(marker)) throw new Error(`${target}: exported HTML missed edited text`);
    if (!/data-edit-version="export-\d+"/.test(exportedSource)) {
      throw new Error(`${target}: exported HTML missed unique edit version`);
    }

    const exportedPage = await context.newPage();
    exportedPage.on("dialog", (dialog) => dialog.accept());
    await exportedPage.goto(pathToFileURL(exportedPath).href);
    await exportedPage.locator("[data-edit-id]").first().waitFor({ state: "attached" });
    const roundTripHtml = await exportedPage.locator("[data-edit-id]").first().innerHTML();
    if (!roundTripHtml.includes(marker)) throw new Error(`${target}: exported file did not retain edited text`);
    if ((await exportButton(exportedPage).count()) !== 1) {
      throw new Error(`${target}: exported file cannot be re-exported`);
    }

    const [secondDownload] = await Promise.all([
      exportedPage.waitForEvent("download"),
      exportedPage.evaluate(() => {
        document.querySelector('#exportHtml, [data-editor-control="export"]').click();
      })
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
} catch (error) {
  console.error(error.message || error);
  process.exitCode = 1;
} finally {
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
if (process.exitCode) {
  console.error("Export round-trip failed for at least one target.");
}
