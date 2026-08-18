function mapStatusLabel(status) {
  return {
    NOVO: "Novo",
    CONTATO: "Em contato",
    ORCAMENTO: "Orcamento",
    NEGOCIACAO: "Negociacao",
    FECHADO: "Fechado",
    PERDIDO: "Perdido"
  }[status] || status;
}

module.exports = { mapStatusLabel };
