// Vitrine do Instagram e da Página do Facebook (17/09/2026).
// Destaques revistos em 18/09/2026: 6 capas alternando 3 tons de rosa e 3 de azul.
// Gera: destaques/*.png (1080×1920), previa-destaques.png e capa-facebook.png (1640×856).
// Uso (desta pasta): NODE_PATH=../../../identidade/propostas/node_modules node render.cjs
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const ROSA = '#FF0076';
const FONTE = '<link href="https://fonts.googleapis.com/css2?family=Onest:wght@500;600;700;800&display=swap" rel="stylesheet">';
const traco = 'fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"';

// Só as duas cores do logo, alternando (decisão de 18/09/2026: seis tons ficaram
// poluídos). Ambas passam com folga no mínimo de 3:1 para ícone branco.
const AZUL = "#0038E5"; // 7,79:1
const destaques = [
  {
    nome: "1-o-que-e", rotulo: "O que é?", cor: ROSA,
    svg: `<path d="M60 36c-8-8-20-12-34-12v60c14 0 26 4 34 12 8-8 20-12 34-12V24c-14 0-26 4-34 12Z"/><path d="M60 36v60"/>`,
  },
  {
    nome: "2-quem-tem-direito", rotulo: "Quem tem direito", cor: AZUL,
    svg: `<path d="M60 14 22 28v28c0 26 16 42 38 50 22-8 38-24 38-50V28Z"/><path d="m42 60 13 13 25-27"/>`,
  },
  {
    nome: "3-qual-valor", rotulo: "Qual valor?", cor: ROSA,
    svg: `<circle cx="60" cy="60" r="44"/><path d="M60 30v60"/><path d="M75 45c0-6-7-10-15-10s-15 4-15 10 7 9 15 11 15 5 15 11-7 10-15 10-15-4-15-10"/>`,
  },
  {
    nome: "4-como-funciona", rotulo: "Como funciona", cor: AZUL,
    svg: `<rect x="22" y="16" width="76" height="92" rx="12"/><path d="M40 16v-4h40v4"/><path d="m36 46 7 7 12-13M36 78l7 7 12-13M66 48h18M66 80h18"/>`,
  },
  {
    nome: "5-duvidas", rotulo: "Dúvidas", cor: ROSA,
    svg: `<path d="M16 32a8 8 0 0 1 8-8h72a8 8 0 0 1 8 8v40a8 8 0 0 1-8 8H54L32 98V80h-8a8 8 0 0 1-8-8V32Z"/><path d="M50 44a10 10 0 1 1 14 9c-3 2-4 4-4 7"/><circle cx="60" cy="66" r="2.5" fill="#fff"/>`,
  },
  {
    nome: "6-depoimentos", rotulo: "Depoimentos", cor: AZUL,
    svg: `<path d="M16 32a8 8 0 0 1 8-8h72a8 8 0 0 1 8 8v40a8 8 0 0 1-8 8H54L32 98V80h-8a8 8 0 0 1-8-8V32Z"/><path d="m60 34 6 13 14 2-10 10 3 14-13-7-13 7 3-14-10-10 14-2Z"/>`,
  },
];

const destaqueHtml = ({ svg, cor }) => `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0}body{width:1080px;height:1920px;background:${cor};display:grid;place-items:center}
svg{width:430px;height:430px}</style></head><body><svg viewBox="0 0 120 120" ${traco}>${svg}</svg></body></html>`;

// Prévia: os seis como o Instagram mostra — círculo com anel branco e o nome embaixo.
const previaHtml = `<!doctype html><html><head><meta charset="utf-8">${FONTE}<style>
*{margin:0;box-sizing:border-box}
body{width:1400px;height:340px;background:#fff;font-family:Onest,sans-serif;color:#1A2530;
     display:flex;align-items:center;justify-content:center;gap:44px}
.item{width:170px;text-align:center}
.anel{width:170px;height:170px;border-radius:50%;border:5px solid #E6E6E6;padding:7px;margin-bottom:18px}
.circulo{width:100%;height:100%;border-radius:50%;display:grid;place-items:center}
.circulo svg{width:78px;height:78px}
.rotulo{font-size:25px;font-weight:600}
</style></head><body>
${destaques.map((d) => `<div class="item"><div class="anel"><div class="circulo" style="background:${d.cor}">
<svg viewBox="0 0 120 120" ${traco}>${d.svg}</svg></div></div>
<p class="rotulo">${d.rotulo}</p></div>`).join('')}
</body></html>`;

const capaHtml = `<!doctype html><html><head><meta charset="utf-8">${FONTE}<style>
*{margin:0;box-sizing:border-box}
body{width:1640px;height:856px;overflow:hidden;background:#fff;font-family:Onest,sans-serif;color:#1A2530;position:relative}
.foto{position:absolute;right:0;top:0;width:900px;height:856px;background:url(fontes/foto-capa.jpg) center 30%/cover}
.foto::after{content:'';position:absolute;inset:0;background:linear-gradient(to right,#fff 0%,rgba(255,255,255,.85) 20%,transparent 55%)}
/* Área segura: celular corta as laterais e o computador corta em cima e embaixo */
.texto{position:absolute;left:270px;top:170px;width:660px}
.kicker{color:#E0006A;font-weight:700;font-size:30px;margin-bottom:14px}
h1{font-size:64px;line-height:1.06;font-weight:800;letter-spacing:-.02em}
h1 span{color:${ROSA}}
.selos{margin-top:30px;display:flex;gap:14px;flex-wrap:wrap}
.selo{background:#FFE3EF;color:#1A2530;font-weight:600;font-size:26px;padding:12px 24px;border-radius:999px}
</style></head><body><div class="foto"></div><div class="texto">
<p class="kicker">Auxílio-maternidade do INSS</p>
<h1>Descubra se você tem direito a receber até <span>R$&nbsp;15.900</span></h1>
<div class="selos"><span class="selo">Análise gratuita</span><span class="selo">100% online</span></div>
</div></body></html>`;

(async () => {
  const b = await chromium.launch();
  const tmp = path.join(__dirname, '.tmp.html');
  const render = async (html, w, h, saida) => {
    fs.writeFileSync(tmp, html);
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(__dirname, saida) }); await p.close();
  };
  for (const d of destaques) await render(destaqueHtml(d), 1080, 1920, `destaques/${d.nome}.png`);
  await render(previaHtml, 1400, 340, 'previa-destaques.png');
  await render(capaHtml, 1640, 856, 'capa-facebook.png');
  fs.unlinkSync(tmp); await b.close();
  console.log(`${destaques.length} destaques + prévia + capa do Facebook`);
})();
