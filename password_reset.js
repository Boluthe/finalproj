document.getElementById("reset_form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector('input[name="email"]').value;

  try {
    const response = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      showMessage("Reset link sent to your email!", "success");
    } else {
      showMessage(data.error || "Failed to send reset link", "error");
    }
  } catch (err) {
    showMessage("Network error. Try again later.", "error");
  }
});

function showMessage(message, type) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
  messageDiv.className = type;
  setTimeout(() => {
    messageDiv.textContent = "";
    messageDiv.className = "";
  }, 5000);
}
