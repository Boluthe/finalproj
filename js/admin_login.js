document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login_form");
  const loginSubmit = document.getElementById("sale_submit");
  const message = document.getElementById("message");

  // Enable form submission when all fields are filled
  const fields = document.querySelectorAll("input.field");
  fields.forEach((field) => {
    field.addEventListener("input", () => {
      const allFilled = Array.from(fields).every(
        (input) => input.value.trim() !== ""
      );
      loginSubmit.disabled = !allFilled;
    });
  });

  // Handle form submission
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Form submitted");

    // Display loading message
    message.textContent = "Logging in...";
    message.style.display = "flex";

    try {
      const formData = new FormData(loginForm);

      // Log form data for debugging
      console.log("Form data:");
      for (let pair of formData.entries()) {
        console.log(
          pair[0] + ": " + (pair[0] === "password" ? "****" : pair[1])
        );
      }

      const response = await fetch("admin_login.php", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Try to get the response text first
      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (!responseText.trim()) {
        throw new Error("Empty response from server");
      }

      // Try to parse the JSON
      let result;
      try {
        result = JSON.parse(responseText);
        console.log("Parsed result:", result);
      } catch (jsonError) {
        throw new Error(
          `JSON parse error: ${jsonError.message}. Raw response: ${responseText}`
        );
      }

      if (result.status === "success") {
        message.textContent = "Login successful! Redirecting...";
        window.location.href = result.redirect_url;
      } else if (result.status === "invalid_user") {
        message.textContent = "Invalid email or password";
        setTimeout(() => {
          message.style.display = "none";
        }, 3000);
      } else {
        message.textContent = result.message || "Login failed";
        setTimeout(() => {
          message.style.display = "none";
        }, 3000);
      }
    } catch (error) {
      console.error("Detailed error:", error);
      message.textContent = `Error: ${error.message}`;
      setTimeout(() => {
        message.style.display = "none";
      }, 5000);
    }
  });
});
