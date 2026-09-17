# Estratégia

> O que importa agora. Prioridades, metas, prazos.
> O Claude usa isso pra decidir o que sugerir primeiro e o que adiar.
> Atualize sempre que as prioridades mudarem.

## Fase

Construção da marca e da presença digital do zero. Foco 100% no digital.

## Prioridade principal

**Gargalo atual:** não existe presença digital própria ainda. Falta:
1. Um site 100% focado em conversão (captar mães do público-alvo)
2. Um perfil no Instagram ativo, com conteúdo constante, para alcançar o máximo
   de clientes do público possível

**Pra tirar das costas (toda semana):** a criação de conteúdo — decidir o que postar,
produzir posts e stories, roteirizar. Candidata a virar skill própria via `/mapear-rotinas`.

**Concluído:**
- ✅ Identidade visual definida (10/09/2026) — paleta derivada das cores do logo,
  tipografia Nunito/Nunito Sans, arquivos de logo gerados. Ver `identidade/design-guide.md`
  e `identidade/tokens.css`. Follow-up aberto: redesenhar o símbolo em vetor (o logo é
  raster de IA; favicon a 32px fica fraco).

- ✅ Landing page de conversão construída (10/09/2026) — Astro + Netlify em `site/`.
  Estrutura baseada nas 3 referências do nicho. (No ar desde 16/09/2026 — ver abaixo.)
- ✅ Primeiro carrossel produzido — `marketing/conteudo/carrossel-desempregada-recebe-2026-09-10/`

- ✅ Nova marca LoveMãe (13/09/2026) — nome "LoveMãe auxílio maternidade". Logo com o
  mesmo coração: lado da mãe em azul Asaas `#0038E5`, lado do bebê em rosa `#FF0076`;
  "Love" azul, "Mãe" rosa, subtítulo azul. Domínio lovemaeauxiliomaternidade.com.br,
  Instagram @lovemaeauxiliomaternidade. Logo antigo guardado em `identidade/arquivo-mamae/`.
  Registro da marca no INPI a providenciar.

- ✅ Formulário de análise no site (13/09/2026) — todo botão abre o formulário
  (nome + WhatsApp → situação → trabalho → contribuição → histórico do pedido →
  outros benefícios). Salva (hoje na planilha via Apps Script) logo após nome + WhatsApp
  ("contato-inicial") e no fim ("analise-completa"); termina no WhatsApp com o
  resumo. Valor oficial comunicado: **R$ 6.900 a R$ 15.900**. Variantes A/B
  (v2–v4) guardadas em `site/variantes/` — a v1 foi a escolhida.

**Decidido em 14/09/2026:** WhatsApp (11) 96963-9342 · rosa do site = rosa do logo `#FF0076` ·
botões no verde original `#177E40` · números de prova social confirmados · CNPJ e e-mail na
Política de Privacidade.

- ✅ **Site no ar em www.lovemaeauxiliomaternidade.com.br (16/09/2026)** — GitHub
  (github.com/fcaio2021/LoveM-e-Aux-lio-Maternidade) → Netlify grátis, deploy automático a
  cada `git push` (o Claude já consegue dar push). www é o principal; sem www redireciona.
  HTTPS, cabeçalhos de segurança, selo do Netlify desligado, imagem de pré-visualização
  (`site/public/og-image.jpg`), página 404, robots.txt e sitemap.
- ✅ **Leads (16/09/2026)** — formulário → planilha "Leads LoveMãe" (Apps Script na conta
  francisco@) + aviso no leads@, devolvido à Caixa de entrada como não lido. Código e passo
  a passo em `site/integracoes/planilha-leads/`. Mudança no Apps Script NÃO publica sozinha
  (colar código → Nova versão). VPS TurboCloud fica pra fase do CRM/automações.
- ✅ **E-mail (16/09/2026)** — Google Workspace Base (R$ 20/mês), 1 usuário francisco@
  (administrador) + apelidos contato@ e leads@. DNS fica no Registro.br (campo NOME vazio —
  o painel não aceita "@"): A e CNAME do Netlify, MX, SPF, DKIM e verificações Google/Meta.
  E-mail de confirmação pra mãe: descartado (formulário não pede e-mail).
- ✅ **Meta (17/09/2026)** — portfólio LoveMãe com a Página do Facebook, Pixel "LoveMãe
  Site" (ID 1104915952108605) com PageView, Lead, CompleteRegistration e Contact testados,
  sem enviar respostas do formulário (gravidez = dado de saúde), e domínio verificado.
  Política de Privacidade avisa do Pixel. Categoria do conjunto: não usar Saúde.
  Conta de anúncios "LoveMãe Auxílio Maternidade" (ID 1099371686260745, BRL, São Paulo,
  saldo pré-pago — pausa quando zera) ligada ao Pixel. Instagram @lovemaeauxiliomaternidade
  (ID 17841426616101590) no portfólio, ligado à Página e à conta de anúncios.

**Próximos passos (antes do primeiro anúncio):** vitrine do Instagram e da Página (foto,
capa, bio, destaques, primeiros posts) → criativos do Meta Ads → campanha de Leads
otimizada pelo evento Lead → Google Search Console → CRM e dashboard pros leads.

**Pendências da empresa:**
1. Prazo de guarda dos dados na Política de Privacidade — no site está a sugestão de
   12 meses, a empresa vai definir; revisão jurídica
2. Time de operação revisar as perguntas do formulário e as respostas do FAQ

**Público chega 100% pelo celular:** site, formulário e peças são pensados primeiro pro celular. A conversão no celular é o que decide.

**Próximas prioridades (atacam o gargalo direto):**
- Criar o @ do Instagram — destrava os carrosséis
- Montar linha editorial do Instagram (pilares de conteúdo, formatos, frequência)
- Produzir os primeiros carrosséis-base: "Quem tem direito?", "O que é o auxílio
  maternidade?", "Como solicitar", "Mitos e verdades"

## O que pode esperar

Frentes de comercial, financeiro e RH dentro do MazyOS — o foco agora é marketing/digital.

## Contexto com prazo

Salário mínimo mudou em 2026 — impacta o valor do auxílio-maternidade; usar como gancho
de conteúdo atual.
