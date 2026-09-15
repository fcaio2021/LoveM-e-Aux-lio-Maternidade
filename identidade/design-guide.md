# Identidade visual

> Como a marca aparece em tudo que o MazyOS gera.
> As skills de conteúdo, carrossel e post leem esse arquivo antes de criar qualquer visual.
> Edite quando a marca evoluir.

---

## Cores

A paleta de trabalho nasceu do logo antigo (Mamãe, em tons pastel) e continua valendo
para o site e as peças. Com a troca pra **LoveMãe** (13/09/2026), o logo ganhou cores
próprias, mais vivas — ver "Cores do logo" abaixo. O rosa de trabalho `#C81B5C` segue
como destaque de interface porque passa em contraste como texto; o rosa do logo
`#FF0076` não passa em texto pequeno.

- **Fundo principal:** `#FDFAFB` — off-white com um sopro de rosa. Nunca branco puro em
  área grande.

- **Cor de destaque / CTA:** `#C81B5C` — rosa profundo, mesmo matiz do rosa do logo.
  Títulos de impacto, réguas, kickers, botões primários.
  **No site (decisão de 14/09/2026):** o rosa de destaque e de fundo passou a ser o rosa
  do logo `#FF0076`. Ele fica abaixo do mínimo de leitura em texto pequeno (3,8:1); se
  precisar, o tom mais fechado da mesma cor pra texto pequeno é `#E0006A` (4,8:1).
  **Botão de WhatsApp:** `#177E40`.

- **Texto principal:** `#1A2530` — quase-preto com viés azulado (nunca `#000`).
  **Texto de apoio:** `#46525E` (escurecido em 13/09/2026; era `#5C6B7A`, claro demais
  no celular).

- **Fundo alternativo / cards:** `#FFFFFF`.
  **Fundo creme (papel):** `#FAF4EC` — área de texto dos carrosséis no estilo de referência.
  Mais quente que o off-white; é o fundo que combina com a borda rasgada de papel.
  **Fundo escuro (slides, rodapé, seções de contraste):** `#102232`.

- **Cor proibida:** rosa-choque neon (`#FF6FB5`), degradê arco-íris, preto puro `#000`,
  e os tons pastel usados como texto (não têm contraste — ver regra abaixo).

### Cores do logo LoveMãe (13/09/2026)

- **Azul do logo:** `#0038E5` — o azul oficial do Asaas. Lado da mãe no coração, "Love"
  e "auxílio maternidade". 7,8:1 no branco: pode virar título ou texto quando a peça pedir.
- **Rosa do logo:** `#FF0076` — lado do bebê no coração e "Mãe". 3,8:1 no branco: só
  logo, ilustração e título grande (a partir de 24px). Texto pequeno em rosa usa `#C81B5C`.

### Tons pastel (do logo antigo)

- **Azul pastel:** `#80BBEF` · **Rosa pastel:** `#FAA9C7`

Servem para enfeite: doodles, painéis claros e destaque sobre fundo escuro. **Não servem
como texto em fundo claro** — 1,97:1 e 1,75:1, muito abaixo do mínimo legível.

### Azul institucional

- `#1D5386` — títulos e texto de autoridade quando a peça pede seriedade
  (números, dados, valores do benefício).

### A paleta inverte em fundo escuro

Regra que vem da medição, não de gosto: sobre `#102232` o rosa de destaque `#C81B5C`
cai pra 2,90:1 e some. Em fundo escuro, o destaque passa a ser o **rosa pastel**
`#FAA9C7` (8,92:1) e o texto vira branco.

| Fundo | Texto | Destaque |
|---|---|---|
| Claro `#FDFAFB` | `#1A2530` | `#C81B5C` |
| Escuro `#102232` | `#FFFFFF` | `#FAA9C7` |

### Contraste — o que já está medido

Sobre o fundo claro `#FDFAFB`, pela régua WCAG AA (4,5:1 texto normal, 3:1 título grande):

