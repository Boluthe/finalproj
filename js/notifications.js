document.addEventListener("DOMContentLoaded", function() {
    // Initialize notifications
    loadNotifications();
    
    function loadNotifications() {
      // Simulate fetching notifications from server
      // In a real application, this would be an AJAX call to get_total_not.php
      const notificationData = {
        total: 7,  // Total number of unread notifications
        notifications: [
          { id: 1, message: 'Low stock alert: Hand Sanitizer (5 remaining)', type: 'low_stock', date: '2025-03-12' },
          { id: 2, message: 'Expiring soon: Vitamin C (15 days left)', type: 'expiry', date: '2025-03-11' },
          { id: 3, message: 'New branch registration request', type: 'request', date: '2025-03-10' }
        ]
      };
      
      updateNotificationBadge(notificationData);
      
      // If we're on the notifications page, populate the list
      const notificationsContainer = document.querySelector("#notifications-container");
      if (notificationsContainer) {
        populateNotifications(notificationData.notifications);
      }
    }
    
    function updateNotificationBadge(data) {
      // Update notification count badge
      if (data.total > 0) {
        const notifyElements = document.querySelectorAll(".notify");
        notifyElements.forEach(el => {
          el.setAttribute('data-count', data.total);
        });
      }
    }
    
    function populateNotifications(notifications) {
      const container = document.querySelector("#notifications-container");
      if (!container) return;
      
      // Clear existing notifications
      container.innerHTML = '';
      
      if (notifications.length === 0) {
        container.innerHTML = '<div class="no-notifications">No notifications to display</div>';
        return;
      }
      
      // Add each notification to the container
      notifications.forEach((notification, index) => {
        const notificationEl = document.createElement('div');
        notificationEl.className = `notification ${notification.type}`;
        notificationEl.style.display = 'none'; // Start hidden for animation
        
        notificationEl.innerHTML = `
          <div class="notification-content">
            <div class="notification-message">${notification.message}</div>
            <div class="notification-date">${notification.date}</div>
          </div>
          <div class="notification-actions">
            <button class="mark-read" data-id="${notification.id}">Mark as Read</button>
          </div>
        `;
        
        container.appendChild(notificationEl);
        
        // Add event listener to mark-read button
        const markReadBtn = notificationEl.querySelector('.mark-read');
        if (markReadBtn) {
          markReadBtn.addEventListener('click', function() {
            markNotificationAsRead(notification.id, notificationEl);
          });
        }
        
        // Animate notification appearance
        setTimeout(() => {
          notificationEl.style.display = 'flex';
        }, index * 100);
      });
    }
    
    function markNotificationAsRead(id, element) {
      // In a real app, this would make an AJAX call to update the notification status
      // For demonstration, we'll just remove the notification from the UI
      element.style.opacity = '0';
      
      setTimeout(() => {
        element.remove();
        
        // Update the notification count
        const currentCount = parseInt(document.querySelector(".notify").getAttribute('data-count'));
        if (currentCount > 0) {
          const newCount = currentCount - 1;
          document.querySelectorAll(".notify").forEach(el => {
            el.setAttribute('data-count', newCount);
            });
        }   
        }, 300);
    }
    });