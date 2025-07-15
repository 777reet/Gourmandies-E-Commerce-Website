    // Particle Background Animation
    function createParticles() {
      const particleBg = document.getElementById('particleBg');
      // Clear existing particles to prevent accumulation if called multiple times
      particleBg.innerHTML = ''; 
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

    // Scroll Animations for shop page elements
    function animateOnScroll() {
      const shopIntro = document.querySelector('.shop-intro');
      const categoryCards = document.querySelectorAll('.category-card');
      const specialOffer = document.querySelector('.special-offer');
      
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
      
      if (shopIntro) observer.observe(shopIntro);
      categoryCards.forEach(card => observer.observe(card));
      if (specialOffer) observer.observe(specialOffer);

      // Add a separate observer for fading in the hero-content if needed
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        const heroObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = 1;
              entry.target.style.transform = 'translateY(0)';
            }
          });
        }, { threshold: 0.5 }); // Observe when 50% of the hero-content is visible
        heroObserver.observe(heroContent);
      }
    }

    // Navbar Scroll Effect
    function handleNavbarScroll() {
      const navbar = document.querySelector('.navbar');
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

    // Enhanced Feature Card Interactions (now for category cards)
    function setupCategoryCards() {
      const cards = document.querySelectorAll('.category-card');
      
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

    // Parallax Effect for Floating Elements (specific to shop page)
    function setupParallax() {
      const floatingItems = document.querySelectorAll('.floating-matcha');
      
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingItems.forEach((item, index) => {
          // Adjust speed for a more subtle effect on shop page
          const speed = 0.2 + (index * 0.05); 
          item.style.transform = `translateY(${scrolled * -speed}px)`;
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

    // Add sparkle animation CSS (if not already in a shared stylesheet)
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
      setupCategoryCards(); // Changed from setupFeatureCards
      setupParallax();
    });

    // Add some random floating particles periodically
    setInterval(() => {
      if (Math.random() < 0.1) { // Reduced frequency slightly for shop page
        // You might want to create fewer, larger, or different-looking particles for this page if desired
        // For now, keeping the same particle creation for consistency
        createParticles(); 
      }
    }, 8000); // Increased interval slightly