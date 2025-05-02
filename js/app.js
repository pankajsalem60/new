
// DOM Elements
const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');
const proceedToBillingBtn = document.getElementById('proceedToBilling');

// Modal Elements
const modal = document.createElement('div');
modal.classList.add('popup-modal');
document.body.appendChild(modal);

// Products Array
const products = [
    {
        id: 1,
        name: 'Alo Vadi',
        image: 'images/alu-vadi.jpg',
        price: 120,
        nutrition: {
            calories: 150,
            protein: 3,
            carbohydrates: 28,
            fat: 4,
            fiber: 2,
            sugar: 5
        }
    },
    {
        id: 2,
        name: 'Kholapuri Tadka',
        image: 'images/kholapuri-kat-vada.jpg',
        price: 150,
        nutrition: {
            calories: 180,
            protein: 4,
            carbohydrates: 30,
            fat: 6,
            fiber: 3,
            sugar: 7
        }
    },
    {
        id: 3,
        name: 'Pau Bhaji',
        image: 'images/pau-bhaji.jpg',
        price: 100,
        nutrition: {
            calories: 120,
            protein: 5,
            carbohydrates: 20,
            fat: 3,
            fiber: 4,
            sugar: 6
        }
    },
    {
        id: 4,
        name: 'Puran Poli Thali',
        image: 'images/puran-poli.jpg',
        price: 180,
        nutrition: {
            calories: 200,
            protein: 6,
            carbohydrates: 35,
            fat: 5,
            fiber: 5,
            sugar: 10
        }
    },

    // South-Indian Category
    {
        id: 5,
        name: 'Idly Vada',
        image: 'images/idly-vada.jpg',
        price: 50,
        nutrition: {
            calories: 100,
            protein: 4,
            carbohydrates: 22,
            fat: 2,
            fiber: 3,
            sugar: 4
        }
    },
    {
        id: 6,
        name: 'Meals',
        image: 'images/me.jpg',
        price: 120,
        nutrition: {
            calories: 200,
            protein: 8,
            carbohydrates: 30,
            fat: 5,
            fiber: 4,
            sugar: 6
        }
    },
    {
        id: 7,
        name: 'Masala Dosa',
        image: 'images/masala-dosa.jpg',
        price: 90,
        nutrition: {
            calories: 150,
            protein: 5,
            carbohydrates: 25,
            fat: 3,
            fiber: 3,
            sugar: 5
        }
    },
    {
        id: 8,
        name: 'Sambar Vada',
        image: 'images/sa.jpg',
        price: 70,
        nutrition: {
            calories: 120,
            protein: 3,
            carbohydrates: 20,
            fat: 2,
            fiber: 3,
            sugar: 4
        }
    },
    {
        id: 9,
        name: 'Pongal',
        image: 'images/pongal.jpg',
        price: 100,
        nutrition: {
            calories: 180,
            protein: 6,
            carbohydrates: 30,
            fat: 4,
            fiber: 5,
            sugar: 7
        }
    },
    // North-Indian Category
    {
        id: 10,
        name: 'Paneer Tikka Masala',
        image: 'images/paneer-masala.jpg',
        price: 200,
        nutrition: {
            calories: 250,
            protein: 15,
            carbohydrates: 20,
            fat: 15,
            fiber: 2,
            sugar: 5
        }
    },
    {
        id: 11,
        name: 'Aloo Paratha',
        image: 'images/aloo.webp',
        price: 60,
        nutrition: {
            calories: 150,
            protein: 5,
            carbohydrates: 25,
            fat: 5,
            fiber: 3,
            sugar: 4
        }
    },
    {
        id: 12,
        name: 'Dal Makhani',
        image: 'images/dal.jpg',
        price: 150,
        nutrition: {
            calories: 200,
            protein: 10,
            carbohydrates: 30,
            fat: 5,
            fiber: 4,
            sugar: 6
        }
    },
    {
        id: 13,
        name: 'Naan',
        image: 'images/naan.jpg',
        price: 40,
        nutrition: {
            calories: 100,
            protein: 3,
            carbohydrates: 20,
            fat: 2,
            fiber: 1,
            sugar: 3
        }
    },

    // Chinese Category
    {
        id: 14,
        name: 'Chowmin',
        image: 'images/chowmin.jpg',
        price: 120,
        nutrition: {
            calories: 180,
            protein: 5,
            carbohydrates: 25,
            fat: 6,
            fiber: 2,
            sugar: 4
        }
    },
    {
        id: 15,
        name: 'Fried Rice',
        image: 'images/fried-rice.jpg',
        price: 130,
        nutrition: {
            calories: 200,
            protein: 6,
            carbohydrates: 30,
            fat: 5,
            fiber: 3,
            sugar: 5
        }
    },
    {
        id: 16,
        name: 'Noodles',
        image: 'images/noodles.jpg',
        price: 110,
        nutrition: {
            calories: 160,
            protein: 4,
            carbohydrates: 25,
            fat: 4,
            fiber: 2,
            sugar: 3
        }
    },
    {
        id: 17,
        name: 'Soup',
        image: 'images/soup.jpg',
        price: 90,
        nutrition: {
            calories: 100,
            protein: 3,
            carbohydrates: 15,
            fat: 2,
            fiber: 2,
            sugar: 4
        }
    },
    {
        id: 18,
        name: 'Spring Roll',
        image: 'images/spring-roll.jpg',
        price: 100,
        nutrition: {
            calories: 150,
            protein: 4,
            carbohydrates: 20,
            fat: 6,
            fiber: 2,
            sugar: 3
        }
    },

    // Desserts Category
    {
        id: 19,
        name: 'Cup Cake',
        image: 'images/cup-cake.jpg',
        price: 50,
        nutrition: {
            calories: 120,
            protein: 2,
            carbohydrates: 20,
            fat: 4,
            fiber: 1,
            sugar: 10
        }
    },
    {
        id: 20,
        name: 'Pastry',
        image: 'images/pastry.jpg',
        price: 70,
        nutrition: {
            calories: 150,
            protein: 3,
            carbohydrates: 25,
            fat: 5,
            fiber: 2,
            sugar: 12
        }
    },
    {
        id: 21,
        name: 'Modhak',
        image: 'images/modhak.jpg',
        price: 90,
        nutrition: {
            calories: 180,
            protein: 2,
            carbohydrates: 30,
            fat: 3,
            fiber: 2,
            sugar: 15
        }
    },
    {
        id: 22,
        name: 'Gulab Jamun',
        image: 'images/gulab-jamun.jpg',
        price: 100,
        nutrition: {
            calories: 160,
            protein: 2,
            carbohydrates: 28,
            fat: 4,
            fiber: 1,
            sugar: 12
        }
    },
    {
        id: 23,
        name: 'Ice Cream',
        image: 'images/ice-cream.jpg',
        price: 60,
        nutrition: {
            calories: 100,
            protein: 2,
            carbohydrates: 15,
            fat: 5,
            fiber: 0,
            sugar: 10
        }
    },

    // Hot-Cold Drinks Category
    {
        id: 24,
        name: 'Chocolate Shake',
        image: 'images/hot-chocolate.jpg',
        price: 90,
        nutrition: {
            calories: 120,
            protein: 2,
            carbohydrates: 20,
            fat: 4,
            fiber: 1,
            sugar: 8
        }
    },
    {
        id: 25,
        name: 'Cad Bee',
        image: 'images/cadbee.jpg',
        price: 50,
        nutrition: {
            calories: 100,
            protein: 1,
            carbohydrates: 25,
            fat: 2,
            fiber: 1,
            sugar: 8
        }
    },
    {
        id: 26,
        name: 'Lemon juice',
        image: 'images/lemonade.jpg',
        price: 40,
        nutrition: {
            calories: 60,
            protein: 1,
            carbohydrates: 15,
            fat: 0,
            fiber: 1,
            sugar: 12
        }
    },
    {
        id: 27,
        name: 'Lassi',
        image: 'images/lassi.jpg',
        price: 60,
        nutrition: {
            calories: 100,
            protein: 3,
            carbohydrates: 15,
            fat: 3,
            fiber: 1,
            sugar: 8
        }
    },
    {
        id: 28,
        name: 'Filter Coffee',
        image: 'images/filter-coffee.jpg',
        price: 50,
        nutrition: {
            calories: 50,
            protein: 1,
            carbohydrates: 0,
            fat: 0,
            fiber: 0,
            sugar: 0
        }
    },
    {
        id: 29,
        name: 'CHAI',
        image: 'images/tea.jpg',
        price: 30,
        nutrition: {
            calories: 30,
            protein: 0,
            carbohydrates: 0,
            fat: 0,
            fiber: 0,
            sugar: 0
        }
    },
];

