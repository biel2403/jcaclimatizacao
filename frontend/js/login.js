const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginMessage.hidden = true;

  const payload = Object.fromEntries(new FormData(loginForm).entries());

  try {
    await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    window.location.href = "dashboard.html";
  } catch (error) {
    loginMessage.textContent = error.message;
    loginMessage.hidden = false;
  }
});
