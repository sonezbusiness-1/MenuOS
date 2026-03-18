// =====================================================
// CHECKOUT.JS - Standalone Demo (No Backend Required)
// Mock order submission with simulated processing
// =====================================================

const urlParams = new URLSearchParams(window.location.search);
const tableNumber = urlParams.get('table') || '1';

console.log('💳 Checkout - Table Number:', tableNumber);

// =====================================================
// STATE VARIABLES
// =====================================================
let cart = [];
let paymentMethod = 'pay-now';
let isSubmitting = false;
let selectedPaymentGateway = null;

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 Checkout page loaded');

    if (!tableNumber) {
        window.location.href = 'index.html';
        return;
    }

    loadCart();

    if (cart.length === 0) {
        window.location.href = `menu.html?table=${tableNumber}`;
        return;
    }

    const savedMethod = localStorage.getItem('paymentMethod');
    if (savedMethod) {
        paymentMethod = savedMethod;
        const radioBtn = document.querySelector(`input[value="${paymentMethod}"]`);
        if (radioBtn) radioBtn.checked = true;
    }

    renderOrderSummary();
    setupEventListeners();
    createConfirmationModal();

    console.log('✅ Checkout initialized');
});

// =====================================================
// CART FUNCTIONS
// =====================================================

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
    console.log('📦 Cart loaded:', cart.length, 'items');
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

function renderOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');

    orderSummary.innerHTML = cart.map(item => {
        const displayName = item.size ? `${item.name} (${item.size})` : item.name;
        return `
        <div class="order-item">
            <span>${item.quantity} x ${displayName}</span>
            <span>LKR ${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        `;
    }).join('');

    const { subtotal, tax, total } = calculateTotals();
    document.getElementById('subtotalAmount').textContent = `LKR ${subtotal.toFixed(2)}`;
    document.getElementById('taxAmount').textContent = `LKR ${tax.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `LKR ${total.toFixed(2)}`;
}

// =====================================================
// CONFIRMATION MODAL
// =====================================================

function createConfirmationModal() {
    const modalHTML = `
    <div id="confirmModal" class="custom-modal">
        <div class="custom-modal-content">
            <div class="confirm-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>
            <h2 style="margin: 20px 0 10px 0; font-size: 24px; color: #1f2937;">Confirm Your Order?</h2>
            <p id="confirmAmount" style="font-size: 32px; font-weight: bold; color: #2D7A7C;; margin: 10px 0;">LKR 0.00</p>
            <p style="color: #6b7280; margin-bottom: 30px;">Table ${tableNumber}</p>
            <div style="display: flex; gap: 15px; width: 100%;">
                <button id="cancelConfirmBtn" class="modal-btn cancel-btn">Cancel</button>
                <button id="proceedConfirmBtn" class="modal-btn confirm-btn">Confirm Order</button>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const style = document.createElement('style');
    style.textContent = `
        .custom-modal {
            display: none; position: fixed; top: 0; left: 0;
            width: 100%; height: 100%; background: rgba(0,0,0,0.6);
            z-index: 10000; opacity: 0; transition: opacity 0.3s ease;
            backdrop-filter: blur(5px);
        }
        .custom-modal.active {
            display: flex; align-items: center; justify-content: center; opacity: 1;
        }
        .custom-modal-content {
            background: white; padding: 40px; border-radius: 20px;
            text-align: center; max-width: 400px; width: 90%;
            transform: scale(0.7);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .custom-modal.active .custom-modal-content { transform: scale(1); }
        .confirm-icon {
            width: 80px; height: 80px; margin: 0 auto 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 50%; display: flex; align-items: center; justify-content: center;
        }
        .confirm-icon svg { width: 50px; height: 50px; color: white; }
        .modal-btn {
            flex: 1; padding: 15px 30px; border: none; border-radius: 12px;
            font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s ease;
        }
        .cancel-btn { background: #f3f4f6; color: #374151; }
        .cancel-btn:hover { background: #e5e7eb; transform: translateY(-2px); }
        .confirm-btn { background: linear-gradient(135deg, #2D7A7C, #1f5456); color: white; }
        .confirm-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(45,122,124,0.3); }
    `;
    document.head.appendChild(style);
}

