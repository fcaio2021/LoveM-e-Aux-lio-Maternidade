# site/ — landing page de conversão

Astro + Netlify. Página única focada em gerar conversa no WhatsApp, montada a
partir da análise das três referências do nicho (AMO, Maternidade Fácil,
Mamãe Protegida).

## Rodar

```bash
cd site
npm install     # só na primeira vez
npm run dev     # http://localhost:4321
npm run build   # gera dist/
npm run preview # serve o dist/
node verificar.cjs   # com o preview rodando: tira prints e checa estouro no celular
```

## ⚠️ Antes de publicar

Tudo que falta está em **`src/config.ts`**, num lugar só:

| Campo | Situação |
|---|---|
| `whatsapp` | **PLACEHOLDER** `5500000000000` — o site inteiro depende dele |
| `email` | vazio |
| `cnpj` | vazio (aparece no rodapé quando preenchido) |
| `cidade` | vazio |
| `instagram` | `@lovemaeauxiliomaternidade` — confirmar quando o perfil existir |

O WhatsApp aparece em 6 botões. Trocar em `config.ts` atualiza todos de uma vez.

## Estrutura da página

1. **Cabeçalho** fixo, com CTA sempre visível
2. **Hero** — foto sangrando à direita, faixa de valor, CTA e três quebras de objeção
3. **Faixa + destaque** (`FaixaAtencao`) — faixa rosa de alerta, foto com cartão
   de valor, números de prova social e CTA
4. **Como funciona** — três passos em cartões
5. **Conheça seus Direitos** (`ConhecaDireitos`) — foto, quatro grupos com direito e CTA
6. **FAQ** — oito perguntas, com JSON-LD `FAQPage` para rich result
7. **CTA final** + **Rodapé** com aviso legal
8. **Botão flutuante** de WhatsApp (some quando há um CTA na tela)

Fora da página, mas mantidos no projeto: `QuemTemDireito`, `SemLetraMiuda` e
`Documentos`. Pra voltar com qualquer um, reimportar em `src/pages/index.astro`.

### Prova social

Os números (+5 mil mães aprovadas, +5 anos, 99% de aprovação) vivem em
`src/config.ts` → `provaSocial` e aparecem na seção de destaque abaixo do hero.
**Precisam ser verdadeiros e comprováveis** — em anúncio, número vale como
oferta (CDC art. 30) e propaganda enganosa é vedada (art. 37).

Depoimentos reais, quando houver, entram como seção nova depois de
**Sem letra miúda**, sem remover nada.

## Identidade

Cores e tipografia vêm de `src/styles/tokens.css`, que é cópia de
`identidade/tokens.css`. Depois de mexer na identidade:

```bash
./sincronizar-identidade.sh
```

## Deploy

`netlify.toml` já está configurado (base `site`, publish `dist`, Node 22).
Conectar o repositório no Netlify e apontar o domínio
`www.lovemaeauxiliomaternidade.com.br`. Deploy automático a cada push no `main`.

## Blog

Ainda não existe. Quando entrar, vai em `src/content/blog/` — é o caminho que
as skills `/publicar-tema` e `/aprovar-post` já esperam. A estrutura atual não
precisa mudar para acomodá-lo.

## Revisão jurídica pendente

Os textos sobre prazos, valores e regras do período de graça foram escritos com
margem ("pode chegar a", "conforme o seu caso"), e o rodapé traz o aviso de que
a empresa não tem vínculo com o INSS. Ainda assim, **o time de operação precisa
revisar todo o conteúdo antes de o site ir ao ar.**
