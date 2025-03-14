document.addEventListener("DOMContentLoaded", function() {
    // Check if user is logged in as admin
    checkAdminSession();
  
    function checkAdminSession() {
      // In a real application, this would make an AJAX call to a server endpoint
      // For demonstration purposes, we'll simulate a successful response
      simulateAdminSession();
    }
  
    function simulateAdminSession() {
      // This simulates the response from a server
      const adminData = {
        status: 'success',
        store: 'Quick Track Admin',
        admin_id: '1',
        username: 'admin'
      };
  
      updateUIWithAdminData(adminData);
    }
  
    function updateUIWithAdminData(data) {
      if (data.status === 'success') {
        console.log("Admin session verified:", data);
        
        // Update header elements with admin info
        const lastContUl = document.querySelector(".last_cont ul");
        if (lastContUl) {
          lastContUl.innerHTML = `
            <li class='highlight'>Admin</li> 
            <a href="logout.php"><li><i class="fa-solid fa-sign-out-alt"></i></li></a>
          `;
        }
        
        // Update store name in header
        const logoCont = document.querySelector(".logo_cont");
        if (logoCont) {
          logoCont.innerHTML = `<a href="index.html" class="highlight">${data.store}</a>`;
        }
        
        // Apply highlight styles
        const highlights = document.querySelectorAll(".highlight");
        highlights.forEach(el => {
          el.style.color = "#7307f7";
          el.style.fontWeight = "600";
          el.style.fontSize = "18px";
        });
      } else {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
      }
    }
  });