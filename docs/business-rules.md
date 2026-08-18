# Regras de Negocio

## Lead

- Todo lead inicia como `NOVO`.
- Nome, WhatsApp e tipo de servico sao obrigatorios.
- Email e opcional, mas deve ser valido quando informado.
- Observacoes internas nunca aparecem em respostas publicas.

## WhatsApp

- O botao de WhatsApp usa link simples `https://wa.me`.
- A mensagem inicial e montada no frontend administrativo.

## Anti-spam

- Formulario publico usa honeypot.
- API publica possui rate limiting.
- Backend valida tamanho e formato dos campos.

## Autenticacao

- Senhas sao armazenadas com bcrypt.
- Sessao usa cookie HTTP-only.
- Credenciais iniciais vem de variaveis de ambiente.
