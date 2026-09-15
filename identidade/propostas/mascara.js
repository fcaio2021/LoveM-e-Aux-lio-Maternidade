// Nucleo compartilhado: le o logo original e devolve, por pixel, a cobertura
// real do traco e a que elemento ele pertence (simbolo / wordmark / subtitulo).
//
// Cobertura: o PNG e um traco solido composto sobre branco, P = a*C + (1-a)*W.
// Invertendo a conta recupera-se "a" -- a cor nova entra com a mesma cobertura,
// sem franja clara nas bordas (halo em fundo escuro).
//
// Regiao: coracao e a palavra "Mamae" se sobrepoem em y, entao a separacao e
// por componentes conectados, nao por faixa de linhas.
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

// Medidas no logo oficial por analisar.js. Se o logo trocar, rode
// `node analisar.js ../logo-original.png` e atualize estes dois valores.
const AZUL_ORIG = [0x80, 0xbb, 0xef];
const ROSA_ORIG = [0xfa, 0xa9, 0xc7];

const SIMBOLO = 1, WORDMARK = 2, SUBTITULO = 3;

function coberturaEResiduo(p, c) {
  let canal = 0, maiorDelta = 0;
  for (let k = 0; k < 3; k++) {
    const delta = 255 - c[k];
    if (delta > maiorDelta) { maiorDelta = delta; canal = k; }
  }
  if (maiorDelta < 1) return { a: 0, residuo: Infinity };
  const a = Math.max(0, Math.min(1, (255 - p[canal]) / maiorDelta));
  let residuo = 0;
  for (let k = 0; k < 3; k++) {
    residuo += Math.abs(a * c[k] + (1 - a) * 255 - p[k]);
  }
  return { a, residuo };
}

