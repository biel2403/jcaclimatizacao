const form = document.getElementById("quoteForm");
const message = document.getElementById("formMessage");

function showMessage(text) {
  message.textContent = text;
  message.hidden = false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.hidden = true;

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  if (!payload.name || payload.name.trim().length < 2) {
    return showMessage("Informe seu nome.");
  }

  if (!payload.phone || payload.phone.replace(/\D/g, "").length < 10) {
    return showMessage("Informe um WhatsApp valido.");
  }

  if (!payload.serviceType) {
    return showMessage("Selecione o servico desejado.");
  }

  try {
    await apiFetch("/api/leads", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    window.location.href = "sucesso.html";
  } catch (error) {
    showMessage(error.message);
  }
});
