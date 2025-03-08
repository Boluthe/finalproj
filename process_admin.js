document.addEventListener("DOMContentLoaded", () => {
  const adminForm = document.querySelector("#admin_form");
  const submitBtn = document.querySelector("#submit_btn");
  const popup = document.querySelector("#popup");
  const popupMessage = document.querySelector("#popup-message");
  const closeBtn = document.querySelector("#close-btn");
  const passwordField = document.querySelector("[name='password']");
  const confirmPasswordField = document.querySelector(
    "[name='confirm_password']"
  );
  const storeNameField = document.querySelector("[name='store_name']");
  const storeAddressField = document.querySelector("[name='store_address']");

  // Add validation for all relevant fields
  [
    passwordField,
    confirmPasswordField,
    storeNameField,
    storeAddressField,
  ].forEach((field) => {
    field.addEventListener("input", validateForm);
  });

  function validateForm() {
    const passwordsMatch = passwordField.value === confirmPasswordField.value;
    const passwordValid = /^(?=.*[A-Z])(?=.*[@&^*]).{8,}$/.test(
      passwordField.value
    );
    const storeNameValid = storeNameField.value.trim().length >= 3;
    const storeAddressValid = storeAddressField.value.trim().length >= 5;

    submitBtn.disabled = !(
      passwordsMatch &&
      passwordValid &&
      storeNameValid &&
      storeAddressValid
    );
  }

  adminForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;

    try {
      const formData = new FormData(adminForm);
      const response = await fetch(adminForm.action, {
        method: adminForm.method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      handleResponse(data);
    } catch (error) {
      console.error("Error:", error);
      showPopup(`An unexpected error occurred: ${error.message}`, true);
    } finally {
      submitBtn.disabled = false;
    }
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  function handleResponse(data) {
    switch (data.status) {
      case "success":
        showPopup("Store and admin account created successfully!");
        adminForm.reset();
        break;

      case "used_email":
        showPopup("Email already in use", true);
        resetField("email");
        resetPasswordFields();
        break;

      case "store_exists":
        showPopup(
          "Store name already exists. Please choose a different name.",
          true
        );
        resetStoreFields();
        break;

      case "invalid_password":
        showPopup(
          "Password must contain: 8+ characters, 1 uppercase, 1 special symbol (@&^*)",
          true
        );
        resetPasswordFields();
        break;

      default:
        showPopup(data.message || "An error occurred", true);
    }
  }

  function showPopup(message, isError = false) {
    popupMessage.textContent = message;
    popup.style.display = "flex";
    popup.style.backgroundColor = isError ? "#ffebee" : "#e8f5e9";

    setTimeout(() => {
      popup.style.display = "none";
    }, 7000);
  }

  function resetField(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) field.value = "";
  }

  function resetPasswordFields() {
    passwordField.value = "";
    confirmPasswordField.value = "";
  }

  function resetStoreFields() {
    storeNameField.value = "";
    storeAddressField.value = "";
    resetPasswordFields();
  }

  // Initial validation
  validateForm();
});
