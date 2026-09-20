// Post 4 — "Sou MEI. Tenho direito?" no formato de faixas (20/09/2026).
// Estrutura da referência que a empresa mandou: painel de cor à esquerda, foto sangrando
// à direita e o texto em faixas sólidas por cima. Aqui as faixas são rosa com texto branco.
// Uso (desta pasta): NODE_PATH=../../../identidade/propostas/node_modules node gerar-faixas.cjs
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const ROSA = '#FF0076';
const AZUL = '#0038E5';

const variacoes = [
  { nome: 'faixas-azul', painel: AZUL, marca: 'simbolo-branco.png', opacidade: 0.16, apoio: '#fff', logo: 'logo-branco.png' },
  { nome: 'faixas-branco', painel: '#FDFAFB', marca: 'simbolo.png', opacidade: 0.18, apoio: '#1A2530', logo: 'logo.png' },
];

const html = (v) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1080px;height:1350px;overflow:hidden;font-family:Onest,sans-serif;
       background:${v.painel};position:relative}
  /* Foto sangra pela direita; o recorte é alto e estreito, centrado na barriga */
  .foto{position:absolute;right:0;top:0;width:640px;height:1350px;
        background:url(foto-gravida.jpg) 53% center/cover}
  .marca{position:absolute;left:-340px;top:50%;transform:translateY(-50%);width:1000px;
         opacity:${v.opacidade};pointer-events:none}
  .faixas{position:absolute;left:0;top:190px;display:flex;flex-direction:column;
          align-items:flex-start;gap:14px}
  .faixa{background:${ROSA};color:#fff;font-size:74px;font-weight:800;letter-spacing:-.02em;
         line-height:1.14;padding:16px 34px 20px 58px;white-space:nowrap}
  .apoio{position:absolute;left:58px;top:660px;width:400px;color:${v.apoio};
         font-size:50px;font-weight:700;line-height:1.16;letter-spacing:-.02em}
  .logo{height:104px;position:absolute;left:58px;bottom:76px}
</style></head><body>
<img class="marca" src="${v.marca}">
<div class="foto"></div>
<div class="faixas">
  <span class="faixa">Sou MEI.</span>
  <span class="faixa">Tenho direito ao</span>
  <span class="faixa">auxílio-maternidade?</span>
</div>
<p class="apoio">Faça uma análise<br>gratuita.</p>
<img class="logo" src="${v.logo}">
</body></html>`;

(async () => {
  const raiz = path.resolve(__dirname, '..', '..', '..');
  fs.copyFileSync(path.join(raiz, 'site', 'public', 'foto-gravida.jpg'), path.join(__dirname, 'foto-gravida.jpg'));

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
  console.log(`${variacoes.length} variações de faixa geradas`);
})();
