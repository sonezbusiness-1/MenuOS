// =====================================================
// QR RESTAURANT LANDING PAGE - JavaScript
// EmailJS Integration & Interactions
// =====================================================

// =====================================================
// EMAILJS CONFIGURATION
// =====================================================

// 🔴 IMPORTANT: Replace these with your EmailJS credentials
// Get them from: https://www.emailjs.com/
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_shnbog4',      
    TEMPLATE_ID: 'template_r87h59e',    
    PUBLIC_KEY: '7hHNsfcEoDlwJJg9v'       
};

// =====================================================
// DEMO URL CONFIGURATION
// =====================================================

// Change this to your demo menu URL
const DEMO_URL = 'menu.html?table=1';  // Demo table number

// =====================================================
// DOM ELEMENTS
// =====================================================

const modal = document.getElementById('contactModal');
const contactForm = document.getElementById('contactForm');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = document.querySelector('.modal-overlay');

// Buttons that open contact form
const getStartedBtn = document.getElementById('getStartedBtn');
const ctaGetStartedBtn = document.getElementById('ctaGetStartedBtn');
const footerContact = document.getElementById('footerContact');

// Buttons that open demo
const watchDemoBtn = document.getElementById('watchDemoBtn');
const footerDemo = document.getElementById('footerDemo');

// Form elements
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');
const formStatus = document.getElementById('formStatus');

// =====================================================
// EVENT LISTENERS
// =====================================================

// Open contact modal
getStartedBtn.addEventListener('click', openModal);
ctaGetStartedBtn.addEventListener('click', openModal);
footerContact.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

// Close modal
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Watch demo buttons
document.getElementById("watchDemoBtn").addEventListener("click", function() {
    window.location.href = "demo/index.html";
});

// Form submission
contactForm.addEventListener('submit', handleFormSubmit);

// =====================================================
// MODAL FUNCTIONS
// =====================================================

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    contactForm.reset();
    formStatus.style.display = 'none';
    formStatus.className = 'form-status';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// =====================================================
// DEMO FUNCTION
// =====================================================

function openDemo() {
    console.log('🎬 Opening demo...');
    window.open(DEMO_URL, '_blank');
}

// =====================================================
// FORM SUBMISSION WITH EMAILJS
// =====================================================

async function handleFormSubmit(e) {
    e.preventDefault();
    
    console.log('📧 Submitting form...');
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    console.log('Form data:', formData);
    
    // Validate
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
        showStatus('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            {
                from_name: formData.fullName,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_name: 'QR Restaurant Team'  // Your name/company
            }
        );
        
        console.log('✅ Email sent successfully:', response);
        
        // Show success message
        showStatus('Thank you! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            setTimeout(closeModal, 1000);
        }, 2000);
        
    } catch (error) {
        console.error('❌ Email send failed:', error);
        showStatus('Failed to send message. Please try again or email us directly.', 'error');
    } finally {
        setLoadingState(false);
    }
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function setLoadingState(isLoading) {
    const submitBtn = contactForm.querySelector('.btn-submit');
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitLoader.style.display = 'block';
    } else {
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';
    }
}

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

// =====================================================
// SMOOTH SCROLLING
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================================================
// SCROLL ANIMATIONS
// =====================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.step, .benefit-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ============================================
// QR SYSTEM PACKAGES
// ============================================

