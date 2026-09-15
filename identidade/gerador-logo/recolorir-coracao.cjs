// Recolore o coração do logo (identidade/logo-simbolo.png, fundo transparente)
// mantendo o desenho e a borda suave: cada pixel visível vira azul ou rosa
// conforme o lado dele (azul = mais azul que vermelho), e o alfa original fica.
// Uso: node recolorir-coracao.cjs <simbolo.png> <pasta-saida> id:#azul:#rosa ...
const sharp = require('sharp');
const [, , entrada, pasta, ...opcoes] = process.argv;
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

(async () => {
  const { data, info } = await sharp(entrada).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const N = info.width * info.height;
  const lado = new Uint8Array(N); // 0 transparente · 1 azul · 2 rosa
  let transparentes = 0, azuis = 0, rosas = 0;
  for (let i = 0; i < N; i++) {
    if (data[i * 4 + 3] === 0) { transparentes++; continue; }
    const r = data[i * 4], b = data[i * 4 + 2];
    lado[i] = b >= r ? 1 : 2;
    if (lado[i] === 1) azuis++; else rosas++;
  }
  console.log(`coração ${info.width}×${info.height} · transparente ${(100 * transparentes / N).toFixed(0)}% · azul ${azuis} px · rosa ${rosas} px`);

  for (const op of opcoes) {
    const [id, azul, rosa] = op.split(':');
    const cores = { 1: rgb(azul), 2: rgb(rosa) };
    const out = Buffer.from(data);
    for (let i = 0; i < N; i++) {
      if (!lado[i]) continue;
      const [r, g, b] = cores[lado[i]];
      out[i * 4] = r; out[i * 4 + 1] = g; out[i * 4 + 2] = b;
    }
    await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(`${pasta}/coracao-${id}.png`);
  }
  console.log('gerados:', opcoes.map((o) => 'coracao-' + o.split(':')[0] + '.png').join(', '));
})();
