// Carrossel 3 da trilogia fixada: "Como funciona com a LoveMãe" (17/09/2026)
// Copy revisada pela empresa em 18/09/2026.
// Uso: NODE_PATH=../../../identidade/propostas/node_modules node gerar.cjs
const e = require('../estilo-carrossel.cjs');

e.renderizar(__dirname, [
  {
    nome: 'slide-1.png',
    html: e.capa({
      kicker: 'Passo a passo',
      titulo: 'Como funciona<br>com a LoveMãe',
      sub: 'Sem complicação,<br>da análise ao pagamento.',
    }),
  },
  {
    nome: 'slide-2.png',
    html: e.texto({
      passo: '1',
      titulo: 'Você responde um questionário rápido no site.',
      corpo: 'Leva 2 minutos, direto do celular. Só o básico: como você trabalhava e como está a sua gravidez ou o seu bebê.',
      n: 2,
    }),
  },
  {
    nome: 'slide-3.png',
    html: e.texto({
      passo: '2',
      titulo: 'Nossa equipe faz uma avaliação detalhada do seu caso.',
      corpo: 'E te envia uma mensagem explicando <strong>cada detalhe do benefício</strong>.',
      n: 3,
    }),
  },
  {
    nome: 'slide-4.png',
    html: e.texto({
      passo: '3',
      titulo: 'Organizamos a documentação e fazemos o pedido no INSS.',
      corpo: 'E acompanhamos <strong>do início ao fim</strong>.',
      n: 4,
    }),
  },
  {
    nome: 'slide-5.png',
    html: e.texto({
      kicker: 'Segurança',
      titulo: 'Nunca pedimos a sua senha do gov.br.',
      corpo: 'Em nenhuma fase do atendimento iremos solicitar a sua senha. <strong>Garantimos sigilo total das suas informações.</strong>',
      n: 5,
    }),
  },
  {
    nome: 'slide-6.png',
    html: e.fechamento({
      kicker: 'Análise gratuita',
      titulo: 'Não perca tempo, mamãe.',
      corpo: 'Faça sua análise gratuita e sem compromisso. <strong style="color:#fff">Descubra hoje se você tem direito ao auxílio-maternidade.</strong>',
      n: 6,
    }),
  },
]);