| Cor | Razão | Serve como |
|---|---|---|
| `#1A2530` texto | 14,98:1 | qualquer tamanho |
| `#1D5386` azul institucional | 7,69:1 | qualquer tamanho |
| `#C81B5C` rosa destaque | 5,37:1 | qualquer tamanho |
| `#46525E` texto de apoio | 8,0:1 | qualquer tamanho |
| `#177E40` verde WhatsApp | 4,94:1 | qualquer tamanho |
| `#0038E5` azul do logo | 7,5:1 | qualquer tamanho |
| `#FF0076` rosa do logo | 3,7:1 | só logo e título grande |
| `#80BBEF` azul pastel | 1,97:1 | **nada** — só enfeite |
| `#FAA9C7` rosa pastel | 1,75:1 | **nada** — só enfeite |

Texto branco sobre botão: rosa 5,57:1, verde 5,13:1, azul 7,97:1 — os três passam.

---

## Tipografia

- **Títulos e destaques:** **Nunito** (Google Fonts) — geométrica de terminais
  arredondados, é a família que mais se aproxima do wordmark do logo.

- **Corpo, subtítulos e botões:** **Nunito Sans** (Google Fonts), pesos 400 e 600.

- **Nome no logo:** **Quicksand 700** com contorno arredondado da mesma cor (dá o peso
  do logo). Só no logo — não usar em títulos. Detalhes em `identidade/gerador-logo/`.

- **Script de destaque:** **Parisienne** (Google Fonts), sempre na cor de destaque.
  Só para a frase emocional curta — "Auxílio Maternidade", "Mães e Gestantes",
  a assinatura do último slide. **Máximo 4 palavras.** Nunca em texto corrido, nunca
  em caixa alta, nunca em bloco de informação. É o tempero, não o prato.
  Tamanho mínimo 44px no carrossel — abaixo disso a script fecha e some.

- **Peso do título:** 800. Kerning `-0.02em` — fonte arredondada não quer o
  `-0.04em` apertado que o estilo-base do `/carrossel` pede pra Inter; aperta demais
  e os terminais redondos colidem.

Escala de referência pro carrossel (1080x1350):
- Capa: 88-96px / 800 / line-height 1.02
- H2 de slide interno: 58-68px / 800 / line-height 1.06
- Corpo: 22-26px / 400 / line-height 1.5
- Kicker (caixa alta): 14-16px / 700 / letter-spacing `0.22em`, na cor de destaque

---

## Estilo geral

Acolhedor e limpo. Muito respiro, pouca informação por peça, nada de moldura pesada.
A marca fala com uma mãe grávida ou recém-parida no celular, quase sempre cansada e
com pressa — a peça precisa ser entendida numa passada de olho.

Uma cor de destaque por peça. O rosa aparece pouco e forte: kicker, régua, número,
botão. O resto é fundo claro, texto escuro e espaço vazio. Quando tudo é destaque,
nada é.

Fotografia: mães reais, luz natural, tom quente. Sem banco de imagem sorridente
genérico, sem bebê de propaganda de fralda.

---

## Elementos-chave

- Bordas: `1px solid rgba(26,37,48,.10)` em fundo claro; `1px solid rgba(255,255,255,.14)`
  em fundo escuro. Hairline, nunca traço grosso.
- Border-radius dos cards: `16px`. Botões: `999px` (pílula — combina com a redondeza
  do logo). Imagens: `20px`.
- Botões: altura mínima 52px, padding `16px 32px`, Nunito Sans 600, texto branco.
  Primário rosa `#C81B5C`; WhatsApp verde `#177E40`; secundário com borda `#1D5386`
  e fundo transparente.
- Sombras: quase nenhuma. No máximo `0 2px 8px rgba(26,37,48,.06)` em card que precise
  se destacar do fundo. Nada de sombra difusa grande.
- Régua fina: 4px de altura, 64px de largura, na cor de destaque — separa kicker de
  título. É o elemento gráfico recorrente da marca.

### Elementos do estilo de referência (`marketing/referencias/carrosseis/1`)

- **Borda rasgada de papel:** transição entre a área de foto/cor e a área de texto creme.
  Feita em SVG com curva irregular, nunca uma linha reta. É a assinatura visual do estilo.
- **Caixa de valor:** o número do benefício dentro de retângulo arredondado na cor de
  destaque, texto branco, peso 800, tamanho grande. Quando a peça fala de dinheiro,
  o dinheiro é o elemento visual principal — não o título.
- **Doodles:** corações de contorno (traço 3px, sem preenchimento) e tracinhos de brilho
  em volta do elemento de destaque. Rosa pastel `#FAA9C7`, opacidade 40-70%.
  **No máximo 4 por slide** — passou disso vira poluição.
