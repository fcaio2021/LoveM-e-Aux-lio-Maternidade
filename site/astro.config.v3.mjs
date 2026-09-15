import { defineConfig } from 'astro/config';

// Variante v3 (teste A/B) — "Azul", layout centralizado.
// Mesmo projeto, mesmas dependências e mesma pasta public/ (fotos); só o
// código-fonte é próprio. Rodar: npm run dev:v3  (localhost:4323)
export default defineConfig({
  site: 'https://www.lovemaeauxiliomaternidade.com.br',
  srcDir: './variantes/v3/src',
  outDir: './dist-v3',
  cacheDir: './node_modules/.astro-v3',
  devToolbar: { enabled: false },
  server: { port: 4323, host: true },
  vite: { cacheDir: './node_modules/.vite-v3' },
});
