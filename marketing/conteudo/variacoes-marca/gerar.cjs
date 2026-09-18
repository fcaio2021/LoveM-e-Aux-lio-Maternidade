const e = require('../estilo-carrossel.cjs');
const nomes = ['canto', 'canto-grande', 'tela', 'direita', 'esquerda', 'topo'];
const slides = [];
for (const v of nomes) {
  e.config.marca = v;
  slides.push({ nome: `capa-${v}.png`, html: e.capa({
    kicker: 'Auxílio-maternidade do INSS',
    titulo: 'O que é o<br>auxílio-maternidade?',
    sub: 'O direito que muita mãe<br>descobre tarde demais.' }) });
  slides.push({ nome: `texto-${v}.png`, html: e.texto({
    kicker: 'O que é',
    titulo: 'É o benefício do INSS feito para apoiar você nos primeiros momentos da maternidade.',
    corpo: 'Garante a <strong>proteção e a estabilidade financeira</strong> que a sua família precisa nesse momento tão especial.',
    n: 2 }) });
}
e.renderizar(__dirname, slides);
