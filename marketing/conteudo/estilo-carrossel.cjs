// Estilo compartilhado dos carrosséis da LoveMãe (1080×1350).
// Fonte Onest (a mesma do site), uma cor de destaque por peça, muito respiro e o
// coração da marca em segundo plano — como no criativo de referência do Asaas.
//
// Usar assim, no gerar.cjs de cada carrossel:
//   const e = require('../estilo-carrossel.cjs');
//   e.renderizar(__dirname, [e.capa({...}), e.texto({...}), ...]);
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const ROSA = '#FF0076';
const AZUL = '#0038E5';
const ROSA_TEXTO = '#E0006A'; // rosa legível em texto pequeno (o do logo não passa)
const ESCURO = '#1A2530';
const APOIO = '#46525E';
const FUNDO = '#FDFAFB';

// O charset é obrigatório: sem ele o navegador chuta a codificação e os acentos
// viram "vocÃª" em alguns slides.
const base = `<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1080px;height:1350px;overflow:hidden;font-family:Onest,sans-serif;color:${ESCURO};
       background:${FUNDO};position:relative}
  /* Coração da marca em segundo plano: grande, sangrando pelo canto e bem discreto */
  .marca{position:absolute;pointer-events:none}
  .caixa{position:absolute;inset:0;padding:84px 78px;display:flex;flex-direction:column;
         justify-content:center}
  /* Corpos de texto grandes: a mãe lê no celular, quase sempre com pressa (17/09/2026) */
  .kicker{font-size:29px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${ROSA_TEXTO}}
  .regua{width:72px;height:5px;background:${ROSA};border-radius:99px;margin:22px 0 26px}
  h1{font-size:80px;line-height:1.03;font-weight:800;letter-spacing:-.025em}
  h2{font-size:68px;line-height:1.08;font-weight:800;letter-spacing:-.02em}
  p{font-size:38px;line-height:1.42;color:${APOIO};font-weight:500}
  p strong{color:${ESCURO};font-weight:700}
  .logo{height:96px;position:absolute;left:78px;bottom:72px}
  .pagina{position:absolute;right:78px;bottom:84px;font-size:25px;font-weight:600;color:${APOIO}}
  .arraste{position:absolute;right:78px;bottom:84px;background:#fff;font-weight:700;font-size:27px;
           padding:16px 34px;border-radius:999px}
  .foto{position:absolute;left:0;right:0;bottom:0;background-size:cover;border-radius:24px 24px 0 0}
  .sombra{position:absolute;left:0;right:0;bottom:0;height:260px;
          background:linear-gradient(to top,rgba(16,34,50,.62),transparent)}
  .valor{background:${ROSA};color:#fff;border-radius:28px;padding:44px 50px;text-align:center}
  /* Sobre o azul, a caixa de valor vira branca: rosa com azul vibra e cansa a vista */
  .cheio .valor{background:#fff;color:${ESCURO}}
  .cheio .valor span{color:${APOIO};opacity:1}
  .cheio .valor b{color:${ROSA_TEXTO}}
  .valor span{display:block;font-size:33px;font-weight:600;opacity:.92;margin-bottom:8px}
  .valor b{font-size:76px;font-weight:800;letter-spacing:-.02em;line-height:1.05;display:block}
  .passo{width:96px;height:96px;border-radius:50%;background:${ROSA};color:#fff;font-size:50px;
         font-weight:800;display:flex;align-items:center;justify-content:center;margin-bottom:30px}
  .cheio{color:#fff}
  .cheio p{color:rgba(255,255,255,.92)}
  /* Sem isto o negrito herda o cinza-escuro do fundo claro e some no azul */
  .cheio p strong{color:#fff}
  .cheio .kicker{color:rgba(255,255,255,.9)}
  .cheio .regua{background:#fff}
  .cheio .pagina{color:rgba(255,255,255,.9)}
  .pill{display:inline-block;background:#fff;color:${ESCURO};font-weight:700;font-size:34px;
        padding:22px 44px;border-radius:999px}
</style>`;