(function() {
  'use strict';
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQRSystem);
  } else {
    initQRSystem();
  }
  
  function initQRSystem() {
    console.log('🚀 Initializing QR System...');
    
    const cards = document.querySelectorAll(".package-card");
    const confirmBtn = document.getElementById("confirmBtn");
    
    // Validation
    if (!confirmBtn) {
      console.error('❌ Confirm button not found!');
      return;
    }
    
    if (cards.length === 0) {
      console.error('❌ No package cards found!');
      return;
    }
    
    console.log('✅ Found', cards.length, 'package cards');
    console.log('✅ Confirm button found');
    
    let selectedPackage = null;
    let receiptChoices = {}; // Store receipt choice for each package
    
    // Check and show/hide confirm button
    function updateConfirmButton() {
      console.log('📦 Selected Package:', selectedPackage);
      console.log('💳 Receipt Choices:', receiptChoices);
      
      // Show button ONLY if:
      // 1. A package is selected (card is clicked)
      // 2. That specific package has a receipt choice
      if (selectedPackage && receiptChoices[selectedPackage]) {
        confirmBtn.style.display = 'inline-block';
        console.log('✅ Button SHOWN');
      } else {
        confirmBtn.style.display = 'none';
        console.log('❌ Button HIDDEN');
      }
    }
    
    // Dropdown change handler - just store the value, don't show button yet
    const dropdowns = document.querySelectorAll('.receipt-select');
    dropdowns.forEach(function(select) {
      select.addEventListener('change', function(e) {
        const card = e.target.closest('.package-card');
        const pkgName = card.dataset.package;
        
        console.log('📋 Dropdown changed for', pkgName, ':', e.target.value);
        
        // Store the receipt choice for this package
        if (e.target.value && e.target.value !== '') {
          receiptChoices[pkgName] = e.target.value;
        } else {
          delete receiptChoices[pkgName];
        }
        
        // DON'T auto-select the card or show button here
        // Just update the button state in case this package was already selected
        updateConfirmButton();
      });
      
      // Stop propagation
      select.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
    
    // Card click handler - this is when we show the button
    cards.forEach(function(card) {
      card.addEventListener('click', function(e) {
        // Ignore clicks on select elements
        if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') {
          return;
        }
        
        const pkgName = card.dataset.package;
        console.log('👆 Card clicked:', pkgName);
        
        // Remove active from all
        cards.forEach(function(c) {
          c.classList.remove('active');
        });
        
        // Add active to clicked card
        card.classList.add('active');
        selectedPackage = pkgName;
        
        // Now check if we should show the button
        updateConfirmButton();
      });
    });
    
    // Confirm button handler
    confirmBtn.addEventListener('click', function() {
      if (selectedPackage && receiptChoices[selectedPackage]) {
         Swal.fire({
            title: '✓ Package Selected',
            html: `
              <div style="text-align: left; padding: 1rem;">
                <p style="margin: 0.5rem 0;"><strong>Selected Package:</strong> ${selectedPackage}</p>
                <p style="margin: 0.5rem 0;"><strong>Receipt Payment:</strong> ${receiptChoices[selectedPackage]}</p>
              </div>
            `,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#7ce9e6',
            background: '#1a2f3a',
            color: '#fff'
          });
      }
    });
    
    console.log('🎉 QR System initialized successfully!');
  }
})();

// ============================================
// QR SYSTEM PACKAGES WITH CART
// ============================================

