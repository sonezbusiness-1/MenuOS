// =====================================================
// MENU.JS - Standalone Demo (No Backend Required)
// All data is hardcoded. Works as a static website.
// =====================================================

const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('table') || '1';

console.log('🍽️ Table Number:', tableNumber);

// =====================================================
// IMAGE HELPER
// =====================================================
function getImageUrl(imagePath, category) {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const filename = imagePath.split('/').pop();
    const cat = category ? category.toLowerCase() : 'general';
    return `./public/uploads/food_category/${cat}/${filename}`;
}

// =====================================================
// MOCK DATA - 22 items across 6 categories
// =====================================================

const MOCK_CATEGORIES = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Breakfast' },
    { id: 2, name: 'Lunch' },
    { id: 3, name: 'Dinner' },
    { id: 4, name: 'Treats' },
    { id: 5, name: 'Dessert' },
    { id: 6, name: 'Drinks' }
];

const MOCK_MENU = [
    // Breakfast Items
    { 
        id: 1, 
        name: 'Pancakes', 
        description: 'Fluffy pancakes with maple syrup and butter', 
        price: 800, 
        image_url: 'public/uploads/food_category/breakfast/pancakes.jpg', 
        prep_time: 10, 
        rating: 4.6, 
        category: 'Breakfast' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 2, 
        name: 'French Toast', 
        description: 'Golden french toast with fresh berries', 
        price: 850, 
        image_url: 'public/uploads/food_category/breakfast/french-toast.jpg', 
        prep_time: 12, 
        rating: 4.7, 
        category: 'Breakfast' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 3, 
        name: 'Omelette', 
        description: 'Three-egg omelette with cheese and vegetables', 
        price: 900, 
        image_url: 'public/uploads/food_category/breakfast/omelette.jpg', 
        prep_time: 15, 
        rating: 4.5, 
        category: 'Breakfast' ,
        has_sizes: false,
        sizes: null
    },
    
    // Lunch Items
    { 
        id: 4, 
        name: 'Fried Rice', 
        description: 'Delicious chicken fried rice with vegetables', 
        price: 1500, 
        image_url: 'public/uploads/food_category/lunch/fried-rice.jpg', 
        prep_time: 20, 
        rating: 4.8, 
        category: 'Lunch' ,
        has_sizes: true,
        sizes: [
            { name: 'Small', price: 1100 },
            { name: 'Large', price: 1400 }
        ]

    },
    { 
        id: 5, 
        name: 'Noodles', 
        description: 'Spicy chicken noodles with fresh herbs', 
        price: 1400, 
        image_url: 'public/uploads/food_category/lunch/noodles.jpg', 
        prep_time: 15, 
        rating: 4.7, 
        category: 'Lunch' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 6, 
        name: 'Chicken Burger', 
        description: 'Juicy chicken burger with cheese and fries', 
        price: 2500, 
        image_url: 'public/uploads/food_category/lunch/burger.jpg', 
        prep_time: 25, 
        rating: 4.9, 
        category: 'Lunch' ,
        has_sizes: true,
        sizes: [
            { name: 'Regular', price: 1100 },
            { name: 'Large', price: 1400 },
            { name: 'Double Patty', price: 1700 }
        ]

    },
    { 
        id: 7, 
        name: 'Grilled Chicken', 
        description: 'Tender grilled chicken with vegetables', 
        price: 1800, 
        image_url: 'public/uploads/food_category/lunch/grilled-chicken.jpg', 
        prep_time: 30, 
        rating: 4.8, 
        category: 'Lunch' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 8, 
        name: 'Pizza', 
        description: 'Classic margherita pizza with fresh mozzarella', 
        price: 2000, 
        image_url: 'public/uploads/food_category/lunch/pizza.jpg', 
        prep_time: 20, 
        rating: 4.9, 
        category: 'Lunch' ,
        has_sizes: true,
        sizes: [
            { name: 'Small', price: 1100 },
            { name: 'Large', price: 1400 },
            { name: 'Double Patty', price: 1700 }
        ]

    },
    
    // Dinner Items
    { 
        id: 9, 
        name: 'Grilled Steak', 
        description: 'Premium beef steak with mashed potatoes', 
        price: 3500, 
        image_url: 'public/uploads/food_category/dinner/steak.jpg', 
        prep_time: 35, 
        rating: 4.9, 
        category: 'Dinner' ,
        has_sizes: false,
        sizes: null 
    },
    { 
        id: 10, 
        name: 'Salmon Fillet', 
        description: 'Grilled salmon with lemon butter sauce', 
        price: 3200, 
        image_url: 'public/uploads/food_category/dinner/salmon.jpg', 
        prep_time: 30, 
        rating: 4.8, 
        category: 'Dinner' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 11, 
        name: 'Pasta Carbonara', 
        description: 'Creamy pasta with bacon and parmesan', 
        price: 2200, 
        image_url: 'public/uploads/food_category/dinner/pasta.jpg', 
        prep_time: 25, 
        rating: 4.7, 
        category: 'Dinner' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 12, 
        name: 'Chicken Curry', 
        description: 'Rich curry with rice and naan bread', 
        price: 1900, 
        image_url: 'public/uploads/food_category/dinner/curry.jpg', 
        prep_time: 30, 
        rating: 4.8, 
        category: 'Dinner' ,
        has_sizes: false,
        sizes: null

    },
    {
        id: 13,
        name: 'Chicken Biryani',
        description: 'Fragrant basmati rice with spiced chicken',
        price: 1100,
        image_url: 'public/uploads/food_category/dinner/biryani.jpg',
        prep_time: 30,
        rating: 4.9,
        category: 'Dinner',
        has_sizes:  true,
        sizes: [
            { name: 'Regular', price: 1100 },
            { name: 'Large', price: 1400 },
            { name: 'Family Pack', price: 1700 }
        ]
    },
    {
        id: 14,
        name: 'Spaghetti Bolognese',
        description: 'Classic Italian pasta with rich meat sauce',
        price: 1200,
        image_url: 'public/uploads/food_category/dinner/spaghetti.jpg',
        prep_time: 25,
        rating: 4.7,
        category: 'Dinner',
        has_sizes: false,
        sizes: null
    },
    
    // Treats
    { 
        id: 15, 
        name: 'Chocolate Brownie', 
        description: 'Warm chocolate brownie with vanilla ice cream', 
        price: 700, 
        image_url: 'public/uploads/food_category/treats/brownie.jpg', 
        prep_time: 5, 
        rating: 4.8, 
        category: 'Treats' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 16, 
        name: 'Donuts', 
        description: 'Assorted glazed donuts', 
        price: 500, 
        image_url: 'public/uploads/food_category/treats/donuts.jpg', 
        prep_time: 5, 
        rating: 4.6, 
        category: 'Treats' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 17, 
        name: 'Cookies', 
        description: 'Freshly baked chocolate chip cookies', 
        price: 450, 
        image_url: 'public/uploads/food_category/treats/cookies.jpg', 
        prep_time: 5, 
        rating: 4.7, 
        category: 'Treats' ,
        has_sizes: false,
        sizes: null
    },
    {
        id: 18,
        name: 'Waffles',
        description: 'Crispy waffles with syrup and berries',
        price: 600,
        image_url: 'public/uploads/food_category/treats/waffles.jpg',
        prep_time: 5,
        rating: 4.8,
        category: 'Treats',
        has_sizes: false,
        sizes: null
    },
    
    // Dessert
    { 
        id: 19, 
        name: 'Chocolate Cake', 
        description: 'Rich chocolate cake with ganache', 
        price: 600, 
        image_url: 'public/uploads/food_category/dessert/chocolate-cake.jpg', 
        prep_time: 5, 
        rating: 4.9, 
        category: 'Dessert' ,
        has_sizes: false,
        sizes: null 
    },
    { 
        id: 20, 
        name: 'Ice Cream', 
        description: 'Three scoops of assorted ice cream', 
        price: 550, 
        image_url: 'public/uploads/food_category/dessert/ice-cream.jpg', 
        prep_time: 5, 
        rating: 4.8, 
        category: 'Dessert' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 21, 
        name: 'Cheesecake', 
        description: 'Creamy New York style cheesecake', 
        price: 650, 
        image_url: 'public/uploads/food_category/dessert/cheesecake.jpg', 
        prep_time: 5, 
        rating: 4.9, 
        category: 'Dessert' ,
        has_sizes: false,
        sizes: null
    },
    {
        id: 22,
        name: 'Honey Semifreddo',
        description: 'Light and airy honey semifreddo with almonds',
        price: 700,
        image_url: 'public/uploads/food_category/dessert/honey-semifreddo.jpg',
        prep_time: 5,   
        rating: 4.8,
        category: 'Dessert',
        has_sizes: false,
        sizes: null
    },
    {
        id: 23,
        name: 'Lava Cake',
        description: 'Warm chocolate lava cake with molten center',
        price: 750,
        image_url: 'public/uploads/food_category/dessert/lava-cake.jpg',
        prep_time: 5,
        rating: 4.9,
        category: 'Dessert',
        has_sizes: false,
        sizes: null
    },
    
    // Drinks
    { 
        id: 24, 
        name: 'Fresh Juice', 
        description: 'Freshly squeezed orange juice', 
        price: 400, 
        image_url: 'public/uploads/food_category/drinks/juice.jpg', 
        prep_time: 5, 
        rating: 4.5, 
        category: 'Drinks' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 25, 
        name: 'Smoothie', 
        description: 'Mixed berry smoothie', 
        price: 500, 
        image_url: 'public/uploads/food_category/drinks/smoothie.jpg', 
        prep_time: 5, 
        rating: 4.7, 
        category: 'Drinks' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 26, 
        name: 'Coffee', 
        description: 'Freshly brewed coffee', 
        price: 300, 
        image_url: 'public/uploads/food_category/drinks/coffee.jpg', 
        prep_time: 5, 
        rating: 4.6, 
        category: 'Drinks' ,
        has_sizes: false,
        sizes: null
    },
    { 
        id: 28, 
        name: 'Milkshake', 
        description: 'Thick chocolate milkshake', 
        price: 550, 
        image_url: 'public/uploads/food_category/drinks/milkshake.jpg', 
        prep_time: 5, 
        rating: 4.8, 
        category: 'Drinks' ,
        has_sizes: false,
        sizes: null
    },
    {
        id: 27,
        name: 'CockTail',
        description: 'Refreshing cocktail with a mix of fruits',
        price: 600,
        image_url: 'public/uploads/food_category/drinks/cocktail.jpg',
        prep_time: 5,
        rating: 4.7,
        category: 'Drinks',
        has_sizes: false,
        sizes: null
    },
    {
        id: 29,
        name: 'Gin Tonic',
        description: 'Classic gin and tonic with a twist of lime',
        price: 650,
        image_url: 'public/uploads/food_category/drinks/gin.jpg',
        prep_time: 5,
        rating: 4.8,
        category: 'Drinks',
        has_sizes: false,
        sizes: null
    },
    {
        id: 30,
        name: 'Cappuccino',
        description: 'Rich and creamy cappuccino with steamed milk',
        price: 400,
        image_url: 'public/uploads/food_category/drinks/cappuccino.jpg',
        prep_time: 5,
        rating: 4.6,
        category: 'Drinks',
        has_sizes: false,
        sizes: null
    }

];

