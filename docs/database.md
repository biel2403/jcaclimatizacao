# Banco de Dados

## Tabelas

### users

Armazena usuarios administrativos.

Campos principais:

- `id`
- `name`
- `email`
- `password_hash`
- `created_at`
- `updated_at`

### leads

Armazena solicitacoes enviadas pelo formulario publico.

Campos principais:

- `id`
- `name`
- `phone`
- `email`
- `city`
- `neighborhood`
- `service_type`
- `equipment_type`
- `brand`
- `btus`
- `quantity`
- `description`
- `status`
- `internal_notes`
- `created_at`
- `updated_at`

## Status de lead

- `NOVO`
- `CONTATO`
- `ORCAMENTO`
- `NEGOCIACAO`
- `FECHADO`
- `PERDIDO`
