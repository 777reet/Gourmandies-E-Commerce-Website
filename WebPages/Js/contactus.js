    // Particle Effects
    function createHeartParticles(x, y) {
      const hearts = ['💖', '💕', '💗', '🌸', '✨'];
      
      for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = (x - 10 + Math.random() * 20) + 'px';
        heart.style.top = (y - 10 + Math.random() * 20) + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'heartFloat 2s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
          heart.remove();
        }, 2000);
      }
    }

    // Add heart float animation
    const heartCSS = `
      @keyframes heartFloat {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) scale(0.5);
          opacity: 0;
        }
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = heartCSS;
    document.head.appendChild(style);

    // Form Submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      const successMessage = document.getElementById('successMessage');
      
      // Animate button
      submitBtn.style.transform = 'scale(0.95)';
      submitBtn.innerHTML = '<span>Sending... 💌</span>';
      
      // Create heart particles
      const rect = submitBtn.getBoundingClientRect();
      createHeartParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      
      // Simulate form submission
      setTimeout(() => {
        successMessage.style.display = 'block';
        submitBtn.style.transform = 'scale(1)';
        submitBtn.innerHTML = '<span>Message Sent! 🎉</span>';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = '<span>Send Sweet Message</span>';
          successMessage.style.display = 'none';
        }, 3000);
      }, 1500);
    });

    // Interactive Form Effects
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-5px)';
        this.parentElement.style.boxShadow = '0 10px 25px rgba(255, 105, 180, 0.2)';
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
        this.parentElement.style.boxShadow = 'none';
      });
    });

    // Info Card Interactions
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
      card.addEventListener('click', function() {
        const rect = this.getBoundingClientRect();
        createHeartParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      });
    });

    // Random Background Particle Generator
    function createRandomParticle() {
      const particles = ['🌸', '💕', '✨', '🍃', '💖'];
      const particle = document.createElement('div');
      
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.position = 'fixed';
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = window.innerHeight + 'px';
      particle.style.fontSize = '24px';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1';
      particle.style.opacity = '0.6';
      particle.style.animation = 'particleRise 8s linear forwards';
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 8000);
    }

    // Add particle rise animation
    const particleCSS = `
      @keyframes particleRise {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 0.6;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    
    const particleStyle = document.createElement('style');
    particleStyle.textContent = particleCSS;
    document.head.appendChild(particleStyle);

    // Generate random particles
    setInterval(createRandomParticle, 3000);

    // Navbar Scroll Effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Page Load Animation
    window.addEventListener('load', () => {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease-in-out';
      
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    });