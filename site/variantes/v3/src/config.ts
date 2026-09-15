/**
 * Configuração central do site.
 *
 * TUDO que muda com frequência mora aqui. Em especial o WhatsApp: ele é o motor
 * de conversão do site inteiro, aparece em 6 lugares diferentes, e trocar em um
 * só lugar evita o clássico "esqueci de atualizar um botão".
 */

export const empresa = {
  nome: 'LoveMãe Auxílio Maternidade',
  dominio: 'www.lovemaeauxiliomaternidade.com.br',

  // ⚠️ PLACEHOLDER — trocar quando o número de atendimento for definido.
  // Formato: código do país + DDD + número, só dígitos.
  whatsapp: '5500000000000',
  whatsappDefinido: false, // vira true quando o número real entrar

  // ⚠️ PREENCHER antes de publicar
  instagram: '@lovemaeauxiliomaternidade',
  instagramUrl: 'https://instagram.com/lovemaeauxiliomaternidade',
  email: '',
  cnpj: '',
  cidade: '',
};

/** Mensagem que já vem digitada quando a mãe abre a conversa. */
export const mensagemPadrao =
  'Olá! Quero fazer minha análise gratuita do auxílio-maternidade.';

/** Monta o link do WhatsApp. `origem` identifica qual botão gerou a conversa. */
/** Versão do site (teste A/B). Vai junto na mensagem do WhatsApp pra saber
 * de qual versão veio cada conversa. */
export const variante = 'v3';

export function linkWhatsApp(origem?: string): string {
  const marca = origem ? `${variante} · ${origem}` : variante;
  const texto = `${mensagemPadrao} (${marca})`;
  return `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(texto)}`;
}

/** Faixa de valores comunicada. Revisar quando o salário mínimo mudar. */
export const valores = {
  minimo: 'R$ 6.900',
  maximo: 'R$ 15.900',
  duracaoPadrao: '120 dias',
  duracaoEstendida: '180 dias',
};

/**
 * Números de prova social exibidos no site.
 *
 * ⚠️ CONFIRMAR ANTES DE PUBLICAR. Em anúncio, número vale como oferta
 * (CDC art. 30) e propaganda enganosa é vedada (art. 37) — cada um precisa
 * ser verdadeiro e comprovável com registro interno da operação.
 */
export const provaSocial = [
  { numero: '+5 mil', rotulo: 'mães aprovadas com nossa equipe' },
  { numero: '+5', rotulo: 'anos de experiência' },
  { numero: '99%', rotulo: 'de taxa de aprovação' },
];

export const seo = {
  titulo: 'Auxílio-Maternidade | Descubra se você tem direito — análise gratuita',
  descricao:
    'Ajudamos mães a solicitar e receber o auxílio-maternidade do INSS. ' +
    'Análise gratuita, processo 100% online e sem pedir sua senha do Gov.br.',
};
