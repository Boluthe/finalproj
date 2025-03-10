let admin_form = document.querySelector("#admin_form");
let submit = document.querySelector("#submit_btn");
let password = document.querySelector("input[name='password']");
let confirm_password = document.querySelector("input[name='confirm_password']");
let inputs = document.querySelectorAll("input.field");
let form_fields = document.querySelectorAll(".field");
let message = document.querySelector(".message");

// Make all fields visible when the page loads
document.addEventListener("DOMContentLoaded", function () {
  form_fields.forEach((field) => {
    if (field.tagName === "BUTTON") {
      field.style.display = "flex";
    } else {
      field.style.display = "block";
    }
  });

  // Initially disable the submit button
  submit.disabled = true;
});

// Check form validity whenever an input changes
inputs.forEach((input) => {
  input.addEventListener("input", validateForm);
});

function validateForm() {
  // Check if all inputs are filled
  let allFilled = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  );

  // Check if passwords match
  let passwordsMatch = password.value === confirm_password.value;

  // Enable or disable submit button
  submit.disabled = !(allFilled && passwordsMatch);

  // Optional: show visual feedback for password match
  if (password.value && confirm_password.value) {
    if (passwordsMatch) {
      confirm_password.style.borderColor = "green";
    } else {
      confirm_password.style.borderColor = "red";
    }
  }
}

admin_form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Disable the button during submission to prevent multiple submissions
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
        alert(data.message);
        window.location.href = "admin_dashboard.html";
      } else {
        alert(data.message);
        // Re-enable the button if there was an error
        submit.disabled = false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
      // Re-enable the button if there was an error
      submit.disabled = false;
    });
});