(function() {
  'use strict';
  
  // Package features data
  const packageFeatures = {
    Basic: [
      'QR Code Scan System',
      'Receipt System',
      'Domain Name Included',
      'Server / Hosting Included',
      '1 Month Bug Fix Support'
    ],
    Premium: [
      'Advanced QR Code Scan System',
      'Receipt System',
      'Domain Name Included',
      'Server / Hosting Included',
      '3 Month Bug Fix Support',
      'Admin Panel'
    ],
    Pro: [
      'Advanced QR Code Scan System',
      'Receipt System',
      'Domain Name Included',
      'Server / Hosting Included',
      'Unlimited Bug Fix Support',
      'Admin Panel',
      'POS Printer Included & Programmed'
    ]
  };
  
  // Package prices (ALREADY INCLUDE receipt charges)
  const packagePrices = {
    Basic: 100.00,      // Includes Pay After $50
    Premium: 300.00,    // Can be Pay After $50 or Pay Now $250
    Pro: 500.00        // Can be Pay After $50 or Pay Now $250
  };
  
  // Receipt charge breakdown (for display only)
  const receiptCharges = {
    'Pay After': 50,
    'Pay Now': 250,
    'Both': 250
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQRSystem);
  } else {
    initQRSystem();
  }
  
  function initQRSystem() {
    console.log('🚀 Initializing QR System...');
    
    const cards = document.querySelectorAll(".package-card");
    const confirmBtn = document.getElementById("confirmBtn");
    const packagesSection = document.querySelector(".packages-section");
    const cartSection = document.getElementById("cartSection");
    
    if (!confirmBtn || !packagesSection || !cartSection) {
      console.error('❌ Required elements not found!');
      return;
    }
    
    if (cards.length === 0) {
      console.error('❌ No package cards found!');
      return;
    }
    
    console.log('✅ QR System initialized');
    
    let selectedPackage = null;
    let receiptChoices = {};
    
    function updateConfirmButton() {
      if (selectedPackage && receiptChoices[selectedPackage]) {
        confirmBtn.style.display = 'inline-block';
      } else {
        confirmBtn.style.display = 'none';
      }
    }
    
    // Dropdown handlers
    document.querySelectorAll('.receipt-select').forEach(select => {
      select.addEventListener('change', e => {
        const card = e.target.closest('.package-card');
        const pkgName = card.dataset.package;
        
        if (e.target.value && e.target.value !== '') {
          receiptChoices[pkgName] = e.target.value;
        } else {
          delete receiptChoices[pkgName];
        }
        
        updateConfirmButton();
      });
      
      select.addEventListener('click', e => e.stopPropagation());
    });
    
    // Card click handlers
    cards.forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') {
          return;
        }
        
        const pkgName = card.dataset.package;
        
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedPackage = pkgName;
        
        updateConfirmButton();
      });
    });
    
    // Confirm button - Go to cart with smooth scroll animation
    confirmBtn.addEventListener('click', () => {
      if (selectedPackage && receiptChoices[selectedPackage]) {
        showCart(selectedPackage, receiptChoices[selectedPackage]);
      }
    });
    
    // Show cart function with smooth scroll
    function showCart(packageName, receiptType) {
      console.log('🛒 Opening cart...');
      
      // Scroll to top
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
      
      // After reaching top, switch content
      setTimeout(() => {
        packagesSection.style.display = 'none';
        cartSection.style.display = 'block';
        
        // Scroll to cart section
        setTimeout(() => {
          const cartPosition = cartSection.offsetTop - 80;
          window.scrollTo({ 
            top: cartPosition, 
            behavior: 'smooth' 
          });
        }, 200);
        
      }, 700);
      
      // Get package data
      const features = packageFeatures[packageName] || [];
      const packagePrice = packagePrices[packageName] || 0;
      const receiptCharge = receiptCharges[receiptType] || 0;
      const basePrice = packagePrice - receiptCharge; // Calculate base price for display
      
      // Display package details
      const packageDisplay = `
        <div class="package-header">
          <div class="package-name">${packageName} Package</div>
          <div class="package-receipt">Receipt: ${receiptType}</div>
        </div>
        <div class="package-features">
          ${features.map(feature => `
            <div class="feature-item">${feature}</div>
          `).join('')}
        </div>
      `;
      
      document.getElementById('selectedPackageDisplay').innerHTML = packageDisplay;
      document.getElementById('packageBadge').textContent = `${packageName} Package`;
      
      // Show breakdown in summary details
      document.getElementById('summaryPackageDetails').innerHTML = `
        Receipt Payment: <strong>${receiptType}</strong>
        <br>
        <span style="font-size: 0.85rem; color: #a0a0a0; margin-top: 5px; display: block;">
          Base: $${basePrice.toFixed(2)} + ${receiptType} ($${receiptCharge})
        </span>
      `;
      
      // Show final package price (unchanged)
      document.getElementById('summaryPackagePrice').textContent = `$${packagePrice.toFixed(2)}`;
      
      // Initialize cart calculations
      setTimeout(() => {
        initCartCalculations(packagePrice, packageName, receiptType, basePrice, receiptCharge);
      }, 900);
    }
  }
})();

// Back to packages
function backToPackages() {
  const packagesSection = document.querySelector('.packages-section');
  const cartSection = document.getElementById('cartSection');
  
  cartSection.style.display = 'none';
  packagesSection.style.display = 'block';
  
  // Reset selections
  document.querySelectorAll('input[name="domain"]').forEach(radio => radio.checked = false);
  document.querySelectorAll('input[name="hosting"]').forEach(radio => radio.checked = false);
  
  setTimeout(() => {
    const packagesPosition = packagesSection.offsetTop - 100;
    window.scrollTo({ 
      top: packagesPosition, 
      behavior: 'smooth' 
    });
  }, 100);
}

// Global variable for order data
let orderData = {};

