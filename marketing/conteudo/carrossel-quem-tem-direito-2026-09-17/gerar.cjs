// Carrossel 2 da trilogia fixada: "Será que eu tenho direito?" (17/09/2026)
// Uso: NODE_PATH=../../../identidade/propostas/node_modules node gerar.cjs
const e = require('../estilo-carrossel.cjs');

e.renderizar(__dirname, [
  {
    nome: 'slide-1.png',
    html: e.capa({
      kicker: 'Quem tem direito',
      titulo: 'Será que eu<br>tenho direito?',
      sub: 'Veja se o seu caso<br>está nesta lista.',
    }),
  },
  {
    nome: 'slide-2.png',
    html: e.texto({
      cor: e.AZUL,
      kicker: 'Carteira assinada',
      titulo: 'Trabalhou registrada, nem que seja por pouco tempo?',
      corpo: 'Vale também se você <strong>foi demitida</strong> ou <strong>pediu demissão</strong> durante a gravidez.',
      n: 2,
    }),
  },
  {
    nome: 'slide-3.png',
    html: e.texto({
      cor: e.AZUL,
      kicker: 'MEI e autônoma',
      titulo: 'Contribuiu por conta própria para o INSS?',
      corpo: 'MEI, autônoma ou contribuinte individual: em geral são necessários <strong>10 meses de contribuição</strong>.',
      n: 3,
    }),
  },
  {
    nome: 'slide-4.png',
    html: e.texto({
      cor: e.AZUL,
      kicker: 'Doméstica e rural',
      titulo: 'Empregada doméstica e trabalhadora rural também têm direito.',
      corpo: 'Quem trabalha na roça, para a própria família, é <strong>segurada especial</strong> — e pode pedir mesmo sem nunca ter contribuído.',
      n: 4,
    }),
  },
  {
    nome: 'slide-5.png',
    html: e.comFoto({
      cor: e.AZUL,
      kicker: 'Desempregada',
      titulo: 'Parou de trabalhar? Você pode continuar segurada.',
      corpo: 'É o <strong>período de graça</strong>: em geral até 12 meses depois da última contribuição, e em alguns casos até 36.',
      foto: 'foto-desempregada.jpg',
      posicao: 'center 25%',
      altura: 560,
      n: 5,
    }),
  },
  {
    nome: 'slide-6.png',
    html: e.texto({
      cor: e.AZUL,
      kicker: 'O bebê já nasceu',
      titulo: 'Não perdeu o prazo só porque o bebê cresceu.',
      extra: `<div class="valor" style="margin-top:44px">
        <span>Dá para pedir até o seu filho completar</span>
        <b>4 anos e 11 meses</b></div>
        <p style="margin-top:36px">Depois disso, o direito prescreve. <strong>Quanto antes você
        checar, melhor.</strong></p>`,
      n: 6,
    }),
  },
  {
    nome: 'slide-7.png',
    html: e.fechamento({
      kicker: 'Análise gratuita',
      titulo: 'Não achou o seu caso? A gente confere para você.',
      corpo: 'Cada história é diferente. Responda 6 perguntas e descubra em 2 minutos — <strong style="color:#fff">de graça e sem compromisso</strong>.',
      n: 7,
    }),
  },
]);
