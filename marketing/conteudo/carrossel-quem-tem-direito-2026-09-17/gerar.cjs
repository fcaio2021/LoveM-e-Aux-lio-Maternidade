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
      kicker: 'O que é',
      titulo: 'Um pagamento do INSS para você cuidar do seu bebê sem perder a renda.',
      corpo: 'É um <strong>direito seu</strong>, construído pelas contribuições que você já fez. Não é favor nem ajuda.',
      n: 2,
    }),
  },
  {
    // Carteira assinada e MEI/autônoma juntos, pra encurtar o carrossel (17/09/2026)
    nome: 'slide-3.png',
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
      n: 3,
    }),
  },
  {
    nome: 'slide-4.png',
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
      n: 4,
    }),
  },
  {
    // Desempregada e prazo juntos, no mesmo formato do slide 2 (17/09/2026)
    nome: 'slide-5.png',
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
      n: 5,
    }),
  },
  {
    nome: 'slide-6.png',
    html: e.fechamento({
      kicker: 'Análise gratuita',
      titulo: 'Ficou na dúvida se tem direito?',
      corpo: 'Veja se você tem direito ao auxílio-maternidade! Clique no link da bio e faça o teste em 2 minutos. <strong style="color:#fff">Análise totalmente gratuita e sem qualquer compromisso.</strong>',
      n: 6,
    }),
  },
]);