// Cart calculations
function initCartCalculations(packagePrice, packageName, receiptType, basePrice, receiptCharge) {
  const domainRadios = document.querySelectorAll('input[name="domain"]');
  const hostingRadios = document.querySelectorAll('input[name="hosting"]');
  const printerSelect = document.getElementById('printerSelect');
  const gatewayRadios = document.querySelectorAll('input[name="gateway"]');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const gatewaySection = document.getElementById('paymentGatewaySection');
  const printerSection = document.getElementById('posPrinterSection');
  
  // Show POS printer section only for Pro package
  if (packageName === 'Pro') {
    printerSection.style.display = 'block';
  } else {
    printerSection.style.display = 'none';
  }
  
  // Show/hide payment gateway section
  if (receiptType === 'Pay Now' || receiptType === 'Both') {
    if (packageName === 'Premium' || packageName === 'Pro') {
      gatewaySection.style.display = 'block';
    }
  } else {
    gatewaySection.style.display = 'none';
  }
  
  let domainPrice = 0;
  let domainOriginal = 0;
  let hostingPrice = 0;
  let hostingOriginal = 0;
  let gatewayPrice = 0;
  let selectedDomainText = '';
  let selectedHostingText = '';
  let selectedGatewayText = '';
  let selectedPrinter = '';
  
  function updateSummary() {
    // Domain
    const selectedDomain = document.querySelector('input[name="domain"]:checked');
    if (selectedDomain) {
      const years = selectedDomain.value.replace('year', '');
      domainPrice = parseFloat(selectedDomain.dataset.price);
      domainOriginal = parseFloat(selectedDomain.dataset.original);
      selectedDomainText = `${years} Year - $${domainPrice.toFixed(2)}`;
      
      document.getElementById('summaryDomain').innerHTML = `
        <span style="text-decoration: line-through; color: #7b7b7b; font-size: 0.9rem;">$${domainOriginal.toFixed(2)}</span>
        <span style="color: #7ce9e6; font-weight: 700; font-size: 1.1rem;">$${domainPrice.toFixed(2)}</span>
        <span style="color: #7b7b7b; font-size: 0.85rem;">(${years} Year)</span>
      `;
    } else {
      document.getElementById('summaryDomain').textContent = 'Not selected';
      domainPrice = 0;
      domainOriginal = 0;
      selectedDomainText = '';
    }
    
    // Hosting
    const selectedHosting = document.querySelector('input[name="hosting"]:checked');
    if (selectedHosting) {
      const years = selectedHosting.value.replace('year', '');
      hostingPrice = parseFloat(selectedHosting.dataset.price);
      hostingOriginal = parseFloat(selectedHosting.dataset.original);
      selectedHostingText = `${years} Year - $${hostingPrice.toFixed(2)}`;
      
      document.getElementById('summaryHosting').innerHTML = `
        <span style="text-decoration: line-through; color: #7b7b7b; font-size: 0.9rem;">$${hostingOriginal.toFixed(2)}</span>
        <span style="color: #7ce9e6; font-weight: 700; font-size: 1.1rem;">$${hostingPrice.toFixed(2)}</span>
        <span style="color: #7b7b7b; font-size: 0.85rem;">(${years} Year)</span>
      `;
    } else {
      document.getElementById('summaryHosting').textContent = 'Not selected';
      hostingPrice = 0;
      hostingOriginal = 0;
      selectedHostingText = '';
    }
    
    // POS Printer (Pro package only)
    let printerDisplay = document.getElementById('summaryPrinter');
    
    if (!printerDisplay && printerSection.style.display === 'block') {
      const hostingRow = Array.from(document.querySelectorAll('.summary-item')).find(row => 
        row.textContent.includes('Hosting')
      );
      
      if (hostingRow) {
        const printerRow = document.createElement('div');
        printerRow.className = 'summary-item';
        printerRow.id = 'printerRow';
        printerRow.innerHTML = `
          <span>POS Printer:</span>
          <span id="summaryPrinter" class="summary-value">Not selected</span>
        `;
        hostingRow.after(printerRow);
        printerDisplay = document.getElementById('summaryPrinter');
      }
    }
    
    if (printerSection.style.display === 'block') {
      const printerRow = document.getElementById('printerRow');
      if (printerRow) {
        printerRow.style.display = 'flex';
      }
      
      if (printerSelect && printerSelect.value) {
        selectedPrinter = printerSelect.value;
        printerDisplay.innerHTML = `
          <span style="color: #2ed573; font-weight: 600;">${selectedPrinter}</span>
          <span style="color: #7b7b7b; font-size: 0.85rem;">(Included)</span>
        `;
      } else {
        if (printerDisplay) {
          printerDisplay.textContent = 'Not selected';
        }
        selectedPrinter = '';
      }
    } else {
      const printerRow = document.getElementById('printerRow');
      if (printerRow) {
        printerRow.style.display = 'none';
      }
      selectedPrinter = '';
    }
    
    // Payment Gateway
    const selectedGateway = document.querySelector('input[name="gateway"]:checked');
    let gatewayDisplay = document.getElementById('summaryGateway');
    
    if (!gatewayDisplay && gatewaySection.style.display === 'block') {
      const printerRow = document.getElementById('printerRow');
      const lastRow = printerRow || Array.from(document.querySelectorAll('.summary-item')).find(row => 
        row.textContent.includes('Hosting')
      );
      
      if (lastRow) {
        const gatewayRow = document.createElement('div');
        gatewayRow.className = 'summary-item';
        gatewayRow.id = 'gatewayRow';
        gatewayRow.innerHTML = `
          <span>Payment Gateway:</span>
          <span id="summaryGateway" class="summary-value">Not selected</span>
        `;
        lastRow.after(gatewayRow);
        gatewayDisplay = document.getElementById('summaryGateway');
      }
    }
    
    if (gatewaySection.style.display === 'block') {
      const gatewayRow = document.getElementById('gatewayRow');
      if (gatewayRow) {
        gatewayRow.style.display = 'flex';
      }
      
      if (selectedGateway) {
        gatewayPrice = parseFloat(selectedGateway.dataset.price);
        const planName = selectedGateway.value.charAt(0).toUpperCase() + selectedGateway.value.slice(1);
        selectedGatewayText = `${planName} Plan`;
        
        if (gatewayPrice === 0) {
          gatewayDisplay.innerHTML = `
            <span style="color: #2ed573; font-weight: 700; font-size: 1.1rem;">Free</span>
          `;
        } else {
          gatewayDisplay.innerHTML = `
            <span style="color: #7ce9e6; font-weight: 700; font-size: 1.1rem;">$${gatewayPrice.toFixed(2)}</span>
            <span style="color: #7b7b7b; font-size: 0.85rem;">/month</span>
          `;
        }
      } else {
        if (gatewayDisplay) {
          gatewayDisplay.textContent = 'Not selected';
        }
        gatewayPrice = 0;
        selectedGatewayText = '';
      }
    } else {
      const gatewayRow = document.getElementById('gatewayRow');
      if (gatewayRow) {
        gatewayRow.style.display = 'none';
      }
      gatewayPrice = 0;
      selectedGatewayText = '';
    }
    
    // Calculate totals (printer is included, doesn't add to price)
    const subtotal = packagePrice + domainPrice + hostingPrice + gatewayPrice;
    const originalTotal = packagePrice + domainOriginal + hostingOriginal;
    const savings = originalTotal - (packagePrice + domainPrice + hostingPrice);
    
    document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `$${subtotal.toFixed(2)}`;
    
    if (savings > 0 && (domainOriginal > 0 || hostingOriginal > 0)) {
      document.getElementById('summarySavings').style.display = 'flex';
      document.getElementById('savingsAmount').textContent = `-$${savings.toFixed(2)}`;
    } else {
      document.getElementById('summarySavings').style.display = 'none';
    }
    
    // Enable checkout
    const printerRequired = printerSection.style.display === 'block';
    const gatewayRequired = gatewaySection.style.display === 'block';
    
    checkoutBtn.disabled = !(
      selectedDomain && 
      selectedHosting && 
      (!printerRequired || (printerSelect && printerSelect.value)) &&
      (!gatewayRequired || selectedGateway)
    );
    
    // Store order data
    orderData = {
      packageName: packageName,
      packagePrice: packagePrice.toFixed(2),
      basePrice: basePrice.toFixed(2),
      receiptPayment: receiptType,
      receiptCharge: receiptCharge.toFixed(2),
      domain: selectedDomainText,
      domainPrice: domainPrice.toFixed(2),
      hosting: selectedHostingText,
      hostingPrice: hostingPrice.toFixed(2),
      printer: selectedPrinter || 'N/A',
      gateway: selectedGatewayText || 'N/A',
      gatewayPrice: gatewayPrice > 0 ? gatewayPrice.toFixed(2) : (selectedGatewayText ? '0.00' : 'N/A'),
      subtotal: subtotal.toFixed(2),
      savings: savings > 0 ? savings.toFixed(2) : '0.00',
      total: subtotal.toFixed(2)
    };
  }
  
  domainRadios.forEach(radio => radio.addEventListener('change', updateSummary));
  hostingRadios.forEach(radio => radio.addEventListener('change', updateSummary));
  if (printerSelect) {
    printerSelect.addEventListener('change', updateSummary);
  }
  gatewayRadios.forEach(radio => radio.addEventListener('change', updateSummary));
  
  updateSummary();
  
  checkoutBtn.addEventListener('click', openCheckoutModal);
}

