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
    // Carteira assinada e MEI/autônoma juntos, pra encurtar o carrossel (17/09/2026)
    nome: 'slide-2.png',
    html: e.duplo({
      blocos: [
        {
          kicker: 'Carteira assinada',
          titulo: 'Trabalhou registrada, nem que seja por pouco tempo?',
          corpo: 'Vale também se você <strong>foi demitida</strong> ou <strong>pediu demissão</strong> durante a gravidez.',
        },
        {
          kicker: 'MEI e autônoma',
          titulo: 'Contribuiu por conta própria para o INSS?',
          corpo: 'Em geral são necessários <strong>10 meses de contribuição</strong>.',
        },
      ],
      n: 2,
    }),
  },
  {
    nome: 'slide-3.png',
    html: e.lista({
      kicker: 'Também têm direito',
      titulo: 'Casos que muita gente não imagina:',
      itens: [
        {
          titulo: 'Empregada doméstica e trabalhadora rural',
          corpo: 'Quem trabalha na roça, para a própria família, é <strong>segurada especial</strong>.',
        },
        {
          titulo: 'Mães adolescentes ou menores de idade',
          corpo: 'Com análise das regras específicas de cada caso.',
        },
        {
          titulo: 'Mães que passaram por perda gestacional',
          corpo: 'Inclui natimorto e perda gestacional tardia.',
        },
      ],
      n: 3,
    }),
  },
  {
    // Desempregada e prazo juntos, no mesmo formato do slide 2 (17/09/2026)
    nome: 'slide-4.png',
    html: e.duplo({
      blocos: [
        {
          kicker: 'Desempregada',
          titulo: 'Parou de trabalhar? Você pode continuar segurada.',
          corpo: 'É o <strong>período de graça</strong>: em geral até 12 meses depois da última contribuição, e em alguns casos até 36.',
        },
        {
          kicker: 'O bebê já nasceu',
          titulo: 'Não perdeu o prazo só porque o bebê cresceu.',
          corpo: 'Dá para pedir até o seu filho completar <strong>4 anos e 11 meses</strong>. Depois disso, o direito prescreve.',
        },
      ],
      n: 4,
    }),
  },
  {
    nome: 'slide-5.png',
    html: e.fechamento({
      kicker: 'Análise gratuita',
      titulo: 'Não achou o seu caso? A gente confere para você.',
      corpo: 'Cada história é diferente. Responda 6 perguntas e descubra em 2 minutos — <strong style="color:#fff">de graça e sem compromisso</strong>.',
      n: 5,
    }),
  },
]);
