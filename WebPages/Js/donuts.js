// Create particle background
function createParticles() {
  const particleBg = document.getElementById('particleBg');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particleBg.appendChild(particle);
  }
}

// Add sparkle effect
function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.style.position = 'fixed';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.width = '8px';
  sparkle.style.height = '8px';
  sparkle.style.background = 'radial-gradient(circle, #fff, #ffb6c1)';
  sparkle.style.borderRadius = '50%';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.zIndex = '9999';
  sparkle.style.animation = 'sparkle 1s ease-out forwards';
  
  document.body.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

// Add to cart functionality
function addToCart(name, price, button) {
  // Create sparkle effect
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
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);

  // Show toast
  const toast = document.getElementById('toast');
  toast.textContent = `${name} added to cart! 🍪`;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);

  // Store in cart (use localStorage if needed later)
  console.log(`Added ${name} (₹${price}) to cart`);
}

// Parallax effect
function setupParallax() {
  const floatingItems = document.querySelectorAll('.floating-item');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    floatingItems.forEach((item, index) => {
      const speed = 0.5 + (index * 0.1);
      item.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Card hover effects
function setupCardEffects() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-15px) scale(1.05)';
      card.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
  });
}

// Page sparkle clicks
document.addEventListener('click', (e) => {
  if (!e.target.closest('button')) {
    createSparkle(e.clientX, e.clientY);
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  setupParallax();
  setupCardEffects();
});

// Add random particles periodically
setInterval(() => {
  if (Math.random() < 0.1) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = '0s';
    particle.style.animationDuration = '6s';
    document.getElementById('particleBg').appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 6000);
  }
}, 5000);