// Open checkout modal
function openCheckoutModal() {
  const modal = document.getElementById('checkoutModal');

  if (!modal) {
        console.error("checkoutModal not found!");
        return;
    }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Populate order summary with breakdown
  const summaryHtml = `
    <div class="order-summary-item">
      <span class="order-summary-label">Package:</span>
      <span class="order-summary-value">${orderData.packageName}</span>
    </div>
    <div class="order-summary-item">
      <span class="order-summary-label">Receipt Payment:</span>
      <span class="order-summary-value">${orderData.receiptPayment}</span>
    </div>
    <div style="background: rgba(124, 233, 230, 0.05); padding: 12px; border-radius: 8px; margin: 10px 0;">
      <div class="order-summary-item" style="border: none; padding: 5px 0;">
        <span class="order-summary-label" style="font-size: 0.9rem;">Base Package:</span>
        <span class="order-summary-value" style="font-size: 0.9rem;">$${orderData.basePrice}</span>
      </div>
      <div class="order-summary-item" style="border: none; padding: 5px 0;">
        <span class="order-summary-label" style="font-size: 0.9rem; color: #8b5cf6;">${orderData.receiptPayment} Charge:</span>
        <span class="order-summary-value" style="font-size: 0.9rem; color: #8b5cf6;">+$${orderData.receiptCharge}</span>
      </div>
      <div class="order-summary-item" style="border: none; padding: 8px 0 0 0;">
        <span class="order-summary-label" style="font-weight: 700;">Package Total:</span>
        <span class="order-summary-value" style="font-size: 1.1rem; font-weight: 700;">$${orderData.packagePrice}</span>
      </div>
    </div>
    <div class="order-summary-item">
      <span class="order-summary-label">Domain:</span>
      <span class="order-summary-value">$${orderData.domainPrice}</span>
    </div>
    <div class="order-summary-item" style="font-size: 0.85rem; padding-left: 15px; color: #a0a0a0;">
      <span>${orderData.domain}</span>
      <span></span>
    </div>
    <div class="order-summary-item">
      <span class="order-summary-label">Hosting:</span>
      <span class="order-summary-value">$${orderData.hostingPrice}</span>
    </div>
    <div class="order-summary-item" style="font-size: 0.85rem; padding-left: 15px; color: #a0a0a0;">
      <span>${orderData.hosting}</span>
      <span></span>
    </div>
    ${orderData.gateway && orderData.gatewayPrice !== 'N/A' ? `
    <div class="order-summary-item">
      <span class="order-summary-label">Payment Gateway:</span>
      <span class="order-summary-value">${orderData.gatewayPrice === '0.00' ? 'Free' : '$' + orderData.gatewayPrice}</span>
    </div>
    <div class="order-summary-item" style="font-size: 0.85rem; padding-left: 15px; color: #a0a0a0;">
      <span>${orderData.gateway}</span>
      <span></span>
    </div>
    ` : ''}
    ${orderData.printer && orderData.printer !== 'N/A' ? `
    <div class="order-summary-item">
      <span class="order-summary-label">POS Printer:</span>
      <span class="order-summary-value" style="color: #2ed573;">${orderData.printer}</span>
    </div>
    <div class="order-summary-item" style="font-size: 0.85rem; padding-left: 15px; color: #a0a0a0;">
      <span>Included & Programmed</span>
      <span></span>
    </div>
    ` : ''}
    ${orderData.savings > 0 ? `
    <div class="order-summary-item" style="background: rgba(139, 92, 246, 0.1); padding: 10px; border-radius: 8px; margin: 10px 0;">
      <span class="order-summary-label" style="color: #8b5cf6; font-weight: 600;">You Save:</span>
      <span class="order-summary-value" style="color: #8b5cf6; font-weight: 700;">-$${orderData.savings}</span>
    </div>
    ` : ''}
    <div class="order-summary-total">
      <span>Total:</span>
      <span>$${orderData.total}</span>
    </div>
  `;

  document.getElementById('modalOrderSummary').innerHTML = summaryHtml;
}

