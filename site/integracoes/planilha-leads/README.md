# Leads do site → e-mail + planilha do Google

Cada mãe que preenche o formulário do site vira:

1. **Uma linha na planilha** (aba "Leads"): data, nome, WhatsApp, respostas,
   botão/perfil que ela tocou e de qual anúncio veio. Uma mãe = uma linha.
2. **Um e-mail de aviso** pra equipe, com botão "Chamar no WhatsApp" que já abre a
   conversa com uma mensagem pronta. Chegam dois por mãe: "Novo contato" (assim que
   ela deixa nome e WhatsApp) e "Análise concluída" (se ela terminar o formulário).

Tudo grátis, rodando na conta francisco@ (Google Workspace): limite de ~1.500 e-mails
por dia. A planilha não tem esse limite.

O leads@ é apelido da própria conta que roda o script, e o Gmail guarda e-mail "pra si
mesmo" só em Enviados. Por isso o script devolve cada aviso pra **Caixa de entrada,
como não lido** (função `enviar_`).

## Instalar (uma vez, ~10 minutos)

Use, se possível, uma conta Google **da empresa** — a planilha fica com ela.

1. Em [sheets.new](https://sheets.new), crie uma planilha em branco e dê o nome
   **Leads LoveMãe**.
2. No menu da planilha: **Extensões → Apps Script**.
3. Apague o que estiver no editor e cole todo o conteúdo do arquivo `leads.gs`
   (desta pasta). Clique no disquete (**Salvar**).
4. Se a caixa `leads@lovemaeauxiliomaternidade.com.br` ainda não existir, troque o
   e-mail da linha `const EMAIL_AVISOS = ...` por um Gmail da equipe e salve.
5. No topo, escolha a função **configurar** e clique em **Executar**. O Google pede
   autorização: **Revisar permissões → escolher a conta → Avançado → Acessar
   (não seguro) → Permitir**. (O aviso aparece porque o script é seu, não publicado
   pelo Google.) Deve chegar um e-mail "aviso de leads configurado" e aparecer a aba
   "Leads" na planilha.
6. **Implantar → Nova implantação** → no ícone de engrenagem, escolha **App da Web**:
   - Descrição: `site`
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
   → **Implantar** e copie o **URL do app da Web** (termina em `/exec`).
7. Mande esse link — ele vai em `site/src/config.ts`, no campo `envioLeads.url`.

Pra testar: abrir o link no navegador mostra "LoveMãe: recebimento de leads
funcionando."

## Mudou o código?

Colar o `leads.gs` novo no editor → **Salvar** → se o código passou a usar um serviço
novo do Google, rodar **configurar** de novo pra autorizar → **Implantar → Gerenciar
implantações** → lápis → Versão: **Nova versão** → **Implantar**. O link continua o
mesmo (nunca usar "Nova implantação": gera outro link e o site para de enviar).
