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

// Só as duas cores do logo, alternando (decisão de 18/09/2026: seis tons ficaram
// poluídos). Ícones sólidos e grandes, quase preenchendo o círculo (18/09/2026) —
// traço fino sumia na miniatura do perfil.
const AZUL = "#0038E5"; // 7,79:1 no branco · ROSA #FF0076 dá 3,81:1
const destaques = [
  {
    nome: "1-com-a-lovemae", rotulo: "Com a LoveMãe", cor: ROSA,
    svg: () => `<path d="M60 106S10 76 10 42A26 26 0 0 1 60 27 26 26 0 0 1 110 42c0 34-50 64-50 64Z" fill="#fff"/>`,
  },
  {
    nome: "2-como-solicitar", rotulo: "Como Solicitar?", cor: AZUL,
    svg: (c) => `<rect x="16" y="18" width="88" height="96" rx="14" fill="#fff"/>
      <rect x="42" y="6" width="36" height="22" rx="11" fill="#fff"/>
      <path d="m36 66 15 15 33-35" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  {
    nome: "3-quem-tem-direito", rotulo: "Quem tem Direito?", cor: ROSA,
    svg: (c) => `<path d="M60 6 12 24v32c0 32 19 52 48 62 29-10 48-30 48-62V24Z" fill="#fff"/>
      <path d="m38 60 15 15 31-33" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  {
    nome: "4-qual-valor", rotulo: "Qual valor?", cor: AZUL,
    svg: (c) => `<circle cx="60" cy="60" r="54" fill="#fff"/>
      <text x="60" y="92" text-anchor="middle" font-family="Onest,sans-serif" font-size="92" font-weight="800" fill="${c}">$</text>`,
  },
  {
    nome: "5-perguntas", rotulo: "Perguntas?", cor: ROSA,
    svg: () => `<text x="60" y="102" text-anchor="middle" font-family="Onest,sans-serif" font-size="126" font-weight="800" fill="#fff">?</text>`,
  },
  {
    nome: "6-depoimentos", rotulo: "Depoimentos", cor: AZUL,
    svg: (c) => `<path d="M10 26a14 14 0 0 1 14-14h72a14 14 0 0 1 14 14v46a14 14 0 0 1-14 14H58L30 112V86h-6a14 14 0 0 1-14-14V26Z" fill="#fff"/>
      <path d="m60 28 9 18 20 3-14 14 3 20-18-10-18 10 3-20-14-14 20-3Z" fill="${c}"/>`,
  },
];

const destaqueHtml = ({ svg, cor }) => `<!doctype html><html><head><meta charset="utf-8">${FONTE}<style>
*{margin:0}body{width:1080px;height:1920px;background:${cor};display:grid;place-items:center}
svg{width:780px;height:780px}</style></head><body><svg viewBox="0 0 120 120">${svg(cor)}</svg></body></html>`;

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
<svg viewBox="0 0 120 120">${d.svg(d.cor)}</svg></div></div>
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
