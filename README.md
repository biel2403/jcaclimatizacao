# JCA Climatizacao CRM

CRM simples para captacao e gerenciamento de solicitacoes de orcamento da JCA Climatizacao.

## Stack

- Frontend: HTML5, CSS3 e JavaScript puro
- Backend: Node.js, Express.js e JavaScript
- Banco: PostgreSQL com `pg`

## Estrutura

```txt
frontend/   Site publico e painel admin estatico
backend/    API Express
database/   SQL de schema e seed
docs/       Documentacao do projeto
scripts/    Automacoes locais e de deploy
```

## Execucao local

1. Instale dependencias:

```bash
npm install
```

2. Configure o ambiente:

```bash
copy .env.example .env
```

3. Crie o banco PostgreSQL e rode o schema:

```bash
npm run db:migrate
```

Se quiser dados iniciais de exemplo, rode tambem:

```bash
npm run db:seed
```

4. Inicie a API:

```bash
npm run dev
```

5. Sirva o frontend em outro terminal, por exemplo:

```bash
npx serve frontend -l 3000
```

Sem instalar outro pacote, tambem e possivel abrir `frontend/index.html` direto no navegador, mas para testar CORS e cookies a opcao com servidor local e melhor.

## Acesso admin

O backend cria/atualiza o administrador inicial com as variaveis:

- `ADMIN_NAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Para receber email quando chegar lead novo, configure tambem:

- `LEAD_NOTIFICATION_EMAIL`
- `MAIL_FROM`
- `RESEND_API_KEY`

No Render free, prefira Resend porque ele envia por HTTPS. SMTP comum pode ser bloqueado nas portas 25, 465 e 587. O fallback SMTP usa:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

## Deploy

- Frontend: Vercel, usando o diretorio `frontend`
- Backend: Render, usando `render.yaml`
- Banco: PostgreSQL, com `DATABASE_URL` no Render

Em producao, o frontend aponta por padrao para `https://jca-climatizacao-api.onrender.com`.
Se o Render criar outro dominio, ajuste `frontend/js/config.js` ou defina
`window.JCA_API_BASE_URL` antes de carregar `config.js`.

Veja [docs/deployment.md](docs/deployment.md).

## Observacao sobre a logo

A logo aplicada esta em `frontend/assets/logo/jca-logo.png`. Para substituir por uma versao final em alta qualidade, mantenha o mesmo caminho ou ajuste as referencias nos arquivos HTML.