function carregar() {
  const png = PNG.sync.read(fs.readFileSync(path.join(__dirname, '..', 'logo-original.png')));
  const { width, height } = png;
  const n = width * height;

  const cobertura = new Float32Array(n);
  const classe = new Uint8Array(n); // 0 fundo, 1 azul, 2 rosa

  for (let idx = 0; idx < n; idx++) {
    const i = idx * 4;
    const p = [png.data[i], png.data[i + 1], png.data[i + 2]];
    if (p[0] > 250 && p[1] > 250 && p[2] > 250) continue;
    const azul = coberturaEResiduo(p, AZUL_ORIG);
    const rosa = coberturaEResiduo(p, ROSA_ORIG);
    const vencedor = azul.residuo <= rosa.residuo ? azul : rosa;
    if (vencedor.a < 0.02) continue;
    cobertura[idx] = vencedor.a;
    classe[idx] = azul.residuo <= rosa.residuo ? 1 : 2;
  }

  // --- Componentes conectados sobre o miolo do traco -------------------------
  // Usa limiar alto (0.5) pra nao ligar elementos vizinhos por pixels de borda,
  // e depois anexa os pixels fracos ao componente vizinho mais proximo.
  const comp = new Int32Array(n).fill(-1);
  const componentes = [];
  const fila = new Int32Array(n);

  for (let inicio = 0; inicio < n; inicio++) {
    if (cobertura[inicio] < 0.5 || comp[inicio] !== -1) continue;
    const id = componentes.length;
    let cabeca = 0, cauda = 0;
    fila[cauda++] = inicio;
    comp[inicio] = id;
    let minX = width, maxX = 0, minY = height, maxY = 0, area = 0;

    while (cabeca < cauda) {
      const idx = fila[cabeca++];
      const x = idx % width, y = (idx / width) | 0;
      area++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const v = ny * width + nx;
          if (comp[v] === -1 && cobertura[v] >= 0.5) { comp[v] = id; fila[cauda++] = v; }
        }
      }
    }
    componentes.push({ id, area, minX, maxX, minY, maxY });
  }

  // --- Agrupar componentes em regioes ---------------------------------------
  // O simbolo e, de longe, o componente de maior area e mais alto na imagem.
  // Tudo que comeca abaixo do fim do simbolo e texto; o subtitulo e a faixa
  // final, separada por um respiro claro.
  // O subtitulo e a ultima faixa horizontal de conteudo, separada por um
  // respiro claro. Medir em vez de fixar: a altura da imagem muda quando o
  // logo e substituido, e um valor fixo silenciosamente classifica errado.
  const perfil = new Uint32Array(height);
  for (let idx = 0; idx < n; idx++) {
    if (cobertura[idx] > 0.5) perfil[(idx / width) | 0]++;
  }
  const faixas = [];
  let ini = -1;
  for (let y = 0; y < height; y++) {
    if (perfil[y] > 0 && ini === -1) ini = y;
    else if (perfil[y] === 0 && ini !== -1) { faixas.push([ini, y - 1]); ini = -1; }
  }
  if (ini !== -1) faixas.push([ini, height - 1]);
  const ultima = faixas[faixas.length - 1];
  // So conta como subtitulo se for uma faixa fina no rodape, nao o bloco todo
  const topoSubtitulo =
    faixas.length > 1 && ultima[1] - ultima[0] < height * 0.2 ? ultima[0] : height;

  const ordenados = [...componentes].sort((a, b) => b.area - a.area);
  const simbolo = ordenados.find((c) => c.minY < height * 0.4) || ordenados[0];

  // O coracao e as letras nao se separam por caixa: os dois tracos do coracao
  // sao componentes distintos, lado a lado, e o "M" sobe ate quase encostar no
  // bico do coracao. O que separa de verdade e o salto no topo de cada elemento
  // -- tracos do coracao comecam bem acima da linha das letras. Acha o maior
  // salto na lista ordenada de topos e corta ali.
  const acimaDoSubtitulo = componentes
    .filter((c) => c.minY < topoSubtitulo - 10 && c.area > 300)
    .sort((a, b) => a.minY - b.minY);

  let corteTopo = Infinity, maiorSalto = 0;
  for (let i = 1; i < acimaDoSubtitulo.length; i++) {
    const salto = acimaDoSubtitulo[i].minY - acimaDoSubtitulo[i - 1].minY;
    if (salto > maiorSalto) {
      maiorSalto = salto;
      corteTopo = acimaDoSubtitulo[i].minY;
    }
  }
  const dentroDoSimbolo = (c) => c.minY < corteTopo;

  const regiaoDoComp = new Uint8Array(componentes.length);
  componentes.forEach((c) => {
    if (c.minY >= topoSubtitulo - 10) regiaoDoComp[c.id] = SUBTITULO;
    else if (dentroDoSimbolo(c)) regiaoDoComp[c.id] = SIMBOLO;
    else regiaoDoComp[c.id] = WORDMARK;
  });

  // --- Propagar regiao pros pixels de borda (cobertura < 0.5) ---------------
  const regiao = new Uint8Array(n);
  for (let idx = 0; idx < n; idx++) {
    if (comp[idx] !== -1) regiao[idx] = regiaoDoComp[comp[idx]];
  }
  // Duas passadas de dilatacao resolvem as bordas orfas
  for (let passo = 0; passo < 3; passo++) {
    const anterior = regiao.slice();
    for (let idx = 0; idx < n; idx++) {
      if (regiao[idx] !== 0 || cobertura[idx] < 0.02) continue;
      const x = idx % width, y = (idx / width) | 0;
      for (let dy = -1; dy <= 1 && regiao[idx] === 0; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const v = anterior[ny * width + nx];
          if (v !== 0) { regiao[idx] = v; break; }
        }
      }
    }
  }
  // Sobra: pixel com cobertura que nenhuma dilatacao alcancou. Decide por
  // posicao vertical usando `corteTopo` (topo real das letras) -- e NAO
  // `simbolo.maxY`, que se sobrepoe as letras: o bico do coracao desce ate
  // depois do topo do "M", e usar isso rotulava o topo das letras como simbolo,
  // esticando o recorte do favicon ate a margem esquerda do wordmark.
  for (let idx = 0; idx < n; idx++) {
    if (cobertura[idx] >= 0.02 && regiao[idx] === 0) {
      const y = (idx / width) | 0;
      regiao[idx] = y >= topoSubtitulo - 10 ? SUBTITULO : (y < corteTopo ? SIMBOLO : WORDMARK);
    }
  }

  return { width, height, cobertura, classe, regiao, componentes, regiaoDoComp, simbolo };
}

function caixa(cobertura, width, height, filtro) {
  let minX = width, maxX = -1, minY = height, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (cobertura[idx] < 0.1) continue;
      if (filtro && !filtro(idx)) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  return { minX, maxX, minY, maxY };
}

module.exports = { carregar, caixa, SIMBOLO, WORDMARK, SUBTITULO, AZUL_ORIG, ROSA_ORIG };
