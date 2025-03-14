document.addEventListener("DOMContentLoaded", function() {
    let hideTimer;
    let search = document.querySelector("#search");
    let search_trig = document.querySelector("#search_trig");
    let search_bar = document.querySelector(".search_bar");
    let data = document.querySelectorAll(".field");
    let sale_submit = document.querySelector("#sale_submit");
    let item_cards = document.querySelectorAll(".item_card");
    let fileInput = document.querySelector("#img");
    let img_label = document.querySelector("#img_label");
  
    // Animate item cards appearance
    if (item_cards.length > 0) {
      item_cards.forEach((item_card, i) => {
        setTimeout(() => {
          item_card.style.display = "block";
        }, i * 100);
      });
    }
  
    // Form validation - enable submit button only when all fields are filled
    if (data.length > 0 && sale_submit) {
      data.forEach((field) => {
        field.addEventListener("input", () => {
          let allFilled = Array.from(data).every(
            (field) => field.value.trim() !== ""
          );
          sale_submit.disabled = !allFilled;
        });
      });
    }
  
    // File input handling for image uploads
    if (fileInput && img_label) {
      fileInput.addEventListener("change", function() {
        if (this.files && this.files[0]) {
          img_label.textContent = this.files[0].name;
        } else {
          img_label.textContent = "Choose an image";
        }
      });
    }
  
    // Search functionality
    if (search_trig && search_bar) {
      search_trig.addEventListener("click", function() {
        search_bar.classList.toggle("active");
        if (search_bar.classList.contains("active")) {
          search.focus();
        }
      });
      
      // Close search bar when clicking outside
      document.addEventListener("click", function(e) {
        if (!search_bar.contains(e.target) && !search_trig.contains(e.target)) {
          search_bar.classList.remove("active");
        }
      });
    }
  
    // Handle form submissions
    const forms = document.querySelectorAll("form:not(#delete_form)");
    forms.forEach(form => {
      form.addEventListener("submit", function(e) {
        const submitBtn = form.querySelector("button[type='submit']");
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
        }
      });
    });
  });