const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');

(async () => {
  const url = pathToFileURL(path.join(__dirname, 'slides.html')).href;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  await p.goto(url);
  await p.waitForTimeout(2500);
  const slides = await p.$$('.slide');
  for (let i = 0; i < slides.length; i++) {
    const nome = `slide-${String(i + 1).padStart(2, '0')}.png`;
    await slides[i].screenshot({ path: nome });
    console.log(nome);
  }
  const fonte = await p.evaluate(() => getComputedStyle(document.querySelector('h1')).fontFamily);
  const corKicker = await p.evaluate(() => getComputedStyle(document.querySelector('.kicker')).color);
  const fundo = await p.evaluate(() => getComputedStyle(document.querySelector('.slide')).backgroundColor);
  console.log('\nfonte do titulo:', fonte);
  console.log('cor do kicker:  ', corKicker, '(esperado rgb(200, 27, 92) = #C81B5C)');
  console.log('fundo da capa:  ', fundo, '(esperado rgb(253, 250, 251) = #FDFAFB)');
  await b.close();
})();
