/**
 * LoveMãe Auxílio Maternidade — recebe os contatos do formulário do site.
 *
 * Cada envio do site vira (1) uma linha na aba "Leads" desta planilha e
 * (2) um e-mail de aviso pra equipe, com botão pra chamar a mãe no WhatsApp.
 *
 * Uma mãe = uma linha: o site manda um código (id) no primeiro envio
 * ("Novo contato", logo após nome + WhatsApp) e o mesmo código no fim
 * ("Análise concluída"). A linha é completada, não duplicada.
 *
 * Instalação e atualização: ver README.md nesta pasta.
 */

// Quem recebe os avisos. Enquanto a caixa leads@ não existir, trocar por um
// Gmail da equipe (dá pra pôr mais de um, separados por vírgula).
const EMAIL_AVISOS = 'leads@lovemaeauxiliomaternidade.com.br';
const NOME_ABA = 'Leads';

// [campo enviado pelo site, título da coluna na planilha]
const COLUNAS = [
  ['id', 'Código'],
  ['data', 'Data do contato'],
  ['etapa', 'Etapa'],
  ['nome', 'Nome'],
  ['whatsapp', 'WhatsApp'],
  ['situacao', 'Situação'],
  ['idade', 'Bebê passou de 4 anos e 11 meses?'],
  ['trabalho', 'Trabalho'],
  ['contribuiu', 'Contribuiu nos 3 anos antes'],
  ['tempo', 'Última contribuição'],
  ['seguro', 'Seguro-desemprego'],
  ['recebeu', 'Já recebeu por esse bebê'],
  ['pedido', 'Pedido no INSS'],
  ['beneficios', 'Outros benefícios'],
  ['desfecho', 'Desfecho'],
  ['origem', 'Botão / perfil tocado'],
  ['utm_source', 'Fonte (utm_source)'],
  ['utm_medium', 'Meio (utm_medium)'],
  ['utm_campaign', 'Campanha (utm_campaign)'],
  ['utm_content', 'Anúncio (utm_content)'],
  ['utm_term', 'Termo (utm_term)'],
  ['fbclid', 'Clique do Facebook (fbclid)'],
  ['gclid', 'Clique do Google (gclid)'],
  ['referencia', 'Veio de'],
  ['pagina_entrada', 'Página de entrada'],
  ['data_entrada', 'Chegou ao site em'],
  ['variante', 'Versão do site'],
  ['consentimento', 'Consentimento'],
];

// Campos que não entram na tabela do e-mail (já aparecem no topo ou são técnicos)
const FORA_DO_EMAIL = ['id', 'data', 'etapa', 'nome', 'whatsapp', 'variante', 'consentimento', 'fbclid', 'gclid', 'pagina_entrada', 'data_entrada'];

/** Recebe o envio do site. */
function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p['bot-field']) return resposta_('ok');                 // robô preencheu a isca
  if (!p.nome || !p.whatsapp) return resposta_('faltam nome e WhatsApp');

  const etapa = p['form-name'] === 'analise-completa' ? 'Análise concluída' : 'Novo contato';

  // Trava: dois envios ao mesmo tempo não podem escrever na mesma linha
  const trava = LockService.getScriptLock();
  trava.waitLock(15000);
  try {
    gravar_(p, etapa);
  } finally {
    trava.releaseLock();
  }
  avisar_(p, etapa);
  return resposta_('ok');
}

/** Abrir o link no navegador mostra esta frase: serve pra testar se está no ar. */
function doGet() {
  return resposta_('LoveMãe: recebimento de leads funcionando.');
}

/** Rodar UMA vez pelo editor (botão Executar) pra autorizar e criar a aba. */
function configurar() {
  aba_();
  MailApp.sendEmail(
    EMAIL_AVISOS,
    'LoveMãe: aviso de leads configurado',
    'Tudo certo. Os próximos contatos do formulário do site chegam neste e-mail e na planilha.'
  );
}

// ---------------------------------------------------------------------------

