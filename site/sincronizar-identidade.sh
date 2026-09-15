#!/bin/sh
# A identidade vive em identidade/. O site usa cópias em public/ e src/styles/.
# Rode isto depois de mexer no design-guide, nos tokens ou no logo.
set -e
cd "$(dirname "$0")/.."
cp identidade/tokens.css site/src/styles/tokens.css
cp identidade/logo.png identidade/logo-branco.png identidade/logo-simbolo.png \
   identidade/favicon-512.png identidade/favicon-32.png identidade/icone-app.png site/public/
# Logos otimizados no build (src/assets): branco no cabeçalho, colorido no rodapé
cp identidade/logo.png identidade/logo-branco.png site/src/assets/
echo "identidade sincronizada com o site"
