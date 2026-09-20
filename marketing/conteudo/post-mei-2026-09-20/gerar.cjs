// Post 4 — "Sou MEI. Tenho direito?" (20/09/2026)
// Três variações de fundo para a empresa escolher: branco, azul e rosa.
// Uso (desta pasta): NODE_PATH=../../../identidade/propostas/node_modules node gerar.cjs
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const ROSA = '#FF0076';
const AZUL = '#0038E5';
const ESCURO = '#1A2530';
const APOIO = '#46525E';
const FUNDO_CLARO = '#FDFAFB';

const variacoes = [
  {
    nome: 'variacao-branco',
    fundo: FUNDO_CLARO,
    // "Cores originais" do pedido: no fundo claro o símbolo entra azul e rosa como no logo.
    marca: 'simbolo.png',
    opacidade: 0.16,
    texto: ESCURO,
    apoio: APOIO,
    // Logo branco sumiria no fundo claro, então aqui vai a versão colorida.
    logo: 'logo.png',
  },
  { nome: 'variacao-azul', fundo: AZUL, marca: 'simbolo-branco.png', opacidade: 0.14, texto: '#fff', apoio: 'rgba(255,255,255,.88)', logo: 'logo-branco.png' },
  { nome: 'variacao-rosa', fundo: ROSA, marca: 'simbolo-branco.png', opacidade: 0.14, texto: '#fff', apoio: 'rgba(255,255,255,.88)', logo: 'logo-branco.png' },
];

const html = (v) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1080px;height:1350px;overflow:hidden;font-family:Onest,sans-serif;
       background:${v.fundo};position:relative}
  /* Símbolo grande sangrando pela direita, como nos carrosséis da trilogia */
  .marca{position:absolute;right:-300px;top:50%;transform:translateY(-50%);width:1200px;
         opacity:${v.opacidade};pointer-events:none}
  .caixa{position:absolute;inset:0;padding:84px 78px;display:flex;flex-direction:column;
         justify-content:center}
  .kicker{font-size:29px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
          color:${v.nome === 'variacao-branco' ? '#E0006A' : v.apoio}}
  .regua{width:72px;height:5px;background:${v.nome === 'variacao-branco' ? ROSA : '#fff'};
         border-radius:99px;margin:22px 0 26px}
  h1{font-size:96px;line-height:1.02;font-weight:800;letter-spacing:-.03em;color:${v.texto}}
  p{font-size:40px;line-height:1.38;font-weight:500;color:${v.apoio};margin-top:34px}
  .logo{height:104px;position:absolute;left:78px;bottom:72px}
</style></head><body>
<img class="marca" src="${v.marca}">
<div class="caixa">
  <p class="kicker">MEI e autônoma</p><div class="regua"></div>
  <h1>Sou MEI.<br>Tenho direito?</h1>
  <p>A resposta surpreende<br>muita mãe.</p>
</div>
<img class="logo" src="${v.logo}">
</body></html>`;

(async () => {
  const identidade = path.resolve(__dirname, '..', '..', '..', 'identidade');
  for (const [de, para] of [
    ['logo.png', 'logo.png'],
    ['logo-branco.png', 'logo-branco.png'],
    ['logo-simbolo.png', 'simbolo.png'],
    ['logo-simbolo-branco.png', 'simbolo-branco.png'],
    ['logo-simbolo-rosa.png', 'simbolo-rosa.png'],
  ]) fs.copyFileSync(path.join(identidade, de), path.join(__dirname, para));

  const b = await chromium.launch();
  const tmp = path.join(__dirname, '.tmp.html');
  for (const v of variacoes) {
    fs.writeFileSync(tmp, html(v));
    const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
    await p.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(__dirname, `${v.nome}.png`) });
    await p.close();
  }
  fs.unlinkSync(tmp);
  await b.close();
  console.log(`${variacoes.length} variações geradas`);
})();
