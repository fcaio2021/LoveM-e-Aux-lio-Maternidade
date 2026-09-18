// Carrossel 3 da trilogia fixada: "Como funciona com a LoveMãe" (17/09/2026)
// Uso: NODE_PATH=../../../identidade/propostas/node_modules node gerar.cjs
const e = require('../estilo-carrossel.cjs');

e.renderizar(__dirname, [
  {
    nome: 'slide-1.png',
    html: e.capa({
      kicker: 'Passo a passo',
      titulo: 'Como funciona<br>com a LoveMãe',
      sub: 'Do primeiro clique<br>até o INSS pagar.',
    }),
  },
  {
    nome: 'slide-2.png',
    html: e.texto({
      cor: e.AZUL,
      passo: '1',
      titulo: 'Você responde 6 perguntas no site.',
      corpo: 'Leva 2 minutos, direto do celular. Só o básico: como você trabalhava e como está a sua gravidez ou o seu bebê.',
      n: 2,
    }),
  },
  {
    nome: 'slide-3.png',
    html: e.texto({
      cor: e.AZUL,
      passo: '2',
      titulo: 'A gente analisa e te chama no WhatsApp.',
      corpo: 'Uma pessoa de verdade olha o seu caso e te explica, <strong>sem juridiquês</strong>, se você tem direito e qual o valor.',
      n: 3,
    }),
  },
  {
    nome: 'slide-4.png',
    html: e.texto({
      cor: e.AZUL,
      passo: '3',
      titulo: 'Cuidamos do pedido e acompanhamos até o fim.',
      corpo: 'Organizamos os documentos, damos entrada no INSS e acompanhamos <strong>até o pagamento cair</strong>.',
      n: 4,
    }),
  },
  {
    nome: 'slide-5.png',
    html: e.texto({
      cor: e.AZUL,
      kicker: 'Segurança',
      titulo: 'Nunca pedimos a sua senha do gov.br.',
      corpo: 'Nenhuma etapa precisa dela. Seus dados ficam protegidos e você recebe tudo por escrito, <strong>sem letra miúda</strong>.',
      n: 5,
    }),
  },
  {
    nome: 'slide-6.png',
    html: e.fechamento({
      kicker: 'Análise gratuita',
      titulo: 'Já são mais de 5 mil mães aprovadas.',
      corpo: 'A sua análise é gratuita e sem compromisso. <strong style="color:#fff">Descubra hoje se o dinheiro é seu.</strong>',
      n: 6,
    }),
  },
]);
