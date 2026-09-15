// Contraste WCAG de cada cor da marca sobre o fundo claro da identidade.
// AA exige 4.5:1 pra texto normal e 3:1 pra texto grande (>=24px ou >=19px bold).
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = (h) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const razao = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const FUNDO = '#FDF8F8';
const cores = [
  ['#5698D6', 'azul original'],
  ['#F99CC0', 'rosa original'],
  ['#16243F', 'navy direcao A'],
  ['#D6336C', 'rosa direcao A'],
  ['#2E4A7D', 'azul suavizado'],
  ['#E05C8D', 'rosa suavizado'],
  ['#1FA855', 'verde CTA'],
  ['#1B1B1F', 'texto principal'],
  ['#5A5A66', 'texto secundario'],
];

console.log(`Contraste sobre ${FUNDO}:\n`);
console.log('cor        nome                razao    texto normal   texto grande');
cores.forEach(([hex, nome]) => {
  const r = razao(hex, FUNDO);
  const normal = r >= 4.5 ? 'PASSA' : 'FALHA';
  const grande = r >= 3 ? 'PASSA' : 'FALHA';
  console.log(`${hex}  ${nome.padEnd(18)} ${r.toFixed(2).padStart(5)}:1   ${normal.padEnd(13)}  ${grande}`);
});

console.log(`\nSobre o navy #16243F (fundo escuro):\n`);
[['#FFFFFF', 'branco'], ['#D6336C', 'rosa direcao A'], ['#E05C8D', 'rosa suavizado'], ['#F99CC0', 'rosa original']].forEach(([hex, nome]) => {
  const r = razao(hex, '#16243F');
  console.log(`${hex}  ${nome.padEnd(18)} ${r.toFixed(2).padStart(5)}:1   ${r >= 4.5 ? 'PASSA' : 'FALHA'}`);
});

console.log('\nTexto sobre botao (o que importa em CTA):\n');
[['#FFFFFF', '#1FA855', 'branco sobre verde CTA'],
 ['#FFFFFF', '#D6336C', 'branco sobre rosa'],
 ['#FFFFFF', '#16243F', 'branco sobre navy'],
 ['#FFFFFF', '#178A45', 'branco sobre verde escurecido'],
 ['#16243F', '#1FA855', 'navy sobre verde CTA']].forEach(([t, f, nome]) => {
  const r = razao(t, f);
  console.log(`${nome.padEnd(30)} ${r.toFixed(2).padStart(5)}:1   ${r >= 4.5 ? 'PASSA' : 'FALHA'}`);
});
