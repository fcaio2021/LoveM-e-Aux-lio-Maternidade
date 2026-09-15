// Mede as cores reais do logo original: agrupa pixels por matiz e reporta os
// clusters dominantes. Serve pra calibrar as faixas de hue do recolorir.js.
const fs = require('fs');
const { PNG } = require('pngjs');

const src = process.argv[2] || '../logo-original.png';
const png = PNG.sync.read(fs.readFileSync(src));
console.log(`Dimensoes: ${png.width}x${png.height}`);

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

const buckets = new Map(); // hue arredondado em 10 graus -> {n, r, g, b, sMax}
let brancos = 0, total = 0;

for (let i = 0; i < png.data.length; i += 4) {
  const [r, g, b, a] = [png.data[i], png.data[i + 1], png.data[i + 2], png.data[i + 3]];
  if (a < 8) continue;
  total++;
  const [h, s, l] = rgbToHsl(r, g, b);
  if (s < 0.12 || l > 0.94) { brancos++; continue; } // fundo / quase-neutro
  const key = Math.round(h / 10) * 10;
  const cur = buckets.get(key) || { n: 0, r: 0, g: 0, b: 0, sSum: 0, lSum: 0 };
  cur.n++; cur.r += r; cur.g += g; cur.b += b; cur.sSum += s; cur.lSum += l;
  buckets.set(key, cur);
}

const hex = (r, g, b) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();

console.log(`Pixels totais: ${total} | fundo/neutro: ${brancos} (${(brancos / total * 100).toFixed(1)}%)`);
console.log('\nClusters de matiz (hue -> media, saturacao, luminancia, %):');
[...buckets.entries()]
  .sort((a, b) => b[1].n - a[1].n)
  .slice(0, 10)
  .forEach(([h, c]) => {
    console.log(
      `  hue ${String(h).padStart(3)}deg  ${hex(c.r / c.n, c.g / c.n, c.b / c.n)}  ` +
      `s=${(c.sSum / c.n).toFixed(2)} l=${(c.lSum / c.n).toFixed(2)}  ` +
      `${(c.n / total * 100).toFixed(2)}%  (${c.n}px)`
    );
  });

// Amostra os cantos pra confirmar a cor exata do fundo
console.log('\nCantos (fundo):');
[[2, 2], [png.width - 3, 2], [2, png.height - 3], [png.width - 3, png.height - 3]].forEach(([x, y]) => {
  const i = (png.width * y + x) * 4;
  console.log(`  (${x},${y}) ${hex(png.data[i], png.data[i + 1], png.data[i + 2])} a=${png.data[i + 3]}`);
});
