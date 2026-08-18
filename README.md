# ClimaPro CRM

CRM simples para captacao e gerenciamento de solicitacoes de orcamento de servicos de ar-condicionado.

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

3. Crie o banco PostgreSQL e rode:

```bash
npm run db:schema
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

## Deploy

- Frontend: Vercel, usando o diretorio `frontend`
- Backend: Render, executando `npm install` e `npm start`
- Banco: PostgreSQL, com `DATABASE_URL` no Render

Veja [docs/deployment.md](docs/deployment.md).

## Observacao sobre a logo

Substitua `frontend/assets/logo/placeholder.svg` pela logo real mantendo o mesmo caminho, ou ajuste os arquivos HTML para apontar para outro arquivo dentro de `frontend/assets/logo/`.
