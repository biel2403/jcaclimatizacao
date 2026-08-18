const metricOrder = ["NOVO", "CONTATO", "ORCAMENTO", "FECHADO", "PERDIDO"];

async function loadDashboard() {
  await requireLogin();
  const data = await apiFetch("/api/dashboard");
  const metrics = document.getElementById("metrics");
  const recent = document.getElementById("recentLeads");

  metrics.innerHTML = metricOrder
    .map(
      (status) => `
        <article class="metric">
          <span>${statusLabel(status)}</span>
          <strong>${data.counts[status] || 0}</strong>
        </article>
      `
    )
    .join("");

  recent.innerHTML = data.recent.length
    ? data.recent
        .map(
          (lead) => `
          <article class="lead-card">
            <div><strong>${escapeHtml(lead.name)}</strong><div class="muted">${escapeHtml(lead.serviceType)}</div></div>
            <span class="badge">${statusLabel(lead.status)}</span>
            <span class="muted">${formatDate(lead.createdAt)}</span>
            <a class="button secondary" href="lead.html?id=${encodeURIComponent(lead.id)}">Abrir</a>
          </article>
        `
        )
        .join("")
    : "<p class='muted'>Nenhum lead recebido ainda.</p>";
}

loadDashboard().catch((error) => {
  document.getElementById("recentLeads").innerHTML = `<p class="message">${error.message}</p>`;
});
