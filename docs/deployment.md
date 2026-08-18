# Deploy

## Frontend na Vercel

1. Conectar repositorio GitHub.
2. Selecionar o diretorio `frontend`.
3. Configurar dominio.
4. Ajustar `frontend/js/config.js` ou processo de build para apontar para a API do Render.

## Backend no Render

1. Criar Web Service.
2. Comando de instalacao: `npm install`.
3. Comando de start: `npm start`.
4. Configurar variaveis:
   - `PORT`
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `FRONTEND_URL`
   - `ADMIN_NAME`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `COMPANY_WHATSAPP`

## PostgreSQL

1. Criar banco PostgreSQL.
2. Copiar connection string para `DATABASE_URL`.
3. Executar `database/schema.sql`.
4. Opcionalmente executar `database/seed.sql`.
5. Configurar backups no provedor.

## Checklist

- Frontend acessa backend por HTTPS.
- CORS aceita somente dominio da Vercel.
- Login funciona.
- Criacao de lead funciona.
- Leads aparecem no CRM.
- Status e observacoes funcionam.
- WhatsApp abre com mensagem.