// Coração de fundo: posição e tamanho escolhidos em `config.marca`.
// Variações desenhadas em 17/09/2026 pra comparação (ver prévia na pasta da trilogia).
const VARIACOES = {
  canto: 'right:-180px;bottom:-150px;width:820px',
  'canto-grande': 'right:-240px;bottom:-230px;width:1150px',
  tela: 'left:50%;top:50%;transform:translate(-50%,-50%);width:1280px',
  direita: 'right:-300px;top:50%;transform:translateY(-50%);width:1200px',
  esquerda: 'left:-320px;bottom:-120px;width:1150px',
  topo: 'right:-200px;top:-260px;width:1050px',
};

// Escolhas de 17/09/2026: slides coloridos com o coração à direita (opção D) e
// slides brancos com ele no topo direito (opção F), que deixa o rodapé limpo.
const config = {
  marca: 'direita',
  marcaClara: 'topo',
  opacidadeClara: 0.12,
  opacidadeColorida: 0.13,
};

/**
 * Coração de fundo: branco no slide colorido, rosa claro no slide branco.
 * O desenho do coração vira máscara (o PNG branco serve de recorte), então a cor
 * sai chapada — o arquivo original é azul e rosa, e não daria o tom único pedido.
 */
const marca = (colorido) => {
  const variacao = colorido ? config.marca : (config.marcaClara || config.marca);
  const pos = VARIACOES[variacao] || VARIACOES.canto;
  const opacidade = colorido ? config.opacidadeColorida : config.opacidadeClara;
  const arquivo = colorido ? 'simbolo-branco.png' : 'simbolo-rosa.png';
  return `<img class="marca" src="${arquivo}" style="${pos};opacity:${opacidade}">`;
};

const rodape = (n, colorido) =>
  `<img class="logo" src="${colorido ? 'logo-branco.png' : 'logo.png'}">
   <span class="pagina">${n}</span>`;

/** Slide de abertura, em cor sólida. */
const capa = ({ cor = ROSA, kicker, titulo, sub }) => `${base}
  <body style="background:${cor}">${marca(true)}
    <div class="caixa cheio">
      <p class="kicker">${kicker}</p><div class="regua"></div>
      <h1>${titulo}</h1>
      ${sub ? `<p style="margin-top:34px;font-size:40px">${sub}</p>` : ''}
    </div>
    <img class="logo" src="logo-branco.png">
    <span class="arraste" style="color:${cor}">arraste →</span>
  </body>`;

/**
 * Slide de conteúdo. `extra` entra abaixo do texto (caixa de valor, por exemplo).
 * `cor` pinta o slide inteiro (os slides do meio são azuis desde 17/09/2026).
 */
const texto = ({ kicker, titulo, corpo, extra = '', passo, cor, n }) => `${base}
  <body${cor ? ` style="background:${cor}"` : ''}>${marca(!!cor)}
    <div class="caixa${cor ? ' cheio' : ''}">
      ${passo ? `<div class="passo"${cor ? ` style="background:#fff;color:${cor}"` : ''}>${passo}</div>` : ''}
      ${kicker ? `<p class="kicker">${kicker}</p><div class="regua"></div>` : ''}
      <h2>${titulo}</h2>
      ${corpo ? `<p style="margin-top:34px">${corpo}</p>` : ''}
      ${extra}
    </div>
    ${rodape(n, !!cor)}
  </body>`;

/**
 * Slide com dois assuntos na mesma imagem (um em cima, outro embaixo), separados
 * por um fio. Serve pra juntar dois perfis parecidos e encurtar o carrossel.
 */
const duplo = ({ blocos, n }) => `${base}
  <body>${marca(false)}
    <div class="caixa" style="gap:76px">
      ${blocos.map((b) => `
        <div>
          <p class="kicker">${b.kicker}</p><div class="regua" style="margin:18px 0 20px"></div>
          <h2 style="font-size:54px">${b.titulo}</h2>
          ${b.corpo ? `<p style="margin-top:22px;font-size:34px">${b.corpo}</p>` : ''}
        </div>`).join('')}
    </div>
    ${rodape(n, false)}
  </body>`;

