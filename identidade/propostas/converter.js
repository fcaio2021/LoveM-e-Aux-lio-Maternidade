// Converte a imagem de origem (JPEG/PNG) num PNG limpo, via canvas do Chromium.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const origem = process.argv[2];
const destino = process.argv[3];
if (!origem || !destino) { console.error('uso: node converter.js <origem> <destino.png>'); process.exit(1); }

(async () => {
  const ext = path.extname(origem).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  const src = `data:${mime};base64,` + fs.readFileSync(origem).toString('base64');
  const b = await chromium.launch();
  const p = await b.newPage();
  const dados = await p.evaluate(async (src) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    c.getContext('2d').drawImage(img, 0, 0);
    return { url: c.toDataURL('image/png'), w: c.width, h: c.height };
  }, src);
  fs.writeFileSync(destino, Buffer.from(dados.url.split(',')[1], 'base64'));
  console.log(`${dados.w}x${dados.h} -> ${path.basename(destino)}`);
  await b.close();
})();
