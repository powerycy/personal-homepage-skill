import { cp, mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, extname, join, resolve } from 'node:path';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'templates/hero/portable');
const scratch = await mkdtemp(join(tmpdir(), 'hero-portable-'));

function assetPath(assetInfo) {
  const extension = extname(assetInfo.name || '').toLowerCase();
  if (extension === '.css') return 'assets/hero.css';
  if (extension === '.mp4') return 'assets/videos/[name][extname]';
  if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(extension)) return 'assets/images/[name][extname]';
  return 'assets/[name][extname]';
}

function portableMediaPlugin() {
  const virtualId = '\0hero-portable-media';
  return {
    name: 'hero-portable-media',
    enforce: 'pre',
    resolveId(source, importer) {
      if ((source === './videos' || source === './videos.ts') && importer?.includes('/templates/hero/')) return virtualId;
      return null;
    },
    load(id) {
      if (id !== virtualId) return null;
      return `
        export const VIDEOS = {
          hero: './assets/videos/hero.mp4',
          cinematicText: './assets/videos/cinematic-text.mp4',
          metrics: './assets/videos/metrics.mp4',
          technology: './assets/videos/technology.mp4',
          footer: './assets/videos/footer.mp4',
        };
        export const IMAGES = { footerPortrait: './assets/images/portrait.jpg' };
        export const TEMPLATE_OPTIONS = { footerMedia: 'image' };
      `;
    },
  };
}

try {
  await build({
    root,
    configFile: false,
    plugins: [portableMediaPlugin(), react()],
    base: './',
    define: { 'process.env.NODE_ENV': JSON.stringify('production') },
    build: {
      outDir: scratch,
      emptyOutDir: true,
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      lib: {
        entry: resolve(root, 'templates/hero/preview.tsx'),
        name: 'HeroPortable',
        formats: ['iife'],
        fileName: () => 'assets/hero.js',
      },
      rollupOptions: {
        output: { assetFileNames: assetPath },
      },
    },
  });

  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await cp(scratch, output, { recursive: true });
  await cp(resolve(root, 'templates/hero/assets/videos'), resolve(output, 'assets/videos'), { recursive: true });
  await cp(resolve(root, 'templates/hero/assets/images'), resolve(output, 'assets/images'), { recursive: true });

  const files = await readdir(resolve(output, 'assets'));
  const cssFile = files.find((file) => file.endsWith('.css'));
  const jsFile = files.find((file) => file.endsWith('.js'));
  if (!cssFile || !jsFile) throw new Error('Portable build did not produce its JavaScript and CSS bundles.');

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Cinematic neural-AI personal homepage" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='24' fill='%23000'/%3E%3Ccircle cx='50' cy='50' r='22' fill='none' stroke='%23fff' stroke-width='9'/%3E%3C/svg%3E" />
    <link rel="stylesheet" href="./assets/${basename(cssFile)}" />
    <title>SynapseX — Cinematic Hero Template</title>
  </head>
  <body>
    <div id="root"></div>
    <script defer src="./assets/${basename(jsFile)}"></script>
  </body>
</html>
`;

  const guide = `Hero 便携主页
================

1. 双击 index.html 即可打开，不需要安装任何软件，也不需要启动服务器。
2. 分享时请发送整个 portable 文件夹，不能只发送 index.html。
3. 推荐先压缩为 ZIP 再发送，避免 assets 附件遗漏。
4. 视频位于 assets/videos，静态照片位于 assets/images。
5. 如果浏览器拦截本地视频自动播放，点击页面一次即可恢复播放。

开发和修改源码请使用上一级 Hero 模版，不要直接修改压缩后的 hero.js。
`;

  await writeFile(resolve(output, 'index.html'), html, 'utf8');
  await writeFile(resolve(output, '使用说明.txt'), guide, 'utf8');

  const bundle = await readFile(resolve(output, 'assets', jsFile), 'utf8');
  if (/^\s*import\s/m.test(bundle) || /type=["']module/.test(bundle)) throw new Error('Portable JavaScript still contains module syntax.');

  console.log(`Hero portable package built at ${output}`);
} finally {
  await rm(scratch, { recursive: true, force: true });
}
