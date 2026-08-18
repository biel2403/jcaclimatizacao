# Como editar as informações do site

Este guia mostra onde alterar as informações principais do site da JCA Climatização.

## Informações da empresa

Arquivo:

```txt
frontend/js/config.js
```

Edite o bloco `brand`:

```js
brand: {
  name: "JCA Climatização",
  description: "Instalação, manutenção, higienização, limpeza e reparo de ar-condicionado.",
  phone: "(11) 99999-9999",
  whatsapp: "5511999999999",
  email: "contato@jcaclimatizacao.com.br",
  city: "São Paulo - SP",
  regions: "Centro, Zona Leste, Zona Norte e regiões próximas",
  instagram: "@jcaclimatizacao"
}
```

Importante: no campo `whatsapp`, use apenas números, com DDI e DDD. Exemplo:

```txt
5511999999999
```

## Textos da página inicial

Arquivo:

```txt
frontend/index.html
```

Principais trechos:

- Título principal da home: procure por `<h1>`.
- Texto abaixo do título: procure pelo parágrafo logo abaixo do `<h1>`.
- Serviços: procure pela seção `id="servicos"`.
- Faixa de chamada: procure por `Atendimento residencial e comercial`.
- Cards de contato: procure pela seção `id="atendimento"`.

## Serviços oferecidos

Arquivo da vitrine:

```txt
frontend/index.html
```

Arquivo do formulário:

```txt
frontend/orcamento.html
```

Arquivo da validação no backend:

```txt
backend/src/utils/validators.js
```

Se adicionar, remover ou renomear um serviço, atualize os três lugares para manter o site e a API consistentes.

## Logo

Arquivo atual:

```txt
frontend/assets/logo/jca-logo.png
```

Para trocar a logo, substitua esse arquivo mantendo o mesmo nome. Assim não precisa alterar os HTMLs.

## Cores e aparência

Arquivo:

```txt
frontend/css/style.css
```

As cores principais ficam no começo do arquivo:

```css
:root {
  --navy-950: #020817;
  --navy-900: #061432;
  --navy-800: #08245a;
  --blue-500: #1097ff;
  --cyan-300: #42ddff;
  --orange-500: #ff7a1a;
  --red-500: #ef2e24;
}
```

Admin:

```txt
frontend/css/admin.css
```

## Formulário de orçamento

Arquivo:

```txt
frontend/orcamento.html
```

Campos do formulário ficam dentro de:

```html
<form id="quoteForm" class="form-grid">
```

Se criar um campo novo, também será necessário atualizar:

```txt
backend/src/utils/validators.js
backend/src/services/leadService.js
database/schema.sql
frontend/admin/lead.html
frontend/js/lead.js
```

## Email de novo lead

No Render, configure estas variáveis:

```txt
LEAD_NOTIFICATION_EMAIL=email-do-destinatario@gmail.com
MAIL_FROM=JCA Climatização <onboarding@resend.dev>
RESEND_API_KEY=re_xxxxxxxxx
```

O envio usa Resend via HTTPS, recomendado para o plano free do Render.

## URL da API

Arquivo:

```txt
frontend/js/config.js
```

Por padrão, produção usa:

```txt
https://jca-climatizacao-api.onrender.com
```

Se a URL do Render for diferente, altere dentro da função `getApiBaseUrl()`.

## Deploy

Depois de editar e testar:

```bash
npm test
git add .
git commit -m "descreva a alteração"
git push
```

Render e Vercel podem redeployar automaticamente após o push, dependendo da configuração.

## Variáveis importantes no Render

```txt
DATABASE_URL
SESSION_SECRET
FRONTEND_URL
ADMIN_NAME
ADMIN_EMAIL
ADMIN_PASSWORD
COMPANY_NAME
COMPANY_WHATSAPP
LEAD_NOTIFICATION_EMAIL
MAIL_FROM
RESEND_API_KEY
```

`FRONTEND_URL` deve ser exatamente a URL da Vercel, sem barra no final.

Exemplo:

```txt
https://jcaclimatizacao.vercel.app
```
