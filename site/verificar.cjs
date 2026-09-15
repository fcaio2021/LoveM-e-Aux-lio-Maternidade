const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const url = 'http://localhost:4323/';
  const b = await chromium.launch();
  const saida = __dirname;

  // Desktop
  const d = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await d.goto(url, { waitUntil: 'networkidle' });
  await d.evaluate(() => document.fonts.ready);
  await d.waitForTimeout(900);
  await d.screenshot({ path: path.join(saida, 'preview-desktop.png'), fullPage: true });

  // Celular — largura crítica
  const m = await b.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto(url, { waitUntil: 'networkidle' });
  await m.evaluate(() => document.fonts.ready);
  await m.waitForTimeout(900);
  await m.screenshot({ path: path.join(saida, 'preview-celular.png'), fullPage: true });

  const diag = await m.evaluate(() => {
    const doc = document.documentElement;
    const estouros = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > doc.clientWidth + 1 || r.left < -1)) {
        estouros.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]}`);
      }
    });
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      estouros: [...new Set(estouros)].slice(0, 10),
      fontesOk: document.fonts.check('800 40px Nunito') && document.fonts.check('40px Parisienne'),
    };
  });
  console.log(JSON.stringify(diag, null, 2));
  await b.close();
})();