// Close modal
function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
  const checkoutForm = document.getElementById('checkoutForm');
  
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById('orderConfirmBtn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      
      btnText.style.display = 'none';
      btnLoading.style.display = 'flex';
      submitBtn.disabled = true;
      
      const formData = {
        fullName2: document.getElementById('fullName2').value,
        email2: document.getElementById('email2').value,
        phone: document.getElementById('phone').value,
        address1: document.getElementById('address1').value,
        address2: document.getElementById('address2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        country: document.getElementById('country').value,
        postalCode: document.getElementById('postalCode').value,
        message2: document.getElementById('message2').value,
        ...orderData
      };
      
      sendOrderEmail(formData, submitBtn, btnText, btnLoading);
    });
  }
});

// Send order email
function sendOrderEmail(data, submitBtn, btnText, btnLoading) {
  const templateParams = {
    to_email: 'npvsgroup@gmail.com',
    name: data.fullName2,
    email2: data.email2,
    phone: data.phone,
    address: `${data.address1}${data.address2 ? ', ' + data.address2 : ''}, ${data.city}, ${data.state}, ${data.country} ${data.postalCode}`,
    package_name: data.packageName,
    base_price: data.basePrice,
    receipt_payment: data.receiptPayment,
    receipt_charge: data.receiptCharge,
    package_price: data.packagePrice,
    domain_plan: data.domain,
    domain_price: data.domainPrice,
    hosting_plan: data.hosting,
    hosting_price: data.hostingPrice,
    printer: data.printer,
    gateway: data.gateway,
    gateway_price: data.gatewayPrice,
    subtotal: data.subtotal,
    savings: data.savings,
    total: data.total,
    message2: data.message2 || 'No additional message',
    order_date: new Date().toLocaleString()
  };
  
  emailjs.send('service_shnbog4', 'template_2vxh3zr', templateParams)
  .then(function(response) {
    console.log('✅ Email sent!', response.status);
    
    // Custom success modal instead of alert
    Swal.fire({
      icon: 'success',
      title: '🎉 Order Confirmed!',
      html: `
        <div style="text-align: left; padding: 1rem;">
          <p style="margin: 1rem 0; font-size: 1.1rem;">We have received your order and will contact you shortly at:</p>
          <p style="margin: 1rem 0; color: #7ce9e6; font-weight: 600; font-size: 1.2rem;">${data.email}</p>
        </div>
      `,
      confirmButtonText: 'OK',
      confirmButtonColor: '#7ce9e6',
      background: '#1a2f3a',
      color: '#fff',
      allowOutsideClick: false
    }).then(() => {
      closeCheckoutModal();
      document.getElementById('checkoutForm').reset();
    });
    
    btnText.style.display = 'block';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
    
  }, function(error) {
    console.log('❌ Email failed:', error);
    
    // Custom error modal instead of alert
    Swal.fire({
      icon: 'error',
      title: '❌ Oops!',
      html: `
        <div style="text-align: left; padding: 1rem;">
          <p style="margin: 1rem 0;">Something went wrong. Please try again or contact us directly at:</p>
          <p style="margin: 1rem 0; color: #7ce9e6; font-weight: 600;">npvsgroup@gmail.com</p>
        </div>
      `,
      confirmButtonText: 'OK',
      confirmButtonColor: '#7ce9e6',
      background: '#1a2f3a',
      color: '#fff'
    });
    
    btnText.style.display = 'block';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  });
}

// =====================================================
// CONSOLE MESSAGE
// =====================================================

console.log('%c🍽️ QR Restaurant Landing Page', 'font-size: 20px; font-weight: bold; color: #0D9488;');
console.log('%cTo configure EmailJS:', 'font-size: 14px; color: #64748B;');
console.log('%c1. Create account at https://www.emailjs.com/', 'font-size: 12px;');
console.log('%c2. Add your Gmail service', 'font-size: 12px;');
console.log('%c3. Create email template', 'font-size: 12px;');
console.log('%c4. Replace credentials in app.js', 'font-size: 12px;');
console.log('%c5. Replace PUBLIC_KEY in index.html', 'font-size: 12px;');

// =====================================================
// END
// =====================================================