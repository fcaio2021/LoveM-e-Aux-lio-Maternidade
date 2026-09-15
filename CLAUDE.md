# MazyOS — Sistema operacional do negócio

Sua empresa roda em cima desse arquivo. Aqui ficam as regras de operação
do MazyOS — como o Claude lê o contexto, aprende com correções, mantém
tudo atualizado e cria skills novas conforme a operação evolui.

Esse arquivo é editável. Quando o `/instalar` rodar, ele complementa o
final dessa página com as regras específicas do seu negócio.

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (quando existirem
e estiverem preenchidos):

1. `_memoria/empresa.md` — quem é o usuário, o que faz, como funciona o negócio
2. `_memoria/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, prazos

Usar essas informações como base pra qualquer resposta ou decisão. Ao
sugerir prioridades, formatos ou abordagens, considerar o foco atual
descrito em `estrategia.md`.

Pra qualquer tarefa visual (carrossel, post, landing page), consultar
`identidade/design-guide.md` como referência de estilo.

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas
usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe skill relevante
em `.claude/skills/`. Se encontrar, seguir as instruções da skill. Se
não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível (o
usuário provavelmente vai pedir de novo no futuro), perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar pra tarefas pontuais ou perguntas simples. Só quando o
padrão de repetição for claro.

---

## Aprender com correções

Quando o usuário corrigir algo, melhorar uma resposta ou dar uma
instrução que parece permanente (frases como "na verdade é assim", "não
faça mais isso", "prefiro assim", "sempre que...", "evita...", "da
próxima vez..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre o negócio** (clientes, serviços, mercado) → `_memoria/empresa.md`
- **Sobre preferências e estilo** (tom de voz, formato, o que evitar) → `_memoria/preferencias.md`
- **Sobre prioridades e foco** (projetos, metas, prazos) → `_memoria/estrategia.md`
- **Regra de comportamento nessa pasta** → próprio `CLAUDE.md`

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro.
Confirmar mostrando a linha adicionada.

Não perguntar se a correção for óbvia de contexto imediato (ex: "na
verdade o arquivo se chama X"). Só perguntar quando a informação tiver
valor duradouro.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante (cliente novo, skill
nova, mudança de foco, processo novo, ferramenta instalada, estrutura
alterada), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

Se sim, identificar o que atualizar:

- **Cliente, serviço, ferramenta, equipe** → `_memoria/empresa.md`
- **Mudança de prioridade ou foco** → `_memoria/estrategia.md`
- **Tom ou estilo** → `_memoria/preferencias.md`
- **Pasta, regra de organização, skill criada** → `CLAUDE.md`
- **Visual (cores, fontes, logo)** → `identidade/design-guide.md`

Mostrar o que vai mudar antes de salvar. Não reformatar o arquivo
inteiro, só adicionar ou editar a linha relevante.

**Quando NÃO perguntar:**
- Tarefas pontuais sem impacto no contexto (escrever um email avulso, criar um post)
- Perguntas simples ou conversas sem ação
- Mudanças já salvas pelo bloco "Aprender com correções"

**Dica:** rode `/atualizar` pra uma varredura completa quando houver dúvida.

---

## Criação de skills

Quando o usuário pedir skill nova:

1. Verificar se existe template relevante em `templates/skills/`. Se
   existir, usar como base e adaptar pro contexto
2. Perguntar se é específica desse projeto ou útil em qualquer:
   - Específica → `.claude/skills/nome-da-skill/SKILL.md` (local)
   - Universal → `~/.claude/skills/nome-da-skill/SKILL.md` (global)
3. Ler `_memoria/empresa.md` e `_memoria/preferencias.md` pra calibrar
   o conteúdo da skill ao contexto do negócio
4. Se a skill precisar de arquivos de apoio (templates, exemplos),
   criar dentro da pasta da skill
5. Seguir o fluxo da skill-creator nativa do Claude Code

---

# LoveMãe Auxílio Maternidade — regras do negócio

> Seção adicionada pelo `/instalar` (perfil: **Empresa**). Adapte à vontade.

## O que é esse workspace

Operação da LoveMãe Auxílio Maternidade — assessoria de apoio administrativo que ajuda
mães a solicitar e receber o auxílio-maternidade do INSS. A fase atual é de construção
da marca e da presença digital, então o sistema gira em torno de **marketing e
conteúdo**.

**Estrutura de pastas:**
- `_memoria/` — quem é a empresa, como falamos, foco atual
- `identidade/` — marca aplicada em tudo que o sistema gera
- `marketing/` — site, conteúdo de Instagram, campanhas, mídia paga
- `dados/` — arquivos a analisar
- `saidas/` — documentos e peças pontuais
- `templates/` — moldes de skills, perfis e ferramentas
- `scripts/` — utilitários do sistema

*(Criar `comercial/`, `financeiro/` ou `rh/` só quando essas frentes entrarem no
escopo — hoje o foco é digital.)*

## Sobre a empresa

LoveMãe Auxílio Maternidade é uma assessoria de apoio administrativo previdenciário.
Atuamos ajudando mães (CLT, domésticas, avulsas, MEI/autônomas, seguradas especiais
rurais e desempregadas em período de graça) a acessar o auxílio-maternidade.
Somos organizados em dois times: **atendimento** e **operação**.

## Setores e responsáveis

- **Atendimento:** contato e relacionamento com as mães, triagem, análise de direito
- **Operação:** montagem, entrada e acompanhamento do benefício junto ao INSS
- **Marketing/Digital:** site de conversão + Instagram (frente em construção — prioridade)

## O que mais fazemos aqui

- Conteúdo para Instagram: carrosséis, posts, stories e roteiros de reels
- Site focado em conversão (estrutura, copy, CTA, prova social)
- Materiais educativos sobre direitos e o processo do auxílio-maternidade

## Tom de voz

Acolhedor e direto com a mãe ("você", "mamãe"), frases curtas, sem juridiquês.
Detalhe completo em `_memoria/preferencias.md`.

Evitar: tom de guru, promessa exagerada, frieza institucional ("prezada cliente"),
juridiquês sem tradução.

## Regras do sistema

- Peças de conteúdo e site ficam em `marketing/` (ex: `marketing/instagram/`,
  `marketing/site/`)
- Antes de qualquer peça visual, ler `identidade/design-guide.md` — se ainda estiver
  em branco, avisar que a identidade precisa ser definida primeiro
- Documentos pontuais em `saidas/`

## Ferramentas conectadas

- [ ] Notion
- [ ] Gmail
- [ ] Google Calendar
- [ ] Google Ads
- [ ] Meta Ads
- [ ] Slack

*(Marcar conforme for instalando os MCPs)*
