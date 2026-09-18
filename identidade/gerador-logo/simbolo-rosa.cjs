// Gera identidade/logo-simbolo-rosa.png: o coração chapado no rosa da marca.
// Serve de marca d'água nos fundos claros (o símbolo original é azul e rosa, e
// não dá o tom único). Usa o símbolo branco só como recorte (alfa).
// Uso: NODE_PATH=../../site/node_modules node simbolo-rosa.cjs
const sharp = require('sharp');
const path = require('path');
const entrada = path.join(__dirname, '..', 'logo-simbolo-branco.png');
const saida = path.join(__dirname, '..', 'logo-simbolo-rosa.png');

(async () => {
  const { width, height } = await sharp(entrada).metadata();
  await sharp({ create: { width, height, channels: 4, background: '#FF0076' } })
    .composite([{ input: entrada, blend: 'dest-in' }])
    .png()
    .toFile(saida);
  console.log(`logo-simbolo-rosa.png gerado (${width}×${height})`);
})();
