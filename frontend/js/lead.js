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
      <p><strong>WhatsApp:</strong> ${lead.phone}</p>
      <p><strong>Email:</strong> ${lead.email || "Nao informado"}</p>
      <p><strong>Cidade:</strong> ${lead.city || "Nao informada"}</p>
      <p><strong>Bairro:</strong> ${lead.neighborhood || "Nao informado"}</p>
      <a class="button" href="${lead.whatsappLink}" target="_blank" rel="noopener">Conversar pelo WhatsApp</a>
    </section>
    <section class="panel">
      <h2>Solicitacao</h2>
      <p><strong>Servico:</strong> ${lead.serviceType}</p>
      <p><strong>Equipamento:</strong> ${lead.equipmentType || "Nao informado"}</p>
      <p><strong>Marca:</strong> ${lead.brand || "Nao informada"}</p>
      <p><strong>BTUs:</strong> ${lead.btus || "Nao informado"}</p>
      <p><strong>Quantidade:</strong> ${lead.quantity}</p>
      <p>${lead.description || "Sem descricao."}</p>
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
      <textarea id="notes">${lead.internalNotes || ""}</textarea>
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
