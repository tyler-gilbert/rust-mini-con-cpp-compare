import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(new URL('../reveal.js/package.json', import.meta.url));
const { launch } = await import(require.resolve('puppeteer'));
const presentationDir = fileURLToPath(new URL('../reveal.js/presentation/', import.meta.url));
const outputPath = fileURLToPath(new URL('./presentation.pdf', import.meta.url));
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const filePath = resolve(presentationDir, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!filePath.startsWith(`${presentationDir}${sep}`)) {
      response.writeHead(403).end('Forbidden');
      return;
    }

    const content = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream',
    });
    response.end(content);
  } catch {
    response.writeHead(404).end('Not found');
  }
});

let browser;
try {
  await new Promise((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(0, '127.0.0.1', resolveListen);
  });

  browser = await launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(`http://127.0.0.1:${server.address().port}/?print-pdf`, {
    waitUntil: 'networkidle0',
  });
  await page.waitForFunction(
    () =>
      document.documentElement.classList.contains('reveal-print') &&
      document.querySelector('.slides .pdf-page'),
    { timeout: 30000 },
  );
  await page.pdf({ path: outputPath, printBackground: true, preferCSSPageSize: true });
  console.log(`PDF exported to ${outputPath}`);
} finally {
  if (browser) await browser.close();
  if (server.listening) {
    await new Promise((resolveClose) => server.close(resolveClose));
  }
}
