# Arquitetura

## Visao geral

O projeto e separado em frontend estatico e backend API.

```txt
Vercel -> frontend HTML/CSS/JS
Render -> backend Node.js/Express
PostgreSQL -> banco de dados
```

## Frontend

- HTML, CSS e JavaScript puro.
- Configuracao central da API em `frontend/js/config.js`.
- Paginas publicas e administrativas separadas.
- `frontend/vercel.json` configura URLs limpas e headers basicos.

## Backend

- Express.js.
- Rotas REST.
- SQL parametrizado com `pg`.
- Sessao com cookie HTTP-only.
- Hash de senha com bcrypt.
- CORS restrito ao `FRONTEND_URL`.
- `render.yaml` descreve API e PostgreSQL para deploy no Render.
- `backend/src/database/migrate.js` aplica o schema usando `pg`, sem depender do cliente `psql`.

## Banco

- `users`.
- `leads`.
- Indices para status, data, busca por nome e WhatsApp.

## Decisoes

- Nao usar framework frontend para manter aprendizado e simplicidade.
- Nao usar ORM para praticar SQL direto com consultas parametrizadas.
- Nao implementar upload no MVP para evitar complexidade de armazenamento.
