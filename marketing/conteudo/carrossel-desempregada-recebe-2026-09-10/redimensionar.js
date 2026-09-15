// Reduz a foto de referência pro tamanho útil do slide, via canvas do Chromium
// (evita dependência nova só pra decodificar JPEG). A imagem entra como data URI
// porque uma página about:blank não tem permissão de ler file://.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ORIGEM = path.resolve(__dirname, '../../referencias/carrosseis/Foto mulher grávida para referência nas imagens.jpg');
const DESTINO = path.join(__dirname, 'foto-gravida.jpg');
const LARGURA = 2160; // 2x a largura do slide, sobra pra recorte

(async () => {
  const src = 'data:image/jpeg;base64,' + fs.readFileSync(ORIGEM).toString('base64');
  const b = await chromium.launch();
  const p = await b.newPage();
  const dados = await p.evaluate(async ({ src, largura }) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const escala = largura / img.naturalWidth;
    const c = document.createElement('canvas');
    c.width = largura;
    c.height = Math.round(img.naturalHeight * escala);
    const ctx = c.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return {
      url: c.toDataURL('image/jpeg', 0.88),
      w: img.naturalWidth, h: img.naturalHeight,
      nw: c.width, nh: c.height,
    };
  }, { src, largura: LARGURA });

  fs.writeFileSync(DESTINO, Buffer.from(dados.url.split(',')[1], 'base64'));
  const kb = (fs.statSync(DESTINO).size / 1024).toFixed(0);
  console.log(`${dados.w}x${dados.h} -> ${dados.nw}x${dados.nh}  (${kb} KB)`);
  await b.close();
})();