function showConfirmModal() {
    const modal = document.getElementById('confirmModal');
    const { total } = calculateTotals();
    document.getElementById('confirmAmount').textContent = `LKR ${total.toFixed(2)}`;
    modal.classList.add('active');

    document.getElementById('cancelConfirmBtn').onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    };

    document.getElementById('proceedConfirmBtn').onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            if (paymentMethod === 'pay-now') {
                showPaymentGateway();
            } else {
                submitOrder();
            }
        }, 300);
    };
}

// =====================================================
// MOCK ORDER SUBMISSION
// =====================================================

function submitOrder() {
    console.log('📤 Submitting mock order...');

    if (isSubmitting) return;
    isSubmitting = true;

    const confirmBtn = document.getElementById('confirmOrderBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');

    confirmBtn.disabled = true;
    btnText.style.display = 'none';
    btnSpinner.style.display = 'block';

    // Simulate server processing delay
    setTimeout(() => {
        const { subtotal, tax, total } = calculateTotals();

        // Generate a mock order ID
        const orderId = 'ORD-' + Date.now().toString().slice(-6);

        // Build summary for success page
        const summary = {
            items: cart.map(item => ({
                name: item.name,
                size: item.size || null,
                price: item.price,
                quantity: item.quantity
            })),
            subtotal: parseFloat(subtotal.toFixed(2)),
            tax: parseFloat(tax.toFixed(2)),
            total: parseFloat(total.toFixed(2))
        };

        // Save order to localStorage for history
        const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        orders.push({
            orderId,
            tableNumber,
            items: summary.items,
            subtotal: summary.subtotal,
            tax: summary.tax,
            total: summary.total,
            paymentMethod,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('orderHistory', JSON.stringify(orders));

        // Clear cart
        localStorage.removeItem('cart');
        localStorage.removeItem('paymentMethod');

        const summaryEncoded = btoa(JSON.stringify(summary));
        window.location.href = `success.html?orderId=${encodeURIComponent(orderId)}&table=${tableNumber}&summary=${summaryEncoded}`;

    }, 2000);
}

// =====================================================
// ERROR MODAL
// =====================================================

function showErrorModal(message) {
    const existingModal = document.getElementById('errorModal');
    if (existingModal) existingModal.remove();

    const modalHTML = `
    <div id="errorModal" class="custom-modal active" style="display: flex;">
        <div class="custom-modal-content">
            <div style="width: 80px; height: 80px; margin: 0 auto;
                        background: linear-gradient(135deg, #ef4444, #dc2626);
                        border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width: 50px; height: 50px;">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            </div>
            <h2 style="margin: 20px 0 10px 0; font-size: 24px; color: #1f2937;">Order Failed</h2>
            <p style="color: #6b7280; margin-bottom: 30px;">${message}</p>
            <button onclick="document.getElementById('errorModal').remove()"
                    class="modal-btn confirm-btn" style="width: 100%;">Try Again</button>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// =====================================================
// EVENT LISTENERS
// =====================================================

function setupEventListeners() {
    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = `cart.html?table=${tableNumber}`;
    });

    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            paymentMethod = e.target.value;
            localStorage.setItem('paymentMethod', paymentMethod);
        });
    });

    document.getElementById('confirmOrderBtn').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showConfirmModal();
    });
}

// =====================================================
// PAYMENT GATEWAY MODAL
// =====================================================

function showPaymentGateway() {
    console.log('💳 Showing payment gateway');
    const modal = document.getElementById('paymentGatewayModal');
    const { total } = calculateTotals();
    document.getElementById('detailsAmount').textContent = `Total: LKR ${total.toFixed(2)}`;
    modal.classList.add('active');
    setupPaymentMethodSelection();
}

function setupPaymentMethodSelection() {
    const options = document.querySelectorAll('.payment-method-option');

    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedPaymentGateway = option.dataset.method;

            document.getElementById('paymentMethodStep').classList.remove('active');
            document.getElementById('paymentMethodStep').style.display = 'none';
            document.getElementById('paymentDetailsStep').classList.add('active');
            document.getElementById('paymentDetailsStep').style.display = 'block';

            showPaymentForm(selectedPaymentGateway);
        });
    });

    const backBtn = document.getElementById('backToMethods');
    if (backBtn) {
        backBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById('paymentDetailsStep').classList.remove('active');
            document.getElementById('paymentDetailsStep').style.display = 'none';
            document.getElementById('paymentMethodStep').classList.add('active');
            document.getElementById('paymentMethodStep').style.display = 'block';
            document.querySelectorAll('.payment-method-option').forEach(opt => opt.classList.remove('selected'));
            selectedPaymentGateway = null;
            clearAllPaymentForms();
        };
    }

    const cancelBtn = document.getElementById('gatewayCancel');
    if (cancelBtn) {
        cancelBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById('paymentGatewayModal').classList.remove('active');
            resetPaymentGateway();
            showToast('Payment Cancelled!, Please Page Refresh', 'warning');
            const confirmBtn = document.getElementById('confirmOrderBtn');
            if (confirmBtn) confirmBtn.disabled = false;
            isSubmitting = false;
        };
    }

    const payBtn = document.getElementById('gatewayPay');
    if (payBtn) {
        payBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (selectedPaymentGateway) {
                document.getElementById('paymentGatewayModal').classList.remove('active');
                processPayment();
            }
        };
    }
}

function resetPaymentGateway() {
    document.getElementById('paymentDetailsStep').classList.remove('active');
    document.getElementById('paymentDetailsStep').style.display = 'none';
    document.getElementById('paymentMethodStep').classList.add('active');
    document.getElementById('paymentMethodStep').style.display = 'block';
    document.querySelectorAll('.payment-method-option').forEach(opt => opt.classList.remove('selected'));
    selectedPaymentGateway = null;
    clearAllPaymentForms();
}

function clearAllPaymentForms() {
    document.querySelectorAll('.payment-form input').forEach(input => input.value = '');
}

function processPayment() {
    console.log('💳 Processing mock payment...');
    const confirmBtn = document.getElementById('confirmOrderBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    confirmBtn.disabled = true;
    btnText.textContent = 'Processing Payment...';
    btnSpinner.style.display = 'block';

    setTimeout(() => {
        console.log('✅ Mock payment successful!');
        submitOrder();
    }, 2000);
}

function getCardType(number) {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
    if (/^3[47]/.test(cleaned)) return 'American Express';
    if (/^6(?:011|5)/.test(cleaned)) return 'Discover';
    return 'Card';
}

function showPaymentForm(method) {
    document.querySelectorAll('.payment-form').forEach(form => form.style.display = 'none');
    const selectedForm = document.getElementById(method + 'Form');
    if (selectedForm) selectedForm.style.display = 'block';

    const titles = {
        'card': 'Enter Card Details', 'binance': 'Enter Binance Details',
        'amex': 'Enter Amex Details', 'applepay': 'Apple Pay',
        'qr': 'Scan QR Code', 'bybit': 'Enter Bybit Details',
        'stripe': 'Enter Stripe Details', 'googlepay': 'Google Pay'
    };
    document.getElementById('detailsTitle').textContent = titles[method] || 'Payment Details';

    const { total } = calculateTotals();
    const amountEl = document.getElementById('details2Amount');
    if (amountEl) amountEl.textContent = `Total: LKR ${total.toFixed(2)}`;
}

// =====================================================
// TOAST NOTIFICATION
// =====================================================

function showToast(message, type = 'info') {
    const existingToast = document.getElementById('toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    if (!document.getElementById('toastStyles')) {
        const style = document.createElement('style');
        style.id = 'toastStyles';
        style.textContent = `
            .toast { position: fixed; bottom: 30px; left: 30px; background: #1f2937; color: white;
                     padding: 15px 25px; border-radius: 8px; font-size: 16px; font-weight: 500;
                     box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 99999;
                     animation: slideInLeft 0.3s ease, fadeOut 0.3s ease 2.7s; }
            .toast-success { background: #10b981; }
            .toast-error { background: #ef4444; }
            .toast-warning { background: #f59e0b; }
            @keyframes slideInLeft { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes fadeOut { to { opacity: 0; transform: translateX(-20px); } }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
