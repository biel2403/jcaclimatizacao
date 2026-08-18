# Deploy

## Frontend na Vercel

1. Conectar repositorio GitHub.
2. Selecionar o diretorio `frontend`.
3. Manter `frontend/vercel.json` no deploy.
4. Configurar dominio.
5. Conferir se `frontend/js/config.js` aponta para a URL publica da API no Render.

## Backend no Render

1. Criar Blueprint a partir do `render.yaml`.
2. O Render cria o Web Service e o PostgreSQL.
3. A API aplica `database/schema.sql` automaticamente ao iniciar.
4. Configurar variaveis marcadas como segredo/sync false:
   - `FRONTEND_URL`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `COMPANY_WHATSAPP`
5. Conferir variaveis geradas/definidas:
   - `SESSION_SECRET`
   - `ADMIN_NAME`
   - `COMPANY_NAME`
   - `DATABASE_URL`

## PostgreSQL

1. No Blueprint, o banco `jca-climatizacao-db` fornece `DATABASE_URL` para a API.
2. O schema e aplicado automaticamente no boot da API por `backend/src/database/migrate.js`.
3. Para popular dados de exemplo localmente, use `npm run db:seed`.
4. Configurar backups no provedor.

## Checklist

- Frontend acessa backend por HTTPS.
- CORS aceita somente dominio da Vercel.
- Login funciona.
- Criacao de lead funciona.
- Leads aparecem no CRM.
- Status e observacoes funcionam.
- WhatsApp abre com mensagem.
- `FRONTEND_URL` no Render esta igual ao dominio final da Vercel.
- URL da API no `frontend/js/config.js` esta igual ao dominio final do Render.
