document.addEventListener("DOMContentLoaded", function () {
  let admin_form = document.querySelector("#admin_form");
  let submit = document.querySelector("#submit_btn");
  let password = document.querySelector("input[name='password']");
  let confirm_password = document.querySelector(
    "input[name='confirm_password']"
  );
  let inputs = document.querySelectorAll("input.field");
  let message = document.querySelector(".message");

  // Initially disable the submit button
  submit.disabled = true;

  // Check form validity whenever an input changes
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      // Check if all inputs are filled
      let allFilled = Array.from(inputs).every(
        (input) => input.value.trim() !== ""
      );

      // Check if passwords match
      let passwordsMatch = password.value === confirm_password.value;

      // Enable or disable submit button
      submit.disabled = !(allFilled && passwordsMatch);

      // Visual feedback for password match
      if (password.value && confirm_password.value) {
        if (passwordsMatch) {
          confirm_password.style.borderColor = "green";
        } else {
          confirm_password.style.borderColor = "red";
        }
      }
    });
  });

  admin_form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Disable button during submission
    submit.disabled = true;

    const formData = new FormData(this);

    fetch("create_admin.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          // Show success message
          showMessage(data.message);
          // Redirect after a short delay
          setTimeout(() => {
            window.location.href = "admin_dashboard.html";
          }, 1500);
        } else {
          // Show error message and re-enable button
          showMessage(data.message);
          submit.disabled = false;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showMessage("An unexpected error occurred. Please try again.");
        submit.disabled = false;
      });
  });

  // Function to show messages
  function showMessage(text) {
    message.textContent = text;
    message.style.display = "flex";

    // Hide message after 3 seconds
    setTimeout(() => {
      message.style.display = "none";
    }, 3000);
  }
});
