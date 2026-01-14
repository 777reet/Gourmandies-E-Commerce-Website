// Particle Background Animation
function createParticles() {
  const particleBg = document.getElementById('particleBg');
  if (!particleBg) return;
  
  // Only create particles if there aren't too many already
  if (particleBg.children.length >= 50) return;
  
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

// Scroll Animations
function animateOnScroll() {
  const sections = document.querySelectorAll('.story-section');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  sections.forEach(section => observer.observe(section));
  timelineItems.forEach(item => observer.observe(item));
}

// Navbar Scroll Effect
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
}

// Smooth Scrolling for Scroll Indicator
function setupScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  }
}

// Enhanced Feature Card Interactions
function setupFeatureCards() {
  const cards = document.querySelectorAll('.feature-card');
  
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

// Parallax Effect for Floating Elements
function setupParallax() {
  const floatingItems = document.querySelectorAll('.floating-item');
  if (floatingItems.length === 0) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    floatingItems.forEach((item, index) => {
      const speed = 0.5 + (index * 0.1);
      item.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Add Sparkle Effect on Click
function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.style.position = 'fixed';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.width = '6px';
  sparkle.style.height = '6px';
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

// Add sparkle animation CSS
const sparkleCSS = `
  @keyframes sparkle {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: scale(1) rotate(180deg);
      opacity: 1;
    }
    100% {
      transform: scale(0) rotate(360deg);
      opacity: 0;
    }
  }
`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Add click sparkle effect
document.addEventListener('click', (e) => {
  createSparkle(e.clientX, e.clientY);
});

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  animateOnScroll();
  handleNavbarScroll();
  setupScrollIndicator();
  setupFeatureCards();
  setupParallax();
});