# Leadpage Natal 🎄

Página de entrega personalizada para os ensaios de Natal.

## Como usar

1. Abra o site (página inicial `/`).
2. Informe o **nome do cliente** e o **link da pasta no Google Drive**.
3. Clique em **Gerar link** e depois em **Copiar link** (ou envie direto pelo WhatsApp).

Quando o cliente abre o link, vê a página com "Olá, {nome}!", os textos de agradecimento, o botão
**Acessar minhas fotos** (abre a pasta do Drive) e o botão de contato no WhatsApp.

> A pasta do Drive precisa estar compartilhada como **"Qualquer pessoa com o link"**.

## Como funciona

O nome e o link do Drive ficam codificados dentro do próprio link gerado
(`seu-dominio.com.br/f/<código>`), veja [`src/lib/link.ts`](src/lib/link.ts):

- **Não precisa de banco de dados, login nem novo deploy.** O link funciona na hora.
- Links de pasta do Drive são reduzidos ao ID, para o link ficar mais curto.
- O código só aceita links do Google Drive. Um link alterado ou cortado mostra a página "Link incompleto".
- As páginas têm `noindex`, então não aparecem no Google.

## Configuração

Edite [`src/config.ts`](src/config.ts): nome do estúdio, ano e número de WhatsApp (DDI + DDD, só números).

## Desenvolvimento

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera dist/
npm run preview   # testa o build localmente
```

## Deploy

Site estático: build `npm run build`, pasta de saída `dist`.

- **Vercel**: já configurado em [`vercel.json`](vercel.json).
- **Netlify**: já configurado em [`public/_redirects`](public/_redirects).

As duas regras fazem as rotas `/f/...` abrirem o app.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lucide
