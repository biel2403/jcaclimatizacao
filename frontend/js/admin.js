async function requireLogin() {
  const data = await apiFetch("/api/auth/me");
  if (!data.user) {
    window.location.href = "login.html";
  }
}

document.querySelectorAll("[data-logout]").forEach((button) => {
  button.addEventListener("click", async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    window.location.href = "login.html";
  });
});
