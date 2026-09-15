const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = (h) => { const [r,g,b] = [1,3,5].map(i => parseInt(h.slice(i,i+2),16)); return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b); };
const razao = (a,b) => { const [x,y] = [lum(a),lum(b)].sort((p,q)=>q-p); return (x+0.05)/(y+0.05); };
const v = (r) => r >= 4.5 ? 'PASSA' : (r >= 3 ? 'so titulo' : 'FALHA');

console.log('Candidatos a fundo creme (estilo da ref 1):\n');
['#F8F1E7','#F7EFE4','#FAF4EC','#F5EBDE'].forEach(creme=>{
  console.log(`${creme}`);
  [['#1A2530','texto'],['#C81B5C','destaque'],['#5C6B7A','apoio'],['#1D5386','institucional'],['#177E40','verde']].forEach(([c,n])=>{
    const r = razao(c, creme);
    console.log(`   ${n.padEnd(14)} ${c}  ${r.toFixed(2).padStart(5)}:1  ${v(r)}`);
  });
  console.log('');
});
