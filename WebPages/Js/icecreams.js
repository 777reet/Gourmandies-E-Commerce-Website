// Enhanced Ice Cream Page JavaScript with Cart Integration

class IceCreamPage {
  constructor() {
    this.cart = this.getCartFromStorage();
    this.particleInterval = null;
    this.toastTimeout = null;
    this.init();
  }

  // Initialize the page
  init() {
    this.updateCartCount();
    this.createParticles();
    this.setupParallax();
    this.setupCardEffects();
    this.setupPageSparkles();
    this.startPeriodicParticles();
  }

  // Get cart from localStorage with error handling
  getCartFromStorage() {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  }

  // Save cart to localStorage with error handling
  saveCartToStorage(cart) {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cart = cart;
      this.updateCartCount();
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  // Update cart count in navbar
  updateCartCount() {
    const cart = this.getCartFromStorage();
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
      cartCountEl.textContent = count;
    }
  }

  // Create background particles
  createParticles() {
    const particleBg = document.getElementById('particleBg');
    if (!particleBg) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      this.createSingleParticle(particleBg);
    }
  }

  // Create a single particle
  createSingleParticle(container, temporary = false) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 6}s;
      animation-duration: ${Math.random() * 3 + 3}s;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(173, 216, 230, ${Math.random() * 0.6 + 0.2});
      border-radius: 50%;
    `;

    container.appendChild(particle);

    // Clean up temporary particles
    if (temporary) {
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 6000);
    }
  }

  // Start periodic particle creation
  startPeriodicParticles() {
    this.particleInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        const particleBg = document.getElementById('particleBg');
        if (particleBg) {
          this.createSingleParticle(particleBg, true);
        }
      }
    }, 5000);
  }

  // Create sparkle effect
  createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 8px;
      height: 8px;
      background: radial-gradient(circle, #fff, #87CEEB);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: sparkle 1s ease-out forwards;
    `;

    document.body.appendChild(sparkle);

    // Clean up sparkle after animation
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 1000);
  }

  // Enhanced add to cart functionality
  addToCart(name, price, button, imageSrc = '') {
    try {
      // Input validation
      if (!name || !price || isNaN(price) || price <= 0) {
        console.error('Invalid product data:', { name, price });
        this.showToast('Error: Invalid product data', 'error');
        return false;
      }

      // Visual feedback - sparkle burst with ice cream colors
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Create sparkle burst
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          this.createSparkle(
            x + (Math.random() - 0.5) * 50,
            y + (Math.random() - 0.5) * 50
          );
        }, i * 100);
      }

      // Button pop animation
      button.style.transform = 'scale(0.95)';
      button.style.transition = 'transform 0.15s ease';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);

      // Update cart data
      let cart = this.getCartFromStorage();
      const existingItem = cart.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        const newItem = {
          name: name,
          price: parseFloat(price),
          quantity: 1,
          image: imageSrc,
          category: 'Ice Cream',
          addedAt: new Date().toISOString()
        };
        cart.push(newItem);
      }

      // Save updated cart
      this.saveCartToStorage(cart);

      // Show success notification with ice cream emoji
      this.showToast(`${name} added to cart! 🍦`);

      // Optional: Disable button briefly to prevent spam clicks
      button.disabled = true;
      setTimeout(() => {
        button.disabled = false;
      }, 500);

      // Debug log
      console.log(`Added ${name} (₹${price}) to cart`);
      return true;

    } catch (error) {
      console.error('Error adding item to cart:', error);
      this.showToast('Error adding item to cart. Please try again.', 'error');
      return false;
    }
  }

  // Enhanced toast notification
  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) {
      console.warn('Toast element not found');
      return;
    }

    // Clear any existing timeout
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    // Auto-hide after 3 seconds
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Setup parallax scrolling effect
  setupParallax() {
    const floatingItems = document.querySelectorAll('.floating-item');
    if (floatingItems.length === 0) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      floatingItems.forEach((item, index) => {
        const speed = 0.5 + index * 0.1;
        item.style.transform = `translateY(${rate * speed}px)`;
      });
    };

    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 16); // ~60fps
      }
    });
  }

  // Setup card hover effects
  setupCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.05)';
        card.style.boxShadow = '0 25px 60px rgba(135, 206, 235, 0.3)'; // Ice cream blue shadow
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      });

      // Add touch support for mobile
      card.addEventListener('touchstart', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('touchend', () => {
        setTimeout(() => {
          card.style.transform = 'translateY(0) scale(1)';
        }, 200);
      });
    });
  }

  // Setup page click sparkles
  setupPageSparkles() {
    document.addEventListener('click', (e) => {
      // Don't create sparkles if clicking buttons or links (they have their own effects)
      if (!e.target.closest('button') && !e.target.closest('a')) {
        this.createSparkle(e.clientX, e.clientY);
      }
    });
  }

  // Get current cart count (for external use)
  getCartCount() {
    const cart = this.getCartFromStorage();
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }

  // Clear cart (for external use)
  clearCart() {
    this.saveCartToStorage([]);
  }

  // Clean up intervals when page unloads
  cleanup() {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }
}

