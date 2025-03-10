let admin_form = document.querySelector("#admin_form");
let submit = document.querySelector("#submit_btn");

let form_fields = document.querySelectorAll(".field");
let message = document.querySelector(".message");

form_fields.forEach((datum, i) => {
  datum.setAttribute("autocomplete", "off");
  datum.addEventListener("input", () => {
    let allFilled = Array.from(form_fields).every(
      (field) => field.value.trim() !== ""
    );
    if (form_fields[5].value !== form_fields[6].value || !allFilled) {
      submit.disabled = true;
    } else {
      submit.disabled = false;
    }
  });
});

admin_form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("create_admin.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
        window.location.href = "admin_dashboard.html";
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    });
});

document.addEventListener("DOMContentLoaded", function () {
  // Make all fields visible at once
  form_fields.forEach((field) => {
    field.style.display = "block";
  });
});
