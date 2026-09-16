// Gera public/og-image.jpg (1200×630): a imagem que aparece quando o link do
// site é colado no WhatsApp, Instagram ou Facebook.
// Uso (da pasta site/): NODE_PATH=../identidade/propostas/node_modules node imagem-compartilhamento/render.cjs
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto(pathToFileURL(path.join(__dirname, 'og.html')).href, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(__dirname, '..', 'public', 'og-image.jpg'), type: 'jpeg', quality: 86 });
  await b.close();
})();
