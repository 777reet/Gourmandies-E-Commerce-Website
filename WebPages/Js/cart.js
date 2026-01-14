// Cart functionality with order recording
class CartManager {
  constructor() {
    this.cart = this.getCartFromStorage();
    this.orders = this.getOrdersFromStorage();
    this.init();
  }

  // Initialize the cart
  init() {
    this.renderCart();
    this.setupEventListeners();
    this.setupDeliveryListeners();
  }

  // Get cart from storage
  getCartFromStorage() {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  }

  // Get orders from storage
  getOrdersFromStorage() {
    try {
      return JSON.parse(localStorage.getItem('orders')) || [];
    } catch (error) {
      console.error('Error parsing orders from localStorage:', error);
      return [];
    }
  }

  // Save cart to storage
  saveCartToStorage() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  // Save orders to storage
  saveOrdersToStorage() {
    try {
      localStorage.setItem('orders', JSON.stringify(this.orders));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }

  // Render cart items
  renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    const cartSummary = document.getElementById('cartSummary');
    const emptyMsg = document.getElementById('emptyCartMessage');

    if (!cartContainer) {
      console.error('Cart container not found');
      return;
    }

    // Clear existing cart items
    const existingItems = cartContainer.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());

    if (this.cart.length === 0) {
      if (emptyMsg) emptyMsg.style.display = 'block';
      if (cartSummary) cartSummary.style.display = 'none';
      // Hide delivery section when cart is empty
      const deliverySection = document.getElementById('deliverySection');
      if (deliverySection) deliverySection.style.display = 'none';
      return;
    } else {
      if (emptyMsg) emptyMsg.style.display = 'none';
      if (cartSummary) cartSummary.style.display = 'block';
    }

    let subtotal = 0;

