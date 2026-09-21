// Criativos da campanha 1 (Click to WhatsApp) — 21/09/2026.
// Mesmo layout de faixas aprovado no post 4: painel de cor, faixa rosa com texto branco,
// foto sangrando à direita (opcional) e logo no rodapé.
// Uso (desta pasta): NODE_PATH=../../../identidade/propostas/node_modules node gerar.cjs
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const ROSA = '#FF0076';
const AZUL = '#0038E5';
const ESCURO = '#1A2530';
const CLARO = '#FDFAFB';

const criativos = [
  {
    nome: 'anuncio-1-mei',
    painel: CLARO, marca: 'simbolo.png', opacidade: 0.18, logo: 'logo.png', apoioCor: ESCURO,
    foto: 'foto-gravida.jpg', fotoPos: '53% center',
    faixas: ['Sou MEI.', 'Tenho direito ao', 'auxílio-maternidade?'],
    apoio: 'Faça uma análise<br>gratuita.',
  },
  {
    nome: 'anuncio-2-valor',
    painel: CLARO, marca: 'simbolo.png', opacidade: 0.18, logo: 'logo.png', apoioCor: ESCURO,
    foto: 'mae-bebe-sorriso.jpg', fotoPos: '50% center',
    faixas: ['Quanto eu', 'vou receber?'],
    // O número é o que segura o olho: entra maior que o apoio dos outros criativos.
    apoio: 'De <b style="color:' + ROSA + '">R$ 6.900<br>a R$ 15.900</b>.',
    apoioTamanho: 58,
  },
  {
    // Sem foto: segurança pede fundo chapado, que lê como aviso.
    nome: 'anuncio-3-seguranca',
    painel: AZUL, marca: 'simbolo-branco.png', opacidade: 0.15, logo: 'logo-branco.png', apoioCor: '#fff',
    faixas: ['A LoveMãe nunca', 'pede a sua senha', 'do gov.br.'],
    apoio: 'Em nenhuma etapa<br>do atendimento.',
  },
];

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1080px;height:1350px;overflow:hidden;font-family:Onest,sans-serif;
       background:${c.painel};position:relative}
  .foto{position:absolute;right:0;top:0;width:640px;height:1350px;
        background:url(${c.foto}) ${c.fotoPos}/cover}
  .marca{position:absolute;${c.foto ? 'left:-340px' : 'right:-240px'};top:50%;
         transform:translateY(-50%);width:${c.foto ? 1000 : 1150}px;
         opacity:${c.opacidade};pointer-events:none}
  .faixas{position:absolute;left:0;top:190px;display:flex;flex-direction:column;
          align-items:flex-start;gap:14px}
  .faixa{background:${ROSA};color:#fff;font-size:74px;font-weight:800;letter-spacing:-.02em;
         line-height:1.14;padding:16px 34px 20px 58px;white-space:nowrap}
  .apoio{position:absolute;left:58px;top:660px;width:${c.foto ? 400 : 620}px;color:${c.apoioCor};
         font-size:${c.apoioTamanho || 50}px;font-weight:700;line-height:1.16;letter-spacing:-.02em}
  .logo{height:104px;position:absolute;left:58px;bottom:76px}
</style></head><body>
<img class="marca" src="${c.marca}">
${c.foto ? '<div class="foto"></div>' : ''}
<div class="faixas">${c.faixas.map((f) => `<span class="faixa">${f}</span>`).join('')}</div>
<p class="apoio">${c.apoio}</p>
<img class="logo" src="${c.logo}">
</body></html>`;

(async () => {
  const raiz = path.resolve(__dirname, '..', '..', '..');
  for (const [de, para] of [
    ['identidade/logo.png', 'logo.png'],
    ['identidade/logo-branco.png', 'logo-branco.png'],
    ['identidade/logo-simbolo.png', 'simbolo.png'],
    ['identidade/logo-simbolo-branco.png', 'simbolo-branco.png'],
    ['site/public/foto-gravida.jpg', 'foto-gravida.jpg'],
    ['site/public/mae-bebe-sorriso.jpg', 'mae-bebe-sorriso.jpg'],
  ]) fs.copyFileSync(path.join(raiz, de), path.join(__dirname, para));

  const b = await chromium.launch();
  const tmp = path.join(__dirname, '.tmp.html');
  for (const c of criativos) {
    fs.writeFileSync(tmp, html(c));
    const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
    await p.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(__dirname, `${c.nome}.png`) });
    await p.close();
  }
  fs.unlinkSync(tmp);
  await b.close();
  console.log(`${criativos.length} criativos gerados`);
})();
