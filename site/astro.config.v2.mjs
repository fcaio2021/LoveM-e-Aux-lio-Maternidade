import { defineConfig } from 'astro/config';

// Variante v2 (teste A/B) — "Ameixa", layout espelhado.
// Mesmo projeto, mesmas dependências e mesma pasta public/ (fotos); só o
// código-fonte é próprio. Rodar: npm run dev:v2  (localhost:4322)
export default defineConfig({
  site: 'https://www.lovemaeauxiliomaternidade.com.br',
  srcDir: './variantes/v2/src',
  outDir: './dist-v2',
  cacheDir: './node_modules/.astro-v2',
  devToolbar: { enabled: false },
  server: { port: 4322, host: true },
  // Cache do Vite separado: 4 servidores escrevendo no mesmo cache brigam
  vite: { cacheDir: './node_modules/.vite-v2' },
});
