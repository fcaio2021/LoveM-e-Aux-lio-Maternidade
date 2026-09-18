// Carrossel 1 da trilogia fixada: "O que é o auxílio-maternidade?" (17/09/2026)
// Copy revisada pela empresa em 17/09/2026. Capa rosa (decisão da mesma data).
// Uso: NODE_PATH=../../../identidade/propostas/node_modules node gerar.cjs
const e = require('../estilo-carrossel.cjs');

e.renderizar(__dirname, [
  {
    nome: 'slide-1.png',
    html: e.capa({
      kicker: 'Auxílio-maternidade do INSS',
      titulo: 'O que é o<br>auxílio-maternidade?',
      sub: 'O direito que muita mãe<br>descobre tarde demais.',
    }),
  },
  {
    nome: 'slide-2.png',
    html: e.texto({
      kicker: 'O que é',
      titulo: 'É o benefício do INSS feito para apoiar você nos primeiros momentos da maternidade.',
      corpo: 'Garante a <strong>proteção e a estabilidade financeira</strong> que a sua família precisa nesse momento tão especial.',
      n: 2,
    }),
  },
  {
    nome: 'slide-3.png',
    html: e.comFoto({
      kicker: 'Quando vale',
      titulo: 'O apoio para você focar apenas no seu bebê.',
      corpo: 'Com a sua <strong>renda protegida</strong> e a sua rotina mais tranquila nos primeiros meses de vida.',
      foto: 'foto-mae-bebe.jpg',
      altura: 660,
      n: 3,
    }),
  },
  {
    nome: 'slide-4.png',
    html: e.texto({
      kicker: 'Quanto é',
      titulo: 'Um direito de mães biológicas e adotivas.',
      extra: `<div class="valor" style="margin-top:46px">
        <span>Você pode receber de</span>
        <b>R$ 6.900 a R$ 15.900</b></div>
        <p style="margin-top:38px">Se você já contribuiu com o INSS,
        <strong>pode ter esse dinheiro a receber.</strong></p>`,
      n: 4,
    }),
  },
  {
    nome: 'slide-5.png',
    html: e.fechamento({
      kicker: 'Análise gratuita',
      titulo: 'Descubra em 2 minutos se você tem direito.',
      corpo: 'Responda o questionário simples. Cuidamos de todo o resto — e <strong style="color:#fff">nunca pedimos a sua senha do gov.br</strong>.',
      n: 5,
    }),
  },
]);
