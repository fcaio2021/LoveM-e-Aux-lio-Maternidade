// Carrossel 1 da trilogia fixada: "O que é o auxílio-maternidade?" (17/09/2026)
// 1080×1350 (4:5), fonte Onest, cores da LoveMãe. Duas versões de capa: rosa e azul.
// Uso: NODE_PATH=../../../identidade/propostas/node_modules node gerar.cjs
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const ROSA = '#FF0076';
const AZUL = '#0038E5';
const ROSA_TEXTO = '#E0006A'; // rosa que passa em contraste no texto pequeno
const ESCURO = '#1A2530';
const APOIO = '#46525E';
const FUNDO = '#FDFAFB';

const base = `
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1080px;height:1350px;overflow:hidden;font-family:Onest,sans-serif;color:${ESCURO};
       background:${FUNDO};position:relative}
  .caixa{position:absolute;inset:0;padding:84px 78px;display:flex;flex-direction:column}
  .kicker{font-size:26px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${ROSA_TEXTO}}
  .regua{width:72px;height:5px;background:${ROSA};border-radius:99px;margin:22px 0 26px}
  h1{font-size:96px;line-height:1.03;font-weight:800;letter-spacing:-.025em}
  h2{font-size:64px;line-height:1.08;font-weight:800;letter-spacing:-.02em}
  p{font-size:33px;line-height:1.45;color:${APOIO};font-weight:500}
  p strong{color:${ESCURO};font-weight:700}
  .rodape{margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between}
  .logo{height:74px}
  .arraste{background:${ROSA};color:#fff;font-weight:700;font-size:27px;padding:16px 34px;border-radius:999px}
  .pagina{font-size:25px;font-weight:600;color:${APOIO}}
  .foto{border-radius:24px;overflow:hidden;background-size:cover;background-position:center}
  .valor{background:${ROSA};color:#fff;border-radius:28px;padding:44px 50px;text-align:center}
  .valor span{display:block;font-size:30px;font-weight:600;opacity:.92;margin-bottom:8px}
  .valor b{font-size:76px;font-weight:800;letter-spacing:-.02em;line-height:1.05;display:block}
  .cheio{color:#fff}
  .cheio p{color:rgba(255,255,255,.92)}
  .cheio .kicker{color:rgba(255,255,255,.9)}
  .cheio .regua{background:#fff}
  .pill{display:inline-block;background:#fff;color:${ESCURO};font-weight:700;font-size:30px;
        padding:20px 40px;border-radius:999px}
</style>`;

// Capa: bloco de texto centralizado na vertical (sem o vazio embaixo) e o
// título quebrado à mão, pra "auxílio-maternidade" nunca partir no meio.
const capa = (cor) => `${base}<body style="background:${cor}">
  <div class="caixa cheio" style="justify-content:center">
    <p class="kicker">Auxílio-maternidade do INSS</p>
    <div class="regua"></div>
    <h1 style="font-size:76px">O que é o<br>auxílio-maternidade?</h1>
    <p style="margin-top:34px;font-size:36px">O direito que muita mãe<br>descobre tarde demais.</p>
  </div>
  <img class="logo" src="logo-branco.png" style="position:absolute;left:78px;bottom:78px">
  <span class="arraste" style="position:absolute;right:78px;bottom:84px;background:#fff;color:${cor}">arraste →</span>
  </body>`;

// Rodapé fixo no canto de baixo: o conteúdo fica centralizado na vertical, sem
// sobra de espaço embaixo (era o que deixava os slides de texto "caindo" pra cima).
const rodape = (n, branco = false) => `
  <img class="logo" src="${branco ? 'logo-branco.png' : 'logo.png'}"
       style="position:absolute;left:78px;bottom:78px">
  <span class="pagina" style="position:absolute;right:78px;bottom:84px${branco ? ';color:rgba(255,255,255,.9)' : ''}">${n}</span>`;

const slides = [
  // 2 — definição
  `${base}<body><div class="caixa" style="justify-content:center">
    <p class="kicker">O que é</p><div class="regua"></div>
    <h2>É um pagamento do INSS para você cuidar do bebê sem perder a renda.</h2>
    <p style="margin-top:36px">Ele existe para que você possa se dedicar ao seu filho no
    começo da vida dele — <strong>sem precisar escolher entre o bebê e o salário</strong>.</p>
  </div>${rodape(2)}</body>`,
  // 3 — quando vale, com foto
  `${base}<body><div class="caixa" style="padding-bottom:0">
    <p class="kicker">Quando vale</p><div class="regua"></div>
    <h2>Vale para parto, adoção ou guarda judicial.</h2>
    <p style="margin-top:30px">Também vale em caso de <strong>perda gestacional</strong>.
    Não é só para quem está grávida agora.</p>
  </div>
  <!-- A foto sangra até as bordas de baixo; o degradê garante leitura do logo branco -->
  <div class="foto" style="position:absolute;left:0;right:0;bottom:0;height:660px;
       background-image:url(foto-mae-bebe.jpg);background-position:center 20%;
       border-radius:24px 24px 0 0"></div>
  <div style="position:absolute;left:0;right:0;bottom:0;height:260px;
       background:linear-gradient(to top,rgba(16,34,50,.62),transparent);border-radius:0 0 24px 24px"></div>
  <img class="logo" src="logo-branco.png" style="position:absolute;left:78px;bottom:64px;height:66px">
  <span class="pagina" style="position:absolute;right:78px;bottom:70px;color:#fff">3</span>
  </body>`,
  // 4 — valor
  `${base}<body><div class="caixa" style="justify-content:center">
    <p class="kicker">Quanto é</p><div class="regua"></div>
    <h2>O valor depende de como você trabalhava.</h2>
    <div class="valor" style="margin-top:46px">
      <span>As mães que atendemos recebem de</span>
      <b>R$ 6.900 a R$ 15.900</b>
    </div>
    <p style="margin-top:38px">É pago de uma vez ou em parcelas, conforme o seu caso.
    <strong>Só a análise mostra o seu valor.</strong></p>
  </div>${rodape(4)}</body>`,
  // 5 — CTA
  `${base}<body style="background:${ROSA}"><div class="caixa cheio" style="justify-content:center">
    <p class="kicker">Análise gratuita</p><div class="regua"></div>
    <h2>Descubra em 2 minutos se você tem direito.</h2>
    <p style="margin-top:32px">São 6 perguntas rápidas. A gente cuida de todo o resto —
    e <strong style="color:#fff">nunca pedimos a sua senha do gov.br</strong>.</p>
    <p style="margin-top:44px"><span class="pill">👉 Link na bio</span></p>
  </div>${rodape(5, true)}</body>`,
];

(async () => {
  const b = await chromium.launch();
  const tmp = path.join(__dirname, '.tmp.html');
  const render = async (html, saida) => {
    fs.writeFileSync(tmp, html);
    const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
    await p.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(__dirname, saida) });
    await p.close();
  };
  await render(capa(ROSA), 'slide-1-capa-rosa.png');
  await render(capa(AZUL), 'slide-1-capa-azul.png');
  for (let i = 0; i < slides.length; i++) await render(slides[i], `slide-${i + 2}.png`);
  fs.unlinkSync(tmp);
  await b.close();
})();
