// Utility: get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Utility: save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = count;
}

// Create sparkle effect
function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.style.position = "fixed";
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  sparkle.style.width = "8px";
  sparkle.style.height = "8px";
  sparkle.style.background = "radial-gradient(circle, #fff, #ffb6c1)";
  sparkle.style.borderRadius = "50%";
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "9999";
  sparkle.style.animation = "sparkle 1s ease-out forwards";

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
}

// Add to cart functionality
function addToCart(name, price, button) {
  // Sparkle animation
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createSparkle(
        x + (Math.random() - 0.5) * 50,
        y + (Math.random() - 0.5) * 50
      );
    }, i * 100);
  }

  // Button animation
  button.style.transform = "scale(0.95)";
  setTimeout(() => (button.style.transform = "scale(1)"), 150);

  // Update cart
  let cart = getCart();
  const existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart(cart);

  // Show toast
  const toast = document.getElementById("toast");
  toast.textContent = `${name} added to cart! 🍪`;
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 3000);
}

// Parallax effect
function setupParallax() {
  const floatingItems = document.querySelectorAll(".floating-item");
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    floatingItems.forEach((item, index) => {
      const speed = 0.5 + index * 0.1;
      item.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Card hover
function setupCardEffects() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px) scale(1.05)";
      card.style.boxShadow = "0 25px 60px rgba(0, 0, 0, 0.2)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
    });
  });
}

// Page click sparkles
document.addEventListener("click", (e) => {
  if (!e.target.closest("button")) {
    createSparkle(e.clientX, e.clientY);
  }
});

// Init
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupParallax();
  setupCardEffects();
});
