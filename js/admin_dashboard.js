document.addEventListener("DOMContentLoaded", function() {
  // Initialize dashboard components
  initializeExpiryData();
  initializeLowStockData();
  
  function initializeExpiryData() {
    // Simulate fetching expiry data from server
    // In a real application, this would be an AJAX call to get_exp.php
    const expiryData = [
      { image: 'product1.jpg', name: 'Hand Sanitizer', date: '2025-04-15', quantity: 42, branch: 'Downtown Branch' },
      { image: 'product2.jpg', name: 'Face Masks', date: '2025-03-30', quantity: 28, branch: 'Westside Location' },
      { image: 'product3.jpg', name: 'Vitamins', date: '2025-05-10', quantity: 15, branch: 'North City Store' }
    ];
    
    // Update the UI with expiry data
    const tbody = document.querySelector("#tbody");
    if (tbody) {
      if (expiryData.length > 0) {
        expiryData.forEach((item, i) => {
          // Create table row for each item
          const tr = document.createElement('tr');
          tr.style.display = 'none'; // Start hidden for animation
          tr.innerHTML = `
            <td><div class="exp_img"><img src="pictures/${item.image}" alt="${item.name}"></div></td>
            <td>${item.name}</td>
            <td>${item.date}</td>
            <td>${item.quantity} Left in stock</td>
            <td>${item.branch}</td>
          `;
          tbody.appendChild(tr);
          
          // Animate row appearance
          setTimeout(() => {
            tr.style.display = 'table-row';
          }, i * 100);
        });
      } else {
        tbody.innerHTML = '<tr><td colspan="5">No records found</td></tr>';
      }
    }
  }
  
  function initializeLowStockData() {
    // Simulate fetching low stock data from server
    // In a real application, this would be an AJAX call to get_low_stock.php
    const lowStockData = [
      { image: 'product4.jpg', name: 'Antibacterial Soap', quantity: 5, branch: 'Downtown Branch' },
      { image: 'product5.jpg', name: 'Disinfectant Spray', quantity: 3, branch: 'Westside Location' }
    ];
    
    // Update the UI with low stock data
    const lowStockTbody = document.querySelector("#low");
    if (lowStockTbody) {
      if (lowStockData.length > 0) {
        lowStockData.forEach((item, i) => {
          // Create table row for each item
          const tr = document.createElement('tr');
          tr.style.display = 'none'; // Start hidden for animation
          tr.innerHTML = `
            <td><div class="exp_img"><img src="pictures/${item.image}" alt="${item.name}"></div></td>
            <td>${item.name}</td>
            <td>${item.quantity} Left in stock</td>
            <td>${item.branch}</td>
          `;
          lowStockTbody.appendChild(tr);
          
          // Animate row appearance
          setTimeout(() => {
            tr.style.display = 'table-row';
          }, i * 100);
        });
        
        // Update notification count
        const notifyElements = document.querySelectorAll(".notify");
        notifyElements.forEach(el => {
          el.setAttribute('data-count', lowStockData.length);
        });
      } else {
        lowStockTbody.innerHTML = '<tr><td colspan="4">No low stock items</td></tr>';
      }
    }
  }
});