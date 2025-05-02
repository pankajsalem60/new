
// Authentication related functionality
let currentUser = null;

// Check if user is logged in from localStorage
function checkLoggedInStatus() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUIForLoggedInUser();
        return true;
    }
    return false;
}

// Update UI elements for logged in user
function updateUIForLoggedInUser() {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.textContent = 'My Account';
        loginButton.onclick = showUserProfile;
    }
    
    // Show user name in navbar if available
    const userDisplayElement = document.getElementById('userDisplay');
    if (userDisplayElement && currentUser) {
        userDisplayElement.textContent = currentUser.name || currentUser.email;
        userDisplayElement.style.display = 'inline-block';
    }
}

// Display login/signup form
function showAuthModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.style.display = 'block';
    } else {
        createAuthModal();
    }
}

// Create authentication modal
function createAuthModal() {
    // Create modal container
    const modal = document.createElement('div');
    modal.id = 'authModal';
    modal.className = 'auth-modal';
    
    // Create modal content
    modal.innerHTML = `
        <div class="auth-modal-content">
            <span class="close-auth">&times;</span>
            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login">Login</button>
                <button class="auth-tab" data-tab="signup">Signup</button>
            </div>
            
            <div id="loginForm" class="auth-form active">
                <h2>Login to Your Account</h2>
                <div class="form-group">
                    <label for="loginEmail">Email</label>
                    <input type="email" id="loginEmail" placeholder="Enter your email" required>
                    <span class="error-message" id="loginEmailError"></span>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" placeholder="Enter your password" required>
                    <span class="error-message" id="loginPasswordError"></span>
                </div>
                <button id="loginSubmit" class="auth-button">Login</button>
                <div id="loginErrorMessage" class="auth-error"></div>
            </div>
            
            <div id="signupForm" class="auth-form">
                <h2>Create New Account</h2>
                <div class="form-group">
                    <label for="signupName">Full Name</label>
                    <input type="text" id="signupName" placeholder="Enter your full name" required>
                    <span class="error-message" id="signupNameError"></span>
                </div>
                <div class="form-group">
                    <label for="signupEmail">Email</label>
                    <input type="email" id="signupEmail" placeholder="Enter your email" required>
                    <span class="error-message" id="signupEmailError"></span>
                </div>
                <div class="form-group">
                    <label for="signupPassword">Password</label>
                    <input type="password" id="signupPassword" placeholder="Enter your password" required>
                    <span class="error-message" id="signupPasswordError"></span>
                </div>
                <div class="form-group">
                    <label for="signupConfirmPassword">Confirm Password</label>
                    <input type="password" id="signupConfirmPassword" placeholder="Confirm your password" required>
                    <span class="error-message" id="signupConfirmPasswordError"></span>
                </div>
                <button id="signupSubmit" class="auth-button">Sign Up</button>
                <div id="signupErrorMessage" class="auth-error"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = document.querySelector('.close-auth');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Tab switching
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to current tab
            tab.classList.add('active');
            
            // Hide all forms
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            
            // Show selected form
            const formId = tab.getAttribute('data-tab') + 'Form';
            document.getElementById(formId).classList.add('active');
        });
    });
    
    // Login form submission
    document.getElementById('loginSubmit').addEventListener('click', handleLogin);
    
    // Signup form submission
    document.getElementById('signupSubmit').addEventListener('click', handleSignup);
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Handle login form submission
function handleLogin() {
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.getElementById('loginErrorMessage').textContent = '';
    
    // Get values
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validate email
    if (!email) {
        document.getElementById('loginEmailError').textContent = 'Email is required';
        return;
    } else if (!isValidEmail(email)) {
        document.getElementById('loginEmailError').textContent = 'Please enter a valid email';
        return;
    }
    
    // Validate password
    if (!password) {
        document.getElementById('loginPasswordError').textContent = 'Password is required';
        return;
    }
    
    // Check stored users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store logged in user
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Close modal
        document.getElementById('authModal').style.display = 'none';
        
        // Update UI
        updateUIForLoggedInUser();
        
        // Show success message
        showToast('Login successful!');
    } else {
        document.getElementById('loginErrorMessage').textContent = 'Invalid email or password';
    }
}

// Handle signup form submission
function handleSignup() {
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.getElementById('signupErrorMessage').textContent = '';
    
    // Get values
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validate name
    if (!name) {
        document.getElementById('signupNameError').textContent = 'Name is required';
        return;
    }
    
    // Validate email
    if (!email) {
        document.getElementById('signupEmailError').textContent = 'Email is required';
        return;
    } else if (!isValidEmail(email)) {
        document.getElementById('signupEmailError').textContent = 'Please enter a valid email';
        return;
    }
    
    // Validate password
    if (!password) {
        document.getElementById('signupPasswordError').textContent = 'Password is required';
        return;
    } else if (password.length < 6) {
        document.getElementById('signupPasswordError').textContent = 'Password must be at least 6 characters';
        return;
    }
    
    // Validate confirm password
    if (password !== confirmPassword) {
        document.getElementById('signupConfirmPasswordError').textContent = 'Passwords do not match';
        return;
    }
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
        document.getElementById('signupErrorMessage').textContent = 'Email already in use';
        return;
    }
    
    // Add new user
    const newUser = { name, email, password, orders: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Close modal
    document.getElementById('authModal').style.display = 'none';
    
    // Update UI
    updateUIForLoggedInUser();
    
    // Show success message
    showToast('Account created successfully!');
}

// Logout user
function logoutUser() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    
    // Update UI
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.textContent = 'Login';
        loginButton.onclick = showAuthModal;
    }
    
    // Hide user display
    const userDisplayElement = document.getElementById('userDisplay');
    if (userDisplayElement) {
        userDisplayElement.style.display = 'none';
    }
    
    showToast('Logged out successfully!');
}

// Show user profile
function showUserProfile() {
    if (!currentUser) {
        showAuthModal();
        return;
    }
    
    // Create profile modal if it doesn't exist
    let profileModal = document.getElementById('profileModal');
    
    if (!profileModal) {
        profileModal = document.createElement('div');
        profileModal.id = 'profileModal';
        profileModal.className = 'auth-modal';
        
        profileModal.innerHTML = `
            <div class="auth-modal-content">
                <span class="close-profile">&times;</span>
                <h2>My Account</h2>
                <div class="profile-info">
                    <p><strong>Name:</strong> <span id="profileName"></span></p>
                    <p><strong>Email:</strong> <span id="profileEmail"></span></p>
                </div>
                <h3>Order History</h3>
                <div id="orderHistory" class="order-history">
                    <p class="no-orders">No orders yet.</p>
                </div>
                <button id="logoutButton" class="auth-button">Logout</button>
            </div>
        `;
        
        document.body.appendChild(profileModal);
        
        // Add event listeners
        document.querySelector('.close-profile').addEventListener('click', () => {
            profileModal.style.display = 'none';
        });
        
        document.getElementById('logoutButton').addEventListener('click', () => {
            logoutUser();
            profileModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === profileModal) {
                profileModal.style.display = 'none';
            }
        });
    }
    
    // Update profile information
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    
    // Update order history
    const orderHistoryElement = document.getElementById('orderHistory');
    orderHistoryElement.innerHTML = '';
    
    if (currentUser.orders && currentUser.orders.length > 0) {
        currentUser.orders.forEach((order, index) => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            
            orderElement.innerHTML = `
                <h4>Order #${index + 1} - ${new Date(order.date).toLocaleString()}</h4>
                <p>Items: ${order.items.length}</p>
                <p>Total: ₹${order.total}</p>
                <button class="view-order-btn" data-order-index="${index}">View Details</button>
            `;
            
            orderHistoryElement.appendChild(orderElement);
        });
        
        // Add event listeners to view order buttons
        const viewOrderButtons = document.querySelectorAll('.view-order-btn');
        viewOrderButtons.forEach(button => {
            button.addEventListener('click', () => {
                const orderIndex = parseInt(button.getAttribute('data-order-index'));
                showOrderDetails(currentUser.orders[orderIndex]);
            });
        });
    } else {
        orderHistoryElement.innerHTML = '<p class="no-orders">No orders yet.</p>';
    }
    
    // Show modal
    profileModal.style.display = 'block';
}

// Show order details
function showOrderDetails(order) {
    let orderDetailsModal = document.getElementById('orderDetailsModal');
    
    if (!orderDetailsModal) {
        orderDetailsModal = document.createElement('div');
        orderDetailsModal.id = 'orderDetailsModal';
        orderDetailsModal.className = 'auth-modal';
        
        orderDetailsModal.innerHTML = `
            <div class="auth-modal-content">
                <span class="close-order-details">&times;</span>
                <h2>Order Details</h2>
                <p><strong>Date:</strong> <span id="orderDate"></span></p>
                <div id="orderItems" class="order-items"></div>
                <div class="order-summary">
                    <p><strong>Subtotal:</strong> ₹<span id="orderSubtotal"></span></p>
                    <p><strong>Tax (5%):</strong> ₹<span id="orderTax"></span></p>
                    <p><strong>Total:</strong> ₹<span id="orderTotal"></span></p>
                </div>
            </div>
        `;
        
        document.body.appendChild(orderDetailsModal);
        
        // Add event listeners
        document.querySelector('.close-order-details').addEventListener('click', () => {
            orderDetailsModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === orderDetailsModal) {
                orderDetailsModal.style.display = 'none';
            }
        });
    }
    
    // Update order details
    document.getElementById('orderDate').textContent = new Date(order.date).toLocaleString();
    
    const orderItemsElement = document.getElementById('orderItems');
    orderItemsElement.innerHTML = '';
    
    order.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item-detail';
        
        itemElement.innerHTML = `
            <p><strong>${item.name}</strong> × ${item.quantity}</p>
            <p>₹${item.price} each</p>
            <p>Total: ₹${item.totalPrice}</p>
        `;
        
        orderItemsElement.appendChild(itemElement);
    });
    
    document.getElementById('orderSubtotal').textContent = order.subtotal;
    document.getElementById('orderTax').textContent = order.tax;
    document.getElementById('orderTotal').textContent = order.total;
    
    // Show modal
    orderDetailsModal.style.display = 'block';
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show toast message
function showToast(message) {
    let toast = document.getElementById('toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = 'toast show';
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// Initialize authentication on page load
window.addEventListener('DOMContentLoaded', () => {
    checkLoggedInStatus();
});
