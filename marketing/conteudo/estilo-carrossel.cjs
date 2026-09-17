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
  .marca{position:absolute;right:-180px;bottom:-150px;width:820px;pointer-events:none}
  .caixa{position:absolute;inset:0;padding:84px 78px;display:flex;flex-direction:column;
         justify-content:center}
  /* Corpos de texto grandes: a mãe lê no celular, quase sempre com pressa (17/09/2026) */
  .kicker{font-size:29px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${ROSA_TEXTO}}
  .regua{width:72px;height:5px;background:${ROSA};border-radius:99px;margin:22px 0 26px}
  h1{font-size:80px;line-height:1.03;font-weight:800;letter-spacing:-.025em}
  h2{font-size:68px;line-height:1.08;font-weight:800;letter-spacing:-.02em}
  p{font-size:38px;line-height:1.42;color:${APOIO};font-weight:500}
  p strong{color:${ESCURO};font-weight:700}
  .logo{height:74px;position:absolute;left:78px;bottom:78px}
  .pagina{position:absolute;right:78px;bottom:84px;font-size:25px;font-weight:600;color:${APOIO}}
  .arraste{position:absolute;right:78px;bottom:84px;background:#fff;font-weight:700;font-size:27px;
           padding:16px 34px;border-radius:999px}
  .foto{position:absolute;left:0;right:0;bottom:0;background-size:cover;border-radius:24px 24px 0 0}
  .sombra{position:absolute;left:0;right:0;bottom:0;height:260px;
          background:linear-gradient(to top,rgba(16,34,50,.62),transparent)}
  .valor{background:${ROSA};color:#fff;border-radius:28px;padding:44px 50px;text-align:center}
  .valor span{display:block;font-size:33px;font-weight:600;opacity:.92;margin-bottom:8px}
  .valor b{font-size:76px;font-weight:800;letter-spacing:-.02em;line-height:1.05;display:block}
  .passo{width:96px;height:96px;border-radius:50%;background:${ROSA};color:#fff;font-size:50px;
         font-weight:800;display:flex;align-items:center;justify-content:center;margin-bottom:30px}
  .cheio{color:#fff}
  .cheio p{color:rgba(255,255,255,.92)}
  .cheio .kicker{color:rgba(255,255,255,.9)}
  .cheio .regua{background:#fff}
  .cheio .pagina{color:rgba(255,255,255,.9)}
  .pill{display:inline-block;background:#fff;color:${ESCURO};font-weight:700;font-size:34px;
        padding:22px 44px;border-radius:999px}
</style>`;

/** Coração de fundo: branco e translúcido no fundo colorido, rosa clarinho no fundo claro. */
const marca = (colorido) => colorido
  ? `<img class="marca" src="simbolo-branco.png" style="opacity:.13">`
  : `<img class="marca" src="simbolo.png" style="opacity:.07">`;

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

/** Slide de conteúdo. `extra` entra abaixo do texto (caixa de valor, por exemplo). */
const texto = ({ kicker, titulo, corpo, extra = '', passo, n }) => `${base}
  <body>${marca(false)}
    <div class="caixa">
      ${passo ? `<div class="passo">${passo}</div>` : ''}
      ${kicker ? `<p class="kicker">${kicker}</p><div class="regua"></div>` : ''}
      <h2>${titulo}</h2>
      ${corpo ? `<p style="margin-top:34px">${corpo}</p>` : ''}
      ${extra}
    </div>
    ${rodape(n, false)}
  </body>`;

/** Slide com foto sangrando embaixo. */
const comFoto = ({ kicker, titulo, corpo, foto, posicao = 'center 20%', altura = 620, passo, n }) => `${base}
  <body>
    <div class="caixa" style="justify-content:flex-start;padding-top:96px">
      ${passo ? `<div class="passo">${passo}</div>` : ''}
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

module.exports = { ROSA, AZUL, ROSA_TEXTO, ESCURO, APOIO, FUNDO, base, capa, texto, comFoto, fechamento, renderizar };