- **Selo de objeção:** ícone + título curto em caixa alta + uma linha de explicação.
  Sempre em trio: custo, segurança, tempo. Vem da referência de copy nº 2 e é o
  elemento que mais derruba barreira antes da mãe perguntar.

---

## O que NUNCA fazer

- Usar os tons pastel (`#80BBEF`, `#FAA9C7`) como cor de texto, ou o rosa do logo
  `#FF0076` em texto pequeno — não são legíveis.
- Usar o rosa `#C81B5C` sobre fundo escuro — some. Em fundo escuro o destaque é `#FAA9C7`.
- Verde WhatsApp claro (`#1FA855`) com texto branco — 3,09:1, reprova. Usar `#177E40`.
- Preto puro `#000` ou branco puro em área grande de fundo.
- Esticar, rotacionar, aplicar sombra ou recolorir o logo fora das versões deste guia.
- Trocar as cores do nome: "Love" é sempre azul e "Mãe" sempre rosa.
- Colocar o logo colorido sobre foto, fundo escuro ou fundo rosa (o "Mãe" some) — usar
  `logo-branco.png`.
- Mais de uma cor de destaque na mesma peça.
- Juridiquês na arte. Se o termo técnico for inevitável, traduzir na linha seguinte.

---

## Logo

Marca **LoveMãe** (13/09/2026): o coração de mãe e bebê do logo antigo + o nome
"LoveMãe" com "auxílio maternidade" embaixo.

- **Arquivo principal:** `identidade/logo.png` (1200×924, fundo transparente).
  Versão grande pra impressão e anúncio: `identidade/logo-grande.png` (2032×1564).
- **Versão pra fundo escuro, rosa ou foto:** `identidade/logo-branco.png` (tudo branco).
- **Símbolo isolado (coração):** `identidade/logo-simbolo.png` — selo e ilustração.
  Versão branca: `identidade/logo-simbolo-branco.png`.
- **Foto de perfil do Instagram:** `identidade/avatar-instagram.png` (1080×1080, coração
  sobre branco; o Instagram recorta em círculo).
- **Favicon:** `identidade/favicon-512.png` e `favicon-32.png`. **Ícone de app** (iPhone,
  "adicionar à tela de início"): `identidade/icone-app.png`, fundo branco.
- **Como regenerar:** `identidade/gerador-logo/`. **Logo antigo (Mamãe) e o arquivo
  original enviado:** `identidade/arquivo-mamae/`.
- **Onde usar:** slide final do carrossel (CTA), topo do site (versão branca), propostas,
  anúncios.
- **Tamanho sugerido:** largura entre 120-200px nos HTMLs. Abaixo de 90px, usar só o
  símbolo — o nome fica pequeno demais pra ler.

### Limitação conhecida

O coração é um raster gerado por IA, sem versão vetorial (o nome é refeito a partir da
letra, então sai nítido em qualquer tamanho). Recolorir e reduzir funciona;
ampliar acima de ~1500px de largura, não. A 32px o coração ainda se lê, mas os rostos
de mãe e bebê somem e o traço fica fino demais pra uma aba de navegador.

**Recomendação:** redesenhar o símbolo em vetor, simplificado e com traço mais encorpado,
quando houver oportunidade. Não é urgente — é o que destrava favicon nítido, bordado,
impressão grande e qualquer aplicação pequena.

---

## Observações adicionais

**Fonte da paleta:** as cores de trabalho foram medidas no logo antigo (`analisar.js`
em `identidade/propostas/`). As do logo LoveMãe foram medidas direto no código dos sites
de referência: azul `#0038E5` do Asaas e rosa `#FF0076`. O logo se regenera em
`identidade/gerador-logo/`.

**Valores executáveis:** `identidade/tokens.css` tem a mesma paleta como CSS custom
properties. O site e os carrosséis puxam de lá pra não divergir deste guia.

**Referência de mercado:** AMO e G7 usam rosa-choque saturado, e o `#FF0076` do logo é
o mesmo rosa da Mãe Brasil. O que diferencia a LoveMãe no feed é o **par azul + rosa** —
o azul forte não aparece nos concorrentes. Nas peças, manter os dois juntos em vez de
só rosa, pra a marca não ser confundida com a Mãe Brasil.
