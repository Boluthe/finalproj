document.addEventListener("DOMContentLoaded", function () {
  // ===== Core Elements =====
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const mainContainer = document.querySelector("#main-container .cont1");
  const midCont = document.querySelector(".mid_cont");
  const overlay = document.querySelector(".screen_overlay");
  const messageEl = document.querySelector(".message");
  const deleteForm = document.getElementById("delete_form");
  const noBtn = document.getElementById("no");
  
  // ===== Sample Data (for demonstration) =====
  const sampleBranches = [
    { id: 1, name: "Downtown Branch", image: null },
    { id: 2, name: "Westside Location", image: null },
    { id: 3, name: "North City Store", image: null }
  ];

  // ===== Initialize Components =====
  initSidebar();
  initDeleteModal();
  loadSampleBranches();

  // ===== Component Initialization Functions =====
  
  function initSidebar() {
    // Fix hamburger icon display
    if (menuToggle) {
      menuToggle.style.display = "flex";
      
      menuToggle.addEventListener("click", function(e) {
        e.stopPropagation();
        
        // Toggle active classes
        this.classList.toggle("active");
        sidebar.classList.toggle("active");
        
        // Adjust main container for desktop view
        if (window.innerWidth > 768) {
          document.querySelector(".container").classList.toggle("expanded");
        }
        
        // For mobile view, handle navigation menu
        if (window.innerWidth <= 768) {
          midCont.classList.toggle("active");
        }
      });
    }
    
    // Handle click outside to close sidebar on mobile
    document.addEventListener("click", function(e) {
      if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        sidebar.classList.remove("active");
        menuToggle.classList.remove("active");
        midCont.classList.remove("active");
      }
    });
    
    // Handle window resize
    window.addEventListener("resize", function() {
      if (window.innerWidth > 768) {
        midCont.classList.remove("active");
        
        // Reset container padding based on sidebar state
        if (sidebar.classList.contains("active")) {
          document.querySelector(".container").classList.add("expanded");
        } else {
          document.querySelector(".container").classList.remove("expanded");
        }
      } else {
        document.querySelector(".container").classList.remove("expanded");
      }
    });
  }
  
  function initDeleteModal() {
    // Close modal on "No" button click
    if (noBtn) {
      noBtn.addEventListener("click", function() {
        overlay.style.display = "none";
      });
    }
    
    // Handle delete form submission
    if (deleteForm) {
      deleteForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const branchId = document.getElementById("branch_id").value;
        const branchName = document.getElementById("branch").value;
        
        // In a real app, you'd make an API call here:
        // deleteBranch(branchId);
        
        // For demo, just show success message
        showMessage(`${branchName} branch has been deleted successfully.`);
        
        // Remove the corresponding branch card
        const branchCard = document.querySelector(`.store[data-id="${branchId}"]`);
        if (branchCard) {
          branchCard.style.animation = "fade-out 0.3s ease-in-out forwards";
          setTimeout(() => {
            branchCard.remove();
          }, 300);
        }
        
        // Close modal
        overlay.style.display = "none";
      });
    }
    
    // Close modal when clicking on the overlay background
    if (overlay) {
      overlay.addEventListener("click", function(e) {
        if (e.target === overlay) {
          overlay.style.display = "none";
        }
      });
    }
    
    // Add ESC key handler to close modal
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && overlay.style.display === "flex") {
        overlay.style.display = "none";
      }
    });
  }
  
  // ===== Branch Card Functions =====
  
  function loadSampleBranches() {
    // For demo purposes - in a real app, you'd fetch from an API
    setTimeout(() => {
      sampleBranches.forEach((branch, index) => {
        setTimeout(() => {
          const card = createBranchCard(branch);
          mainContainer.appendChild(card);
        }, index * 200); // Stagger the appearance
      });
    }, 500);
  }
  
  function createBranchCard(branch) {
    const card = document.createElement("div");
    card.className = "store";
    card.setAttribute("data-id", branch.id);
    
    card.innerHTML = `
      <div class="pill">
        <img src="${branch.image || 'https://via.placeholder.com/300x180/e0e0e0/7307f7?text=' + encodeURIComponent(branch.name)}" alt="${branch.name}">
        <div class="pill_overlay"></div>
      </div>
      <h3>${branch.name}</h3>
      <div class="delete" data-id="${branch.id}" data-name="${branch.name}">Delete Branch</div>
    `;
    
    // Add click event to delete button
    const deleteBtn = card.querySelector(".delete");
    deleteBtn.addEventListener("click", function() {
      showDeleteConfirmation(branch.id, branch.name);
    });
    
    return card;
  }
  
  function showDeleteConfirmation(id, name) {
    // Set values in the modal
    document.getElementById("name").textContent = name;
    document.getElementById("branch_id").value = id;
    document.getElementById("branch").value = name;
    
    // Show modal
    overlay.style.display = "flex";
  }
  
  // ===== Utility Functions =====
  
  let messageTimeout; // Define the timeout variable
  
  function showMessage(text, isError = false) {
    messageEl.textContent = text;
    messageEl.style.backgroundColor = isError ? "#f44336" : "#7307f7"; // Use hex value instead of CSS variable
    messageEl.style.display = "block";
    
    // Auto-hide after delay
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
      messageEl.style.opacity = "0";
      setTimeout(() => {
        messageEl.style.display = "none";
        messageEl.style.opacity = "1";
      }, 300);
    }, 3000);
  }
  
  // ===== Animation Keyframes =====
  
  // Add necessary keyframes for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-out {
      0% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateY(-20px);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Make functions available globally if needed
  window.showMessage = showMessage;
  window.createBranchCard = createBranchCard;
  window.showDeleteConfirmation = showDeleteConfirmation;
});