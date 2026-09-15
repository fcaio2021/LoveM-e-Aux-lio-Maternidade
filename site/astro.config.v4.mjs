import { defineConfig } from 'astro/config';

// Variante v4 (teste A/B) — "Coral", layout em blocos.
// Mesmo projeto, mesmas dependências e mesma pasta public/ (fotos); só o
// código-fonte é próprio. Rodar: npm run dev:v4  (localhost:4324)
export default defineConfig({
  site: 'https://www.lovemaeauxiliomaternidade.com.br',
  srcDir: './variantes/v4/src',
  outDir: './dist-v4',
  cacheDir: './node_modules/.astro-v4',
  devToolbar: { enabled: false },
  server: { port: 4324, host: true },
  vite: { cacheDir: './node_modules/.vite-v4' },
});
