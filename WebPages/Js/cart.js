function renderCart() {
  const cartContainer = document.getElementById('cartContainer');
  const cartSummary = document.getElementById('cartSummary');
  const emptyMsg = document.querySelector('.cart-empty-message');

  // GET CART FROM LOCALSTORAGE
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  cartContainer.innerHTML = '';

  if (cartItems.length === 0) {
    emptyMsg.style.display = 'block';
    cartSummary.style.display = 'none';
    return;
  } else {
    emptyMsg.style.display = 'none';
    cartSummary.style.display = 'block';
  }

  let subtotal = 0;

  cartItems.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Unit Price: ₹${item.price}</p>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-btn decrement" data-name="${item.name}">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn increment" data-name="${item.name}">+</button>
      </div>
      <div class="cart-item-price">₹${item.price * item.quantity}</div>
      <button class="remove-item-btn" data-name="${item.name}">✖</button>
    `;
    cartContainer.appendChild(itemEl);
    subtotal += item.price * item.quantity;
  });

  const shipping = 20; // Fixed shipping
  document.getElementById('subtotal').textContent = `₹${subtotal}`;
  document.getElementById('shipping').textContent = `₹${shipping}`;
  document.getElementById('total').textContent = `₹${subtotal + shipping}`;

  // Add event listeners
  addCartEvents(cartItems);
}

// ---------------- Event Listeners ----------------
function addCartEvents(cartItems) {
  document.querySelectorAll('.decrement').forEach(btn => {
    btn.onclick = e => updateQuantity(e.target.dataset.name, -1);
  });
  document.querySelectorAll('.increment').forEach(btn => {
    btn.onclick = e => updateQuantity(e.target.dataset.name, 1);
  });
  document.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.onclick = e => removeItem(e.target.dataset.name);
  });
  document.querySelector('.checkout-btn').onclick = () => alert('Proceeding to checkout!');
}

// Update quantity
function updateQuantity(name, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) cart = cart.filter(i => i.name !== name);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Remove item
function removeItem(name) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(i => i.name !== name);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});
