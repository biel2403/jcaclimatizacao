const filters = document.getElementById("filters");
const leadList = document.getElementById("leadList");

async function loadLeads() {
  await requireLogin();
  const params = new URLSearchParams(new FormData(filters));
  const data = await apiFetch(`/api/leads?${params.toString()}`);

  leadList.innerHTML = data.leads.length
    ? data.leads
        .map(
          (lead) => `
          <article class="lead-card">
            <div>
              <strong>${lead.name}</strong>
              <div class="muted">${lead.phone}</div>
            </div>
            <div>${lead.serviceType}<div class="muted">${lead.city || ""}</div></div>
            <span class="badge">${statusLabel(lead.status)}</span>
            <a class="button secondary" href="lead.html?id=${lead.id}">Detalhes</a>
          </article>
        `
        )
        .join("")
    : "<p class='muted'>Nenhum lead encontrado.</p>";
}

filters.addEventListener("submit", (event) => {
  event.preventDefault();
  loadLeads();
});

loadLeads().catch((error) => {
  leadList.innerHTML = `<p class="message">${error.message}</p>`;
});