    this.cart.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.image || '../Assets/Images/placeholder.png'}" alt="${item.name}" class="cart-item-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjc3NDgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZTwvdGV4dD4KPC9zdmc+'">
        <div class="cart-item-details">
          <h3>${item.name || 'Unknown Item'}</h3>
          <p>Unit Price: ₹${(item.price || 0).toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn decrement" data-index="${index}">-</button>
          <span class="quantity-display">${item.quantity || 1}</span>
          <button class="quantity-btn increment" data-index="${index}">+</button>
        </div>
        <div class="cart-item-price">₹${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</div>
        <button class="remove-item-btn" data-index="${index}">✖</button>
      `;
      
      // Insert before cart summary
      if (cartSummary) {
        cartContainer.insertBefore(itemEl, cartSummary);
      } else {
        cartContainer.appendChild(itemEl);
      }
      
      subtotal += (item.price || 0) * (item.quantity || 1);
    });

    this.updateSummary(subtotal);
    this.attachItemEventListeners();
  }

  // Update cart summary with delivery options
  updateSummary(subtotal) {
    const deliverySection = document.getElementById('deliverySection');
    const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
    const deliveryFee = selectedDelivery ? parseFloat(selectedDelivery.value) : 0;
    
    // Show/hide delivery section based on cart content
    if (deliverySection) {
      deliverySection.style.display = subtotal > 0 ? 'block' : 'none';
    }
    
    const shipping = deliveryFee; // Use only delivery fee as shipping
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `₹${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${total.toFixed(2)}`;
  }

  // Setup main event listeners
  setupEventListeners() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.proceedToCheckout());
    }
  }

  // Setup delivery option listeners
  setupDeliveryListeners() {
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
      option.addEventListener('change', () => {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.updateSummary(subtotal);
      });
    });
  }

  // Attach event listeners to cart items
  attachItemEventListeners() {
    // Quantity buttons
    document.querySelectorAll('.decrement').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.updateQuantity(index, -1);
      });
    });

    document.querySelectorAll('.increment').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.updateQuantity(index, 1);
      });
    });

    // Remove buttons
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.removeItem(index);
      });
    });
  }

  // Update item quantity
  updateQuantity(index, change) {
    if (index < 0 || index >= this.cart.length) return;

    const item = this.cart[index];
    item.quantity = (item.quantity || 1) + change;

    if (item.quantity <= 0) {
      this.cart.splice(index, 1);
    }

    this.saveCartToStorage();
    this.renderCart();
  }

  // Remove item from cart
  removeItem(index) {
    if (index < 0 || index >= this.cart.length) return;

    this.cart.splice(index, 1);
    this.saveCartToStorage();
    this.renderCart();
  }

  // Add item to cart (for external use)
  addToCart(item) {
    if (!item || !item.name || !item.price) {
      console.error('Invalid item data');
      return false;
    }

    const existingIndex = this.cart.findIndex(cartItem => cartItem.name === item.name);
    
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity = (this.cart[existingIndex].quantity || 1) + (item.quantity || 1);
    } else {
      this.cart.push({
        name: item.name,
        price: parseFloat(item.price) || 0,
        quantity: parseInt(item.quantity) || 1,
        image: item.image || '',
        category: item.category || '',
        description: item.description || ''
      });
    }

    this.saveCartToStorage();
    this.renderCart();
    return true;
  }

  // Calculate totals with delivery
  calculateTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
    const deliveryFee = selectedDelivery ? parseFloat(selectedDelivery.value) : 0;
    const shipping = deliveryFee;
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total, deliveryFee };
  }

  // Proceed to checkout and record order
  proceedToCheckout() {
    if (this.cart.length === 0) {
      alert('Your cart is empty! Add some items first.');
      return;
    }

    const { subtotal, shipping, total, deliveryFee } = this.calculateTotals();
    const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
    
    // Get delivery type text
    let deliveryType = 'Standard Delivery (Free)';
    if (selectedDelivery) {
      const deliveryLabel = selectedDelivery.parentElement.querySelector('strong');
      if (deliveryLabel) {
        deliveryType = deliveryLabel.textContent;
      }
    }

    // Create order object
    const order = {
      id: this.generateOrderId(),
      items: [...this.cart], // Create a copy of cart items
      subtotal: subtotal,
      shipping: shipping,
      deliveryFee: deliveryFee,
      deliveryType: deliveryType,
      total: total,
      date: new Date().toISOString(),
      status: 'pending',
      timestamp: Date.now()
    };

    // Show order confirmation
    const confirmOrder = confirm(
`Order Summary:
Items: ${this.cart.length}
Subtotal: ₹${subtotal.toFixed(2)}
Delivery: ${deliveryType}
Shipping & Delivery: ₹${shipping.toFixed(2)}
Total: ₹${total.toFixed(2)}

Confirm your order?`
    );

    if (confirmOrder) {
      // Save order
      this.orders.push(order);
      this.saveOrdersToStorage();

      // Clear cart
      this.cart = [];
      this.saveCartToStorage();
      this.renderCart();

      // Show success message
      alert(
`Order placed successfully! 
Order ID: ${order.id}
Total: ₹${total.toFixed(2)}
Delivery: ${deliveryType}
Thank you for your purchase!`
      );

      // Optional: Log order for debugging
      console.log('Order placed:', order);
    }
  }

  // Generate unique order ID
  generateOrderId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `ORD-${timestamp}-${random}`.toUpperCase();
  }

  // Get all orders (for external use)
  getOrders() {
    return [...this.orders];
  }

  // Clear all orders (for external use)
  clearOrders() {
    this.orders = [];
    this.saveOrdersToStorage();
  }

  // Get cart items count
  getCartCount() {
    return this.cart.reduce((count, item) => count + (item.quantity || 1), 0);
  }

  // Clear cart
  clearCart() {
    this.cart = [];
    this.saveCartToStorage();
    this.renderCart();
  }

  // Export order data as JSON (for external use)
  exportOrders() {
    const dataStr = JSON.stringify(this.orders, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `gourmandises-orders-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Initialize cart manager when DOM is loaded
let cartManager;

document.addEventListener('DOMContentLoaded', () => {
  cartManager = new CartManager();
});

// Legacy functions for backward compatibility
function renderCart() {
  if (cartManager) cartManager.renderCart();
}

function updateQuantity(name, change) {
  if (!cartManager) return;
  const index = cartManager.cart.findIndex(item => item.name === name);
  if (index > -1) cartManager.updateQuantity(index, change);
}

function removeItem(name) {
  if (!cartManager) return;
  const index = cartManager.cart.findIndex(item => item.name === name);
  if (index > -1) cartManager.removeItem(index);
}

// Utility functions for external use
function addToCart(item) {
  if (cartManager) return cartManager.addToCart(item);
  return false;
}

function getCartCount() {
  return cartManager ? cartManager.getCartCount() : 0;
}

function getOrders() {
  return cartManager ? cartManager.getOrders() : [];
}

function exportOrders() {
  if (cartManager) cartManager.exportOrders();
}

function clearCart() {
  if (cartManager) cartManager.clearCart();
}

function clearOrders() {
  if (cartManager) cartManager.clearOrders();
}