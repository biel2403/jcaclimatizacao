const params = new URLSearchParams(window.location.search);
const leadId = params.get("id");
const detail = document.getElementById("leadDetail");

async function loadLead() {
  await requireLogin();
  const { lead } = await apiFetch(`/api/leads/${leadId}`);
  document.getElementById("leadTitle").textContent = lead.name;

  detail.innerHTML = `
    <section class="panel">
      <h2>Cliente</h2>
      <p><strong>WhatsApp:</strong> ${escapeHtml(lead.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(lead.email || "Nao informado")}</p>
      <p><strong>Cidade:</strong> ${escapeHtml(lead.city || "Nao informada")}</p>
      <p><strong>Bairro:</strong> ${escapeHtml(lead.neighborhood || "Nao informado")}</p>
      <a class="button" href="${escapeAttribute(lead.whatsappLink)}" target="_blank" rel="noopener">Conversar pelo WhatsApp</a>
    </section>
    <section class="panel">
      <h2>Solicitacao</h2>
      <p><strong>Servico:</strong> ${escapeHtml(lead.serviceType)}</p>
      <p><strong>Equipamento:</strong> ${escapeHtml(lead.equipmentType || "Nao informado")}</p>
      <p><strong>Marca:</strong> ${escapeHtml(lead.brand || "Nao informada")}</p>
      <p><strong>BTUs:</strong> ${escapeHtml(lead.btus || "Nao informado")}</p>
      <p><strong>Quantidade:</strong> ${escapeHtml(lead.quantity)}</p>
      <p>${escapeHtml(lead.description || "Sem descricao.")}</p>
    </section>
    <section class="panel">
      <h2>Controle</h2>
      <label>Status
        <select id="statusSelect">
          ${["NOVO", "CONTATO", "ORCAMENTO", "NEGOCIACAO", "FECHADO", "PERDIDO"]
            .map((status) => `<option value="${status}" ${lead.status === status ? "selected" : ""}>${statusLabel(status)}</option>`)
            .join("")}
        </select>
      </label>
      <p class="muted">Criado em ${formatDate(lead.createdAt)}</p>
      <p class="muted">Atualizado em ${formatDate(lead.updatedAt)}</p>
    </section>
    <section class="panel">
      <h2>Observacoes internas</h2>
      <textarea id="notes">${escapeHtml(lead.internalNotes || "")}</textarea>
      <button id="saveNotes">Salvar observacoes</button>
    </section>
  `;

  document.getElementById("statusSelect").addEventListener("change", async (event) => {
    await apiFetch(`/api/leads/${lead.id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: event.target.value })
    });
  });

  document.getElementById("saveNotes").addEventListener("click", async () => {
    await apiFetch(`/api/leads/${lead.id}/notes`, {
      method: "PATCH",
      body: JSON.stringify({
        internalNotes: document.getElementById("notes").value
      })
    });
  });
}

loadLead().catch((error) => {
  detail.innerHTML = `<p class="message">${error.message}</p>`;
});
