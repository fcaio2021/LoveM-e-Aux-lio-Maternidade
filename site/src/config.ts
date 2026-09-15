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

  // WhatsApp de atendimento: (11) 96963-9342 (definido em 14/09/2026).
  // Formato: código do país + DDD + número, só dígitos.
  whatsapp: '5511969639342',
  whatsappDefinido: true,

  instagram: '@lovemaeauxiliomaternidade',
  instagramUrl: 'https://instagram.com/lovemaeauxiliomaternidade',
  // Contato geral e da Política de Privacidade. Os avisos de lead vão pra
  // leads@lovemaeauxiliomaternidade.com.br (configurado no envio do formulário).
  email: 'contato@lovemaeauxiliomaternidade.com.br',
  cnpj: '54.787.995/0001-01',
  cidade: '',
};

/** Mensagem que já vem digitada quando a mãe abre a conversa. */
export const mensagemPadrao =
  'Olá! Quero fazer minha análise gratuita do auxílio-maternidade.';

/** Monta o link do WhatsApp. `origem` identifica qual botão gerou a conversa. */
/** Versão do site (teste A/B). Vai junto na mensagem do WhatsApp pra saber
 * de qual versão veio cada conversa. */
export const variante = 'v1';

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
 * Confirmados pela empresa em 14/09/2026. Em anúncio, número vale como oferta
 * (CDC art. 30) e propaganda enganosa é vedada (art. 37) — manter o registro
 * interno que comprova cada um e atualizar aqui quando mudar.
 */
/**
 * Destino dos contatos do formulário (14/09/2026): e-mail + planilha do Google,
 * via Google Apps Script — código e instalação em site/integracoes/planilha-leads/.
 * Colar aqui o link do "App da Web" (termina em /exec). Vazio = o formulário
 * funciona normalmente, mas NÃO salva os contatos (só avisa no console).
 */
export const envioLeads = {
  url: '',
};

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
