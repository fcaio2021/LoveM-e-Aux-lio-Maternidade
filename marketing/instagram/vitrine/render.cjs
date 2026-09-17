// Vitrine do Instagram e da Página do Facebook (17/09/2026).
// Gera: destaques/*.png (capas dos destaques, 1080×1920) e capa-facebook.png (1640×856).
// Uso (desta pasta): NODE_PATH=../../../identidade/propostas/node_modules node render.cjs
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const ROSA = '#FF0076';
const FONTE = '<link href="https://fonts.googleapis.com/css2?family=Onest:wght@500;600;700;800&display=swap" rel="stylesheet">';
const traco = 'fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"';

// Ícones de traço, no centro da capa (o Instagram mostra só o círculo do meio)
const destaques = {
  '1-direitos': `<svg viewBox="0 0 120 120" ${traco}><path d="M60 14 22 28v28c0 26 16 42 38 50 22-8 38-24 38-50V28Z"/><path d="m42 60 13 13 25-27"/></svg>`,
  '2-como-funciona': `<svg viewBox="0 0 120 120" ${traco}><rect x="22" y="16" width="76" height="92" rx="12"/><path d="M40 16v-4h40v4"/><path d="m36 46 7 7 12-13M36 78l7 7 12-13M66 48h18M66 80h18"/></svg>`,
  '3-duvidas': `<svg viewBox="0 0 120 120" ${traco}><circle cx="60" cy="60" r="44"/><path d="M45 47a15 15 0 1 1 22 13c-5 3-7 6-7 11"/><circle cx="60" cy="86" r="2.5" fill="#fff"/></svg>`,
  '4-sobre-nos': `<svg viewBox="0 0 120 120" ${traco}><path d="M60 100S16 74 16 44a22 22 0 0 1 44-6 22 22 0 0 1 44 6c0 30-44 56-44 56Z"/></svg>`,
  '5-fale-conosco': `<svg viewBox="0 0 120 120" ${traco}><path d="M20 100l6-22a42 42 0 1 1 16 15Z"/><path d="M46 44c0 16 14 30 30 30l6-8-10-6-5 4c-5-2-9-6-11-11l4-5-6-10Z" stroke-width="5"/></svg>`,
};

const destaqueHtml = (svg) => `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0}body{width:1080px;height:1920px;background:${ROSA};display:grid;place-items:center}
svg{width:430px;height:430px}</style></head><body>${svg}</body></html>`;

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
  for (const [nome, svg] of Object.entries(destaques)) await render(destaqueHtml(svg), 1080, 1920, `destaques/${nome}.png`);
  await render(capaHtml, 1640, 856, 'capa-facebook.png');
  fs.unlinkSync(tmp); await b.close();
})();
