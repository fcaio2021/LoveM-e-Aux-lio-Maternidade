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
  Estrutura baseada nas 3 referências do nicho. **Bloqueada pro ar** até definir o
  número de WhatsApp (`site/src/config.ts`) e o time de operação revisar os textos.
- ✅ Primeiro carrossel produzido — `marketing/conteudo/carrossel-desempregada-recebe-2026-09-10/`

- ✅ Nova marca LoveMãe (13/09/2026) — nome "LoveMãe auxílio maternidade". Logo com o
  mesmo coração: lado da mãe em azul Asaas `#0038E5`, lado do bebê em rosa `#FF0076`;
  "Love" azul, "Mãe" rosa, subtítulo azul. Domínio lovemaeauxiliomaternidade.com.br,
  Instagram @lovemaeauxiliomaternidade. Logo antigo guardado em `identidade/arquivo-mamae/`.
  Registro da marca no INPI a providenciar.

- ✅ Formulário de análise no site (13/09/2026) — todo botão abre o formulário
  (nome + WhatsApp → situação → trabalho → contribuição → histórico do pedido →
  outros benefícios). Salva no **Netlify Forms** logo após nome + WhatsApp
  ("contato-inicial") e no fim ("analise-completa"); termina no WhatsApp com o
  resumo. Valor oficial comunicado: **R$ 6.900 a R$ 15.900**. Variantes A/B
  (v2–v4) guardadas em `site/variantes/` — a v1 foi a escolhida.

**Decidido em 14/09/2026:** WhatsApp (11) 96963-9342 · rosa do site = rosa do logo `#FF0076` ·
botões no verde original `#177E40` · números de prova social confirmados · CNPJ e e-mail na
Política de Privacidade.

**Pendências pro site ir ao ar:**
1. Leads: ✅ decidido — e-mail (leads@) + planilha Google via Apps Script (grátis). Código
   e passo a passo em `site/integracoes/planilha-leads/`; falta instalar na conta Google e
   colar o link em `site/src/config.ts` (`envioLeads.url`). VPS TurboCloud fica pra fase
   do CRM/automações.
2. Publicar: repositório próprio no GitHub ✅ (github.com/fcaio2021/LoveM-e-Aux-lio-Maternidade;
   o primeiro envio ainda não foi feito — o usuário roda `git push` no terminal do VS Code)
   → Netlify grátis → domínio. **E-mail (decidido 15/09/2026):** Google Workspace Base
   (R$ 20/mês), 1 usuário contato@ + apelido leads@. Por isso o DNS fica no Registro.br
   (MX do Google lá) e o site é apontado pro Netlify só com CNAME/A. Automação da
   planilha instalada na conta contato@ (limite ~1.500 e-mails/dia).

**Próxima sessão:** envio pro GitHub → contratar Workspace e verificar domínio →
instalar a automação da planilha (link /exec em `config.ts`) → Netlify → domínio →
Pixel da Meta → perfil do Instagram.
3. Prazo de guarda dos dados na Política de Privacidade — no site está a sugestão de
   12 meses, a empresa vai definir; revisão jurídica
4. Time de operação revisar as perguntas do formulário e as respostas do FAQ

**Público chega 100% pelo celular:** site, formulário e peças são pensados primeiro pro celular. A conversão no celular é o que decide.
**Próxima rodada (13/09/2026):** pente fino do site no celular + Pixel da Meta → perfil do Instagram → criativos do Meta Ads → CRM e dashboard pros leads.

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
