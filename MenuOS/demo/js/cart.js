// =====================================================
// CART.JS - Standalone Demo (No Backend Required)
// =====================================================

const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('table') || '1';

console.log('🛒 Cart - Table Number:', tableNumber);

// =====================================================
// IMAGE HELPER FUNCTION
// =====================================================
function getImageUrl(imagePath, category) {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const filename = imagePath.split('/').pop();
    const cat = category ? category.toLowerCase() : 'general';
    return `./public/uploads/food_category/${cat}/${filename}`;
}

function getCategoryEmoji(category) {
    const map = {
        'Breakfast': '🍳', 'Lunch': '🥗', 'Dinner': '🍽️',
        'Treats': '🍟', 'Dessert': '🍰', 'Drinks': '🥤'
    };
    return map[category] || '🍽️';
}

// =====================================================
// STATE VARIABLES
// =====================================================
let cart = [];

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 Cart page loaded. Table:', tableNumber);

    if (!tableNumber) {
        window.location.href = 'index.html';
        return;
    }

    loadCart();
    renderCart();
    setupEventListeners();
});

// =====================================================
// CART DATA FUNCTIONS
// =====================================================

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
    console.log('✅ Cart loaded:', cart.length, 'unique items');
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// =====================================================
// UI RENDERING
// =====================================================

function renderCart() {
    const emptyCart = document.getElementById('emptyCart');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');

    if (cart.length === 0) {
        emptyCart.style.display = 'flex';
        cartItems.style.display = 'none';
        cartFooter.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartItems.style.display = 'block';
    cartFooter.style.display = 'block';

    cartItems.innerHTML = cart.map((item, index) => {
        const displayName = item.size ? `${item.name} (${item.size})` : item.name;
        const imageUrl = getImageUrl(item.image_url, item.category);
        const emoji = getCategoryEmoji(item.category);
        const itemKey = item.size ? `${item.id}-${item.size}` : `${item.id}`;

        const imgContent = imageUrl
            ? `<img src="${imageUrl}" alt="${displayName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
               <div style="display:none; width:100%; height:100%; align-items:center; justify-content:center; font-size:32px;">${emoji}</div>`
            : `<div style="display:flex; width:100%; height:100%; align-items:center; justify-content:center; font-size:32px;">${emoji}</div>`;

        return `
        <div class="cart-item" data-key="${itemKey}" data-index="${index}">
            <div class="cart-item-top">
                <div class="cart-item-image">
                    ${imgContent}
                </div>
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${displayName}</h3>
                    ${item.size ? `<p class="cart-item-size" style="font-size: 12px; color: #999; margin-top: 3px;">Size: ${item.size}</p>` : ''}
                    <p class="cart-item-price">LKR ${item.price.toFixed(2)}</p>
                </div>
                <button class="cart-item-remove" data-index="${index}" title="Remove item">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="cart-item-bottom">
                <div class="quantity-controls">
                    <button class="quantity-btn" data-index="${index}" data-action="decrease">
                        <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn" data-index="${index}" data-action="increase">
                        <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                    </button>
                </div>
                <span class="item-total">LKR ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        </div>
        `;
    }).join('');

    updateTotals();
    addCartEventListeners();
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('subtotalAmount').textContent = `LKR ${subtotal.toFixed(2)}`;
    document.getElementById('taxAmount').textContent = `LKR ${tax.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `LKR ${total.toFixed(2)}`;
}

// =====================================================
// CART ITEM ACTIONS
// =====================================================

function addCartEventListeners() {
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeItemByIndex(parseInt(btn.dataset.index));
        });
    });

    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateQuantityByIndex(parseInt(btn.dataset.index), btn.dataset.action);
        });
    });
}

function removeItemByIndex(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function updateQuantityByIndex(index, action) {
    const item = cart[index];
    if (!item) return;

    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease') {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            removeItemByIndex(index);
            return;
        }
    }

    saveCart();
    renderCart();
}

// =====================================================
// EVENT LISTENERS
// =====================================================

function setupEventListeners() {
    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = `menu.html?table=${tableNumber}`;
    });

    document.getElementById('browseMenuBtn').addEventListener('click', () => {
        window.location.href = `menu.html?table=${tableNumber}`;
    });

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = `checkout.html?table=${tableNumber}`;
        });
    }
}
