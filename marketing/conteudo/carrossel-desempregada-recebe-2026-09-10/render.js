// Renderiza cada .slide do carrossel.html em PNG 1080x1350.
// Reaproveita o node_modules de identidade/propostas (nao precisa npm install aqui):
//   NODE_PATH="../../../identidade/propostas/node_modules" node render.js
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

(async () => {
  const url = pathToFileURL(path.join(__dirname, 'carrossel.html')).href;
  fs.mkdirSync(path.join(__dirname, 'instagram'), { recursive: true });

  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.goto(url);
  await p.waitForLoadState('networkidle');
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1200);

  const slides = await p.$$('.slide');
  for (let i = 0; i < slides.length; i++) {
    const nome = `instagram/slide-${String(i + 1).padStart(2, '0')}.png`;
    await slides[i].screenshot({ path: path.join(__dirname, nome) });
    console.log(nome);
  }

  // Confere que as fontes carregaram de verdade (fallback silencioso e o risco)
  const checagem = await p.evaluate(() => ({
    scriptOk: document.fonts.check('76px Parisienne'),
    nunitoOk: document.fonts.check('800 82px Nunito'),
    nunitoSansOk: document.fonts.check('400 30px "Nunito Sans"'),
  }));
  console.log('\nfontes carregadas:', JSON.stringify(checagem));
  if (Object.values(checagem).some((v) => !v)) {
    console.error('ATENCAO: alguma fonte caiu em fallback — conferir os PNGs.');
  }

  // Nenhum elemento pode invadir a faixa do rodapé
  const colisoes = await p.evaluate(() => {
    const fora = [];
    document.querySelectorAll('.slide').forEach((s, i) => {
      const rodape = s.querySelector('.rodape');
      if (!rodape) return;
      const limite = rodape.getBoundingClientRect().top;
      s.querySelectorAll('.miolo *').forEach((el) => {
        if (el.getBoundingClientRect().bottom > limite + 1) {
          fora.push(`slide ${i + 1}: <${el.tagName.toLowerCase()}> invade o rodapé`);
        }
      });
    });
    return [...new Set(fora)];
  });
  console.log(colisoes.length ? '\ncolisoes:\n  ' + colisoes.join('\n  ') : '\nsem colisao com o rodape');

  await b.close();
})();
