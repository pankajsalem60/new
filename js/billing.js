// Billing and checkout related functionality

// Show detailed billing for current cart
function showBillingPage() {
    // Check if user is logged in before proceeding
    if (!localStorage.getItem('currentUser')) {
        showAuthModal();
        return;
    }

    // Create billing modal
    let billingModal = document.getElementById('billingModal');

    if (!billingModal) {
        billingModal = document.createElement('div');
        billingModal.id = 'billingModal';
        billingModal.className = 'billing-modal';

        billingModal.innerHTML = `
            <div class="billing-modal-content">
                <span class="close-billing">&times;</span>
                <h2>Your Order Summary</h2>
                <p id="tableNumberDisplay" class="table-number-display">Table No: <strong>--</strong></p>
                <div id="billItemsList" class="bill-items-list"></div>
                <div class="bill-totals">
                    <div class="bill-row">
                        <span>Subtotal:</span>
                        <span id="billSubtotal">₹0</span>
                    </div>
                    <div class="bill-row">
                        <span>Tax (5%):</span>
                        <span id="billTax">₹0</span>
                    </div>
                    <div class="bill-row bill-total">
                        <span>Total:</span>
                        <span id="billTotal">₹0</span>
                    </div>
                </div>
                <div class="bill-actions">
                    <button id="confirmOrderBtn" class="confirm-order-btn">Confirm Order</button>
                    <button id="continueShopping" class="continue-shopping-btn">Continue Order</button>
                </div>
            </div>
        `;

        document.body.appendChild(billingModal);

        // Add event listeners
        document.querySelector('.close-billing').addEventListener('click', () => {
            billingModal.style.display = 'none';
        });

        document.getElementById('continueShopping').addEventListener('click', () => {
            billingModal.style.display = 'none';
        });

        document.getElementById('confirmOrderBtn').addEventListener('click', confirmOrder);

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === billingModal) {
                billingModal.style.display = 'none';
            }
        });
    }

    // Populate bill with current cart items
    updateBillDetails();

    // Generate and show random table number
    generateRandomTableNumber();

    // Show billing modal
    billingModal.style.display = 'block';
}

// Generate and display random table number
function generateRandomTableNumber() {
    const randomTableNo = Math.floor(Math.random() * 10) + 1; // 1 to 10
    const tableDisplay = document.getElementById('tableNumberDisplay');
    if (tableDisplay) {
        tableDisplay.innerHTML = `Table No: <strong>${randomTableNo}</strong>`;
    }
}

// Update bill details with current cart items
function updateBillDetails() {
    const billItemsList = document.getElementById('billItemsList');
    billItemsList.innerHTML = '';

    let subtotal = 0;

    // Get cart items
    const cardItems = Object.values(listCards);

    if (cardItems.length === 0) {
        billItemsList.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        updateBillTotals(0);
        return;
    }

    // Add each item to the bill
    cardItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'bill-item';

        itemElement.innerHTML = `
            <div class="bill-item-info">
                <span class="bill-item-name">${item.name}</span>
                <span class="bill-item-price">₹${item.price} × ${item.quantity}</span>
            </div>
            <span class="bill-item-total">₹${itemTotal}</span>
        `;

        billItemsList.appendChild(itemElement);
    });

    // Update totals
    updateBillTotals(subtotal);
}

// Update bill totals based on subtotal
function updateBillTotals(subtotal) {
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    document.getElementById('billSubtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('billTax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('billTotal').textContent = `₹${total.toFixed(2)}`;
}

// Confirm and process order
function confirmOrder() {
    // Check if cart is empty
    const cardItems = Object.values(listCards);
    if (cardItems.length === 0) {
        showToast('Your cart is empty');
        return;
    }

    // Get current user
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        showAuthModal();
        return;
    }

    const currentUser = JSON.parse(userData);

    // Calculate order totals
    let subtotal = 0;
    cardItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    // Get the table number
    const tableNumberText = document.getElementById('tableNumberDisplay')?.innerText || '';
    const tableNumber = tableNumberText.match(/\d+/)?.[0] || "N/A";

    // Create order object
    const order = {
        tableNumber: tableNumber,
        items: cardItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity
        })),
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        date: new Date().toISOString()
    };

    // Add order to user's order history
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === currentUser.email);

    if (userIndex !== -1) {
        if (!users[userIndex].orders) {
            users[userIndex].orders = [];
        }
        users[userIndex].orders.push(order);
        localStorage.setItem('users', JSON.stringify(users));

        // Update current user data
        currentUser.orders = users[userIndex].orders;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    // Show order confirmation
    showOrderConfirmation(order);

    // Clear cart
    listCards = {};
    reloadCart();
}

// Show order confirmation message
function showOrderConfirmation(order) {
    // Hide billing modal
    const billingModal = document.getElementById('billingModal');
    if (billingModal) {
        billingModal.style.display = 'none';
    }

    // Create confirmation modal
    let confirmationModal = document.getElementById('orderConfirmationModal');

    if (!confirmationModal) {
        confirmationModal = document.createElement('div');
        confirmationModal.id = 'orderConfirmationModal';
        confirmationModal.className = 'confirmation-modal';

        confirmationModal.innerHTML = `
            <div class="confirmation-modal-content">
                <h2>Thank you for your order!</h2>
                <p>Your order has been confirmed and is being processed.</p>
                <div class="order-summary">
                    <h3>Order Summary</h3>
                    <p><strong>Table No:</strong> ${order.tableNumber}</p>
                    <p><strong>Total:</strong> ₹<span id="confirmationTotal"></span></p>
                    <p><strong>Items:</strong> <span id="confirmationItems"></span></p>
                </div>
                <button id="backToMenuBtn" class="back-to-menu-btn">Back to Menu</button>
            </div>
        `;

        document.body.appendChild(confirmationModal);

        // Add event listener
        document.getElementById('backToMenuBtn').addEventListener('click', () => {
            confirmationModal.style.display = 'none';
        });
    }

    // Update confirmation details
    document.getElementById('confirmationTotal').textContent = order.total;
    document.getElementById('confirmationItems').textContent = order.items.length;

    // Show confirmation modal
    confirmationModal.style.display = 'block';
}

// Utility function to handle "View Cart" button click
function handleViewCartClick() {
    // First check if cart is empty
    const cardItems = Object.values(listCards);
    if (cardItems.length === 0) {
        showToast('Your cart is empty');
        return;
    }

    // Show billing page
    showBillingPage();
}

// Initialize billing functionality
function initBilling() {
    // Add view cart button to the cart interface
    const cartElement = document.querySelector('.card');
    if (cartElement) {
        const checkoutDiv = cartElement.querySelector('.checkOut');
        if (checkoutDiv) {
            // Check if button already exists
            if (!document.getElementById('viewCartBtn')) {
                const viewCartBtn = document.createElement('div');
                viewCartBtn.id = 'viewCartBtn';
                viewCartBtn.textContent = 'View Cart';
                viewCartBtn.className = 'view-cart-btn';
                viewCartBtn.addEventListener('click', handleViewCartClick);

                // Insert before the close shopping button
                const closeShoppingBtn = checkoutDiv.querySelector('.closeShopping');
                checkoutDiv.insertBefore(viewCartBtn, closeShoppingBtn);
            }
        }
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initBilling();
});
