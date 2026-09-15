// Embute os PNGs como data URI no template -- o Artifact e um arquivo unico,
// caminho relativo de imagem nao carrega la.
const fs = require('fs');
let html = fs.readFileSync('comparacao.tpl.html', 'utf8');
const mapa = {
  V0: 'logo-v0_original.png',
  V1: 'logo-v1_direcao_a.png',
  V2: 'logo-v2_suavizada.png',
  V3: 'logo-v3_rosa_dominante.png',
};
for (const [chave, arq] of Object.entries(mapa)) {
  const b64 = fs.readFileSync(arq).toString('base64');
  html = html.replaceAll(`{{${chave}}}`, `data:image/png;base64,${b64}`);
}
if (html.includes('{{')) { console.error('placeholder nao substituido'); process.exit(1); }
fs.writeFileSync('comparacao.html', html);
console.log(`comparacao.html: ${(html.length / 1024 / 1024).toFixed(2)} MB`);