// Cart Storage
let listCards = {};

// Initialize App - Render Product List
document.addEventListener('DOMContentLoaded', () => {
    // Ensure shopping cart toggle works correctly
    if (openShopping) {
        openShopping.addEventListener('click', () => {
            body.classList.add('active');
            const card = document.querySelector('.card');
            if (card) {
                card.style.right = '0';
            }
        });
    }

    if (closeShopping) {
        closeShopping.addEventListener('click', () => {
            body.classList.remove('active');
            const card = document.querySelector('.card');
            if (card) {
                card.style.right = '-100%';
            }
        });
    }

    initApp();
});

// Function to Render Product List
function initApp() {
    if (!list) return; // Safety check
    
    list.innerHTML = ''; // Clear existing items
    
    products.forEach((product, key) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img" data-key="${key}" />
            <div class="title">${product.name}</div>
            <div class="price">₹${product.price}</div>
            <button class="add-btn" onclick="addToCart(${key})">Add to Cart</button>`;
        list.appendChild(newDiv);
    });

    document.querySelectorAll('.product-img').forEach(img => {
        img.addEventListener('click', () => showPopup(parseInt(img.dataset.key)));
    });
    
    // Update cart if items exist
    reloadCart();
}

// Show Popup with Product Details
function showPopup(key) {
    const product = products[key];
    modal.innerHTML = `
        <div class="popup-content">
            <span class="close-popup">&times;</span>
            <div class="popup-body">
                <img src="${product.image}" alt="${product.name}" class="popup-image"/>
                <div class="popup-details">
                    <h2>${product.name}</h2>
                    <p class="price">Price: ₹${product.price}</p>
                    <h3>Nutrition Facts:</h3>
                    <ul class="nutrition-list">
                        <li>Calories: ${product.nutrition.calories} kcal</li>
                        <li>Protein: ${product.nutrition.protein}g</li>
                        <li>Carbs: ${product.nutrition.carbohydrates}g</li>
                        <li>Fat: ${product.nutrition.fat}g</li>
                        <li>Fiber: ${product.nutrition.fiber}g</li>
                        <li>Sugar: ${product.nutrition.sugar}g</li>
                    </ul>
                    <button class="add-to-cart" onclick="addToCart(${key})">Add to Cart</button>
                </div>
            </div>
        </div>`;

    modal.classList.add('show');
    document.querySelector('.close-popup').addEventListener('click', () => {
        modal.classList.remove('show');
    });
}

// Add Product to Cart
function addToCart(key) {
    if (!listCards[key]) {
        listCards[key] = { ...products[key], quantity: 1, totalPrice: products[key].price };
    } else {
        listCards[key].quantity++;
        listCards[key].totalPrice = listCards[key].quantity * products[key].price;
    }
    reloadCart();
    modal.classList.remove('show'); // Close popup after adding to cart
    
    // Visual feedback when adding to cart
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = `${products[key].name} added to cart`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }, 100);
}

// Reload Cart UI
function reloadCart() {
    if (!listCard || !quantity || !total) return; // Safety check
    
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    Object.keys(listCards).forEach(key => {
        const product = listCards[key];
        totalPrice += product.totalPrice;
        count += product.quantity;

        const newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="${product.image}" alt="${product.name}" /></div>
            <div>${product.name}</div>
            <div>₹${product.totalPrice}</div>
            <div class="quantity-controls">
                <button class="decrement-btn" onclick="changeQuantity(${key}, 'decrease')">-</button>
                <div class="count">${product.quantity}</div>
                <button class="increment-btn" onclick="changeQuantity(${key}, 'increase')">+</button>
            </div>`;
        listCard.appendChild(newDiv);
    });

    total.textContent = `₹${totalPrice}`;
    quantity.textContent = count;
}