/** Slide de lista: cada item com o "check" rosa, um título curto e uma explicação. */
const lista = ({ kicker, titulo, itens, n }) => `${base}
  <body>${marca(false)}
    <div class="caixa">
      ${kicker ? `<p class="kicker">${kicker}</p><div class="regua"></div>` : ''}
      ${titulo ? `<h2 style="font-size:56px">${titulo}</h2>` : ''}
      <div style="margin-top:44px;display:flex;flex-direction:column;gap:38px">
        ${itens.map((i) => `
          <div style="display:flex;gap:26px;align-items:flex-start">
            <svg width="50" height="50" viewBox="0 0 24 24" style="flex:none;margin-top:6px">
              <circle cx="12" cy="12" r="11" fill="${ROSA}"/>
              <path d="m7 12.4 3.3 3.3L17 9" fill="none" stroke="#fff" stroke-width="2.4"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div>
              <p style="font-size:38px;font-weight:700;color:${ESCURO};line-height:1.2">${i.titulo}</p>
              ${i.corpo ? `<p style="margin-top:8px;font-size:30px">${i.corpo}</p>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </div>
    ${rodape(n, false)}
  </body>`;

/** Slide com foto sangrando embaixo. */
const comFoto = ({ kicker, titulo, corpo, foto, posicao = 'center 20%', altura = 620, passo, cor, n }) => `${base}
  <body${cor ? ` style="background:${cor}"` : ''}>
    <div class="caixa${cor ? ' cheio' : ''}" style="justify-content:flex-start;padding-top:96px">
      ${passo ? `<div class="passo"${cor ? ` style="background:#fff;color:${cor}"` : ''}>${passo}</div>` : ''}
      ${kicker ? `<p class="kicker">${kicker}</p><div class="regua"></div>` : ''}
      <h2>${titulo}</h2>
      ${corpo ? `<p style="margin-top:30px">${corpo}</p>` : ''}
    </div>
    <div class="foto" style="height:${altura}px;background-image:url(${foto});background-position:${posicao}"></div>
    <div class="sombra"></div>
    ${rodape(n, true)}
  </body>`;

/** Slide final de chamada, em cor sólida. */
const fechamento = ({ cor = ROSA, kicker, titulo, corpo, n }) => `${base}
  <body style="background:${cor}">${marca(true)}
    <div class="caixa cheio">
      <p class="kicker">${kicker}</p><div class="regua"></div>
      <h2>${titulo}</h2>
      ${corpo ? `<p style="margin-top:32px">${corpo}</p>` : ''}
      <p style="margin-top:44px"><span class="pill">👉 Link na bio</span></p>
    </div>
    ${rodape(n, true)}
  </body>`;

/** Copia logo e símbolo pra pasta do carrossel e renderiza os PNGs. */
async function renderizar(pasta, slides) {
  const identidade = path.resolve(__dirname, '..', '..', 'identidade');
  for (const [de, para] of [
    ['logo.png', 'logo.png'],
    ['logo-branco.png', 'logo-branco.png'],
    ['logo-simbolo.png', 'simbolo.png'],
    ['logo-simbolo-branco.png', 'simbolo-branco.png'],
    ['logo-simbolo-rosa.png', 'simbolo-rosa.png'],
  ]) fs.copyFileSync(path.join(identidade, de), path.join(pasta, para));

  const b = await chromium.launch();
  const tmp = path.join(pasta, '.tmp.html');
  for (const { nome, html } of slides) {
    fs.writeFileSync(tmp, html);
    const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
    await p.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(pasta, nome) });
    await p.close();
  }
  fs.unlinkSync(tmp);
  await b.close();
  console.log(`${slides.length} slides gerados em ${path.basename(pasta)}`);
}

module.exports = {
  ROSA, AZUL, ROSA_TEXTO, ESCURO, APOIO, FUNDO,
  base, capa, texto, duplo, lista, comFoto, fechamento, renderizar, config, VARIACOES,
};
