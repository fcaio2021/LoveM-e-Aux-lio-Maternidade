// Gera as variantes de cor do logo preservando as formas exatas do original.
// Toda a leitura pesada (cobertura do traco, separacao dos elementos) vem de
// mascara.js -- aqui so entra o mapeamento de cor e o recorte.
//
// Uso:  node recolorir.js <variante> [--simbolo] [--saida <caminho>] [--largura N]
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const { carregar, caixa, SIMBOLO, WORDMARK, SUBTITULO } = require('./mascara');

const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

// Cada variante define a cor por elemento e por traco de origem (azul / rosa).
const VARIANTES = {
  v0_original:       { simbolo: ['#5698D6', '#F99CC0'], wordmark: ['#5698D6', '#F99CC0'], subtitulo: ['#F99CC0', '#F99CC0'] },
  v1_direcao_a:      { simbolo: ['#16243F', '#D6336C'], wordmark: ['#16243F', '#D6336C'], subtitulo: ['#D6336C', '#D6336C'] },
  v2_suavizada:      { simbolo: ['#2E4A7D', '#E05C8D'], wordmark: ['#2E4A7D', '#E05C8D'], subtitulo: ['#E05C8D', '#E05C8D'] },
  v3_rosa_dominante: { simbolo: ['#D6336C', '#D6336C'], wordmark: ['#16243F', '#16243F'], subtitulo: ['#D6336C', '#D6336C'] },
  branco:            { simbolo: ['#FFFFFF', '#FFFFFF'], wordmark: ['#FFFFFF', '#FFFFFF'], subtitulo: ['#FFFFFF', '#FFFFFF'] },
};

const args = process.argv.slice(2);
const nome = args[0];
const soSimbolo = args.includes('--simbolo');
const iSaida = args.indexOf('--saida');
const iLargura = args.indexOf('--largura');
const larguraAlvo = iLargura !== -1 ? parseInt(args[iLargura + 1], 10) : null;

if (!VARIANTES[nome]) {
  console.error(`Variante desconhecida: ${nome}\nDisponiveis: ${Object.keys(VARIANTES).join(', ')}`);
  process.exit(1);
}

const cfg = VARIANTES[nome];
const cores = {
  [SIMBOLO]: cfg.simbolo.map(hexToRgb),
  [WORDMARK]: cfg.wordmark.map(hexToRgb),
  [SUBTITULO]: cfg.subtitulo.map(hexToRgb),
};

const m = carregar();
const { width, height, cobertura, classe, regiao } = m;

const filtro = soSimbolo ? (idx) => regiao[idx] === SIMBOLO : null;
const bb = caixa(cobertura, width, height, filtro);
const margem = Math.round((bb.maxY - bb.minY) * 0.06);
const x0 = Math.max(0, bb.minX - margem), y0 = Math.max(0, bb.minY - margem);
const x1 = Math.min(width - 1, bb.maxX + margem), y1 = Math.min(height - 1, bb.maxY + margem);
const w = x1 - x0 + 1, h = y1 - y0 + 1;

const saida = new PNG({ width: w, height: h });
for (let y = y0; y <= y1; y++) {
  for (let x = x0; x <= x1; x++) {
    const idx = y * width + x;
    const o = ((y - y0) * w + (x - x0)) * 4;
    const a = cobertura[idx];
    const reg = regiao[idx];
    if (a < 0.02 || reg === 0 || (soSimbolo && reg !== SIMBOLO)) {
      saida.data[o] = saida.data[o + 1] = saida.data[o + 2] = saida.data[o + 3] = 0;
      continue;
    }
    const cor = cores[reg][classe[idx] === 1 ? 0 : 1];
    saida.data[o] = cor[0];
    saida.data[o + 1] = cor[1];
    saida.data[o + 2] = cor[2];
    saida.data[o + 3] = Math.round(a * 255);
  }
}

let final = saida;
if (larguraAlvo && larguraAlvo !== w) {
  // Reducao por media de area (box filter) -- mantem o traco fino legivel,
  // que e o risco real em tamanho de favicon.
  const escala = larguraAlvo / w;
  const nh = Math.max(1, Math.round(h * escala));
  const red = new PNG({ width: larguraAlvo, height: nh });
  for (let y = 0; y < nh; y++) {
    for (let x = 0; x < larguraAlvo; x++) {
      const sx0 = Math.floor(x / escala), sx1 = Math.min(w, Math.ceil((x + 1) / escala));
      const sy0 = Math.floor(y / escala), sy1 = Math.min(h, Math.ceil((y + 1) / escala));
      let r = 0, g = 0, b = 0, al = 0, cont = 0;
      for (let sy = sy0; sy < sy1; sy++) {
        for (let sx = sx0; sx < sx1; sx++) {
          const i = (sy * w + sx) * 4;
          const pa = saida.data[i + 3] / 255;
          r += saida.data[i] * pa; g += saida.data[i + 1] * pa; b += saida.data[i + 2] * pa;
          al += pa; cont++;
        }
      }
      const o = (y * larguraAlvo + x) * 4;
      if (al > 0) {
        red.data[o] = Math.round(r / al);
        red.data[o + 1] = Math.round(g / al);
        red.data[o + 2] = Math.round(b / al);
        red.data[o + 3] = Math.round((al / cont) * 255);
      }
    }
  }
  final = red;
}

const destino = iSaida !== -1
  ? path.resolve(args[iSaida + 1])
  : path.join(__dirname, `logo-${nome}${soSimbolo ? '-simbolo' : ''}.png`);
fs.mkdirSync(path.dirname(destino), { recursive: true });
fs.writeFileSync(destino, PNG.sync.write(final));
console.log(`${nome}${soSimbolo ? ' (simbolo)' : ''}: ${final.width}x${final.height} -> ${path.relative(process.cwd(), destino)}`);
