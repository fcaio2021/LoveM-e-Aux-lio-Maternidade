# Variantes do site — teste A/B

Quatro versões da mesma landing page: **mesmas seções, mesma ordem, mesmos
textos**. Mudam só layout, fotos e paleta. A v1 é o site principal (`site/src`);
as outras vivem aqui e compartilham com ela as dependências e a pasta de fotos
(`site/public`).

| Versão | Endereço | Paleta | Layout |
|---|---|---|---|
| **v1** | localhost:4321 | rosa `#C81B5C` | original |
| **v2** | localhost:4322 | ameixa `#7B3F9A` | espelhado — fotos do outro lado, cabeçalho branco, números em cartões, FAQ em 2 colunas, CTA dividido |
| **v3** | localhost:4323 | azul `#1D5386` | centralizado — foto de fundo no topo, faixa de foto larga, passos lado a lado, cartões horizontais |
| **v4** | localhost:4324 | coral `#B8442C` | em blocos — foto inteira em bloco arredondado, conteúdo em caixas suaves, linha do tempo vertical, CTA em caixa |

Em todas: botões verdes de WhatsApp, fonte Onest, fundos brancos, títulos em
preto, linha de apoio na cor da variante, descrições em cinza. Cor principal com
contraste acima de 4,5:1 nos dois sentidos (medido).

## Rodar

Dentro de `site/`:

```bash
npm run dev       # v1 — localhost:4321
npm run dev:v2    # v2 — localhost:4322
npm run dev:v3    # v3 — localhost:4323
npm run dev:v4    # v4 — localhost:4324
npm run build:v2  # gera dist-v2/ (idem v3, v4)
```

Cada variante tem seu `astro.config.vN.mjs` na raiz de `site/`, com cache
próprio — os quatro servidores podem rodar ao mesmo tempo.

## Como medir qual converte mais

O link de todo botão de WhatsApp leva a versão na mensagem, junto com o botão
de origem. Exemplo do que chega:

> Olá! Quero fazer minha análise gratuita do auxílio-maternidade. **(v3 · hero)**

Contando as mensagens por versão, dá pra saber qual trouxe mais conversas — e
por qual botão.

**Importante:** localhost é só pra comparar visualmente. Pra um teste A/B de
verdade, as versões precisam estar publicadas e receber tráfego dividido
(ex.: Netlify Split Testing, com cada versão num branch) ou anúncios apontando
pra endereços diferentes.

## Onde fica o quê

- `vN/src/components/` — só os componentes com layout próprio foram reescritos;
  os demais (rodapé, botão flutuante) são cópia da v1.
- `vN/src/styles/global.css` — bloco "Paleta da variante" no `:root`.
- `vN/src/config.ts` — `variante = 'vN'` (marca que vai no WhatsApp).

⚠️ Os textos estão **copiados** em cada variante. Se um texto mudar, precisa ser
trocado nas quatro (v1 em `site/src`, v2–v4 aqui).

## Fotos (todas de uso comercial livre — Unsplash ou Pexels)

| | Topo | "Você pode ter direito" | "Como funciona" |
|---|---|---|---|
| v1 | hero-gravida-3.jpg | gravida-quarto.jpg | mae-sorrindo.jpg |
| v2 | foto-gravida.jpg | mae-bebe.jpg | mae-ombro.jpg |
| v3 | gravida-berco.jpg | bebe-cama.jpg | mae-bebe-chao.jpg ([Pexels 6624247](https://www.pexels.com/photo/6624247/)) |
| v4 | hero-gravida-2.jpg | gravida-vestido.jpg ([Pexels 20770621](https://www.pexels.com/photo/20770621/)) | mae-bebe-sorriso.jpg ([Pexels 29718668](https://www.pexels.com/photo/29718668/)) |

Os cartões de perfil (CLT, MEI, rural, desempregada) usam as mesmas fotos nas
quatro — cada foto representa um perfil.
