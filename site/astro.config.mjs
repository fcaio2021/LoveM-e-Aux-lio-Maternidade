import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.lovemaeauxiliomaternidade.com.br',
  // A barra de ferramentas do Astro só existe em `npm run dev`, mas aparece
  // flutuando por cima do conteúdo e confunde quem está só revisando o site.
  devToolbar: { enabled: false },
  // O blog entra depois em src/content/blog/ — as skills /publicar-tema e
  // /aprovar-post já esperam esse caminho. A estrutura aqui não precisa mudar.
});
