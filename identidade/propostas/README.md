# Propostas — como a identidade foi montada

Scripts que geraram a identidade a partir do logo original. Servem pra **regerar
tudo** se a paleta mudar, sem precisar refazer na mão.

| Arquivo | O que faz |
|---|---|
| `mascara.js` | Núcleo. Lê `../logo-original.png`, calcula a cobertura real de cada pixel do traço e separa símbolo / wordmark / subtítulo por componentes conectados. |
| `recolorir.js` | Gera uma variante de cor. `node recolorir.js <variante> [--simbolo] [--largura N] [--saida caminho]` |
| `analisar.js` | Mede as cores reais do logo (foi assim que saíram `#5698D6` e `#F99CC0`). |
| `contraste.js` | Checa contraste WCAG das cores da marca. |
| `montar.js` | Embute os PNGs no template e gera `comparacao.html`. |
| `comparacao.tpl.html` | Template da página de comparação das 4 versões. |
| `teste-guia/` | Teste de ponta a ponta: capa + CTA aplicando só o que está no design-guide. |

## Por que recolorir em vez de redesenhar

O original é um traço de cor sólida composto sobre fundo branco: `P = a*C + (1-a)*W`.
Invertendo a conta recupera-se a cobertura `a` de cada pixel — a cor nova entra com a
mesma cobertura, então as bordas continuam suaves e o fundo vira transparência limpa.
Recolorir "por cima" deixaria franja clara, visível como halo em fundo escuro.

## Regenerar tudo

```bash
node recolorir.js v0_original --largura 1200 --saida ../logo.png
node recolorir.js branco      --largura 1200 --saida ../logo-branco.png
node recolorir.js v0_original --simbolo --largura 800 --saida ../logo-simbolo.png
node recolorir.js branco      --simbolo --largura 800 --saida ../logo-simbolo-branco.png
node recolorir.js v0_original --simbolo --largura 512 --saida ../favicon-512.png
node recolorir.js v0_original --simbolo --largura 32  --saida ../favicon-32.png
```

Variantes disponíveis: `v0_original`, `v1_direcao_a`, `v2_suavizada`,
`v3_rosa_dominante`, `branco`. A escolhida foi a **v0_original**.