// =====================================================
// STATE
// =====================================================
let categories = [...MOCK_CATEGORIES];
let menuItems = [...MOCK_MENU];
let selectedCategory = 'All';
let cart = [];
let selectedItem = null;
let selectedSize = null;

// =====================================================
// INIT
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM Loaded - Standalone Demo Mode');

    loadCart();
    updateCartBadge();
    renderCategories();
    renderMenuItems();

    // Brief loading simulation
    showLoading(true);
    setTimeout(() => {
        showLoading(false);
    }, 500);

    setupEventListeners();
});

// =====================================================
// UI
// =====================================================
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    const grid = document.getElementById('menuGrid');
    if (!spinner || !grid) return;
    spinner.style.display = show ? 'block' : 'none';
    grid.style.display = show ? 'none' : 'grid';
}

function renderCategories() {
    const list = document.getElementById('categoriesList');
    if (!list) return;

    list.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat.name === selectedCategory ? 'active' : ''}"
                data-category="${cat.name}">
            ${cat.name}
        </button>
    `).join('');

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedCategory = btn.dataset.category;
            renderCategories();
            renderMenuItems();
        });
    });
}

function renderMenuItems() {
    const searchEl = document.getElementById('searchInput');
    const search = searchEl ? searchEl.value.toLowerCase() : '';

    let filtered = menuItems.filter(item => {
        const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchSearch = !search ||
            item.name.toLowerCase().includes(search) ||
            (item.description && item.description.toLowerCase().includes(search));
        return matchCategory && matchSearch;
    });

    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #9ca3af;">No items found</p>';
        return;
    }

    grid.innerHTML = filtered.map(item => {
        const imgUrl = getImageUrl(item.image_url, item.category);
        const imgTag = imgUrl
            ? `<img src="${imgUrl}" alt="${item.name}" onerror="this.style.display='none'; this.parentElement.querySelector('.fallback-emoji').style.display='flex';">`
            : '';
        const emoji = getCategoryEmoji(item.category);

        let priceText;
        if (item.has_sizes && item.sizes && item.sizes.length > 0) {
            const prices = item.sizes.map(s => s.price);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            priceText = min === max ? `LKR ${min}` : `LKR ${min} - ${max}`;
        } else {
            priceText = `LKR ${item.price || 0}`;
        }

        return `
        <div class="menu-item" data-id="${item.id}">
            <div class="menu-item-image" style="position:relative;">
                <div class="fallback-emoji" style="display:${imgUrl ? 'none' : 'flex'}; width:100%; height:100%; align-items:center; justify-content:center; font-size:48px;">${emoji}</div>
                ${imgTag}
            </div>
            <div class="menu-item-content">
                <h3 class="menu-item-name">${item.name}</h3>
                <div class="menu-item-info">
                    <span class="info-item">⏱️ ${item.prep_time} min</span>
                    <span class="info-item">⭐ ${item.rating}</span>
                </div>
                <p class="menu-item-price">${priceText}</p>
                ${item.has_sizes ? '<p style="font-size:12px; color:#999;">📏 Multiple sizes</p>' : ''}
            </div>
        </div>
        `;
    }).join('');

    document.querySelectorAll('.menu-item').forEach(el => {
        el.addEventListener('click', () => {
            showItemModal(parseInt(el.dataset.id));
        });
    });
}

function getCategoryEmoji(category) {
    const map = {
        'Breakfast': '🍳',
        'Lunch': '🥗',
        'Dinner': '🍽️',
        'Treats': '🍟',
        'Dessert': '🍰',
        'Drinks': '🥤'
    };
    return map[category] || '🍽️';
}

function showItemModal(itemId) {
    selectedItem = menuItems.find(item => item.id === itemId);
    if (!selectedItem) return;

    selectedSize = null;

    document.getElementById('modalName').textContent = selectedItem.name;
    document.getElementById('modalDescription').textContent = selectedItem.description || '';
    document.getElementById('modalTime').textContent = `${selectedItem.prep_time} min`;
    document.getElementById('modalRating').textContent = selectedItem.rating;

    const imgUrl = getImageUrl(selectedItem.image_url, selectedItem.category);
    const emoji = getCategoryEmoji(selectedItem.category);
    if (imgUrl) {
        document.getElementById('modalImage').innerHTML = `
            <img src="${imgUrl}" alt="${selectedItem.name}"
                 onerror="this.outerHTML='<span class=\\'modal-emoji\\'>${emoji}</span>'">
        `;
    } else {
        document.getElementById('modalImage').innerHTML = `<span class="modal-emoji">${emoji}</span>`;
    }

    const addBtn = document.getElementById('addToCartBtn');
    const priceDiv = document.getElementById('modalPrice');

    if (selectedItem.has_sizes && selectedItem.sizes && selectedItem.sizes.length > 0) {
        priceDiv.innerHTML = `
            <p style="font-weight: bold; margin-bottom: 10px;">Select Size:</p>
            ${selectedItem.sizes.map((size, i) => `
                <button class="size-option" data-idx="${i}"
                        style="display: block; width: 100%; padding: 15px; margin: 8px 0;
                               background: #f5f5f5; border: 2px solid #ddd; border-radius: 8px;
                               cursor: pointer; text-align: left;">
                    <span style="font-weight: bold;">${size.name}</span>
                    <span style="float: right; color: #000000; font-weight: bold;">LKR ${size.price}</span>
                </button>
            `).join('')}
        `;

        document.querySelectorAll('.size-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.size-option').forEach(b => {
                    b.style.background = '#f5f5f5';
                    b.style.borderColor = '#ddd';
                    b.style.color = '#1f2937';
                });
                btn.style.background = '#000000';
                btn.style.borderColor = '#23dfe6';
                btn.style.color = 'white';
                selectedSize = selectedItem.sizes[parseInt(btn.dataset.idx)];
                addBtn.disabled = false;
                addBtn.style.opacity = '1';
            });
        });

        addBtn.disabled = true;
        addBtn.style.opacity = '0.5';
    } else {
        priceDiv.innerHTML = `<p style="font-size: 28px; color: #2D7A7C;; font-weight: bold;">LKR ${selectedItem.price || 0}</p>`;
        addBtn.disabled = false;
        addBtn.style.opacity = '1';
    }

    document.getElementById('itemModal').classList.add('active');
}

function closeModal() {
    document.getElementById('itemModal').classList.remove('active');
}

// =====================================================
// CART
// =====================================================
function addToCart() {
    if (!selectedItem) return;
    if (selectedItem.has_sizes && !selectedSize) {
        Swal.fire({
            icon: 'warning',
            title: '⚠️ Size Required',
            text: 'Please select a size before adding to cart!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6b35',
            background: '#1a1a1a',
            color: '#fff'
        });
        return;
    }

    const item = {
        id: selectedItem.id,
        name: selectedItem.name,
        description: selectedItem.description,
        price: selectedItem.has_sizes ? selectedSize.price : selectedItem.price,
        size: selectedItem.has_sizes ? selectedSize.name : null,
        image_url: selectedItem.image_url,
        category: selectedItem.category,
        prep_time: selectedItem.prep_time,
        rating: selectedItem.rating,
        quantity: 1
    };

    const existing = cart.find(i =>
        i.id === item.id && (item.size ? i.size === item.size : !i.size)
    );

    if (existing) {
        existing.quantity++;
    } else {
        cart.push(item);
    }

    saveCart();
    updateCartBadge();
    closeModal();

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Added to cart!',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: '#2ed573',
        color: '#fff'
    });
}

function loadCart() {
    const saved = localStorage.getItem('cart');
    cart = saved ? JSON.parse(saved) : [];
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    }
}

// =====================================================
// EVENTS
// =====================================================
function setupEventListeners() {
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            window.location.href = `cart.html?table=${tableNumber}`;
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', renderMenuItems);
    }

    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    const modal = document.getElementById('itemModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'itemModal') closeModal();
        });
    }

    const addBtn = document.getElementById('addToCartBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addToCart);
    }
}