// Carrossel 1 da trilogia fixada: "O que é o auxílio-maternidade?" (17/09/2026)
// Uso: NODE_PATH=../../../identidade/propostas/node_modules node gerar.cjs
const e = require('../estilo-carrossel.cjs');

const capa = (cor, nome) => ({
  nome,
  html: e.capa({
    cor,
    kicker: 'Auxílio-maternidade do INSS',
    titulo: 'O que é o<br>auxílio-maternidade?',
    sub: 'O direito que muita mãe<br>descobre tarde demais.',
  }),
});

e.renderizar(__dirname, [
  capa(e.ROSA, 'slide-1-capa-rosa.png'),
  capa(e.AZUL, 'slide-1-capa-azul.png'),
  {
    nome: 'slide-2.png',
    html: e.texto({
      kicker: 'O que é',
      titulo: 'É um pagamento do INSS para você cuidar do bebê sem perder a renda.',
      corpo: 'Ele existe para que você possa se dedicar ao seu filho no começo da vida dele — <strong>sem precisar escolher entre o bebê e o salário</strong>.',
      n: 2,
    }),
  },
  {
    nome: 'slide-3.png',
    html: e.comFoto({
      kicker: 'Quando vale',
      titulo: 'Vale para parto, adoção ou guarda judicial.',
      corpo: 'Também vale em caso de <strong>perda gestacional</strong>. Não é só para quem está grávida agora.',
      foto: 'foto-mae-bebe.jpg',
      altura: 660,
      n: 3,
    }),
  },
  {
    nome: 'slide-4.png',
    html: e.texto({
      kicker: 'Quanto é',
      titulo: 'O valor depende de como você trabalhava.',
      extra: `<div class="valor" style="margin-top:46px">
        <span>As mães que atendemos recebem de</span>
        <b>R$ 6.900 a R$ 15.900</b></div>
        <p style="margin-top:38px">É pago de uma vez ou em parcelas, conforme o seu caso.
        <strong>Só a análise mostra o seu valor.</strong></p>`,
      n: 4,
    }),
  },
  {
    nome: 'slide-5.png',
    html: e.fechamento({
      kicker: 'Análise gratuita',
      titulo: 'Descubra em 2 minutos se você tem direito.',
      corpo: 'São 6 perguntas rápidas. A gente cuida de todo o resto — e <strong style="color:#fff">nunca pedimos a sua senha do gov.br</strong>.',
      n: 5,
    }),
  },
]);
