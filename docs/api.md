# API

Base local: `http://localhost:3001`

## Publico

- `POST /api/leads`: cria lead.

## Auth

- `POST /api/auth/login`: cria sessao.
- `POST /api/auth/logout`: encerra sessao.
- `GET /api/auth/me`: retorna usuario logado.

## Admin

- `GET /api/dashboard`: contadores e leads recentes.
- `GET /api/leads`: lista leads com filtros.
- `GET /api/leads/:id`: detalhes do lead.
- `PATCH /api/leads/:id/status`: altera status.
- `PATCH /api/leads/:id/notes`: altera observacoes internas.

Rotas administrativas exigem sessao.
