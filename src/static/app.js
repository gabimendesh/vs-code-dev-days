document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");
  
  // Authentication elements
  const userIcon = document.getElementById("user-icon");
  const loginModal = document.getElementById("login-modal");
  const loginForm = document.getElementById("login-form");
  const closeModal = document.getElementById("close-modal");
  const authStatus = document.getElementById("auth-status");
  const loggedUser = document.getElementById("logged-user");
  const logoutBtn = document.getElementById("logout-btn");
  const loginMessage = document.getElementById("login-message");

  // Authentication state
  let currentUser = null;
  let authCredentials = null;

  // Authentication functions
  function updateAuthUI() {
    const signupContainer = document.getElementById("signup-container");
    
    if (currentUser) {
      userIcon.classList.add("hidden");
      authStatus.classList.remove("hidden");
      loggedUser.textContent = `Logged in as: ${currentUser}`;
      
      // Enable protected elements
      document.querySelectorAll(".protected").forEach(el => {
        el.classList.add("authenticated");
      });
    } else {
      userIcon.classList.remove("hidden");
      authStatus.classList.add("hidden");
      
      // Disable protected elements
      document.querySelectorAll(".protected").forEach(el => {
        el.classList.remove("authenticated");
      });
    }
  }

  function showMessage(element, message, type) {
    element.textContent = message;
    element.className = type;
    element.classList.remove("hidden");
    
    // Hide after 5 seconds
    setTimeout(() => {
      element.classList.add("hidden");
    }, 5000);
  }

  // Authentication event handlers
  userIcon.addEventListener("click", () => {
    loginModal.classList.remove("hidden");
  });

  closeModal.addEventListener("click", () => {
    loginModal.classList.add("hidden");
    loginForm.reset();
    loginMessage.classList.add("hidden");
  });

  // Close modal when clicking outside
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.classList.add("hidden");
      loginForm.reset();
      loginMessage.classList.add("hidden");
    }
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    try {
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        currentUser = username;
        authCredentials = credentials;
        updateAuthUI();
        loginModal.classList.add("hidden");
        loginForm.reset();
        showMessage(messageDiv, result.message, "success");
        
        // Refresh activities to update delete buttons
        fetchActivities();
      } else {
        showMessage(loginMessage, result.detail || "Login failed", "error");
      }
    } catch (error) {
      showMessage(loginMessage, "Login failed. Please try again.", "error");
      console.error("Login error:", error);
    }
  });

  logoutBtn.addEventListener("click", () => {
    currentUser = null;
    authCredentials = null;
    updateAuthUI();
    showMessage(messageDiv, "Logged out successfully", "info");
    
    // Refresh activities to update delete buttons
    fetchActivities();
  });

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message
      activitiesList.innerHTML = "";
      
      // Clear activity select options (keep default option)
      activitySelect.innerHTML = '<option value="">-- Select an activity --</option>';

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft =
          details.max_participants - details.participants.length;

        // Create participants HTML with delete icons (protected for authenticated users)
        const participantsHTML =
          details.participants.length > 0
            ? `<div class="participants-section">
              <h5>Participants:</h5>
              <ul class="participants-list">
                ${details.participants
                  .map(
                    (email) =>
                      `<li><span class="participant-email">${email}</span><button class="delete-btn protected ${currentUser ? 'authenticated' : ''}" data-activity="${name}" data-email="${email}">❌</button></li>`
                  )
                  .join("")}
              </ul>
            </div>`
            : `<p><em>No participants yet</em></p>`;

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          <div class="participants-container">
            ${participantsHTML}
          </div>
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });

      // Add event listeners to delete buttons
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", handleUnregister);
      });
    } catch (error) {
      activitiesList.innerHTML =
        "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle unregister functionality
  async function handleUnregister(event) {
    if (!currentUser) {
      showMessage(messageDiv, "Please login as admin/professor to unregister students", "error");
      return;
    }

    const button = event.target;
    const activity = button.getAttribute("data-activity");
    const email = button.getAttribute("data-email");

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(
          activity
        )}/unregister?email=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Basic ${authCredentials}`
          }
        }
      );

      const result = await response.json();

      if (response.ok) {
        showMessage(messageDiv, result.message, "success");
        // Refresh activities list to show updated participants
        fetchActivities();
      } else {
        showMessage(messageDiv, result.detail || "An error occurred", "error");
      }
    } catch (error) {
      showMessage(messageDiv, "Failed to unregister. Please try again.", "error");
      console.error("Error unregistering:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    if (!currentUser) {
      showMessage(messageDiv, "Please login as admin/professor to register students", "error");
      return;
    }

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(
          activity
        )}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Basic ${authCredentials}`
          }
        }
      );

      const result = await response.json();

      if (response.ok) {
        showMessage(messageDiv, result.message, "success");
        signupForm.reset();

        // Refresh activities list to show updated participants
        fetchActivities();
      } else {
        showMessage(messageDiv, result.detail || "An error occurred", "error");
      }
    } catch (error) {
      showMessage(messageDiv, "Failed to sign up. Please try again.", "error");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  updateAuthUI(); // Set initial auth state
  fetchActivities();
});
