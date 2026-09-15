# Gerador do logo LoveMãe

O logo é montado a partir de duas peças:

- **Coração:** o desenho do logo antigo (Mamãe), recolorido. `simbolo-solido.png` é a
  base: o coração com o miolo 100% opaco (o original era levemente transparente por
  dentro e ficava mais apagado que o nome).
- **Nome:** "LoveMãe" + "auxílio maternidade" na letra **Quicksand 700** (Google Fonts),
  com um contorno arredondado da mesma cor pra dar o peso do logo antigo. O subtítulo
  estica pra ter a mesma largura do nome.

## Cores oficiais (13/09/2026)

| Parte | Cor |
|---|---|
| Lado da mãe no coração, "Love", "auxílio maternidade" | `#0038E5` (azul do Asaas) |
| Lado do bebê no coração, "Mãe" | `#FF0076` |

## Como regenerar

1. Pintar o coração nas cores (gera `coracao-D.png` e `coracao-branco.png`):

   ```sh
   NODE_PATH=../../site/node_modules node recolorir-coracao.cjs simbolo-solido.png . "D:#0038E5:#FF0076" "branco:#FFFFFF:#FFFFFF"
   ```

2. Abrir `montar.html` no navegador (ou via Playwright) e chamar:

   ```js
   montar({ id: 'cor', azul: '#0038E5', rosa: '#FF0076', dividir: true, corSub: '#0038E5', coracao: 'coracao-D.png' })
   ```

   Tirar o print do elemento `#logo-cor` com fundo transparente, em escala 2x. É o
   `logo-grande.png`; o `logo.png` é ele reduzido pra 1200 px de largura.

3. Rodar `site/sincronizar-identidade.sh` pra levar os arquivos novos pro site.

O logo antigo (Mamãe) e o arquivo original enviado estão em `../arquivo-mamae/`.