function gravar_(p, etapa) {
  const aba = aba_();
  const valores = COLUNAS.map(([campo]) =>
    campo === 'data' ? new Date() : campo === 'etapa' ? etapa : limpo_(p[campo])
  );

  // Procura a linha dessa mãe (mesmo código) entre as últimas 1000
  const ultima = aba.getLastRow();
  if (p.id && ultima > 1) {
    const inicio = Math.max(2, ultima - 999);
    const ids = aba.getRange(inicio, 1, ultima - inicio + 1, 1).getValues();
    for (let i = ids.length - 1; i >= 0; i--) {
      if (String(ids[i][0]) !== String(p.id)) continue;
      const linha = inicio + i;
      const atual = aba.getRange(linha, 1, 1, COLUNAS.length).getValues()[0];
      // Mantém a data do primeiro contato e o que já estava preenchido
      const novo = valores.map((v, c) => (COLUNAS[c][0] === 'data' || v === '' ? atual[c] : v));
      aba.getRange(linha, 1, 1, COLUNAS.length).setValues([novo]);
      return;
    }
  }
  aba.appendRow(valores);
}

function aba_() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(NOME_ABA);
  if (!aba) {
    aba = planilha.insertSheet(NOME_ABA);
    aba.appendRow(COLUNAS.map(([, titulo]) => titulo));
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold').setBackground('#FFE3EF');
    aba.hideColumns(1); // o código é só pra ligar os dois envios da mesma mãe
  }
  return aba;
}

/** Texto que vem do site: corta o tamanho e impede fórmula (=, +, -, @ no começo). */
function limpo_(v) {
  const t = String(v == null ? '' : v).slice(0, 500);
  return /^[=+\-@]/.test(t) ? "'" + t : t;
}

function avisar_(p, etapa) {
  const nome = String(p.nome).slice(0, 120);
  const primeiroNome = nome.split(' ')[0];
  const digitos = String(p.whatsapp).replace(/\D/g, '');
  const mensagem = 'Olá, ' + primeiroNome + '! Aqui é da LoveMãe Auxílio Maternidade. ' +
    'Recebemos seu pedido de análise gratuita pelo site.';
  const linkZap = 'https://wa.me/55' + digitos + '?text=' + encodeURIComponent(mensagem);

  const linhas = COLUNAS
    .filter(([campo]) => FORA_DO_EMAIL.indexOf(campo) === -1 && p[campo])
    .map(([campo, titulo]) =>
      '<tr><td style="padding:5px 14px 5px 0;color:#6A5F67;vertical-align:top">' + esc_(titulo) +
      '</td><td style="padding:5px 0;color:#1A2530"><b>' + esc_(p[campo]) + '</b></td></tr>')
    .join('');

  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1A2530;max-width:560px">' +
    '<p style="margin:0 0 4px;color:#FF0076;font-weight:bold">' + esc_(etapa) + '</p>' +
    '<h2 style="margin:0 0 4px;font-size:22px">' + esc_(nome) + '</h2>' +
    '<p style="margin:0 0 18px;font-size:17px">' + esc_(p.whatsapp) + '</p>' +
    '<p style="margin:0 0 18px"><a href="' + linkZap + '" style="display:inline-block;background:#177E40;' +
    'color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:999px">' +
    'Chamar no WhatsApp</a></p>' +
    (linhas ? '<table style="border-collapse:collapse">' + linhas + '</table>' : '') +
    '<p style="margin-top:22px;font-size:12px;color:#6A5F67">Enviado pelo formulário do site. ' +
    'A lista completa fica na planilha de leads.</p></div>';

  MailApp.sendEmail({
    to: EMAIL_AVISOS,
    subject: etapa + ': ' + nome + ' · ' + p.whatsapp,
    htmlBody: html,
    name: 'Site LoveMãe',
  });
}

function esc_(t) {
  return String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function resposta_(texto) {
  return ContentService.createTextOutput(texto);
}