// CSS animations (inject into page) - Ice cream themed
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes sparkle {
    0% {
      opacity: 1;
      transform: scale(0) rotate(0deg);
      box-shadow: 0 0 0 rgba(135, 206, 235, 0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1) rotate(180deg);
      box-shadow: 0 0 20px rgba(135, 206, 235, 0.8);
    }
    100% {
      opacity: 0;
      transform: scale(0) rotate(360deg);
      box-shadow: 0 0 0 rgba(135, 206, 235, 0);
    }
  }

  .toast.error {
    background: #ff6b6b;
    color: white;
  }

  .toast.success {
    background: linear-gradient(45deg, #87CEEB, #ADD8E6);
    color: white;
    box-shadow: 0 4px 20px rgba(135, 206, 235, 0.3);
  }

  .card {
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  }

  .card:hover {
    box-shadow: 0 25px 60px rgba(135, 206, 235, 0.3) !important;
  }

  .card button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: scale(0.95);
  }

  .particle {
    pointer-events: none;
    animation: particleFloat linear infinite;
    background: radial-gradient(circle, rgba(173, 216, 230, 0.8), rgba(135, 206, 235, 0.4)) !important;
  }

  @keyframes particleFloat {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }

  /* Ice cream themed sparkles */
  .sparkle {
    box-shadow: 0 0 10px rgba(135, 206, 235, 0.5);
  }
`;
document.head.appendChild(styleSheet);

// Initialize ice cream page
let iceCreamPage;

// Global function for onclick handlers (maintains compatibility with HTML)
function addToCart(name, price, button) {
  if (iceCreamPage) {
    // Try to get image from the card
    const card = button.closest('.card');
    const img = card ? card.querySelector('img') : null;
    const imageSrc = img ? img.src : '';
    
    return iceCreamPage.addToCart(name, price, button, imageSrc);
  }
  return false;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  iceCreamPage = new IceCreamPage();
  
  // Debug info
  console.log('Ice Cream page initialized with cart count:', iceCreamPage.getCartCount());
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (iceCreamPage) {
    iceCreamPage.cleanup();
  }
});

// Legacy functions for backward compatibility
function getCart() {
  return iceCreamPage ? iceCreamPage.getCartFromStorage() : [];
}

function saveCart(cart) {
  if (iceCreamPage) iceCreamPage.saveCartToStorage(cart);
}

function updateCartCount() {
  if (iceCreamPage) iceCreamPage.updateCartCount();
}

function createSparkle(x, y) {
  if (iceCreamPage) iceCreamPage.createSparkle(x, y);
}

function createParticles() {
  if (iceCreamPage) iceCreamPage.createParticles();
}

function setupParallax() {
  if (iceCreamPage) iceCreamPage.setupParallax();
}

function setupCardEffects() {
  if (iceCreamPage) iceCreamPage.setupCardEffects();
}

// Utility functions for external use
function getCurrentCartCount() {
  return iceCreamPage ? iceCreamPage.getCartCount() : 0;
}

function clearAllCart() {
  if (iceCreamPage) iceCreamPage.clearCart();
}