// Change Quantity in Cart
function changeQuantity(key, action) {
    if (listCards[key]) {
        if (action === 'increase') {
            listCards[key].quantity++;
        } else if (action === 'decrease' && listCards[key].quantity > 1) {
            listCards[key].quantity--;
        } else {
            delete listCards[key];
        }
        
        // Update total price for the item
        if (listCards[key]) {
            listCards[key].totalPrice = listCards[key].quantity * products[key].price;
        }
    }
    reloadCart();
}

// Add some CSS for toast notifications
const toastStyle = document.createElement('style');
toastStyle.textContent = `
.toast-notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background-color: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
    z-index: 1001;
    opacity: 0;
    transition: all 0.3s ease;
}
.toast-notification.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}
`;
document.head.appendChild(toastStyle);

// Calculate total bill
function calculateTotalBill() {
    let totalAmount = 0;
    Object.values(listCards).forEach(item => {
        totalAmount += item.totalPrice;
    });
    return totalAmount;
}

// Voice commands handler functions
function scrollElement(selector, direction) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollBy(0, direction === 'up' ? -100 : 100);
    }
}

function navigateToSection(anchor) {
    const section = document.querySelector(anchor);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function openCart() {
    body.classList.add('active');
    const card = document.querySelector('.card');
    if (card) {
        card.style.right = '0';
    }
}

function closeCart() {
    body.classList.remove('active');
    const card = document.querySelector('.card');
    if (card) {
        card.style.right = '-100%';
    }
}

// Filter menu by category 
function filterCategory(category) {
    let categoryStart, categoryEnd;
    
    switch(category) {
        case 'maharashtra':
            categoryStart = 0;
            categoryEnd = 4;
            break;
        case 'south-indian':
            categoryStart = 4;
            categoryEnd = 9;
            break;
        case 'north-indian':
            categoryStart = 9;
            categoryEnd = 14;
            break;
        case 'chinese':
            categoryStart = 14;
            categoryEnd = 19;
            break;
        case 'desserts':
            categoryStart = 19;
            categoryEnd = 24;
            break;
        case 'hot-cold':
            categoryStart = 24;
            categoryEnd = 30;
            break;
        default:
            categoryStart = 0;
            categoryEnd = products.length;
    }
    
    if (!list) return;
    
    list.innerHTML = '';
    
    for (let i = categoryStart; i < categoryEnd && i < products.length; i++) {
        const product = products[i];
        const newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img" data-key="${i}" />
            <div class="title">${product.name}</div>
            <div class="price">₹${product.price}</div>
            <button class="add-btn" onclick="addToCart(${i})">Add to Cart</button>`;
        list.appendChild(newDiv);
    }
    
    document.querySelectorAll('.product-img').forEach(img => {
        img.addEventListener('click', () => showPopup(parseInt(img.dataset.key)));
    });
    
    // Scroll to the menu section
    navigateToSection('#shopping-cart');
}

// Ensure the filter category function is globally available
window.filterCategory = filterCategory;
